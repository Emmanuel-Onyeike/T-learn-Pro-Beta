
const registerForm = document.getElementById('registerForm'); // add id="registerForm" to form
if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const btn = document.querySelector('#registerBtn');
        const original = btn.innerHTML;
        btn.disabled = true;
        btn.innerHTML = 'Creating Node...';

        const fullName = document.getElementById('fullName').value.trim(); // add id to input
        const email = document.getElementById('regEmail').value.trim();
        const password = document.getElementById('regPassword').value;

        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: { full_name: fullName }
            }
        });

        if (error) {
            alert('Error: ' + error.message);
        } else {
            alert('Registration successful! Check your email to confirm.');
            window.location.href = 'login.html';
        }

        btn.disabled = false;
        btn.innerHTML = original;
    });
}
