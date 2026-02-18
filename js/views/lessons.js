/* ── T LEARN PRO: views/lessons.js ──
   Adds to the global views object loaded by dashboard.js */

views['Lessons'] = `
<div class="space-y-8 animate-in fade-in duration-700 bg-[#050b1d] p-4 sm:p-8 min-h-screen text-sans">
    
    <div class="flex justify-center sticky top-0 z-50 py-4 backdrop-blur-md">
        <div class="bg-white/5 border border-white/10 p-1.5 rounded-2xl flex gap-1 overflow-x-auto no-scrollbar shadow-2xl backdrop-blur-xl">
            ${['Courses', 'Exam', 'Result', 'Analytics'].map(tab => `
                <button id="btn-${tab}" onclick="switchLessonSubTab('${tab}')" 
                    class="lesson-nav-btn px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300
                    ${tab === 'Courses' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/40' : 'text-gray-400 hover:text-white hover:bg-white/5'}">
                    ${tab}
                </button>
            `).join('')}
        </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="bg-gradient-to-br from-[#0a1128] to-[#050b1d] border border-white/5 p-8 rounded-[2.5rem] relative overflow-hidden group hover:border-green-500/50 transition-all duration-500 shadow-2xl">
            <div class="flex items-center gap-6 relative z-10">
                <div class="w-16 h-16 bg-green-500/10 rounded-3xl flex items-center justify-center border border-green-500/20 group-hover:scale-110 transition-transform">
                    <i class="fas fa-layer-group text-2xl text-green-500"></i>
                </div>
                <div>
                    <p class="text-[10px] font-black text-green-500/60 uppercase tracking-[0.2em]">Current Level</p>
                    <h3 class="text-4xl font-black text-white mt-1 tabular-nums">000</h3>
                </div>
            </div>
            <i class="fas fa-chart-line absolute -bottom-6 -right-6 text-white/[0.03] text-9xl rotate-12 transition-all duration-700"></i>
        </div>

        <div class="bg-gradient-to-br from-[#0a1128] to-[#050b1d] border border-white/5 p-8 rounded-[2.5rem] relative overflow-hidden group hover:border-blue-400/50 transition-all duration-500 shadow-2xl">
            <div class="flex items-center gap-6 relative z-10">
                <div class="w-16 h-16 bg-blue-400/10 rounded-3xl flex items-center justify-center border border-blue-400/20 group-hover:scale-110 transition-transform">
                    <i class="fas fa-graduation-cap text-2xl text-blue-400"></i>
                </div>
                <div>
                    <p class="text-[10px] font-black text-blue-400/60 uppercase tracking-[0.2em]">Semester</p>
                    <h3 class="text-4xl font-black text-white mt-1 tabular-nums">000</h3>
                </div>
            </div>
            <i class="fas fa-university absolute -bottom-6 -right-6 text-white/[0.03] text-9xl rotate-12 transition-all duration-700"></i>
        </div>
    </div>

    <div id="lesson-sub-content" class="min-h-[400px] transition-all duration-500">
        </div>
</div>

<div id="global-modal" class="hidden fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 bg-black/95 backdrop-blur-xl">
    <div class="absolute inset-0" onclick="closeModal()"></div>
    
    <div id="modal-container" class="bg-[#0a1128] border border-white/10 w-full max-w-lg rounded-[2.5rem] shadow-2xl relative z-10 max-h-[90vh] flex flex-col overflow-hidden transition-all duration-500">
        
        <div class="p-6 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
            <div id="modal-header-content">
                <h2 id="modal-title" class="text-white font-black uppercase tracking-widest italic text-sm">Course Details</h2>
            </div>
            <button onclick="closeModal()" class="w-10 h-10 rounded-full bg-white/5 text-gray-400 hover:text-white flex items-center justify-center transition-all">
                <i class="fas fa-times text-xs"></i>
            </button>
        </div>

        <div id="modal-body" class="p-6 overflow-y-auto custom-scrollbar flex-grow">
            </div>
    </div>
</div>
`;

