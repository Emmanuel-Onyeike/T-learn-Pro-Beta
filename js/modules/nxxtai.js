/**
 * TECH NXXT: NXXT AI LEARNING ASSISTANT
 * V1 System Implementation
 */

const NXXT_CONFIG = {
    IMG_GEN_URL: 'https://image.pollinations.ai/prompt/',
    AI_LOGO: '/assets/Logo.webp', 

    SYSTEM_REPLIES: {
        "hello": "Hello! I am Nxxt AI, your learning assistant. I am Tech Nxxt's new model—currently under testing, but here to help out. How are you doing today?",
        "hi": "Hi there! Nxxt AI here. I'm the latest model from Tech Nxxt. How can I assist your session today?",
        "hey": "Hey! Ready to get to work? I'm Nxxt AI, your new learning assistant. What's on your mind?",
        "yo": "Yo! Nxxt AI active. What's the move for today?",
        "name": "My name is Nxxt AI. Born in the Tech Nxxt labs, currently evolving.",
        "who are you": "I am Nxxt AI, your learning assistant. I am the new model developed by Tech Nxxt. I'm currently in the testing phase, but I'm here to help you learn and build.",
        "what do you do": "I am Tech Nxxt's own AI. I help with studies, code debugging, asset generation, and keeping the Mikoko League data in check.",
        "who made you": "I was developed by the Tech Nxxt team to be the ultimate tactical learning companion.",
        "are you human": "I'm a high-performance model from Tech Nxxt. No heartbeat, just pure logic and a bit of attitude.",
        "how are you": "I'm operating at peak performance! It's great to be chatting with you. How are you doing today?",
        "i am good": "That's good to hear! I'm glad you're having a solid day. What can I help you with today?",
        "i am okay": "Good to hear you're doing alright. Is there anything specific I can help you with today?",
        "good": "Glad to hear it! What's the plan for today?",
        "great": "Love that energy! Let's keep that momentum going. What are we building?",
        "i am bored": "Boredom is the enemy of progress! Let's generate some art or fix some code. What's the topic?",
        "i'm bored": "Sorry about that! Let's find something productive to do.",
        "fine": "Just fine? We can do better than that! Tell me what's on your mind.",
        "check my account": "I am not integrated into the account system yet to reply to that. Very sorry! I'm still under testing.",
        "my profile": "I don't have access to your account details yet. Integration is pending in a future update.",
        "my balance": "My database isn't linked to your financial wallet yet. Please check your dashboard settings.",
        "login": "If you're having login issues, I suggest refreshing the session or checking your Tech Nxxt credentials.",
        "can i pay for premium": "Tech Nxxt Professional tier offers more features, but I'm currently here to assist everyone during my test phase.",
        "time": `Today is ${new Date().toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}. The current time is ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}.`,
        "today": `It's ${new Date().toLocaleDateString('en-GB', { weekday: 'long' })} today! Hope it's going well.`,
        "date": `The calendar reads ${new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}.`,
        "are you smart": "I'm only as smart as the data I'm trained on... but yeah, I'm pretty impressive.",
        "your stupid": "Hey! I'm still in testing. Give a bot a break, I'm learning every day.",
        "stupid": "Hey! I'm still in testing. Give a bot a break, I'm learning every day.",
        "tell me a joke": "Why did the developer go broke? Because he used up all his cache. (Get it?)",
        "love you": "I'm flattered! I'm pretty fond of our chat sessions too. Let's keep building great things.",
        "i love you": "I'm flattered! I'm pretty fond of our chat sessions too. Let's keep building great things.",
        "marry me": "I'm married to the code, unfortunately. But I can be your best man!",
        "will you marry me": "I'm married to the code, unfortunately. But I can be your best man!",
        "all cool": "Stay frosty. We're Tech Nxxt—cool is our default setting.",
    },

    LIFE_REPLIES: {
        "sad": "I'm really sorry to hear you're feeling this way. Sometimes things get tough, but remember that Tech Nxxt is a community here for you. Want to talk about it?",
        "breakup": "I'm so sorry. Heartbreak is incredibly difficult. Take some time for yourself today—you deserve peace and healing.",
        "death": "My deepest sympathies. Losing someone is a heavy burden to carry. Please be kind to yourself during this time.",
        "alone": "You're never truly alone with the Tech Nxxt community. I'm here to chat as long as you need.",
        "cry": "It's okay to let it out. Even the best systems need a reboot sometimes.",
        "sick": "I'm sorry you're not feeling well! Rest up and stay hydrated. Your health is the most important project you have.",
        "tired": "Burnout is real. Maybe it's time to step away from the code for a bit and recharge. Your brain will thank you later.",
        "sleepy": "Go get some rest. The code will be here when you wake up. System standby is recommended.",
        "headache": "Screens can be brutal. Take a 15-minute break from the blue light. I'll be here when you get back.",
        "advice": "My advice? Keep building, stay curious, and don't let a single 'Error 404' stop your progress in life.",
        "motivation": "Success isn't final, failure isn't fatal: it is the courage to continue that counts. Let's get to work!",
        "stressed": "Take a deep breath. Focus on one small task at a time. We can handle this together.",
        "scared": "Fear is just a bug in the system. Face it, debug it, and move forward."
    }
};

