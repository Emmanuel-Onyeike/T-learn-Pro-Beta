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
<div class="space-y-8 animate-in">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">

        <div class="bg-[#050b1d] border border-white/5 p-6 rounded-[2rem] relative overflow-hidden group hover:border-blue-500/30 transition-all">
            <div class="flex items-center gap-4 relative z-10">
                <div class="w-12 h-12 bg-blue-600/10 rounded-2xl flex items-center justify-center border border-blue-500/20">
                    <i class="fas fa-code-branch text-blue-500"></i>
                </div>
                <div>
                    <p class="text-[10px] font-black text-gray-500 uppercase tracking-widest">Projects</p>
                    <h3 id="projectCount" class="text-3xl font-black text-white mt-1">0</h3>
                </div>
            </div>
            <i class="fas fa-project-diagram absolute -bottom-4 -right-4 text-white/[0.02] text-8xl rotate-12 group-hover:text-blue-500/[0.05] transition-all"></i>
        </div>


        <div class="bg-[#050b1d] border border-white/5 p-6 rounded-[2rem] relative overflow-hidden group hover:border-green-500/30 transition-all">
            <div class="flex items-center gap-4 relative z-10">
                <div class="w-12 h-12 bg-green-600/10 rounded-2xl flex items-center justify-center border border-green-500/20">
                    <i class="fas fa-layer-group text-green-500"></i>
                </div>
                <div>
                    <p class="text-[10px] font-black text-gray-500 uppercase tracking-widest">Level</p>
                    <h3 id="dash-level-val" class="text-3xl font-black text-white mt-1">000</h3>
                </div>
            </div>
            <i class="fas fa-chart-line absolute -bottom-4 -right-4 text-white/[0.02] text-8xl rotate-12 group-hover:text-green-500/[0.05] transition-all"></i>
        </div>

        <div class="bg-[#050b1d] border border-white/5 p-6 rounded-[2rem] relative overflow-hidden group hover:border-yellow-500/30 transition-all">



            <div class="flex items-center gap-4 relative z-10">
                <div class="w-12 h-12 bg-yellow-600/10 rounded-2xl flex items-center justify-center border border-yellow-500/20">
                    <i class="fas fa-star text-yellow-500"></i>
                </div>
                <div>
                    <p class="text-[10px] font-black text-gray-500 uppercase tracking-widest">XT Points</p>
                    <h3 class="text-3xl font-black text-white mt-1">
                        <span id="dash-xp-val">0</span> 
                        <span class="text-xs text-yellow-500/50 uppercase">XP</span>
                    </h3>
                </div>
            </div>
            <i class="fas fa-trophy absolute -bottom-4 -right-4 text-white/[0.02] text-8xl rotate-12 group-hover:text-yellow-500/[0.05] transition-all"></i>
        </div>
    </div>

    <div class="bg-[#050b1d] border border-white/5 p-8 rounded-[2.5rem] relative overflow-hidden">
        <h3 class="text-lg font-black text-white italic uppercase tracking-tighter mb-4">Activity Nebula</h3>
        <div class="relative w-full h-[250px] bg-black/20 rounded-2xl border border-white/5">
            <canvas id="nebula" class="w-full h-full"></canvas>
        </div>
        <p class="text-[8px] text-gray-600 font-bold uppercase tracking-widest italic mt-4">
            Visualizing your deployment frequency and session uptime
        </p>
    </div>
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">

    <div class="bg-[#050b1d] border border-white/5 p-6 rounded-[2rem] relative overflow-hidden group hover:border-blue-500/30 transition-all">
        <div class="flex items-center gap-4 relative z-10">
            <div class="w-12 h-12 bg-blue-600/10 rounded-2xl flex items-center justify-center border border-blue-500/20">
                <i class="fas fa-handshake text-blue-500"></i>
            </div>
            <div>
                <p class="text-[10px] font-black text-gray-500 uppercase tracking-widest">Collab</p>
                <h3 id="collabCount" class="text-3xl font-black text-white mt-1">0</h3>
            </div>
        </div>
        <i class="fas fa-users absolute -bottom-4 -right-4 text-white/[0.02] text-8xl rotate-12 group-hover:text-blue-500/[0.05] transition-all"></i>
    </div>

    <div class="bg-[#050b1d] border border-white/5 p-6 rounded-[2rem] relative overflow-hidden group hover:border-purple-500/30 transition-all">
        <div class="flex items-center gap-4 relative z-10">
            <div class="w-12 h-12 bg-purple-600/10 rounded-2xl flex items-center justify-center border border-purple-500/20">
                <i class="fas fa-calendar-alt text-purple-500"></i>
            </div>
            <div>
                <p class="text-[10px] font-black text-gray-500 uppercase tracking-widest">Semester</p>
                <h3 id="semesterVal" class="text-3xl font-black text-white mt-1">000</h3>
            </div>
        </div>
        <i class="fas fa-graduation-cap absolute -bottom-4 -right-4 text-white/[0.02] text-8xl rotate-12 group-hover:text-purple-500/[0.05] transition-all"></i>
    </div>

    <div class="bg-[#050b1d] border border-white/5 p-6 rounded-[2rem] relative overflow-hidden group hover:border-yellow-500/30 transition-all">
        <div class="flex items-center gap-4 relative z-10">
            <div class="w-12 h-12 bg-yellow-600/10 rounded-2xl flex items-center justify-center border border-yellow-500/20">
                <i class="fas fa-medal text-yellow-500"></i>
            </div>
            <div>
                <p class="text-[10px] font-black text-gray-500 uppercase tracking-widest">Rank</p>
                <h3 class="text-3xl font-black text-white mt-1">
                    <span id="rankVal">#0</span> 
                    <span class="text-xs text-yellow-500/50 uppercase">Global</span>
                </h3>
            </div>
        </div>
        <i class="fas fa-crown absolute -bottom-4 -right-4 text-white/[0.02] text-8xl rotate-12 group-hover:text-yellow-500/[0.05] transition-all"></i>
    </div>

