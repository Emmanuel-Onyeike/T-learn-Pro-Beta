/* ── T LEARN PRO: views/leaderboard.js ──
   Adds to the global views object loaded by dashboard.js */

views['Leaderboard'] = `
    <div class="max-w-4xl mx-auto p-6 space-y-12 animate-in fade-in duration-700">
        <div class="text-center space-y-2 mb-12">
            <h2 class="text-white font-black text-4xl uppercase tracking-tighter">Global Rankings</h2>
            <p class="text-blue-500/60 text-[10px] font-black uppercase tracking-[0.4em]">Top Tier Contributors</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-5 gap-4">
            ${[1, 2, 3, 4, 5].map(rank => `
                <div class="relative group">
                    <div class="absolute -top-3 -left-3 w-8 h-8 rounded-xl bg-[#0a0f25] border border-white/10 flex items-center justify-center z-10 shadow-xl">
                        <span class="text-[10px] font-black ${rank === 1 ? 'text-yellow-400' : rank === 2 ? 'text-slate-300' : rank === 3 ? 'text-amber-600' : 'text-white/40'}">${rank}</span>
                    </div>
                    
                    <div class="bg-white/5 border border-white/10 rounded-[2rem] p-6 flex flex-col items-center text-center transition-all duration-300 group-hover:bg-white/[0.08] group-hover:border-blue-500/30 group-hover:-translate-y-1">
                        <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/5 mb-4 flex items-center justify-center overflow-hidden">
                             <i class="fas fa-user text-white/10 text-xl"></i>
                        </div>
                        <div class="h-2 w-12 bg-white/5 rounded-full mb-2"></div> <div class="h-1.5 w-8 bg-white/5 rounded-full"></div> </div>
                </div>
            `).join('')}
        </div>

        <div class="space-y-3 pt-8">
            <div class="flex justify-between px-8 text-[9px] font-black text-white/20 uppercase tracking-widest mb-4">
                <span>Participant</span>
                <span>Global Rank</span>
            </div>
            
            <div class="max-h-[500px] overflow-y-auto pr-2 space-y-2 custom-scrollbar">
                ${Array.from({ length: 15 }).map((_, i) => {
                    const rank = i + 6;
                    return `
                    <div class="group flex items-center justify-between bg-white/[0.02] border border-white/5 p-4 px-8 rounded-2xl transition-all hover:bg-white/5 hover:border-white/10">
                        <div class="flex items-center gap-4">
                            <div class="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center border border-white/5">
                                <i class="fas fa-user text-[10px] text-white/20"></i>
                            </div>
                            <div class="space-y-1">
                                <div class="h-2 w-24 bg-white/5 rounded-full"></div>
                                <div class="h-1.5 w-12 bg-white/5 rounded-full opacity-50"></div>
                            </div>
                        </div>
                        
                        <div class="flex items-center gap-6">
                            <span class="text-white/10 font-black text-[11px] italic">#${rank}</span>
                            <div class="w-1.5 h-1.5 rounded-full bg-white/5"></div>
                        </div>
                    </div>
                    `;
                }).join('')}
                
                <div class="py-10 text-center">
                    <p class="text-[9px] font-black text-white/10 uppercase tracking-[0.5em]">End of Active Rankings</p>
                </div>
            </div>
        </div>
    </div>
`;

