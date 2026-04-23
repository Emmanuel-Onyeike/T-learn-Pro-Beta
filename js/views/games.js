/**
 * TECH NXXT: GAMES LOGIC ENGINE
 * V1.0 - Tactical Learning Modules
 */

const NXXT_GAMES_DATA = [
    {
        id: 'G-001',
        title: 'Logic Breach',
        category: 'Programming',
        difficulty: 'Elite',
        status: 'Operational',
        icon: 'fa-terminal'
    },
    {
        id: 'G-002',
        title: 'Neural Sync',
        category: 'Memory',
        difficulty: 'Advanced',
        status: 'Operational',
        icon: 'fa-brain'
    },
    {
        id: 'G-003',
        title: 'Code War: CSS',
        category: 'Design',
        difficulty: 'Standard',
        status: 'Maintenance',
        icon: 'fa-palette'
    }
];

// 1. Initialize Games Dashboard
function initGamesEngine() {
    console.log("NXXT_SYSTEM: Initializing Game Modules...");
    renderGameCards();
    updateGamesCounter();
}

// 2. Render Games to the UI
function renderGameCards() {
    const container = document.getElementById('gamesGridContainer'); // Ensure this ID exists in your Games view
    if (!container) return;

    container.innerHTML = NXXT_GAMES_DATA.map(game => `
        <div class="group relative bg-gradient-to-br from-blue-600/5 to-black border border-white/5 p-6 rounded-[2rem] hover:border-cyan-500/50 transition-all duration-500 overflow-hidden">
            <div class="relative z-10">
                <div class="flex justify-between items-start mb-6">
                    <div class="h-12 w-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                        <i class="fas ${game.icon} text-xl"></i>
                    </div>
                    <span class="text-[8px] font-black px-2 py-1 rounded bg-white/5 border border-white/10 uppercase tracking-widest ${game.status === 'Operational' ? 'text-green-400' : 'text-amber-400'}">
                        ${game.status}
                    </span>
                </div>
                
                <h4 class="text-white font-black uppercase tracking-tight text-lg">${game.title}</h4>
                <p class="text-gray-500 text-[10px] font-bold uppercase tracking-widest mt-1">${game.category} // LVL: ${game.difficulty}</p>
                
                <button onclick="launchMission('${game.id}')" 
                    ${game.status !== 'Operational' ? 'disabled' : ''}
                    class="w-full mt-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-[10px] font-black uppercase tracking-[0.2em] group-hover:bg-cyan-600 group-hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed">
                    Start Mission
                </button>
            </div>
            
            <span class="absolute -right-2 -bottom-2 text-4xl font-black italic text-white/[0.03] pointer-events-none">${game.id}</span>
        </div>
    `).join('');
}

// 3. Update the Global Games Counter
function updateGamesCounter() {
    const countElement = document.getElementById('gamesCount');
    if (countElement) {
        const operationalGames = NXXT_GAMES_DATA.filter(g => g.status === 'Operational').length;
        countElement.innerText = operationalGames;
    }
}

// 4. Mission Launcher
function launchMission(gameId) {
    const game = NXXT_GAMES_DATA.find(g => g.id === gameId);
    if (!game) return;

    // Tactical Alert logic
    alert(`[SYSTEM_MSG]: Initializing ${game.title}... Deploying neural environment.`);
    
    // Here you would typically swap the view or open a modal to play the game
    console.log(`NXXT_SYSTEM: Launching ${gameId}`);
}

// Execute on load
document.addEventListener('DOMContentLoaded', initGamesEngine);
