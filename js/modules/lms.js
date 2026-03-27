/* ── T LEARN PRO: modules/lms.js ──
   Full LMS Engine: Courses, AI Exam, Results, Analytics, Promotion
*/

async function getLMSClient() { return window.supabaseLoader.load(); }
async function getLMSUser()   { return window.AuthState.getUser(); }
function setLEl(id, val)      { const el = document.getElementById(id); if (el) el.textContent = val; }

// ── INIT ──────────────────────────────────────────────────────────────────────
function initLMS() {
    // lesson-sub-content is the root in the lessons view
    const app = document.getElementById('lesson-app-root') || document.getElementById('lesson-sub-content');
    if (app && app.id === 'lesson-app-root') app.innerHTML = '';
    syncLessonsHeader();
    switchLessonSubTab('Courses');
}

function syncLessonsHeader() {
    const cached = JSON.parse(localStorage.getItem('tlp_profile') || '{}');
    setLEl('lessons-level-val',    cached.level    ?? '—');
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
        btn.classList.toggle('shadow-blue-600/40', active);
        btn.classList.toggle('text-gray-400', !active);
        btn.classList.toggle('hover:text-white', !active);
    });
    switch(tab) {
        case 'Courses':   renderCourses(contentArea);   break;
        case 'Exam':      renderExam(contentArea);      break;
        case 'Result':    renderResults(contentArea);   break;
        case 'Analytics': renderAnalytics(contentArea); break;
    }
}

// ── COURSES ───────────────────────────────────────────────────────────────────
function renderCourses(el) {
    if (!window.curriculumData) {
        el.innerHTML = `<p class="text-white/40 text-center py-20 text-sm">Loading curriculum...</p>`;
        // Retry up to 10 times every 300ms waiting for curriculumData to load
        let attempts = 0;
        const retry = setInterval(() => {
            attempts++;
            if (window.curriculumData) {
                clearInterval(retry);
                renderCourses(el);
            } else if (attempts >= 10) {
                clearInterval(retry);
                el.innerHTML = `<p class="text-red-400 text-center py-20 text-sm">Failed to load curriculum. Please refresh the page.</p>`;
            }
        }, 300);
        return;
    }
    el.innerHTML = `
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-in slide-in-from-bottom-8">
            ${Object.keys(curriculumData).map(name => {
                const done  = getCompletedTopics(name);
                const total = curriculumData[name].topics.length;
                const pct   = total ? Math.round((done/total)*100) : 0;
                return `
                <div onclick="openTopics('${name}')" class="group cursor-pointer p-8 bg-white/5 border border-white/10 rounded-[2.5rem] hover:bg-blue-600 hover:border-blue-500 transition-all duration-300">
                    <i class="fab ${curriculumData[name].icon} text-3xl text-white mb-4 group-hover:scale-110 transition-transform"></i>
                    <h4 class="text-white font-black text-2xl uppercase">${name}</h4>
                    <p class="text-white/40 text-[10px] uppercase font-bold mt-1">Professional Curriculum</p>
                    <div class="mt-4 bg-white/10 rounded-full h-1.5">
                        <div class="bg-green-500 h-1.5 rounded-full transition-all" style="width:${pct}%"></div>
                    </div>
                    <p class="text-white/30 text-[9px] font-bold mt-1">${done}/${total} topics completed</p>
                </div>`;
            }).join('')}
        </div>`;
}

function getCompletedTopics(courseName) {
    return JSON.parse(localStorage.getItem(`tlp_completed_${courseName}`) || '[]').length;
}

function markTopicComplete(courseName, idx) {
    const key  = `tlp_completed_${courseName}`;
    const done = new Set(JSON.parse(localStorage.getItem(key) || '[]'));
    done.add(idx);
    localStorage.setItem(key, JSON.stringify([...done]));
    if (typeof awardXP === 'function') awardXP('complete_lesson');
}

