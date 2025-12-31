/**
 * T LEARN PRO - Authentication Module
 * Clean, reusable authentication with proper user-friendly messages
 *
 * DEPENDENCIES:
 * - config.js (must load first)
 * - supabase-loader.js (must load second)
 * - messages.js (for user-facing messages)
 * - utilities.js (for helper functions)
 */

let Auth = {
    client: null,
    currentUser: null,

    /**
     * Initialize authentication module
     */
    async init() {
        try {
            // Load Supabase client
            this.client = await window.supabaseLoader.load();

            // Check authentication status
            await this.checkAuth();

            // Attach event listeners for forms
            this.attachEventListeners();

            // Load user data if authenticated
            await this.loadUserData();
        } catch (error) {
            console.error('Auth initialization error:', error);
            Modal.show(
                MESSAGES.SYSTEM.UNEXPECTED_ERROR.title,
                'Failed to initialize authentication system. Please refresh the page.',
                true
            );
        }
    },

    /**
     * Check authentication status and redirect if needed
     */
    async checkAuth() {
        try {
            const { data: { user }, error } = await this.client.auth.getUser();

            if (error) {
                console.error('Auth check error:', error);
            }

            const currentPath = window.location.pathname.toLowerCase();
            const isAuthPage = currentPath.includes('login.html') || currentPath.includes('register.html');
            const isDashboard = currentPath.includes('dashboard.html');

            if (!user && isDashboard) {
                // Not authenticated but trying to access dashboard - redirect to login
                Utils.url.redirect('./login.html');
            } else if (user && isAuthPage) {
                // Authenticated but on auth page - redirect to dashboard
                Utils.url.redirect('./dashboard.html');
            }

            this.currentUser = user;
        } catch (error) {
            console.error('Check auth error:', error);
        }
    },

    /**
     * Load user data and update UI
     */
    async loadUserData() {
        if (!this.currentUser) return;

        try {
            const fullName = this.currentUser.user_metadata?.full_name || 'User';
            const email = this.currentUser.email || '';

            // Update UI elements with user data
            document.querySelectorAll('[data-user-name]').forEach(el => {
                el.textContent = Utils.string.getFirstName(fullName);
            });

            document.querySelectorAll('[data-user-email]').forEach(el => {
                el.textContent = email;
            });

            // Update greeting
            const greetingEl = document.getElementById('greetingText');
            if (greetingEl) {
                const timeOfDay = Utils.time.getTimeOfDay();
                greetingEl.textContent = `Good ${timeOfDay}, ${Utils.string.getFirstName(fullName)}!`;
            }

            // Update date display
            const dateEl = document.getElementById('currentDate');
            if (dateEl) {
                dateEl.textContent = Utils.time.formatDate(new Date());
            }
        } catch (error) {
            console.error('Load user data error:', error);
        }
    },

    /**
     * Attach form event listeners
     */
    attachEventListeners() {
        // Register form
        const registerForm = document.getElementById('registerForm');
        if (registerForm) {
            registerForm.addEventListener('submit', (e) => this.handleRegister(e));
        }

        // Login form
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        }
    },

    /**
     * Handle user registration
     */
    async handleRegister(event) {
        event.preventDefault();

        const btn = document.getElementById('registerBtn');
        const originalText = btn.innerHTML;

        try {
            // Set button to loading state
            Utils.button.setLoading(btn, 'CREATING ACCOUNT...');

            // Get form values
            const fullName = document.getElementById('fullName')?.value.trim();
            const username = document.getElementById('username')?.value.trim();
            const email = document.getElementById('regEmail')?.value.trim();
            const password = document.getElementById('regPassword')?.value;
            const confirmPassword = document.getElementById('regConfirmPassword')?.value;

            // Validate required fields
            if (!Utils.validate.notEmpty(fullName)) {
                Modal.show(
                    MESSAGES.VALIDATION.EMPTY_FIELD('full name').title,
                    MESSAGES.VALIDATION.EMPTY_FIELD('full name').message,
                    true
                );
                Utils.button.reset(btn, originalText);
                return;
            }

            if (!Utils.validate.notEmpty(email)) {
                Modal.show(
                    MESSAGES.VALIDATION.EMPTY_FIELD('email').title,
                    MESSAGES.VALIDATION.EMPTY_FIELD('email').message,
                    true
                );
                Utils.button.reset(btn, originalText);
                return;
            }

            // Validate email format
            if (!Utils.validate.email(email)) {
                Modal.show(
                    MESSAGES.VALIDATION.INVALID_EMAIL.title,
                    MESSAGES.VALIDATION.INVALID_EMAIL.message,
                    true
                );
                Utils.button.reset(btn, originalText);
                return;
            }

            // Validate password
            const passwordValidation = Utils.validate.password(password);
            if (!passwordValidation.valid) {
                Modal.show(
                    MESSAGES.AUTH.REGISTER_WEAK_PASSWORD.title,
                    passwordValidation.message,
                    true
                );
                Utils.button.reset(btn, originalText);
                return;
            }

            // Validate passwords match
            if (!Utils.validate.passwordsMatch(password, confirmPassword)) {
                Modal.show(
                    MESSAGES.AUTH.REGISTER_PASSWORD_MISMATCH.title,
                    MESSAGES.AUTH.REGISTER_PASSWORD_MISMATCH.message,
                    true
                );
                Utils.button.reset(btn, originalText);
                return;
            }

            // Attempt registration
            const { data, error } = await this.client.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        full_name: fullName,
                        username: username || fullName.split(' ')[0].toLowerCase(),
                        rank: 'Beginner',
                        created_at: new Date().toISOString()
                    }
                }
            });

            if (error) {
                // Handle specific error cases
                if (error.message.includes('already registered')) {
                    Modal.show(
                        MESSAGES.AUTH.REGISTER_EMAIL_EXISTS.title,
                        MESSAGES.AUTH.REGISTER_EMAIL_EXISTS.message,
                        true
                    );
                } else {
                    Modal.show(
                        MESSAGES.AUTH.REGISTER_FAILED.title,
                        MESSAGES.AUTH.REGISTER_FAILED.message(error.message),
                        true
                    );
                }
                Utils.button.reset(btn, originalText);
            } else {
                // Success - show message and redirect
                Modal.show(
                    MESSAGES.AUTH.REGISTER_SUCCESS.title,
                    MESSAGES.AUTH.REGISTER_SUCCESS.message,
                    false
                );

                // Redirect to login after 3 seconds
                setTimeout(() => {
                    Utils.url.redirect('./login.html');
                }, 3000);
            }
        } catch (error) {
            console.error('Registration error:', error);
            Modal.show(
                MESSAGES.SYSTEM.UNEXPECTED_ERROR.title,
                MESSAGES.SYSTEM.UNEXPECTED_ERROR.message,
                true
            );
            Utils.button.reset(btn, originalText);
        }
    },

    /**
     * Handle user login
     */
    async handleLogin(event) {
        event.preventDefault();

        const btn = document.getElementById('loginBtn');
        const originalText = btn.innerHTML;

        try {
            // Set button to loading state
            Utils.button.setLoading(btn, 'VERIFYING...');

            // Get form values
            const email = document.getElementById('loginEmail')?.value.trim();
            const password = document.getElementById('loginPassword')?.value;

            // Validate email
            if (!Utils.validate.email(email)) {
                Modal.show(
                    MESSAGES.VALIDATION.INVALID_EMAIL.title,
                    MESSAGES.VALIDATION.INVALID_EMAIL.message,
                    true
                );
                Utils.button.reset(btn, originalText);
                return;
            }

            // Validate password
            if (!Utils.validate.notEmpty(password)) {
                Modal.show(
                    MESSAGES.VALIDATION.EMPTY_FIELD('password').title,
                    MESSAGES.VALIDATION.EMPTY_FIELD('password').message,
                    true
                );
                Utils.button.reset(btn, originalText);
                return;
            }

            // Attempt login
            const { data, error } = await this.client.auth.signInWithPassword({
                email,
                password
            });

            if (error) {
                // Handle specific error cases
                if (error.message.includes('Invalid login credentials')) {
                    Modal.show(
                        MESSAGES.AUTH.LOGIN_FAILED.title,
                        MESSAGES.AUTH.LOGIN_FAILED.message,
                        true
                    );
                } else if (error.message.includes('Email not confirmed')) {
                    Modal.show(
                        MESSAGES.AUTH.EMAIL_NOT_VERIFIED.title,
                        MESSAGES.AUTH.EMAIL_NOT_VERIFIED.message,
                        true
                    );
                } else {
                    Modal.show(
                        MESSAGES.AUTH.LOGIN_ERROR.title,
                        error.message,
                        true
                    );
                }
                Utils.button.reset(btn, originalText);
            } else {
                // Success - show welcome message
                const firstName = Utils.string.getFirstName(
                    data.user.user_metadata?.full_name || 'User'
                );

                const welcomeMsg = MESSAGES.AUTH.LOGIN_SUCCESS;
                Modal.show(
                    welcomeMsg.title,
                    welcomeMsg.message(firstName),
                    false
                );

                // Redirect to dashboard after 2 seconds
                setTimeout(() => {
                    Utils.url.redirect('./dashboard.html');
                }, 2000);
            }
        } catch (error) {
            console.error('Login error:', error);
            Modal.show(
                MESSAGES.SYSTEM.NETWORK_ERROR.title,
                MESSAGES.SYSTEM.NETWORK_ERROR.message,
                true
            );
            Utils.button.reset(btn, originalText);
        }
    },

    /**
     * Logout user and clear session
     */
    async logout() {
        try {
            await this.client.auth.signOut();
            Utils.storage.clear();

            // Show logout message
            Modal.show(
                MESSAGES.AUTH.LOGOUT_SUCCESS.title,
                MESSAGES.AUTH.LOGOUT_SUCCESS.message,
                false
            );

            // Redirect after 1 second
            setTimeout(() => {
                Utils.url.redirect('./login.html');
            }, 1000);
        } catch (error) {
            console.error('Logout error:', error);
            // Force redirect even if logout fails
            Utils.storage.clear();
            Utils.url.redirect('./login.html');
        }
    },

    /**
     * Get current user
     * @returns {object|null} Current user object or null
     */
    getCurrentUser() {
        return this.currentUser;
    },

    /**
     * Check if user is authenticated
     * @returns {boolean} True if authenticated
     */
    isAuthenticated() {
        return this.currentUser !== null;
    }
};

