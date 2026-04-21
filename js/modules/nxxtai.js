const NXXT_CONFIG = {
    API_ENDPOINT: 'https://api.technxxt.com/v1/neural-process', 
    IMG_GEN_URL: 'https://image.pollinations.ai/prompt/',
    SYSTEM_PROMPT: "Tech Nxxt AI: Tactical Industrial Intelligence. Professional, high-octane, precise. Focus: Full-stack, Mikoko League, UI/UX."
};

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Neural Logs from Database
    syncNeuralLogs();

    document.body.addEventListener('click', (e) => {
        if (e.target.closest('#nxxtSendBtn')) sendMessage();
        
        // Mode Switcher
        const modeBtn = e.target.closest('#modeStandard') || e.target.closest('#modeFun');
        if (modeBtn) switchMode(modeBtn.id === 'modeFun' ? 'fun' : 'standard');
        
        // Navigation Icons
        if (e.target.closest('#newChatBtn')) startNewInterface();
        if (e.target.closest('#searchChatBtn')) triggerNeuralSearch();

        // Quick Action Grid Handler
        const actionCard = e.target.closest('.action-card');
        if (actionCard) {
            const cmd = actionCard.dataset.command;
            const input = document.getElementById('nxxtInput');
            if(input) {
                input.value = cmd;
                sendMessage();
            }
        }
    });

    document.body.addEventListener('keypress', (e) => {
        if (e.target.id === 'nxxtInput' && e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });

    window.imgCredits = window.imgCredits || 5;
    window.nxxtMode = window.nxxtMode || 'standard';
});

async function sendMessage() {
    const input = document.getElementById('nxxtInput');
    const thread = document.getElementById('aiThread');
    const landing = document.getElementById('nxxtLanding');
    
    if (!input || !thread) return;
    const prompt = input.value.trim();
    if (!prompt) return;

    // Transition: Clear Landing for Active Thread
    if (landing) {
        landing.classList.add('fade-out');
        setTimeout(() => landing.remove(), 400);
    }

    input.value = '';
    input.disabled = true;

    renderUserMessage(prompt);
    scrollThread();

    const thinkId = 'think-' + Date.now();
    showThinkingIndicator(thinkId);

    try {
        const isImage = /image|draw|generate|picture/i.test(prompt);
        if (isImage) {
            if (window.imgCredits <= 0) throw new Error("CREDIT_LIMIT");
            await handleImageGeneration(prompt, thinkId);
        } else {
            await handleNeuralProcess(prompt, thinkId);
        }
        // Auto-save thread state to DB after every exchange
        updateCurrentLog(thread.innerHTML);
    } catch (error) {
        if (document.getElementById(thinkId)) document.getElementById(thinkId).remove();
        handleError(error);
    } finally {
        input.disabled = false;
        input.focus();
    }
}

// --- DATABASE & LOGIC ENGINE ---

function startNewInterface() {
    const thread = document.getElementById('aiThread');
    if (thread.children.length > 1) { // Save current before clearing
        const firstMsg = thread.querySelector('p')?.innerText || "Neural Session";
        saveToDatabase(firstMsg, thread.innerHTML);
    }
    location.reload(); // Quickest way to reset all states to "New Chat"
}

function saveToDatabase(title, html) {
    let logs = JSON.parse(localStorage.getItem('nxxt_logs') || '[]');
    const newEntry = {
        id: Date.now(),
        title: title.slice(0, 30) + "...",
        data: html,
        time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    };
    logs.unshift(newEntry);
    localStorage.setItem('nxxt_logs', JSON.stringify(logs.slice(0, 20))); // Keep last 20
    syncNeuralLogs();
}

function syncNeuralLogs() {
    const list = document.getElementById('historyList');
    const noState = document.getElementById('historyNoState');
    const logs = JSON.parse(localStorage.getItem('nxxt_logs') || '[]');

    if (!list) return;

    if (logs.length > 0) {
        if(noState) noState.style.display = 'none';
        list.innerHTML = logs.map(log => `
            <div onclick="restoreNeuralLink(${log.id})" class="p-4 bg-white/[0.03] border border-white/5 rounded-2xl hover:border-blue-500/50 cursor-pointer transition-all group">
                <div class="flex justify-between items-center mb-1">
                    <span class="text-[8px] font-black text-blue-500 uppercase tracking-widest">LOG_${log.id.toString().slice(-4)}</span>
                    <span class="text-[8px] text-white/20">${log.time}</span>
                </div>
                <p class="text-[11px] text-white/50 group-hover:text-white truncate">${log.title}</p>
            </div>
        `).join('');
    }
}