</div>


    <div class="bg-[#050b1d] border border-white/5 p-6 rounded-[2rem] relative overflow-hidden group hover:border-orange-500/30 transition-all">
        <div class="flex items-center gap-4 relative z-10">
            <div class="w-12 h-12 bg-orange-600/10 rounded-2xl flex items-center justify-center border border-orange-500/20">
                <i class="fas fa-fire text-orange-500"></i>
            </div>
            <div>
                <p class="text-[10px] font-black text-gray-500 uppercase tracking-widest">Streaks</p>
                <h3 id="streakCount" class="text-3xl font-black text-white mt-1">0 <span class="text-xs text-orange-500/50">DAYS</span></h3>
            </div>
        </div>
        <i class="fas fa-bolt absolute -bottom-4 -right-4 text-white/[0.02] text-8xl rotate-12 group-hover:text-orange-500/[0.05] transition-all"></i>
    </div>

    <div class="bg-[#050b1d] border border-white/5 p-6 rounded-[2rem] relative overflow-hidden group hover:border-cyan-500/30 transition-all">
        <div class="flex items-center gap-4 relative z-10">
            <div class="w-12 h-12 bg-cyan-600/10 rounded-2xl flex items-center justify-center border border-cyan-500/20">
                <i class="fas fa-rocket text-cyan-500"></i>
            </div>
            <div>
                <p class="text-[10px] font-black text-gray-500 uppercase tracking-widest">Deployed</p>
                <h3 id="deployCount" class="text-3xl font-black text-white mt-1">0</h3>
            </div>
        </div>
        <i class="fas fa-cloud-upload-alt absolute -bottom-4 -right-4 text-white/[0.02] text-8xl rotate-12 group-hover:text-cyan-500/[0.05] transition-all"></i>
    </div>

    <div class="bg-[#050b1d] border border-white/5 p-6 rounded-[2rem] relative overflow-hidden group hover:border-indigo-500/30 transition-all">
        <div class="flex items-center gap-4 relative z-10">
            <div class="w-12 h-12 bg-indigo-600/10 rounded-2xl flex items-center justify-center border border-indigo-500/20">
                <i class="fas fa-user-friends text-indigo-500"></i>
            </div>
            <div>
                <p class="text-[10px] font-black text-gray-500 uppercase tracking-widest">Teams</p>
                <h3 id="teamCount" class="text-3xl font-black text-white mt-1">0</h3>
            </div>
        </div>
        <i class="fas fa-network-wired absolute -bottom-4 -right-4 text-white/[0.02] text-8xl rotate-12 group-hover:text-indigo-500/[0.05] transition-all"></i>
    </div>

</div>
    <div class="bg-[#050b1d] border border-white/5 p-8 rounded-[2.5rem] relative overflow-hidden">
        <div class="flex justify-between items-center mb-6">
            <h3 class="text-lg font-black text-white italic uppercase tracking-tighter">Project History</h3>
            <span class="px-3 py-1 bg-white/5 rounded-full text-[10px] text-gray-400 font-bold uppercase tracking-widest">Tracking Live Session</span>
        </div>

        <div id="project-feed" class="space-y-4">
            <div class="flex flex-col items-center justify-center py-12 text-center">
                <div class="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4 border border-white/10">
                    <i class="fas fa-folder-open text-gray-600 text-xl"></i>
                </div>
                <h4 class="text-white font-black uppercase italic tracking-tighter">No projects yet</h4>
                <p class="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">Start a new workspace to see your activity here</p>
                <button class="mt-6 px-6 py-3 bg-white text-black rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-500 hover:text-white transition-all">
                    Initialize Workspace
                </button>
            </div>

        </div>
    </div>
</div>
`,

    
    
    'Lessons': `
   
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







