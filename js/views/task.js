/* ── T LEARN PRO: views/task.js ──
   Direct implementation of the Pro Workspace Task Dashboard */

views['Task'] = `
    <div class="max-w-7xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-10">
        
        <!-- Welcome Header -->
        <div class="text-center py-4">
            <h1 class="text-white text-lg font-medium opacity-90">Welcome to Pro Workspace. Enjoy <span class="text-blue-500">UiShyed!</span></h1>
        </div>

        <!-- Top Statistics Row -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
            <!-- Totals Card -->
            <div class="bg-[#CCFF00] rounded-[2.5rem] p-8 flex flex-col justify-between h-48 shadow-lg shadow-[#CCFF00]/5">
                <h3 class="text-black text-5xl font-bold tracking-tighter">50+</h3>
                <p class="text-black/60 text-xs font-bold uppercase tracking-widest">Totals Task</p>
            </div>

            <!-- Completed Card -->
            <div class="bg-[#1A1A1A] border border-white/5 rounded-[2.5rem] p-8 flex flex-col justify-between h-48 relative group cursor-pointer hover:bg-[#222]">
                <div class="flex justify-between items-start">
                    <div>
                        <p class="text-white/60 text-sm font-medium mb-1">Completed Task</p>
                        <h3 class="text-white text-4xl font-bold">12</h3>
                    </div>
                    <div class="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-all">
                        <i class="fas fa-arrow-up rotate-45 text-sm"></i>
                    </div>
                </div>
                <p class="text-white/40 text-[10px] font-bold uppercase tracking-widest">+1 this week</p>
            </div>

            <!-- Overdue Card -->
            <div class="bg-[#1A1A1A] border border-white/5 rounded-[2.5rem] p-8 flex flex-col justify-between h-48 relative group cursor-pointer hover:bg-[#222]">
                <div class="flex justify-between items-start">
                    <div>
                        <p class="text-white/60 text-sm font-medium mb-1">Overdue Task</p>
                        <h3 class="text-white text-4xl font-bold">3</h3>
                    </div>
                    <div class="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-all">
                        <i class="fas fa-arrow-up rotate-45 text-sm"></i>
                    </div>
                </div>
                <p class="text-white/40 text-[10px] font-bold uppercase tracking-widest">+1 this week</p>
            </div>

            <!-- To Do Card -->
            <div class="bg-[#1A1A1A] border border-white/5 rounded-[2.5rem] p-8 flex flex-col justify-between h-48 relative group cursor-pointer hover:bg-[#222]">
                <div class="flex justify-between items-start">
                    <div>
                        <p class="text-white/60 text-sm font-medium mb-1">To Do Task</p>
                        <h3 class="text-white text-4xl font-bold">5</h3>
                    </div>
                    <div class="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-all">
                        <i class="fas fa-arrow-up rotate-45 text-sm"></i>
                    </div>
                </div>
                <p class="text-white/40 text-[10px] font-bold uppercase tracking-widest">+1 this week</p>
            </div>
        </div>

        <!-- Main Content Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            <!-- Left: Working Time Chart Area -->
            <div class="lg:col-span-4 bg-[#1A1A1A] rounded-[2.5rem] p-8 border border-white/5">
                <div class="flex bg-black/40 p-1.5 rounded-full mb-8">
                    <button class="flex-1 py-2 rounded-full bg-[#CCFF00] text-black text-[10px] font-black uppercase tracking-widest">Working Time</button>
                    <button class="flex-1 py-2 rounded-full text-white/40 text-[10px] font-black uppercase tracking-widest">Due Time</button>
                </div>
                
                <!-- Mock Chart Visualization -->
                <div class="h-64 flex items-end justify-between gap-2 px-2 border-b border-white/5 pb-2">
                    ${[0.6, 0.8, 0.5, 0.7, 0.9, 0.7, 0.4].map((h, i) => `
                        <div class="flex flex-col items-center flex-1 group">
                            <div class="w-full bg-[#CCFF00] rounded-t-lg transition-all duration-500" style="height: ${h * 150}px"></div>
                            <div class="w-full bg-white/20 rounded-b-lg" style="height: ${(1-h) * 50}px"></div>
                        </div>
                    `).join('')}
                </div>
                <div class="flex justify-between mt-4 px-2 text-[10px] font-bold text-white/20 uppercase tracking-tighter">
                    <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                </div>

                <!-- Team Members Footer -->
                <div class="mt-10">
                    <p class="text-white/40 text-[10px] font-black uppercase tracking-widest mb-4">Team Members</p>
                    <div class="flex -space-x-3">
                        ${[1, 2, 3, 4, 5].map(i => `<div class="w-10 h-10 rounded-full border-2 border-[#1A1A1A] bg-blue-500 overflow-hidden shadow-xl"><img src="https://i.pravatar.cc/100?img=${i+10}" class="w-full h-full object-cover"></div>`).join('')}
                        <div class="w-10 h-10 rounded-full border-2 border-[#1A1A1A] bg-[#CCFF00] flex items-center justify-center text-black text-xs font-black">+</div>
                    </div>
                </div>
            </div>

            <!-- Right: Project Timeline Area -->
            <div class="lg:col-span-8 space-y-6">
                <!-- Filters Row -->
                <div class="flex flex-wrap gap-3">
                    <button class="px-6 py-2.5 rounded-full border border-white/10 text-white text-[10px] font-black uppercase tracking-widest">Everything</button>
                    <button class="px-6 py-2.5 rounded-full bg-[#CCFF00] text-black text-[10px] font-black uppercase tracking-widest">Project Timeline</button>
                    <button class="px-6 py-2.5 rounded-full border border-white/10 text-white text-[10px] font-black uppercase tracking-widest">Active</button>
                    <button class="px-6 py-2.5 rounded-full border border-white/10 text-white text-[10px] font-black uppercase tracking-widest">Closed</button>
                    <button class="ml-auto px-6 py-2.5 rounded-full border border-white/10 text-white text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                        Filter <i class="fas fa-chevron-down text-[8px]"></i>
                    </button>
                </div>

                <!-- Horizontal Timeline Container -->
                <div class="bg-[#1A1A1A] rounded-[2.5rem] p-8 border border-white/5 overflow-hidden">
                    <!-- Days Header -->
                    <div class="grid grid-cols-7 gap-4 mb-10 pb-4 border-b border-white/5 text-center">
                        ${['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(day => `
                            <div>
                                <p class="text-white/20 text-[8px] font-bold uppercase tracking-widest mb-1">March 6, 2018</p>
                                <p class="text-white text-xs font-bold">${day}</p>
                            </div>
                        `).join('')}
                    </div>

                    <!-- Task Rows -->
                    <div class="relative space-y-6 h-[300px]">
                        <!-- Vertical Grid Lines Mock -->
                        <div class="absolute inset-0 grid grid-cols-7 gap-4 pointer-events-none opacity-5">
                            ${Array(7).fill('<div class="border-l border-white h-full"></div>').join('')}
                        </div>

                        <!-- Web Design Task -->
                        <div class="ml-[25%] w-[40%] bg-[#CCFF00] p-4 rounded-full flex justify-between items-center shadow-lg shadow-[#CCFF00]/10">
                            <span class="text-black text-[10px] font-black uppercase tracking-widest ml-4">Web Design</span>
                            <div class="flex -space-x-2 mr-2">
                                <img src="https://i.pravatar.cc/100?img=1" class="w-6 h-6 rounded-full border-2 border-[#CCFF00]">
                                <img src="https://i.pravatar.cc/100?img=2" class="w-6 h-6 rounded-full border-2 border-[#CCFF00]">
                            </div>
                        </div>

                        <!-- Web Develop Task -->
                        <div class="ml-[50%] w-[35%] bg-[#CCFF00] p-4 rounded-full flex justify-between items-center">
                            <span class="text-black text-[10px] font-black uppercase tracking-widest ml-4">Web Develop</span>
                            <div class="flex -space-x-2 mr-2">
                                <img src="https://i.pravatar.cc/100?img=3" class="w-6 h-6 rounded-full border-2 border-[#CCFF00]">
                            </div>
                        </div>

                        <!-- Branding Task -->
                        <div class="ml-[10%] w-[30%] bg-white p-4 rounded-full flex justify-between items-center">
                            <span class="text-black text-[10px] font-black uppercase tracking-widest ml-4">Branding Design</span>
                            <div class="flex -space-x-2 mr-2">
                                <img src="https://i.pravatar.cc/100?img=4" class="w-6 h-6 rounded-full border-2 border-white">
                            </div>
                        </div>

                         <!-- Marketing Task -->
                        <div class="ml-[40%] w-[45%] bg-[#CCFF00] p-4 rounded-full flex justify-between items-center">
                            <span class="text-black text-[10px] font-black uppercase tracking-widest ml-4">Marketing Strategy</span>
                            <div class="flex -space-x-2 mr-2">
                                <img src="https://i.pravatar.cc/100?img=5" class="w-6 h-6 rounded-full border-2 border-[#CCFF00]">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
`;
