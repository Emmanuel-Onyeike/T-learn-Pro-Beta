/**
 * TECH NXXT: ELITE ACADEMY ENGINE (BLUE PROTOCOL - MAX VOLUME)
 * V2.4 - BALANCE FIX + ROBUST SYNC
 */

const ACADEMY_CONFIG = {
    TRIAL_DAYS: 21,
    MS_PER_DAY: 24 * 60 * 60 * 1000,
    STORAGE_KEY: 'tech_nxxt_academy_trial',
    SYNC_INTERVAL: 15000   // Faster sync for testing
};

// --- DATA REPOSITORY ---
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

/* ====================== MAIN INIT ====================== */
window.initEliteAcademy = async function() {
    console.log("🚀 Academy Engine Starting...");

    try {
        const client = await getSupabaseClient?.();
        const user = await window.AuthState?.getUser?.();

        if (!client || !user?.id) {
            console.warn("⚠️ Academy: Supabase or User not ready yet");
            setTimeout(window.initEliteAcademy, 800); // Retry
            return;
        }

        // === BALANCE FETCH (Stronger Version) ===
        const fetchBalance = async () => {
            try {
                const { data: profile, error } = await client
                    .from('profiles')
                    .select('xt_points')
                    .eq('id', user.id)
                    .single();

                const creditEl = document.getElementById('dash-xp-val');

                if (creditEl) {
                    const points = profile?.xt_points ?? 0;
                    creditEl.innerText = points.toLocaleString();
                    creditEl.classList.add('text-yellow-400');
                    setTimeout(() => creditEl.classList.remove('text-yellow-400'), 1500);
                    console.log(`✅ Balance Updated: ${points} XT`);
                } else {
                    console.warn("⚠️ Element #dash-xp-val not found");
                }
            } catch (err) {
                console.error("Balance fetch error:", err);
            }
        };

        await fetchBalance();

        // Trial Management
        let trialStart = localStorage.getItem(ACADEMY_CONFIG.STORAGE_KEY);
        if (!trialStart) {
            trialStart = new Date().toISOString();
            localStorage.setItem(ACADEMY_CONFIG.STORAGE_KEY, trialStart);
        }

        const startDate = new Date(trialStart);
        const expiryDate = new Date(startDate.getTime() + (ACADEMY_CONFIG.TRIAL_DAYS * ACADEMY_CONFIG.MS_PER_DAY));
        const isExpired = new Date() > expiryDate;
        const daysLeft = Math.max(0, Math.ceil((expiryDate - new Date()) / ACADEMY_CONFIG.MS_PER_DAY));

        updateAcademyHeader(isExpired, daysLeft, startDate, expiryDate);
        renderAcademyTracks(isExpired, 'all');

        // Background Sync
        if (window.academyInterval) clearInterval(window.academyInterval);
        window.academyInterval = setInterval(fetchBalance, ACADEMY_CONFIG.SYNC_INTERVAL);

        console.log("✅ Academy Engine Fully Initialized");

    } catch (err) {
        console.error("Academy Engine Critical Failure:", err);
    }
};

/* ====================== HEADER ====================== */
function updateAcademyHeader(isExpired, daysLeft, start, end) {
    const timerText = document.getElementById('trialCountdown');
    const badge = document.getElementById('trialBadge');
    const progress = document.getElementById('trialProgressBar');

    if (timerText) {
        timerText.innerText = isExpired
            ? "TRIAL EXPIRED // PROTOCOL ACTIVE"
            : `${daysLeft} Days of Elite Access Remaining`;
    }
   
    if (badge) {
        badge.innerText = isExpired ? "LOCKED" : "TRIAL ACTIVE";
        badge.className = isExpired
            ? "px-2 py-0.5 rounded border border-red-500/30 text-[7px] font-black text-red-500 uppercase tracking-widest"
            : "px-2 py-0.5 rounded border border-blue-500/30 text-[7px] font-black text-blue-400 uppercase tracking-widest animate-pulse";
    }

    if (progress) {
        const percent = isExpired ? 100 : Math.min(100, ((Date.now() - start) / (end - start)) * 100);
        progress.style.width = `${percent}%`;
        progress.classList.toggle('bg-red-600', isExpired);
    }
}

