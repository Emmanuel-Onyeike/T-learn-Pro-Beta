/**
 * TECH NXXT: tasks.js
 * Functional Logic Engine - BLUE EDITION
 * Handles: Tab switching, Modal states, and Time Toggles
 */

document.addEventListener('DOMContentLoaded', () => {
    console.log("Nxxt Task Logic: Blue Protocol Operational");
});

/**
 * Switch between 'Everything', 'Timeline', 'Active', and 'Closed'
 * Updates styles to Tech Nxxt Blue aesthetic
 * @param {string} tab - The ID of the sector to display
 */
window.switchTaskTab = function(tab) {
    const container = document.getElementById('taskTabContent');
    const tabs = ['everything', 'timeline', 'active', 'closed'];
    
    if (!container) return;

    // 1. Reset all tab button styles to inactive (dimmed white)
    tabs.forEach(t => {
        const el = document.getElementById('tab-' + t);
        if (el) {
            el.className = "px-6 py-2.5 rounded-full border border-white/10 text-white/40 text-[10px] font-black uppercase tracking-widest transition-all hover:border-blue-500/30";
        }
    });

    // 2. Set the clicked tab to active (Tech Nxxt Blue)
    const activeBtn = document.getElementById('tab-' + tab);
    if (activeBtn) {
        activeBtn.className = "px-6 py-2.5 rounded-full bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest shadow-lg shadow-blue-600/20 transition-all";
    }

    // 3. Update the content area with blue-accented empty states
    container.innerHTML = `
        <div class="animate-in fade-in zoom-in-95 duration-500 flex flex-col items-center justify-center text-center">
            <div class="w-20 h-20 rounded-full bg-blue-500/5 border border-blue-500/10 flex items-center justify-center mb-6">
                <i class="fas fa-layer-group text-blue-500/40 text-3xl"></i>
            </div>
            <h3 class="text-white font-black text-xl uppercase tracking-tighter mb-2">${tab} Sector</h3>
            <p class="text-white/20 text-[9px] font-bold uppercase tracking-[0.2em] max-w-xs leading-relaxed mx-auto">
                Neural link synchronized. Sector data currently null. Standby for deployment.
            </p>
        </div>
    `;
};

/**
 * Triggers the central system modal
 * @param {string} title - The title to display in the modal
 */
window.openTaskModal = function(title) {
    const modal = document.getElementById('taskModal');
    const titleEl = document.getElementById('modalTitle');
    
    if (modal && titleEl) {
        titleEl.innerText = title;
        modal.classList.remove('hidden');
        modal.classList.add('flex'); 
    }
};

/**
 * Closes the active system modal
 */
window.closeTaskModal = function() {
    const modal = document.getElementById('taskModal');
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }
};

/**
 * Toggles between 'Working Time' and 'Due Time' visuals
 * @param {string} view - 'working' or 'due'
 */
window.toggleTimeView = function(view) {
    const btnW = document.getElementById('btnWorking');
    const btnD = document.getElementById('btnDue');
    
    if (!btnW || !btnD) return;
    
    if (view === 'working') {
        // Set Working to Blue, Reset Due
        btnW.className = "flex-1 py-2 rounded-full bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest transition-all";
        btnD.className = "flex-1 py-2 rounded-full text-white/40 text-[10px] font-black uppercase tracking-widest transition-all";
    } else {
        // Set Due to Blue, Reset Working
        btnD.className = "flex-1 py-2 rounded-full bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest transition-all";
        btnW.className = "flex-1 py-2 rounded-full text-white/40 text-[10px] font-black uppercase tracking-widest transition-all";
    }
};
