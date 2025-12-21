/**
 * T LEARN PRO | Full Tactical Suite – Clean & Working
 */

document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Header & Sidebar Logic ---
    const header = document.getElementById('mainHeader');
    const openMenu = document.getElementById('openMenu');
    const closeMenu = document.getElementById('closeMenu');
    const sidebar = document.getElementById('mobileSidebar');
    const overlay = document.getElementById('sidebarOverlay');

    // Header scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header?.classList.add('header-scrolled');
        } else {
            header?.classList.remove('header-scrolled');
        }
    });

    // Sidebar toggle
    const toggleSidebar = (isOpen) => {
        if (isOpen) {
            sidebar?.classList.remove('-translate-x-full');
            overlay?.classList.remove('hidden');
            setTimeout(() => overlay?.classList.add('opacity-100'), 10);
            document.body.style.overflow = 'hidden';
        } else {
            sidebar?.classList.add('-translate-x-full');
            overlay?.classList.remove('opacity-100');
            setTimeout(() => overlay?.classList.add('hidden'), 500);
            document.body.style.overflow = '';
        }
    };

    openMenu?.addEventListener('click', () => toggleSidebar(true));
    closeMenu?.addEventListener('click', () => toggleSidebar(false));
    overlay?.addEventListener('click', () => toggleSidebar(false));

    // --- 2. Hero Typing & Icon Rotation ---
    const contentData = [
        { icon: "fa-satellite-dish", text: "Accessing Priority Waitlist. Syncing elite data points for global operations." },
        { icon: "fa-users-gear", text: "Analyzing Team Beta Terminal. Real-time intelligence at your fingertips." },
        { icon: "fa-microchip", text: "Expanding Nxxt AI Network Nodes. Experience the future of tactical learning." }
    ];

    let currentIndex = 0;
    const typingElement = document.getElementById('typingText');
    const iconElement = document.getElementById('rotatingIcon');

    function typeEffect(text, i = 0) {
        if (i < text.length) {
            typingElement.innerHTML = text.substring(0, i + 1);
            setTimeout(() => typeEffect(text, i + 1), 40);
        } else {
            setTimeout(rotateContent, 5000);
        }
    }

    function rotateContent() {
        currentIndex = (currentIndex + 1) % contentData.length;

        // Update dots
        [1, 2, 3].forEach(num => {
            const dot = document.getElementById(`dot${num}`);
            if (dot) {
                dot.style.backgroundColor = (num - 1 === currentIndex) ? '#3b82f6' : 'rgba(255,255,255,0.1)';
                dot.style.boxShadow = (num - 1 === currentIndex) ? '0 0 10px #3b82f6' : 'none';
            }
        });

        iconElement.style.opacity = '0';
        iconElement.style.transform = 'scale(0.8)';

        setTimeout(() => {
            iconElement.className = `fas ${contentData[currentIndex].icon} text-[12rem] md:text-[18rem] text-blue-500/10 transition-all duration-1000`;
            iconElement.style.opacity = '1';
            iconElement.style.transform = 'scale(1)';
            typeEffect(contentData[currentIndex].text);
        }, 1000);
    }

    if (contentData.length > 0) typeEffect(contentData[0].text);

    // --- 3. Tab Switcher ---
    window.switchTab = (tabId) => {
        document.querySelectorAll('.tab-content').forEach(c => c.classList.add('hidden'));
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));

        document.getElementById(`content-${tabId}`)?.classList.remove('hidden');
        document.getElementById(`btn-${tabId}`)?.classList.add('active');
    };

    // --- 4. Pricing Toggle ---
    let isYearly = false;
    window.togglePricing = () => {
        isYearly = !isYearly;
        const ball = document.getElementById('toggleBall');
        const studentPrice = document.getElementById('studentPrice');
        const proPrice = document.getElementById('proPrice');
        const studentPeriod = document.getElementById('studentPeriod');
        const proPeriod = document.getElementById('proPeriod');
        const monthlyLabel = document.getElementById('monthlyLabel');
        const yearlyLabel = document.getElementById('yearlyLabel');

        if (isYearly) {
            ball.style.transform = "translateX(32px)";
            studentPrice.innerText = "₦60,000";
            proPrice.innerText = "₦120,000";
            studentPeriod.innerText = "/ Year";
            proPeriod.innerText = "/ Year";
            yearlyLabel.classList.replace('text-gray-500', 'text-white');
            monthlyLabel.classList.replace('text-white', 'text-gray-500');
        } else {
            ball.style.transform = "translateX(0px)";
            studentPrice.innerText = "₦7,000";
            proPrice.innerText = "₦14,000";
            studentPeriod.innerText = "/ Month";
            proPeriod.innerText = "/ Month";
            monthlyLabel.classList.replace('text-gray-500', 'text-white');
            yearlyLabel.classList.replace('text-white', 'text-gray-500');
        }
    };

    // --- 5. FAQ Toggle ---
    window.toggleFaq = (btn) => {
        const answer = btn.nextElementSibling;
        const icon = btn.querySelector('.fa-plus');
        const isHidden = answer.classList.contains('hidden');

        // Close all others
        document.querySelectorAll('.faq-answer').forEach(el => el.classList.add('hidden'));
        document.querySelectorAll('.fa-plus').forEach(el => el.classList.remove('rotate-45'));

        if (isHidden) {
            answer.classList.remove('hidden');
            icon.classList.add('rotate-45');
        }
    };

    // --- 6. Newsletter Subscription (Fixed & Working) ---
    function handleSubscription(btn) {
        const originalContent = btn.innerHTML;
        const emailInput = document.getElementById('newsletterEmailInput');

        emailInput.style.borderColor = '';

        if (!emailInput.value.trim() || !emailInput.value.includes('@')) {
            emailInput.style.borderColor = '#ef4444';
            return;
        }

        btn.disabled = true;
        btn.innerHTML = `
            <span class="flex items-center justify-center gap-2">
                <i class="fas fa-circle-notch animate-spin"></i> ENCRYPTING...
            </span>
        `;

        const payload = {
            email: emailInput.value.trim().toLowerCase(),
            source: 'Newsletter'
        };

        fetch('https://script.google.com/macros/s/AKfycbxNtAK6ToRg_J7USn9fNsoTGKGYpX2TkLEcGoddErh9IVRuv2ULYNn9xYgID46tBpSP/exec', {
            method: 'POST',
            headers: { 'Content-Type': 'text/plain;charset=utf-8' },
            body: JSON.stringify(payload),
            redirect: 'follow'
        })
        .then(() => {
            document.getElementById('successModal').classList.remove('hidden');
            emailInput.value = '';
        })
        .catch(() => {
            alert("Transmission failed. Please try again.");
        })
        .finally(() => {
            btn.disabled = false;
            btn.innerHTML = originalContent;
        });
    }

    window.handleSubscription = handleSubscription;

    window.closeNewsletterModal = () => {
        document.getElementById('successModal').classList.add('hidden');
    };

    // --- 7. Nxxt Lab Hover Effects ---
    document.querySelectorAll('.group').forEach(card => {
        card.addEventListener('mouseenter', () => {
            const core = document.querySelector('.neural-core-container');
            if (core) core.style.transform = 'scale(1.1)';
            document.querySelectorAll('.orbit-ring').forEach(ring => ring.style.animationDuration = '4s');
        });
        card.addEventListener('mouseleave', () => {
            const core = document.querySelector('.neural-core-container');
            if (core) core.style.transform = 'scale(1)';
            document.querySelectorAll('.animate-spin-slow').forEach(r => r.style.animationDuration = '15s');
            document.querySelectorAll('.animate-reverse-spin').forEach(r => r.style.animationDuration = '10s');
        });
    });
});