/* ====================== FILTER ====================== */
window.filterClasses = function(provider) {
    const trialStart = localStorage.getItem(ACADEMY_CONFIG.STORAGE_KEY);
    const isExpired = new Date() > new Date(new Date(trialStart).getTime() + (ACADEMY_CONFIG.TRIAL_DAYS * ACADEMY_CONFIG.MS_PER_DAY));

    document.querySelectorAll('.class-filter-btn').forEach(btn => {
        const isActive = provider === 'all'
            ? btn.innerText.toLowerCase().includes('all')
            : btn.getAttribute('data-provider')?.toUpperCase() === provider.toUpperCase();

        btn.className = isActive
            ? "class-filter-btn px-4 py-2 bg-blue-600 rounded-xl text-[7px] font-black text-white uppercase tracking-widest transition-all"
            : "class-filter-btn px-4 py-2 hover:bg-white/5 rounded-xl text-[7px] font-black text-white/40 uppercase tracking-widest transition-all hover:text-white";
    });

    renderAcademyTracks(isExpired, provider);
};

/* ====================== RENDER ====================== */
function renderAcademyTracks(isExpired, providerFilter = 'all') {
    const grid = document.getElementById('courseGrid');
    if (!grid) return;

    const filtered = providerFilter === 'all'
        ? ACADEMY_TRACKS
        : ACADEMY_TRACKS.filter(t => t.provider === providerFilter);

    grid.innerHTML = filtered.map(track => {
        const isFreeDuringTrial = !isExpired || (track.credit_cost >= 50 && track.credit_cost <= 100);

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
                    <span class="${isFreeDuringTrial ? 'text-green-400' : 'text-yellow-500'}">
                        ${isFreeDuringTrial ? 'FREE ACCESS' : track.credit_cost + ' XT'}
                    </span>
                </div>
            </div>
            <button onclick="attemptUnlock('${track.title.replace(/'/g, "\\'")}', ${track.credit_cost}, ${isFreeDuringTrial}, '${track.url}')"
                class="w-full py-3 rounded-xl bg-white/[0.03] border border-white/10 text-[8px] font-black text-white uppercase tracking-widest hover:bg-blue-600 hover:border-blue-500 transition-all">
                ${isFreeDuringTrial ? 'INITIALIZE TRACK' : 'UNLOCK WITH XT'}
            </button>
        </div>`;
    }).join('');
}

/* ====================== UNLOCK + CENTERED MODAL ====================== */
window.attemptUnlock = async function(title, cost, isFree, url) {
    if (isFree) {
        window.open(url, '_blank');
        setTimeout(() => {
            if (typeof awardXP === 'function') awardXP('complete_lesson');
        }, 6000);
        return;
    }

    // ... (rest of unlock logic remains same)
    try {
        const client = await getSupabaseClient?.();
        const user = await window.AuthState?.getUser?.();
        if (!client || !user) throw new Error("Auth not ready");

        const { data: profile } = await client.from('profiles').select('xt_points').eq('id', user.id).single();

        if (!profile || profile.xt_points < cost) {
            return showCenteredModal("ACCESS DENIED", `Insufficient XT. Need ${cost} XT.`);
        }

        await client.from('profiles').update({ xt_points: profile.xt_points - cost }).eq('id', user.id);

        showCenteredModal("UNLOCKED", `${title} activated. ${cost} XT deducted.`, "success");
        window.open(url, '_blank');
        window.initEliteAcademy();

    } catch (err) {
        console.error("Transaction Error:", err);
        showCenteredModal("SYNC ERROR", "Transaction failed. Try again.", "error");
    }
};

function showCenteredModal(title, message, type = "info") {
    const modalId = 'modal-' + Date.now();
    const color = type === "success" ? "emerald" : type === "error" ? "red" : "amber";

    const html = `
    <div id="${modalId}" class="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80">
        <div class="bg-[#050b1d] border border-${color}-500/30 rounded-3xl p-8 max-w-sm w-full mx-4 text-center">
            <h2 class="text-xl font-black text-white mb-3">${title}</h2>
            <p class="text-white/70">${message}</p>
            <button onclick="this.closest('div[ id^=modal ]').remove()" 
                class="mt-6 w-full py-3.5 bg-white/10 hover:bg-white/20 rounded-2xl text-sm font-black uppercase tracking-widest">
                CLOSE
            </button>
        </div>
    </div>`;
    document.body.insertAdjacentHTML('beforeend', html);
}

/* ====================== AUTO INIT ====================== */
if (document.getElementById('courseGrid')) {
    setTimeout(() => {
        window.initEliteAcademy();
    }, 300); // Slightly longer delay for safety
}
