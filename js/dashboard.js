const ActivityEngine = {
    track() {
        const today = new Date().toISOString().split('T')[0];
        setInterval(() => {
            let log = JSON.parse(localStorage.getItem('user_node_activity') || '{}');
            log[today] = (log[today] || 0) + 1; // Tracks seconds
            localStorage.setItem('user_node_activity', JSON.stringify(log));
        }, 1000);
    },

    // Decides box thickness based on time spent
    getBoxClass(date) {
        const log = JSON.parse(localStorage.getItem('user_node_activity') || '{}');
        const seconds = log[date] || 0;
        if (seconds === 0) return 'bg-white/[0.03]'; // No activity
        if (seconds < 60) return 'bg-green-900';    // < 1 min
        if (seconds < 600) return 'bg-green-700';   // < 10 mins
        if (seconds < 1800) return 'bg-green-500';  // < 30 mins
        return 'bg-green-400';                      // Long stay
    }
};
ActivityEngine.track();
const views = {
'Overview': `
<div class="space-y-10 animate-in fade-in duration-700">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div class="group relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-[#0a0f25] to-[#050b1d] p-7 transition-all duration-500 hover:border-blue-500/50 hover:shadow-[0_0_30px_-10px_rgba(59,130,246,0.3)]">
            <div class="relative z-10 flex items-center gap-5">
                <div class="flex h-14 w-14 items-center justify-center rounded-2xl border border-blue-500/30 bg-blue-500/10 shadow-[inset_0_0_15px_rgba(59,130,246,0.2)] transition-transform duration-500 group-hover:scale-110">
                    <i class="fas fa-code-branch text-2xl text-blue-400"></i>
                </div>
                <div>
                    <p class="text-[11px] font-black uppercase tracking-[0.2em] text-blue-400/60"> Projects</p>
                    <h3 id="projectCount" class="mt-1 text-4xl font-black tracking-tighter text-white">0</h3>
                </div>
            </div>
            <div class="absolute -right-6 -bottom-6 opacity-[0.03] transition-all duration-700 group-hover:scale-110 group-hover:opacity-[0.08] group-hover:text-blue-500">
                <i class="fas fa-project-diagram text-[10rem] rotate-12"></i>
            </div>
        </div>

        <div class="group relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-[#0a0f25] to-[#050b1d] p-7 transition-all duration-500 hover:border-purple-500/50 hover:shadow-[0_0_30px_-10px_rgba(168,85,247,0.3)]">
            <div class="relative z-10 flex items-center gap-5">
                <div class="flex h-14 w-14 items-center justify-center rounded-2xl border border-purple-500/30 bg-purple-500/10 shadow-[inset_0_0_15px_rgba(168,85,247,0.2)] transition-transform duration-500 group-hover:scale-110">
                    <i class="fas fa-calendar-alt text-2xl text-purple-400"></i>
                </div>
                <div>
                    <p class="text-[11px] font-black uppercase tracking-[0.2em] text-purple-400/60">Semester</p>
                    <h3 id="semesterVal" class="mt-1 text-4xl font-black tracking-tighter text-white">000</h3>
                </div>
            </div>
            <div class="absolute -right-6 -bottom-6 opacity-[0.03] transition-all duration-700 group-hover:scale-110 group-hover:opacity-[0.08] group-hover:text-purple-500">
                <i class="fas fa-graduation-cap text-[10rem] rotate-12"></i>
            </div>
        </div>

        <div class="group relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-[#0a0f25] to-[#050b1d] p-7 transition-all duration-500 hover:border-cyan-500/50 hover:shadow-[0_0_30px_-10px_rgba(6,182,212,0.3)]">
            <div class="relative z-10 flex items-center gap-5">
                <div class="flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-500/30 bg-cyan-500/10 shadow-[inset_0_0_15px_rgba(6,182,212,0.2)] transition-transform duration-500 group-hover:scale-110">
                    <i class="fas fa-layer-group text-2xl text-cyan-400"></i>
                </div>
                <div>
                    <p class="text-[11px] font-black uppercase tracking-[0.2em] text-cyan-400/60">Level</p>
                    <h3 id="dash-level-val" class="mt-1 text-4xl font-black tracking-tighter text-white">000</h3>
                </div>
            </div>
            <div class="absolute -right-6 -bottom-6 opacity-[0.03] transition-all duration-700 group-hover:scale-110 group-hover:opacity-[0.08] group-hover:text-cyan-500">
                <i class="fas fa-chart-line text-[10rem] rotate-12"></i>
            </div>
        </div>
    </div>

    <div class="group relative overflow-hidden rounded-[3rem] border border-white/5 bg-[#050b1d] p-8 transition-all duration-700 hover:border-emerald-500/20">
        <div class="flex justify-between items-center mb-10">
            <div>
                <h3 class="text-2xl font-black text-white italic uppercase tracking-tighter">System Core <span class="text-emerald-500">.</span></h3>
                <div class="flex items-center gap-2 mt-2">
                    <span class="relative flex h-2 w-2">
                        <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <p class="text-[10px] text-gray-400 font-bold uppercase tracking-[0.3em]">Live Order Stream</p>
                </div>
            </div>
            
            <div class="flex gap-1.5 items-end h-8">
                <div class="w-1 bg-emerald-500/40 h-3 rounded-full animate-[bounce_1s_infinite]"></div>
                <div class="w-1 bg-emerald-500 h-6 rounded-full animate-[bounce_1.2s_infinite]"></div>
                <div class="w-1 bg-emerald-500/60 h-4 rounded-full animate-[bounce_0.8s_infinite]"></div>
            </div>
        </div>
        
        <div class="relative w-full h-[320px] rounded-3xl bg-black/40 border border-white/5 backdrop-blur-sm overflow-hidden">
            <div class="absolute inset-0 flex flex-col items-center justify-center z-10">
                <div class="w-20 h-20 mb-4 rounded-full bg-emerald-500/5 flex items-center justify-center border border-emerald-500/10 group-hover:border-emerald-500/30 transition-all duration-1000">
                    <i class="fas fa-satellite-dish text-emerald-500/20 group-hover:text-emerald-500 group-hover:animate-pulse"></i>
                </div>
                <span class="text-[10px] font-black text-emerald-500/40 uppercase tracking-[0.4em]">Awaiting Uplink...</span>
            </div>
            
            <canvas id="orderStatusChart" class="relative z-0"></canvas>
        </div>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div class="group relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#050b1d] p-7 transition-all duration-500 hover:border-indigo-500/40">
            <div class="relative z-10 flex items-center gap-5">
                <div class="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                    <i class="fas fa-handshake text-2xl"></i>
                </div>
                <div>
                    <p class="text-[11px] font-black uppercase tracking-widest text-gray-500">Collab</p>
                    <h3 id="collabCount" class="mt-1 text-3xl font-black text-white">0</h3>
                </div>
            </div>
            <i class="fas fa-users absolute -right-4 -bottom-4 text-8xl text-white/[0.02] transition-all group-hover:text-indigo-500/[0.05] rotate-12"></i>
        </div>

        <div class="group relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#050b1d] p-7 transition-all duration-500 hover:border-amber-500/40">
            <div class="relative z-10 flex items-center gap-5">
                <div class="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
                    <i class="fas fa-medal text-2xl"></i>
                </div>
                <div>
                    <p class="text-[11px] font-black uppercase tracking-widest text-gray-500">Rank</p>
                    <h3 class="mt-1 text-3xl font-black text-white italic"><span id="rankVal">#0</span></h3>
                </div>
            </div>
            <i class="fas fa-crown absolute -right-4 -bottom-4 text-8xl text-white/[0.02] transition-all group-hover:text-amber-500/[0.05] rotate-12"></i>
        </div>

        <div class="group relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#050b1d] p-7 transition-all duration-500 hover:border-yellow-500/40">
            <div class="relative z-10 flex items-center gap-5">
                <div class="flex h-14 w-14 items-center justify-center rounded-2xl bg-yellow-500/10 border border-yellow-500/20 text-yellow-400">
                    <i class="fas fa-star text-2xl"></i>
                </div>
                <div>
                    <p class="text-[11px] font-black uppercase tracking-widest text-gray-500">XT Gifts</p>
                    <h3 class="mt-1 text-3xl font-black text-white">
                        <span id="dash-xp-val">0</span> 
                        <span class="text-xs text-yellow-500 font-black ml-1">XP</span>
                    </h3>
                </div>
            </div>
            <i class="fas fa-trophy absolute -right-4 -bottom-4 text-8xl text-white/[0.02] transition-all group-hover:text-yellow-500/[0.05] rotate-12"></i>
        </div>
    </div>

    <div class="group relative overflow-hidden rounded-[3rem] border border-white/5 bg-[#050b1d] p-8 transition-all duration-700 hover:border-blue-500/20">
        <h3 class="text-lg font-black text-white italic uppercase tracking-[0.3em] mb-6">Activity Nebula <span class="text-blue-500 text-2xl">.</span></h3>
        <div class="relative w-full h-[280px] bg-black/40 rounded-[2rem] border border-white/5 shadow-inner">
            <canvas id="nebula" class="w-full h-full"></canvas>
        </div>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div class="group relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#050b1d] p-7 transition-all duration-500 hover:border-orange-600/50">
            <div class="relative z-10 flex items-center gap-5">
                <div class="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-600/10 border border-orange-500/20 text-orange-500">
                    <i class="fas fa-fire text-2xl"></i>
                </div>
                <div>
                    <p class="text-[11px] font-black uppercase tracking-widest text-gray-500">Streaks</p>
                    <h3 id="streakCount" class="mt-1 text-3xl font-black text-white">0</h3>
                </div>
            </div>
            <i class="fas fa-bolt absolute -right-4 -bottom-4 text-8xl text-white/[0.02] transition-all group-hover:text-orange-500/[0.05] rotate-12"></i>
        </div>

        <div class="group relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#050b1d] p-7 transition-all duration-500 hover:border-cyan-400/50">
            <div class="relative z-10 flex items-center gap-5">
                <div class="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-600/10 border border-cyan-500/20 text-cyan-400">
                    <i class="fas fa-rocket text-2xl"></i>
                </div>
                <div>
                    <p class="text-[11px] font-black uppercase tracking-widest text-gray-500">Deployed</p>
                    <h3 id="deployCount" class="mt-1 text-3xl font-black text-white">0</h3>
                </div>
            </div>
            <i class="fas fa-cloud-upload-alt absolute -right-4 -bottom-4 text-8xl text-white/[0.02] transition-all group-hover:text-cyan-500/[0.05] rotate-12"></i>
        </div>

        <div class="group relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#050b1d] p-7 transition-all duration-500 hover:border-emerald-400/50">
            <div class="relative z-10 flex items-center gap-5">
                <div class="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-600/10 border border-emerald-500/20 text-emerald-400">
                    <i class="fas fa-briefcase text-2xl"></i>
                </div>
                <div>
                    <p class="text-[11px] font-black uppercase tracking-widest text-gray-500"> Gigs</p>
                    <h3 id="gigCount" class="mt-1 text-3xl font-black text-white">0</h3>
                </div>
            </div>
            <i class="fas fa-money-bill-wave absolute -right-4 -bottom-4 text-8xl text-white/[0.02] transition-all group-hover:text-emerald-500/[0.05] rotate-12"></i>
        </div>
    </div>
</div>
`,


    
    
    
'Lessons': `
<div class="space-y-8 animate-in fade-in duration-700 bg-[#050b1d] p-4 sm:p-8 min-h-screen text-sans">
    
    <div class="flex justify-center sticky top-0 z-50 py-4 backdrop-blur-md">
        <div class="bg-white/5 border border-white/10 p-1.5 rounded-2xl flex gap-1 overflow-x-auto no-scrollbar shadow-2xl backdrop-blur-xl">
            ${['Courses', 'Exam', 'Result', 'Analytics'].map(tab => `
                <button id="btn-${tab}" onclick="switchLessonSubTab('${tab}')" 
                    class="lesson-nav-btn px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300
                    ${tab === 'Courses' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/40' : 'text-gray-400 hover:text-white hover:bg-white/5'}">
                    ${tab}
                </button>
            `).join('')}
        </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="bg-gradient-to-br from-[#0a1128] to-[#050b1d] border border-white/5 p-8 rounded-[2.5rem] relative overflow-hidden group hover:border-green-500/50 transition-all duration-500 shadow-2xl">
            <div class="flex items-center gap-6 relative z-10">
                <div class="w-16 h-16 bg-green-500/10 rounded-3xl flex items-center justify-center border border-green-500/20 group-hover:scale-110 transition-transform">
                    <i class="fas fa-layer-group text-2xl text-green-500"></i>
                </div>
                <div>
                    <p class="text-[10px] font-black text-green-500/60 uppercase tracking-[0.2em]">Current Level</p>
                    <h3 class="text-4xl font-black text-white mt-1 tabular-nums">000</h3>
                </div>
            </div>
            <i class="fas fa-chart-line absolute -bottom-6 -right-6 text-white/[0.03] text-9xl rotate-12 transition-all duration-700"></i>
        </div>

        <div class="bg-gradient-to-br from-[#0a1128] to-[#050b1d] border border-white/5 p-8 rounded-[2.5rem] relative overflow-hidden group hover:border-blue-400/50 transition-all duration-500 shadow-2xl">
            <div class="flex items-center gap-6 relative z-10">
                <div class="w-16 h-16 bg-blue-400/10 rounded-3xl flex items-center justify-center border border-blue-400/20 group-hover:scale-110 transition-transform">
                    <i class="fas fa-graduation-cap text-2xl text-blue-400"></i>
                </div>
                <div>
                    <p class="text-[10px] font-black text-blue-400/60 uppercase tracking-[0.2em]">Semester</p>
                    <h3 class="text-4xl font-black text-white mt-1 tabular-nums">000</h3>
                </div>
            </div>
            <i class="fas fa-university absolute -bottom-6 -right-6 text-white/[0.03] text-9xl rotate-12 transition-all duration-700"></i>
        </div>
    </div>

    <div id="lesson-sub-content" class="min-h-[400px] transition-all duration-500">
        </div>
</div>

<div id="global-modal" class="hidden fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 bg-black/95 backdrop-blur-xl">
    <div class="absolute inset-0" onclick="closeModal()"></div>
    
    <div id="modal-container" class="bg-[#0a1128] border border-white/10 w-full max-w-lg rounded-[2.5rem] shadow-2xl relative z-10 max-h-[90vh] flex flex-col overflow-hidden transition-all duration-500">
        
        <div class="p-6 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
            <div id="modal-header-content">
                <h2 id="modal-title" class="text-white font-black uppercase tracking-widest italic text-sm">Course Details</h2>
            </div>
            <button onclick="closeModal()" class="w-10 h-10 rounded-full bg-white/5 text-gray-400 hover:text-white flex items-center justify-center transition-all">
                <i class="fas fa-times text-xs"></i>
            </button>
        </div>

        <div id="modal-body" class="p-6 overflow-y-auto custom-scrollbar flex-grow">
            </div>
    </div>
</div>
`,


    

'Projects': `

`,

    

'Leaderboard': `
  
`,



 'Collaboration': `
`,




    'Team': `
   `,


'Inbox': `
`,




'Nxxt AI': `

`,




 'Nxxt Lab': `

`,






 'Side Hustle Hub': `
   
`,


'Notifications': `
   

`,






    'Xt Pay': `
   
`,




    'Pricing': `


`,


    'Settings': `
    <div class="animate-in">
        <div class="flex items-center gap-4 overflow-x-auto no-scrollbar pb-6 mb-8 border-b border-white/5 scroll-smooth">
            <button onclick="updateSettingsTab('Profile')" class="settings-tab active">Profile</button>
            <button onclick="updateSettingsTab('Security')" class="settings-tab">Security</button>
            <button onclick="updateSettingsTab('Projects')" class="settings-tab">Projects</button>
            <button onclick="updateSettingsTab('Billing')" class="settings-tab">Billing</button>
            <button onclick="updateSettingsTab('History')" class="settings-tab">Login History</button>
            <button onclick="updateSettingsTab('Notif-Settings')" class="settings-tab">Notifications</button>
        </div>

        <div id="settingsContent" class="content-card min-h-[400px]">
            <div class="space-y-8">
                <div class="flex items-center gap-6">
                    <div class="w-20 h-20 rounded-3xl bg-blue-600/20 border border-blue-500/20 flex items-center justify-center relative overflow-hidden">
                        <img src="Logo.webp" data-user-img class="w-full h-full object-cover">
                        <button onclick="updateSettingsTab('Profile')" class="absolute -bottom-2 -right-2 w-8 h-8 bg-blue-600 rounded-xl flex items-center justify-center text-[10px] border-4 border-[#020617] hover:bg-blue-500 transition-colors">
                            <i class="fas fa-camera"></i>
                        </button>
                    </div>
                    <div>
                        <h4 data-user-name class="text-xl font-black text-white italic uppercase leading-none">Loading...</h4>
                        <p data-user-email class="text-[9px] font-black text-blue-500 uppercase tracking-[0.2em] mt-2 italic">Loading...</p>
                        <p class="text-[9px] font-black text-gray-500 uppercase tracking-widest mt-1">Student ID: TLP-2025-001</p>
                    </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="space-y-2">
                        <label class="text-[9px] font-black text-gray-500 uppercase ml-2">Registered Name</label>
                        <input type="text" id="overviewName" data-user-name-input class="settings-input" readonly>
                    </div>
                    <div class="space-y-2">
                        <label class="text-[9px] font-black text-gray-500 uppercase ml-2">Email Address</label>
                        <input type="email" id="overviewEmail" data-user-email-input class="settings-input" readonly>
                    </div>
                </div>

                <div class="pt-4 border-t border-white/5">
                    <button onclick="updateSettingsTab('Profile')" class="text-[10px] font-black text-blue-500 uppercase tracking-widest hover:text-white transition-colors">
                        Edit Profile Details <i class="fas fa-arrow-right ml-2"></i>
                    </button>
                </div>
            </div>
        </div>
    </div>
`,
};

// SYSTEM LOGIC - DON'T CHANGE THIS PART
function updateView(viewName) {
    const title = document.getElementById('viewTitle');
    const container = document.getElementById('dynamicContent');

    container.style.opacity = '0';
    container.style.transform = 'translateY(10px)';

    setTimeout(() => {
        title.innerText = viewName;
        container.innerHTML = views[viewName] || `
            <div class="content-card text-center py-20">
                <i class="fas fa-tools text-4xl text-blue-500/20 mb-6"></i>
                <h3 class="text-2xl font-black text-white italic uppercase tracking-tighter">${viewName} Module</h3>
                <p class="text-gray-500 text-[10px] font-black uppercase tracking-widest mt-2">Under Development</p>
            </div>
        `;
        container.style.opacity = '1';
        container.style.transform = 'translateY(0px)';

        // Update sidebar and bottom nav active states
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.toggle('active', item.innerText.includes(viewName));
        });
    }, 200);
}
// Initial Setup
const d = new Date();
document.getElementById('currentDate').innerText = d.toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
});
updateView('Overview');
//// for the meun toggle
// Function to open the Mobile Menu
function openFullMenu() {
    const modal = document.getElementById('mobileMenu');
    const overlay = document.getElementById('menuOverlay');
    const drawer = document.getElementById('menuDrawer');
    const mobileNav = document.getElementById('mobileNavLinks');
    const desktopNav = document.querySelector('#sidebar nav').innerHTML;
    // 1. Copy desktop links to mobile drawer if empty
    mobileNav.innerHTML = desktopNav;
    // 2. Show the modal
    modal.classList.remove('invisible');
    setTimeout(() => {
        overlay.classList.add('opacity-100');
        drawer.classList.add('translate-x-0');
    }, 10);
    // 3. Make sure links inside mobile menu also close the menu when clicked
    const links = mobileNav.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            // Give it a small delay so the user sees the click before closing
            setTimeout(closeFullMenu, 300);
        });
    });
}
// Function to close the Mobile Menu
function closeFullMenu() {
    const modal = document.getElementById('mobileMenu');
    const overlay = document.getElementById('menuOverlay');
    const drawer = document.getElementById('menuDrawer');
    overlay.classList.remove('opacity-100');
    drawer.classList.remove('translate-x-0');

    setTimeout(() => {
        modal.classList.add('invisible');
    }, 300);
}
// Close menu if clicking the overlay
document.getElementById('menuOverlay').addEventListener('click', closeFullMenu);
///// for the date and time
function updateHeaderInfo() {
    const greetingElement = document.getElementById('greetingText');
    const dateElement = document.getElementById('currentDate');
    const now = new Date();
    const hours = now.getHours();

    // Determine Greeting
    let greeting = "Good Night";
    if (hours < 12) greeting = "Good Morning";
    else if (hours < 17) greeting = "Good Afternoon";
    else if (hours < 21) greeting = "Good Evening";

    greetingElement.innerText = `${greeting}, New User`;
    // Update Date
    dateElement.innerText = now.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });
}
// 3. Run on load
updateHeaderInfo();
// Optional: Update every minute to keep greeting accurate
setInterval(updateHeaderInfo, 60000);
//// for the settings tabs
function updateSettingsTab(tabId) {
    let tabName = tabId; // <-- FIXED: declared with let

    const container = document.getElementById('settingsContent');

    // Update active tab button style
    document.querySelectorAll('.settings-tab').forEach(btn => {
        // This ensures the button stays blue when clicked
        const btnText = btn.innerText.toLowerCase().replace(/\s/g, '');
        const target = tabName.toLowerCase().replace('notif-settings', 'notifications');
        btn.classList.toggle('active', btnText.includes(target) || target.includes(btnText));
    });
    const tabs = {
        'Profile': `
    <div class="space-y-8 animate-in">
        <div class="flex items-center gap-6 mb-8">
            <div class="relative">
                <div class="w-24 h-24 rounded-3xl bg-blue-600/20 border-2 border-blue-500/20 flex items-center justify-center overflow-hidden">
                    <img src="Logo.webp" data-user-img class="w-full h-full object-cover hidden">
                    <i id="defaultUserIcon" class="fas fa-user text-5xl text-blue-500/50"></i>
                </div>
                <div onclick="triggerImageUpload()" class="absolute -bottom-2 -right-2 bg-blue-600 w-8 h-8 rounded-xl flex items-center justify-center border-4 border-[#020617] cursor-pointer hover:bg-blue-500 transition-all">
                    <i class="fas fa-camera text-[10px]"></i>
                </div>
            </div>
            <div>
                <h3 data-user-name class="text-2xl font-black text-white italic uppercase leading-none">Loading...</h3>
                <p class="text-[10px] font-black text-blue-500 uppercase tracking-widest mt-2">Level: Beginner</p>
            </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-2">
                <label class="text-[9px] font-black text-gray-500 uppercase ml-2">Full Name</label>
                <input type="text" id="editFullName" class="settings-input">
            </div>
            <div class="space-y-2">
                <label class="text-[9px] font-black text-gray-500 uppercase ml-2">Email</label>
                <input type="email" id="editEmail" class="settings-input" readonly>
            </div>
            <div class="space-y-2 md:col-span-2">
                <label class="text-[9px] font-black text-gray-500 uppercase ml-2">Bio</label>
                <textarea id="editBio" class="settings-input min-h-[100px] py-4" placeholder="Tell us about your coding journey..."></textarea>
            </div>
        </div>
        <button onclick="saveProfile()" class="w-full md:w-auto px-12 py-4 bg-blue-600 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-700 transition-all">
            Save Profile
        </button>
    </div>
`,
        'Security': `
            <div class="space-y-8 animate-in">
                <h3 class="text-xl font-black text-white italic uppercase tracking-tighter">Security Credentials</h3>
                <div class="grid grid-cols-1 gap-6">
                    <div class="space-y-2">
                        <label class="text-[9px] font-black text-gray-500 uppercase ml-2">Current Password</label>
                        <input type="password" placeholder="••••••••••••" class="settings-input">
                    </div>
                    <div class="space-y-2">
                        <label class="text-[9px] font-black text-gray-500 uppercase ml-2">New Password</label>
                        <input type="password" placeholder="Enter new password" class="settings-input">
                    </div>
                </div>
                <div class="p-4 bg-orange-500/5 border border-orange-500/10 rounded-2xl flex items-start gap-4">
                    <i class="fas fa-shield-alt text-orange-500 mt-1"></i>
                    <p class="text-[10px] text-gray-400 font-bold leading-relaxed uppercase">Pro Tip: Use a password with at least 12 characters and a mix of symbols to secure your Account.</p>
                </div>
                <button class="w-full md:w-auto px-12 py-4 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest">Update Security</button>
            </div>`,
        
'Projects': `

`,

        'Billing': `
    <div class="space-y-8 animate-in">
        <div class="content-card bg-blue-600/5 border-blue-500/10 text-center py-10">
            <i class="fas fa-gem text-4xl text-blue-500 mb-4"></i>
            <h3 class="text-xl font-black text-white italic uppercase tracking-tighter">Subscription Plan</h3>
            <p class="text-[10px] text-gray-500 font-black uppercase tracking-[0.2em] mb-6">
                Current Status: <span class="text-white">Free Student</span>
            </p>
            <button onclick="updateView('Pricing')" class="px-10 py-4 bg-blue-600 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-700 transition-all">
                Upgrade to Pro
            </button>
        </div>
        <div class="space-y-4">
            <h3 class="text-xl font-black text-white italic uppercase tracking-tighter">Billing History</h3>
           
            <div class="overflow-x-auto">
                <table class="w-full text-left border-separate border-spacing-y-2">
                    <thead>
                        <tr class="text-[8px] font-black text-gray-600 uppercase tracking-widest">
                            <th class="px-4 py-2">Invoice</th>
                            <th class="px-4 py-2">Date</th>
                            <th class="px-4 py-2">Amount</th>
                            <th class="px-4 py-2">Status</th>
                            <th class="px-4 py-2 text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colspan="5" class="py-20 bg-white/5 rounded-2xl text-center border border-dashed border-white/10">
                                <i class="fas fa-file-invoice-dollar text-3xl text-gray-800 mb-4 block"></i>
                                <h4 class="text-[11px] font-black text-gray-600 uppercase tracking-[0.2em] italic">No Transaction Records</h4>
                                <p class="text-[9px] text-gray-700 font-bold uppercase mt-2">Your billing history is currently empty.</p>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="p-6 bg-[#030816] border border-white/5 rounded-2xl flex items-center justify-between opacity-50">
            <div class="flex items-center gap-4">
                <div class="w-12 h-8 bg-white/5 rounded border border-white/10 flex items-center justify-center">
                    <i class="fas fa-credit-card text-gray-600"></i>
                </div>
                <div>
                    <p class="text-[10px] font-black text-white uppercase italic">No Payment Method Linked</p>
                    <p class="text-[8px] text-gray-600 font-bold uppercase mt-1">Add a card to enable pro features</p>
                </div>
            </div>
            <button class="text-[8px] font-black text-blue-500 uppercase tracking-widest">Add Card</button>
        </div>
    </div>
`,
        'History': `
    <div class="space-y-8 animate-in">
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
                <h3 class="text-xl font-black text-white italic uppercase tracking-tighter">Login History</h3>
                <p class="text-[9px] text-gray-500 font-bold uppercase tracking-widest mt-1">Monitor your account security and active sessions</p>
            </div>
            <div class="px-4 py-2 bg-blue-600/5 border border-blue-500/10 rounded-xl text-right">
                <p class="text-[8px] font-black text-blue-500 uppercase tracking-widest">System Live Time</p>
                <p id="liveHistoryClock" class="text-[10px] text-white font-black uppercase italic mt-1">Loading...</p>
            </div>
        </div>
        <div class="border-2 border-dashed border-white/5 rounded-[2rem] py-20 flex flex-col items-center justify-center text-center">
            <div class="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-6">
                <i class="fas fa-shield-virus text-2xl text-gray-800"></i>
            </div>
            <h4 class="text-white font-black uppercase italic tracking-tighter text-lg">No Session Records</h4>
            <p class="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-2 max-w-[280px] leading-relaxed">
                Security logs are currently clear. Your login activity will appear here once the system validates your next session.
            </p>
        </div>
        <div class="p-6 bg-[#030816] border border-white/5 rounded-2xl">
            <div class="flex items-center gap-4 text-orange-500 mb-2">
                <i class="fas fa-exclamation-triangle text-xs"></i>
                <p class="text-[10px] font-black uppercase">Security Protocol</p>
            </div>
            <p class="text-[9px] text-gray-500 font-bold uppercase leading-relaxed">
                T Learn Pro tracks IP addresses and device fingerprints to protect your Xt Pay wallet from unauthorized access.
                If you see a login you don't recognize, terminate it immediately.
            </p>
        </div>
    </div>
`,
        'Notif-Settings': `
    <div class="space-y-8 animate-in">
        <div>
            <h3 class="text-xl font-black text-white italic uppercase tracking-tighter">Notifications Control</h3>
            <p class="text-[9px] text-gray-500 font-bold uppercase tracking-widest mt-1">Configure how the system communicates with you</p>
        </div>
        <div class="space-y-4">
            <div class="flex items-center justify-between p-6 bg-white/5 border border-white/5 rounded-2xl">
                <div>
                    <span class="text-[10px] font-black text-white uppercase block">Email Course Updates</span>
                    <span class="text-[8px] text-gray-600 font-bold uppercase mt-1">Receive curriculum changes via mail</span>
                </div>
                <button onclick="toggleSwitch('emailNotif')" id="emailNotif" class="toggle-switch">
                    <div class="toggle-dot"></div>
                </button>
            </div>
            <div class="flex items-center justify-between p-6 bg-white/5 border border-white/5 rounded-2xl">
                <div>
                    <span class="text-[10px] font-black text-white uppercase block">Collaboration Alerts</span>
                    <span class="text-[8px] text-gray-600 font-bold uppercase mt-1">Notifications for team invites</span>
                </div>
                <button onclick="toggleSwitch('collabNotif')" id="collabNotif" class="toggle-switch">
                    <div class="toggle-dot"></div>
                </button>
            </div>
            <div class="flex items-center justify-between p-6 bg-white/5 border border-white/5 rounded-2xl">
                <div>
                    <span class="text-[10px] font-black text-white uppercase block">Security & Login Alerts</span>
                    <span class="text-[8px] text-gray-600 font-bold uppercase mt-1">Critical alerts for your account</span>
                </div>
                <button onclick="toggleSwitch('securityNotif')" id="securityNotif" class="toggle-switch">
                    <div class="toggle-dot"></div>
                </button>
            </div>
        </div>
    </div>
`
    };
    container.innerHTML = tabs[tabName] || `<div class="py-20 text-center text-gray-500 font-black uppercase text-[10px] tracking-[0.2em] italic">${tabName} module is under construction</div>`;
    // FIXED: Load toggle states when opening Notif-Settings
    if (tabName === 'Notif-Settings') {
        setTimeout(loadToggleStates, 50);
    }
}
//// for the login history
// Add this to your general script to handle the clock in the history tab
function startHistoryClock() {
    const clockElement = document.getElementById('liveHistoryClock');
    if (clockElement) {
        const now = new Date();
        clockElement.innerText = now.toLocaleString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true,
            day: 'numeric',
            month: 'short'
        });
    }
}
// Update clock every second
setInterval(startHistoryClock, 1000);
/// for the notification toggles
// Function to handle toggles and save to LocalStorage
function toggleSwitch(id) {
    const btn = document.getElementById(id);
    const isOff = !btn.classList.contains('on');

    if (isOff) {
        btn.classList.add('on');
        localStorage.setItem(id, 'true');
    } else {
        btn.classList.remove('on');
        localStorage.setItem(id, 'false');
    }
}
// Function to load the saved states whenever the Settings tab is opened
function loadToggleStates() {
    const toggles = ['emailNotif', 'collabNotif', 'securityNotif'];
    toggles.forEach(id => {
        const btn = document.getElementById(id);
        if (btn) {
            const savedState = localStorage.getItem(id);
            if (savedState === 'true') {
                btn.classList.add('on');
            } else {
                btn.classList.remove('on');
            }
        }
    });
}
//// for the sync function
async function saveProfile() {
    const client = await getClient();
    const fullName = document.getElementById('editFullName').value.trim();
    const { error } = await client.auth.updateUser({
        data: { full_name: fullName }
    });
    if (error) {
        alert('Update failed: ' + error.message);
    } else {
        alert('Profile saved!');
        loadProfileData(); // refresh display
    }
}