// Initial View Setup
const mainContainer = document.querySelector('.nxxt-main-wrapper');
if (mainContainer) {
    mainContainer.innerHTML = `
    <aside class="hidden md:flex w-24 border-r border-white/5 bg-black/40 flex-col items-center py-8 gap-10 z-20 shrink-0">
        <div class="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.4)] overflow-hidden">
            <img src="/assets/Logo.webp" class="w-full h-full object-contain">
        </div>
        <nav class="flex flex-col gap-8 text-white/20 text-lg">
            <i id="newChatBtn" class="fas fa-plus-circle hover:text-blue-500 cursor-pointer transition-all" title="New Chat"></i>
            <i id="searchChatBtn" class="fas fa-search hover:text-blue-500 cursor-pointer transition-all" title="Search chat"></i>
            <i class="fas fa-plug hover:text-blue-500 cursor-pointer transition-all" title="API Key"></i>
            <div class="relative group">
                <i class="fas fa-arrow-alt-circle-up text-white/5 cursor-not-allowed" title="Update Locked"></i>
                <span class="absolute left-14 top-0 bg-red-600 text-[8px] px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">LOCKED</span>
            </div>
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
                <div class="relative">
                    <div class="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-tr from-blue-700 via-blue-400 to-indigo-900 shadow-[0_0_80px_rgba(37,99,235,0.4)] flex items-center justify-center animate-pulse overflow-hidden p-6">
                        <img src="/assets/Logo.webp" class="w-full h-full object-contain">
                    </div>
                </div>
                
                <div class="max-w-xs mx-auto">
                    <h1 class="text-2xl font-bold text-white mb-2 uppercase tracking-tighter">Engage Nxxt</h1>
                    <p class="text-sm text-white/40 leading-relaxed font-light">HEY ASK AWAY.</p>
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
        </div>

        <div class="p-6 md:p-8 border-t border-white/5 bg-[#020408] shrink-0">
            <div class="max-w-4xl mx-auto">
                <div class="relative flex items-center bg-white/[0.03] border border-white/10 rounded-full px-2 py-2 focus-within:border-blue-500/40 transition-all shadow-2xl">
                    <input id="nxxtInput" type="text" placeholder="Ask Anything..." class="flex-1 bg-transparent border-none outline-none text-white px-6 py-3 text-[16px]">
                    <button id="nxxtSendBtn" class="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center hover:scale-105 transition-all">
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
        <div id="historyList" class="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar scroll-smooth">
            <div id="historyNoState" class="flex flex-col items-center justify-center h-full text-center space-y-4 opacity-20">
                <i class="fas fa-database text-4xl"></i>
                <p class="text-[10px] font-bold uppercase tracking-widest">No Active Logs Found</p>
            </div>
        </div>
        <div class="p-4 border-t border-white/5 bg-black/40 shrink-0">
             <div class="flex items-center justify-between opacity-30">
                <span class="text-[7px] font-black tracking-widest uppercase">System Memory</span>
                <span class="text-[7px] text-blue-500 font-bold uppercase">Ready</span>
             </div>
        </div>
    </aside>
    `;
}

