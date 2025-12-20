/**
 * T LEARN PRO | Integrated Beta Terminal Logic
 * Combined: Sidebar, Header Scroll, & Icon-Based Content Engine
 */

document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Element Selectors ---
    const header = document.getElementById('mainHeader');
    const openMenu = document.getElementById('openMenu');
    const closeMenu = document.getElementById('closeMenu');
    const sidebar = document.getElementById('mobileSidebar');
    const overlay = document.getElementById('sidebarOverlay');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');
    const typingElement = document.getElementById('typingText');
    const iconElement = document.getElementById('rotatingIcon'); // Targeted the Icon element

    // --- 2. Sidebar Navigation Logic ---
    const toggleSidebar = (isOpen) => {
        if (!sidebar || !overlay) return;
        
        if (isOpen) {
            sidebar.classList.remove('-translate-x-full');
            overlay.classList.remove('hidden');
            setTimeout(() => overlay.classList.add('opacity-100'), 10);
            document.body.style.overflow = 'hidden'; 
        } else {
            sidebar.classList.add('-translate-x-full');
            overlay.classList.remove('opacity-100');
            setTimeout(() => overlay.classList.add('hidden'), 500);
            document.body.style.overflow = ''; 
        }
    };

    if (openMenu) openMenu.addEventListener('click', () => toggleSidebar(true));
    if (closeMenu) closeMenu.addEventListener('click', () => toggleSidebar(false));
    if (overlay) overlay.addEventListener('click', () => toggleSidebar(false));

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => toggleSidebar(false));
    });

    // --- 3. Header Scroll Animation ---
    window.addEventListener('scroll', () => {
        if (header) {
            if (window.scrollY > 50) {
                header.classList.add('header-scrolled');
            } else {
                header.classList.remove('header-scrolled');
            }
        }
    });

    // --- 4. Dynamic Content Engine (Typing & Icons) ---
    const contentData = [
        {
            icon: "fa-satellite-dish",
            text: "Accessing Priority Waitlist. Syncing elite data points for global operations."
        },
        {
            icon: "fa-users-gear", 
            text: "Analyzing Team Beta Terminal. Real-time intelligence at your fingertips."
        },
        {
            icon: "fa-microchip",
            text: "Expanding Nxxt AI Network Nodes. Experience the future of tactical learning."
        }
    ];

    let currentIndex = 0;

    function typeEffect(text, i = 0) {
        if (!typingElement) return;

        if (i <= text.length) {
            typingElement.innerHTML = text.substring(0, i);
            setTimeout(() => typeEffect(text, i + 1), 40); 
        } else {
            // Wait 5 seconds after text hits the dot, then switch
            setTimeout(rotateContent, 5000);
        }
    }

    function rotateContent() {
        if (!iconElement) return;

        currentIndex = (currentIndex + 1) % contentData.length;
        
        // Update Tactical Dots
        [1, 2, 3].forEach(num => {
            const dot = document.getElementById(`dot${num}`);
            if (dot) {
                dot.style.backgroundColor = (num - 1 === currentIndex) ? '#3b82f6' : 'rgba(255,255,255,0.1)';
                dot.style.boxShadow = (num - 1 === currentIndex) ? '0 0 10px #3b82f6' : 'none';
            }
        });

        // Icon Transition: Fade out and Shrink
        iconElement.style.opacity = '0';
        iconElement.style.transform = 'scale(0.8)';
        
        setTimeout(() => {
            // Update the Font Awesome classes
            // We keep 'fas' and 'rotating-icon-base-classes', then swap the specific icon
            iconElement.className = `fas ${contentData[currentIndex].icon} text-[12rem] md:text-[18rem] text-blue-500/10 transition-all duration-1000 transform`;
            
            // Fade in and Expand
            iconElement.style.opacity = '1';
            iconElement.style.transform = 'scale(1)';
            
            typeEffect(contentData[currentIndex].text);
        }, 1000);
    }

    // Initialize typing if data exists
    if (contentData.length > 0 && typingElement) {
        typeEffect(contentData[0].text);
    }
});


