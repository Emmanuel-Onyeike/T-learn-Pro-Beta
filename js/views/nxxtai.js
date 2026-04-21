views['Nxxt AI'] = `
<div class="nxxt-main-wrapper min-h-[92vh] w-full flex flex-col md:flex-row bg-[#020408] font-sans text-slate-200 overflow-hidden relative">
    
    <aside class="hidden md:flex w-24 border-r border-white/5 bg-black/40 flex-col items-center py-8 gap-10 z-20">
        <div class="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.4)]">
            <i class="fas fa-bolt text-white"></i>
        </div>
        <nav class="flex flex-col gap-8 text-white/20 text-lg">
            <i id="newChatBtn" class="fas fa-plus-circle hover:text-blue-500 cursor-pointer transition-all" title="New Chat"></i>
            <i id="searchChatBtn" class="fas fa-search hover:text-blue-500 cursor-pointer transition-all" title="Search for Chat"></i>
            <i class="fas fa-plug hover:text-blue-500 cursor-pointer transition-all" title="API Status"></i>
            <div class="relative group">
                <i class="fas fa-arrow-alt-circle-up text-white/5 cursor-not-allowed" title="Update Locked"></i>
                <span class="absolute left-14 top-0 bg-red-600 text-[8px] px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">LOCKED</span>
            </div>
        </nav>
        <div class="mt-auto mb-6 vertical-text text-[9px] font-black tracking-[0.5em] text-white/5 uppercase select-none" style="writing-mode: vertical-rl;">
            PROTOCOL_NX_V4
        </div>
    </aside>

    <main class="flex-1 flex flex-col relative z-10 overflow-hidden">
        <header class="flex justify-between items-center px-6 md:px-10 py-6 backdrop-blur-xl border-b border-white/5 shrink-0">
            <div class="flex flex-col">
                <h2 class="text-xl md:text-2xl font-black italic tracking-tighter text-white uppercase">Neural <span class="text-blue-500">Interface</span></h2>
                <span class="text-[8px] font-bold text-blue-500/50 uppercase tracking-[0.3em]">V1 System Active</span>
            </div>
            
            <div class="flex items-center gap-4">
                <div class="flex bg-black/50 p-1 rounded-xl border border-white/5">
                    <button id="modeStandard" class="px-4 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest text-white bg-blue-600 shadow-lg">STD</button>
                    <button id="modeFun" class="px-4 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest text-white/30">FUN</button>
                </div>
            </div>
        </header>

        <div id="aiThread" class="flex-1 overflow-y-auto px-6 md:px-12 py-8 space-y-8 custom-scrollbar scroll-smooth">
            <div id="nxxtLanding" class="flex flex-col items-center justify-center py-12 text-center space-y-8 animate-in fade-in zoom-in duration-700">
                <div class="relative">
                    <div class="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-tr from-blue-700 via-blue-400 to-indigo-900 shadow-[0_0_80px_rgba(37,99,235,0.4)] flex items-center justify-center animate-pulse">
                        <i class="fas fa-bolt text-white text-4xl opacity-80"></i>
                    </div>
                </div>
                <div class="max-w-xs mx-auto">
                    <h1 class="text-2xl font-bold text-white mb-2">Engage Nxxt</h1>
                    <p class="text-sm text-white/40 leading-relaxed font-light">Manual training protocols active. System ready for deployment.</p>
                </div>
            </div>
        </div>

        <div class="p-6 md:p-8 shrink-0">
            <div class="max-w-4xl mx-auto">
                <div class="relative flex items-center bg-white/[0.03] border border-white/10 rounded-full px-2 py-2 focus-within:border-blue-500/40 transition-all shadow-2xl">
                    <input id="nxxtInput" type="text" placeholder="Transmit command..." class="flex-1 bg-transparent border-none outline-none text-white px-6 py-3 text-[16px]">
                    <button id="nxxtSendBtn" class="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center hover:scale-105 transition-all">
                        <i class="fas fa-arrow-up"></i>
                    </button>
                </div>
            </div>
        </div>
    </main>

    <aside class="hidden xl:flex w-80 border-l border-white/5 bg-black/40 flex-col overflow-hidden">
        <div class="p-6 border-b border-white/5 shrink-0">
            <h3 class="text-[10px] font-black text-blue-500 uppercase tracking-widest">Neural Logs</h3>
        </div>
        
        <div id="historyList" class="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
            <div id="historyNoState" class="flex flex-col items-center justify-center h-full text-center space-y-4 opacity-20">
                <i class="fas fa-database text-4xl"></i>
                <p class="text-[10px] font-bold uppercase tracking-widest">No Active Logs Found</p>
            </div>
        </div>
    </aside>
</div>
`;
