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
        <div class="content-card">
            <h3 class="text-2xl font-black text-white italic uppercase">Project Repository</h3>
            <p class="text-gray-500 text-[10px] font-bold uppercase mt-2">Manage your active builds here.</p>
        </div>
    `,

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
        <div class="content-card">
            <h3 class="text-2xl font-black text-white italic uppercase">Account Settings</h3>
            <p class="text-gray-500 text-[10px] font-bold uppercase mt-2">Privacy, Password, and Profile.</p>
        </div>
    `
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