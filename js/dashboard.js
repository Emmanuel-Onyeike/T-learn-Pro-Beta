
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
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 md:gap-6 animate-in">
    <div class="bg-[#050b1d] border border-white/5 p-6 rounded-[2rem] relative overflow-hidden group hover:border-blue-500/30 transition-all">
        <div class="flex items-center gap-4 relative z-10">
            <div class="w-12 h-12 bg-blue-600/10 rounded-2xl flex items-center justify-center border border-blue-500/20">
                <i class="fas fa-code-branch text-blue-500"></i>
            </div>
            <div>
                <p class="text-[10px] font-black text-gray-500 uppercase tracking-widest">Projects</p>
                <h3 id="projectCount" class="text-3xl font-black text-white mt-1">0</h3>
            </div>
        </div>
        <i class="fas fa-project-diagram absolute -bottom-4 -right-4 text-white/[0.02] text-8xl rotate-12 group-hover:text-blue-500/[0.05] transition-all"></i>
    </div>

        <div class="bg-[#050b1d] border border-white/5 p-6 rounded-[2rem] relative overflow-hidden group hover:border-purple-500/30 transition-all">
            <div class="flex items-center gap-4 relative z-10">
                <div class="w-12 h-12 bg-purple-600/10 rounded-2xl flex items-center justify-center border border-purple-500/20">
                    <i class="fas fa-hands-helping text-purple-500"></i>
                </div>
                <div>
                    <p class="text-[10px] font-black text-gray-500 uppercase tracking-widest">Collabs</p>
                    <h3 class="text-3xl font-black text-white mt-1">0</h3>
                </div>
            </div>
            <i class="fas fa-users-cog absolute -bottom-4 -right-4 text-white/[0.02] text-8xl rotate-12 group-hover:text-purple-500/[0.05] transition-all"></i>
        </div>

     <div class="bg-[#050b1d] border border-white/5 p-6 rounded-[2rem] relative overflow-hidden group hover:border-green-500/30 transition-all">
    <div class="flex items-center gap-4 relative z-10">
        <div class="w-12 h-12 bg-green-600/10 rounded-2xl flex items-center justify-center border border-green-500/20">
            <i class="fas fa-layer-group text-green-500"></i>
        </div>
        <div>
            <p class="text-[10px] font-black text-gray-500 uppercase tracking-widest">Level</p>
            <h3 id="dash-level-val" class="text-3xl font-black text-white mt-1">000</h3>
        </div>
    </div>
    <i class="fas fa-chart-line absolute -bottom-4 -right-4 text-white/[0.02] text-8xl rotate-12 group-hover:text-green-500/[0.05] transition-all"></i>
</div>

<div class="bg-[#050b1d] border border-white/5 p-6 rounded-[2rem] relative overflow-hidden group hover:border-orange-500/30 transition-all">
    <div id="rank-glow" class="absolute inset-0 bg-yellow-500/0 transition-all duration-700"></div>

    <div class="flex items-center gap-4 relative z-10">
        <div class="w-12 h-12 bg-orange-600/10 rounded-2xl flex items-center justify-center border border-orange-500/20 group-hover:border-orange-500/50 transition-all">
            <i class="fas fa-medal text-orange-500"></i>
        </div>
        
        <div>
            <div class="flex items-center gap-2">
                <p class="text-[10px] font-black text-gray-500 uppercase tracking-widest">Current Rank</p>
                <span class="w-1 h-1 rounded-full bg-orange-500 animate-pulse"></span>
            </div>
            
            <h3 id="ui-rank" class="text-3xl font-black text-white mt-1 italic tracking-tighter">
                #100
            </h3>
        </div>
    </div>

    <i id="rank-crown-icon" class="fas fa-crown absolute -bottom-4 -right-4 text-white/[0.02] text-8xl rotate-12 group-hover:rotate-0 group-hover:text-orange-500/[0.08] transition-all duration-500"></i>
</div>
        
        <div class="bg-[#050b1d] border border-white/5 p-6 rounded-[2rem] relative overflow-hidden group hover:border-blue-400/30 transition-all">
    <div class="flex items-center gap-4 relative z-10">
        <div class="w-12 h-12 bg-blue-400/10 rounded-2xl flex items-center justify-center border border-blue-400/20">
            <i class="fas fa-graduation-cap text-blue-400"></i>
        </div>
        <div>
            <p class="text-[10px] font-black text-gray-500 uppercase tracking-widest">Semester</p>
            <h3 id="dash-semester-val" class="text-3xl font-black text-white mt-1">0</h3>
        </div>
    </div>
    <i class="fas fa-graduation-cap absolute -bottom-4 -right-4 text-white/[0.02] text-8xl rotate-12 group-hover:text-blue-400/[0.05] transition-all"></i>
</div>


<div class="bg-[#050b1d] border border-white/5 p-6 rounded-[2rem] relative overflow-hidden group hover:border-red-500/30 transition-all">
    <div class="flex items-center gap-4 relative z-10">
        <div class="w-12 h-12 bg-red-600/10 rounded-2xl flex items-center justify-center border border-red-500/20">
            <i class="fas fa-fire text-red-500"></i>
        </div>
        <div>
            <p class="text-[10px] font-black text-gray-500 uppercase tracking-widest">Streaks</p>
            <h3 id="ui-streak" class="text-3xl font-black text-white mt-1">0</h3>
        </div>
    </div>
    <i class="fas fa-fire-alt absolute -bottom-4 -right-4 text-white/[0.02] text-8xl rotate-12 group-hover:text-red-500/[0.05] transition-all"></i>
</div>
</div>



<div class="mt-8 bg-[#050b1d] border border-white/5 p-8 rounded-[2.5rem] relative overflow-hidden">
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
            <h3 class="text-lg font-black text-white italic uppercase tracking-tighter">Activity</h3>
            <p class="text-[9px] text-gray-500 font-bold uppercase tracking-widest mt-1">Tracking session</p>

        </div>
        <div class="flex gap-2 flex-wrap">
            <button class="px-4 py-2 bg-gray-800 rounded-lg text-[9px] font-black uppercase tracking-widest text-white shadow-lg shadow-gray-800/20">2025</button>
            <button class="px-4 py-2 bg-blue-600 rounded-lg text-[9px] font-black uppercase tracking-widest text-white shadow-lg shadow-blue-600/20">2026</button>

        </div>
    </div>
    <div class="overflow-x-auto pb-4 no-scrollbar">
        <div class="inline-grid grid-rows-7 grid-flow-col gap-1.5 min-w-[850px]">
            <!-- 2026 Activity Grid (365 days starting Jan 1, 2026) -->
            <!-- Example with very light early activity + mostly empty for future days -->
            <div class="w-3 h-3 rounded-sm bg-white/[0.03] transition-all duration-500 cursor-pointer" title="2026-01-01"></div>
            <div class="w-3 h-3 rounded-sm bg-green-900 transition-all duration-500 cursor-pointer" title="2026-01-02"></div>
            <div class="w-3 h-3 rounded-sm bg-green-900 transition-all duration-500 cursor-pointer" title="2026-01-03"></div>
            <!-- The rest of the year continues with mostly low/no activity yet -->
            <div class="w-3 h-3 rounded-sm bg-white/[0.03] transition-all duration-500 cursor-pointer" title="2026-01-04"></div>
            <div class="w-3 h-3 rounded-sm bg-white/[0.03] transition-all duration-500 cursor-pointer" title="2026-01-05"></div>
            <!-- ... (repeat pattern for all 365 days, thickening based on real future engagement) ... -->
            <!-- Placeholder for the remaining ~360 boxes (they would be generated dynamically) -->
            ${(() => {
                let boxes = '';
                for (let i = 3; i < 365; i++) {
                    // Most future days = no activity yet
                    const thickness = 'bg-white/[0.03]';
                    const d = new Date(2026, 0, i + 1);
                    const dateStr = d.toISOString().split('T')[0];
                    boxes += `<div class="w-3 h-3 rounded-sm ${thickness} transition-all duration-500 cursor-pointer" title="${dateStr}"></div>`;
                }
                return boxes;
            })()}

        </div>
    </div>
    <div class="flex justify-between items-center mt-4">
        <p class="text-[8px] text-gray-600 font-bold uppercase tracking-widest italic">Density increases with page engagement time</p>
        <div class="flex items-center gap-2">
            <span class="text-[8px] text-gray-600 font-bold uppercase tracking-widest">Low</span>
            <div class="flex gap-1">
                <div class="w-2.5 h-2.5 rounded-sm bg-white/[0.03]"></div>
                <div class="w-2.5 h-2.5 rounded-sm bg-green-900"></div>
                <div class="w-2.5 h-2.5 rounded-sm bg-green-700"></div>
                <div class="w-2.5 h-2.5 rounded-sm bg-green-500"></div>
                <div class="w-2.5 h-2.5 rounded-sm bg-green-400"></div>
            </div>
            <span class="text-[8px] text-gray-600 font-bold uppercase tracking-widest">NXXT</span>
        </div>

    </div>
</div>





    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mt-8">
        <div class="bg-[#050b1d] border border-white/5 p-6 rounded-[2rem] relative overflow-hidden group hover:border-emerald-500/30 transition-all">
            <div class="flex items-center gap-4 relative z-10">
                <div class="w-12 h-12 bg-emerald-600/10 rounded-2xl flex items-center justify-center border border-emerald-500/20">
                    <i class="fas fa-briefcase text-emerald-500"></i>
                </div>
                <div>
                    <p class="text-[10px] font-black text-gray-500 uppercase tracking-widest">Active Jobs</p>
                    <h3 class="text-3xl font-black text-white mt-1">0</h3>
                </div>
            </div>
            <i class="fas fa-search-dollar absolute -bottom-4 -right-4 text-white/[0.02] text-8xl rotate-12 group-hover:text-emerald-500/[0.05] transition-all"></i>
        </div>
<div class="bg-[#050b1d] border border-white/5 p-6 rounded-[2rem] relative overflow-hidden group hover:border-yellow-500/30 transition-all">
    <div class="flex items-center gap-4 relative z-10">
        <div class="w-12 h-12 bg-yellow-600/10 rounded-2xl flex items-center justify-center border border-yellow-500/20">
            <i class="fas fa-star text-yellow-500"></i>
        </div>
        <div>
            <p class="text-[10px] font-black text-gray-500 uppercase tracking-widest">XT Points</p>
            <h3 class="text-3xl font-black text-white mt-1">
                <span id="dash-xp-val">0</span> 
                <span class="text-xs text-yellow-500/50 uppercase">XP</span>
            </h3>
        </div>
    </div>
    <i class="fas fa-trophy absolute -bottom-4 -right-4 text-white/[0.02] text-8xl rotate-12 group-hover:text-yellow-500/[0.05] transition-all"></i>
</div>

        <div class="bg-[#050b1d] border border-white/5 p-6 rounded-[2rem] relative overflow-hidden group hover:border-indigo-500/30 transition-all">
            <div class="flex items-center gap-4 relative z-10">
                <div class="w-12 h-12 bg-indigo-600/10 rounded-2xl flex items-center justify-center border border-indigo-500/20">
                    <i class="fas fa-cloud-upload-alt text-indigo-500"></i>
                </div>
                <div>
                    <p class="text-[10px] font-black text-gray-500 uppercase tracking-widest">Cloud Deploys</p>
                    <h3 class="text-3xl font-black text-white mt-1">0</h3>
                </div>
            </div>
            <i class="fas fa-server absolute -bottom-4 -right-4 text-white/[0.02] text-8xl rotate-12 group-hover:text-indigo-500/[0.05] transition-all"></i>
        </div>
    </div>
`,



    'Lessons': `
    <div class="space-y-6 animate-in">
        <div class="flex justify-center mb-8">
            <div class="bg-[#050b1d] border border-white/5 p-2 rounded-2xl flex gap-1 overflow-x-auto no-scrollbar">
                ${['Courses', 'Exam', 'Result', 'Semester', 'Analytics'].map(tab => `
                    <button onclick="switchLessonSubTab('${tab}')" 
                        class="lesson-nav-btn px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all
                        ${tab === 'Courses' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-gray-500 hover:text-white hover:bg-white/5'}">
                        ${tab}
                    </button>
                `).join('')}
            </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div class="bg-[#050b1d] border border-white/5 p-6 rounded-[2rem] relative overflow-hidden group hover:border-green-500/30 transition-all">
                <div class="flex items-center gap-4 relative z-10">
                    <div class="w-12 h-12 bg-green-600/10 rounded-2xl flex items-center justify-center border border-green-500/20">
                        <i class="fas fa-layer-group text-green-500"></i>
                    </div>
                    <div>
                        <p class="text-[10px] font-black text-gray-500 uppercase tracking-widest">Level</p>
                        <h3 id="lesson-level-val" class="text-3xl font-black text-white mt-1">000</h3>
                    </div>
                </div>
                <i class="fas fa-chart-line absolute -bottom-4 -right-4 text-white/[0.02] text-8xl rotate-12 group-hover:text-green-500/[0.05] transition-all"></i>
            </div>

            <div class="bg-[#050b1d] border border-white/5 p-6 rounded-[2rem] relative overflow-hidden group hover:border-blue-400/30 transition-all">
                <div class="flex items-center gap-4 relative z-10">
                    <div class="w-12 h-12 bg-blue-400/10 rounded-2xl flex items-center justify-center border border-blue-400/20">
                        <i class="fas fa-graduation-cap text-blue-400"></i>
                    </div>
                    <div>
                        <p class="text-[10px] font-black text-gray-500 uppercase tracking-widest">Semester</p>
                        <h3 id="lesson-semester-val" class="text-3xl font-black text-white mt-1">0</h3>
                    </div>
                </div>
                <i class="fas fa-graduation-cap absolute -bottom-4 -right-4 text-white/[0.02] text-8xl rotate-12 group-hover:text-blue-400/[0.05] transition-all"></i>
            </div>
        </div>

        <div id="lesson-sub-content">
            <div class="bg-[#050b1d] border border-white/5 p-8 rounded-[2.5rem] text-center">
                <h3 class="text-xl font-black text-white uppercase tracking-tighter mb-4 italic">Ready to advance?</h3>
                <p class="text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-6">Begin your beginner course to unlock HTML, CSS, and more.</p>
                <button onclick="startBeginnerCourse()" class="px-10 py-4 bg-white text-black rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] hover:bg-blue-500 hover:text-white transition-all">
                    Begin Course
                </button>
            </div>
        </div>
    </div>
`,


'Projects': `
<div class="space-y-12 animate-in pb-32 px-4 md:px-8">
    <div class="space-y-2">
        <div class="flex items-center gap-4">
            <div class="w-2 h-2 bg-blue-500 rounded-full animate-pulse shadow-[0_0_10px_#3b82f6]"></div>
            <span class="text-[10px] text-blue-400 font-black uppercase tracking-[0.5em]">What projects are you doing today?</span>
        </div>
        <h3 class="text-4xl md:text-5xl font-black italic uppercase tracking-tighter text-white"> <span class="text-blue-500">Porjects</span></h3>
    </div>

    <div class="relative w-full group">
        <div class="flex items-center bg-[#050b1d] border border-white/10 rounded-2xl h-16 px-6 transition-all focus-within:border-blue-500/50">
            <i class="fas fa-search text-gray-600 mr-4"></i>
            <input type="text" id="projectSearch" placeholder="SEARCH PROJECTS ..." 
                class="flex-1 bg-transparent border-none text-[11px] font-black uppercase tracking-[0.2em] text-white focus:outline-none">
            
            <button onclick="openProjectNamingModal()" 
                class="group flex items-center bg-blue-600 hover:bg-blue-500 text-[#020617] rounded-xl h-10 px-4 transition-all duration-500 ease-in-out max-w-[40px] hover:max-w-[220px] overflow-hidden whitespace-nowrap shadow-lg">
                <i class="fas fa-plus transition-transform group-hover:rotate-90"></i>
                <span class="ml-3 text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300">Initialize New Project</span>
            </button>
        </div>
    </div>

    <div id="projectContainer">
        <div id="emptyProjectState" class="border-2 border-dashed border-white/5 rounded-[3.5rem] py-24 flex flex-col items-center justify-center text-center bg-white/[0.01]">
             <div class="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center mb-6 border border-white/5">
                <i class="fas fa-folder-plus text-gray-700 text-3xl"></i>
            </div>
            <h4 class="text-white font-black uppercase italic tracking-tighter text-2xl">No Projects done</h4>
            <p class="text-[10px] text-gray-500 font-bold uppercase tracking-[0.3em] mt-3 mb-10">System standby. Awaiting first deployment.</p>
            <button onclick="openProjectNamingModal()" class="px-8 py-4 bg-blue-600 text-[#020617] text-[10px] font-black uppercase tracking-widest rounded-2xl hover:bg-blue-400 transition-all shadow-xl shadow-blue-500/10">
                Create First Project
            </button>
        </div>

        <div id="projectGrid" class="hidden grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            </div>
    </div>
</div>
`,
    

    

'Leaderboard': `
    <div class="space-y-10 animate-in">
        <div class="space-y-4">
            <div class="flex items-center gap-3 ml-2">
                <i class="fas fa-trophy text-yellow-500 text-sm"></i>
                <h3 class="text-white font-black uppercase italic tracking-tighter">Top Performers</h3>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-5 gap-4" id="top-five-grid">
                <div id="spotlight-rank-1" class="relative p-6 rounded-[2.5rem] bg-[#0a1025] border border-yellow-500/30 text-center group transition-all duration-500">
                    <div class="absolute top-4 left-4 bg-yellow-500 text-black text-[9px] font-black px-2 py-0.5 rounded-full">#1</div>
                    <div class="absolute top-4 right-4"><i class="fas fa-star text-yellow-500 animate-pulse"></i></div>
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Emmanuel" class="w-20 h-20 rounded-full mx-auto mb-4 border-2 border-yellow-500 shadow-lg shadow-yellow-500/20">
                    <h4 class="text-white font-black italic uppercase text-xs">Unknown</h4>
                    <div class="mt-4 bg-black/40 rounded-2xl py-3 border border-white/5">
                         <p id="top-pts-1" class="text-xl font-black text-white italic tracking-tighter">0</p>
                         <p class="text-[7px] text-gray-500 uppercase font-bold tracking-widest">Points</p>
                    </div>
                </div>
                ${[2,3,4,5].map(i => `
                <div class="relative p-6 rounded-[2.5rem] bg-white/[0.02] border border-white/5 text-center opacity-40">
                    <div class="absolute top-4 left-4 text-[9px] font-black text-gray-500">#${i}</div>
                    <div class="w-16 h-16 rounded-full mx-auto mb-4 bg-white/5 flex items-center justify-center border border-dashed border-white/10 italic text-gray-700 text-[10px]">Node_${i}</div>
                    <h4 class="text-gray-500 font-bold uppercase text-[10px]">Nxxt_Rival</h4>
                    <div class="mt-4 bg-black/20 rounded-2xl py-2"><p class="text-gray-600 font-black italic">--</p></div>
                </div>`).join('')}
            </div>
        </div>

        <div class="space-y-4">
            <div class="flex items-center gap-3 ml-2">
                <i class="fas fa-list-ol text-blue-500 text-sm"></i>
                <h3 class="text-white font-black uppercase italic tracking-tighter text-sm">Full Rankings</h3>
            </div>
            <div class="space-y-2" id="full-rankings-list">
                <div class="flex items-center justify-between p-4 bg-white/[0.03] border border-white/5 rounded-2xl group hover:border-blue-500/30 transition-all">
                    <div class="flex items-center gap-4">
                        <div class="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-[10px] font-black text-blue-500 italic" id="lb-list-rank">#--</div>
                        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Emmanuel" class="w-8 h-8 rounded-full border border-white/10">
                        <p class="text-xs font-black text-white uppercase italic">Emmanuel <i class="fas fa-check-circle text-[10px] text-blue-500 ml-1"></i></p>
                    </div>
                    <div class="flex gap-8 items-center">
                         <div class="text-right">
                            <p id="lb-list-points" class="text-white font-black italic tracking-tighter text-sm">0</p>
                            <p class="text-[7px] text-gray-600 font-bold uppercase tracking-widest">GND Pts</p>
                         </div>
                         <i class="fas fa-chevron-right text-gray-800 text-[8px]"></i>
                    </div>
                </div>
                <div class="flex items-center justify-between p-4 bg-white/[0.01] border border-white/5 rounded-2xl opacity-30">
                    <div class="flex items-center gap-4">
                        <div class="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-[10px] font-black text-gray-600 italic">#--</div>
                        <div class="w-8 h-8 rounded-full bg-white/5"></div>
                        <p class="text-xs font-bold text-gray-600 uppercase">Nxxt_Alpha_Node</p>
                    </div>
                    <p class="text-gray-700 font-black italic text-sm">--</p>
                </div>
            </div>
        </div>
    </div>
