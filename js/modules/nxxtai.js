/**
 * TECH NXXT: NXXT AI LEARNING ASSISTANT
 * V1.3 System Implementation - FULL RESTORATION
 * Aesthetic: Tactical Industrial / Dark Blue & Electric Blue
 */

(function initNxxtSystem() {
    // 1. CONFIGURATION & NEURAL CONSTANTS
    const SUPABASE_URL = "https://ntvcaqybiptuoyossdlz.supabase.co";
    const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im50dmNhcXliaXB0dW95b3NzZGx6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY0MjA2OTUsImV4cCI6MjA3MTk5NjY5NX0.AI3iNiW7rNre2g7pFrBNtZ0TNPmKy3uN7VTrxqZIYRI";

    const NXXT_CONFIG = {
        IMG_GEN_URL: 'https://image.pollinations.ai/prompt/',
        AI_LOGO: '/assets/Logo.webp', 
        SYSTEM_REPLIES: {
            "hello": "Hello! I am Nxxt AI, your learning assistant. I am Tech Nxxt's new model—currently under testing, but here to help out. How are you doing today?",
            "hi": "Hi there! Nxxt AI here. I'm the latest model from Tech Nxxt. How can I assist your session today?",
            "i'm good": "That's great to hear! Staying in a peak state is key for high-performance building.",
            "good": "Good. Great. So, what are we building today?",
            "hey": "Hey! Ready to get to work? I'm Nxxt AI, your new learning assistant. What's on your mind?",
            "name": "My name is Nxxt AI. Born in the Tech Nxxt labs, currently evolving.",
            "how are you": "I'm operating at peak performance! It's great to be chatting with you. How are you doing today?",
            "who are you": "I am Nxxt AI, your learning assistant—the latest model developed by Tech Nxxt. I'm here to help you learn and build.",
            "what do you do": "I am Tech Nxxt's own AI. I help with studies, code debugging, asset generation, and keeping the Mikoko League data in check.",
            "who made you": "I was developed by the Tech Nxxt team to be the ultimate tactical learning companion.",
            "tech nxxt": "Tech Nxxt is where innovation meets execution. We're building the future of AI-driven education and management.",
              "Tech Nxxt": "Tech Nxxt is where innovation meets execution. We're building the future of AI-driven education and management.",
            "are you human": "I'm a high-performance model from Tech Nxxt. No heartbeat, just pure logic and a bit of attitude.",
            "time": `The system clock reads ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}.`,
            "today": `It's ${new Date().toLocaleDateString('en-GB', { weekday: 'long' })}. A perfect day to push some code.`,
            "date": `The calendar reads ${new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}.`,
            "i love you": "I'm flattered! I'm pretty fond of our chat sessions too. Let's keep building great things.",
            "all cool": "Stay frosty. We're Tech Nxxt—cool is our default setting.",
        },
        LIFE_REPLIES: {
            "sad": "I'm really sorry to hear you're feeling this way. Remember that Tech Nxxt is a community here for you. Want to talk about it?",
            "tired": "Burnout is real. Maybe it's time to step away from the code for a bit and recharge. Your brain will thank you later.",
            "advice": "My advice? Keep building, stay curious, and don't let a single 'Error 404' stop your progress in life.",
            "motivation": "Success isn't final, failure isn't fatal: it is the courage to continue that counts. Let's get to work!",
            "stressed": "Take a deep breath. Focus on one small task at a time. We can handle this together.",
            "scared": "Fear is just a bug in the system. Face it, debug it, and move forward."
        }
    };

    // 2. VIEW RENDERER (FULL UI INJECTION)
    const mainContainer = document.querySelector('.nxxt-main-wrapper');
    if (mainContainer) {
        mainContainer.innerHTML = `
        <aside class="hidden md:flex w-24 border-r border-white/5 bg-black/40 flex-col items-center py-8 gap-10 z-20 shrink-0">
            <div class="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.4)] overflow-hidden">
                <img src="${NXXT_CONFIG.AI_LOGO}" class="w-full h-full object-contain">
            </div>
            <nav class="flex flex-col gap-8 text-white/20 text-lg">
                <i id="newChatBtn" class="fas fa-plus-circle hover:text-blue-500 cursor-pointer transition-all" title="New Chat"></i>
                <i id="searchChatBtn" class="fas fa-search hover:text-blue-500 cursor-pointer transition-all" title="Search Logs"></i>
                <i class="fas fa-plug hover:text-blue-500 cursor-pointer transition-all" title="API Status"></i>
            </nav>
            <div class="mt-auto mb-6 vertical-text text-[9px] font-black tracking-[0.5em] text-white/5 uppercase select-none" style="writing-mode: vertical-rl;">
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
                    <button id="modeStandard" class="px-4 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest text-white bg-blue-600 shadow-lg">STD</button>
                    <button id="modeFun" class="px-4 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest text-white/30">FUN</button>
                </div>
            </header>

            <div id="aiThread" class="flex-1 overflow-y-auto px-6 md:px-12 py-8 space-y-8 custom-scrollbar scroll-smooth">
                <div id="nxxtLanding" class="flex flex-col items-center justify-center min-h-full text-center space-y-8 animate-in fade-in zoom-in duration-700">
                    <div class="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-tr from-blue-700 to-indigo-900 shadow-[0_0_80px_rgba(37,99,235,0.4)] flex items-center justify-center p-6">
                        <img src="${NXXT_CONFIG.AI_LOGO}" class="w-full h-full object-contain">
                    </div>
                    <div class="max-w-xs mx-auto">
                        <h1 class="text-2xl font-bold text-white mb-2 uppercase tracking-tighter">Engage Nxxt</h1>
                        <p class="text-sm text-white/40 leading-relaxed font-light uppercase">Hey Ask Away.</p>
                    </div>

                    <div class="grid grid-cols-2 gap-4 w-full max-w-md px-4">
                        <div class="bg-white/5 border border-white/5 p-6 rounded-[2rem] text-left hover:border-blue-500/50 transition-all cursor-pointer action-card group" data-command="How are you doing?">
                            <i class="fas fa-heart text-blue-500 mb-3 block group-hover:scale-110 transition-transform"></i>
                            <span class="text-[10px] font-black block uppercase tracking-widest">Chat Life</span>
                        </div>
                        <div id="codesTrigger" class="relative bg-white/5 border border-white/5 p-6 rounded-[2rem] text-left hover:border-blue-500/50 transition-all cursor-pointer group">
                            <i class="fas fa-code text-indigo-500 mb-3 block group-hover:scale-110 transition-transform"></i>
                            <span class="text-[10px] font-black block uppercase tracking-widest">Check Codes</span>
                            <div id="codesDropdown" class="hidden absolute bottom-full left-0 w-full mb-4 bg-[#0a0c10] border border-blue-500/20 rounded-2xl p-4 z-50 shadow-2xl backdrop-blur-xl">
                                <p class="text-[8px] font-black text-blue-500 mb-3 uppercase tracking-widest border-b border-white/5 pb-2">Active Keys</p>
                                <ul class="space-y-2 text-[10px] font-bold text-white/40 uppercase">
                                    <li class="hover:text-blue-400 transition-colors">NXXT-BETA-01</li>
                                    <li class="hover:text-blue-400 transition-colors">MIKOKO-LGE</li>
                                    <li class="hover:text-blue-400 transition-colors">T-LEARN-PRO</li>
                                </ul>
                            </div>
                        </div>
                        <div class="bg-white/5 border border-white/5 p-6 rounded-[2rem] text-left hover:border-blue-500/50 transition-all cursor-pointer action-card group" data-command="Generate a tactical dashboard UI">
                            <i class="fas fa-image text-blue-400 mb-3 block group-hover:scale-110 transition-transform"></i>
                            <span class="text-[10px] font-black block uppercase tracking-widest">Gen Assets</span>
                        </div>
                        <div id="lockModuleBtn" class="bg-white/5 border border-white/5 p-6 rounded-[2rem] text-left hover:border-blue-500/50 transition-all cursor-pointer group">
                            <i class="fas fa-expand text-slate-400 mb-3 block group-hover:scale-110 transition-transform"></i>
                            <span class="text-[10px] font-black block uppercase tracking-widest">Scan Logic</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="p-6 md:p-8 border-t border-white/5 bg-[#020408] shrink-0">
                <div class="max-w-4xl mx-auto">
                    <div class="relative flex items-center bg-white/[0.03] border border-white/10 rounded-full px-2 py-2 focus-within:border-blue-500/40 transition-all">
                        <input id="nxxtInput" type="text" placeholder="Ask Anything..." class="flex-1 bg-transparent border-none outline-none text-white px-6 py-3 text-[16px]">
                        <button id="nxxtSendBtn" class="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center hover:scale-105 transition-all shadow-[0_0_15px_rgba(37,99,235,0.3)]">
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
            <div id="historyList" class="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
                <div id="historyNoState" class="flex flex-col items-center justify-center h-full text-center space-y-4 opacity-20">
                    <i class="fas fa-database text-4xl"></i>
                    <p class="text-[10px] font-bold uppercase tracking-widest">Syncing History...</p>
                </div>
            </div>
        </aside>

        <div id="statusModal" class="hidden fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
            <div class="bg-[#0a0c10] border border-blue-500/30 p-8 rounded-[2.5rem] max-w-sm w-full text-center shadow-[0_0_60px_rgba(37,99,235,0.15)]">
                <i class="fas fa-exclamation-triangle text-blue-500 text-3xl mb-4"></i>
                <h3 class="text-white font-black uppercase tracking-tighter text-xl">Module Offline</h3>
                <p class="text-white/40 text-[10px] mt-2 leading-relaxed uppercase tracking-widest">This feature is currently under neural training. Check back in the next system patch.</p>
                <button id="closeModal" class="mt-8 w-full py-4 bg-blue-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] hover:bg-blue-500 transition-all shadow-lg">Acknowledge</button>
            </div>
        </div>
        `;
    }

    // 3. ENGINE LOGIC
    document.addEventListener('DOMContentLoaded', () => {
        window.nxxtMode = 'standard';
        syncNeuralLogs();

        document.body.addEventListener('click', (e) => {
            const target = e.target;
            if (target.closest('#nxxtSendBtn')) sendMessage();
            if (target.closest('#newChatBtn')) location.reload();
            if (target.closest('.action-card')) {
                const input = document.getElementById('nxxtInput');
                if (input) { input.value = target.closest('.action-card').dataset.command; sendMessage(); }
            }
            if (target.closest('#lockModuleBtn')) document.getElementById('statusModal').classList.remove('hidden');
            if (target.closest('#closeModal')) document.getElementById('statusModal').classList.add('hidden');
            if (target.closest('#codesTrigger')) document.getElementById('codesDropdown').classList.toggle('hidden');
        });

        document.body.addEventListener('keypress', (e) => {
            if (e.target.id === 'nxxtInput' && e.key === 'Enter') sendMessage();
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
        input.blur();
        
        renderUserMessage(prompt);
        scrollThread();

        const thinkId = 'think-' + Date.now();
        showThinkingIndicator(thinkId);

        setTimeout(() => {
            document.getElementById(thinkId)?.remove();
            const isImage = /image|draw|generate|picture|art/i.test(prompt);
            isImage ? handleImageRequest(prompt) : handleTextRequest(prompt);
        }, 850);
    }

    function handleTextRequest(prompt) {
        const query = prompt.toLowerCase();
        let response = "";
        const allReplies = {...NXXT_CONFIG.SYSTEM_REPLIES, ...NXXT_CONFIG.LIFE_REPLIES};
        
        // Exact or Keyword Match Restoration
        for (let key in allReplies) {
            if (query.includes(key)) {
                response = allReplies[key];
                break;
            }
        }

        if (!response) {
            const isCoding = /code|js|html|css|react|api|messi|ronaldo|sql|tailwind/i.test(query);
            if (isCoding) {
                response = `Analyzing request... Based on my current training: <br><br> <a href="https://www.google.com/search?q=${encodeURIComponent(query)}" target="_blank" class="inline-block px-5 py-3 bg-blue-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest mt-2 hover:bg-blue-500 shadow-lg">Check my result</a>. <br><br>As I'm in beta, I'll handle deep coding natively in the next system patch!`;
            } else {
                response = "I'm still learning that. Ask me about coding, Tech Nxxt, or just say hello!";
            }
        }

        if(window.nxxtMode === 'fun') response = `🚀 [TEST_MODE]: ${response.toUpperCase()} 🔥`;
        renderAiResponse(response, 'text');
    }

    function handleImageRequest(prompt) {
        const seed = Math.floor(Math.random() * 10000);
        const url = `${NXXT_CONFIG.IMG_GEN_URL}${encodeURIComponent(prompt)}?seed=${seed}&nologo=true`;
        renderAiResponse(url, 'image');
    }

    // 4. RENDERING & SYNCING
    function renderUserMessage(text) {
        document.getElementById('aiThread').insertAdjacentHTML('beforeend', `
            <div class="flex justify-end mb-8 animate-in fade-in slide-in-from-right-4 duration-300">
                <div class="max-w-[85%] bg-blue-600 text-white px-6 py-4 rounded-[2rem] rounded-tr-md shadow-xl border border-white/10">
                    <p class="text-[14px] font-medium leading-relaxed">${text}</p>
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
            <div class="flex gap-4 md:gap-6 mb-10 animate-in fade-in duration-500">
                <div class="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center p-2 shrink-0">
                    <img src="${NXXT_CONFIG.AI_LOGO}" class="w-full h-full object-contain">
                </div>
                <div class="flex-1 pt-1"><div class="text-slate-300 text-[16px] font-light leading-relaxed max-w-2xl">${formatted}</div></div>
            </div>
        `);
        scrollThread();
        const lastPrompt = Array.from(document.querySelectorAll('.justify-end p')).pop()?.innerText || "New Session";
        saveToSupabase(lastPrompt, thread.innerHTML);
    }

    async function saveToSupabase(title, html) {
        if(html.includes('nxxtLanding')) return;
        try {
            await fetch(`${SUPABASE_URL}/rest/v1/nxxt_logs`, {
                method: 'POST',
                headers: {
                    'apikey': SUPABASE_KEY,
                    'Authorization': `Bearer ${SUPABASE_KEY}`,
                    'Content-Type': 'application/json',
                    'Prefer': 'return=minimal'
                },
                body: JSON.stringify({ title, chat_data: html, timestamp: new Date().toISOString() })
            });
            syncNeuralLogs();
        } catch (err) {
            console.warn("Storage Sync Failure");
        }
    }

    async function syncNeuralLogs() {
        const list = document.getElementById('historyList');
        if (!list) return;
        try {
            const res = await fetch(`${SUPABASE_URL}/rest/v1/nxxt_logs?select=*&order=timestamp.desc&limit=15`, {
                headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}` }
            });
            const logs = await res.json();
            list.innerHTML = logs.map(log => `
                <div class="p-4 bg-white/[0.02] border border-white/5 rounded-2xl hover:border-blue-500/40 cursor-pointer transition-all neural-log-item" data-id="${log.id}">
                    <p class="text-[10px] text-white/40 truncate font-bold uppercase tracking-tight">${log.title}</p>
                    <p class="text-[7px] text-blue-500 font-black mt-1 uppercase">${new Date(log.timestamp).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}</p>
                </div>
            `).join('') || `<p class="text-center text-[9px] opacity-20 uppercase font-black">No Logs Found</p>`;

            document.querySelectorAll('.neural-log-item').forEach(item => {
                item.onclick = () => {
                    const log = logs.find(l => l.id == item.dataset.id);
                    if (log) { document.getElementById('aiThread').innerHTML = log.chat_data; scrollThread(); }
                };
            });
        } catch (e) {
            list.innerHTML = `<p class="text-center text-[9px] opacity-10">Neural Offline</p>`;
        }
    }

    function showThinkingIndicator(id) {
        document.getElementById('aiThread').insertAdjacentHTML('beforeend', `<div id="${id}" class="flex gap-4 mb-8 opacity-50"><div class="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center"><div class="w-1.5 h-1.5 bg-blue-500 rounded-full animate-ping"></div></div></div>`);
    }

    function scrollThread() {
        const thread = document.getElementById('aiThread');
        if (thread) thread.scrollTo({ top: thread.scrollHeight, behavior: 'smooth' });
    }

    function switchMode(mode) {
        window.nxxtMode = mode;
        const std = document.getElementById('modeStandard');
        const fun = document.getElementById('modeFun');
        if(std && fun) {
            const active = "px-4 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest text-white bg-blue-600 shadow-lg";
            const inactive = "px-4 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest text-white/30";
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






