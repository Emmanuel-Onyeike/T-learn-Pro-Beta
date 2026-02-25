/* ── T LEARN PRO: js/modules/overview.js ────────────────────────────────────
   Overview Engine — powers ALL live stats on the Overview tab
   Handles: XT Points, Streak, Rank, Level, Semester, Activity Nebula canvas
   Syncs with Supabase profiles + activity_log + xp_events tables
────────────────────────────────────────────────────────────────────────────── */

// ─── SUPABASE CLIENT HELPER ──────────────────────────────────────────────────
async function getSupabaseClient() {
    if (window._sbClient) return window._sbClient;
    const { createClient } = await import('https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm');
    window._sbClient = createClient(CONFIG.SUPABASE_URL, CONFIG.SUPABASE_ANON_KEY);
    return window._sbClient;
}

// ─── 1. LOAD PROFILE FROM SUPABASE ──────────────────────────────────────────
// Pulls xt_points, streak, level, semester, rank from DB and updates all cards
async function loadOverviewStats() {
    try {
        const client = await getSupabaseClient();
        const { data: { user } } = await client.auth.getUser();
        if (!user) return;

        // Get profile data
        const { data: profile, error } = await client
            .from('profiles')
            .select('xt_points, streak, level, semester')
            .eq('id', user.id)
            .single();

        if (error || !profile) {
            console.warn('[Overview] Profile load failed:', error?.message);
            return;
        }

        // Get user's rank from leaderboard view
        const { data: rankData } = await client
            .from('leaderboard')
            .select('rank')
            .eq('id', user.id)
            .single();

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

    } catch (err) {
        console.error('[Overview] loadOverviewStats error:', err);

        // Fallback: use cached local data if Supabase fails
        const cached = JSON.parse(localStorage.getItem('tlp_profile') || '{}');
        if (cached.xt_points !== undefined) {
            setEl('dash-xp-val',    cached.xt_points);
            setEl('streakCount',    cached.streak);
            setEl('dash-level-val', cached.level);
            setEl('semesterVal',    String(cached.semester).padStart(3, '0'));
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
        const { data: { user } } = await client.auth.getUser();
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
            .single();

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
        const { data: { user } } = await client.auth.getUser();
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
            .single();

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
            .single();

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
        const { data: { user } } = await client.auth.getUser();
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
        const { data: { user } } = await client.auth.getUser();
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
        setEl('semesterVal',    String(cached.semester).padStart(3, '0'));
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