/**
 * T LEARN PRO | Full Tactical Suite
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. HEADER & SIDEBAR LOGIC ---
    const header = document.getElementById('mainHeader');
    const sidebar = document.getElementById('mobileSidebar');
    const overlay = document.getElementById('sidebarOverlay');
    
    // Header scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) header?.classList.add('header-scrolled');
        else header?.classList.remove('header-scrolled');
    });

    // Sidebar Toggle
    window.toggleSidebar = (isOpen) => {
        if (isOpen) {
            sidebar?.classList.remove('-translate-x-full');
            overlay?.classList.remove('hidden');
            setTimeout(() => overlay?.classList.add('opacity-100'), 10);
        } else {
            sidebar?.classList.add('-translate-x-full');
            overlay?.classList.remove('opacity-100');
            setTimeout(() => overlay?.classList.add('hidden'), 500);
        }
    };

    // --- 2. HERO TYPING & ICON ENGINE ---
    const heroData = [
        { icon: "fa-satellite-dish", text: "Accessing Priority Waitlist. Syncing elite data points." },
        { icon: "fa-users-gear", text: "Analyzing Team Beta Terminal. Real-time intelligence active." },
        { icon: "fa-microchip", text: "Expanding Nxxt AI Network Nodes. Experience the future." }
    ];

    let heroIndex = 0;
    const typingEl = document.getElementById('typingText');
    const heroIcon = document.getElementById('rotatingIcon');

    function typeHeroEffect(text, i = 0) {
        if (!typingEl) return;
        if (i <= text.length) {
            typingEl.innerHTML = text.substring(0, i);
            setTimeout(() => typeHeroEffect(text, i + 1), 40);
        } else {
            setTimeout(rotateHero, 5000);
        }
    }

    function rotateHero() {
        if (!heroIcon) return;
        heroIndex = (heroIndex + 1) % heroData.length;
        
        // Update Dots
        [1, 2, 3].forEach(n => {
            const d = document.getElementById(`dot${n}`);
            if (d) d.style.background = (n-1 === heroIndex) ? '#3b82f6' : 'rgba(255,255,255,0.1)';
        });

        heroIcon.style.opacity = '0';
        setTimeout(() => {
            heroIcon.className = `fas ${heroData[heroIndex].icon} text-[12rem] md:text-[18rem] text-blue-500/10 transition-all duration-1000`;
            heroIcon.style.opacity = '1';
            typeHeroEffect(heroData[heroIndex].text);
        }, 1000);
    }

    // Start Hero Engine
    typeHeroEffect(heroData[0].text);

    // --- 3. MODULE TAB SWITCHER ---
    window.switchTab = (tabId) => {
        // Deactivate all
        document.querySelectorAll('.tab-content').forEach(c => c.classList.add('hidden'));
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        
        // Activate selected
        const targetContent = document.getElementById(`content-${tabId}`);
        const targetBtn = document.getElementById(`btn-${tabId}`);
        
        if (targetContent && targetBtn) {
            targetContent.classList.remove('hidden');
            targetBtn.classList.add('active');
        }

        console.log(`[SYSTEM]: Module ${tabId.toUpperCase()} engaged.`);
    };
});


/// for the collab

window.switchTab = (tabId) => {
    const display = document.querySelector('.lg\\:col-span-8');
    
    // Add a momentary flash/glitch effect to the background
    display.style.backgroundColor = 'rgba(59, 130, 246, 0.05)';
    setTimeout(() => {
        display.style.backgroundColor = '#030816';
    }, 100);

    // ... (rest of your existing switchTab code)
    document.querySelectorAll('.tab-content').forEach(c => c.classList.add('hidden'));
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    
    document.getElementById(`content-${tabId}`).classList.remove('hidden');
    document.getElementById(`btn-${tabId}`).classList.add('active');
};


///// for the Nxxt lab
document.querySelectorAll('.group').forEach((card, index) => {
    card.addEventListener('mouseenter', () => {
        // Make the core spin faster when focusing on a lab step
        const core = document.querySelector('.neural-core-container');
        core.style.transition = 'transform 0.5s ease';
        core.style.transform = 'scale(1.1)';
        
        // Increase orbital speeds
        document.querySelectorAll('.orbit-ring').forEach(ring => {
            ring.style.animationDuration = '4s';
        });
    });

    card.addEventListener('mouseleave', () => {
        const core = document.querySelector('.neural-core-container');
        core.style.transform = 'scale(1)';
        
        // Return to idle speeds
        document.querySelector('.animate-spin-slow').style.animationDuration = '15s';
        document.querySelector('.animate-reverse-spin').style.animationDuration = '10s';
    });
});

// Simulate the "Enter Laboratory" button click
const labBtn = document.querySelector('button');
if(labBtn) {
    labBtn.addEventListener('click', () => {
        labBtn.innerText = "INITIALIZING...";
        labBtn.classList.add('animate-pulse');
        
        setTimeout(() => {
            labBtn.innerText = "ACCESS GRANTED";
            labBtn.style.backgroundColor = "#22c55e"; // Green for success
            labBtn.style.borderColor = "#22c55e";
        }, 1500);
    });
}

//// for the pricing 
let isYearly = false;

function togglePricing() {
    isYearly = !isYearly;
    
    // UI Elements
    const toggleBall = document.getElementById('toggleBall');
    const studentPrice = document.getElementById('studentPrice');
    const proPrice = document.getElementById('proPrice');
    const studentPeriod = document.getElementById('studentPeriod');
    const proPeriod = document.getElementById('proPeriod');
    const monthlyLabel = document.getElementById('monthlyLabel');
    const yearlyLabel = document.getElementById('yearlyLabel');

    if (isYearly) {
        // Switch to Yearly
        toggleBall.style.transform = "translateX(32px)";
        studentPrice.innerText = "₦60,000";
        proPrice.innerText = "₦120,000";
        studentPeriod.innerText = "/ Year";
        proPeriod.innerText = "/ Year";
        yearlyLabel.classList.replace('text-gray-500', 'text-white');
        monthlyLabel.classList.replace('text-white', 'text-gray-500');
    } else {
        // Switch to Monthly
        toggleBall.style.transform = "translateX(0px)";
        studentPrice.innerText = "₦7,000";
        proPrice.innerText = "₦14,000";
        studentPeriod.innerText = "/ Month";
        proPeriod.innerText = "/ Month";
        monthlyLabel.classList.replace('text-gray-500', 'text-white');
        yearlyLabel.classList.replace('text-white', 'text-gray-500');
    }
}


//// for the faq 
function toggleFaq(btn) {
    const parent = btn.parentElement;
    const answer = btn.nextElementSibling;
    const icon = btn.querySelector('.fa-plus');
    
    // Toggle current answer
    const isHidden = answer.classList.contains('hidden');
    
    // Close all other answers (Optional: Remove if you want multiple open)
    document.querySelectorAll('.faq-answer').forEach(el => el.classList.add('hidden'));
    document.querySelectorAll('.fa-plus').forEach(el => el.classList.remove('rotate-45'));

    if (isHidden) {
        answer.classList.remove('hidden');
        icon.classList.add('rotate-45');
    }
}


//// for the newsletter
function handleSubscription(btn) {
    const originalContent = btn.innerHTML;
    const emailInput = document.getElementById('newsletterEmailInput');

    // Reset border
    emailInput.style.borderColor = '';

    // Validation
    if (!emailInput.value.trim() || !emailInput.value.includes('@')) {
        emailInput.style.borderColor = '#ef4444';
        return;
    }

    // Loading state
    btn.disabled = true;
    btn.innerHTML = `
        <span class="flex items-center justify-center gap-2">
            <i class="fas fa-circle-notch animate-spin"></i> ENCRYPTING...
        </span>
    `;

    // Send to backend
    const formData = new FormData();
    formData.append('email', emailInput.value.trim().toLowerCase());
    formData.append('source', 'Newsletter');

    fetch('https://script.google.com/macros/s/AKfycbxNtAK6ToRg_J7USn9fNsoTGKGYpX2TkLEcGoddErh9IVRuv2ULYNn9xYgID46tBpSP/exec', {
        method: 'POST',
        mode: 'no-cors',
        body: formData
    })
    .then(() => {
        document.getElementById('successModal').classList.remove('hidden');
        emailInput.value = '';
    })
    .catch(() => {
        alert("Transmission failed. Try again.");
    })
    .finally(() => {
        btn.disabled = false;
        btn.innerHTML = originalContent;
    });
}

function closeNewsletterModal() {
    document.getElementById('successModal').classList.add('hidden');
}
