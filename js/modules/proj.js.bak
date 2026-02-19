/* ── T LEARN PRO: modules/proj.js ── */
/* Projects: CRUD, live stream, deploy tracking */

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

    renderProjects();               // main grid
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
                <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'failed' ? 'fa-exclamation-triangle' : 'fa-sync fa-spin'} text-3xl"></i>
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
    const desc = document.getElementById('projDesc')?.value.trim() || '';
    closeModal('newProjModal1');

    setTimeout(() => {
        document.body.insertAdjacentHTML('beforeend', `
        <div id="newProjModal2" class="fixed inset-0 z-[1001] flex items-center justify-center bg-black/80 backdrop-blur-sm p-5">
            <div class="w-full max-w-lg bg-[#050b1d] border border-white/10 rounded-[3rem] p-10 max-h-[90vh] overflow-y-auto animate-in zoom-in-95">
                <div class="flex justify-between items-center mb-10">
                    <h3 class="text-3xl font-black tracking-tight">${name}</h3>
                    <button onclick="closeModal('newProjModal2')" class="text-3xl text-white/40 hover:text-white">×</button>
                </div>
                <div class="space-y-8">
                    <div>
                        <label class="block text-blue-400 text-xs font-black uppercase tracking-widest mb-3">Project Image</label>
                        <input type="file" id="projImgInput" accept="image/*" class="hidden" onchange="previewProjectImg(this)">
                        <div onclick="document.getElementById('projImgInput').click()" class="group relative h-52 w-full bg-white/5 border-2 border-dashed border-white/20 rounded-3xl flex items-center justify-center cursor-pointer hover:border-blue-500/60 transition-colors overflow-hidden">
                            <img id="projPreview" class="absolute inset-0 w-full h-full object-cover hidden">
                            <i id="imgPlaceholderIcon" class="fas fa-image text-white/20 text-5xl group-hover:scale-110 transition-transform"></i>
                        </div>
                    </div>
                    <div class="space-y-5">
                        <input id="projLink" type="url" placeholder="Project Link[](https://...)" class="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder-white/40 focus:border-blue-500 outline-none text-sm">
                        <div class="grid grid-cols-2 gap-4">
                            <button onclick="setProjectType('Job', this)" class="type-btn py-4 rounded-2xl border border-white/10 text-white/50 text-xs font-black uppercase hover:border-white/30 transition">Job</button>
                            <button onclick="setProjectType('Private', this)" class="type-btn py-4 rounded-2xl border border-white/10 text-white/50 text-xs font-black uppercase hover:border-white/30 transition">Private</button>
                            <button onclick="setProjectType('Personal', this)" class="type-btn py-4 rounded-2xl border-2 border-blue-500 text-white text-xs font-black uppercase shadow-sm shadow-blue-600/30">Personal</button>
                            <button disabled class="py-4 rounded-2xl border border-white/5 text-white/20 text-xs font-black uppercase cursor-not-allowed"><i class="fas fa-lock mr-2"></i>Locked</button>
                        </div>
                        <input id="projUsers" type="number" min="1" value="5" class="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-blue-500 outline-none text-sm">
                    </div>
                    <div class="flex gap-4 pt-8">
                        <button onclick="closeModal('newProjModal2')" class="flex-1 py-5 bg-white/5 hover:bg-white/10 rounded-2xl text-white/60 font-black text-xs uppercase tracking-widest transition">Cancel</button>
                        <button id="createProjBtn" onclick="createNewProject()" class="flex-1 py-5 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 rounded-2xl text-white font-black text-xs uppercase tracking-widest shadow-lg shadow-green-700/30 transition">Create Project</button>
                    </div>
                </div>
            </div>
        </div>`);
        setProjectType('Personal', document.querySelector('#newProjModal2 .type-btn.border-blue-500'));
    }, 180);
};

// Helpers
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
    document.querySelectorAll('#newProjModal2 .type-btn').forEach(btn => {
        btn.classList.remove('border-blue-500', 'text-white', 'shadow-sm', 'shadow-blue-600/30');
        btn.classList.add('border-white/10', 'text-white/50');
    });
    button.classList.add('border-blue-500', 'text-white', 'shadow-sm', 'shadow-blue-600/30');
    button.classList.remove('border-white/10', 'text-white/50');
    activeType = type;
};

// Create project
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
            type: activeType,
            status,
            createdAt: new Date().toISOString()
        });

        saveProjects();
        updateUI();
        closeModal('newProjModal2');
        triggerNotification(`${name} ${status === 'success' ? 'created successfully' : 'creation failed'}`, status);
    }, 1600);
};

// Delete
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
        const tech = proj.type || 'Unknown';
        const link = proj.link || '#';
        const domain = link.replace(/^https?:\/\//, '').split('/')[0] || 'No link';

        grid.insertAdjacentHTML('beforeend', `
            <div class="relative rounded-xl overflow-hidden bg-[#0f172a]/80 border border-white/5 hover:border-blue-500/30 transition-all duration-300 group">
                <div class="absolute top-3 left-3 px-3 py-1 rounded-md bg-red-500/20 text-red-400 text-xs font-medium flex items-center gap-1.5 backdrop-blur-sm">
                    <span class="w-2 h-2 rounded-full bg-red-400 animate-pulse"></span>
                    Deployed ${deployedAgo}
                </div>
                <div class="h-40 bg-gradient-to-br from-[#0f172a] to-[#020617] relative">
                    <div class="absolute inset-0 opacity-5 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                    <div class="absolute inset-0 flex items-center justify-center">
                        <i class="fas fa-cube text-white/10 text-7xl group-hover:text-blue-500/30 transition-colors"></i>
                    </div>
                </div>
                <div class="p-4 bg-black/40 border-t border-white/5 flex items-center justify-between">
                    <div class="flex items-center gap-3">
                        <div class="w-10 h-10 rounded-lg bg-blue-900/30 flex items-center justify-center text-blue-400 text-xl">
                            <i class="fas fa-rocket"></i>
                        </div>
                        <div>
                            <p class="text-white font-medium text-sm">${proj.name}</p>
                            <a href="${link}" target="_blank" class="text-blue-400 hover:text-blue-300 text-xs truncate max-w-[180px] block">
                                ${domain}
                            </a>
                        </div>
                    </div>
                    <span class="px-3 py-1 rounded-full text-xs font-medium bg-white/5 text-gray-300 border border-white/10">
                        ${tech}
                    </span>
                </div>
            </div>
        `);
    });
}

// ─── 6. Live Project Stream Render (inside #orderStatusChart) ───
function renderProjectsInLiveStream() {
    const stream = document.getElementById('liveProjectStream');
    const empty = document.getElementById('streamEmpty');

    if (!stream || !empty) {
        console.log("[LiveStream] Not on this tab yet - skipping");
        return;
    }

    stream.innerHTML = '';

    if (projects.length === 0) {
        empty.style.display = 'flex';
        stream.style.display = 'none';
        return;
    }

    empty.style.display = 'none';
    stream.style.display = 'block';

    // Newest first
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

// ─── Init ──────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    loadProjects();
    updateUI();
    console.log("[Projects] Initialized – count:", projects.length);
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

