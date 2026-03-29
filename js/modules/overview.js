/* ── T LEARN PRO: js/modules/overview.js ────────────────────────────────────
   Overview Engine — powers ALL live stats on the Overview tab
   Handles: XT Points, Streak, Rank, Level, Semester, Activity Nebula canvas
   Syncs with Supabase profiles + activity_log + xp_events tables
────────────────────────────────────────────────────────────────────────────── */

// ─── SUPABASE CLIENT HELPER ──────────────────────────────────────────────────
// Uses the project's existing supabaseLoader (matches auth.js pattern)
async function getSupabaseClient() {
    if (window._sbClient) return window._sbClient;
    window._sbClient = await window.supabaseLoader.load();
    return window._sbClient;
}

// ─── 1. LOAD PROFILE FROM SUPABASE ──────────────────────────────────────────
// Pulls xt_points, streak, level, semester, rank from DB and updates all cards
async function loadOverviewStats() {
    try {
        const client = await getSupabaseClient();
        const user = await window.AuthState.getUser();
        if (!user) return;

        // Get profile data
        const { data: profile, error } = await client
            .from('profiles')
            .select('xt_points, streak, level, semester')
            .eq('id', user.id)
            .maybeSingle();

        // Profile row missing — auto-create for existing users
        if (!error && !profile) {
            console.log('[Overview] No profile row — creating default...');
            const { data: created } = await client
                .from('profiles')
                .insert({
                    id: user.id,
                    full_name: user.user_metadata?.full_name || user.email?.split('@')[0] || 'Student',
                    level: 100,
                    semester: 1,
                    xt_points: 10,
                    streak: 0,
                    avatar_url: user.user_metadata?.avatar_url || '',
                    role: 'student'
                })
                .select()
                .maybeSingle();
            if (created) {
                console.log('[Overview] Profile created successfully');
                // Re-run with new profile
                setEl('dash-xp-val',    10);
                setEl('streakCount',    0);
                setEl('dash-level-val', 100);
                setEl('semesterVal',    '001');
                setEl('rankVal',        '#—');
            }
            return;
        }

        if (error) {
            console.warn('[Overview] Profile load failed:', error?.message);
            return;
        }

        // Calculate real rank: count users with MORE xt_points than current user
        const { count: higherCount } = await client
            .from('profiles')
            .select('id', { count: 'exact', head: true })
            .gt('xt_points', profile.xt_points ?? 0);

        const rank = (higherCount ?? 0) + 1; // rank = users ahead + 1

        // Update all stat cards
        setEl('dash-xp-val',    profile.xt_points ?? 0);
        setEl('streakCount',    profile.streak ?? 0);
        setEl('dash-level-val', profile.level ?? 100);
        setEl('semesterVal',    String(profile.semester ?? 1).padStart(3, '0'));
        setEl('rankVal',        `#${rank}`);

        // Cache locally for instant re-renders
        localStorage.setItem('tlp_profile', JSON.stringify({
            xt_points: profile.xt_points,
            streak:    profile.streak,
            level:     profile.level,
            semester:  profile.semester,
            rank
        }));

        console.log('[Overview] Stats loaded:', profile, 'Rank:', rank);
        updateOverviewUI(profile, rank);

    } catch (err) {
        console.error('[Overview] loadOverviewStats error:', err);

        // Fallback: use cached local data if Supabase fails
        const cached = JSON.parse(localStorage.getItem('tlp_profile') || '{}');
        if (cached.xt_points !== undefined) {
            setEl('dash-xp-val',    cached.xt_points);
            setEl('streakCount',    cached.streak);
            setEl('dash-level-val', cached.level);
            setEl('semesterVal',    String(cached.semester ?? 1).padStart(3, '0'));
            setEl('rankVal',        `#${cached.rank}`);
        }
    }
}

