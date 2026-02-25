#!/bin/bash
# ============================================================
# T-Learn Pro — Overview Fix Install
# Fixes: Overview showing "Under Development" + Supabase client
# Run from inside your T-learn-Pro-Beta/ folder
# Usage: bash install_overview_fix.sh
# ============================================================
set -e
GREEN='\033[0;32m'; BLUE='\033[0;34m'; YELLOW='\033[1;33m'; RED='\033[0;31m'; NC='\033[0m'

echo ""
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}  T-LEARN PRO — Overview Fix${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

if [ ! -d "js" ] || [ ! -d "pages" ]; then
  echo -e "${RED}ERROR: Run this from inside T-learn-Pro-Beta/${NC}"
  exit 1
fi

echo -e "${YELLOW}[1/3] Backing up originals...${NC}"
cp pages/dashboard.html     pages/dashboard.html.bak     && echo -e "  ${GREEN}✓${NC} dashboard.html.bak"
cp js/dashboard.js          js/dashboard.js.bak          && echo -e "  ${GREEN}✓${NC} dashboard.js.bak"
cp js/modules/overview.js   js/modules/overview.js.bak   && echo -e "  ${GREEN}✓${NC} modules/overview.js.bak"
cp js/modules/settings.js   js/modules/settings.js.bak   && echo -e "  ${GREEN}✓${NC} modules/settings.js.bak"

echo ""
echo -e "${YELLOW}[2/3] Writing fixed files...${NC}"

cat > "pages/dashboard.html" << 'FIX_PAGES_DASHBOARD_HTML'
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard | T Learn Pro</title>
    <!-- LOCAL TAILWIND (was CDN — removed network roundtrip + render-blocking) -->
    <script src="../js/tailwind.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css">

    <link rel="stylesheet" href="../css/dashboard.css">
    <link rel="icon" type="image/png" href="../assets/Logo.webp" />

    <script src="../js/config.js"></script>
    <script src="../js/supabase-loader.js"></script>
    <script src="../js/messages.js"></script>
    <script src="../js/utilities.js"></script>
<script>
    // Declare views object early so all defer view scripts can populate it
    // dashboard.js declares `const views = {}` but runs after views/*.js
    // This guard ensures views exists before any view file runs
    window.views = window.views || {};
</script>

    <style>
        /* Unified Animations */
        @keyframes scan-line {
            0% { transform: translateY(-100%); }
            100% { transform: translateY(100%); }
        }
        @keyframes shimmer-move {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
        }
        @keyframes fall {
            from { transform: translateY(-10vh) translateX(0) rotate(0deg); opacity: 0; }
            20% { opacity: 1; }
            to { transform: translateY(110vh) translateX(40px) rotate(360deg); opacity: 0; }
        }
        
        .animate-scan { animation: scan-line 3s linear infinite; }
        .animate-shimmer-fast { animation: shimmer-move 1.5s infinite; }
        .animate-shimmer-slow { animation: shimmer-move 2s infinite; }
        .star { position: absolute; background: white; border-radius: 50%; pointer-events: none; animation: fall linear infinite; }
        
        /* Navigation Enhancement Classes */
        .nav-item {
            @apply relative flex items-center gap-4 px-6 py-3 text-sm font-medium text-gray-400 transition-all duration-300 cursor-pointer overflow-hidden border-y border-transparent;
        }
        .nav-item i { @apply text-base w-5 transition-transform duration-300; }
        .nav-item:hover { @apply bg-white/5 text-white; }
        .nav-indicator { @apply absolute left-0 w-1 h-0 bg-blue-600 transition-all duration-300 rounded-r-full; }
        .nav-item:hover .nav-indicator, .nav-item.active .nav-indicator { @apply h-6; }
        .nav-item.active { @apply bg-blue-500/10 text-blue-400 border-y-white/5; }
        .nav-item.active .nav-indicator { @apply h-6 shadow-[0_0_15px_#3b82f6]; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        * { -webkit-tap-highlight-color: transparent; }
    </style>
</head>
<body class="bg-[#020617] text-gray-200 font-sans">

<header class="lg:hidden sticky top-0 z-[100] w-full bg-[#020617]/80 backdrop-blur-xl border-b border-white/10 px-6 py-4 flex items-center justify-between">
    <div class="flex items-center gap-4">
        <div class="relative">
            <div class="absolute -inset-1 bg-blue-500/20 blur-md rounded-full"></div>
            <img alt="logo" src="../assets/Logo.webp" class="relative w-9 h-9 rounded-xl border border-white/10 shadow-lg">
        </div>
        <div class="flex flex-col">
            <h1 class="text-base font-[1000] tracking-tighter text-white leading-none uppercase italic">
                T-LEARN <span class="text-blue-500">PRO</span>
            </h1>
            <div class="flex items-center gap-2 mt-1">
                <span class="text-[8px] font-black uppercase tracking-[0.3em] text-blue-400/70">EST 2026</span>
                <div class="h-[2px] w-8 bg-white/5 rounded-full overflow-hidden">
                    <div class="h-full w-full bg-blue-600 animate-shimmer-fast"></div>
                </div>
            </div>
        </div>
    </div>
    <div class="flex items-center gap-2">
        <div class="hidden xs:flex items-center gap-1.5 px-2 py-1 rounded-md bg-white/5 border border-white/5 mr-2">
            <div class="w-1 h-1 bg-emerald-500 rounded-full animate-pulse"></div>
            <span class="text-[7px] font-bold text-gray-500 uppercase tracking-widest">Live</span>
        </div>
        <button onclick="updateView('Notifications')" class="relative w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 active:scale-90 transition-transform">
            <i class="fa-regular fa-bell text-lg text-gray-300"></i>
            <span class="absolute top-2.5 right-2.5 flex h-2 w-2">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span class="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
            </span>
        </button>
    </div>
</header>

<aside id="sidebar" class="fixed inset-y-0 left-0 w-72 bg-[#020617] border-r border-white/5 p-8 hidden lg:flex flex-col z-[60]">
    <div class="flex items-center gap-6 mb-12 group">
        <div class="relative flex-shrink-0">
            <div class="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl blur opacity-20 group-hover:opacity-50 transition duration-1000 animate-pulse"></div>
            <div class="relative flex items-center justify-center w-14 h-14 bg-[#050b1d] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
                <img alt="logo" src="../assets/Logo.webp" class="w-10 h-10 object-contain z-10 transition-transform duration-500 group-hover:scale-110">
                <div class="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/10 to-transparent h-full w-full animate-scan"></div>
            </div>
        </div>
        <div class="flex flex-col">
            <h2 class="text-2xl font-[1000] tracking-[-0.05em] text-white leading-none uppercase italic">
                T-LEARN <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 font-black">PRO</span>
            </h2>
            <div class="flex items-center gap-3 mt-2">
                <span class="text-[10px] font-black text-gray-500 uppercase tracking-[0.5em]">V. <span class="text-blue-500/80">2026</span></span>
                <div class="relative h-[2px] w-20 bg-white/5 overflow-hidden rounded-full">
                    <div class="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500 to-transparent animate-shimmer-slow"></div>
                </div>
            </div>
        </div>
    </div>

    <nav class="flex-1 space-y-6 overflow-y-auto no-scrollbar pb-20">
        <div class="space-y-1">
            <p class="text-[9px] font-black text-gray-600 uppercase tracking-[0.3em] mb-4 ml-4">Academy</p>
            <a onclick="updateView('Overview')" class="nav-item active"><div class="nav-indicator"></div><i class="fas fa-home"></i> Overview</a>
            <a onclick="updateView('Lessons')" class="nav-item"><div class="nav-indicator"></div><i class="fas fa-book-open"></i> Lessons</a>
            <a onclick="updateView('Projects')" class="nav-item"><div class="nav-indicator"></div><i class="fas fa-code-branch"></i> Projects</a>
            <a onclick="updateView('Leaderboard')" class="nav-item"><div class="nav-indicator"></div><i class="fas fa-trophy"></i> Leaderboard</a>
        </div>

        <div class="space-y-1">
            <p class="text-[9px] font-black text-gray-600 uppercase tracking-[0.3em] mb-4 ml-4">Community</p>
            <a onclick="updateView('Collaboration')" class="nav-item"><div class="nav-indicator"></div><i class="fas fa-handshake"></i> Collaboration</a>
            <a onclick="updateView('Team')" class="nav-item"><div class="nav-indicator"></div><i class="fas fa-users"></i> Team</a>
            <a onclick="updateView('Inbox')" class="nav-item"><div class="nav-indicator"></div><i class="fas fa-envelope"></i> Inbox</a>
        </div>

        <div class="space-y-1">
            <p class="text-[9px] font-black text-gray-600 uppercase tracking-[0.3em] mb-4 ml-4">Innovation</p>
            <a onclick="updateView('Nxxt AI')" class="nav-item text-blue-400 font-black"><div class="nav-indicator !bg-blue-400"></div><i class="fas fa-robot"></i> Nxxt AI</a>
            <a onclick="updateView('Nxxt Lab')" class="nav-item"><div class="nav-indicator"></div><i class="fas fa-flask"></i> Nxxt Lab</a>
            <a onclick="updateView('Side Hustle Hub')" class="nav-item text-orange-400"><div class="nav-indicator !bg-orange-400"></div><i class="fas fa-rocket"></i> Side Hustle Hub</a>
            <a onclick="updateView('Deploy')" class="nav-item text-green-500 hover:text-green-400 cursor-pointer"><div class="nav-indicator !bg-green-500"></div><i class="fas fa-cloud-upload-alt"></i> Deploy</a>
        </div>

        <div class="space-y-1">
            <p class="text-[9px] font-black text-gray-600 uppercase tracking-[0.3em] mb-4 ml-4">Account</p>
            <a onclick="updateView('Xt Pay')" class="nav-item text-green-500"><div class="nav-indicator !bg-green-500"></div><i class="fas fa-wallet"></i> Xt Pay</a>
            <a onclick="updateView('Pricing')" class="nav-item"><div class="nav-indicator"></div><i class="fas fa-tags"></i> Pricing</a>
            <a onclick="updateView('Settings')" class="nav-item"><div class="nav-indicator"></div><i class="fas fa-sliders"></i> Settings</a>
        </div>
    </nav>

    <div class="mt-auto pt-6 border-t border-white/5">
        <div class="flex items-center gap-4 px-2 py-2">
            <div class="relative">
                <img src="../assets/Logo.webp" data-user-img data-user-name-alt alt="User" class="w-11 h-11 rounded-xl object-cover border border-white/10 shadow-lg">
                <span class="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-[#020617] rounded-full"></span>
            </div>
            <div class="flex flex-col min-w-0">
                <p data-user-name class="text-white font-bold text-sm italic uppercase">Loading...</p>
                <span class="text-[8px] font-bold text-blue-500 uppercase tracking-[0.2em] flex items-center gap-1">
                    <i class="fas fa-leaf text-[7px]"></i> Beginner
                </span>
            </div>
            <button onclick="handleLogout()" class="ml-auto text-gray-600 hover:text-red-500 transition-colors" title="Logout">
                <i class="fas fa-sign-out-alt text-[10px]"></i>
            </button>
        </div>
    </div>
</aside>

<main class="lg:ml-72 p-6 md:p-12 pb-32 lg:pb-12 min-h-screen">
    <header class="mb-12 flex justify-between items-end">
        <div>
            <span id="greetingText" class="text-[10px] font-black text-blue-500 uppercase tracking-[0.3em] mb-2 block">Initializing...</span>
            <h1 id="viewTitle" class="text-5xl font-black text-white italic tracking-tighter uppercase">Overview</h1>
        </div>
        <div class="hidden lg:flex items-center gap-6">
            <button onclick="updateView('Notifications')" class="relative p-3 bg-white/5 rounded-xl border border-white/10 text-gray-400 hover:text-white transition-all">
                <i class="fa-regular fa-bell text-xl"></i>
                <span class="absolute top-2 right-2 w-2 h-2 bg-blue-600 rounded-full animate-pulse"></span>
            </button>
            <div class="flex items-center gap-4">
                <div class="text-right">
                    <p data-user-name class="text-white font-bold text-sm italic uppercase">Loading...</p>
                    <p id="currentDate" class="text-[9px] text-gray-500 font-bold uppercase tracking-widest">Loading...</p>
                </div>
                <div class="w-12 h-12 bg-white/5 rounded-2xl border border-white/10 flex items-center justify-center overflow-hidden">
                    <i class="fas fa-user-graduate text-blue-500"></i>
                </div>
            </div>
        </div>
    </header>

    <div id="mobileMenu" class="fixed inset-0 z-[200] invisible">
        <div id="menuOverlay" class="absolute inset-0 bg-[#020617]/90 backdrop-blur-md opacity-0 transition-opacity duration-300"></div>
        <div id="menuDrawer" class="absolute inset-y-0 left-0 w-[80%] max-w-sm bg-[#030816] border-r border-white/5 p-8 transform -translate-x-full transition-transform duration-300 ease-out flex flex-col">
            <div class="flex items-center justify-between mb-12">
                <div class="flex items-center gap-3">
                    <img alt="logo" src="../assets/Logo.webp" data-user-img class="w-8 h-8 rounded-lg object-cover border border-white/5">
                    <h2 class="text-lg font-black tracking-tighter text-white">MENU</h2>
                </div>
                <button onclick="closeFullMenu()" class="text-gray-500 hover:text-white">
                    <i class="fas fa-times text-xl"></i>
                </button>
            </div>
            <nav id="mobileNavLinks" class="flex-1 space-y-4 overflow-y-auto no-scrollbar pb-10"></nav>
            <div class="mt-auto pt-6 border-t border-white/5 text-center">
                <p class="text-[8px] font-black text-gray-700 uppercase tracking-widest">T Learn Pro v1.0</p>
            </div>
        </div>
    </div>

    <div id="alertModal" class="fixed inset-0 z-[999] flex items-center justify-center invisible p-6">
        <div id="alertOverlay" class="absolute inset-0 bg-black/60 backdrop-blur-sm opacity-0 transition-opacity duration-300"></div>
        <div id="alertBox" class="relative bg-[#030816] border border-white/10 p-8 rounded-[2.5rem] max-w-sm w-full text-center transform scale-90 opacity-0 transition-all duration-300 shadow-2xl">
            <div id="alertIcon" class="w-16 h-16 bg-blue-600/20 rounded-2xl flex items-center justify-center mx-auto mb-6 text-blue-500">
                <i class="fas fa-check text-2xl"></i>
            </div>
            <h3 id="alertTitle" class="text-xl font-black text-white italic uppercase tracking-tighter">System Alert</h3>
            <p id="alertMsg" class="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-2 leading-relaxed"></p>
            <button onclick="closeAlert()" class="mt-8 w-full py-4 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest text-white hover:bg-white hover:text-black transition-all">
                Dismiss
            </button>
        </div>
    </div>

    <div id="payment-modal" class="fixed top-0 right-0 h-full w-full md:w-[400px] bg-[#050b1d] border-l border-white/10 z-[2000000] translate-x-full transition-transform duration-500 ease-in-out shadow-[-20px_0_50px_rgba(0,0,0,0.5)] flex flex-col">
        <div class="p-8 border-b border-white/5 flex items-center justify-between">
            <h3 class="text-white font-black uppercase italic tracking-tighter text-xl">Payment Gateway</h3>
            <button onclick="closePaymentModal()" class="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-red-500 transition-all">
                <i class="fas fa-times"></i>
            </button>
        </div>
        <div class="flex-grow flex flex-col items-center justify-center p-10 text-center">
            <div class="w-24 h-24 bg-blue-600/10 rounded-[2.5rem] flex items-center justify-center mb-8 border border-blue-500/20 animate-pulse">
                <i class="fas fa-microchip text-blue-500 text-4xl"></i>
            </div>
            <h4 id="active-plan-title" class="text-blue-400 font-black uppercase italic text-sm tracking-widest mb-2">Initialize Protocol</h4>
            <h2 class="text-white font-black uppercase text-2xl tracking-tighter mb-6">Working on payment gateway</h2>
            <p class="text-gray-500 text-[10px] font-bold uppercase tracking-[0.3em] leading-relaxed">
                Our secure transaction layer is currently being synchronized with global banking nodes.
                <br><br>
                <span class="text-blue-500/50">Check back later for full deployment.</span>
            </p>
        </div>
        <div class="p-8 bg-black/20">
            <div class="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-dashed border-white/10 mb-6">
                <i class="fas fa-shield-check text-green-500"></i>
                <p class="text-[8px] text-gray-500 font-black uppercase tracking-widest">Encrypted SSL V3 Active</p>
            </div>
            <button onclick="closePaymentModal()" class="w-full py-5 bg-white text-black rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all">
                Acknowledge
            </button>
        </div>
    </div>


    <div id="centralModal" class="hidden fixed inset-0 z-[999] flex items-center justify-center bg-black/80 backdrop-blur-sm">
    <div class="bg-[#0a0a0a] border border-blue-500/30 p-8 rounded-[2rem] text-center max-w-[280px] shadow-[0_0_50px_rgba(37,99,235,0.2)]">
        <div class="w-12 h-12 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <i class="fas fa-shield-halved text-blue-500 text-xl"></i>
        </div>
        <h2 class="text-white font-black text-[10px] tracking-widest uppercase mb-2">System Alert</h2>
        <p id="modalText" class="text-white/60 font-mono text-[11px] leading-relaxed mb-6"></p>
        <button onclick="closeModal()" class="w-full py-3 bg-blue-600 text-white text-[10px] font-bold rounded-xl hover:bg-blue-500 transition-colors uppercase tracking-widest">
            Acknowledge
        </button>
    </div>
</div>
    <div id="dynamicContent" class="space-y-8 animate-in"></div>
</main>

    
<div class="lg:hidden fixed bottom-6 left-0 w-full px-4 z-[100]">
    <nav class="mx-auto max-w-md bg-[#050b1d]/80 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] px-6 py-3 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex justify-between items-center relative overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-t from-blue-500/5 to-transparent pointer-events-none"></div>
        <button onclick="updateView('Overview')" class="relative flex flex-col items-center gap-1 group transition-all duration-300">
            <div class="absolute -top-3 w-4 h-1 bg-blue-500 rounded-full shadow-[0_0_10px_#3b82f6] opacity-100"></div>
            <i class="fas fa-home text-lg text-blue-500"></i>
            <span class="text-[7px] font-black uppercase tracking-widest text-blue-500">Node</span>
        </button>
        <button onclick="updateView('Lessons')" class="relative flex flex-col items-center gap-1 group transition-all duration-300">
            <i class="fas fa-book-open text-lg text-gray-500 group-hover:text-white"></i>
            <span class="text-[7px] font-black uppercase tracking-widest text-gray-500 group-hover:text-white">Learn</span>
        </button>
        <button onclick="updateView('Nxxt AI')" class="relative flex flex-col items-center transition-all duration-500 hover:-translate-y-1">
            <div class="relative">
                <div class="absolute inset-0 rounded-full bg-blue-600 animate-ping opacity-20"></div>
                <div class="relative w-14 h-14 bg-gradient-to-tr from-blue-700 via-blue-500 to-cyan-400 rounded-2xl flex items-center justify-center shadow-[0_0_25px_rgba(59,130,246,0.5)] border border-white/20 rotate-45 group">
                    <i class="fas fa-robot text-white text-xl -rotate-45 group-hover:scale-110 transition-transform"></i>
                </div>
            </div>
            <span class="text-[7px] font-black uppercase mt-2 tracking-[0.2em] text-cyan-400 animate-pulse">Nxxt AI</span>
        </button>
        <button onclick="openFullMenu()" class="relative flex flex-col items-center gap-1 group transition-all duration-300">
            <i class="fas fa-bars-staggered text-lg text-gray-500 group-hover:text-white"></i>
            <span class="text-[7px] font-black uppercase tracking-widest text-gray-500 group-hover:text-white">Menu</span>
        </button>
        <button onclick="updateView('Xt Pay')" class="relative flex flex-col items-center gap-1 group transition-all duration-300">
            <i class="fas fa-wallet text-lg text-gray-500 group-hover:text-emerald-400"></i>
            <span class="text-[7px] font-black uppercase tracking-widest text-gray-500 group-hover:text-emerald-400">Vault</span>
        </button>
       
    </nav>
</div>

<!-- ── VIEWS (HTML templates, must load before dashboard.js) ── -->
<script src="../js/views/overview.js" defer></script>
<script src="../js/views/lessons.js" defer></script>
<script src="../js/views/projects-view.js" defer></script>
<script src="../js/views/leaderboard.js" defer></script>
<script src="../js/views/collaboration.js" defer></script>
<script src="../js/views/team.js" defer></script>
<script src="../js/views/inbox.js" defer></script>
<script src="../js/views/nxxtai.js" defer></script>
<script src="../js/views/nxxtlab.js" defer></script>
<script src="../js/views/sidehustlehub.js" defer></script>
<script src="../js/views/notifications.js" defer></script>
<script src="../js/views/xtpay.js" defer></script>
<script src="../js/views/pricing.js" defer></script>
<script src="../js/views/settings.js" defer></script>

<!-- ── DATA ── -->
<script src="../js/curriculum.js" defer></script>

<!-- ── LOGIC MODULES ── -->
<script src="../js/modules/overview.js" defer></script>
<script src="../js/modules/ui.js" defer></script>
<script src="../js/modules/settings.js" defer></script>
<script src="../js/modules/lms.js" defer></script>
<script src="../js/modules/proj.js" defer></script>
<script src="../js/modules/nxxtai.js" defer></script>

<!-- ── CORE (router + ActivityEngine — loads last, kicks off the app) ── -->
<script src="../js/dashboard.js" defer></script>
<script src="../js/Overview.js" defer></script>
<script src="../js/auth.js" defer></script>
<script src="../js/projects.js" defer></script>
<script src="../js/history.js" defer></script>
<script src="//code.jivosite.com/widget/7O7rWauHwt" async></script>

<script>
// This prevents the default Jivo button from showing up and overlapping James
function jivo_onLoadCallback() {
    jivo_api.hideRegistrationForm();
}
    // Function to hide JivoChat elements unless the chat is actually open
function enforceJamesUplink() {
    const jivoElements = document.querySelectorAll('.jivo-iframe-container, [class^="jivo-"], #jivo-iframe-container');
    jivoElements.forEach(el => {
        // Only show if the body has the 'jivo-chat-open' class (meaning James called them)
        if (!document.body.classList.contains('jivo-chat-open')) {
            el.style.display = 'none';
            el.style.opacity = '0';
            el.style.pointerEvents = 'none';
        } else {
            el.style.display = 'block';
            el.style.opacity = '1';
            el.style.pointerEvents = 'auto';
        }
    });
}

// Run every time the DOM changes to catch Jivo trying to sneak back in
const observer = new MutationObserver(enforceJamesUplink);
observer.observe(document.body, { childList: true, subtree: true });
</script>
</body>
</html>


FIX_PAGES_DASHBOARD_HTML
echo -e "  ${GREEN}✓${NC} pages/dashboard.html"

cat > "js/dashboard.js" << 'FIX_JS_DASHBOARD_JS'
const ActivityEngine = {
    track() {
        const today = new Date().toISOString().split('T')[0];
        setInterval(() => {
            let log = JSON.parse(localStorage.getItem('user_node_activity') || '{}');
            log[today] = (log[today] || 0) + 1; // Tracks seconds
            localStorage.setItem('user_node_activity', JSON.stringify(log));
        }, 60000); // FIX: was 1000ms (every second) — now 60000ms (every minute)
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

// ─────────────────────────────────────────────────────────────────────────────
// VIEWS — populated by js/views/*.js files loaded before this script
// Each view file does: views['Name'] = `...html...`;
// window.views is declared early in dashboard.html so view files can populate
// it before this script runs. We just reference it here, not redeclare it.
// ─────────────────────────────────────────────────────────────────────────────
const views = window.views;

// ─────────────────────────────────────────────────────────────────────────────
// ROUTER — FIX: view cache so HTML is only built once per visit
// ─────────────────────────────────────────────────────────────────────────────
const _viewCache = {};

function updateView(viewName) {
    const title     = document.getElementById('viewTitle');
    const container = document.getElementById('dynamicContent');

    container.style.opacity   = '0';
    container.style.transform = 'translateY(10px)';

    setTimeout(() => {
        title.innerText = viewName;

        // FIX: Views with live data must never be served from cache
        const NO_CACHE = ['Projects', 'Overview', 'Notifications', 'Settings'];
        const useCache = !NO_CACHE.includes(viewName);

        if (useCache && _viewCache[viewName]) {
            container.innerHTML = _viewCache[viewName];
        } else {
            container.innerHTML = views[viewName] || `
                <div class="content-card text-center py-20">
                    <i class="fas fa-tools text-4xl text-blue-500/20 mb-6"></i>
                    <h3 class="text-2xl font-black text-white italic uppercase tracking-tighter">${viewName} Module</h3>
                    <p class="text-gray-500 text-[10px] font-black uppercase tracking-widest mt-2">Under Development</p>
                </div>
            `;
            if (useCache) _viewCache[viewName] = container.innerHTML;
        }

        container.style.opacity   = '1';
        container.style.transform = 'translateY(0px)';

        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.toggle('active', item.innerText.includes(viewName));
        });

        // Overview — full engine init (stats, nebula, streak, XP)
        if (viewName === 'Overview') {
            requestAnimationFrame(() => {
                if (typeof initOverview === 'function') initOverview();
            });
        }

        // FIX: lazy-init LMS — only when on Lessons tab
        if (viewName === 'Lessons') {
            requestAnimationFrame(() => {
                if (typeof initLMS === 'function') initLMS();
            });
        }

        // FIX: Projects — always reload from localStorage and re-render on every visit
        if (viewName === 'Projects') {
            requestAnimationFrame(() => {
                loadProjects();
                updateUI();
            });
        }

        // FIX: Settings — re-render project list when Settings tab opens
        if (viewName === 'Settings') {
            requestAnimationFrame(() => {
                updateSettingsTab('Profile');
                syncProfileUI();
            });
        }

        // Xt Pay build stream — lazy start
        if (viewName === 'Xt Pay') {
            requestAnimationFrame(() => {
                if (typeof NxxtDashboard !== 'undefined') {
                    // FIX: now called lazily when user opens Xt Pay tab (see updateView)
                }
            });
        }

    }, 200);
}

// renderTab was called in Notifications view but never defined — now aliased
const renderTab = updateView;

// Initial Setup — wait for all defer scripts to finish before rendering
window.addEventListener('DOMContentLoaded', () => {
    const d = new Date();
    const dateEl = document.getElementById('currentDate');
    if (dateEl) dateEl.innerText = d.toLocaleDateString('en-US', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });
    // Small delay so all defer view scripts have populated the views object
    setTimeout(() => updateView('Overview'), 50);
});


FIX_JS_DASHBOARD_JS
echo -e "  ${GREEN}✓${NC} js/dashboard.js"

cat > "js/modules/overview.js" << 'FIX_JS_MODULES_OVERVIEW_JS'
/* ── T LEARN PRO: js/modules/overview.js ────────────────────────────────────
   Overview Engine — powers ALL live stats on the Overview tab
   Handles: XT Points, Streak, Rank, Level, Semester, Activity Nebula canvas
   Syncs with Supabase profiles + activity_log + xp_events tables
────────────────────────────────────────────────────────────────────────────── */

// ─── SUPABASE CLIENT HELPER ──────────────────────────────────────────────────
// Uses the project's existing supabaseLoader (matches auth.js pattern)
async function getSupabaseClient() {
    if (window._sbClient) return window._sbClient;
    window._sbClient = await window.supabaseLoader.load();
    return window._sbClient;
}

// ─── 1. LOAD PROFILE FROM SUPABASE ──────────────────────────────────────────
// Pulls xt_points, streak, level, semester, rank from DB and updates all cards
async function loadOverviewStats() {
    try {
        const client = await getSupabaseClient();
        const { data: { user } } = await client.auth.getUser();
        if (!user) return;

        // Get profile data
        const { data: profile, error } = await client
            .from('profiles')
            .select('xt_points, streak, level, semester')
            .eq('id', user.id)
            .single();

        if (error || !profile) {
            console.warn('[Overview] Profile load failed:', error?.message);
            return;
        }

        // Get user's rank from leaderboard view
        const { data: rankData } = await client
            .from('leaderboard')
            .select('rank')
            .eq('id', user.id)
            .single();

        const rank = rankData?.rank || 0;

        // Update all stat cards
        setEl('dash-xp-val',    profile.xt_points ?? 0);
        setEl('streakCount',    profile.streak ?? 0);
        setEl('dash-level-val', profile.level ?? 100);
        setEl('semesterVal',    String(profile.semester ?? 1).padStart(3, '0'));
        setEl('rankVal',        `#${rank}`);

        // Cache locally for instant re-renders
        localStorage.setItem('tlp_profile', JSON.stringify({
            xt_points: profile.xt_points,
            streak:    profile.streak,
            level:     profile.level,
            semester:  profile.semester,
            rank
        }));

        console.log('[Overview] Stats loaded:', profile, 'Rank:', rank);
        updateOverviewUI(profile, rank);

    } catch (err) {
        console.error('[Overview] loadOverviewStats error:', err);

        // Fallback: use cached local data if Supabase fails
        const cached = JSON.parse(localStorage.getItem('tlp_profile') || '{}');
        if (cached.xt_points !== undefined) {
            setEl('dash-xp-val',    cached.xt_points);
            setEl('streakCount',    cached.streak);
            setEl('dash-level-val', cached.level);
            setEl('semesterVal',    String(cached.semester).padStart(3, '0'));
            setEl('rankVal',        `#${cached.rank}`);
        }
    }
}

// ─── 2. XT POINTS EARN ENGINE ────────────────────────────────────────────────
// Call awardXP(eventType) from anywhere in the app to give points
const XP_TABLE = {
    register:         10,
    daily_login:       5,
    complete_lesson:  10,
    pass_exam:        30,
    add_project:      30,
    hourly_active:    20,
};

async function awardXP(eventType) {
    const points = XP_TABLE[eventType];
    if (!points) return console.warn('[XP] Unknown event:', eventType);

    try {
        const client = await getSupabaseClient();
        const { data: { user } } = await client.auth.getUser();
        if (!user) return;

        // Log xp event
        await client.from('xp_events').insert({
            user_id:    user.id,
            event_type: eventType,
            points
        });

        // Increment xt_points on profile
        const { data: profile } = await client
            .from('profiles')
            .select('xt_points')
            .eq('id', user.id)
            .single();

        const newPoints = (profile?.xt_points || 0) + points;

        await client
            .from('profiles')
            .update({ xt_points: newPoints })
            .eq('id', user.id);

        // Update UI instantly without full reload
        setEl('dash-xp-val', newPoints);

        // Update local cache
        const cached = JSON.parse(localStorage.getItem('tlp_profile') || '{}');
        cached.xt_points = newPoints;
        localStorage.setItem('tlp_profile', JSON.stringify(cached));

        console.log(`[XP] +${points} for "${eventType}" → total: ${newPoints}`);

        // Leaderboard bonus check
        await checkLeaderboardBonus(user.id, newPoints);

    } catch (err) {
        console.error('[XP] awardXP error:', err);
    }
}

// Hourly active timer — fires every 60 mins while user is on dashboard
let _hourlyXPTimer = null;
function startHourlyXPTimer() {
    if (_hourlyXPTimer) return; // already running
    _hourlyXPTimer = setInterval(() => {
        if (document.visibilityState === 'visible') {
            awardXP('hourly_active');
            console.log('[XP] Hourly active award fired');
        }
    }, 60 * 60 * 1000); // every 60 minutes
}

// ─── 3. DAILY LOGIN + STREAK ENGINE ─────────────────────────────────────────
async function recordDailyLogin() {
    try {
        const client = await getSupabaseClient();
        const { data: { user } } = await client.auth.getUser();
        if (!user) return;

        const today = new Date().toISOString().split('T')[0];
        const lastLogin = localStorage.getItem('tlp_last_login');

        // Already recorded today
        if (lastLogin === today) {
            console.log('[Login] Already recorded today');
            return;
        }

        // Award daily login XP
        await awardXP('daily_login');

        // Log into activity_log
        await client.from('activity_log').upsert({
            user_id:  user.id,
            log_date: today,
            actions:  1
        }, { onConflict: 'user_id,log_date' });

        // Calculate streak
        await updateStreak(user.id, today, lastLogin);

        localStorage.setItem('tlp_last_login', today);
        console.log('[Login] Daily login recorded:', today);

    } catch (err) {
        console.error('[Login] recordDailyLogin error:', err);
    }
}

async function updateStreak(userId, today, lastLogin) {
    try {
        const client = await getSupabaseClient();

        const { data: profile } = await client
            .from('profiles')
            .select('streak')
            .eq('id', userId)
            .single();

        let currentStreak = profile?.streak || 0;
        let newStreak = 1;

        if (lastLogin) {
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            const yesterdayStr = yesterday.toISOString().split('T')[0];

            if (lastLogin === yesterdayStr) {
                // Consecutive day — increment streak
                newStreak = currentStreak + 1;
            } else {
                // Missed a day — reset streak
                newStreak = 1;
            }
        }

        await client
            .from('profiles')
            .update({ streak: newStreak })
            .eq('id', userId);

        setEl('streakCount', newStreak);

        // Update local cache
        const cached = JSON.parse(localStorage.getItem('tlp_profile') || '{}');
        cached.streak = newStreak;
        localStorage.setItem('tlp_profile', JSON.stringify(cached));

        console.log('[Streak] Updated to:', newStreak);

    } catch (err) {
        console.error('[Streak] updateStreak error:', err);
    }
}

// ─── 4. LEADERBOARD BONUS ────────────────────────────────────────────────────
async function checkLeaderboardBonus(userId, currentPoints) {
    try {
        const client = await getSupabaseClient();
        const { data: rankData } = await client
            .from('leaderboard')
            .select('rank')
            .eq('id', userId)
            .single();

        const rank = rankData?.rank;
        if (!rank) return;

        const bonusKey = `tlp_bonus_${new Date().toISOString().split('T')[0]}`;
        const alreadyAwarded = localStorage.getItem(bonusKey);

        if (!alreadyAwarded) {
            let bonus = 0;
            if (rank <= 5)  bonus = 200;
            else if (rank <= 10) bonus = 100;

            if (bonus > 0) {
                await client.from('profiles')
                    .update({ xt_points: currentPoints + bonus })
                    .eq('id', userId);

                await client.from('xp_events').insert({
                    user_id:    userId,
                    event_type: `leaderboard_top${rank <= 5 ? '5' : '10'}_bonus`,
                    points:     bonus
                });

                localStorage.setItem(bonusKey, '1');
                console.log(`[XP] Leaderboard bonus +${bonus} for rank #${rank}`);
            }
        }

        // Update rank card
        setEl('rankVal', `#${rank}`);

    } catch (err) {
        console.error('[Rank] checkLeaderboardBonus error:', err);
    }
}

// ─── 5. ACTIVITY NEBULA CANVAS ───────────────────────────────────────────────
// Draws a 52-week GitHub-style grid on the #nebula canvas
async function drawActivityNebula() {
    const canvas = document.getElementById('nebula');
    if (!canvas) return;

    const ctx    = canvas.getContext('2d');
    const W      = canvas.offsetWidth;
    const H      = canvas.offsetHeight;
    canvas.width  = W;
    canvas.height = H;

    const WEEKS   = 52;
    const DAYS    = 7;
    const PADDING = { top: 28, left: 32, right: 16, bottom: 16 };
    const GAP     = 3;
    const cellW   = Math.floor((W - PADDING.left - PADDING.right - (WEEKS - 1) * GAP) / WEEKS);
    const cellH   = Math.floor((H - PADDING.top  - PADDING.bottom - (DAYS - 1)  * GAP) / DAYS);
    const cell    = Math.min(cellW, cellH);

    // Load activity data from localStorage + Supabase
    const activityLog = await loadActivityData();

    // Build date array — last 52 weeks
    const dates = [];
    const now   = new Date();
    const start = new Date(now);
    start.setDate(start.getDate() - (WEEKS * 7 - 1));
    // Align to Monday
    start.setDate(start.getDate() - start.getDay() + 1);

    for (let i = 0; i < WEEKS * DAYS; i++) {
        const d = new Date(start);
        d.setDate(start.getDate() + i);
        dates.push(d.toISOString().split('T')[0]);
    }

    // Day labels (Mon, Wed, Fri)
    ctx.fillStyle = 'rgba(255,255,255,0.2)';
    ctx.font      = `bold 9px sans-serif`;
    ['M', 'W', 'F'].forEach((label, i) => {
        const dayIndex = i === 0 ? 0 : i === 1 ? 2 : 4;
        const y = PADDING.top + dayIndex * (cell + GAP) + cell / 2 + 3;
        ctx.fillText(label, 8, y);
    });

    // Month labels
    let lastMonth = -1;
    for (let w = 0; w < WEEKS; w++) {
        const dateStr = dates[w * 7];
        const d       = new Date(dateStr);
        if (d.getMonth() !== lastMonth) {
            lastMonth = d.getMonth();
            const x   = PADDING.left + w * (cell + GAP);
            ctx.fillStyle = 'rgba(255,255,255,0.25)';
            ctx.font      = 'bold 9px sans-serif';
            ctx.fillText(d.toLocaleString('default', { month: 'short' }), x, 14);
        }
    }

    // Draw cells
    dates.forEach((dateStr, i) => {
        const week    = Math.floor(i / 7);
        const day     = i % 7;
        const x       = PADDING.left + week * (cell + GAP);
        const y       = PADDING.top  + day  * (cell + GAP);
        const seconds = activityLog[dateStr] || 0;
        const isToday = dateStr === now.toISOString().split('T')[0];

        // Cell colour based on activity level
        let color;
        if (seconds === 0)          color = 'rgba(255,255,255,0.04)';
        else if (seconds < 600)     color = '#14532d';   // < 10 mins
        else if (seconds < 1800)    color = '#16a34a';   // < 30 mins
        else if (seconds < 3600)    color = '#22c55e';   // < 1 hr
        else                        color = '#4ade80';   // 1hr+

        // Draw rounded cell
        const radius = 2;
        ctx.beginPath();
        ctx.roundRect(x, y, cell, cell, radius);
        ctx.fillStyle = color;
        ctx.fill();

        // Highlight today with blue border
        if (isToday) {
            ctx.strokeStyle = '#3b82f6';
            ctx.lineWidth   = 1.5;
            ctx.stroke();
        }
    });

    console.log('[Nebula] Canvas drawn —', WEEKS, 'weeks');
}

// Load activity data: merge localStorage + Supabase activity_log
async function loadActivityData() {
    // Start with localStorage data
    const local = JSON.parse(localStorage.getItem('user_node_activity') || '{}');

    try {
        const client = await getSupabaseClient();
        const { data: { user } } = await client.auth.getUser();
        if (!user) return local;

        // Get last 52 weeks from Supabase
        const since = new Date();
        since.setDate(since.getDate() - 364);

        const { data: rows } = await client
            .from('activity_log')
            .select('log_date, seconds')
            .eq('user_id', user.id)
            .gte('log_date', since.toISOString().split('T')[0]);

        if (rows) {
            rows.forEach(row => {
                // Merge: take the higher value between local and DB
                const localVal = local[row.log_date] || 0;
                local[row.log_date] = Math.max(localVal, row.seconds || 0);
            });
        }

    } catch (err) {
        console.warn('[Nebula] Supabase activity load failed, using localStorage:', err.message);
    }

    return local;
}

// Sync local activity seconds to Supabase (runs every 5 minutes)
async function syncActivityToSupabase() {
    try {
        const client = await getSupabaseClient();
        const { data: { user } } = await client.auth.getUser();
        if (!user) return;

        const local = JSON.parse(localStorage.getItem('user_node_activity') || '{}');
        const today = new Date().toISOString().split('T')[0];
        const todaySeconds = local[today] || 0;

        if (todaySeconds === 0) return;

        await client.from('activity_log').upsert({
            user_id:  user.id,
            log_date: today,
            seconds:  todaySeconds
        }, { onConflict: 'user_id,log_date' });

        console.log('[Activity] Synced to Supabase:', todaySeconds, 'seconds');

    } catch (err) {
        console.warn('[Activity] Sync failed:', err.message);
    }
}

// ─── 6. PROJECT STATS INTO OVERVIEW ─────────────────────────────────────────
function loadProjectStatsIntoOverview() {
    const projects = JSON.parse(localStorage.getItem('app_projects') || '[]');

    const deployed = projects.filter(p => p.status === 'success' && p.link && p.link !== '#').length;
    const gigs     = projects.filter(p => p.type === 'Job').length;
    const total    = projects.length;

    setEl('projectCount', total);
    setEl('deployCount',  deployed);
    setEl('gigCount',     gigs);
}

// ─── 7. HELPER: SET ELEMENT TEXT SAFELY ─────────────────────────────────────
function setEl(id, value) {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
}

// ─── 8. MAIN INIT — called by updateView('Overview') ────────────────────────
async function initOverview() {
    console.log('[Overview] Initialising...');

    // Load instant cached values first (no flicker)
    const cached = JSON.parse(localStorage.getItem('tlp_profile') || '{}');
    if (cached.xt_points !== undefined) {
        setEl('dash-xp-val',    cached.xt_points);
        setEl('streakCount',    cached.streak);
        setEl('dash-level-val', cached.level);
        setEl('semesterVal',    String(cached.semester).padStart(3, '0'));
        setEl('rankVal',        `#${cached.rank || 0}`);
    }

    // Load project stats (instant, from localStorage)
    loadProjectStatsIntoOverview();

    // Run async tasks in parallel
    await Promise.all([
        loadOverviewStats(),      // fresh data from Supabase
        recordDailyLogin(),       // streak + login XP
        drawActivityNebula(),     // canvas grid
    ]);

    // Start hourly XP timer
    startHourlyXPTimer();

    // Sync activity to Supabase every 5 minutes
    setInterval(syncActivityToSupabase, 5 * 60 * 1000);

    console.log('[Overview] Init complete');
}

// ─── EXPOSE GLOBALLY ─────────────────────────────────────────────────────────
// These are called from other modules when events happen
window.awardXP               = awardXP;
window.initOverview          = initOverview;
window.loadProjectStatsIntoOverview = loadProjectStatsIntoOverview;
window.drawActivityNebula    = drawActivityNebula;

// ─── 9. DAILY ACTIVITY BAR + STREAK/RANK MESSAGES ───────────────────────────
// Updates the new UI elements added in the upgraded overview view
function updateOverviewUI(profile, rank) {
    // Daily activity bar — based on seconds logged today vs target (3600s = 1hr = 100%)
    const local     = JSON.parse(localStorage.getItem('user_node_activity') || '{}');
    const today     = new Date().toISOString().split('T')[0];
    const seconds   = local[today] || 0;
    const pct       = Math.min(Math.round((seconds / 3600) * 100), 100);
    const bar       = document.getElementById('dailyBar');
    const pctEl     = document.getElementById('dailyPct');
    if (bar)   bar.style.width = pct + '%';
    if (pctEl) pctEl.textContent = pct + '%';

    // Streak message
    const streakMsg = document.getElementById('streakMsg');
    if (streakMsg) {
        const s = profile?.streak || 0;
        if      (s === 0)   streakMsg.textContent = 'Log in daily to build your streak';
        else if (s < 3)     streakMsg.textContent = `${s} day streak — keep it going!`;
        else if (s < 7)     streakMsg.textContent = `${s} days strong 🔥`;
        else if (s < 30)    streakMsg.textContent = `${s} day streak — you're on fire!`;
        else                streakMsg.textContent = `${s} days — legendary streak 🏆`;
    }

    // Rank message
    const rankMsg = document.getElementById('rankMsg');
    if (rankMsg && rank) {
        if      (rank === 1)  rankMsg.textContent = '👑 You are #1 on the platform!';
        else if (rank <= 5)   rankMsg.textContent = `Top 5 globally — +200 XP bonus active`;
        else if (rank <= 10)  rankMsg.textContent = `Top 10 globally — +100 XP bonus active`;
        else if (rank <= 50)  rankMsg.textContent = `Rank #${rank} — climb to top 10 for bonuses`;
        else                  rankMsg.textContent = `Earn XP to climb the leaderboard`;
    }
}


FIX_JS_MODULES_OVERVIEW_JS
echo -e "  ${GREEN}✓${NC} js/modules/overview.js"

cat > "js/modules/settings.js" << 'FIX_JS_MODULES_SETTINGS_JS'
/* ── T LEARN PRO: modules/settings.js ── */
/* Toggle switches, profile image, pricing, payment modal */

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
/**
 * SAVE PROFILE — name change wired to Supabase
 */
async function saveProfile() {
    const client = await getSupabaseClient();
    const { data: { user }, error: authErr } = await client.auth.getUser();

    if (authErr || !user) {
        alert('Session expired. Please log in again.');
        window.location.href = 'login.html';
        return;
    }

    const nameInput  = document.getElementById('editFullName');
    const bioInput   = document.getElementById('editBio');
    const saveBtn    = document.querySelector('[onclick="saveProfile()"]');

    if (!nameInput) return;

    const newName = nameInput.value.trim();
    const newBio  = bioInput ? bioInput.value.trim() : '';

    if (!newName) {
        alert('Name cannot be empty.');
        return;
    }

    if (saveBtn) { saveBtn.innerText = 'SAVING...'; saveBtn.disabled = true; }

    try {
        // Handle optional avatar upload
        let avatarUrl = localStorage.getItem('tlp_user_img') || 'Logo.webp';
        const bufferedImg = localStorage.getItem('temp_img_buffer');

        if (bufferedImg && bufferedImg.startsWith('data:image')) {
            const fileExt = bufferedImg.split(';')[0].split('/')[1] || 'png';
            const fileName = `${user.id}.${fileExt}`;
            const blob = await (await fetch(bufferedImg)).blob();
            const { error: uploadError } = await client.storage
                .from('avatars')
                .upload(fileName, blob, { upsert: true });
            if (!uploadError) {
                const { data: urlData } = client.storage.from('avatars').getPublicUrl(fileName);
                avatarUrl = urlData.publicUrl;
                localStorage.removeItem('temp_img_buffer');
            }
        }

        // Update Supabase user metadata
        const { error: updateError } = await client.auth.updateUser({
            data: { full_name: newName, bio: newBio, avatar_url: avatarUrl }
        });

        if (updateError) throw updateError;

        // Sync localStorage
        localStorage.setItem('tlp_user_name', newName);
        localStorage.setItem('tlp_user_img',  avatarUrl);
        localStorage.setItem('tlp_user_bio',  newBio);

        // Update UI immediately — no page reload needed
        document.querySelectorAll('[data-user-name]').forEach(el => el.textContent = newName);
        document.querySelectorAll('[data-user-img]').forEach(img => { img.src = avatarUrl; });

        // Record in login history
        if (typeof recordHistoryEvent === 'function') recordHistoryEvent('name_changed');

        if (saveBtn) { saveBtn.innerText = '✓ SAVED'; }
        setTimeout(() => {
            if (saveBtn) { saveBtn.innerText = 'Save Profile'; saveBtn.disabled = false; }
        }, 2000);

    } catch (err) {
        console.error('[Profile] Save error:', err);
        alert('Save failed: ' + err.message);
        if (saveBtn) { saveBtn.innerText = 'Save Profile'; saveBtn.disabled = false; }
    }
}

/**
 * UPDATE PASSWORD — wired to Supabase
 * Called by the Update Security button in Settings > Security tab
 */
async function updatePassword() {
    const currentInput = document.getElementById('currentPassword');
    const newInput     = document.getElementById('newPassword');
    const btn          = document.getElementById('updatePasswordBtn');

    if (!newInput) return;

    const newPassword = newInput.value.trim();

    if (!newPassword || newPassword.length < 8) {
        showModalAlert('Password must be at least 8 characters.');
        return;
    }

    if (btn) { btn.innerText = 'UPDATING...'; btn.disabled = true; }

    try {
        const client = await getSupabaseClient();
        const { error } = await client.auth.updateUser({ password: newPassword });

        if (error) throw error;

        if (currentInput) currentInput.value = '';
        if (newInput) newInput.value = '';

        // Record in login history
        if (typeof recordHistoryEvent === 'function') recordHistoryEvent('password_changed');

        if (btn) { btn.innerText = '✓ PASSWORD UPDATED'; }
        setTimeout(() => {
            if (btn) { btn.innerText = 'Update Security'; btn.disabled = false; }
        }, 2500);

    } catch (err) {
        console.error('[Password] Update error:', err);
        showModalAlert('Failed: ' + err.message);
        if (btn) { btn.innerText = 'Update Security'; btn.disabled = false; }
    }
}

// FIXED: Update user name after login (from auth.js)
async function updateUserDisplay() {
    const client = await window.supabaseLoader.load();
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

// ─────────────────────────────────────────────────────────────────────────────
// curriculumData lives in js/curriculum.js — loaded before dashboard.js
// ─────────────────────────────────────────────────────────────────────────────



FIX_JS_MODULES_SETTINGS_JS
echo -e "  ${GREEN}✓${NC} js/modules/settings.js"

echo ""
echo -e "${YELLOW}[3/3] Verifying...${NC}"
ALL_OK=true
for f in "pages/dashboard.html" "js/dashboard.js" "js/modules/overview.js" "js/modules/settings.js"; do
  if [ -f "$f" ] && [ -s "$f" ]; then
    echo -e "  ${GREEN}✓${NC} $f"
  else
    echo -e "  ${RED}✗${NC} $f MISSING"; ALL_OK=false
  fi
done

echo ""
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
if [ "$ALL_OK" = true ]; then
  echo -e "${GREEN}  ✓ All fixes installed!${NC}"
  echo ""
  echo "  WHAT WAS FIXED:"
  echo "  • Root cause: views object was undefined when view files ran"
  echo "    → window.views now declared early in dashboard.html"
  echo "  • dashboard.js now references window.views instead of redeclaring"
  echo "  • Supabase client uses window.supabaseLoader (matches auth.js)"
  echo "  • settings.js loadSupabase() replaced with supabaseLoader"
  echo ""
  echo "  Refresh dashboard.html — Overview tab should now load fully"
else
  echo -e "${RED}  Some files failed — check errors above${NC}"
fi
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