window.openTopics = function(courseName) {
    const modal  = document.getElementById('global-modal');
    const mTitle = document.getElementById('modal-title');
    const mBody  = document.getElementById('modal-body');
    if (!modal) return;
    const topics = curriculumData[courseName]?.topics || [];
    const done   = new Set(JSON.parse(localStorage.getItem(`tlp_completed_${courseName}`) || '[]'));
    mTitle.textContent = `${courseName} — Topics`;
    mBody.innerHTML = topics.map((t, i) => `
        <div class="mb-4 p-5 rounded-2xl border ${done.has(i) ? 'border-green-500/30 bg-green-500/5' : 'border-white/10 bg-white/5'} transition-all">
            <div class="flex items-center justify-between mb-2">
                <h4 class="text-white font-black text-sm uppercase">${i+1}. ${t.title}</h4>
                ${done.has(i)
                    ? `<span class="text-green-400 text-[10px] font-black">✓ Done</span>`
                    : `<button onclick="markTopicDone('${courseName}',${i})" class="text-[9px] font-black uppercase px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-all">Mark Done</button>`}
            </div>
            <p class="text-white/50 text-xs leading-relaxed mb-3">${t.theory}</p>
            <div class="bg-black/40 rounded-xl p-4 font-mono text-green-400 text-xs overflow-x-auto"><pre>${t.snippet}</pre></div>
            <p class="text-blue-400/70 text-[10px] mt-3 font-bold">Challenge: ${t.challenge}</p>
        </div>`).join('');
    modal.classList.remove('hidden');
};

window.markTopicDone = function(courseName, idx) {
    markTopicComplete(courseName, idx);
    window.openTopics(courseName);
    renderCourses(document.getElementById('lesson-sub-content'));
};

window.closeModal = function() {
    const modal = document.getElementById('global-modal');
    if (modal) modal.classList.add('hidden');
};

// ── EXAM ──────────────────────────────────────────────────────────────────────
let _examState = { active:false, questions:[], answers:{}, timerRef:null, courseKey:'HTML' };

function renderExam(el) {
    const courses = window.curriculumData ? Object.keys(curriculumData) : ['HTML','CSS','JavaScript'];
    el.innerHTML = `
    <div class="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-700">
        <div class="rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl">
            <div class="bg-white/10 backdrop-blur-md p-6 border-b border-white/10 flex justify-between items-center">
                <div class="flex items-center gap-3">
                    <div class="flex gap-1.5">
                        <div class="w-2.5 h-2.5 rounded-full bg-red-500/50"></div>
                        <div class="w-2.5 h-2.5 rounded-full bg-yellow-500/50"></div>
                        <div class="w-2.5 h-2.5 rounded-full bg-green-500/50"></div>
                    </div>
                    <span class="text-white/40 font-black text-[9px] uppercase tracking-widest ml-4">Assessment Terminal</span>
                </div>
                <div id="examTimer" class="px-4 py-1.5 bg-red-500/10 border border-red-500/20 rounded-full text-red-500 font-mono font-bold text-xs">STATUS: STANDBY</div>
            </div>
            <div id="examContent" class="bg-[#050b1d] p-8 min-h-[350px] font-mono">
                <p class="text-blue-400/80 text-xs">System ready. Configure exam below and click Start.</p>
            </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="relative">
                <select id="examCourse" class="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white font-black text-[10px] uppercase tracking-widest appearance-none outline-none focus:border-blue-500 transition-all cursor-pointer">
                    ${courses.map(c => `<option value="${c}">${c}</option>`).join('')}
                </select>
                <i class="fas fa-chevron-down absolute right-4 top-1/2 -translate-y-1/2 text-white/20 pointer-events-none"></i>
            </div>
            <button onclick="generateExamCode()" class="bg-blue-600 hover:bg-blue-500 text-white font-black uppercase text-[10px] tracking-widest py-4 rounded-xl transition-all shadow-lg shadow-blue-600/20 active:scale-95">
                Generate Token
            </button>
            <div class="flex gap-2 bg-white/5 border border-white/10 rounded-xl p-1">
                <input type="text" id="generatedCodeDisplay" readonly placeholder="----" class="bg-transparent w-24 text-center text-blue-400 font-mono font-bold text-xs outline-none">
                <input type="text" id="examCodeInput" placeholder="ENTER TOKEN" class="flex-grow bg-white/10 rounded-lg px-4 text-white font-black text-[10px] uppercase tracking-widest outline-none border border-transparent focus:border-blue-500/50 transition-all">
                <button onclick="startExam()" class="bg-white text-black px-4 rounded-lg font-black text-[9px] uppercase hover:bg-green-500 hover:text-white transition-all active:scale-95">START</button>
            </div>
        </div>
    </div>`;
}

