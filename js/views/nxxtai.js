views['Nxxt AI'] = `
<div class="nxxt-main-wrapper min-h-[92vh] w-full flex flex-col md:flex-row bg-[#020408] font-sans text-slate-200 overflow-hidden relative">
    
    <aside class="hidden md:flex w-24 border-r border-white/5 bg-black/40 flex-col items-center py-8 gap-12 z-20">
        <div class="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.4)]">
            <i class="fas fa-bolt text-white"></i>
        </div>
        <nav class="flex flex-col gap-8 text-white/20 text-lg">
            <i class="fas fa-layer-group hover:text-blue-500 cursor-pointer transition-all"></i>
            <i class="fas fa-code-branch hover:text-blue-500 cursor-pointer transition-all"></i>
            <i class="fas fa-terminal hover:text-blue-400 cursor-pointer"></i>
        </nav>
        <div class="mt-auto mb-6 vertical-text text-[9px] font-black tracking-[0.5em] text-white/5 uppercase select-none" style="writing-mode: vertical-rl;">
            PROTOCOL_NX_V4
        </div>
    </aside>

    <main class="flex-1 flex flex-col relative z-10">
        
        <header class="flex justify-between items-center px-6 md:px-10 py-6 backdrop-blur-xl border-b border-white/5">
            <div class="flex flex-col">
                <h2 class="text-xl md:text-2xl font-black italic tracking-tighter text-white">TECH NXXT <span class="text-blue-500">AI</span></h2>
                <span class="text-[8px] font-bold text-blue-500/50 uppercase tracking-[0.3em] md:block hidden">Neural Link Stable</span>
            </div>
            
            <div class="flex items-center gap-4">
                <div id="imageCredits" class="flex gap-1 bg-white/5 p-2 rounded-lg border border-white/5">
                    <div class="w-1.5 h-3 bg-blue-500 rounded-full shadow-[0_0_8px_blue]"></div>
                    <div class="w-1.5 h-3 bg-blue-500 rounded-full"></div>
                    <div class="w-1.5 h-3 bg-blue-500 rounded-full"></div>
                    <div class="w-1.5 h-3 bg-white/10 rounded-full"></div>
                </div>
                <div class="flex bg-black/50 p-1 rounded-xl border border-white/5">
                    <button id="modeStandard" class="px-4 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest text-white bg-blue-600 shadow-lg">STD</button>
                    <button id="modeFun" class="px-4 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest text-white/30">FUN</button>
                </div>
            </div>
        </header>

        <div id="aiThread" class="flex-1 overflow-y-auto px-6 md:px-12 py-8 space-y-8 custom-scrollbar">
            
            <div id="nxxtLanding" class="flex flex-col items-center justify-center py-12 text-center space-y-8 animate-in fade-in zoom-in duration-700">
                <div class="relative">
                    <div class="w-32 h-32 md:w-48 md:h-48 rounded-full bg-gradient-to-tr from-blue-700 via-blue-400 to-indigo-900 shadow-[0_0_80px_rgba(37,99,235,0.4)] flex items-center justify-center animate-pulse">
                        <i class="fas fa-sparkles text-white text-4xl md:text-6xl opacity-80"></i>
                    </div>
                    <div class="absolute -inset-4 bg-blue-500/10 blur-3xl rounded-full -z-10"></div>
                </div>
                
                <div class="max-w-xs mx-auto">
                    <h1 class="text-2xl font-bold text-white mb-2">Engage Intelligence</h1>
                    <p class="text-sm text-white/40 leading-relaxed font-light">Control tasks effortlessly, from building UI to managing the Mikoko League.</p>
                </div>

                <div class="grid grid-cols-2 gap-4 w-full max-w-md px-4">
                    <div class="bg-gradient-to-br from-blue-600/20 to-blue-900/10 border border-white/10 p-6 rounded-[2rem] text-left hover:border-blue-500/50 transition-all cursor-pointer group">
                        <i class="fas fa-microphone text-blue-500 mb-3 block"></i>
                        <span class="text-sm font-bold block">Speak to AI</span>
                    </div>
                    <div class="bg-gradient-to-br from-indigo-600/20 to-indigo-900/10 border border-white/10 p-6 rounded-[2rem] text-left hover:border-blue-500/50 transition-all cursor-pointer group">
                        <i class="fas fa-comment-dots text-indigo-500 mb-3 block"></i>
                        <span class="text-sm font-bold block">Chat Neural</span>
                    </div>
                    <div class="bg-gradient-to-br from-slate-600/20 to-slate-900/10 border border-white/10 p-6 rounded-[2rem] text-left hover:border-blue-500/50 transition-all cursor-pointer group">
                        <i class="fas fa-image text-slate-400 mb-3 block"></i>
                        <span class="text-sm font-bold block">Generate Assets</span>
                    </div>
                    <div class="bg-gradient-to-br from-purple-600/20 to-purple-900/10 border border-white/10 p-6 rounded-[2rem] text-left hover:border-blue-500/50 transition-all cursor-pointer group">
                        <i class="fas fa-expand text-purple-500 mb-3 block"></i>
                        <span class="text-sm font-bold block">Scan Logic</span>
                    </div>
                </div>
            </div>
            
            </div>

        <div class="p-6 md:p-10">
            <div class="max-w-4xl mx-auto">
                <div class="relative flex items-center bg-white/[0.03] border border-white/10 rounded-full px-2 py-2 focus-within:border-blue-500/40 focus-within:bg-white/[0.05] transition-all shadow-2xl">
                    <input id="nxxtInput" type="text" placeholder="Ask anything..." 
                        class="flex-1 bg-transparent border-none outline-none text-white px-6 py-3 text-[16px] placeholder:text-white/20">
                    
                    <button id="nxxtSendBtn" class="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-lg shadow-blue-600/20">
                        <i class="fas fa-arrow-up text-sm"></i>
                    </button>
                </div>
            </div>
        </div>
    </main>

    <aside class="hidden xl:flex w-80 border-l border-white/5 bg-black/40 flex-col p-10 gap-8">
        <div class="space-y-6">
            <div>
                <h3 class="text-[10px] font-black text-blue-500 uppercase tracking-widest mb-4">Neural Engine</h3>
                <div class="space-y-2">
                    <div class="flex justify-between text-[9px] font-bold uppercase tracking-tighter">
                        <span>CPU Load</span>
                        <span class="text-blue-500">42%</span>
                    </div>
                    <div class="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                        <div class="h-full w-[42%] bg-blue-600"></div>
                    </div>
                </div>
            </div>

            <div class="pt-6 border-t border-white/5">
                <h3 class="text-[10px] font-black text-white/30 uppercase tracking-widest mb-4">Active Threads</h3>
                <div class="space-y-3">
                    <div class="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/5">
                        <div class="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                        <span class="text-[10px] font-bold text-white/80 uppercase">Mikoko League DB</span>
                    </div>
                    <div class="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/5">
                        <div class="w-2 h-2 rounded-full bg-blue-500"></div>
                        <span class="text-[10px] font-bold text-white/80 uppercase">Full-Stack Hub</span>
                    </div>
                </div>
            </div>
        </div>
    </aside>
</div>
`;
