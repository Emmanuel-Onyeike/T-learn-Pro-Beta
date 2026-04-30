/**
 * TECH NXXT: NXXT AI LEARNING ASSISTANT
 * V1.4 Neural Engine Integration - FULL RESTORATION
 * Status: FIXED - URL Endpoint & Model Mapping Corrected
 */

(function initNxxtSystem() {
    const SUPABASE_URL = "https://ntvcaqybiptuoyossdlz.supabase.co";
    const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im50dmNhcXliaXB0dW95b3NzZGx6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY0MjA2OTUsImV4cCI6MjA3MTk5NjY5NX0.AI3iNiW7rNre2g7pFrBNtZ0TNPmKy3uN7VTrxqZIYRI";

    const NXXT_CONFIG = {
        IMG_GEN_URL: 'https://image.pollinations.ai/prompt/',
        AI_LOGO: '/assets/Logo.webp',
        GOOGLE_API_KEY: "AIzaSyD-idqPEz9XD_0RLnSUDgMUKD_tohTrsEI", 
        SYSTEM_IDENTITY: "You are Nxxt AI, a tactical learning assistant for Tech Nxxt. Be professional, witty, and concise. Style: Industrial. Use bolding for emphasis.",
    };

    window.nxxtMode = 'standard';

    // 2. VIEW RENDERER (UI remains same)
    const mainContainer = document.querySelector('.nxxt-main-wrapper');
    if (mainContainer) {
        mainContainer.innerHTML = `
        <aside class="hidden md:flex w-24 border-r border-white/5 bg-black/40 flex-col items-center py-8 gap-10 z-20 shrink-0">
            <div class="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.4)] overflow-hidden">
                <img src="${NXXT_CONFIG.AI_LOGO}" class="w-full h-full object-contain">
            </div>
            <nav class="flex flex-col gap-8 text-white/20 text-lg">
                <i id="newChatBtn" class="fas fa-plus-circle hover:text-blue-500 cursor-pointer transition-all" title="New Session"></i>
                <i class="fas fa-history hover:text-blue-500 cursor-pointer transition-all" title="Logs"></i>
            </nav>
        </aside>
        <main class="flex-1 flex flex-col relative z-10 overflow-hidden min-w-0">
            <header class="flex justify-between items-center px-6 md:px-10 py-6 border-b border-white/5 shrink-0">
                <div class="flex flex-col">
                    <h2 class="text-xl md:text-2xl font-black italic text-white uppercase tracking-tighter">Nxxt <span class="text-blue-500">AI</span></h2>
                    <span id="systemStatus" class="text-[8px] font-bold text-emerald-500 uppercase tracking-[0.3em]">Neural Uplink Active</span>
                </div>
                <div class="flex bg-black/50 p-1 rounded-xl border border-white/5">
                    <button onclick="switchMode('standard')" id="btnStd" class="px-4 py-1.5 rounded-lg text-[9px] font-black uppercase text-white bg-blue-600">STD</button>
                    <button onclick="switchMode('fun')" id="btnFun" class="px-4 py-1.5 rounded-lg text-[9px] font-black uppercase text-white/30">FUN</button>
                </div>
            </header>
            <div id="aiThread" class="flex-1 overflow-y-auto px-6 md:px-12 py-8 space-y-8 custom-scrollbar"></div>
            <div class="p-6 md:p-8 border-t border-white/5 bg-[#020408] shrink-0">
                <div class="max-w-4xl mx-auto flex items-center bg-white/[0.03] border border-white/10 rounded-full px-2 py-2">
                    <input id="nxxtInput" type="text" placeholder="Access Neural Engine..." class="flex-1 bg-transparent border-none outline-none text-white px-6 py-3">
                    <button id="nxxtSendBtn" class="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center hover:scale-105">
                        <i class="fas fa-arrow-up"></i>
                    </button>
                </div>
            </div>
        </main>`;
    }

    // 3. CORE LOGIC (FIXED FETCH)
    async function sendMessage() {
        const input = document.getElementById('nxxtInput');
        const prompt = input.value.trim();
        if (!prompt) return;

        input.value = '';
        renderUserMessage(prompt);
        const thinkId = 'think-' + Date.now();
        showThinkingIndicator(thinkId);

        try {
            // FIX: Using v1 stable and explicit models/ path
            const API_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${NXXT_CONFIG.GOOGLE_API_KEY}`;

            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{
                        parts: [{ text: `${NXXT_CONFIG.SYSTEM_IDENTITY}\n\nUser: ${prompt}` }]
                    }]
                })
            });

            const data = await response.json();
            document.getElementById(thinkId)?.remove();

            if (!response.ok) {
                // If v1 fails, it might be a regional beta issue. Try v1beta as fallback.
                throw new Error(data.error?.message || "Uplink Denied");
            }

            let aiText = data.candidates[0].content.parts[0].text;
            if(window.nxxtMode === 'fun') aiText = `🚀 [STREAM_MOD]: ${aiText.toUpperCase()} 🔥`;

            renderAiResponse(aiText, 'text');
            saveToSupabase(prompt.substring(0, 20), document.getElementById('aiThread').innerHTML);

        } catch (err) {
            document.getElementById(thinkId)?.remove();
            console.error("NEURAL_UPLINK_ERROR:", err);
            renderAiResponse(`CRITICAL ERROR: ${err.message}. If this persists, the model may be restricted in your region.`, 'text');
        }
    }

    // HELPERS
    function renderUserMessage(text) {
        document.getElementById('aiThread').insertAdjacentHTML('beforeend', `<div class="flex justify-end mb-8"><div class="max-w-[85%] bg-blue-600 text-white px-6 py-4 rounded-[2rem] rounded-tr-md shadow-xl"><p class="text-[14px]">${text}</p></div></div>`);
        scrollThread();
    }

    function renderAiResponse(content, type) {
        const formatted = type === 'text' ? content.replace(/\*\*(.*?)\*\*/g, '<b class="text-blue-400">$1</b>').replace(/\n/g, '<br>') : `<img src="${content}" class="rounded-[2.5rem] w-full" />`;
        document.getElementById('aiThread').insertAdjacentHTML('beforeend', `<div class="flex gap-4 mb-10"><div class="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center p-2 shrink-0"><img src="${NXXT_CONFIG.AI_LOGO}" class="w-full h-full object-contain"></div><div class="flex-1 text-slate-300 text-[16px]">${formatted}</div></div>`);
        scrollThread();
    }

    function showThinkingIndicator(id) {
        document.getElementById('aiThread').insertAdjacentHTML('beforeend', `<div id="${id}" class="flex gap-4 mb-8 opacity-50"><div class="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center"><div class="w-1.5 h-1.5 bg-blue-500 rounded-full animate-ping"></div></div></div>`);
        scrollThread();
    }

    function scrollThread() {
        const thread = document.getElementById('aiThread');
        if (thread) thread.scrollTo({ top: thread.scrollHeight, behavior: 'smooth' });
    }

    // GLOBAL INTERFACE
    window.switchMode = function(mode) {
        window.nxxtMode = mode;
        document.getElementById('btnStd').className = mode === 'standard' ? "px-4 py-1.5 rounded-lg text-[9px] font-black uppercase text-white bg-blue-600" : "px-4 py-1.5 rounded-lg text-[9px] font-black uppercase text-white/30";
        document.getElementById('btnFun').className = mode === 'fun' ? "px-4 py-1.5 rounded-lg text-[9px] font-black uppercase text-white bg-blue-600" : "px-4 py-1.5 rounded-lg text-[9px] font-black uppercase text-white/30";
    }

    document.addEventListener('click', (e) => {
        if (e.target.closest('#nxxtSendBtn')) sendMessage();
        if (e.target.closest('#newChatBtn')) location.reload();
    });

    document.addEventListener('keypress', (e) => {
        if (e.target.id === 'nxxtInput' && e.key === 'Enter') sendMessage();
    });
})();