window.generateExamCode = function() {
    const code = 'EX-' + Math.random().toString(36).substring(2,8).toUpperCase();
    const el = document.getElementById('generatedCodeDisplay');
    if (el) el.value = code;
};

window.startExam = async function() {
    const input     = document.getElementById('examCodeInput')?.value;
    const generated = document.getElementById('generatedCodeDisplay')?.value;
    if (!input || input !== generated) { alert('Invalid token. Generate a token first then enter it.'); return; }
    if (_examState.active) { alert('Exam already in progress.'); return; }

    _examState.courseKey = document.getElementById('examCourse')?.value || 'HTML';
    const content = document.getElementById('examContent');
    content.innerHTML = `
        <div class="text-center py-12">
            <div class="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p class="text-blue-400 font-mono text-sm">Generating 30 AI questions for ${_examState.courseKey}...</p>
        </div>`;
    try {
        const questions = await generateAIQuestions(_examState.courseKey);
        _examState.questions = questions;
        _examState.answers   = {};
        _examState.active    = true;
        renderExamQuestions(content, questions);
        startExamTimer(15 * 60);
        window._examBlurHandler = () => { if (_examState.active) window.submitExam('TAB_VIOLATION'); };
        window.addEventListener('blur', window._examBlurHandler);
    } catch(err) {
        content.innerHTML = `<p class="text-red-400 font-mono text-sm p-4">Failed to generate questions: ${err.message}</p>`;
    }
};

async function generateAIQuestions(course) {
    const topics = (window.curriculumData?.[course]?.topics || []).map(t => t.title).join(', ');
    const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            model: 'claude-sonnet-4-20250514',
            max_tokens: 1000,
            messages: [{ role: 'user', content:
                `Generate exactly 30 multiple-choice questions about ${course} covering: ${topics}.
Return ONLY a JSON array, no markdown, no extra text:
[{"q":"question","options":["A) opt","B) opt","C) opt","D) opt"],"answer":"A"},...]
Vary difficulty. Test real understanding.` }]
        })
    });
    const data  = await response.json();
    const raw   = data.content?.[0]?.text || '[]';
    const clean = raw.replace(/```json|```/g,'').trim();
    return JSON.parse(clean);
}

function renderExamQuestions(container, questions) {
    container.innerHTML = `
        <div class="space-y-6 max-h-[60vh] overflow-y-auto pr-2" id="questionList">
            ${questions.map((q, i) => `
            <div class="p-5 bg-white/5 rounded-2xl border border-white/10">
                <p class="text-white font-bold text-sm mb-4"><span class="text-blue-400 font-black">${i+1}.</span> ${q.q}</p>
                <div class="space-y-2">
                    ${q.options.map(opt => `
                    <label class="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 cursor-pointer transition-all border border-transparent">
                        <input type="radio" name="q${i}" value="${opt[0]}" class="accent-blue-500">
                        <span class="text-white/80 text-xs">${opt}</span>
                    </label>`).join('')}
                </div>
            </div>`).join('')}
        </div>
        <button onclick="submitExam('MANUAL')" class="mt-6 w-full py-4 bg-green-600 hover:bg-green-500 text-white font-black uppercase text-[10px] tracking-widest rounded-xl transition-all">Submit Exam</button>`;
}