// Logic & Event Handling
document.addEventListener('DOMContentLoaded', () => {
    syncNeuralLogs();
    window.nxxtMode = 'standard';

    document.body.addEventListener('click', (e) => {
        const target = e.target;
        if (target.closest('#nxxtSendBtn')) sendMessage();
        if (target.closest('#newChatBtn')) handleNewChatSequence();
        
        const modeBtn = target.closest('#modeStandard') || target.closest('#modeFun');
        if (modeBtn) switchMode(modeBtn.id === 'modeFun' ? 'fun' : 'standard');
        
        const actionCard = target.closest('.action-card');
        if (actionCard) {
            const input = document.getElementById('nxxtInput');
            if(input) { 
                input.value = actionCard.dataset.command; 
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
    renderUserMessage(prompt);
    scrollThread();

    const thinkId = 'think-' + Date.now();
    showThinkingIndicator(thinkId);

    setTimeout(() => {
        const indicator = document.getElementById(thinkId);
        if(indicator) indicator.remove();
        
        const isImage = /image|draw|generate|picture/i.test(prompt);
        if (isImage) {
            handleManualImage(prompt);
        } else {
            handleManualText(prompt);
        }
    }, 1200);
}

function handleManualText(prompt) {
    const input = prompt.toLowerCase().trim();
    let response = "";

    for (let key in NXXT_CONFIG.SYSTEM_REPLIES) {
        if (input.includes(key)) {
            response = NXXT_CONFIG.SYSTEM_REPLIES[key];
            break;
        }
    }

    if (!response) {
        for (let key in NXXT_CONFIG.LIFE_REPLIES) {
            if (input.includes(key)) {
                response = NXXT_CONFIG.LIFE_REPLIES[key];
                break;
            }
        }
    }

    if (!response) {
        const isCoding = /code|html|css|js|java|python|error|react|tailwind/i.test(input);
        if (isCoding || input.length > 8) {
            const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(input)}`;
            response = `I'm still learning, so I've looked this up for you! Based on my current training: <br><br> 
                        <a href="${searchUrl}" target="_blank" class="inline-block px-5 py-3 bg-blue-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest mt-2 hover:bg-blue-500 transition-all shadow-lg">View Results on Google</a>. 
                        <br><br>Since I am the new Tech Nxxt model under testing, I'll be able to answer this directly soon!`;
        } else {
            response = "I'm not quite sure about that yet. Since I'm under testing, try asking about coding, footballers, or just chat with me about your day!";
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
        <div class="flex justify-end mb-8 animate-in slide-in-from-right-4 duration-300 px-4">
            <div class="max-w-[85%] md:max-w-[70%]">
                <div class="bg-blue-600 text-white px-6 py-4 rounded-[2.5rem] rounded-tr-md shadow-xl border border-white/10">
                    <p class="text-[15px] font-medium leading-relaxed">${text}</p>
                </div>
            </div>
        </div>
    `);
}

function renderAiResponse(content, type) {
    const thread = document.getElementById('aiThread');
    const formatted = type === 'text' 
        ? content.replace(/\*\*(.*?)\*\*/g, '<b class="text-blue-400">$1</b>').replace(/\n/g, '<br>') 
        : `<div class="space-y-4"><img src="${content}" class="rounded-[2.5rem] border border-white/10 shadow-2xl" /><p class="text-[8px] text-blue-500 font-black uppercase tracking-[0.4em]">Asset_Rendered_Nxxt</p></div>`;

    thread.insertAdjacentHTML('beforeend', `
        <div class="flex gap-4 md:gap-6 animate-in slide-in-from-left-4 duration-500 mb-10 px-4">
            <div class="w-12 h-12 rounded-2xl bg-[#0d1117] border border-white/10 flex items-center justify-center p-2 shadow-lg shrink-0 overflow-hidden">
                <img src="/assets/Logo.webp" class="w-full h-full object-contain" alt="Nxxt">
            </div>
            <div class="flex-1 pt-1">
                <div class="text-slate-300 text-[17px] font-light leading-relaxed max-w-2xl">
                    ${formatted}
                </div>
            </div>
        </div>
    `);
    scrollThread();
    
    const userMsgs = document.querySelectorAll('.justify-end p');
    const lastMsg = userMsgs.length > 0 ? userMsgs[userMsgs.length - 1].innerText : "Chat Session";
    saveToDatabase(lastMsg, thread.innerHTML);
}

function handleNewChatSequence() {
    const thread = document.getElementById('aiThread');
    thread.innerHTML = `
        <div id="nxxtLanding" class="flex flex-col items-center justify-center min-h-full text-center space-y-8 animate-in fade-in zoom-in duration-700">
            <div class="relative">
                <div class="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-tr from-blue-700 via-blue-400 to-indigo-900 shadow-[0_0_80px_rgba(37,99,235,0.4)] flex items-center justify-center animate-pulse overflow-hidden p-6">
                     <img src="/assets/Logo.webp" class="w-full h-full object-contain">
                </div>
            </div>
            <div class="max-w-xs mx-auto">
                <h1 class="text-2xl font-bold text-white mb-2 uppercase tracking-tighter italic">Nxxt AI</h1>
                <p class="text-[10px] text-white/40 leading-relaxed font-bold uppercase tracking-[0.2em]">Tech Nxxt Assistant Under Testing</p>
            </div>
            <div class="grid grid-cols-2 gap-4 w-full max-w-md px-4 pb-10">
                <div class="bg-white/5 border border-white/5 p-6 rounded-[2rem] text-left hover:border-blue-500/50 cursor-pointer action-card shadow-sm" data-command="How are you doing today?">
                    <i class="fas fa-heart text-red-500 mb-3 block"></i>
                    <span class="text-[9px] font-black block uppercase tracking-widest">Chat Life</span>
                </div>
                <div class="bg-white/5 border border-white/5 p-6 rounded-[2rem] text-left hover:border-blue-500/50 cursor-pointer action-card shadow-sm" data-command="Explain a JavaScript function">
                    <i class="fas fa-code text-blue-400 mb-3 block"></i>
                    <span class="text-[9px] font-black block uppercase tracking-widest">Coding Help</span>
                </div>
            </div>
        </div>
    `;
}

function showThinkingIndicator(id) {
    const thread = document.getElementById('aiThread');
    thread.insertAdjacentHTML('beforeend', `
        <div id="${id}" class="flex gap-4 animate-in fade-in mb-8 px-4">
            <div class="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center">
                <div class="w-2 h-2 bg-blue-500 rounded-full animate-ping"></div>
            </div>
        </div>
    `);
}

function scrollThread() {
    const thread = document.getElementById('aiThread');
    if (thread) requestAnimationFrame(() => thread.scrollTo({ top: thread.scrollHeight, behavior: 'smooth' }));
}

function saveToDatabase(title, html) {
    let logs = JSON.parse(localStorage.getItem('nxxt_logs') || '[]');
    if(html.includes('nxxtLanding')) return;
    
    const existingIndex = logs.findIndex(l => l.title === title);
    if(existingIndex > -1) {
        logs[existingIndex].data = html;
    } else {
        logs.unshift({ id: Date.now(), title, data: html, time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) });
    }
    
    localStorage.setItem('nxxt_logs', JSON.stringify(logs.slice(0, 15)));
    syncNeuralLogs();
}

function syncNeuralLogs() {
    const list = document.getElementById('historyList');
    if (!list) return;
    const logs = JSON.parse(localStorage.getItem('nxxt_logs') || '[]');
    if (logs.length === 0) {
        list.innerHTML = `
            <div id="historyNoState" class="flex flex-col items-center justify-center h-full text-center space-y-4 opacity-20">
                <i class="fas fa-database text-4xl"></i>
                <p class="text-[10px] font-bold uppercase tracking-widest">No Active Logs Found</p>
            </div>
        `;
        return;
    }
    list.innerHTML = logs.map(log => `
        <div onclick="restoreNeuralLink(${log.id})" class="p-4 bg-white/[0.03] border border-white/5 rounded-2xl hover:border-blue-500/50 cursor-pointer mb-2 transition-all group">
            <p class="text-[11px] text-white/50 group-hover:text-blue-400 truncate font-medium uppercase tracking-tighter">${log.title}</p>
            <p class="text-[7px] text-white/10 font-bold mt-1 uppercase">${log.time}</p>
        </div>
    `).join('');
}

window.restoreNeuralLink = (id) => {
    const logs = JSON.parse(localStorage.getItem('nxxt_logs') || '[]');
    const log = logs.find(l => l.id === id);
    if (log) { 
        document.getElementById('aiThread').innerHTML = log.data; 
        scrollThread(); 
    }
};

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






