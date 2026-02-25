/* ── T LEARN PRO: modules/lms.js ── */
/* LMS: initLMS, exam logic, topic viewer, modal, render helpers */

function initLMS() {
    const app = document.getElementById('lesson-app-root');
    if (!app) return;

    app.innerHTML = `
        <div class="space-y-8 animate-in fade-in duration-700 bg-[#050b1d] p-4 sm:p-8 min-h-screen">
            <div class="flex justify-center sticky top-0 z-50 py-4 backdrop-blur-md">
                <div class="bg-white/5 border border-white/10 p-1.5 rounded-2xl flex flex-wrap justify-center gap-1 shadow-2xl">
                    ${['Courses', 'Exam', 'Result', 'Analytics'].map(tab => `
                        <button id="btn-${tab}" onclick="switchLessonSubTab('${tab}')" 
                            class="lesson-nav-btn px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all text-white/50">
                            ${tab}
                        </button>
                    `).join('')}
                </div>
            </div>
            <div id="lesson-sub-content" class="min-h-[400px]"></div>
        </div>

        <div id="global-modal" class="hidden fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl">
            <div class="absolute inset-0" onclick="closeModal()"></div>
            <div id="modal-container" class="bg-[#0a1128] border border-white/10 w-full max-w-lg rounded-[2.5rem] shadow-2xl relative z-10 max-h-[90vh] flex flex-col overflow-hidden transition-all duration-500">
                <div class="p-8 border-b border-white/5 flex justify-between items-center">
                    <h2 id="modal-title" class="text-white font-black uppercase tracking-widest italic text-sm"></h2>
                    <button onclick="closeModal()" class="w-10 h-10 rounded-full bg-white/5 text-gray-400 hover:text-white flex items-center justify-center transition-all">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div id="modal-body" class="p-8 overflow-y-auto no-scrollbar flex-grow"></div>
            </div>
        </div>
    `;
    switchLessonSubTab('Courses');
}

/**
 * 3. TAB NAVIGATION
 */