function startExamTimer(duration) {
    const display = document.getElementById('examTimer');
    let remaining = duration;
    _examState.timerRef = setInterval(() => {
        const m = Math.floor(remaining / 60);
        const s = remaining % 60;
        if (display) display.textContent = `T-MINUS ${m}:${s < 10 ? '0'+s : s}`;
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

    const timer = document.getElementById('examTimer');
    if (timer) timer.textContent = reason === 'MANUAL' ? 'SUBMITTED' : reason;

    await saveExamResult(score, reason, _examState.courseKey);

    const content = document.getElementById('examContent');
    if (content && (reason === 'MANUAL' || reason === 'TIME_EXPIRY')) {
        content.innerHTML = `
            <div class="text-center py-10 space-y-4">
                <div class="w-24 h-24 rounded-full border-4 ${score >= 60 ? 'border-green-500':'border-red-500'} flex items-center justify-center mx-auto">
                    <span class="text-3xl font-black ${score >= 60 ? 'text-green-400':'text-red-400'}">${score}%</span>
                </div>
                <p class="text-white font-black text-lg uppercase">${score >= 60 ? 'Well done!' : 'Keep studying'}</p>
                <p class="text-white/40 text-xs">Result is <span class="text-yellow-400 font-black">PENDING</span> — final result in 24 hours</p>
                <p class="text-white/30 text-[10px]">${correct}/${total} correct answers</p>
            </div>`;
    } else if (content) {
        content.innerHTML = `
            <div class="p-6 bg-red-500/10 border border-red-500/20 rounded-2xl text-center">
                <p class="text-red-400 font-black uppercase">Exam Terminated: ${reason.replace('_',' ')}</p>
            </div>`;
    }
};

async function saveExamResult(score, reason, course) {
    try {
        const client  = await getLMSClient();
        const user    = await getLMSUser();
        if (!user) return;
        const profile = JSON.parse(localStorage.getItem('tlp_profile') || '{}');
        await client.from('exam_results').insert({
            user_id:    user.id,
            course,
            score,
            reason,
            semester:   profile.semester || 1,
            level:      profile.level    || 100,
            status:     'pending',
            taken_at:   new Date().toISOString(),
            promote_at: new Date(Date.now() + 24*60*60*1000).toISOString()
        });
        if (score >= 60 && typeof awardXP === 'function') awardXP('pass_exam');
        console.log('[Exam] Result saved — score:', score);
    } catch(err) { console.error('[Exam] Save failed:', err.message); }
}

// ── RESULTS ───────────────────────────────────────────────────────────────────
async function renderResults(el) {
    el.innerHTML = `<div class="flex items-center justify-center py-16"><div class="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div></div>`;
    try {
        const client = await getLMSClient();
        const user   = await getLMSUser();
        if (!user) { el.innerHTML = '<p class="text-white/40 text-center py-10">Not logged in.</p>'; return; }

        const { data: results } = await client
            .from('exam_results').select('*').eq('user_id', user.id)
            .order('taken_at', { ascending: false }).limit(20);

        await processPromotions(client, user, results || []);

        if (!results?.length) {
            el.innerHTML = `
                <div class="text-center py-20 space-y-4">
                    <i class="fas fa-clipboard-list text-5xl text-white/10"></i>
                    <p class="text-white/40 font-black uppercase text-sm">No exam results yet</p>
                    <p class="text-white/20 text-xs">Complete an exam to see your results here</p>
                </div>`;
            return;
        }

        el.innerHTML = `
            <div class="space-y-4 animate-in fade-in duration-500">
                <div class="flex justify-between px-2 text-[9px] font-black text-white/20 uppercase tracking-widest mb-2">
                    <span>Exam</span><span>Score</span><span>Status</span><span>Date</span>
                </div>
                ${results.map(r => {
                    const status = resolveStatus(r);
                    const sc = status==='passed'?'green':status==='failed'?'red':'yellow';
                    return `
                    <div class="flex items-center justify-between p-5 bg-white/5 border border-white/10 rounded-2xl hover:border-white/20 transition-all">
                        <div>
                            <p class="text-white font-black text-sm uppercase">${r.course}</p>
                            <p class="text-white/30 text-[10px]">Level ${r.level} · Sem ${String(r.semester).padStart(3,'0')}</p>
                        </div>
                        <span class="${r.score>=60?'text-green-400':'text-red-400'} font-black text-lg">${r.score}%</span>
                        <span class="px-3 py-1 rounded-full text-[9px] font-black uppercase bg-${sc}-500/10 text-${sc}-400 border border-${sc}-500/20">${status}</span>
                        <span class="text-white/20 text-[10px]">${new Date(r.taken_at).toLocaleDateString()}</span>
                    </div>`;
                }).join('')}
            </div>`;
    } catch(err) { el.innerHTML = `<p class="text-red-400 text-center py-10 text-sm">${err.message}</p>`; }
}

function resolveStatus(r) {
    if (r.status === 'passed' || r.status === 'failed') return r.status;
    return Date.now() >= new Date(r.promote_at).getTime()
        ? (r.score >= 60 ? 'passed' : 'failed')
        : 'pending';
}

async function processPromotions(client, user, results) {
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
            console.log('[Exam] Promoted to semester', newSem);
        }
    }
}

