/* ── TECH NXXT: views/task.js ──
   Custom implementation for Nxxt Task Dashboard */

views['Task'] = `
    <div class="max-w-7xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-10">
        
        <!-- Tab Branding -->
        <div class="text-center py-4">
            <h1 class="text-white text-lg font-black uppercase tracking-[0.4em] opacity-20 italic">Nxxt Task</h1>
        </div>

        <!-- Top Statistics Row -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
            <!-- Task Limit Card -->
            <div class="bg-[#CCFF00] rounded-[2.5rem] p-8 flex flex-col justify-between h-48 shadow-lg shadow-[#CCFF00]/5">
                <h3 class="text-black text-5xl font-bold tracking-tighter">5+</h3>
                <p class="text-black/60 text-xs font-bold uppercase tracking-widest">Task Limit (Max 10)</p>
            </div>

            <!-- Completed Card -->
            <div class="bg-[#1A1A1A] border border-white/5 rounded-[2.5rem] p-8 flex flex-col justify-between h-48 relative group cursor-pointer hover:bg-[#222]">
                <div class="flex justify-between items-start">
                    <div>
                        <p class="text-white/60 text-sm font-medium mb-1">Completed Task</p>
                        <h3 class="text-white text-4xl font-bold">0</h3>
                    </div>
                    <button onclick="openTaskModal('Completed Tasks')" class="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-all">
                        <i class="fas fa-arrow-up rotate-45 text-sm"></i>
                    </button>
                </div>
                <p class="text-white/20 text-[10px] font-bold uppercase tracking-widest">No Activity</p>
            </div>

            <!-- Overdue Card -->
            <div class="bg-[#1A1A1A] border border-white/5 rounded-[2.5rem] p-8 flex flex-col justify-between h-48 relative group cursor-pointer hover:bg-[#222]">
                <div class="flex justify-between items-start">
                    <div>
                        <p class="text-white/60 text-sm font-medium mb-1">Overdue Task</p>
                        <h3 class="text-white text-4xl font-bold">0</h3>
                    </div>
                    <button onclick="openTaskModal('Overdue Tasks')" class="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-all">
                        <i class="fas fa-arrow-up rotate-45 text-sm"></i>
                    </button>
                </div>
                <p class="text-white/20 text-[10px] font-bold uppercase tracking-widest">System Clear</p>
            </div>

            <!-- To Do Card -->
            <div class="bg-[#1A1A1A] border border-white/5 rounded-[2.5rem] p-8 flex flex-col justify-between h-48 relative group cursor-pointer hover:bg-[#222]">
                <div class="flex justify-between items-start">
                    <div>
                        <p class="text-white/60 text-sm font-medium mb-1">To Do Task</p>
                        <h3 class="text-white text-4xl font-bold">0</h3>
                    </div>
                    <button onclick="openTaskModal('Pending Tasks')" class="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-all">
                        <i class="fas fa-arrow-up rotate-45 text-sm"></i>
                    </button>
                </div>
                <p class="text-white/20 text-[10px] font-bold uppercase tracking-widest">Queue Empty</p>
            </div>
        </div>

        <!-- Main Content Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            <!-- Left Pane -->
            <div class="lg:col-span-4 bg-[#1A1A1A] rounded-[2.5rem] p-8 border border-white/5">
                <div class="flex bg-black/40 p-1.5 rounded-full mb-8">
                    <button id="btnWorking" onclick="toggleTimeView('working')" class="flex-1 py-2 rounded-full bg-[#CCFF00] text-black text-[10px] font-black uppercase tracking-widest transition-all">Working Time</button>
                    <button id="btnDue" onclick="toggleTimeView('due')" class="flex-1 py-2 rounded-full text-white/40 text-[10px] font-black uppercase tracking-widest transition-all">Due Time</button>
                </div>
                
                <!-- Null Record State -->
                <div class="h-64 flex flex-col items-center justify-center border-b border-white/5 pb-2">
                    <i class="fas fa-chart-bar text-white/5 text-5xl mb-4"></i>
                    <p class="text-white/20 text-[10px] font-black uppercase tracking-[0.3em]">No Records Logged</p>
                </div>

                <!-- Team Members Section -->
                <div class="mt-10">
                    <p class="text-white/40 text-[10px] font-black uppercase tracking-widest mb-4">Team Members</p>
                    <div class="flex items-center gap-3">
                         <div class="w-10 h-10 rounded-full border-2 border-dashed border-white/10 flex items-center justify-center text-white/10 text-xs">
                            <i class="fas fa-user"></i>
                         </div>
                         <p class="text-white/10 text-[9px] font-bold uppercase tracking-widest">Not Active Yet</p>
                    </div>
                </div>
            </div>

            <!-- Right Pane: Tasks & Timelines -->
            <div class="lg:col-span-8 space-y-6">
                <!-- Tab Controls -->
                <div class="flex flex-wrap gap-3">
                    <button onclick="switchTaskTab('everything')" id="tab-everything" class="px-6 py-2.5 rounded-full border border-white/10 text-white/40 text-[10px] font-black uppercase tracking-widest">Everything</button>
                    <button onclick="switchTaskTab('timeline')" id="tab-timeline" class="px-6 py-2.5 rounded-full bg-[#CCFF00] text-black text-[10px] font-black uppercase tracking-widest">Project Timeline</button>
                    <button onclick="switchTaskTab('active')" id="tab-active" class="px-6 py-2.5 rounded-full border border-white/10 text-white/40 text-[10px] font-black uppercase tracking-widest">Active</button>
                    <button onclick="switchTaskTab('closed')" id="tab-closed" class="px-6 py-2.5 rounded-full border border-white/10 text-white/40 text-[10px] font-black uppercase tracking-widest">Closed</button>
                </div>

                <!-- Content Container -->
                <div id="taskTabContent" class="bg-[#1A1A1A] rounded-[2.5rem] p-12 border border-white/5 min-h-[400px] flex flex-col items-center justify-center text-center">
                    <div class="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6">
                        <i class="fas fa-folder-open text-white/10 text-3xl"></i>
                    </div>
                    <h3 class="text-white font-black text-xl uppercase tracking-tighter mb-2">Initialize Protocol</h3>
                    <p class="text-white/20 text-[9px] font-bold uppercase tracking-[0.2em] max-w-xs leading-relaxed">
                        No tasks found in the current selection. Deploy a new objective to begin tracking.
                    </p>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal System -->
    <div id="taskModal" class="fixed inset-0 z-[100] hidden flex items-center justify-center p-6">
        <div class="absolute inset-0 bg-black/80 backdrop-blur-md" onclick="closeTaskModal()"></div>
        <div class="relative bg-[#111] border border-white/10 w-full max-w-md rounded-[3rem] p-10 shadow-2xl animate-in zoom-in-95 duration-300">
            <button onclick="closeTaskModal()" class="absolute top-6 right-6 text-white/20 hover:text-white">
                <i class="fas fa-times"></i>
            </button>
            <div class="text-center">
                <div class="w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center mx-auto mb-6">
                    <i class="fas fa-ghost text-blue-500 text-2xl"></i>
                </div>
                <h2 id="modalTitle" class="text-white font-black text-2xl uppercase tracking-tighter mb-2"></h2>
                <p class="text-white/20 text-[10px] font-bold uppercase tracking-widest leading-relaxed">
                    The requested data stream is currently <span class="text-blue-500">Empty</span>. No records have been synthesized for this parameter yet.
                </p>
                <button onclick="closeTaskModal()" class="mt-8 w-full py-4 rounded-2xl bg-white/5 border border-white/10 text-white text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all">
                    Acknowledge
                </button>
            </div>
        </div>
    </div>

   
    </script>
`;
