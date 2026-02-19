/* ── T LEARN PRO: modules/ui.js ── */
/* Menu, header, date/time, settings tab UI */

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
<div class="max-w-4xl mx-auto p-4">
        <h2 class="text-white font-black text-2xl uppercase mb-8">Management</h2>
        <div id="settingsProjectList" class="space-y-4">
            </div>
    </div>
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
<div class="space-y-8 animate-in" id="historyMainContainer">
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
            <h3 class="text-xl font-black text-white italic uppercase tracking-tighter">Login History</h3>
            <p class="text-[9px] text-gray-500 font-bold uppercase tracking-widest mt-1">
                Monitor your account security and active sessions
            </p>
        </div>
        <div class="px-4 py-2 bg-blue-600/5 border border-blue-500/10 rounded-xl text-right">
            <p class="text-[8px] font-black text-blue-500 uppercase tracking-widest">System Live Time</p>
            <p id="liveHistoryClock" class="text-[10px] text-white font-black uppercase italic mt-1">Loading...</p>
        </div>
    </div>

    <!-- Placeholder – must have this ID -->
    <div id="noRecordsPlaceholder" class="border-2 border-dashed border-white/5 rounded-[2rem] py-20 flex flex-col items-center justify-center text-center">
        <div class="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-6">
            <i class="fas fa-shield-virus text-2xl text-gray-800"></i>
        </div>
        <h4 class="text-white font-black uppercase italic tracking-tighter text-lg">NO SESSION RECORDS</h4>
        <p class="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-2 max-w-[280px] leading-relaxed">
            Security logs are currently clear.<br>
            Your dashboard access today will appear here.
        </p>
    </div>

    <!-- Entries container – must have this ID and start hidden -->
    <div id="historyEntries" class="space-y-4 hidden"></div>

    <!-- Security note stays always visible -->
    <div class="p-6 bg-[#030816] border border-white/5 rounded-2xl">
        <div class="flex items-center gap-4 text-orange-500 mb-2">
            <i class="fas fa-exclamation-triangle text-xs"></i>
            <p class="text-[10px] font-black uppercase">Security Protocol</p>
        </div>
        <p class="text-[9px] text-gray-500 font-bold uppercase leading-relaxed">
            T Learn Pro tracks IP addresses and device fingerprints to protect your Xt Pay wallet from unauthorized access.<br>
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

