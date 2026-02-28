/* ── T LEARN PRO: modules/proj.js ── */
/* Projects: CRUD, live stream, deploy tracking */
// ─── 1. Core Logic & Persistence ────────────────────────────
function loadProjects() {
    try {
        const saved = localStorage.getItem('app_projects');
        projects = saved ? JSON.parse(saved) : [];
        projects = projects.filter(p => p && p.name);
        console.log(`[Projects] Loaded ${projects.length} projects`);
    } catch (err) {
        console.error('[Projects] Load error:', err);
        projects = [];
        localStorage.removeItem('app_projects');
    }
}

function saveProjects() {
    try {
        localStorage.setItem('app_projects', JSON.stringify(projects));
        console.log(`[Projects] Saved ${projects.length} projects`);
    } catch (err) {
        console.warn('[Projects] Save failed:', err);
    }
}

// ─── 2. UI Update - Calls both renders ──────────────────────
function updateUI() {
    const countEl = document.getElementById('projectCount');
    if (countEl) countEl.textContent = projects.length;

    renderProjects();                // main grid
    renderProjectsInLiveStream();   // system core live stream
}

// Sync from other tabs
window.addEventListener('storage', (e) => {
    if (e.key === 'app_projects') {
        loadProjects();
        updateUI();
    }
});

// Re-check on tab focus
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
        setTimeout(() => {
            loadProjects();
            updateUI();
        }, 150);
    }
});

// ─── 3. Notification ───────────────────────────────────────
function triggerNotification(msg, type = 'pending') {
    notifySound.play().catch(() => {});
    const alert = document.createElement('div');
    alert.className = `fixed inset-0 z-[5000] flex items-center justify-center bg-black/70 backdrop-blur-sm`;
    alert.innerHTML = `
        <div class="bg-[#0a0f25] border border-white/10 px-10 py-8 rounded-3xl shadow-2xl flex flex-col items-center max-w-sm scale-95 animate-[pop_0.3s]">
            <div class="w-16 h-16 rounded-2xl mb-5 flex items-center justify-center ${
                type === 'success' ? 'bg-green-500/20 text-green-400' :
                type === 'failed' ? 'bg-red-500/20 text-red-400' :
                'bg-blue-500/20 text-blue-400'
            }">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'failed' ? 'fa-exclamation-triangle' : 'fa-sync fa-sync-spin'} text-3xl"></i>
            </div>
            <p class="text-white text-sm font-bold uppercase tracking-wider">${msg}</p>
        </div>
    `;
    document.body.appendChild(alert);
    setTimeout(() => {
        alert.style.opacity = '0';
        setTimeout(() => alert.remove(), 400);
    }, 2200);
}

// ─── 4. Modals (Centered) ──────────────────────────────────
window.closeModal = function(id) {
    const modal = document.getElementById(id);
    if (!modal) return;
    modal.style.opacity = '0';
    setTimeout(() => modal.remove(), 300);
};

window.openProjectInitiator = function() {
    document.body.insertAdjacentHTML('beforeend', `
    <div id="newProjModal1" class="fixed inset-0 z-[1000] flex items-center justify-center bg-black/80 backdrop-blur-lg p-5">
        <div class="bg-[#0a0f1d] border border-white/10 w-full max-w-md rounded-[3rem] p-10 animate-in zoom-in-95">
            <i class="fas fa-rocket text-blue-500 text-4xl mb-6 block text-center"></i>
            <h2 class="text-white font-black text-3xl tracking-tight mb-6 text-center">New Project</h2>
            <input id="projName" type="text" placeholder="Project Name" class="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder-white/40 focus:border-blue-500 outline-none mb-5 text-sm">
            <textarea id="projDesc" placeholder="Brief description..." rows="4" class="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder-white/40 focus:border-blue-500 outline-none mb-8 text-sm"></textarea>
            <div class="flex gap-4">
                <button onclick="closeModal('newProjModal1')" class="flex-1 py-4 bg-white/5 hover:bg-white/10 rounded-2xl text-white/60 font-black text-xs uppercase tracking-widest transition">Cancel</button>
                <button onclick="openProjectDetailsModal()" class="flex-1 py-4 bg-blue-600 hover:bg-blue-500 rounded-2xl text-white font-black text-xs uppercase tracking-widest shadow-lg shadow-blue-700/30 transition">Continue</button>
            </div>
        </div>
    </div>`);
};

