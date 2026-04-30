/* ── TECH NXXT: views/task.js ── */
views['Task'] = `
    <div class="max-w-7xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-10">
        <!-- ... Branding and Stats Cards remain same ... -->

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <!-- Left Pane remains same -->
            
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
                    <!-- Default State -->
                </div>
            </div>
        </div>
    </div>

    <!-- Enhanced Create Task Modal -->
    <div id="createTaskModal" class="fixed inset-0 z-[110] hidden flex items-center justify-center p-6">
        <div class="absolute inset-0 bg-black/95 backdrop-blur-xl" onclick="closeCreateTaskModal()"></div>
        <div class="relative bg-[#0F0F0F] border border-blue-500/20 w-full max-w-lg rounded-[3.5rem] p-10 shadow-2xl overflow-y-auto max-h-[90vh]">
            <h2 class="text-white font-black text-2xl uppercase tracking-tighter">New Objective</h2>
            <p class="text-blue-500/50 text-[9px] font-black uppercase tracking-[0.3em] mb-6">Neural Grid Deployment</p>
            
            <div class="space-y-5">
                <!-- Task Name -->
                <div>
                    <label class="text-white/30 text-[9px] font-black uppercase tracking-widest ml-4 mb-2 block">Task Identification</label>
                    <input type="text" id="inpTaskName" placeholder="ENTER TASK NAME..." class="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-6 text-white text-sm focus:outline-none focus:border-blue-500/50">
                </div>

                <!-- Worker Limit & Access -->
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="text-white/30 text-[9px] font-black uppercase tracking-widest ml-4 mb-2 block">Worker Limit</label>
                        <input type="number" id="inpTaskLimit" placeholder="MAX 10" class="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-6 text-white text-sm focus:outline-none">
                    </div>
                    <div>
                        <label class="text-white/30 text-[9px] font-black uppercase tracking-widest ml-4 mb-2 block">Access Type</label>
                        <select id="inpTaskPrivacy" class="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-6 text-white/60 text-[10px] font-black uppercase appearance-none focus:outline-none">
                            <option value="public">Public (Open Join)</option>
                            <option value="private">Private (Invite Only)</option>
                        </select>
                    </div>
                </div>

                <!-- Duration & Priority -->
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="text-white/30 text-[9px] font-black uppercase tracking-widest ml-4 mb-2 block">Duration (Days)</label>
                        <input type="text" id="inpTaskDuration" placeholder="e.g. 5 DAYS" class="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-6 text-white text-sm focus:outline-none">
                    </div>
                    <div>
                        <label class="text-white/30 text-[9px] font-black uppercase tracking-widest ml-4 mb-2 block">Priority</label>
                        <select id="inpTaskPriority" class="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-6 text-white/60 text-[10px] font-black uppercase appearance-none focus:outline-none">
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                    </div>
                </div>

                <!-- Description (Optional) -->
                <div>
                    <label class="text-white/30 text-[9px] font-black uppercase tracking-widest ml-4 mb-2 block">Description (Optional)</label>
                    <textarea id="inpTaskDesc" rows="2" placeholder="OBJECTIVE DETAILS..." class="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-6 text-white text-sm focus:outline-none resize-none"></textarea>
                </div>
            </div>

            <div class="flex gap-4 mt-8">
                <button onclick="closeCreateTaskModal()" class="flex-1 py-4 rounded-2xl border border-white/10 text-white/40 text-[10px] font-black uppercase tracking-widest hover:bg-white/5 transition-all">Cancel</button>
                <button onclick="processTaskCreation()" class="flex-1 py-4 rounded-2xl bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest hover:bg-blue-700 shadow-lg shadow-blue-600/20 transition-all">Confirm</button>
            </div>
        </div>
    </div>

    <!-- Status Overlay (Loading & Success) -->
    <div id="statusOverlay" class="fixed inset-0 z-[120] hidden flex items-center justify-center p-6">
        <div class="absolute inset-0 bg-black/80 backdrop-blur-md"></div>
        <div class="relative bg-[#0F0F0F] border border-white/10 rounded-[3rem] p-12 text-center max-w-sm w-full animate-in zoom-in-95 duration-300">
            <div id="statusLoader" class="flex flex-col items-center">
                <div class="w-12 h-12 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin mb-6"></div>
                <h3 class="text-white font-black text-lg uppercase tracking-tighter">Creating Task</h3>
                <p class="text-white/20 text-[9px] font-bold uppercase mt-2">Synchronizing with Neural Grid...</p>
            </div>
            <div id="statusSuccess" class="hidden flex flex-col items-center">
                <div class="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mb-6">
                    <i class="fas fa-check text-green-500 text-2xl"></i>
                </div>
                <h3 class="text-white font-black text-lg uppercase tracking-tighter">Success</h3>
                <p class="text-white/20 text-[9px] font-bold uppercase mt-2">Objective Successfully Deployed</p>
            </div>
        </div>
    </div>
`;
