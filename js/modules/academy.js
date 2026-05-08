/**
 * TECH NXXT: ELITE ACADEMY ENGINE (BLUE PROTOCOL)
 */

const ACADEMY_CONFIG = {
    TRIAL_DAYS: 14, // 2 Weeks as per request
    MS_PER_DAY: 24 * 60 * 60 * 1000,
    STORAGE_KEY: 'tech_nxxt_academy_trial',
    COMPLETION_REWARD: 100 // +100 XT points
};

async function initEliteAcademy() {
    const grid = document.getElementById('courseGrid');
    
    try {
        // 1. Sync Trial & Points
        let trialStart = localStorage.getItem(ACADEMY_CONFIG.STORAGE_KEY) || new Date().toISOString();
        if (!localStorage.getItem(ACADEMY_CONFIG.STORAGE_KEY)) {
            localStorage.setItem(ACADEMY_CONFIG.STORAGE_KEY, trialStart);
        }

        const startDate = new Date(trialStart);
        const expiryDate = new Date(startDate.getTime() + (ACADEMY_CONFIG.TRIAL_DAYS * ACADEMY_CONFIG.MS_PER_DAY));
        const isExpired = new Date() > expiryDate;
        const daysLeft = Math.max(0, Math.ceil((expiryDate - new Date()) / ACADEMY_CONFIG.MS_PER_DAY));

        // 2. Fetch User Profile for XT Points
        const client = await getSupabaseClient();
        const user = await window.AuthState.getUser();
        const { data: profile } = await client.from('profiles').select('xt_points').eq('id', user.id).single();
        
        // Update Header UI
        if(document.getElementById('academyCredits')) {
            document.getElementById('academyCredits').innerText = profile?.xt_points || 0;
        }

        updateAcademyHeader(isExpired, daysLeft, startDate, expiryDate);

        // 3. Render Tracks
        renderAcademyTracks(isExpired, 'all', profile?.xt_points || 0);

    } catch (err) {
        console.error("Academy Engine Failure:", err);
    }
}

function renderAcademyTracks(isExpired, providerFilter = 'all', currentXP = 0) {
    const grid = document.getElementById('courseGrid');
    if (!grid) return;

    const filteredTracks = providerFilter === 'all' 
        ? ACADEMY_TRACKS 
        : ACADEMY_TRACKS.filter(t => t.provider.toUpperCase() === providerFilter.toUpperCase());

    grid.innerHTML = filteredTracks.map(track => {
        // LOGIC: During trial, everything is free. 
        // After trial, only courses 50-100 XT are free.
        let isActuallyFree = !isExpired; 
        if (isExpired && track.credit_cost >= 50 && track.credit_cost <= 100) {
            isActuallyFree = true;
        }

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
                    <span class="text-white/20">Protocol Cost</span>
                    <span class="${isActuallyFree ? 'text-green-400' : 'text-yellow-500'}">
                        ${isActuallyFree ? 'FREE ACCESS' : track.credit_cost + ' XT'}
                    </span>
                </div>
            </div>

            <button onclick="attemptUnlock('${track.title}', ${track.credit_cost}, ${isActuallyFree}, '${track.url}')" 
                class="w-full py-3 rounded-xl bg-white/[0.03] border border-white/10 text-[8px] font-black text-white uppercase tracking-widest hover:bg-blue-600 hover:border-blue-500 transition-all">
                ${isActuallyFree ? 'Initialize Track' : 'Unlock with XT'}
            </button>
        </div>`;
    }).join('');
}

/**
 * Handle Unlocking and Point Deduction
 */
async function attemptUnlock(title, cost, isFree, url) {
    if (isFree) {
        window.open(url, '_blank');
        return;
    }

    try {
        const client = await getSupabaseClient();
        const user = await window.AuthState.getUser();
        
        const { data: profile } = await client.from('profiles').select('xt_points').eq('id', user.id).single();

        if (profile.xt_points < cost) {
            showModalAlert("INSUFFICIENT FUNDS", `You need ${cost} XT Points to unlock this hub. Keep participating to earn more.`);
            return;
        }

        // Deduct Points
        const newTotal = profile.xt_points - cost;
        await client.from('profiles').update({ xt_points: newTotal }).eq('id', user.id);
        
        // Log enrollment
        await client.from('course_enrollments').insert({ 
            user_id: user.id, 
            course_title: title, 
            provider: 'ACADEMY' 
        });

        showModalAlert("ACCESS GRANTED", `Neural link established. ${cost} XT deducted from your core.`);
        initEliteAcademy(); // Refresh UI
        window.open(url, '_blank');

    } catch (err) {
        console.error("Unlock Error:", err);
    }
}

/**
 * Completion Reward Engine
 * Call this when a user finishes a course
 */
async function completeCourse(courseTitle) {
    try {
        const client = await getSupabaseClient();
        const user = await window.AuthState.getUser();

        // 1. Mark as completed in DB
        await client.from('course_enrollments')
            .update({ is_completed: true, completed_at: new Date() })
            .eq('user_id', user.id)
            .eq('course_title', courseTitle);

        // 2. Award Points (+100 XT)
        await awardXP('complete_lesson'); // This triggers your existing awardXP function
        
        // 3. Explicit Bonus for Premium Completion
        const { data: profile } = await client.from('profiles').select('xt_points').eq('id', user.id).single();
        const bonusTotal = profile.xt_points + ACADEMY_CONFIG.COMPLETION_REWARD;
        
        await client.from('profiles').update({ xt_points: bonusTotal }).eq('id', user.id);

        showModalAlert("COURSE COMPLETE", "Protocol finished successfully. +100 XT Points awarded to your profile.");
        initEliteAcademy();

    } catch (err) {
        console.error("Completion Error:", err);
    }
}

/**
 * Centered Modal Alert System
 */
function showModalAlert(title, message) {
    const modalHtml = `
    <div id="nxxtAlert" class="fixed inset-0 z-[1000] flex items-center justify-center bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
        <div class="bg-[#050b1d] border border-blue-500/30 p-8 rounded-[2.5rem] max-w-sm w-full text-center shadow-[0_0_50px_-12px_rgba(59,130,246,0.5)]">
            <i class="fas fa-shield-check text-blue-500 text-4xl mb-4"></i>
            <h2 class="text-white font-black uppercase italic tracking-tighter text-xl mb-2">${title}</h2>
            <p class="text-white/40 text-[10px] font-bold uppercase tracking-widest leading-relaxed mb-6">${message}</p>
            <button onclick="document.getElementById('nxxtAlert').remove()" class="w-full py-3 bg-blue-600 rounded-xl text-white text-[9px] font-black uppercase tracking-[0.3em] hover:bg-blue-500 transition-all">Acknowledge</button>
        </div>
    </div>`;
    document.body.insertAdjacentHTML('beforeend', modalHtml);
}
