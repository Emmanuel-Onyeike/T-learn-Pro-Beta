#!/bin/bash
# ============================================================
# T-Learn Pro — Overview Engine Install
# Installs: XT Points, Streak, Rank, Activity Nebula, Stats
# Run from inside your T-learn-Pro-Beta/ root
# Usage: bash install_overview.sh
# ============================================================
set -e
GREEN='\033[0;32m'; BLUE='\033[0;34m'; YELLOW='\033[1;33m'; RED='\033[0;31m'; NC='\033[0m'

echo ""
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}  T-LEARN PRO — Overview Engine Install${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

if [ ! -d "js" ] || [ ! -d "pages" ]; then
  echo -e "${RED}ERROR: Run from inside T-learn-Pro-Beta/${NC}"; exit 1
fi

echo -e "${YELLOW}[1/3] Backing up originals...${NC}"
[ -f "js/modules/overview.js" ]  && cp js/modules/overview.js js/modules/overview.js.bak  && echo -e "  ${GREEN}✓${NC} overview.js.bak"
[ -f "js/dashboard.js" ]         && cp js/dashboard.js js/dashboard.js.bak               && echo -e "  ${GREEN}✓${NC} dashboard.js.bak"
[ -f "pages/dashboard.html" ]    && cp pages/dashboard.html pages/dashboard.html.bak      && echo -e "  ${GREEN}✓${NC} dashboard.html.bak"
[ -f "js/modules/proj.js" ]      && cp js/modules/proj.js js/modules/proj.js.bak          && echo -e "  ${GREEN}✓${NC} proj.js.bak"
[ -f "js/modules/lms.js" ]       && cp js/modules/lms.js js/modules/lms.js.bak            && echo -e "  ${GREEN}✓${NC} lms.js.bak"

echo ""
echo -e "${YELLOW}[2/3] Writing files...${NC}"

cat > "js/modules/overview.js" << 'OVEOF_JS_MODULES_OVERVIEW_JS'
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

OVEOF_JS_MODULES_OVERVIEW_JS
echo -e "  ${GREEN}✓${NC} js/modules/overview.js"

cat > "js/dashboard.js" << 'OVEOF_JS_DASHBOARD_JS'
const ActivityEngine = {
    track() {
        const today = new Date().toISOString().split('T')[0];
        setInterval(() => {
            let log = JSON.parse(localStorage.getItem('user_node_activity') || '{}');
            log[today] = (log[today] || 0) + 1; // Tracks seconds
            localStorage.setItem('user_node_activity', JSON.stringify(log));
        }, 60000); // FIX: was 1000ms (every second) — now 60000ms (every minute)
    },

    // Decides box thickness based on time spent
    getBoxClass(date) {
        const log = JSON.parse(localStorage.getItem('user_node_activity') || '{}');
        const seconds = log[date] || 0;
        if (seconds === 0) return 'bg-white/[0.03]'; // No activity
        if (seconds < 60) return 'bg-green-900';    // < 1 min
        if (seconds < 600) return 'bg-green-700';   // < 10 mins
        if (seconds < 1800) return 'bg-green-500';  // < 30 mins
        return 'bg-green-400';                      // Long stay
    }
};

ActivityEngine.track();

// ─────────────────────────────────────────────────────────────────────────────
// VIEWS — populated by js/views/*.js files loaded before this script
// Each view file does: views['Name'] = `...html...`;
// ─────────────────────────────────────────────────────────────────────────────
const views = {};

// ─────────────────────────────────────────────────────────────────────────────
// ROUTER — FIX: view cache so HTML is only built once per visit
// ─────────────────────────────────────────────────────────────────────────────
const _viewCache = {};

function updateView(viewName) {
    const title     = document.getElementById('viewTitle');
    const container = document.getElementById('dynamicContent');

    container.style.opacity   = '0';
    container.style.transform = 'translateY(10px)';

    setTimeout(() => {
        title.innerText = viewName;

        // FIX: Views with live data must never be served from cache
        const NO_CACHE = ['Projects', 'Overview', 'Notifications', 'Settings'];
        const useCache = !NO_CACHE.includes(viewName);

        if (useCache && _viewCache[viewName]) {
            container.innerHTML = _viewCache[viewName];
        } else {
            container.innerHTML = views[viewName] || `
                <div class="content-card text-center py-20">
                    <i class="fas fa-tools text-4xl text-blue-500/20 mb-6"></i>
                    <h3 class="text-2xl font-black text-white italic uppercase tracking-tighter">${viewName} Module</h3>
                    <p class="text-gray-500 text-[10px] font-black uppercase tracking-widest mt-2">Under Development</p>
                </div>
            `;
            if (useCache) _viewCache[viewName] = container.innerHTML;
        }

        container.style.opacity   = '1';
        container.style.transform = 'translateY(0px)';

        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.toggle('active', item.innerText.includes(viewName));
        });

        // Overview — full engine init (stats, nebula, streak, XP)
        if (viewName === 'Overview') {
            requestAnimationFrame(() => {
                if (typeof initOverview === 'function') initOverview();
            });
        }

        // FIX: lazy-init LMS — only when on Lessons tab
        if (viewName === 'Lessons') {
            requestAnimationFrame(() => {
                if (typeof initLMS === 'function') initLMS();
            });
        }

        // FIX: Projects — always reload from localStorage and re-render on every visit
        if (viewName === 'Projects') {
            requestAnimationFrame(() => {
                loadProjects();
                updateUI();
            });
        }

        // FIX: Settings — re-render project list when Settings tab opens
        if (viewName === 'Settings') {
            requestAnimationFrame(() => {
                updateSettingsTab('Profile');
                syncProfileUI();
            });
        }

        // Xt Pay build stream — lazy start
        if (viewName === 'Xt Pay') {
            requestAnimationFrame(() => {
                if (typeof NxxtDashboard !== 'undefined') {
                    // FIX: now called lazily when user opens Xt Pay tab (see updateView)
                }
            });
        }

    }, 200);
}

// renderTab was called in Notifications view but never defined — now aliased
const renderTab = updateView;

// Initial Setup
const d = new Date();
document.getElementById('currentDate').innerText = d.toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
});
updateView('Overview');

OVEOF_JS_DASHBOARD_JS
echo -e "  ${GREEN}✓${NC} js/dashboard.js"

