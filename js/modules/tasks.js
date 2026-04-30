/**
 * TECH NXXT: tasks.js
 * Functional Logic Engine - BLUE EDITION
 * Handles: Tab switching, Modal states, Time Toggles, and Task Deployment
 */

document.addEventListener('DOMContentLoaded', () => {
    console.log("Nxxt Task Logic: Blue Protocol Operational");
    // Initialize default view
    switchTaskTab('everything');
});

/**
 * Priority Selection Logic
 * Handles the visual state of priority buttons in the creation modal
 */
window.currentPriority = 'med'; // Default state

window.setPriority = function(level) {
    window.currentPriority = level;
    const buttons = document.querySelectorAll('.priority-btn');
    
    buttons.forEach(btn => {
        const text = btn.innerText.toLowerCase();
        if (text.includes(level)) {
            btn.className = "priority-btn py-3 rounded-xl bg-blue-600 text-white text-[9px] font-black uppercase transition-all";
        } else {
            btn.className = "priority-btn py-3 rounded-xl bg-white/5 border border-white/5 text-white/40 text-[9px] font-black uppercase hover:border-blue-500/50 transition-all";
        }
    });
};

/**
 * Switch between Sectors
 * Updated to include 'Created' sector and dynamic empty states
 */
window.switchTaskTab = function(tab) {
    const container = document.getElementById('taskTabContent');
    const tabs = ['everything', 'created', 'timeline', 'active', 'closed'];
    
    if (!container) return;

    // 1. Reset all tab button styles to inactive
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

    // 3. Update the content area with Sector-specific data
    let icon = "fa-layer-group";
    let message = "Neural link synchronized. Sector data currently null.";
    
    if (tab === 'created') {
        icon = "fa-plus-circle";
        message = "Scanning for tasks initialized by your signature...";
    } else if (tab === 'timeline') {
        icon = "fa-stream";
        message = "Project timeline visualization offline.";
    }

    container.innerHTML = `
        <div class="animate-in fade-in zoom-in-95 duration-500 flex flex-col items-center justify-center text-center">
            <div class="w-20 h-20 rounded-full bg-blue-500/5 border border-blue-500/10 flex items-center justify-center mb-6">
                <i class="fas ${icon} text-blue-500/40 text-3xl"></i>
            </div>
            <h3 class="text-white font-black text-xl uppercase tracking-tighter mb-2">${tab} Sector</h3>
            <p class="text-white/20 text-[9px] font-bold uppercase tracking-[0.2em] max-w-xs leading-relaxed mx-auto">
                ${message} Standby for deployment.
            </p>
        </div>
    `;
};

/**
 * Task Creation Protocol
 * Handles 5s loading sequence and success feedback
 */
window.processTaskCreation = function() {
    const overlay = document.getElementById('statusOverlay');
    const loader = document.getElementById('statusLoading'); // Fixed ID from view
    const success = document.getElementById('statusSuccess');
    const createModal = document.getElementById('createTaskModal');

    // 1. Close form and trigger system overlay
    if (createModal) createModal.classList.add('hidden');
    
    if (overlay) {
        overlay.classList.remove('hidden');
        overlay.classList.add('flex');
        loader.classList.remove('hidden');
        success.classList.add('hidden');

        // 2. Simulate Neural Grid Processing (5 Seconds)
        setTimeout(() => {
            loader.classList.add('hidden');
            success.classList.remove('hidden');

            // 3. Finalize and redirect to Created sector
            setTimeout(() => {
                overlay.classList.add('hidden');
                overlay.classList.remove('flex');
                
                // Switch to created tab to show the new entry
                switchTaskTab('created');
                
                // Clear Form Fields for next use
                document.getElementById('inpTaskName').value = '';
                document.getElementById('inpTaskWorkers').value = '';
                document.getElementById('inpTaskDuration').value = '';
                document.getElementById('inpTaskDesc').value = '';
                setPriority('med');
                
                console.log("Task Deployment: Complete");
            }, 2000);
        }, 5000);
    }
};

/**
 * System Modal Toggles
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

window.closeTaskModal = function() {
    const modal = document.getElementById('taskModal');
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }
};

window.openCreateTaskModal = function() {
    const modal = document.getElementById('createTaskModal');
    if (modal) {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
    }
};

window.closeCreateTaskModal = function() {
    const modal = document.getElementById('createTaskModal');
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }
};

/**
 * Working/Due Time Toggle
 */
window.toggleTimeView = function(view) {
    const btnW = document.getElementById('btnWorking');
    const btnD = document.getElementById('btnDue');
    
    if (!btnW || !btnD) return;
    
    if (view === 'working') {
        btnW.className = "flex-1 py-2 rounded-full bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest transition-all";
        btnD.className = "flex-1 py-2 rounded-full text-white/40 text-[10px] font-black uppercase tracking-widest transition-all";
    } else {
        btnD.className = "flex-1 py-2 rounded-full bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest transition-all";
        btnW.className = "flex-1 py-2 rounded-full text-white/40 text-[10px] font-black uppercase tracking-widest transition-all";
    }
};
