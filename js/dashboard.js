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
// window.views is declared early in dashboard.html so view files can populate
// it before this script runs. We just reference it here, not redeclare it.
// ─────────────────────────────────────────────────────────────────────────────
const views = window.views;

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

// Initial Setup — wait for all defer scripts to finish before rendering
window.addEventListener('DOMContentLoaded', () => {
    const d = new Date();
    const dateEl = document.getElementById('currentDate');
    if (dateEl) dateEl.innerText = d.toLocaleDateString('en-US', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });
    // Small delay so all defer view scripts have populated the views object
    setTimeout(() => updateView('Overview'), 50);
});