function switchLessonSubTab(tab) {
    const contentArea = document.getElementById('lesson-sub-content');
    const buttons = document.querySelectorAll('.lesson-nav-btn');

    // Update Button UI
    buttons.forEach(btn => {
        const isActive = btn.id === `btn-${tab}`;
        btn.classList.toggle('bg-blue-600', isActive);
        btn.classList.toggle('text-white', isActive);
        btn.classList.toggle('text-white/50', !isActive);
    });

    // Content Switcher
    switch(tab) {
        case 'Courses':
            contentArea.innerHTML = `
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-in slide-in-from-bottom-8">
                    ${Object.keys(curriculumData).map(name => `
                        <div onclick="openTopics('${name}')" class="group cursor-pointer p-8 bg-white/5 border border-white/10 rounded-[2.5rem] hover:bg-blue-600 transition-all">
                            <i class="fab ${curriculumData[name].icon} text-3xl text-white mb-4 group-hover:scale-110 transition-transform"></i>
                            <h4 class="text-white font-black text-2xl uppercase">${name}</h4>
                            <p class="text-white/40 text-[10px] uppercase font-bold mt-2">Professional Curriculum</p>
                        </div>
                    `).join('')}
                </div>`;
            break;
case 'Exam':
    contentArea.innerHTML = `
        <div class="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div class="relative mb-8 group">
                <i class="fas fa-search absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-blue-500 transition-colors"></i>
                <input type="text" id="examSearch" placeholder="SEARCH TEST REPOSITORY..." 
                    class="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-14 pr-6 text-white text-[10px] font-black tracking-[0.2em] outline-none focus:border-blue-500/50 focus:bg-white/[0.08] transition-all">
            </div>

            <div class="rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl shadow-blue-900/20">
                <div class="bg-white/10 backdrop-blur-md p-6 border-b border-white/10 flex justify-between items-center">
                    <div class="flex items-center gap-3">
                        <div class="flex gap-1.5">
                            <div class="w-2.5 h-2.5 rounded-full bg-red-500/50"></div>
                            <div class="w-2.5 h-2.5 rounded-full bg-yellow-500/50"></div>
                            <div class="w-2.5 h-2.5 rounded-full bg-green-500/50"></div>
                        </div>
                        <span class="text-white/40 font-black text-[9px] uppercase tracking-widest ml-4">Terminal Alpha-01</span>
                    </div>
                    <div id="examTimer" class="px-4 py-1.5 bg-red-500/10 border border-red-500/20 rounded-full text-red-500 font-mono font-bold text-xs tracking-tighter">
                        STATUS: STANDBY
                    </div>
                </div>

                <div class="bg-[#050b1d] p-8 min-h-[350px] font-mono relative">
                    <div id="terminalContent" class="text-blue-400/80 text-xs leading-loose">
                        <p class="flex gap-3"><span class="text-white/20">01</span> <span class="text-green-500">></span> System initialized...</p>
                        <p class="flex gap-3"><span class="text-white/20">02</span> <span class="text-green-500">></span> Waiting for authentication code...</p>
                    </div>
                    <div class="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-white/[0.02] to-transparent bg-[length:100%_4px]"></div>
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                <div class="relative">
                    <select id="examLanguage" class="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white font-black text-[10px] uppercase tracking-widest appearance-none outline-none focus:border-blue-500 transition-all cursor-pointer">
                        <option value="html">HTML5 Master</option>
                        <option value="css">CSS3 Architect</option>
                        <option value="javascript">JS Engineer</option>
                        <option value="python">Python Dev</option>
                    </select>
                    <i class="fas fa-chevron-down absolute right-4 top-1/2 -translate-y-1/2 text-white/20 pointer-events-none"></i>
                </div>

                <button onclick="generateExamCode()" class="bg-blue-600 hover:bg-blue-500 text-white font-black uppercase text-[10px] tracking-widest py-4 rounded-xl transition-all shadow-lg shadow-blue-600/20 active:scale-95">
                    Generate Token
                </button>

                <div class="flex gap-2 bg-white/5 border border-white/10 rounded-xl p-1">
                     <input type="text" id="generatedCodeDisplay" readonly placeholder="----"
                        class="bg-transparent w-24 text-center text-blue-400 font-mono font-bold text-xs outline-none">
                     <input type="text" id="examCodeInput" placeholder="ENTER TOKEN" 
                        class="flex-grow bg-white/10 rounded-lg px-4 text-white font-black text-[10px] uppercase tracking-widest outline-none border border-transparent focus:border-blue-500/50 transition-all">
                     <button onclick="startExam()" class="bg-white text-black px-4 rounded-lg font-black text-[9px] uppercase hover:bg-green-500 hover:text-white transition-all active:scale-95">
                        START
                     </button>
                </div>
            </div>
        </div>
    `;

    // Initialize the Functional Logic
    setupExamLogic();
    break;

// --- Supporting Logic Functions ---

function setupExamLogic() {
    let timerInterval;
    let isExamActive = false;

    // 1. Generate Token
    window.generateExamCode = function() {
        const code = "EX-" + Math.random().toString(36).substring(2, 8).toUpperCase();
        document.getElementById('generatedCodeDisplay').value = code;
    };

    // 2. Start Assessment
    window.startExam = function() {
        const input = document.getElementById('examCodeInput').value;
        const generated = document.getElementById('generatedCodeDisplay').value;

        if (input === "" || input !== generated) {
            showCustomModal("AUTH_FAILURE", "Invalid session token. Please ensure the token matches the generated value.");
            return;
        }

        isExamActive = true;
        const terminal = document.getElementById('terminalContent');
        terminal.innerHTML += `
            <p class="flex gap-3 text-white"><span class="text-white/20">03</span> <span class="text-blue-500">></span> Token Verified.</p>
            <p class="flex gap-3 text-white"><span class="text-white/20">04</span> <span class="text-blue-500">></span> Loading Core Assessment [30 Nodes]...</p>
            <p class="flex gap-3 text-yellow-500 font-bold"><span class="text-white/20">05</span> > PROCTORING ACTIVE: DO NOT SWITCH TABS OR MINIMIZE WINDOW.</p>
        `;
        
        startTimer(15 * 60); // 15 Minute countdown
    };

    // 3. Timer Logic
    function startTimer(duration) {
        let timer = duration, minutes, seconds;
        const display = document.getElementById('examTimer');
        
        timerInterval = setInterval(() => {
            minutes = parseInt(timer / 60, 10);
            seconds = parseInt(timer % 60, 10);
            
            display.textContent = `T-MINUS ${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
            
            if (--timer < 0) {
                clearInterval(timerInterval);
                autoSubmitExam("TIME_EXPIRY");
            }
        }, 1000);
    }

    // 4. Anti-Cheat (Tab Switching Detection)
    window.onblur = function() {
        if (isExamActive) {
            autoSubmitExam("TAB_VIOLATION");
        }
    };

    // 5. Termination / Submission
    function autoSubmitExam(reason) {
        isExamActive = false;
        clearInterval(timerInterval);
        
        document.getElementById('terminalContent').innerHTML = `
            <div class="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg animate-pulse">
                <p class="text-red-500 font-black uppercase text-[10px]">Critical Error: Terminal Locked</p>
                <p class="text-white/60 text-[9px] mt-1">Reason: ${reason}</p>
                <p class="text-white/40 text-[8px] mt-2 italic">> Data packets sent to administration...</p>
            </div>
        `;
        
        showCustomModal("EXAM_TERMINATED", `Your session has been forcibly closed. <br><br> <strong>Reason:</strong> ${reason.replace('_', ' ')}`);
    }
}

// 6. Centralized Modal Helper (Displays in page center)
function showCustomModal(title, msg) {
    const modal = document.getElementById('global-modal');
    const mTitle = document.getElementById('modal-title');
    const mBody = document.getElementById('modal-body');
    
    mTitle.innerText = title;
    mBody.innerHTML = `
        <div class="text-center py-6 px-4">
            <div class="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <i class="fas fa-shield-alt text-red-500 text-2xl"></i>
            </div>
            <p class="text-white text-sm font-medium leading-relaxed mb-8">${msg}</p>
            <button onclick="closeModal()" class="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-black text-[10px] uppercase tracking-widest transition-all">
                Acknowledge & Exit
            </button>
        </div>
    `;
    modal.classList.remove('hidden');
    modal.classList.add('flex'); // Ensures centering if using Flexbox
}
     /**
 * SWITCH CASE: Result
 * Place this inside your main tab-switching function
 */
case 'Result':
    contentArea.innerHTML = `
        <div class="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div class="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                <div>
                    <h2 class="text-white font-black text-2xl tracking-tighter uppercase">Certification Vault</h2>
                    <p class="text-white/40 text-[10px] tracking-[0.2em] uppercase mt-1">Archive of all processed assessments</p>
                </div>
                
                <div class="flex bg-white/5 border border-white/10 p-1 rounded-2xl backdrop-blur-md">
                    <button onclick="filterResults('pending', this)" 
                        class="result-tab px-6 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all text-white/40 hover:text-white">
                        Pending
                    </button>
                    <button onclick="filterResults('success', this)" 
                        class="result-tab px-6 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all text-white/40 hover:text-white">
                        Success
                    </button>
                    <button onclick="filterResults('failed', this)" 
                        class="result-tab px-6 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all text-white/40 hover:text-white">
                        Failed
                    </button>
                </div>
            </div>

            <div id="resultDisplayArea" class="min-h-[400px] transition-all duration-500">
                </div>
        </div>
    `;

    // Initialize: Wait for DOM to render then click "Success" by default
    setTimeout(() => {
        const tabs = document.querySelectorAll('.result-tab');
        if (tabs[1]) filterResults('success', tabs[1]);
    }, 0);
    break;


/**
 * SCRIPT SECTION
 * Add these functions to your global script file
 */

window.filterResults = function(status, element) {
    const displayArea = document.getElementById('resultDisplayArea');
    if (!displayArea) return;
    
    // 1. Update Tab Button Styles (Active State)
    document.querySelectorAll('.result-tab').forEach(tab => {
        tab.classList.remove('bg-blue-600', 'text-white', 'shadow-lg', 'shadow-blue-600/20');
        tab.classList.add('text-white/40');
    });
    element.classList.remove('text-white/40');
    element.classList.add('bg-blue-600', 'text-white', 'shadow-lg', 'shadow-blue-600/20');

    // 2. Data Definitions for empty states
    const states = {
        pending: {
            icon: 'fa-hourglass-half',
            color: 'text-yellow-500',
            title: 'Processing Data...',
            desc: 'No assessments are currently under review. Completed exams appear here during manual verification.'
        },
        success: {
            icon: 'fa-award',
            color: 'text-green-500',
            title: 'No Certifications Yet',
            desc: 'Your success is waiting. Pass an exam with 70% or higher to unlock your official digital certificate.'
        },
        failed: {
            icon: 'fa-shield-virus',
            color: 'text-red-500',
            title: 'Clean Record',
            desc: 'No failed attempts detected. All assessment data is within acceptable operational parameters.'
        }
    };

    const state = states[status];

    // 3. Inject View with Animation
    displayArea.innerHTML = `
        <div class="flex flex-col items-center justify-center bg-white/5 border border-white/10 rounded-[2.5rem] p-12 text-center animate-in fade-in zoom-in-95 duration-500">
            <div class="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6 border border-white/10 shadow-inner">
                <i class="fas ${state.icon} ${state.color} text-3xl"></i>
            </div>
            <h3 class="text-white font-black text-lg uppercase tracking-widest">${state.title}</h3>
            <p class="text-white/40 text-xs max-w-sm mx-auto mt-4 leading-relaxed font-medium">
                ${state.desc}
            </p>
            <button onclick="switchTab('Exam')" class="mt-10 px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white text-[9px] font-black uppercase tracking-[0.3em] transition-all">
                Access Exam Terminal
            </button>
        </div>
    `;
};

/**
 * MODAL SYSTEM (Centered as requested)
 */
window.showAlert = function(title, message) {
    const modalHtml = `
        <div id="modal-container" class="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
            <div class="bg-[#0a0f1d] border border-white/10 w-full max-w-md rounded-[2rem] p-8 shadow-2xl animate-in zoom-in-95 duration-300">
                <div class="text-center">
                    <div class="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-red-500/20">
                        <i class="fas fa-exclamation-triangle text-red-500 text-xl"></i>
                    </div>
                    <h2 class="text-white font-black text-xl uppercase tracking-tighter mb-2">${title}</h2>
                    <p class="text-white/40 text-xs font-medium leading-relaxed mb-8">${message}</p>
                    <button onclick="document.getElementById('modal-container').remove()" 
                        class="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-black text-[10px] uppercase tracking-[0.2em] rounded-xl transition-all shadow-lg shadow-blue-600/20">
                        Acknowledge
                    </button>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHtml);
};
            
 case 'Analytics':
    contentArea.innerHTML = `
        <style>
            @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
            @keyframes reverse-slow { from { transform: rotate(360deg); } to { transform: rotate(0deg); } }
            .animate-spin-slow { animation: spin-slow 12s linear infinite; }
            .animate-reverse-slow { animation: reverse-slow 20s linear infinite; }
        </style>

        <div class="max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
                <div>
                    <div class="flex items-center gap-3 mb-2">
                        <span class="px-3 py-1 bg-blue-600/20 border border-blue-500/30 rounded-full text-blue-400 text-[8px] font-black uppercase tracking-[0.2em]">Live Telemetry</span>
                    </div>
                    <h2 class="text-white font-black text-3xl tracking-tighter uppercase">Performance Metrics</h2>
                    <p class="text-white/40 text-[10px] tracking-[0.2em] uppercase mt-1">Real-time synchronization with neural training modules</p>
                </div>
                <div class="flex gap-4">
                    <button class="px-5 py-3 bg-white/5 border border-white/10 rounded-xl text-white/60 text-[9px] font-black uppercase tracking-widest hover:bg-white/10 transition-all">
                        <i class="fas fa-download mr-2"></i> Export Data
                    </button>
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                ${renderStatCard('Course Progress', '0%', 'text-blue-500', 'fa-battery-three-quarters')}
                ${renderStatCard('Avg. Score', '00.0', 'text-green-500', 'fa-bullseye')}
                ${renderStatCard('Time Invested', '000h', 'text-purple-500', 'fa-stopwatch')}
                ${renderStatCard('Rank', 'Global #0', 'text-yellow-500', 'fa-trophy')}
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div class="lg:col-span-2 bg-white/5 border border-white/10 rounded-[2.5rem] p-8 backdrop-blur-md relative overflow-hidden">
                    <div class="flex justify-between items-center mb-10">
                        <h3 class="text-white font-black text-xs uppercase tracking-[0.2em]">Cognitive Skill Distribution</h3>
                        <div class="flex gap-2 text-blue-500">
                            <span class="w-2 h-2 rounded-full bg-current animate-pulse"></span>
                            <span class="text-[8px] font-bold uppercase tracking-widest">Active Scan</span>
                        </div>
                    </div>
                    
                    <div class="h-[300px] flex items-center justify-center relative">
                        <div class="absolute inset-0 flex items-center justify-center opacity-20">
                            <div class="w-64 h-64 border-[1px] border-dashed border-blue-500 rounded-full animate-spin-slow"></div>
                            <div class="absolute w-48 h-48 border-[1px] border-dashed border-blue-400/50 rounded-full animate-reverse-slow"></div>
                            <div class="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
                        </div>
                        
                        <div class="text-center z-10">
                            <i class="fas fa-microchip text-blue-500/40 text-6xl mb-6"></i>
                            <div class="grid grid-cols-2 gap-x-8 gap-y-2">
                                <span class="text-white/40 text-[9px] font-black uppercase tracking-widest text-right">Logic: <span class="text-white">0%</span></span>
                                <span class="text-white/40 text-[9px] font-black uppercase tracking-widest text-left">Syntax: <span class="text-white">0%</span></span>
                                <span class="text-white/40 text-[9px] font-black uppercase tracking-widest text-right">Speed: <span class="text-white">0%</span></span>
                                <span class="text-white/40 text-[9px] font-black uppercase tracking-widest text-left">Memory: <span class="text-white">91%</span></span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 backdrop-blur-md">
                    <h3 class="text-white font-black text-xs uppercase tracking-[0.2em] mb-8 text-center">Neural Activity Log</h3>
                    <div class="space-y-6">
                        ${renderActivityRow('Module 04 Complete', '2 mins ago', 'bg-green-500')}
                        ${renderActivityRow('Exam Token Generated', '4 hours ago', 'bg-blue-500')}
                        ${renderActivityRow('System Login: NY-Node', '12 hours ago', 'bg-white/40')}
                        ${renderActivityRow('Assessment Failed: JS-02', '1 day ago', 'bg-red-500')}
                    </div>
                    <button class="w-full mt-10 py-4 bg-white/5 border border-white/10 rounded-xl text-white/40 text-[9px] font-black uppercase tracking-widest hover:text-white transition-all">
                        View Full History
                    </button>
                </div>
            </div>
        </div>
    `;
    break;

/**
 * HELPER FUNCTIONS
 * Ensure these are defined in your global script scope
 */
function renderStatCard(label, value, colorClass, icon) {
    return `
        <div class="bg-white/5 border border-white/10 rounded-3xl p-6 hover:bg-white/[0.08] transition-all group">
            <div class="flex justify-between items-start mb-4">
                <i class="fas ${icon} ${colorClass} opacity-50 group-hover:opacity-100 transition-opacity"></i>
                <div class="text-[8px] text-green-500 font-bold">+2.4%</div>
            </div>
            <p class="text-white/40 text-[9px] font-black uppercase tracking-widest mb-1">${label}</p>
            <h4 class="text-white text-2xl font-black tracking-tighter">${value}</h4>
        </div>
    `;
}

function renderActivityRow(title, time, dotColor) {
    return `
        <div class="flex items-center gap-4 group">
            <div class="w-1.5 h-1.5 rounded-full ${dotColor} shadow-[0_0_8px_currentColor]"></div>
            <div class="flex-1 border-b border-white/5 pb-2 group-last:border-0">
                <p class="text-white/80 text-[10px] font-bold uppercase tracking-tight">${title}</p>
                <p class="text-white/20 text-[8px] uppercase mt-0.5">${time}</p>
            </div>
        </div>
    `;
}
    }
} 

function renderPlaceholder(icon, title, subtitle) {
    return `
        <div class="py-32 flex flex-col items-center justify-center animate-in fade-in zoom-in duration-500">
            <div class="w-20 h-20 mb-6 bg-white/5 rounded-full flex items-center justify-center border border-white/10">
                <i class="fas ${icon} text-blue-500/40 text-2xl"></i>
            </div>
            <h3 class="text-white/40 font-black uppercase tracking-[0.4em] text-lg">${title}</h3>
            <p class="text-white/10 text-[9px] uppercase font-bold mt-2 tracking-widest text-center">
                ${subtitle}
            </p>
        </div>`;
}


/**
 * 4. MODAL INTERACTIONS (Topics -> Detail -> Workspace)
 */
function openTopics(courseName) {
    const title = document.getElementById('modal-title');
    const body = document.getElementById('modal-body');
    const container = document.getElementById('modal-container');
    
    container.classList.replace('max-w-6xl', 'max-w-lg'); // Reset size if coming from workspace
    title.innerText = `${courseName} Modules`;
    
    const topics = curriculumData[courseName].topics;
    body.innerHTML = topics.map((t, i) => `
        <div onclick="openTopicDetail('${courseName}', ${i})" class="p-5 mb-3 bg-white/5 border border-white/5 rounded-2xl flex justify-between items-center cursor-pointer hover:bg-blue-600 transition-all group">
            <span class="text-white font-black uppercase text-xs tracking-tight">${t.title}</span>
            <span class="text-[9px] text-white/30 uppercase font-black group-hover:text-white">Level ${i+1}</span>
        </div>
    `).join('');
    
    document.getElementById('global-modal').classList.remove('hidden');
}

function openTopicDetail(course, index) {
    const topic = curriculumData[course].topics[index];
    const body = document.getElementById('modal-body');
    
    body.innerHTML = `
        <div class="text-center py-4 animate-in fade-in slide-in-from-bottom-4">
            <div class="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-blue-500/20">
                <i class="fas fa-book-open text-blue-500 text-xl"></i>
            </div>
            <h3 class="text-white text-3xl font-black uppercase italic mb-2">${topic.title}</h3>
            <p class="text-gray-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-8">
                Unlock professional workflows for ${course}.
            </p>
            <button onclick="launchWorkspace('${course}', ${index})" class="w-full py-5 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-blue-500 shadow-lg shadow-blue-600/20 transition-all">
                Start Lesson
            </button>
        </div>
    `;
}

function launchWorkspace(course, index) {
    const container = document.getElementById('modal-container');
    const body = document.getElementById('modal-body');
    const topic = curriculumData[course].topics[index];

    // Expand modal for IDE view
    container.classList.replace('max-w-lg', 'max-w-6xl');
    
    body.innerHTML = `
        <div class="grid lg:grid-cols-12 gap-8 h-[60vh] animate-in zoom-in-95 duration-300">
            <div class="lg:col-span-5 overflow-y-auto no-scrollbar bg-white/5 p-8 rounded-[2rem] border border-white/5">
                <div class="flex items-center gap-3 mb-6">
                    <span class="px-3 py-1 bg-blue-600 text-[8px] font-black text-white rounded-full uppercase">Theory</span>
                </div>
                <h3 class="text-white font-black text-xl uppercase mb-4">${topic.title}</h3>
                <p class="text-gray-400 text-sm leading-relaxed mb-8">${topic.theory}</p>
                <div class="p-6 bg-blue-500/5 border border-blue-500/20 rounded-2xl">
                    <h4 class="text-blue-400 font-black text-xs uppercase mb-2">Challenge</h4>
                    <p class="text-white text-sm italic">${topic.challenge}</p>
                </div>
            </div>
            <div class="lg:col-span-7 flex flex-col bg-black/40 rounded-[2rem] border border-white/5 overflow-hidden">
                <div class="px-6 py-4 bg-white/5 flex justify-between items-center">
                    <span class="text-[10px] font-black text-white/30 tracking-widest uppercase">Console Editor</span>
                    <span class="text-[10px] text-green-500 font-mono italic">main.${course.toLowerCase()}</span>
                </div>
                <textarea id="code-editor" class="flex-grow bg-transparent p-8 font-mono text-sm text-green-400 outline-none resize-none" spellcheck="false">${topic.snippet}</textarea>
                <div class="p-6 bg-white/5 border-t border-white/5">
                    <button onclick="triggerSuccess()" class="w-full py-4 bg-white text-black rounded-xl font-black uppercase text-[10px] hover:bg-green-500 hover:text-white transition-all shadow-xl">
                        Submit Solution
                    </button>
                </div>
            </div>
        </div>
    `;
}

/**
 * 5. FEEDBACK & CLOSURE
 */
function triggerSuccess() {
    const body = document.getElementById('modal-body');
    const container = document.getElementById('modal-container');
    
    // Bring back to smaller size for the alert
    container.classList.replace('max-w-6xl', 'max-w-lg');
    
    body.innerHTML = `
        <div class="text-center py-12 animate-in zoom-in duration-500">
            <div class="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <i class="fas fa-check-circle text-green-500 text-4xl"></i>
            </div>
            <h2 class="text-white text-4xl font-black uppercase mb-2 italic">Success!</h2>
            <p class="text-gray-500 text-[10px] font-black uppercase tracking-[0.3em] mb-12">Solution Verified • XP Awarded</p>
            <button onclick="closeModal()" class="px-12 py-5 bg-white text-black rounded-2xl font-black uppercase text-[10px] hover:invert transition-all">
                Back to Dashboard
            </button>
        </div>
    `;
}

function closeModal() {
    const modal = document.getElementById('global-modal');
    modal.classList.add('hidden');
    // Reset container size for next use
    setTimeout(() => {
        document.getElementById('modal-container').classList.replace('max-w-6xl', 'max-w-lg');
    }, 300);
}

// Start the App
initLMS();


////// FOR THE NOTIFICATIONS
window.archiveNotif = function(id) {
    let logs = JSON.parse(localStorage.getItem('app_notifications')) || [];
    const idx = logs.findIndex(l => l.id === id);
    if (idx !== -1) {
        logs[idx].archived = true;
        localStorage.setItem('app_notifications', JSON.stringify(logs));
        
        // Visual feedback first
        const el = document.getElementById(`notif-${id}`);
        if(el) el.classList.add('opacity-0', 'translate-x-10');
        
        // Re-render after animation to check for empty state
        setTimeout(() => {
            renderTab('Notifications');
        }, 300);
    }
};

window.deleteNotif = function(id) {
    let logs = JSON.parse(localStorage.getItem('app_notifications')) || [];
    logs = logs.filter(l => l.id !== id);
    localStorage.setItem('app_notifications', JSON.stringify(logs));
    
    // Visual feedback first
    const el = document.getElementById(`notif-${id}`);
    if(el) el.classList.add('scale-95', 'opacity-0');
    
    // Re-render after animation
    setTimeout(() => {
        renderTab('Notifications');
    }, 300);
};




//////  FOR THE PROJECTS   
// ================================================
// Project Manager - FINAL PERFECT VERSION
// Projects appear immediately in main grid + Live Stream card
// ================================================

let projects = [];
let activeType = 'Personal';
const notifySound = new Audio('https://assets.mixkit.co/active_storage/sfx/2354/2354-preview.mp3');

// ─── 1. Persistence ─────────────────────────────────────────

