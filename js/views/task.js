/* ── TECH NXXT: views/task.js ──
   Custom implementation for Nxxt Task Dashboard (Blue Edition) */

views['Task'] = `
    <div class="max-w-7xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-10">
        
        <!-- Tab Branding -->
        <div class="text-center py-4">
            <h1 class="text-white text-lg font-black uppercase tracking-[0.4em] opacity-20 italic">Nxxt Task</h1>
        </div>

        <!-- Top Statistics Row -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
            <!-- Create Task Card (Primary Action) -->
            <div onclick="openCreateTaskModal()" class="bg-[#1A1A1A] border border-blue-500/20 rounded-[2.5rem] p-8 flex flex-col justify-between h-48 relative group cursor-pointer hover:bg-[#222] hover:border-blue-500/50 transition-all shadow-lg hover:shadow-blue-500/5">
                <div class="flex justify-between items-start">
                    <div>
                        <p class="text-blue-500 text-xs font-black uppercase tracking-widest mb-1">New Objective</p>
                        <h3 class="text-white text-3xl font-bold tracking-tighter">Create Task</h3>
                    </div>
                    <div class="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-600/20 group-hover:scale-110 transition-all">
                        <i class="fas fa-plus text-sm"></i>
                    </div>
                </div>
                <p class="text-white/20 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                    <span class="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
                    Ready for Deployment
                </p>
            </div>

            <!-- Completed Card -->
            <div class="bg-[#1A1A1A] border border-white/5 rounded-[2.5rem] p-8 flex flex-col justify-between h-48 relative group cursor-pointer hover:bg-[#222] transition-all">
                <div class="flex justify-between items-start">
                    <div>
                        <p class="text-white/60 text-sm font-medium mb-1">Completed Task</p>
                        <h3 class="text-white text-4xl font-bold">0</h3>
                    </div>
                    <button onclick="openTaskModal('Completed Tasks')" class="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white group-hover:bg-blue-600 group-hover:border-blue-600 transition-all">
                        <i class="fas fa-arrow-up rotate-45 text-sm"></i>
                    </button>
                </div>
                <p class="text-white/20 text-[10px] font-bold uppercase tracking-widest">No Activity</p>
            </div>

            <!-- Overdue Card -->
            <div class="bg-[#1A1A1A] border border-white/5 rounded-[2.5rem] p-8 flex flex-col justify-between h-48 relative group cursor-pointer hover:bg-[#222] transition-all">
                <div class="flex justify-between items-start">
                    <div>
                        <p class="text-white/60 text-sm font-medium mb-1">Overdue Task</p>
                        <h3 class="text-white text-4xl font-bold">0</h3>
                    </div>
                    <button onclick="openTaskModal('Overdue Tasks')" class="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white group-hover:bg-blue-600 group-hover:border-blue-600 transition-all">
                        <i class="fas fa-arrow-up rotate-45 text-sm"></i>
                    </button>
                </div>
                <p class="text-white/20 text-[10px] font-bold uppercase tracking-widest">System Clear</p>
            </div>

            <!-- Task Limit Card (Info) -->
            <div class="bg-blue-600 rounded-[2.5rem] p-8 flex flex-col justify-between h-48 shadow-lg shadow-blue-500/10">
                <h3 class="text-white text-5xl font-bold tracking-tighter">5+</h3>
                <p class="text-white/70 text-xs font-bold uppercase tracking-widest">Task Limit (Max 10)</p>
            </div>
        </div>

        <!-- Main Content Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            <!-- Left Pane -->
            <div class="lg:col-span-4 bg-[#1A1A1A] rounded-[2.5rem] p-8 border border-white/5">
                <div class="flex bg-black/40 p-1.5 rounded-full mb-8">
                    <button id="btnWorking" onclick="toggleTimeView('working')" class="flex-1 py-2 rounded-full bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest transition-all">Working Time</button>
                    <button id="btnDue" onclick="toggleTimeView('due')" class="flex-1 py-2 rounded-full text-white/40 text-[10px] font-black uppercase tracking-widest transition-all">Due Time</button>
                </div>
                
                <div class="h-64 flex flex-col items-center justify-center border-b border-white/5 pb-2">
                    <i class="fas fa-chart-bar text-white/5 text-5xl mb-4"></i>
                    <p class="text-white/20 text-[10px] font-black uppercase tracking-[0.3em]">No Records Logged</p>
                </div>

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

            <!-- Right Pane -->
            <div class="lg:col-span-8 space-y-6">
                <div class="flex flex-wrap gap-3">
                    <button onclick="switchTaskTab('everything')" id="tab-everything" class="px-6 py-2.5 rounded-full border border-white/10 text-white/40 text-[10px] font-black uppercase tracking-widest hover:border-blue-500/30 transition-all">Everything</button>
                    <button onclick="switchTaskTab('created')" id="tab-created" class="px-6 py-2.5 rounded-full border border-white/10 text-white/40 text-[10px] font-black uppercase tracking-widest hover:border-blue-500/30 transition-all">Created</button>
                    <button onclick="switchTaskTab('timeline')" id="tab-timeline" class="px-6 py-2.5 rounded-full bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest shadow-lg shadow-blue-600/20">Project Timeline</button>
                    <button onclick="switchTaskTab('active')" id="tab-active" class="px-6 py-2.5 rounded-full border border-white/10 text-white/40 text-[10px] font-black uppercase tracking-widest hover:border-blue-500/30 transition-all">Active</button>
                    <button onclick="switchTaskTab('closed')" id="tab-closed" class="px-6 py-2.5 rounded-full border border-white/10 text-white/40 text-[10px] font-black uppercase tracking-widest hover:border-blue-500/30 transition-all">Closed</button>
                </div>

                <div id="taskTabContent" class="bg-[#1A1A1A] rounded-[2.5rem] p-12 border border-white/5 min-h-[400px] flex flex-col items-center justify-center text-center">
                    <div class="w-20 h-20 rounded-full bg-blue-500/5 flex items-center justify-center mb-6 border border-blue-500/10">
                        <i class="fas fa-folder-open text-blue-500/40 text-3xl"></i>
                    </div>
                    <h3 class="text-white font-black text-xl uppercase tracking-tighter mb-2">Initialize Protocol</h3>
                    <p class="text-white/20 text-[9px] font-bold uppercase tracking-[0.2em] max-w-xs leading-relaxed">
                        No tasks found in the current selection. Deploy a new objective to begin tracking.
                    </p>
                </div>
            </div>
        </div>
    </div>

    <!-- Info/Alert Modal System -->
    <div id="taskModal" class="fixed inset-0 z-[100] hidden flex items-center justify-center p-6">
        <div class="absolute inset-0 bg-black/90 backdrop-blur-md" onclick="closeTaskModal()"></div>
        <div class="relative bg-[#0F0F0F] border border-white/10 w-full max-w-md rounded-[3rem] p-10 shadow-2xl animate-in zoom-in-95 duration-300">
            <button onclick="closeTaskModal()" class="absolute top-6 right-6 text-white/20 hover:text-white transition-colors">
                <i class="fas fa-times"></i>
            </button>
            <div class="text-center">
                <div class="w-16 h-16 rounded-full bg-blue-600/10 flex items-center justify-center mx-auto mb-6 border border-blue-600/20">
                    <i class="fas fa-ghost text-blue-500 text-2xl"></i>
                </div>
                <h2 id="modalTitle" class="text-white font-black text-2xl uppercase tracking-tighter mb-2"></h2>
                <p id="modalDescription" class="text-white/20 text-[10px] font-bold uppercase tracking-widest leading-relaxed">
                    The requested data stream is currently <span class="text-blue-500 font-black italic">Empty</span>.
                </p>
                <button onclick="closeTaskModal()" class="mt-8 w-full py-4 rounded-2xl bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest hover:bg-blue-700 transition-all">
                    Acknowledge
                </button>
            </div>
        </div>
    </div>

    <!-- Enhanced Create Task Modal -->
    <div id="createTaskModal" class="fixed inset-0 z-[110] hidden flex items-center justify-center p-6">
        <div class="absolute inset-0 bg-black/95 backdrop-blur-xl" onclick="closeCreateTaskModal()"></div>
        <div class="relative bg-[#0F0F0F] border border-blue-500/20 w-full max-w-xl rounded-[3.5rem] p-10 shadow-2xl animate-in slide-in-from-bottom-10 duration-500 overflow-y-auto max-h-[90vh]">
            <h2 class="text-white font-black text-3xl uppercase tracking-tighter mb-1">New Objective</h2>
            <p class="text-blue-500/50 text-[10px] font-black uppercase tracking-[0.3em] mb-8">Deploying task to neural grid</p>
            
            <div class="space-y-6">
                <!-- Task Name -->
                <div>
                    <label class="text-white/30 text-[9px] font-black uppercase tracking-widest ml-4 mb-2 block">Task Identification</label>
                    <input type="text" id="inpTaskName" placeholder="ENTER TASK NAME..." class="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white text-sm focus:outline-none focus:border-blue-500/50 transition-all">
                </div>

                <!-- Workers & Privacy -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label class="text-white/30 text-[9px] font-black uppercase tracking-widest ml-4 mb-2 block">Worker Limit / Assignment</label>
                        <input type="text" id="inpTaskWorkers" placeholder="USERNAME OR 'OPEN LINK'..." class="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white text-sm focus:outline-none focus:border-blue-500/50 transition-all">
                    </div>
                    <div>
                        <label class="text-white/30 text-[9px] font-black uppercase tracking-widest ml-4 mb-2 block">Privacy Protocol</label>
                        <select id="inpTaskPrivacy" class="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white/60 text-[10px] font-black uppercase appearance-none focus:outline-none focus:border-blue-500/50 cursor-pointer">
                            <option value="private">Private Task</option>
                            <option value="public">Public Task</option>
                        </select>
                    </div>
                </div>

                <!-- Duration & Priority -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label class="text-white/30 text-[9px] font-black uppercase tracking-widest ml-4 mb-2 block">Task Duration</label>
                        <input type="text" id="inpTaskDuration" placeholder="E.G., 24 HOURS / 7 DAYS" class="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white text-sm focus:outline-none focus:border-blue-500/50 transition-all">
                    </div>
                    <div>
                        <label class="text-white/30 text-[9px] font-black uppercase tracking-widest ml-4 mb-2 block">Priority Level</label>
                        <div class="grid grid-cols-3 gap-2">
                            <button onclick="setPriority('low')" class="priority-btn py-3 rounded-xl bg-white/5 border border-white/5 text-white/40 text-[9px] font-black uppercase hover:border-blue-500/50 transition-all">Low</button>
                            <button onclick="setPriority('med')" class="priority-btn py-3 rounded-xl bg-blue-600 text-white text-[9px] font-black uppercase">Med</button>
                            <button onclick="setPriority('high')" class="priority-btn py-3 rounded-xl bg-white/5 border border-white/5 text-white/40 text-[9px] font-black uppercase hover:border-blue-500/50 transition-all">High</button>
                        </div>
                    </div>
                </div>

                <!-- Description -->
                <div>
                    <label class="text-white/30 text-[9px] font-black uppercase tracking-widest ml-4 mb-2 block">Objective Description (Optional)</label>
                    <textarea id="inpTaskDesc" rows="3" placeholder="ENTER ADDITIONAL PARAMETERS..." class="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white text-sm focus:outline-none focus:border-blue-500/50 transition-all resize-none"></textarea>
                </div>
            </div>

            <div class="flex gap-4 mt-10">
                <button onclick="closeCreateTaskModal()" class="flex-1 py-4 rounded-2xl border border-white/10 text-white/40 text-[10px] font-black uppercase tracking-widest hover:bg-white/5 transition-all">Cancel</button>
                <button onclick="processTaskCreation()" class="flex-2 px-10 py-4 rounded-2xl bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest hover:bg-blue-700 shadow-lg shadow-blue-600/20 transition-all">Confirm</button>
            </div>
        </div>
    </div>

    <!-- Global Status Overlay (Loading/Success) -->
    <div id="statusOverlay" class="fixed inset-0 z-[200] hidden flex items-center justify-center p-6">
        <div class="absolute inset-0 bg-black/80 backdrop-blur-md"></div>
        
        <!-- Loading State -->
        <div id="statusLoading" class="relative bg-[#0F0F0F] border border-blue-500/20 rounded-[3rem] p-12 text-center animate-in zoom-in-95">
            <div class="w-16 h-16 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin mx-auto mb-6"></div>
            <h3 class="text-white font-black text-xl uppercase tracking-tighter">Creating Task</h3>
            <p class="text-white/20 text-[9px] font-bold uppercase tracking-[0.2em] mt-2">Initializing Neural Protocol...</p>
        </div>

        <!-- Success State -->
        <div id="statusSuccess" class="relative hidden bg-[#0F0F0F] border border-green-500/20 rounded-[3rem] p-12 text-center animate-in zoom-in-95">
            <div class="w-16 h-16 bg-green-500/10 border border-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <i class="fas fa-check text-green-500 text-2xl animate-bounce"></i>
            </div>
            <h3 class="text-white font-black text-xl uppercase tracking-tighter">Success</h3>
            <p class="text-white/20 text-[9px] font-bold uppercase tracking-[0.2em] mt-2">Task Created Successfully</p>
        </div>
    </div>
`;
