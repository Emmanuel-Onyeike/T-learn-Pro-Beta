views['Games'] = `
<div class="h-[92vh] w-full bg-[#020408] font-sans text-slate-200 overflow-hidden flex flex-col">
    
    <header class="px-6 md:px-10 py-6 border-b border-white/5 bg-black/20 shrink-0">
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
                <h2 class="text-2xl font-black italic tracking-tighter text-white uppercase">Neural <span class="text-cyan-400">Games</span></h2>
                <p class="text-[8px] font-bold text-cyan-500/50 uppercase tracking-[0.3em]">Combat-Ready Learning Modules</p>
            </div>
            
            <div class="flex gap-4">
                <div class="bg-white/5 border border-white/10 px-4 py-2 rounded-2xl flex items-center gap-3">
                    <div class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <div class="flex flex-col">
                        <span class="text-[7px] font-black text-gray-500 uppercase">System Status</span>
                        <span class="text-[10px] font-bold text-white uppercase">Operational</span>
                    </div>
                </div>
                <div class="bg-cyan-500/10 border border-cyan-500/20 px-4 py-2 rounded-2xl flex items-center gap-3">
                    <i class="fas fa-gamepad text-cyan-400 text-xs"></i>
                    <div class="flex flex-col">
                        <span class="text-[7px] font-black text-cyan-500/60 uppercase">Active Games</span>
                        <span id="gamesCount" class="text-[10px] font-black text-white uppercase">2</span>
                    </div>
                </div>
            </div>
        </div>
    </header>

    <main class="flex-1 overflow-y-auto p-6 md:p-10 custom-scrollbar">
        
        <div class="max-w-4xl mb-10">
            <h3 class="text-[10px] font-black text-cyan-500 uppercase tracking-[0.4em] mb-2">Available Missions</h3>
            <p class="text-sm text-white/40 leading-relaxed font-light">Select a training module to initialize neural synchronization. High-performance logic required for Elite difficulty levels.</p>
        </div>

        <div id="gamesGridContainer" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
            
            <div class="group relative bg-gradient-to-br from-cyan-600/5 to-black border border-white/5 p-8 rounded-[2.5rem] hover:border-cyan-500/50 transition-all duration-500 overflow-hidden">
                <div class="relative z-10">
                    <div class="flex justify-between items-start mb-8">
                        <div class="h-14 w-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                            <i class="fas fa-bullseye text-2xl"></i>
                        </div>
                        <span class="text-[8px] font-black px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 uppercase tracking-widest">Elite Module</span>
                    </div>
                    
                    <h4 class="text-white font-black uppercase tracking-tight text-xl">Syntax Striker</h4>
                    <p class="text-cyan-500/60 text-[9px] font-black uppercase tracking-widest mt-1">Regex Pattern Recognition</p>
                    
                    <p class="mt-6 text-gray-400 text-[11px] leading-relaxed font-medium">
                        Neutralize security threats by writing precise <span class="text-white font-bold">Regex patterns</span>. Speed and pattern accuracy determine your security clearance.
                    </p>

                    <div class="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
                        <div class="flex flex-col">
                            <span class="text-[7px] font-black text-gray-600 uppercase">Tech Stack</span>
                            <span class="text-[9px] font-bold text-white uppercase">JavaScript / RegExp</span>
                        </div>
                        <button onclick="launchMission('G-771')" class="px-6 py-3 rounded-xl bg-cyan-600 text-white text-[10px] font-black uppercase tracking-widest hover:bg-cyan-500 transition-all shadow-[0_0_20px_rgba(8,145,178,0.3)]">
                            Sync Neural
                        </button>
                    </div>
                </div>
                <i class="fas fa-terminal absolute -right-4 -bottom-4 text-9xl text-white/[0.02] group-hover:text-cyan-500/[0.05] transition-all rotate-12"></i>
            </div>

            <div class="group relative bg-gradient-to-br from-blue-600/5 to-black border border-white/5 p-8 rounded-[2.5rem] hover:border-blue-500/50 transition-all duration-500 overflow-hidden">
                <div class="relative z-10">
                    <div class="flex justify-between items-start mb-8">
                        <div class="h-14 w-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                            <i class="fas fa-layer-group text-2xl"></i>
                        </div>
                        <span class="text-[8px] font-black px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 uppercase tracking-widest">Advanced</span>
                    </div>
                    
                    <h4 class="text-white font-black uppercase tracking-tight text-xl">Stack Overflow</h4>
                    <p class="text-blue-500/60 text-[9px] font-black uppercase tracking-widest mt-1">Memory & Data Structures</p>
                    
                    <p class="mt-6 text-gray-400 text-[11px] leading-relaxed font-medium">
                        Manage high-traffic server buffers. Prevent memory leaks by correctly sorting <span class="text-white font-bold">LIFO and FIFO</span> data packets in real-time.
                    </p>

                    <div class="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
                        <div class="flex flex-col">
                            <span class="text-[7px] font-black text-gray-600 uppercase">Logic Type</span>
                            <span class="text-[9px] font-bold text-white uppercase">Stacks / Queues</span>
                        </div>
                        <button onclick="launchMission('G-882')" class="px-6 py-3 rounded-xl bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest hover:bg-blue-500 transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)]">
                            Sync Neural
                        </button>
                    </div>
                </div>
                <i class="fas fa-database absolute -right-4 -bottom-4 text-9xl text-white/[0.02] group-hover:text-blue-500/[0.05] transition-all rotate-12"></i>
            </div>

        </div>
    </main>

    <footer class="px-10 py-4 border-t border-white/5 bg-black/40 flex justify-between items-center shrink-0">
        <span class="text-[7px] font-black text-white/10 uppercase tracking-[0.5em]">Tactical Interface v1.0</span>
        <div class="flex gap-4 opacity-20">
            <i class="fas fa-microchip text-xs"></i>
            <i class="fas fa-wifi text-xs"></i>
            <i class="fas fa-bolt text-xs"></i>
        </div>
    </footer>
</div>
`;
