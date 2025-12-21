// auth.js - FINAL VERSION (works with CDN global 'supabase')

let supabaseClient = null;

async function getClient() {
    if (supabaseClient) return supabaseClient;

    // Wait for the global 'supabase' from CDN
    while (typeof supabase === 'undefined') {
        await new Promise(resolve => setTimeout(resolve, 100));
    }

    const supabaseUrl = 'https://mddlkobjiquicopymipy.supabase.co';
    const supabaseKey = 'sb_publishable_w5jI7FaNhpSCsT1GBHEmIw_Wmekf2dH';

    const { createClient } = supabase;
    supabaseClient = createClient(supabaseUrl, supabaseKey);
    return supabaseClient;
}

async function checkAuth() {
    const client = await getClient();
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
    const client = await getClient();

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
    const client = await getClient();
    await client.auth.signOut();
    window.location.href = 'login.html';
};

// Load CDN and start
document.addEventListener('DOMContentLoaded', () => {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';
    script.onload = async () => {
        await checkAuth();
        await attachFormHandlers();
    };
    document.head.appendChild(script);
});
