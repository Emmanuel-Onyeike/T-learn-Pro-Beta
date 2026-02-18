/* ── T LEARN PRO: views/nxxtlab.js ──
   Adds to the global views object loaded by dashboard.js */

views['Nxxt Lab'] = `
<div class="flex flex-col h-[85vh] max-w-6xl mx-auto bg-[#030508] rounded-[2.5rem] border border-white/5 shadow-2xl overflow-hidden font-sans text-white animate-in fade-in duration-700">
    
    <div class="flex justify-between items-center px-10 py-8 bg-black/40 backdrop-blur-xl border-b border-white/[0.03]">
        <div class="flex items-center gap-10">
            <div>
                <h1 class="text-xl font-black tracking-tighter uppercase italic">Nxxt <span class="text-blue-500 not-italic">Lab</span></h1>
                <div class="flex items-center gap-2 mt-1">
                    <span class="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse"></span>
                    <p class="text-[9px] uppercase tracking-[0.2em] text-white/40 font-bold">Build Phase: Active</p>
                </div>
            </div>
            
            <div class="h-8 w-px bg-white/5"></div>

            <div class="flex gap-6">
                <div class="flex flex-col">
                    <span class="text-[8px] uppercase tracking-widest text-white/20 font-black">Environment</span>
                    <span class="text-[11px] font-mono text-blue-400">Production-B</span>
                </div>
                <div class="flex flex-col">
                    <span class="text-[8px] uppercase tracking-widest text-white/20 font-black">Lead Engineer</span>
                    <span class="text-[11px] font-mono text-white/60">@User_Admin</span>
                </div>
            </div>
        </div>

        <div class="flex items-center gap-4">
            <button onclick="showLabModal('Commit Required', 'You are attempting to push code to a protected branch. Please verify credentials.', 'fa-code-branch')" class="px-5 py-2 rounded-xl bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-widest hover:bg-white/10 transition-all">
                Push Update
            </button>
        </div>
    </div>

    <div class="flex-1 flex overflow-hidden">
        
        <div class="w-80 border-r border-white/5 bg-black/20 flex flex-col">
            <div class="p-6 border-b border-white/5">
                <h3 class="text-[10px] uppercase tracking-[0.2em] font-black text-white/20">Live Build Stream</h3>
            </div>
            <div id="buildLogs" class="flex-1 p-6 font-mono text-[10px] space-y-3 overflow-y-auto custom-scrollbar opacity-60">
                <div class="text-blue-400">>> Initializing Nxxt Core...</div>
                <div class="text-white/30">>> Loading dependency graph...</div>
                <div class="text-green-500">>> Logic engine: Optimized</div>
                <div class="text-white/30">>> Syncing assets with Lab CDN...</div>
                <div class="text-orange-400">>> Warning: Latency spike in Node-7</div>
                <div class="text-blue-400">>> Compiling prototype modules...</div>
            </div>
        </div>

        <div class="flex-1 p-10 overflow-y-auto custom-scrollbar">
            <div class="grid grid-cols-2 gap-6">
                
                <div class="p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-blue-500/30 transition-all group">
                    <div class="flex justify-between items-start mb-6">
                        <div class="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                            <i class="fas fa-layer-group text-blue-500 text-sm"></i>
                        </div>
                        <span class="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-[9px] font-black uppercase">In Progress</span>
                    </div>
                    <h4 class="text-lg font-bold mb-2">Interface Alpha</h4>
                    <p class="text-sm text-white/40 mb-6 font-light">Engineers are currently refining the gesture-based UI components.</p>
                    <div class="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                        <div class="w-[65%] h-full bg-blue-500 shadow-[0_0_8px_#3b82f6]"></div>
                    </div>
                </div>

                <div class="p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-purple-500/30 transition-all group">
                    <div class="flex justify-between items-start mb-6">
                        <div class="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20">
                            <i class="fas fa-microchip text-purple-500 text-sm"></i>
                        </div>
                        <span class="px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-[9px] font-black uppercase">Testing</span>
                    </div>
                    <h4 class="text-lg font-bold mb-2">Logic Pipeline</h4>
                    <p class="text-sm text-white/40 mb-6 font-light">Optimizing data routing between the lab core and external nodes.</p>
                    <div class="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                        <div class="w-[88%] h-full bg-purple-500 shadow-[0_0_8px_#a855f7]"></div>
                    </div>
                </div>

                <div onclick="showLabModal('Access Denied', 'New project initialization is locked to Admin level engineers.', 'fa-lock')" class="p-8 rounded-3xl border border-dashed border-white/10 hover:bg-white/[0.02] cursor-pointer transition-all flex flex-col items-center justify-center text-center">
                    <div class="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center mb-4">
                        <i class="fas fa-plus text-white/20 text-xs"></i>
                    </div>
                    <span class="text-xs font-bold text-white/20 uppercase tracking-widest">New Lab Experiment</span>
                </div>

            </div>
        </div>
    </div>

    <div id="labModal" class="hidden fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md animate-in fade-in duration-300">
        <div class="bg-[#0d1117] border border-white/10 p-10 rounded-[2.5rem] max-w-sm w-full text-center shadow-2xl scale-95 animate-in zoom-in-95 duration-300">
            <div class="w-20 h-20 bg-blue-500/10 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-blue-500/20">
                <i id="labModalIcon" class="fas fa-exclamation-triangle text-blue-500 text-2xl"></i>
            </div>
            <h3 id="labModalTitle" class="text-white font-bold text-xl mb-3 uppercase tracking-tight">Access Restricted</h3>
            <p id="labModalMsg" class="text-white/50 text-sm mb-8 leading-relaxed">Engineers are currently working on this module. Check back later.</p>
            <button onclick="document.getElementById('labModal').classList.add('hidden')" class="w-full py-4 bg-white text-black font-black uppercase text-[10px] tracking-[0.2em] rounded-2xl hover:bg-blue-600 hover:text-white transition-all">Acknowledge</button>
        </div>
    </div>
</div>
`;