// ─── 2. XT POINTS EARN ENGINE ────────────────────────────────────────────────
// Call awardXP(eventType) from anywhere in the app to give points
const XP_TABLE = {
    register:          5,   // new user bonus
    daily_login:       5,   // login each day
    complete_lesson:  10,   // per course opened (HTML/CSS/JS/Python)
    pass_exam:       100,   // pass exam
    fail_exam:       -25,   // fail exam (deduct)
    write_exam:       25,   // just for taking the exam
    add_project:       3,
    hourly_active:     0,   // disabled — was inflating too fast
    rank_up:           1,   // rank improvement
    promoted:        200,   // semester promotion
    streak_bonus:      5,   // streak milestone
};

async function awardXP(eventType) {
    const points = XP_TABLE[eventType];
    if (points === undefined) return console.warn('[XP] Unknown event:', eventType);
    if (points === 0) return; // disabled events

    try {
        const client = await getSupabaseClient();
        const user = await window.AuthState.getUser();
        if (!user) return;

        // Log xp event
        await client.from('xp_events').insert({
            user_id:    user.id,
            event_type: eventType,
            points
        });

        // Increment xt_points on profile
        const { data: profile } = await client
            .from('profiles')
            .select('xt_points')
            .eq('id', user.id)
            .maybeSingle();

        const newPoints = Math.max(0, (profile?.xt_points || 0) + points);

        await client
            .from('profiles')
            .update({ xt_points: newPoints })
            .eq('id', user.id);

        // Update UI instantly without full reload
        setEl('dash-xp-val', newPoints);

        // Update local cache
        const cached = JSON.parse(localStorage.getItem('tlp_profile') || '{}');
        cached.xt_points = newPoints;
        localStorage.setItem('tlp_profile', JSON.stringify(cached));

        console.log(`[XP] +${points} for "${eventType}" → total: ${newPoints}`);

        // Leaderboard bonus check
        await checkLeaderboardBonus(user.id, newPoints);

    } catch (err) {
        console.error('[XP] awardXP error:', err);
    }
}

// Hourly active timer — fires every 60 mins while user is on dashboard
let _hourlyXPTimer = null;
function startHourlyXPTimer() {
    if (_hourlyXPTimer) return; // already running
    _hourlyXPTimer = setInterval(() => {
        if (document.visibilityState === 'visible') {
            awardXP('hourly_active');
            console.log('[XP] Hourly active award fired');
        }
    }, 60 * 60 * 1000); // every 60 minutes
}

// ─── 3. DAILY LOGIN + STREAK ENGINE ─────────────────────────────────────────
async function recordDailyLogin() {
    try {
        const client = await getSupabaseClient();
        const user = await window.AuthState.getUser();
        if (!user) return;

        const today = new Date().toISOString().split('T')[0];
        const lastLogin = localStorage.getItem('tlp_last_login');

        // Already recorded today
        if (lastLogin === today) {
            console.log('[Login] Already recorded today');
            return;
        }

        // Award daily login XP
        await awardXP('daily_login');

        // Log into activity_log
        await client.from('activity_log').upsert({
            user_id:  user.id,
            log_date: today,
            actions:  1
        }, { onConflict: 'user_id,log_date' });

        // Calculate streak
        await updateStreak(user.id, today, lastLogin);

        localStorage.setItem('tlp_last_login', today);
        console.log('[Login] Daily login recorded:', today);

    } catch (err) {
        console.error('[Login] recordDailyLogin error:', err);
    }
}

async function updateStreak(userId, today, lastLogin) {
    try {
        const client = await getSupabaseClient();

        const { data: profile } = await client
            .from('profiles')
            .select('streak')
            .eq('id', userId)
            .maybeSingle();

        let currentStreak = profile?.streak || 0;
        let newStreak = 1;

        if (lastLogin) {
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            const yesterdayStr = yesterday.toISOString().split('T')[0];

            if (lastLogin === yesterdayStr) {
                // Consecutive day — increment streak
                newStreak = currentStreak + 1;
            } else {
                // Missed a day — reset streak
                newStreak = 1;
            }
        }

        await client
            .from('profiles')
            .update({ streak: newStreak })
            .eq('id', userId);

        setEl('streakCount', newStreak);

        // Update local cache
        const cached = JSON.parse(localStorage.getItem('tlp_profile') || '{}');
        cached.streak = newStreak;
        localStorage.setItem('tlp_profile', JSON.stringify(cached));

        console.log('[Streak] Updated to:', newStreak);

    } catch (err) {
        console.error('[Streak] updateStreak error:', err);
    }
}

