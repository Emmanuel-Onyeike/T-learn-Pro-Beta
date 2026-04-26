/**
 * TECH NXXT: ELITE ACADEMY ENGINE
 * Individual 21-Day Trial Logic & Course Management
 */

const ACADEMY_CONFIG = {
    TRIAL_DAYS: 21,
    MS_PER_DAY: 24 * 60 * 60 * 1000
};

async function initEliteAcademy() {
    try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        // 1. Fetch User Profile
        let { data: profile, error } = await supabase
            .from('profiles')
            .select('neural_credits, academy_trial_started_at')
            .eq('id', user.id)
            .single();

        if (error) throw error;

        // 2. Initial Trial Setup (First time access)
        if (!profile.academy_trial_started_at) {
            const now = new Date().toISOString();
            await supabase
                .from('profiles')
                .update({ academy_trial_started_at: now })
                .eq('id', user.id);
            profile.academy_trial_started_at = now;
        }

        // 3. Time Calculations
        const startDate = new Date(profile.academy_trial_started_at);
        const expiryDate = new Date(startDate.getTime() + (ACADEMY_CONFIG.TRIAL_DAYS * ACADEMY_CONFIG.MS_PER_DAY));
        const today = new Date();
        
        const isExpired = today > expiryDate;
        const timeLeftMs = expiryDate - today;
        const daysLeft = Math.max(0, Math.ceil(timeLeftMs / ACADEMY_CONFIG.MS_PER_DAY));

        // 4. Update Header UI
        updateAcademyHeader(isExpired, daysLeft, profile.neural_credits, startDate, expiryDate);

        // 5. Load Content
        await loadAcademyCourses(isExpired);

    } catch (err) {
        console.error("Academy Sync Failed:", err);
        document.getElementById('academySystemMsg').innerText = "SYSTEM ERROR: AUTH_SYNC_FAILURE";
    }
}

function updateAcademyHeader(isExpired, daysLeft, credits, start, end) {
    const timerText = document.getElementById('trialCountdown');
    const badge = document.getElementById('trialBadge');
    const progress = document.getElementById('trialProgressBar');
    const creditDisplay = document.getElementById('academyCredits');

    if (creditDisplay) creditDisplay.innerText = credits.toString().padStart(4, '0');

    if (isExpired) {
        timerText.innerText = "Trial Concluded // Credits Required";
        timerText.classList.add('text-red-500');
        badge.innerText = "PREMIUM LOCKED";
        badge.classList.replace('border-blue-500/30', 'border-red-500/30');
        badge.classList.add('text-red-500');
        if (progress) {
            progress.style.width = "100%";
            progress.classList.add('bg-red-600');
        }
    } else {
        timerText.innerText = `${daysLeft} Days of Free Access Remaining`;
        badge.innerText = "TRIAL ACTIVE";
        if (progress) {
            const now = new Date();
            const percent = ((now - start) / (end - start)) * 100;
            progress.style.width = `${percent}%`;
        }
    }
}

async function loadAcademyCourses(isExpired, providerFilter = 'all') {
    const grid = document.getElementById('courseGrid');
    if (!grid) return;

    let query = supabase.from('courses').select('*').order('difficulty_level', { ascending: true });
    
    if (providerFilter !== 'all') {
        query = query.eq('provider', providerFilter);
    }

    const { data: courses, error } = await query;

    if (error) {
        grid.innerHTML = `<p class="text-red-500 text-[10px]">Failed to load tracks.</p>`;
        return;
    }

    grid.innerHTML = courses.map(course => `
        <div class="group p-6 rounded-[2.5rem] bg-[#050b1d]/40 border border-white/5 hover:border-blue-500/30 transition-all duration-500 relative">
            <div class="flex justify-between items-start mb-6">
                <div class="h-12 w-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                    <i class="fas ${course.icon_type} text-blue-500"></i>
                </div>
                <span class="text-[7px] font-black text-white/30 uppercase tracking-widest px-3 py-1 bg-white/5 rounded-full">
                    ${course.provider}
                </span>
            </div>

            <h3 class="text-white font-black italic uppercase tracking-tighter text-lg mb-4 group-hover:text-blue-400 transition-colors">
                ${course.title}
            </h3>
            
            <div class="space-y-3 mb-6">
                <div class="flex justify-between text-[8px] font-black uppercase tracking-widest">
                    <span class="text-white/20">Clearance</span>
                    <span class="text-blue-500 italic">LVL ${course.difficulty_level}</span>
                </div>
                <div class="flex justify-between text-[8px] font-black uppercase tracking-widest">
                    <span class="text-white/20">Protocol Cost</span>
                    <span class="${isExpired ? 'text-white' : 'text-green-400 font-bold'}">
                        ${isExpired ? course.credit_cost + ' Credits' : 'FREE (TRIAL)'}
                    </span>
                </div>
            </div>

            <button onclick="handleCourseAccess('${course.external_url}', ${course.credit_cost}, ${isExpired})" 
                class="w-full py-4 rounded-2xl bg-white/[0.03] border border-white/10 text-[9px] font-black text-white uppercase tracking-widest hover:bg-blue-600 hover:border-blue-500 hover:shadow-[0_0_20px_rgba(37,99,235,0.3)] transition-all">
                ${isExpired ? 'Unlock with Credits' : 'Access Hub'}
            </button>
        </div>
    `).join('');
}

function handleCourseAccess(url, cost, isExpired) {
    if (isExpired) {
        // Trigger your existing modal or alert for insufficient credits
        showSystemAlert(`INSUFFICIENT CREDITS: Trial period expired. This track requires ${cost} credits.`);
        return;
    }
    
    // Track the click in analytics or logs if needed
    console.log(`Accessing Course Hub: ${url}`);
    window.open(url, '_blank');
}

// Filter Function
window.filterClasses = (provider) => {
    // Update button UI
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

    // Check expiration state again before filtering
    supabase.auth.getUser().then(({data: {user}}) => {
        supabase.from('profiles').select('academy_trial_started_at').eq('id', user.id).single()
            .then(({data}) => {
                const expiry = new Date(new Date(data.academy_trial_started_at).getTime() + (21 * 24 * 60 * 60 * 1000));
                loadAcademyCourses(new Date() > expiry, provider);
            });
    });
};
