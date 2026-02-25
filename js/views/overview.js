/* ── T LEARN PRO: views/overview.js ──
   Adds to the global views object loaded by dashboard.js */

views['Overview'] = `
<div class="space-y-8 animate-in fade-in duration-700">

    <!-- ── ROW 1: Top 3 stats — Projects, Semester, Level ── -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-5">

        <div class="group relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-[#0a0f25] to-[#050b1d] p-7 transition-all duration-500 hover:border-blue-500/50 hover:shadow-[0_0_30px_-10px_rgba(59,130,246,0.3)]">
            <div class="relative z-10 flex items-center gap-5">
                <div class="flex h-14 w-14 items-center justify-center rounded-2xl border border-blue-500/30 bg-blue-500/10 shadow-[inset_0_0_15px_rgba(59,130,246,0.2)] transition-transform duration-500 group-hover:scale-110">
                    <i class="fas fa-code-branch text-2xl text-blue-400"></i>
                </div>
                <div>
                    <p class="text-[11px] font-black uppercase tracking-[0.2em] text-blue-400/60">Projects</p>
                    <h3 id="projectCount" class="mt-1 text-4xl font-black tracking-tighter text-white">0</h3>
                </div>
            </div>
            <i class="fas fa-project-diagram absolute -right-6 -bottom-6 text-[10rem] opacity-[0.03] group-hover:opacity-[0.07] group-hover:text-blue-500 transition-all duration-700 rotate-12"></i>
        </div>

        <div class="group relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-[#0a0f25] to-[#050b1d] p-7 transition-all duration-500 hover:border-purple-500/50 hover:shadow-[0_0_30px_-10px_rgba(168,85,247,0.3)]">
            <div class="relative z-10 flex items-center gap-5">
                <div class="flex h-14 w-14 items-center justify-center rounded-2xl border border-purple-500/30 bg-purple-500/10 shadow-[inset_0_0_15px_rgba(168,85,247,0.2)] transition-transform duration-500 group-hover:scale-110">
                    <i class="fas fa-calendar-alt text-2xl text-purple-400"></i>
                </div>
                <div>
                    <p class="text-[11px] font-black uppercase tracking-[0.2em] text-purple-400/60">Semester</p>
                    <h3 id="semesterVal" class="mt-1 text-4xl font-black tracking-tighter text-white">001</h3>
                </div>
            </div>
            <i class="fas fa-graduation-cap absolute -right-6 -bottom-6 text-[10rem] opacity-[0.03] group-hover:opacity-[0.07] group-hover:text-purple-500 transition-all duration-700 rotate-12"></i>
        </div>

        <div class="group relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-[#0a0f25] to-[#050b1d] p-7 transition-all duration-500 hover:border-cyan-500/50 hover:shadow-[0_0_30px_-10px_rgba(6,182,212,0.3)]">
            <div class="relative z-10 flex items-center gap-5">
                <div class="flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-500/30 bg-cyan-500/10 shadow-[inset_0_0_15px_rgba(6,182,212,0.2)] transition-transform duration-500 group-hover:scale-110">
                    <i class="fas fa-layer-group text-2xl text-cyan-400"></i>
                </div>
                <div>
                    <p class="text-[11px] font-black uppercase tracking-[0.2em] text-cyan-400/60">Level</p>
                    <h3 id="dash-level-val" class="mt-1 text-4xl font-black tracking-tighter text-white">100</h3>
                </div>
            </div>
            <i class="fas fa-chart-line absolute -right-6 -bottom-6 text-[10rem] opacity-[0.03] group-hover:opacity-[0.07] group-hover:text-cyan-500 transition-all duration-700 rotate-12"></i>
        </div>
    </div>

    <!-- ── ROW 2: XT Points + Streak + Rank ── -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-5">

        <!-- XT Points — big hero card -->
        <div class="group relative overflow-hidden rounded-[2.5rem] border border-yellow-500/20 bg-gradient-to-br from-yellow-500/5 to-[#050b1d] p-7 transition-all duration-500 hover:border-yellow-500/50 hover:shadow-[0_0_30px_-10px_rgba(234,179,8,0.25)]">
            <div class="relative z-10">
                <div class="flex items-center gap-3 mb-3">
                    <div class="flex h-10 w-10 items-center justify-center rounded-xl border border-yellow-500/30 bg-yellow-500/10">
                        <i class="fas fa-bolt text-lg text-yellow-400"></i>
                    </div>
                    <p class="text-[11px] font-black uppercase tracking-widest text-yellow-400/60">XT Points</p>
                </div>
                <h3 class="text-5xl font-black tracking-tighter text-white">
                    <span id="dash-xp-val">0</span>
                    <span class="text-lg text-yellow-500 font-black ml-1">XP</span>
                </h3>
                <!-- Daily XP progress bar -->
                <div class="mt-4">
                    <div class="flex justify-between items-center mb-1">
                        <span class="text-[9px] font-black text-white/20 uppercase tracking-widest">Daily Activity</span>
                        <span id="dailyPct" class="text-[9px] font-black text-yellow-400/60">0%</span>
                    </div>
                    <div class="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                        <div id="dailyBar" class="h-full bg-gradient-to-r from-yellow-500 to-orange-400 rounded-full transition-all duration-700" style="width:0%"></div>
                    </div>
                </div>
            </div>
            <i class="fas fa-trophy absolute -right-4 -bottom-4 text-[8rem] opacity-[0.03] group-hover:opacity-[0.07] group-hover:text-yellow-500 transition-all duration-700 rotate-12"></i>
        </div>

        <!-- Streak -->
        <div class="group relative overflow-hidden rounded-[2.5rem] border border-orange-500/20 bg-gradient-to-br from-orange-600/5 to-[#050b1d] p-7 transition-all duration-500 hover:border-orange-500/50 hover:shadow-[0_0_30px_-10px_rgba(234,88,12,0.25)]">
            <div class="relative z-10">
                <div class="flex items-center gap-3 mb-3">
                    <div class="flex h-10 w-10 items-center justify-center rounded-xl border border-orange-500/30 bg-orange-500/10">
                        <i class="fas fa-fire text-lg text-orange-400"></i>
                    </div>
                    <p class="text-[11px] font-black uppercase tracking-widest text-orange-400/60">Streak</p>
                </div>
                <h3 class="text-5xl font-black tracking-tighter text-white">
                    <span id="streakCount">0</span>
                    <span class="text-lg text-orange-500 font-black ml-1">days</span>
                </h3>
                <p id="streakMsg" class="text-[10px] text-white/20 font-bold uppercase tracking-wider mt-4">Log in daily to build your streak</p>
            </div>
            <i class="fas fa-bolt absolute -right-4 -bottom-4 text-[8rem] opacity-[0.03] group-hover:opacity-[0.07] group-hover:text-orange-500 transition-all duration-700 rotate-12"></i>
        </div>

        <!-- Rank -->
        <div class="group relative overflow-hidden rounded-[2.5rem] border border-amber-500/20 bg-gradient-to-br from-amber-500/5 to-[#050b1d] p-7 transition-all duration-500 hover:border-amber-500/50 hover:shadow-[0_0_30px_-10px_rgba(245,158,11,0.25)]">
            <div class="relative z-10">
                <div class="flex items-center gap-3 mb-3">
                    <div class="flex h-10 w-10 items-center justify-center rounded-xl border border-amber-500/30 bg-amber-500/10">
                        <i class="fas fa-medal text-lg text-amber-400"></i>
                    </div>
                    <p class="text-[11px] font-black uppercase tracking-widest text-amber-400/60">Global Rank</p>
                </div>
                <h3 class="text-5xl font-black tracking-tighter text-white italic">
                    <span id="rankVal">#—</span>
                </h3>
                <p id="rankMsg" class="text-[10px] text-white/20 font-bold uppercase tracking-wider mt-4">Earn XP to climb the leaderboard</p>
            </div>
            <i class="fas fa-crown absolute -right-4 -bottom-4 text-[8rem] opacity-[0.03] group-hover:opacity-[0.07] group-hover:text-amber-500 transition-all duration-700 rotate-12"></i>
        </div>
    </div>

    <!-- ── ROW 3: Activity Nebula (full width) ── -->
    <div class="group relative overflow-hidden rounded-[3rem] border border-white/5 bg-[#050b1d] p-8 transition-all duration-700 hover:border-green-500/20">
        <div class="flex items-center justify-between mb-6">
            <div>
                <h3 class="text-lg font-black text-white italic uppercase tracking-[0.3em]">
                    Activity Nebula <span class="text-green-500 text-2xl">.</span>
                </h3>
                <p class="text-[10px] text-gray-500 font-black uppercase tracking-widest mt-1">52-week activity history</p>
            </div>
            <div class="flex items-center gap-3 text-[9px] font-black uppercase tracking-widest text-white/20">
                <span class="flex items-center gap-1.5"><span class="w-3 h-3 rounded-sm bg-white/[0.04] inline-block"></span>None</span>
                <span class="flex items-center gap-1.5"><span class="w-3 h-3 rounded-sm bg-[#14532d] inline-block"></span>Low</span>
                <span class="flex items-center gap-1.5"><span class="w-3 h-3 rounded-sm bg-[#16a34a] inline-block"></span>Mid</span>
                <span class="flex items-center gap-1.5"><span class="w-3 h-3 rounded-sm bg-[#4ade80] inline-block"></span>High</span>
            </div>
        </div>
        <div class="relative w-full h-[200px] bg-black/40 rounded-[2rem] border border-white/5 shadow-inner overflow-hidden">
            <canvas id="nebula" class="w-full h-full"></canvas>
        </div>
    </div>

    <!-- ── ROW 4: System Core (live project stream) ── -->
    <div class="group relative overflow-hidden rounded-[3rem] border border-white/5 bg-[#050b1d] p-8 transition-all duration-700 hover:border-emerald-500/20">
        <div class="flex justify-between items-center mb-8">
            <div>
                <h3 class="text-2xl font-black text-white italic uppercase tracking-tighter">System Core <span class="text-emerald-500">.</span></h3>
                <div class="flex items-center gap-2 mt-2">
                    <span class="relative flex h-2 w-2">
                        <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <p class="text-[10px] text-gray-400 font-bold uppercase tracking-[0.3em]">Live Project Stream</p>
                </div>
            </div>
            <div class="flex gap-1.5 items-end h-8">
                <div class="w-1 bg-emerald-500/40 h-3 rounded-full animate-[bounce_1s_infinite]"></div>
                <div class="w-1 bg-emerald-500 h-6 rounded-full animate-[bounce_1.2s_infinite]"></div>
                <div class="w-1 bg-emerald-500/60 h-4 rounded-full animate-[bounce_0.8s_infinite]"></div>
            </div>
        </div>
        <div class="relative w-full h-[280px] rounded-3xl bg-black/40 border border-white/5 backdrop-blur-sm overflow-hidden">
            <div id="liveProjectStream" class="absolute inset-0 p-6 overflow-y-auto space-y-4 z-10"></div>
            <div id="streamEmpty" class="absolute inset-0 flex flex-col items-center justify-center z-10 text-center">
                <div class="w-20 h-20 mb-4 rounded-full bg-emerald-500/5 flex items-center justify-center border border-emerald-500/10 group-hover:border-emerald-500/30 transition-all duration-1000">
                    <i class="fas fa-satellite-dish text-emerald-500/20 group-hover:text-emerald-500 group-hover:animate-pulse"></i>
                </div>
                <span class="text-[10px] font-black text-emerald-500/40 uppercase tracking-[0.4em]">Awaiting First Project...</span>
                <p class="text-[9px] text-gray-500 mt-2 max-w-xs">Your deployed projects will appear here in real-time.</p>
            </div>
        </div>
    </div>

    <!-- ── ROW 5: Bottom stats — Collab, Deployed, Gigs ── -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-5">

        <div class="group relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#050b1d] p-7 transition-all duration-500 hover:border-indigo-500/40">
            <div class="relative z-10 flex items-center gap-5">
                <div class="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                    <i class="fas fa-handshake text-2xl"></i>
                </div>
                <div>
                    <p class="text-[11px] font-black uppercase tracking-widest text-gray-500">Collab</p>
                    <h3 id="collabCount" class="mt-1 text-3xl font-black text-white">0</h3>
                    <p class="text-[9px] text-white/20 font-bold uppercase mt-1">Coming soon</p>
                </div>
            </div>
            <i class="fas fa-users absolute -right-4 -bottom-4 text-8xl text-white/[0.02] group-hover:text-indigo-500/[0.05] transition-all rotate-12"></i>
        </div>

        <div class="group relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#050b1d] p-7 transition-all duration-500 hover:border-cyan-400/40">
            <div class="relative z-10 flex items-center gap-5">
                <div class="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-600/10 border border-cyan-500/20 text-cyan-400">
                    <i class="fas fa-rocket text-2xl"></i>
                </div>
                <div>
                    <p class="text-[11px] font-black uppercase tracking-widest text-gray-500">Deployed</p>
                    <h3 id="deployCount" class="mt-1 text-3xl font-black text-white">0</h3>
                </div>
            </div>
            <i class="fas fa-cloud-upload-alt absolute -right-4 -bottom-4 text-8xl text-white/[0.02] group-hover:text-cyan-500/[0.05] transition-all rotate-12"></i>
        </div>

        <div class="group relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#050b1d] p-7 transition-all duration-500 hover:border-emerald-400/40">
            <div class="relative z-10 flex items-center gap-5">
                <div class="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-600/10 border border-emerald-500/20 text-emerald-400">
                    <i class="fas fa-briefcase text-2xl"></i>
                </div>
                <div>
                    <p class="text-[11px] font-black uppercase tracking-widest text-gray-500">Gigs</p>
                    <h3 id="gigCount" class="mt-1 text-3xl font-black text-white">0</h3>
                </div>
            </div>
            <i class="fas fa-money-bill-wave absolute -right-4 -bottom-4 text-8xl text-white/[0.02] group-hover:text-emerald-500/[0.05] transition-all rotate-12"></i>
        </div>
    </div>

</div>
`;