window.openProjectDetailsModal = function() {
    const name = document.getElementById('projName')?.value.trim() || 'Untitled';
    closeModal('newProjModal1');
    setTimeout(() => {
        document.body.insertAdjacentHTML('beforeend', `
        <div id="newProjModal2" class="fixed inset-0 z-[1001] flex items-center justify-center bg-black/85 backdrop-blur-md p-5 transition-all">
            <div class="w-full max-w-lg bg-[#050b1d] border border-white/10 rounded-[2.5rem] p-10 max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-300 shadow-2xl">
                
                <div class="flex justify-between items-center mb-8">
                    <div>
                        <h3 class="text-3xl font-black tracking-tight text-white">${name}</h3>
                        <p class="text-white/40 text-[10px] uppercase tracking-[0.2em] mt-1 font-bold">Project Configuration</p>
                    </div>
                    <button onclick="closeModal('newProjModal2')" class="h-10 w-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-white/40 hover:text-white transition-all text-2xl">×</button>
                </div>

                <div class="space-y-8">
                    <div>
                        <label class="block text-blue-400 text-[10px] font-black uppercase tracking-[0.15em] mb-3">Project Banner</label>
                        <input type="file" id="projImgInput" accept="image/*" class="hidden" onchange="previewProjectImg(this)">
                        <div onclick="document.getElementById('projImgInput').click()" class="group relative h-48 w-full bg-white/5 border-2 border-dashed border-white/10 rounded-[2rem] flex items-center justify-center cursor-pointer hover:border-blue-500/40 hover:bg-blue-500/5 transition-all overflow-hidden">
                            <img id="projPreview" class="absolute inset-0 w-full h-full object-cover hidden">
                            <div class="text-center group-hover:scale-105 transition-transform">
                                <i id="imgPlaceholderIcon" class="fas fa-cloud-upload-alt text-white/20 text-4xl mb-2"></i>
                                <p class="text-white/20 text-[10px] font-bold uppercase tracking-wider">Click to upload</p>
                            </div>
                        </div>
                    </div>

                    <div class="space-y-6">
                        <div class="relative group">
                            <label class="block text-white/40 text-[10px] font-black uppercase tracking-widest mb-2 ml-1">Access URL</label>
                            <div class="relative flex items-center">
                                <input id="projLink" type="url" placeholder="https://project-link.com" class="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder-white/20 focus:border-blue-500/50 focus:bg-blue-500/5 outline-none text-sm transition-all pr-14">
                                <button onclick="navigator.clipboard.writeText(document.getElementById('projLink').value)" class="absolute right-2 p-3 text-white/30 hover:text-blue-400 transition-colors" title="Copy Link">
                                    <i class="far fa-copy"></i>
                                </button>
                            </div>
                        </div>

                        <div class="grid grid-cols-2 gap-3">
                            <button onclick="updateTypeSelection(this); setProjectType('Job', this)" class="type-btn py-4 rounded-2xl border border-white/5 bg-white/[0.02] text-white/40 text-[10px] font-black uppercase tracking-tighter hover:border-white/20 transition-all">Job</button>
                            <button onclick="updateTypeSelection(this); setProjectType('Private', this)" class="type-btn py-4 rounded-2xl border border-white/5 bg-white/[0.02] text-white/40 text-[10px] font-black uppercase tracking-tighter hover:border-white/20 transition-all">Private</button>
                            <button onclick="updateTypeSelection(this); setProjectType('Personal', this)" class="type-btn py-4 rounded-2xl border border-white/5 bg-white/[0.02] text-white/40 text-[10px] font-black uppercase tracking-tighter hover:border-white/20 transition-all">Personal</button>
                            <button disabled class="py-4 rounded-2xl border border-white/5 bg-black/20 text-white/10 text-[10px] font-black uppercase cursor-not-allowed flex items-center justify-center gap-2">
                                <i class="fas fa-lock text-[8px]"></i> Enterprise
                            </button>
                        </div>

                        <div class="bg-white/[0.03] border border-white/10 rounded-[1.5rem] p-5">
                            <div class="flex justify-between items-center mb-4">
                                <label class="text-white/60 text-[10px] font-black uppercase tracking-widest">Max Collaborators</label>
                                <span class="bg-blue-500/20 text-blue-400 text-[9px] px-2 py-1 rounded-md font-bold uppercase">Free Tier</span>
                            </div>
                            <div class="relative">
                                <input id="projUsers" type="number" min="1" max="5" value="5" readonly class="w-full bg-black/20 border border-white/5 rounded-xl px-5 py-3 text-white/50 font-mono text-sm outline-none cursor-not-allowed">
                                <div class="mt-4 flex items-start gap-3 bg-red-500/5 border border-red-500/20 rounded-xl p-3">
                                    <i class="fas fa-info-circle text-red-500 mt-0.5 text-xs"></i>
                                    <p class="text-[10px] leading-relaxed text-red-400/80 font-medium">
                                        Only <span class="text-red-400 font-black">5 users</span> allowed in the Free Limit. <br/>
                                        <span class="text-white hover:text-blue-400 cursor-pointer underline decoration-dotted transition-colors">Upgrade to Pro</span> to add more seats.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="flex gap-4 pt-4">
                        <button onclick="closeModal('newProjModal2')" class="flex-1 py-5 bg-white/5 hover:bg-white/10 rounded-2xl text-white/40 font-black text-[10px] uppercase tracking-[0.2em] transition-all">Cancel</button>
                        <button id="createProjBtn" onclick="createNewProject()" class="flex-[1.5] py-5 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 rounded-2xl text-white font-black text-[10px] uppercase tracking-[0.2em] shadow-lg shadow-green-900/20 active:scale-[0.98] transition-all">Create Project</button>
                    </div>
                </div>
            </div>
        </div>`);
        
        window.updateTypeSelection = function(el) {
            document.querySelectorAll('.type-btn').forEach(btn => {
                btn.className = "type-btn py-4 rounded-2xl border border-white/5 bg-white/[0.02] text-white/40 text-[10px] font-black uppercase tracking-tighter hover:border-white/20 transition-all";
            });
            el.className = "type-btn py-4 rounded-2xl border-2 border-blue-500/80 bg-blue-500/10 text-blue-200 text-[10px] font-black uppercase tracking-tighter shadow-[0_0_20px_rgba(59,130,246,0.2)]";
        };
    }, 180);
};

