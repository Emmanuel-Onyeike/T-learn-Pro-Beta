views['Classes'] = `
<div class="h-[92vh] w-full bg-[#020408] flex flex-col overflow-hidden animate-in fade-in duration-500">
    <header class="p-6 border-b border-white/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-[#050b1d]/50 backdrop-blur-md">
        <div class="flex flex-col gap-1">
            <div class="flex items-center gap-3">
                <h2 class="text-xl font-black italic text-white uppercase tracking-tighter">Elite <span class="text-blue-500">Academy</span></h2>
                <span id="trialBadge" class="px-2 py-0.5 rounded border border-blue-500/30 text-[7px] font-black text-blue-400 uppercase tracking-widest animate-pulse">Initializing Trial</span>
            </div>
            <div class="flex items-center gap-3 mt-1">
                <p id="trialCountdown" class="text-[8px] font-black text-blue-500 tracking-[0.3em] uppercase">Calculating Personal Grace Period...</p>
                <div class="h-1 w-24 bg-white/5 rounded-full overflow-hidden hidden md:block">
                    <div id="trialProgressBar" class="h-full bg-blue-600 transition-all duration-1000 w-0"></div>
                </div>
            </div>
        </div>

        <div id="providerSelector" class="flex items-center gap-2 p-1 bg-white/[0.02] border border-white/5 rounded-2xl overflow-x-auto max-w-full">
            <button onclick="filterClasses('all')" class="class-filter-btn px-4 py-2 bg-blue-600 rounded-xl text-[7px] font-black text-white uppercase tracking-widest transition-all">All Tracks</button>
            <button onclick="filterClasses('Udemy')" class="class-filter-btn px-4 py-2 hover:bg-white/5 rounded-xl text-[7px] font-black text-white/40 uppercase tracking-widest transition-all hover:text-white">Udemy</button>
            <button onclick="filterClasses('T-Learn Pro')" class="class-filter-btn px-4 py-2 hover:bg-white/5 rounded-xl text-[7px] font-black text-white/40 uppercase tracking-widest transition-all hover:text-white">T-Learn</button>
            <button onclick="filterClasses('FreeCodeCamp')" class="class-filter-btn px-4 py-2 hover:bg-white/5 rounded-xl text-[7px] font-black text-white/40 uppercase tracking-widest transition-all hover:text-white">CodeCamp</button>
            <button onclick="filterClasses('Coursera')" class="class-filter-btn px-4 py-2 hover:bg-white/5 rounded-xl text-[7px] font-black text-white/40 uppercase tracking-widest transition-all hover:text-white">Coursera</button>
        </div>

        <div class="flex items-center gap-6">
            <div class="flex flex-col items-end">
                <span class="text-[7px] font-black text-white/20 uppercase tracking-[0.2em]">Neural Credits</span>
                <span id="academyCredits" class="text-xs font-black text-white italic tracking-tighter">0000</span>
            </div>
            <div class="h-10 w-10 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                <i class="fas fa-graduation-cap text-blue-500"></i>
            </div>
        </div>
    </header>

    <main class="flex-1 p-6 overflow-y-auto">
        <div id="courseGrid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in slide-in-from-bottom-4 duration-700">
            <div class="col-span-full flex flex-col items-center justify-center py-20">
                <div class="h-12 w-12 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin mb-4"></div>
                <p class="text-[10px] font-black text-white/20 uppercase tracking-widest italic">Authenticating Access Level...</p>
            </div>
        </div>
    </main>

    <footer class="p-4 bg-[#050b1d]/80 border-t border-white/5 backdrop-blur-xl flex justify-between items-center">
        <div class="flex items-center gap-3 px-6 py-2 bg-white/[0.02] border border-white/5 rounded-full">
            <i class="fas fa-shield-alt text-[9px] text-blue-500"></i>
            <p id="academySystemMsg" class="text-[8px] font-bold text-white/40 uppercase tracking-[0.2em]">3-Week Trial Protocol: Access Granted to all Hubs.</p>
        </div>
        <div class="hidden md:flex items-center gap-2">
            <span class="h-1.5 w-1.5 rounded-full bg-green-500"></span>
            <span class="text-[7px] font-black text-white/30 uppercase tracking-widest">Network Secure</span>
        </div>
    </footer>
</div>
`;
