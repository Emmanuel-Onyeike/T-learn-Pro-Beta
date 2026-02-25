/**
 * T LEARN PRO — Shared Auth State
 * Single getUser() call shared across all modules.
 * Prevents Navigator Lock timeout from multiple simultaneous auth calls.
 */

window.AuthState = {
    _user: null,
    _promise: null,

    // Call once — all subsequent calls return the cached result
    async getUser() {
        if (this._user) return this._user;
        if (this._promise) return this._promise;

        this._promise = (async () => {
            try {
                const client = await window.supabaseLoader.load();
                const { data: { user }, error } = await client.auth.getUser();
                if (error) {
                    console.warn('[AuthState] getUser error:', error.message);
                    return null;
                }
                this._user = user;
                console.log('[AuthState] User loaded:', user?.email);
                return user;
            } catch (err) {
                console.warn('[AuthState] getUser failed:', err.message);
                return null;
            }
        })();

        return this._promise;
    },

    // Clear cache on logout
    clear() {
        this._user = null;
        this._promise = null;
    }
};
