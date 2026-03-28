/* ── T LEARN PRO: views/lessons.js ── */
views['Lessons'] = `
<div class="min-h-screen bg-[#050b1d] animate-in fade-in duration-500">

    <!-- ── Header bar ── -->
    <div class="sticky top-0 z-40 bg-[#050b1d]/90 backdrop-blur-xl border-b border-white/5 px-4 sm:px-8 py-4">
        <div class="max-w-5xl mx-auto flex items-center justify-between gap-4">
            <div class="flex items-center gap-3">
                <div class="flex flex-col">
                    <span class="text-[9px] font-black text-white/20 uppercase tracking-[0.3em]">Current Level</span>
                    <span id="lessons-level-val" class="text-lg font-black text-white leading-none">—</span>
                </div>
                <div class="w-px h-8 bg-white/10"></div>
                <div class="flex flex-col">
                    <span class="text-[9px] font-black text-white/20 uppercase tracking-[0.3em]">Semester</span>
                    <span id="lessons-semester-val" class="text-lg font-black text-white leading-none">—</span>
                </div>
            </div>

            <!-- Tab pills -->
            <div class="flex gap-1 bg-white/5 p-1 rounded-2xl border border-white/5">
                ${['Courses','Exam','Results','Analytics'].map((tab, i) => `
                    <button id="btn-${tab}" onclick="switchLessonSubTab('${tab}')"
                        class="lesson-nav-btn px-3 sm:px-5 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all duration-200
                        ${i === 0 ? 'bg-blue-600 text-white shadow-lg' : 'text-white/30 hover:text-white'}">
                        ${tab}
                    </button>`).join('')}
            </div>
        </div>
    </div>

    <!-- ── Content ── -->
    <div id="lesson-sub-content" class="max-w-5xl mx-auto px-4 sm:px-8 py-8"></div>
</div>

<!-- ── Topic Reader Modal ── -->
<div id="global-modal" class="hidden fixed inset-0 z-[500] bg-[#020917]/98 backdrop-blur-2xl overflow-y-auto">
    <div class="min-h-screen flex flex-col">
        <!-- Modal top bar -->
        <div class="sticky top-0 z-10 bg-[#020917]/90 backdrop-blur-xl border-b border-white/5 px-4 sm:px-8 py-4 flex items-center justify-between">
            <div class="flex items-center gap-3">
                <button onclick="closeLMSModal()" class="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 text-white/40 hover:text-white flex items-center justify-center transition-all">
                    <i class="fas fa-arrow-left text-sm"></i>
                </button>
                <div>
                    <p id="modal-course-name" class="text-[9px] font-black text-blue-400/60 uppercase tracking-[0.3em]">Course</p>
                    <h2 id="modal-title" class="text-white font-black text-sm uppercase tracking-wide">Topics</h2>
                </div>
            </div>
            <div id="modal-progress-bar-wrap" class="hidden sm:flex items-center gap-3">
                <div class="w-32 h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div id="modal-progress-bar" class="h-full bg-blue-500 rounded-full transition-all duration-500" style="width:0%"></div>
                </div>
                <span id="modal-progress-text" class="text-[9px] font-black text-white/30">0/0</span>
            </div>
            <button onclick="closeLMSModal()" class="w-9 h-9 rounded-xl bg-white/5 hover:bg-red-500/20 text-white/40 hover:text-red-400 flex items-center justify-center transition-all">
                <i class="fas fa-times text-sm"></i>
            </button>
        </div>

        <!-- Two column layout: sidebar + content -->
        <div class="flex flex-1 overflow-hidden">
            <!-- Topic list sidebar -->
            <div id="topics-sidebar" class="hidden lg:flex flex-col w-64 border-r border-white/5 bg-[#020917] overflow-y-auto shrink-0"></div>

            <!-- Topic content -->
            <div id="modal-body" class="flex-1 overflow-y-auto p-4 sm:p-8 max-w-3xl mx-auto w-full"></div>
        </div>
    </div>
</div>
`;