cat > "pages/dashboard.html" << 'OVEOF_PAGES_DASHBOARD_HTML'
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard | T Learn Pro</title>
    <!-- LOCAL TAILWIND (was CDN — removed network roundtrip + render-blocking) -->
    <script src="../js/tailwind.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css">

    <link rel="stylesheet" href="../css/dashboard.css">
    <link rel="icon" type="image/png" href="../assets/Logo.webp" />

    <script src="../js/config.js"></script>
    <script src="../js/supabase-loader.js"></script>
    <script src="../js/messages.js"></script>
    <script src="../js/utilities.js"></script>

    <style>
        /* Unified Animations */
        @keyframes scan-line {
            0% { transform: translateY(-100%); }
            100% { transform: translateY(100%); }
        }
        @keyframes shimmer-move {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
        }
        @keyframes fall {
            from { transform: translateY(-10vh) translateX(0) rotate(0deg); opacity: 0; }
            20% { opacity: 1; }
            to { transform: translateY(110vh) translateX(40px) rotate(360deg); opacity: 0; }
        }
        
        .animate-scan { animation: scan-line 3s linear infinite; }
        .animate-shimmer-fast { animation: shimmer-move 1.5s infinite; }
        .animate-shimmer-slow { animation: shimmer-move 2s infinite; }
        .star { position: absolute; background: white; border-radius: 50%; pointer-events: none; animation: fall linear infinite; }
        
        /* Navigation Enhancement Classes */
        .nav-item {
            @apply relative flex items-center gap-4 px-6 py-3 text-sm font-medium text-gray-400 transition-all duration-300 cursor-pointer overflow-hidden border-y border-transparent;
        }
        .nav-item i { @apply text-base w-5 transition-transform duration-300; }
        .nav-item:hover { @apply bg-white/5 text-white; }
        .nav-indicator { @apply absolute left-0 w-1 h-0 bg-blue-600 transition-all duration-300 rounded-r-full; }
        .nav-item:hover .nav-indicator, .nav-item.active .nav-indicator { @apply h-6; }
        .nav-item.active { @apply bg-blue-500/10 text-blue-400 border-y-white/5; }
        .nav-item.active .nav-indicator { @apply h-6 shadow-[0_0_15px_#3b82f6]; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        * { -webkit-tap-highlight-color: transparent; }
    </style>
</head>
<body class="bg-[#020617] text-gray-200 font-sans">

<header class="lg:hidden sticky top-0 z-[100] w-full bg-[#020617]/80 backdrop-blur-xl border-b border-white/10 px-6 py-4 flex items-center justify-between">
    <div class="flex items-center gap-4">
        <div class="relative">
            <div class="absolute -inset-1 bg-blue-500/20 blur-md rounded-full"></div>
            <img alt="logo" src="../assets/Logo.webp" class="relative w-9 h-9 rounded-xl border border-white/10 shadow-lg">
        </div>
        <div class="flex flex-col">
            <h1 class="text-base font-[1000] tracking-tighter text-white leading-none uppercase italic">
                T-LEARN <span class="text-blue-500">PRO</span>
            </h1>
            <div class="flex items-center gap-2 mt-1">
                <span class="text-[8px] font-black uppercase tracking-[0.3em] text-blue-400/70">EST 2026</span>
                <div class="h-[2px] w-8 bg-white/5 rounded-full overflow-hidden">
                    <div class="h-full w-full bg-blue-600 animate-shimmer-fast"></div>
                </div>
            </div>
        </div>
    </div>
    <div class="flex items-center gap-2">
        <div class="hidden xs:flex items-center gap-1.5 px-2 py-1 rounded-md bg-white/5 border border-white/5 mr-2">
            <div class="w-1 h-1 bg-emerald-500 rounded-full animate-pulse"></div>
            <span class="text-[7px] font-bold text-gray-500 uppercase tracking-widest">Live</span>
        </div>
        <button onclick="updateView('Notifications')" class="relative w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 active:scale-90 transition-transform">
            <i class="fa-regular fa-bell text-lg text-gray-300"></i>
            <span class="absolute top-2.5 right-2.5 flex h-2 w-2">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span class="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
            </span>
        </button>
    </div>
</header>

<aside id="sidebar" class="fixed inset-y-0 left-0 w-72 bg-[#020617] border-r border-white/5 p-8 hidden lg:flex flex-col z-[60]">
    <div class="flex items-center gap-6 mb-12 group">
        <div class="relative flex-shrink-0">
            <div class="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl blur opacity-20 group-hover:opacity-50 transition duration-1000 animate-pulse"></div>
            <div class="relative flex items-center justify-center w-14 h-14 bg-[#050b1d] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
                <img alt="logo" src="../assets/Logo.webp" class="w-10 h-10 object-contain z-10 transition-transform duration-500 group-hover:scale-110">
                <div class="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/10 to-transparent h-full w-full animate-scan"></div>
            </div>
        </div>
        <div class="flex flex-col">
            <h2 class="text-2xl font-[1000] tracking-[-0.05em] text-white leading-none uppercase italic">
                T-LEARN <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 font-black">PRO</span>
            </h2>
            <div class="flex items-center gap-3 mt-2">
                <span class="text-[10px] font-black text-gray-500 uppercase tracking-[0.5em]">V. <span class="text-blue-500/80">2026</span></span>
                <div class="relative h-[2px] w-20 bg-white/5 overflow-hidden rounded-full">
                    <div class="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500 to-transparent animate-shimmer-slow"></div>
                </div>
            </div>
        </div>
    </div>

    <nav class="flex-1 space-y-6 overflow-y-auto no-scrollbar pb-20">
        <div class="space-y-1">
            <p class="text-[9px] font-black text-gray-600 uppercase tracking-[0.3em] mb-4 ml-4">Academy</p>
            <a onclick="updateView('Overview')" class="nav-item active"><div class="nav-indicator"></div><i class="fas fa-home"></i> Overview</a>
            <a onclick="updateView('Lessons')" class="nav-item"><div class="nav-indicator"></div><i class="fas fa-book-open"></i> Lessons</a>
            <a onclick="updateView('Projects')" class="nav-item"><div class="nav-indicator"></div><i class="fas fa-code-branch"></i> Projects</a>
            <a onclick="updateView('Leaderboard')" class="nav-item"><div class="nav-indicator"></div><i class="fas fa-trophy"></i> Leaderboard</a>
        </div>

        <div class="space-y-1">
            <p class="text-[9px] font-black text-gray-600 uppercase tracking-[0.3em] mb-4 ml-4">Community</p>
            <a onclick="updateView('Collaboration')" class="nav-item"><div class="nav-indicator"></div><i class="fas fa-handshake"></i> Collaboration</a>
            <a onclick="updateView('Team')" class="nav-item"><div class="nav-indicator"></div><i class="fas fa-users"></i> Team</a>
            <a onclick="updateView('Inbox')" class="nav-item"><div class="nav-indicator"></div><i class="fas fa-envelope"></i> Inbox</a>
        </div>

        <div class="space-y-1">
            <p class="text-[9px] font-black text-gray-600 uppercase tracking-[0.3em] mb-4 ml-4">Innovation</p>
            <a onclick="updateView('Nxxt AI')" class="nav-item text-blue-400 font-black"><div class="nav-indicator !bg-blue-400"></div><i class="fas fa-robot"></i> Nxxt AI</a>
            <a onclick="updateView('Nxxt Lab')" class="nav-item"><div class="nav-indicator"></div><i class="fas fa-flask"></i> Nxxt Lab</a>
            <a onclick="updateView('Side Hustle Hub')" class="nav-item text-orange-400"><div class="nav-indicator !bg-orange-400"></div><i class="fas fa-rocket"></i> Side Hustle Hub</a>
            <a onclick="updateView('Deploy')" class="nav-item text-green-500 hover:text-green-400 cursor-pointer"><div class="nav-indicator !bg-green-500"></div><i class="fas fa-cloud-upload-alt"></i> Deploy</a>
        </div>

        <div class="space-y-1">
            <p class="text-[9px] font-black text-gray-600 uppercase tracking-[0.3em] mb-4 ml-4">Account</p>
            <a onclick="updateView('Xt Pay')" class="nav-item text-green-500"><div class="nav-indicator !bg-green-500"></div><i class="fas fa-wallet"></i> Xt Pay</a>
            <a onclick="updateView('Pricing')" class="nav-item"><div class="nav-indicator"></div><i class="fas fa-tags"></i> Pricing</a>
            <a onclick="updateView('Settings')" class="nav-item"><div class="nav-indicator"></div><i class="fas fa-sliders"></i> Settings</a>
        </div>
    </nav>

    <div class="mt-auto pt-6 border-t border-white/5">
        <div class="flex items-center gap-4 px-2 py-2">
            <div class="relative">
                <img src="../assets/Logo.webp" data-user-img data-user-name-alt alt="User" class="w-11 h-11 rounded-xl object-cover border border-white/10 shadow-lg">
                <span class="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-[#020617] rounded-full"></span>
            </div>
            <div class="flex flex-col min-w-0">
                <p data-user-name class="text-white font-bold text-sm italic uppercase">Loading...</p>
                <span class="text-[8px] font-bold text-blue-500 uppercase tracking-[0.2em] flex items-center gap-1">
                    <i class="fas fa-leaf text-[7px]"></i> Beginner
                </span>
            </div>
            <button onclick="handleLogout()" class="ml-auto text-gray-600 hover:text-red-500 transition-colors" title="Logout">
                <i class="fas fa-sign-out-alt text-[10px]"></i>
            </button>
        </div>
    </div>
</aside>

<main class="lg:ml-72 p-6 md:p-12 pb-32 lg:pb-12 min-h-screen">
    <header class="mb-12 flex justify-between items-end">
        <div>
            <span id="greetingText" class="text-[10px] font-black text-blue-500 uppercase tracking-[0.3em] mb-2 block">Initializing...</span>
            <h1 id="viewTitle" class="text-5xl font-black text-white italic tracking-tighter uppercase">Overview</h1>
        </div>
        <div class="hidden lg:flex items-center gap-6">
            <button onclick="updateView('Notifications')" class="relative p-3 bg-white/5 rounded-xl border border-white/10 text-gray-400 hover:text-white transition-all">
                <i class="fa-regular fa-bell text-xl"></i>
                <span class="absolute top-2 right-2 w-2 h-2 bg-blue-600 rounded-full animate-pulse"></span>
            </button>
            <div class="flex items-center gap-4">
                <div class="text-right">
                    <p data-user-name class="text-white font-bold text-sm italic uppercase">Loading...</p>
                    <p id="currentDate" class="text-[9px] text-gray-500 font-bold uppercase tracking-widest">Loading...</p>
                </div>
                <div class="w-12 h-12 bg-white/5 rounded-2xl border border-white/10 flex items-center justify-center overflow-hidden">
                    <i class="fas fa-user-graduate text-blue-500"></i>
                </div>
            </div>
        </div>
    </header>

    <div id="mobileMenu" class="fixed inset-0 z-[200] invisible">
        <div id="menuOverlay" class="absolute inset-0 bg-[#020617]/90 backdrop-blur-md opacity-0 transition-opacity duration-300"></div>
        <div id="menuDrawer" class="absolute inset-y-0 left-0 w-[80%] max-w-sm bg-[#030816] border-r border-white/5 p-8 transform -translate-x-full transition-transform duration-300 ease-out flex flex-col">
            <div class="flex items-center justify-between mb-12">
                <div class="flex items-center gap-3">
                    <img alt="logo" src="../assets/Logo.webp" data-user-img class="w-8 h-8 rounded-lg object-cover border border-white/5">
                    <h2 class="text-lg font-black tracking-tighter text-white">MENU</h2>
                </div>
                <button onclick="closeFullMenu()" class="text-gray-500 hover:text-white">
                    <i class="fas fa-times text-xl"></i>
                </button>
            </div>
            <nav id="mobileNavLinks" class="flex-1 space-y-4 overflow-y-auto no-scrollbar pb-10"></nav>
            <div class="mt-auto pt-6 border-t border-white/5 text-center">
                <p class="text-[8px] font-black text-gray-700 uppercase tracking-widest">T Learn Pro v1.0</p>
            </div>
        </div>
    </div>

    <div id="alertModal" class="fixed inset-0 z-[999] flex items-center justify-center invisible p-6">
        <div id="alertOverlay" class="absolute inset-0 bg-black/60 backdrop-blur-sm opacity-0 transition-opacity duration-300"></div>
        <div id="alertBox" class="relative bg-[#030816] border border-white/10 p-8 rounded-[2.5rem] max-w-sm w-full text-center transform scale-90 opacity-0 transition-all duration-300 shadow-2xl">
            <div id="alertIcon" class="w-16 h-16 bg-blue-600/20 rounded-2xl flex items-center justify-center mx-auto mb-6 text-blue-500">
                <i class="fas fa-check text-2xl"></i>
            </div>
            <h3 id="alertTitle" class="text-xl font-black text-white italic uppercase tracking-tighter">System Alert</h3>
            <p id="alertMsg" class="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-2 leading-relaxed"></p>
            <button onclick="closeAlert()" class="mt-8 w-full py-4 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest text-white hover:bg-white hover:text-black transition-all">
                Dismiss
            </button>
        </div>
    </div>

    <div id="payment-modal" class="fixed top-0 right-0 h-full w-full md:w-[400px] bg-[#050b1d] border-l border-white/10 z-[2000000] translate-x-full transition-transform duration-500 ease-in-out shadow-[-20px_0_50px_rgba(0,0,0,0.5)] flex flex-col">
        <div class="p-8 border-b border-white/5 flex items-center justify-between">
            <h3 class="text-white font-black uppercase italic tracking-tighter text-xl">Payment Gateway</h3>
            <button onclick="closePaymentModal()" class="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-red-500 transition-all">
                <i class="fas fa-times"></i>
            </button>
        </div>
        <div class="flex-grow flex flex-col items-center justify-center p-10 text-center">
            <div class="w-24 h-24 bg-blue-600/10 rounded-[2.5rem] flex items-center justify-center mb-8 border border-blue-500/20 animate-pulse">
                <i class="fas fa-microchip text-blue-500 text-4xl"></i>
            </div>
            <h4 id="active-plan-title" class="text-blue-400 font-black uppercase italic text-sm tracking-widest mb-2">Initialize Protocol</h4>
            <h2 class="text-white font-black uppercase text-2xl tracking-tighter mb-6">Working on payment gateway</h2>
            <p class="text-gray-500 text-[10px] font-bold uppercase tracking-[0.3em] leading-relaxed">
                Our secure transaction layer is currently being synchronized with global banking nodes.
                <br><br>
                <span class="text-blue-500/50">Check back later for full deployment.</span>
            </p>
        </div>
        <div class="p-8 bg-black/20">
            <div class="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-dashed border-white/10 mb-6">
                <i class="fas fa-shield-check text-green-500"></i>
                <p class="text-[8px] text-gray-500 font-black uppercase tracking-widest">Encrypted SSL V3 Active</p>
            </div>
            <button onclick="closePaymentModal()" class="w-full py-5 bg-white text-black rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all">
                Acknowledge
            </button>
        </div>
    </div>


    <div id="centralModal" class="hidden fixed inset-0 z-[999] flex items-center justify-center bg-black/80 backdrop-blur-sm">
    <div class="bg-[#0a0a0a] border border-blue-500/30 p-8 rounded-[2rem] text-center max-w-[280px] shadow-[0_0_50px_rgba(37,99,235,0.2)]">
        <div class="w-12 h-12 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <i class="fas fa-shield-halved text-blue-500 text-xl"></i>
        </div>
        <h2 class="text-white font-black text-[10px] tracking-widest uppercase mb-2">System Alert</h2>
        <p id="modalText" class="text-white/60 font-mono text-[11px] leading-relaxed mb-6"></p>
        <button onclick="closeModal()" class="w-full py-3 bg-blue-600 text-white text-[10px] font-bold rounded-xl hover:bg-blue-500 transition-colors uppercase tracking-widest">
            Acknowledge
        </button>
    </div>
</div>
    <div id="dynamicContent" class="space-y-8 animate-in"></div>
</main>

    
<div class="lg:hidden fixed bottom-6 left-0 w-full px-4 z-[100]">
    <nav class="mx-auto max-w-md bg-[#050b1d]/80 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] px-6 py-3 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex justify-between items-center relative overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-t from-blue-500/5 to-transparent pointer-events-none"></div>
        <button onclick="updateView('Overview')" class="relative flex flex-col items-center gap-1 group transition-all duration-300">
            <div class="absolute -top-3 w-4 h-1 bg-blue-500 rounded-full shadow-[0_0_10px_#3b82f6] opacity-100"></div>
            <i class="fas fa-home text-lg text-blue-500"></i>
            <span class="text-[7px] font-black uppercase tracking-widest text-blue-500">Node</span>
        </button>
        <button onclick="updateView('Lessons')" class="relative flex flex-col items-center gap-1 group transition-all duration-300">
            <i class="fas fa-book-open text-lg text-gray-500 group-hover:text-white"></i>
            <span class="text-[7px] font-black uppercase tracking-widest text-gray-500 group-hover:text-white">Learn</span>
        </button>
        <button onclick="updateView('Nxxt AI')" class="relative flex flex-col items-center transition-all duration-500 hover:-translate-y-1">
            <div class="relative">
                <div class="absolute inset-0 rounded-full bg-blue-600 animate-ping opacity-20"></div>
                <div class="relative w-14 h-14 bg-gradient-to-tr from-blue-700 via-blue-500 to-cyan-400 rounded-2xl flex items-center justify-center shadow-[0_0_25px_rgba(59,130,246,0.5)] border border-white/20 rotate-45 group">
                    <i class="fas fa-robot text-white text-xl -rotate-45 group-hover:scale-110 transition-transform"></i>
                </div>
            </div>
            <span class="text-[7px] font-black uppercase mt-2 tracking-[0.2em] text-cyan-400 animate-pulse">Nxxt AI</span>
        </button>
        <button onclick="openFullMenu()" class="relative flex flex-col items-center gap-1 group transition-all duration-300">
            <i class="fas fa-bars-staggered text-lg text-gray-500 group-hover:text-white"></i>
            <span class="text-[7px] font-black uppercase tracking-widest text-gray-500 group-hover:text-white">Menu</span>
        </button>
        <button onclick="updateView('Xt Pay')" class="relative flex flex-col items-center gap-1 group transition-all duration-300">
            <i class="fas fa-wallet text-lg text-gray-500 group-hover:text-emerald-400"></i>
            <span class="text-[7px] font-black uppercase tracking-widest text-gray-500 group-hover:text-emerald-400">Vault</span>
        </button>
       
    </nav>
</div>

<!-- ── VIEWS (HTML templates, must load before dashboard.js) ── -->
<script src="../js/views/overview.js" defer></script>
<script src="../js/views/lessons.js" defer></script>
<script src="../js/views/projects-view.js" defer></script>
<script src="../js/views/leaderboard.js" defer></script>
<script src="../js/views/collaboration.js" defer></script>
<script src="../js/views/team.js" defer></script>
<script src="../js/views/inbox.js" defer></script>
<script src="../js/views/nxxtai.js" defer></script>
<script src="../js/views/nxxtlab.js" defer></script>
<script src="../js/views/sidehustlehub.js" defer></script>
<script src="../js/views/notifications.js" defer></script>
<script src="../js/views/xtpay.js" defer></script>
<script src="../js/views/pricing.js" defer></script>
<script src="../js/views/settings.js" defer></script>

<!-- ── DATA ── -->
<script src="../js/curriculum.js" defer></script>

<!-- ── LOGIC MODULES ── -->
<script src="../js/modules/overview.js" defer></script>
<script src="../js/modules/ui.js" defer></script>
<script src="../js/modules/settings.js" defer></script>
<script src="../js/modules/lms.js" defer></script>
<script src="../js/modules/proj.js" defer></script>
<script src="../js/modules/nxxtai.js" defer></script>

<!-- ── CORE (router + ActivityEngine — loads last, kicks off the app) ── -->
<script src="../js/dashboard.js" defer></script>
<script src="../js/Overview.js" defer></script>
<script src="../js/auth.js" defer></script>
<script src="../js/projects.js" defer></script>
<script src="../js/history.js" defer></script>
<script src="//code.jivosite.com/widget/7O7rWauHwt" async></script>

<script>
// This prevents the default Jivo button from showing up and overlapping James
function jivo_onLoadCallback() {
    jivo_api.hideRegistrationForm();
}
    // Function to hide JivoChat elements unless the chat is actually open
function enforceJamesUplink() {
    const jivoElements = document.querySelectorAll('.jivo-iframe-container, [class^="jivo-"], #jivo-iframe-container');
    jivoElements.forEach(el => {
        // Only show if the body has the 'jivo-chat-open' class (meaning James called them)
        if (!document.body.classList.contains('jivo-chat-open')) {
            el.style.display = 'none';
            el.style.opacity = '0';
            el.style.pointerEvents = 'none';
        } else {
            el.style.display = 'block';
            el.style.opacity = '1';
            el.style.pointerEvents = 'auto';
        }
    });
}

// Run every time the DOM changes to catch Jivo trying to sneak back in
const observer = new MutationObserver(enforceJamesUplink);
observer.observe(document.body, { childList: true, subtree: true });
</script>
</body>
</html>

OVEOF_PAGES_DASHBOARD_HTML
echo -e "  ${GREEN}✓${NC} pages/dashboard.html"

cat > "js/modules/proj.js" << 'OVEOF_JS_MODULES_PROJ_JS'
/* ── T LEARN PRO: modules/proj.js ── */
/* Projects: CRUD, live stream, deploy tracking */

function loadProjects() {
    try {
        const saved = localStorage.getItem('app_projects');
        projects = saved ? JSON.parse(saved) : [];
        projects = projects.filter(p => p && p.name);
        console.log(`[Projects] Loaded ${projects.length} projects`);
    } catch (err) {
        console.error('[Projects] Load error:', err);
        projects = [];
        localStorage.removeItem('app_projects');
    }
}

function saveProjects() {
    try {
        localStorage.setItem('app_projects', JSON.stringify(projects));
        console.log(`[Projects] Saved ${projects.length} projects`);
    } catch (err) {
        console.warn('[Projects] Save failed:', err);
    }
}

// ─── 2. UI Update - Calls both renders ──────────────────────
function updateUI() {
    const countEl = document.getElementById('projectCount');
    if (countEl) countEl.textContent = projects.length;

    renderProjects();               // main grid
    renderProjectsInLiveStream();   // system core live stream
}

// Sync from other tabs
window.addEventListener('storage', (e) => {
    if (e.key === 'app_projects') {
        loadProjects();
        updateUI();
    }
});

// Re-check on tab focus
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
        setTimeout(() => {
            loadProjects();
            updateUI();
        }, 150);
    }
});

