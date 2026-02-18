/* ── T LEARN PRO: modules/nxxtai.js ── */
/* Nxxt AI: chat flow, image gen, build stream, Jivo agent */

function handleNxxtFlow() {
    sendMessage();
}

/**
 * Main function called by the Send Button or Enter Key
 */
async function sendMessage() {
    const input = document.getElementById('nxxtInput');
    const thread = document.getElementById('aiThread');
    const watermark = document.getElementById('nxxtWatermark');
    const prompt = input.value.trim();

    if (!prompt) return;

    // 1. UI RESET & WATERMARK FADE
    if (watermark) watermark.style.opacity = '0.01';
    input.value = '';
    input.style.height = 'auto';

    // 2. RENDER USER MESSAGE
    thread.insertAdjacentHTML('beforeend', `
        <div class="flex justify-end mb-8 animate-in slide-in-from-right-4 duration-300">
            <div class="bg-blue-600 text-white rounded-[2rem] rounded-tr-sm p-5 max-w-[80%] shadow-lg shadow-blue-600/10">
                <p class="text-[16px] font-medium leading-relaxed">${prompt}</p>
            </div>
        </div>
    `);
    
    scrollThread();

    // 3. CREATE THINKING INDICATOR
    const thinkId = 'think-' + Date.now();
    thread.insertAdjacentHTML('beforeend', `
        <div id="${thinkId}" class="flex gap-4 animate-in fade-in mb-8">
            <div class="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
                <i class="fas fa-brain text-[10px] text-blue-500 animate-pulse"></i>
            </div>
            <div class="flex items-center gap-1">
                <div class="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" style="animation-delay:0ms"></div>
                <div class="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" style="animation-delay:150ms"></div>
                <div class="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" style="animation-delay:300ms"></div>
            </div>
        </div>
    `);
    scrollThread();

    // 4. LOGIC: TEXT VS IMAGE (SIMULATED)
    const isImageRequest = /image|draw|generate|create|picture/i.test(prompt);

    setTimeout(() => {
        document.getElementById(thinkId)?.remove();
        
        try {
            if (isImageRequest) {
                if (window.imgCredits <= 0) throw new Error("CREDIT_LIMIT");
                handleImageGeneration(prompt);
            } else {
                // AUTO-REPLY LOGIC
                const cleanPrompt = prompt.toLowerCase();
                let reply = TEST_RESPONSES["default"];
                
                // Check if any keyword matches our test keys
                for (let key in TEST_RESPONSES) {
                    if (cleanPrompt.includes(key)) {
                        reply = TEST_RESPONSES[key];
                        break;
                    }
                }
                
                // Edge/Fun Mode Modifier
                if(window.nxxtMode === 'fun') {
                    reply = "🙄 [TEST MODE]: " + reply + " 🔥";
                }

                renderAiResponse(reply, 'text');
            }
        } catch (error) {
            let errorMsg = "Critical: Neural Link Severed.";
            if (error.message === "CREDIT_LIMIT") errorMsg = "Visual bandwidth exhausted. (0/5 Credits left).";
            showModalAlert(errorMsg);
        }
    }, 1200); // Simulated "Thinking" delay
}

// --- SIMULATED GENERATION HANDLERS ---

function handleImageGeneration(prompt) {
    window.imgCredits--;
    updateCreditUI();

    const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=1024&height=1024&nologo=true&seed=${Math.floor(Math.random()*1000)}`;
    renderAiResponse(imageUrl, 'image');
}

// --- UI RENDERING ---

function renderAiResponse(content, type) {
    const thread = document.getElementById('aiThread');
    const displayHTML = type === 'image' 
        ? `<div class="space-y-4">
            <img src="${content}" class="rounded-[2rem] border border-white/10 shadow-2xl max-w-full h-auto hover:scale-[1.02] transition-transform duration-500" />
            <a href="${content}" target="_blank" class="inline-block text-[9px] font-black text-blue-400 uppercase tracking-widest">Download Asset</a>
           </div>`
        : `<p class="text-white/90 text-lg font-medium leading-relaxed tracking-tight">${content.replace(/\n/g, '<br>')}</p>`;

    thread.insertAdjacentHTML('beforeend', `
        <div class="flex gap-6 group animate-in slide-in-from-left-4 duration-500 mb-10">
            <div class="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 shrink-0 flex items-center justify-center shadow-lg">
                <i class="fas fa-robot text-white text-sm"></i>
            </div>
            <div class="flex-1 pt-1">
                ${displayHTML}
            </div>
        </div>
    `);
    scrollThread();
}

function scrollThread() {
    const thread = document.getElementById('aiThread');
    thread.scrollTo({ top: thread.scrollHeight, behavior: 'smooth' });
}

function updateCreditUI() {
    const creditBar = document.getElementById('imageCredits');
    if (creditBar && creditBar.lastElementChild) {
        creditBar.removeChild(creditBar.lastElementChild);
    }
}

function showModalAlert(message) {
    const modal = document.createElement('div');
    modal.className = "fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4";
    modal.innerHTML = `
        <div class="bg-[#0d1117] border border-white/10 p-8 rounded-[2rem] max-w-sm w-full text-center shadow-2xl animate-in zoom-in duration-300">
            <i class="fas fa-exclamation-triangle text-blue-500 text-3xl mb-4"></i>
            <p class="text-white font-medium mb-6 uppercase tracking-tighter text-sm">${message}</p>
            <button onclick="this.parentElement.parentElement.remove()" class="w-full py-3 bg-white text-black rounded-xl font-bold uppercase tracking-widest text-[10px] hover:bg-blue-600 hover:text-white transition-all">Acknowledge</button>
        </div>
    `;
    document.body.appendChild(modal);
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
const observer = new MutationObserver(() => {
    const jivo = document.querySelector('.jivo-iframe-container');
    if (jivo && !document.body.classList.contains('agent-bridge-active')) {
        jivo.style.setAttribute('style', 'display:none !important');
    }
});
observer.observe(document.documentElement, { childList: true, subtree: true });