// ─── 4. LEADERBOARD BONUS ────────────────────────────────────────────────────
async function checkLeaderboardBonus(userId, currentPoints) {
    try {
        const client = await getSupabaseClient();
        // Get current user xt_points first
        const { data: myProfile } = await client
            .from('profiles')
            .select('xt_points')
            .eq('id', userId)
            .maybeSingle();

        const { count: higherCount } = await client
            .from('profiles')
            .select('id', { count: 'exact', head: true })
            .gt('xt_points', myProfile?.xt_points ?? 0);

        const rank = (higherCount ?? 0) + 1;
        if (!rank) return;

        const bonusKey = `tlp_bonus_${new Date().toISOString().split('T')[0]}`;
        const alreadyAwarded = localStorage.getItem(bonusKey);

        if (!alreadyAwarded) {
            let bonus = 0;
            if (rank <= 5)  bonus = 200;
            else if (rank <= 10) bonus = 100;

            if (bonus > 0) {
                await client.from('profiles')
                    .update({ xt_points: currentPoints + bonus })
                    .eq('id', userId);

                await client.from('xp_events').insert({
                    user_id:    userId,
                    event_type: `leaderboard_top${rank <= 5 ? '5' : '10'}_bonus`,
                    points:     bonus
                });

                localStorage.setItem(bonusKey, '1');
                console.log(`[XP] Leaderboard bonus +${bonus} for rank #${rank}`);
            }
        }

        // Update rank card
        setEl('rankVal', `#${rank}`);

    } catch (err) {
        console.error('[Rank] checkLeaderboardBonus error:', err);
    }
}

// ─── 5. ACTIVITY NEBULA CANVAS ───────────────────────────────────────────────
// Draws a 52-week GitHub-style grid on the #nebula canvas
async function drawActivityNebula() {
    const canvas = document.getElementById('nebula');
    if (!canvas) return;

    const ctx    = canvas.getContext('2d');
    const dpr    = window.devicePixelRatio || 1;
    const W      = canvas.offsetWidth;
    const H      = canvas.offsetHeight;
    // Scale canvas for retina/high-DPI screens
    canvas.width  = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width  = W + 'px';
    canvas.style.height = H + 'px';
    ctx.scale(dpr, dpr);

    const WEEKS   = 52;
    const DAYS    = 7;
    const PADDING = { top: 28, left: 32, right: 16, bottom: 16 };
    const GAP     = 3;
    const cellW   = Math.floor((W - PADDING.left - PADDING.right - (WEEKS - 1) * GAP) / WEEKS);
    const cellH   = Math.floor((H - PADDING.top  - PADDING.bottom - (DAYS - 1)  * GAP) / DAYS);
    const cell    = Math.min(cellW, cellH);

    // Load activity data from localStorage + Supabase
    const activityLog = await loadActivityData();

    // Build date array — last 52 weeks
    const dates = [];
    const now   = new Date();
    const start = new Date(now);
    start.setDate(start.getDate() - (WEEKS * 7 - 1));
    // Align to Monday
    start.setDate(start.getDate() - start.getDay() + 1);

    for (let i = 0; i < WEEKS * DAYS; i++) {
        const d = new Date(start);
        d.setDate(start.getDate() + i);
        dates.push(d.toISOString().split('T')[0]);
    }

    // Day labels (Mon, Wed, Fri)
    ctx.fillStyle = 'rgba(255,255,255,0.2)';
    ctx.font      = `bold 9px sans-serif`;
    ['M', 'W', 'F'].forEach((label, i) => {
        const dayIndex = i === 0 ? 0 : i === 1 ? 2 : 4;
        const y = PADDING.top + dayIndex * (cell + GAP) + cell / 2 + 3;
        ctx.fillText(label, 8, y);
    });

    // Month labels
    let lastMonth = -1;
    for (let w = 0; w < WEEKS; w++) {
        const dateStr = dates[w * 7];
        const d       = new Date(dateStr);
        if (d.getMonth() !== lastMonth) {
            lastMonth = d.getMonth();
            const x   = PADDING.left + w * (cell + GAP);
            ctx.fillStyle = 'rgba(255,255,255,0.25)';
            ctx.font      = 'bold 9px sans-serif';
            ctx.fillText(d.toLocaleString('default', { month: 'short' }), x, 14);
        }
    }

    // Draw cells
    dates.forEach((dateStr, i) => {
        const week    = Math.floor(i / 7);
        const day     = i % 7;
        const x       = PADDING.left + week * (cell + GAP);
        const y       = PADDING.top  + day  * (cell + GAP);
        const seconds = activityLog[dateStr] || 0;
        const isToday = dateStr === now.toISOString().split('T')[0];

        // Cell colour based on activity level
        let color;
        if (seconds === 0)          color = 'rgba(255,255,255,0.04)';
        else if (seconds < 600)     color = '#14532d';   // < 10 mins
        else if (seconds < 1800)    color = '#16a34a';   // < 30 mins
        else if (seconds < 3600)    color = '#22c55e';   // < 1 hr
        else                        color = '#4ade80';   // 1hr+

        // Draw rounded cell
        const radius = 2;
        ctx.beginPath();
        ctx.roundRect(x, y, cell, cell, radius);
        ctx.fillStyle = color;
        ctx.fill();

        // Highlight today with blue border
        if (isToday) {
            ctx.strokeStyle = '#3b82f6';
            ctx.lineWidth   = 1.5;
            ctx.stroke();
        }
    });

    console.log('[Nebula] Canvas drawn —', WEEKS, 'weeks');
}

