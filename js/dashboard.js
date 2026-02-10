const ActivityEngine = {
    track() {
        const today = new Date().toISOString().split('T')[0];
        setInterval(() => {
            let log = JSON.parse(localStorage.getItem('user_node_activity') || '{}');
            log[today] = (log[today] || 0) + 1; // Tracks seconds
            localStorage.setItem('user_node_activity', JSON.stringify(log));
        }, 1000);
    },

    // Decides box thickness based on time spent
    getBoxClass(date) {
        const log = JSON.parse(localStorage.getItem('user_node_activity') || '{}');
        const seconds = log[date] || 0;
        if (seconds === 0) return 'bg-white/[0.03]'; // No activity
        if (seconds < 60) return 'bg-green-900';    // < 1 min
        if (seconds < 600) return 'bg-green-700';   // < 10 mins
        if (seconds < 1800) return 'bg-green-500';  // < 30 mins
        return 'bg-green-400';                      // Long stay
    }
};
ActivityEngine.track();

const views = {
'Overview': `
<div class="space-y-10 animate-in fade-in duration-700">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div class="group relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-[#0a0f25] to-[#050b1d] p-7 transition-all duration-500 hover:border-blue-500/50 hover:shadow-[0_0_30px_-10px_rgba(59,130,246,0.3)]">
            <div class="relative z-10 flex items-center gap-5">
                <div class="flex h-14 w-14 items-center justify-center rounded-2xl border border-blue-500/30 bg-blue-500/10 shadow-[inset_0_0_15px_rgba(59,130,246,0.2)] transition-transform duration-500 group-hover:scale-110">
                    <i class="fas fa-code-branch text-2xl text-blue-400"></i>
                </div>
                <div>
                    <p class="text-[11px] font-black uppercase tracking-[0.2em] text-blue-400/60"> Projects</p>
                    <h3 id="projectCount" class="mt-1 text-4xl font-black tracking-tighter text-white">0</h3>
                </div>
            </div>
            <div class="absolute -right-6 -bottom-6 opacity-[0.03] transition-all duration-700 group-hover:scale-110 group-hover:opacity-[0.08] group-hover:text-blue-500">
                <i class="fas fa-project-diagram text-[10rem] rotate-12"></i>
            </div>
        </div>

        <div class="group relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-[#0a0f25] to-[#050b1d] p-7 transition-all duration-500 hover:border-purple-500/50 hover:shadow-[0_0_30px_-10px_rgba(168,85,247,0.3)]">
            <div class="relative z-10 flex items-center gap-5">
                <div class="flex h-14 w-14 items-center justify-center rounded-2xl border border-purple-500/30 bg-purple-500/10 shadow-[inset_0_0_15px_rgba(168,85,247,0.2)] transition-transform duration-500 group-hover:scale-110">
                    <i class="fas fa-calendar-alt text-2xl text-purple-400"></i>
                </div>
                <div>
                    <p class="text-[11px] font-black uppercase tracking-[0.2em] text-purple-400/60">Semester</p>
                    <h3 id="semesterVal" class="mt-1 text-4xl font-black tracking-tighter text-white">000</h3>
                </div>
            </div>
            <div class="absolute -right-6 -bottom-6 opacity-[0.03] transition-all duration-700 group-hover:scale-110 group-hover:opacity-[0.08] group-hover:text-purple-500">
                <i class="fas fa-graduation-cap text-[10rem] rotate-12"></i>
            </div>
        </div>

        <div class="group relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-[#0a0f25] to-[#050b1d] p-7 transition-all duration-500 hover:border-cyan-500/50 hover:shadow-[0_0_30px_-10px_rgba(6,182,212,0.3)]">
            <div class="relative z-10 flex items-center gap-5">
                <div class="flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-500/30 bg-cyan-500/10 shadow-[inset_0_0_15px_rgba(6,182,212,0.2)] transition-transform duration-500 group-hover:scale-110">
                    <i class="fas fa-layer-group text-2xl text-cyan-400"></i>
                </div>
                <div>
                    <p class="text-[11px] font-black uppercase tracking-[0.2em] text-cyan-400/60">Level</p>
                    <h3 id="dash-level-val" class="mt-1 text-4xl font-black tracking-tighter text-white">000</h3>
                </div>
            </div>
            <div class="absolute -right-6 -bottom-6 opacity-[0.03] transition-all duration-700 group-hover:scale-110 group-hover:opacity-[0.08] group-hover:text-cyan-500">
                <i class="fas fa-chart-line text-[10rem] rotate-12"></i>
            </div>
        </div>
    </div>

    <div class="group relative overflow-hidden rounded-[3rem] border border-white/5 bg-[#050b1d] p-8 transition-all duration-700 hover:border-emerald-500/20">
        <div class="flex justify-between items-center mb-10">
            <div>
                <h3 class="text-2xl font-black text-white italic uppercase tracking-tighter">System Core <span class="text-emerald-500">.</span></h3>
                <div class="flex items-center gap-2 mt-2">
                    <span class="relative flex h-2 w-2">
                        <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <p class="text-[10px] text-gray-400 font-bold uppercase tracking-[0.3em]">Live Order Stream</p>
                </div>
            </div>
            
            <div class="flex gap-1.5 items-end h-8">
                <div class="w-1 bg-emerald-500/40 h-3 rounded-full animate-[bounce_1s_infinite]"></div>
                <div class="w-1 bg-emerald-500 h-6 rounded-full animate-[bounce_1.2s_infinite]"></div>
                <div class="w-1 bg-emerald-500/60 h-4 rounded-full animate-[bounce_0.8s_infinite]"></div>
            </div>
        </div>
        
        <div class="relative w-full h-[320px] rounded-3xl bg-black/40 border border-white/5 backdrop-blur-sm overflow-hidden">
            <div class="absolute inset-0 flex flex-col items-center justify-center z-10">
                <div class="w-20 h-20 mb-4 rounded-full bg-emerald-500/5 flex items-center justify-center border border-emerald-500/10 group-hover:border-emerald-500/30 transition-all duration-1000">
                    <i class="fas fa-satellite-dish text-emerald-500/20 group-hover:text-emerald-500 group-hover:animate-pulse"></i>
                </div>
                <span class="text-[10px] font-black text-emerald-500/40 uppercase tracking-[0.4em]">Awaiting Uplink...</span>
            </div>
            
            <canvas id="orderStatusChart" class="relative z-0"></canvas>
        </div>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div class="group relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#050b1d] p-7 transition-all duration-500 hover:border-indigo-500/40">
            <div class="relative z-10 flex items-center gap-5">
                <div class="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                    <i class="fas fa-handshake text-2xl"></i>
                </div>
                <div>
                    <p class="text-[11px] font-black uppercase tracking-widest text-gray-500">Collab</p>
                    <h3 id="collabCount" class="mt-1 text-3xl font-black text-white">0</h3>
                </div>
            </div>
            <i class="fas fa-users absolute -right-4 -bottom-4 text-8xl text-white/[0.02] transition-all group-hover:text-indigo-500/[0.05] rotate-12"></i>
        </div>

        <div class="group relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#050b1d] p-7 transition-all duration-500 hover:border-amber-500/40">
            <div class="relative z-10 flex items-center gap-5">
                <div class="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
                    <i class="fas fa-medal text-2xl"></i>
                </div>
                <div>
                    <p class="text-[11px] font-black uppercase tracking-widest text-gray-500">Rank</p>
                    <h3 class="mt-1 text-3xl font-black text-white italic"><span id="rankVal">#0</span></h3>
                </div>
            </div>
            <i class="fas fa-crown absolute -right-4 -bottom-4 text-8xl text-white/[0.02] transition-all group-hover:text-amber-500/[0.05] rotate-12"></i>
        </div>

        <div class="group relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#050b1d] p-7 transition-all duration-500 hover:border-yellow-500/40">
            <div class="relative z-10 flex items-center gap-5">
                <div class="flex h-14 w-14 items-center justify-center rounded-2xl bg-yellow-500/10 border border-yellow-500/20 text-yellow-400">
                    <i class="fas fa-star text-2xl"></i>
                </div>
                <div>
                    <p class="text-[11px] font-black uppercase tracking-widest text-gray-500">XT Gifts</p>
                    <h3 class="mt-1 text-3xl font-black text-white">
                        <span id="dash-xp-val">0</span> 
                        <span class="text-xs text-yellow-500 font-black ml-1">XP</span>
                    </h3>
                </div>
            </div>
            <i class="fas fa-trophy absolute -right-4 -bottom-4 text-8xl text-white/[0.02] transition-all group-hover:text-yellow-500/[0.05] rotate-12"></i>
        </div>
    </div>

    <div class="group relative overflow-hidden rounded-[3rem] border border-white/5 bg-[#050b1d] p-8 transition-all duration-700 hover:border-blue-500/20">
        <h3 class="text-lg font-black text-white italic uppercase tracking-[0.3em] mb-6">Activity Nebula <span class="text-blue-500 text-2xl">.</span></h3>
        <div class="relative w-full h-[280px] bg-black/40 rounded-[2rem] border border-white/5 shadow-inner">
            <canvas id="nebula" class="w-full h-full"></canvas>
        </div>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div class="group relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#050b1d] p-7 transition-all duration-500 hover:border-orange-600/50">
            <div class="relative z-10 flex items-center gap-5">
                <div class="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-600/10 border border-orange-500/20 text-orange-500">
                    <i class="fas fa-fire text-2xl"></i>
                </div>
                <div>
                    <p class="text-[11px] font-black uppercase tracking-widest text-gray-500">Streaks</p>
                    <h3 id="streakCount" class="mt-1 text-3xl font-black text-white">0</h3>
                </div>
            </div>
            <i class="fas fa-bolt absolute -right-4 -bottom-4 text-8xl text-white/[0.02] transition-all group-hover:text-orange-500/[0.05] rotate-12"></i>
        </div>

        <div class="group relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#050b1d] p-7 transition-all duration-500 hover:border-cyan-400/50">
            <div class="relative z-10 flex items-center gap-5">
                <div class="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-600/10 border border-cyan-500/20 text-cyan-400">
                    <i class="fas fa-rocket text-2xl"></i>
                </div>
                <div>
                    <p class="text-[11px] font-black uppercase tracking-widest text-gray-500">Deployed</p>
                    <h3 id="deployCount" class="mt-1 text-3xl font-black text-white">0</h3>
                </div>
            </div>
            <i class="fas fa-cloud-upload-alt absolute -right-4 -bottom-4 text-8xl text-white/[0.02] transition-all group-hover:text-cyan-500/[0.05] rotate-12"></i>
        </div>

        <div class="group relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#050b1d] p-7 transition-all duration-500 hover:border-emerald-400/50">
            <div class="relative z-10 flex items-center gap-5">
                <div class="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-600/10 border border-emerald-500/20 text-emerald-400">
                    <i class="fas fa-briefcase text-2xl"></i>
                </div>
                <div>
                    <p class="text-[11px] font-black uppercase tracking-widest text-gray-500"> Gigs</p>
                    <h3 id="gigCount" class="mt-1 text-3xl font-black text-white">0</h3>
                </div>
            </div>
            <i class="fas fa-money-bill-wave absolute -right-4 -bottom-4 text-8xl text-white/[0.02] transition-all group-hover:text-emerald-500/[0.05] rotate-12"></i>
        </div>
    </div>
</div>
`,

'Lessons': `
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
`,

'Projects': `
    <div class="max-w-6xl mx-auto space-y-10 p-4">
        <div class="flex flex-col items-center gap-6">
            <div class="relative w-full max-w-2xl">
                <i class="fas fa-search absolute left-6 top-1/2 -translate-y-1/2 text-white/20"></i>
                <input type="text" placeholder="SEARCH PROJECTS BY NAME..." class="w-full bg-white/5 border border-white/10 rounded-full py-5 pl-14 pr-6 text-white text-[11px] font-black tracking-[0.2em] focus:border-blue-500/50 outline-none transition-all">
            </div>
            <button onclick="openProjectInitiator()" class="px-10 py-5 bg-blue-600 hover:bg-blue-500 text-white font-black text-[11px] uppercase tracking-[0.3em] rounded-2xl transition-all shadow-xl shadow-blue-600/20">
                <i class="fas fa-plus-circle mr-2"></i> Create New Project
            </button>
        </div>

        <div id="projectContainerGrid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            </div>
    </div>
`,

'Leaderboard': `
    <div class="max-w-4xl mx-auto p-6 space-y-12 animate-in fade-in duration-700">
        <div class="text-center space-y-2 mb-12">
            <h2 class="text-white font-black text-4xl uppercase tracking-tighter">Global Rankings</h2>
            <p class="text-blue-500/60 text-[10px] font-black uppercase tracking-[0.4em]">Top Tier Contributors</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-5 gap-4">
            ${[1, 2, 3, 4, 5].map(rank => `
                <div class="relative group">
                    <div class="absolute -top-3 -left-3 w-8 h-8 rounded-xl bg-[#0a0f25] border border-white/10 flex items-center justify-center z-10 shadow-xl">
                        <span class="text-[10px] font-black ${rank === 1 ? 'text-yellow-400' : rank === 2 ? 'text-slate-300' : rank === 3 ? 'text-amber-600' : 'text-white/40'}">${rank}</span>
                    </div>
                    
                    <div class="bg-white/5 border border-white/10 rounded-[2rem] p-6 flex flex-col items-center text-center transition-all duration-300 group-hover:bg-white/[0.08] group-hover:border-blue-500/30 group-hover:-translate-y-1">
                        <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/5 mb-4 flex items-center justify-center overflow-hidden">
                            <i class="fas fa-user text-white/10 text-xl"></i>
                        </div>
                        <div class="h-2 w-12 bg-white/5 rounded-full mb-2"></div> <div class="h-1.5 w-8 bg-white/5 rounded-full"></div> </div>
                </div>
            `).join('')}
        </div>

        <div class="space-y-3 pt-8">
            <div class="flex justify-between px-8 text-[9px] font-black text-white/20 uppercase tracking-widest mb-4">
                <span>Participant</span>
                <span>Global Rank</span>
            </div>
            
            <div class="max-h-[500px] overflow-y-auto pr-2 space-y-2 custom-scrollbar">
                ${Array.from({ length: 15 }).map((_, i) => {
                    const rank = i + 6;
                    return `
                    <div class="group flex items-center justify-between bg-white/[0.02] border border-white/5 p-4 px-8 rounded-2xl transition-all hover:bg-white/5 hover:border-white/10">
                        <div class="flex items-center gap-4">
                            <div class="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center border border-white/5">
                                <i class="fas fa-user text-[10px] text-white/20"></i>
                            </div>
                            <div class="space-y-1">
                                <div class="h-2 w-24 bg-white/5 rounded-full"></div>
                                <div class="h-1.5 w-12 bg-white/5 rounded-full opacity-50"></div>
                            </div>
                        </div>
                        
                        <div class="flex items-center gap-6">
                            <span class="text-white/10 font-black text-[11px] italic">#${rank}</span>
                            <div class="w-1.5 h-1.5 rounded-full bg-white/5"></div>
                        </div>
                    </div>
                    `;
                }).join('')}
                
                <div class="py-10 text-center">
                    <p class="text-[9px] font-black text-white/10 uppercase tracking-[0.5em]">End of Active Rankings</p>
                </div>
            </div>
        </div>
    </div>
`,

'Collaboration': `
    <div class="max-w-5xl mx-auto p-6 space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
        
        <div class="space-y-6 text-center py-10">
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 mb-4">
                <span class="relative flex h-2 w-2">
                    <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                    <span class="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                <span class="text-[8px] font-black text-blue-400 uppercase tracking-widest">Network Discovery Active</span>
            </div>
            
            <h2 class="text-white font-black text-5xl uppercase tracking-tighter">Find Collaborators</h2>
            
            <div class="relative max-w-3xl mx-auto group">
                <div class="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-[2.5rem] blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
                <div class="relative flex items-center bg-[#0a0f25] border border-white/10 rounded-[2.5rem] p-2 pr-6">
                    <div class="w-14 h-14 flex items-center justify-center">
                        <i class="fas fa-search text-white/20"></i>
                    </div>
                    <input type="text" placeholder="Search by name, skill, or project ID..." class="flex-1 bg-transparent border-none outline-none text-white font-medium placeholder:text-white/10 text-lg">
                    <kbd class="hidden md:block px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-white/20 text-[10px] font-black uppercase tracking-tighter">Shift + K</kbd>
                </div>
            </div>
        </div>

        <div class="relative overflow-hidden bg-white/[0.02] border border-dashed border-white/10 rounded-[4rem] p-20 flex flex-col items-center justify-center text-center">
            <div class="absolute inset-0 opacity-[0.03] pointer-events-none" style="background-image: radial-gradient(circle at 2px 2px, white 1px, transparent 0); background-size: 40px 40px;"></div>
            
            <div class="relative">
                <div class="flex gap-4 mb-8">
                    <div class="w-16 h-16 rounded-[2rem] bg-white/5 flex items-center justify-center animate-pulse">
                        <i class="fas fa-hammer text-white/20 text-2xl"></i>
                    </div>
                    <div class="w-16 h-16 rounded-[2rem] bg-blue-500/10 flex items-center justify-center animate-bounce duration-1000">
                        <i class="fas fa-microchip text-blue-500 text-2xl shadow-blue-500/50"></i>
                    </div>
                    <div class="w-16 h-16 rounded-[2rem] bg-white/5 flex items-center justify-center animate-pulse delay-75">
                        <i class="fas fa-cog fa-spin text-white/20 text-2xl"></i>
                    </div>
                </div>
            </div>

            <h3 class="text-white font-black text-xl uppercase tracking-widest mb-3">Engineers are building</h3>
            <p class="max-w-md text-white/30 text-[11px] leading-relaxed font-bold uppercase tracking-widest">
                Our team is currently establishing the peer-to-peer neural link protocols. 
                <span class="text-blue-500/50">Stay still for updates.</span> The collaboration matrix will initialize shortly.
            </p>

            <div class="mt-10 w-64 h-1 bg-white/5 rounded-full overflow-hidden">
                <div class="h-full bg-blue-600 w-1/3 animate-[progress_3s_infinite_linear]"></div>
            </div>
        </div>
    </div>
`,

'Team': `
    <div class="max-w-6xl mx-auto p-6 space-y-10 animate-in fade-in zoom-in-95 duration-700">
        
        <div class="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
            <div class="space-y-2">
                <div class="flex items-center gap-2">
                    <div class="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>
                    <span class="text-[9px] font-black text-blue-500 uppercase tracking-[0.3em]">Operational Unit</span>
                </div>
                <h2 class="text-white font-black text-5xl uppercase tracking-tighter">My Squad</h2>
            </div>
            
            <button class="px-8 py-4 bg-white/5 border border-white/10 rounded-2xl text-white/40 text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white hover:border-blue-500 transition-all duration-300">
                <i class="fas fa-user-plus mr-2"></i> Recruit Member
            </button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
            
            <div class="md:col-span-2 md:row-span-2 relative group overflow-hidden bg-gradient-to-br from-blue-600/10 to-transparent border border-blue-500/20 rounded-[3rem] p-10 flex flex-col justify-between">
                <div class="absolute top-0 right-0 p-8">
                    <i class="fas fa-crown text-blue-500/20 text-6xl rotate-12 group-hover:rotate-0 transition-transform duration-500"></i>
                </div>
                
                <div class="space-y-4">
                    <div class="w-24 h-24 rounded-[2.5rem] bg-white/5 border border-white/10 flex items-center justify-center">
                        <i class="fas fa-user-shield text-white/10 text-4xl"></i>
                    </div>
                    <div>
                        <h3 class="text-white font-black text-3xl uppercase tracking-tighter">Squad Leader</h3>
                        <p class="text-blue-400 text-[10px] font-black uppercase tracking-[0.2em]">Unassigned Slot</p>
                    </div>
                </div>

                <div class="pt-10">
                    <div class="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                        <div class="h-full bg-blue-500 w-0 group-hover:w-full transition-all duration-1000"></div>
                    </div>
                    <p class="mt-4 text-white/20 text-[9px] font-bold uppercase italic">Awaiting authentication...</p>
                </div>
            </div>

            ${['Engineer', 'Designer', 'Analyst', 'Strategist'].map(role => `
                <div class="bg-[#0a0f1d] border border-white/5 rounded-[2.5rem] p-8 flex flex-col items-center text-center group hover:border-white/20 transition-all">
                    <div class="w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/5 mb-6 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <i class="fas fa-id-badge text-white/5 text-2xl"></i>
                    </div>
                    <h4 class="text-white/60 font-black text-xs uppercase tracking-widest mb-1">${role}</h4>
                    <span class="text-[8px] text-white/10 font-black uppercase tracking-tighter">System Standby</span>
                    
                    <div class="mt-6 flex gap-1">
                        <div class="w-1 h-1 rounded-full bg-white/10"></div>
                        <div class="w-1 h-1 rounded-full bg-white/10"></div>
                        <div class="w-1 h-1 rounded-full bg-white/10"></div>
                    </div>
                </div>
            `).join('')}

            <div class="md:col-span-2 bg-white/[0.01] border-2 border-dashed border-white/5 rounded-[2.5rem] p-8 flex items-center justify-center">
                <div class="text-center">
                    <p class="text-white/10 text-[10px] font-black uppercase tracking-[0.4em] mb-4">Engineering team in progress</p>
                    <div class="flex items-center gap-4 justify-center">
                        <div class="animate-bounce p-2"><i class="fas fa-hard-hat text-white/20"></i></div>
                        <div class="animate-bounce delay-100 p-2"><i class="fas fa-tools text-white/20"></i></div>
                        <div class="animate-bounce delay-200 p-2"><i class="fas fa-project-diagram text-white/20"></i></div>
                    </div>
                </div>
            </div>

        </div>
    </div>
`,

'Inbox': `
    <div class="max-w-6xl mx-auto h-[700px] flex flex-col animate-in fade-in slide-in-from-bottom-8 duration-700">
        
        <div class="flex items-center justify-between mb-8 px-2">
            <div>
                <h2 class="text-white font-black text-4xl uppercase tracking-tighter">Inbox</h2>
                <p class="text-blue-500/50 text-[9px] font-black uppercase tracking-[0.3em]">Encrypted Terminal v2.0</p>
            </div>
            <div class="flex gap-3">
                <button class="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-white transition-colors">
                    <i class="fas fa-sliders-h text-xs"></i>
                </button>
                <button class="px-6 py-3 bg-blue-600 rounded-2xl text-white text-[10px] font-black uppercase tracking-widest shadow-lg shadow-blue-600/20">
                    Compose
                </button>
            </div>
        </div>

        <div class="flex-1 flex bg-[#0a0f1d]/50 border border-white/5 rounded-[3rem] overflow-hidden">
            
            <div class="w-1/3 border-r border-white/5 flex flex-col">
                <div class="p-6 border-b border-white/5">
                    <div class="relative group">
                        <i class="fas fa-filter absolute left-4 top-1/2 -translate-y-1/2 text-white/10 text-[10px]"></i>
                        <input type="text" placeholder="Filter transmissions..." class="w-full bg-white/5 border border-white/10 py-3 pl-10 pr-4 rounded-xl text-white text-[10px] uppercase font-black tracking-widest outline-none focus:border-blue-500/40 transition-all">
                    </div>
                </div>
                
                <div class="flex-1 overflow-y-auto p-4 space-y-4 opacity-40">
                    ${[1, 2, 3, 4].map(() => `
                        <div class="p-5 rounded-[2rem] border border-dashed border-white/10 flex items-center gap-4">
                            <div class="w-10 h-10 rounded-full bg-white/5 shrink-0"></div>
                            <div class="space-y-2 flex-1">
                                <div class="h-2 w-20 bg-white/10 rounded-full"></div>
                                <div class="h-1.5 w-full bg-white/5 rounded-full"></div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>

            <div class="flex-1 flex flex-col items-center justify-center p-20 text-center relative">
                <div class="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none">
                    <i class="fas fa-satellite-dish text-[20rem]"></i>
                </div>

                <div class="relative space-y-6">
                    <div class="inline-block p-6 rounded-[2.5rem] bg-gradient-to-b from-blue-500/10 to-transparent border border-blue-500/20 animate-pulse">
                        <i class="fas fa-signal text-blue-500 text-4xl"></i>
                    </div>
                    
                    <div>
                        <h3 class="text-white font-black text-2xl uppercase tracking-tighter mb-2">Signal Intercepted</h3>
                        <p class="text-white/20 text-[10px] font-bold uppercase tracking-widest max-w-sm mx-auto leading-relaxed">
                            Engineers are currently calibrating the <span class="text-blue-500">end-to-end neural encryption</span>. Communications will resume once the link is secured.
                        </p>
                    </div>

                    <div class="pt-8">
                        <div class="flex items-center justify-center gap-2">
                            <span class="w-1 h-1 bg-blue-500 rounded-full animate-ping"></span>
                            <span class="text-[8px] font-black text-blue-400 uppercase tracking-[0.5em]">Establishing Protocol...</span>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
`,

'Nxxt AI': `
  <div class="nxxt-container flex flex-col h-[90vh] max-w-6xl mx-auto relative bg-[#05070a] rounded-[3rem] border border-white/5 shadow-2xl overflow-hidden font-sans text-slate-200">
    
    <nav class="flex justify-between items-center px-10 py-6 bg-white/[0.02] backdrop-blur-2xl border-b border-white/[0.05] z-50">
        <div class="flex items-center gap-8">
            <div class="text-2xl font-black tracking-tighter italic bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">NXXT</div>
            <div class="flex bg-white/[0.03] p-1.5 rounded-2xl border border-white/10 shadow-inner">
                <button onclick="window.nxxtMode = 'standard'" class="px-6 py-2 rounded-xl text-[11px] font-bold uppercase tracking-wider transition-all text-white bg-blue-600 shadow-[0_0_20px_rgba(37,99,235,0.3)]">Standard</button>
                <button onclick="window.nxxtMode = 'fun'" class="px-6 py-2 rounded-xl text-[11px] font-bold uppercase tracking-wider transition-all text-white/40 hover:text-white">Fun Mode</button>
            </div>
        </div>
        
        <div class="flex items-center gap-6">
            <div class="flex flex-col items-end">
                <span class="text-[9px] font-black text-blue-500 uppercase tracking-[0.2em] mb-1">Neural Capacity</span>
                <div id="imageCredits" class="flex gap-1">
                    <div class="w-1.5 h-3.5 bg-blue-500 rounded-full"></div>
                    <div class="w-1.5 h-3.5 bg-blue-500 rounded-full"></div>
                    <div class="w-1.5 h-3.5 bg-blue-500 rounded-full"></div>
                    <div class="w-1.5 h-3.5 bg-white/10 rounded-full"></div>
                    <div class="w-1.5 h-3.5 bg-white/10 rounded-full"></div>
                </div>
            </div>
        </div>
    </nav>

    <div id="aiThread" class="flex-1 overflow-y-auto px-12 py-10 space-y-10 scroll-smooth custom-scrollbar">
        
        <div class="absolute inset-0 flex flex-col items-center justify-center pointer-events-none opacity-[0.03] select-none">
            <h1 class="text-[20rem] font-black tracking-tighter italic">NXXT</h1>
        </div>

        <div class="flex justify-end group">
            <div class="relative max-w-xl">
                <div class="bg-gradient-to-br from-blue-600 to-indigo-700 p-[1px] rounded-[2rem] rounded-tr-sm shadow-xl">
                    <div class="bg-[#0a0f1d] rounded-[2rem] rounded-tr-sm px-8 py-5">
                        <p class="text-[16px] leading-relaxed text-blue-50">Hello Nxxt, initialize system diagnostics.</p>
                    </div>
                </div>
                <span class="block mt-3 text-right text-[10px] font-bold text-white/20 uppercase tracking-widest group-hover:text-blue-400 transition-colors">Master User // 01</span>
            </div>
        </div>

        <div class="flex flex-col gap-6 max-w-3xl">
            <div class="flex items-center gap-4">
                <div class="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/20">
                    <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                </div>
                <span class="text-[11px] font-black text-white/30 uppercase tracking-[0.4em]">Core Neural Process</span>
            </div>
            <div class="pl-14">
                <div class="text-[18px] leading-[1.8] font-light text-slate-300 tracking-wide border-l-2 border-white/5 pl-8">
                    System diagnostics <span class="text-blue-400 font-medium">initialized</span>. All neural pathways are operating at peak efficiency. Latency is sub-10ms. Ready for your next command.
                </div>
            </div>
        </div>
    </div>

    <div class="p-10 bg-gradient-to-t from-[#05070a] via-[#05070a]/90 to-transparent">
        <div class="max-w-4xl mx-auto relative">
            <div class="absolute -inset-2 bg-blue-500/10 blur-2xl rounded-[3rem]"></div>
            <div class="relative bg-[#0f1420] border border-white/10 rounded-[2.5rem] p-2 flex items-end shadow-2xl focus-within:border-blue-500/50 transition-all">
                <textarea id="nxxtInput" rows="1" 
                    placeholder="Describe your next objective..." 
                    class="flex-1 bg-transparent border-none outline-none text-white text-lg px-8 py-5 resize-none placeholder:text-white/10"
                    oninput="this.style.height = 'auto'; this.style.height = this.scrollHeight + 'px'"></textarea>
                
                <div class="flex items-center gap-4 p-2">
                    <div class="hidden md:flex flex-col items-end px-4 border-r border-white/5">
                        <span class="text-[9px] font-bold text-green-500 flex items-center gap-2">
                            <span class="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                            STABLE
                        </span>
                        <span class="text-[8px] text-white/20 font-black tracking-widest">NX-4 TURBO</span>
                    </div>
                    <button onclick="handleNxxtFlow()" class="w-14 h-14 rounded-2xl bg-white hover:bg-blue-500 text-black hover:text-white transition-all duration-300 flex items-center justify-center shadow-lg active:scale-95">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 10l7-7m0 0l7 7m-7-7v18"/></svg>
                    </button>
                </div>
            </div>
        </div>
    </div>

    <div id="nxxtModal" class="hidden fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-xl transition-opacity duration-300">
        <div class="bg-[#0d1117] border border-white/10 p-10 rounded-[3rem] max-w-sm w-full text-center shadow-[0_0_100px_rgba(0,0,0,0.5)] transform scale-100 transition-transform">
            <div class="w-20 h-20 bg-red-500/10 rounded-[2rem] flex items-center justify-center mx-auto mb-6 border border-red-500/20">
                <svg class="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
            </div>
            <h3 class="text-white font-black text-2xl mb-3 tracking-tight">System Interrupt</h3>
            <p class="text-white/50 text-[15px] leading-relaxed mb-8">Nxxt encountered a neural sync error. Command sequence must be re-initialized for safety.</p>
            <button onclick="this.closest('#nxxtModal').classList.add('hidden')" class="w-full py-4 bg-white text-black font-black uppercase text-[11px] tracking-[0.2em] rounded-2xl hover:bg-blue-500 hover:text-white transition-all">Acknowledge & Reboot</button>
        </div>
    </div>
</div>
`,

'Nxxt Lab': `
<div class="flex flex-col h-[85vh] max-w-6xl mx-auto bg-[#030508] rounded-[2.5rem] border border-white/5 shadow-2xl overflow-hidden font-sans text-white animate-in fade-in duration-700">
    
    <div class="flex justify-between items-center px-10 py-8 bg-black/40 backdrop-blur-xl border-b border-white/[0.03]">
        <div class="flex items-center gap-10">
            <div>
                <h1 class="text-xl font-black tracking-tighter uppercase italic">Nxxt <span class="text-blue-500 not-italic">Lab</span></h1>
                <div class="flex items-center gap-2 mt-1">
                    <span class="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse"></span>
                    <p class="text-[9px] uppercase tracking-[0.2em] text-white/40 font-bold">Build Phase: Active</p>
                </div>
            </div>
            
            <div class="h-8 w-px bg-white/5"></div>

            <div class="flex gap-6">
                <div class="flex flex-col">
                    <span class="text-[8px] uppercase tracking-widest text-white/20 font-black">Environment</span>
                    <span class="text-[11px] font-mono text-blue-400">Production-B</span>
                </div>
                <div class="flex flex-col">
                    <span class="text-[8px] uppercase tracking-widest text-white/20 font-black">Lead Engineer</span>
                    <span class="text-[11px] font-mono text-white/60">@User_Admin</span>
                </div>
            </div>
        </div>

        <div class="flex items-center gap-4">
            <button onclick="showLabModal('Commit Required', 'You are attempting to push code to a protected branch. Please verify credentials.', 'fa-code-branch')" class="px-5 py-2 rounded-xl bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-widest hover:bg-white/10 transition-all">
                Push Update
            </button>
        </div>
    </div>

    <div class="flex-1 flex overflow-hidden">
        
        <div class="w-80 border-r border-white/5 bg-black/20 flex flex-col">
            <div class="p-6 border-b border-white/5">
                <h3 class="text-[10px] uppercase tracking-[0.2em] font-black text-white/20">Live Build Stream</h3>
            </div>
            <div id="buildLogs" class="flex-1 p-6 font-mono text-[10px] space-y-3 overflow-y-auto custom-scrollbar opacity-60">
                <div class="text-blue-400">>> Initializing Nxxt Core...</div>
                <div class="text-white/30">>> Loading dependency graph...</div>
                <div class="text-green-500">>> Logic engine: Optimized</div>
                <div class="text-white/30">>> Syncing assets with Lab CDN...</div>
                <div class="text-orange-400">>> Warning: Latency spike in Node-7</div>
                <div class="text-blue-400">>> Compiling prototype modules...</div>
            </div>
        </div>

        <div class="flex-1 p-10 overflow-y-auto custom-scrollbar">
            <div class="grid grid-cols-2 gap-6">
                
                <div class="p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-blue-500/30 transition-all group">
                    <div class="flex justify-between items-start mb-6">
                        <div class="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                            <i class="fas fa-layer-group text-blue-500 text-sm"></i>
                        </div>
                        <span class="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-[9px] font-black uppercase">In Progress</span>
                    </div>
                    <h4 class="text-lg font-bold mb-2">Interface Alpha</h4>
                    <p class="text-sm text-white/40 mb-6 font-light">Engineers are currently refining the gesture-based UI components.</p>
                    <div class="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                        <div class="w-[65%] h-full bg-blue-500 shadow-[0_0_8px_#3b82f6]"></div>
                    </div>
                </div>

                <div class="p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-purple-500/30 transition-all group">
                    <div class="flex justify-between items-start mb-6">
                        <div class="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20">
                            <i class="fas fa-microchip text-purple-500 text-sm"></i>
                        </div>
                        <span class="px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-[9px] font-black uppercase">Testing</span>
                    </div>
                    <h4 class="text-lg font-bold mb-2">Logic Pipeline</h4>
                    <p class="text-sm text-white/40 mb-6 font-light">Optimizing data routing between the lab core and external nodes.</p>
                    <div class="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                        <div class="w-[88%] h-full bg-purple-500 shadow-[0_0_8px_#a855f7]"></div>
                    </div>
                </div>

                <div onclick="showLabModal('Access Denied', 'New project initialization is locked to Admin level engineers.', 'fa-lock')" class="p-8 rounded-3xl border border-dashed border-white/10 hover:bg-white/[0.02] cursor-pointer transition-all flex flex-col items-center justify-center text-center">
                    <div class="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center mb-4">
                        <i class="fas fa-plus text-white/20 text-xs"></i>
                    </div>
                    <span class="text-xs font-bold text-white/20 uppercase tracking-widest">New Lab Experiment</span>
                </div>

            </div>
        </div>
    </div>

    <div id="labModal" class="hidden fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md animate-in fade-in duration-300">
        <div class="bg-[#0d1117] border border-white/10 p-10 rounded-[2.5rem] max-w-sm w-full text-center shadow-2xl scale-95 animate-in zoom-in-95 duration-300">
            <div class="w-20 h-20 bg-blue-500/10 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-blue-500/20">
                <i id="labModalIcon" class="fas fa-exclamation-triangle text-blue-500 text-2xl"></i>
            </div>
            <h3 id="labModalTitle" class="text-white font-bold text-xl mb-3 uppercase tracking-tight">Access Restricted</h3>
            <p id="labModalMsg" class="text-white/50 text-sm mb-8 leading-relaxed">Engineers are currently working on this module. Check back later.</p>
            <button onclick="document.getElementById('labModal').classList.add('hidden')" class="w-full py-4 bg-white text-black font-black uppercase text-[10px] tracking-[0.2em] rounded-2xl hover:bg-blue-600 hover:text-white transition-all">Acknowledge</button>
        </div>
    </div>
</div>
`,

'Side Hustle Hub': `
<div class="flex flex-col h-[85vh] max-w-6xl mx-auto bg-[#050505] rounded-[2.5rem] border border-emerald-500/10 shadow-2xl overflow-hidden font-sans text-white animate-in fade-in duration-700">
    
    <div class="flex justify-between items-center px-10 py-6 bg-emerald-950/10 backdrop-blur-xl border-b border-white/[0.05]">
        <div class="flex items-center gap-8">
            <div>
                <h1 class="text-xl font-black tracking-tighter uppercase">SideHustle <span class="text-emerald-500">Hub</span></h1>
                <p class="text-[9px] uppercase tracking-[0.3em] text-emerald-500/50 font-bold">Scaling Ventures v1.2</p>
            </div>
            
            <div class="hidden md:flex gap-6 border-l border-white/10 pl-8">
                <div class="flex flex-col">
                    <span class="text-[8px] uppercase text-white/30 font-bold">Daily Rev</span>
                    <span class="text-sm font-mono text-emerald-400">+$1,240.50</span>
                </div>
                <div class="flex flex-col">
                    <span class="text-[8px] uppercase text-white/30 font-bold">Active Funnels</span>
                    <span class="text-sm font-mono text-white">08</span>
                </div>
            </div>
        </div>

        <div class="flex items-center gap-4">
            <div class="flex -space-x-2">
                <div class="w-8 h-8 rounded-full border-2 border-[#050505] bg-emerald-600 flex items-center justify-center text-[10px] font-bold">JD</div>
                <div class="w-8 h-8 rounded-full border-2 border-[#050505] bg-blue-600 flex items-center justify-center text-[10px] font-bold">AS</div>
            </div>
            <button onclick="showHustleModal('New Venture', 'Engineers are preparing the launch sequence for Project Z. Initialization lock active.', 'fa-rocket')" class="bg-emerald-600 hover:bg-emerald-500 text-black px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                Launch New
            </button>
        </div>
    </div>

    <div class="flex-1 flex overflow-hidden">
        
        <div class="w-72 border-r border-white/5 bg-black/40 p-6 flex flex-col">
            <h3 class="text-[10px] uppercase tracking-widest font-black text-white/20 mb-6">Market Trends</h3>
            <div class="space-y-4">
                <div class="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                    <div class="flex justify-between items-start mb-1">
                        <span class="text-[10px] font-bold text-emerald-400 uppercase">SaaS Bio</span>
                        <span class="text-[9px] text-white/20">HOT</span>
                    </div>
                    <div class="text-xs text-white/60">Micro-SaaS for LinkedIn automation trending.</div>
                </div>
                <div class="p-4 rounded-2xl bg-white/[0.02] border border-white/5 opacity-50">
                    <div class="flex justify-between items-start mb-1">
                        <span class="text-[10px] font-bold text-blue-400 uppercase">AI Voice</span>
                        <span class="text-[9px] text-white/20">STABLE</span>
                    </div>
                    <div class="text-xs text-white/60">Voice-clone customer support modules.</div>
                </div>
            </div>

            <div class="mt-auto p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/10">
                <p class="text-[9px] uppercase font-bold text-emerald-500 mb-1">Eng Capacity</p>
                <div class="flex items-end justify-between">
                    <span class="text-xl font-mono font-bold">82%</span>
                    <span class="text-[9px] text-white/40 mb-1">Cooking...</span>
                </div>
            </div>
        </div>

        <div class="flex-1 p-10 overflow-y-auto custom-scrollbar bg-[radial-gradient(circle_at_bottom_right,_var(--tw-gradient-stops))] from-emerald-900/10 via-transparent to-transparent">
            <h2 class="text-3xl font-light mb-8">Current <span class="font-bold">Ventures</span></h2>
            
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div class="p-8 rounded-[2rem] bg-white/[0.03] border border-white/10 hover:border-emerald-500/40 transition-all group">
                    <div class="flex justify-between mb-6">
                        <div class="w-12 h-12 rounded-2xl bg-emerald-500/20 flex items-center justify-center border border-emerald-500/20 text-emerald-400">
                            <i class="fas fa-shopping-cart text-sm"></i>
                        </div>
                        <div class="text-right font-mono">
                            <div class="text-[10px] text-white/20 uppercase">Revenue</div>
                            <div class="text-emerald-400 font-bold">$4.2k</div>
                        </div>
                    </div>
                    <h4 class="text-lg font-bold mb-1">E-Com Automator</h4>
                    <p class="text-sm text-white/40 mb-6 leading-relaxed">Engineers are optimizing the supply chain webhook listeners.</p>
                    <div class="flex gap-2">
                        <span class="px-3 py-1 rounded-lg bg-white/5 text-[9px] font-bold text-white/40 uppercase">Dropshipping</span>
                        <span class="px-3 py-1 rounded-lg bg-emerald-500/10 text-[9px] font-bold text-emerald-400 uppercase">Scalable</span>
                    </div>
                </div>

                <div class="p-8 rounded-[2rem] bg-white/[0.03] border border-white/10 hover:border-blue-500/40 transition-all group">
                    <div class="flex justify-between mb-6">
                        <div class="w-12 h-12 rounded-2xl bg-blue-500/20 flex items-center justify-center border border-blue-500/20 text-blue-400">
                            <i class="fas fa-code text-sm"></i>
                        </div>
                        <div class="text-right font-mono">
                            <div class="text-[10px] text-white/20 uppercase">Revenue</div>
                            <div class="text-blue-400 font-bold">$1.8k</div>
                        </div>
                    </div>
                    <h4 class="text-lg font-bold mb-1">SaaS Template Pro</h4>
                    <p class="text-sm text-white/40 mb-6 leading-relaxed">Finalizing the Stripe integration for one-click checkout.</p>
                    <div class="flex gap-2">
                        <span class="px-3 py-1 rounded-lg bg-white/5 text-[9px] font-bold text-white/40 uppercase">Software</span>
                        <span class="px-3 py-1 rounded-lg bg-blue-500/10 text-[9px] font-bold text-blue-400 uppercase">Beta</span>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div id="hustleModal" class="hidden fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 animate-in fade-in duration-200">
        <div class="bg-[#0a0f0d] border border-emerald-500/20 p-10 rounded-[2.5rem] max-w-sm w-full text-center shadow-2xl">
            <div class="w-20 h-20 bg-emerald-500/10 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-emerald-500/20">
                <i id="hustleIcon" class="fas fa-rocket text-emerald-500 text-2xl"></i>
            </div>
            <h3 id="hustleTitle" class="text-white font-black text-xl mb-3 uppercase tracking-tight">Venture Locked</h3>
            <p id="hustleMsg" class="text-white/50 text-sm mb-8 leading-relaxed">Our engineers are currently cooking this feature. It is not ready for public deployment.</p>
            <button onclick="document.getElementById('hustleModal').classList.add('hidden')" class="w-full py-4 bg-emerald-600 text-black font-black uppercase text-[10px] tracking-[0.2em] rounded-2xl hover:bg-white transition-all">Acknowledge</button>
        </div>
    </div>
</div>
`,

'Notifications': `
    <div class="max-w-2xl mx-auto p-4 space-y-4 animate-in fade-in duration-500">
        <div class="flex justify-between items-end mb-8 px-2">
            <div>
                <h2 class="text-white font-black text-2xl uppercase tracking-tighter">Activity Feed</h2>
                <p class="text-white/30 text-[9px] font-bold uppercase tracking-widest mt-1">Real-time system event logging</p>
            </div>
            <button onclick="localStorage.removeItem('app_notifications'); renderTab('Notifications');" class="text-[9px] font-black text-red-500/40 hover:text-red-500 uppercase tracking-widest transition-all">
                Clear All
            </div>
        </div>

        <div id="notifList" class="space-y-4">
            ${(JSON.parse(localStorage.getItem('app_notifications')) || []).filter(l => !l.archived).length === 0 ? `
                <div class="flex flex-col items-center justify-center p-20 border border-dashed border-white/5 rounded-[3rem]">
                    <i class="fas fa-bell-slash text-white/5 text-4xl mb-4"></i>
                    <p class="text-white/20 text-[10px] font-black uppercase tracking-widest">No activity found</p>
                </div>
            ` : (JSON.parse(localStorage.getItem('app_notifications')) || []).filter(l => !l.archived).map(log => `
                <div id="notif-${log.id}" class="group relative overflow-hidden bg-white/5 border border-white/10 p-6 rounded-[2.5rem] transition-all hover:bg-white/[0.08]">
                    <div class="flex items-center gap-5">
                        <div class="w-12 h-12 rounded-2xl bg-[#0a0f25] flex items-center justify-center border border-white/5">
                            <i class="fas ${log.type === 'success' ? 'fa-check text-green-500' : log.type === 'failed' ? 'fa-times text-red-500' : 'fa-sync fa-spin text-yellow-500'}"></i>
                        </div>
                        
                        <div class="flex-1">
                            <div class="flex justify-between items-start">
                                <p class="text-white text-[11px] font-black uppercase tracking-widest">${log.msg}</p>
                                <span class="text-white/20 text-[8px] font-bold">${log.time}</span>
                            </div>
                            <p class="text-white/40 text-[9px] mt-1 uppercase">Action Log #${log.id.toString().slice(-4)}</p>
                        </div>

                        <div class="flex gap-2 translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
                            <button onclick="archiveNotif(${log.id})" class="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-400 hover:bg-blue-500 hover:text-white transition-all shadow-lg" title="Archive">
                                <i class="fas fa-archive text-[10px]"></i>
                            </button>
                            <button onclick="deleteNotif(${log.id})" class="w-9 h-9 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-all shadow-lg" title="Delete">
                                <i class="fas fa-trash text-[10px]"></i>
                            </button>
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
    </div>
`,

'Xt Pay': `
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
`,

'Pricing': `
<div class="space-y-12 animate-in relative">
    <div class="flex flex-col items-center text-center">
        <div class="px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-[10px] font-black uppercase tracking-[0.3em] text-blue-400 mb-6 animate-pulse">Access Protocol v4.0</div>
        <h2 class="text-4xl md:text-6xl font-black italic uppercase tracking-tighter text-white mb-8">System <span class="text-blue-500">Subscription///</span></h2>
        
        <div class="flex items-center gap-6 p-2 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md">
            <span id="monthlyLabel" class="text-[10px] font-black uppercase tracking-widest text-white transition-all">Monthly</span>
            <button onclick="togglePricing()" id="priceToggle" class="w-14 h-7 bg-blue-600 rounded-full relative p-1 transition-all">
                <div id="toggleBall" class="w-5 h-5 bg-white rounded-full shadow-lg transition-transform duration-300"></div>
            </button>
            <span id="yearlyLabel" class="text-[10px] font-black uppercase tracking-widest text-gray-500 transition-all">Yearly <span class="text-blue-400 text-[8px] ml-1">(Save 15%)</span></span>
        </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 items-end max-w-6xl mx-auto">
        
        <div class="pricing-card p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 flex flex-col hover:border-blue-500/40 transition-all duration-500 group relative overflow-hidden">
            <span class="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">Entry Node</span>
            <h3 class="text-3xl font-black italic uppercase text-white mb-6">Free</h3>
            <div class="mb-8"><span class="text-4xl font-black text-white">₦0</span> <span class="text-xs font-bold text-gray-600 uppercase">/ Forever</span></div>
            <ul class="space-y-4 mb-12 flex-grow">
                <li class="flex items-center gap-3 text-[10px] text-gray-400 font-bold uppercase"><i class="fas fa-check text-blue-500"></i> Public Learning Hub</li>
                <li class="flex items-center gap-3 text-[10px] text-gray-400 font-bold uppercase"><i class="fas fa-check text-blue-500"></i> Community Support</li>
                                <li class="flex items-center gap-3 text-[10px] text-gray-400 font-bold uppercase"><i class="fas fa-check text-blue-500"></i>  Test Collaboration</li>
                <li class="flex items-center gap-3 text-[10px] text-red-500/50 font-bold uppercase"><i class="fas fa-times"></i> No AI Tutor Access</li>
                <li class="flex items-center gap-3 text-[10px] text-red-500/50 font-bold uppercase"><i class="fas fa-times"></i> No Verified Certs</li>
                <li class="flex items-center gap-3 text-[10px] text-red-500/50 font-bold uppercase"><i class="fas fa-times"></i> No Projects feature</li>
                <li class="flex items-center gap-3 text-[10px] text-red-500/50 font-bold uppercase"><i class="fas fa-times"></i> No Team feature</li>
            </ul>
            <button class="w-full py-4 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-white hover:bg-white hover:text-black transition-all">Current Plan</button>
        </div>

        <div class="pricing-card p-10 rounded-[3rem] bg-[#050b1d] border-2 border-blue-600 shadow-[0_0_50px_rgba(37,99,235,0.15)] flex flex-col relative scale-105 z-20 overflow-hidden group">
            <div class="absolute -top-1 left-1/2 -translate-x-1/2 px-4 py-1 bg-blue-600 rounded-b-xl text-[8px] font-black uppercase text-white tracking-[0.3em]">Recommended</div>
            <span class="text-[10px] font-black uppercase tracking-widest text-blue-400 mb-2">Academic Node</span>
            <h3 class="text-3xl font-black italic uppercase text-white mb-6">Student</h3>
            <div class="mb-8">
                <span id="studentPrice" class="text-5xl font-black text-white transition-all">₦8,000</span> 
                <span id="studentPeriod" class="text-xs font-bold text-blue-400/50 uppercase">/ Month</span>
            </div>
         <ul class="space-y-4 mb-12 flex-grow">
    <li class="flex items-center gap-3 text-[10px] text-white font-bold uppercase">
        <i class="fas fa-book-open text-blue-400 w-4"></i> Limited Pro Courses
    </li>
    <li class="flex items-center gap-3 text-[10px] text-white font-bold uppercase">
        <i class="fas fa-project-diagram text-blue-400 w-4"></i> Limited Projects Feature
    </li>
    <li class="flex items-center gap-3 text-[10px] text-white font-bold uppercase">
        <i class="fas fa-chart-line text-blue-400 w-4"></i> Real-Time Hustle Hub Update
    </li>
    <li class="flex items-center gap-3 text-[10px] text-white font-bold uppercase">
        <i class="fas fa-sync text-blue-400 w-4"></i> Limited Collaboration Feature
    </li>
    <li class="flex items-center gap-3 text-[10px] text-white font-bold uppercase">
        <i class="fas fa-users-cog text-blue-400 w-4"></i> Limited Team Feature
    </li>
    <li class="flex items-center gap-3 text-[10px] text-white font-bold uppercase">
        <i class="fas fa-brain text-blue-400 w-4"></i> Nxxt AI Tutor (24/7)
    </li>
    <li class="flex items-center gap-3 text-[10px] text-white font-bold uppercase">
        <i class="fas fa-medal text-blue-400 w-4"></i> Verified Certificates
    </li>
    <li class="flex items-center gap-3 text-[10px] text-white font-bold uppercase">
        <i class="fas fa-server text-blue-400 w-4"></i> 5GB Cloud Lab Space
    </li>
</ul>
          <button onclick="openPaymentModal('Student Node')" class="w-full py-5 bg-blue-600 rounded-xl text-[10px] font-black uppercase tracking-widest text-white hover:bg-white hover:text-black transition-all shadow-[0_0_30px_rgba(37,99,235,0.4)]">
    Upgrade 
</button>
        </div>

        <div class="pricing-card p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 flex flex-col hover:border-blue-500/40 transition-all duration-500 group relative overflow-hidden">
            <span class="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">Authority Node</span>
            <h3 class="text-3xl font-black italic uppercase text-white mb-6">Pro</h3>
            <div class="mb-8"><span id="proPrice" class="text-4xl font-black text-white">₦16,000</span> <span id="proPeriod" class="text-xs font-bold text-gray-600 uppercase">/ Month</span></div>
          <ul class="space-y-4 mb-12 flex-grow">
    <li class="flex items-center gap-3 text-[10px] text-gray-400 font-bold uppercase">
        <i class="fas fa-layer-group text-blue-500 w-4"></i> Unlimited Pro Courses
    </li>
    <li class="flex items-center gap-3 text-[10px] text-gray-400 font-bold uppercase">
        <i class="fas fa-microchip text-blue-500 w-4"></i> Nxxt AI Full Support
    </li>
    <li class="flex items-center gap-3 text-[10px] text-gray-400 font-bold uppercase">
        <i class="fas fa-network-wired text-blue-500 w-4"></i> Unlimited Team Feature
    </li>
    <li class="flex items-center gap-3 text-[10px] text-gray-400 font-bold uppercase">
        <i class="fas fa-hands-helping text-blue-500 w-4"></i> Unlimited Collaboration Feature
    </li>
    <li class="flex items-center gap-3 text-[10px] text-gray-400 font-bold uppercase">
        <i class="fas fa-rocket text-blue-500 w-4"></i> Unlimited Projects Feature
    </li>
    <li class="flex items-center gap-3 text-[10px] text-gray-400 font-bold uppercase">
        <i class="fas fa-user-tie text-blue-500 w-4"></i> Priority Job Placement
    </li>
    <li class="flex items-center gap-3 text-[10px] text-gray-400 font-bold uppercase">
        <i class="fas fa-chalkboard-teacher text-blue-500 w-4"></i> Private Mentor Access
    </li>
</ul>
           
           <button onclick="openPaymentModal('Authority Node')" class="w-full py-4 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-white hover:bg-white hover:text-black transition-all">
    Execute Mastery
</button>
        </div>
    </div>
</div>
`,

    'Settings': `
    <div class="animate-in">
        <div class="flex items-center gap-4 overflow-x-auto no-scrollbar pb-6 mb-8 border-b border-white/5 scroll-smooth">
            <button onclick="updateSettingsTab('Profile')" class="settings-tab active">Profile</button>
            <button onclick="updateSettingsTab('Security')" class="settings-tab">Security</button>
            <button onclick="updateSettingsTab('Projects')" class="settings-tab">Projects</button>
            <button onclick="updateSettingsTab('Billing')" class="settings-tab">Billing</button>
            <button onclick="updateSettingsTab('History')" class="settings-tab">Login History</button>
            <button onclick="updateSettingsTab('Notif-Settings')" class="settings-tab">Notifications</button>
        </div>

        <div id="settingsContent" class="content-card min-h-[400px]">
            <div class="space-y-8">
                <div class="flex items-center gap-6">
                    <div class="w-20 h-20 rounded-3xl bg-blue-600/20 border border-blue-500/20 flex items-center justify-center relative overflow-hidden">
                        <img src="Logo.webp" data-user-img class="w-full h-full object-cover">
                        <button onclick="updateSettingsTab('Profile')" class="absolute -bottom-2 -right-2 w-8 h-8 bg-blue-600 rounded-xl flex items-center justify-center text-[10px] border-4 border-[#020617] hover:bg-blue-500 transition-colors">
                            <i class="fas fa-camera"></i>
                        </button>
                    </div>
                    <div>
                        <h4 data-user-name class="text-xl font-black text-white italic uppercase leading-none">Loading...</h4>
                        <p data-user-email class="text-[9px] font-black text-blue-500 uppercase tracking-[0.2em] mt-2 italic">Loading...</p>
                        <p class="text-[9px] font-black text-gray-500 uppercase tracking-widest mt-1">Student ID: TLP-2025-001</p>
                    </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="space-y-2">
                        <label class="text-[9px] font-black text-gray-500 uppercase ml-2">Registered Name</label>
                        <input type="text" id="overviewName" data-user-name-input class="settings-input" readonly>
                    </div>
                    <div class="space-y-2">
                        <label class="text-[9px] font-black text-gray-500 uppercase ml-2">Email Address</label>
                        <input type="email" id="overviewEmail" data-user-email-input class="settings-input" readonly>
                    </div>
                </div>

                <div class="pt-4 border-t border-white/5">
                    <button onclick="updateSettingsTab('Profile')" class="text-[10px] font-black text-blue-500 uppercase tracking-widest hover:text-white transition-colors">
                        Edit Profile Details <i class="fas fa-arrow-right ml-2"></i>
                    </button>
                </div>
            </div>
        </div>
    </div>
`,
};

// ────────────────────────────────────────────────
// NEW: REAL PROFILE LOADING FROM SUPABASE (added here)
// This loads level, semester, xt_points, streak into Overview cards
// ────────────────────────────────────────────────

async function loadRealOverviewStats() {
    try {
        // 1. Get Supabase client (using your existing supabaseLoader)
        const supabase = window.supabaseLoader.getClient();

        // 2. Get current logged-in user
        const { data: { session } } = await supabase.auth.getSession();
        if (!session || !session.user) {
            console.warn("No active session — user not logged in");
            return;
        }

        // 3. Fetch profile data
        const { data: profile, error } = await supabase
            .from('profiles')
            .select('level, semester, xt_points, streak')
            .eq('id', session.user.id)
            .single();

        if (error) {
            console.warn("Profile fetch failed:", error.message);
            return;
        }

        if (!profile) {
            console.warn("No profile row found for this user");
            return;
        }

        // 4. Update the DOM elements (your exact IDs)
        const els = {
            level:   document.getElementById('dash-level-val'),
            semester: document.getElementById('semesterVal'),
            xp:      document.getElementById('dash-xp-val'),
            streak:  document.getElementById('streakCount')
        };

        if (els.level)   els.level.textContent   = profile.level   ?? '100';
        if (els.semester) els.semester.textContent = profile.semester ?? '1';
        if (els.xp)      els.xp.textContent      = profile.xt_points ?? '0';
        if (els.streak)  els.streak.textContent  = profile.streak  ?? '0';

        // Optional: subtle pulse animation on update
        Object.values(els).forEach(el => {
            if (el) {
                el.classList.add('animate-pulse');
                setTimeout(() => el.classList.remove('animate-pulse'), 1800);
            }
        });

    } catch (err) {
        console.error("Error loading real stats:", err);
    }
}

// ────────────────────────────────────────────────
// Call real stats loading when:
//   - Page loads (DOMContentLoaded)
//   - User switches to 'Overview' view
// ────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
    loadRealOverviewStats();
    // Your existing initial setup code...
    updateView('Overview');
    updateHeaderInfo();
    // ... any other DOMContentLoaded listeners you had
});

// Hook into your existing updateView function
const originalUpdateView = updateView;
updateView = function(viewName) {
    originalUpdateView(viewName);

    if (viewName === 'Overview') {
        loadRealOverviewStats();
    }
};

// SYSTEM LOGIC - DON'T CHANGE THIS PART
function updateView(viewName) {
    const title = document.getElementById('viewTitle');
    const container = document.getElementById('dynamicContent');

    container.style.opacity = '0';
    container.style.transform = 'translateY(10px)';

    setTimeout(() => {
        title.innerText = viewName;
        container.innerHTML = views[viewName] || `
            <div class="content-card text-center py-20">
                <i class="fas fa-tools text-4xl text-blue-500/20 mb-6"></i>
                <h3 class="text-2xl font-black text-white italic uppercase tracking-tighter">${viewName} Module</h3>
                <p class="text-gray-500 text-[10px] font-black uppercase tracking-widest mt-2">Under Development</p>
            </div>
        `;
        container.style.opacity = '1';
        container.style.transform = 'translateY(0px)';

        // Update sidebar and bottom nav active states
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.toggle('active', item.innerText.includes(viewName));
        });
    }, 200);
}
// Initial Setup
const d = new Date();
document.getElementById('currentDate').innerText = d.toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
});
updateView('Overview');
//// for the meun toggle
// Function to open the Mobile Menu
function openFullMenu() {
    const modal = document.getElementById('mobileMenu');
    const overlay = document.getElementById('menuOverlay');
    const drawer = document.getElementById('menuDrawer');
    const mobileNav = document.getElementById('mobileNavLinks');
    const desktopNav = document.querySelector('#sidebar nav').innerHTML;
    // 1. Copy desktop links to mobile drawer if empty
    mobileNav.innerHTML = desktopNav;
    // 2. Show the modal
    modal.classList.remove('invisible');
    setTimeout(() => {
        overlay.classList.add('opacity-100');
        drawer.classList.add('translate-x-0');
    }, 10);
    // 3. Make sure links inside mobile menu also close the menu when clicked
    const links = mobileNav.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            // Give it a small delay so the user sees the click before closing
            setTimeout(closeFullMenu, 300);
        });
    });
}
// Function to close the Mobile Menu
function closeFullMenu() {
    const modal = document.getElementById('mobileMenu');
    const overlay = document.getElementById('menuOverlay');
    const drawer = document.getElementById('menuDrawer');
    overlay.classList.remove('opacity-100');
    drawer.classList.remove('translate-x-0');

    setTimeout(() => {
        modal.classList.add('invisible');
    }, 300);
}
// Close menu if clicking the overlay
document.getElementById('menuOverlay').addEventListener('click', closeFullMenu);
///// for the date and time
function updateHeaderInfo() {
    const greetingElement = document.getElementById('greetingText');
    const dateElement = document.getElementById('currentDate');
    const now = new Date();
    const hours = now.getHours();

    // Determine Greeting
    let greeting = "Good Night";
    if (hours < 12) greeting = "Good Morning";
    else if (hours < 17) greeting = "Good Afternoon";
    else if (hours < 21) greeting = "Good Evening";

    greetingElement.innerText = `${greeting}, New User`;
    // Update Date
    dateElement.innerText = now.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });
}
// 3. Run on load
updateHeaderInfo();
// Optional: Update every minute to keep greeting accurate
setInterval(updateHeaderInfo, 60000);
//// for the settings tabs
function updateSettingsTab(tabId) {
    let tabName = tabId; // <-- FIXED: declared with let

    const container = document.getElementById('settingsContent');

    // Update active tab button style
    document.querySelectorAll('.settings-tab').forEach(btn => {
        // This ensures the button stays blue when clicked
        const btnText = btn.innerText.toLowerCase().replace(/\s/g, '');
        const target = tabName.toLowerCase().replace('notif-settings', 'notifications');
        btn.classList.toggle('active', btnText.includes(target) || target.includes(btnText));
    });
    const tabs = {
        'Profile': `
    <div class="space-y-8 animate-in">
        <div class="flex items-center gap-6 mb-8">
            <div class="relative">
                <div class="w-24 h-24 rounded-3xl bg-blue-600/20 border-2 border-blue-500/20 flex items-center justify-center overflow-hidden">
                    <img src="Logo.webp" data-user-img class="w-full h-full object-cover hidden">
                    <i id="defaultUserIcon" class="fas fa-user text-5xl text-blue-500/50"></i>
                </div>
                <div onclick="triggerImageUpload()" class="absolute -bottom-2 -right-2 bg-blue-600 w-8 h-8 rounded-xl flex items-center justify-center border-4 border-[#020617] cursor-pointer hover:bg-blue-500 transition-all">
                    <i class="fas fa-camera text-[10px]"></i>
                </div>
            </div>
            <div>
                <h3 data-user-name class="text-2xl font-black text-white italic uppercase leading-none">Loading...</h3>
                <p class="text-[10px] font-black text-blue-500 uppercase tracking-widest mt-2">Level: Beginner</p>
            </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-2">
                <label class="text-[9px] font-black text-gray-500 uppercase ml-2">Full Name</label>
                <input type="text" id="editFullName" class="settings-input">
            </div>
            <div class="space-y-2">
                <label class="text-[9px] font-black text-gray-500 uppercase ml-2">Email</label>
                <input type="email" id="editEmail" class="settings-input" readonly>
            </div>
            <div class="space-y-2 md:col-span-2">
                <label class="text-[9px] font-black text-gray-500 uppercase ml-2">Bio</label>
                <textarea id="editBio" class="settings-input min-h-[100px] py-4" placeholder="Tell us about your coding journey..."></textarea>
            </div>
        </div>
        <button onclick="saveProfile()" class="w-full md:w-auto px-12 py-4 bg-blue-600 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-700 transition-all">
            Save Profile
        </button>
    </div>
`,
        'Security': `
            <div class="space-y-8 animate-in">
                <h3 class="text-xl font-black text-white italic uppercase tracking-tighter">Security Credentials</h3>
                <div class="grid grid-cols-1 gap-6">
                    <div class="space-y-2">
                        <label class="text-[9px] font-black text-gray-500 uppercase ml-2">Current Password</label>
                        <input type="password" placeholder="••••••••••••" class="settings-input">
                    </div>
                    <div class="space-y-2">
                        <label class="text-[9px] font-black text-gray-500 uppercase ml-2">New Password</label>
                        <input type="password" placeholder="Enter new password" class="settings-input">
                    </div>
                </div>
                <div class="p-4 bg-orange-500/5 border border-orange-500/10 rounded-2xl flex items-start gap-4">
                    <i class="fas fa-shield-alt text-orange-500 mt-1"></i>
                    <p class="text-[10px] text-gray-400 font-bold leading-relaxed uppercase">Pro Tip: Use a password with at least 12 characters and a mix of symbols to secure your Account.</p>
                </div>
                <button class="w-full md:w-auto px-12 py-4 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest">Update Security</button>
            </div>`,
        
'Projects': `
<div class="max-w-4xl mx-auto p-4">
        <h2 class="text-white font-black text-2xl uppercase mb-8">Management</h2>
        <div id="settingsProjectList" class="space-y-4">
            </div>
    </div>
`,

        'Billing': `
    <div class="space-y-8 animate-in">
        <div class="content-card bg-blue-600/5 border-blue-500/10 text-center py-10">
            <i class="fas fa-gem text-4xl text-blue-500 mb-4"></i>
            <h3 class="text-xl font-black text-white italic uppercase tracking-tighter">Subscription Plan</h3>
            <p class="text-[10px] text-gray-500 font-black uppercase tracking-[0.2em] mb-6">
                Current Status: <span class="text-white">Free Student</span>
            </p>
            <button onclick="updateView('Pricing')" class="px-10 py-4 bg-blue-600 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-700 transition-all">
                Upgrade to Pro
            </button>
        </div>
        <div class="space-y-4">
            <h3 class="text-xl font-black text-white italic uppercase tracking-tighter">Billing History</h3>
            
            <div class="overflow-x-auto">
                <table class="w-full text-left border-separate border-spacing-y-2">
                    <thead>
                        <tr class="text-[8px] font-black text-gray-600 uppercase tracking-widest">
                            <th class="px-4 py-2">Invoice</th>
                            <th class="px-4 py-2">Date</th>
                            <th class="px-4 py-2">Amount</th>
                            <th class="px-4 py-2">Status</th>
                            <th class="px-4 py-2 text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colspan="5" class="py-20 bg-white/5 rounded-2xl text-center border border-dashed border-white/10">
                                <i class="fas fa-file-invoice-dollar text-3xl text-gray-800 mb-4 block"></i>
                                <h4 class="text-[11px] font-black text-gray-600 uppercase tracking-[0.2em] italic">No Transaction Records</h4>
                                <p class="text-[9px] text-gray-700 font-bold uppercase mt-2">Your billing history is currently empty.</p>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="p-6 bg-[#030816] border border-white/5 rounded-2xl flex items-center justify-between opacity-50">
            <div class="flex items-center gap-4">
                <div class="w-12 h-8 bg-white/5 rounded border border-white/10 flex items-center justify-center">
                    <i class="fas fa-credit-card text-gray-600"></i>
                </div>
                <div>
                    <p class="text-[10px] font-black text-white uppercase italic">No Payment Method Linked</p>
                    <p class="text-[8px] text-gray-600 font-bold uppercase mt-1">Add a card to enable pro features</p>
                </div>
            </div>
            <button class="text-[8px] font-black text-blue-500 uppercase tracking-widest">Add Card</button>
        </div>
    </div>
`,
        'History': `
    <div class="space-y-8 animate-in">
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
                <h3 class="text-xl font-black text-white italic uppercase tracking-tighter">Login History</h3>
                <p class="text-[9px] text-gray-500 font-bold uppercase tracking-widest mt-1">Monitor your account security and active sessions</p>
            </div>
            <div class="px-4 py-2 bg-blue-600/5 border border-blue-500/10 rounded-xl text-right">
                <p class="text-[8px] font-black text-blue-500 uppercase tracking-widest">System Live Time</p>
                <p id="liveHistoryClock" class="text-[10px] text-white font-black uppercase italic mt-1">Loading...</p>
            </div>
        </div>
        <div class="border-2 border-dashed border-white/5 rounded-[2rem] py-20 flex flex-col items-center justify-center text-center">
            <div class="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-6">
                <i class="fas fa-shield-virus text-2xl text-gray-800"></i>
            </div>
            <h4 class="text-white font-black uppercase italic tracking-tighter text-lg">No Session Records</h4>
            <p class="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-2 max-w-[280px] leading-relaxed">
                Security logs are currently clear. Your login activity will appear here once the system validates your next session.
            </p>
        </div>
        <div class="p-6 bg-[#030816] border border-white/5 rounded-2xl">
            <div class="flex items-center gap-4 text-orange-500 mb-2">
                <i class="fas fa-exclamation-triangle text-xs"></i>
                <p class="text-[10px] font-black uppercase">Security Protocol</p>
            </div>
            <p class="text-[9px] text-gray-500 font-bold uppercase leading-relaxed">
                T Learn Pro tracks IP addresses and device fingerprints to protect your Xt Pay wallet from unauthorized access.
                If you see a login you don't recognize, terminate it immediately.
            </p>
        </div>
    </div>
`,
        'Notif-Settings': `
    <div class="space-y-8 animate-in">
        <div>
            <h3 class="text-xl font-black text-white italic uppercase tracking-tighter">Notifications Control</h3>
            <p class="text-[9px] text-gray-500 font-bold uppercase tracking-widest mt-1">Configure how the system communicates with you</p>
        </div>
        <div class="space-y-4">
            <div class="flex items-center justify-between p-6 bg-white/5 border border-white/5 rounded-2xl">
                <div>
                    <span class="text-[10px] font-black text-white uppercase block">Email Course Updates</span>
                    <span class="text-[8px] text-gray-600 font-bold uppercase mt-1">Receive curriculum changes via mail</span>
                </div>
                <button onclick="toggleSwitch('emailNotif')" id="emailNotif" class="toggle-switch">
                    <div class="toggle-dot"></div>
                </button>
            </div>
            <div class="flex items-center justify-between p-6 bg-white/5 border border-white/5 rounded-2xl">
                <div>
                    <span class="text-[10px] font-black text-white uppercase block">Collaboration Alerts</span>
                    <span class="text-[8px] text-gray-600 font-bold uppercase mt-1">Notifications for team invites</span>
                </div>
                <button onclick="toggleSwitch('collabNotif')" id="collabNotif" class="toggle-switch">
                    <div class="toggle-dot"></div>
                </button>
            </div>
            <div class="flex items-center justify-between p-6 bg-white/5 border border-white/5 rounded-2xl">
                <div>
                    <span class="text-[10px] font-black text-white uppercase block">Security & Login Alerts</span>
                    <span class="text-[8px] text-gray-600 font-bold uppercase mt-1">Critical alerts for your account</span>
                </div>
                <button onclick="toggleSwitch('securityNotif')" id="securityNotif" class="toggle-switch">
                    <div class="toggle-dot"></div>
                </button>
            </div>
        </div>
    </div>
`
    };
    container.innerHTML = tabs[tabName] || `<div class="py-20 text-center text-gray-500 font-black uppercase text-[10px] tracking-[0.2em] italic">${tabName} module is under construction</div>`;
    // FIXED: Load toggle states when opening Notif-Settings
    if (tabName === 'Notif-Settings') {
        setTimeout(loadToggleStates, 50);
    }
}
//// for the login history
// Add this to your general script to handle the clock in the history tab
function startHistoryClock() {
    const clockElement = document.getElementById('liveHistoryClock');
    if (clockElement) {
        const now = new Date();
        clockElement.innerText = now.toLocaleString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true,
            day: 'numeric',
            month: 'short'
        });
    }
}
// Update clock every second
setInterval(startHistoryClock, 1000);
/// for the notification toggles
// Function to handle toggles and save to LocalStorage
function toggleSwitch(id) {
    const btn = document.getElementById(id);
    const isOff = !btn.classList.contains('on');

    if (isOff) {
        btn.classList.add('on');
        localStorage.setItem(id, 'true');
    } else {
        btn.classList.remove('on');
        localStorage.setItem(id, 'false');
    }
}
// Function to load the saved states whenever the Settings tab is opened
function loadToggleStates() {
    const toggles = ['emailNotif', 'collabNotif', 'securityNotif'];
    toggles.forEach(id => {
        const btn = document.getElementById(id);
        if (btn) {
            const savedState = localStorage.getItem(id);
            if (savedState === 'true') {
                btn.classList.add('on');
            } else {
                btn.classList.remove('on');
            }
        }
    });
}
//// for the sync function
async function saveProfile() {
    const client = await getClient();
    const fullName = document.getElementById('editFullName').value.trim();
    const { error } = await client.auth.updateUser({
        data: { full_name: fullName }
    });
    if (error) {
        alert('Update failed: ' + error.message);
    } else {
        alert('Profile saved!');
        loadProfileData(); // refresh display
    }
}

// FIXED: Update user name after login (from auth.js)
async function updateUserDisplay() {
    const client = await loadSupabase();
    const { data: { user } } = await client.auth.getUser();

    if (user) {
        const fullName = user.user_metadata?.full_name || user.email.split('@')[0];
        document.querySelectorAll('[data-user-name]').forEach(el => {
            el.textContent = fullName;
        });
    }
}

// Call updateUserDisplay on page load and after login
document.addEventListener('DOMContentLoaded', ()
