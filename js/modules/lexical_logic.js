/**
 * TECH NXXT: LEXICAL BREACH (V1.1)
 * Logic Engine + Supabase Cloud Persistence
 */

const LEXICAL_LEVELS = [
    { level: 1, words: ["CODE", "DATA", "GRID", "NXXT", "SYNC", "NODE", "HTML", "BASE", "LINK", "LOGS"] },
    { level: 2, words: ["REACT", "LOGIC", "STACK", "ARRAY", "QUEUE", "BUILD", "FETCH", "CONST", "ASYNC", "SHIFT"] },
    { level: 3, words: ["PYTHON", "GITHUB", "ENGINE", "PROMPT", "SCRIPT", "DEPLOY", "KERNEL", "BINARY", "THREAD", "BUFFER"] },
    { level: 4, words: ["NETWORK", "FRONTEND", "BACKEND", "DATABASE", "FIREWALL", "RUNTIME", "TERMINAL", "PAYLOAD", "RECURSE", "COMPUTE"] },
    { level: 5, words: ["INTERFACE", "FRAMEWORK", "STRUCTURE", "ALGORITHM", "VARIABLES", "FUNCTIONS", "COMPONENT", "ENDPOINTS", "RESOURCES", "CONTAINER"] },
    { level: 6, words: ["KUBERNETES", "TYPESCRIPT", "MIDDLEWARE", "REDUX", "GRAPHQL", "INSTANCE", "SERIALIZE", "SNAPSHOT", "PIPELINE", "MIGRATION"] },
    { level: 7, words: ["ENCRYPTION", "DEVOPS", "MICROSOFT", "REFACTOR", "DEPENDENCY", "IMMUTABLE", "VALIDATION", "DOCKER", "RELIABILITY", "CLUSTERING"] },
    { level: 8, words: ["CYBERSECURITY", "BLOCKCHAIN", "NEURALNET", "AUTOMATION", "REDUNDANCY", "SCALABILITY", "DISTRIBUTED", "VIRTUALIZE", "REPOS", "SERVERLESS"] },
    { level: 9, words: ["ARTIFICIAL", "INTELLIGENCE", "TRANSFORMER", "RECOGNITION", "HEURISTICS", "PERFORMANCE", "ABSTRACTION", "CONCURRENCY", "EFFICIENT", "OPTIMIZE"] },
    { level: 10, words: ["DEEPLEARNING", "REINFORCED", "QUANTUM", "SINGULARITY", "FULLSTACK", "ARCHITECTURE", "PROBABILISTIC", "CRYPTOGRAPHY", "ORCHESTRATION", "MORPHOLOGY"] }
];

let currentLevel = 0;
let foundWords = [];
let isSelecting = false;
let selectedCells = [];

/**
 * CORE: INITIALIZE ENGINE
 */
function initLexicalGame() {
    const levelData = LEXICAL_LEVELS[currentLevel];
    foundWords = [];
    selectedCells = [];
    
    // Sync UI Count from Supabase on start
    syncGamesCountUI();
    renderLevelUI(levelData);
}

/**
 * UI: RENDER GRID
 */
function renderLevelUI(data) {
    const gridContainer = document.getElementById('lexicalGrid');
    const wordList = document.getElementById('targetWords');
    if (!gridContainer || !wordList) return;

    document.getElementById('currentLevelDisplay').innerText = `L-${data.level < 10 ? '0' + data.level : data.level}`;
    
    const size = data.level > 5 ? 14 : 12; 
    gridContainer.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    gridContainer.innerHTML = '';

    const totalCells = size * size;
    let gridArray = Array(totalCells).fill('').map(() => String.fromCharCode(65 + Math.floor(Math.random() * 26)));

    data.words.forEach((word, index) => {
        let row = index; 
        let startCol = Math.floor(Math.random() * (size - word.length));
        let startPos = (row * size) + startCol;
        for (let i = 0; i < word.length; i++) { gridArray[startPos + i] = word[i].toUpperCase(); }
    });

    gridArray.forEach((letter, idx) => {
        const cell = document.createElement('div');
        cell.className = 'lex-cell h-8 w-8 md:h-10 md:w-10 flex items-center justify-center border border-white/5 text-[10px] font-black text-white/40 cursor-pointer hover:bg-cyan-500/20 transition-all select-none rounded-lg';
        cell.innerText = letter;
        cell.onmousedown = () => startSelection(cell);
        cell.onmouseenter = () => continueSelection(cell);
        cell.ontouchstart = (e) => { e.preventDefault(); startSelection(cell); };
        cell.ontouchmove = (e) => {
            e.preventDefault();
            const touch = e.touches[0];
            const target = document.elementFromPoint(touch.clientX, touch.clientY);
            if (target && target.classList.contains('lex-cell')) continueSelection(target);
        };
        gridContainer.appendChild(cell);
    });

    wordList.innerHTML = data.words.map(w => `
        <span id="word-${w}" class="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-white/20 border border-white/5 px-3 py-1 rounded-full transition-all duration-500">
            ${w}
        </span>
    `).join('');

    window.onmouseup = endSelection;
    window.ontouchend = endSelection;
}

