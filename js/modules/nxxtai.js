/**
 * TECH NXXT: NXXT AI LEARNING ASSISTANT
 * V1.5 Manual Neural Engine - FULL RESTORATION
 * Status: STABLE - Local Logic Protocol
 */

(function initNxxtSystem() {
    // 1. CONFIGURATION & PERSISTENCE
    const SUPABASE_URL = "https://ntvcaqybiptuoyossdlz.supabase.co";
    const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im50dmNhcXliaXB0dW95b3NzZGx6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY0MjA2OTUsImV4cCI6MjA3MTk5NjY5NX0.AI3iNiW7rNre2g7pFrBNtZ0TNPmKy3uN7VTrxqZIYRI";

    const NXXT_CONFIG = {
        AI_LOGO: '/assets/Logo.webp',
        SYSTEM_NAME: "Nxxt Manual Core",
        // Industrial Style Identity
        IDENTITY: "SYSTEM_REPLY: [LOCAL_ENGINE_ACTIVE]",
    };

    window.nxxtMode = 'standard';

    // 2. VIEW RENDERER (UI INJECTION)
    const mainContainer = document.querySelector('.nxxt-main-wrapper');
    if (mainContainer) {
        mainContainer.innerHTML = `
        <aside class="hidden md:flex w-24 border-r border-white/5 bg-black/40 flex-col items-center py-8 gap-10 z-20 shrink-0">
            <div class="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.4)] overflow-hidden">
                <img src="${NXXT_CONFIG.AI_LOGO}" class="w-full h-full object-contain">
            </div>
            <nav class="flex flex-col gap-8 text-white/20 text-lg">
                <i id="newChatBtn" class="fas fa-plus-circle hover:text-blue-500 cursor-pointer transition-all" title="New Session"></i>
                <i class="fas fa-history hover:text-white/40 cursor-not-allowed transition-all" title="Logs (Read Only)"></i>
            </nav>
            <div class="mt-auto mb-6 vertical-text text-[9px] font-black tracking-[0.5em] text-white/5 uppercase" style="writing-mode: vertical-rl;">TECH NXXT</div>
        </aside>

        <main class="flex-1 flex flex-col relative z-10 overflow-hidden min-w-0">
            <header class="flex justify-between items-center px-6 md:px-10 py-6 backdrop-blur-xl border-b border-white/5 shrink-0">
                <div class="flex flex-col">
                    <h2 class="text-xl md:text-2xl font-black italic text-white uppercase tracking-tighter">Nxxt <span class="text-blue-500">AI</span></h2>
                    <span id="systemStatus" class="text-[8px] font-bold text-amber-500 uppercase tracking-[0.3em]">Manual Protocol Active</span>
                </div>
                <div class="flex bg-black/50 p-1 rounded-xl border border-white/5">
                    <button onclick="switchMode('standard')" id="btnStd" class="px-4 py-1.5 rounded-lg text-[9px] font-black uppercase text-white bg-blue-600">STD</button>
                    <button onclick="switchMode('fun')" id="btnFun" class="px-4 py-1.5 rounded-lg text-[9px] font-black uppercase text-white/30">FUN</button>
                </div>
            </header>

            <div id="aiThread" class="flex-1 overflow-y-auto px-6 md:px-12 py-8 space-y-8 custom-scrollbar">
                <div id="nxxtLanding" class="flex flex-col items-center justify-center min-h-full text-center space-y-8">
                    <div class="w-32 h-32 rounded-full bg-blue-600/10 flex items-center justify-center p-6 border border-blue-500/20">
                        <img src="${NXXT_CONFIG.AI_LOGO}" class="w-full h-full object-contain opacity-50">
                    </div>
                    <h1 class="text-2xl font-bold text-white uppercase tracking-widest opacity-20 italic">Manual Engine Engaged</h1>
                </div>
            </div>

            <div class="p-6 md:p-8 border-t border-white/5 bg-[#020408] shrink-0">
                <div class="max-w-4xl mx-auto">
                    <div class="relative flex items-center bg-white/[0.03] border border-white/10 rounded-full px-2 py-2 focus-within:border-blue-500/50 transition-all">
                        <input id="nxxtInput" type="text" placeholder="Input manual command..." class="flex-1 bg-transparent border-none outline-none text-white px-6 py-3 text-[16px]">
                        <button id="nxxtSendBtn" class="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center hover:scale-105 transition-transform shadow-lg shadow-blue-600/20">
                            <i class="fas fa-arrow-up"></i>
                        </button>
                    </div>
                </div>
            </div>
        </main>
        `;
    }

    // 3. MANUAL RESPONSE LOGIC
    function processManualQuery(input) {
        const query = input.toLowerCase();
        
        // Command Map
        if (query.includes("hello") || query.includes("hi")) {
            return "Greetings. **Manual Engine** is currently handling all traffic. How can Tech Nxxt assist?";
        }
        if (query.includes("status")) {
            return "SYSTEM_CHECK: **All modules nominal**. External API uplink is disconnected by user choice.";
        }
        if (query.includes("nxxt")) {
            return "**Tech Nxxt** is a high-performance learning ecosystem. I am the internal AI assistant.";
        }
        if (query.includes("help")) {
            return "Available Triggers: **status**, **hello**, **nxxt**, **clear**. Manual mode is limited to internal logic.";
        }
        
        return "Manual override active. Query recognized but no hardcoded response exists. **Refine tactical input.**";
    }

    // 4. CORE ENGINE FUNCTIONS
    async function sendMessage() {
        const input = document.getElementById('nxxtInput');
        const prompt = input.value.trim();
        if (!prompt) return;

        if (document.getElementById('nxxtLanding')) document.getElementById('nxxtLanding').remove();
        
        input.value = '';
        renderUserMessage(prompt);
        
        const thinkId = 'think-' + Date.now();
        showThinkingIndicator(thinkId);

        // Simulate local processing delay
        setTimeout(() => {
            document.getElementById(thinkId)?.remove();
            
            let response = processManualQuery(prompt);
            
            if(window.nxxtMode === 'fun') {
                response = `🚀 [MANUAL_PROT]: ${response.toUpperCase()} 🔥`;
            }

            renderAiResponse(response);
            saveToSupabase(prompt.substring(0, 20), document.getElementById('aiThread').innerHTML);
        }, 500);
    }

    // 5. UI HELPERS
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

    function renderAiResponse(content) {
        const formatted = content.replace(/\*\*(.*?)\*\*/g, '<b class="text-blue-400">$1</b>').replace(/\n/g, '<br>');

        document.getElementById('aiThread').insertAdjacentHTML('beforeend', `
            <div class="flex gap-4 md:gap-6 mb-10 animate-in fade-in duration-500">
                <div class="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center p-2 shrink-0">
                    <img src="${NXXT_CONFIG.AI_LOGO}" class="w-full h-full object-contain">
                </div>
                <div class="flex-1 pt-1">
                    <div class="text-slate-300 text-[16px] font-light leading-relaxed max-w-2xl">${formatted}</div>
                </div>
            </div>
        `);
        scrollThread();
    }

    async function saveToSupabase(title, html) {
        try {
            await fetch(`${SUPABASE_URL}/rest/v1/nxxt_logs`, {
                method: 'POST',
                headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}`, 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, chat_data: html, timestamp: new Date().toISOString() })
            });
        } catch (e) { console.warn("Supabase Sync Offline"); }
    }

    function showThinkingIndicator(id) {
        document.getElementById('aiThread').insertAdjacentHTML('beforeend', `<div id="${id}" class="flex gap-4 mb-8 opacity-50"><div class="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center"><div class="w-1.5 h-1.5 bg-blue-500 rounded-full animate-ping"></div></div></div>`);
        scrollThread();
    }

    function scrollThread() {
        const thread = document.getElementById('aiThread');
        if (thread) thread.scrollTo({ top: thread.scrollHeight, behavior: 'smooth' });
    }

    // 6. MODES & EVENTS
    window.switchMode = function(mode) {
        window.nxxtMode = mode;
        const s = document.getElementById('btnStd');
        const f = document.getElementById('btnFun');
        if(mode === 'fun') {
            f.className = "px-4 py-1.5 rounded-lg text-[9px] font-black uppercase text-white bg-blue-600 shadow-lg";
            s.className = "px-4 py-1.5 rounded-lg text-[9px] font-black uppercase text-white/30";
        } else {
            s.className = "px-4 py-1.5 rounded-lg text-[9px] font-black uppercase text-white bg-blue-600 shadow-lg";
            f.className = "px-4 py-1.5 rounded-lg text-[9px] font-black uppercase text-white/30";
        }
    }

    document.addEventListener('click', (e) => {
        if (e.target.closest('#nxxtSendBtn')) sendMessage();
        if (e.target.closest('#newChatBtn')) location.reload();
    });

    document.addEventListener('keydown', (e) => {
        if (e.target.id === 'nxxtInput' && e.key === 'Enter') sendMessage();
    });

})();