// ─── 3. Notification ───────────────────────────────────────
function triggerNotification(msg, type = 'pending') {
    notifySound.play().catch(() => {});
    const alert = document.createElement('div');
    alert.className = `fixed inset-0 z-[5000] flex items-center justify-center bg-black/70 backdrop-blur-sm`;
    alert.innerHTML = `
        <div class="bg-[#0a0f25] border border-white/10 px-10 py-8 rounded-3xl shadow-2xl flex flex-col items-center max-w-sm scale-95 animate-[pop_0.3s]">
            <div class="w-16 h-16 rounded-2xl mb-5 flex items-center justify-center ${
                type === 'success' ? 'bg-green-500/20 text-green-400' :
                type === 'failed' ? 'bg-red-500/20 text-red-400' :
                'bg-blue-500/20 text-blue-400'
            }">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'failed' ? 'fa-exclamation-triangle' : 'fa-sync fa-spin'} text-3xl"></i>
            </div>
            <p class="text-white text-sm font-bold uppercase tracking-wider">${msg}</p>
        </div>
    `;
    document.body.appendChild(alert);
    setTimeout(() => {
        alert.style.opacity = '0';
        setTimeout(() => alert.remove(), 400);
    }, 2200);
}

// ─── 4. Modals (Centered) ──────────────────────────────────
window.closeModal = function(id) {
    const modal = document.getElementById(id);
    if (!modal) return;
    modal.style.opacity = '0';
    setTimeout(() => modal.remove(), 300);
};

