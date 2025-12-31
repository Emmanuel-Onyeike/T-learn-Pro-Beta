/**
 * T LEARN PRO - Message Catalog
 * All user-facing messages in one place for consistency and easy maintenance
 */

let MESSAGES = {
    // Authentication Messages
    AUTH: {
        // Login Messages
        LOGIN_SUCCESS: {
            title: 'WELCOME BACK',
            message: (name) => `Welcome back, ${name}! Access granted. Redirecting to your dashboard...`
        },
        LOGIN_FAILED: {
            title: 'ACCESS DENIED',
            message: 'Invalid credentials. Please check your email and password.'
        },
        LOGIN_ERROR: {
            title: 'CONNECTION ERROR',
            message: 'Unable to connect to authentication server. Please try again.'
        },

        // Registration Messages
        REGISTER_SUCCESS: {
            title: 'ACCOUNT CREATED',
            message: 'Your account has been successfully created! Please check your email to verify your account before logging in.'
        },
        REGISTER_FAILED: {
            title: 'REGISTRATION FAILED',
            message: (error) => error || 'Unable to create account. Please try again.'
        },
        REGISTER_PASSWORD_MISMATCH: {
            title: 'PASSWORD MISMATCH',
            message: 'Your passwords don\'t match. Please make sure both password fields are identical.'
        },
        REGISTER_WEAK_PASSWORD: {
            title: 'WEAK PASSWORD',
            message: 'Password must be at least 6 characters long. Please choose a stronger password.'
        },
        REGISTER_EMAIL_EXISTS: {
            title: 'EMAIL ALREADY EXISTS',
            message: 'This email is already registered. Try logging in instead, or use the password reset option.'
        },

        // Session Messages
        SESSION_EXPIRED: {
            title: 'SESSION EXPIRED',
            message: 'Your session has expired. Please log in again to continue.'
        },
        LOGOUT_SUCCESS: {
            title: 'LOGGED OUT',
            message: 'You have been successfully logged out. See you next time!'
        },

        // Verification Messages
        EMAIL_NOT_VERIFIED: {
            title: 'EMAIL NOT VERIFIED',
            message: 'Please verify your email address before logging in. Check your inbox for the verification link.'
        }
    },

    // Form Validation Messages
    VALIDATION: {
        EMPTY_FIELD: {
            title: 'MISSING INFORMATION',
            message: (field) => `Please fill in your ${field}.`
        },
        INVALID_EMAIL: {
            title: 'INVALID EMAIL',
            message: 'Please enter a valid email address (e.g., name@example.com).'
        },
        SHORT_PASSWORD: {
            title: 'PASSWORD TOO SHORT',
            message: 'Password must be at least 6 characters long.'
        },
        INVALID_INPUT: {
            title: 'INVALID INPUT',
            message: 'Please check your input and try again.'
        }
    },

    // Network & System Messages
    SYSTEM: {
        LOADING: {
            title: 'LOADING',
            message: 'Please wait while we process your request...'
        },
        NETWORK_ERROR: {
            title: 'NETWORK ERROR',
            message: 'Unable to connect to the server. Please check your internet connection and try again.'
        },
        UNEXPECTED_ERROR: {
            title: 'UNEXPECTED ERROR',
            message: 'Something went wrong. Please try again or contact support if the problem persists.'
        },
        MAINTENANCE: {
            title: 'MAINTENANCE MODE',
            message: 'The system is currently under maintenance. Please try again in a few minutes.'
        }
    },

    // Success Messages
    SUCCESS: {
        OPERATION_COMPLETE: {
            title: 'SUCCESS',
            message: 'Operation completed successfully!'
        },
        DATA_SAVED: {
            title: 'SAVED',
            message: 'Your changes have been saved successfully.'
        },
        DATA_UPDATED: {
            title: 'UPDATED',
            message: 'Your information has been updated successfully.'
        }
    },

    // Dashboard Messages
    DASHBOARD: {
        WELCOME: (name, timeOfDay) => ({
            title: `GOOD ${timeOfDay.toUpperCase()}`,
            message: `Welcome back, ${name}! Ready to continue your learning journey?`
        }),
        NO_PROJECTS: {
            title: 'NO PROJECTS YET',
            message: 'Start your first project to begin building your portfolio!'
        },
        ACHIEVEMENT_UNLOCKED: (achievement) => ({
            title: 'ACHIEVEMENT UNLOCKED',
            message: `Congratulations! You've earned: ${achievement}`
        })
    },

    // Payment Messages
    PAYMENT: {
        PROCESSING: {
            title: 'PROCESSING PAYMENT',
            message: 'Please wait while we process your payment. Do not close this window.'
        },
        SUCCESS: {
            title: 'PAYMENT SUCCESSFUL',
            message: 'Your payment has been processed successfully. Welcome to the Elite tier!'
        },
        FAILED: {
            title: 'PAYMENT FAILED',
            message: 'Payment could not be processed. Please check your payment details and try again.'
        },
        GATEWAY_UNAVAILABLE: {
            title: 'COMING SOON',
            message: 'Our payment gateway is currently being integrated. Please check back soon!'
        }
    },

    // API & Developer Messages
    API: {
        TOKEN_COPIED: {
            title: 'TOKEN COPIED',
            message: 'API token copied to clipboard. Keep it secure!'
        },
        TOKEN_GENERATED: {
            title: 'TOKEN GENERATED',
            message: 'A new API token has been generated for your account.'
        },
        RATE_LIMIT: {
            title: 'RATE LIMIT EXCEEDED',
            message: 'You\'ve exceeded the API rate limit. Please wait a moment before trying again.'
        }
    },

    // Bug Bounty Messages
    BUG_BOUNTY: {
        SUBMISSION_SUCCESS: {
            title: 'REPORT SUBMITTED',
            message: 'Your bug report has been submitted successfully. Our team will review it shortly!'
        },
        INVALID_REPORT: {
            title: 'INCOMPLETE REPORT',
            message: 'Please fill in all required fields before submitting your bug report.'
        }
    },

    // General UI Messages
    UI: {
        CONFIRM_DELETE: {
            title: 'CONFIRM DELETION',
            message: 'Are you sure you want to delete this? This action cannot be undone.'
        },
        UNSAVED_CHANGES: {
            title: 'UNSAVED CHANGES',
            message: 'You have unsaved changes. Do you want to leave without saving?'
        },
        COPY_SUCCESS: {
            title: 'COPIED',
            message: 'Content copied to clipboard successfully!'
        }
    }
};

// Helper function to get message with dynamic content
const getMessage = (category, key, ...args) => {
    try {
        const msg = MESSAGES[category][key];
        if (typeof msg === 'function') {
            return msg(...args);
        }
        if (typeof msg.message === 'function') {
            return {
                title: msg.title,
                message: msg.message(...args)
            };
        }
        return msg;
    } catch (error) {
        console.error('Message not found:', category, key);
        return MESSAGES.SYSTEM.UNEXPECTED_ERROR;
    }
};

// Freeze the messages object to prevent modifications
Object.freeze(MESSAGES);

// Export for use in other files
if (typeof window !== 'undefined') {
    window.MESSAGES = MESSAGES;
    window.getMessage = getMessage;
}