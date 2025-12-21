const views = {
    'Overview': `
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div class="content-card">
                <p class="text-[9px] font-black text-blue-500 uppercase tracking-widest mb-4">Course Progress</p>
                <h3 class="text-2xl font-black text-white italic mb-6">FULLSTACK DEV</h3>
                <div class="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                    <div class="w-[40%] h-full bg-blue-600"></div>
                </div>
                <p class="mt-4 text-[10px] font-bold text-gray-500">40% COMPLETED</p>
            </div>
            <div class="content-card text-center">
                 <p class="text-[9px] font-black text-green-500 uppercase tracking-widest mb-4">Total Balance</p>
                 <h3 class="text-3xl font-black text-white italic mb-2">₦0.00</h3>
                 <button class="mt-4 text-[8px] border border-white/10 px-4 py-2 rounded-lg uppercase font-black hover:bg-white hover:text-black transition-all">Go to Xt Pay</button>
            </div>
            <div class="content-card">
                <p class="text-[9px] font-black text-orange-500 uppercase tracking-widest mb-4">Upcoming</p>
                <h3 class="text-xl font-black text-white italic mb-2">Team Sync</h3>
                <p class="text-[10px] font-bold text-gray-500 uppercase">Tomorrow @ 10:00 AM</p>
            </div>
        </div>
    `,

    'Lessons': `
        <div class="content-card">
            <h3 class="text-2xl font-black text-white italic uppercase mb-6">Course Curriculum</h3>
            <div class="space-y-4">
                <div class="p-4 bg-white/5 rounded-xl border border-white/5 flex justify-between items-center">
                    <span class="text-[10px] font-black uppercase">01. Introduction to Web Systems</span>
                    <button class="text-blue-500 text-[10px] font-black uppercase">Start</button>
                </div>
                </div>
        </div>
    `,

'Projects': `
    <div class="space-y-8 animate-in">
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
                <h3 class="text-xl font-black text-white italic uppercase tracking-tighter">Project Management</h3>
                <p class="text-[9px] text-gray-500 font-bold uppercase tracking-widest mt-1">Manage and bulk delete your projects</p>
            </div>
            <button class="px-6 py-3 bg-blue-600/10 border border-blue-500/20 text-blue-500 rounded-xl text-[9px] font-black uppercase hover:bg-blue-600 hover:text-white transition-all">
                <i class="fas fa-plus mr-2"></i> New Project
            </button>
        </div>

        <div class="border-2 border-dashed border-white/5 rounded-3xl py-20 flex flex-col items-center justify-center text-center">
            <div class="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6">
                <i class="fas fa-code-branch text-3xl text-gray-700"></i>
            </div>
            <h4 class="text-white font-black uppercase italic tracking-tighter text-lg">No Projects Created Yet</h4>
            <p class="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-2 max-w-[250px] leading-relaxed">
                Your repository is empty. Start a new project to see it managed here.
            </p>
            
            <div class="mt-8 flex gap-3">
                <div class="px-4 py-2 bg-white/5 rounded-lg border border-white/5 text-[8px] font-black text-gray-500 uppercase">
                    Select All
                </div>
                <div class="px-4 py-2 bg-red-500/5 rounded-lg border border-red-500/10 text-[8px] font-black text-red-500/40 uppercase cursor-not-allowed">
                    Bulk Delete
                </div>
            </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="p-4 bg-white/5 border border-white/5 rounded-2xl">
                <i class="fas fa-info-circle text-blue-500 mb-3"></i>
                <p class="text-[9px] font-black text-white uppercase mb-1">Deployment Tip</p>
                <p class="text-[9px] text-gray-500 font-bold uppercase leading-relaxed">Active projects are automatically hosted on the T Learn Pro edge network.</p>
            </div>
            <div class="p-4 bg-white/5 border border-white/5 rounded-2xl">
                <i class="fas fa-history text-purple-500 mb-3"></i>
                <p class="text-[9px] font-black text-white uppercase mb-1">Auto-Save</p>
                <p class="text-[9px] text-gray-500 font-bold uppercase leading-relaxed">Failed builds are kept for 30 days before being purged from the testing hub.</p>
            </div>
        </div>
    </div>`,

    'Leaderboard': `
        <div class="content-card">
            <h3 class="text-2xl font-black text-white italic uppercase">Global Ranking</h3>
            <p class="text-gray-500 text-[10px] font-bold uppercase mt-2">See how you rank against other students.</p>
        </div>
    `,

    'Collaboration': `
        <div class="content-card">
            <h3 class="text-2xl font-black text-white italic uppercase">Find Partners</h3>
            <p class="text-gray-500 text-[10px] font-bold uppercase mt-2">Connect with students on shared projects.</p>
        </div>
    `,

    'Team': `
        <div class="content-card">
            <h3 class="text-2xl font-black text-white italic uppercase">Your Squad</h3>
            <p class="text-gray-500 text-[10px] font-bold uppercase mt-2">Manage team roles and performance.</p>
        </div>
    `,

    'Inbox': `
        <div class="content-card">
            <h3 class="text-2xl font-black text-white italic uppercase">Messages</h3>
            <p class="text-gray-500 text-[10px] font-bold uppercase mt-2">Notifications and Direct Messages.</p>
        </div>
    `,

    'Nxxt AI': `
        <div class="content-card min-h-[400px] flex flex-col justify-between">
            <div>
                <h3 class="text-3xl font-black text-white italic mb-2">NXXT AI ASSISTANT</h3>
                <p class="text-gray-500 text-xs font-bold uppercase tracking-widest">How can I help you today?</p>
            </div>
            <div class="bg-black/20 rounded-2xl p-4 border border-white/10">
                <input type="text" placeholder="ASK NXXT AI..." class="w-full bg-transparent border-none outline-none text-white font-bold text-xs uppercase tracking-widest p-2">
            </div>
        </div>
    `,

    'Nxxt Lab': `
        <div class="content-card">
            <h3 class="text-2xl font-black text-white italic uppercase">The Lab</h3>
            <p class="text-gray-500 text-[10px] font-bold uppercase mt-2">Experimental tools and beta software access.</p>
        </div>
    `,

    'Side Hustle Hub': `
        <div class="content-card">
            <h3 class="text-2xl font-black text-white italic uppercase">Freelance Marketplace</h3>
            <p class="text-gray-500 text-[10px] font-bold uppercase mt-2">Browse gigs and start earning with your skills.</p>
        </div>
    `,
'Notifications': `
    <div class="max-w-md mx-auto content-card text-center animate-in">
        <div class="relative inline-block mb-6">
            <i class="fa-solid fa-bell text-5xl text-blue-500"></i>
            <span class="absolute -top-1 -right-1 w-4 h-4 bg-red-500 border-4 border-[#030816] rounded-full"></span>
        </div>
        <h3 class="text-4xl font-black text-white italic mb-2 uppercase tracking-tighter">Notifications</h3>
        <p class="text-gray-500 text-[10px] font-black uppercase tracking-[0.3em] mb-8 leading-relaxed">
            You have 1 new transmission <br> from the T Learn Pro system
        </p>
        
        <div class="space-y-4 mb-8">
            <div class="p-4 bg-white/5 border border-white/5 rounded-2xl text-left">
                <p class="text-[8px] font-black text-blue-500 uppercase mb-1">Welcome</p>
                <p class="text-white text-[11px] font-bold">Your account is active, Emmanuel. Start your first lesson today!</p>
            </div>
        </div>

        <button onclick="updateView('Overview')" class="w-full py-5 bg-white/5 border border-white/10 rounded-2xl font-black uppercase text-[10px] tracking-widest text-white hover:bg-white hover:text-black transition-all">
            Clear All Alerts
        </button>
    </div>
`,
    'Xt Pay': `
        <div class="max-w-md mx-auto content-card text-center">
            <i class="fas fa-wallet text-5xl text-green-500 mb-6"></i>
            <h3 class="text-4xl font-black text-white italic mb-2">Xt Pay</h3>
            <p class="text-gray-500 text-[10px] font-black uppercase tracking-[0.3em] mb-8">Secure Student Wallet</p>
            <button class="w-full py-5 bg-green-600 rounded-2xl font-black uppercase text-[10px] tracking-widest">Withdraw Funds</button>
        </div>
    `,

    'Pricing': `
        <div class="content-card">
            <h3 class="text-2xl font-black text-white italic uppercase">Subscriptions</h3>
            <p class="text-gray-500 text-[10px] font-bold uppercase mt-2">Manage your T Learn Pro membership.</p>
        </div>
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
                    <div class="w-20 h-20 rounded-3xl bg-blue-600/20 border border-blue-500/20 flex items-center justify-center relative">
                        <i class="fas fa-user text-3xl text-blue-500"></i>
                        <button class="absolute -bottom-2 -right-2 w-8 h-8 bg-blue-600 rounded-xl flex items-center justify-center text-[10px] border-4 border-[#020617]">
                            <i class="fas fa-camera"></i>
                        </button>
                    </div>
                    <div>
                        <h4 data-user-name class="text-xl font-black text-white italic uppercase">Loading...</h4>
                        <p data-user-email class="text-[9px] font-black text-gray-500 uppercase tracking-widest mt-1">Loading...</p>
                        <p class="text-[9px] font-black text-gray-500 uppercase tracking-widest">Student ID: TLP-2025-001</p>
                    </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="space-y-2">
                        <label class="text-[9px] font-black text-gray-500 uppercase ml-2">Full Name</label>
                        <input type="text" data-user-name-input class="settings-input" readonly>
                    </div>
                    <div class="space-y-2">
                        <label class="text-[9px] font-black text-gray-500 uppercase ml-2">Email Address</label>
                        <input type="email" data-user-email-input class="settings-input" readonly>
                    </div>
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
    
    greetingElement.innerText = `${greeting}, Emmanuel`;

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


  function updateSettingsTab(tabId) { // <-- FIXED: was tabName, now tabId
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
                    <i class="fas fa-user text-5xl text-blue-500/50"></i>
                </div>
                <div class="absolute -bottom-2 -right-2 bg-blue-600 w-8 h-8 rounded-xl flex items-center justify-center border-4 border-[#020617] cursor-pointer">
                    <i class="fas fa-camera text-[10px]"></i>
                </div>
            </div>
            <div>
                <h3 data-user-name class="text-2xl font-black text-white italic uppercase leading-none">Loading...</h3>
                <p class="text-[10px] font-black text-blue-500 uppercase tracking-widest mt-2">Node Level: Beginner</p>
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
    <div class="space-y-8 animate-in">
        <div class="space-y-6">
            <div>
                <h3 class="text-xl font-black text-white italic uppercase tracking-tighter">Project Management</h3>
                <p class="text-[9px] text-gray-500 font-bold uppercase tracking-widest mt-1">Manage and bulk delete your projects</p>
            </div>

            <div class="relative group">
                <i class="fas fa-search absolute left-5 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-blue-500 transition-colors"></i>
                <input type="text" 
                       placeholder="SEARCH REPOSITORY BY NAME, TAG, OR TECH STACK..." 
                       class="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-14 pr-6 text-[10px] font-black text-white placeholder-gray-700 uppercase tracking-widest outline-none focus:border-blue-500/50 focus:bg-blue-500/5 transition-all">
            </div>
            
            <div class="flex items-center gap-3">
                <button class="px-5 py-2 bg-white/5 rounded-lg border border-white/5 text-[8px] font-black text-gray-500 uppercase hover:text-white transition-colors">
                    Select All
                </button>
                <button class="px-5 py-2 bg-red-500/5 rounded-lg border border-red-500/10 text-[8px] font-black text-red-500/40 uppercase cursor-not-allowed">
                    Bulk Delete (0)
                </button>
            </div>
        </div>

        <div id="projectContainer" class="min-h-[300px] flex flex-col items-center justify-center text-center border-2 border-dashed border-white/5 rounded-[2rem] px-6">
            <div class="w-16 h-16 bg-blue-600/5 rounded-2xl flex items-center justify-center mb-6 rotate-3">
                <i class="fas fa-folder-open text-2xl text-blue-500/20"></i>
            </div>
            <h4 class="text-white font-black uppercase italic tracking-tighter text-lg">Repository Empty</h4>
            <p class="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-2 max-w-[280px] leading-relaxed">
                No archived projects match your current system state. <br>
                <span class="text-blue-500/50">Awaiting your first deployment.</span>
            </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="p-6 bg-[#030816] border border-white/5 rounded-[1.5rem] flex items-center gap-5">
                <div class="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-500">
                    <i class="fas fa-microchip text-xs"></i>
                </div>
                <div>
                    <p class="text-[9px] font-black text-white uppercase">Cloud Hosting</p>
                    <p class="text-[8px] text-gray-600 font-bold uppercase mt-1">Projects auto-deploy to edge nodes.</p>
                </div>
            </div>
            <div class="p-6 bg-[#030816] border border-white/5 rounded-[1.5rem] flex items-center gap-5">
                <div class="w-10 h-10 bg-purple-500/10 rounded-xl flex items-center justify-center text-purple-500">
                    <i class="fas fa-terminal text-xs"></i>
                </div>
                <div>
                    <p class="text-[9px] font-black text-white uppercase">Build History</p>
                    <p class="text-[8px] text-gray-600 font-bold uppercase mt-1">Failed builds auto-purge after 30 days.</p>
                </div>
            </div>
        </div>
    </div>`,

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
