/* ── T LEARN PRO: views/inbox.js ──
   Adds to the global views object loaded by dashboard.js */

views['Inbox'] = `
    <div class="max-w-6xl mx-auto h-[700px] flex flex-col animate-in fade-in slide-in-from-bottom-8 duration-700">
        
        <div class="flex items-center justify-between mb-8 px-2">
            <div>
                <h2 class="text-white font-black text-4xl uppercase tracking-tighter">Inbox</h2>
                <p class="text-blue-500/50 text-[9px] font-black uppercase tracking-[0.3em]">Encrypted Terminal v2.0</p>
            </div>
            <div class="flex gap-3">
                <button class="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-white transition-colors">
                    <i class="fas fa-sliders-h text-xs"></i>
                </button>
                <button class="px-6 py-3 bg-blue-600 rounded-2xl text-white text-[10px] font-black uppercase tracking-widest shadow-lg shadow-blue-600/20">
                    Compose
                </button>
            </div>
        </div>

        <div class="flex-1 flex bg-[#0a0f1d]/50 border border-white/5 rounded-[3rem] overflow-hidden">
            
            <div class="w-1/3 border-r border-white/5 flex flex-col">
                <div class="p-6 border-b border-white/5">
                    <div class="relative group">
                        <i class="fas fa-filter absolute left-4 top-1/2 -translate-y-1/2 text-white/10 text-[10px]"></i>
                        <input type="text" placeholder="Filter transmissions..." class="w-full bg-white/5 border border-white/10 py-3 pl-10 pr-4 rounded-xl text-white text-[10px] uppercase font-black tracking-widest outline-none focus:border-blue-500/40 transition-all">
                    </div>
                </div>
                
                <div class="flex-1 overflow-y-auto p-4 space-y-4 opacity-40">
                    ${[1, 2, 3, 4].map(() => `
                        <div class="p-5 rounded-[2rem] border border-dashed border-white/10 flex items-center gap-4">
                            <div class="w-10 h-10 rounded-full bg-white/5 shrink-0"></div>
                            <div class="space-y-2 flex-1">
                                <div class="h-2 w-20 bg-white/10 rounded-full"></div>
                                <div class="h-1.5 w-full bg-white/5 rounded-full"></div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>

            <div class="flex-1 flex flex-col items-center justify-center p-20 text-center relative">
                <div class="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none">
                    <i class="fas fa-satellite-dish text-[20rem]"></i>
                </div>

                <div class="relative space-y-6">
                    <div class="inline-block p-6 rounded-[2.5rem] bg-gradient-to-b from-blue-500/10 to-transparent border border-blue-500/20 animate-pulse">
                        <i class="fas fa-signal text-blue-500 text-4xl"></i>
                    </div>
                    
                    <div>
                        <h3 class="text-white font-black text-2xl uppercase tracking-tighter mb-2">Signal Intercepted</h3>
                        <p class="text-white/20 text-[10px] font-bold uppercase tracking-widest max-w-sm mx-auto leading-relaxed">
                            Engineers are currently calibrating the <span class="text-blue-500">end-to-end neural encryption</span>. Communications will resume once the link is secured.
                        </p>
                    </div>

                    <div class="pt-8">
                        <div class="flex items-center justify-center gap-2">
                            <span class="w-1 h-1 bg-blue-500 rounded-full animate-ping"></span>
                            <span class="text-[8px] font-black text-blue-400 uppercase tracking-[0.5em]">Establishing Protocol...</span>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
`;