window.openProjectInitiator = function() {
    document.body.insertAdjacentHTML('beforeend', `
    <div id="newProjModal1" class="fixed inset-0 z-[1000] flex items-center justify-center bg-black/80 backdrop-blur-lg p-5">
        <div class="bg-[#0a0f1d] border border-white/10 w-full max-w-md rounded-[3rem] p-10 animate-in zoom-in-95">
            <i class="fas fa-rocket text-blue-500 text-4xl mb-6 block text-center"></i>
            <h2 class="text-white font-black text-3xl tracking-tight mb-6 text-center">New Project</h2>
            <input id="projName" type="text" placeholder="Project Name" class="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder-white/40 focus:border-blue-500 outline-none mb-5 text-sm">
            <textarea id="projDesc" placeholder="Brief description..." rows="4" class="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder-white/40 focus:border-blue-500 outline-none mb-8 text-sm"></textarea>
            <div class="flex gap-4">
                <button onclick="closeModal('newProjModal1')" class="flex-1 py-4 bg-white/5 hover:bg-white/10 rounded-2xl text-white/60 font-black text-xs uppercase tracking-widest transition">Cancel</button>
                <button onclick="openProjectDetailsModal()" class="flex-1 py-4 bg-blue-600 hover:bg-blue-500 rounded-2xl text-white font-black text-xs uppercase tracking-widest shadow-lg shadow-blue-700/30 transition">Continue</button>
            </div>
        </div>
    </div>`);
};

window.openProjectDetailsModal = function() {
    const name = document.getElementById('projName')?.value.trim() || 'Untitled';
    const desc = document.getElementById('projDesc')?.value.trim() || '';
    closeModal('newProjModal1');

    setTimeout(() => {
        document.body.insertAdjacentHTML('beforeend', `
        <div id="newProjModal2" class="fixed inset-0 z-[1001] flex items-center justify-center bg-black/80 backdrop-blur-sm p-5">
            <div class="w-full max-w-lg bg-[#050b1d] border border-white/10 rounded-[3rem] p-10 max-h-[90vh] overflow-y-auto animate-in zoom-in-95">
                <div class="flex justify-between items-center mb-10">
                    <h3 class="text-3xl font-black tracking-tight">${name}</h3>
                    <button onclick="closeModal('newProjModal2')" class="text-3xl text-white/40 hover:text-white">×</button>
                </div>
                <div class="space-y-8">
                    <div>
                        <label class="block text-blue-400 text-xs font-black uppercase tracking-widest mb-3">Project Image</label>
                        <input type="file" id="projImgInput" accept="image/*" class="hidden" onchange="previewProjectImg(this)">
                        <div onclick="document.getElementById('projImgInput').click()" class="group relative h-52 w-full bg-white/5 border-2 border-dashed border-white/20 rounded-3xl flex items-center justify-center cursor-pointer hover:border-blue-500/60 transition-colors overflow-hidden">
                            <img id="projPreview" class="absolute inset-0 w-full h-full object-cover hidden">
                            <i id="imgPlaceholderIcon" class="fas fa-image text-white/20 text-5xl group-hover:scale-110 transition-transform"></i>
                        </div>
                    </div>
                    <div class="space-y-5">
                        <input id="projLink" type="url" placeholder="Project Link[](https://...)" class="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder-white/40 focus:border-blue-500 outline-none text-sm">
                        <div class="grid grid-cols-2 gap-4">
                            <button onclick="setProjectType('Job', this)" class="type-btn py-4 rounded-2xl border border-white/10 text-white/50 text-xs font-black uppercase hover:border-white/30 transition">Job</button>
                            <button onclick="setProjectType('Private', this)" class="type-btn py-4 rounded-2xl border border-white/10 text-white/50 text-xs font-black uppercase hover:border-white/30 transition">Private</button>
                            <button onclick="setProjectType('Personal', this)" class="type-btn py-4 rounded-2xl border-2 border-blue-500 text-white text-xs font-black uppercase shadow-sm shadow-blue-600/30">Personal</button>
                            <button disabled class="py-4 rounded-2xl border border-white/5 text-white/20 text-xs font-black uppercase cursor-not-allowed"><i class="fas fa-lock mr-2"></i>Locked</button>
                        </div>
                        <input id="projUsers" type="number" min="1" value="5" class="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-blue-500 outline-none text-sm">
                    </div>
                    <div class="flex gap-4 pt-8">
                        <button onclick="closeModal('newProjModal2')" class="flex-1 py-5 bg-white/5 hover:bg-white/10 rounded-2xl text-white/60 font-black text-xs uppercase tracking-widest transition">Cancel</button>
                        <button id="createProjBtn" onclick="createNewProject()" class="flex-1 py-5 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 rounded-2xl text-white font-black text-xs uppercase tracking-widest shadow-lg shadow-green-700/30 transition">Create Project</button>
                    </div>
                </div>
            </div>
        </div>`);
        setProjectType('Personal', document.querySelector('#newProjModal2 .type-btn.border-blue-500'));
    }, 180);
};

// Helpers
window.previewProjectImg = function(input) {
    if (!input.files?.[0]) return;
    const reader = new FileReader();
    reader.onload = e => {
        const img = document.getElementById('projPreview');
        const icon = document.getElementById('imgPlaceholderIcon');
        if (img && icon) {
            img.src = e.target.result;
            img.classList.remove('hidden');
            icon.classList.add('hidden');
        }
    };
    reader.readAsDataURL(input.files[0]);
};

window.setProjectType = function(type, button) {
    document.querySelectorAll('#newProjModal2 .type-btn').forEach(btn => {
        btn.classList.remove('border-blue-500', 'text-white', 'shadow-sm', 'shadow-blue-600/30');
        btn.classList.add('border-white/10', 'text-white/50');
    });
    button.classList.add('border-blue-500', 'text-white', 'shadow-sm', 'shadow-blue-600/30');
    button.classList.remove('border-white/10', 'text-white/50');
    activeType = type;
};

// Create project
window.createNewProject = function() {
    const btn = document.getElementById('createProjBtn');
    if (!btn) return;

    const name = document.querySelector('#newProjModal2 h3')?.textContent.trim() || 'Untitled';
    const desc = document.getElementById('projDesc')?.value?.trim() || '';
    const link = document.getElementById('projLink')?.value?.trim() || '#';
    const users = parseInt(document.getElementById('projUsers')?.value) || 0;
    const img = document.getElementById('projPreview')?.src || '';

    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Creating...';

    triggerNotification(`Creating ${name}...`, 'pending');

    setTimeout(() => {
        const status = Math.random() > 0.08 ? 'success' : 'failed';
        projects.push({
            id: Date.now() + Math.random(),
            name,
            desc,
            link,
            users,
            img,
            type: activeType,
            status,
            createdAt: new Date().toISOString()
        });

        saveProjects();
        updateUI();
        closeModal('newProjModal2');
        triggerNotification(`${name} ${status === 'success' ? 'created successfully' : 'creation failed'}`, status);
        // Award XP for adding a project
        if (status === 'success' && typeof awardXP === 'function') awardXP('add_project');
    }, 1600);
};

