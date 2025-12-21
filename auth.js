// auth.js - Final working version (no errors)

let supabaseClient = null;

async function loadSupabase() {
    if (supabaseClient) return supabaseClient;

    // Create and load the Supabase script
    return new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';
        script.onload = () => {
            const supabaseUrl = 'https://mddlkobjiquicopymipy.supabase.co';
            const supabaseKey = 'sb_publishable_w5jI7FaNhpSCsT1GBHEmIw_Wmekf2dH';

            supabaseClient = Supabase.createClient(supabaseUrl, supabaseKey);
            resolve(supabaseClient);
        };
        script.onerror = () => {
            alert('Failed to load Supabase. Check internet connection.');
        };
        document.head.appendChild(script);
    });
}

async function checkAuth() {
    const client = await loadSupabase();
    const { data: { user } } = await client.auth.getUser();

    if (!user) {
        if (!window.location.pathname.includes('login.html') && !window.location.pathname.includes('register.html')) {
            window.location.href = 'login.html';
        }
    } else {
        const fullName = user.user_metadata?.full_name || user.email.split('@')[0];
        document.querySelectorAll('[data-user-name]').forEach(el => {
            el.textContent = fullName;
        });

        if (window.location.pathname.includes('login.html') || window.location.pathname.includes('register.html')) {
            window.location.href = 'dashboard.html';
        }
    }
}

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
                alert('Success! Check your email to confirm your account.');
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

// Global logout
window.logout = async () => {
    const client = await loadSupabase();
    await client.auth.signOut();
    window.location.href = 'login.html';
};

// Run everything
document.addEventListener('DOMContentLoaded', async () => {
    await checkAuth();
    await attachFormHandlers();
});