// Load activity data: merge localStorage + Supabase activity_log
async function loadActivityData() {
    // Start with localStorage data
    const local = JSON.parse(localStorage.getItem('user_node_activity') || '{}');

    try {
        const client = await getSupabaseClient();
        const user = await window.AuthState.getUser();
        if (!user) return local;

        // Get last 52 weeks from Supabase
        const since = new Date();
        since.setDate(since.getDate() - 364);

        const { data: rows } = await client
            .from('activity_log')
            .select('log_date, seconds')
            .eq('user_id', user.id)
            .gte('log_date', since.toISOString().split('T')[0]);

        if (rows) {
            rows.forEach(row => {
                // Merge: take the higher value between local and DB
                const localVal = local[row.log_date] || 0;
                local[row.log_date] = Math.max(localVal, row.seconds || 0);
            });
        }

    } catch (err) {
        console.warn('[Nebula] Supabase activity load failed, using localStorage:', err.message);
    }

    return local;
}

// Sync local activity seconds to Supabase (runs every 5 minutes)
async function syncActivityToSupabase() {
    try {
        const client = await getSupabaseClient();
        const user = await window.AuthState.getUser();
        if (!user) return;

        const local = JSON.parse(localStorage.getItem('user_node_activity') || '{}');
        const today = new Date().toISOString().split('T')[0];
        const todaySeconds = local[today] || 0;

        if (todaySeconds === 0) return;

        await client.from('activity_log').upsert({
            user_id:  user.id,
            log_date: today,
            seconds:  todaySeconds
        }, { onConflict: 'user_id,log_date' });

        console.log('[Activity] Synced to Supabase:', todaySeconds, 'seconds');

    } catch (err) {
        console.warn('[Activity] Sync failed:', err.message);
    }
}

// ─── 6. PROJECT STATS INTO OVERVIEW ─────────────────────────────────────────
function loadProjectStatsIntoOverview() {
    const projects = JSON.parse(localStorage.getItem('app_projects') || '[]');

    const deployed = projects.filter(p => p.status === 'success' && p.link && p.link !== '#').length;
    const gigs     = projects.filter(p => p.type === 'Job').length;
    const total    = projects.length;

    setEl('projectCount', total);
    setEl('deployCount',  deployed);
    setEl('gigCount',     gigs);
}

