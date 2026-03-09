/**
 * T LEARN PRO - Configuration
 * Values are injected by Vercel at build time from Environment Variables.
 * For local dev, replace the placeholders below with your actual values.
 *
 * SECURITY NOTE:
 * - The Supabase ANON key is safe to expose in client-side code
 * - Real security comes from Row Level Security (RLS) policies
 * - NEVER expose your SERVICE_ROLE key
 */

const CONFIG = {
    SUPABASE_URL: '__SUPABASE_URL__',
    SUPABASE_ANON_KEY: '__SUPABASE_ANON_KEY__',
    APP: {
        NAME: 'T Learn Pro',
        VERSION: '4.0.2',
        ENVIRONMENT: '__APP_ENV__'
    }
};

Object.freeze(CONFIG);
Object.freeze(CONFIG.APP);

if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}