// ─── Helpers ──────────────────────────────────────────────
window.previewProjectImg = function(input) {
    if (!input.files?.[0]) return;
    const reader = new FileReader();
    reader.onload = e => {
        const img = document.getElementById('projPreview');
        const icon = document.getElementById('imgPlaceholderIcon');
        if (img && icon) {
            img.src = e.target.result;
            img.classList.remove('hidden');
            icon.classList.add('hidden');
        }
    };
    reader.readAsDataURL(input.files[0]);
};

window.setProjectType = function(type, button) {
    // We handle visual selection via updateTypeSelection now
    activeType = type;
};

// ─── Create project ───────────────────────────────────────
window.createNewProject = function() {
    const btn = document.getElementById('createProjBtn');
    if (!btn) return;

    const name = document.querySelector('#newProjModal2 h3')?.textContent.trim() || 'Untitled';
    const desc = document.getElementById('projDesc')?.value?.trim() || '';
    const link = document.getElementById('projLink')?.value?.trim() || '#';
    const users = parseInt(document.getElementById('projUsers')?.value) || 0;
    const img = document.getElementById('projPreview')?.src || '';

    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Creating...';

    triggerNotification(`Creating ${name}...`, 'pending');

    setTimeout(() => {
        const status = Math.random() > 0.08 ? 'success' : 'failed';
        projects.push({
            id: Date.now() + Math.random(),
            name,
            desc,
            link,
            users,
            img,
            type: activeType || 'Personal',
            status,
            createdAt: new Date().toISOString()
        });

        saveProjects();
        updateUI();
        closeModal('newProjModal2');
        triggerNotification(`${name} ${status === 'success' ? 'created successfully' : 'creation failed'}`, status);
        if (status === 'success' && typeof awardXP === 'function') awardXP('add_project');
    }, 1600);
};