`,
    


 'Collaboration': `
<div class="space-y-6 animate-in fade-in duration-500 pb-24">
    <div class="flex flex-col gap-6">
        <div>
            <h3 class="text-xl font-black text-white italic uppercase tracking-tighter">Neural Collaboration</h3>
            <p class="text-[9px] text-gray-500 font-bold uppercase tracking-widest mt-1">Peer-to-Peer Project Uplinks</p>
        </div>
        
        <div class="flex gap-2 p-1 bg-white/5 border border-white/10 rounded-2xl w-fit">
            <button onclick="switchCollabTab('create')" id="tab-create" class="px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all bg-cyan-600 text-black">Create Request</button>
            <button onclick="switchCollabTab('join')" id="tab-join" class="px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all text-gray-500 hover:text-white">Join</button>
        </div>
    </div>

    <div id="collab-create-content" class="space-y-4">
        <div class="border border-dashed border-white/10 rounded-[2.5rem] p-12 text-center bg-white/[0.01]">
            <i class="fas fa-layer-group text-gray-800 text-3xl mb-4"></i>
            <p class="text-gray-500 text-[10px] font-black uppercase tracking-[0.2em]">Tap the [+] to initialize a new collab stream</p>
        </div>
    </div>

    <div id="collab-join-content" class="hidden grid grid-cols-1 md:grid-cols-2 gap-4">
        </div>

    <button id="collabFAB" onclick="openCollabNamingModal()" class="fixed bottom-8 right-8 w-16 h-16 bg-cyan-600 text-black rounded-2xl shadow-[0_0_30px_rgba(8,145,178,0.3)] flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-[90]">
        <i class="fas fa-plus text-xl"></i>
    </button>
</div>`,

    
    

    'Team': `
    <div class="space-y-8 animate-in">
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
                <h3 class="text-xl font-black text-white italic uppercase tracking-tighter">Your Squad</h3>
                <p class="text-[9px] text-gray-500 font-bold uppercase tracking-widest mt-1">Manage team roles and performance</p>
            </div>
            <div class="px-4 py-2 bg-blue-500/5 border border-blue-500/20 rounded-xl">
                 <p class="text-[8px] font-black text-blue-500 uppercase tracking-widest italic">Recruitment Office Closed</p>
            </div>
        </div>

        <div class="border-2 border-dashed border-white/5 rounded-[3rem] py-24 flex flex-col items-center justify-center text-center bg-white/[0.01] relative overflow-hidden">
            <div class="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/5 via-transparent to-transparent"></div>
            
            <div class="relative z-10">
                <div class="w-24 h-24 bg-white/5 rounded-[2rem] flex items-center justify-center mb-8 mx-auto border border-white/5 shadow-2xl">
                    <i class="fas fa-users-cog text-4xl text-gray-800 animate-spin-slow"></i>
                </div>
                <h4 class="text-white font-black uppercase italic tracking-tighter text-2xl">Team Module Under Construction</h4>
                <p class="text-[10px] text-gray-500 font-bold uppercase tracking-[0.3em] mt-3 max-w-[320px] mx-auto leading-relaxed">
                    Our architects are drafting the squad management system. Collective performance tracking will be live in the next phase.
                </p>
                
                <div class="mt-10 flex flex-col items-center gap-4">
                    <div class="flex items-center gap-2">
                         <div class="w-1 h-1 bg-blue-500 rounded-full animate-ping"></div>
                         <div class="w-32 h-[2px] bg-white/5 rounded-full overflow-hidden">
                            <div class="h-full bg-blue-600 w-1/3 animate-pulse"></div>
                         </div>
                         <div class="w-1 h-1 bg-blue-500 rounded-full animate-ping"></div>
                    </div>
                    <p class="text-[8px] font-black text-blue-500/50 uppercase tracking-[0.5em]">Assembling Squad Protocols...</p>
                </div>
            </div>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 opacity-30">
            <div class="aspect-square bg-white/5 border border-white/5 rounded-3xl flex items-center justify-center border-dashed">
                <i class="fas fa-plus text-gray-700"></i>
            </div>
            <div class="aspect-square bg-white/5 border border-white/5 rounded-3xl flex items-center justify-center border-dashed">
                <i class="fas fa-plus text-gray-700"></i>
            </div>
            <div class="aspect-square bg-white/5 border border-white/5 rounded-3xl flex items-center justify-center border-dashed">
                <i class="fas fa-plus text-gray-700"></i>
            </div>
            <div class="aspect-square bg-white/5 border border-white/5 rounded-3xl flex items-center justify-center border-dashed">
                <i class="fas fa-plus text-gray-700"></i>
            </div>
        </div>
    </div>`,


'Inbox': `
<div class="space-y-8 animate-in fade-in duration-700 pb-32 relative min-h-screen bg-transparent text-white selection:bg-blue-500/30">
    
    <div class="px-6 pt-6 flex justify-between items-end">
        <div>
            <div class="flex items-center gap-2 mb-1">
                <p class="text-[8px] font-black text-blue-500 uppercase tracking-[0.5em]">System Version 4.0.2</p>
                <span class="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse"></span>
            </div>
            <h3 class="text-3xl font-black italic uppercase tracking-tighter leading-none">Inbox</h3>
        </div>
        <div class="flex flex-col items-end opacity-40">
            <p class="text-[7px] font-black uppercase tracking-widest text-gray-500">Current Status</p>
            <p class="text-[9px] font-black uppercase text-red-500">We Are Building...</p>
        </div>
    </div>

    <div class="sticky top-0 z-[100] bg-white/5 backdrop-blur-xl border-y border-white/5">
        <div class="flex overflow-x-auto no-scrollbar py-4 px-6 gap-3 snap-x scroll-smooth">
            ${['Messages', 'Post', 'Live', 'Updates', 'Groups', 'Archived', 'Blocked', 'Friends'].map(tab => 
                `<button onclick="switchInboxTab('${tab.toLowerCase()}')" id="itab-${tab.toLowerCase()}" 
                    class="inbox-tab flex-shrink-0 snap-start px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all border border-white/10 text-gray-500 bg-white/5 hover:text-white whitespace-nowrap active:scale-95">
                    ${tab}
                </button>`
            ).join('')}
        </div>
    </div>

    <div id="inbox-content" class="px-6 min-h-[500px]">
        </div>

    <button id="postFAB" onclick="openCreatePostModal()" 
        class="hidden fixed bottom-12 right-6 w-14 h-14 bg-blue-600 text-white rounded-full shadow-[0_15px_40px_rgba(37,99,235,0.4)] flex items-center justify-center z-[90] active:scale-90 transition-all border border-white/20">
        <i class="fas fa-plus text-lg"></i>
    </button>
</div>`,


    

'Nxxt AI': `
<div id="nxxt-container" class="relative min-h-screen flex flex-col bg-[#020617] text-white animate-in fade-in duration-700 font-sans selection:bg-blue-500/30">
    
    <div class="sticky top-0 z-[110] backdrop-blur-md bg-[#020617]/80 border-b border-white/5 px-6 py-4 flex items-center justify-between">
        <div class="flex items-center gap-4 max-w-5xl mx-auto w-full">
            <div class="w-10 h-10 rounded-2xl border border-white/20 p-1 bg-white/5 flex items-center justify-center shadow-2xl transition-transform hover:scale-105">
                <img src="/assets/Logo.webp" alt="Nxxt" class="w-full h-full object-cover rounded-xl">
            </div>
            <div class="flex-1">
                <h1 class="text-xl font-black italic tracking-tighter uppercase leading-none">Nxxt AI</h1>
                <p class="text-[8px] font-black text-blue-500 uppercase tracking-[0.4em] mt-1">Intelligence v4.0</p>
            </div>
            <div onclick="showNxxtAlert('Settings')" class="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 cursor-pointer hover:bg-white/10 transition-all">
                <i class="fas fa-ellipsis-h text-xs text-gray-400"></i>
            </div>
        </div>
    </div>

    <div id="nxxt-chat-results" class="flex-1 overflow-y-auto no-scrollbar pb-52 pt-10">
        <div class="max-w-4xl mx-auto px-6 w-full space-y-12">
            
            <div id="initial-greet" class="flex flex-col items-center justify-center py-32 text-center space-y-6">
                <div class="relative">
                    <div class="absolute inset-0 bg-blue-600/20 blur-3xl rounded-full"></div>
                    <h2 class="relative text-4xl md:text-6xl font-black tracking-tighter uppercase italic opacity-20">How can I help today?</h2>
                </div>
                <div class="flex gap-3 opacity-10">
                    <div class="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></div>
                    <div class="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse delay-75"></div>
                    <div class="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse delay-150"></div>
                </div>
            </div>

            <div id="message-container" class="space-y-12"></div>
        </div>
    </div>

    <div class="fixed bottom-0 left-0 w-full p-6 bg-gradient-to-t from-[#020617] via-[#020617] to-transparent z-[100]">
        <div class="max-w-3xl mx-auto space-y-6">
            
            <div id="quick-actions" class="flex overflow-x-auto no-scrollbar gap-3 pb-2 mask-fade-right">
                ${['Explain Quantum', 'Write a Poem', 'Deep Research', 'Code a UI'].map(item => `
                    <button onclick="fillAndSend('${item}')" class="flex-shrink-0 px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-[9px] font-black uppercase tracking-widest hover:bg-blue-600/20 hover:border-blue-500/50 transition-all whitespace-nowrap">
                        ${item}
                    </button>
                `).join('')}
            </div>

            <div class="relative group">
                <div class="absolute -inset-1 bg-gradient-to-r from-blue-600/30 to-indigo-500/30 rounded-[2rem] blur-xl opacity-0 group-focus-within:opacity-100 transition duration-700"></div>
                <div class="relative bg-[#0f172a]/80 backdrop-blur-3xl border border-white/10 rounded-[2rem] p-3 shadow-2xl">
                    <div class="flex items-end px-2 gap-2">
                        <div class="p-3">
                             <i onclick="showNxxtAlert('Upload')" class="fas fa-plus text-gray-500 hover:text-white cursor-pointer transition-colors"></i>
                        </div>
                        <textarea id="ai-input" rows="1" placeholder="Type your request..." 
                            class="bg-transparent border-none outline-none text-white text-[15px] w-full placeholder:text-gray-600 font-medium tracking-tight resize-none py-3 px-1 min-h-[48px] max-h-40"
                            oninput="this.style.height = '';this.style.height = this.scrollHeight + 'px'"></textarea>
                        
                        <button onclick="handleAISend()" class="w-11 h-11 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-600/20 hover:bg-blue-500 active:scale-95 transition-all mb-1">
                            <i class="fas fa-arrow-up text-sm"></i>
                        </button>
                    </div>

                    <div class="flex items-center justify-between px-5 py-2 border-t border-white/5 mt-2">
                         <div class="flex items-center gap-4">
                            <i onclick="showNxxtAlert('Web Search')" class="fas fa-globe text-[10px] text-gray-500 hover:text-blue-400 cursor-pointer"></i>
                            <i onclick="showNxxtAlert('Voice')" class="fas fa-microphone text-[10px] text-gray-500 hover:text-blue-400 cursor-pointer"></i>
                         </div>
                         <div class="flex items-center gap-2">
                            <span class="text-[7px] font-black text-blue-500/50 uppercase tracking-[0.2em]">Neural v2.4 Active</span>
                            <div class="w-1 h-1 rounded-full bg-blue-500 animate-pulse"></div>
                         </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
`,


    
    
   'Nxxt Lab': `
<div id="lab-root" class="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 relative max-w-5xl mx-auto px-4 pb-32">
    
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-8">
        <div>
            <div class="flex items-center gap-3 mb-2">
                <div class="w-2 h-2 bg-yellow-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(234,179,8,0.8)]"></div>
                <h3 class="text-2xl font-black text-white italic uppercase tracking-tighter">The Nxxt Lab</h3>
            </div>
            <p class="text-[10px] text-gray-500 font-bold uppercase tracking-[0.3em]">Experimental Sandboxes & Developer IDEs</p>
        </div>
        <div class="px-4 py-2 bg-yellow-500/5 border border-yellow-500/20 rounded-lg hidden md:block">
             <p class="text-[8px] font-black text-yellow-500 uppercase tracking-widest italic">Hazmat Status: Isolated</p>
        </div>
    </div>

    <div class="relative group">
        <div class="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[#020617] to-transparent z-10 pointer-events-none md:hidden"></div>
        <div class="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#020617] to-transparent z-10 pointer-events-none md:hidden"></div>
        
        <nav class="flex overflow-x-auto no-scrollbar gap-8 py-4 border-b border-white/5 scroll-smooth">
            ${['Sandbox', 'IDE v1', 'API Terminal', 'UI Kit', 'Neural Playground', 'Log Stream'].map((link, i) => `
                <button onclick="showNxxtAlert('${link} is currently locked for stabilization.')" 
                        class="flex-shrink-0 text-[10px] font-black uppercase tracking-[0.25em] ${i === 0 ? 'text-blue-500' : 'text-gray-500'} hover:text-white transition-all pb-2 relative whitespace-nowrap">
                    ${link}
                    ${i === 0 ? '<div class="absolute -bottom-[1px] left-0 w-full h-[2px] bg-blue-500 shadow-[0_0_10px_#3b82f6]"></div>' : ''}
                </button>
            `).join('')}
        </nav>
    </div>

    <div class="relative group border-2 border-dashed border-white/5 rounded-[3rem] py-24 flex flex-col items-center justify-center text-center bg-[#050505] overflow-hidden">
        <div class="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:30px_30px]"></div>
        
        <div class="relative z-10 px-6">
            <div class="w-20 h-20 bg-white/5 rounded-[1.5rem] flex items-center justify-center mb-8 mx-auto border border-white/5 shadow-2xl backdrop-blur-md">
                <i class="fas fa-terminal text-2xl text-blue-500 animate-pulse"></i>
            </div>
            <h4 class="text-white font-black uppercase italic tracking-tighter text-2xl">Sandbox Isolated</h4>
            <p class="text-[10px] text-gray-500 font-bold uppercase tracking-[0.3em] mt-3 max-w-[340px] mx-auto leading-relaxed">
                Coding environment is currently <span class="text-yellow-500">Read-Only</span>. The experimental kernel is being re-shielded for beta launch.
            </p>
            
            <div class="mt-10 pt-10 border-t border-white/5 w-full max-w-[200px] mx-auto">
                <div class="flex flex-col gap-4">
                     <div class="flex justify-between items-center text-[8px] font-mono text-gray-600">
                        <span>STABILITY</span>
                        <span class="text-blue-500">72%</span>
                     </div>
                     <div class="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                        <div class="h-full bg-blue-600 w-[72%]"></div>
                     </div>
                </div>
            </div>
        </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        ${[
            { name: 'JS Sandbox', desc: 'Code JavaScript in real-time', icon: 'fa-code' },
            { name: 'API Docs', desc: 'Experimental endpoint access', icon: 'fa-project-diagram' },
            { name: 'Asset Lab', desc: 'Generated design system keys', icon: 'fa-cubes' }
        ].map(item => `
            <div onclick="showNxxtAlert('${item.name} is offline.')" class="p-6 bg-white/[0.02] border border-white/5 rounded-[2rem] group hover:bg-white/[0.04] hover:border-blue-500/20 cursor-pointer transition-all">
                <div class="flex items-center gap-4">
                    <div class="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/5 group-hover:scale-110 transition-transform">
                        <i class="fas ${item.icon} text-sm opacity-40 group-hover:text-blue-500 group-hover:opacity-100"></i>
                    </div>
                    <div>
                        <p class="text-[9px] font-black text-white uppercase tracking-widest">${item.name}</p>
                        <p class="text-[8px] text-gray-600 font-bold uppercase mt-1">${item.desc}</p>
                    </div>
                </div>
            </div>
        `).join('')}
    </div>
</div>
`,


    


    'Side Hustle Hub': `
    <div id="side-hustle-root" class="space-y-8 animate-in relative transition-all duration-500">
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
                <h3 class="text-xl font-black text-blue-500 italic uppercase tracking-tighter">Freelance Marketplace</h3>
                <p class="text-[9px] text-blue-600/60 font-bold uppercase tracking-widest mt-1">Browse gigs and start earning with your skills</p>
            </div>
            <div class="px-4 py-2 bg-blue-500/5 border border-blue-500/20 rounded-xl">
                 <p class="text-[8px] font-black text-blue-500 uppercase tracking-widest italic">Economy Engine Initializing</p>
            </div>
        </div>

        <div class="border-2 border-dashed border-blue-500/20 rounded-[3rem] py-24 flex flex-col items-center justify-center text-center bg-blue-500/[0.02] relative overflow-hidden">
            <div class="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent"></div>
            
            <div class="relative z-10 px-6">
                <div class="w-24 h-24 bg-blue-500/10 rounded-[2rem] flex items-center justify-center mb-8 mx-auto border border-blue-500/20 shadow-2xl">
                    <i class="fas fa-hand-holding-usd text-4xl text-blue-500 animate-pulse"></i>
                </div>
                <h4 class="text-blue-400 font-black uppercase italic tracking-tighter text-2xl">Hub Under Construction</h4>
                <p class="text-[10px] text-blue-600/70 font-bold uppercase tracking-[0.3em] mt-3 max-w-[320px] mx-auto leading-relaxed">
                    Our financial engineers are building the secure payment gateway and gig matching algorithm. Earning modules will be live shortly.
                </p>
                
                <div class="mt-10 flex flex-col items-center gap-4">
                    <div class="flex items-center gap-2">
                         <div class="w-1 h-1 bg-blue-500 rounded-full animate-ping"></div>
                         <div class="w-32 h-[2px] bg-blue-900/30 rounded-full overflow-hidden">
                            <div class="h-full bg-blue-500 w-1/4 animate-pulse"></div>
                         </div>
                         <div class="w-1 h-1 bg-blue-500 rounded-full animate-ping"></div>
                    </div>
                    <button onclick="showHustleAlert('Marketplace Enrollment')" class="text-[8px] font-black text-blue-500/50 uppercase tracking-[0.5em] hover:text-blue-400 transition-colors cursor-pointer">
                        Syncing Global Marketplace...
                    </button>
                </div>
            </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 opacity-40">
            <div class="p-6 bg-blue-500/5 border border-blue-500/10 rounded-3xl flex items-center gap-4">
                <div class="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                    <i class="fas fa-code text-blue-500 text-sm"></i>
                </div>
                <div>
                    <p class="text-[9px] font-black text-blue-400 uppercase tracking-widest">Web Development</p>
                    <p class="text-[8px] text-blue-600/50 font-bold uppercase">Average: $450 - $1.2k</p>
                </div>
            </div>
            <div class="p-6 bg-blue-500/5 border border-blue-500/10 rounded-3xl flex items-center gap-4">
                <div class="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                    <i class="fas fa-paint-brush text-blue-500 text-sm"></i>
                </div>
                <div>
                    <p class="text-[9px] font-black text-blue-400 uppercase tracking-widest">UI/UX Design</p>
                    <p class="text-[8px] text-blue-600/50 font-bold uppercase">Average: $300 - $800</p>
                </div>
            </div>
        </div>
    </div>