// Delete
window.deleteProject = function(id) {
    const proj = projects.find(p => p.id === id);
    if (!proj) return;

    document.body.insertAdjacentHTML('beforeend', `
    <div id="deleteConfirmModal" class="fixed inset-0 z-[2000] flex items-center justify-center bg-black/80 backdrop-blur-lg p-5">
        <div class="bg-[#0a0f1d] border border-white/10 w-full max-w-sm rounded-[3rem] p-10 animate-in zoom-in-95">
            <h3 class="text-2xl font-black text-center mb-6 text-red-400">Delete Project?</h3>
            <p class="text-white/80 text-center mb-8">Are you sure you want to delete<br><strong>"${proj.name}"</strong>?<br>This cannot be undone.</p>
            <div class="flex gap-4">
                <button onclick="closeModal('deleteConfirmModal')" class="flex-1 py-4 bg-white/5 hover:bg-white/10 rounded-2xl text-white/70 font-black text-sm uppercase tracking-widest transition">Cancel</button>
                <button onclick="confirmDelete(${id})" class="flex-1 py-4 bg-red-600 hover:bg-red-500 rounded-2xl text-white font-black text-sm uppercase tracking-widest shadow-lg shadow-red-700/30 transition">Delete</button>
            </div>
        </div>
    </div>`);
};

window.confirmDelete = function(id) {
    projects = projects.filter(p => p.id !== id);
    saveProjects();
    updateUI();
    closeModal('deleteConfirmModal');
    triggerNotification('Project deleted', 'failed');
};

// ─── 5. Main Project Render (grid) ──────────────────────────
function renderProjects() {
    const grid = document.getElementById('projectContainerGrid');
    if (!grid) return;

    grid.innerHTML = '';

    if (projects.length === 0) {
        grid.innerHTML = `
            <div class="col-span-full py-24 text-center text-white/50">
                <i class="fas fa-folder-open text-6xl opacity-30 mb-6 block"></i>
                <h3 class="text-xl font-black uppercase tracking-wider mb-3">No Projects Yet</h3>
                <p class="text-sm opacity-70 mb-8">Create your first project to begin</p>
                <button onclick="openProjectInitiator()" class="px-8 py-4 bg-blue-600 hover:bg-blue-500 rounded-2xl text-white font-bold text-sm uppercase tracking-wider shadow-lg transition">
                    New Project
                </button>
            </div>`;
        return;
    }

    projects.forEach(proj => {
        const deployedAgo = getDeployedAgo(proj.createdAt || new Date().toISOString());
        const tech = proj.type || 'Unknown';
        const link = proj.link || '#';
        const domain = link.replace(/^https?:\/\//, '').split('/')[0] || 'No link';

        grid.insertAdjacentHTML('beforeend', `
            <div class="relative rounded-xl overflow-hidden bg-[#0f172a]/80 border border-white/5 hover:border-blue-500/30 transition-all duration-300 group">
                <div class="absolute top-3 left-3 px-3 py-1 rounded-md bg-red-500/20 text-red-400 text-xs font-medium flex items-center gap-1.5 backdrop-blur-sm">
                    <span class="w-2 h-2 rounded-full bg-red-400 animate-pulse"></span>
                    Deployed ${deployedAgo}
                </div>
                <div class="h-40 bg-gradient-to-br from-[#0f172a] to-[#020617] relative">
                    <div class="absolute inset-0 opacity-5 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                    <div class="absolute inset-0 flex items-center justify-center">
                        <i class="fas fa-cube text-white/10 text-7xl group-hover:text-blue-500/30 transition-colors"></i>
                    </div>
                </div>
                <div class="p-4 bg-black/40 border-t border-white/5 flex items-center justify-between">
                    <div class="flex items-center gap-3">
                        <div class="w-10 h-10 rounded-lg bg-blue-900/30 flex items-center justify-center text-blue-400 text-xl">
                            <i class="fas fa-rocket"></i>
                        </div>
                        <div>
                            <p class="text-white font-medium text-sm">${proj.name}</p>
                            <a href="${link}" target="_blank" class="text-blue-400 hover:text-blue-300 text-xs truncate max-w-[180px] block">
                                ${domain}
                            </a>
                        </div>
                    </div>
                    <span class="px-3 py-1 rounded-full text-xs font-medium bg-white/5 text-gray-300 border border-white/10">
                        ${tech}
                    </span>
                </div>
            </div>
        `);
    });
}

// ─── 6. Live Project Stream Render (inside #orderStatusChart) ───
function renderProjectsInLiveStream() {
    const stream = document.getElementById('liveProjectStream');
    const empty = document.getElementById('streamEmpty');

    if (!stream || !empty) {
        console.log("[LiveStream] Not on this tab yet - skipping");
        return;
    }

    stream.innerHTML = '';

    if (projects.length === 0) {
        empty.style.display = 'flex';
        stream.style.display = 'none';
        return;
    }

    empty.style.display = 'none';
    stream.style.display = 'block';

    // Newest first
    const sorted = [...projects].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    sorted.forEach(proj => {
        const ago = getDeployedAgo(proj.createdAt);
        const statusColor = proj.status === 'success' ? 'emerald' : 'red';
        const statusText = proj.status === 'success' ? 'Active' : 'Failed';

        stream.insertAdjacentHTML('beforeend', `
            <div class="flex items-center gap-4 p-4 bg-black/30 rounded-2xl border border-${statusColor}-500/10 hover:border-${statusColor}-500/30 transition-all animate-fade-in">
                <div class="w-10 h-10 rounded-lg bg-${statusColor}-500/10 flex items-center justify-center">
                    <i class="fas fa-rocket text-${statusColor}-400"></i>
                </div>
                <div class="flex-1 min-w-0">
                    <p class="text-white font-medium text-sm truncate">${proj.name}</p>
                    <p class="text-[10px] text-gray-400 truncate">${proj.link?.replace(/^https?:\/\//, '') || 'No link'}</p>
                </div>
                <div class="text-right">
                    <span class="text-[10px] text-${statusColor}-400 font-medium">${statusText}</span>
                    <p class="text-[9px] text-gray-500">${ago}</p>
                </div>
            </div>
        `);
    });
}

// ─── Helper: Deployed Ago ───────────────────────────────────
function getDeployedAgo(isoDate) {
    if (!isoDate) return 'just now';
    const diffMs = Date.now() - new Date(isoDate).getTime();
    const mins = Math.floor(diffMs / 60000);
    const hours = Math.floor(mins / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);

    if (months >= 1) return `${months}mths ago`;
    if (days >= 1) return `${days}d ago`;
    if (hours >= 1) return `${hours}h ago`;
    if (mins >= 1) return `${mins}m ago`;
    return 'just now';
}

// ─── 7. Settings Project List ──────────────────────────────
// Called by updateSettingsTab('Projects') after the HTML is set
function renderSettingsProjects() {
    const list = document.getElementById('settingsProjectList');
    if (!list) return;

    loadProjects(); // ensure fresh data

    if (projects.length === 0) {
        list.innerHTML = `
            <div class="py-16 text-center border-2 border-dashed border-white/5 rounded-3xl">
                <i class="fas fa-folder-open text-5xl text-white/10 mb-4 block"></i>
                <p class="text-[10px] font-black text-white/20 uppercase tracking-widest">No projects yet</p>
            </div>`;
        return;
    }

    list.innerHTML = projects.map((proj, i) => `
        <div class="flex items-center justify-between p-5 bg-white/5 border border-white/10 rounded-2xl hover:border-white/20 transition-all">
            <div class="flex items-center gap-4">
                <div class="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                    <i class="fas fa-rocket text-blue-400 text-sm"></i>
                </div>
                <div>
                    <p class="text-white font-black text-sm">${proj.name}</p>
                    <p class="text-[10px] text-gray-500 font-bold uppercase">${proj.type || 'Unknown'} · ${getDeployedAgo(proj.createdAt)}</p>
                </div>
            </div>
            <button onclick="deleteProjectFromSettings(${i})"
                class="w-9 h-9 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center hover:bg-red-500/20 transition-all">
                <i class="fas fa-trash text-xs"></i>
            </button>
        </div>
    `).join('');
}

// Delete from settings panel and refresh both views
window.deleteProjectFromSettings = function(index) {
    if (!confirm('Remove this project?')) return;
    projects.splice(index, 1);
    saveProjects();
    renderSettingsProjects();
    updateUI(); // keep project count and grid in sync
};

// ─── Init ──────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    loadProjects();
    updateUI();
    console.log("[Projects] Initialized – count:", projects.length);
});




///// FOR THE NXXT AI ALONE
// --- CONFIGURATION & MOCK DATA ---
window.imgCredits = 5;
window.nxxtMode = 'standard';

// TESTING PHASE: Pre-set responses for auto-replies
const TEST_RESPONSES = {
    "hello": "Hello. How can I help you today?",
    "who are you": "I am Nxxt AI, your professional assistant. I'm currently in the testing phase to ensure all systems work correctly.",
    "is this real": "This is a local testing environment. The responses you see now are pre-set for development, but the live version will connect to GPT-4.",
    "help": "I can assist with writing, analysis, and image generation. Try typing 'generate an image' to see the visual output in action.",
    "capabilities": "Currently testing UI performance, message speed, and image generation. Live features like data analysis and coding will be added in the next phase.",
    "default": "I've received your message. In the live version, I would provide a detailed response here, but for now, I'm just confirming the input works."
};

/**
 * Bridge function to connect HTML onclick to our logic
 */

OVEOF_JS_MODULES_PROJ_JS
echo -e "  ${GREEN}✓${NC} js/modules/proj.js"

cat > "js/modules/lms.js" << 'OVEOF_JS_MODULES_LMS_JS'
/* ── T LEARN PRO: modules/lms.js ── */
/* LMS: initLMS, exam logic, topic viewer, modal, render helpers */

