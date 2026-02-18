/* ── T LEARN PRO: views/sidehustlehub.js ──
   Adds to the global views object loaded by dashboard.js */

views['Side Hustle Hub'] = `
<div class="flex flex-col h-[85vh] max-w-6xl mx-auto bg-[#050505] rounded-[2.5rem] border border-emerald-500/10 shadow-2xl overflow-hidden font-sans text-white animate-in fade-in duration-700">
    
    <div class="flex justify-between items-center px-10 py-6 bg-emerald-950/10 backdrop-blur-xl border-b border-white/[0.05]">
        <div class="flex items-center gap-8">
            <div>
                <h1 class="text-xl font-black tracking-tighter uppercase">SideHustle <span class="text-emerald-500">Hub</span></h1>
                <p class="text-[9px] uppercase tracking-[0.3em] text-emerald-500/50 font-bold">Scaling Ventures v1.2</p>
            </div>
            
            <div class="hidden md:flex gap-6 border-l border-white/10 pl-8">
                <div class="flex flex-col">
                    <span class="text-[8px] uppercase text-white/30 font-bold">Daily Rev</span>
                    <span class="text-sm font-mono text-emerald-400">+$1,240.50</span>
                </div>
                <div class="flex flex-col">
                    <span class="text-[8px] uppercase text-white/30 font-bold">Active Funnels</span>
                    <span class="text-sm font-mono text-white">08</span>
                </div>
            </div>
        </div>

        <div class="flex items-center gap-4">
            <div class="flex -space-x-2">
                <div class="w-8 h-8 rounded-full border-2 border-[#050505] bg-emerald-600 flex items-center justify-center text-[10px] font-bold">JD</div>
                <div class="w-8 h-8 rounded-full border-2 border-[#050505] bg-blue-600 flex items-center justify-center text-[10px] font-bold">AS</div>
            </div>
            <button onclick="showHustleModal('New Venture', 'Engineers are preparing the launch sequence for Project Z. Initialization lock active.', 'fa-rocket')" class="bg-emerald-600 hover:bg-emerald-500 text-black px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                Launch New
            </button>
        </div>
    </div>

    <div class="flex-1 flex overflow-hidden">
        
        <div class="w-72 border-r border-white/5 bg-black/40 p-6 flex flex-col">
            <h3 class="text-[10px] uppercase tracking-widest font-black text-white/20 mb-6">Market Trends</h3>
            <div class="space-y-4">
                <div class="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                    <div class="flex justify-between items-start mb-1">
                        <span class="text-[10px] font-bold text-emerald-400 uppercase">SaaS Bio</span>
                        <span class="text-[9px] text-white/20">HOT</span>
                    </div>
                    <div class="text-xs text-white/60">Micro-SaaS for LinkedIn automation trending.</div>
                </div>
                <div class="p-4 rounded-2xl bg-white/[0.02] border border-white/5 opacity-50">
                    <div class="flex justify-between items-start mb-1">
                        <span class="text-[10px] font-bold text-blue-400 uppercase">AI Voice</span>
                        <span class="text-[9px] text-white/20">STABLE</span>
                    </div>
                    <div class="text-xs text-white/60">Voice-clone customer support modules.</div>
                </div>
            </div>

            <div class="mt-auto p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/10">
                <p class="text-[9px] uppercase font-bold text-emerald-500 mb-1">Eng Capacity</p>
                <div class="flex items-end justify-between">
                    <span class="text-xl font-mono font-bold">82%</span>
                    <span class="text-[9px] text-white/40 mb-1">Cooking...</span>
                </div>
            </div>
        </div>

        <div class="flex-1 p-10 overflow-y-auto custom-scrollbar bg-[radial-gradient(circle_at_bottom_right,_var(--tw-gradient-stops))] from-emerald-900/10 via-transparent to-transparent">
            <h2 class="text-3xl font-light mb-8">Current <span class="font-bold">Ventures</span></h2>
            
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div class="p-8 rounded-[2rem] bg-white/[0.03] border border-white/10 hover:border-emerald-500/40 transition-all group">
                    <div class="flex justify-between mb-6">
                        <div class="w-12 h-12 rounded-2xl bg-emerald-500/20 flex items-center justify-center border border-emerald-500/20 text-emerald-400">
                            <i class="fas fa-shopping-cart text-sm"></i>
                        </div>
                        <div class="text-right font-mono">
                            <div class="text-[10px] text-white/20 uppercase">Revenue</div>
                            <div class="text-emerald-400 font-bold">$4.2k</div>
                        </div>
                    </div>
                    <h4 class="text-lg font-bold mb-1">E-Com Automator</h4>
                    <p class="text-sm text-white/40 mb-6 leading-relaxed">Engineers are optimizing the supply chain webhook listeners.</p>
                    <div class="flex gap-2">
                        <span class="px-3 py-1 rounded-lg bg-white/5 text-[9px] font-bold text-white/40 uppercase">Dropshipping</span>
                        <span class="px-3 py-1 rounded-lg bg-emerald-500/10 text-[9px] font-bold text-emerald-400 uppercase">Scalable</span>
                    </div>
                </div>

                <div class="p-8 rounded-[2rem] bg-white/[0.03] border border-white/10 hover:border-blue-500/40 transition-all group">
                    <div class="flex justify-between mb-6">
                        <div class="w-12 h-12 rounded-2xl bg-blue-500/20 flex items-center justify-center border border-blue-500/20 text-blue-400">
                            <i class="fas fa-code text-sm"></i>
                        </div>
                        <div class="text-right font-mono">
                            <div class="text-[10px] text-white/20 uppercase">Revenue</div>
                            <div class="text-blue-400 font-bold">$1.8k</div>
                        </div>
                    </div>
                    <h4 class="text-lg font-bold mb-1">SaaS Template Pro</h4>
                    <p class="text-sm text-white/40 mb-6 leading-relaxed">Finalizing the Stripe integration for one-click checkout.</p>
                    <div class="flex gap-2">
                        <span class="px-3 py-1 rounded-lg bg-white/5 text-[9px] font-bold text-white/40 uppercase">Software</span>
                        <span class="px-3 py-1 rounded-lg bg-blue-500/10 text-[9px] font-bold text-blue-400 uppercase">Beta</span>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div id="hustleModal" class="hidden fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 animate-in fade-in duration-200">
        <div class="bg-[#0a0f0d] border border-emerald-500/20 p-10 rounded-[2.5rem] max-w-sm w-full text-center shadow-2xl">
            <div class="w-20 h-20 bg-emerald-500/10 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-emerald-500/20">
                <i id="hustleIcon" class="fas fa-rocket text-emerald-500 text-2xl"></i>
            </div>
            <h3 id="hustleTitle" class="text-white font-black text-xl mb-3 uppercase tracking-tight">Venture Locked</h3>
            <p id="hustleMsg" class="text-white/50 text-sm mb-8 leading-relaxed">Our engineers are currently cooking this feature. It is not ready for public deployment.</p>
            <button onclick="document.getElementById('hustleModal').classList.add('hidden')" class="w-full py-4 bg-emerald-600 text-black font-black uppercase text-[10px] tracking-[0.2em] rounded-2xl hover:bg-white transition-all">Acknowledge</button>
        </div>
    </div>
</div>
`;