// FIXED: Update user name after login (from auth.js)
async function updateUserDisplay() {
    const client = await loadSupabase();
    const { data: { user } } = await client.auth.getUser();

    if (user) {
        const fullName = user.user_metadata?.full_name || user.email.split('@')[0];
        document.querySelectorAll('[data-user-name]').forEach(el => {
            el.textContent = fullName;
        });
    }
}

// Call updateUserDisplay on page load and after login
document.addEventListener('DOMContentLoaded', () => {
    updateUserDisplay();
});


//// SUPABASE CLIENT FOR DASHBOARD.JS
let supabaseClient = null;

async function getSupabaseClient() {
    if (supabaseClient) return supabaseClient;

    return new Promise((resolve) => {
        if (typeof supabase !== 'undefined') {
            const { createClient } = supabase;
            supabaseClient = createClient(
                'https://mddlkobjiquicopymipy.supabase.co',
                'sb_publishable_w5jI7FaNhpSCsT1GBHEmIw_Wmekf2dH'
            );
            resolve(supabaseClient);
            return;
        }

        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';
        script.onload = () => {
            const { createClient } = supabase;
            supabaseClient = createClient(
                'https://mddlkobjiquicopymipy.supabase.co',
                'sb_publishable_w5jI7FaNhpSCsT1GBHEmIw_Wmekf2dH'
            );
            resolve(supabaseClient);
        };
        script.onerror = () => {
            alert("Failed to load Supabase. Check your connection.");
        };
        document.head.appendChild(script);
    });
}

