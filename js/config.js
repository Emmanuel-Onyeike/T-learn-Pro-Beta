/**
 * T LEARN PRO - Configuration
 * On Vercel: placeholders are replaced at build time from environment variables.
 * For local dev: values fall back to the hardcoded defaults below.
 */

const CONFIG = (() => {
    const url = '__SUPABASE_URL__';
    const key = '__SUPABASE_ANON_KEY__';
    const env = '__APP_ENV__';
    return {
        SUPABASE_URL:      url.startsWith('__') ? 'https://ntvcaqybiptuoyossdlz.supabase.co' : url,
        SUPABASE_ANON_KEY: key.startsWith('__') ? 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im50dmNhcXliaXB0dW95b3NzZGx6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY0MjA2OTUsImV4cCI6MjA3MTk5NjY5NX0.AI3iNiW7rNre2g7pFrBNtZ0TNPmKy3uN7VTrxqZIYRI' : key,
        APP: {
            NAME:        'T Learn Pro',
            VERSION:     '4.0.2',
            ENVIRONMENT: env.startsWith('__') ? 'development' : env
        }
    };
})();

Object.freeze(CONFIG);
Object.freeze(CONFIG.APP);

if (typeof module !== 'undefined' && module.exports) module.exports = CONFIG;
