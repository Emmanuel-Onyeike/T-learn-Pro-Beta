/* ── T LEARN PRO: views/pricing.js ──
   Adds to the global views object loaded by dashboard.js */

views['Pricing'] = `
<div class="space-y-12 animate-in relative">
    <div class="flex flex-col items-center text-center">
        <div class="px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-[10px] font-black uppercase tracking-[0.3em] text-blue-400 mb-6 animate-pulse">Access Protocol v4.0</div>
        <h2 class="text-4xl md:text-6xl font-black italic uppercase tracking-tighter text-white mb-8">System <span class="text-blue-500">Subscription///</span></h2>
        
        <div class="flex items-center gap-6 p-2 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md">
            <span id="monthlyLabel" class="text-[10px] font-black uppercase tracking-widest text-white transition-all">Monthly</span>
            <button onclick="togglePricing()" id="priceToggle" class="w-14 h-7 bg-blue-600 rounded-full relative p-1 transition-all">
                <div id="toggleBall" class="w-5 h-5 bg-white rounded-full shadow-lg transition-transform duration-300"></div>
            </button>
            <span id="yearlyLabel" class="text-[10px] font-black uppercase tracking-widest text-gray-500 transition-all">Yearly <span class="text-blue-400 text-[8px] ml-1">(Save 15%)</span></span>
        </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 items-end max-w-6xl mx-auto">
        
        <div class="pricing-card p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 flex flex-col hover:border-blue-500/40 transition-all duration-500 group relative overflow-hidden">
            <span class="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">Entry Node</span>
            <h3 class="text-3xl font-black italic uppercase text-white mb-6">Free</h3>
            <div class="mb-8"><span class="text-4xl font-black text-white">₦0</span> <span class="text-xs font-bold text-gray-600 uppercase">/ Forever</span></div>
            <ul class="space-y-4 mb-12 flex-grow">
                <li class="flex items-center gap-3 text-[10px] text-gray-400 font-bold uppercase"><i class="fas fa-check text-blue-500"></i> Public Learning Hub</li>
                <li class="flex items-center gap-3 text-[10px] text-gray-400 font-bold uppercase"><i class="fas fa-check text-blue-500"></i> Community Support</li>
                                <li class="flex items-center gap-3 text-[10px] text-gray-400 font-bold uppercase"><i class="fas fa-check text-blue-500"></i>  Test Collaboration</li>
                <li class="flex items-center gap-3 text-[10px] text-red-500/50 font-bold uppercase"><i class="fas fa-times"></i> No AI Tutor Access</li>
                <li class="flex items-center gap-3 text-[10px] text-red-500/50 font-bold uppercase"><i class="fas fa-times"></i> No Verified Certs</li>
                <li class="flex items-center gap-3 text-[10px] text-red-500/50 font-bold uppercase"><i class="fas fa-times"></i> No Projects feature</li>
                <li class="flex items-center gap-3 text-[10px] text-red-500/50 font-bold uppercase"><i class="fas fa-times"></i> No Team feature</li>
            </ul>
            <button class="w-full py-4 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-white hover:bg-white hover:text-black transition-all">Current Plan</button>
        </div>

        <div class="pricing-card p-10 rounded-[3rem] bg-[#050b1d] border-2 border-blue-600 shadow-[0_0_50px_rgba(37,99,235,0.15)] flex flex-col relative scale-105 z-20 overflow-hidden group">
            <div class="absolute -top-1 left-1/2 -translate-x-1/2 px-4 py-1 bg-blue-600 rounded-b-xl text-[8px] font-black uppercase text-white tracking-[0.3em]">Recommended</div>
            <span class="text-[10px] font-black uppercase tracking-widest text-blue-400 mb-2">Academic Node</span>
            <h3 class="text-3xl font-black italic uppercase text-white mb-6">Student</h3>
            <div class="mb-8">
                <span id="studentPrice" class="text-5xl font-black text-white transition-all">₦8,000</span> 
                <span id="studentPeriod" class="text-xs font-bold text-blue-400/50 uppercase">/ Month</span>
            </div>
         <ul class="space-y-4 mb-12 flex-grow">
    <li class="flex items-center gap-3 text-[10px] text-white font-bold uppercase">
        <i class="fas fa-book-open text-blue-400 w-4"></i> Limited Pro Courses
    </li>
    <li class="flex items-center gap-3 text-[10px] text-white font-bold uppercase">
        <i class="fas fa-project-diagram text-blue-400 w-4"></i> Limited Projects Feature
    </li>
    <li class="flex items-center gap-3 text-[10px] text-white font-bold uppercase">
        <i class="fas fa-chart-line text-blue-400 w-4"></i> Real-Time Hustle Hub Update
    </li>
    <li class="flex items-center gap-3 text-[10px] text-white font-bold uppercase">
        <i class="fas fa-sync text-blue-400 w-4"></i> Limited Collaboration Feature
    </li>
    <li class="flex items-center gap-3 text-[10px] text-white font-bold uppercase">
        <i class="fas fa-users-cog text-blue-400 w-4"></i> Limited Team Feature
    </li>
    <li class="flex items-center gap-3 text-[10px] text-white font-bold uppercase">
        <i class="fas fa-brain text-blue-400 w-4"></i> Nxxt AI Tutor (24/7)
    </li>
    <li class="flex items-center gap-3 text-[10px] text-white font-bold uppercase">
        <i class="fas fa-medal text-blue-400 w-4"></i> Verified Certificates
    </li>
    <li class="flex items-center gap-3 text-[10px] text-white font-bold uppercase">
        <i class="fas fa-server text-blue-400 w-4"></i> 5GB Cloud Lab Space
    </li>
</ul>
          <button onclick="openPaymentModal('Student Node')" class="w-full py-5 bg-blue-600 rounded-xl text-[10px] font-black uppercase tracking-widest text-white hover:bg-white hover:text-black transition-all shadow-[0_0_30px_rgba(37,99,235,0.4)]">
    Upgrade 
</button>
        </div>

        <div class="pricing-card p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 flex flex-col hover:border-blue-500/40 transition-all duration-500 group relative overflow-hidden">
            <span class="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">Authority Node</span>
            <h3 class="text-3xl font-black italic uppercase text-white mb-6">Pro</h3>
            <div class="mb-8"><span id="proPrice" class="text-4xl font-black text-white">₦16,000</span> <span id="proPeriod" class="text-xs font-bold text-gray-600 uppercase">/ Month</span></div>
          <ul class="space-y-4 mb-12 flex-grow">
    <li class="flex items-center gap-3 text-[10px] text-gray-400 font-bold uppercase">
        <i class="fas fa-layer-group text-blue-500 w-4"></i> Unlimited Pro Courses
    </li>
    <li class="flex items-center gap-3 text-[10px] text-gray-400 font-bold uppercase">
        <i class="fas fa-microchip text-blue-500 w-4"></i> Nxxt AI Full Support
    </li>
    <li class="flex items-center gap-3 text-[10px] text-gray-400 font-bold uppercase">
        <i class="fas fa-network-wired text-blue-500 w-4"></i> Unlimited Team Feature
    </li>
    <li class="flex items-center gap-3 text-[10px] text-gray-400 font-bold uppercase">
        <i class="fas fa-hands-helping text-blue-500 w-4"></i> Unlimited Collaboration Feature
    </li>
    <li class="flex items-center gap-3 text-[10px] text-gray-400 font-bold uppercase">
        <i class="fas fa-rocket text-blue-500 w-4"></i> Unlimited Projects Feature
    </li>
    <li class="flex items-center gap-3 text-[10px] text-gray-400 font-bold uppercase">
        <i class="fas fa-user-tie text-blue-500 w-4"></i> Priority Job Placement
    </li>
    <li class="flex items-center gap-3 text-[10px] text-gray-400 font-bold uppercase">
        <i class="fas fa-chalkboard-teacher text-blue-500 w-4"></i> Private Mentor Access
    </li>
</ul>
           <button onclick="openPaymentModal('Authority Node')" class="w-full py-4 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-white hover:bg-white hover:text-black transition-all">
    Execute Mastery
</button>
        </div>
    </div>
</div>


`;

