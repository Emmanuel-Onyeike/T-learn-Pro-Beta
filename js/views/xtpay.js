/* ── T LEARN PRO: views/xtpay.js ──
   Adds to the global views object loaded by dashboard.js */

views['Xt Pay'] = `
<div class="flex flex-col h-[85vh] max-w-6xl mx-auto bg-[#040404] rounded-[3rem] border border-white/[0.08] shadow-2xl overflow-hidden font-sans text-white animate-in fade-in duration-1000">
    
    <div class="flex justify-between items-center px-12 py-8 bg-[#080808] border-b border-white/[0.03]">
        <div class="flex items-center gap-10">
            <div>
                <h1 class="text-2xl font-black tracking-[0.2em] uppercase text-white">XT <span class="text-blue-600">PAY</span></h1>
                <div class="flex items-center gap-2 mt-1">
                    <div class="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></div>
                    <p class="text-[9px] uppercase tracking-[0.3em] text-white/30 font-bold">Encrypted Gateway v0.9b</p>
                </div>
            </div>
        </div>

        <button onclick="NxxtDashboard.showAlert('pay', 'Internal Build', 'The payment gateway is currently in a sandbox state. Engineers are finalizing the 256-bit encryption layer.', 'fa-microchip')" class="group relative px-8 py-3 rounded-full overflow-hidden border border-white/10 transition-all hover:border-blue-500 bg-white/5">
            <span class="relative z-10 text-[10px] font-black uppercase tracking-[0.2em]">Deploy Wallet</span>
        </button>
    </div>

    <div class="flex-1 flex overflow-hidden">
        <div class="flex-1 p-12 overflow-y-auto custom-scrollbar">
            <div class="flex justify-between items-end mb-10">
                <h2 class="text-3xl font-light tracking-tight">Financial <span class="font-bold">Infrastructure</span></h2>
                <span class="text-[10px] font-mono text-white/20">BUILD_ID: 992-XT-PAY</span>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div class="relative overflow-hidden p-8 rounded-[2.5rem] bg-[#0a0a0a] border border-white/5 hover:border-blue-900/50 transition-all">
                    <div class="mb-6">
                        <span class="text-[9px] font-black uppercase tracking-widest px-3 py-1 bg-blue-600/10 text-blue-400 rounded-full border border-blue-500/20">Engineers Cooking</span>
                    </div>
                    <h3 class="text-xl font-bold mb-2 text-white">Smart Gateway</h3>
                    <p class="text-sm text-white/40 mb-8 font-light leading-relaxed">Bridging the gap between legacy banking APIs and XT-Pay nodes.</p>
                    <div class="flex items-center gap-4">
                        <div class="flex-1 h-px bg-white/5"></div>
                        <span class="text-[10px] font-mono text-blue-500">OPTIMIZING...</span>
                    </div>
                </div>

                <div class="relative overflow-hidden p-8 rounded-[2.5rem] bg-[#0a0a0a] border border-white/5 hover:border-blue-900/50 transition-all text-white/30">
                    <div class="mb-6">
                        <span class="text-[9px] font-black uppercase tracking-widest px-3 py-1 bg-white/5 text-white/30 rounded-full border border-white/10">In Queue</span>
                    </div>
                    <h3 class="text-xl font-bold mb-2 italic">Instant Settlement</h3>
                    <p class="text-sm mb-8 font-light leading-relaxed">Sub-second validation logic for cross-border asset transfers.</p>
                </div>
            </div>
        </div>

        <div class="w-80 border-l border-white/5 bg-black/20 p-8">
            <h3 class="text-[10px] uppercase tracking-widest font-black text-white/20 mb-8">Security Ledger</h3>
            <div id="payLogs" class="space-y-6">
                </div>
        </div>
    </div>

    <div id="payModal" class="hidden fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md p-6">
        <div class="bg-[#0c0c0c] border border-blue-600/20 p-12 rounded-[3rem] max-w-sm w-full text-center shadow-[0_0_80px_rgba(37,99,235,0.1)] scale-100 animate-in zoom-in-95 duration-300">
            <div class="w-20 h-20 bg-blue-600/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-blue-600/20">
                <i id="payIcon" class="text-blue-500 text-2xl"></i>
            </div>
            <h3 id="payTitle" class="text-white font-black text-xl mb-4 uppercase tracking-tighter"></h3>
            <p id="payMsg" class="text-white/40 text-sm mb-10 leading-relaxed"></p>
            <button onclick="document.getElementById('payModal').classList.add('hidden')" class="w-full py-5 bg-blue-600 text-white font-black uppercase text-[10px] tracking-[0.3em] rounded-2xl hover:bg-blue-500 transition-all">Acknowledge Signal</button>
        </div>
    </div>
</div>


`;