// ── ANALYTICS ─────────────────────────────────────────────────────────────────
async function renderAnalytics(el) {
    el.innerHTML = `<div class="flex items-center justify-center py-16"><div class="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div></div>`;
    try {
        const client = await getLMSClient();
        const user   = await getLMSUser();
        if (!user) { el.innerHTML = '<p class="text-white/40 text-center">Not logged in.</p>'; return; }

        const { data: results } = await client
            .from('exam_results').select('*').eq('user_id', user.id).order('taken_at', { ascending: true });

        const total    = results?.length || 0;
        const passed   = results?.filter(r => resolveStatus(r) === 'passed').length  || 0;
        const failed   = results?.filter(r => resolveStatus(r) === 'failed').length  || 0;
        const pending  = results?.filter(r => resolveStatus(r) === 'pending').length || 0;
        const avgScore = total ? Math.round(results.reduce((s,r) => s+r.score, 0) / total) : 0;
        const best     = total ? Math.max(...results.map(r => r.score)) : 0;

        el.innerHTML = `
            <div class="space-y-6 animate-in fade-in duration-500">
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                    ${[['Total Exams',total,'blue'],['Passed',passed,'green'],['Failed',failed,'red'],['Pending',pending,'yellow']].map(([label,val,color]) => `
                    <div class="p-6 bg-white/5 border border-${color}-500/20 rounded-2xl text-center">
                        <p class="text-${color}-400 font-black text-3xl">${val}</p>
                        <p class="text-white/40 text-[10px] uppercase font-bold mt-1">${label}</p>
                    </div>`).join('')}
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="p-6 bg-white/5 border border-white/10 rounded-2xl">
                        <p class="text-white/40 text-[10px] uppercase font-bold mb-2">Average Score</p>
                        <span class="text-4xl font-black ${avgScore>=60?'text-green-400':'text-red-400'}">${avgScore}%</span>
                        <div class="mt-3 bg-white/10 rounded-full h-2">
                            <div class="h-2 rounded-full ${avgScore>=60?'bg-green-500':'bg-red-500'} transition-all" style="width:${avgScore}%"></div>
                        </div>
                    </div>
                    <div class="p-6 bg-white/5 border border-white/10 rounded-2xl">
                        <p class="text-white/40 text-[10px] uppercase font-bold mb-2">Best Score</p>
                        <span class="text-4xl font-black text-blue-400">${best}%</span>
                        <p class="text-white/20 text-xs mt-3">${avgScore>=60?'✅ On track for promotion':'⚠️ Score 60%+ to get promoted'}</p>
                    </div>
                </div>
                ${total===0?`<div class="text-center py-10"><p class="text-white/20 text-xs">No exam data yet. Take an exam to see analytics.</p></div>`:''}
            </div>`;
    } catch(err) { el.innerHTML = `<p class="text-red-400 text-center py-10 text-sm">${err.message}</p>`; }
}

// ── EXPOSE ─────────────────────────────────────────────────────────────────────
window.initLMS            = initLMS;
window.syncLessonsHeader  = syncLessonsHeader;
window.switchLessonSubTab = switchLessonSubTab;
