/* ── T LEARN PRO: modules/lms.js ── Full LMS Engine */

async function getLMSClient() { return window.supabaseLoader.load(); }
async function getLMSUser()   { return window.AuthState.getUser(); }
function setLEl(id, val) { const el = document.getElementById(id); if (el) el.textContent = val; }

// ── INIT ──────────────────────────────────────────────────────────────────────
function initLMS() {
    syncLessonsHeader();
    switchLessonSubTab('Courses');
}

function syncLessonsHeader() {
    const cached = JSON.parse(localStorage.getItem('tlp_profile') || '{}');
    setLEl('lessons-level-val',    cached.level ?? '—');
    setLEl('lessons-semester-val', cached.semester ? String(cached.semester).padStart(3,'0') : '—');
}

// ── TAB SWITCHER ──────────────────────────────────────────────────────────────
function switchLessonSubTab(tab) {
    const contentArea = document.getElementById('lesson-sub-content');
    if (!contentArea) return;
    document.querySelectorAll('.lesson-nav-btn').forEach(btn => {
        const active = btn.id === `btn-${tab}`;
        btn.classList.toggle('bg-blue-600', active);
        btn.classList.toggle('text-white', active);
        btn.classList.toggle('shadow-lg', active);
        btn.classList.toggle('text-white/30', !active);
    });
 switch(tab) {
        case 'Courses':   renderCourses(contentArea);   break;
        case 'Videos':    renderVideos(contentArea);    break; // New Case
        case 'Exam':      renderExam(contentArea);      break;
        case 'Results':   renderResults(contentArea);   break;
        case 'Analytics': renderAnalytics(contentArea); break;
    }
}
// ── COURSES GRID ──────────────────────────────────────────────────────────────
function renderCourses(el) {
    if (!window.curriculumData) {
        el.innerHTML = `
            <div class="flex flex-col items-center justify-center py-24 gap-4">
                <div class="w-12 h-12 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
                <p class="text-white/30 text-sm font-black uppercase tracking-widest">Loading courses...</p>
            </div>`;
        let attempts = 0;
        const retry = setInterval(() => {
            if (window.curriculumData) { clearInterval(retry); renderCourses(el); }
            else if (++attempts >= 15) {
                clearInterval(retry);
                el.innerHTML = `
                    <div class="flex flex-col items-center justify-center py-24 gap-4 text-center">
                        <div class="w-16 h-16 rounded-2xl bg-red-500/10 flex items-center justify-center">
                            <i class="fas fa-exclamation-triangle text-red-400 text-2xl"></i>
                        </div>
                        <p class="text-white font-black text-lg">Couldn't load courses</p>
                        <p class="text-white/40 text-sm">Please refresh the page and try again.</p>
                        <button onclick="location.reload()" class="px-6 py-3 bg-blue-600 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-blue-500 transition-all">
                            Refresh Page
                        </button>
                    </div>`;
            }
        }, 300);
        return;
    }

    const courses = Object.keys(curriculumData);
    const totalAllTopics = courses.reduce((s, n) => s + curriculumData[n].topics.length, 0);
    const doneAllTopics  = courses.reduce((s, n) => s + getCompletedTopics(n), 0);
    const overallPct     = totalAllTopics ? Math.round((doneAllTopics / totalAllTopics) * 100) : 0;

    const courseColors = {
        HTML:       { from: '#1e3a5f', accent: '#38bdf8', icon: 'text-sky-400',    border: 'border-sky-500/20'   },
        CSS:        { from: '#1e1b4b', accent: '#818cf8', icon: 'text-indigo-400', border: 'border-indigo-500/20' },
        JavaScript: { from: '#1c2a1c', accent: '#4ade80', icon: 'text-green-400',  border: 'border-green-500/20'  },
        Python:     { from: '#1a2535', accent: '#fbbf24', icon: 'text-yellow-400', border: 'border-yellow-500/20'  },
    };

    el.innerHTML = `
        <!-- Overall progress -->
        <div class="mb-8 p-6 rounded-3xl bg-white/[0.03] border border-white/5">
            <div class="flex items-center justify-between mb-3">
                <div>
                    <p class="text-white font-black text-sm">Overall Progress</p>
                    <p class="text-white/30 text-[10px] mt-0.5">${doneAllTopics} of ${totalAllTopics} topics completed</p>
                </div>
                <span class="text-2xl font-black ${overallPct === 100 ? 'text-green-400' : 'text-blue-400'}">${overallPct}%</span>
            </div>
            <div class="h-2 bg-white/5 rounded-full overflow-hidden">
                <div class="h-full rounded-full transition-all duration-700 ${overallPct === 100 ? 'bg-green-500' : 'bg-blue-500'}"
                     style="width:${overallPct}%"></div>
            </div>
        </div>

        <!-- Course cards -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            ${courses.map(name => {
                const done  = getCompletedTopics(name);
                const total = curriculumData[name].topics.length;
                const pct   = total ? Math.round((done / total) * 100) : 0;
                const col   = courseColors[name] || { from:'#0a0f25', accent:'#3b82f6', icon:'text-blue-400', border:'border-blue-500/20' };
                const done100 = pct === 100;
                return `
                <button onclick="openTopics('${name}')"
                    class="group text-left p-6 rounded-3xl border ${col.border} transition-all duration-300
                    hover:scale-[1.02] hover:shadow-2xl active:scale-[0.98]
                    ${done100 ? 'bg-green-500/5 border-green-500/30' : 'bg-white/[0.02] hover:bg-white/[0.04]'}"
                    style="background: linear-gradient(135deg, ${col.from}40, transparent)">

                    <div class="flex items-start justify-between mb-4">
                        <div class="w-12 h-12 rounded-2xl flex items-center justify-center"
                             style="background:${col.accent}15; border: 1px solid ${col.accent}30">
                            <i class="fab ${curriculumData[name].icon} text-xl ${col.icon}"></i>
                        </div>
                        ${done100
                            ? `<span class="flex items-center gap-1.5 px-3 py-1 bg-green-500/15 border border-green-500/30 rounded-full text-[9px] font-black text-green-400 uppercase tracking-widest">
                                <i class="fas fa-check-circle"></i> Complete
                               </span>`
                            : pct > 0
                            ? `<span class="text-[9px] font-black text-white/20 uppercase">${pct}%</span>`
                            : `<span class="flex items-center gap-1.5 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[9px] font-black text-white/30 uppercase tracking-widest">
                                <i class="fas fa-play"></i> Start
                               </span>`
                        }
                    </div>

                    <h3 class="text-white font-black text-xl mb-1">${name}</h3>
                    <p class="text-white/30 text-[10px] uppercase tracking-widest mb-4">
                        ${total} topics · Beginner → Intermediate
                    </p>

                    <!-- Progress bar -->
                    <div class="space-y-1.5">
                        <div class="h-1.5 bg-white/5 rounded-full overflow-hidden">
                            <div class="h-full rounded-full transition-all duration-700"
                                 style="width:${pct}%; background:${col.accent}"></div>
                        </div>
                        <p class="text-[9px] font-black" style="color:${col.accent}80">
                            ${done}/${total} topics done
                        </p>
                    </div>
                </button>`;
            }).join('')}
        </div>

        <!-- Tip -->
        <div class="mt-8 p-5 rounded-2xl bg-blue-500/5 border border-blue-500/10 flex items-start gap-4">
            <div class="w-8 h-8 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0 mt-0.5">
                <i class="fas fa-lightbulb text-blue-400 text-xs"></i>
            </div>
            <div>
                <p class="text-white font-black text-xs mb-1">How it works</p>
                <p class="text-white/40 text-[11px] leading-relaxed">
                    Complete 50% of a course's topics to unlock the exam. Read each topic, study the code example, then mark it done. Topics build on each other — go in order.
                </p>
            </div>
        </div>`;
}

