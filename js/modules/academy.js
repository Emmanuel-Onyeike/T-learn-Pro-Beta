/**
 * TECH NXXT: ELITE ACADEMY ENGINE (MAX VOLUME EDITION)
 * 60+ Modules across 4 Providers
 */

const ACADEMY_CONFIG = {
    TRIAL_DAYS: 21,
    MS_PER_DAY: 24 * 60 * 60 * 1000,
    STORAGE_KEY: 'tech_nxxt_academy_trial'
};

// --- DATA REPOSITORY: 15+ Modules Per Category ---
const ACADEMY_TRACKS = [
    // T-LEARN (Neural & Internal Systems)
    ...Array.from({length: 15}, (_, i) => ({
        title: `Neural Core ${i + 1}: ${['Logic', 'Interface', 'Data', 'Sync'][i % 4]}`,
        provider: "T-LEARN",
        difficulty_level: (i % 5) + 1,
        credit_cost: 100 * (i + 1),
        icon_type: "fa-brain",
        url: "https://t-learn.pro"
    })),
    // UDEMY (Tactical Development)
    ...Array.from({length: 15}, (_, i) => ({
        title: `Tactical Dev: ${['React', 'Tailwind', 'NextJS', 'Node'][i % 4]} Mastery`,
        provider: "UDEMY",
        difficulty_level: (i % 3) + 2,
        credit_cost: 150 * (i + 1),
        icon_type: "fa-code",
        url: "https://udemy.com"
    })),
    // CODECAMP (Security & Backend)
    ...Array.from({length: 15}, (_, i) => ({
        title: `Protocol ${i + 1}: ${['Encryption', 'Database', 'API', 'Auth'][i % 4]}`,
        provider: "CODECAMP",
        difficulty_level: (i % 4) + 2,
        credit_cost: 200 * (i + 1),
        icon_type: "fa-shield-halved",
        url: "https://freecodecamp.org"
    })),
    // COURSERA (Professional Ops)
    ...Array.from({length: 15}, (_, i) => ({
        title: `Ops Level ${i + 1}: ${['Scalability', 'Cloud', 'DevOps', 'Architecture'][i % 4]}`,
        provider: "COURSERA",
        difficulty_level: (i % 2) + 4,
        credit_cost: 300 * (i + 1),
        icon_type: "fa-server",
        url: "https://coursera.org"
    }))
];

/**
 * Main Entry Point
 */
async function initEliteAcademy() {
    const grid = document.getElementById('courseGrid');
    
    try {
        // 1. Sync Trial
        let trialStart = localStorage.getItem(ACADEMY_CONFIG.STORAGE_KEY) || new Date().toISOString();
        if (!localStorage.getItem(ACADEMY_CONFIG.STORAGE_KEY)) localStorage.setItem(ACADEMY_CONFIG.STORAGE_KEY, trialStart);

        const startDate = new Date(trialStart);
        const expiryDate = new Date(startDate.getTime() + (ACADEMY_CONFIG.TRIAL_DAYS * ACADEMY_CONFIG.MS_PER_DAY));
        const isExpired = new Date() > expiryDate;
        const daysLeft = Math.max(0, Math.ceil((expiryDate - new Date()) / ACADEMY_CONFIG.MS_PER_DAY));

        // 2. Header Update
        updateAcademyHeader(isExpired, daysLeft, startDate, expiryDate);

        // 3. Render Initial Grid
        renderAcademyTracks(isExpired);

    } catch (err) {
        console.error("Academy Engine Failure:", err);
    }
}

/**
 * UI Header Management
 */
function updateAcademyHeader(isExpired, daysLeft, start, end) {
    const timerText = document.getElementById('trialCountdown');
    const badge = document.getElementById('trialBadge');
    const progress = document.getElementById('trialProgressBar');

    if (timerText) {
        timerText.innerText = isExpired ? "TRIAL CONCLUDED // ACCESS RESTRICTED" : `${daysLeft} Days of Elite Access Remaining`;
        if (isExpired) timerText.classList.add('text-red-500');
    }
    
    if (badge) {
        badge.innerText = isExpired ? "LOCKED" : "TRIAL ACTIVE";
        badge.className = isExpired ? "px-2 py-0.5 rounded border border-red-500/30 text-[7px] font-black text-red-500 uppercase tracking-widest" : "px-2 py-0.5 rounded border border-blue-500/30 text-[7px] font-black text-blue-400 uppercase tracking-widest";
    }

    if (progress) {
        const percent = isExpired ? 100 : ((new Date() - start) / (end - start)) * 100;
        progress.style.width = `${percent}%`;
        if (isExpired) progress.classList.add('bg-red-600');
    }
}

