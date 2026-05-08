/**
 * TECH NXXT: ELITE ACADEMY ENGINE (BLUE PROTOCOL - MAX VOLUME)
 * V2.1 PRODUCTION BUILD: REAL-TIME XT SYNC & DATA PERSISTENCE
 */

const ACADEMY_CONFIG = {
    TRIAL_DAYS: 14,
    MS_PER_DAY: 24 * 60 * 60 * 1000,
    STORAGE_KEY: 'tech_nxxt_academy_trial',
    COMPLETION_REWARD: 100,
    SYNC_INTERVAL: 30000 // 30s Background Pulse
};

// --- DATA REPOSITORY: 60+ Modules ---
const ACADEMY_TRACKS = [
    ...Array.from({length: 15}, (_, i) => ({
        title: `Neural Core ${i + 1}: ${['Logic', 'Interface', 'Data', 'Sync'][i % 4]}`,
        provider: "T-LEARN",
        difficulty_level: (i % 5) + 1,
        credit_cost: 100 * (i + 1),
        icon_type: "fa-brain",
        url: "https://t-learn.pro"
    })),
    ...Array.from({length: 15}, (_, i) => ({
        title: `Tactical Dev: ${['React', 'Tailwind', 'NextJS', 'Node'][i % 4]} Mastery`,
        provider: "UDEMY",
        difficulty_level: (i % 3) + 2,
        credit_cost: 150 * (i + 1),
        icon_type: "fa-code",
        url: "https://udemy.com"
    })),
    ...Array.from({length: 15}, (_, i) => ({
        title: `Protocol ${i + 1}: ${['Encryption', 'Database', 'API', 'Auth'][i % 4]}`,
        provider: "CODECAMP",
        difficulty_level: (i % 4) + 2,
        credit_cost: 200 * (i + 1),
        icon_type: "fa-shield-halved",
        url: "https://freecodecamp.org"
    })),
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
 * Main Entry Point: Optimized for Immediate Balance Display
 */
window.initEliteAcademy = async function() {
    try {
        const client = await getSupabaseClient();
        const user = await window.AuthState.getUser();
        
        const fetchBalance = async () => {
            const { data: profile } = await client.from('profiles').select('xt_points').eq('id', user.id).single();
            // UPDATED: Now targeting the shared dash-xp-val ID
            const creditEl = document.getElementById('dash-xp-val');
            if (creditEl && profile) {
                creditEl.innerText = profile.xt_points.toLocaleString();
                creditEl.classList.add('text-blue-400');
                setTimeout(() => creditEl.classList.remove('text-blue-400'), 1000);
            }
        };

        await fetchBalance();

        let trialStart = localStorage.getItem(ACADEMY_CONFIG.STORAGE_KEY) || new Date().toISOString();
        if (!localStorage.getItem(ACADEMY_CONFIG.STORAGE_KEY)) {
            localStorage.setItem(ACADEMY_CONFIG.STORAGE_KEY, trialStart);
        }

        const startDate = new Date(trialStart);
        const expiryDate = new Date(startDate.getTime() + (ACADEMY_CONFIG.TRIAL_DAYS * ACADEMY_CONFIG.MS_PER_DAY));
        const isExpired = new Date() > expiryDate;
        const daysLeft = Math.max(0, Math.ceil((expiryDate - new Date()) / ACADEMY_CONFIG.MS_PER_DAY));

        updateAcademyHeader(isExpired, daysLeft, startDate, expiryDate);
        renderAcademyTracks(isExpired, 'all');

        if (window.academyInterval) clearInterval(window.academyInterval);
        window.academyInterval = setInterval(fetchBalance, ACADEMY_CONFIG.SYNC_INTERVAL);

    } catch (err) {
        console.error("Academy Engine Critical Failure:", err);
    }
};

/**
 * UI Header Management
 */
function updateAcademyHeader(isExpired, daysLeft, start, end) {
    const timerText = document.getElementById('trialCountdown');
    const badge = document.getElementById('trialBadge');
    const progress = document.getElementById('trialProgressBar');

    if (timerText) {
        timerText.innerText = isExpired ? "TRIAL EXPIRED // PROTOCOL ACTIVE" : `${daysLeft} Days of Elite Access Remaining`;
    }
    
    if (badge) {
        badge.innerText = isExpired ? "LOCKED" : "TRIAL ACTIVE";
        badge.className = isExpired 
            ? "px-2 py-0.5 rounded border border-red-500/30 text-[7px] font-black text-red-500 uppercase tracking-widest" 
            : "px-2 py-0.5 rounded border border-blue-500/30 text-[7px] font-black text-blue-400 uppercase tracking-widest animate-pulse";
    }

    if (progress) {
        const percent = isExpired ? 100 : ((new Date() - start) / (end - start)) * 100;
        progress.style.width = `${percent}%`;
        if (isExpired) progress.classList.add('bg-red-600');
    }
}

/**
 * Filter Controller
 */
window.filterClasses = function(provider) {
    const trialStart = localStorage.getItem(ACADEMY_CONFIG.STORAGE_KEY);
    const isExpired = new Date() > new Date(new Date(trialStart).getTime() + (ACADEMY_CONFIG.TRIAL_DAYS * ACADEMY_CONFIG.MS_PER_DAY));
    
    document.querySelectorAll('.class-filter-btn').forEach(btn => {
        const btnLabel = btn.innerText.toLowerCase();
        if (btnLabel.includes(provider.toLowerCase()) || (provider === 'all' && btnLabel.includes('all'))) {
            btn.className = "class-filter-btn px-4 py-2 bg-blue-600 rounded-xl text-[7px] font-black text-white uppercase tracking-widest transition-all";
        } else {
            btn.className = "class-filter-btn px-4 py-2 hover:bg-white/5 rounded-xl text-[7px] font-black text-white/40 uppercase tracking-widest transition-all hover:text-white";
        }
    });

    renderAcademyTracks(isExpired, provider);
};

/**
 * Rendering Engine
 */
function renderAcademyTracks(isExpired, providerFilter = 'all') {
    const grid = document.getElementById('courseGrid');
    if (!grid) return;

    const filteredTracks = providerFilter === 'all' 
        ? ACADEMY_TRACKS 
        : ACADEMY_TRACKS.filter(t => t.provider.toUpperCase() === providerFilter.toUpperCase());

    grid.innerHTML = filteredTracks.map(track => {
        let isActuallyFree = !isExpired || (track.credit_cost >= 50 && track.credit_cost <= 100);

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
            <div class="space-y-2 mb-6 text-[7px] font-black uppercase tracking-widest">
                <div class="flex justify-between">
                    <span class="text-white/20">Clearance</span>
                    <span class="text-blue-500">LVL ${track.difficulty_level.toString().padStart(2, '0')}</span>
                </div>
                <div class="flex justify-between">
                    <span class="text-white/20">Protocol Cost</span>
                    <span class="${isActuallyFree ? 'text-green-400' : 'text-yellow-500'}">
                        ${isActuallyFree ? 'FREE ACCESS' : track.credit_cost + ' XT'}
                    </span>
                </div>
            </div>
            <button onclick="attemptUnlock('${track.title.replace(/'/g, "\\'")}', ${track.credit_cost}, ${isActuallyFree}, '${track.url}')" 
                class="w-full py-3 rounded-xl bg-white/[0.03] border border-white/10 text-[8px] font-black text-white uppercase tracking-widest hover:bg-blue-600 hover:border-blue-500 transition-all">
                ${isActuallyFree ? 'Initialize Track' : 'Unlock with XT'}
            </button>
        </div>`;
    }).join('');
}

/**
 * Access & Transaction Handler
 */
window.attemptUnlock = async function(title, cost, isFree, url) {
    if (isFree) return window.open(url, '_blank');

    try {
        const client = await getSupabaseClient();
        const user = await window.AuthState.getUser();
        const { data: profile } = await client.from('profiles').select('xt_points').eq('id', user.id).single();

        if (profile.xt_points < cost) {
            return window.showModalAlert("ACCESS DENIED", `Insufficient XT. Need ${cost} XT.`);
        }

        const { error } = await client.from('profiles').update({ xt_points: profile.xt_points - cost }).eq('id', user.id);
        if (error) throw error;

        window.showModalAlert("UNLOCKED", `Hub decrypted. ${cost} XT consumed.`);
        window.initEliteAcademy();
        window.open(url, '_blank');
    } catch (err) { 
        console.error("Transaction Error:", err); 
        window.showModalAlert("SYNC ERROR", "Could not verify XT transaction.");
    }
};

/**
 * Global Alert UI
 */
window.showModalAlert = function(title, message) {
    const id = 'alert-' + Date.now();
    const modalHtml = `
    <div id="${id}" class="fixed top-6 right-6 z-[2000] animate-in slide-in-from-right-10 duration-500">
        <div class="bg-[#050b1d]/90 backdrop-blur-xl border border-blue-500/40 p-5 rounded-2xl w-72 shadow-2xl shadow-blue-500/20">
            <div class="flex items-start gap-4">
                <div class="h-8 w-8 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center shrink-0">
                    <i class="fas fa-satellite-dish text-blue-400 text-xs animate-pulse"></i>
                </div>
                <div class="flex flex-col">
                    <h2 class="text-white font-black uppercase text-[10px] tracking-tighter mb-1">${title}</h2>
                    <p class="text-white/40 text-[9px] font-medium leading-tight uppercase">${message}</p>
                </div>
            </div>
            <div class="mt-3 h-0.5 w-full bg-white/5 rounded-full overflow-hidden">
                <div class="h-full bg-blue-500 animate-out fade-out slide-out-to-left fill-mode-forwards duration-[3000ms]"></div>
            </div>
        </div>
    </div>`;
    document.body.insertAdjacentHTML('beforeend', modalHtml);
    setTimeout(() => { if(document.getElementById(id)) document.getElementById(id).remove(); }, 3000);
};