function getCompletedTopics(courseName) {
    return JSON.parse(localStorage.getItem(`tlp_completed_${courseName}`) || '[]').length;
}

// ── TOPIC READER ──────────────────────────────────────────────────────────────
let _currentCourse = null;
let _currentTopicIdx = 0;

window.openTopics = function(courseName, startIdx = 0) {
    const modal = document.getElementById('global-modal');
    if (!modal) return;

    _currentCourse   = courseName;
    _currentTopicIdx = startIdx;

    const topics = curriculumData[courseName]?.topics || [];
    const done   = new Set(JSON.parse(localStorage.getItem(`tlp_completed_${courseName}`) || '[]'));

    // Update modal header
    const courseNameEl = document.getElementById('modal-course-name');
    const titleEl      = document.getElementById('modal-title');
    if (courseNameEl) courseNameEl.textContent = courseName;
    if (titleEl) titleEl.textContent = topics[startIdx]?.title || 'Topics';

    // Update progress bar
    const progressBar  = document.getElementById('modal-progress-bar');
    const progressText = document.getElementById('modal-progress-text');
    const progressWrap = document.getElementById('modal-progress-bar-wrap');
    if (progressWrap) progressWrap.classList.remove('hidden');
    if (progressText) progressText.textContent = `${done.size}/${topics.length}`;
    if (progressBar)  progressBar.style.width = `${topics.length ? Math.round((done.size/topics.length)*100) : 0}%`;

    // Build sidebar
    const sidebar = document.getElementById('topics-sidebar');
    if (sidebar) {
        sidebar.innerHTML = `
            <div class="p-4 border-b border-white/5">
                <p class="text-[9px] font-black text-white/20 uppercase tracking-widest">${topics.length} Topics</p>
            </div>
            <div class="flex-1 p-2">
                ${topics.map((t, i) => `
                <button onclick="openTopics('${courseName}', ${i})"
                    class="w-full text-left flex items-center gap-3 px-3 py-2.5 rounded-xl mb-1 transition-all
                    ${i === startIdx ? 'bg-blue-600/20 border border-blue-500/30' : 'hover:bg-white/5 border border-transparent'}"
                    id="sidebar-topic-${i}">
                    <div class="w-5 h-5 rounded-full flex items-center justify-center shrink-0
                        ${done.has(i) ? 'bg-green-500' : i === startIdx ? 'bg-blue-600' : 'bg-white/10'}">
                        ${done.has(i)
                            ? '<i class="fas fa-check text-white" style="font-size:8px"></i>'
                            : `<span class="text-[8px] font-black ${i === startIdx ? 'text-white' : 'text-white/40'}">${i+1}</span>`}
                    </div>
                    <span class="text-[10px] font-bold truncate ${i === startIdx ? 'text-white' : done.has(i) ? 'text-white/40' : 'text-white/50'}">${t.title}</span>
                </button>`).join('')}
            </div>`;
    }

    // Render topic content
    _renderTopicContent(courseName, startIdx);

    // Show modal
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
};

function _renderTopicContent(courseName, idx) {
    const topics = curriculumData[courseName]?.topics || [];
    const topic  = topics[idx];
    const done   = new Set(JSON.parse(localStorage.getItem(`tlp_completed_${courseName}`) || '[]'));
    const body   = document.getElementById('modal-body');
    const titleEl= document.getElementById('modal-title');

    if (!topic || !body) return;
    if (titleEl) titleEl.textContent = topic.title;

    // Update sidebar active state
    topics.forEach((_, i) => {
        const btn = document.getElementById(`sidebar-topic-${i}`);
        if (!btn) return;
        btn.className = `w-full text-left flex items-center gap-3 px-3 py-2.5 rounded-xl mb-1 transition-all
            ${i === idx ? 'bg-blue-600/20 border border-blue-500/30' : 'hover:bg-white/5 border border-transparent'}`;
    });

    const isFirst = idx === 0;
    const isLast  = idx === topics.length - 1;
    const isDone  = done.has(idx);

    body.innerHTML = `
        <div class="max-w-2xl mx-auto space-y-8 pb-16">

            <!-- Topic number + title -->
            <div class="space-y-2">
                <div class="flex items-center gap-3">
                    <span class="text-[9px] font-black text-white/20 uppercase tracking-[0.3em]">
                        Topic ${idx + 1} of ${topics.length}
                    </span>
                    ${isDone ? `
                    <span class="flex items-center gap-1 px-2.5 py-1 bg-green-500/15 border border-green-500/30 rounded-full text-[8px] font-black text-green-400 uppercase">
                        <i class="fas fa-check"></i> Completed
                    </span>` : ''}
                </div>
                <h1 class="text-2xl sm:text-3xl font-black text-white tracking-tight">${topic.title}</h1>
            </div>

            <!-- Theory -->
            <div class="space-y-3">
                <div class="flex items-center gap-2">
                    <div class="w-1 h-5 bg-blue-500 rounded-full"></div>
                    <p class="text-[9px] font-black text-blue-400/60 uppercase tracking-[0.3em]">Concept</p>
                </div>
                <p class="text-white/70 leading-relaxed text-sm sm:text-base">${topic.theory}</p>
            </div>

            <!-- Code snippet -->
            <div class="space-y-3">
                <div class="flex items-center gap-2">
                    <div class="w-1 h-5 bg-green-500 rounded-full"></div>
                    <p class="text-[9px] font-black text-green-400/60 uppercase tracking-[0.3em]">Code Example</p>
                </div>
                <div class="relative group">
                    <div class="absolute top-3 right-3 flex items-center gap-1.5">
                        <div class="w-2.5 h-2.5 rounded-full bg-red-500/60"></div>
                        <div class="w-2.5 h-2.5 rounded-full bg-yellow-500/60"></div>
                        <div class="w-2.5 h-2.5 rounded-full bg-green-500/60"></div>
                    </div>
                    <button onclick="_copyCode(this)" data-code="${encodeURIComponent(topic.snippet)}"
                        class="absolute bottom-3 right-3 px-2.5 py-1 bg-white/5 hover:bg-white/10 border border-white/10 
                        rounded-lg text-[8px] font-black text-white/40 hover:text-white uppercase tracking-widest transition-all opacity-0 group-hover:opacity-100">
                        Copy
                    </button>
                    <div class="bg-[#0d1117] border border-white/10 rounded-2xl p-5 pt-8 overflow-x-auto">
                        <pre class="text-green-400 text-xs sm:text-sm leading-relaxed font-mono whitespace-pre-wrap">${_escapeHtml(topic.snippet)}</pre>
                    </div>
                </div>
            </div>

            <!-- Challenge -->
            <div class="p-5 rounded-2xl bg-yellow-500/5 border border-yellow-500/15">
                <div class="flex items-start gap-3">
                    <div class="w-8 h-8 rounded-xl bg-yellow-500/10 flex items-center justify-center shrink-0">
                        <i class="fas fa-pen-to-square text-yellow-400 text-xs"></i>
                    </div>
                    <div>
                        <p class="text-[9px] font-black text-yellow-400/60 uppercase tracking-[0.3em] mb-1">Your Challenge</p>
                        <p class="text-white/70 text-sm">${topic.challenge}</p>
                    </div>
                </div>
            </div>

            <!-- Action buttons -->
            <div class="flex items-center gap-3 pt-2">
                ${!isFirst ? `
                <button onclick="openTopics('${courseName}', ${idx - 1})"
                    class="flex items-center gap-2 px-5 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white/60 hover:text-white font-black text-xs uppercase tracking-widest transition-all">
                    <i class="fas fa-arrow-left text-xs"></i> Prev
                </button>` : '<div></div>'}

                <div class="flex-1"></div>

                ${isDone
                    ? (!isLast
                        ? `<button onclick="openTopics('${courseName}', ${idx + 1})"
                            class="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-black text-xs uppercase tracking-widest transition-all shadow-lg shadow-blue-600/20">
                            Next Topic <i class="fas fa-arrow-right text-xs"></i>
                           </button>`
                        : `<button onclick="closeLMSModal(); switchLessonSubTab('Exam');"
                            class="flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-500 text-white rounded-xl font-black text-xs uppercase tracking-widest transition-all shadow-lg shadow-green-600/20">
                            <i class="fas fa-graduation-cap"></i> Go to Exam
                           </button>`)
                    : `<button onclick="_markAndNext('${courseName}', ${idx})"
                        class="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-black text-xs uppercase tracking-widest transition-all shadow-lg shadow-blue-600/20 active:scale-95">
                        <i class="fas fa-check"></i> Mark Done ${!isLast ? '& Next' : ''}
                       </button>`
                }
            </div>
        </div>`;
}