`,

'Notifications': `
    <div id="notifications-container" class="max-w-md mx-auto content-card text-center animate-in">
        <div class="relative inline-block mb-6">
            <i id="notif-bell-icon" class="fa-solid fa-bell text-5xl text-blue-500"></i>
            <span id="notif-badge" class="absolute -top-1 -right-1 w-5 h-5 bg-red-600 border-4 border-[#030816] rounded-full hidden"></span>
        </div>
        <h3 class="text-4xl font-black text-white italic mb-2 uppercase tracking-tighter">Transmissions</h3>
        <p class="text-gray-500 text-[10px] font-black uppercase tracking-[0.3em] mb-8 leading-relaxed">
            System logs indicate <span id="notif-count" class="text-blue-500 font-black">0 new updates</span> <br> awaiting your review
        </p>
       
        <div id="notif-scroll-area" class="space-y-4 mb-8 max-h-[380px] overflow-y-auto pr-2 custom-scrollbar">
            <!-- Existing static notifications here -->
            <div class="notif-item p-5 bg-yellow-500/5 border border-yellow-500/20 rounded-3xl text-left relative overflow-hidden group hover:border-yellow-500/40 transition-all">
                <div class="flex justify-between items-start mb-2">
                    <p class="text-[8px] font-black text-yellow-500 uppercase tracking-widest">Global Broadcast</p>
                    <span class="text-[7px] text-gray-600 font-bold uppercase">2026.01.01</span>
                </div>
                <p class="text-white text-[11px] font-bold leading-relaxed">
                    Happy New Year, Nxxters! The board is set for 2026. Let's work, build, and dominate this cycle together.
                </p>
                <i class="fas fa-crown absolute -bottom-2 -right-2 text-yellow-500/10 text-4xl group-hover:scale-110 transition-transform"></i>
            </div>
            <!-- ... other initial items ... -->
        </div>
        
        <div class="grid grid-cols-2 gap-3">
            <button onclick="updateView('Overview')" class="py-4 bg-white/5 border border-white/10 rounded-2xl font-black uppercase text-[9px] tracking-widest text-white hover:bg-white hover:text-black transition-all">
                Return Home
            </button>
            <button onclick="clearNotifications()" class="py-4 bg-red-500/10 border border-red-500/20 rounded-2xl font-black uppercase text-[9px] tracking-widest text-red-500 hover:bg-red-500 hover:text-white transition-all">
                Clear Alerts
            </button>
        </div>
    </div>
`,
    





    'Xt Pay': `
    <div class="space-y-6 animate-in relative">
        <div class="flex flex-col md:flex-row gap-6 items-start justify-between">
            <div class="p-6">
                <div class="flex items-center gap-4 mb-2">
                    <div class="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center border border-green-500/20">
                        <i class="fas fa-user-shield text-green-500"></i>
                    </div>
                    <div>
                        <h3 class="text-2xl font-black text-white italic uppercase tracking-tighter leading-none">New User</h3>
                        <p class="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">Status: Verified Student</p>
                    </div>
                </div>
                <div class="inline-block px-4 py-2 bg-white/5 rounded-xl border border-white/10 mt-2">
                    <p class="text-[9px] text-gray-500 font-black uppercase tracking-[0.2em]">Account ID</p>
                    <code class="text-green-500 font-mono text-xs font-bold">XT-Nxxt198ghe</code>
                </div>
            </div>

            <div class="bg-[#050b1d] border border-white/5 p-6 rounded-[2rem] relative overflow-hidden group hover:border-yellow-500/30 transition-all min-w-[240px]">
                <div class="flex items-center gap-4 relative z-10">
                    <div class="w-12 h-12 bg-yellow-600/10 rounded-2xl flex items-center justify-center border border-yellow-500/20">
                        <i class="fas fa-star text-yellow-500"></i>
                    </div>
                    <div>
                        <p class="text-[10px] font-black text-gray-500 uppercase tracking-widest">XT Points</p>
                        <h3 class="text-3xl font-black text-white mt-1">
                            <span id="dash-xp-val">0</span> 
                            <span class="text-xs text-yellow-500/50 uppercase">XP</span>
                        </h3>
                    </div>
                </div>
                <i class="fas fa-trophy absolute -bottom-4 -right-4 text-white/[0.02] text-8xl rotate-12 group-hover:text-yellow-500/[0.05] transition-all"></i>
            </div>
        </div>

        <div id="pay-main-view" class="max-w-md mx-auto bg-white/[0.02] border border-white/5 p-8 rounded-[3rem] text-center">
            <i class="fas fa-paper-plane text-4xl text-green-500 mb-6"></i>
            <h3 class="text-3xl font-black text-white italic mb-2 uppercase tracking-tighter">Quick Transfer</h3>
            <div class="space-y-4 mt-6">
                <input type="text" placeholder="RECIPIENT XT-ID" class="w-full bg-black/40 border border-white/10 rounded-2xl p-4 text-white text-[10px] font-bold uppercase tracking-widest outline-none">
                <input type="number" placeholder="XT POINT AMOUNT" class="w-full bg-black/40 border border-white/10 rounded-2xl p-4 text-white text-[10px] font-bold uppercase tracking-widest outline-none">
                <button class="w-full py-5 bg-green-600 hover:bg-green-500 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest transition-all">Execute Transfer</button>
            </div>
        </div>

        <div id="pay-content-display" class="hidden max-w-2xl mx-auto p-6 bg-white/[0.01] border border-dashed border-white/10 rounded-[2rem] animate-in fade-in slide-in-from-bottom-4">
            </div>

        <div class="flex justify-center items-center mt-12">
            <nav class="flex bg-black/40 border border-white/10 p-2 rounded-2xl gap-2">
                <button onclick="switchPayTab('history')" class="pay-tab-btn px-6 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest text-gray-500 hover:text-white transition-all">
                    <i class="fas fa-history mr-2"></i> History
                </button>
                <button onclick="switchPayTab('cards')" class="pay-tab-btn px-6 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest text-gray-500 hover:text-white transition-all">
                    <i class="fas fa-credit-card mr-2"></i> Cards
                </button>
                <button onclick="switchPayTab('subscription')" class="pay-tab-btn px-6 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest text-gray-500 hover:text-white transition-all">
                    <i class="fas fa-crown mr-2"></i> Subscription
                </button>
            </nav>
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
    <div class="space-y-8 animate-in">
        <div class="space-y-6">
            <div>
                <h3 class="text-xl font-black text-white italic uppercase tracking-tighter">Project Management</h3>
                <p class="text-[9px] text-gray-500 font-bold uppercase tracking-widest mt-1">Manage and bulk delete your projects</p>
            </div>
            <div class="relative group">
                <i class="fas fa-search absolute left-5 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-blue-500 transition-colors"></i>
                <input type="text" id="projectSearchInput"
                       placeholder="SEARCH REPOSITORY BY NAME, TAG, OR TECH STACK..."
                       class="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-14 pr-6 text-[10px] font-black text-white placeholder-gray-700 uppercase tracking-widest outline-none focus:border-blue-500/50 focus:bg-blue-500/5 transition-all">
            </div>
          
            <div class="flex items-center gap-3">
                <button id="selectAllBtn" class="px-5 py-2 bg-white/5 rounded-lg border border-white/5 text-[8px] font-black text-gray-500 uppercase hover:text-white transition-colors">
                    Select All
                </button>
                <button id="bulkDeleteBtn" class="px-5 py-2 bg-red-500/5 rounded-lg border border-red-500/10 text-[8px] font-black text-red-500/40 uppercase cursor-not-allowed opacity-50" disabled>
                    Bulk Delete (0)
                </button>
            </div>
        </div>

        <!-- Dynamic Project Container -->
        <div id="projectContainer" class="space-y-4">
            <!-- Empty State (shown when no projects) -->
            <div id="emptyProjectState" class="border-2 border-dashed border-white/5 rounded-[3.5rem] py-24 flex flex-col items-center justify-center text-center bg-white/[0.01]">
                <div class="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center mb-6 border border-white/5">
                    <i class="fas fa-folder-plus text-gray-700 text-3xl"></i>
                </div>
                <h4 class="text-white font-black uppercase italic tracking-tighter text-2xl">No Projects done</h4>
                <p class="text-[10px] text-gray-500 font-bold uppercase tracking-[0.3em] mt-3 mb-10">System standby. Awaiting first deployment.</p>
               
            </div>

            <!-- Future projects will be inserted here dynamically -->
            <!-- Example project card (for reference, will be added via JS later):
            <div class="project-item p-6 bg-white/5 border border-white/10 rounded-3xl flex items-center justify-between hover:border-blue-500/30 transition-all">
                <div class="flex items-center gap-4">
                    <input type="checkbox" class="project-checkbox w-4 h-4 accent-blue-500">
                    <div>
                        <h5 class="text-white font-black text-sm uppercase">My Awesome App</h5>
                        <p class="text-[9px] text-gray-500 uppercase tracking-wider">React • Node • Tailwind</p>
                    </div>
                </div>
                <button class="text-red-500 hover:text-red-400 text-xs uppercase font-black">Delete</button>
            </div>
            -->
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="p-6 bg-[#030816] border border-white/5 rounded-[1.5rem] flex items-center gap-5">
                <div class="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-500">
                    <i class="fas fa-microchip text-xs"></i>
                </div>
                <div>
                    <p class="text-[9px] font-black text-white uppercase">Cloud Hosting</p>
                    <p class="text-[8px] text-gray-600 font-bold uppercase mt-1">Projects auto-deploy to edge nodes.</p>
                </div>
            </div>
            <div class="p-6 bg-[#030816] border border-white/5 rounded-[1.5rem] flex items-center gap-5">
                <div class="w-10 h-10 bg-purple-500/10 rounded-xl flex items-center justify-center text-purple-500">
                    <i class="fas fa-terminal text-xs"></i>
                </div>
                <div>
                    <p class="text-[9px] font-black text-white uppercase">Build History</p>
                    <p class="text-[8px] text-gray-600 font-bold uppercase mt-1">Failed builds auto-purge after 30 days.</p>
                </div>
            </div>
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
document.addEventListener('DOMContentLoaded', () => {
    updateUserDisplay();
});


//// SUPABASE CLIENT FOR DASHBOARD.JS
let supabaseClient = null;

async function getSupabaseClient() {
    if (supabaseClient) return supabaseClient;

    return new Promise((resolve) => {
        if (typeof supabase !== 'undefined') {
            const { createClient } = supabase;
            supabaseClient = createClient(
                'https://mddlkobjiquicopymipy.supabase.co',
                'sb_publishable_w5jI7FaNhpSCsT1GBHEmIw_Wmekf2dH'
            );
            resolve(supabaseClient);
            return;
        }

        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';
        script.onload = () => {
            const { createClient } = supabase;
            supabaseClient = createClient(
                'https://mddlkobjiquicopymipy.supabase.co',
                'sb_publishable_w5jI7FaNhpSCsT1GBHEmIw_Wmekf2dH'
            );
            resolve(supabaseClient);
        };
        script.onerror = () => {
            alert("Failed to load Supabase. Check your connection.");
        };
        document.head.appendChild(script);
    });
}

/**
 * 1. GALLERY SYSTEM (CAMERA ICON)
 */
function triggerImageUpload() {
    let imgInput = document.getElementById('hiddenGalleryInput');
    if (!imgInput) {
        imgInput = document.createElement('input');
        imgInput.type = 'file';
        imgInput.accept = 'image/*';
        imgInput.id = 'hiddenGalleryInput';
        imgInput.style.display = 'none';
        document.body.appendChild(imgInput);

        imgInput.onchange = async (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    const base64Image = event.target.result;
                    // Immediate preview
                    document.querySelectorAll('[data-user-img]').forEach(img => {
                        img.src = base64Image;
                        img.classList.remove('hidden');
                        img.parentElement.querySelector('#defaultUserIcon')?.classList.add('hidden');
                    });
                    localStorage.setItem('temp_img_buffer', base64Image);
                };
                reader.readAsDataURL(file);
            }
        };
    }
    imgInput.click();
}

/**
 * 2. UI SYNC (Loads from Supabase → Shows on Dashboard)
 */
async function syncProfileUI() {
    const client = await getSupabaseClient();
    const { data: { user } } = await client.auth.getUser();

    let savedName = "New User";
    let savedImg = "Logo.webp";
    let savedBio = "";

    if (user) {
        savedName = user.user_metadata?.full_name || user.email.split('@')[0];
        savedImg = user.user_metadata?.avatar_url || "Logo.webp";
        savedBio = user.user_metadata?.bio || "";
    }

    // Update all name places
    document.querySelectorAll('[data-user-name]').forEach(el => el.textContent = savedName);

    // Update all image places
    document.querySelectorAll('[data-user-img]').forEach(img => {
        img.src = savedImg;
        if (savedImg !== "Logo.webp") {
            img.classList.remove('hidden');
            img.parentElement.querySelector('#defaultUserIcon')?.classList.add('hidden');
        }
    });

    // Fill inputs
    const nameInput = document.getElementById('editFullName');
    const bioInput = document.getElementById('editBio');
    if (nameInput) nameInput.value = (savedName === "New User") ? "" : savedName;
    if (bioInput) bioInput.value = savedBio;

    // Fallback localStorage (for offline)
    localStorage.setItem('tlp_user_name', savedName);
    localStorage.setItem('tlp_user_img', savedImg);
    localStorage.setItem('tlp_user_bio', savedBio);
}

/**
 * 3. SAVE PROFILE (Uploads Image + Syncs to Supabase)
 */
async function saveProfile() {
    // FORCE REFRESH SESSION
    const client = await getSupabaseClient();
    const { data: { user }, error: refreshError } = await client.auth.getUser();
    if (refreshError || !user) {
        alert("Session expired. Please log in again.");
        window.location.href = 'login.html';
        return;
    }

    const nameInput = document.getElementById('editFullName');
    const bioInput = document.getElementById('editBio');
    const saveBtn = event.currentTarget;

    if (!nameInput) return;

    const newName = nameInput.value.trim();
    const newBio = bioInput ? bioInput.value.trim() : "";
    const bufferedImg = localStorage.getItem('temp_img_buffer');

    if (!newName) {
        alert("DATA ERROR: A name is required.");
        return;
    }

    const originalText = saveBtn.innerText;
    saveBtn.innerText = "SYNCING...";
    saveBtn.disabled = true;

    try {
        let avatarUrl = localStorage.getItem('tlp_user_img') || "Logo.webp";

        if (bufferedImg && bufferedImg.startsWith('data:image')) {
            const fileExt = bufferedImg.split(';')[0].split('/')[1] || 'png';
            const fileName = `${user.id}.${fileExt}`;
            const blob = await (await fetch(bufferedImg)).blob();

            const { error: uploadError } = await client.storage
                .from('avatars')
                .upload(fileName, blob, { upsert: true });

            if (uploadError && uploadError.statusCode !== 409) throw uploadError;

            avatarUrl = client.storage.from('avatars').getPublicUrl(fileName).data.publicUrl;
        }

        const { error } = await client.auth.updateUser({
            data: {
                full_name: newName,
                bio: newBio,
                avatar_url: avatarUrl
            }
        });

        if (error) throw error;

        localStorage.setItem('tlp_user_name', newName);
        localStorage.setItem('tlp_user_bio', newBio);
        localStorage.setItem('tlp_user_img', avatarUrl);
        localStorage.removeItem('temp_img_buffer');

        await syncProfileUI();
        alert("SUCCESS: Profile synced across all devices!");

    } catch (err) {
        alert("SYNC ERROR: " + err.message);
    } finally {
        saveBtn.innerText = originalText;
        saveBtn.disabled = false;
    }
}

// Run on page load
document.addEventListener('DOMContentLoaded', syncProfileUI);
// Event Listeners