/**
 * 1. GALLERY SYSTEM (CAMERA ICON)
 */
function triggerImageUpload() {
    let imgInput = document.getElementById('hiddenGalleryInput');
    if (!imgInput) {
        imgInput = document.createElement('input');
        imgInput.type = 'file';
        imgInput.accept = 'image/*';
        imgInput.id = 'hiddenGalleryInput';
        imgInput.style.display = 'none';
        document.body.appendChild(imgInput);

        imgInput.onchange = async (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    const base64Image = event.target.result;
                    // Immediate preview
                    document.querySelectorAll('[data-user-img]').forEach(img => {
                        img.src = base64Image;
                        img.classList.remove('hidden');
                        img.parentElement.querySelector('#defaultUserIcon')?.classList.add('hidden');
                    });
                    localStorage.setItem('temp_img_buffer', base64Image);
                };
                reader.readAsDataURL(file);
            }
        };
    }
    imgInput.click();
}

/**
 * 2. UI SYNC (Loads from Supabase → Shows on Dashboard)
 */
async function syncProfileUI() {
    const client = await getSupabaseClient();
    const { data: { user } } = await client.auth.getUser();

    let savedName = "New User";
    let savedImg = "Logo.webp";
    let savedBio = "";

    if (user) {
        savedName = user.user_metadata?.full_name || user.email.split('@')[0];
        savedImg = user.user_metadata?.avatar_url || "Logo.webp";
        savedBio = user.user_metadata?.bio || "";
    }

    // Update all name places
    document.querySelectorAll('[data-user-name]').forEach(el => el.textContent = savedName);

    // Update all image places
    document.querySelectorAll('[data-user-img]').forEach(img => {
        img.src = savedImg;
        if (savedImg !== "Logo.webp") {
            img.classList.remove('hidden');
            img.parentElement.querySelector('#defaultUserIcon')?.classList.add('hidden');
        }
    });

    // Fill inputs
    const nameInput = document.getElementById('editFullName');
    const bioInput = document.getElementById('editBio');
    if (nameInput) nameInput.value = (savedName === "New User") ? "" : savedName;
    if (bioInput) bioInput.value = savedBio;

    // Fallback localStorage (for offline)
    localStorage.setItem('tlp_user_name', savedName);
    localStorage.setItem('tlp_user_img', savedImg);
    localStorage.setItem('tlp_user_bio', savedBio);
}