function _escapeHtml(str) {
    return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

window._copyCode = function(btn) {
    const code = decodeURIComponent(btn.dataset.code);
    navigator.clipboard.writeText(code).then(() => {
        btn.textContent = 'Copied!';
        setTimeout(() => btn.textContent = 'Copy', 2000);
    });
};

window._markAndNext = function(courseName, idx) {
    const key  = `tlp_completed_${courseName}`;
    const done = new Set(JSON.parse(localStorage.getItem(key) || '[]'));
    done.add(idx);
    localStorage.setItem(key, JSON.stringify([...done]));
    if (typeof awardXP === 'function') awardXP('complete_lesson');

    // Show toast
    _showToast('✓ Topic marked complete! +2 XP', 'success');

    const topics = curriculumData[courseName]?.topics || [];
    const isLast = idx === topics.length - 1;

    if (!isLast) {
        openTopics(courseName, idx + 1);
    } else {
        _renderTopicContent(courseName, idx);
        // Update progress
        const progressBar  = document.getElementById('modal-progress-bar');
        const progressText = document.getElementById('modal-progress-text');
        if (progressText) progressText.textContent = `${done.size}/${topics.length}`;
        if (progressBar)  progressBar.style.width = `${Math.round((done.size/topics.length)*100)}%`;
    }
};

function _showToast(message, type = 'info') {
    const colors = {
        success: 'bg-green-500/90 border-green-400/30',
        error:   'bg-red-500/90 border-red-400/30',
        info:    'bg-blue-500/90 border-blue-400/30',
        warning: 'bg-yellow-500/90 border-yellow-400/30',
    };
    const toast = document.createElement('div');
    toast.className = `fixed top-6 right-6 z-[9999] px-5 py-3 rounded-2xl border backdrop-blur-xl
        text-white font-black text-xs uppercase tracking-widest shadow-2xl
        animate-in slide-in-from-top-2 duration-300 ${colors[type] || colors.info}`;
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transition = 'opacity 0.3s';
        setTimeout(() => toast.remove(), 300);
    }, 2500);
}

window.closeLMSModal = function() {
    const modal = document.getElementById('global-modal');
    if (modal) modal.classList.add('hidden');
    document.body.style.overflow = '';
    // Refresh courses to show updated progress
    const content = document.getElementById('lesson-sub-content');
    if (content && _currentCourse) renderCourses(content);
};
window.closeModal = window.closeLMSModal;

// ── EXAM ──────────────────────────────────────────────────────────────────────
let _examState = { active:false, questions:[], answers:{}, timerRef:null, courseKey:'HTML' };

function renderExam(el) {
    const courses = window.curriculumData ? Object.keys(curriculumData) : ['HTML','CSS','JavaScript','Python'];
    el.innerHTML = `
    <div class="max-w-2xl mx-auto space-y-6">
        <!-- Exam info card -->
        <div class="p-6 rounded-3xl bg-white/[0.02] border border-white/5 space-y-4">
            <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                    <i class="fas fa-graduation-cap text-blue-400"></i>
                </div>
                <div>
                    <h3 class="text-white font-black text-sm uppercase tracking-wide">Assessment Terminal</h3>
                    <p class="text-white/30 text-[10px]">30 AI-generated questions · 15 minutes</p>
                </div>
                <div id="examTimer" class="ml-auto px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-white/40 font-mono font-bold text-xs">
                    STANDBY
                </div>
            </div>
        </div>

        <!-- Setup -->
        <div class="space-y-3">
            <label class="text-[9px] font-black text-white/30 uppercase tracking-[0.3em]">Select Course</label>
            <div class="grid grid-cols-2 gap-2" id="course-selector">
                ${courses.map((c, i) => {
                    const done  = window.curriculumData ? JSON.parse(localStorage.getItem(`tlp_completed_${c}`) || '[]').length : 0;
                    const total = window.curriculumData?.[c]?.topics?.length || 0;
                    const pct   = total ? Math.round((done/total)*100) : 0;
                    const unlocked = pct >= 50;
                    return `
                    <button onclick="_selectExamCourse('${c}', this)" data-course="${c}"
                        class="exam-course-btn relative p-4 rounded-2xl border text-left transition-all
                        ${i === 0 ? 'border-blue-500/40 bg-blue-500/10' : 'border-white/10 bg-white/[0.02] hover:border-white/20'}
                        ${!unlocked ? 'opacity-50' : ''}">
                        <div class="flex items-center justify-between mb-2">
                            <span class="text-white font-black text-xs uppercase">${c}</span>
                            ${unlocked
                                ? `<i class="fas fa-unlock text-green-400 text-[10px]"></i>`
                                : `<i class="fas fa-lock text-white/20 text-[10px]"></i>`}
                        </div>
                        <div class="h-1 bg-white/5 rounded-full overflow-hidden">
                            <div class="h-full bg-blue-500 rounded-full" style="width:${pct}%"></div>
                        </div>
                        <p class="text-white/20 text-[9px] mt-1">${pct}% complete</p>
                    </button>`;
                }).join('')}
            </div>
        </div>

        <!-- Token auth -->
        <div class="p-5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3">
            <p class="text-[9px] font-black text-white/30 uppercase tracking-[0.3em]">Session Token</p>
            <div class="flex gap-2">
                <div class="flex-1 relative">
                    <input type="text" id="examCodeInput" placeholder="Enter token to start..."
                        class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white font-mono text-sm outline-none focus:border-blue-500/50 transition-all placeholder:text-white/20">
                </div>
                <button onclick="generateExamCode()"
                    class="px-5 py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl text-white/60 hover:text-white font-black text-[10px] uppercase tracking-widest transition-all whitespace-nowrap">
                    Get Token
                </button>
            </div>
            <input type="hidden" id="generatedCodeDisplay">
        </div>

        <!-- Start -->
        <button onclick="startExam()"
            class="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black text-sm uppercase tracking-widest transition-all shadow-lg shadow-blue-600/20 active:scale-[0.98]">
            Start Assessment →
        </button>

        <div id="examContent"></div>
    </div>`;

    // Auto-select first unlocked course
    const firstCourse = courses[0];
    window._selectedExamCourse = firstCourse;
}

