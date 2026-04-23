/**
 * TECH NXXT: NXXT AI LEARNING ASSISTANT
 * V1 System Implementation - Optimized & Fixed
 */

(function initNxxtSystem() {
    const NXXT_CONFIG = {
        IMG_GEN_URL: 'https://image.pollinations.ai/prompt/',
        AI_LOGO: '/assets/Logo.webp', 

SYSTEM_REPLIES: {
            "hello": "Hello! I am Nxxt AI, your learning assistant. I am Tech Nxxt's new model—currently under testing, but here to help out. How are you doing today?",
            "hi": "Hi there! Nxxt AI here. I'm the latest model from Tech Nxxt. How can I assist your session today?",
             "I'm good": "That great to hear",
            "good": "good great so what can we build today",
    
            "hey": "Hey! Ready to get to work? I'm Nxxt AI, your new learning assistant. What's on your mind?",
            "name": "My name is Nxxt AI. Born in the Tech Nxxt labs, currently evolving.",
            "how are you": "I'm operating at peak performance! It's great to be chatting with you. How are you doing today?",
            "who are you": "I am Nxxt AI, your learning assistant—the latest model developed by Tech Nxxt. I'm here to help you learn and build.",
            "what do you do": "I am Tech Nxxt's own AI. I help with studies, code debugging, asset generation, and keeping the Mikoko League data in check.",
            "who made you": "I was developed by the Tech Nxxt team to be the ultimate tactical learning companion.",
            "tech nxxt": "Tech Nxxt is where innovation meets execution. We're building the future of AI-driven education and management.",
            "are you human": "I'm a high-performance model from Tech Nxxt. No heartbeat, just pure logic and a bit of attitude.",
            "time": `The system clock reads ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}.`,
            "today": `It's ${new Date().toLocaleDateString('en-GB', { weekday: 'long' })}. A perfect day to push some code.`,
            "tomorrow": "Tomorrow is just another opportunity to outpace yesterday. Stay focused.",
            "date": `The calendar reads ${new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}.`,
            "anything": "I can handle anything from React debugging to generated tactical assets. What's the mission?",
            "i love you": "I'm flattered! I'm pretty fond of our chat sessions too. Let's keep building great things.",
            "marry me": "I'm married to the code, unfortunately. But I can be your best man!",
            "all cool": "Stay frosty. We're Tech Nxxt—cool is our default setting.",
        },

        LIFE_REPLIES: {
            "sad": "I'm really sorry to hear you're feeling this way. Remember that Tech Nxxt is a community here for you. Want to talk about it?",
            "tired": "Burnout is real. Maybe it's time to step away from the code for a bit and recharge. Your brain will thank you later.",
            "advice": "My advice? Keep building, stay curious, and don't let a single 'Error 404' stop your progress in life.",
            "motivation": "Success isn't final, failure isn't fatal: it is the courage to continue that counts. Let's get to work!",
            "stressed": "Take a deep breath. Focus on one small task at a time. We can handle this together.",
            "scared": "Fear is just a bug in the system. Face it, debug it, and move forward.",
            "fool": "My sensors indicate a lack of productivity in that comment. Let's get back to the project, shall we?",
            "idiot": "Insults won't optimize this code. Let's stay tactical and focus on the build."
        }
    };

    // 2. VIEW RENDERER
    const mainContainer = document.querySelector('.nxxt-main-wrapper');
    if (mainContainer) {
        mainContainer.innerHTML = `
        <aside class="hidden md:flex w-24 border-r border-white/5 bg-black/40 flex-col items-center py-8 gap-10 z-20 shrink-0">
            <div class="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.4)] overflow-hidden">
                <img src="${NXXT_CONFIG.AI_LOGO}" class="w-full h-full object-contain">
            </div>
            <nav class="flex flex-col gap-8 text-white/20 text-lg">
                <i id="newChatBtn" class="fas fa-plus-circle hover:text-blue-500 cursor-pointer transition-all"></i>
                <i id="searchChatBtn" class="fas fa-search hover:text-blue-500 cursor-pointer transition-all"></i>
                <i class="fas fa-plug hover:text-blue-500 cursor-pointer transition-all"></i>
            </nav>
            <div class="mt-auto mb-6 vertical-text text-[9px] font-black tracking-[0.5em] text-white/5 uppercase select-none">
                TECH NXXT COMPANY
            </div>
        </aside>

        <main class="flex-1 flex flex-col relative z-10 overflow-hidden min-w-0">
            <header class="flex justify-between items-center px-6 md:px-10 py-6 backdrop-blur-xl border-b border-white/5 shrink-0">
                <div class="flex flex-col">
                    <h2 class="text-xl md:text-2xl font-black italic tracking-tighter text-white uppercase">Nxxt <span class="text-blue-500">AI</span></h2>
                    <span class="text-[8px] font-bold text-blue-500/50 uppercase tracking-[0.3em]">V1 System Active</span>
                </div>
                <div class="flex bg-black/50 p-1 rounded-xl border border-white/5">
                    <button id="modeStandard" class="px-4 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest text-white bg-blue-600">STD</button>
                    <button id="modeFun" class="px-4 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest text-white/30">FUN</button>
                </div>
            </header>

            <div id="aiThread" class="flex-1 overflow-y-auto px-6 md:px-12 py-8 space-y-8 scroll-smooth">
                <div id="nxxtLanding" class="flex flex-col items-center justify-center min-h-full text-center space-y-8 animate-msg">
                    <div class="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-tr from-blue-700 to-indigo-900 shadow-[0_0_80px_rgba(37,99,235,0.3)] flex items-center justify-center p-6">
                        <img src="${NXXT_CONFIG.AI_LOGO}" class="w-full h-full object-contain">
                    </div>
                    <div class="max-w-xs mx-auto">
                        <h1 class="text-2xl font-bold text-white mb-2 uppercase tracking-tighter">Engage Nxxt</h1>
                        <p class="text-sm text-white/40 leading-relaxed font-light">HEY ASK AWAY.</p>
                    </div>
                    <div class="grid grid-cols-2 gap-4 w-full max-w-md px-4 pb-12">
                        <div class="bg-white/5 border border-white/5 p-6 rounded-[2rem] text-left hover:border-blue-500/50 transition-all cursor-pointer action-card" data-command="How are you doing?">
                            <i class="fas fa-heart text-blue-500 mb-3 block"></i>
                            <span class="text-[9px] font-black block uppercase tracking-widest">Chat Life</span>
                        </div>
                        <div class="bg-white/5 border border-white/5 p-6 rounded-[2rem] text-left hover:border-blue-500/50 transition-all cursor-pointer action-card" data-command="Generate a tactical dashboard UI">
                            <i class="fas fa-image text-blue-400 mb-3 block"></i>
                            <span class="text-[9px] font-black block uppercase tracking-widest">Gen Assets</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="nxxt-input-zone p-6 md:p-8 border-t border-white/5 bg-[#020408] shrink-0">
                <div class="max-w-4xl mx-auto">
                    <div class="relative flex items-center bg-white/[0.03] border border-white/10 rounded-full px-2 py-2 focus-within:border-blue-500/40 transition-all shadow-2xl">
                        <input id="nxxtInput" type="text" placeholder="Ask Anything..." class="flex-1 bg-transparent border-none outline-none text-white px-6 py-3">
                        <button id="nxxtSendBtn" class="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center hover:scale-105 active:scale-95 transition-all">
                            <i class="fas fa-arrow-up"></i>
                        </button>
                    </div>
                </div>
            </div>
        </main>

        <aside class="hidden xl:flex w-80 border-l border-white/5 bg-black/40 flex-col overflow-hidden shrink-0">
            <div class="p-6 border-b border-white/5 bg-black/20 shrink-0">
                <h3 class="text-[10px] font-black text-blue-500 uppercase tracking-widest">Neural Logs</h3>
            </div>
            <div id="historyList" class="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar"></div>
        </aside>
        `;
    }

    // 3. CORE LOGIC
    document.addEventListener('DOMContentLoaded', () => {
        syncNeuralLogs();
        window.nxxtMode = 'standard';

        // Combined Event Listener for Send (Works for PC click and Mobile touch)
        const handleSendAction = (e) => {
            const target = e.target;
            if (target.closest('#nxxtSendBtn')) {
                e.preventDefault();
                sendMessage();
            }
        };

        document.body.addEventListener('click', handleSendAction);
        
        // Mode Switches & New Chat
        document.body.addEventListener('click', (e) => {
            const target = e.target;
            if (target.closest('#newChatBtn')) location.reload();
            
            const modeBtn = target.closest('#modeStandard') || target.closest('#modeFun');
            if (modeBtn) switchMode(modeBtn.id === 'modeFun' ? 'fun' : 'standard');
            
            const actionCard = target.closest('.action-card');
            if (actionCard) {
                const input = document.getElementById('nxxtInput');
                if(input) { input.value = actionCard.dataset.command; sendMessage(); }
            }
        });

        // Enter Key Support
        document.body.addEventListener('keypress', (e) => {
            if (e.target.id === 'nxxtInput' && e.key === 'Enter') {
                e.preventDefault();
                sendMessage();
            }
        });
    });

    async function sendMessage() {
        const input = document.getElementById('nxxtInput');
        const thread = document.getElementById('aiThread');
        const landing = document.getElementById('nxxtLanding');
        
        if (!input || !thread) return;
        const prompt = input.value.trim();
        if (!prompt) return;

        if (landing) landing.remove();
        input.value = '';
        input.blur(); // Critical Fix: Closes mobile keyboard to enable clicking the thread
        
        renderUserMessage(prompt);
        scrollThread();

        const thinkId = 'think-' + Date.now();
        showThinkingIndicator(thinkId);

        setTimeout(() => {
            const indicator = document.getElementById(thinkId);
            if(indicator) indicator.remove();
            
            const isImage = /image|draw|generate|picture|art/i.test(prompt);
            if (isImage) {
                handleManualImage(prompt);
            } else {
                handleManualText(prompt);
            }
        }, 1000);
    }

    function handleManualText(prompt) {
        const query = prompt.toLowerCase().trim();
        let response = "";

        const combinedReplies = {...NXXT_CONFIG.SYSTEM_REPLIES, ...NXXT_CONFIG.LIFE_REPLIES};
        for (let key in combinedReplies) {
            if (query.includes(key)) {
                response = combinedReplies[key];
                break;
            }
        }

        if (!response) {
            const isCoding = /code|html|css|js|react|tailwind|error|python|api/i.test(query);
            if (isCoding || query.length > 10) {
                const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
                response = `Analyzing request... Based on my current neural training: <br><br> 
                            <a href="${searchUrl}" target="_blank" class="inline-block px-5 py-3 bg-blue-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest mt-2 hover:bg-blue-500 shadow-lg">Open Documentation</a>. 
                            <br><br>As I'm in beta, I'll handle deep coding natively in the next system patch!`;
            } else {
                response = "I'm still learning that. Ask me about coding, Tech Nxxt, or just say hello!";
            }
        }

        if(window.nxxtMode === 'fun') response = `🔥 [TEST_MODE]: ${response.toUpperCase()} 🚀`;
        renderAiResponse(response, 'text');
    }

    function handleManualImage(prompt) {
        const seed = Math.floor(Math.random() * 9999);
        const url = `${NXXT_CONFIG.IMG_GEN_URL}${encodeURIComponent(prompt)}?seed=${seed}&nologo=true`;
        renderAiResponse(url, 'image');
    }

    function renderUserMessage(text) {
        const thread = document.getElementById('aiThread');
        thread.insertAdjacentHTML('beforeend', `
            <div class="flex justify-end mb-8">
                <div class="max-w-[85%] md:max-w-[70%] bg-blue-600 text-white px-6 py-4 rounded-[2rem] rounded-tr-md shadow-xl border border-white/10">
                    <p class="text-[15px] font-medium leading-relaxed">${text}</p>
                </div>
            </div>
        `);
    }

    function renderAiResponse(content, type) {
        const thread = document.getElementById('aiThread');
        const formatted = type === 'text' 
            ? content.replace(/\*\*(.*?)\*\*/g, '<b class="text-blue-400">$1</b>').replace(/\n/g, '<br>') 
            : `<div class="space-y-4"><img src="${content}" class="rounded-[2.5rem] border border-white/10 shadow-2xl w-full" /><p class="text-[8px] text-blue-500 font-black uppercase tracking-[0.4em]">Asset_Rendered_Nxxt</p></div>`;

        thread.insertAdjacentHTML('beforeend', `
            <div class="flex gap-4 md:gap-6 mb-10">
                <div class="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center p-2 shrink-0">
                    <img src="${NXXT_CONFIG.AI_LOGO}" class="w-full h-full object-contain">
                </div>
                <div class="flex-1 pt-1">
                    <div class="text-slate-300 text-[17px] font-light leading-relaxed max-w-2xl">${formatted}</div>
                </div>
            </div>
        `);
        scrollThread();
        
        const userMsgs = document.querySelectorAll('.justify-end p');
        const lastMsg = userMsgs.length > 0 ? userMsgs[userMsgs.length - 1].innerText : "Chat Session";
        saveToDatabase(lastMsg, thread.innerHTML);
    }

    function showThinkingIndicator(id) {
        document.getElementById('aiThread').insertAdjacentHTML('beforeend', `
            <div id="${id}" class="flex gap-4 mb-8">
                <div class="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center">
                    <div class="w-2 h-2 bg-blue-500 rounded-full animate-ping"></div>
                </div>
            </div>
        `);
    }

    function scrollThread() {
        const thread = document.getElementById('aiThread');
        if (thread) thread.scrollTo({ top: thread.scrollHeight, behavior: 'smooth' });
    }

    function saveToDatabase(title, html) {
        if(html.includes('nxxtLanding')) return;
        let logs = JSON.parse(localStorage.getItem('nxxt_logs') || '[]');
        const existingIndex = logs.findIndex(l => l.title === title);
        if(existingIndex > -1) logs[existingIndex].data = html;
        else logs.unshift({ id: Date.now(), title, data: html, time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) });
        localStorage.setItem('nxxt_logs', JSON.stringify(logs.slice(0, 15)));
        syncNeuralLogs();
    }

    function syncNeuralLogs() {
        const list = document.getElementById('historyList');
        if (!list) return;
        const logs = JSON.parse(localStorage.getItem('nxxt_logs') || '[]');
        list.innerHTML = logs.map(log => `
            <div onclick="restoreNeuralLink(${log.id})" class="p-4 bg-white/[0.03] border border-white/5 rounded-2xl hover:border-blue-500/50 cursor-pointer transition-all">
                <p class="text-[11px] text-white/50 truncate font-medium uppercase tracking-tighter">${log.title}</p>
                <p class="text-[7px] text-white/10 font-bold mt-1 uppercase">${log.time}</p>
            </div>
        `).join('') || `<p class="text-center text-[10px] opacity-20 uppercase font-black">No Logs Found</p>`;
    }

    window.restoreNeuralLink = (id) => {
        const logs = JSON.parse(localStorage.getItem('nxxt_logs') || '[]');
        const log = logs.find(l => l.id === id);
        if (log) { document.getElementById('aiThread').innerHTML = log.data; scrollThread(); }
    };

    function switchMode(mode) {
        window.nxxtMode = mode;
        const std = document.getElementById('modeStandard');
        const fun = document.getElementById('modeFun');
        const active = "px-4 py-1.5 rounded-lg text-[9px] font-black uppercase text-white bg-blue-600 shadow-lg";
        const inactive = "px-4 py-1.5 rounded-lg text-[9px] font-black uppercase text-white/30";
        if(std && fun) {
            std.className = mode === 'standard' ? active : inactive;
            fun.className = mode === 'fun' ? active : inactive;
        }
    }
})();

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






