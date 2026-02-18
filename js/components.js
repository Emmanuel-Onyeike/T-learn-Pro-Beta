/**
 * T LEARN PRO - Shared UI Components
 * Reusable HTML generators. No repetition. Single source of truth.
 * 
 * DEPENDENCIES: none
 */

const Components = {

  /**
   * Stat card used in Overview grid.
   * Replaces 12+ copy-pasted card blocks.
   *
   * @param {Object} opts
   * @param {string} opts.id       - Element ID for dynamic value
   * @param {string} opts.label    - Card label text
   * @param {string} opts.icon     - FontAwesome class e.g. 'fa-fire'
   * @param {string} opts.bgIcon   - Background watermark icon class
   * @param {string} opts.color    - Tailwind color prefix e.g. 'orange'
   * @param {string} opts.value    - Initial display value (default '0')
   * @param {string} opts.valueExtra - Extra HTML appended after value (e.g. XP badge)
   */
  statCard({ id, label, icon, bgIcon, color, value = '0', valueExtra = '' }) {
    return `
      <div class="group relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#050b1d] p-7 transition-all duration-500 hover:border-${color}-500/40">
        <div class="relative z-10 flex items-center gap-5">
          <div class="flex h-14 w-14 items-center justify-center rounded-2xl bg-${color}-500/10 border border-${color}-500/20 text-${color}-400">
            <i class="fas ${icon} text-2xl"></i>
          </div>
          <div>
            <p class="text-[11px] font-black uppercase tracking-widest text-gray-500">${label}</p>
            <h3 ${id ? `id="${id}"` : ''} class="mt-1 text-3xl font-black text-white">${value}${valueExtra}</h3>
          </div>
        </div>
        <i class="fas ${bgIcon || icon} absolute -right-4 -bottom-4 text-8xl text-white/[0.02] transition-all group-hover:text-${color}-500/[0.05] rotate-12"></i>
      </div>`;
  },

  /**
   * Gradient stat card (used for the top-row Overview cards)
   * @param {Object} opts
   */
  gradientStatCard({ id, label, icon, bgIcon, color, value = '0' }) {
    return `
      <div class="group relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-[#0a0f25] to-[#050b1d] p-7 transition-all duration-500 hover:border-${color}-500/50 hover:shadow-[0_0_30px_-10px_rgba(59,130,246,0.3)]">
        <div class="relative z-10 flex items-center gap-5">
          <div class="flex h-14 w-14 items-center justify-center rounded-2xl border border-${color}-500/30 bg-${color}-500/10 shadow-[inset_0_0_15px_rgba(59,130,246,0.2)] transition-transform duration-500 group-hover:scale-110">
            <i class="fas ${icon} text-2xl text-${color}-400"></i>
          </div>
          <div>
            <p class="text-[11px] font-black uppercase tracking-[0.2em] text-${color}-400/60">${label}</p>
            <h3 ${id ? `id="${id}"` : ''} class="mt-1 text-4xl font-black tracking-tighter text-white">${value}</h3>
          </div>
        </div>
        <div class="absolute -right-6 -bottom-6 opacity-[0.03] transition-all duration-700 group-hover:scale-110 group-hover:opacity-[0.08] group-hover:text-${color}-500">
          <i class="fas ${bgIcon || icon} text-[10rem] rotate-12"></i>
        </div>
      </div>`;
  },

  /**
   * Analytics stat card (used in the Analytics subtab)
   */
  analyticsStat(label, value, colorClass, icon) {
    return `
      <div class="bg-white/5 border border-white/10 rounded-3xl p-6 hover:bg-white/[0.08] transition-all group">
        <div class="flex justify-between items-start mb-4">
          <i class="fas ${icon} ${colorClass} opacity-50 group-hover:opacity-100 transition-opacity"></i>
          <div class="text-[8px] text-green-500 font-bold">+2.4%</div>
        </div>
        <p class="text-white/40 text-[9px] font-black uppercase tracking-widest mb-1">${label}</p>
        <h4 class="text-white text-2xl font-black tracking-tighter">${value}</h4>
      </div>`;
  },

  /**
   * Activity row for the Neural Activity Log
   */
  activityRow(title, time, dotColor) {
    return `
      <div class="flex items-center gap-4 group">
        <div class="w-1.5 h-1.5 rounded-full ${dotColor} shadow-[0_0_8px_currentColor]"></div>
        <div class="flex-1 border-b border-white/5 pb-2 group-last:border-0">
          <p class="text-white/80 text-[10px] font-bold uppercase tracking-tight">${title}</p>
          <p class="text-white/20 text-[8px] uppercase mt-0.5">${time}</p>
        </div>
      </div>`;
  },

  /**
   * Empty state placeholder
   */
  placeholder(icon, title, subtitle) {
    return `
      <div class="py-32 flex flex-col items-center justify-center animate-in fade-in zoom-in duration-500">
        <div class="w-20 h-20 mb-6 bg-white/5 rounded-full flex items-center justify-center border border-white/10">
          <i class="fas ${icon} text-blue-500/40 text-2xl"></i>
        </div>
        <h3 class="text-white/40 font-black uppercase tracking-[0.4em] text-lg">${title}</h3>
        <p class="text-white/10 text-[9px] uppercase font-bold mt-2 tracking-widest text-center">${subtitle}</p>
      </div>`;
  }
};