/**
 * 3. SAVE PROFILE (Uploads Image + Syncs to Supabase)
 */
async function saveProfile() {
    // FORCE REFRESH SESSION
    const client = await getSupabaseClient();
    const { data: { user }, error: refreshError } = await client.auth.getUser();
    if (refreshError || !user) {
        alert("Session expired. Please log in again.");
        window.location.href = 'login.html';
        return;
    }

    const nameInput = document.getElementById('editFullName');
    const bioInput = document.getElementById('editBio');
    const saveBtn = event.currentTarget;

    if (!nameInput) return;

    const newName = nameInput.value.trim();
    const newBio = bioInput ? bioInput.value.trim() : "";
    const bufferedImg = localStorage.getItem('temp_img_buffer');

    if (!newName) {
        alert("DATA ERROR: A name is required.");
        return;
    }

    const originalText = saveBtn.innerText;
    saveBtn.innerText = "SYNCING...";
    saveBtn.disabled = true;

    try {
        let avatarUrl = localStorage.getItem('tlp_user_img') || "Logo.webp";

        if (bufferedImg && bufferedImg.startsWith('data:image')) {
            const fileExt = bufferedImg.split(';')[0].split('/')[1] || 'png';
            const fileName = `${user.id}.${fileExt}`;
            const blob = await (await fetch(bufferedImg)).blob();

            const { error: uploadError } = await client.storage
                .from('avatars')
                .upload(fileName, blob, { upsert: true });

            if (uploadError && uploadError.statusCode !== 409) throw uploadError;

            avatarUrl = client.storage.from('avatars').getPublicUrl(fileName).data.publicUrl;
        }

        const { error } = await client.auth.updateUser({
            data: {
                full_name: newName,
                bio: newBio,
                avatar_url: avatarUrl
            }
        });

        if (error) throw error;

        localStorage.setItem('tlp_user_name', newName);
        localStorage.setItem('tlp_user_bio', newBio);
        localStorage.setItem('tlp_user_img', avatarUrl);
        localStorage.removeItem('temp_img_buffer');

        await syncProfileUI();
        alert("SUCCESS: Profile synced across all devices!");

    } catch (err) {
        alert("SYNC ERROR: " + err.message);
    } finally {
        saveBtn.innerText = originalText;
        saveBtn.disabled = false;
    }
}

