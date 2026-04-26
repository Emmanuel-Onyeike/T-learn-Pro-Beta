/**
 * TECH NXXT: ELITE ACADEMY ENGINE (LOCAL-STORAGE EDITION)
 * Individual 21-Day Trial Logic & Course Management
 */

const ACADEMY_CONFIG = {
    TRIAL_DAYS: 21,
    MS_PER_DAY: 24 * 60 * 60 * 1000,
    STORAGE_KEY: 'tech_nxxt_academy_trial'
};

// Local Course Registry
const ACADEMY_TRACKS = [
    { title: "Neural UI Design", provider: "T-LEARN", difficulty_level: 1, credit_cost: 250, icon_type: "fa-brain", url: "#" },
    { title: "Advanced React Ops", provider: "UDEMY", difficulty_level: 2, credit_cost: 450, icon_type: "fa-microchip", url: "#" },
    { title: "Supabase Security", provider: "CODECAMP", difficulty_level: 3, credit_cost: 600, icon_type: "fa-shield-halved", url: "#" },
    { title: "Full-Stack Deployment", provider: "COURSERA", difficulty_level: 2, credit_cost: 300, icon_type: "fa-server", url: "#" }
];

/**
 * Main Entry Point: Synchronizes Trial Status from LocalStorage
 */
async function initEliteAcademy() {
    const grid = document.getElementById('courseGrid');
    
    try {
        // 1. Sync Trial Clock
        let trialStart = localStorage.getItem(ACADEMY_CONFIG.STORAGE_KEY);

        if (!trialStart) {
            trialStart = new Date().toISOString();
            localStorage.setItem(ACADEMY_CONFIG.STORAGE_KEY, trialStart);
            console.log("Academy Protocol: Local Trial Initialized.");
        }

        // 2. Calculations
        const startDate = new Date(trialStart);
        const expiryDate = new Date(startDate.getTime() + (ACADEMY_CONFIG.TRIAL_DAYS * ACADEMY_CONFIG.MS_PER_DAY));
        const today = new Date();
        
        const isExpired = today > expiryDate;
        const timeLeftMs = expiryDate - today;
        const daysLeft = Math.max(0, Math.ceil(timeLeftMs / ACADEMY_CONFIG.MS_PER_DAY));

        // 3. Update UI Shell
        updateAcademyHeader(isExpired, daysLeft, startDate, expiryDate);

        // 4. Populate Tracks
        renderAcademyTracks(isExpired);

    } catch (err) {
        console.error("Academy Engine Failure:", err);
        if (grid) grid.innerHTML = `<p class="col-span-full text-center text-red-500 text-[10px] font-black uppercase">Critical Engine Failure</p>`;
    }
}

/**
 * Updates Header Components
 */
function updateAcademyHeader(isExpired, daysLeft, start, end) {
    const timerText = document.getElementById('trialCountdown');
    const badge = document.getElementById('trialBadge');
    const progress = document.getElementById('trialProgressBar');

    if (isExpired) {
        if (timerText) {
            timerText.innerText = "Trial Concluded // Premium Required";
            timerText.classList.add('text-red-500');
        }
        if (badge) {
            badge.innerText = "LOCKED";
            badge.className = "px-2 py-0.5 rounded border border-red-500/30 text-[7px] font-black text-red-500 uppercase tracking-widest";
        }
        if (progress) {
            progress.style.width = "100%";
            progress.classList.replace('bg-blue-600', 'bg-red-600');
        }
    } else {
        if (timerText) timerText.innerText = `${daysLeft} Days of Free Access Remaining`;
        if (badge) badge.innerText = "TRIAL ACTIVE";
        if (progress) {
            const percent = ((new Date() - start) / (end - start)) * 100;
            progress.style.width = `${percent}%`;
        }
    }
}

/**
 * Renders Local Track Data
 */
function renderAcademyTracks(isExpired, providerFilter = 'all') {
    const grid = document.getElementById('courseGrid');
    if (!grid) return;

    const filteredTracks = providerFilter === 'all' 
        ? ACADEMY_TRACKS 
        : ACADEMY_TRACKS.filter(t => t.provider.toLowerCase().includes(providerFilter.toLowerCase()));

    grid.innerHTML = filteredTracks.map(track => {
        const isFree = !isExpired || track.credit_cost === 0;
        
        return `
        <div class="group p-6 rounded-[2.5rem] bg-[#050b1d]/40 border border-white/5 hover:border-blue-500/30 transition-all duration-500 relative overflow-hidden">
            <div class="flex justify-between items-start mb-6">
                <div class="h-12 w-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                    <i class="fas ${track.icon_type} text-blue-500"></i>
                </div>
                <span class="text-[7px] font-black text-white/30 uppercase tracking-widest px-3 py-1 bg-white/5 rounded-full border border-white/5">
                    ${track.provider}
                </span>
            </div>

            <h3 class="text-white font-black italic uppercase tracking-tighter text-lg mb-4 group-hover:text-blue-400 transition-colors">
                ${track.title}
            </h3>
            
            <div class="space-y-3 mb-6">
                <div class="flex justify-between text-[8px] font-black uppercase tracking-widest">
                    <span class="text-white/20">Clearance</span>
                    <span class="text-blue-500 italic">LVL ${track.difficulty_level.toString().padStart(2, '0')}</span>
                </div>
                <div class="flex justify-between text-[8px] font-black uppercase tracking-widest">
                    <span class="text-white/20">Protocol Cost</span>
                    <span class="${isFree ? 'text-green-400 font-bold' : 'text-white'}">
                        ${isFree ? 'FREE (TRIAL)' : track.credit_cost + ' Credits'}
                    </span>
                </div>
            </div>

            <button onclick="handleAccess('${track.url}', ${track.credit_cost}, ${isExpired})" 
                class="w-full py-4 rounded-2xl bg-white/[0.03] border border-white/10 text-[9px] font-black text-white uppercase tracking-widest hover:bg-blue-600 hover:border-blue-500 transition-all">
                ${isFree ? 'Access Hub' : 'Unlock Protocol'}
            </button>
        </div>
        `;
    }).join('');
}

/**
 * Access Logic
 */
function handleAccess(url, cost, isExpired) {
    if (isExpired && cost > 0) {
        if (typeof showSystemAlert === 'function') {
            showSystemAlert(`ACCESS DENIED: Trial period expired. This track requires ${cost} credits.`);
        } else {
            alert(`TRIAL EXPIRED: ${cost} Credits required.`);
        }
        return;
    }
    window.open(url, '_blank');
}

/**
 * Filter Controller
 */
window.filterClasses = (provider) => {
    // 1. Update Buttons
    document.querySelectorAll('.class-filter-btn').forEach(btn => {
        const isMatch = btn.innerText.toLowerCase().includes(provider.toLowerCase()) || 
                       (provider === 'all' && btn.innerText.includes('ALL'));
        
        if (isMatch) {
            btn.classList.add('bg-blue-600', 'text-white');
            btn.classList.remove('text-white/40');
        } else {
            btn.classList.remove('bg-blue-600', 'text-white');
            btn.classList.add('text-white/40');
        }
    });

    // 2. Re-check Expiry from LocalStorage and re-render
    const trialStart = localStorage.getItem(ACADEMY_CONFIG.STORAGE_KEY);
    const isExpired = new Date() > new Date(new Date(trialStart).getTime() + (ACADEMY_CONFIG.TRIAL_DAYS * ACADEMY_CONFIG.MS_PER_DAY));
    
    renderAcademyTracks(isExpired, provider);
};
