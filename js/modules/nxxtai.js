/**
 * TECH NXXT: NXXT AI LEARNING ASSISTANT
 * V1.4 Neural Engine Integration - FULL RESTORATION
 */

(function initNxxtSystem() {
    // 1. CONFIGURATION
    const SUPABASE_URL = "https://ntvcaqybiptuoyossdlz.supabase.co";
    const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im50dmNhcXliaXB0dW95b3NzZGx6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY0MjA2OTUsImV4cCI6MjA3MTk5NjY5NX0.AI3iNiW7rNre2g7pFrBNtZ0TNPmKy3uN7VTrxqZIYRI";

    const NXXT_CONFIG = {
        IMG_GEN_URL: 'https://image.pollinations.ai/prompt/',
        AI_LOGO: '/assets/Logo.webp',
        // --- YOUR API KEY INTEGRATED ---
        GOOGLE_API_KEY: "AIzaSyD-idqPEz9XD_0RLnSUDgMUKD_tohTrsEI", 
        SYSTEM_IDENTITY: "You are Nxxt AI, a tactical learning assistant for Tech Nxxt. Be professional, witty, and concise. Use bolding for key terms.",
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
                <i class="fas fa-plug hover:text-blue-500 cursor-pointer transition-all"></i>
            </nav>
        </aside>

        <main class="flex-1 flex flex-col relative z-10 overflow-hidden min-w-0">
            <header class="flex justify-between items-center px-6 md:px-10 py-6 border-b border-white/5 shrink-0">
                <div class="flex flex-col">
                    <h2 class="text-xl md:text-2xl font-black italic text-white uppercase">Nxxt <span class="text-blue-500">AI</span></h2>
                    <span id="systemStatus" class="text-[8px] font-bold text-emerald-500 uppercase tracking-[0.3em]">Neural Uplink Online</span>
                </div>
            </header>

            <div id="aiThread" class="flex-1 overflow-y-auto px-6 md:px-12 py-8 space-y-8 custom-scrollbar">
                <div id="nxxtLanding" class="flex flex-col items-center justify-center min-h-full text-center space-y-8">
                    <div class="w-32 h-32 rounded-full bg-blue-600/20 flex items-center justify-center p-6 border border-blue-500/20">
                        <img src="${NXXT_CONFIG.AI_LOGO}" class="w-full h-full object-contain">
                    </div>
                    <h1 class="text-2xl font-bold text-white uppercase tracking-tighter">System Ready</h1>
                </div>
            </div>

            <div class="p-6 md:p-8 border-t border-white/5 bg-black shrink-0">
                <div class="max-w-4xl mx-auto">
                    <div class="relative flex items-center bg-white/[0.03] border border-white/10 rounded-full px-2 py-2">
                        <input id="nxxtInput" type="text" placeholder="Send tactical query..." class="flex-1 bg-transparent border-none outline-none text-white px-6 py-3 text-[16px]">
                        <button id="nxxtSendBtn" class="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center hover:scale-105">
                            <i class="fas fa-arrow-up"></i>
                        </button>
                    </div>
                </div>
            </div>
        </main>
        `;
    }

    // 3. THE REPAIRED ENGINE
    async function sendMessage() {
        const input = document.getElementById('nxxtInput');
        const thread = document.getElementById('aiThread');
        const prompt = input.value.trim();
        
        if (!prompt) return;

        // UI Setup
        if (document.getElementById('nxxtLanding')) document.getElementById('nxxtLanding').remove();
        input.value = '';
        renderUserMessage(prompt);
        
        const thinkId = 'think-' + Date.now();
        showThinkingIndicator(thinkId);

        try {
            // THE GOOGLE FETCH CALL
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${NXXT_CONFIG.GOOGLE_API_KEY}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{
                        parts: [{ text: `${NXXT_CONFIG.SYSTEM_IDENTITY}\n\nUser Query: ${prompt}` }]
                    }]
                })
            });

            const data = await response.json();
            document.getElementById(thinkId)?.remove();

            if (data.error) {
                renderAiResponse(`ERROR: ${data.error.message}`, 'text');
                return;
            }

            const aiText = data.candidates[0].content.parts[0].text;
            renderAiResponse(aiText, 'text');

        } catch (err) {
            document.getElementById(thinkId)?.remove();
            console.error("UPLINK_CRITICAL_FAILURE:", err);
            renderAiResponse("CRITICAL: DATA STREAM INTERRUPTED. Check console for logs.", 'text');
        }
    }

    // 4. HELPERS
    function renderUserMessage(text) {
        document.getElementById('aiThread').insertAdjacentHTML('beforeend', `
            <div class="flex justify-end mb-8"><div class="max-w-[85%] bg-blue-600 text-white px-6 py-4 rounded-[2rem] rounded-tr-md shadow-xl"><p class="text-[14px]">${text}</p></div></div>
        `);
        scrollThread();
    }

    function renderAiResponse(content, type) {
        const formatted = type === 'text' 
            ? content.replace(/\*\*(.*?)\*\*/g, '<b class="text-blue-400">$1</b>').replace(/\n/g, '<br>')
            : `<img src="${content}" class="rounded-[2rem] w-full" />`;

        document.getElementById('aiThread').insertAdjacentHTML('beforeend', `
            <div class="flex gap-4 mb-10">
                <div class="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center p-2 shrink-0">
                    <img src="${NXXT_CONFIG.AI_LOGO}" class="w-full h-full object-contain">
                </div>
                <div class="flex-1 text-slate-300 text-[16px] font-light leading-relaxed">${formatted}</div>
            </div>
        `);
        scrollThread();
    }

    function showThinkingIndicator(id) {
        document.getElementById('aiThread').insertAdjacentHTML('beforeend', `<div id="${id}" class="flex gap-4 mb-8 opacity-50"><div class="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center"><div class="w-1.5 h-1.5 bg-blue-500 rounded-full animate-ping"></div></div></div>`);
    }

    function scrollThread() {
        const thread = document.getElementById('aiThread');
        if (thread) thread.scrollTo({ top: thread.scrollHeight, behavior: 'smooth' });
    }

    // 5. EVENT LISTENERS
    document.addEventListener('click', (e) => {
        if (e.target.closest('#nxxtSendBtn')) sendMessage();
        if (e.target.closest('#newChatBtn')) location.reload();
    });

    document.addEventListener('keypress', (e) => {
        if (e.target.id === 'nxxtInput' && e.key === 'Enter') sendMessage();
    });

})();
