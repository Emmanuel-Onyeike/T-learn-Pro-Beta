/* ── T LEARN PRO: views/leaderboard.js ── */
views['Leaderboard'] = `
<div class="max-w-3xl mx-auto p-4 sm:p-6 space-y-8 animate-in fade-in duration-700">

    <div class="text-center space-y-2">
        <h2 class="text-white font-black text-4xl uppercase tracking-tighter">Global Rankings</h2>
        <p class="text-blue-500/60 text-[10px] font-black uppercase tracking-[0.4em]">Live · Updates in real time</p>
    </div>

    <div id="lb-loading" class="flex items-center justify-center py-16">
        <div class="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>

    <!-- Top 3 Podium -->
    <div id="lb-podium" class="hidden"></div>

    <!-- Divider -->
    <div id="lb-divider" class="hidden flex items-center gap-4">
        <div class="flex-1 h-px bg-white/5"></div>
        <span class="text-white/20 text-[9px] font-black uppercase tracking-widest">Full Rankings</span>
        <div class="flex-1 h-px bg-white/5"></div>
    </div>

    <!-- Ranks 4-20 -->
    <div id="lb-list" class="hidden space-y-2"></div>

    <!-- Current user card (always shown if not in top 20) -->
    <div id="lb-you" class="hidden"></div>

</div>
`;