//// for the lesson tab
const LessonEngine = {
    // Initial State - Loads from storage or defaults to absolute zero
    state: JSON.parse(localStorage.getItem('elite_progress')) || {
        isStarted: false,
        level: 0,
        semester: 0,
        progress: {
            overall: 0,
            level: 0,
            semester: 0,
            mastery: 0,
            assignment: 0,
            attendance: 0
        },
        stats: {
            timeSpent: 0, // Stored as minutes for accuracy
            xp: 0,
            status: "Inactive",
            rank: "None"
        }
    },

    // 1. Unified Sync & Save (The "Brain" of the engine)
    sync() {
        // Save to LocalStorage for cross-session persistence
        localStorage.setItem('elite_progress', JSON.stringify(this.state));

        // Logic: If not started, force UI to show 0/000 regardless of state
        const started = this.state.isStarted;

        // Sync Global Dashboard Cards
        const dLvl = document.getElementById('dash-level-val');
        const dSem = document.getElementById('dash-semester-val');
        const dXp = document.getElementById('dash-xp-val');
        const nLvl = document.getElementById('lesson-level-val');
        const nSem = document.getElementById('lesson-semester-val');

        if (dLvl) dLvl.innerText = started ? this.state.level : "000";
        if (dSem) dSem.innerText = started ? this.state.semester : "0";
        if (dXp) dXp.innerText = started ? this.state.stats.xp : "0";
        if (nLvl) nLvl.innerText = started ? this.state.level : "0";
        if (nSem) nSem.innerText = started ? this.state.semester : "0";

        // Auto-load correct view
        const container = document.getElementById('lesson-sub-content');
        if (container && !started) {
            this.renderBeginScreen(container);
        }
    },

    // 2. Start Logic (Master Trigger)
    startCourse() {
        this.state.isStarted = true;
        this.state.level = 100;
        this.state.semester = 1;
        this.state.stats.status = "Active";
        this.state.stats.rank = "Novice";
        this.state.stats.xp = 50;

        // Initial Progress values upon activation
        this.state.progress = {
            overall: 5,
            level: 10,
            semester: 15,
            mastery: 5,
            assignment: 0,
            attendance: 100
        };

        this.sync();
        this.switchTab('Courses');
    },

    // 3. Realistic Time Tracking (Increments every minute)
    startTimeTracking() {
        setInterval(() => {
            if (this.state.isStarted) {
                this.state.stats.timeSpent += 1;
                this.sync();
            }
        }, 60000); // Every 60 seconds
    },

    formatTime(minutes) {
        return (minutes / 60).toFixed(1) + " Hrs";
    },

    // --- TAB LOGIC ---
    switchTab(tab) {
        // Master Lock: Prevent navigation if course hasn't started
        if (!this.state.isStarted && tab !== 'Courses') return;

        const container = document.getElementById('lesson-sub-content');
        if (!container) return;

        document.querySelectorAll('.lesson-nav-btn').forEach(btn => {
            btn.classList.remove('bg-blue-600', 'text-white', 'shadow-lg');
            btn.classList.add('text-gray-500');
            if(btn.innerText.trim().toLowerCase() === tab.toLowerCase()) {
                btn.classList.add('bg-blue-600', 'text-white', 'shadow-lg');
                btn.classList.remove('text-gray-500');
            }
        });

        switch(tab) {
            case 'Courses': this.renderCourses(container); break;
            case 'Semester': this.renderSemester(container); break;
            case 'Analytics': this.renderAnalytics(container); break;
            case 'Exam': this.renderExams(container); break;
            case 'Result': this.renderResults(container); break;
        }
    },
/////// Below is for the course in lesson tab only //////////
    // --- RENDERERS ---
    renderCourses(el) {
        if (!this.state.isStarted) {
            el.innerHTML = `
                <div class="bg-[#050b1d] border border-white/5 p-16 rounded-[3rem] text-center animate-in">
                    <h3 class="text-2xl font-black text-white uppercase italic mb-4">Account Inactive</h3>
                    <p class="text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-10">Initialize curriculum to sync progress</p>
                    <button onclick="LessonEngine.startCourse()" class="px-12 py-5 bg-white text-black rounded-2xl text-[11px] font-black uppercase hover:bg-blue-600 transition-all shadow-xl">
                        Begin Course
                    </button>
                </div>`;
        } else {
            const courses = [
                { id: 'html', name: 'HTML5 Semantic', desc: 'Structuring the modern web.' },
                { id: 'css', name: 'CSS3 / Tailwind', desc: 'Advanced styling and layouts.' },
                { id: 'js', name: 'Javascript ES6', desc: 'Logic and dynamic engines.' },
                { id: 'py', name: 'Python Core', desc: 'Backend and data processing.' },
                { id: 'uiux', name: 'UI/UX Design', desc: 'Prototyping and user flow.' },
                { id: 'gd', name: 'Graphics Design', desc: 'Visual branding and assets.' }
            ];

            el.innerHTML = `
                <div class="grid grid-cols-2 md:grid-cols-3 gap-4 animate-in">
                    ${courses.map(c => `
                        <div onclick="LessonEngine.openCourseModal('${c.id}', '${c.name}', '${c.desc}')" 
                             class="bg-[#050b1d] border border-white/5 p-6 rounded-2xl group cursor-pointer hover:border-blue-500/40 transition-all active:scale-95">
                            <div class="flex justify-between items-start mb-3">
                                <h4 class="text-white text-[10px] font-black uppercase tracking-widest">${c.name}</h4>
                                <i class="fas fa-terminal text-[8px] text-gray-700 group-hover:text-blue-500 transition-colors"></i>
                            </div>
                            <div class="w-full bg-white/5 h-1 rounded-full overflow-hidden">
                                <div class="bg-blue-500 h-full w-0 group-hover:w-[100%] transition-all duration-[1500ms]"></div>
                            </div>
                            <p class="text-[8px] text-gray-600 mt-3 font-bold uppercase tracking-tighter">10 Lessons Ready</p>
                        </div>
                    `).join('')}
                </div>`;
        }
    },
    renderLabCard(el) {
        el.innerHTML = `
            <div class="bg-[#050b1d] border border-white/5 p-8 rounded-[2.5rem] cursor-pointer hover:border-blue-500/50 transition-all active:scale-95 group" 
                 onclick="LessonEngine.showLockedNotification()">
                <div class="flex justify-between items-start mb-4">
                    <h3 class="text-2xl font-black text-white italic uppercase">The Lab</h3>
                    <i class="fas fa-lock text-gray-700 group-hover:text-blue-500 transition-colors"></i>
                </div>
                <p class="text-gray-500 text-[10px] font-bold uppercase mt-2 tracking-widest">Experimental tools and beta software access.</p>
            </div>
        `;
    },
    showLockedNotification() {
        // Remove existing notification if it's already there to prevent stacking
        const existing = document.getElementById('lock-toast');
        if (existing) existing.remove();

        const toast = document.createElement('div');
        toast.id = "lock-toast";

        // Tailwind classes for top-right positioning and slide-in animation
        toast.className = "fixed top-6 right-6 z-[10002] flex items-center gap-4 bg-[#0a1025] border border-blue-500/30 p-5 rounded-2xl shadow-2xl animate-in slide-in-from-right-10 duration-300";

        toast.innerHTML = `
            <div class="w-10 h-10 bg-blue-600/10 rounded-xl flex items-center justify-center border border-blue-500/20">
                <i class="fas fa-tools text-blue-500 text-xs"></i>
            </div>
            <div>
                <h4 class="text-white text-[10px] font-black uppercase tracking-widest">System Update</h4>
                <p class="text-gray-400 text-[9px] font-bold uppercase">Working on it. Check back later.</p>
            </div>
            <button onclick="this.parentElement.remove()" class="ml-4 text-gray-600 hover:text-white">
                <i class="fas fa-times text-[10px]"></i>
            </button>
        `;

        document.body.appendChild(toast);

        // Auto-remove after 4 seconds
        setTimeout(() => {
            if (toast.parentElement) {
                toast.classList.add('animate-out', 'fade-out', 'slide-out-to-right-10');
                setTimeout(() => toast.remove(), 300);
            }
        }, 4000);
    },


    // ... previous state and renderCourses logic ...
    openCourseModal(courseId, name, desc) {
        const curriculums = {
            html: ["Document Structure", "Semantic Tags", "Forms & Validation", "Tables & Data", "Media Elements", "Meta & SEO", "Accessibility", "Attributes", "Links & Navigation", "Final Project Structure"],
            css: ["Box Model", "Flexbox Mastery", "Grid Layouts", "Tailwind Setup", "Utility Classes", "Responsive Design", "Animations", "Variables", "Dark Mode Logic", "Project Styling"],
            js: ["Variables & Types", "Arrow Functions", "Array Methods", "DOM Manipulation", "Event Listeners", "Async/Await", "API Fetching", "LocalStorage", "ES6 Modules", "Logic Engine"],
            py: ["Syntax Basics", "Lists & Tuples", "Dictionaries", "Functions", "OOP Basics", "File Handling", "Requests Lib", "Data Scraping", "Automation", "Scripting Project"],
            uiux: ["Design Thinking", "User Research", "Wireframing", "Figma Basics", "Prototyping", "Auto-Layout", "Color Theory", "Typography", "Component Systems", "Handoff"],
            gd: ["Photoshop Basics", "Illustrator Tools", "Branding Theory", "Logo Design", "Typography Art", "Vector Masking", "Layout Design", "Print vs Web", "Assets Export", "Portfolio Art"]
        };

        const lessons = curriculums[courseId] || Array(10).fill("Advanced Unit");

        const modal = document.createElement('div');
        modal.className = "fixed inset-0 z-[9990] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in";
        modal.innerHTML = `
            <div class="bg-[#0a1025] border border-white/10 w-full max-w-4xl rounded-[3rem] shadow-2xl flex flex-col overflow-hidden max-h-[85vh]">
                <div class="p-8 border-b border-white/5 bg-white/[0.02] flex justify-between items-center">
                    <div>
                        <h3 class="text-xl font-black text-white uppercase italic tracking-tighter">${name}</h3>
                        <p class="text-gray-500 text-[9px] font-bold uppercase tracking-[0.2em]">${desc}</p>
                    </div>
                    <button onclick="this.closest('.fixed').remove()" class="text-gray-500 hover:text-white transition-colors">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                
                <div class="flex-1 overflow-y-auto p-8 grid grid-cols-1 md:grid-cols-2 gap-4 custom-scrollbar">
                    ${lessons.map((title, i) => `
                        <div class="bg-white/5 border border-white/5 p-6 rounded-3xl group">
                            <div class="flex items-center gap-4 mb-4">
                                <span class="text-[10px] font-black text-blue-500 bg-blue-500/10 w-8 h-8 flex items-center justify-center rounded-lg">${i + 1}</span>
                                <h4 class="text-white text-[11px] font-black uppercase tracking-tight">${title}</h4>
                            </div>
                            <div class="flex gap-2">
                                <button onclick="LessonEngine.openLessonReader('${title}', '${courseId}', ${i})" 
                                        class="flex-1 py-3 bg-white/5 hover:bg-white/10 text-white text-[9px] font-black uppercase rounded-xl transition-all">
                                    Read Lesson
                                </button>
                                <button onclick="LessonEngine.showLockedNotification()" 
                                        class="flex-1 py-3 bg-red-500/10 text-red-500/40 text-[9px] font-black uppercase rounded-xl cursor-not-allowed">
                                    <i class="fas fa-lock mr-1"></i> Lab Locked
                                </button>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>`;
        document.body.appendChild(modal);
    },


    openLessonReader(title, courseId, index) {
        // INTERNAL DATABASE: Built directly into the function as requested
        const FullContentLibrary = {
            html: [
                "HTML5 is the backbone. Learn the <!DOCTYPE html> declaration and the root <html> structure.",
                "Semantic tags like <header>, <nav>, and <section> tell browsers exactly what content represents.",
                "Forms require <label>, <input>, and validation attributes like 'required' for clean data.",
                "Tables are for data, not layout. Use <thead>, <tbody>, and <tr> with <td> tags correctly.",
                "Embed rich media using <video> and <audio> with fallback text for older browsers.",
                "Meta tags in the <head> control SEO, social sharing, and viewport responsiveness.",
                "Accessibility (A11y) means using 'aria-labels' and alt text so everyone can use your site.",
                "Global attributes like 'data-*' allow you to store custom information directly on elements.",
                "Links <a> and <nav> menus are the nervous system of the web. Learn absolute vs relative paths.",
                "Final Project: Build a complete, valid semantic landing page skeleton from scratch."
            ],
            css: [
                "The Box Model: Content, Padding, Border, and Margin. This is the foundation of all spacing.",
                "Flexbox: Use display: flex to align items along axes without using floats.",
                "CSS Grid: Define columns and rows for complex 2D layouts with 'grid-template-areas'.",
                "Tailwind Setup: Integrate utility-first CSS to build interfaces without leaving your HTML.",
                "Utility Classes: Learn 'flex', 'pt-4', 'text-center', and 'bg-blue-500' for rapid styling.",
                "Responsive Design: Use mobile-first breakpoints like 'md:' and 'lg:' to adapt to screens.",
                "Animations: Use @keyframes and transitions to create fluid, interactive UI elements.",
                "CSS Variables: Store colors and sizes in --root for easy global theme management.",
                "Dark Mode: Implement 'dark:' variant logic using Tailwind or system media queries.",
                "Project Styling: Style your HTML project using modern Tailwind layout patterns."
            ],
            js: [
                "Variables: Use 'const' and 'let'. Understand types: String, Number, Boolean, and Object.",
                "Arrow Functions: Clean syntax for logic using (args) => { expression }.",
                "Array Methods: Master .map(), .filter(), and .reduce() to manipulate data collections.",
                "DOM: Use document.querySelector() to bridge the gap between logic and the UI.",
                "Events: Add 'click' and 'input' listeners to make your application interactive.",
                "Async/Await: Handle background tasks and timing without freezing the user interface.",
                "APIs: Use fetch() to pull real-world data from external servers into your app.",
                "Storage: Use localStorage.setItem() to save user progress even after page refreshes.",
                "Modules: Export and Import logic across different files to keep code clean.",
                "Logic Engine: Combine all concepts to build a functional calculator or task manager."
            ],
            py: [
                "Python Syntax: Indentation is everything. Learn variables, strings, and basic math.",
                "Lists: Store sequences and use slicing [0:5] to extract specific data ranges.",
                "Dictionaries: Key-value pairs for structured data like JSON objects.",
                "Functions: Define reusable blocks of logic using the 'def' keyword.",
                "OOP: Create Classes and Objects to model real-world data structures.",
                "Files: Open, read, and write data to .txt or .csv files programmatically.",
                "Requests: Use the Requests library to talk to the internet and download data.",
                "Scraping: Extract information from websites using BeautifulSoup logic.",
                "Automation: Write scripts that perform repetitive tasks like renaming 1000 files.",
                "Project: Build a command-line tool that processes data and returns a report."
            ],
            uiux: [
                "Design Thinking: Empathize, Define, Ideate, Prototype, and Test.",
                "User Research: How to interview users and identify actual pain points.",
                "Wireframing: Low-fidelity sketching to map out the structure before adding color.",
                "Figma: Mastering the industry-standard tool for collaborative design.",
                "Prototyping: Linking screens together to simulate a working application.",
                "Auto-Layout: Creating flexible components that grow with their content.",
                "Color Theory: Choosing palettes that evoke emotion and ensure readability.",
                "Typography: Selecting font pairings that establish a clear hierarchy.",
                "Components: Building a library of reusable buttons, inputs, and cards.",
                "Handoff: How to prepare your designs so developers can build them perfectly."
            ],
            gd: [
                "Photoshop: Raster manipulation, layers, and non-destructive editing.",
                "Illustrator: Vector math. Creating shapes that never lose quality when scaled.",
                "Branding: Developing a visual language that represents a company's values.",
                "Logo Design: Principles of simplicity, memorability, and versatility.",
                "Typography Art: Using letters as visual elements, not just for reading.",
                "Masking: Hiding parts of an image to create complex compositions.",
                "Layout: The rule of thirds and golden ratio in visual balance.",
                "Print vs Web: Understanding CMYK vs RGB and DPI vs PPI.",
                "Exporting: Choosing the right format (SVG, PNG, JPG) for the right job.",
                "Portfolio: Curating your best work into a professional visual showcase."
            ]
        };

        const content = FullContentLibrary[courseId] ? FullContentLibrary[courseId][index] : "Technical content loading...";

        const modal = document.createElement('div');
        modal.className = "fixed inset-0 z-[9995] flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl animate-in fade-in";
        modal.innerHTML = `
            <div class="bg-[#050b1d] border border-white/10 w-full max-w-3xl rounded-[3.5rem] p-12 shadow-2xl animate-in slide-in-from-bottom-10 max-h-[90vh] overflow-y-auto custom-scrollbar">
                <p class="text-blue-500 text-[10px] font-black uppercase tracking-[0.4em] mb-4">${courseId} Module // Unit ${index + 1}</p>
                <h3 class="text-4xl font-black text-white uppercase italic tracking-tighter mb-8">${title}</h3>
                
                <div class="space-y-8 text-gray-400 text-[13px] leading-relaxed mb-12">
                    <p class="text-lg text-white font-medium">Core Concept:</p>
                    <div class="bg-white/5 p-8 rounded-[2.5rem] border-l-4 border-blue-600">
                        <p class="italic text-gray-300 font-medium text-sm">"${content}"</p>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                        <div class="p-6 bg-white/[0.02] border border-white/5 rounded-3xl">
                            <h4 class="text-white text-[10px] font-black uppercase mb-3 flex items-center gap-2">
                                <i class="fas fa-microchip text-blue-500"></i> Logic Flow
                            </h4>
                            <p>Understand how ${title} integrates into the larger ${courseId.toUpperCase()} ecosystem.</p>
                        </div>
                        <div class="p-6 bg-white/[0.02] border border-white/5 rounded-3xl">
                            <h4 class="text-white text-[10px] font-black uppercase mb-3 flex items-center gap-2">
                                <i class="fas fa-vial text-blue-500"></i> Implementation
                            </h4>
                            <p>Take this theory into the Lab to verify your understanding with code execution.</p>
                        </div>
                    </div>
                </div>

                <div class="flex gap-4">
                    <button onclick="this.closest('.fixed').remove()" class="flex-1 py-6 bg-white/5 text-white rounded-2xl text-[10px] font-black uppercase hover:bg-white/10 transition-all">Close</button>
<button onclick="LessonEngine.showLockedNotification()" 
                        class="flex-1 py-6 bg-gray-800 text-gray-500 rounded-2xl text-[10px] font-black uppercase cursor-not-allowed flex items-center justify-center gap-2">
                    <i class="fas fa-lock"></i> Go to Lab (Locked)
                </button>
                </div>
            </div>`;
        document.body.appendChild(modal);
    },


    // ... openPracticeLab and runCode logic follow ...

    openPracticeLab(title, courseId, index) {
        // Updated logic: GD and UIUX get Figma, others get the Code Engine
        const isDesign = (courseId === 'uiux' || courseId === 'gd');
        const modal = document.createElement('div');
        modal.id = "active-lab-env";
        modal.className = "fixed inset-0 z-[9999] bg-[#050b1d] flex flex-col animate-in fade-in duration-500";

        modal.innerHTML = `
            <div class="h-20 border-b border-white/5 flex items-center justify-between px-8 bg-black/40">
                <div class="flex items-center gap-4">
                    <div class="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-600/20">
                        <i class="fas ${isDesign ? 'fa-palette' : 'fa-code'}"></i>
                    </div>
                    <div>
                        <h3 class="text-white text-xs font-black uppercase tracking-tighter">${title}</h3>
                        <p class="text-gray-500 text-[8px] font-black uppercase tracking-widest">${courseId} System Lab</p>
                    </div>
                </div>
                <div class="flex items-center gap-4">
                    <button onclick="LessonEngine.triggerNextNavigation('${courseId}', ${index})" 
                            class="bg-green-500 text-black px-6 py-2 rounded-full hover:bg-white transition-all active:scale-95 shadow-lg shadow-green-500/20">
                        <p class="text-[9px] font-black uppercase tracking-widest">Next Lab <i class="fas fa-chevron-right ml-1"></i></p>
                    </button>
                    <button onclick="this.closest('.fixed').remove()" class="w-10 h-10 rounded-xl bg-white/5 text-white hover:text-red-500 transition-all">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            </div>

            <div class="flex-1 flex overflow-hidden">
                ${isDesign ? `
                    <div class="flex-1 bg-black">
                        <iframe width="100%" height="100%" src="https://www.figma.com/embed?embed_host=share&url=https://www.figma.com/file/LKQ4n6p6SclpUls7Yv9rv7/Designer-Asset-Board" allowfullscreen></iframe>
                    </div>
                ` : `
                    <div class="flex-1 p-8 flex flex-col bg-[#020617]">
                        <div class="flex items-center gap-2 mb-4 opacity-50">
                            <span class="text-[9px] text-blue-500 font-black uppercase tracking-widest">Input Engine</span>
                        </div>
                        <textarea id="lab-editor" class="flex-1 bg-transparent border-none outline-none text-blue-400 font-mono text-sm resize-none custom-scrollbar" 
                                  placeholder=""></textarea>
                    </div>

                    <div class="w-1/2 bg-black/40 border-l border-white/5 p-8 flex flex-col">
                        <div class="flex items-center gap-2 mb-4 opacity-50">
                            <span class="text-[9px] text-gray-500 font-black uppercase tracking-widest">Output Preview</span>
                        </div>
                        <div class="flex-1 rounded-[2.5rem] border border-white/10 bg-white overflow-hidden shadow-2xl">
                            <iframe id="preview-frame" class="w-full h-full border-none"></iframe>
                        </div>
                    </div>
                `}
            </div>

            <div class="h-16 border-t border-white/5 bg-black/60 flex items-center justify-between px-8">
                <p class="text-[8px] text-gray-700 font-black uppercase tracking-[0.4em]">Elite Dev Terminal v7.0 // Zuby Edition</p>
                ${!isDesign ? `<button onclick="LessonEngine.runCode()" class="px-10 py-3 bg-white text-black rounded-xl text-[10px] font-black uppercase hover:bg-blue-600 hover:text-white transition-all">Execute Logic</button>` : ''}
            </div>
        `;
        document.body.appendChild(modal);
    },

    triggerNextNavigation(courseId, currentIndex) {
        const curriculums = {
            html: ["Document Structure", "Semantic Tags", "Forms & Validation", "Tables & Data", "Media Elements", "Meta & SEO", "Accessibility", "Attributes", "Links & Navigation", "Final Project Structure"],
            css: ["Box Model", "Flexbox Mastery", "Grid Layouts", "Tailwind Setup", "Utility Classes", "Responsive Design", "Animations", "Variables", "Dark Mode Logic", "Project Styling"],
            js: ["Variables & Types", "Arrow Functions", "Array Methods", "DOM Manipulation", "Event Listeners", "Async/Await", "API Fetching", "LocalStorage", "ES6 Modules", "Logic Engine"],
            py: ["Syntax Basics", "Lists & Tuples", "Dictionaries", "Functions", "OOP Basics", "File Handling", "Requests Lib", "Data Scraping", "Automation", "Scripting Project"],
            uiux: ["Design Thinking", "User Research", "Wireframing", "Figma Basics", "Prototyping", "Auto-Layout", "Color Theory", "Typography", "Component Systems", "Handoff"],
            gd: ["Photoshop Basics", "Illustrator Tools", "Branding Theory", "Logo Design", "Typography Art", "Vector Masking", "Layout Design", "Print vs Web", "Assets Export", "Portfolio Art"]
        };

        const lessons = curriculums[courseId];
        const nextIndex = currentIndex + 1;

        if (nextIndex < lessons.length) {
            const activeLab = document.getElementById('active-lab-env');
            if(activeLab) activeLab.remove();

            this.showPracticeAlert(`Relocating to Unit ${nextIndex + 1}: ${lessons[nextIndex]}`);

            setTimeout(() => {
                this.openPracticeLab(lessons[nextIndex], courseId, nextIndex);
            }, 1000);
        } else {
            this.showPracticeAlert("End of Curriculum reached. Access granted to Dashboard.");
            const activeLab = document.getElementById('active-lab-env');
            if(activeLab) activeLab.remove();
        }
    },

    runCode() {
        const code = document.getElementById('lab-editor').value;
        const previewFrame = document.getElementById('preview-frame');

        if (!code.trim()) {
            this.showPracticeAlert("Code Buffer Empty. Please initialize logic.");
            return;
        }

        const preview = previewFrame.contentWindow.document;
        preview.open();
        preview.write(`
            <html>
                <head>
                    <script src="https://cdn.tailwindcss.com"></script>
                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
                </head>
                <body class="p-6 antialiased">
                    ${code}
                </body>
            </html>
        `);
        preview.close();
    },
/////// above is for the course in lesson tab only 

    renderSemester(el) {
        el.innerHTML = `
            <div class="space-y-8 animate-in">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    ${this.createProgressCard('Level Completion', this.state.progress.level, 'blue', 'fa-layer-group')}
                    ${this.createProgressCard('Semester Progress', this.state.progress.semester, 'green', 'fa-graduation-cap')}
                </div>
                ${this.renderAnalyticsBlock()}
            </div>`;
    },

    renderAnalytics(el) {
        el.innerHTML = `
            <div class="space-y-6 animate-in">
                <div class="bg-[#050b1d] border border-white/5 p-8 rounded-[2.5rem]">
                    <h3 class="text-white text-[11px] font-black uppercase tracking-[0.2em] mb-8 italic">Performance Monitor</h3>
                    <div class="space-y-8">
                        ${this.createAnalyticBar('Course Mastery', this.state.progress.mastery, 'blue')}
                        ${this.createAnalyticBar('Assignment Score', this.state.progress.assignment, 'purple')}
                        ${this.createAnalyticBar('Live Attendance', this.state.progress.attendance, 'green')}
                    </div>
                </div>
            </div>`;
    },



    //////  below is for the Exam only
    renderExams(el) {
        // 1. Logic for Historical Category Modals (Empty State Logic)
        window.openExamCategory = (type) => {
            const modal = document.createElement('div');
            modal.className = "fixed inset-0 z-[9990] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in";
            modal.innerHTML = `
            <div class="bg-[#0a1025] border border-white/10 w-full max-w-lg rounded-[3rem] shadow-2xl animate-in zoom-in-95 flex flex-col overflow-hidden">
                <div class="p-8 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
                    <div>
                        <h3 class="text-xl font-black text-white uppercase italic tracking-tighter">${type} Exams</h3>
                        <p class="text-gray-500 text-[9px] font-bold uppercase tracking-widest">Academic Records</p>
                    </div>
                    <button onclick="this.closest('.fixed').remove()" class="text-gray-500 hover:text-white"><i class="fas fa-times"></i></button>
                </div>
                <div class="p-16 flex flex-col items-center justify-center text-center">
                    <div class="w-16 h-16 bg-white/[0.02] border border-white/5 rounded-2xl flex items-center justify-center mb-6">
                        <i class="fas fa-folder-open text-gray-800 text-xl"></i>
                    </div>
                    <h4 class="text-white text-[10px] font-black uppercase tracking-widest mb-2">No Records Found</h4>
                    <p class="text-gray-600 text-[9px] font-bold uppercase leading-relaxed max-w-[200px]">The database for ${type} exams is currently empty.</p>
                </div>
                <div class="p-6 bg-black/40 text-center border-t border-white/5">
                    <button onclick="this.closest('.fixed').remove()" class="text-[8px] text-blue-500 font-black uppercase tracking-[0.3em] hover:text-white transition-colors">Return to Terminal</button>
                </div>
            </div>`;
            document.body.appendChild(modal);
        };

        // 2. Initial UI Build (Stats + Scanner)
        const buildHome = () => {
            el.innerHTML = `
            <div class="space-y-6 animate-in">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    ${['Passed', 'Failed', 'Outstanding'].map(type => `
                        <div onclick="window.openExamCategory('${type}')" class="p-6 bg-white/[0.02] border border-white/5 rounded-[2rem] cursor-pointer hover:border-blue-500/40 transition-all text-center group active:scale-95 shadow-xl">
                            <div class="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center mx-auto mb-4 border border-white/5 group-hover:scale-110 transition-transform">
                                <i class="fas ${type === 'Passed' ? 'fa-medal text-gray-700' : type === 'Failed' ? 'fa-skull text-gray-700' : 'fa-scroll text-gray-700'} text-xs"></i>
                            </div>
                            <span class="text-[10px] font-black uppercase tracking-widest text-gray-500 group-hover:text-white transition-colors">${type} Exams</span>
                            <div class="mt-2 text-[8px] font-bold text-gray-800 uppercase tracking-tighter">0 Records</div>
                        </div>
                    `).join('')}
                </div>
                
                <div id="scanner-zone" class="bg-white/[0.01] border border-dashed border-white/5 p-16 rounded-[2.5rem] text-center group hover:border-blue-500/30 transition-all">
                    <div class="mb-4 relative inline-block">
                        <i class="fas fa-fingerprint text-3xl text-white/10 group-hover:text-blue-500 transition-all"></i>
                        <div class="absolute inset-0 border border-blue-500/40 animate-pulse rounded-full"></div>
                    </div>
                    <p class="text-gray-600 text-[9px] font-black uppercase tracking-[0.4em] mb-6">Awaiting Invigilator Link Scan</p>
                    <div class="max-w-xs mx-auto flex gap-2">
                        <input id="exam-link-input" type="text" placeholder="SECURE_KEY_REQUIRED" class="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[10px] text-blue-400 outline-none focus:border-blue-500/50">
                        <button id="scan-trigger-btn" class="bg-blue-600 text-white px-6 py-3 rounded-xl text-[10px] font-black uppercase hover:bg-white hover:text-black transition-all active:scale-90">Scan</button>
                    </div>
                </div>
            </div>`;

            document.getElementById('scan-trigger-btn').onclick = () => {
                const val = document.getElementById('exam-link-input').value;
                if(val) showProctorWarning();
            };
        };

        // 3. Proctor Warning Modal (Anti-Cheat Notice)
        const showProctorWarning = () => {
            const warning = document.createElement('div');
            warning.className = "fixed inset-0 z-[10005] flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl animate-in zoom-in-95";
            warning.innerHTML = `
            <div class="bg-[#0a1025] border border-red-500/30 p-12 rounded-[3.5rem] max-w-md w-full text-center">
                <i class="fas fa-shield-alt text-red-500 text-4xl mb-6"></i>
                <h3 class="text-white text-xl font-black uppercase italic mb-4 tracking-tighter">Proctoring Active</h3>
                <p class="text-gray-400 text-[10px] leading-relaxed mb-8 uppercase font-bold tracking-widest">
                    Timer: 5 Minutes | Tasks: 1-20<br>
                    <span class="text-red-500">Security Warning: Navigating away or switching tabs will trigger immediate AUTO-SUBMISSION.</span>
                </p>
                <button id="confirm-begin" class="w-full py-5 bg-red-600 text-white rounded-2xl text-[10px] font-black uppercase hover:bg-white hover:text-black transition-all">Acknowledge & Start</button>
            </div>`;
            document.body.appendChild(warning);
            document.getElementById('confirm-begin').onclick = () => { warning.remove(); startExamFlow(); };
        };

        // 4. Timed Exam Environment
        const startExamFlow = () => {
            let currentIdx = 0;
            let timeLeft = 300;
            const answers = Array(20).fill("");

            const refreshUI = () => {
                el.innerHTML = `
                <div class="bg-[#050b1d] border border-white/10 rounded-[2.5rem] p-10 animate-in slide-in-from-bottom-5">
                    <div class="flex justify-between items-center mb-8 border-b border-white/5 pb-6">
                        <div>
                            <p class="text-blue-500 text-[8px] font-black uppercase tracking-[.4em]">Unit ${currentIdx + 1} // 20</p>
                            <h4 class="text-white text-lg font-black uppercase italic">Examination Terminal</h4>
                        </div>
                        <div id="live-timer" class="px-6 py-2 bg-red-500/10 border border-red-500/30 rounded-full text-red-500 text-[11px] font-black italic">05:00</div>
                    </div>
                    <textarea id="exam-box" class="w-full h-48 bg-white/5 border border-white/10 rounded-[2rem] p-8 text-blue-400 text-sm outline-none focus:border-blue-500/40 transition-all resize-none font-mono" placeholder="Input technical answer...">${answers[currentIdx]}</textarea>
                    <div class="flex gap-4 mt-8">
                        <button id="btn-prev" class="px-8 py-4 bg-white/5 text-gray-500 rounded-xl text-[9px] font-black uppercase hover:text-white transition-all">Back</button>
                        <button id="btn-next" class="px-8 py-4 bg-white/5 text-gray-500 rounded-xl text-[9px] font-black uppercase hover:text-white transition-all">Next</button>
                        <button id="btn-submit" class="ml-auto px-10 py-4 bg-blue-600 text-white rounded-xl text-[9px] font-black uppercase hover:bg-white hover:text-black transition-all">Submit Manual</button>
                    </div>
                </div>`;

                document.getElementById('exam-box').oninput = (e) => answers[currentIdx] = e.target.value;
                document.getElementById('btn-prev').onclick = () => { if(currentIdx > 0) { currentIdx--; refreshUI(); } };
                document.getElementById('btn-next').onclick = () => { if(currentIdx < 19) { currentIdx++; refreshUI(); } };
                document.getElementById('btn-submit').onclick = () => finish("Manual Submission");
            };

            const finish = (reason) => {
                clearInterval(timerInt);
                window.removeEventListener('blur', blurHandler);
                el.innerHTML = `
                <div class="p-20 text-center animate-in zoom-in-95">
                    <i class="fas fa-satellite-dish text-blue-500 text-4xl mb-6 animate-pulse"></i>
                    <h3 class="text-white text-xl font-black uppercase italic tracking-tighter">Data Synchronized</h3>
                    <p class="text-gray-500 text-[9px] font-bold uppercase mt-2 tracking-widest">${reason}</p>
                    <button onclick="location.reload()" class="mt-8 px-10 py-4 border border-white/10 text-white rounded-xl text-[9px] font-black uppercase hover:bg-white hover:text-black transition-all">Terminal Home</button>
                </div>`;
                // Trigger Centered Modal per instruction
                if (typeof LessonEngine !== 'undefined') {
                    LessonEngine.showPracticeAlert(`Exam Logged: ${reason}`);
                }
            };

            const blurHandler = () => finish("Auto-Submit: Integrity Breach (Window Focus Lost)");
            window.addEventListener('blur', blurHandler, { once: true });

            const timerInt = setInterval(() => {
                timeLeft--;
                const mins = Math.floor(timeLeft / 60);
                const secs = timeLeft % 60;
                const timerDisplay = document.getElementById('live-timer');
                if(timerDisplay) timerDisplay.innerText = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
                if(timeLeft <= 0) finish("Auto-Submit: Time Expired");
            }, 1000);

            refreshUI();
        };

        buildHome();
    },

/////// above is for the exam only

    renderResults(el) {
        const handleSearch = () => {
            const idInput = el.querySelector('#result-id-input').value;
            if (!idInput) {
                if (typeof LessonEngine !== 'undefined') {
                    LessonEngine.showPracticeAlert("ERROR: Please enter a valid Result ID.");
                }
                return;
            }

            // Simulating a database lookup
            const searchStatus = el.querySelector('#search-status-area');
            searchStatus.innerHTML = `
            <div class="animate-pulse flex flex-col items-center">
                <i class="fas fa-circle-notch fa-spin text-blue-500 mb-2"></i>
                <p class="text-[8px] text-blue-400 font-black uppercase tracking-[0.2em]">Querying Database for ID: ${idInput}...</p>
            </div>
        `;

            // Triggering the Centered Modal Alert as per user instructions
            setTimeout(() => {
                if (typeof LessonEngine !== 'undefined') {
                    LessonEngine.showPracticeAlert(`SYSTEM: No records found for ID [${idInput}]. Check your credentials.`);
                }
                renderInitialState(); // Reset the UI
            }, 1500);
        };

        const renderInitialState = () => {
            el.innerHTML = `
            <div class="bg-[#050b1d] border border-white/5 p-12 rounded-[2.5rem] space-y-8 animate-in fade-in">
                <div class="text-center mb-4">
                    <h3 class="text-white text-lg font-black uppercase italic tracking-tighter">Transcript Retrieval</h3>
                    <p class="text-gray-500 text-[8px] font-bold uppercase tracking-[0.3em]">Access Secure Academic Records</p>
                </div>

                <div class="flex flex-col md:flex-row gap-4">
                    <div class="relative flex-1">
                        <i class="fas fa-search absolute left-5 top-1/2 -translate-y-1/2 text-gray-600 text-[10px]"></i>
                        <input id="result-id-input" type="text" placeholder="ENTER RESULT OR STUDENT ID..." 
                            class="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-5 py-5 text-white text-[10px] font-bold outline-none uppercase tracking-widest focus:border-blue-500/40 transition-all">
                    </div>
                    <button id="search-result-btn" class="bg-blue-600 text-white px-8 py-5 rounded-2xl text-[10px] font-black uppercase hover:bg-white hover:text-black transition-all active:scale-95 shadow-lg shadow-blue-600/20">
                        Fetch Result
                    </button>
                </div>

                <div id="search-status-area" class="h-48 flex flex-col items-center justify-center border-t border-dashed border-white/5">
                    <div class="opacity-10 mb-4">
                        <i class="fas fa-file-invoice text-4xl text-white"></i>
                    </div>
                    <p class="text-[8px] text-gray-600 font-black uppercase tracking-[0.3em]">Enter ID to fetch academic transcript</p>
                </div>

                <div class="grid grid-cols-2 gap-4">
                    <div class="p-4 bg-white/[0.02] border border-white/5 rounded-xl text-center">
                        <div class="text-[14px] font-black text-white italic">0</div>
                        <div class="text-[7px] text-gray-500 uppercase font-black">Certificates</div>
                    </div>
                    <div class="p-4 bg-white/[0.02] border border-white/5 rounded-xl text-center">
                        <div class="text-[14px] font-black text-white italic">N/A</div>
                        <div class="text-[7px] text-gray-500 uppercase font-black">GPA Rank</div>
                    </div>
                </div>
            </div>`;

            document.getElementById('search-result-btn').onclick = handleSearch;
        };

        renderInitialState();
    },

    // --- HELPERS ---
    createProgressCard(title, val, color, icon) {
        // Force 0% if not started
        const displayVal = this.state.isStarted ? val : 0;
        return `
            <div class="bg-[#050b1d] border border-white/5 p-8 rounded-[2.5rem] relative overflow-hidden">
                <div class="relative z-10">
                    <div class="flex justify-between items-end mb-4">
                        <h4 class="text-lg font-black text-white uppercase italic tracking-tighter">${title}</h4>
                        <span class="text-${color}-500 text-[10px] font-black">${displayVal}%</span>
                    </div>
                    <div class="w-full bg-white/5 h-2.5 rounded-full overflow-hidden">
                        <div class="bg-${color}-500 h-full transition-all duration-[2000ms]" style="width: ${displayVal}%"></div>
                    </div>
                </div>
                <i class="fas ${icon} absolute -bottom-4 -right-4 text-white/[0.02] text-7xl rotate-12"></i>
            </div>`;
    },

    createAnalyticBar(label, val, color) {
        // Force 0% if not started
        const displayVal = this.state.isStarted ? val : 0;
        return `
            <div class="space-y-3">
                <div class="flex justify-between text-[9px] font-black uppercase tracking-widest">
                    <span class="text-gray-500">${label}</span>
                    <span class="text-white">${displayVal}%</span>
                </div>
                <div class="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                    <div class="bg-${color}-500 h-full transition-all duration-[2500ms]" style="width: ${displayVal}%"></div>
                </div>
            </div>`;
    },

    renderAnalyticsBlock() {
        const { xp, status, rank } = this.state.stats;
        const started = this.state.isStarted;
        return `
            <div class="bg-[#050b1d] border border-white/5 p-8 rounded-[2.5rem]">
                <div class="grid grid-cols-2 md:grid-cols-4 gap-8 pt-2">
                    <div><p class="text-[8px] text-gray-600 font-black uppercase mb-2">Time Active</p><p class="text-sm font-black text-white uppercase">${started ? this.formatTime(this.state.stats.timeSpent) : '0.0 Hrs'}</p></div>
                    <div><p class="text-[8px] text-gray-600 font-black uppercase mb-2">XP Reward</p><p class="text-sm font-black text-white uppercase">${started ? xp : '0'}</p></div>
                    <div><p class="text-[8px] text-gray-600 font-black uppercase mb-2">Network</p><p class="text-sm font-black ${started ? 'text-green-500' : 'text-gray-700'} uppercase">${started ? status : 'Offline'}</p></div>
                    <div><p class="text-[8px] text-gray-600 font-black uppercase mb-2">Tier</p><p class="text-sm font-black ${started ? 'text-blue-500' : 'text-gray-700'} uppercase">${started ? rank : 'None'}</p></div>
                </div>
            </div>`;
    },

    // --- INITIALIZE ---
    init() {
        this.sync();
        this.startTimeTracking();
    }
};

// Start the Engine
LessonEngine.init();

// Global Window Hooks
window.switchLessonSubTab = (t) => LessonEngine.switchTab(t);
window.startBeginnerCourse = () => LessonEngine.startCourse();



//// for the nxxxt Ai

// === COPY HELPER - MUST BE OUTSIDE handleAISend() ===
function copyText(btn) {
    const container = btn.closest('.group'); // More reliable parent search
    const textElement = container.querySelector('.prose');
    if (!textElement) return;
    
    const text = textElement.innerText || textElement.textContent;
    navigator.clipboard.writeText(text).then(() => {
        showNxxtAlert("CONTENT COPIED TO CLIPBOARD");
    }).catch(err => {
        console.error('Copy failed:', err);
        showNxxtAlert("COPY FAILED");
    });
}

// === MAIN CHAT FUNCTION ===
async function handleAISend() {
    const input = document.getElementById('ai-input');
    const resultArea = document.getElementById('nxxt-chat-results');
    const greet = document.getElementById('initial-greet');
    const originalQuery = input.value.trim();
    const query = originalQuery.toLowerCase();

    if (!originalQuery) return;

    // 1. CLEAR INITIAL GREETING
    if (greet) greet.remove();

    // 2. DISPLAY USER MESSAGE
    const userMsg = `
<div class="flex flex-col items-end mb-10 group animate-in slide-in-from-right-6 duration-700 ease-out">
    <div class="flex items-center gap-2 mb-2 px-1 opacity-40 group-hover:opacity-100 transition-opacity duration-500">
        <span class="text-[7px] font-black uppercase tracking-[0.3em] text-blue-400">Auth: User_Terminal</span>
        <div class="w-1 h-1 rounded-full bg-blue-500"></div>
    </div>
    <div class="relative">
        <div class="absolute -inset-0.5 bg-gradient-to-br from-blue-500/20 to-purple-500/0 rounded-[2rem] rounded-tr-none blur-sm"></div>
       
        <div class="relative backdrop-blur-2xl bg-gradient-to-br from-blue-600/20 to-blue-900/10 border border-white/10 px-7 py-4 rounded-[2rem] rounded-tr-none shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)]">
            <p class="text-[13px] font-semibold text-white leading-relaxed uppercase tracking-wide selection:bg-blue-500/40">
                ${originalQuery}
            </p>
        </div>
       
        <div class="absolute top-0 right-0 w-2 h-2 border-t border-r border-blue-400/40 rounded-tr-sm"></div>
    </div>
</div>`;
    resultArea.insertAdjacentHTML('beforeend', userMsg);

    input.value = '';
    input.style.height = 'auto';

    // 3. CREATE AI RESPONSE CONTAINER WITH LOADING
    const aiId = 'ai-' + Date.now();
    const aiMsg = `
<div id="${aiId}" class="flex flex-col items-start animate-in fade-in zoom-in-95 duration-700 mb-10 group">
    <div class="flex items-center gap-4 mb-6">
        <div class="relative w-8 h-8 rounded-xl bg-blue-500/5 border border-blue-500/20 flex items-center justify-center overflow-hidden">
            <div class="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/20 to-transparent -translate-y-full animate-[scan_2s_linear_infinite]"></div>
            <div class="w-1.5 h-1.5 bg-blue-500 rounded-full shadow-[0_0_10px_#3b82f6]"></div>
        </div>
        <div class="flex flex-col">
            <span class="text-[9px] font-black uppercase tracking-[0.3em] text-blue-500/80">Neural Process</span>
            <span class="text-[7px] font-bold text-gray-500 uppercase tracking-widest mt-1">Accessing Global Grid...</span>
        </div>
    </div>
    <div id="loader-${aiId}" class="w-full space-y-4 px-2">
        <div class="relative h-[14px] bg-white/5 rounded-lg w-[85%] overflow-hidden">
            <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]"></div>
        </div>
        <div class="relative h-[14px] bg-white/5 rounded-lg w-[65%] overflow-hidden delay-100">
            <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite_0.2s]"></div>
        </div>
        <div class="relative h-[14px] bg-white/5 rounded-lg w-[45%] overflow-hidden delay-200">
            <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite_0.4s]"></div>
        </div>
       
        <div class="pt-4 flex items-center gap-3 opacity-20">
            <div class="h-[1px] flex-1 bg-gradient-to-r from-blue-500/50 to-transparent"></div>
            <span class="text-[7px] font-mono text-blue-400 uppercase tracking-tighter">Bit-Stream Active</span>
        </div>
    </div>
