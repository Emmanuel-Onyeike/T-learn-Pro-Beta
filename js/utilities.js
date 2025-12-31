/**
 * T LEARN PRO - Utility Functions
 * Reusable helper functions following DRY principle
 */

let Utils = {
    /**
     * Validation utilities
     */
    validate: {
        /**
         * Check if email is valid
         * @param {string} email - Email to validate
         * @returns {boolean} True if valid
         */
        email: (email) => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        },

        /**
         * Check if password meets requirements
         * @param {string} password - Password to validate
         * @returns {object} {valid: boolean, message: string}
         */
        password: (password) => {
            if (!password || password.length < 6) {
                return {
                    valid: false,
                    message: 'Password must be at least 6 characters long'
                };
            }
            return { valid: true, message: '' };
        },

        /**
         * Check if passwords match
         * @param {string} password - First password
         * @param {string} confirmPassword - Confirmation password
         * @returns {boolean} True if passwords match
         */
        passwordsMatch: (password, confirmPassword) => {
            return password === confirmPassword;
        },

        /**
         * Check if field is not empty
         * @param {string} value - Value to check
         * @returns {boolean} True if not empty
         */
        notEmpty: (value) => {
            return value && value.trim().length > 0;
        },

        /**
         * Validate multiple fields at once
         * @param {object} fields - Object with field names and values
         * @returns {object} {valid: boolean, errors: array}
         */
        fields: (fields) => {
            const errors = [];
            for (const [name, value] of Object.entries(fields)) {
                if (!Utils.validate.notEmpty(value)) {
                    errors.push(`${name} is required`);
                }
            }
            return {
                valid: errors.length === 0,
                errors
            };
        }
    },

    /**
     * DOM manipulation utilities
     */
    dom: {
        /**
         * Get element by ID safely
         * @param {string} id - Element ID
         * @returns {HTMLElement|null} Element or null
         */
        getById: (id) => {
            return document.getElementById(id);
        },

        /**
         * Show element
         * @param {HTMLElement|string} element - Element or ID
         */
        show: (element) => {
            const el = typeof element === 'string' ? Utils.dom.getById(element) : element;
            if (el) el.classList.remove('hidden', 'invisible');
        },

        /**
         * Hide element
         * @param {HTMLElement|string} element - Element or ID
         */
        hide: (element) => {
            const el = typeof element === 'string' ? Utils.dom.getById(element) : element;
            if (el) el.classList.add('hidden');
        },

        /**
         * Toggle element visibility
         * @param {HTMLElement|string} element - Element or ID
         */
        toggle: (element) => {
            const el = typeof element === 'string' ? Utils.dom.getById(element) : element;
            if (el) el.classList.toggle('hidden');
        },

        /**
         * Set element text content safely
         * @param {HTMLElement|string} element - Element or ID
         * @param {string} text - Text to set
         */
        setText: (element, text) => {
            const el = typeof element === 'string' ? Utils.dom.getById(element) : element;
            if (el) el.textContent = text;
        },

        /**
         * Set element HTML safely
         * @param {HTMLElement|string} element - Element or ID
         * @param {string} html - HTML to set
         */
        setHTML: (element, html) => {
            const el = typeof element === 'string' ? Utils.dom.getById(element) : element;
            if (el) el.innerHTML = html;
        }
    },

    /**
     * Button state management
     */
    button: {
        /**
         * Set button to loading state
         * @param {HTMLElement|string} button - Button element or ID
         * @param {string} loadingText - Text to show while loading
         * @returns {string} Original button text
         */
        setLoading: (button, loadingText = 'LOADING...') => {
            const btn = typeof button === 'string' ? Utils.dom.getById(button) : button;
            if (!btn) return '';

            const originalText = btn.innerHTML;
            btn.disabled = true;
            btn.innerHTML = `<i class="fas fa-circle-notch fa-spin mr-2"></i> ${loadingText}`;
            return originalText;
        },

        /**
         * Reset button to original state
         * @param {HTMLElement|string} button - Button element or ID
         * @param {string} originalText - Original button text
         */
        reset: (button, originalText) => {
            const btn = typeof button === 'string' ? Utils.dom.getById(button) : button;
            if (!btn) return;

            btn.disabled = false;
            btn.innerHTML = originalText;
        },

        /**
         * Set button to success state temporarily
         * @param {HTMLElement|string} button - Button element or ID
         * @param {string} successText - Success message
         * @param {number} duration - Duration in ms before reset
         * @param {string} originalText - Original button text
         */
        showSuccess: (button, successText, duration = 2000, originalText) => {
            const btn = typeof button === 'string' ? Utils.dom.getById(button) : button;
            if (!btn) return;

            btn.innerHTML = `<i class="fas fa-check mr-2"></i> ${successText}`;
            setTimeout(() => {
                Utils.button.reset(btn, originalText);
            }, duration);
        }
    },

    /**
     * String utilities
     */
    string: {
        /**
         * Capitalize first letter
         * @param {string} str - String to capitalize
         * @returns {string} Capitalized string
         */
        capitalize: (str) => {
            if (!str) return '';
            return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
        },

        /**
         * Get first name from full name
         * @param {string} fullName - Full name
         * @returns {string} First name
         */
        getFirstName: (fullName) => {
            if (!fullName) return 'User';
            return fullName.split(' ')[0];
        },

        /**
         * Truncate string to length
         * @param {string} str - String to truncate
         * @param {number} length - Max length
         * @returns {string} Truncated string
         */
        truncate: (str, length = 50) => {
            if (!str || str.length <= length) return str;
            return str.substring(0, length) + '...';
        },

        /**
         * Generate random string
         * @param {number} length - Length of string
         * @returns {string} Random string
         */
        random: (length = 10) => {
            const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            let result = '';
            for (let i = 0; i < length; i++) {
                result += chars.charAt(Math.floor(Math.random() * chars.length));
            }
            return result;
        }
    },

    /**
     * Date/Time utilities
     */
    time: {
        /**
         * Get time of day (morning, afternoon, evening)
         * @returns {string} Time of day
         */
        getTimeOfDay: () => {
            const hour = new Date().getHours();
            if (hour < 12) return 'morning';
            if (hour < 18) return 'afternoon';
            return 'evening';
        },

        /**
         * Format date for display
         * @param {Date|string} date - Date to format
         * @returns {string} Formatted date
         */
        formatDate: (date) => {
            const d = date instanceof Date ? date : new Date(date);
            return d.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });
        },

        /**
         * Get relative time (e.g., "2 hours ago")
         * @param {Date|string} date - Date to compare
         * @returns {string} Relative time
         */
        getRelativeTime: (date) => {
            const d = date instanceof Date ? date : new Date(date);
            const now = new Date();
            const diff = now - d;

            const minutes = Math.floor(diff / 60000);
            const hours = Math.floor(diff / 3600000);
            const days = Math.floor(diff / 86400000);

            if (minutes < 1) return 'just now';
            if (minutes < 60) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
            if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
            return `${days} day${days > 1 ? 's' : ''} ago`;
        }
    },

    /**
     * Local storage utilities
     */
    storage: {
        /**
         * Get item from localStorage
         * @param {string} key - Storage key
         * @param {*} defaultValue - Default value if not found
         * @returns {*} Stored value or default
         */
        get: (key, defaultValue = null) => {
            try {
                const item = localStorage.getItem(key);
                return item ? JSON.parse(item) : defaultValue;
            } catch (error) {
                console.error('Error reading from localStorage:', error);
                return defaultValue;
            }
        },

        /**
         * Set item in localStorage
         * @param {string} key - Storage key
         * @param {*} value - Value to store
         */
        set: (key, value) => {
            try {
                localStorage.setItem(key, JSON.stringify(value));
            } catch (error) {
                console.error('Error writing to localStorage:', error);
            }
        },

        /**
         * Remove item from localStorage
         * @param {string} key - Storage key
         */
        remove: (key) => {
            try {
                localStorage.removeItem(key);
            } catch (error) {
                console.error('Error removing from localStorage:', error);
            }
        },

        /**
         * Clear all localStorage
         */
        clear: () => {
            try {
                localStorage.clear();
            } catch (error) {
                console.error('Error clearing localStorage:', error);
            }
        }
    },

    /**
     * URL utilities
     */
    url: {
        /**
         * Get query parameter from URL
         * @param {string} param - Parameter name
         * @returns {string|null} Parameter value
         */
        getParam: (param) => {
            const urlParams = new URLSearchParams(window.location.search);
            return urlParams.get(param);
        },

        /**
         * Redirect to URL
         * @param {string} url - URL to redirect to
         * @param {number} delay - Delay in ms before redirect
         */
        redirect: (url, delay = 0) => {
            if (delay > 0) {
                setTimeout(() => {
                    window.location.href = url;
                }, delay);
            } else {
                window.location.href = url;
            }
        },

        /**
         * Reload page
         */
        reload: () => {
            window.location.reload();
        }
    },

    /**
     * Copy to clipboard
     * @param {string} text - Text to copy
     * @returns {Promise<boolean>} Success status
     */
    copyToClipboard: async (text) => {
        try {
            await navigator.clipboard.writeText(text);
            return true;
        } catch (error) {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = text;
            textArea.style.position = 'fixed';
            textArea.style.left = '-999999px';
            document.body.appendChild(textArea);
            textArea.select();
            try {
                document.execCommand('copy');
                document.body.removeChild(textArea);
                return true;
            } catch (err) {
                document.body.removeChild(textArea);
                return false;
            }
        }
    },

    /**
     * Debounce function
     * @param {Function} func - Function to debounce
     * @param {number} wait - Wait time in ms
     * @returns {Function} Debounced function
     */
    debounce: (func, wait = 300) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    /**
     * Generate greeting based on time
     * @param {string} name - User's name
     * @returns {string} Greeting message
     */
    generateGreeting: (name) => {
        const timeOfDay = Utils.time.getTimeOfDay();
        const firstName = Utils.string.getFirstName(name);
        return `Good ${timeOfDay}, ${firstName}!`;
    }
};

// Freeze utilities to prevent modifications
Object.freeze(Utils);

// Export for use in other files
if (typeof window !== 'undefined') {
    window.Utils = Utils;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = Utils;
}