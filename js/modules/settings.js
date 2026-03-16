/* ── T LEARN PRO: modules/settings.js ── */
/* Toggle switches, profile image, pricing, payment modal */

function startHistoryClock() {
    const clockElement = document.getElementById('liveHistoryClock');
    if (clockElement) {
        const now = new Date();
        clockElement.innerText = now.toLocaleString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true,
            day: 'numeric',
            month: 'short'
        });
    }
}
// Update clock every second
setInterval(startHistoryClock, 1000);
/// for the notification toggles
// Function to handle toggles and save to LocalStorage
function toggleSwitch(id) {
    const btn = document.getElementById(id);
    const isOff = !btn.classList.contains('on');

    if (isOff) {
        btn.classList.add('on');
        localStorage.setItem(id, 'true');
    } else {
        btn.classList.remove('on');
        localStorage.setItem(id, 'false');
    }
}
// Function to load the saved states whenever the Settings tab is opened
function loadToggleStates() {
    const toggles = ['emailNotif', 'collabNotif', 'securityNotif'];
    toggles.forEach(id => {
        const btn = document.getElementById(id);
        if (btn) {
            const savedState = localStorage.getItem(id);
            if (savedState === 'true') {
                btn.classList.add('on');
            } else {
                btn.classList.remove('on');
            }
        }
    });
}

/**
 * GALLERY SYSTEM — Camera icon click handler
 */
function triggerImageUpload() {
    let imgInput = document.getElementById('hiddenGalleryInput');
    if (!imgInput) {
        imgInput = document.createElement('input');
        imgInput.type = 'file';
        imgInput.accept = 'image/*';
        imgInput.id = 'hiddenGalleryInput';
        imgInput.style.display = 'none';
        document.body.appendChild(imgInput);

        imgInput.onchange = async (e) => {
            const file = e.target.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = (event) => {
                const base64Image = event.target.result;
                document.querySelectorAll('[data-user-img]').forEach(img => {
                    img.src = base64Image;
                    img.classList.remove('hidden');
                    img.parentElement.querySelector('#defaultUserIcon')?.classList.add('hidden');
                });
                localStorage.setItem('temp_img_buffer', base64Image);
            };
            reader.readAsDataURL(file);
        };
    }
    imgInput.click();
}
window.triggerImageUpload = triggerImageUpload;

/**
 * 2. UI SYNC (Loads from Supabase → Shows on Dashboard)
 */
async function syncProfileUI() {
    const client = await window.supabaseLoader.load();
    const user = await window.AuthState.getUser();

    // FIXED: Use root-relative paths (/assets/...) instead of relative (../assets/...)
    // This prevents 404s when navigating between different page depths.
    let savedName = "New User";
    let savedImg = "/assets/Logo.webp"; 
    let savedBio = "";

    if (user) {
        savedName = user.user_metadata?.full_name || user.email.split('@')[0];
        savedImg = user.user_metadata?.avatar_url || "/assets/Logo.webp";
        savedBio = user.user_metadata?.bio || "";
    }

    // Update all name places
    document.querySelectorAll('[data-user-name]').forEach(el => el.textContent = savedName);

    // Update all image places
    document.querySelectorAll('[data-user-img]').forEach(img => {
        img.src = savedImg;
        // Logic to hide default icons if a real PFP exists
        if (savedImg && !savedImg.includes("Logo.webp")) {
            img.classList.remove('hidden');
            img.parentElement.querySelector('#defaultUserIcon')?.classList.add('hidden');
        } else {
            // If it IS the logo, ensure default icon logic is handled
            img.classList.add('hidden'); // or handle as per your CSS
            img.parentElement.querySelector('#defaultUserIcon')?.classList.remove('hidden');
        }
    });

    // Fill inputs
    const nameInput = document.getElementById('editFullName');
    const bioInput = document.getElementById('editBio');
    if (nameInput) nameInput.value = (savedName === "New User") ? "" : savedName;
    if (bioInput) bioInput.value = savedBio;

    // Fallback localStorage
    localStorage.setItem('tlp_user_name', savedName);
    localStorage.setItem('tlp_user_img', savedImg);
    localStorage.setItem('tlp_user_bio', savedBio);
}

/**
 * 3. SAVE PROFILE (Uploads Image + Syncs to Supabase)
 */
