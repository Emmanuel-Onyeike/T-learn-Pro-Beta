/**
 * T LEARN PRO - Configuration
 * Environment variables for the application
 *
 * SECURITY NOTE:
 * - The Supabase ANON key is safe to expose in client-side code
 * - Real security comes from Row Level Security (RLS) policies in your Supabase database
 * - NEVER expose your SERVICE_ROLE key (that one is dangerous!)
 *
 * FOR VERCEL DEPLOYMENT:
 * 1. Add these as Environment Variables in Vercel dashboard
 * 2. Use Vercel's build process to inject them
 * 3. Or keep them here - ANON key is public-safe by design
 */

const CONFIG = {
    // Your Supabase project URL
    SUPABASE_URL: 'https://mddlkobjiquicopymipy.supabase.co',

    // Your Supabase ANON key (public-safe)
    // Replace this with your actual anon key from Supabase dashboard
    // It should start with "eyJ..." and be much longer
    SUPABASE_ANON_KEY: 'sb_publishable_w5jI7FaNhpSCsT1GBHEmIw_Wmekf2dH',
    // App configuration
    APP: {
        NAME: 'T Learn Pro',
        VERSION: '4.0.2',
        ENVIRONMENT: 'production' // 'development' or 'production'
    }
};

// Freeze config to prevent accidental modifications
Object.freeze(CONFIG);
Object.freeze(CONFIG.APP);

// Export for module systems (optional)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}
