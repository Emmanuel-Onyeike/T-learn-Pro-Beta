/* ── T LEARN PRO: views/leaderboard.js — Live Leaderboard ── */
views['Leaderboard'] = `
<div class="max-w-4xl mx-auto p-6 space-y-10 animate-in fade-in duration-700">
    <div class="text-center space-y-2 mb-8">
        <h2 class="text-white font-black text-4xl uppercase tracking-tighter">Global Rankings</h2>
        <p class="text-blue-500/60 text-[10px] font-black uppercase tracking-[0.4em]">Top Tier Contributors</p>
    </div>
    <div id="leaderboard-top5" class="grid grid-cols-2 sm:grid-cols-5 gap-4"></div>
    <div id="leaderboard-rest" class="space-y-3 pt-4"></div>
    <div id="leaderboard-loading" class="flex items-center justify-center py-16">
        <div class="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
</div>
`;
