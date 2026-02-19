// history.js — Login & Account Event History
// Records: daily login, name changes, password changes
// Renders in Settings > History tab

const HISTORY_KEY = 'tlearnpro_login_history';

function getHistory() {
    try {
        return JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
    } catch {
        return [];
    }
}

function saveHistory(arr) {
    try {
        localStorage.setItem(HISTORY_KEY, JSON.stringify(arr));
    } catch {}
}

// ── Record a login (once per day only) ──────────────────────
function recordIfNewDay() {
    const today = new Date().toISOString().split('T')[0];
    const history = getHistory();

    const alreadyLoggedToday = history.some(h => h.date === today && h.event === 'login');
    if (alreadyLoggedToday) {
        renderHistory(history);
        return;
    }

    const time = new Date().toLocaleTimeString('en-US', {
        hour: 'numeric', minute: '2-digit', hour12: true
    });

    history.push({ date: today, time, ts: Date.now(), event: 'login' });
    saveHistory(history);
    renderHistory(history);
}

// ── Record any account event (name change, password change) ──
// Call this from saveProfile() and updatePassword()
function recordHistoryEvent(eventType) {
    const today = new Date().toISOString().split('T')[0];
    const time  = new Date().toLocaleTimeString('en-US', {
        hour: 'numeric', minute: '2-digit', hour12: true
    });
    const history = getHistory();
    history.push({ date: today, time, ts: Date.now(), event: eventType });
    saveHistory(history);

    // If history tab is currently visible, re-render it live
    const entries = document.getElementById('historyEntries');
    if (entries) renderHistory(history);
}

// ── Render all history entries ───────────────────────────────
function renderHistory(history) {
    const placeholder = document.getElementById('noRecordsPlaceholder');
    const entries     = document.getElementById('historyEntries');
    if (!placeholder || !entries) return;

    if (history.length === 0) {
        placeholder.style.display = '';
        entries.classList.add('hidden');
        return;
    }

    history.sort((a, b) => b.ts - a.ts);

    const EVENT_CONFIG = {
        'login':           { icon: 'fa-sign-in-alt',   color: 'green',  label: 'Dashboard Login'    },
        'name_changed':    { icon: 'fa-user-edit',      color: 'blue',   label: 'Name Updated'       },
        'password_changed':{ icon: 'fa-shield-alt',     color: 'orange', label: 'Password Changed'   },
    };

    entries.innerHTML = history.map(h => {
        const cfg = EVENT_CONFIG[h.event] || EVENT_CONFIG['login'];
        return `
        <div class="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-2xl hover:border-white/20 transition-all">
            <div class="flex items-center gap-4">
                <div class="w-10 h-10 rounded-xl bg-${cfg.color}-500/10 flex items-center justify-center">
                    <i class="fas ${cfg.icon} text-${cfg.color}-400"></i>
                </div>
                <div>
                    <p class="text-white font-bold text-sm">${cfg.label}</p>
                    <p class="text-[11px] text-gray-400">${h.date} · ${h.time}</p>
                </div>
            </div>
            <span class="text-xs px-3 py-1 bg-${cfg.color}-500/10 text-${cfg.color}-400 rounded-full font-bold uppercase tracking-wider">
                ${h.event === 'login' ? 'Recorded' : 'Changed'}
            </span>
        </div>`;
    }).join('');

    placeholder.style.display = 'none';
    entries.classList.remove('hidden');
}

// ── Live clock ───────────────────────────────────────────────
function startClock() {
    const clock = document.getElementById('liveHistoryClock');
    if (!clock) return;
    const tick = () => {
        clock.textContent = new Date().toLocaleTimeString('en-US', {
            hour12: true, hour: 'numeric', minute: '2-digit', second: '2-digit'
        });
    };
    tick();
    setInterval(tick, 1000);
}

function initHistory() {
    recordIfNewDay();
    startClock();
}

// Re-render whenever the History tab becomes visible
// (called by updateSettingsTab via the Settings view refresh)
window.refreshHistory = function() {
    renderHistory(getHistory());
    startClock();
};

// Auto-init if history elements are on the page
if (document.getElementById('noRecordsPlaceholder')) {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initHistory);
    } else {
        initHistory();
    }
    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') setTimeout(initHistory, 300);
    });
}

