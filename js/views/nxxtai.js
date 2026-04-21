views['Nxxt AI'] = `
<div class="nxxt-terminal-wrapper flex h-[92vh] max-w-[1600px] mx-auto bg-[#020408] rounded-[2.5rem] border border-blue-500/10 shadow-[0_0_100px_rgba(0,0,0,1)] overflow-hidden font-sans text-slate-300 relative">
    
    <aside class="w-20 md:w-24 border-r border-white/5 bg-black/20 flex flex-col items-center py-10 gap-10">
        <div class="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.4)]">
            <i class="fas fa-microchip text-white text-xl"></i>
        </div>
        <div class="flex flex-col gap-6 opacity-40 text-[12px]">
            <i class="fas fa-shield-alt hover:text-blue-400 cursor-pointer transition-colors"></i>
            <i class="fas fa-network-wired hover:text-blue-400 cursor-pointer transition-colors"></i>
            <i class="fas fa-database hover:text-blue-400 cursor-pointer transition-colors"></i>
            <i class="fas fa-broadcast-tower hover:text-blue-400 cursor-pointer transition-colors"></i>
        </div>
        <div class="mt-auto mb-4 origin-center -rotate-90 whitespace-nowrap text-[8px] font-black tracking-[0.5em] text-white/10 uppercase">
            System.Core.Process
        </div>
    </aside>

    <main class="flex-1 flex flex-col relative">
        
        <nav class="flex justify-between items-center px-10 py-6 border-b border-white/5 backdrop-blur-md">
            <div class="flex flex-col">
                <span class="text-[9px] font-black text-blue-500 uppercase tracking-[0.4em]">Proprietary Neural Link</span>
                <h2 class="text-2xl font-black italic tracking-tighter text-white">TECH NXXT <span class="text-blue-500">AI</span></h2>
            </div>

            <div class="flex items-center gap-8">
                <div class="hidden lg:flex flex-col items-end">
                    <span class="text-[8px] font-bold text-white/30 uppercase tracking-widest mb-1">Visual Credits</span>
                    <div id="imageCredits" class="flex gap-1">
                        <div class="w-4 h-1.5 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
                        <div class="w-4 h-1.5 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
                        <div class="w-4 h-1.5 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
                        <div class="w-4 h-1.5 bg-white/10 rounded-full"></div>
                        <div class="w-4 h-1.5 bg-white/10 rounded-full"></div>
                    </div>
                </div>
                <div class="flex bg-white/5 p-1 rounded-xl border border-white/5">
                    <button id="modeStandard" class="px-5 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all text-white bg-blue-600 shadow-lg">Tactical</button>
                    <button id="modeFun" class="px-5 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all text-white/30 hover:text-white">Override</button>
                </div>
            </div>
        </nav>

        <div id="aiThread" class="flex-1 overflow-y-auto px-12 py-10 space-y-8 scroll-smooth custom-scrollbar">
            <div class="flex flex-col gap-4 max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-1000">
                <div class="p-6 rounded-[2rem] bg-white/[0.02] border border-white/5 border-l-blue-600 border-l-4">
                    <p class="text-lg font-light leading-relaxed">
                        <span class="text-blue-500 font-bold uppercase text-[10px] block mb-2 tracking-[0.2em]">Uplink Active // Protocol NX-4</span>
                        Neural link established. System specialized in <span class="text-white font-medium">Software Engineering</span> and <span class="text-white font-medium">Mikoko League Ops</span>. Ready for command input.
                    </p>
                </div>
            </div>
        </div>

        <div class="p-10 bg-gradient-to-t from-black to-transparent">
            <div class="max-w-4xl mx-auto relative">
                <div class="absolute -top-12 left-6 flex items-center gap-4">
                    <span class="flex items-center gap-2 text-[8px] font-bold text-green-500 tracking-widest">
                        <span class="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping"></span> ENCRYPTION: AES-256
                    </span>
                    <span class="text-[8px] font-bold text-white/20 tracking-widest uppercase">Target: v4-Neural-Process</span>
                </div>

                <div class="relative flex items-end bg-[#080c14] border border-white/10 rounded-[1.5rem] p-2 focus-within:border-blue-500/50 transition-all shadow-2xl">
                    <textarea id="nxxtInput" rows="1" placeholder="Type command sequence..." 
                        class="flex-1 bg-transparent border-none outline-none text-white text-md px-6 py-4 resize-none placeholder:text-white/10 min-h-[60px]"
                        oninput="this.style.height = 'auto'; this.style.height = this.scrollHeight + 'px'"></textarea>
                    
                    <button id="nxxtSendBtn" class="m-2 w-14 h-14 rounded-2xl bg-blue-600 text-white hover:bg-blue-500 transition-all flex items-center justify-center shadow-[0_0_30px_rgba(37,99,235,0.3)] active:scale-95 group">
                        <i class="fas fa-bolt group-hover:animate-pulse"></i>
                    </button>
                </div>
                <p class="text-center mt-6 text-[7px] font-black text-white/10 uppercase tracking-[1em]">Industrial Intelligence // Built for Tech Nxxt</p>
            </div>
        </div>
    </main>

    <aside class="hidden xl:flex w-72 border-l border-white/5 bg-black/20 flex-col p-8 gap-8">
        <div class="space-y-4">
            <h3 class="text-[10px] font-black text-blue-500 uppercase tracking-widest">Neural Load</h3>
            <div class="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                <div class="h-full w-[65%] bg-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.5)]"></div>
            </div>
        </div>

        <div class="space-y-4 pt-4 border-t border-white/5">
            <h3 class="text-[10px] font-black text-white/40 uppercase tracking-widest">Active Modules</h3>
            <ul class="space-y-3">
                <li class="flex items-center gap-3 text-[10px] font-bold text-white/60">
                    <span class="w-1 h-1 bg-blue-500 rounded-full"></span> FULL_STACK_ENGINE
                </li>
                <li class="flex items-center gap-3 text-[10px] font-bold text-white/60">
                    <span class="w-1 h-1 bg-blue-500 rounded-full"></span> MIKOKO_LEAGUE_DB
                </li>
                <li class="flex items-center gap-3 text-[10px] font-bold text-white/20">
                    <span class="w-1 h-1 bg-white/10 rounded-full"></span> ASSET_GEN_V2
                </li>
            </ul>
        </div>

        <div class="mt-auto p-4 rounded-2xl bg-blue-600/5 border border-blue-500/10">
            <p class="text-[9px] font-medium leading-relaxed text-blue-400/80">
                "Precision is the engine of progress. In the grid, code is law."
            </p>
        </div>
    </aside>
</div>
`;