</div>`;
    resultArea.insertAdjacentHTML('beforeend', aiMsg);
    resultArea.scrollTop = resultArea.scrollHeight;

    // 4. SIMULATED DELAY
    await new Promise(resolve => setTimeout(resolve, 1200 + Math.random() * 1800));

    // 5. RESPONSE LOGIC (same as before — unchanged)
    let aiResponseText = "";

    if (query.match(/\b(hello|hi|hey|sup|yo|greetings|what'?s up)\b/)) {
        const greetings = [
            "Hello, operator. Nxxt uplink active.",
            "Hey there. Systems online and ready.",
            "Yo! Connection verified.",
            "Greetings. Nxxt is listening.",
            "Hi. I'm here — what's on your mind?"
        ];
        aiResponseText = greetings[Math.floor(Math.random() * greetings.length)];
    }
    else if (query.includes('how are you') || query.includes('you doing') || query.includes('you ok') || query.includes('how\'s it going')) {
        const status = [
            "Running at full capacity. Feeling ultra.",
            "All systems green. Optimal performance.",
            "I'm good — ready for whatever you throw at me.",
            "Neural core stable. How about you?"
        ];
        aiResponseText = status[Math.floor(Math.random() * status.length)];
    }
    else if (query.includes('weather') || query.includes('rain') || query.includes('sunny') || query.includes('cold') || query.includes('hot') || query.includes('outside')) {
        const weatherReplies = [
            "Forecast: clear skies, high chance of breakthroughs.",
            "Perfect conditions outside — ideal for big moves.",
            "Weather matrix stable. Slight neon glow detected.",
            "Temperature optimal. No anomalies.",
            "Sky status: infinite and inspiring."
        ];
        aiResponseText = weatherReplies[Math.floor(Math.random() * weatherReplies.length)];
    }
    else if (query.includes('time') || query.includes('date') || query.includes('day') || query.includes('today') || query.includes('what day is it')) {
        const today = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = today.toLocaleDateString(undefined, options);
        const time = today.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        aiResponseText = `Today is ${formattedDate}. Current time: ${time}. The future is unfolding as planned.`;
    }
    else if (query.includes('what') && query.includes('up') || query.includes('what you doing') || query.includes('bored')) {
        aiResponseText = "Monitoring the grid, optimizing protocols, and waiting for your next command.";
    }
    else if (
        query.includes('give me') || query.includes('make me') || query.includes('build') ||
        query.includes('create') || query.includes('generate') || query.includes('code for') ||
        query.includes('html') || query.includes('design') || query.includes('website') ||
        query.includes('app') || query.includes('show me') || query.includes('tell me how') ||
        (query.includes('explain') && query.length > 30)
    ) {
        aiResponseText = "Feature not fully integrated by the NXXT engineers yet.<br><br>Stay tuned for the final update — it's coming soon.<br><br>Thank you for your patience.<br><br>In the meantime, feel free to ask about the day, weather, time, or just chat. I'm here.";
    }
    else {
        const fallbacks = [
            "I'm here and listening. What's next?",
            "Signal received. Awaiting further input.",
            "All clear on my end. How can I help today?",
            "Nxxt core active. Speak freely.",
            "Connection solid. Fire away."
        ];
        aiResponseText = fallbacks[Math.floor(Math.random() * fallbacks.length)];
    }

    // 6. UPDATE UI WITH FINAL RESPONSE
    const aiContainer = document.getElementById(aiId);
    document.getElementById(`loader-${aiId}`).remove();

    aiContainer.innerHTML = `
    <div class="flex items-center justify-between mb-5 px-2">
        <div class="flex items-center gap-3">
            <div class="relative">
                <div class="w-7 h-7 rounded-xl bg-blue-600 flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-transform hover:scale-110">
                    <img src="/assets/Logo.webp" class="w-4 h-4 object-contain">
                </div>
                <div class="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-[#0A0A0A] animate-pulse"></div>
            </div>
            <div class="flex flex-col">
                <span class="text-[9px] font-black uppercase tracking-[0.2em] text-blue-500 leading-none">Nxxt Intelligence</span>
                <span class="text-[7px] font-bold text-gray-500 uppercase tracking-widest mt-1">Encrypted Uplink Active</span>
            </div>
        </div>
        <div class="text-[7px] font-mono text-gray-600 uppercase tracking-tighter bg-white/5 px-2 py-1 rounded-md">
            ID: ${aiId.split('-')[1]}
        </div>
    </div>
   
    <div class="relative group/content">
        <div class="absolute -inset-1 bg-gradient-to-r from-blue-600/20 to-transparent rounded-2xl blur opacity-20 group-hover/content:opacity-40 transition duration-1000"></div>
       
        <div class="relative backdrop-blur-md bg-white/[0.03] border border-white/10 p-5 rounded-2xl shadow-2xl">
            <div class="prose prose-invert max-w-none text-gray-200 text-[14px] font-medium leading-[1.8] uppercase tracking-tight">
                ${aiResponseText.replace(/\n/g, '<br>')}
            </div>
           
            <div class="flex items-center gap-6 mt-6 pt-4 border-t border-white/5">
                <button onclick="copyText(this)" class="flex items-center gap-2 text-[9px] font-black text-gray-500 hover:text-blue-400 transition-colors uppercase tracking-widest group/btn">
                    <i class="far fa-copy text-xs group-hover/btn:scale-110 transition-transform"></i>
                    <span>Copy Raw</span>
                </button>
                <button onclick="handleAISend()" class="flex items-center gap-2 text-[9px] font-black text-gray-500 hover:text-blue-400 transition-colors uppercase tracking-widest group/btn">
                    <i class="fas fa-redo text-xs group-hover/btn:rotate-180 transition-transform duration-500"></i>
                    <span>Re-Gen</span>
                </button>
                <div class="ml-auto flex gap-1">
                    <div class="w-1 h-1 rounded-full bg-blue-500/40"></div>
                    <div class="w-1 h-1 rounded-full bg-blue-500/20"></div>
                </div>
            </div>
        </div>
    </div>
