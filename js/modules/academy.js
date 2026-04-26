/**
 * TECH NXXT: ELITE ACADEMY ENGINE
 * Individual 21-Day Trial Logic & Course Management
 * Logic: Hardened Async/Await with UI Fallbacks
 */

const ACADEMY_CONFIG = {
    TRIAL_DAYS: 21,
    MS_PER_DAY: 24 * 60 * 60 * 1000
};

/**
 * Main Entry Point: Synchronizes User Profile and Trial Status
 */
async function initEliteAcademy() {
    const grid = document.getElementById('courseGrid');
    const sysMsg = document.getElementById('academySystemMsg');

    try {
        // Guard: Ensure Supabase is available
        if (typeof supabase === 'undefined') {
            throw new Error("SUPABASE_NOT_DEFINED");
        }

        const { data: { user }, error: authError } = await supabase.auth.getUser();
        if (authError || !user) return;

        // 1. Fetch User Profile
        let { data: profile, error: profError } = await supabase
            .from('profiles')
            .select('neural_credits, academy_trial_started_at')
            .eq('id', user.id)
            .single();

        if (profError) throw profError;

        // 2. Initial Trial Setup (Triggers only on first access)
        let trialDateStr = profile.academy_trial_started_at;
        if (!trialDateStr) {
            trialDateStr = new Date().toISOString();
            const { error: updateError } = await supabase
                .from('profiles')
                .update({ academy_trial_started_at: trialDateStr })
                .eq('id', user.id);
            
            if (updateError) throw updateError;
        }

        // 3. Time Calculations
        const startDate = new Date(trialDateStr);
        const expiryDate = new Date(startDate.getTime() + (ACADEMY_CONFIG.TRIAL_DAYS * ACADEMY_CONFIG.MS_PER_DAY));
        const today = new Date();
        
        const isExpired = today > expiryDate;
        const timeLeftMs = expiryDate - today;
        const daysLeft = Math.max(0, Math.ceil(timeLeftMs / ACADEMY_CONFIG.MS_PER_DAY));

        // 4. Update Header Components
        updateAcademyHeader(isExpired, daysLeft, profile.neural_credits || 0, startDate, expiryDate);

        // 5. Load Initial Course Grid
        await loadAcademyCourses(isExpired);

    } catch (err) {
        console.error("Academy Sync Failed:", err);
        if (grid) {
            grid.innerHTML = `
                <div class="col-span-full py-20 text-center animate-pulse">
                    <p class="text-red-500 text-[10px] font-black uppercase tracking-[0.3em]">Neural Link Severed</p>
                    <button onclick="initEliteAcademy()" class="mt-4 px-6 py-2 border border-blue-500/20 text-blue-500 text-[8px] font-black uppercase tracking-widest hover:bg-blue-500/10 transition-all">Reconnect</button>
                </div>
            `;
        }
        if (sysMsg) sysMsg.innerText = "SYSTEM ERROR: AUTH_SYNC_FAILURE";
    }
}

/**
 * Updates UI Header elements based on trial status
 */
function updateAcademyHeader(isExpired, daysLeft, credits, start, end) {
    const timerText = document.getElementById('trialCountdown');
    const badge = document.getElementById('trialBadge');
    const progress = document.getElementById('trialProgressBar');
    const creditDisplay = document.getElementById('academyCredits');

    if (creditDisplay) creditDisplay.innerText = credits.toString().padStart(4, '0');

    if (isExpired) {
        if (timerText) {
            timerText.innerText = "Trial Concluded // Premium Required";
            timerText.classList.add('text-red-500');
        }
        if (badge) {
            badge.innerText = "PREMIUM LOCKED";
            badge.className = "px-2 py-0.5 rounded border border-red-500/30 text-[7px] font-black text-red-500 uppercase tracking-widest";
        }
        if (progress) {
            progress.style.width = "100%";
            progress.classList.add('bg-red-600');
        }
    } else {
        if (timerText) timerText.innerText = `${daysLeft} Days of Free Access Remaining`;
        if (badge) badge.innerText = "TRIAL ACTIVE";
        if (progress) {
            const now = new Date();
            const percent = ((now - start) / (end - start)) * 100;
            progress.style.width = `${percent}%`;
        }
    }
}

/**
 * Fetches courses and renders them to the DOM
 */
