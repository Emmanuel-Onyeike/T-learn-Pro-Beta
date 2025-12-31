/**
 * T LEARN PRO - Main Application Script
 * Modular, clean, and optimized
 */

const App = {
    // Configuration
    config: {
        headerScrollThreshold: 50,
        typingSpeed: 40,
        contentRotationDelay: 5000,
        iconTransitionDelay: 1000
    },

    // State
    state: {
        currentContentIndex: 0,
        isYearly: false
    },

    // Initialize application
    init() {
        this.Navigation.init();
        this.Header.init();
        this.HeroContent.init();
        this.Pricing.init();
        this.FAQ.init();
        this.Newsletter.init();
        this.NxxtLab.init();
    },

    /**
     * Navigation Module
     */
    Navigation: {
        elements: {},

        init() {
            this.cacheElements();
            this.attachListeners();
        },

        cacheElements() {
            this.elements = {
                openMenu: document.getElementById('openMenu'),
                closeMenu: document.getElementById('closeMenu'),
                sidebar: document.getElementById('mobileSidebar'),
                overlay: document.getElementById('sidebarOverlay'),
                mobileLinks: document.querySelectorAll('.mobile-nav-link')
            };
        },

        attachListeners() {
            const { openMenu, closeMenu, overlay, mobileLinks } = this.elements;

            if (openMenu) openMenu.addEventListener('click', () => this.toggle(true));
            if (closeMenu) closeMenu.addEventListener('click', () => this.toggle(false));
            if (overlay) overlay.addEventListener('click', () => this.toggle(false));

            mobileLinks.forEach(link => {
                link.addEventListener('click', () => this.toggle(false));
            });
        },

        toggle(isOpen) {
            const { sidebar, overlay } = this.elements;
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
        }
    },

    /**
     * Header Module
     */
    Header: {
        element: null,

        init() {
            this.element = document.getElementById('mainHeader');
            if (this.element) {
                window.addEventListener('scroll', () => this.handleScroll());
            }
        },

        handleScroll() {
            if (window.scrollY > App.config.headerScrollThreshold) {
                this.element.classList.add('header-scrolled');
            } else {
                this.element.classList.remove('header-scrolled');
            }
        }
    },

    /**
     * Hero Content Module - Typing Effect & Icon Rotation
     */
    HeroContent: {
        elements: {},
        contentData: [
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
        ],

        init() {
            this.elements = {
                typingText: document.getElementById('typingText'),
                rotatingIcon: document.getElementById('rotatingIcon'),
                dots: [1, 2, 3].map(n => document.getElementById(`dot${n}`))
            };

            if (this.elements.typingText && this.contentData.length > 0) {
                this.startTyping(this.contentData[0].text);
            }
        },

        startTyping(text, index = 0) {
            if (!this.elements.typingText) return;

            if (index <= text.length) {
                this.elements.typingText.innerHTML = text.substring(0, index);
                setTimeout(() => this.startTyping(text, index + 1), App.config.typingSpeed);
            } else {
                setTimeout(() => this.rotateContent(), App.config.contentRotationDelay);
            }
        },

        rotateContent() {
            if (!this.elements.rotatingIcon) return;

            App.state.currentContentIndex = (App.state.currentContentIndex + 1) % this.contentData.length;
            const currentContent = this.contentData[App.state.currentContentIndex];

            // Update dots
            this.updateDots();

            // Transition icon
            this.elements.rotatingIcon.style.opacity = '0';
            this.elements.rotatingIcon.style.transform = 'scale(0.8)';

            setTimeout(() => {
                this.elements.rotatingIcon.className = `fas ${currentContent.icon} text-[12rem] md:text-[18rem] text-blue-500/10 transition-all duration-1000 transform`;
                this.elements.rotatingIcon.style.opacity = '1';
                this.elements.rotatingIcon.style.transform = 'scale(1)';
                this.startTyping(currentContent.text);
            }, App.config.iconTransitionDelay);
        },

        updateDots() {
            this.elements.dots.forEach((dot, index) => {
                if (!dot) return;

                const isActive = index === App.state.currentContentIndex;
                dot.style.backgroundColor = isActive ? '#3b82f6' : 'rgba(255,255,255,0.1)';
                dot.style.boxShadow = isActive ? '0 0 10px #3b82f6' : 'none';
            });
        }
    },

    /**
     * Pricing Module
     */
    Pricing: {
        elements: {},

        init() {
            this.cacheElements();
            window.togglePricing = () => this.toggle();
        },

        cacheElements() {
            this.elements = {
                toggleBall: document.getElementById('toggleBall'),
                studentPrice: document.getElementById('studentPrice'),
                proPrice: document.getElementById('proPrice'),
                studentPeriod: document.getElementById('studentPeriod'),
                proPeriod: document.getElementById('proPeriod'),
                monthlyLabel: document.getElementById('monthlyLabel'),
                yearlyLabel: document.getElementById('yearlyLabel')
            };
        },

        toggle() {
            App.state.isYearly = !App.state.isYearly;
            const { toggleBall, studentPrice, proPrice, studentPeriod, proPeriod, monthlyLabel, yearlyLabel } = this.elements;

            if (App.state.isYearly) {
                toggleBall.style.transform = "translateX(32px)";
                studentPrice.innerText = "₦60,000";
                proPrice.innerText = "₦120,000";
                studentPeriod.innerText = "/ Year";
                proPeriod.innerText = "/ Year";
                yearlyLabel.classList.replace('text-gray-500', 'text-white');
                monthlyLabel.classList.replace('text-white', 'text-gray-500');
            } else {
                toggleBall.style.transform = "translateX(0px)";
                studentPrice.innerText = "₦7,000";
                proPrice.innerText = "₦14,000";
                studentPeriod.innerText = "/ Month";
                proPeriod.innerText = "/ Month";
                monthlyLabel.classList.replace('text-gray-500', 'text-white');
                yearlyLabel.classList.replace('text-white', 'text-gray-500');
            }
        }
    },

    /**
     * FAQ Module
     */
    FAQ: {
        init() {
            window.toggleFaq = (btn) => this.toggle(btn);
        },

        toggle(btn) {
            const answer = btn.nextElementSibling;
            const icon = btn.querySelector('.fa-plus');
            const isHidden = answer.classList.contains('hidden');

            // Close all other FAQs
            document.querySelectorAll('.faq-answer').forEach(el => el.classList.add('hidden'));
            document.querySelectorAll('.fa-plus').forEach(el => el.classList.remove('rotate-45'));

            // Toggle current FAQ
            if (isHidden) {
                answer.classList.remove('hidden');
                icon.classList.add('rotate-45');
            }
        }
    },

    /**
     * Newsletter Module
     */
    Newsletter: {
        init() {
            window.handleSubscription = (btn) => this.handleSubscription(btn);
            window.closeModal = () => this.closeModal();

            // Close modal on ESC key
            document.addEventListener('keydown', (e) => {
                if (e.key === "Escape") this.closeModal();
            });
        },

        handleSubscription(btn) {
            const form = btn.closest('form');
            const emailInput = form.querySelector('input');
            const originalContent = btn.innerHTML;

            // Validate email
            if (!emailInput.value.includes('@')) {
                emailInput.style.borderColor = '#ef4444';
                return;
            }

            // Show processing state
            btn.disabled = true;
            btn.innerHTML = `
                <span class="flex items-center justify-center gap-2">
                    <i class="fas fa-circle-notch animate-spin"></i> ENCRYPTING...
                </span>
            `;

            // Simulate processing
            setTimeout(() => {
                const modal = document.getElementById('successModal');
                modal.classList.remove('hidden');

                // Reset form
                btn.disabled = false;
                btn.innerHTML = originalContent;
                emailInput.value = '';
                emailInput.style.borderColor = 'rgba(255,255,255,0.1)';
            }, 1500);
        },

        closeModal() {
            const modal = document.getElementById('successModal');
            if (modal) modal.classList.add('hidden');
        }
    },

    /**
     * Nxxt Lab Module
     */
    NxxtLab: {
        init() {
            this.initCardHover();
            this.initLabButton();
            window.switchTab = (tabId) => this.switchTab(tabId);
        },

        initCardHover() {
            document.querySelectorAll('.group').forEach(card => {
                card.addEventListener('mouseenter', () => {
                    const core = document.querySelector('.neural-core-container');
                    if (core) {
                        core.style.transition = 'transform 0.5s ease';
                        core.style.transform = 'scale(1.1)';
                    }

                    document.querySelectorAll('.orbit-ring').forEach(ring => {
                        ring.style.animationDuration = '4s';
                    });
                });

                card.addEventListener('mouseleave', () => {
                    const core = document.querySelector('.neural-core-container');
                    if (core) core.style.transform = 'scale(1)';

                    const slowSpin = document.querySelector('.animate-spin-slow');
                    const reverseSpin = document.querySelector('.animate-reverse-spin');

                    if (slowSpin) slowSpin.style.animationDuration = '15s';
                    if (reverseSpin) reverseSpin.style.animationDuration = '10s';
                });
            });
        },

        initLabButton() {
            const labBtn = document.querySelector('button.lab-enter-btn');
            if (labBtn) {
                labBtn.addEventListener('click', () => {
                    labBtn.innerText = "INITIALIZING...";
                    labBtn.classList.add('animate-pulse');

                    setTimeout(() => {
                        labBtn.innerText = "ACCESS GRANTED";
                        labBtn.style.backgroundColor = "#22c55e";
                        labBtn.style.borderColor = "#22c55e";
                    }, 1500);
                });
            }
        },

        switchTab(tabId) {
            const display = document.querySelector('.lg\\:col-span-8');

            // Flash effect
            if (display) {
                display.style.backgroundColor = 'rgba(59, 130, 246, 0.05)';
                setTimeout(() => {
                    display.style.backgroundColor = '#030816';
                }, 100);
            }

            // Switch tabs
            document.querySelectorAll('.tab-content').forEach(c => c.classList.add('hidden'));
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));

            const targetContent = document.getElementById(`content-${tabId}`);
            const targetBtn = document.getElementById(`btn-${tabId}`);

            if (targetContent) targetContent.classList.remove('hidden');
            if (targetBtn) targetBtn.classList.add('active');
        }
    }
};

// Initialize application on DOM ready
document.addEventListener('DOMContentLoaded', () => App.init());