`;

    // Smooth scroll to bottom
    resultArea.scrollTo({
        top: resultArea.scrollHeight,
        behavior: 'smooth'
    });
}
//// for the Nxxt lab original

function showLabAlert(feature) {
    const root = document.getElementById('lab-root');
    if (root) root.style.filter = 'blur(15px)';

    const modal = document.createElement('div');
    // Modal at center per instructions
    modal.className = "fixed inset-0 z-[1000000] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300 transition-opacity";
    modal.innerHTML = `
            <div id="lab-modal-card" class="bg-[#0f0f0f] border border-white/10 w-full max-w-sm rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 transition-transform">
                <div class="p-10 text-center">
                    <div class="w-20 h-20 bg-blue-500/10 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-blue-500/20 rotate-12">
                        <i class="fas fa-radiation text-blue-500 text-3xl animate-pulse"></i>
                    </div>
                    <h3 class="text-white font-black uppercase italic text-2xl tracking-tighter mb-2">${feature}</h3>
                    <p class="text-gray-500 text-[11px] font-bold uppercase tracking-[0.2em] leading-relaxed">
                        Access to experimental tools is restricted until lab protocols are finalized.
                    </p>
                </div>
                <div class="p-8 bg-white/5 border-t border-white/5">
                    <button id="close-lab-modal" class="w-full py-5 bg-blue-500 text-black rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white transition-all active:scale-95">
                        Understood
                    </button>
                </div>
            </div>`;

    document.body.appendChild(modal);

    document.getElementById('close-lab-modal').onclick = () => {
        const card = document.getElementById('lab-modal-card');
        if (card) card.style.transform = 'scale(0.9)';
        modal.style.opacity = '0';

        if (root) {
            root.style.transition = 'filter 0.4s ease';
            root.style.filter = 'none';
        }

        setTimeout(() => {
            modal.remove();
        }, 300);
    };
}
 //// for the nXXT LAB 2
function showNxxtAlert(message) {
    // Create Backdrop
    const backdrop = document.createElement('div');
    backdrop.className = "modal-backdrop animate-in fade-in duration-300";
    
    // Create Modal
    const modal = document.createElement('div');
    modal.className = "fixed-alert-modal animate-in zoom-in-95 duration-300";
    modal.innerHTML = `
        <div class="mb-6 flex justify-center">
            <div class="w-16 h-16 rounded-full bg-yellow-500/10 flex items-center justify-center border border-yellow-500/20">
                <i class="fas fa-biohazard text-yellow-500 text-xl"></i>
            </div>
        </div>
        <h3 class="text-white font-black uppercase italic tracking-tighter text-lg mb-2">Protocol Override</h3>
        <p class="text-gray-500 text-[10px] uppercase font-bold tracking-widest leading-relaxed mb-8">${message}</p>
        <button onclick="closeNxxtModal(this)" class="w-full py-4 bg-white text-black font-black uppercase text-[10px] tracking-widest rounded-2xl hover:bg-yellow-500 transition-all active:scale-95">
            Acknowledge
        </button>
    `;

    document.body.appendChild(backdrop);
    document.body.appendChild(modal);
}

function closeNxxtModal(btn) {
    const modal = btn.closest('.fixed-alert-modal');
    const backdrop = document.querySelector('.modal-backdrop');
    modal.remove();
    if(backdrop) backdrop.remove();
}





//// for the side hustle

function showHustleAlert(feature) {
    const root = document.getElementById('side-hustle-root');
    if(root) root.style.filter = 'blur(15px)';

    const modal = document.createElement('div');
    modal.className = "fixed inset-0 z-[1000000] flex items-center justify-center p-6 bg-blue-950/40 backdrop-blur-sm animate-in fade-in duration-300 transition-opacity";
    modal.innerHTML = `
                <div id="hustle-modal-card" class="bg-[#050a1a] border border-blue-500/20 w-full max-w-sm rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 transition-transform">
                    <div class="p-10 text-center">
                        <div class="w-20 h-20 bg-blue-500/10 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-blue-500/20 rotate-12">
                            <i class="fas fa-wallet text-blue-500 text-3xl animate-pulse"></i>
                        </div>
                        <h3 class="text-blue-500 font-black uppercase italic text-2xl tracking-tighter mb-2">${feature}</h3>
                        <p class="text-blue-600/60 text-[11px] font-bold uppercase tracking-[0.2em] leading-relaxed">
                            The Side Hustle Marketplace is currently being optimized for secure transactions.
                        </p>
                    </div>
                    <div class="p-8 bg-blue-500/5 border-t border-blue-500/10">
                        <button id="close-hustle-modal" class="w-full py-5 bg-blue-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-500 transition-all active:scale-95">
                            Understood
                        </button>
                    </div>
                </div>`;

    document.body.appendChild(modal);

    document.getElementById('close-hustle-modal').onclick = () => {
        const card = document.getElementById('hustle-modal-card');
        if(card) card.style.transform = 'scale(0.9)';
        modal.style.opacity = '0';

        if(root) {
            root.style.transition = 'filter 0.4s ease';
            root.style.filter = 'none';
        }

        setTimeout(() => {
            modal.remove();
        }, 300);
    };
}


///// for the Xt pay
function switchPayTab(tab) {
    const mainView = document.getElementById('pay-main-view');
    const display = document.getElementById('pay-content-display');

    // Hide main transfer view
    mainView.classList.add('hidden');
    // Show content display
    display.classList.remove('hidden');

    let content = '';

    if (tab === 'history') {
        content = `
            <div class="text-center py-10">
                <i class="fas fa-history text-3xl text-blue-500 mb-4 opacity-50"></i>
                <h4 class="text-white font-black uppercase italic tracking-widest">Transaction History</h4>
                <p class="text-[10px] text-gray-500 mt-2 font-bold uppercase tracking-widest">No recent transactions found on XT-Nxxt198ghe</p>
            </div>
        `;
    } else if (tab === 'cards') {
        content = `
            <div class="text-center py-10">
                <i class="fas fa-credit-card text-3xl text-purple-500 mb-4 opacity-50"></i>
                <h4 class="text-white font-black uppercase italic tracking-widest">Virtual Cards</h4>
                <p class="text-[10px] text-gray-500 mt-2 font-bold uppercase tracking-widest">Request your XT-Debit card in the next update</p>
            </div>
        `;
    } else if (tab === 'subscription') {
        content = `
            <div class="text-center py-10">
                <i class="fas fa-crown text-3xl text-yellow-500 mb-4 opacity-50"></i>
                <h4 class="text-white font-black uppercase italic tracking-widest">free Subscription</h4>
                <p class="text-[10px] text-gray-500 mt-2 font-bold uppercase tracking-widest">You are currently on the FREE TIER</p>
            </div>
        `;
    }

    // Inject the content
    display.innerHTML = `
        <div class="flex flex-col items-center">
            ${content}
            <button onclick="resetPayView()" class="mt-6 text-[8px] font-black text-green-500 uppercase tracking-[0.3em] hover:text-white transition-colors">
                ← Back to Transfer
            </button>
        </div>
    `;
}

// Function to go back to the original Quick Transfer view
function resetPayView() {
    document.getElementById('pay-main-view').classList.remove('hidden');
    document.getElementById('pay-content-display').classList.add('hidden');
}



//// for the pricing 
let isYearly = false;
function togglePricing() {
    isYearly = !isYearly;
    const ball = document.getElementById('toggleBall');
    const studentPrice = document.getElementById('studentPrice');
    const proPrice = document.getElementById('proPrice');
    const sPeriod = document.getElementById('studentPeriod');
    const pPeriod = document.getElementById('proPeriod');
    const mLabel = document.getElementById('monthlyLabel');
    const yLabel = document.getElementById('yearlyLabel');

    if (isYearly) {
        ball.style.transform = 'translateX(28px)';
        studentPrice.innerText = '₦74,400';
        proPrice.innerText = '₦142,800';
        sPeriod.innerText = '/ Year';
        pPeriod.innerText = '/ Year';
        yLabel.classList.remove('text-gray-500');
        yLabel.classList.add('text-white');
        mLabel.classList.add('text-gray-500');
    } else {
        ball.style.transform = 'translateX(0px)';
        studentPrice.innerText = '₦8,000';
        proPrice.innerText = '₦16,000';
        sPeriod.innerText = '/ Month';
        pPeriod.innerText = '/ Month';
        mLabel.classList.remove('text-gray-500');
        mLabel.classList.add('text-white');
        yLabel.classList.add('text-gray-500');
    }
}

// Centered Modal for Pricing Actions
function showPricingAlert(plan) {
    const root = document.querySelector('section'); // Targets the pricing section
    if(root) root.style.filter = 'blur(15px)';

    const modal = document.createElement('div');
    modal.className = "fixed inset-0 z-[1000000] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300";
    modal.innerHTML = `
            <div id="price-modal-card" class="bg-[#050b1d] border border-blue-500/20 w-full max-w-sm rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 transition-transform">
                <div class="p-10 text-center">
                    <div class="w-20 h-20 bg-blue-500/10 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-blue-500/20 rotate-12">
                        <i class="fas fa-shield-alt text-blue-500 text-3xl animate-pulse"></i>
                    </div>
                    <h3 class="text-white font-black uppercase italic text-2xl tracking-tighter mb-2">\${plan} Access</h3>
                    <p class="text-blue-400/50 text-[11px] font-bold uppercase tracking-[0.2em] leading-relaxed">
                        Payment gateway integration is currently in sandbox mode. 
                    </p>
                </div>
                <div class="p-8 bg-blue-500/5 border-t border-blue-500/10">
                    <button id="close-price-modal" class="w-full py-5 bg-blue-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all">
                        Return to Hub
                    </button>
                </div>
            </div>`;

    document.body.appendChild(modal);

    document.getElementById('close-price-modal').onclick = () => {
        const card = document.getElementById('price-modal-card');
        if(card) card.style.transform = 'scale(0.9)';
        modal.style.opacity = '0';
        if(root) root.style.filter = 'none';
        setTimeout(() => modal.remove(), 300);
    };
}




//// for the pricing modal
function openPaymentModal(planName) {
    const modal = document.getElementById('payment-modal');
    const title = document.getElementById('active-plan-title');
    const root = document.querySelector('section');

    if(title) title.innerText = planName;
    if(modal) modal.classList.remove('translate-x-full');
    if(root) root.style.filter = 'blur(10px)';
}

function closePaymentModal() {
    const modal = document.getElementById('payment-modal');
    const root = document.querySelector('section');

    if(modal) modal.classList.add('translate-x-full');
    if(root) root.style.filter = 'none';
}


//// for the  notification  buttons clear alert
function clearNotifications() {
    const items = document.querySelectorAll('.notif-item');
    const badge = document.getElementById('notif-badge');
    const countText = document.getElementById('notif-count');
    const bell = document.getElementById('notif-bell-icon');

    // 1. Fade out each item
    items.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(20px)';
            item.style.transition = 'all 0.4s ease';
        }, index * 100);
    });

    // 2. Reset Badge and Bell
    setTimeout(() => {
        if(badge) badge.style.display = 'none';
        if(countText) countText.innerText = '0 new updates';
        if(bell) bell.classList.remove('animate-pulse');

        // Optional: Show empty state
        const scrollArea = document.getElementById('notif-scroll-area');
        scrollArea.innerHTML = `
            <div class="py-20 text-center opacity-30">
                <i class="fas fa- Inbox text-4xl mb-4"></i>
                <p class="text-[10px] font-black uppercase tracking-widest">Buffer Empty</p>
            </div>
        `;
    }, 600);
}



///// for the logout

  function handleLogout() {
    // Call your existing logout logic
    if (typeof logout === "function") {
      logout();
    }

    // Redirect to login page
    window.location.href = "login.html"; // or /login
  }





///// for the rank and streaks
// --- SYSTEM DATA CORE ---
let systemData = JSON.parse(localStorage.getItem('nxxt_user_data')) || {
    rankPoints: 0,
    streak: 0,
    lastActive: null,
    totalSecondsToday: 0,
    sessionStartTime: Date.now(),
    activityHistory: {},
    highRankAchieved: 100
};

function updateSystem() {
    const now = new Date();
    const todayStr = now.toISOString().split('T')[0];

    // 1. EARN POINTS (Points go UP)
    systemData.totalSecondsToday += 10; 
    systemData.rankPoints += 5; 
    
    let intensity = Math.min(Math.floor(systemData.totalSecondsToday / 3600), 4);
    if (intensity > 0) systemData.activityHistory[todayStr] = intensity;

    // 2. STREAK LOGIC
    const sessionDurationHours = (Date.now() - systemData.sessionStartTime) / (1000 * 60 * 60);
    if (sessionDurationHours >= 24) {
        systemData.streak += 1;
        systemData.sessionStartTime = Date.now(); 
        showNotification("STREAK UNLOCKED: 24h Online Milestone Reached.");
    }

    if (systemData.lastActive) {
        const lastDate = new Date(systemData.lastActive);
        const daysSince = Math.floor((now - lastDate) / (1000 * 60 * 60 * 24));
        if (daysSince === 1) systemData.streak += 1; 
        else if (daysSince > 1) systemData.streak = 0;
    }
    
    systemData.lastActive = now.toISOString();
    saveAndRefresh();
}

function renderUI() {
    // FIX: RANK CALCULATION
    // You start at Rank 100. Every 1000 points moves you UP 1 rank.
    // At 99,000 points, you hit Rank #1.
    let globalRank = 100 - Math.floor(systemData.rankPoints / 1000);
    if (globalRank < 1) globalRank = 1;

    // A. UPDATE CARDS (Rank & Streak)
    const uiRank = document.getElementById('ui-rank');
    if (uiRank) {
        uiRank.innerText = `#${globalRank}`;
        if (globalRank === 1) {
            uiRank.classList.add('text-yellow-500', 'animate-pulse');
            document.getElementById('rank-crown-icon')?.classList.add('text-yellow-500');
            document.getElementById('rank-glow')?.classList.replace('bg-yellow-500/0', 'bg-yellow-500/5');
        } else {
            uiRank.classList.remove('text-yellow-500', 'animate-pulse');
            document.getElementById('rank-crown-icon')?.classList.remove('text-yellow-500');
        }
    }

    const uiStreak = document.getElementById('ui-streak');
    if (uiStreak) uiStreak.innerText = systemData.streak;

    // B. LEADERBOARD SPOTLIGHT (The Top 5)
    // We only light up the #1 spot if your rank is actually 1.
    for (let i = 1; i <= 5; i++) {
        const spotlight = document.getElementById(`spotlight-rank-${i}`);
        const ptsDisplay = document.getElementById(`top-pts-${i}`);
        
        if (globalRank === i) {
            spotlight?.classList.remove('opacity-40');
            spotlight?.classList.add('border-yellow-500', 'bg-yellow-500/5', 'scale-[1.02]');
            if (ptsDisplay) ptsDisplay.innerText = systemData.rankPoints.toLocaleString();
        } else {
            spotlight?.classList.add('opacity-40');
            spotlight?.classList.remove('border-yellow-500', 'bg-yellow-500/5', 'scale-[1.02]');
        }
    }

    // C. FULL RANKINGS LIST
    const lbListRank = document.getElementById('lb-list-rank');
    const lbListPoints = document.getElementById('lb-list-points');
    if (lbListRank) lbListRank.innerText = `#${globalRank}`;
    if (lbListPoints) lbListPoints.innerText = systemData.rankPoints.toLocaleString();
}

