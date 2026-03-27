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

        // Get user's rank from leaderboard view
        const { data: rankData } = await client
            .from('leaderboard')
            .select('rank')
            .eq('id', user.id)
            .maybeSingle();

        const rank = rankData?.rank || 0;

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
    register:         10,
    daily_login:       5,
    complete_lesson:  10,
    pass_exam:        30,
    add_project:      30,
    hourly_active:    20,
};

async function awardXP(eventType) {
    const points = XP_TABLE[eventType];
    if (!points) return console.warn('[XP] Unknown event:', eventType);

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

        const newPoints = (profile?.xt_points || 0) + points;

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
        const { data: rankData } = await client
            .from('leaderboard')
            .select('rank')
            .eq('id', userId)
            .maybeSingle();

        const rank = rankData?.rank;
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
    const W      = canvas.offsetWidth;
    const H      = canvas.offsetHeight;
    canvas.width  = W;
    canvas.height = H;

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
async function initOverview() {
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

    // Run async tasks in parallel
    await Promise.all([
        loadOverviewStats(),      // fresh data from Supabase
        recordDailyLogin(),       // streak + login XP
        drawActivityNebula(),     // canvas grid
    ]);

    // Start hourly XP timer
    startHourlyXPTimer();

    // Sync activity to Supabase every 5 minutes
    setInterval(syncActivityToSupabase, 5 * 60 * 1000);

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
    const pct       = Math.min(Math.round((seconds / 3600) * 100), 100);
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
    const loading = document.getElementById('leaderboard-loading');
    const top5    = document.getElementById('leaderboard-top5');
    const rest    = document.getElementById('leaderboard-rest');
    if (!top5 || !rest) return;

    try {
        const client = await getSupabaseClient();
        const user   = await window.AuthState.getUser();

        const { data: rows } = await client
            .from('profiles')
            .select('id, full_name, xt_points, level, semester, avatar_url')
            .order('xt_points', { ascending: false })
            .limit(20);

        if (loading) loading.style.display = 'none';
        if (!rows?.length) {
            top5.innerHTML = '<p class="text-white/30 text-center col-span-5 text-xs py-10">No rankings yet.</p>';
            return;
        }

        const myId = user?.id;

        top5.innerHTML = rows.slice(0,5).map((u, i) => {
            const rank  = i + 1;
            const rc    = rank===1?'text-yellow-400':rank===2?'text-slate-300':rank===3?'text-amber-600':'text-white/40';
            const isMe  = u.id === myId;
            return `
            <div class="relative group ${isMe?'ring-2 ring-blue-500 rounded-[2rem]':''}">
                <div class="absolute -top-3 -left-3 w-8 h-8 rounded-xl bg-[#0a0f25] border border-white/10 flex items-center justify-center z-10 shadow-xl">
                    <span class="text-[10px] font-black ${rc}">${rank}</span>
                </div>
                <div class="bg-white/5 border border-white/10 rounded-[2rem] p-6 flex flex-col items-center text-center transition-all group-hover:bg-white/[0.08] group-hover:border-blue-500/30 group-hover:-translate-y-1">
                    <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/5 mb-3 flex items-center justify-center overflow-hidden">
                        ${u.avatar_url?`<img src="${u.avatar_url}" class="w-full h-full object-cover">`:`<i class="fas fa-user text-white/20 text-lg"></i>`}
                    </div>
                    <p class="text-white font-black text-xs truncate w-full">${u.full_name||'Student'}</p>
                    <p class="text-blue-400/60 text-[9px] font-bold mt-1">${u.xt_points||0} XP</p>
                    ${isMe?'<span class="text-[8px] text-blue-400 font-black mt-1">YOU</span>':''}
                </div>
            </div>`;
        }).join('');

        if (rows.length > 5) {
            rest.innerHTML = `
                <div class="flex justify-between px-8 text-[9px] font-black text-white/20 uppercase tracking-widest mb-2">
                    <span>Participant</span><span>XP</span><span>Rank</span>
                </div>
                <div class="space-y-2">
                ${rows.slice(5).map((u, i) => {
                    const rank = i + 6;
                    const isMe = u.id === myId;
                    return `
                    <div class="flex items-center justify-between p-4 px-8 rounded-2xl transition-all
                        ${isMe?'bg-blue-500/10 border border-blue-500/20':'bg-white/[0.02] border border-white/5 hover:bg-white/5 hover:border-white/10'}">
                        <div class="flex items-center gap-4">
                            <div class="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center overflow-hidden">
                                ${u.avatar_url?`<img src="${u.avatar_url}" class="w-full h-full object-cover">`:`<i class="fas fa-user text-[10px] text-white/20"></i>`}
                            </div>
                            <div>
                                <p class="text-white font-bold text-xs">${u.full_name||'Student'} ${isMe?'<span class="text-blue-400 text-[8px]">(you)</span>':''}</p>
                                <p class="text-white/30 text-[9px]">Lv ${u.level||100} · Sem ${String(u.semester||1).padStart(3,'0')}</p>
                            </div>
                        </div>
                        <span class="text-blue-400/60 font-bold text-xs">${u.xt_points||0} XP</span>
                        <span class="text-white/30 font-black text-xs italic">#${rank}</span>
                    </div>`;
                }).join('')}
                </div>`;
        }
    } catch(err) {
        if (loading) loading.innerHTML = `<p class="text-red-400 text-sm text-center">${err.message}</p>`;
    }
}
window.initLeaderboard = initLeaderboard;
