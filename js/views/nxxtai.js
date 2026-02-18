/* ── T LEARN PRO: views/nxxtai.js ──
   Adds to the global views object loaded by dashboard.js */

views['Nxxt AI'] = `
  <div class="nxxt-container flex flex-col h-[90vh] max-w-6xl mx-auto relative bg-[#05070a] rounded-[3rem] border border-white/5 shadow-2xl overflow-hidden font-sans text-slate-200">
    
    <nav class="flex justify-between items-center px-10 py-6 bg-white/[0.02] backdrop-blur-2xl border-b border-white/[0.05] z-50">
        <div class="flex items-center gap-8">
            <div class="text-2xl font-black tracking-tighter italic bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">NXXT</div>
            <div class="flex bg-white/[0.03] p-1.5 rounded-2xl border border-white/10 shadow-inner">
                <button onclick="window.nxxtMode = 'standard'" class="px-6 py-2 rounded-xl text-[11px] font-bold uppercase tracking-wider transition-all text-white bg-blue-600 shadow-[0_0_20px_rgba(37,99,235,0.3)]">Standard</button>
                <button onclick="window.nxxtMode = 'fun'" class="px-6 py-2 rounded-xl text-[11px] font-bold uppercase tracking-wider transition-all text-white/40 hover:text-white">Fun Mode</button>
            </div>
        </div>
        
        <div class="flex items-center gap-6">
            <div class="flex flex-col items-end">
                <span class="text-[9px] font-black text-blue-500 uppercase tracking-[0.2em] mb-1">Neural Capacity</span>
                <div id="imageCredits" class="flex gap-1">
                    <div class="w-1.5 h-3.5 bg-blue-500 rounded-full"></div>
                    <div class="w-1.5 h-3.5 bg-blue-500 rounded-full"></div>
                    <div class="w-1.5 h-3.5 bg-blue-500 rounded-full"></div>
                    <div class="w-1.5 h-3.5 bg-white/10 rounded-full"></div>
                    <div class="w-1.5 h-3.5 bg-white/10 rounded-full"></div>
                </div>
            </div>
        </div>
    </nav>

    <div id="aiThread" class="flex-1 overflow-y-auto px-12 py-10 space-y-10 scroll-smooth custom-scrollbar">
        
        <div class="absolute inset-0 flex flex-col items-center justify-center pointer-events-none opacity-[0.03] select-none">
            <h1 class="text-[20rem] font-black tracking-tighter italic">NXXT</h1>
        </div>

        <div class="flex justify-end group">
            <div class="relative max-w-xl">
                <div class="bg-gradient-to-br from-blue-600 to-indigo-700 p-[1px] rounded-[2rem] rounded-tr-sm shadow-xl">
                    <div class="bg-[#0a0f1d] rounded-[2rem] rounded-tr-sm px-8 py-5">
                        <p class="text-[16px] leading-relaxed text-blue-50">Hello Nxxt, initialize system diagnostics.</p>
                    </div>
                </div>
                <span class="block mt-3 text-right text-[10px] font-bold text-white/20 uppercase tracking-widest group-hover:text-blue-400 transition-colors">Master User // 01</span>
            </div>
        </div>

        <div class="flex flex-col gap-6 max-w-3xl">
            <div class="flex items-center gap-4">
                <div class="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/20">
                    <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                </div>
                <span class="text-[11px] font-black text-white/30 uppercase tracking-[0.4em]">Core Neural Process</span>
            </div>
            <div class="pl-14">
                <div class="text-[18px] leading-[1.8] font-light text-slate-300 tracking-wide border-l-2 border-white/5 pl-8">
                    System diagnostics <span class="text-blue-400 font-medium">initialized</span>. All neural pathways are operating at peak efficiency. Latency is sub-10ms. Ready for your next command.
                </div>
            </div>
        </div>
    </div>

    <div class="p-10 bg-gradient-to-t from-[#05070a] via-[#05070a]/90 to-transparent">
        <div class="max-w-4xl mx-auto relative">
            <div class="absolute -inset-2 bg-blue-500/10 blur-2xl rounded-[3rem]"></div>
            <div class="relative bg-[#0f1420] border border-white/10 rounded-[2.5rem] p-2 flex items-end shadow-2xl focus-within:border-blue-500/50 transition-all">
                <textarea id="nxxtInput" rows="1" 
                    placeholder="Describe your next objective..." 
                    class="flex-1 bg-transparent border-none outline-none text-white text-lg px-8 py-5 resize-none placeholder:text-white/10"
                    oninput="this.style.height = 'auto'; this.style.height = this.scrollHeight + 'px'"></textarea>
                
                <div class="flex items-center gap-4 p-2">
                    <div class="hidden md:flex flex-col items-end px-4 border-r border-white/5">
                        <span class="text-[9px] font-bold text-green-500 flex items-center gap-2">
                            <span class="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                            STABLE
                        </span>
                        <span class="text-[8px] text-white/20 font-black tracking-widest">NX-4 TURBO</span>
                    </div>
                    <button onclick="handleNxxtFlow()" class="w-14 h-14 rounded-2xl bg-white hover:bg-blue-500 text-black hover:text-white transition-all duration-300 flex items-center justify-center shadow-lg active:scale-95">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 10l7-7m0 0l7 7m-7-7v18"/></svg>
                    </button>
                </div>
            </div>
        </div>
    </div>

    <div id="nxxtModal" class="hidden fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-xl transition-opacity duration-300">
        <div class="bg-[#0d1117] border border-white/10 p-10 rounded-[3rem] max-w-sm w-full text-center shadow-[0_0_100px_rgba(0,0,0,0.5)] transform scale-100 transition-transform">
            <div class="w-20 h-20 bg-red-500/10 rounded-[2rem] flex items-center justify-center mx-auto mb-6 border border-red-500/20">
                <svg class="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
            </div>
            <h3 class="text-white font-black text-2xl mb-3 tracking-tight">System Interrupt</h3>
            <p class="text-white/50 text-[15px] leading-relaxed mb-8">Nxxt encountered a neural sync error. Command sequence must be re-initialized for safety.</p>
            <button onclick="this.closest('#nxxtModal').classList.add('hidden')" class="w-full py-4 bg-white text-black font-black uppercase text-[11px] tracking-[0.2em] rounded-2xl hover:bg-blue-500 hover:text-white transition-all shadow-lg active:scale-[0.98]">Acknowledge & Reboot</button>
        </div>
    </div>
</div>
`;

