/* ── T LEARN PRO: modules/nxxtai.js (Neural Command Build) ── */

const NXXT_CONFIG = {
    API_ENDPOINT: 'https://api.technxxt.com/v1/neural-process', 
    IMG_GEN_URL: 'https://image.pollinations.ai/prompt/',
    SYSTEM_PROMPT: "You are Tech Nxxt AI, a tactical industrial intelligence. Your tone is professional, high-octane, and precise. You specialize in software development, full-stack tech, and Mikoko League management. Use industrial metaphors."
};

document.addEventListener('DOMContentLoaded', () => {
    // Event Delegation for persistent UI elements
    document.body.addEventListener('click', (e) => {
        if (e.target.closest('#nxxtSendBtn')) sendMessage();
        
        const modeBtn = e.target.closest('#modeStandard') || e.target.closest('#modeFun');
        if (modeBtn) switchMode(modeBtn.id === 'modeFun' ? 'fun' : 'standard');
        
        // Quick Action Grid Handler
        const actionCard = e.target.closest('.action-card');
        if (actionCard) {
            const cmd = actionCard.dataset.command;
            document.getElementById('nxxtInput').value = cmd;
            sendMessage();
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

    // TRANSITION: Hide Orb Landing if it exists
    if (landing) {
        landing.classList.add('fade-out');
        setTimeout(() => landing.remove(), 500);
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
            await handleTechNxxtNeuralProcess(prompt, thinkId);
        }
    } catch (error) {
        if (document.getElementById(thinkId)) document.getElementById(thinkId).remove();
        handleError(error);
    } finally {
        input.disabled = false;
        input.focus();
    }
}

async function handleTechNxxtNeuralProcess(prompt, thinkId) {
    // Dynamic Load UI Feedback
    const cpuBar = document.getElementById('cpuLoadBar');
    if(cpuBar) cpuBar.style.width = '85%';

    const response = await fetch(NXXT_CONFIG.API_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            model: "nxxt-v4-turbo",
            system_instruction: NXXT_CONFIG.SYSTEM_PROMPT,
            messages: [{ role: "user", content: prompt }],
            context_mode: window.nxxtMode
        })
    });

    if (!response.ok) throw new Error("NETWORK_ERROR");

    const data = await response.json();
    document.getElementById(thinkId)?.remove();
    
    let finalReply = data.output || data.reply || "Link Failure.";
    if(window.nxxtMode === 'fun') finalReply = `🔥 [OVERRIDE]: ${finalReply} 🚀`;

    renderAiResponse(finalReply, 'text');
    if(cpuBar) cpuBar.style.width = '12%';
}

async function handleImageGeneration(prompt, thinkId) {
    window.imgCredits--;
    updateCreditUI();
    const seed = Math.floor(Math.random() * 99999);
    const imageUrl = `${NXXT_CONFIG.IMG_GEN_URL}${encodeURIComponent(prompt)}?width=1024&height=1024&nologo=true&seed=${seed}`;
    
    await new Promise(r => { const img = new Image(); img.src = imageUrl; img.onload = r; img.onerror = r; });
    document.getElementById(thinkId)?.remove();
    renderAiResponse(imageUrl, 'image');
}

function renderUserMessage(text) {
    const thread = document.getElementById('aiThread');
    thread.insertAdjacentHTML('beforeend', `
        <div class="flex justify-end mb-8 animate-in slide-in-from-right-4 duration-300">
            <div class="bg-blue-600 text-white rounded-[2rem] rounded-tr-sm p-5 max-w-[85%] shadow-lg shadow-blue-600/20 border border-white/10">
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
        <div class="flex gap-4 md:gap-6 animate-in slide-in-from-left-4 duration-500 mb-10">
            <div class="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-900 flex items-center justify-center border border-white/10 shadow-lg shrink-0">
                <i class="fas fa-bolt text-white text-xs"></i>
            </div>
            <div class="flex-1 pt-1 text-slate-300 text-lg font-light leading-relaxed">${formatted}</div>
        </div>
    `);
    scrollThread();
}

function switchMode(mode) {
    window.nxxtMode = mode;
    const std = document.getElementById('modeStandard');
    const fun = document.getElementById('modeFun');
    if (!std || !fun) return;
    
    const activeClass = "px-5 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all text-white bg-blue-600 shadow-lg";
    const inactiveClass = "px-5 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all text-white/30";
    
    std.className = mode === 'standard' ? activeClass : inactiveClass;
    fun.className = mode === 'fun' ? activeClass : inactiveClass;
}

function showThinkingIndicator(id) {
    const thread = document.getElementById('aiThread');
    thread.insertAdjacentHTML('beforeend', `
        <div id="${id}" class="flex gap-4 animate-in fade-in mb-8">
            <div class="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
                <i class="fas fa-brain text-[10px] text-blue-500 animate-pulse"></i>
            </div>
            <div class="flex items-center gap-1.5"><div class="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce"></div><div class="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" style="animation-delay:0.1s"></div></div>
        </div>
    `);
}

function handleError(error) {
    const msg = error.message === "CREDIT_LIMIT" ? "Visual Bandwidth Exhausted." : "Neural Link Severed.";
    const modal = document.createElement('div');
    modal.className = "fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4";
    modal.innerHTML = `<div class="bg-[#0d1117] border border-white/10 p-8 rounded-[2rem] max-w-sm w-full text-center shadow-2xl animate-in zoom-in">
        <i class="fas fa-exclamation-triangle text-blue-500 text-3xl mb-4"></i>
        <p class="text-white font-bold mb-6 uppercase tracking-tighter text-xs">${msg}</p>
        <button onclick="this.closest('.fixed').remove()" class="w-full py-3 bg-white text-black rounded-xl font-black uppercase tracking-widest text-[10px]">Acknowledge</button>
    </div>`;
    document.body.appendChild(modal);
}

function updateCreditUI() {
    const bar = document.getElementById('imageCredits');
    if (bar && bar.lastElementChild) bar.removeChild(bar.lastElementChild);
}

function scrollThread() {
    const thread = document.getElementById('aiThread');
    if (thread) requestAnimationFrame(() => thread.scrollTo({ top: thread.scrollHeight, behavior: 'smooth' }));
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






