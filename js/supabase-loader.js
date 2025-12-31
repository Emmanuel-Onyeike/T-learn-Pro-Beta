/**
 * T LEARN PRO - Supabase Client Loader
 * Centralized Supabase initialization and client management
 */

class SupabaseLoader {
    constructor() {
        this.client = null;
        this.loading = false;
        this.loadPromise = null;
    }

    /**
     * Load Supabase client (singleton pattern)
     * @returns {Promise<Object>} Supabase client instance
     */
    async load() {
        // Return existing client if already loaded
        if (this.client) return this.client;

        // Return existing load promise if currently loading
        if (this.loading) return this.loadPromise;

        // Start loading
        this.loading = true;
        this.loadPromise = new Promise((resolve, reject) => {
            // Check if Supabase script is already loaded
            if (window.supabase) {
                this.initializeClient();
                resolve(this.client);
                return;
            }

            // Load Supabase from CDN
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';
            script.async = true;

            script.onload = () => {
                this.initializeClient();
                this.loading = false;
                resolve(this.client);
            };

            script.onerror = () => {
                this.loading = false;
                reject(new Error('Failed to load Supabase SDK'));
            };

            document.head.appendChild(script);
        });

        return this.loadPromise;
    }

    /**
     * Initialize Supabase client with credentials from config
     */
    initializeClient() {
        if (!window.supabase) {
            throw new Error('Supabase SDK not loaded');
        }

        const { createClient } = window.supabase;
        this.client = createClient(CONFIG.SUPABASE_URL, CONFIG.SUPABASE_ANON_KEY);
    }

    /**
     * Get the current client instance
     * @returns {Object|null} Supabase client or null if not loaded
     */
    getClient() {
        return this.client;
    }
}

// Create global singleton instance
window.supabaseLoader = new SupabaseLoader();