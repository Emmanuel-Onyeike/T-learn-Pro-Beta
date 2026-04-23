/* ── T LEARN PRO: views/lessons.js (Mobile-Optimized) ── */
views['Lessons'] = `
<div class="min-h-screen bg-[#050b1d] animate-in fade-in duration-500 overflow-x-hidden">

    <div class="sticky top-0 z-40 bg-[#050b1d]/90 backdrop-blur-xl border-b border-white/5 px-4 py-4">
        <div class="max-w-5xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            
            <div class="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-start">
                <div class="flex items-center gap-3">
                    <div class="flex flex-col">
                        <span class="text-[8px] font-black text-white/20 uppercase tracking-[0.3em]">Level</span>
                        <span id="lessons-level-val" class="text-base sm:text-lg font-black text-white leading-none">—</span>
                    </div>
                    <div class="w-px h-6 bg-white/10"></div>
                    <div class="flex flex-col">
                        <span class="text-[8px] font-black text-white/20 uppercase tracking-[0.3em]">Semester</span>
                        <span id="lessons-semester-val" class="text-base sm:text-lg font-black text-white leading-none">—</span>
                    </div>
                </div>
                <div class="sm:hidden h-2 w-2 rounded-full bg-blue-500 animate-pulse"></div>
            </div>

            <div class="w-full sm:w-auto overflow-x-auto no-scrollbar pb-1 sm:pb-0">
            <div class="flex gap-1 bg-white/5 p-1 rounded-xl border border-white/5 min-w-max">
    ${['Courses', 'Videos', 'Exam', 'Results', 'Analytics'].map((tab, i) => `
        <button id="btn-${tab}" onclick="switchLessonSubTab('${tab}')"
            class="lesson-nav-btn px-4 py-2.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all duration-200
            ${i === 0 ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-white/30 hover:text-white'}">
            ${tab}
        </button>`).join('')}
</div>
            </div>
        </div>
    </div>

    <div id="lesson-sub-content" class="max-w-5xl mx-auto px-4 sm:px-8 py-6 sm:py-8"></div>
</div>

<div id="global-modal" class="hidden fixed inset-0 z-[500] bg-[#020917]/98 backdrop-blur-2xl overflow-hidden">
    <div class="h-full flex flex-col">
        
        <div class="bg-[#020917]/90 backdrop-blur-xl border-b border-white/5 px-4 py-4 flex items-center justify-between">
            <div class="flex items-center gap-3 overflow-hidden">
                <button onclick="closeLMSModal()" class="shrink-0 w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 text-white/40 flex items-center justify-center transition-all">
                    <i class="fas fa-arrow-left text-sm"></i>
                </button>
                <div class="truncate">
                    <p id="modal-course-name" class="text-[8px] font-black text-blue-400/60 uppercase tracking-[0.2em] truncate">Course</p>
                    <h2 id="modal-title" class="text-white font-black text-xs uppercase tracking-tight truncate">Topics</h2>
                </div>
            </div>
            
            <div class="flex items-center gap-2">
                <div id="modal-progress-bar-wrap" class="hidden md:flex items-center gap-3">
                    <div class="w-24 h-1 bg-white/10 rounded-full overflow-hidden">
                        <div id="modal-progress-bar" class="h-full bg-blue-500 transition-all duration-500" style="width:0%"></div>
                    </div>
                    <span id="modal-progress-text" class="text-[9px] font-black text-white/30">0/0</span>
                </div>
                <button onclick="closeLMSModal()" class="w-10 h-10 rounded-xl bg-white/5 hover:bg-red-500/20 text-white/40 hover:text-red-400 flex items-center justify-center transition-all">
                    <i class="fas fa-times text-sm"></i>
                </button>
            </div>
        </div>

        <div class="flex flex-1 overflow-hidden">
            <div id="topics-sidebar" class="hidden lg:flex flex-col w-72 border-r border-white/5 bg-[#020917] overflow-y-auto shrink-0 shadow-2xl"></div>

            <div id="modal-body" class="flex-1 overflow-y-auto p-5 sm:p-10 max-w-4xl mx-auto w-full scroll-smooth">
                </div>
        </div>
    </div>
</div>
`;
