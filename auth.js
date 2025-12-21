// auth.js - Final with Profile Data Loading

let supabaseClient = null;

async function loadSupabase() {
    if (supabaseClient) return supabaseClient;

    return new Promise((resolve, reject) => {
        if (typeof supabase !== 'undefined') {
            const { createClient } = supabase;
            supabaseClient = createClient(
                'https://mddlkobjiquicopymipy.supabase.co',
                'sb_publishable_w5jI7FaNhpSCsT1GBHEmIw_Wmekf2dH'
            );
            resolve(supabaseClient);
            return;
        }

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
        script.onerror = reject;
        document.head.appendChild(script);
    });
}

async function loadUserData() {
    const client = await loadSupabase();
    const { data: { user } } = await client.auth.getUser();

    if (user) {
        const fullName = user.user_metadata?.full_name || user.email.split('@')[0];
        const email = user.email || '';

        // Update all name places
        document.querySelectorAll('[data-user-name]').forEach(el => {
            el.textContent = fullName;
        });

        // Update all email places
        document.querySelectorAll('[data-user-email]').forEach(el => {
            el.textContent = email;
        });

        // Fill editable inputs in Profile tab
        const nameInput = document.getElementById('editFullName');
        const emailInput = document.getElementById('editEmail');
        if (nameInput) nameInput.value = fullName;
        if (emailInput) emailInput.value = email;
    }
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
            await loadUserData(); // Load name/email into dashboard

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

// Start
document.addEventListener('DOMContentLoaded', async () => {
    await checkAuth();
    await attachFormHandlers();
});
