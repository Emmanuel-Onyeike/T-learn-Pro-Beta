const registerForm = document.getElementById('registerForm');
const registerBtn = document.getElementById('registerBtn');

if (registerForm && registerBtn) {
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // 1. UI Loading State
        const originalText = registerBtn.innerHTML;
        registerBtn.disabled = true;
        registerBtn.innerHTML = `
            <i class="fas fa-circle-notch fa-spin mr-2"></i> 
            CREATING ACCOUNT...
        `;

        // 2. Data Collection
        const fullName = document.getElementById('fullName').value.trim();
        const email = document.getElementById('regEmail').value.trim();
        const password = document.getElementById('regPassword').value;

        try {
            // 3. Supabase Auth Call
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: { 
                        full_name: fullName,
                        rank: 'Beginner', // Setting default rank for Emmanuel/Users
                        created_at: new Date().toISOString()
                    }
                }
            });

            // 4. Handle Response
            if (error) {
                alert('Registration failed: ' + error.message);
            } else {
                // Success: Direct to login or show confirmation
                alert('Success! Check your email to confirm your account.');
                window.location.href = 'login.html';
            }
        } catch (err) {
            console.error('System Error:', err);
            alert('An unexpected system error occurred.');
        } finally {
            // 5. Reset UI State
            registerBtn.disabled = false;
            registerBtn.innerHTML = originalText;
        }
    });
}