function initLMS() {
    const app = document.getElementById('lesson-app-root');
    if (!app) return;

    app.innerHTML = `
        <div class="space-y-8 animate-in fade-in duration-700 bg-[#050b1d] p-4 sm:p-8 min-h-screen">
            <div class="flex justify-center sticky top-0 z-50 py-4 backdrop-blur-md">
                <div class="bg-white/5 border border-white/10 p-1.5 rounded-2xl flex flex-wrap justify-center gap-1 shadow-2xl">
                    ${['Courses', 'Exam', 'Result', 'Analytics'].map(tab => `
                        <button id="btn-${tab}" onclick="switchLessonSubTab('${tab}')" 
                            class="lesson-nav-btn px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all text-white/50">
                            ${tab}
                        </button>
                    `).join('')}
                </div>
            </div>
            <div id="lesson-sub-content" class="min-h-[400px]"></div>
        </div>

        <div id="global-modal" class="hidden fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl">
            <div class="absolute inset-0" onclick="closeModal()"></div>
            <div id="modal-container" class="bg-[#0a1128] border border-white/10 w-full max-w-lg rounded-[2.5rem] shadow-2xl relative z-10 max-h-[90vh] flex flex-col overflow-hidden transition-all duration-500">
                <div class="p-8 border-b border-white/5 flex justify-between items-center">
                    <h2 id="modal-title" class="text-white font-black uppercase tracking-widest italic text-sm"></h2>
                    <button onclick="closeModal()" class="w-10 h-10 rounded-full bg-white/5 text-gray-400 hover:text-white flex items-center justify-center transition-all">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div id="modal-body" class="p-8 overflow-y-auto no-scrollbar flex-grow"></div>
            </div>
        </div>
    `;
    switchLessonSubTab('Courses');
}

/**
 * 3. TAB NAVIGATION
 */