// Run on page load
document.addEventListener('DOMContentLoaded', syncProfileUI);
// Event Listeners






//// for the pricing 
let isYearly = false;
function togglePricing() {
    isYearly = !isYearly;
    const ball = document.getElementById('toggleBall');
    const studentPrice = document.getElementById('studentPrice');
    const proPrice = document.getElementById('proPrice');
    const sPeriod = document.getElementById('studentPeriod');
    const pPeriod = document.getElementById('proPeriod');
    const mLabel = document.getElementById('monthlyLabel');
    const yLabel = document.getElementById('yearlyLabel');

    if (isYearly) {
        ball.style.transform = 'translateX(28px)';
        studentPrice.innerText = '₦74,400';
        proPrice.innerText = '₦142,800';
        sPeriod.innerText = '/ Year';
        pPeriod.innerText = '/ Year';
        yLabel.classList.remove('text-gray-500');
        yLabel.classList.add('text-white');
        mLabel.classList.add('text-gray-500');
    } else {
        ball.style.transform = 'translateX(0px)';
        studentPrice.innerText = '₦8,000';
        proPrice.innerText = '₦16,000';
        sPeriod.innerText = '/ Month';
        pPeriod.innerText = '/ Month';
        mLabel.classList.remove('text-gray-500');
        mLabel.classList.add('text-white');
        yLabel.classList.add('text-gray-500');
    }
}

// Centered Modal for Pricing Actions
function showPricingAlert(plan) {
    const root = document.querySelector('section'); // Targets the pricing section
    if(root) root.style.filter = 'blur(15px)';

    const modal = document.createElement('div');
    modal.className = "fixed inset-0 z-[1000000] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300";
    modal.innerHTML = `
            <div id="price-modal-card" class="bg-[#050b1d] border border-blue-500/20 w-full max-w-sm rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 transition-transform">
                <div class="p-10 text-center">
                    <div class="w-20 h-20 bg-blue-500/10 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-blue-500/20 rotate-12">
                        <i class="fas fa-shield-alt text-blue-500 text-3xl animate-pulse"></i>
                    </div>
                    <h3 class="text-white font-black uppercase italic text-2xl tracking-tighter mb-2">\${plan} Access</h3>
                    <p class="text-blue-400/50 text-[11px] font-bold uppercase tracking-[0.2em] leading-relaxed">
                        Payment gateway integration is currently in sandbox mode. 
                    </p>
                </div>
                <div class="p-8 bg-blue-500/5 border-t border-blue-500/10">
                    <button id="close-price-modal" class="w-full py-5 bg-blue-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all">
                        Return to Hub
                    </button>
                </div>
            </div>`;

    document.body.appendChild(modal);

    document.getElementById('close-price-modal').onclick = () => {
        const card = document.getElementById('price-modal-card');
        if(card) card.style.transform = 'scale(0.9)';
        modal.style.opacity = '0';
        if(root) root.style.filter = 'none';
        setTimeout(() => modal.remove(), 300);
    };
}




//// for the pricing modal
function openPaymentModal(planName) {
    const modal = document.getElementById('payment-modal');
    const title = document.getElementById('active-plan-title');
    const root = document.querySelector('section');

    if(title) title.innerText = planName;
    if(modal) modal.classList.remove('translate-x-full');
    if(root) root.style.filter = 'blur(10px)';
}

function closePaymentModal() {
    const modal = document.getElementById('payment-modal');
    const root = document.querySelector('section');

    if(modal) modal.classList.add('translate-x-full');
    if(root) root.style.filter = 'none';
}