window._selectExamCourse = function(name, btn) {
    window._selectedExamCourse = name;
    document.querySelectorAll('.exam-course-btn').forEach(b => {
        b.classList.remove('border-blue-500/40', 'bg-blue-500/10');
        b.classList.add('border-white/10', 'bg-white/[0.02]');
    });
    btn.classList.add('border-blue-500/40', 'bg-blue-500/10');
    btn.classList.remove('border-white/10', 'bg-white/[0.02]');
};

window.generateExamCode = function() {
    const code = 'EX-' + Math.random().toString(36).substring(2,8).toUpperCase();
    const hidden = document.getElementById('generatedCodeDisplay');
    const input  = document.getElementById('examCodeInput');
    if (hidden) hidden.value = code;
    if (input)  { input.value = code; input.placeholder = 'Token generated above ↑'; }
    _showToast('Token generated — click Start to begin', 'info');
};

window.startExam = async function() {
    const input     = document.getElementById('examCodeInput')?.value.trim();
    const generated = document.getElementById('generatedCodeDisplay')?.value;

    if (!input) { _showToast('Generate a token first, then click Start', 'warning'); return; }
    if (input !== generated) { _showToast('Token doesn\'t match — regenerate and try again', 'error'); return; }
    if (_examState.active)  { _showToast('An exam is already in progress', 'warning'); return; }

    const courseKey = window._selectedExamCourse || 'HTML';
    const totalTopics = window.curriculumData?.[courseKey]?.topics?.length || 0;
    const doneTopics  = JSON.parse(localStorage.getItem(`tlp_completed_${courseKey}`) || '[]').length;
    const pct = totalTopics ? Math.round((doneTopics/totalTopics)*100) : 0;

    if (pct < 50) {
        const content = document.getElementById('examContent');
        if (content) content.innerHTML = `
            <div class="mt-4 p-6 rounded-2xl bg-yellow-500/10 border border-yellow-500/20 flex items-start gap-4">
                <div class="w-10 h-10 rounded-xl bg-yellow-500/10 flex items-center justify-center shrink-0">
                    <i class="fas fa-lock text-yellow-400"></i>
                </div>
                <div>
                    <p class="text-yellow-400 font-black text-sm mb-1">Exam Locked</p>
                    <p class="text-white/50 text-xs leading-relaxed">
                        You need to complete at least 50% of the ${courseKey} topics before taking this exam.
                        You're at ${pct}% right now (${doneTopics}/${totalTopics} topics).
                    </p>
                    <button onclick="closeLMSModal(); switchLessonSubTab('Courses');"
                        class="mt-3 px-4 py-2 bg-blue-600 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-500 transition-all">
                        Study ${courseKey} →
                    </button>
                </div>
            </div>`;
        return;
    }

    _examState.courseKey = courseKey;
    const content = document.getElementById('examContent');
    if (content) content.innerHTML = `
        <div class="mt-6 flex flex-col items-center gap-4 py-12">
            <div class="w-14 h-14 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
            <p class="text-white/50 text-sm font-black uppercase tracking-widest">Generating questions...</p>
            <p class="text-white/20 text-[10px]">Creating 30 questions from ${courseKey} curriculum</p>
        </div>`;

    try {
        const questions = await _generateAIQuestions(courseKey);
        _examState.questions = questions;
        _examState.answers   = {};
        _examState.active    = true;
        _renderExamQuestions(questions, courseKey);
        _startExamTimer(15 * 60);
        window._examBlurHandler = () => { if (_examState.active) window.submitExam('TAB_VIOLATION'); };
        window.addEventListener('blur', window._examBlurHandler);
    } catch(err) {
        if (content) content.innerHTML = `
            <div class="mt-4 p-5 rounded-2xl bg-red-500/10 border border-red-500/20">
                <p class="text-red-400 font-black text-sm">Failed to generate questions</p>
                <p class="text-white/40 text-xs mt-1">${err.message}</p>
                <button onclick="startExam()" class="mt-3 px-4 py-2 bg-red-600/30 border border-red-500/30 text-red-300 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-red-600/50 transition-all">
                    Try Again
                </button>
            </div>`;
    }
};

async function _generateAIQuestions(course) {
    // Use local question bank — no API needed, works offline, no CORS issues
    if (typeof getExamQuestions === 'function') {
        return getExamQuestions(course);
    }
    // Fallback if exam_questions.js not loaded yet
    throw new Error('Question bank not loaded. Please refresh the page.');
}