// ─── Delete ───────────────────────────────────────────────
window.deleteProject = function(id) {
    const proj = projects.find(p => p.id === id);
    if (!proj) return;

    document.body.insertAdjacentHTML('beforeend', `
    <div id="deleteConfirmModal" class="fixed inset-0 z-[2000] flex items-center justify-center bg-black/80 backdrop-blur-lg p-5">
        <div class="bg-[#0a0f1d] border border-white/10 w-full max-w-sm rounded-[3rem] p-10 animate-in zoom-in-95">
            <h3 class="text-2xl font-black text-center mb-6 text-red-400">Delete Project?</h3>
            <p class="text-white/80 text-center mb-8">Are you sure you want to delete<br><strong>"${proj.name}"</strong>?<br>This cannot be undone.</p>
            <div class="flex gap-4">
                <button onclick="closeModal('deleteConfirmModal')" class="flex-1 py-4 bg-white/5 hover:bg-white/10 rounded-2xl text-white/70 font-black text-sm uppercase tracking-widest transition">Cancel</button>
                <button onclick="confirmDelete(${id})" class="flex-1 py-4 bg-red-600 hover:bg-red-500 rounded-2xl text-white font-black text-sm uppercase tracking-widest shadow-lg shadow-red-700/30 transition">Delete</button>
            </div>
        </div>
    </div>`);
};

window.confirmDelete = function(id) {
    projects = projects.filter(p => p.id !== id);
    saveProjects();
    updateUI();
    closeModal('deleteConfirmModal');
    triggerNotification('Project deleted', 'failed');
};

