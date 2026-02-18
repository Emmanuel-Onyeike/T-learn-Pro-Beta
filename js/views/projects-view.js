/* ── T LEARN PRO: views/projects-view.js ──
   Adds to the global views object loaded by dashboard.js */

views['Projects'] = `
   <div class="max-w-6xl mx-auto space-y-10 p-4">
    <div class="flex flex-col md:flex-row items-center gap-4 bg-white/5 p-4 rounded-[2.5rem] border border-white/10">
        <div class="relative flex-1 w-full">
            <i class="fas fa-search absolute left-6 top-1/2 -translate-y-1/2 text-white/20"></i>
            <input type="text" placeholder="SEARCH PROJECTS BY NAME..." 
                class="w-full bg-white/5 border border-white/5 rounded-full py-4 pl-14 pr-6 text-white text-[11px] font-black tracking-[0.2em] focus:border-blue-500/30 outline-none transition-all">
        </div>
        <button onclick="openProjectInitiator()" 
            class="w-full md:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-black text-[10px] uppercase tracking-[0.2em] rounded-full transition-all shadow-lg shadow-blue-600/20 whitespace-nowrap">
            <i class="fas fa-plus-circle mr-2"></i> New Project
        </button>
    </div>

    <div id="projectContainerGrid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        </div>
</div>
`;