// ─── 7. HELPER: SET ELEMENT TEXT SAFELY ─────────────────────────────────────
function setEl(id, value) {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
}

// ─── 8. MAIN INIT — called by updateView('Overview') ────────────────────────
let _overviewInitialized = false;

async function initOverview() {
    // Prevent re-running XP/streak logic every tab switch
    // Only re-draw the canvas and refresh stats
    const firstRun = !_overviewInitialized;
    _overviewInitialized = true;
    console.log('[Overview] Initialising...');

    // Load instant cached values first (no flicker)
    const cached = JSON.parse(localStorage.getItem('tlp_profile') || '{}');
    if (cached.xt_points !== undefined) {
        setEl('dash-xp-val',    cached.xt_points);
        setEl('streakCount',    cached.streak);
        setEl('dash-level-val', cached.level);
        setEl('semesterVal',    String(cached.semester ?? 1).padStart(3, '0'));
        setEl('rankVal',        `#${cached.rank || 0}`);
    }

    // Load project stats (instant, from localStorage)
    loadProjectStatsIntoOverview();

    // Always refresh stats and nebula
    await Promise.all([
        loadOverviewStats(),
        drawActivityNebula(),
    ]);

    // Only run XP/streak/timers on FIRST load, not every tab switch
    if (firstRun) {
        await recordDailyLogin();
        startHourlyXPTimer();
        setInterval(syncActivityToSupabase, 5 * 60 * 1000);
    }

    console.log('[Overview] Init complete');
}

// ─── EXPOSE GLOBALLY ─────────────────────────────────────────────────────────
// These are called from other modules when events happen
window.awardXP               = awardXP;
window.initOverview          = initOverview;
window.loadProjectStatsIntoOverview = loadProjectStatsIntoOverview;
window.drawActivityNebula    = drawActivityNebula;

// ─── 9. DAILY ACTIVITY BAR + STREAK/RANK MESSAGES ───────────────────────────
// Updates the new UI elements added in the upgraded overview view
function updateOverviewUI(profile, rank) {
    // Daily activity bar — based on seconds logged today vs target (3600s = 1hr = 100%)
    const local     = JSON.parse(localStorage.getItem('user_node_activity') || '{}');
    const today     = new Date().toISOString().split('T')[0];
    const seconds   = local[today] || 0;
    const pct       = Math.min(Math.round((seconds / 28800) * 100), 100); // 8hrs = 100%
    const bar       = document.getElementById('dailyBar');
    const pctEl     = document.getElementById('dailyPct');
    if (bar)   bar.style.width = pct + '%';
    if (pctEl) pctEl.textContent = pct + '%';

    // Streak message
    const streakMsg = document.getElementById('streakMsg');
    if (streakMsg) {
        const s = profile?.streak || 0;
        if      (s === 0)   streakMsg.textContent = 'Log in daily to build your streak';
        else if (s < 3)     streakMsg.textContent = `${s} day streak — keep it going!`;
        else if (s < 7)     streakMsg.textContent = `${s} days strong 🔥`;
        else if (s < 30)    streakMsg.textContent = `${s} day streak — you're on fire!`;
        else                streakMsg.textContent = `${s} days — legendary streak 🏆`;
    }

    // Rank message
    const rankMsg = document.getElementById('rankMsg');
    if (rankMsg && rank) {
        if      (rank === 1)  rankMsg.textContent = '👑 You are #1 on the platform!';
        else if (rank <= 5)   rankMsg.textContent = `Top 5 globally — +200 XP bonus active`;
        else if (rank <= 10)  rankMsg.textContent = `Top 10 globally — +100 XP bonus active`;
        else if (rank <= 50)  rankMsg.textContent = `Rank #${rank} — climb to top 10 for bonuses`;
        else                  rankMsg.textContent = `Earn XP to climb the leaderboard`;
    }
}