function _renderExamQuestions(questions, courseKey) {
    const content = document.getElementById('examContent');
    if (!content) return;
    content.innerHTML = `
        <div class="mt-6 space-y-5" id="questionList">
            <div class="flex items-center justify-between px-1 mb-2">
                <p class="text-white/40 text-[10px] font-black uppercase tracking-widest">
                    ${questions.length} Questions · ${courseKey}
                </p>
                <p class="text-white/20 text-[9px]">Select one answer per question</p>
            </div>
            ${questions.map((q, i) => `
            <div class="p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all">
                <p class="text-white font-bold text-sm mb-4 leading-relaxed">
                    <span class="text-blue-400 font-black mr-2">${i+1}.</span>${q.q}
                </p>
                <div class="space-y-2">
                    ${q.options.map(opt => {
                        const safe = opt.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
                        return `
                    <label class="flex items-center gap-3 p-3 rounded-xl border border-transparent
                        hover:bg-white/5 hover:border-white/10 cursor-pointer transition-all
                        has-[:checked]:bg-blue-500/10 has-[:checked]:border-blue-500/30">
                        <input type="radio" name="q${i}" value="${opt[0]}" class="accent-blue-500 w-4 h-4">
                        <span class="text-white/70 text-sm">${safe}</span>
                    </label>`;
                    }).join('')}
                </div>
            </div>`).join('')}

            <button onclick="submitExam('MANUAL')"
                class="w-full py-4 bg-green-600 hover:bg-green-500 text-white rounded-2xl font-black text-sm uppercase tracking-widest transition-all shadow-lg shadow-green-600/20 active:scale-[0.98]">
                Submit Exam →
            </button>
        </div>`;
}

function _startExamTimer(duration) {
    const display = document.getElementById('examTimer');
    let remaining = duration;
    _examState.timerRef = setInterval(() => {
        const m = Math.floor(remaining / 60);
        const s = remaining % 60;
        if (display) {
            display.textContent = `${m}:${s < 10 ? '0'+s : s}`;
            display.className = `ml-auto px-4 py-1.5 rounded-full font-mono font-bold text-xs border
                ${remaining < 120
                    ? 'bg-red-500/20 border-red-500/30 text-red-400 animate-pulse'
                    : 'bg-white/5 border-white/10 text-white/60'}`;
        }
        if (--remaining < 0) { clearInterval(_examState.timerRef); window.submitExam('TIME_EXPIRY'); }
    }, 1000);
}

window.submitExam = async function(reason) {
    if (!_examState.active) return;
    _examState.active = false;
    clearInterval(_examState.timerRef);
    if (window._examBlurHandler) window.removeEventListener('blur', window._examBlurHandler);

    _examState.questions.forEach((q, i) => {
        const sel = document.querySelector(`input[name="q${i}"]:checked`);
        _examState.answers[i] = sel?.value || null;
    });

    let correct = 0;
    _examState.questions.forEach((q, i) => { if (_examState.answers[i] === q.answer) correct++; });
    const total = _examState.questions.length || 30;
    const score = Math.round((correct / total) * 100);

    // Save result
    await _saveExamResult(score, reason, _examState.courseKey);

    // Show result
    const content = document.getElementById('examContent');
    if (content && reason !== 'TAB_VIOLATION') {
        const passed = score >= 60;
        content.innerHTML = `
            <div class="mt-6 p-8 rounded-3xl border text-center space-y-4
                ${passed ? 'bg-green-500/5 border-green-500/20' : 'bg-red-500/5 border-red-500/20'}">
                <div class="w-20 h-20 rounded-full border-4 mx-auto flex items-center justify-center
                    ${passed ? 'border-green-500 bg-green-500/10' : 'border-red-500 bg-red-500/10'}">
                    <span class="text-2xl font-black ${passed ? 'text-green-400' : 'text-red-400'}">${score}%</span>
                </div>
                <div>
                    <p class="text-white font-black text-xl">${passed ? '🎉 Great work!' : 'Keep studying'}</p>
                    <p class="${passed ? 'text-green-400' : 'text-red-400'} font-bold text-sm mt-1">
                        ${correct}/${total} correct answers
                    </p>
                </div>
                <div class="p-4 rounded-2xl ${passed ? 'bg-green-500/10' : 'bg-white/5'} border ${passed ? 'border-green-500/20' : 'border-white/5'}">
                    <p class="text-white/50 text-xs leading-relaxed">
                        ${passed
                            ? 'Your result is <span class="text-yellow-400 font-black">PENDING</span> for 24 hours. If it holds, your semester will advance automatically. 🚀'
                            : 'Your result is <span class="text-yellow-400 font-black">PENDING</span> for 24 hours. Score 60%+ to advance. You can retake with fresh questions anytime.'}
                    </p>
                </div>
                <div class="flex gap-3 justify-center">
                    <button onclick="switchLessonSubTab('Results')"
                        class="px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white/60 hover:text-white font-black text-[10px] uppercase tracking-widest transition-all">
                        View Results
                    </button>
                    ${!passed ? `
                    <button onclick="renderExam(document.getElementById('lesson-sub-content'))"
                        class="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-black text-[10px] uppercase tracking-widest transition-all">
                        Try Again
                    </button>` : ''}
                </div>
            </div>`;
    } else if (content && reason === 'TAB_VIOLATION') {
        content.innerHTML = `
            <div class="mt-6 p-6 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-start gap-4">
                <i class="fas fa-exclamation-triangle text-red-400 text-xl mt-0.5"></i>
                <div>
                    <p class="text-red-400 font-black text-sm">Exam Terminated</p>
                    <p class="text-white/50 text-xs mt-1 leading-relaxed">
                        You switched tabs during the exam. The session was ended automatically.
                        Your current score has been recorded as a partial attempt.
                    </p>
                </div>
            </div>`;
    }
};

async function _saveExamResult(score, reason, course) {
    try {
        const client  = await getLMSClient();
        const user    = await getLMSUser();
        if (!user) return;
        const profile = JSON.parse(localStorage.getItem('tlp_profile') || '{}');
        await client.from('exam_results').insert({
            user_id: user.id, course, score, reason,
            semester: profile.semester || 1, level: profile.level || 100,
            status: 'pending', taken_at: new Date().toISOString(),
            promote_at: new Date(Date.now() + 24*60*60*1000).toISOString()
        });
        if (score >= 60 && typeof awardXP === 'function') awardXP('pass_exam');
    } catch(err) { console.error('[Exam] Save failed:', err.message); }
}