///// for the logout/////////

  function handleLogout() {
    // Call your existing logout logic
    if (typeof logout === "function") {
      logout();
    }

    // Redirect to login page
    window.location.href = "login.html"; // or /login
  }




////// LESSON ONLY//////
/**
 * 1. ENHANCED CURRICULUM DATA
 */
const curriculumData = {
  HTML: {
    icon: 'fa-html5',
    topics: [
      { title: 'Semantic Structure', theory: 'Semantic HTML tags like <header>, <main>, and <section> provide meaning to the web page structure, making it easier for screen readers and search engines to parse content.', challenge: 'Create a semantic layout with a header and a main section.', snippet: `<header>\n  <h1>My Site</h1>\n</header>\n<main>\n  <p>Hello World</p>\n</main>` },
      { title: 'Forms & Inputs', theory: 'Forms are the primary way to collect user data. Using <label> linked via the "for" attribute ensures that clicking the text focuses the input, which is vital for accessibility.', challenge: 'Create a text input with a placeholder.', snippet: `<label for="name">Name:</label>\n<input type="text" id="name" placeholder="Enter Name">` },
      { title: 'Media Elements', theory: 'HTML5 introduced native multimedia support. The "alt" attribute on images is mandatory for accessibility and SEO.', challenge: 'Embed an image with alt text.', snippet: `<img src="photo.jpg" alt="Profile photo">` },
      { title: 'Tables', theory: 'Tables represent data in a grid. Use <thead>, <tbody>, and <tfoot> to logically group your table rows for better styling control and accessibility.', challenge: 'Create a 2-row table.', snippet: `<table>\n  <tr><th>Name</th><th>Age</th></tr>\n  <tr><td>Alex</td><td>22</td></tr>\n</table>` },
      { title: 'The Head & Meta', theory: 'The <head> contains metadata about the document, such as character encoding, viewport settings for responsiveness, and SEO titles.', challenge: 'Add a meta charset tag.', snippet: `<meta charset="UTF-8">` },
      { title: 'Links & Navigation', theory: 'The <a> tag creates hyperlinks. Using target="_blank" opens links in new tabs, but should be used sparingly to avoid user confusion.', challenge: 'Create a link to Google.', snippet: `<a href="https://google.com">Google</a>` },
      { title: 'Lists (Ordered/Unordered)', theory: '<ul> is for bullet points where order doesn’t matter, while <ol> is for numbered steps.', challenge: 'Create an unordered list.', snippet: `<ul>\n  <li>Item 1</li>\n  <li>Item 2</li>\n</ul>` },
      { title: 'Buttons vs Anchors', theory: 'Use <button> for actions (like submitting or clicking) and <a> for navigation (changing the URL).', challenge: 'Create a functional button.', snippet: `<button type="button">Click Me</button>` },
      { title: 'The Video Tag', theory: 'The <video> tag supports multiple source formats and can include "controls" for play/pause/volume.', challenge: 'Add a video element with controls.', snippet: `<video controls width="250">\n  <source src="vid.mp4" type="video/mp4">\n</video>` },
      { title: 'Iframes', theory: 'Iframes allow you to embed external websites or components (like YouTube videos) directly into your page.', challenge: 'Embed an iframe.', snippet: `<iframe src="https://example.com" title="Example"></iframe>` },
      { title: 'Data Attributes', theory: 'The "data-*" attributes allow you to store custom private data on an element which can be accessed via JavaScript.', challenge: 'Add a custom data attribute.', snippet: `<div data-user-id="123">User Profile</div>` },
      { title: 'Canvas API', theory: 'The <canvas> element is used to draw graphics on the fly via scripting, usually JavaScript.', challenge: 'Create a canvas container.', snippet: `<canvas id="myCanvas" width="200" height="100"></canvas>` },
      { title: 'SVG Integration', theory: 'SVGs are XML-based vector graphics. Unlike JPEGs, they do not lose quality when resized.', challenge: 'Inline a simple circle SVG.', snippet: `<svg height="100" width="100">\n  <circle cx="50" cy="50" r="40" stroke="black" fill="red" />\n</svg>` },
      { title: 'Details & Summary', theory: 'The <details> tag creates an interactive widget that the user can open and close.', challenge: 'Create a toggleable detail.', snippet: `<details>\n  <summary>Click to read more</summary>\n  <p>Hidden content here.</p>\n</details>` },
      { title: 'Web Components (Slot)', theory: 'The <slot> element is a placeholder inside a web component that you can fill with your own markup.', challenge: 'Define a slot.', snippet: `<template id="my-tmp">\n  <slot name="content">Default</slot>\n</template>` }
    ]
  },

  CSS: {
    icon: 'fa-css3-alt',
    topics: [
      { title: 'Flexbox Mastery', theory: 'Flexbox is a one-dimensional layout system. "justify-content" aligns items on the main axis, while "align-items" handles the cross axis.', challenge: 'Center a div horizontally and vertically.', snippet: `.container {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}` },
      { title: 'Grid Layout', theory: 'CSS Grid is a two-dimensional system (rows AND columns). "fr" units represent a fraction of the available space.', challenge: 'Create a 3-column grid.', snippet: `.grid {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n}` },
      { title: 'Responsive Design', theory: 'Media queries allow you to apply styles based on the device width, height, or orientation.', challenge: 'Change background color on small screens.', snippet: `@media (max-width: 600px) {\n  body {\n    background: #f2f2f2;\n  }\n}` },
      { title: 'Animations', theory: 'Animations use @keyframes to define a start and end state, allowing for complex motion without JS.', challenge: 'Create a simple fade-in animation.', snippet: `@keyframes fadeIn {\n  from { opacity: 0; }\n  to { opacity: 1; }\n}` },
      { title: 'The Box Model', theory: 'Every element is a box consisting of Content, Padding, Border, and Margin. Box-sizing: border-box is recommended to include padding in the width calculation.', challenge: 'Set box-sizing.', snippet: `* { box-sizing: border-box; }` },
      { title: 'CSS Variables', theory: 'Variables (Custom Properties) allow you to store values (like colors) in one place and reuse them across your CSS.', challenge: 'Define and use a variable.', snippet: `:root { --main-bg: #333; }\nbody { background: var(--main-bg); }` },
      { title: 'Selectors & Specificity', theory: 'Specificity determines which CSS rule wins. ID selectors (#) are stronger than Class selectors (.), which are stronger than Tag selectors.', challenge: 'Target an element by ID.', snippet: `#unique-header { color: blue; }` },
      { title: 'Positioning', theory: 'Relative position stays in the flow; Absolute position moves relative to its nearest positioned ancestor; Fixed is relative to the viewport.', challenge: 'Set a fixed header.', snippet: `header { position: fixed; top: 0; width: 100%; }` },
      { title: 'Transitions', theory: 'Transitions allow you to change property values smoothly over a given duration.', challenge: 'Add a hover transition.', snippet: `button {\n  transition: background 0.3s ease;\n}\nbutton:hover { background: red; }` },
      { title: 'Z-Index', theory: 'Z-index controls the stack order of elements. It only works on elements with a "position" value other than static.', challenge: 'Bring an element to the front.', snippet: `.overlay { z-index: 100; position: absolute; }` },
      { title: 'Calc() Function', theory: 'The calc() function allows you to perform calculations when specifying CSS property values (e.g., mixing px and %).', challenge: 'Set width using calc.', snippet: `div { width: calc(100% - 20px); }` },
      { title: 'Flexbox Gap', theory: 'The gap property provides a way to add spacing between flex items without using margins on the items themselves.', challenge: 'Add 10px spacing between items.', snippet: `.flex-container { display: flex; gap: 10px; }` },
      { title: 'Object-Fit', theory: 'Object-fit defines how an <img> or <video> should be resized to fit its container.', challenge: 'Make an image cover its container.', snippet: `img { width: 100%; height: 200px; object-fit: cover; }` },
      { title: 'Filters', theory: 'The filter property applies graphical effects like blur or color shifting to an element.', challenge: 'Blur an image.', snippet: `img { filter: blur(5px); }` },
      { title: 'Pseudo-elements', theory: '::before and ::after allow you to insert content from CSS into the DOM without adding extra HTML tags.', challenge: 'Add content before a link.', snippet: `a::before { content: "🔗 "; }` }
    ]
  },

  JavaScript: {
    icon: 'fa-js',
    topics: [
      { title: 'Arrow Functions', theory: 'Arrow functions offer a shorter syntax and do not have their own "this" context, making them ideal for callbacks.', challenge: 'Convert a function to arrow syntax.', snippet: `const greet = () => {\n  console.log("Hello JS!");\n};` },
      { title: 'DOM Manipulation', theory: 'The Document Object Model (DOM) is a programming interface that represents the page so JS can change document structure, style, and content.', challenge: 'Update text content of an element.', snippet: `document.getElementById("demo").innerHTML = "Updated!";` },
      { title: 'Events', theory: 'Events are actions that happen in the browser (clicks, keypresses). Event listeners "listen" for these and trigger code.', challenge: 'Run code when a button is clicked.', snippet: `button.addEventListener("click", () => {\n  alert("Clicked!");\n});` },
      { title: 'Arrays & Methods', theory: 'Modern JS relies on functional methods like map, filter, and reduce to transform data without mutating the original array.', challenge: 'Filter even numbers from an array.', snippet: `const nums = [1,2,3,4];\nconst evens = nums.filter(n => n % 2 === 0);` },
      { title: 'Promises & Async/Await', theory: 'Promises handle asynchronous operations. Async/await is syntactic sugar that makes asynchronous code look synchronous.', challenge: 'Write an async function.', snippet: `async function getData() {\n  const res = await fetch(url);\n  return res.json();\n}` },
      { title: 'Destructuring', theory: 'Destructuring allows you to unpack values from arrays or properties from objects into distinct variables.', challenge: 'Destructure an object.', snippet: `const user = { name: "Bob", age: 25 };\nconst { name, age } = user;` },
      { title: 'Template Literals', theory: 'Backticks (`) allow for multi-line strings and "interpolation" using the ${expression} syntax.', challenge: 'Create a template string.', snippet: `const msg = \`Hello, \${name}!\`;` },
      { title: 'Spread & Rest', theory: 'The spread operator (...) expands an array or object into elements. The rest operator collects multiple elements into an array.', challenge: 'Merge two arrays.', snippet: `const combined = [...arr1, ...arr2];` },
      { title: 'Local Storage', theory: 'Local Storage allows you to store key-value pairs in the browser that persist even after the page is refreshed.', challenge: 'Save data to local storage.', snippet: `localStorage.setItem("user", "Alex");` },
      { title: 'Scope (Let/Const)', theory: 'Var is function-scoped. Let and Const are block-scoped ({}), which prevents many bugs related to variable hoisting.', challenge: 'Declare a constant variable.', snippet: `const pi = 3.14159;` },
      { title: 'Classes & OOP', theory: 'Classes are templates for creating objects. They encapsulate data with code to manipulate that data.', challenge: 'Create a basic class.', snippet: `class Car {\n  constructor(brand) { this.brand = brand; }\n}` },
      { title: 'Closures', theory: 'A closure is the combination of a function bundled together with references to its surrounding state (lexical environment).', challenge: 'Create a counter closure.', snippet: `function counter() {\n  let count = 0;\n  return () => count++;\n}` },
      { title: 'Error Handling', theory: 'Try...catch blocks allow you to handle runtime errors gracefully without crashing the entire script.', challenge: 'Wrap code in try/catch.', snippet: `try {\n  riskyCode();\n} catch (err) {\n  console.error(err);\n}` },
      { title: 'Fetch API', theory: 'Fetch provides a global fetch() method that provides an easy, logical way to fetch resources asynchronously across the network.', challenge: 'Fetch a resource.', snippet: `fetch('api/data').then(r => r.json());` },
      { title: 'Modules (Import/Export)', theory: 'Modules allow you to split your code into separate files and export/import functionality where needed.', challenge: 'Export a function.', snippet: `export const add = (a, b) => a + b;` }
    ]
  },

  Python: {
    icon: 'fa-python',
    topics: [
      { title: 'List Comprehensions', theory: 'A compact way to create a new list by performing an operation on each item in an existing list.', challenge: 'Generate squares of numbers.', snippet: `numbers = [1, 2, 3]\nsquares = [x**2 for x in numbers]` },
      { title: 'Dictionary Methods', theory: 'Dictionaries are hash maps. The .get() method is safer than square brackets because it returns None instead of a KeyError if the key is missing.', challenge: 'Access a value safely.', snippet: `user = {"name": "Gemini", "level": 1}\nprint(user.get("name"))` },
      { title: 'Functions', theory: 'Functions in Python use "def" and support default arguments, keyword arguments, and arbitrary argument lists (*args).', challenge: 'Write a function that adds two numbers.', snippet: `def add(a, b):\n  return a + b` },
      { title: 'Loops', theory: 'For loops in Python iterate over any sequence (list, string, range) and are highly readable.', challenge: 'Loop through a list and print values.', snippet: `for item in ["a", "b", "c"]:\n  print(item)` },
      { title: 'F-Strings', theory: 'Introduced in Python 3.6, f-strings provide a fast and readable way to embed expressions inside string literals.', challenge: 'Format a string.', snippet: `name = "Python"\nprint(f"Hello {name}")` },
      { title: 'Virtual Environments', theory: 'Venvs keep dependencies required by different projects separate by creating isolated environments for them.', challenge: 'Create a venv (bash).', snippet: `python -m venv venv` },
      { title: 'File I/O', theory: 'The "with" statement ensures that files are closed properly after their suite finishes, even if an exception is raised.', challenge: 'Read a file.', snippet: `with open('file.txt', 'r') as f:\n  data = f.read()` },
      { title: 'Error Handling', theory: 'Python uses Try/Except blocks. It is best practice to catch specific exceptions (like ValueError) rather than a general Exception.', challenge: 'Catch a division error.', snippet: `try:\n  x = 1 / 0\nexcept ZeroDivisionError:\n  print("Oops!")` },
      { title: 'PIP & Packages', theory: 'PIP is the package installer for Python. You can use it to install libraries from the Python Package Index (PyPI).', challenge: 'Install requests library.', snippet: `pip install requests` },
      { title: 'Classes (OOP)', theory: 'Everything in Python is an object. Classes allow you to group data and methods that act upon that data together.', challenge: 'Define a class.', snippet: `class Dog:\n  def __init__(self, name):\n    self.name = name` },
      { title: 'Slicing', theory: 'Slicing allows you to get a subset of a sequence (list, tuple, string) using the syntax [start:stop:step].', challenge: 'Reverse a string.', snippet: `s = "hello"[::-1]` },
      { title: 'Lambda Functions', theory: 'Lambdas are small, anonymous one-line functions that can have any number of arguments but only one expression.', challenge: 'Create a double lambda.', snippet: `double = lambda x: x * 2` },
      { title: 'Decorators', theory: 'A decorator is a design pattern that allows you to modify the behavior of a function or class without permanently modifying it.', challenge: 'Apply a decorator.', snippet: `@my_decorator\ndef my_func(): pass` },
      { title: 'Generators', theory: 'Generators allow you to declare a function that behaves like an iterator, yielding values one at a time using the "yield" keyword.', challenge: 'Create a generator.', snippet: `def count():\n  yield 1\n  yield 2` },
      { title: 'Args and Kwargs', theory: '*args allows a function to accept any number of positional arguments; **kwargs allows for named keyword arguments.', challenge: 'Define a flexible function.', snippet: `def func(*args, **kwargs):\n  print(args, kwargs)` }
    ]
  },

  Git: {
    icon: 'fa-git-alt',
    topics: [
      { title: 'Version Control Basics', theory: 'Git is a distributed version control system that tracks changes in source code during software development.', challenge: 'Initialize a git repository.', snippet: `git init` },
      { title: 'Commits', theory: 'A commit is a snapshot of your project at a specific point in time. It requires a clear, descriptive message.', challenge: 'Commit a file.', snippet: `git add .\ngit commit -m "Initial commit"` },
      { title: 'Branching', theory: 'Branches allow you to work on new features or bug fixes in isolation from the main (production) codebase.', challenge: 'Create a new branch.', snippet: `git checkout -b feature-xyz` },
      { title: 'Merging', theory: 'Merging combines the changes from one branch into another (usually merging a feature branch back into main).', challenge: 'Merge a branch.', snippet: `git merge feature-xyz` },
      { title: 'Remote Repos (Push)', theory: 'Remotes are versions of your project hosted on the internet (like GitHub). Pushing sends your local commits there.', challenge: 'Push to main.', snippet: `git push origin main` },
      { title: 'Pulling Changes', theory: 'Git pull fetches updates from the remote and immediately merges them into your local branch.', challenge: 'Update local code.', snippet: `git pull origin main` },
      { title: 'Cloning', theory: 'Cloning creates a local copy of an existing remote repository on your machine.', challenge: 'Clone a repo.', snippet: `git clone <url>` },
      { title: 'Staging Area', theory: 'The staging area (index) is a middle ground where you prepare changes before they are committed.', challenge: 'Add one file to staging.', snippet: `git add style.css` },
      { title: 'Git Status', theory: 'Status tells you which files are modified, which are staged, and which are untracked.', challenge: 'Check status.', snippet: `git status` },
      { title: 'Log & History', theory: 'The log shows the history of all commits made in the repository, including authors and timestamps.', challenge: 'View commit log.', snippet: `git log --oneline` },
      { title: 'Git Stash', theory: 'Stashing takes your uncommitted changes and "hides" them temporarily so you can switch branches without committing.', challenge: 'Stash changes.', snippet: `git stash` },
      { title: 'Reverting Changes', theory: 'Git revert creates a new commit that undoes the changes of a previous commit safely.', challenge: 'Revert a commit.', snippet: `git revert <hash>` },
      { title: 'Git Diff', theory: 'Diff shows the line-by-line differences between files or between the staging area and your last commit.', challenge: 'Check differences.', snippet: `git diff` },
      { title: 'Fetch vs Pull', theory: 'Fetch gets updates from the remote but doesn’t change your local code. Pull does both fetch and merge.', challenge: 'Fetch updates.', snippet: `git fetch` },
      { title: 'Resolving Conflicts', theory: 'Conflicts occur when two people change the same line. You must manually choose which code to keep.', challenge: 'See conflicts.', snippet: `git status # Then open files` }
    ]
  },

  React: {
    icon: 'fa-react',
    topics: [
      { title: 'Components', theory: 'React apps are built from independent, reusable building blocks called Components.', challenge: 'Create a functional component.', snippet: `function Hello() {\n  return <h1>Hello React</h1>;\n}` },
      { title: 'Props', theory: 'Props (properties) are read-only inputs passed from a parent component to a child component.', challenge: 'Display a prop value.', snippet: `function User({ name }) {\n  return <p>{name}</p>;\n}` },
      { title: 'State (useState)', theory: 'State allows components to "remember" data (like input values). When state changes, React re-renders the component.', challenge: 'Create a counter state.', snippet: `const [count, setCount] = useState(0);` },
      { title: 'Effect (useEffect)', theory: 'UseEffect handles side effects like data fetching, manual DOM changes, or setting up subscriptions.', challenge: 'Run code on mount.', snippet: `useEffect(() => {\n  console.log("Mounted!");\n}, []);` },
      { title: 'JSX Rules', theory: 'JSX looks like HTML but is JS. It requires a single parent element and uses className instead of class.', challenge: 'Return valid JSX.', snippet: `<><div>One</div><div>Two</div></>` },
      { title: 'Lists & Keys', theory: 'When rendering lists, React needs a "key" prop to identify which items have changed, been added, or removed.', challenge: 'Map an array to elements.', snippet: `items.map(item => <li key={item.id}>{item.name}</li>)` },
      { title: 'Handling Events', theory: 'React events are named using camelCase (onClick) rather than lowercase (onclick).', challenge: 'Add a click handler.', snippet: `<button onClick={handleClick}>Click</button>` },
      { title: 'Conditional Rendering', theory: 'You can use JS operators like && or ternary operators (? :) to render elements based on conditions.', challenge: 'Conditionally show text.', snippet: `{isLoggedIn ? <p>Welcome</p> : <p>Login</p>}` },
      { title: 'Controlled Inputs', theory: 'In a controlled component, form data is handled by a React component state rather than the DOM.', challenge: 'Create a controlled input.', snippet: `<input value={name} onChange={e => setName(e.target.value)} />` },
      { title: 'Context API', theory: 'Context provides a way to share data (like themes or user info) across the entire app without "prop drilling".', challenge: 'Create a Context.', snippet: `const MyContext = createContext();` },
      { title: 'React Router', theory: 'Router allows you to create a multi-page feel in a Single Page Application (SPA) by syncing the UI with the URL.', challenge: 'Define a Route.', snippet: `<Route path="/about" element={<About />} />` },
      { title: 'Hooks Rules', theory: 'Hooks must only be called at the top level of a function and only inside React function components.', challenge: 'Correctly call a hook.', snippet: `// Always at the top\nconst [val, setVal] = useState("");` },
      { title: 'Custom Hooks', theory: 'Custom hooks allow you to extract component logic into reusable functions.', challenge: 'Declare a custom hook.', snippet: `function useToggle() {\n  const [s, setS] = useState(false);\n  return [s, () => setS(!s)];\n}` },
      { title: 'Refs (useRef)', theory: 'Refs provide a way to access DOM nodes or React elements directly without causing re-renders.', challenge: 'Create a ref.', snippet: `const inputRef = useRef();` },
      { title: 'Performance (memo)', theory: 'React.memo is a higher-order component that prevents a functional component from re-rendering if its props haven\'t changed.', challenge: 'Wrap a component in memo.', snippet: `export default React.memo(MyComponent);` }
    ]
  },

  SQL: {
    icon: 'fa-database',
    topics: [
      { title: 'SELECT Queries', theory: 'The SELECT statement is used to fetch data from a database. "*" selects all columns.', challenge: 'Get all users.', snippet: `SELECT * FROM users;` },
      { title: 'WHERE Clause', theory: 'WHERE filters records. It is used to extract only those records that fulfill a specified condition.', challenge: 'Find users with level > 1.', snippet: `SELECT * FROM users WHERE level > 1;` },
      { title: 'INSERT INTO', theory: 'INSERT is used to add new rows of data to a table.', challenge: 'Add a new user.', snippet: `INSERT INTO users (name, level) VALUES ('Alex', 5);` },
      { title: 'UPDATE', theory: 'UPDATE modifies existing records in a table. Warning: Always use a WHERE clause or all records will be updated!', challenge: 'Update a user name.', snippet: `UPDATE users SET name = 'Bob' WHERE id = 1;` },
      { title: 'DELETE', theory: 'DELETE removes rows from a table.', challenge: 'Delete user with id 5.', snippet: `DELETE FROM users WHERE id = 5;` },
      { title: 'ORDER BY', theory: 'ORDER BY sorts the result-set in ascending (ASC) or descending (DESC) order.', challenge: 'Sort by name.', snippet: `SELECT * FROM users ORDER BY name ASC;` },
      { title: 'JOINs (Inner)', theory: 'JOIN combines rows from two or more tables based on a related column between them.', challenge: 'Join users and orders.', snippet: `SELECT users.name, orders.id FROM users\nINNER JOIN orders ON users.id = orders.user_id;` },
      { title: 'Aggregate Functions', theory: 'Functions like COUNT(), MAX(), MIN(), SUM(), and AVG() return a single value calculated from a column.', challenge: 'Count all users.', snippet: `SELECT COUNT(*) FROM users;` },
      { title: 'GROUP BY', theory: 'GROUP BY groups rows that have the same values into summary rows, often used with aggregate functions.', challenge: 'Group by level.', snippet: `SELECT level, COUNT(*) FROM users GROUP BY level;` },
      { title: 'Primary Keys', theory: 'A Primary Key is a unique identifier for each record in a table. It cannot be NULL.', challenge: 'Define a primary key.', snippet: `id INTEGER PRIMARY KEY` },
      { title: 'Foreign Keys', theory: 'A Foreign Key is a field in one table that refers to the Primary Key in another table, creating a relationship.', challenge: 'Define a foreign key.', snippet: `user_id INTEGER, FOREIGN KEY (user_id) REFERENCES users(id)` },
      { title: 'LIKE Operator', theory: 'LIKE is used in a WHERE clause to search for a specified pattern in a column (using % as a wildcard).', challenge: 'Find names starting with A.', snippet: `SELECT * FROM users WHERE name LIKE 'A%';` },
      { title: 'HAVING Clause', theory: 'The HAVING clause was added to SQL because the WHERE keyword could not be used with aggregate functions.', challenge: 'Filter groups.', snippet: `SELECT level FROM users GROUP BY level HAVING COUNT(*) > 10;` },
      { title: 'LIMIT', theory: 'LIMIT specifies the maximum number of records to return, which is useful for pagination.', challenge: 'Get first 5 users.', snippet: `SELECT * FROM users LIMIT 5;` },
      { title: 'CREATE TABLE', theory: 'CREATE TABLE defines a new table and its columns, including data types (INT, VARCHAR, etc.).', challenge: 'Create a products table.', snippet: `CREATE TABLE products (id INT, name VARCHAR(50));` }
    ]
  }
};
/**
 * 2. INITIALIZATION
 */
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
