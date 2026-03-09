/**
 * T Learn Pro — Vercel Build Script
 * Reads env vars and injects them into config.js before deploy
 */
const fs = require('fs');
const path = require('path');

const configPath = path.join(__dirname, 'js', 'config.js');

let config = fs.readFileSync(configPath, 'utf8');

// Replace placeholders with actual environment variables
const replacements = {
    '__SUPABASE_URL__':   process.env.SUPABASE_URL   || 'https://ntvcaqybiptuoyossdlz.supabase.co',
    '__SUPABASE_ANON_KEY__': process.env.SUPABASE_ANON_KEY || '',
    '__APP_ENV__':        process.env.APP_ENV         || 'production'
};

for (const [placeholder, value] of Object.entries(replacements)) {
    config = config.replaceAll(placeholder, value);
}

fs.writeFileSync(configPath, config, 'utf8');

console.log('✓ config.js injected with env vars');
console.log('  SUPABASE_URL:',     replacements['__SUPABASE_URL__']);
console.log('  SUPABASE_ANON_KEY:', replacements['__SUPABASE_ANON_KEY__'] ? '✓ set' : '✗ MISSING');
console.log('  APP_ENV:',          replacements['__APP_ENV__']);