window.restoreNeuralLink = (id) => {
    const logs = JSON.parse(localStorage.getItem('nxxt_logs') || '[]');
    const log = logs.find(l => l.id === id);
    if (log) {
        const landing = document.getElementById('nxxtLanding');
        if(landing) landing.remove();
        document.getElementById('aiThread').innerHTML = log.data;
        scrollThread();
    }
};

function triggerNeuralSearch() {
    const query = prompt("Enter Neural ID or Keyword:");
    if (!query) return;
    const logs = document.querySelectorAll('#historyList > div');
    logs.forEach(log => {
        const text = log.innerText.toLowerCase();
        log.style.display = text.includes(query.toLowerCase()) ? 'block' : 'none';
    });
}

// --- API & RENDERING ---

async function handleNeuralProcess(prompt, thinkId) {
    // API logic remains consistent with your endpoint
    try {
        const response = await fetch(NXXT_CONFIG.API_ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                model: "nxxt-v4-turbo",
                prompt: prompt,
                mode: window.nxxtMode
            })
        });

        const data = await response.json();
        document.getElementById(thinkId)?.remove();
        let reply = data.output || "Link Stabilized. No data returned.";
        if(window.nxxtMode === 'fun') reply = `🔥 [OVERRIDE]: ${reply} 🚀`;
        renderAiResponse(reply, 'text');
    } catch (e) {
        // Fallback for manual training/offline
        document.getElementById(thinkId)?.remove();
        renderAiResponse("Neural Link Offline. Manual Override suggested.", 'text');
    }
}

async function handleImageGeneration(prompt, thinkId) {
    window.imgCredits--;
    updateCreditUI();
    const seed = Math.floor(Math.random() * 99999);
    const imageUrl = `${NXXT_CONFIG.IMG_GEN_URL}${encodeURIComponent(prompt)}?width=1024&height=1024&seed=${seed}`;
    
    await new Promise(r => { const img = new Image(); img.src = imageUrl; img.onload = r; img.onerror = r; });
    document.getElementById(thinkId)?.remove();
    renderAiResponse(imageUrl, 'image');
}

function renderUserMessage(text) {
    const thread = document.getElementById('aiThread');
    thread.insertAdjacentHTML('beforeend', `
        <div class="flex justify-end mb-8 animate-in slide-in-from-right-4">
            <div class="bg-blue-600 text-white rounded-[2rem] rounded-tr-sm p-5 max-w-[85%] shadow-lg border border-white/10">
                <p class="text-[16px] font-medium">${text}</p>
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
            <div class="flex items-center gap-1.5">
                <div class="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce"></div>
                <div class="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" style="animation-delay:0.1s"></div>
            </div>
        </div>
    `);
}

function scrollThread() {
    const thread = document.getElementById('aiThread');
    if (thread) {
        requestAnimationFrame(() => {
            thread.scrollTo({ top: thread.scrollHeight, behavior: 'smooth' });
        });
    }
}

function switchMode(mode) {
    window.nxxtMode = mode;
    const std = document.getElementById('modeStandard');
    const fun = document.getElementById('modeFun');
    if (!std || !fun) return;
    const active = "px-4 py-1.5 rounded-lg text-[9px] font-black uppercase text-white bg-blue-600 shadow-lg";
    const inactive = "px-4 py-1.5 rounded-lg text-[9px] font-black uppercase text-white/30";
    std.className = mode === 'standard' ? active : inactive;
    fun.className = mode === 'fun' ? active : inactive;
}

function handleError(error) {
    const msg = error.message === "CREDIT_LIMIT" ? "Visual Bandwidth Exhausted." : "NO connection please.";
    alert(msg); // You can replace with your modal logic if preferred
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