async function saveProfile(event) {
    const client = await window.supabaseLoader.load();
    const user = await window.AuthState.getUser();
    
    if (!user) {
        alert("Session expired. Please log in again.");
        window.location.href = 'login.html';
        return;
    }

    const nameInput = document.getElementById('editFullName');
    const bioInput = document.getElementById('editBio');
    const saveBtn = event?.currentTarget || document.querySelector('.save-btn'); // Fallback if event is missing

    if (!nameInput) return;

    const newName = nameInput.value.trim();
    const newBio = bioInput ? bioInput.value.trim() : "";
    const bufferedImg = localStorage.getItem('temp_img_buffer');

    if (!newName) {
        alert("DATA ERROR: A name is required.");
        return;
    }

    const originalText = saveBtn.innerText;
    saveBtn.innerText = "SYNCING...";
    saveBtn.disabled = true;

    try {
        let avatarUrl = localStorage.getItem('tlp_user_img') || "/assets/Logo.webp";

        if (bufferedImg && bufferedImg.startsWith('data:image')) {
            // FIXED: Proper Blob conversion and MIME type detection
            const response = await fetch(bufferedImg);
            const blob = await response.blob();
            
            const fileExt = blob.type.split('/')[1] || 'png';
            const fileName = `${user.id}.${fileExt}`;

            // FIXED: Added contentType and simplified error handling
            const { error: uploadError } = await client.storage
                .from('avatars')
                .upload(fileName, blob, { 
                    contentType: blob.type, 
                    upsert: true 
                });

            if (uploadError) throw uploadError;

            // Get the clean Public URL
            const { data: urlData } = client.storage.from('avatars').getPublicUrl(fileName);
            avatarUrl = urlData.publicUrl;
        }

        // Sync to Auth Metadata
        const { error: updateError } = await client.auth.updateUser({
            data: {
                full_name: newName,
                bio: newBio,
                avatar_url: avatarUrl
            }
        });

        if (updateError) throw updateError;

        // Success Cleanup
        localStorage.setItem('tlp_user_name', newName);
        localStorage.setItem('tlp_user_bio', newBio);
        localStorage.setItem('tlp_user_img', avatarUrl);
        localStorage.removeItem('temp_img_buffer');

        await syncProfileUI();
        alert("SUCCESS: Profile synced across all devices!");

    } catch (err) {
        // This will trigger your centered modal alert
        alert("SYNC ERROR: " + err.message);
    } finally {
        saveBtn.innerText = originalText;
        saveBtn.disabled = false;
    }
}



/**
 * SYSTEM INITIALIZATION: PRICING & PAYMENT GATEWAY
 * ------------------------------------------------
 * Email: technxxtsup@gmail.com
 * Key: pk_live_2aeacf09484dd75cf6e2f61fa160c61096ff1c79
 */

let isYearly = false;

// 1. PRICING TOGGLE: Switches UI display and price calculations
function togglePricing() {
    isYearly = !isYearly;
    const ball = document.getElementById('toggleBall');
    const studentPrice = document.getElementById('studentPrice');
    const proPrice = document.getElementById('proPrice');
    const sPeriod = document.getElementById('studentPeriod');
    const pPeriod = document.getElementById('proPeriod');
    const mLabel = document.getElementById('monthlyLabel');
    const yLabel = document.getElementById('yearlyLabel');

    if (isYearly) {
        ball.style.transform = 'translateX(28px)';
        studentPrice.innerText = '₦74,400';
        proPrice.innerText = '₦142,800';
        sPeriod.innerText = '/ Year';
        pPeriod.innerText = '/ Year';
        yLabel.classList.remove('text-gray-500');
        yLabel.classList.add('text-white');
        mLabel.classList.add('text-gray-500');
    } else {
        ball.style.transform = 'translateX(0px)';
        studentPrice.innerText = '₦8,000';
        proPrice.innerText = '₦16,000';
        sPeriod.innerText = '/ Month';
        pPeriod.innerText = '/ Month';
        mLabel.classList.remove('text-gray-500');
        mLabel.classList.add('text-white');
        yLabel.classList.add('text-gray-500');
    }
}

