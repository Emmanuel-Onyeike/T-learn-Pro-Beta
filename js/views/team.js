/* ── T LEARN PRO: views/team.js ──
   Adds to the global views object loaded by dashboard.js */

views['Team'] = `
    <div class="max-w-6xl mx-auto p-6 space-y-10 animate-in fade-in zoom-in-95 duration-700">
        
        <div class="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
            <div class="space-y-2">
                <div class="flex items-center gap-2">
                    <div class="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>
                    <span class="text-[9px] font-black text-blue-500 uppercase tracking-[0.3em]">Operational Unit</span>
                </div>
                <h2 class="text-white font-black text-5xl uppercase tracking-tighter">My Squad</h2>
            </div>
            
            <button class="px-8 py-4 bg-white/5 border border-white/10 rounded-2xl text-white/40 text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white hover:border-blue-500 transition-all duration-300">
                <i class="fas fa-user-plus mr-2"></i> Recruit Member
            </button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
            
            <div class="md:col-span-2 md:row-span-2 relative group overflow-hidden bg-gradient-to-br from-blue-600/10 to-transparent border border-blue-500/20 rounded-[3rem] p-10 flex flex-col justify-between">
                <div class="absolute top-0 right-0 p-8">
                    <i class="fas fa-crown text-blue-500/20 text-6xl rotate-12 group-hover:rotate-0 transition-transform duration-500"></i>
                </div>
                
                <div class="space-y-4">
                    <div class="w-24 h-24 rounded-[2.5rem] bg-white/5 border border-white/10 flex items-center justify-center">
                        <i class="fas fa-user-shield text-white/10 text-4xl"></i>
                    </div>
                    <div>
                        <h3 class="text-white font-black text-3xl uppercase tracking-tighter">Squad Leader</h3>
                        <p class="text-blue-400 text-[10px] font-black uppercase tracking-[0.2em]">Unassigned Slot</p>
                    </div>
                </div>

                <div class="pt-10">
                    <div class="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                        <div class="h-full bg-blue-500 w-0 group-hover:w-full transition-all duration-1000"></div>
                    </div>
                    <p class="mt-4 text-white/20 text-[9px] font-bold uppercase italic">Awaiting authentication...</p>
                </div>
            </div>

            ${['Engineer', 'Designer', 'Analyst', 'Strategist'].map(role => `
                <div class="bg-[#0a0f1d] border border-white/5 rounded-[2.5rem] p-8 flex flex-col items-center text-center group hover:border-white/20 transition-all">
                    <div class="w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/5 mb-6 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <i class="fas fa-id-badge text-white/5 text-2xl"></i>
                    </div>
                    <h4 class="text-white/60 font-black text-xs uppercase tracking-widest mb-1">${role}</h4>
                    <span class="text-[8px] text-white/10 font-black uppercase tracking-tighter">System Standby</span>
                    
                    <div class="mt-6 flex gap-1">
                        <div class="w-1 h-1 rounded-full bg-white/10"></div>
                        <div class="w-1 h-1 rounded-full bg-white/10"></div>
                        <div class="w-1 h-1 rounded-full bg-white/10"></div>
                    </div>
                </div>
            `).join('')}

            <div class="md:col-span-2 bg-white/[0.01] border-2 border-dashed border-white/5 rounded-[2.5rem] p-8 flex items-center justify-center">
                <div class="text-center">
                    <p class="text-white/10 text-[10px] font-black uppercase tracking-[0.4em] mb-4">Engineering team in progress</p>
                    <div class="flex items-center gap-4 justify-center">
                        <div class="animate-bounce p-2"><i class="fas fa-hard-hat text-white/20"></i></div>
                        <div class="animate-bounce delay-100 p-2"><i class="fas fa-tools text-white/20"></i></div>
                        <div class="animate-bounce delay-200 p-2"><i class="fas fa-project-diagram text-white/20"></i></div>
                    </div>
                </div>
            </div>

        </div>
    </div>
`;

