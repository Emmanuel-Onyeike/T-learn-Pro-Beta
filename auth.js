// auth.js - Real Authentication for T Learn Pro

const supabaseUrl = 'https://mddlkobjiquicopymipy.supabase.co';
const supabaseKey = 'sb_publishable_w5jI7FaNhpSCsT1GBHEmIw_Wmekf2dH';

const supabase = Supabase.createClient(supabaseUrl, supabaseKey);

// Check if user is logged in on every page load
async function checkAuth() {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        // Not logged in → redirect to login (except on login/register pages)
        if (!window.location.pathname.includes('login.html') && !window.location.pathname.includes('register.html')) {
            window.location.href = 'login.html';
        }
    } else {
        // Logged in — show real name everywhere
        const fullName = user.user_metadata?.full_name || user.email.split('@')[0];
        document.querySelectorAll('[data-user-name]').forEach(el => {
            el.textContent = fullName;
        });

        // Redirect away from login/register
        if (window.location.pathname.includes('login.html') || window.location.pathname.includes('register.html')) {
            window.location.href = 'dashboard.html';
        }
    }
}

// Logout function (add to logout button later)
async function logout() {
    await supabase.auth.signOut();
    window.location.href = 'login.html';
}

// Run on page load
document.addEventListener('DOMContentLoaded', checkAuth);