/**
 * LOGIC: SELECTION ENGINE
 */
function startSelection(cell) {
    isSelecting = true;
    selectedCells = [cell];
    cell.classList.add('bg-cyan-600', 'text-white', 'scale-90');
}

function continueSelection(cell) {
    if (!isSelecting || selectedCells.includes(cell)) return;
    selectedCells.push(cell);
    cell.classList.add('bg-cyan-600', 'text-white', 'scale-90');
}

function endSelection() {
    if (!isSelecting) return;
    isSelecting = false;
    const word = selectedCells.map(c => c.innerText).join('');
    const currentWords = LEXICAL_LEVELS[currentLevel].words;

    if (currentWords.includes(word) && !foundWords.includes(word)) {
        foundWords.push(word);
        const badge = document.getElementById(`word-${word}`);
        if (badge) badge.className = 'text-[8px] md:text-[10px] font-black uppercase tracking-widest text-green-400 border border-green-500/50 bg-green-500/10 px-3 py-1 rounded-full shadow-[0_0_15px_rgba(34,197,94,0.3)]';
        
        selectedCells.forEach(c => {
            c.classList.remove('bg-cyan-600', 'scale-90');
            c.classList.add('bg-green-600/40', 'text-green-400', 'border-green-500/30');
            c.onmousedown = null; c.onmouseenter = null;
        });
        
        if (foundWords.length === currentWords.length) setTimeout(proceedToNextNode, 800);
    } else {
        selectedCells.forEach(c => {
            if (!c.classList.contains('text-green-400')) c.classList.remove('bg-cyan-600', 'text-white', 'scale-90');
        });
    }
    selectedCells = [];
}

/**
 * PERSISTENCE: SUPABASE SYNC
 */
async function syncGamesCountUI() {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
        const { data } = await supabase.from('profiles').select('games_completed').eq('id', user.id).single();
        const display = document.getElementById('gamesCount');
        if (display && data) display.innerText = data.games_completed || 0;
    }
}

async function recordGameCompletion() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data } = await supabase.from('profiles').select('games_completed').eq('id', user.id).single();
    const newCount = (data?.games_completed || 0) + 1;

    const { error } = await supabase.from('profiles').update({ games_completed: newCount }).eq('id', user.id);
    
    if (!error) {
        const display = document.getElementById('gamesCount');
        if (display) display.innerText = newCount;
        showCompletionModal();
    }
}

/**
 * UI: MODAL FEEDBACK
 */
function showCompletionModal() {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md px-6';
    modal.innerHTML = `
        <div class="bg-[#050b1d] border border-cyan-500/30 p-10 rounded-[3rem] text-center max-w-sm shadow-[0_0_50px_rgba(8,145,178,0.2)]">
            <div class="h-20 w-20 bg-cyan-500/10 border border-cyan-500/20 rounded-3xl flex items-center justify-center text-cyan-400 mx-auto mb-6">
                <i class="fas fa-trophy text-4xl"></i>
            </div>
            <h2 class="text-2xl font-black text-white uppercase italic tracking-tighter">Mission Complete</h2>
            <p class="text-gray-500 text-[10px] font-black uppercase tracking-widest mt-2 mb-8">Neural Encryption Fully Decrypted</p>
            <button onclick="this.parentElement.parentElement.remove()" class="w-full py-4 bg-cyan-600 text-white font-black uppercase tracking-widest rounded-2xl hover:bg-cyan-500 transition-all">Continue Mission</button>
        </div>
    `;
    document.body.appendChild(modal);
}

/**
 * PROGRESSION
 */
function proceedToNextNode() {
    currentLevel++;
    if (currentLevel < LEXICAL_LEVELS.length) {
        initLexicalGame();
    } else {
        recordGameCompletion();
        currentLevel = 0; 
        initLexicalGame();
    }
}