/**
 * Modal Management
 * Handles displaying messages to users in a beautiful modal
 */
let Modal = {
    elements: {},

    /**
     * Initialize modal elements (lazy loading)
     */
    init() {
        if (this.elements.modal) return; // Already initialized

        this.elements = {
            modal: document.getElementById('alertModal'),
            box: document.getElementById('alertBox'),
            overlay: document.getElementById('alertOverlay'),
            icon: document.getElementById('alertIcon'),
            title: document.getElementById('alertTitle'),
            message: document.getElementById('alertMsg')
        };
    },

    /**
     * Show modal with message
     * @param {string} title - Modal title
     * @param {string} message - Modal message
     * @param {boolean} isError - Whether this is an error message
     */
    show(title, message, isError = false) {
        this.init();

        // Fallback to browser alert if modal not found
        if (!this.elements.modal) {
            alert(`${title}\n\n${message}`);
            return;
        }

        // Set modal content
        Utils.dom.setText(this.elements.title, title);
        Utils.dom.setText(this.elements.message, message);

        // Set icon based on message type
        if (isError) {
            this.elements.icon.className = "w-16 h-16 bg-red-600/20 rounded-2xl flex items-center justify-center mx-auto mb-6 text-red-500";
            Utils.dom.setHTML(this.elements.icon, '<i class="fas fa-exclamation-triangle text-2xl"></i>');
        } else {
            this.elements.icon.className = "w-16 h-16 bg-blue-600/20 rounded-2xl flex items-center justify-center mx-auto mb-6 text-blue-500";
            Utils.dom.setHTML(this.elements.icon, '<i class="fas fa-check text-2xl"></i>');
        }

        // Show modal with animation
        this.elements.modal.classList.remove('invisible');
        setTimeout(() => {
            this.elements.overlay.classList.add('opacity-100');
            this.elements.box.classList.remove('scale-90', 'opacity-0');
        }, 10);
    },

    /**
     * Close modal with animation
     */
    close() {
        this.init();

        if (!this.elements.modal) return;

        this.elements.overlay.classList.remove('opacity-100');
        this.elements.box.classList.add('scale-90', 'opacity-0');

        setTimeout(() => {
            this.elements.modal.classList.add('invisible');
        }, 300);
    }
};

// Expose global functions for backward compatibility
window.Auth = Auth;
window.Modal = Modal;
window.logout = () => Auth.logout();
window.showModal = (title, message, isError) => Modal.show(title, message, isError);
window.closeAlert = () => Modal.close();

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    Auth.init();
});