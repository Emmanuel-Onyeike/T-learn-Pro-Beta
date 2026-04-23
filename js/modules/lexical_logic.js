
/**
 * TECH NXXT: LEXICAL BREACH (V1.0)
 * Tactical Word Decryption Logic Engine
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
 * INITIALIZE ENGINE
 */
function initLexicalGame() {
    console.log(`NXXT_LOGIC: Decrypting Level ${currentLevel + 1}...`);
    const levelData = LEXICAL_LEVELS[currentLevel];
    foundWords = [];
    selectedCells = [];
    renderLevelUI(levelData);
}

/**
 * RENDER ENGINE
 */
function renderLevelUI(data) {
    const gridContainer = document.getElementById('lexicalGrid');
    const wordList = document.getElementById('targetWords');
    if (!gridContainer || !wordList) return;

    // Update Header UI
    const levelDisplay = document.getElementById('currentLevelDisplay');
    if (levelDisplay) levelDisplay.innerText = `L-${data.level < 10 ? '0' + data.level : data.level}`;
    
    // Scale grid size based on difficulty
    const size = data.level > 5 ? 14 : 12; 
    gridContainer.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    gridContainer.innerHTML = '';

    const totalCells = size * size;
    let gridArray = Array(totalCells).fill('').map(() => String.fromCharCode(65 + Math.floor(Math.random() * 26)));

    // Inject Word Data into Grid
    data.words.forEach((word, index) => {
        let row = index; 
        let startCol = Math.floor(Math.random() * (size - word.length));
        let startPos = (row * size) + startCol;
        
        for (let i = 0; i < word.length; i++) {
            gridArray[startPos + i] = word[i].toUpperCase();
        }
    });

    // Generate DOM Elements
    gridArray.forEach((letter, idx) => {
        const cell = document.createElement('div');
        cell.className = 'lex-cell h-8 w-8 md:h-10 md:w-10 flex items-center justify-center border border-white/5 text-[10px] font-black text-white/40 cursor-pointer hover:bg-cyan-500/20 transition-all select-none rounded-lg';
        cell.innerText = letter;
        cell.dataset.index = idx;
        
        // Input Logic: Mouse
        cell.onmousedown = () => startSelection(cell);
        cell.onmouseenter = () => continueSelection(cell);
        
        // Input Logic: Touch
        cell.ontouchstart = (e) => { e.preventDefault(); startSelection(cell); };
        cell.ontouchmove = (e) => {
            e.preventDefault();
            const touch = e.touches[0];
            const target = document.elementFromPoint(touch.clientX, touch.clientY);
            if (target && target.classList.contains('lex-cell')) continueSelection(target);
        };

        gridContainer.appendChild(cell);
    });

    // Global listeners to end selection
    window.onmouseup = endSelection;
    window.ontouchend = endSelection;

    // Render Word List UI
    wordList.innerHTML = data.words.map(w => `
        <span id="word-${w}" class="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-white/20 border border-white/5 px-3 py-1 rounded-full transition-all duration-500">
            ${w}
        </span>
    `).join('');
}

/**
 * SELECTION LOGIC
 */
function startSelection(cell) {
    isSelecting = true;
    selectedCells = [cell];
    cell.classList.add('bg-cyan-600', 'text-white', 'scale-90', 'shadow-[0_0_15px_rgba(8,145,178,0.4)]');
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
        // SUCCESS: Word Found
        foundWords.push(word);
        const wordBadge = document.getElementById(`word-${word}`);
        
        if (wordBadge) {
            wordBadge.classList.replace('text-white/20', 'text-green-400');
            wordBadge.classList.add('border-green-500/50', 'bg-green-500/10', 'shadow-[0_0_15px_rgba(34,197,94,0.3)]');
        }
        
        selectedCells.forEach(c => {
            c.classList.remove('bg-cyan-600', 'scale-90');
            c.classList.add('bg-green-600/40', 'text-green-400', 'border-green-500/30');
            c.onmousedown = null; // Disable further clicks on found letters
            c.onmouseenter = null;
        });
        
        // Check for Level Completion
        if (foundWords.length === currentWords.length) {
            setTimeout(proceedToNextNode, 800);
        }
    } else {
        // FAIL: Incorrect word
        selectedCells.forEach(c => {
            if (!c.classList.contains('text-green-400')) {
                c.classList.remove('bg-cyan-600', 'text-white', 'scale-90', 'shadow-[0_0_15px_rgba(8,145,178,0.4)]');
            }
        });
    }
    selectedCells = [];
}

/**
 * PROGRESSION ENGINE
 */
function proceedToNextNode() {
    currentLevel++;
    if (currentLevel < LEXICAL_LEVELS.length) {
        // Trigger visual feedback (could add a modal here later)
        console.log("NXXT_SYSTEM: Node Decrypted. Leveling up...");
        initLexicalGame();
    } else {
        alert("CRITICAL ACHIEVEMENT: All Neural Layers Decrypted. Master Developer Status Confirmed.");
        currentLevel = 0; 
        initLexicalGame();
    }
}
