/* ── T LEARN PRO: views/overview.js ──
   Adds to the global views object loaded by dashboard.js */

views['Overview'] = `
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
                <p class="text-[10px] text-gray-400 font-bold uppercase tracking-[0.3em]">Live Project Stream</p>
            </div>
        </div>
       
        <div class="flex gap-1.5 items-end h-8">
            <div class="w-1 bg-emerald-500/40 h-3 rounded-full animate-[bounce_1s_infinite]"></div>
            <div class="w-1 bg-emerald-500 h-6 rounded-full animate-[bounce_1.2s_infinite]"></div>
            <div class="w-1 bg-emerald-500/60 h-4 rounded-full animate-[bounce_0.8s_infinite]"></div>
        </div>
    </div>
   
    <div class="relative w-full h-[320px] rounded-3xl bg-black/40 border border-white/5 backdrop-blur-sm overflow-hidden">
        <!-- Live stream content -->
        <div id="liveProjectStream" class="absolute inset-0 p-6 overflow-y-auto space-y-4 z-10 scrollbar-thin scrollbar-thumb-emerald-500/30 scrollbar-track-transparent">
            <!-- Projects will be dynamically inserted here -->
        </div>

        <!-- Fallback when no projects -->
        <div id="streamEmpty" class="absolute inset-0 flex flex-col items-center justify-center z-10 text-center">
            <div class="w-20 h-20 mb-4 rounded-full bg-emerald-500/5 flex items-center justify-center border border-emerald-500/10 group-hover:border-emerald-500/30 transition-all duration-1000">
                <i class="fas fa-satellite-dish text-emerald-500/20 group-hover:text-emerald-500 group-hover:animate-pulse"></i>
            </div>
            <span class="text-[10px] font-black text-emerald-500/40 uppercase tracking-[0.4em]">Awaiting First Project...</span>
            <p class="text-[9px] text-gray-500 mt-2 max-w-xs">Your deployed projects will appear here in real-time.</p>
        </div>
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
`;

