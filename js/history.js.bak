
// history.js - Login History (only run where #noRecordsPlaceholder exists)

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

function recordIfNewDay() {
    const today = new Date().toISOString().split('T')[0];
    const history = getHistory();

    if (history.some(h => h.date === today)) {
        console.log(`[History] ${today} already recorded`);
        renderHistory(history);
        return;
    }

    const time = new Date().toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    });

    history.push({ date: today, time, ts: Date.now() });
    saveHistory(history);
    console.log(`[History] Recorded: ${today} ${time}`);

    renderHistory(history);
}

function renderHistory(history) {
    const placeholder = document.getElementById('noRecordsPlaceholder');
    const entries = document.getElementById('historyEntries');

    if (!placeholder || !entries) {
        console.warn("[History] Elements missing - skipping render");
        return;
    }

    if (history.length === 0) {
        placeholder.style.display = '';
        entries.classList.add('hidden');
        return;
    }

    history.sort((a, b) => b.ts - a.ts);

    let html = '';
    history.forEach(h => {
        html += `
            <div class="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-2xl">
                <div class="flex items-center gap-4">
                    <div class="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center">
                        <i class="fas fa-sign-in-alt text-green-400"></i>
                    </div>
                    <div>
                        <p class="text-white font-medium">${h.date}</p>
                        <p class="text-[11px] text-gray-400">${h.time}</p>
                    </div>
                </div>
                <span class="text-xs px-3 py-1 bg-green-500/10 text-green-400 rounded-full">Recorded</span>
            </div>
        `;
    });

    entries.innerHTML = html;
    placeholder.style.display = 'none';
    entries.classList.remove('hidden');
}

function startClock() {
    const clock = document.getElementById('liveHistoryClock');
    if (!clock) return;

    const tick = () => {
        clock.textContent = new Date().toLocaleTimeString('en-US', {
            hour12: true,
            hour: 'numeric',
            minute: '2-digit',
            second: '2-digit'
        });
    };
    tick();
    setInterval(tick, 1000);
}

function initHistory() {
    recordIfNewDay();
    startClock();
}

// Run only if history section exists
if (document.getElementById('noRecordsPlaceholder')) {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initHistory);
    } else {
        initHistory();
    }

    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') {
            setTimeout(initHistory, 300);
        }
    });
}
