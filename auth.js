// Make Supabase client available in dashboard.js
let supabaseClient = null;

async function getSupabaseClient() {
    if (supabaseClient) return supabaseClient;

    // Load the Supabase CDN if not already loaded
    if (typeof supabase === 'undefined') {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';
        script.onload = initializeClient;
        document.head.appendChild(script);
        await new Promise(resolve => script.onload = resolve);
    } else {
        initializeClient();
    }

    function initializeClient() {
        const { createClient } = supabase;
        supabaseClient = createClient(
            'https://mddlkobjiquicopymipy.supabase.co',
            'sb_publishable_w5jI7FaNhpSCsT1GBHEmIw_Wmekf2dH'
        );
    }

    return supabaseClient;
}
/**
 * FIXED: showModal is now attached to 'window' so dashboard.js can call it.
 * No other logic has been changed.
 */
window.showModal = function(title, message, isError = false) {
    const modal = document.getElementById('alertModal');
    const box = document.getElementById('alertBox');
    const overlay = document.getElementById('alertOverlay');
    const icon = document.getElementById('alertIcon');

    if (!modal) {
        alert(message);
        return;
    }

    document.getElementById('alertTitle').innerText = title;
    document.getElementById('alertMsg').innerText = message;

    if (isError) {
        icon.className = "w-16 h-16 bg-red-600/20 rounded-2xl flex items-center justify-center mx-auto mb-6 text-red-500";
        icon.innerHTML = '<i class="fas fa-exclamation-triangle text-2xl"></i>';
    } else {
        icon.className = "w-16 h-16 bg-blue-600/20 rounded-2xl flex items-center justify-center mx-auto mb-6 text-blue-500";
        icon.innerHTML = '<i class="fas fa-check text-2xl"></i>';
    }

    modal.classList.remove('invisible');
    setTimeout(() => {
        overlay.classList.add('opacity-100');
        box.classList.remove('scale-90', 'opacity-0');
    }, 10);
};

// Global Close for Modal
window.closeAlert = () => {
    const modal = document.getElementById('alertModal');
    const box = document.getElementById('alertBox');
    const overlay = document.getElementById('alertOverlay');

    overlay.classList.remove('opacity-100');
    box.classList.add('scale-90', 'opacity-0');

    setTimeout(() => {
        modal.classList.add('invisible');
    }, 300);
};

async function checkAuth() {
    const client = await loadSupabase();
    const { data: { user } } = await client.auth.getUser();

    if (!user) {
        if (!window.location.pathname.includes('login.html') && !window.location.pathname.includes('register.html')) {
            window.location.href = 'login.html';
        }
    } else {
        if (window.location.pathname.includes('login.html') || window.location.pathname.includes('register.html')) {
            window.location.href = 'dashboard.html';
        }
    }
}

async function attachFormHandlers() {
    const client = await loadSupabase();

    // Register Handler
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn = document.getElementById('registerBtn');
            const original = btn.innerHTML;
            btn.disabled = true;
            btn.innerHTML = 'CREATING ACCOUNT...';

            const fullName = document.getElementById('fullName').value.trim();
            const email = document.getElementById('regEmail').value.trim();
            const password = document.getElementById('regPassword').value;
            const confirm = document.getElementById('regConfirmPassword').value;

            if (password !== confirm) {
                window.showModal('SECURITY ERROR', 'Passkeys do not match. Please verify.', true);
                btn.disabled = false;
                btn.innerHTML = original;
                return;
            }

            const { error } = await client.auth.signUp({
                email,
                password,
                options: { data: { full_name: fullName } }
            });

            if (error) {
                window.showModal('REGISTRATION FAILED', error.message, true);
            } else {
                window.showModal('SUCCESS', 'Account created! Check your email to confirm.');
                setTimeout(() => {
                    window.location.href = 'login.html';
                }, 3000);
            }

            btn.disabled = false;
            btn.innerHTML = original;
        });
    }

    // Login Handler
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn = document.getElementById('loginBtn');
            const original = btn.innerHTML;
            btn.disabled = true;
            btn.innerHTML = 'VERIFYING...';

            const email = document.getElementById('loginEmail').value.trim();
            const password = document.getElementById('loginPassword').value;

            const { data, error } = await client.auth.signInWithPassword({
                email,
                password
            });

            if (error) {
                window.showModal('ACCESS DENIED', error.message, true);
                btn.disabled = false;
                btn.innerHTML = original;
            } else {
                const firstName = data.user.user_metadata?.full_name?.split(' ')[0] || "User";
                
                window.showModal('WELCOME BACK', `Greetings ${firstName}, we missed you. Initializing secure session...`);

                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 2000);
            }
        });
    }
}

window.logout = async () => {
    const client = await loadSupabase();
    await client.auth.signOut();
    localStorage.clear();
    window.location.href = 'login.html';
};

document.addEventListener('DOMContentLoaded', async () => {
    await checkAuth();
    await attachFormHandlers();
});