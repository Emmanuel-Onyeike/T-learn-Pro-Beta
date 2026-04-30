/**
 * TECH NXXT: NXXT AI LEARNING ASSISTANT
 * V1.4 Neural Engine Integration - FULL RESTORATION
 * Aesthetic: Tactical Industrial / Dark Blue & Electric Blue
 */

(function initNxxtSystem() {
    // 1. CONFIGURATION & NEURAL CONSTANTS
    const SUPABASE_URL = "https://ntvcaqybiptuoyossdlz.supabase.co";
    const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im50dmNhcXliaXB0dW95b3NzZGx6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY0MjA2OTUsImV4cCI6MjA3MTk5NjY5NX0.AI3iNiW7rNre2g7pFrBNtZ0TNPmKy3uN7VTrxqZIYRI";

    const NXXT_CONFIG = {
        IMG_GEN_URL: 'https://image.pollinations.ai/prompt/',
        AI_LOGO: '/assets/Logo.webp',
        SYSTEM_IDENTITY: "You are Nxxt AI, a high-performance tactical learning assistant by Tech Nxxt. Tone: Professional, witty, industrial. Expertise: Coding, debugging, and Tech Nxxt ecosystem.",
        GOOGLE_API_KEY: "AIzaSyD-idqPEz9XD_0RLnSUDgMUKD_tohTrsEI", // REPLACE WITH VALID KEY
        SYSTEM_REPLIES: {
            "hello": "Hello! I am Nxxt AI, your learning assistant. I am Tech Nxxt's new model—currently under testing, but here to help out. How are you doing today?",
            "hi": "Hi there! Nxxt AI here. I'm the latest model from Tech Nxxt. How can I assist your session today?",
            "name": "My name is Nxxt AI. Born in the Tech Nxxt labs, currently evolving.",
            "tech nxxt": "Tech Nxxt is where innovation meets execution. We're building the future of AI-driven education.",
            "time": `The system clock reads ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}.`,
        }
    };

    // 2. VIEW RENDERER (UI INJECTION)
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
            <div class="mt-auto mb-6 vertical-text text-[9px] font-black tracking-[0.5em] text-white/5 uppercase" style="writing-mode: vertical-rl;">TECH NXXT COMPANY</div>
        </aside>

        <main class="flex-1 flex flex-col relative z-10 overflow-hidden min-w-0">
            <header class="flex justify-between items-center px-6 md:px-10 py-6 backdrop-blur-xl border-b border-white/5 shrink-0">
                <div class="flex flex-col">
                    <h2 class="text-xl md:text-2xl font-black italic tracking-tighter text-white uppercase">Nxxt <span class="text-blue-500">AI</span></h2>
                    <span class="text-[8px] font-bold text-blue-500/50 uppercase tracking-[0.3em]">Neural Engine V1.4 Active</span>
                </div>
                <div class="flex bg-black/50 p-1 rounded-xl border border-white/5">
                    <button id="modeStandard" onclick="switchMode('standard')" class="px-4 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest text-white bg-blue-600 shadow-lg">STD</button>
                    <button id="modeFun" onclick="switchMode('fun')" class="px-4 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest text-white/30">FUN</button>
                </div>
            </header>

            <div id="aiThread" class="flex-1 overflow-y-auto px-6 md:px-12 py-8 space-y-8 custom-scrollbar scroll-smooth">
                <div id="nxxtLanding" class="flex flex-col items-center justify-center min-h-full text-center space-y-8">
                    <div class="w-32 h-32 rounded-full bg-gradient-to-tr from-blue-700 to-indigo-900 shadow-[0_0_80px_rgba(37,99,235,0.4)] flex items-center justify-center p-6">
                        <img src="${NXXT_CONFIG.AI_LOGO}" class="w-full h-full object-contain">
                    </div>
                    <h1 class="text-2xl font-bold text-white uppercase tracking-tighter">Engage Nxxt</h1>
                </div>
            </div>

            <div class="p-6 md:p-8 border-t border-white/5 bg-[#020408] shrink-0">
                <div class="max-w-4xl mx-auto">
                    <div class="relative flex items-center bg-white/[0.03] border border-white/10 rounded-full px-2 py-2 focus-within:border-blue-500/40">
                        <input id="nxxtInput" type="text" placeholder="Ask Anything..." class="flex-1 bg-transparent border-none outline-none text-white px-6 py-3 text-[16px]">
                        <button id="nxxtSendBtn" class="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center hover:scale-105 shadow-[0_0_15px_rgba(37,99,235,0.3)]">
                            <i class="fas fa-arrow-up"></i>
                        </button>
                    </div>
                </div>
            </div>
        </main>

        <aside class="hidden xl:flex w-80 border-l border-white/5 bg-black/40 flex-col overflow-hidden shrink-0">
            <div class="p-6 border-b border-white/5 bg-black/20"><h3 class="text-[10px] font-black text-blue-500 uppercase tracking-widest">Neural Logs</h3></div>
            <div id="historyList" class="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar"></div>
        </aside>
        `;
    }

    // 3. CORE LOGIC
    document.addEventListener('DOMContentLoaded', () => {
        window.nxxtMode = 'standard';
        syncNeuralLogs();

        document.body.addEventListener('click', (e) => {
            const target = e.target;
            if (target.closest('#nxxtSendBtn')) sendMessage();
            if (target.closest('#newChatBtn')) location.reload();
        });

        document.body.addEventListener('keypress', (e) => {
            if (e.target.id === 'nxxtInput' && e.key === 'Enter') sendMessage();
        });
    });

    async function sendMessage() {
        const input = document.getElementById('nxxtInput');
        const prompt = input.value.trim();
        if (!prompt) return;

        if (document.getElementById('nxxtLanding')) document.getElementById('nxxtLanding').remove();
        input.value = '';
        renderUserMessage(prompt);
        
        const thinkId = 'think-' + Date.now();
        showThinkingIndicator(thinkId);

        if (/image|draw|generate|picture/i.test(prompt)) {
            handleImageRequest(prompt, thinkId);
        } else {
            handleNeuralRequest(prompt, thinkId);
        }
    }

    // 4. NEURAL ENGINE (GEMINI UPLINK)
    async function handleNeuralRequest(prompt, thinkId) {
        try {
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${NXXT_CONFIG.GOOGLE_API_KEY}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: `${NXXT_CONFIG.SYSTEM_IDENTITY}\n\nUser: ${prompt}` }] }]
                })
            });
            const data = await response.json();
            document.getElementById(thinkId)?.remove();
            let aiText = data.candidates[0].content.parts[0].text;
            if(window.nxxtMode === 'fun') aiText = `🚀 [STREAM_ON]: ${aiText.toUpperCase()} 🔥`;
            renderAiResponse(aiText, 'text');
        } catch (err) {
            document.getElementById(thinkId)?.remove();
            renderAiResponse("CRITICAL: Neural Uplink Failed. Verify API Credentials.", 'text');
        }
    }

    function handleImageRequest(prompt, thinkId) {
        document.getElementById(thinkId)?.remove();
        const url = `${NXXT_CONFIG.IMG_GEN_URL}${encodeURIComponent(prompt)}?seed=${Math.floor(Math.random()*9999)}&nologo=true`;
        renderAiResponse(url, 'image');
    }

    // 5. RENDERERS & SYNC
    function renderUserMessage(text) {
        document.getElementById('aiThread').insertAdjacentHTML('beforeend', `
            <div class="flex justify-end mb-8 animate-in fade-in slide-in-from-right-4 duration-300">
                <div class="max-w-[85%] bg-blue-600 text-white px-6 py-4 rounded-[2rem] rounded-tr-md shadow-xl">
                    <p class="text-[14px] font-medium leading-relaxed">${text}</p>
                </div>
            </div>
        `);
        scrollThread();
    }

    function renderAiResponse(content, type) {
        const formatted = type === 'text' 
            ? content.replace(/\*\*(.*?)\*\*/g, '<b class="text-blue-400">$1</b>').replace(/\n/g, '<br>')
            : `<div class="space-y-4"><img src="${content}" class="rounded-[2.5rem] border border-white/10 w-full" /><p class="text-[8px] text-blue-500 font-black uppercase tracking-widest">Asset_Rendered_Nxxt</p></div>`;

        document.getElementById('aiThread').insertAdjacentHTML('beforeend', `
            <div class="flex gap-4 md:gap-6 mb-10 animate-in fade-in duration-500">
                <div class="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center p-2 shrink-0">
                    <img src="${NXXT_CONFIG.AI_LOGO}" class="w-full h-full object-contain">
                </div>
                <div class="flex-1 pt-1"><div class="text-slate-300 text-[16px] font-light leading-relaxed max-w-2xl">${formatted}</div></div>
            </div>
        `);
        scrollThread();
        saveToSupabase(content.substring(0, 30), document.getElementById('aiThread').innerHTML);
    }

    async function saveToSupabase(title, html) {
        try {
            await fetch(`${SUPABASE_URL}/rest/v1/nxxt_logs`, {
                method: 'POST',
                headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}`, 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, chat_data: html, timestamp: new Date().toISOString() })
            });
            syncNeuralLogs();
        } catch (e) { console.warn("Sync Offline"); }
    }

    async function syncNeuralLogs() {
        const list = document.getElementById('historyList');
        if (!list) return;
        try {
            const res = await fetch(`${SUPABASE_URL}/rest/v1/nxxt_logs?select=*&order=timestamp.desc&limit=10`, {
                headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}` }
            });
            const logs = await res.json();
            list.innerHTML = logs.map(log => `
                <div class="p-4 bg-white/[0.02] border border-white/5 rounded-2xl hover:border-blue-500/40 cursor-pointer transition-all" onclick="document.getElementById('aiThread').innerHTML=\`${log.chat_data}\` ">
                    <p class="text-[10px] text-white/40 truncate font-bold uppercase">${log.title}</p>
                    <p class="text-[7px] text-blue-500 font-black mt-1 uppercase">${new Date(log.timestamp).toLocaleTimeString()}</p>
                </div>
            `).join('');
        } catch (e) { list.innerHTML = `<p class="text-[9px] opacity-10">Sync Error</p>`; }
    }

    function showThinkingIndicator(id) {
        document.getElementById('aiThread').insertAdjacentHTML('beforeend', `<div id="${id}" class="flex gap-4 mb-8 opacity-50"><div class="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center"><div class="w-1.5 h-1.5 bg-blue-500 rounded-full animate-ping"></div></div></div>`);
    }

    function scrollThread() {
        const thread = document.getElementById('aiThread');
        if (thread) thread.scrollTo({ top: thread.scrollHeight, behavior: 'smooth' });
    }

    window.switchMode = function(mode) {
        window.nxxtMode = mode;
        const std = document.getElementById('modeStandard');
        const fun = document.getElementById('modeFun');
        const active = "px-4 py-1.5 rounded-lg text-[9px] font-black uppercase text-white bg-blue-600 shadow-lg";
        const inactive = "px-4 py-1.5 rounded-lg text-[9px] font-black uppercase text-white/30";
        std.className = mode === 'standard' ? active : inactive;
        fun.className = mode === 'fun' ? active : inactive;
    }

})();

// --- GLOBAL DASHBOARD UTILITIES ---
window.NxxtDashboard = {
    showAlert: function(type, title, msg, icon) {
        const modal = document.getElementById(`${type}Modal`);
        if (modal) {
            document.getElementById(`${type}Title`).innerText = title;
            document.getElementById(`${type}Msg`).innerText = msg;
            modal.classList.remove('hidden');
        }
    }
};
