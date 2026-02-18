/* ── T LEARN PRO: views/collaboration.js ──
   Adds to the global views object loaded by dashboard.js */

views['Collaboration'] = `
    <div class="max-w-5xl mx-auto p-6 space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
        
        <div class="space-y-6 text-center py-10">
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 mb-4">
                <span class="relative flex h-2 w-2">
                    <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                    <span class="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                <span class="text-[8px] font-black text-blue-400 uppercase tracking-widest">Network Discovery Active</span>
            </div>
            
            <h2 class="text-white font-black text-5xl uppercase tracking-tighter">Find Collaborators</h2>
            
            <div class="relative max-w-3xl mx-auto group">
                <div class="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-[2.5rem] blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
                <div class="relative flex items-center bg-[#0a0f25] border border-white/10 rounded-[2.5rem] p-2 pr-6">
                    <div class="w-14 h-14 flex items-center justify-center">
                        <i class="fas fa-search text-white/20"></i>
                    </div>
                    <input type="text" placeholder="Search by name, skill, or project ID..." class="flex-1 bg-transparent border-none outline-none text-white font-medium placeholder:text-white/10 text-lg">
                    <kbd class="hidden md:block px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-white/20 text-[10px] font-black uppercase tracking-tighter">Shift + K</kbd>
                </div>
            </div>
        </div>

        <div class="relative overflow-hidden bg-white/[0.02] border border-dashed border-white/10 rounded-[4rem] p-20 flex flex-col items-center justify-center text-center">
            <div class="absolute inset-0 opacity-[0.03] pointer-events-none" style="background-image: radial-gradient(circle at 2px 2px, white 1px, transparent 0); background-size: 40px 40px;"></div>
            
            <div class="relative">
                <div class="flex gap-4 mb-8">
                    <div class="w-16 h-16 rounded-[2rem] bg-white/5 flex items-center justify-center animate-pulse">
                        <i class="fas fa-hammer text-white/20 text-2xl"></i>
                    </div>
                    <div class="w-16 h-16 rounded-[2rem] bg-blue-500/10 flex items-center justify-center animate-bounce duration-1000">
                        <i class="fas fa-microchip text-blue-500 text-2xl shadow-blue-500/50"></i>
                    </div>
                    <div class="w-16 h-16 rounded-[2rem] bg-white/5 flex items-center justify-center animate-pulse delay-75">
                        <i class="fas fa-cog fa-spin text-white/20 text-2xl"></i>
                    </div>
                </div>
            </div>

            <h3 class="text-white font-black text-xl uppercase tracking-widest mb-3">Engineers are building</h3>
            <p class="max-w-md text-white/30 text-[11px] leading-relaxed font-bold uppercase tracking-widest">
                Our team is currently establishing the peer-to-peer neural link protocols. 
                <span class="text-blue-500/50">Stay still for updates.</span> The collaboration matrix will initialize shortly.
            </p>

            <div class="mt-10 w-64 h-1 bg-white/5 rounded-full overflow-hidden">
                <div class="h-full bg-blue-600 w-1/3 animate-[progress_3s_infinite_linear]"></div>
            </div>
        </div>
    </div>
`;