// ── RESULTS ──────────────────────────────────────────────────────────────────
async function renderResults(el) {
    el.innerHTML = `
        <div class="flex flex-col items-center gap-3 py-16">
            <div class="w-10 h-10 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
            <p class="text-white/30 text-xs font-black uppercase tracking-widest">Loading results...</p>
        </div>`;
    try {
        const client = await getLMSClient();
        const user   = await getLMSUser();
        if (!user) {
            el.innerHTML = `<div class="py-20 text-center"><p class="text-white/30 font-black uppercase text-sm">Not logged in</p></div>`;
            return;
        }

        const { data: results } = await client
            .from('exam_results').select('*').eq('user_id', user.id)
            .order('taken_at', { ascending: false }).limit(20);

        await _processPromotions(client, user, results || []);

        if (!results?.length) {
            el.innerHTML = `
                <div class="flex flex-col items-center gap-4 py-24 text-center">
                    <div class="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center">
                        <i class="fas fa-clipboard-list text-white/20 text-2xl"></i>
                    </div>
                    <p class="text-white font-black text-lg">No exam results yet</p>
                    <p class="text-white/30 text-sm">Complete some topics and take your first exam</p>
                    <button onclick="switchLessonSubTab('Courses')"
                        class="px-6 py-3 bg-blue-600 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-blue-500 transition-all">
                        Start Studying →
                    </button>
                </div>`;
            return;
        }

        el.innerHTML = `
            <div class="space-y-4">
                ${results.map(r => {
                    const status = _resolveStatus(r);
                    const statusConfig = {
                        passed:  { color: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/20', icon: 'fa-check-circle', label: 'Passed' },
                        failed:  { color: 'text-red-400',   bg: 'bg-red-500/10',   border: 'border-red-500/20',   icon: 'fa-times-circle', label: 'Failed' },
                        pending: { color: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/20', icon: 'fa-clock', label: 'Pending' },
                    }[status] || {};
                    return `
                    <div class="flex items-center gap-4 p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all">
                        <div class="w-10 h-10 rounded-xl ${statusConfig.bg} border ${statusConfig.border} flex items-center justify-center shrink-0">
                            <i class="fas ${statusConfig.icon} ${statusConfig.color} text-sm"></i>
                        </div>
                        <div class="flex-1 min-w-0">
                            <p class="text-white font-black text-sm uppercase">${r.course}</p>
                            <p class="text-white/30 text-[10px] mt-0.5">
                                Lv ${r.level} · Sem ${String(r.semester).padStart(3,'0')} · ${new Date(r.taken_at).toLocaleDateString('en-GB', { day:'numeric', month:'short' })}
                            </p>
                        </div>
                        <div class="text-right">
                            <p class="font-black text-lg ${r.score >= 60 ? 'text-green-400' : 'text-red-400'}">${r.score}%</p>
                            <span class="text-[9px] font-black uppercase ${statusConfig.color}">${statusConfig.label}</span>
                        </div>
                    </div>`;
                }).join('')}
            </div>`;
    } catch(err) {
        el.innerHTML = `
            <div class="p-6 rounded-2xl bg-red-500/10 border border-red-500/20 text-center">
                <p class="text-red-400 font-black text-sm">Couldn't load results</p>
                <p class="text-white/40 text-xs mt-1">${err.message}</p>
            </div>`;
    }
}

function _resolveStatus(r) {
    if (!r) return 'pending';
    if (r.status === 'passed' || r.status === 'failed') return r.status;
    if (!r.promote_at) return r.score >= 60 ? 'passed' : 'failed';
    return Date.now() >= new Date(r.promote_at).getTime()
        ? (r.score >= 60 ? 'passed' : 'failed')
        : 'pending';
}

async function _processPromotions(client, user, results) {
    for (const r of results) {
        if (r.status !== 'pending') continue;
        if (Date.now() < new Date(r.promote_at).getTime()) continue;
        const newStatus = r.score >= 60 ? 'passed' : 'failed';
        await client.from('exam_results').update({ status: newStatus }).eq('id', r.id);
        if (newStatus === 'passed') {
            const profile = JSON.parse(localStorage.getItem('tlp_profile') || '{}');
            const newSem  = (profile.semester || 1) + 1;
            await client.from('profiles').update({ semester: newSem }).eq('id', user.id);
            profile.semester = newSem;
            localStorage.setItem('tlp_profile', JSON.stringify(profile));
            _showToast(`🎉 Promoted to Semester ${String(newSem).padStart(3,'0')}!`, 'success');
        }
    }
}



//// for the videos 
/**
 * TECH NXXT: NEURAL VIDEO ARCHIVE ENGINE
 * Credentials Locked: UC4SVo0Ue36XCfOyb5Lh1viQ
 * Features: Centered Modal Player, Slide-out Library, Private Supabase Sync
 * Version: 2.0.4 - Full Global Scoping Patch
 */

// --- GLOBAL SYSTEM UPLINK ---
// Explicitly attaching functions to the window object to prevent 'undefined' errors in HTML onclicks
window.renderVideos = renderVideos;
window.fetchSavedVideos = fetchSavedVideos;
window.toggleSaveVideo = toggleSaveVideo;
window.openVideoPlayer = openVideoPlayer;
window.handleVideoSearch = handleVideoSearch;
window.fetchLearningVideos = fetchLearningVideos;

/**
 * INTERNAL: VAULT RECOVERY
 * Locates the Supabase client dynamically to prevent "undefined" reference errors
 */
const _getVault = () => {
    const vault = window.supabase || (typeof supabase !== 'undefined' ? supabase : null);
    if (!vault) {
        console.error("TECH_NXXT_CORE_ERROR: Neural Link to Supabase could not be established.");
    }
    return vault;
};

async function renderVideos(container) {
    if (!container) return;
    
    // 1. MASTER SHELL: Tactical Search Header & Control Bar
    container.innerHTML = `
        <div class="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div class="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                <div class="relative w-full md:w-[450px]">
                    <i class="fas fa-search absolute left-5 top-1/2 -translate-y-1/2 text-blue-500/40 text-[10px]"></i>
                    <input type="text" id="videoSearchInput" 
                        placeholder="SEARCH NEURAL ARCHIVES..." 
                        class="w-full bg-white/[0.02] border border-white/5 rounded-2xl py-4 pl-14 pr-6 text-[10px] font-black text-white uppercase tracking-[0.2em] focus:border-blue-500/50 focus:bg-blue-500/5 focus:outline-none transition-all placeholder:text-white/10"
                        onkeyup="handleVideoSearch(this.value)">
                </div>
                
                <div class="flex items-center gap-3">
                    <button onclick="renderVideos(document.getElementById('lesson-sub-content'))" 
                        class="px-5 py-3 bg-white/5 border border-white/5 rounded-xl text-[9px] font-black text-white/30 uppercase tracking-widest hover:text-white transition-all">
                        <i class="fas fa-sync-alt mr-2"></i> Refresh
                    </button>
                    <button onclick="fetchSavedVideos()" 
                        class="px-5 py-3 bg-blue-600/10 border border-blue-500/20 rounded-xl text-[9px] font-black text-blue-400 uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all">
                        <i class="fas fa-bookmark mr-2"></i> My Library
                    </button>
                </div>
            </div>

            <div id="videoGridContainer" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                ${Array(6).fill(0).map(() => `
                    <div class="h-[350px] rounded-[2.5rem] bg-white/[0.01] border border-white/5 animate-pulse"></div>
                `).join('')}
            </div>
        </div>
    `;

    // 2. INITIALIZE DATA FETCH
    await fetchLearningVideos();
}

/**
 * CORE LOGIC: API FETCHING & DATA BINDING
 */
