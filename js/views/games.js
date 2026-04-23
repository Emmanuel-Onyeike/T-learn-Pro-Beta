views['Games'] = `
<div class="h-[92vh] w-full bg-[#020408] flex flex-col overflow-hidden">
    <header class="p-6 border-b border-white/5 flex justify-between items-center">
        <div>
            <h2 class="text-xl font-black italic text-white uppercase">Lexical <span class="text-blue-500">Breach</span></h2>
            <p id="currentLevelDisplay" class="text-[8px] font-black text-blue-500 tracking-[0.3em] uppercase">L-01</p>
        </div>
        <div class="flex gap-2">
            <div class="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
            <span class="text-[8px] font-black uppercase text-white/40">Syncing...</span>
        </div>
    </header>

    <main class="flex-1 flex flex-col items-center justify-center p-6 space-y-8">
        <div id="targetWords" class="flex flex-wrap justify-center gap-2 max-w-md">
            </div>

        <div class="p-4 bg-black/40 border border-white/10 rounded-[2rem] shadow-2xl">
            <div id="lexicalGrid" class="grid gap-1">
                </div>
        </div>

        <p class="text-[9px] font-bold text-white/20 uppercase tracking-widest">Select letters to decrypt technical terms</p>
    </main>
</div>
`;