async function loadAcademyCourses(isExpired, providerFilter = 'all') {
    const grid = document.getElementById('courseGrid');
    if (!grid) return;

    // Reset grid to loading state briefly to show intent
    let query = supabase.from('courses').select('*').order('difficulty_level', { ascending: true });
    
    if (providerFilter !== 'all') {
        query = query.eq('provider', providerFilter);
    }

    const { data: courses, error } = await query;

    if (error || !courses) {
        grid.innerHTML = `<div class="col-span-full text-center text-white/20 text-[10px] uppercase font-black py-20">No active tracks found in database.</div>`;
        return;
    }

    grid.innerHTML = courses.map(course => {
        const isFree = !isExpired || course.credit_cost === 0;
        
        return `
        <div class="group p-6 rounded-[2.5rem] bg-[#050b1d]/40 border border-white/5 hover:border-blue-500/30 transition-all duration-500 relative overflow-hidden">
            <div class="flex justify-between items-start mb-6">
                <div class="h-12 w-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                    <i class="fas ${course.icon_type || 'fa-code'} text-blue-500"></i>
                </div>
                <span class="text-[7px] font-black text-white/30 uppercase tracking-widest px-3 py-1 bg-white/5 rounded-full border border-white/5">
                    ${course.provider}
                </span>
            </div>

            <h3 class="text-white font-black italic uppercase tracking-tighter text-lg mb-4 group-hover:text-blue-400 transition-colors">
                ${course.title}
            </h3>
            
            <div class="space-y-3 mb-6">
                <div class="flex justify-between text-[8px] font-black uppercase tracking-widest">
                    <span class="text-white/20">Clearance</span>
                    <span class="text-blue-500 italic">LVL ${course.difficulty_level.toString().padStart(2, '0')}</span>
                </div>
                <div class="flex justify-between text-[8px] font-black uppercase tracking-widest">
                    <span class="text-white/20">Protocol Cost</span>
                    <span class="${isFree ? 'text-green-400 font-bold' : 'text-white'}">
                        ${isFree ? 'FREE (TRIAL)' : course.credit_cost + ' Credits'}
                    </span>
                </div>
            </div>

            <button onclick="handleCourseAccess('${course.external_url}', ${course.credit_cost}, ${isExpired})" 
                class="w-full py-4 rounded-2xl bg-white/[0.03] border border-white/10 text-[9px] font-black text-white uppercase tracking-widest hover:bg-blue-600 hover:border-blue-500 hover:shadow-[0_0_20px_rgba(37,99,235,0.3)] transition-all">
                ${isFree ? 'Access Hub' : 'Unlock protocol'}
            </button>
        </div>
        `;
    }).join('');
}

/**
 * Redirects or Triggers Unlock Modal
 */
function handleCourseAccess(url, cost, isExpired) {
    if (isExpired && cost > 0) {
        if (typeof showSystemAlert === 'function') {
            showSystemAlert(`INSUFFICIENT CREDITS: Trial concluded. Unlock for ${cost} credits.`);
        } else {
            alert(`PREMIUM HUB LOCKED: ${cost} Credits required.`);
        }
        return;
    }
    window.open(url, '_blank');
}

/**
 * Global Filter Controller
 */
window.filterClasses = async (provider) => {
    // 1. UI Button States
    document.querySelectorAll('.class-filter-btn').forEach(btn => {
        const text = btn.innerText.toLowerCase();
        const isMatch = text.includes(provider.toLowerCase()) || (provider === 'all' && text.includes('ALL'));
        
        if (isMatch) {
            btn.classList.add('bg-blue-600', 'text-white');
            btn.classList.remove('text-white/40');
        } else {
            btn.classList.remove('bg-blue-600', 'text-white');
            btn.classList.add('text-white/40');
        }
    });

    // 2. Data Logic
    try {
        const { data: { user } } = await supabase.auth.getUser();
        const { data: profile } = await supabase.from('profiles').select('academy_trial_started_at').eq('id', user.id).single();
        
        const expiry = new Date(new Date(profile.academy_trial_started_at).getTime() + (ACADEMY_CONFIG.TRIAL_DAYS * ACADEMY_CONFIG.MS_PER_DAY));
        const expired = new Date() > expiry;
        
        await loadAcademyCourses(expired, provider);
    } catch (err) {
        console.error("Filter logic failed:", err);
    }
};