/**
 * Massive Render Engine
 */
function renderAcademyTracks(isExpired, providerFilter = 'all') {
    const grid = document.getElementById('courseGrid');
    if (!grid) return;

    // Filter Logic
    const filteredTracks = providerFilter === 'all' 
        ? ACADEMY_TRACKS 
        : ACADEMY_TRACKS.filter(t => t.provider.toUpperCase() === providerFilter.toUpperCase());

    // Generate HTML
    grid.innerHTML = filteredTracks.map(track => {
        const isFree = !isExpired || track.credit_cost === 0;
        
        return `
        <div class="group p-6 rounded-[2.5rem] bg-[#050b1d]/60 border border-white/5 hover:border-blue-500/30 transition-all duration-500 relative overflow-hidden backdrop-blur-md">
            <div class="flex justify-between items-start mb-6">
                <div class="h-10 w-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                    <i class="fas ${track.icon_type} text-blue-500 text-sm"></i>
                </div>
                <span class="text-[6px] font-black text-white/30 uppercase tracking-widest px-2 py-1 bg-white/5 rounded-md border border-white/5">
                    ${track.provider}
                </span>
            </div>

            <h3 class="text-white font-black italic uppercase tracking-tighter text-md mb-4 leading-tight group-hover:text-blue-400 transition-colors">
                ${track.title}
            </h3>
            
            <div class="space-y-2 mb-6">
                <div class="flex justify-between text-[7px] font-black uppercase tracking-widest">
                    <span class="text-white/20">Clearance</span>
                    <span class="text-blue-500">LVL ${track.difficulty_level.toString().padStart(2, '0')}</span>
                </div>
                <div class="flex justify-between text-[7px] font-black uppercase tracking-widest">
                    <span class="text-white/20">Protocol Cost</span>
                    <span class="${isFree ? 'text-green-400' : 'text-white'}">
                        ${isFree ? 'FREE ACCESS' : track.credit_cost + ' CR'}
                    </span>
                </div>
            </div>

            <button onclick="handleAccess('${track.url}', ${track.credit_cost}, ${isExpired})" 
                class="w-full py-3 rounded-xl bg-white/[0.03] border border-white/10 text-[8px] font-black text-white uppercase tracking-widest hover:bg-blue-600 hover:border-blue-500 hover:shadow-[0_0_15px_rgba(37,99,235,0.2)] transition-all">
                ${isFree ? 'Initialize Track' : 'Unlock Hub'}
            </button>
        </div>
        `;
    }).join('');
}

/**
 * Action Handler
 */
function handleAccess(url, cost, isExpired) {
    if (isExpired && cost > 0) {
        alert(`SECURITY BREACH: Access to this hub requires ${cost} Neural Credits.`);
        return;
    }
    window.open(url, '_blank');
}

/**
 * Filter Controller
 */
window.filterClasses = (provider) => {
    // 1. Button Feedback
    document.querySelectorAll('.class-filter-btn').forEach(btn => {
        const isMatch = btn.innerText.toUpperCase().includes(provider.toUpperCase()) || 
                       (provider === 'all' && btn.innerText.includes('ALL'));
        
        btn.className = isMatch 
            ? "class-filter-btn px-6 py-2 rounded-full bg-blue-600 text-white text-[9px] font-black uppercase tracking-widest transition-all"
            : "class-filter-btn px-6 py-2 rounded-full text-white/40 text-[9px] font-black uppercase tracking-widest transition-all";
    });

    // 2. Render
    const trialStart = localStorage.getItem(ACADEMY_CONFIG.STORAGE_KEY);
    const isExpired = new Date() > new Date(new Date(trialStart).getTime() + (ACADEMY_CONFIG.TRIAL_DAYS * ACADEMY_CONFIG.MS_PER_DAY));
    renderAcademyTracks(isExpired, provider);
};