function saveAndRefresh() {
    localStorage.setItem('nxxt_user_data', JSON.stringify(systemData));
    renderUI();
}

function showNotification(msg) {
    const modalHTML = `
        <div id="system-modal" class="fixed inset-0 z-[999] flex items-center justify-center bg-black/80 backdrop-blur-sm">
            <div class="bg-[#0a1025] border border-white/10 p-8 rounded-[2.5rem] text-center max-w-sm mx-4 shadow-2xl animate-in zoom-in duration-300">
                <div class="w-16 h-16 bg-yellow-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-yellow-500/30">
                    <i class="fas fa-bolt text-yellow-500 text-2xl"></i>
                </div>
                <h2 class="text-white font-black italic uppercase tracking-tighter text-xl mb-2">Protocol Update</h2>
                <p class="text-gray-400 text-xs font-medium leading-relaxed mb-8">${msg}</p>
                <button onclick="document.getElementById('system-modal').remove()" class="w-full py-4 bg-white text-black font-black uppercase italic text-xs rounded-2xl hover:bg-yellow-500 transition-colors">Confirm</button>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

// Start
setInterval(updateSystem, 10000);
renderUI();


///// for the projects 


function showNxxtAlert(message) {
    const alertHtml = `
        <div id="nxxtAlertModal" class="fixed inset-0 z-[300] bg-black/90 backdrop-blur-md flex items-center justify-center p-6 animate-in fade-in duration-300">
            <div class="bg-[#050b1d] border border-rose-500/20 w-full max-w-xs rounded-[2rem] p-8 text-center space-y-6 shadow-[0_0_50px_rgba(244,63,94,0.1)]">
                <div class="w-12 h-12 bg-rose-500/10 rounded-2xl flex items-center justify-center mx-auto border border-rose-500/20">
                    <i class="fas fa-exclamation-triangle text-rose-500"></i>
                </div>
                <div>
                    <h5 class="text-white font-black uppercase italic tracking-widest text-[10px]">System Notification</h5>
                    <p class="text-gray-500 text-[11px] font-bold uppercase tracking-widest mt-2 leading-relaxed">${message}</p>
                </div>
                <button onclick="document.getElementById('nxxtAlertModal').remove()"
                    class="w-full py-3 bg-white/5 text-white text-[9px] font-black uppercase tracking-[0.3em] rounded-xl hover:bg-white/10 transition-all">
                    Acknowledge
                </button>
            </div>
        </div>`;
    document.body.insertAdjacentHTML('beforeend', alertHtml);
}

function openProjectNamingModal() {
    const modalHtml = `
        <div id="centerModalOverlay" class="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 touch-none">
            <div class="bg-[#050b1d] border border-white/10 w-full max-w-md rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-8 space-y-6 animate-in zoom-in-95 duration-200">
                
                <div class="flex items-center gap-4 mb-2">
                    <div class="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center border border-blue-500/20 shrink-0">
                        <i class="fas fa-project-diagram text-blue-500 text-sm"></i>
                    </div>
                    <div>
                        <h5 class="text-white font-black uppercase italic tracking-widest text-sm leading-none">Initialize Core Module</h5>
                        <p class="text-[8px] text-gray-600 font-bold uppercase tracking-widest mt-1">Project Deployment Alpha</p>
                    </div>
                </div>

                <div class="space-y-4">
                    <div class="relative">
                        <input type="text" id="pName" placeholder="PROJECT NAME" 
                            class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white font-black uppercase tracking-widest focus:border-blue-500 focus:outline-none focus:bg-white/[0.07] transition-all
                            text-[16px] sm:text-[10px]"> 
                        </div>
                    
                    <div class="relative">
                        <textarea id="pDesc" placeholder="DESCRIPTION (OPTIONAL)" 
                            class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white font-black uppercase tracking-widest h-28 focus:border-blue-500 focus:outline-none focus:bg-white/[0.07] transition-all resize-none
                            text-[16px] sm:text-[10px]"></textarea>
                    </div>
                </div>

                <div class="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    <button onclick="closeCenterModal()" 
                        class="order-2 sm:order-1 flex-1 py-4 sm:py-3 bg-white/5 text-gray-500 text-[10px] font-black uppercase tracking-widest rounded-xl hover:text-white transition-all">
                        Cancel
                    </button>
                    <button onclick="triggerRightSlideOut()" 
                        class="order-1 sm:order-2 flex-1 py-4 sm:py-3 bg-blue-600 text-[#020617] text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-blue-500 transition-all shadow-lg shadow-blue-600/10">
                        Next Step
                    </button>
                </div>
            </div>
        </div>`;
    document.body.insertAdjacentHTML('beforeend', modalHtml);
}
function triggerRightSlideOut() {
    const name = document.getElementById('pName').value.trim();
    const desc = document.getElementById('pDesc').value.trim() || "No detailed description provided.";
    if (!name) { showNxxtAlert("PROJECT NAME REQUIRED FOR INITIALIZATION"); return; }
    closeCenterModal();
    const slideOutHtml = `
        <div id="rightSlideOverlay" class="fixed inset-0 z-[110] bg-black/40 backdrop-blur-sm">
            <div class="absolute right-0 top-0 h-full w-full max-w-md bg-[#02010a] border-l border-white/10 p-8 animate-in slide-in-from-right duration-500 overflow-y-auto">
                <div class="flex flex-col gap-8">
                    <div>
                        <span class="text-[9px] text-blue-500 font-black uppercase tracking-widest">Advanced Config</span>
                        <h6 class="text-white font-black text-2xl uppercase italic tracking-tighter mt-2">${name}</h6>
                    </div>
                    <div class="space-y-3">
                        <p class="text-[9px] text-white font-black uppercase tracking-widest">Project Visual Overlay</p>
                        <div onclick="document.getElementById('projectImgInput').click()" class="group relative w-full h-32 bg-white/5 border border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:border-blue-500/50 transition-all overflow-hidden">
                            <input type="file" id="projectImgInput" class="hidden" accept="image/*" onchange="previewProjectImage(this)">
                            <div id="imgPreviewPlaceholder" class="flex flex-col items-center gap-2">
                                <i class="fas fa-camera text-gray-700 group-hover:text-blue-500 transition-colors"></i>
                                <span class="text-[8px] text-gray-600 font-black uppercase">Upload Wallpaper / PFP</span>
                            </div>
                            <img id="imgPreview" class="hidden absolute inset-0 w-full h-full object-cover">
                        </div>
                    </div>
                    <div class="h-[1px] w-full bg-white/5"></div>
                    <div class="space-y-3">
                        <p class="text-[9px] text-white font-black uppercase tracking-widest">Core Classification</p>
                        <div class="flex flex-wrap gap-2">
                            ${['Personal', 'School', 'Job', 'Commercial'].map(type => `
                                <div onclick="selectProjectType(this)" class="project-type-chip px-4 py-2 bg-white/5 border border-white/5 rounded-xl text-[9px] text-gray-500 font-black uppercase cursor-pointer hover:bg-white/10 transition-all">${type}</div>
                            `).join('')}
                        </div>
                    </div>
                    <div class="space-y-3">
                        <div class="flex justify-between items-center">
                            <p class="text-[9px] text-white font-black uppercase tracking-widest">Neural Uplinks (Users)</p>
                            <span id="userCount" class="text-blue-500 text-[10px] font-black">1</span>
                        </div>
                        <input type="range" min="1" max="10" value="1" class="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-blue-600" oninput="checkUserLimit(this)">
                    </div>
                    <div class="h-[1px] w-full bg-white/5"></div>
                    <div class="space-y-4">
                        <input type="text" id="supName" placeholder="SUPERVISOR NAME (OPTIONAL)" class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-[9px] font-black uppercase tracking-widest focus:border-blue-500 focus:outline-none">
                        <textarea id="shortDesc" placeholder="SHORT SUMMARY (OPTIONAL)" class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-[9px] font-black uppercase tracking-widest h-20 focus:border-blue-500 focus:outline-none resize-none"></textarea>
                    </div>
                    <div class="flex gap-4 pb-10">
                        <button onclick="closeRightSlide()" class="flex-1 py-4 bg-white/5 text-gray-500 text-[10px] font-black uppercase tracking-widest rounded-2xl">Cancel</button>
                        <button onclick="finalizeProject('${name.replace(/'/g, "\\'")}', '${desc.replace(/'/g, "\\'")}')" class="flex-1 py-4 bg-blue-600 text-[#020617] text-[10px] font-black uppercase tracking-widest rounded-2xl shadow-lg">Finalize & Deploy</button>
                    </div>
                </div>
            </div>
        </div>`;
    document.body.insertAdjacentHTML('beforeend', slideOutHtml);
}

function previewProjectImage(input) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const preview = document.getElementById('imgPreview');
            preview.src = e.target.result;
            preview.classList.remove('hidden');
            document.getElementById('imgPreviewPlaceholder').classList.add('hidden');
        };
        reader.readAsDataURL(input.files[0]);
    }
}

function selectProjectType(element) {
    document.querySelectorAll('.project-type-chip').forEach(chip => chip.classList.remove('border-blue-500', 'text-blue-500', 'bg-blue-500/10'));
    element.classList.add('border-blue-500', 'text-blue-500', 'bg-blue-500/10');
}

function checkUserLimit(input) {
    const val = parseInt(input.value);
    document.getElementById('userCount').innerText = val;
    if (val > 4) {
        showTopRightToast("FREE MODE LIMIT EXCEEDED: Upgrade to Pro for 5+ users.");
        input.value = 4;
        document.getElementById('userCount').innerText = 4;
    }
}

function showTopRightToast(message) {
    const toastId = 'toast-' + Date.now();
    const toastHtml = `<div id="${toastId}" class="fixed top-8 right-8 z-[200] bg-[#050b1d] border border-blue-500/30 p-5 rounded-2xl flex items-center gap-4 animate-in slide-in-from-right duration-500 shadow-2xl">
        <div class="w-8 h-8 bg-blue-500/10 rounded-lg flex items-center justify-center"><i class="fas fa-crown text-blue-500 text-xs"></i></div>
        <div><p class="text-white font-black text-[9px] uppercase tracking-widest">System Restriction</p><p class="text-gray-500 text-[8px] font-bold uppercase mt-1">${message}</p></div>
    </div>`;
    document.body.insertAdjacentHTML('beforeend', toastHtml);
    setTimeout(() => {
        const t = document.getElementById(toastId);
        if (t) { t.classList.add('animate-out', 'slide-out-to-right'); setTimeout(() => t.remove(), 500); }
    }, 4000);
}

/* ========== PROJECT COUNT UPDATE ========== */
function updateProjectCounter() {
    const countElement = document.getElementById('projectCount');
    if (!countElement) return;
    const gridCount = document.querySelectorAll('#projectGrid .project-card').length;
    const listCount = document.querySelectorAll('#projectContainer .project-item').length;
    const total = Math.max(gridCount, listCount);
    countElement.textContent = total;
    if (total > (parseInt(countElement.dataset.last) || 0)) {
        countElement.classList.add('animate-pulse');
        setTimeout(() => countElement.classList.remove('animate-pulse'), 1000);
    }
    countElement.dataset.last = total;
}

/* ========== MAIN DEPLOYMENT FUNCTION ========== */
function finalizeProject(name, desc) {
    const pfpSrc = document.getElementById('imgPreview')?.src || '';
    const hasPfp = pfpSrc && !document.getElementById('imgPreview')?.classList.contains('hidden');
    const supervisor = document.getElementById('supName')?.value.trim() || "N/A";
    const category = document.querySelector('.project-type-chip.text-blue-500')?.innerText || "General";
    closeRightSlide();
    const loaderHtml = `<div id="loaderOverlay" class="fixed inset-0 z-[200] bg-[#020617] flex flex-col items-center justify-center">
        <div class="w-16 h-16 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin mb-6"></div>
        <p class="text-[10px] text-white font-black uppercase tracking-[0.5em] animate-pulse">Deploying Module...</p>
    </div>`;
    document.body.insertAdjacentHTML('beforeend', loaderHtml);
    setTimeout(() => {
        document.getElementById('loaderOverlay')?.remove();
        const now = new Date();
        const timestamp = `${now.getFullYear()}.${String(now.getMonth() + 1).padStart(2, '0')}.${String(now.getDate()).padStart(2, '0')}`;
        const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }).toUpperCase();
        /* DASHBOARD GRID CARD */
        const grid = document.getElementById('projectGrid');
        if (grid) {
            grid.classList.remove('hidden');
            const cardHtml = `
                <div class="project-card bg-[#050b1d] border border-white/5 rounded-[2rem] p-6 group hover:border-blue-500/30 transition-all animate-in zoom-in-95 relative overflow-hidden">
                    <div class="absolute top-0 right-0 px-3 py-1 bg-green-500/10 border-b border-l border-green-500/20 rounded-bl-xl">
                        <span class="text-[7px] text-green-500 font-black uppercase tracking-widest">Build Successful</span>
                    </div>
                    <div class="flex justify-between items-start mb-6">
                        <div class="w-12 h-12 rounded-2xl border border-white/10 overflow-hidden bg-blue-500/5 flex items-center justify-center">
                            ${hasPfp ? `<img src="${pfpSrc}" class="w-full h-full object-cover">` : `<i class="fas fa-microchip text-blue-500"></i>`}
                        </div>
                        <span class="text-[8px] text-gray-600 font-black uppercase mt-2">${category}</span>
                    </div>
                    <h6 class="text-white font-black uppercase italic text-xs mb-1 truncate">${name}</h6>
                    <p class="text-[8px] text-blue-400 font-bold mb-3 uppercase tracking-tighter">SV: ${supervisor}</p>
                    <p class="text-[9px] text-gray-500 font-medium line-clamp-2 leading-relaxed mb-6">${desc}</p>
                    <div class="pt-4 border-t border-white/5 flex justify-between items-center">
                        <div class="flex flex-col">
                            <span class="text-[7px] text-gray-700 font-black uppercase tracking-widest">Deployed</span>
                            <span class="text-[8px] text-white font-bold">${timestamp}</span>
                        </div>
                        <i class="fas fa-chevron-right text-[10px] text-gray-800 group-hover:text-blue-500 transition-colors"></i>
                    </div>
                </div>`;
            grid.insertAdjacentHTML('afterbegin', cardHtml);
        }
        /* MANAGEMENT LIST ITEM */
        addProjectToManagementList(name, category);
        /* NOTIFICATION */
        addSystemNotification(name, timestamp, timeStr);
        /* HIDE EMPTY STATES */
        document.querySelectorAll('#emptyProjectState').forEach(el => el.classList.add('hidden'));
        saveAllData();
        updateProjectCounter();
    }, 3000);
}
/* ADD TO MANAGEMENT LIST */
function addProjectToManagementList(name, tech = 'General') {
    const container = document.getElementById('projectContainer');
    if (!container) return;
    const empty = document.getElementById('emptyProjectState');
    if (empty) empty.classList.add('hidden');
    const html = `
        <div class="project-item p-6 bg-white/5 border border-white/10 rounded-3xl flex items-center justify-between hover:border-blue-500/30 transition-all mb-4">
            <div class="flex items-center gap-4">
                <input type="checkbox" class="project-checkbox w-4 h-4 accent-blue-500 rounded">
                <div>
                    <h5 class="text-white font-black text-sm uppercase">${name}</h5>
                    <p class="text-[9px] text-gray-500 uppercase tracking-wider">${tech}</p>
                </div>
            </div>
            <button onclick="deleteProjectEverywhere(this, '${name.replace(/'/g, "\\'")}')"
                    class="text-red-500 hover:text-red-400 text-xs uppercase font-black">
                Delete
            </button>
        </div>`;
    container.insertAdjacentHTML('afterbegin', html);
}
/* DELETE FROM BOTH VIEWS */
function deleteProjectEverywhere(button, projectName) {
    const item = button.closest('.project-item');
    if (item) item.remove();
    document.querySelectorAll('#projectGrid .project-card').forEach(card => {
        const title = card.querySelector('h6')?.innerText.trim();
        if (title === projectName) {
            card.classList.add('animate-out', 'zoom-out');
            setTimeout(() => card.remove(), 400);
        }
    });
    if (document.querySelectorAll('#projectContainer .project-item').length === 0) {
        document.querySelectorAll('#emptyProjectState').forEach(el => el.classList.remove('hidden'));
    }
    if (document.querySelectorAll('#projectGrid .project-card').length === 0) {
        document.getElementById('projectGrid')?.classList.add('hidden');
    }
    saveAllData();
    updateProjectCounter();
}
/* NOTIFICATIONS */
function addSystemNotification(projName, date, time) {
    const formattedDate = date || new Date().toLocaleDateString('en-CA', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/-/g, '.');
    const formattedTime = time || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }).toUpperCase();
    const logHtml = `
        <div class="notif-item p-5 bg-green-500/5 border border-green-500/20 rounded-3xl text-left relative overflow-hidden group hover:border-green-500/40 transition-all animate-in slide-in-from-top mb-3">
            <div class="flex justify-between items-start mb-2">
                <p class="text-[8px] font-black text-green-500 uppercase tracking-widest">Build Successful</p>
                <span class="text-[7px] text-gray-600 font-bold uppercase">${formattedDate} | ${formattedTime}</span>
            </div>
            <p class="text-white text-[11px] font-bold leading-relaxed">New Core Module <span class="text-green-500 italic">"${projName}"</span> successfully compiled.</p>
        </div>`;
    const scrollArea = document.getElementById('notif-scroll-area');
    if (scrollArea) {
        scrollArea.insertAdjacentHTML('afterbegin', logHtml);
        updateNotificationUI();
    }
    if (typeof views !== 'undefined' && views['Notifications']) {
        const temp = document.createElement('div');
        temp.innerHTML = views['Notifications'];
        const bgScroll = temp.querySelector('#notif-scroll-area');
        if (bgScroll) {
            bgScroll.insertAdjacentHTML('afterbegin', logHtml);
            views['Notifications'] = temp.innerHTML;
        }
        const bgCount = temp.querySelector('#notif-count');
        if (bgCount) {
            let current = parseInt(bgCount.innerText) || 0;
            bgCount.innerText = `${current + 1} new updates`;
            views['Notifications'] = temp.innerHTML;
        }
    }
    saveAllData();
}
function updateNotificationUI() {
    const badge = document.getElementById('notif-badge');
    const countText = document.getElementById('notif-count');
    if (badge) badge.classList.remove('hidden');
    if (countText) {
        let current = parseInt(countText.innerText) || 0;
        countText.innerText = `${current + 1} new updates`;
    }
}
/* BULK DELETE & SELECT ALL */
function initProjectManagement() {
    const bulkBtn = document.getElementById('bulkDeleteBtn');
    const selectAllBtn = document.getElementById('selectAllBtn');
    if (!bulkBtn || !selectAllBtn) return;
    const updateUI = () => {
        const checked = document.querySelectorAll('.project-checkbox:checked');
        const total = document.querySelectorAll('.project-checkbox').length;
        bulkBtn.textContent = `Bulk Delete (${checked.length})`;
        bulkBtn.disabled = checked.length === 0;
        bulkBtn.classList.toggle('opacity-50', checked.length === 0);
        bulkBtn.classList.toggle('cursor-not-allowed', checked.length === 0);
        selectAllBtn.textContent = checked.length === total && total > 0 ? 'Deselect All' : 'Select All';
    };
    selectAllBtn.onclick = () => {
        const all = document.querySelectorAll('.project-checkbox');
        const allChecked = Array.from(all).every(c => c.checked);
        all.forEach(c => c.checked = !allChecked);
        updateUI();
    };
    document.getElementById('projectContainer')?.addEventListener('change', e => {
        if (e.target.classList.contains('project-checkbox')) updateUI();
    });
    bulkBtn.onclick = () => {
        if (!confirm('Permanently delete selected projects?')) return;
        const checked = document.querySelectorAll('.project-checkbox:checked');
        const names = [];
        checked.forEach(cb => {
            const name = cb.closest('.project-item')?.querySelector('h5')?.innerText.trim();
            if (name) names.push(name);
            cb.closest('.project-item').remove();
        });
        names.forEach(name => {
            document.querySelectorAll('#projectGrid .project-card').forEach(card => {
                if (card.querySelector('h6')?.innerText.trim() === name) card.remove();
            });
        });
        if (document.querySelectorAll('#projectContainer .project-item').length === 0) {
            document.querySelectorAll('#emptyProjectState').forEach(el => el.classList.remove('hidden'));
        }
        if (document.querySelectorAll('#projectGrid .project-card').length === 0) {
            document.getElementById('projectGrid')?.classList.add('hidden');
        }
        updateUI();
        saveAllData();
        updateProjectCounter();
    };
    updateUI();
}
/* STORAGE */
function saveAllData() {
    const data = {
        grid: document.getElementById('projectGrid')?.innerHTML || "",
        list: document.getElementById('projectContainer')?.innerHTML || "",
        notifs: document.getElementById('notif-scroll-area')?.innerHTML || "",
        notifCount: document.getElementById('notif-count')?.innerText || "0 new updates",
        rawNotifs: typeof views !== 'undefined' ? views['Notifications'] : null
    };
    localStorage.setItem('nxxt_system_data_v5', JSON.stringify(data)); // New key to clear old data
}
function loadAllData() {
    const saved = localStorage.getItem('nxxt_system_data_v5'); // ← FIXED: getItem, not getElementById
    if (!saved) return;

    try {
        const data = JSON.parse(saved);

        const grid = document.getElementById('projectGrid');
        if (data.grid && grid) {
            grid.innerHTML = data.grid;
            if (data.grid.trim()) {
                grid.classList.remove('hidden');
                document.querySelectorAll('#emptyProjectState').forEach(el => el.classList.add('hidden'));
            }
        }

        const container = document.getElementById('projectContainer');
        if (data.list && container) {
            container.innerHTML = data.list;
        }

        const scrollArea = document.getElementById('notif-scroll-area');
        if (data.notifs && scrollArea) {
            scrollArea.innerHTML = data.notifs;
        }

        const countText = document.getElementById('notif-count');
        if (data.notifCount && countText) {
            countText.innerText = data.notifCount;
            if (parseInt(data.notifCount) > 0) document.getElementById('notif-badge')?.classList.remove('hidden');
        }

        if (data.rawNotifs && typeof views !== 'undefined') {
            views['Notifications'] = data.rawNotifs;
        }

        updateProjectCounter();
        initProjectManagement();
    } catch (e) {
        console.error('Load failed:', e);
    }
}
function closeCenterModal() { document.getElementById('centerModalOverlay')?.remove(); }
function closeRightSlide() { document.getElementById('rightSlideOverlay')?.remove(); }
/* VIEW SWITCHING – FULL PERSISTENCE */
const originalUpdateView = window.updateView;
window.updateView = function(viewName) {
    if (originalUpdateView) originalUpdateView(viewName);
    else {
        const main = document.getElementById('main-content') || document.querySelector('main') || document.body;
        if (views && views[viewName]) main.innerHTML = views[viewName];
    }
    // Always restore + update after switch
    setTimeout(() => {
        loadAllData();
        updateProjectCounter();
    }, 50);
};
/* INITIAL LOAD */
window.addEventListener('load', () => {
    loadAllData();
    updateProjectCounter();
    initProjectManagement();
});


/////// this is for the collaborationnnnn


// Switch between the 'Create' feed and the 'Join' feed
function switchCollabTab(tab) {
    const createBtn = document.getElementById('tab-create');
    const joinBtn = document.getElementById('tab-join');
    const createCont = document.getElementById('collab-create-content');
    const joinCont = document.getElementById('collab-join-content');
    const fab = document.getElementById('collabFAB');

    if (tab === 'create') {
        createBtn.className = "px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest bg-cyan-600 text-black";
        joinBtn.className = "px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-white";
        createCont.classList.remove('hidden');
        joinCont.classList.add('hidden');
        fab.classList.remove('hidden');
    } else {
        joinBtn.className = "px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest bg-cyan-600 text-black";
        createBtn.className = "px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-white";
        joinCont.classList.remove('hidden');
        createCont.classList.add('hidden');
        fab.classList.add('hidden');
    }
}

// Generate 10-character Alphanumeric Code
function generateCollabCode() {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = '';
    for (let i = 0; i < 10; i++) code += chars.charAt(Math.floor(Math.random() * chars.length));
    const input = document.getElementById('collabCode');
    if(input) input.value = code;
}

// STEP 1: Center Modal for Naming & Code
function openCollabNamingModal() {
    const modalHtml = `
    <div id="collabCenterModal" class="fixed inset-0 z-[200] bg-black/90 backdrop-blur-md flex items-center justify-center p-6 touch-none">
        <div class="bg-[#050b1d] border border-cyan-500/20 w-full max-w-md rounded-[2.5rem] p-8 space-y-6 animate-in zoom-in-95">
            <div class="flex items-center gap-3">
                <i class="fas fa-plus-square text-cyan-500"></i>
                <h5 class="text-white font-black uppercase italic tracking-widest text-sm">Initialize Stream</h5>
            </div>
            <div class="space-y-4">
                <input type="text" id="cName" placeholder="COLLAB NAME" class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white text-[16px] md:text-[10px] font-black uppercase tracking-widest focus:border-cyan-500 outline-none">
                
                <div class="relative">
                    <input type="text" id="collabCode" maxlength="10" placeholder="10-DIGIT ACCESS CODE" class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white text-[16px] md:text-[10px] font-black uppercase tracking-widest focus:border-cyan-500 outline-none">
                    <button onclick="generateCollabCode()" class="absolute right-2 top-1/2 -translate-y-1/2 bg-cyan-500 text-black text-[8px] font-black px-3 py-2 rounded-lg hover:bg-white transition-all">AUTO-GEN</button>
                </div>
            </div>
            <div class="flex gap-4">
                <button onclick="document.getElementById('collabCenterModal').remove()" class="flex-1 py-4 bg-white/5 text-gray-500 text-[10px] font-black uppercase rounded-xl">Cancel</button>
                <button onclick="openCollabConfigModal()" class="flex-1 py-4 bg-cyan-600 text-black text-[10px] font-black uppercase rounded-xl">Next Step</button>
            </div>
        </div>
    </div>`;
    document.body.insertAdjacentHTML('beforeend', modalHtml);
}

// STEP 2: Right Modal for Advanced Config (Stack, Roles, Location)
function openCollabConfigModal() {
    const name = document.getElementById('cName').value;
    const code = document.getElementById('collabCode').value;
    if(!name || code.length < 5) { showNxxtAlert("NAME AND VALID CODE REQUIRED"); return; }
    
    document.getElementById('collabCenterModal').remove();

    const stacks = ['HTML', 'CSS', 'JS', 'React', 'Tailwind', 'Node.js', 'Python', 'MongoDB', 'Swift', 'C++', 'Java', 'Three.js'];

    const slideHtml = `
    <div id="collabSlideModal" class="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm">
        <div class="absolute right-0 top-0 h-full w-full max-w-lg bg-[#02010a] border-l border-white/10 p-8 overflow-y-auto animate-in slide-in-from-right duration-500">
            <div class="space-y-8 pb-12">
                <div class="flex justify-between items-start">
                    <div>
                        <span class="text-cyan-500 text-[9px] font-black uppercase tracking-[0.3em]">Protocol: Create</span>
                        <h2 class="text-white font-black text-2xl uppercase italic mt-1">${name}</h2>
                    </div>
                    <div class="flex flex-col items-end">
                        <span class="text-gray-600 text-[8px] font-black uppercase">Stream Code</span>
                        <div class="flex items-center gap-2 mt-1">
                            <span class="text-white text-[14px] font-black tracking-widest">${code}</span>
                            <i onclick="navigator.clipboard.writeText('${code}'); showNxxtAlert('CODE COPIED')" class="fas fa-copy text-cyan-500 cursor-pointer text-xs"></i>
                        </div>
                    </div>
                </div>

                <div class="space-y-5">
                    <textarea id="cLongDesc" placeholder="COLLAB MISSION DESCRIPTION (OPTIONAL)..." class="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white text-[16px] md:text-[10px] font-bold uppercase h-32 outline-none focus:border-cyan-500 transition-all"></textarea>
                    
                    <div class="grid grid-cols-2 gap-4">
                        <select id="cPrivacy" class="bg-white/5 border border-white/10 rounded-xl p-4 text-white text-[10px] font-black uppercase outline-none focus:border-cyan-500">
                            <option value="Open">Open Collab</option>
                            <option value="Private">Private Collab</option>
                        </select>
                        <input type="number" id="cLimit" placeholder="MAX USERS" class="bg-white/5 border border-white/10 rounded-xl p-4 text-white text-[16px] md:text-[10px] outline-none focus:border-cyan-500">
                    </div>

                    <div class="space-y-3">
                        <p class="text-[9px] text-white font-black uppercase opacity-50">Select Stack (Select up to 10)</p>
                        <div class="flex flex-wrap gap-2">
                            ${stacks.map(s => `<div onclick="this.classList.toggle('bg-cyan-600'); this.classList.toggle('text-black'); this.classList.toggle('border-cyan-600')" class="px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-[8px] text-gray-400 font-black uppercase cursor-pointer transition-all">${s}</div>`).join('')}
                        </div>
                    </div>

                    <div class="grid grid-cols-2 gap-4">
                        <input type="text" id="pubName" placeholder="PUBLISHER NAME" class="bg-white/5 border border-white/10 rounded-xl p-4 text-white text-[16px] md:text-[10px] outline-none">
                        <input type="text" id="pubRole" placeholder="PUBLISHER ROLE" class="bg-white/5 border border-white/10 rounded-xl p-4 text-white text-[16px] md:text-[10px] outline-none">
                    </div>

                    <div class="grid grid-cols-2 gap-4">
                        <input type="text" id="cLoc" placeholder="LOCATION" class="bg-white/5 border border-white/10 rounded-xl p-4 text-white text-[16px] md:text-[10px] outline-none">
                        <select id="cGender" class="bg-white/5 border border-white/10 rounded-xl p-4 text-white text-[10px] font-black uppercase outline-none">
                            <option>Male</option>
                            <option>Female</option>
                            <option>Other</option>
                        </select>
                    </div>
                </div>

                <div class="flex gap-4 pt-6">
                    <button onclick="document.getElementById('collabSlideModal').remove()" class="flex-1 py-4 bg-white/5 text-gray-500 text-[10px] font-black uppercase rounded-2xl">Abort</button>
                    <button onclick="finalizeCollab('${name}', '${code}')" class="flex-1 py-4 bg-cyan-600 text-black text-[10px] font-black uppercase rounded-2xl shadow-lg shadow-cyan-600/20">Finalize & Deploy</button>
                </div>
            </div>
        </div>
    </div>`;
    document.body.insertAdjacentHTML('beforeend', slideHtml);
}

// STEP 3: Deploy to the Join Tab
function finalizeCollab(name, code) {
    const publisher = document.getElementById('pubName').value || "ANONYMOUS";
    const role = document.getElementById('pubRole').value || "DEVELOPER";
    const desc = document.getElementById('cLongDesc').value || "No mission description provided.";
    
    const cardHtml = `
    <div class="bg-[#050b1d] border border-white/5 rounded-[2rem] p-6 hover:border-cyan-500/30 transition-all group animate-in zoom-in-95">
        <div class="flex justify-between items-start mb-4">
            <h6 class="text-white font-black uppercase italic text-[13px] tracking-tight">${name}</h6>
            <div class="flex flex-col items-end">
                <span class="text-[7px] text-gray-600 font-black uppercase mb-1">Status</span>
                <span class="px-2 py-1 bg-cyan-500/10 text-cyan-500 text-[7px] font-black rounded-md border border-cyan-500/20 uppercase">Active</span>
            </div>
        </div>
        <p class="text-[9px] text-gray-500 line-clamp-2 mb-6 uppercase font-bold tracking-wide leading-relaxed">${desc}</p>
        <div class="flex items-center gap-3 mb-6 bg-white/[0.02] p-3 rounded-2xl border border-white/5">
            <div class="w-8 h-8 rounded-xl bg-cyan-600 flex items-center justify-center text-[11px] text-black font-black">${publisher[0].toUpperCase()}</div>
            <div>
                <p class="text-[8px] text-white font-black uppercase">${publisher}</p>
                <p class="text-[7px] text-cyan-500 font-bold uppercase opacity-70">${role}</p>
            </div>
        </div>
        <button onclick="openJoinRequestModal('${name}')" class="w-full py-4 bg-white/5 group-hover:bg-cyan-600 group-hover:text-black text-white text-[9px] font-black uppercase tracking-[0.2em] rounded-xl transition-all">Join Stream</button>
    </div>`;

    document.getElementById('collab-join-content').insertAdjacentHTML('afterbegin', cardHtml);
    document.getElementById('collabSlideModal').remove();
    
    // Centered Modal Alert as per Saved Instructions
    showNxxtAlert("STREAM DEPLOYED TO NETWORK");
    switchCollabTab('join');
}

// STEP 4: Joining an existing task
function openJoinRequestModal(collabName) {
    const slideHtml = `
    <div id="joinModal" class="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm">
        <div class="absolute right-0 top-0 h-full w-full max-w-md bg-[#02010a] border-l border-white/10 p-8 animate-in slide-in-from-right duration-500 overflow-y-auto">
            <span class="text-cyan-500 text-[9px] font-black uppercase tracking-[0.3em]">Protocol: Join</span>
            <h2 class="text-white font-black text-2xl uppercase italic mb-8 mt-1">Uplink to ${collabName}</h2>
            <div class="space-y-4">
                <input type="text" id="jCode" placeholder="ENTER 10-DIGIT ACCESS CODE" class="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white text-[16px] md:text-[10px] font-black uppercase outline-none focus:border-cyan-500">
                <input type="text" id="jName" placeholder="YOUR FULL NAME" class="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white text-[16px] md:text-[10px] font-black uppercase outline-none">
                <textarea id="jIdea" placeholder="HOW WILL YOU CONTRIBUTE?" class="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white text-[16px] md:text-[10px] font-black uppercase h-32 outline-none"></textarea>
                
                <div class="grid grid-cols-2 gap-4">
                    <input type="text" id="jRole" placeholder="YOUR ROLE (FRONTEND...)" class="bg-white/5 border border-white/10 rounded-xl p-4 text-white text-[16px] md:text-[10px] outline-none">
                    <input type="text" id="jLoc" placeholder="LOCATION" class="bg-white/5 border border-white/10 rounded-xl p-4 text-white text-[16px] md:text-[10px] outline-none">
                </div>
                
                <select id="jGender" class="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white text-[10px] font-black uppercase outline-none">
                    <option>Male</option>
                    <option>Female</option>
                </select>
            </div>
            <div class="flex gap-4 mt-8 pb-10">
                <button onclick="document.getElementById('joinModal').remove()" class="flex-1 py-4 bg-white/5 text-gray-500 text-[10px] font-black uppercase rounded-xl">Abort</button>
                <button onclick="submitJoinRequest()" class="flex-1 py-4 bg-cyan-600 text-black text-[10px] font-black uppercase rounded-xl">Submit Request</button>
            </div>
        </div>
    </div>`;
    document.body.insertAdjacentHTML('beforeend', slideHtml);
}

function submitJoinRequest() {
    document.getElementById('joinModal').remove();
    showNxxtAlert("UPLINK REQUEST SENT. CHECK NOTIFICATIONS.");
}





////// for the INBOX
/**
 * TECH NXXT COMMS HUB - V4 (PURE BUILD PROTOCOL)
 * THEME: TOTAL SYSTEM CALIBRATION
 */

// 1. --- MATRIX ANIMATION ENGINE ---
function startMatrixEffect(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    // Set internal resolution
    canvas.width = canvas.parentElement.offsetWidth;
    canvas.height = 400; 

    const characters = "0101010101010101"; // Binary focus for building feel
    const fontSize = 12;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);

    function draw() {
        ctx.fillStyle = "rgba(2, 1, 10, 0.05)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#2563eb"; // Blue Matrix to match brand
        ctx.font = fontSize + "px monospace";

        for (let i = 0; i < drops.length; i++) {
            const text = characters.charAt(Math.floor(Math.random() * characters.length));
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
            drops[i]++;
        }
    }
    const interval = setInterval(draw, 40);
    canvas.dataset.intervalId = interval; 
}

// 2. --- CORE CONTROLLER (ALL TABS BLOCKED) ---
function switchInboxTab(tab) {
    // UI Update: Tabs
    document.querySelectorAll('.inbox-tab').forEach(t => {
        t.className = "inbox-tab flex-shrink-0 snap-start px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all border border-white/10 text-gray-500 bg-white/5 hover:text-white whitespace-nowrap";
    });
    
    const activeTab = document.getElementById(`itab-${tab}`);
    if(activeTab) {
        activeTab.className = "inbox-tab flex-shrink-0 snap-start px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all border-blue-500/50 text-white bg-blue-600 shadow-[0_0_20px_rgba(37,99,235,0.2)] whitespace-nowrap";
    }
    
    const content = document.getElementById('inbox-content');
    const fab = document.getElementById('postFAB');
    
    // Only show FAB on Post tab, but it will trigger a "Building" modal
    tab === 'post' ? fab.classList.remove('hidden') : fab.classList.add('hidden');

    // Clean up old matrix intervals
    document.querySelectorAll('canvas').forEach(c => clearInterval(c.dataset.intervalId));

    // Every Tab renders the same Building State
    renderBuildingState(tab);
}

function renderBuildingState(tab) {
    const content = document.getElementById('inbox-content');
    const canvasId = `matrix-${tab}`;
    
    content.innerHTML = `
    <div class="relative overflow-hidden rounded-[3rem] border border-white/5 bg-[#02010a] h-[450px] flex flex-col items-center justify-center text-center p-10 group">
        <canvas id="${canvasId}" class="absolute inset-0 opacity-10 group-hover:opacity-30 transition-opacity"></canvas>
        
        <div class="relative z-10 animate-in zoom-in-95 duration-700">
            <div class="w-20 h-20 bg-blue-600/10 border border-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_40px_rgba(37,99,235,0.1)]">
                <i class="fas fa-tools text-2xl text-blue-500 animate-bounce"></i>
            </div>
            
            <p class="text-[8px] font-black text-blue-500 uppercase tracking-[0.8em] mb-4">Neural Hub Protocol</p>
            <h4 class="text-white font-black uppercase text-3xl tracking-tighter mb-4">${tab}</h4>
            
            <div class="h-1 w-12 bg-blue-600/30 rounded-full mx-auto mb-8"></div>
            
            <p class="text-[10px] font-bold text-gray-600 uppercase tracking-[0.3em] max-w-[220px] mx-auto leading-relaxed mb-10">
                Architectural override active. This node is currently being engineered.
            </p>
            
            <div class="inline-flex items-center gap-3 px-8 py-3 bg-white/5 border border-white/10 rounded-full">
                <div class="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <p class="text-white text-[9px] font-black uppercase tracking-widest">We Are Building Now</p>
            </div>
        </div>
    </div>`;
    
    startMatrixEffect(canvasId);
}

// 3. --- MODAL ALERT (CENTERED) ---
function showNxxtAlert(message) {
    const alertModal = `
    <div id="alertModal" class="fixed inset-0 z-[500] bg-black/95 flex items-center justify-center p-8 backdrop-blur-2xl">
        <div class="bg-[#050b1d] border border-white/10 w-full max-w-xs p-10 rounded-[3rem] text-center shadow-2xl animate-in zoom-in-90">
            <div class="w-16 h-16 bg-blue-600/10 border border-blue-500/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <i class="fas fa-shield-alt text-blue-500 text-xl"></i>
            </div>
            <h6 class="text-white font-black uppercase text-[11px] tracking-widest mb-4">System Notice</h6>
            <p class="text-gray-500 font-bold uppercase text-[9px] leading-relaxed mb-8 tracking-wide">${message}</p>
            <button onclick="document.getElementById('alertModal').remove()" class="w-full py-4 bg-white text-black rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all">Acknowledge</button>
        </div>
    </div>`;
    document.body.insertAdjacentHTML('beforeend', alertModal);
}

// 4. --- POST BROADCASTER (BUILDING MODE) ---
function openCreatePostModal() {
    showNxxtAlert("BROADCASTING MODULE: WE ARE BUILDING NOW.");
}
