/* ── T LEARN PRO: views/nxxtai.js ── */

views['Nxxt AI'] = `
<div class="nxxt-container flex flex-col h-[90vh] max-w-6xl mx-auto relative bg-[#05070a] rounded-[3rem] border border-white/5 shadow-2xl overflow-hidden font-sans text-slate-200">
    
    <nav class="flex justify-between items-center px-10 py-6 bg-white/[0.02] backdrop-blur-2xl border-b border-white/[0.05] z-50">
        <div class="flex items-center gap-8">
            <div class="text-2xl font-black tracking-tighter italic bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">NXXT AI</div>
            <div class="flex bg-black/40 p-1 rounded-2xl border border-white/5">
                <button id="modeStandard" class="px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all text-white bg-blue-600 shadow-[0_0_20px_rgba(37,99,235,0.2)]">Standard</button>
                <button id="modeFun" class="px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all text-white/30 hover:text-white">Fun Mode</button>
            </div>
        </div>
        
        <div class="flex items-center gap-6">
            <div class="flex flex-col items-end">
                <span class="text-[8px] font-black text-blue-500 uppercase tracking-[0.3em] mb-1">Visual Credits</span>
                <div id="imageCredits" class="flex gap-1.5">
                    <div class="w-1.5 h-4 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
                    <div class="w-1.5 h-4 bg-blue-500 rounded-full"></div>
                    <div class="w-1.5 h-4 bg-blue-500 rounded-full"></div>
                    <div class="w-1.5 h-4 bg-white/10 rounded-full"></div>
                    <div class="w-1.5 h-4 bg-white/10 rounded-full"></div>
                </div>
            </div>
        </div>
    </nav>

    <div id="aiThread" class="flex-1 overflow-y-auto px-12 py-10 space-y-10 scroll-smooth custom-scrollbar relative">
        
        <div id="nxxtWatermark" class="absolute inset-0 flex flex-col items-center justify-center pointer-events-none opacity-[0.02] select-none transition-opacity duration-1000">
            <h1 class="text-[15rem] font-black tracking-tighter italic">NXXT</h1>
        </div>

        <div class="flex flex-col gap-4 max-w-3xl animate-in fade-in slide-in-from-left-4 duration-700">
            <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center">
                    <i class="fas fa-terminal text-blue-400 text-[10px]"></i>
                </div>
                <span class="text-[10px] font-bold text-blue-400 uppercase tracking-[0.3em]">System Uplink Stable</span>
            </div>
            <div class="pl-11">
                <div class="text-lg leading-relaxed font-light text-slate-400 border-l border-white/10 pl-6">
                    Neural Link established. I am ready to assist with your next <span class="text-white font-medium">Core Objective</span>.
                </div>
            </div>
        </div>
    </div>

    <div class="p-8 bg-gradient-to-t from-[#05070a] via-[#05070a] to-transparent">
        <div class="max-w-4xl mx-auto">
            <div class="relative group bg-[#0a0f1a] border border-white/10 rounded-[2rem] p-2 flex items-end transition-all focus-within:border-blue-500/40 focus-within:shadow-[0_0_50px_rgba(59,130,246,0.1)]">
                
                <textarea id="nxxtInput" rows="1" 
                    placeholder="Enter command sequence..." 
                    class="flex-1 bg-transparent border-none outline-none text-white text-[16px] px-6 py-4 resize-none placeholder:text-white/5 min-h-[60px]"
                    oninput="this.style.height = 'auto'; this.style.height = this.scrollHeight + 'px'"></textarea>
                
                <div class="flex items-center gap-3 p-2">
                    <div class="hidden md:flex flex-col items-end px-4 border-r border-white/5">
                        <span class="text-[8px] font-black text-green-500 flex items-center gap-2 tracking-widest">
                            <span class="w-1 h-1 rounded-full bg-green-500 animate-ping"></span>
                            ACTIVE
                        </span>
                        <span class="text-[7px] text-white/20 font-black tracking-[0.2em]">NX-PROTOCOL v4</span>
                    </div>

                    <button id="nxxtSendBtn" class="w-12 h-12 rounded-2xl bg-white text-black hover:bg-blue-600 hover:text-white transition-all duration-300 flex items-center justify-center shadow-xl active:scale-90 group-focus-within:bg-blue-500 group-focus-within:text-white">
                        <i class="fas fa-arrow-up text-sm"></i>
                    </button>
                </div>
            </div>
            <p class="text-center mt-4 text-[9px] font-bold text-white/10 uppercase tracking-[0.5em]">T-Learn Pro // Neural Interface</p>
        </div>
    </div>
</div>
`;