async function fetchLearningVideos(query = '') {
    const grid = document.getElementById('videoGridContainer');
    if (!grid) return;

    try {
        const API_KEY = 'AIzaSyAkZtg1ux1fYkIKFr3q8I1wX_PK-p31Uh4'; 
        const CHANNEL_ID = 'UC4SVo0Ue36XCfOyb5Lh1viQ'; 
        
        let url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=12&type=video&channelId=${CHANNEL_ID}&key=${API_KEY}`;
        if (query) url += `&q=${encodeURIComponent(query)}`;

        const response = await fetch(url);
        const data = await response.json();

        if (data.items && data.items.length > 0) {
            renderVideoCards(data.items, grid);
        } else {
            renderEmptyVideoState(grid);
        }
    } catch (error) {
        console.error("NXXT_UPLINK_OFFLINE:", error);
        renderEmptyVideoState(grid);
    }
}

/**
 * UI: CARD GENERATION
 */
function renderVideoCards(items, grid) {
    grid.innerHTML = items.map(item => {
        const v = item.snippet;
        const videoId = item.id.videoId;
        const thumb = v.thumbnails.high.url;
        const safeTitle = v.title.replace(/'/g, "\\'");
        
        return `
            <div class="group relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#050b1d] p-5 transition-all duration-500 hover:border-blue-500/40 hover:translate-y-[-5px] hover:shadow-[0_20px_50px_rgba(59,130,246,0.1)]">
                
                <div class="relative aspect-video rounded-[1.8rem] overflow-hidden mb-6 bg-black border border-white/5">
                    <img src="${thumb}" class="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105" />
                    <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80"></div>
                    
                    <button onclick="openVideoPlayer('${videoId}')" class="absolute inset-0 flex items-center justify-center">
                        <div class="h-14 w-14 rounded-full bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400 backdrop-blur-md scale-90 group-hover:scale-110 opacity-0 group-hover:opacity-100 transition-all duration-500">
                            <i class="fas fa-play text-xl ml-1"></i>
                        </div>
                    </button>

                    <div class="absolute top-4 left-4 px-3 py-1 bg-black/60 backdrop-blur-md border border-white/10 rounded-lg text-[8px] font-black text-white/60 uppercase tracking-widest">
                        Module Locked
                    </div>
                </div>

                <div class="px-2">
                    <div class="flex items-center justify-between mb-3">
                        <span class="text-[9px] font-black text-blue-500 uppercase tracking-widest">Programming Node</span>
                        <button onclick="toggleSaveVideo('${videoId}', '${safeTitle}', '${thumb}')" 
                            class="text-white/20 hover:text-blue-400 transition-colors">
                            <i class="far fa-bookmark text-sm"></i>
                        </button>
                    </div>

                    <h4 class="text-xs font-black text-white uppercase tracking-tight line-clamp-2 leading-relaxed min-h-[2.8rem]">${v.title}</h4>
                    
                    <div class="mt-6 flex items-center justify-between border-t border-white/5 pt-5">
                        <div class="flex items-center gap-1.5">
                            <i class="fas fa-star text-blue-500 text-[9px]"></i>
                            <span class="text-[10px] font-black text-white">4.9</span>
                        </div>
                        <button onclick="openVideoPlayer('${videoId}')" 
                            class="px-6 py-3 rounded-2xl border border-blue-500/20 text-[9px] font-black text-blue-400 uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all">
                            View Course
                        </button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

/**
 * MODAL PLAYER (CENTERED MODAL)
 */
function openVideoPlayer(videoId) {
    const modal = document.createElement('div');
    modal.id = "videoPlayerModal";
    modal.className = "fixed inset-0 z-[200] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 animate-in fade-in duration-300";
    modal.innerHTML = `
        <div class="relative w-full max-w-4xl aspect-video bg-[#050b1d] border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl animate-in zoom-in duration-300">
            <button onclick="document.getElementById('videoPlayerModal').remove()" 
                class="absolute top-6 right-6 z-10 h-10 w-10 bg-white/10 border border-white/10 rounded-full flex items-center justify-center text-white hover:bg-red-500 transition-all">
                <i class="fas fa-times"></i>
            </button>
            <iframe src="https://www.youtube.com/embed/${videoId}?autoplay=1" 
                class="w-full h-full" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
        </div>
    `;
    document.body.appendChild(modal);
}

/**
 * SLIDE-OUT LIBRARY PANEL (RIGHT SIDE MODAL)
 */
async function fetchSavedVideos() {
    const supabase = _getVault();
    if (!supabase) return alert("System Link Offline: Supabase not detected.");

    try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return alert("System Authentication Required.");

        const { data: saved, error } = await supabase
            .from('user_videos')
            .select('*')
            .order('created_at', { ascending: false });

        const existingPanel = document.getElementById('librarySidePanel');
        if (existingPanel) existingPanel.remove();

        const sidePanel = document.createElement('div');
        sidePanel.id = "librarySidePanel";
        sidePanel.className = "fixed inset-0 z-[150] flex justify-end bg-black/60 backdrop-blur-sm animate-in fade-in duration-300";
        sidePanel.onclick = (e) => e.target === sidePanel && sidePanel.remove();

        sidePanel.innerHTML = `
            <div class="w-full max-w-md h-full bg-[#050b1d] border-l border-white/10 p-8 shadow-2xl animate-in slide-in-from-right duration-500 overflow-y-auto">
                <div class="flex items-center justify-between mb-10">
                    <h2 class="text-xl font-black text-white uppercase italic tracking-tighter">Neural Library</h2>
                    <button onclick="document.getElementById('librarySidePanel').remove()" class="text-white/20 hover:text-white transition-all">
                        <i class="fas fa-arrow-right text-lg"></i>
                    </button>
                </div>

                <div class="space-y-6" id="libraryList">
                    ${!saved || saved.length === 0 ? `
                        <div class="py-32 flex flex-col items-center justify-center opacity-20 text-center">
                            <i class="fas fa-folder-open text-5xl mb-6"></i>
                            <h3 class="text-[10px] font-black uppercase tracking-[0.3em]">No Modules Synced</h3>
                        </div>
                    ` : saved.map(v => `
                        <div class="group relative flex gap-4 p-4 bg-white/[0.02] border border-white/5 rounded-2xl hover:border-blue-500/40 transition-all">
                            <img src="${v.thumbnail_url}" class="h-16 w-24 object-cover rounded-xl opacity-60 group-hover:opacity-100">
                            <div class="flex flex-col justify-center overflow-hidden">
                                <h4 class="text-[10px] font-black text-white uppercase truncate">${v.video_title}</h4>
                                <div class="flex gap-4 mt-3">
                                    <button onclick="openVideoPlayer('${v.video_id}')" class="text-[9px] font-black text-blue-400 uppercase tracking-widest hover:text-blue-300">Play</button>
                                    <button onclick="toggleSaveVideo('${v.video_id}')" class="text-[9px] font-black text-white/20 hover:text-red-500 uppercase tracking-widest">Delete</button>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
        document.body.appendChild(sidePanel);
    } catch (err) {
        console.error("Library sync failure:", err);
    }
}

/**
 * PERSISTENCE: PRIVATE DATABASE SYNC
 */
async function toggleSaveVideo(vid, title = '', thumb = '') {
    const supabase = _getVault();
    if (!supabase) return;

    try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return alert("System Auth Required.");

        const { data: existing } = await supabase.from('user_videos')
            .select('id').eq('user_id', user.id).eq('video_id', vid).single();

        if (existing) {
            await supabase.from('user_videos').delete().eq('id', existing.id);
            console.log("Removed from Archive.");
            if(document.getElementById('librarySidePanel')) fetchSavedVideos();
        } else {
            await supabase.from('user_videos').insert([{
                user_id: user.id, video_id: vid, video_title: title, thumbnail_url: thumb
            }]);
            console.log("Synced to Archive.");
            alert("Synced to Archive.");
        }
    } catch (err) {
        console.error("Database Write Error:", err);
    }
}

