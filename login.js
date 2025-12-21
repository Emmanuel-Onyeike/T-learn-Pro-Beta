const loginForm = document.getElementById('loginForm');
const loginBtn = document.getElementById('loginBtn');

if (loginForm && loginBtn) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // 1. UI Loading State
        const originalText = loginBtn.innerHTML;
        loginBtn.disabled = true;
        loginBtn.innerHTML = `
            <i class="fas fa-shield-check fa-spin mr-2"></i> 
            VERIFYING...
        `;

        // 2. Data Collection
        // Note: Ensure your HTML inputs have these IDs: id="loginEmail" and id="loginPassword"
        const email = document.getElementById('loginEmail').value.trim();
        const password = document.getElementById('loginPassword').value;

        try {
            // 3. Supabase Auth Call
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password
            });

            // 4. Handle Response
            if (error) {
                alert('Login failed: ' + error.message);
                // Reset button only on failure so the user can try again
                loginBtn.disabled = false;
                loginBtn.innerHTML = originalText;
            } else {
                // Success: Direct to dashboard
                // The session is now saved in the browser automatically by Supabase
                window.location.href = 'dashboard.html';
            }
        } catch (err) {
            console.error('Connection Error:', err);
            alert('A system connection error occurred. Please try again.');
            loginBtn.disabled = false;
            loginBtn.innerHTML = originalText;
        }
    });
}