// ─── 5. Main Project Render (grid) ──────────────────────────
function renderProjects() {
    const grid = document.getElementById('projectContainerGrid');
    if (!grid) return;

    grid.innerHTML = '';

    if (projects.length === 0) {
        grid.innerHTML = `
            <div class="col-span-full py-24 text-center text-white/50">
                <i class="fas fa-folder-open text-6xl opacity-30 mb-6 block"></i>
                <h3 class="text-xl font-black uppercase tracking-wider mb-3">No Projects Yet</h3>
                <p class="text-sm opacity-70 mb-8">Create your first project to begin</p>
                <button onclick="openProjectInitiator()" class="px-8 py-4 bg-blue-600 hover:bg-blue-500 rounded-2xl text-white font-bold text-sm uppercase tracking-wider shadow-lg transition">
                    New Project
                </button>
            </div>`;
        return;
    }

    projects.forEach(proj => {
        const deployedAgo = getDeployedAgo(proj.createdAt || new Date().toISOString());
        const type = proj.type || 'Personal';
        const link = proj.link || '#';
        const domain = link.replace(/^https?:\/\//, '').split('/')[0] || 'no-link.pxxl.click';
        const typeIcon = type === 'Job' ? 'fa-briefcase' : type === 'Private' ? 'fa-lock' : 'fa-user';

        grid.insertAdjacentHTML('beforeend', `
            <div class="group relative bg-[#0a0f1e] border border-white/5 rounded-[2.5rem] overflow-hidden hover:border-blue-500/40 transition-all duration-500 shadow-2xl">
                
                <div class="relative h-44 w-full bg-[#050b1d] overflow-hidden">
                    <div class="absolute inset-0 opacity-[0.03]" style="background-image: radial-gradient(circle, #ffffff 1px, transparent 1px); background-size: 24px 24px;"></div>
                    
                    <div class="absolute top-4 left-4 flex items-center gap-2 px-4 py-2 bg-black/50 backdrop-blur-md rounded-full border border-white/5 z-10">
                        <div class="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse"></div>
                        <span class="text-[9px] font-black uppercase tracking-[0.1em] text-red-400">Deployed ${deployedAgo}</span>
                    </div>

                    ${proj.img ? 
                        `<img src="${proj.img}" class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">` : 
                        `<div class="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#0a0f1e] to-[#050b1d]">
                             <i class="fas fa-cube text-white/5 text-7xl transition-all group-hover:text-blue-500/10"></i>
                         </div>`
                    }
                </div>

                <div class="p-6 flex items-center justify-between bg-[#0a0f1e]">
                    <div class="flex items-center gap-4">
                        <div class="h-12 w-12 rounded-full bg-gradient-to-br from-[#1e293b] to-[#0f172a] border border-white/10 flex items-center justify-center shrink-0 shadow-lg">
                            <i class="fas fa-rocket text-white/40 text-lg"></i>
                        </div>
                        <div class="flex flex-col min-w-0">
                            <h4 class="text-white font-black tracking-tight text-lg truncate">${proj.name}</h4>
                            <p class="text-white/20 text-xs font-bold truncate tracking-tight">${domain}</p>
                        </div>
                    </div>

                    <div class="flex items-center gap-2 px-4 py-2 bg-white/[0.03] border border-white/10 rounded-xl shadow-inner">
                        <i class="fas ${typeIcon} text-[10px] text-orange-500/80"></i>
                        <span class="text-[10px] font-black uppercase tracking-widest text-white/60">${type}</span>
                    </div>
                </div>

                <div class="absolute inset-0 bg-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button onclick="deleteProject(${proj.id})" class="p-4 bg-red-600/80 hover:bg-red-600 rounded-full text-white transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 opacity-0 group-hover:opacity-100 shadow-xl shadow-red-900/40">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </div>
            </div>
        `);
    });
}

// ─── 6. Live Project Stream Render ──────────────────────────
function renderProjectsInLiveStream() {
    const stream = document.getElementById('liveProjectStream');
    const empty = document.getElementById('streamEmpty');

    if (!stream || !empty) return;

    stream.innerHTML = '';

    if (projects.length === 0) {
        empty.style.display = 'flex';
        stream.style.display = 'none';
        return;
    }

    empty.style.display = 'none';
    stream.style.display = 'block';

    const sorted = [...projects].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    sorted.forEach(proj => {
        const ago = getDeployedAgo(proj.createdAt);
        const statusColor = proj.status === 'success' ? 'emerald' : 'red';
        const statusText = proj.status === 'success' ? 'Active' : 'Failed';

        stream.insertAdjacentHTML('beforeend', `
            <div class="flex items-center gap-4 p-4 bg-black/30 rounded-2xl border border-${statusColor}-500/10 hover:border-${statusColor}-500/30 transition-all animate-fade-in">
                <div class="w-10 h-10 rounded-lg bg-${statusColor}-500/10 flex items-center justify-center">
                    <i class="fas fa-rocket text-${statusColor}-400"></i>
                </div>
                <div class="flex-1 min-w-0">
                    <p class="text-white font-medium text-sm truncate">${proj.name}</p>
                    <p class="text-[10px] text-gray-400 truncate">${proj.link?.replace(/^https?:\/\//, '') || 'No link'}</p>
                </div>
                <div class="text-right">
                    <span class="text-[10px] text-${statusColor}-400 font-medium">${statusText}</span>
                    <p class="text-[9px] text-gray-500">${ago}</p>
                </div>
            </div>
        `);
    });
}

// ─── Helper: Deployed Ago ───────────────────────────────────
function getDeployedAgo(isoDate) {
    if (!isoDate) return 'just now';
    const diffMs = Date.now() - new Date(isoDate).getTime();
    const mins = Math.floor(diffMs / 60000);
    const hours = Math.floor(mins / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);

    if (months >= 1) return `${months}mths ago`;
    if (days >= 1) return `${days}d ago`;
    if (hours >= 1) return `${hours}h ago`;
    if (mins >= 1) return `${mins}m ago`;
    return 'just now';
}

// ─── 7. Settings Project List ──────────────────────────────
function renderSettingsProjects() {
    const list = document.getElementById('settingsProjectList');
    if (!list) return;

    loadProjects(); 

    if (projects.length === 0) {
        list.innerHTML = `
            <div class="py-16 text-center border-2 border-dashed border-white/5 rounded-3xl">
                <i class="fas fa-folder-open text-5xl text-white/10 mb-4 block"></i>
                <p class="text-[10px] font-black text-white/20 uppercase tracking-widest">No projects yet</p>
            </div>`;
        return;
    }

list.innerHTML = projects.map((proj, i) => {
    const type = proj.type || 'Personal';
    // Dynamic icon based on selection
    const typeIcon = type === 'Job' ? 'fa-briefcase' : type === 'Private' ? 'fa-lock' : 'fa-user';
    const link = proj.link || '#';

    return `
        <div class="group flex items-center justify-between p-4 bg-[#0a0f1d] border border-white/5 rounded-[1.5rem] hover:border-blue-500/30 transition-all duration-300">
            <div class="flex items-center gap-4 min-w-0">
                <div class="relative shrink-0">
                    <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600/20 to-violet-600/20 border border-white/10 flex items-center justify-center overflow-hidden">
                        ${proj.img ? 
                            `<img src="${proj.img}" class="w-full h-full object-cover">` : 
                            `<i class="fas fa-rocket text-blue-400"></i>`
                        }
                    </div>
                    <div class="absolute -bottom-1 -right-1 w-5 h-5 bg-[#0a0f1d] border border-white/10 rounded-full flex items-center justify-center">
                        <i class="fas ${typeIcon} text-[8px] text-orange-500"></i>
                    </div>
                </div>

                <div class="flex flex-col min-w-0">
                    <div class="flex items-center gap-2">
                        <p class="text-white font-black text-sm truncate tracking-tight">${proj.name}</p>
                        <span class="text-[8px] px-2 py-0.5 bg-white/5 border border-white/10 rounded-md text-white/40 uppercase font-bold tracking-widest">${type}</span>
                    </div>
                    <p class="text-[10px] text-gray-500 font-medium truncate mt-0.5">
                        <span class="text-blue-400/60 font-bold">LIVE:</span> ${link.replace(/^https?:\/\//, '')}
                    </p>
                </div>
            </div>

            <div class="flex items-center gap-2 ml-4">
                <a href="${link}" target="_blank" 
                   class="w-10 h-10 rounded-xl bg-white/5 border border-white/5 text-white/40 flex items-center justify-center hover:bg-blue-600/20 hover:text-blue-400 hover:border-blue-500/30 transition-all">
                    <i class="fas fa-external-link-alt text-xs"></i>
                </a>
                <button onclick="deleteProjectFromSettings(${i})"
                        class="w-10 h-10 rounded-xl bg-red-500/5 border border-red-500/10 text-red-500/40 flex items-center justify-center hover:bg-red-500/20 hover:text-red-400 hover:border-red-500/30 transition-all">
                    <i class="fas fa-trash-alt text-xs"></i>
                </button>
            </div>
        </div>
    `;
}).join('');
}

window.deleteProjectFromSettings = function(index) {
    if (!confirm('Remove this project?')) return;
    projects.splice(index, 1);
    saveProjects();
    renderSettingsProjects();
    updateUI(); 
};

// ─── Init ──────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    loadProjects();
    updateUI();
});

///// FOR THE NXXT AI ALONE
// --- CONFIGURATION & MOCK DATA ---
window.imgCredits = 5;
window.nxxtMode = 'standard';

// TESTING PHASE: Pre-set responses for auto-replies
const TEST_RESPONSES = {
    "hello": "Hello. How can I help you today?",
    "who are you": "I am Nxxt AI, your professional assistant. I'm currently in the testing phase to ensure all systems work correctly.",
    "is this real": "This is a local testing environment. The responses you see now are pre-set for development, but the live version will connect to GPT-4.",
    "help": "I can assist with writing, analysis, and image generation. Try typing 'generate an image' to see the visual output in action.",
    "capabilities": "Currently testing UI performance, message speed, and image generation. Live features like data analysis and coding will be added in the next phase.",
    "default": "I've received your message. In the live version, I would provide a detailed response here, but for now, I'm just confirming the input works."
};

/**
 * Bridge function to connect HTML onclick to our logic
 */