// ── LEADERBOARD ENGINE ────────────────────────────────────────────────────────
async function initLeaderboard() {
    const loading = document.getElementById('lb-loading');
    const podium  = document.getElementById('lb-podium');
    const divider = document.getElementById('lb-divider');
    const list    = document.getElementById('lb-list');
    const youEl   = document.getElementById('lb-you');
    if (!podium) return;

    try {
        const client = await getSupabaseClient();
        const user   = await window.AuthState.getUser();
        const myId   = user?.id;

        // Fetch ALL users ordered by XP — use profiles directly (not leaderboard view)
        const { data: allUsers } = await client
            .from('profiles')
            .select('id, full_name, xt_points, level, semester, avatar_url')
            .order('xt_points', { ascending: false })
            .limit(100);

        if (loading) loading.style.display = 'none';

        if (!allUsers?.length) {
            podium.innerHTML = '<p class="text-white/30 text-center text-xs py-10">No rankings yet.</p>';
            podium.classList.remove('hidden');
            return;
        }

        // Assign ranks based on sorted order
        const ranked = allUsers.map((u, i) => ({ ...u, rank: i + 1 }));
        const myEntry = ranked.find(u => u.id === myId);
        const myRank  = myEntry?.rank || null;
        const iAmInTopList = myRank !== null && myRank <= 20;

        // ── PODIUM — Top 3 (classic podium: 2nd left, 1st center, 3rd right) ──
        const top3 = ranked.slice(0, 3);
        // Reorder for podium: [2nd, 1st, 3rd]
        const podiumOrder = top3.length === 1
            ? [null, top3[0], null]
            : top3.length === 2
            ? [top3[1], top3[0], null]
            : [top3[1], top3[0], top3[2]];

        const podiumConfig = [
            { medal: '🥈', color: 'from-slate-400/20 to-slate-600/10', border: 'border-slate-400/30',
              text: 'text-slate-300', height: 'h-24', rank: 2 },
            { medal: '🥇', color: 'from-yellow-400/20 to-yellow-600/10', border: 'border-yellow-400/40',
              text: 'text-yellow-400', height: 'h-32', rank: 1 },
            { medal: '🥉', color: 'from-amber-600/20 to-amber-800/10', border: 'border-amber-600/30',
              text: 'text-amber-500', height: 'h-20', rank: 3 },
        ];

        podium.innerHTML = `
            <div class="flex items-end justify-center gap-3 pt-4 pb-2">
                ${podiumOrder.map((u, i) => {
                    const cfg = podiumConfig[i];
                    if (!u) return `<div class="flex-1 max-w-[140px]"></div>`;
                    const isMe = u.id === myId;
                    return `
                    <div class="flex-1 max-w-[160px] flex flex-col items-center">
                        <!-- Avatar + name above podium block -->
                        <div class="flex flex-col items-center mb-2 ${i === 1 ? 'scale-110' : ''}">
                            <span class="text-xl mb-1">${cfg.medal}</span>
                            <div class="w-14 h-14 rounded-2xl border-2 ${cfg.border} overflow-hidden
                                flex items-center justify-center bg-white/5
                                ${isMe ? 'ring-2 ring-blue-500 ring-offset-2 ring-offset-[#050b1d]' : ''}">
                                ${u.avatar_url
                                    ? `<img src="${u.avatar_url}" class="w-full h-full object-cover">`
                                    : `<i class="fas fa-user ${cfg.text} text-xl"></i>`}
                            </div>
                            <p class="text-white font-black text-[10px] uppercase mt-2 text-center truncate w-full px-1">
                                ${u.full_name?.split(' ')[0] || 'Student'}
                                ${isMe ? '<br><span class="text-blue-400 text-[8px]">You</span>' : ''}
                            </p>
                            <p class="${cfg.text} font-black text-[9px] mt-0.5">${(u.xt_points||0).toLocaleString()} XP</p>
                        </div>
                        <!-- Podium block -->
                        <div class="w-full ${cfg.height} rounded-t-2xl bg-gradient-to-b ${cfg.color}
                            border-t-2 border-l border-r ${cfg.border} flex items-start justify-center pt-2">
                            <span class="${cfg.text} font-black text-lg">#${cfg.rank}</span>
                        </div>
                    </div>`;
                }).join('')}
            </div>`;
        podium.classList.remove('hidden');

        // ── LIST — Ranks 4 to 20 ─────────────────────────────────────────────
        const rest = ranked.slice(3, 20);
        if (rest.length) {
            divider.classList.remove('hidden');
            list.innerHTML = rest.map(u => {
                const isMe = u.id === myId;
                return `
                <div class="flex items-center justify-between px-4 py-3 rounded-2xl border transition-all
                    ${isMe
                        ? 'bg-blue-500/10 border-blue-500/30'
                        : 'bg-white/[0.02] border-white/5 hover:bg-white/5 hover:border-white/10'}">
                    <div class="flex items-center gap-3">
                        <span class="text-white/40 font-black text-xs w-7 text-center">#${u.rank}</span>
                        <div class="w-8 h-8 rounded-xl bg-white/5 border border-white/10
                            flex items-center justify-center overflow-hidden">
                            ${u.avatar_url
                                ? `<img src="${u.avatar_url}" class="w-full h-full object-cover">`
                                : `<i class="fas fa-user text-white/20 text-[10px]"></i>`}
                        </div>
                        <div>
                            <p class="text-white font-bold text-xs">
                                ${u.full_name || 'Student'}
                                ${isMe ? '<span class="text-blue-400 text-[9px] ml-1">(You)</span>' : ''}
                            </p>
                            <p class="text-white/20 text-[9px]">Lv ${u.level||100} · ${(u.xt_points||0).toLocaleString()} XP</p>
                        </div>
                    </div>
                    <span class="text-blue-400/60 font-black text-[10px]">${(u.xt_points||0).toLocaleString()} XP</span>
                </div>`;
            }).join('');
            list.classList.remove('hidden');
        }

        // ── YOUR CARD — pinned at bottom if outside top 20 ───────────────────
        if (myEntry && !iAmInTopList) {
            youEl.innerHTML = `
                <div class="space-y-3">
                    <div class="flex items-center gap-3">
                        <div class="flex-1 h-px bg-white/5"></div>
                        <span class="text-white/20 text-[9px] font-black uppercase tracking-widest">Your Position</span>
                        <div class="flex-1 h-px bg-white/5"></div>
                    </div>
                    <div class="flex items-center justify-between px-4 py-3 rounded-2xl
                        bg-blue-500/10 border border-blue-500/30 ring-1 ring-blue-500/10">
                        <div class="flex items-center gap-3">
                            <span class="text-blue-400 font-black text-sm w-7 text-center">#${myRank}</span>
                            <div class="w-8 h-8 rounded-xl bg-white/5 border border-blue-500/20
                                flex items-center justify-center overflow-hidden">
                                ${myEntry.avatar_url
                                    ? `<img src="${myEntry.avatar_url}" class="w-full h-full object-cover">`
                                    : `<i class="fas fa-user text-blue-400/40 text-[10px]"></i>`}
                            </div>
                            <div>
                                <p class="text-white font-bold text-xs">
                                    ${myEntry.full_name || 'You'}
                                    <span class="text-blue-400 text-[9px] ml-1">(You)</span>
                                </p>
                                <p class="text-white/20 text-[9px]">Lv ${myEntry.level||100} · Sem ${String(myEntry.semester||1).padStart(3,'0')}</p>
                            </div>
                        </div>
                        <div class="text-right">
                            <p class="text-blue-400 font-black text-[11px]">${(myEntry.xt_points||0).toLocaleString()} XP</p>
                            <p class="text-white/20 text-[9px]">Earn XP to climb ↑</p>
                        </div>
                    </div>
                </div>`;
            youEl.classList.remove('hidden');
        }

    } catch(err) {
        if (loading) loading.innerHTML = `<p class="text-red-400 text-center text-sm py-10">${err.message}</p>`;
        console.error('[Leaderboard]', err);
    }
}

window.initLeaderboard = initLeaderboard;
