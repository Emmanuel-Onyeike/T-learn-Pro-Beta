/**
 * TECH NXXT: OMNI-GAME KERNEL (V1.5)
 * Lexical Breach + GitHub Repo-Hunt + Judge0 Sandbox
 * Integration: Supabase Persistence & RapidAPI execution
 */

// --- CONFIGURATION ---
const KERNEL_CONFIG = {
    JUDGE0: {
        API_KEY: 'YOUR_RAPID_API_KEY', // Replace with your actual key
        HOST: 'judge0-ce.p.rapidapi.com'
    },
    MODES: {
        LEXICAL: 'lexical',
        REPO_HUNT: 'repo_hunt',
        SANDBOX: 'sandbox'
    }
};

const LEXICAL_LEVELS = [
    { level: 1, words: ["CODE", "DATA", "GRID", "NXXT", "SYNC", "NODE", "HTML", "BASE", "LINK", "LOGS"], challenge: { title: "INIT_CORE", prompt: "Return 'ACTIVE'", test: "console.log(solution())", expected: "ACTIVE" } },
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
let activeMode = KERNEL_CONFIG.MODES.LEXICAL;

/**
 * CORE: KERNEL ROUTING
 */
function switchGameMode(mode) {
    activeMode = mode;
    const viewport = document.getElementById('lexicalGrid');
    const wordList = document.getElementById('targetWords');
    const sysMsg = document.getElementById('systemMessage');
    
    // Reset Viewport
    viewport.innerHTML = '';
    wordList.innerHTML = '';
    
    switch(mode) {
        case KERNEL_CONFIG.MODES.LEXICAL:
            sysMsg.innerText = "DECRYPT TECHNICAL TERMS TO PROCEED";
            initLexicalGame();
            break;
        case KERNEL_CONFIG.MODES.REPO_HUNT:
            sysMsg.innerText = "ANALYZE REMOTE GITHUB REPOSITORIES";
            initRepoHunt();
            break;
        case KERNEL_CONFIG.MODES.SANDBOX:
            sysMsg.innerText = "EXECUTE NEURAL PAYLOADS";
            const challenge = LEXICAL_LEVELS[currentLevel].challenge || { title: "SANDBOX", prompt: "Write code to log 'Hello Nxxt'" };
            openCodingSandbox(challenge);
            break;
    }
}

/**
 * MODULE 1: LEXICAL BREACH ENGINE
 */
function initLexicalGame() {
    const levelData = LEXICAL_LEVELS[currentLevel];
    foundWords = [];
    selectedCells = [];
    syncGamesCountUI();
    renderLevelUI(levelData);
}

function renderLevelUI(data) {
    const gridContainer = document.getElementById('lexicalGrid');
    const wordList = document.getElementById('targetWords');
    if (!gridContainer || !wordList) return;

    document.getElementById('currentLevelDisplay').innerText = `L-${data.level < 10 ? '0' + data.level : data.level}`;
    const size = data.level > 5 ? 14 : 12; 
    gridContainer.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    
    const totalCells = size * size;
    let gridArray = Array(totalCells).fill('').map(() => String.fromCharCode(65 + Math.floor(Math.random() * 26)));

    data.words.forEach((word, index) => {
        let row = index; 
        let startCol = Math.floor(Math.random() * (size - word.length));
        let startPos = (row * size) + startCol;
        for (let i = 0; i < word.length; i++) { gridArray[startPos + i] = word[i].toUpperCase(); }
    });

    gridArray.forEach((letter) => {
        const cell = document.createElement('div');
        cell.className = 'lex-cell h-8 w-8 md:h-10 md:w-10 flex items-center justify-center border border-white/5 text-[10px] font-black text-white/40 cursor-pointer hover:bg-blue-500/20 transition-all select-none rounded-lg';
        cell.innerText = letter;
        cell.onmousedown = () => startSelection(cell);
        cell.onmouseenter = () => continueSelection(cell);
        cell.ontouchstart = (e) => { e.preventDefault(); startSelection(cell); };
        gridContainer.appendChild(cell);
    });

    wordList.innerHTML = data.words.map(w => `
        <span id="word-${w}" class="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-white/20 border border-white/5 px-3 py-1 rounded-full transition-all">
            ${w}
        </span>
    `).join('');
    window.onmouseup = endSelection;
}

function startSelection(cell) { isSelecting = true; selectedCells = [cell]; cell.classList.add('bg-blue-600', 'text-white'); }
function continueSelection(cell) { if (!isSelecting || selectedCells.includes(cell)) return; selectedCells.push(cell); cell.classList.add('bg-blue-600', 'text-white'); }
function endSelection() {
    if (!isSelecting) return;
    isSelecting = false;
    const word = selectedCells.map(c => c.innerText).join('');
    const currentWords = LEXICAL_LEVELS[currentLevel].words;

    if (currentWords.includes(word) && !foundWords.includes(word)) {
        foundWords.push(word);
        document.getElementById(`word-${word}`).className = 'text-[8px] md:text-[10px] font-black text-green-400 border border-green-500/50 bg-green-500/10 px-3 py-1 rounded-full shadow-[0_0_15px_rgba(34,197,94,0.3)]';
        selectedCells.forEach(c => {
            c.classList.remove('bg-blue-600');
            c.classList.add('bg-green-600/40', 'text-green-400', 'border-green-500/30');
            c.onmousedown = null;
        });
        if (foundWords.length === currentWords.length) setTimeout(proceedToNextNode, 800);
    } else {
        selectedCells.forEach(c => { if (!c.classList.contains('text-green-400')) c.classList.remove('bg-blue-600', 'text-white'); });
    }
    selectedCells = [];
}

/**
 * MODULE 2: GITHUB REPO-HUNT
 */
async function initRepoHunt() {
    const grid = document.getElementById('lexicalGrid');
    grid.style.gridTemplateColumns = '1fr';
    grid.innerHTML = `<div class="p-20 text-center animate-pulse text-blue-500 font-black uppercase text-[10px] tracking-[0.4em]">Infiltrating GitHub API...</div>`;
    
    try {
        const res = await fetch('https://api.github.com/search/repositories?q=stars:>20000&sort=stars');
        const data = await res.json();
        const repo = data.items[Math.floor(Math.random() * data.items.length)];
        
        grid.innerHTML = `
            <div class="p-8 bg-[#050b1d] border border-blue-500/20 rounded-[2rem] text-center animate-in zoom-in duration-500">
                <p class="text-blue-500 text-[8px] font-black uppercase tracking-widest mb-4">Remote Source Detected</p>
                <h3 class="text-2xl font-black text-white uppercase italic mb-2">${repo.name}</h3>
                <p class="text-white/40 text-[9px] font-bold uppercase mb-8 leading-relaxed">${repo.description || 'No meta-data found.'}</p>
                <div class="grid grid-cols-2 gap-4">
                    <button onclick="verifyRepoGuess('${repo.language}', 'JavaScript')" class="py-4 border border-white/5 rounded-2xl text-[9px] font-black text-white/40 uppercase hover:border-blue-500 hover:text-white transition-all">JavaScript</button>
                    <button onclick="verifyRepoGuess('${repo.language}', 'TypeScript')" class="py-4 border border-white/5 rounded-2xl text-[9px] font-black text-white/40 uppercase hover:border-blue-500 hover:text-white transition-all">TypeScript</button>
                    <button onclick="verifyRepoGuess('${repo.language}', 'Python')" class="py-4 border border-white/5 rounded-2xl text-[9px] font-black text-white/40 uppercase hover:border-blue-500 hover:text-white transition-all">Python</button>
                    <button onclick="verifyRepoGuess('${repo.language}', 'Other')" class="py-4 border border-white/5 rounded-2xl text-[9px] font-black text-white/40 uppercase hover:border-blue-500 hover:text-white transition-all">Other</button>
                </div>
            </div>
        `;
    } catch (e) { grid.innerHTML = `<p class="text-red-500 font-black">LINK FAILURE: API OFFLINE</p>`; }
}

function verifyRepoGuess(actual, guess) {
    if (actual === guess || (guess === 'Other' && !['JavaScript', 'TypeScript', 'Python'].includes(actual))) {
        recordGameCompletion();
        switchGameMode(KERNEL_CONFIG.MODES.REPO_HUNT);
    } else {
        alert("ANALYSIS INCORRECT: RETRYING...");
    }
}

/**
 * MODULE 3: JUDGE0 CODING SANDBOX
 */
function openCodingSandbox(challenge) {
    const overlay = document.getElementById('gameOverlay');
    overlay.classList.remove('hidden');
    overlay.innerHTML = `
        <div class="bg-[#050b1d] border border-blue-500/30 p-8 rounded-[2.5rem] w-full max-w-2xl">
            <h3 class="text-blue-500 font-black uppercase text-[10px] tracking-widest mb-6">Neural Logic: ${challenge.title}</h3>
            <p class="text-white text-xs font-black uppercase mb-6">${challenge.prompt}</p>
            <textarea id="codeEditor" class="w-full h-40 bg-black border border-white/5 rounded-2xl p-4 text-cyan-400 font-mono text-xs outline-none" placeholder="function solution() { ... }"></textarea>
            <div class="mt-6 flex gap-4">
                <button onclick="submitSandboxCode()" id="runBtn" class="flex-1 py-4 bg-blue-600 text-white font-black uppercase rounded-2xl transition-all">Execute</button>
                <button onclick="document.getElementById('gameOverlay').classList.add('hidden')" class="px-8 py-4 border border-white/10 text-white/40 font-black uppercase rounded-2xl">Abort</button>
            </div>
        </div>
    `;
}

async function submitSandboxCode() {
    const code = document.getElementById('codeEditor').value;
    const btn = document.getElementById('runBtn');
    const challenge = LEXICAL_LEVELS[currentLevel].challenge || { expected: "ACTIVE", test: "console.log('ACTIVE')" };
    
    btn.innerText = "UPLOADING...";
    
    try {
        const response = await fetch(`https://${KERNEL_CONFIG.JUDGE0.HOST}/submissions?wait=true`, {
            method: 'POST',
            headers: { 'x-rapidapi-key': KERNEL_CONFIG.JUDGE0.API_KEY, 'Content-Type': 'application/json' },
            body: JSON.stringify({ source_code: btoa(`${code}\n${challenge.test}`), language_id: 63 })
        });
        const result = await response.json();
        const output = result.stdout ? atob(result.stdout).trim() : "";

        if (output === challenge.expected) {
            btn.innerText = "SUCCESS";
            setTimeout(() => {
                document.getElementById('gameOverlay').classList.add('hidden');
                proceedToNextNode();
            }, 1000);
        } else {
            btn.innerText = "FAILED: RETRY";
            setTimeout(() => btn.innerText = "Execute", 1500);
        }
    } catch (e) { btn.innerText = "UPLINK ERROR"; }
}

/**
 * PERSISTENCE & UTILS
 */
async function syncGamesCountUI() {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
        const { data } = await supabase.from('profiles').select('games_completed').eq('id', user.id).single();
        const display = document.getElementById('gamesCount');
        if (display && data) display.innerText = (data.games_completed || 0).toString().padStart(4, '0');
    }
}

async function recordGameCompletion() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    const { data } = await supabase.from('profiles').select('games_completed').eq('id', user.id).single();
    const newCount = (data?.games_completed || 0) + 1;
    await supabase.from('profiles').update({ games_completed: newCount }).eq('id', user.id);
    syncGamesCountUI();
    showCompletionModal();
}

function showCompletionModal() {
    const overlay = document.getElementById('gameOverlay');
    overlay.classList.remove('hidden');
    overlay.innerHTML = `
        <div class="bg-[#050b1d] border border-blue-500/30 p-10 rounded-[3rem] text-center max-w-sm">
            <h2 class="text-2xl font-black text-white uppercase italic italic">Node Cleared</h2>
            <p class="text-gray-500 text-[10px] font-black uppercase mt-2 mb-8">Neural Credits Uploaded</p>
            <button onclick="document.getElementById('gameOverlay').classList.add('hidden')" class="w-full py-4 bg-blue-600 text-white font-black uppercase rounded-2xl">Proceed</button>
        </div>
    `;
}

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