// 2. CORE PAYSTACK ENGINE: Handles the actual transaction
function payWithPaystack(plan) {
    let amount = 0;
    
    // Logic for Price Calculation (includes ₦500 Test Price for Student Monthly)
    if (plan.toLowerCase().includes('student')) {
        // Test Price: 500 | Regular: 74,400
        amount = isYearly ? 74400 * 100 : 500 * 100; 
    } else {
        // Pro Pricing
        amount = isYearly ? 142800 * 100 : 16000 * 100;
    }

    const handler = PaystackPop.setup({
        key: 'pk_live_2aeacf09484dd75cf6e2f61fa160c61096ff1c79',
        email: 'technxxtsup@gmail.com',
        amount: amount,
        currency: "NGN",
        ref: 'TRX_' + Math.floor((Math.random() * 1000000000) + 1),
        metadata: {
            custom_fields: [
                {
                    display_name: "Subscription Plan",
                    variable_name: "plan_type",
                    value: plan + (isYearly ? " (Yearly)" : " (Monthly)")
                }
            ]
        },
        callback: function(response) {
            // Store payment proof locally
            localStorage.setItem('payment_reference', response.reference);
            localStorage.setItem('active_plan', plan);
            
            alert('PROTOCOL SECURED: Payment successful. Ref: ' + response.reference);
            location.reload(); 
        },
        onClose: function() {
            console.warn('USER_SIGNAL: Payment window terminated by user.');
        }
    });
    handler.openIframe();
}

// 3. CENTERED MODAL: UI Alert for selecting a plan (Centered in Modal)
function showPricingAlert(plan) {
    const root = document.querySelector('section'); 
    if(root) root.style.filter = 'blur(15px)';

    const modal = document.createElement('div');
    // Centered modal styling
    modal.className = "fixed inset-0 z-[1000000] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300";
    
    const priceDisplay = plan.toLowerCase().includes('student') 
        ? (isYearly ? '₦74,400' : '₦500 (TEST)') 
        : (isYearly ? '₦142,800' : '₦16,000');

    modal.innerHTML = `
            <div id="price-modal-card" class="bg-[#050b1d] border border-blue-500/20 w-full max-w-sm rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 transition-transform">
                <div class="p-10 text-center">
                    <div class="w-20 h-20 bg-blue-500/10 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-blue-500/20 rotate-12">
                        <i class="fas fa-credit-card text-blue-500 text-3xl animate-pulse"></i>
                    </div>
                    <h3 class="text-white font-black uppercase italic text-2xl tracking-tighter mb-2">${plan} Access</h3>
                    <p class="text-blue-400 font-black text-xl mb-4">${priceDisplay}</p>
                    <p class="text-white/40 text-[11px] font-bold uppercase tracking-[0.2em] leading-relaxed">
                        Secure end-to-end encrypted transaction via Paystack.
                    </p>
                </div>
                <div class="p-8 bg-blue-500/5 border-t border-blue-500/10 flex flex-col gap-3">
                    <button id="pay-now-btn" class="w-full py-5 bg-blue-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all">
                        Pay Now
                    </button>
                    <button id="close-price-modal" class="w-full py-3 text-white/30 text-[9px] font-bold uppercase tracking-widest hover:text-white transition-all">
                        Cancel
                    </button>
                </div>
            </div>`;

    document.body.appendChild(modal);

    document.getElementById('pay-now-btn').onclick = () => {
        payWithPaystack(plan);
    };

    document.getElementById('close-price-modal').onclick = () => {
        const card = document.getElementById('price-modal-card');
        if(card) card.style.transform = 'scale(0.9)';
        modal.style.opacity = '0';
        if(root) root.style.filter = 'none';
        setTimeout(() => modal.remove(), 300);
    };
}

// 4. SLIDE-OUT MODAL LOGIC: For the sidebar Payment Gateway
function openPaymentModal(planName) {
    const modal = document.getElementById('payment-modal');
    const title = document.getElementById('active-plan-title');
    const root = document.querySelector('section');
    const payBtn = document.getElementById('confirm-payment-btn');

    if(title) title.innerText = planName;
    if(modal) modal.classList.remove('translate-x-full');
    if(root) root.style.filter = 'blur(10px)';

    // Attach Paystack engine to the slide-out button
    if(payBtn) {
        payBtn.onclick = () => {
            payWithPaystack(planName);
        };
    }
}

function closePaymentModal() {
    const modal = document.getElementById('payment-modal');
    const root = document.querySelector('section');

    if(modal) modal.classList.add('translate-x-full');
    if(root) root.style.filter = 'none';
}


///// for the logout/////////

  function handleLogout() {
    // Call your existing logout logic
    if (typeof logout === "function") {
      logout();
    }

    // Redirect to login page
    window.location.href = "login.html"; // or /login
  }




////// LESSON ONLY//////
/**
 * 1. ENHANCED CURRICULUM DATA
 */

// ─────────────────────────────────────────────────────────────────────────────
// curriculumData lives in js/curriculum.js — loaded before dashboard.js
// ─────────────────────────────────────────────────────────────────────────────


