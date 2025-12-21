
const loginForm = document.getElementById('loginForm'); // add id to form
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const btn = document.getElementById('loginBtn');
        const original = btn.innerHTML;
        btn.disabled = true;
        btn.innerHTML = 'Verifying...';

        const email = loginForm.querySelector('input[type="email"]').value;
        const password = loginForm.querySelector('input[type="password"]').value;

        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        });

        if (error) {
            alert('Error: ' + error.message);
        } else {
            window.location.href = 'dashboard.html';
        }

        btn.disabled = false;
        btn.innerHTML = original;
    });
}
