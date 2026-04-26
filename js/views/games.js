views['Games'] = `
<div class="h-[92vh] w-full bg-[#020408] flex flex-col overflow-hidden animate-in fade-in duration-500">
    <header class="p-6 border-b border-white/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-[#050b1d]/50 backdrop-blur-md">
        <div>
            <div class="flex items-center gap-3">
                <h2 class="text-xl font-black italic text-white uppercase tracking-tighter">Neural <span class="text-blue-500">Arcade</span></h2>
                <span class="px-2 py-0.5 rounded border border-blue-500/30 text-[7px] font-black text-blue-400 uppercase tracking-widest">v1.5.0</span>
            </div>
            <p id="currentLevelDisplay" class="text-[8px] font-black text-blue-500 tracking-[0.3em] uppercase mt-1">L-01 // NODE_ACTIVE</p>
        </div>

        <div class="flex items-center gap-2 p-1 bg-white/[0.02] border border-white/5 rounded-2xl">
            <button onclick="switchGameMode('lexical')" class="px-4 py-2 bg-blue-600 rounded-xl text-[8px] font-black text-white uppercase tracking-widest transition-all shadow-lg shadow-blue-600/20">
                Lexical
            </button>
            <button onclick="switchGameMode('repo_hunt')" class="px-4 py-2 hover:bg-white/5 rounded-xl text-[8px] font-black text-white/40 uppercase tracking-widest transition-all hover:text-white">
                Repo-Hunt
            </button>
            <button onclick="switchGameMode('sandbox')" class="px-4 py-2 hover:bg-white/5 rounded-xl text-[8px] font-black text-white/40 uppercase tracking-widest transition-all hover:text-white">
                Sandbox
            </button>
        </div>

        <div class="flex items-center gap-6">
            <div class="flex flex-col items-end">
                <span class="text-[7px] font-black text-white/20 uppercase tracking-[0.2em]">Neural Credits</span>
                <span id="gamesCount" class="text-xs font-black text-white italic tracking-tighter">0000</span>
            </div>
            <div class="h-10 w-10 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                <div class="h-2 w-2 rounded-full bg-blue-500 animate-pulse"></div>
            </div>
        </div>
    </header>

    <main class="flex-1 flex flex-col items-center justify-center p-6 space-y-8 overflow-y-auto">
        
        <div id="targetWords" class="flex flex-wrap justify-center gap-2 max-w-md animate-in slide-in-from-top-4 duration-700">
            </div>

        <div class="relative group">
            <div class="absolute -top-4 -left-4 w-8 h-8 border-t-2 border-l-2 border-blue-500/30 rounded-tl-xl"></div>
            <div class="absolute -bottom-4 -right-4 w-8 h-8 border-b-2 border-r-2 border-blue-500/30 rounded-br-xl"></div>
            
            <div id="gameViewport" class="p-4 bg-[#050b1d]/40 border border-white/5 rounded-[2.5rem] shadow-[0_0_50px_rgba(0,0,0,0.5)] backdrop-blur-xl">
                <div id="lexicalGrid" class="grid gap-1.5 p-2">
                    </div>
            </div>
        </div>

        <div class="flex flex-col items-center gap-4">
            <div class="flex items-center gap-3 px-4 py-2 bg-white/[0.02] border border-white/5 rounded-full">
                <i class="fas fa-terminal text-[8px] text-blue-500"></i>
                <p id="systemMessage" class="text-[9px] font-bold text-white/40 uppercase tracking-[0.2em]">Select letters to decrypt technical terms</p>
            </div>
            
            <div class="w-48 h-1 bg-white/5 rounded-full overflow-hidden">
                <div id="gameProgress" class="h-full bg-blue-600 w-0 transition-all duration-500 shadow-[0_0_10px_#2563eb]"></div>
            </div>
        </div>
    </main>

    <div id="gameOverlay" class="hidden fixed inset-0 z-[200] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4">
        </div>
</div>
`;
