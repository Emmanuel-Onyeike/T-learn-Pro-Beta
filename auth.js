// auth.js - Final, error-free version

let supabaseClient = null;

async function loadSupabase() {
    if (supabaseClient) return supabaseClient;

    // Load Supabase CDN
    await new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';
        script.onload = resolve;
        script.onerror = () => reject(new Error('Failed to load Supabase'));
        document.head.appendChild(script);
    });

    // Now Supabase is loaded globally
    const { createClient } = Supabase; // This is the correct way

    const supabaseUrl = 'https://mddlkobjiquicopymipy.supabase.co';
    const supabaseKey = 'sb_publishable_w5jI7FaNhpSCsT1GBHEmIw_Wmekf2dH';

    supabaseClient = createClient(supabaseUrl, supabaseKey);
    return supabaseClient;
}

async function checkAuth() {
    try {
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
    } catch (err) {
        console.error('Auth check failed:', err);
    }
}

async function attachFormHandlers() {
    try {
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
    } catch (err) {
        console.error('Form handler failed:', err);
    }
}

// Global logout
window.logout = async () => {
    const client = await loadSupabase();
    await client.auth.signOut();
    window.location.href = 'login.html';
};

// Run on load
document.addEventListener('DOMContentLoaded', async () => {
    await checkAuth();
    await attachFormHandlers();
});