function switchLessonSubTab(tab) {
    const contentArea = document.getElementById('lesson-sub-content');
    const buttons = document.querySelectorAll('.lesson-nav-btn');

    // Update Button UI
    buttons.forEach(btn => {
        const isActive = btn.id === `btn-${tab}`;
        btn.classList.toggle('bg-blue-600', isActive);
        btn.classList.toggle('text-white', isActive);
        btn.classList.toggle('text-white/50', !isActive);
    });

    // Content Switcher
    switch(tab) {
        case 'Courses':
            contentArea.innerHTML = `
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-in slide-in-from-bottom-8">
                    ${Object.keys(curriculumData).map(name => `
                        <div onclick="openTopics('${name}')" class="group cursor-pointer p-8 bg-white/5 border border-white/10 rounded-[2.5rem] hover:bg-blue-600 transition-all">
                            <i class="fab ${curriculumData[name].icon} text-3xl text-white mb-4 group-hover:scale-110 transition-transform"></i>
                            <h4 class="text-white font-black text-2xl uppercase">${name}</h4>
                            <p class="text-white/40 text-[10px] uppercase font-bold mt-2">Professional Curriculum</p>
                        </div>
                    `).join('')}
                </div>`;
            break;
case 'Exam':
    contentArea.innerHTML = `
        <div class="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div class="relative mb-8 group">
                <i class="fas fa-search absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-blue-500 transition-colors"></i>
                <input type="text" id="examSearch" placeholder="SEARCH TEST REPOSITORY..." 
                    class="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-14 pr-6 text-white text-[10px] font-black tracking-[0.2em] outline-none focus:border-blue-500/50 focus:bg-white/[0.08] transition-all">
            </div>

            <div class="rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl shadow-blue-900/20">
                <div class="bg-white/10 backdrop-blur-md p-6 border-b border-white/10 flex justify-between items-center">
                    <div class="flex items-center gap-3">
                        <div class="flex gap-1.5">
                            <div class="w-2.5 h-2.5 rounded-full bg-red-500/50"></div>
                            <div class="w-2.5 h-2.5 rounded-full bg-yellow-500/50"></div>
                            <div class="w-2.5 h-2.5 rounded-full bg-green-500/50"></div>
                        </div>
                        <span class="text-white/40 font-black text-[9px] uppercase tracking-widest ml-4">Terminal Alpha-01</span>
                    </div>
                    <div id="examTimer" class="px-4 py-1.5 bg-red-500/10 border border-red-500/20 rounded-full text-red-500 font-mono font-bold text-xs tracking-tighter">
                        STATUS: STANDBY
                    </div>
                </div>

                <div class="bg-[#050b1d] p-8 min-h-[350px] font-mono relative">
                    <div id="terminalContent" class="text-blue-400/80 text-xs leading-loose">
                        <p class="flex gap-3"><span class="text-white/20">01</span> <span class="text-green-500">></span> System initialized...</p>
                        <p class="flex gap-3"><span class="text-white/20">02</span> <span class="text-green-500">></span> Waiting for authentication code...</p>
                    </div>
                    <div class="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-white/[0.02] to-transparent bg-[length:100%_4px]"></div>
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                <div class="relative">
                    <select id="examLanguage" class="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white font-black text-[10px] uppercase tracking-widest appearance-none outline-none focus:border-blue-500 transition-all cursor-pointer">
                        <option value="html">HTML5 Master</option>
                        <option value="css">CSS3 Architect</option>
                        <option value="javascript">JS Engineer</option>
                        <option value="python">Python Dev</option>
                    </select>
                    <i class="fas fa-chevron-down absolute right-4 top-1/2 -translate-y-1/2 text-white/20 pointer-events-none"></i>
                </div>

                <button onclick="generateExamCode()" class="bg-blue-600 hover:bg-blue-500 text-white font-black uppercase text-[10px] tracking-widest py-4 rounded-xl transition-all shadow-lg shadow-blue-600/20 active:scale-95">
                    Generate Token
                </button>

                <div class="flex gap-2 bg-white/5 border border-white/10 rounded-xl p-1">
                     <input type="text" id="generatedCodeDisplay" readonly placeholder="----"
                        class="bg-transparent w-24 text-center text-blue-400 font-mono font-bold text-xs outline-none">
                     <input type="text" id="examCodeInput" placeholder="ENTER TOKEN" 
                        class="flex-grow bg-white/10 rounded-lg px-4 text-white font-black text-[10px] uppercase tracking-widest outline-none border border-transparent focus:border-blue-500/50 transition-all">
                     <button onclick="startExam()" class="bg-white text-black px-4 rounded-lg font-black text-[9px] uppercase hover:bg-green-500 hover:text-white transition-all active:scale-95">
                        START
                     </button>
                </div>
            </div>
        </div>
    `;

    // Initialize the Functional Logic
    setupExamLogic();
    break;

// --- Supporting Logic Functions ---

function setupExamLogic() {
    let timerInterval;
    let isExamActive = false;

    // 1. Generate Token
    window.generateExamCode = function() {
        const code = "EX-" + Math.random().toString(36).substring(2, 8).toUpperCase();
        document.getElementById('generatedCodeDisplay').value = code;
    };

    // 2. Start Assessment
    window.startExam = function() {
        const input = document.getElementById('examCodeInput').value;
        const generated = document.getElementById('generatedCodeDisplay').value;

        if (input === "" || input !== generated) {
            showCustomModal("AUTH_FAILURE", "Invalid session token. Please ensure the token matches the generated value.");
            return;
        }

        isExamActive = true;
        const terminal = document.getElementById('terminalContent');
        terminal.innerHTML += `
            <p class="flex gap-3 text-white"><span class="text-white/20">03</span> <span class="text-blue-500">></span> Token Verified.</p>
            <p class="flex gap-3 text-white"><span class="text-white/20">04</span> <span class="text-blue-500">></span> Loading Core Assessment [30 Nodes]...</p>
            <p class="flex gap-3 text-yellow-500 font-bold"><span class="text-white/20">05</span> > PROCTORING ACTIVE: DO NOT SWITCH TABS OR MINIMIZE WINDOW.</p>
        `;
        
        startTimer(15 * 60); // 15 Minute countdown
    };

    // 3. Timer Logic
    function startTimer(duration) {
        let timer = duration, minutes, seconds;
        const display = document.getElementById('examTimer');
        
        timerInterval = setInterval(() => {
            minutes = parseInt(timer / 60, 10);
            seconds = parseInt(timer % 60, 10);
            
            display.textContent = `T-MINUS ${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
            
            if (--timer < 0) {
                clearInterval(timerInterval);
                autoSubmitExam("TIME_EXPIRY");
            }
        }, 1000);
    }

    // 4. Anti-Cheat (Tab Switching Detection)
    window.onblur = function() {
        if (isExamActive) {
            autoSubmitExam("TAB_VIOLATION");
        // Award XP for passing exam (checked in autoSubmitExam result)
        if (typeof awardXP === "function" && window._lastExamPassed) awardXP("pass_exam");
        }
    };

    // 5. Termination / Submission
    function autoSubmitExam(reason) {
        isExamActive = false;
        clearInterval(timerInterval);
        
        document.getElementById('terminalContent').innerHTML = `
            <div class="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg animate-pulse">
                <p class="text-red-500 font-black uppercase text-[10px]">Critical Error: Terminal Locked</p>
                <p class="text-white/60 text-[9px] mt-1">Reason: ${reason}</p>
                <p class="text-white/40 text-[8px] mt-2 italic">> Data packets sent to administration...</p>
            </div>
        `;
        
        showCustomModal("EXAM_TERMINATED", `Your session has been forcibly closed. <br><br> <strong>Reason:</strong> ${reason.replace('_', ' ')}`);
    }
}

// 6. Centralized Modal Helper (Displays in page center)
function showCustomModal(title, msg) {
    const modal = document.getElementById('global-modal');
    const mTitle = document.getElementById('modal-title');
    const mBody = document.getElementById('modal-body');
    
    mTitle.innerText = title;
    mBody.innerHTML = `
        <div class="text-center py-6 px-4">
            <div class="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <i class="fas fa-shield-alt text-red-500 text-2xl"></i>
            </div>
            <p class="text-white text-sm font-medium leading-relaxed mb-8">${msg}</p>
            <button onclick="closeModal()" class="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-black text-[10px] uppercase tracking-widest transition-all">
                Acknowledge & Exit
            </button>
        </div>
    `;
    modal.classList.remove('hidden');
    modal.classList.add('flex'); // Ensures centering if using Flexbox
}
     /**
 * SWITCH CASE: Result
 * Place this inside your main tab-switching function
 */
case 'Result':
    contentArea.innerHTML = `
        <div class="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div class="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                <div>
                    <h2 class="text-white font-black text-2xl tracking-tighter uppercase">Certification Vault</h2>
                    <p class="text-white/40 text-[10px] tracking-[0.2em] uppercase mt-1">Archive of all processed assessments</p>
                </div>
                
                <div class="flex bg-white/5 border border-white/10 p-1 rounded-2xl backdrop-blur-md">
                    <button onclick="filterResults('pending', this)" 
                        class="result-tab px-6 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all text-white/40 hover:text-white">
                        Pending
                    </button>
                    <button onclick="filterResults('success', this)" 
                        class="result-tab px-6 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all text-white/40 hover:text-white">
                        Success
                    </button>
                    <button onclick="filterResults('failed', this)" 
                        class="result-tab px-6 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all text-white/40 hover:text-white">
                        Failed
                    </button>
                </div>
            </div>

            <div id="resultDisplayArea" class="min-h-[400px] transition-all duration-500">
                </div>
        </div>
    `;

    // Initialize: Wait for DOM to render then click "Success" by default
    setTimeout(() => {
        const tabs = document.querySelectorAll('.result-tab');
        if (tabs[1]) filterResults('success', tabs[1]);
    }, 0);
    break;


/**
 * SCRIPT SECTION
 * Add these functions to your global script file
 */

window.filterResults = function(status, element) {
    const displayArea = document.getElementById('resultDisplayArea');
    if (!displayArea) return;
    
    // 1. Update Tab Button Styles (Active State)
    document.querySelectorAll('.result-tab').forEach(tab => {
        tab.classList.remove('bg-blue-600', 'text-white', 'shadow-lg', 'shadow-blue-600/20');
        tab.classList.add('text-white/40');
    });
    element.classList.remove('text-white/40');
    element.classList.add('bg-blue-600', 'text-white', 'shadow-lg', 'shadow-blue-600/20');

    // 2. Data Definitions for empty states
    const states = {
        pending: {
            icon: 'fa-hourglass-half',
            color: 'text-yellow-500',
            title: 'Processing Data...',
            desc: 'No assessments are currently under review. Completed exams appear here during manual verification.'
        },
        success: {
            icon: 'fa-award',
            color: 'text-green-500',
            title: 'No Certifications Yet',
            desc: 'Your success is waiting. Pass an exam with 70% or higher to unlock your official digital certificate.'
        },
        failed: {
            icon: 'fa-shield-virus',
            color: 'text-red-500',
            title: 'Clean Record',
            desc: 'No failed attempts detected. All assessment data is within acceptable operational parameters.'
        }
    };

    const state = states[status];

    // 3. Inject View with Animation
    displayArea.innerHTML = `
        <div class="flex flex-col items-center justify-center bg-white/5 border border-white/10 rounded-[2.5rem] p-12 text-center animate-in fade-in zoom-in-95 duration-500">
            <div class="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6 border border-white/10 shadow-inner">
                <i class="fas ${state.icon} ${state.color} text-3xl"></i>
            </div>
            <h3 class="text-white font-black text-lg uppercase tracking-widest">${state.title}</h3>
            <p class="text-white/40 text-xs max-w-sm mx-auto mt-4 leading-relaxed font-medium">
                ${state.desc}
            </p>
            <button onclick="switchTab('Exam')" class="mt-10 px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white text-[9px] font-black uppercase tracking-[0.3em] transition-all">
                Access Exam Terminal
            </button>
        </div>
    `;
};

/**
 * MODAL SYSTEM (Centered as requested)
 */
window.showAlert = function(title, message) {
    const modalHtml = `
        <div id="modal-container" class="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
            <div class="bg-[#0a0f1d] border border-white/10 w-full max-w-md rounded-[2rem] p-8 shadow-2xl animate-in zoom-in-95 duration-300">
                <div class="text-center">
                    <div class="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-red-500/20">
                        <i class="fas fa-exclamation-triangle text-red-500 text-xl"></i>
                    </div>
                    <h2 class="text-white font-black text-xl uppercase tracking-tighter mb-2">${title}</h2>
                    <p class="text-white/40 text-xs font-medium leading-relaxed mb-8">${message}</p>
                    <button onclick="document.getElementById('modal-container').remove()" 
                        class="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-black text-[10px] uppercase tracking-[0.2em] rounded-xl transition-all shadow-lg shadow-blue-600/20">
                        Acknowledge
                    </button>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHtml);
};
            
 case 'Analytics':
    contentArea.innerHTML = `
        <style>
            @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
            @keyframes reverse-slow { from { transform: rotate(360deg); } to { transform: rotate(0deg); } }
            .animate-spin-slow { animation: spin-slow 12s linear infinite; }
            .animate-reverse-slow { animation: reverse-slow 20s linear infinite; }
        </style>

        <div class="max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
                <div>
                    <div class="flex items-center gap-3 mb-2">
                        <span class="px-3 py-1 bg-blue-600/20 border border-blue-500/30 rounded-full text-blue-400 text-[8px] font-black uppercase tracking-[0.2em]">Live Telemetry</span>
                    </div>
                    <h2 class="text-white font-black text-3xl tracking-tighter uppercase">Performance Metrics</h2>
                    <p class="text-white/40 text-[10px] tracking-[0.2em] uppercase mt-1">Real-time synchronization with neural training modules</p>
                </div>
                <div class="flex gap-4">
                    <button class="px-5 py-3 bg-white/5 border border-white/10 rounded-xl text-white/60 text-[9px] font-black uppercase tracking-widest hover:bg-white/10 transition-all">
                        <i class="fas fa-download mr-2"></i> Export Data
                    </button>
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                ${renderStatCard('Course Progress', '0%', 'text-blue-500', 'fa-battery-three-quarters')}
                ${renderStatCard('Avg. Score', '00.0', 'text-green-500', 'fa-bullseye')}
                ${renderStatCard('Time Invested', '000h', 'text-purple-500', 'fa-stopwatch')}
                ${renderStatCard('Rank', 'Global #0', 'text-yellow-500', 'fa-trophy')}
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div class="lg:col-span-2 bg-white/5 border border-white/10 rounded-[2.5rem] p-8 backdrop-blur-md relative overflow-hidden">
                    <div class="flex justify-between items-center mb-10">
                        <h3 class="text-white font-black text-xs uppercase tracking-[0.2em]">Cognitive Skill Distribution</h3>
                        <div class="flex gap-2 text-blue-500">
                            <span class="w-2 h-2 rounded-full bg-current animate-pulse"></span>
                            <span class="text-[8px] font-bold uppercase tracking-widest">Active Scan</span>
                        </div>
                    </div>
                    
                    <div class="h-[300px] flex items-center justify-center relative">
                        <div class="absolute inset-0 flex items-center justify-center opacity-20">
                            <div class="w-64 h-64 border-[1px] border-dashed border-blue-500 rounded-full animate-spin-slow"></div>
                            <div class="absolute w-48 h-48 border-[1px] border-dashed border-blue-400/50 rounded-full animate-reverse-slow"></div>
                            <div class="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
                        </div>
                        
                        <div class="text-center z-10">
                            <i class="fas fa-microchip text-blue-500/40 text-6xl mb-6"></i>
                            <div class="grid grid-cols-2 gap-x-8 gap-y-2">
                                <span class="text-white/40 text-[9px] font-black uppercase tracking-widest text-right">Logic: <span class="text-white">0%</span></span>
                                <span class="text-white/40 text-[9px] font-black uppercase tracking-widest text-left">Syntax: <span class="text-white">0%</span></span>
                                <span class="text-white/40 text-[9px] font-black uppercase tracking-widest text-right">Speed: <span class="text-white">0%</span></span>
                                <span class="text-white/40 text-[9px] font-black uppercase tracking-widest text-left">Memory: <span class="text-white">91%</span></span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 backdrop-blur-md">
                    <h3 class="text-white font-black text-xs uppercase tracking-[0.2em] mb-8 text-center">Neural Activity Log</h3>
                    <div class="space-y-6">
                        ${renderActivityRow('Module 04 Complete', '2 mins ago', 'bg-green-500')}
                        ${renderActivityRow('Exam Token Generated', '4 hours ago', 'bg-blue-500')}
                        ${renderActivityRow('System Login: NY-Node', '12 hours ago', 'bg-white/40')}
                        ${renderActivityRow('Assessment Failed: JS-02', '1 day ago', 'bg-red-500')}
                    </div>
                    <button class="w-full mt-10 py-4 bg-white/5 border border-white/10 rounded-xl text-white/40 text-[9px] font-black uppercase tracking-widest hover:text-white transition-all">
                        View Full History
                    </button>
                </div>
            </div>
        </div>
    `;
    break;

/**
 * HELPER FUNCTIONS
 * Ensure these are defined in your global script scope
 */
function renderStatCard(label, value, colorClass, icon) {
    return `
        <div class="bg-white/5 border border-white/10 rounded-3xl p-6 hover:bg-white/[0.08] transition-all group">
            <div class="flex justify-between items-start mb-4">
                <i class="fas ${icon} ${colorClass} opacity-50 group-hover:opacity-100 transition-opacity"></i>
                <div class="text-[8px] text-green-500 font-bold">+2.4%</div>
            </div>
            <p class="text-white/40 text-[9px] font-black uppercase tracking-widest mb-1">${label}</p>
            <h4 class="text-white text-2xl font-black tracking-tighter">${value}</h4>
        </div>
    `;
}

function renderActivityRow(title, time, dotColor) {
    return `
        <div class="flex items-center gap-4 group">
            <div class="w-1.5 h-1.5 rounded-full ${dotColor} shadow-[0_0_8px_currentColor]"></div>
            <div class="flex-1 border-b border-white/5 pb-2 group-last:border-0">
                <p class="text-white/80 text-[10px] font-bold uppercase tracking-tight">${title}</p>
                <p class="text-white/20 text-[8px] uppercase mt-0.5">${time}</p>
            </div>
        </div>
    `;
}
    }
} 

function renderPlaceholder(icon, title, subtitle) {
    return `
        <div class="py-32 flex flex-col items-center justify-center animate-in fade-in zoom-in duration-500">
            <div class="w-20 h-20 mb-6 bg-white/5 rounded-full flex items-center justify-center border border-white/10">
                <i class="fas ${icon} text-blue-500/40 text-2xl"></i>
            </div>
            <h3 class="text-white/40 font-black uppercase tracking-[0.4em] text-lg">${title}</h3>
            <p class="text-white/10 text-[9px] uppercase font-bold mt-2 tracking-widest text-center">
                ${subtitle}
            </p>
        </div>`;
}


/**
 * 4. MODAL INTERACTIONS (Topics -> Detail -> Workspace)
 */
function openTopics(courseName) {
    const title = document.getElementById('modal-title');
    const body = document.getElementById('modal-body');
    const container = document.getElementById('modal-container');
    
    container.classList.replace('max-w-6xl', 'max-w-lg'); // Reset size if coming from workspace
    title.innerText = `${courseName} Modules`;
    
    const topics = curriculumData[courseName].topics;
    body.innerHTML = topics.map((t, i) => `
        <div onclick="openTopicDetail('${courseName}', ${i})" class="p-5 mb-3 bg-white/5 border border-white/5 rounded-2xl flex justify-between items-center cursor-pointer hover:bg-blue-600 transition-all group">
            <span class="text-white font-black uppercase text-xs tracking-tight">${t.title}</span>
            <span class="text-[9px] text-white/30 uppercase font-black group-hover:text-white">Level ${i+1}</span>
        </div>
    `).join('');
    
    document.getElementById('global-modal').classList.remove('hidden');
}

function openTopicDetail(course, index) {
    const topic = curriculumData[course].topics[index];
    const body = document.getElementById('modal-body');
    
    body.innerHTML = `
        <div class="text-center py-4 animate-in fade-in slide-in-from-bottom-4">
            <div class="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-blue-500/20">
                <i class="fas fa-book-open text-blue-500 text-xl"></i>
            </div>
            <h3 class="text-white text-3xl font-black uppercase italic mb-2">${topic.title}</h3>
            <p class="text-gray-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-8">
                Unlock professional workflows for ${course}.
            </p>
            <button onclick="launchWorkspace('${course}', ${index})" class="w-full py-5 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-blue-500 shadow-lg shadow-blue-600/20 transition-all">
                Start Lesson
            </button>
        </div>
    `;
}

function launchWorkspace(course, index) {
    const container = document.getElementById('modal-container');
    const body = document.getElementById('modal-body');
    const topic = curriculumData[course].topics[index];

    // Expand modal for IDE view
    container.classList.replace('max-w-lg', 'max-w-6xl');
    
    body.innerHTML = `
        <div class="grid lg:grid-cols-12 gap-8 h-[60vh] animate-in zoom-in-95 duration-300">
            <div class="lg:col-span-5 overflow-y-auto no-scrollbar bg-white/5 p-8 rounded-[2rem] border border-white/5">
                <div class="flex items-center gap-3 mb-6">
                    <span class="px-3 py-1 bg-blue-600 text-[8px] font-black text-white rounded-full uppercase">Theory</span>
                </div>
                <h3 class="text-white font-black text-xl uppercase mb-4">${topic.title}</h3>
                <p class="text-gray-400 text-sm leading-relaxed mb-8">${topic.theory}</p>
                <div class="p-6 bg-blue-500/5 border border-blue-500/20 rounded-2xl">
                    <h4 class="text-blue-400 font-black text-xs uppercase mb-2">Challenge</h4>
                    <p class="text-white text-sm italic">${topic.challenge}</p>
                </div>
            </div>
            <div class="lg:col-span-7 flex flex-col bg-black/40 rounded-[2rem] border border-white/5 overflow-hidden">
                <div class="px-6 py-4 bg-white/5 flex justify-between items-center">
                    <span class="text-[10px] font-black text-white/30 tracking-widest uppercase">Console Editor</span>
                    <span class="text-[10px] text-green-500 font-mono italic">main.${course.toLowerCase()}</span>
                </div>
                <textarea id="code-editor" class="flex-grow bg-transparent p-8 font-mono text-sm text-green-400 outline-none resize-none" spellcheck="false">${topic.snippet}</textarea>
                <div class="p-6 bg-white/5 border-t border-white/5">
                    <button onclick="triggerSuccess()" class="w-full py-4 bg-white text-black rounded-xl font-black uppercase text-[10px] hover:bg-green-500 hover:text-white transition-all shadow-xl">
                        Submit Solution
                    </button>
                </div>
            </div>
        </div>
    `;
}

/**
 * 5. FEEDBACK & CLOSURE
 */
function triggerSuccess() {
    const body = document.getElementById('modal-body');
    const container = document.getElementById('modal-container');
    
    // Bring back to smaller size for the alert
    container.classList.replace('max-w-6xl', 'max-w-lg');
    
    body.innerHTML = `
        <div class="text-center py-12 animate-in zoom-in duration-500">
            <div class="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <i class="fas fa-check-circle text-green-500 text-4xl"></i>
            </div>
            <h2 class="text-white text-4xl font-black uppercase mb-2 italic">Success!</h2>
            <p class="text-gray-500 text-[10px] font-black uppercase tracking-[0.3em] mb-12">Solution Verified • XP Awarded</p>
            <button onclick="closeModal()" class="px-12 py-5 bg-white text-black rounded-2xl font-black uppercase text-[10px] hover:invert transition-all">
                Back to Dashboard
            </button>
        </div>
    `;
}

function closeModal() {
    const modal = document.getElementById('global-modal');
    modal.classList.add('hidden');
    // Reset container size for next use
    setTimeout(() => {
        document.getElementById('modal-container').classList.replace('max-w-6xl', 'max-w-lg');
    }, 300);
}

// Start the App
initLMS();


////// FOR THE NOTIFICATIONS
window.archiveNotif = function(id) {
    let logs = JSON.parse(localStorage.getItem('app_notifications')) || [];
    const idx = logs.findIndex(l => l.id === id);
    if (idx !== -1) {
        logs[idx].archived = true;
        localStorage.setItem('app_notifications', JSON.stringify(logs));
        
        // Visual feedback first
        const el = document.getElementById(`notif-${id}`);
        if(el) el.classList.add('opacity-0', 'translate-x-10');
        
        // Re-render after animation to check for empty state
        setTimeout(() => {
            renderTab('Notifications');
        }, 300);
    }
};

window.deleteNotif = function(id) {
    let logs = JSON.parse(localStorage.getItem('app_notifications')) || [];
    logs = logs.filter(l => l.id !== id);
    localStorage.setItem('app_notifications', JSON.stringify(logs));
    
    // Visual feedback first
    const el = document.getElementById(`notif-${id}`);
    if(el) el.classList.add('scale-95', 'opacity-0');
    
    // Re-render after animation
    setTimeout(() => {
        renderTab('Notifications');
    }, 300);
};




//////  FOR THE PROJECTS   
// ================================================
// Project Manager - FINAL PERFECT VERSION
// Projects appear immediately in main grid + Live Stream card
// ================================================

let projects = [];
let activeType = 'Personal';
const notifySound = new Audio('https://assets.mixkit.co/active_storage/sfx/2354/2354-preview.mp3');

// ─── 1. Persistence ─────────────────────────────────────────

OVEOF_JS_MODULES_LMS_JS
echo -e "  ${GREEN}✓${NC} js/modules/lms.js"

echo ""
echo -e "${YELLOW}[3/3] Verifying...${NC}"
FILES=("js/modules/overview.js" "js/dashboard.js" "pages/dashboard.html" "js/modules/proj.js" "js/modules/lms.js")
ALL_OK=true
for f in "${FILES[@]}"; do
  if [ -f "$f" ] && [ -s "$f" ]; then
    echo -e "  ${GREEN}✓${NC} $f"
  else
    echo -e "  ${RED}✗${NC} $f MISSING"; ALL_OK=false
  fi
done

echo ""
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
if [ "$ALL_OK" = true ]; then
  echo -e "${GREEN}  ✓ Overview Engine installed!${NC}"
  echo ""
  echo "  WHAT'S NOW LIVE:"
  echo "  • Activity Nebula — 52-week GitHub grid drawn on canvas"
  echo "  • XT Points — earns on login, lessons, exams, projects, hourly"
  echo "  • Streak — tracks consecutive daily logins, resets if missed"
  echo "  • Rank — pulls from Supabase leaderboard view, updates live"
  echo "  • Level + Semester — reads directly from your profiles table"
  echo "  • Project count, Deployed count, Gigs count — all live"
  echo "  • Activity syncs to Supabase every 5 minutes"
  echo "  • New users auto-enrolled into Semester 001 on sign-up"
else
  echo -e "${RED}  Some files failed — check errors above${NC}"
fi
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
