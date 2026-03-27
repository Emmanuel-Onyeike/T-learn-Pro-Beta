// history.js — Login & Account Event History
// Records login on EVERY page load. Renders when History tab opens.

const HISTORY_KEY = 'tlearnpro_login_history';

function getHistory() {
    try { return JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]'); } catch { return []; }
}
function saveHistory(arr) {
    try { localStorage.setItem(HISTORY_KEY, JSON.stringify(arr)); } catch {}
}

// ── Record login — runs on page load regardless of DOM state ─────────────────
async function recordIfNewDay() {
    const today   = new Date().toISOString().split('T')[0];
    const history = getHistory();
    const already = history.some(h => h.date === today && h.event === 'login');

    if (!already) {
        const time = new Date().toLocaleTimeString('en-US', { hour:'numeric', minute:'2-digit', hour12:true });
        history.push({ date: today, time, ts: Date.now(), event: 'login' });
        saveHistory(history);
        console.log('[History] Login recorded for', today);

        // Try Supabase sync — but don't block on it
        _syncHistoryToSupabase('login', today, time);
    }

    // Only render if the DOM elements are present (History tab is open)
    renderHistory(history);
}

async function _syncHistoryToSupabase(eventType, date, time) {
    try {
        if (!window.supabaseLoader || !window.AuthState) return;
        const client = await window.supabaseLoader.load();
        const user   = await window.AuthState.getUser();
        if (!user) return;
        await client.from('login_history').insert({
            user_id: user.id, event_type: eventType,
            event_date: date, event_time: time
        });
        console.log('[History] Synced to Supabase:', eventType);
    } catch(e) {
        // Silently fail — localStorage is the source of truth
        console.warn('[History] Supabase sync skipped:', e.message);
    }
}

// ── Record account event (name change, password change) ──────────────────────
function recordHistoryEvent(eventType) {
    const today   = new Date().toISOString().split('T')[0];
    const time    = new Date().toLocaleTimeString('en-US', { hour:'numeric', minute:'2-digit', hour12:true });
    const history = getHistory();
    history.push({ date: today, time, ts: Date.now(), event: eventType });
    saveHistory(history);
    _syncHistoryToSupabase(eventType, today, time);
    renderHistory(history);
}

// ── Render ────────────────────────────────────────────────────────────────────
function renderHistory(history) {
    const placeholder = document.getElementById('noRecordsPlaceholder');
    const entries     = document.getElementById('historyEntries');
    if (!placeholder || !entries) return; // History tab not open yet — that's fine

    if (!history.length) {
        placeholder.style.display = '';
        entries.classList.add('hidden');
        return;
    }

    history.sort((a, b) => b.ts - a.ts);

    const CFG = {
        'login':            { icon:'fa-sign-in-alt',  color:'green',  label:'Dashboard Login'  },
        'name_changed':     { icon:'fa-user-edit',    color:'blue',   label:'Name Updated'     },
        'password_changed': { icon:'fa-shield-alt',   color:'orange', label:'Password Changed' },
    };

    entries.innerHTML = history.slice(0, 50).map(h => {
        const c = CFG[h.event] || CFG['login'];
        return `
        <div class="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-2xl hover:border-white/20 transition-all">
            <div class="flex items-center gap-4">
                <div class="w-10 h-10 rounded-xl bg-${c.color}-500/10 flex items-center justify-center">
                    <i class="fas ${c.icon} text-${c.color}-400"></i>
                </div>
                <div>
                    <p class="text-white font-bold text-sm">${c.label}</p>
                    <p class="text-[11px] text-gray-400">${h.date} · ${h.time}</p>
                </div>
            </div>
            <span class="text-xs px-3 py-1 bg-${c.color}-500/10 text-${c.color}-400 rounded-full font-bold uppercase tracking-wider">
                ${h.event === 'login' ? 'Recorded' : 'Changed'}
            </span>
        </div>`;
    }).join('');

    placeholder.style.display = 'none';
    entries.classList.remove('hidden');
}

// ── Clock ─────────────────────────────────────────────────────────────────────
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

// ── Public API ────────────────────────────────────────────────────────────────
// Called by ui.js when History tab opens
window.refreshHistory = function() {
    renderHistory(getHistory());
    startClock();
};

// ── Auto-init — ALWAYS runs on page load, no DOM dependency ──────────────────
function initHistory() {
    recordIfNewDay(); // records to localStorage immediately
    startClock();     // only starts clock if element exists
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHistory);
} else {
    initHistory();
}

// Re-check on tab focus (catches cases where user left and came back)
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
        setTimeout(recordIfNewDay, 500);
    }
});
