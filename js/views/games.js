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
                        <span id="gamesCount" class="text-[10px] font-black text-white uppercase">0</span>
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
            <div class="col-span-full py-20 flex flex-col items-center justify-center opacity-20 space-y-4">
                <i class="fas fa-circle-notch animate-spin text-4xl"></i>
                <p class="text-[10px] font-black uppercase tracking-widest">Scanning Neural Modules...</p>
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
