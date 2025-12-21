// auth.js - FINAL WORKING VERSION (name shows after login)

let supabaseClient = null;

async function loadSupabase() {
    if (supabaseClient) return supabaseClient;

    return new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';
        script.onload = () => {
            const { createClient } = supabase;
            supabaseClient = createClient(
                'https://mddlkobjiquicopymipy.supabase.co',
                'sb_publishable_w5jI7FaNhpSCsT1GBHEmIw_Wmekf2dH'
            );
            resolve(supabaseClient);
        };
        document.head.appendChild(script);
    });
}

// Update name and email in dashboard
async function updateUserInfo() {
    const client = await loadSupabase();
    const { data: { user } } = await client.auth.getUser();

    if (user) {
        const fullName = user.user_metadata?.full_name || user.email.split('@')[0];
        const email = user.email || '';

        // Update name
        document.querySelectorAll('[data-user-name]').forEach(el => {
            el.textContent = fullName;
        });

        // Update email (if you have places with data-user-email)
        document.querySelectorAll('[data-user-email]').forEach(el => {
            el.textContent = email;
        });
    }
}

// Check auth and redirect
async function checkAuth() {
    const client = await loadSupabase();
    const { data: { user } } = await client.auth.getUser();

    if (!user) {
        if (!window.location.pathname.includes('login.html') && !window.location.pathname.includes('register.html')) {
            window.location.href = 'login.html';
        }
    } else {
        await updateUserInfo(); // This updates the name

        if (window.location.pathname.includes('login.html') || window.location.pathname.includes('register.html')) {
            window.location.href = 'dashboard.html';
        }
    }
}

// Form handlers (register & login)
async function attachFormHandlers() {
    const client = await loadSupabase();

    // Register
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn = document.getElementById('registerBtn');
            const original = btn.innerHTML;
            btn.disabled = true;
            btn.innerHTML = 'Creating Node...';

            const fullName = document.getElementById('fullName').value.trim();
            const email = document.getElementById('regEmail').value.trim();
            const password = document.getElementById('regPassword').value;
            const confirm = document.getElementById('regConfirmPassword').value;

            if (password !== confirm) {
                alert('Passkeys do not match');
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
                alert('Error: ' + error.message);
            } else {
                alert('Success! Check your email to confirm.');
                window.location.href = 'login.html';
            }

            btn.disabled = false;
            btn.innerHTML = original;
        });
    }

    // Login
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn = document.getElementById('loginBtn');
            const original = btn.innerHTML;
            btn.disabled = true;
            btn.innerHTML = 'Verifying...';

            const email = document.getElementById('loginEmail').value.trim();
            const password = document.getElementById('loginPassword').value;

            const { error } = await client.auth.signInWithPassword({
                email,
                password
            });

            if (error) {
                alert('Login failed: ' + error.message);
            } else {
                window.location.href = 'dashboard.html';
            }

            btn.disabled = false;
            btn.innerHTML = original;
        });
    }
}

// Run on load
document.addEventListener('DOMContentLoaded', async () => {
    await checkAuth();
    await attachFormHandlers();
});

// Listen for auth changes (important — updates name after login)
supabaseClient?.auth.onAuthStateChange(async (event, session) => {
    if (event === 'SIGNED_IN' || event === 'USER_UPDATED') {
        await updateUserInfo();
    }
});


// Listen for auth changes (this fires after login)
const { data: listener } = supabase.auth.onAuthStateChange(async (event, session) => {
    if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED' || event === 'USER_UPDATED') {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
            const fullName = user.user_metadata?.full_name || user.email.split('@')[0];
            document.querySelectorAll('[data-user-name]').forEach(el => {
                el.textContent = fullName;
            });
        }
    }
});
