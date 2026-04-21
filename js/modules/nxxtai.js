/* ── T LEARN PRO: modules/nxxtai.js (Local Session & Manual Override) ── */

const NXXT_CONFIG = {
    IMG_GEN_URL: 'https://image.pollinations.ai/prompt/',
    // Add your manual responses here
    MANUAL_REPLIES: {
        "hello": "Neural link established. System standing by for tactical commands.",
        "status": "All systems operational. Protocol NX_V4 active. Neural logs synced.",
        "default": "Command received. Manual training protocol active. [Awaiting backend override]"
    }
};

document.addEventListener('DOMContentLoaded', () => {
    syncNeuralLogs();

    document.body.addEventListener('click', (e) => {
        // Core Actions
        if (e.target.closest('#nxxtSendBtn')) sendMessage();
        if (e.target.closest('#newChatBtn')) handleNewChatSequence();
        if (e.target.closest('#searchChatBtn')) triggerNeuralSearch();

        // Mode Switcher
        const modeBtn = e.target.closest('#modeStandard') || e.target.closest('#modeFun');
        if (modeBtn) switchMode(modeBtn.id === 'modeFun' ? 'fun' : 'standard');
        
        // Quick Action Grid
        const actionCard = e.target.closest('.action-card');
        if (actionCard) {
            const cmd = actionCard.dataset.command;
            const input = document.getElementById('nxxtInput');
            if(input) { input.value = cmd; sendMessage(); }
        }
    });

    document.body.addEventListener('keypress', (e) => {
        if (e.target.id === 'nxxtInput' && e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });

    window.nxxtMode = window.nxxtMode || 'standard';
});

// --- SESSION MANAGEMENT ---

function handleNewChatSequence() {
    const thread = document.getElementById('aiThread');
    const landing = document.getElementById('nxxtLanding');

    // Only archive if there is an actual conversation happening
    if (!landing && thread.children.length > 0) {
        const firstUserMsg = thread.querySelector('.justify-end p')?.innerText || "Neural Session";
        saveToDatabase(firstUserMsg, thread.innerHTML);
    }

    // Reset UI to Landing State without page reload
    resetInterface();
}

function resetInterface() {
    const thread = document.getElementById('aiThread');
    // Inject the landing HTML back into the thread
    thread.innerHTML = `
        <div id="nxxtLanding" class="flex flex-col items-center justify-center min-h-full text-center space-y-8 animate-in fade-in zoom-in duration-700">
            <div class="relative">
                <div class="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-tr from-blue-700 via-blue-400 to-indigo-900 shadow-[0_0_80px_rgba(37,99,235,0.4)] flex items-center justify-center animate-pulse">
                    <i class="fas fa-bolt text-white text-4xl opacity-80"></i>
                </div>
            </div>
            <div class="max-w-xs mx-auto">
                <h1 class="text-2xl font-bold text-white mb-2 uppercase tracking-tighter">Engage Nxxt</h1>
                <p class="text-sm text-white/40 leading-relaxed font-light">Manual training protocols active. System ready for deployment.</p>
            </div>
            <div class="grid grid-cols-2 gap-4 w-full max-w-md px-4">
                <div class="bg-gradient-to-br from-blue-600/10 to-blue-900/5 border border-white/5 p-6 rounded-[2rem] text-left hover:border-blue-500/50 transition-all cursor-pointer group action-card" data-command="Speak to AI">
                    <i class="fas fa-microphone text-blue-500 mb-3 block"></i>
                    <span class="text-xs font-bold block uppercase tracking-widest">Speak to AI</span>
                </div>
                <div class="bg-gradient-to-br from-indigo-600/10 to-indigo-900/5 border border-white/5 p-6 rounded-[2rem] text-left hover:border-blue-500/50 transition-all cursor-pointer group action-card" data-command="Chat Neural">
                    <i class="fas fa-comment-dots text-indigo-500 mb-3 block"></i>
                    <span class="text-xs font-bold block uppercase tracking-widest">Chat Neural</span>
                </div>
                <div class="bg-gradient-to-br from-slate-600/10 to-slate-900/5 border border-white/5 p-6 rounded-[2rem] text-left hover:border-blue-500/50 transition-all cursor-pointer group action-card" data-command="Generate Assets">
                    <i class="fas fa-image text-slate-400 mb-3 block"></i>
                    <span class="text-xs font-bold block uppercase tracking-widest">Generate Assets</span>
                </div>
                <div class="bg-gradient-to-br from-purple-600/10 to-purple-900/5 border border-white/5 p-6 rounded-[2rem] text-left hover:border-blue-500/50 transition-all cursor-pointer group action-card" data-command="Scan Logic">
                    <i class="fas fa-expand text-purple-500 mb-3 block"></i>
                    <span class="text-xs font-bold block uppercase tracking-widest">Scan Logic</span>
                </div>
            </div>
        </div>
    `;
    document.getElementById('nxxtInput').value = '';
    document.getElementById('nxxtInput').focus();
}

// --- MESSAGE HANDLING (MANUAL OVERRIDE) ---

async function sendMessage() {
    const input = document.getElementById('nxxtInput');
    const thread = document.getElementById('aiThread');
    const landing = document.getElementById('nxxtLanding');
    
    if (!input || !thread) return;
    const prompt = input.value.trim();
    if (!prompt) return;

    if (landing) landing.remove();

    input.value = '';
    renderUserMessage(prompt);
    scrollThread();

    const thinkId = 'think-' + Date.now();
    showThinkingIndicator(thinkId);

    // Simulate Processing Delay
    setTimeout(() => {
        document.getElementById(thinkId)?.remove();
        
        const isImage = /image|draw|generate|picture/i.test(prompt);
        if (isImage) {
            handleManualImage(prompt);
        } else {
            handleManualText(prompt);
        }
    }, 1200);
}

function handleManualText(prompt) {
    const key = prompt.toLowerCase();
    let response = NXXT_CONFIG.MANUAL_REPLIES[key] || NXXT_CONFIG.MANUAL_REPLIES["default"];
    
    if(window.nxxtMode === 'fun') response = `🔥 [FUN_MODE]: ${response} 🚀`;
    
    renderAiResponse(response, 'text');
}

function handleManualImage(prompt) {
    const seed = Math.floor(Math.random() * 9999);
    const url = `${NXXT_CONFIG.IMG_GEN_URL}${encodeURIComponent(prompt)}?seed=${seed}&nologo=true`;
    renderAiResponse(url, 'image');
}

// --- MODAL ALERT SYSTEM ---

function showAlert(message) {
    const modal = document.createElement('div');
    modal.className = "fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in";
    modal.innerHTML = `
        <div class="bg-[#020408] border border-white/10 p-8 rounded-[2rem] max-w-sm w-full text-center shadow-[0_0_50px_rgba(37,99,235,0.2)] animate-in zoom-in duration-300">
            <div class="w-16 h-16 bg-blue-600/20 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-blue-500/30">
                <i class="fas fa-bolt text-blue-500 text-2xl"></i>
            </div>
            <p class="text-white font-black uppercase tracking-widest text-[10px] mb-6">${message}</p>
            <button onclick="this.closest('.fixed').remove()" class="w-full py-4 bg-blue-600 text-white rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-blue-500 transition-colors">Acknowledge</button>
        </div>
    `;
    document.body.appendChild(modal);
}

// --- DATABASE LOGIC (LOCALSTORAGE) ---

function saveToDatabase(title, html) {
    let logs = JSON.parse(localStorage.getItem('nxxt_logs') || '[]');
    const newEntry = {
        id: Date.now(),
        title: title.length > 25 ? title.substring(0, 25) + "..." : title,
        data: html,
        time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    };
    logs.unshift(newEntry);
    localStorage.setItem('nxxt_logs', JSON.stringify(logs.slice(0, 15)));
    syncNeuralLogs();
    showAlert("Neural Session Archived");
}

function syncNeuralLogs() {
    const list = document.getElementById('historyList');
    const noState = document.getElementById('historyNoState');
    const logs = JSON.parse(localStorage.getItem('nxxt_logs') || '[]');
    if (!list) return;

    if (logs.length > 0) {
        if(noState) noState.style.display = 'none';
        list.innerHTML = logs.map(log => `
            <div onclick="restoreNeuralLink(${log.id})" class="p-4 bg-white/[0.03] border border-white/5 rounded-2xl hover:border-blue-500/50 cursor-pointer transition-all group animate-in slide-in-from-right-2">
                <div class="flex justify-between items-center mb-1">
                    <span class="text-[8px] font-black text-blue-500 uppercase tracking-widest">LOG_${log.id.toString().slice(-4)}</span>
                    <span class="text-[8px] text-white/20">${log.time}</span>
                </div>
                <p class="text-[11px] text-white/50 group-hover:text-white truncate font-medium">${log.title}</p>
            </div>
        `).join('');
    }
}

window.restoreNeuralLink = (id) => {
    const logs = JSON.parse(localStorage.getItem('nxxt_logs') || '[]');
    const log = logs.find(l => l.id === id);
    if (log) {
        document.getElementById('aiThread').innerHTML = log.data;
        scrollThread();
        showAlert(`Restoring Neural Link: LOG_${id.toString().slice(-4)}`);
    }
};

// --- HELPERS ---

function renderUserMessage(text) {
    const thread = document.getElementById('aiThread');
    thread.insertAdjacentHTML('beforeend', `
        <div class="flex justify-end mb-8 animate-in slide-in-from-right-4">
            <div class="bg-blue-600 text-white rounded-[2rem] rounded-tr-sm p-5 max-w-[85%] shadow-lg border border-white/10">
                <p class="text-[16px] font-medium leading-relaxed">${text}</p>
            </div>
        </div>
    `);
}

function renderAiResponse(content, type) {
    const thread = document.getElementById('aiThread');
    const formatted = type === 'text' 
        ? content.replace(/\*\*(.*?)\*\*/g, '<b class="text-blue-400">$1</b>').replace(/\n/g, '<br>') 
        : `<div class="space-y-4"><img src="${content}" class="rounded-[2rem] border border-white/10 shadow-2xl" /><p class="text-[9px] text-blue-500 font-bold uppercase tracking-[0.3em]">Neural Asset Processed</p></div>`;

    thread.insertAdjacentHTML('beforeend', `
        <div class="flex gap-4 md:gap-6 animate-in slide-in-from-left-4 mb-10">
            <div class="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-900 flex items-center justify-center border border-white/10 shrink-0">
                <i class="fas fa-bolt text-white text-xs"></i>
            </div>
            <div class="flex-1 pt-1 text-slate-300 text-lg font-light leading-relaxed">${formatted}</div>
        </div>
    `);
    scrollThread();
}

function showThinkingIndicator(id) {
    const thread = document.getElementById('aiThread');
    thread.insertAdjacentHTML('beforeend', `
        <div id="${id}" class="flex gap-4 animate-in fade-in mb-8">
            <div class="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
                <i class="fas fa-brain text-[10px] text-blue-500 animate-pulse"></i>
            </div>
            <div class="flex items-center gap-1.5 px-2">
                <div class="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce"></div>
                <div class="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" style="animation-delay:0.1s"></div>
            </div>
        </div>
    `);
}

function scrollThread() {
    const thread = document.getElementById('aiThread');
    if (thread) requestAnimationFrame(() => thread.scrollTo({ top: thread.scrollHeight, behavior: 'smooth' }));
}

function switchMode(mode) {
    window.nxxtMode = mode;
    const std = document.getElementById('modeStandard');
    const fun = document.getElementById('modeFun');
    if (!std || !fun) return;
    const active = "px-4 py-1.5 rounded-lg text-[9px] font-black uppercase text-white bg-blue-600 shadow-lg transition-all";
    const inactive = "px-4 py-1.5 rounded-lg text-[9px] font-black uppercase text-white/30 transition-all";
    std.className = mode === 'standard' ? active : inactive;
    fun.className = mode === 'fun' ? active : inactive;
}

////// FOR THE NXXT LAB

    function showLabModal(title, msg, icon) {
        document.getElementById('labModalTitle').innerText = title;
        document.getElementById('labModalMsg').innerText = msg;
        document.getElementById('labModalIcon').className = 'fas ' + icon + ' text-blue-500 text-2xl';
        document.getElementById('labModal').classList.remove('hidden');
    }

    // Dynamic log simulator to show they are "cooking"
    const logs = [
        ">> Syncing with edge nodes...",
        ">> Optimizing memory allocation...",
        ">> Patching security vulnerability v4.2...",
        ">> Re-routing logic streams...",
        ">> Finalizing build manifest...",
        ">> Updating local environment..."
    ];
    
    setInterval(() => {
        const logContainer = document.getElementById('buildLogs');
        if(!logContainer) return;
        const newLog = document.createElement('div');
        newLog.className = "text-white/30 animate-in slide-in-from-left-2 duration-500";
        newLog.innerText = logs[Math.floor(Math.random() * logs.length)];
        logContainer.appendChild(newLog);
        logContainer.scrollTop = logContainer.scrollHeight;
        if(logContainer.children.length > 15) logContainer.removeChild(logContainer.firstChild);
    }, 3000);



////  FOR THE SIDE HUSTLE HUB

    function showHustleModal(title, msg, icon) {
        document.getElementById('hustleTitle').innerText = title;
        document.getElementById('hustleMsg').innerText = msg;
        document.getElementById('hustleIcon').className = 'fas ' + icon + ' text-emerald-500 text-2xl';
        document.getElementById('hustleModal').classList.remove('hidden');
    }



/////  FOR THE XT PAY
const NxxtDashboard = {
    logInterval: null,

    // Universal Modal Handler
    showAlert: function(type, title, msg, icon) {
        const modal = document.getElementById(`${type}Modal`);
        if (!modal) return;
        
        document.getElementById(`${type}Title`).innerText = title;
        document.getElementById(`${type}Msg`).innerText = msg;
        document.getElementById(`${type}Icon`).className = `fas ${icon} text-blue-500 text-2xl`;
        modal.classList.remove('hidden');
    },

    // Engineering Stream Logic
    startBuildStream: function(containerId) {
        if (this.logInterval) clearInterval(this.logInterval);
        
        const container = document.getElementById(containerId);
        if (!container) return;

        this.logInterval = setInterval(() => {
            const logs = document.getElementById(containerId);
            if (!logs) {
                clearInterval(this.logInterval);
                return;
            }

            const actions = ["ENCRYPT_NODE", "SYNC_LEDGER", "BRIDGE_API", "AUTH_HANDSHAKE", "STRESS_TEST"];
            const randomAction = actions[Math.floor(Math.random() * actions.length)];
            const id = Math.floor(Math.random() * 999);
            
            const newLog = document.createElement('div');
            newLog.className = "flex gap-3 animate-in slide-in-from-right-4 duration-700 font-mono text-[10px]";
            newLog.innerHTML = `<span class="text-blue-600">${(logs.children.length + 1).toString().padStart(2, '0')}</span>
                               <p class="text-white/40">ENGINEER_ACTION: ${randomAction}_${id}</p>`;
            
            logs.appendChild(newLog);
            if (logs.children.length > 10) logs.removeChild(logs.firstChild);
        }, 3000);
    }
};
window.NxxtDashboard = NxxtDashboard;
window.NxxtDashboard = NxxtDashboard;

    // Initialize the engineering stream for this module
    // FIX: now called lazily when user opens Xt Pay tab (see updateView)




//////// FOR THE ASSITANT AI NOT NXXT AI 
// --- JIVO INTEGRATION SYSTEM ---

function toggleChat() {
    const chatWin = document.getElementById('aiChatWindow');
    chatWin.classList.toggle('hidden');
}

function sendChatMessage() {
    const input = document.getElementById('chatInput');
    const container = document.getElementById('chatMessages');
    const message = input.value.trim();

    if (!message) return;

    // 1. Display User Message in James UI
    const userDiv = document.createElement('div');
    userDiv.className = "flex flex-col items-end space-y-1 mb-4";
    userDiv.innerHTML = `
        <div class="bg-blue-600 px-4 py-2.5 rounded-[1.2rem] rounded-tr-none text-[11px] text-white font-medium max-w-[90%] shadow-lg">
            ${message}
        </div>
    `;
    container.appendChild(userDiv);
    input.value = '';
    container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });

    // 2. Route to JivoChat API
    if (window.jivo_api) {
        // We send the message to the real agent in the background
        // Note: Jivo may require the window to be open to receive messages via API
        
        setTimeout(() => {
            const jamesDiv = document.createElement('div');
            jamesDiv.className = "flex gap-3 animate-in fade-in slide-in-from-left-2 duration-300 mb-4";
            jamesDiv.innerHTML = `
                <div class="w-6 h-6 rounded-lg bg-blue-600/20 flex items-center justify-center flex-shrink-0 border border-blue-500/20">
                    <i class="fas fa-terminal text-[10px] text-blue-400"></i>
                </div>
                <div class="bg-white/5 p-4 rounded-[1.2rem] rounded-tl-none text-[11px] text-white/70 leading-relaxed max-w-[85%] border border-white/5">
                    <span class="text-blue-400 font-bold block mb-1 text-[8px] tracking-widest uppercase">James</span>
                    [SYSTEM]: Uplink established. Bridging to a live agent. **Hold on...**
                </div>
            `;
            container.appendChild(jamesDiv);
            container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });

            // 3. The Hand-off
            setTimeout(() => {
                document.body.classList.add('agent-bridge-active');
                toggleChat(); // Close James
                jivo_api.open(); // Open Jivo
            }, 2000);

        }, 800);
    } else {
        // Central Modal Alert if Jivo is blocked or failed
        showCentralAlert("CRITICAL: AGENT MODULE OFFLINE. CHECK CONNECTION.");
    }
}

// 4. Mutation Observer to keep Gerald hidden
const jivoObserver = new MutationObserver(() => {
    const jivo = document.querySelector('.jivo-iframe-container');
    if (jivo && !document.body.classList.contains('agent-bridge-active')) {
        jivo.style.setAttribute('style', 'display:none !important');
    }
});
jivoObserver.observe(document.documentElement, { childList: true, subtree: true });






