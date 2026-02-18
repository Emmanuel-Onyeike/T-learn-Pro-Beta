/* ── T LEARN PRO: views/notifications.js ──
   Adds to the global views object loaded by dashboard.js */

views['Notifications'] = `
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
`;