/**
 * SYSTEM UI: EMPTY STATE (MAIN GRID)
 */
function renderEmptyVideoState(grid) {
    grid.innerHTML = `
        <div class="col-span-full flex flex-col items-center justify-center py-24 text-center animate-in zoom-in duration-500">
            <div class="relative mb-8">
                <div class="h-24 w-24 bg-blue-600/5 border border-blue-500/20 rounded-[2rem] flex items-center justify-center text-blue-500/30">
                    <i class="fas fa-video-slash text-4xl"></i>
                </div>
                <div class="absolute -top-2 -right-2 h-6 w-6 bg-blue-600/20 border border-blue-400/40 rounded-lg flex items-center justify-center">
                    <div class="h-1.5 w-1.5 bg-blue-400 rounded-full animate-pulse"></div>
                </div>
            </div>
            <h3 class="text-xl font-black text-white uppercase italic tracking-tighter">Neural Link Severed</h3>
            <p class="mt-2 text-[10px] font-black text-white/20 uppercase tracking-[0.3em] max-w-[280px]"> Archive synchronization failed or the requested data node is offline.</p>
            <button onclick="renderVideos(document.getElementById('lesson-sub-content'))" class="mt-10 px-8 py-3 bg-white/5 border border-white/10 rounded-2xl text-[9px] font-black text-white uppercase tracking-widest hover:bg-blue-600 transition-all">Retry Link</button>
        </div>
    `;
}

/**
 * UTILITY: SEARCH DEBOUNCE
 */
let searchTimer;
function handleVideoSearch(val) {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => fetchLearningVideos(val), 600);
}




// ── ANALYTICS ────────────────────────────────────────────────────────────────
async function renderAnalytics(el) {
    el.innerHTML = `
        <div class="flex flex-col items-center gap-3 py-16">
            <div class="w-10 h-10 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
            <p class="text-white/30 text-xs font-black uppercase tracking-widest">Crunching numbers...</p>
        </div>`;
    try {
        const client = await getLMSClient();
        const user   = await getLMSUser();
        if (!user) return;

        const { data: results } = await client
            .from('exam_results').select('*').eq('user_id', user.id).order('taken_at');

        const total   = results?.length || 0;
        const passed  = results?.filter(r => _resolveStatus(r) === 'passed').length  || 0;
        const failed  = results?.filter(r => _resolveStatus(r) === 'failed').length  || 0;
        const pending = results?.filter(r => _resolveStatus(r) === 'pending').length || 0;
        const avg     = total ? Math.round(results.reduce((s,r) => s+r.score, 0) / total) : 0;
        const best    = total ? Math.max(...results.map(r => r.score)) : 0;

        // Course completion stats
        const courseStats = Object.keys(window.curriculumData || {}).map(name => {
            const done  = JSON.parse(localStorage.getItem(`tlp_completed_${name}`) || '[]').length;
            const total = curriculumData[name].topics.length;
            return { name, done, total, pct: total ? Math.round((done/total)*100) : 0 };
        });

        el.innerHTML = `
            <div class="space-y-6">
                <!-- Exam stats -->
                <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    ${[
                        ['Total Exams', total, 'text-blue-400', 'fa-list'],
                        ['Passed', passed, 'text-green-400', 'fa-check'],
                        ['Failed', failed, 'text-red-400', 'fa-times'],
                        ['Pending', pending, 'text-yellow-400', 'fa-clock'],
                    ].map(([label, val, color, icon]) => `
                    <div class="p-5 rounded-2xl bg-white/[0.02] border border-white/5 text-center">
                        <i class="fas ${icon} ${color} text-lg mb-2"></i>
                        <p class="${color} font-black text-3xl">${val}</p>
                        <p class="text-white/30 text-[9px] uppercase font-bold mt-1">${label}</p>
                    </div>`).join('')}
                </div>

                <!-- Score cards -->
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div class="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                        <p class="text-white/30 text-[9px] uppercase font-black tracking-widest mb-3">Average Score</p>
                        <p class="font-black text-4xl ${avg >= 60 ? 'text-green-400' : 'text-red-400'}">${avg}%</p>
                        <div class="mt-3 h-2 bg-white/5 rounded-full overflow-hidden">
                            <div class="h-full rounded-full ${avg >= 60 ? 'bg-green-500' : 'bg-red-500'} transition-all" style="width:${avg}%"></div>
                        </div>
                        <p class="text-white/20 text-[10px] mt-2">${avg >= 60 ? '✅ On track for promotion' : '⚠️ Need 60%+ to advance'}</p>
                    </div>
                    <div class="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                        <p class="text-white/30 text-[9px] uppercase font-black tracking-widest mb-3">Personal Best</p>
                        <p class="font-black text-4xl text-blue-400">${best}%</p>
                        <div class="mt-3 h-2 bg-white/5 rounded-full overflow-hidden">
                            <div class="h-full bg-blue-500 rounded-full transition-all" style="width:${best}%"></div>
                        </div>
                    </div>
                </div>

                <!-- Course progress -->
                <div class="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-4">
                    <p class="text-white font-black text-sm">Course Progress</p>
                    ${courseStats.map(cs => `
                    <div class="space-y-1.5">
                        <div class="flex justify-between items-center">
                            <span class="text-white/60 text-xs font-bold">${cs.name}</span>
                            <span class="text-white/30 text-[10px] font-black">${cs.done}/${cs.total} · ${cs.pct}%</span>
                        </div>
                        <div class="h-1.5 bg-white/5 rounded-full overflow-hidden">
                            <div class="h-full rounded-full transition-all ${cs.pct === 100 ? 'bg-green-500' : 'bg-blue-500'}" style="width:${cs.pct}%"></div>
                        </div>
                    </div>`).join('')}
                </div>

                ${total === 0 ? `
                <div class="p-5 rounded-2xl bg-blue-500/5 border border-blue-500/10 text-center">
                    <p class="text-white/50 text-sm">No exams taken yet — complete some topics and take your first exam to see analytics here.</p>
                </div>` : ''}
            </div>`;
    } catch(err) {
        el.innerHTML = `<div class="p-6 rounded-2xl bg-red-500/10 border border-red-500/20 text-center">
            <p class="text-red-400 font-black">${err.message}</p></div>`;
    }
}


// ── EXPOSE ────────────────────────────────────────────────────────────────────
window.initLMS            = initLMS;
window.switchLessonSubTab = switchLessonSubTab;
window.syncLessonsHeader  = syncLessonsHeader;



