/**
 * ARCADE HUB V2.0
 * Logic: Word Search + Syntax Quiz + Velocity Typing
 * Persistence: Supabase Cloud (+10/-10 Credit System)
 */

const ARCADE_MODES = { PUZZLE: 'puzzle', QUIZ: 'quiz', TYPING: 'typing' };
let activeMode = ARCADE_MODES.PUZZLE;
let currentLevel = 0;
let foundWords = [];
let isSelecting = false;
let selectedCells = [];
let timer = null;
let timeLeft = 30;

// --- DATASETS ---

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

const QUIZ_DATA = [
    { q: "Which hook handles side effects in React?", a: "useEffect", o: ["useState", "useEffect", "useMemo", "useRef"] },
    { q: "Which CSS property is used for glassmorphism?", a: "backdrop-filter", o: ["filter", "opacity", "backdrop-filter", "blur"] },
    { q: "What is the default port for a Vite development server?", a: "5173", o: ["3000", "8080", "5173", "5000"] },
    { q: "Which SQL command is used to add a new column?", a: "ALTER TABLE", o: ["ADD COLUMN", "UPDATE TABLE", "ALTER TABLE", "INSERT INTO"] },
    { q: "In JavaScript, 'null' is what type of data?", a: "object", o: ["null", "undefined", "object", "string"] },
    { q: "Which Supabase feature handles real-time data?", a: "Realtime", o: ["Edge Functions", "Storage", "Auth", "Realtime"] },
    { q: "What does the 'A' in AJAX stand for?", a: "Asynchronous", o: ["Array", "Active", "Asynchronous", "Angular"] },
    { q: "Which Git command combines two branches?", a: "merge", o: ["combine", "merge", "push", "pull"] },
    { q: "Which HTTP method is typically used for updates?", a: "PATCH", o: ["GET", "POST", "PATCH", "DELETE"] },
    { q: "What is the time complexity of a binary search?", a: "O(log n)", o: ["O(n)", "O(1)", "O(n^2)", "O(log n)"] }
];

const TYPING_DATA = [
    { words: ["FUNCTION", "VARIABLE", "CONSTANT", "DATABASE", "FRONTEND", "BACKEND", "TERMINAL", "REACT", "NODE", "SUPABASE"] },
    { words: ["ASYNC", "AWAIT", "PROMISE", "FETCH", "HEADER", "PAYLOAD", "GRID", "FLEXBOX", "TAILWIND", "VITE"] },
    { words: ["COMPONENT", "PROPS", "STATE", "REDUCER", "CONTEXT", "ROUTER", "MAPPING", "FILTER", "REDUX", "ZUSTAND"] },
    { words: ["INTERFACE", "TYPE", "STRING", "NUMBER", "BOOLEAN", "ARRAY", "OBJECT", "TUPLE", "ENUM", "GENERIC"] },
    { words: ["ENCRYPTION", "DECRYPT", "HASHING", "TOKEN", "SESSION", "COOKIE", "AUTH", "OAUTH", "JWT", "BCRYPT"] },
    { words: ["CONTAINER", "DOCKER", "IMAGE", "VOLUME", "NETWORK", "COMPOSE", "KUBERNETES", "POD", "CLUSTER", "YAML"] },
    { words: ["QUERY", "MUTATION", "SCHEMA", "RESOLVER", "GRAPHQL", "ENDPOINT", "REQUEST", "RESPONSE", "STATUS", "METHOD"] },
    { words: ["ALGORITHM", "RECURSION", "ITERATION", "POINTER", "STACK", "QUEUE", "BINARY", "HEX", "OCTAL", "BIT"] },
    { words: ["REFACTOR", "DEBUG", "DEPLOY", "STAGING", "PRODUCTION", "CI/CD", "PIPELINE", "TESTING", "JEST", "CYPRESS"] },
    { words: ["ARCHITECTURE", "MICROSERVICE", "MONOLITH", "SERVERLESS", "LAMBDA", "DYNAMO", "HYDRATION", "VIRTUAL", "DOM", "KERNEL"] }
];

/**
 * MODE ROUTING & UI HIGHLIGHTING
 */
function switchGameMode(mode) {
    activeMode = mode;
    currentLevel = 0;
    clearInterval(timer);
    timer = null;
    
    // UI: Handle Active Button State (Follow where clicked)
    document.querySelectorAll('.mode-btn').forEach(btn => {
        if (btn.getAttribute('data-mode') === mode) {
            btn.className = "mode-btn px-4 py-2 bg-blue-600 rounded-xl text-[8px] font-black text-white uppercase tracking-widest transition-all shadow-lg shadow-blue-600/20";
        } else {
            btn.className = "mode-btn px-4 py-2 hover:bg-white/5 rounded-xl text-[8px] font-black text-white/40 uppercase tracking-widest transition-all hover:text-white";
        }
    });

    const viewport = document.getElementById('lexicalGrid');
    const wordList = document.getElementById('targetWords');
    const sysMsg = document.getElementById('systemMessage');
    
    viewport.innerHTML = '';
    wordList.innerHTML = '';
    
    if (mode === ARCADE_MODES.PUZZLE) {
        showSystemMessage("FIND THE HIDDEN WORDS TO PROCEED", "text-white/40");
        initLexicalGame();
    } else if (mode === ARCADE_MODES.QUIZ) {
        showSystemMessage("CHOOSE THE CORRECT SYNTAX", "text-white/40");
        initQuizGame();
    } else if (mode === ARCADE_MODES.TYPING) {
        showSystemMessage("TYPE THE WORDS AS FAST AS POSSIBLE", "text-white/40");
        initTypingGame();
    }
}

/**
 * PERSISTENCE: SUPABASE ENGINE (Fixed Error Handling)
 */
async function updateCredits(amount) {
    try {
        if (typeof supabase === 'undefined') return;

        const { data: authData } = await supabase.auth.getUser();
        const user = authData?.user;
        if (!user) return;

        const { data: profile } = await supabase.from('profiles').select('neural_credits').eq('id', user.id).single();
        const currentCredits = profile?.neural_credits || 0;
        const newTotal = Math.max(0, currentCredits + amount);
        
        await supabase.from('profiles').update({ neural_credits: newTotal }).eq('id', user.id);
        
        const display = document.getElementById('gamesCount');
        if (display) display.innerText = newTotal.toString().padStart(4, '0');
        
        showSystemMessage(amount < 0 ? `PENALTY: ${amount}` : `REWARD: +${amount}`, amount < 0 ? 'text-red-500' : 'text-green-500');
    } catch (error) {
        console.error("Credit sync error:", error);
    }
}

function showSystemMessage(msg, colorClass) {
    const sys = document.getElementById('systemMessage');
    if (sys) {
        sys.innerText = msg;
        sys.className = `text-[9px] font-bold uppercase tracking-[0.2em] ${colorClass}`;
    }
}

/**
 * WORD SEARCH MODULE
 */
function initLexicalGame() {
    const levelData = LEXICAL_LEVELS[currentLevel];
    foundWords = [];
    selectedCells = [];
    renderPuzzleUI(levelData);
}

function renderPuzzleUI(data) {
    const gridContainer = document.getElementById('lexicalGrid');
    const wordList = document.getElementById('targetWords');
    const levelDisplay = document.getElementById('currentLevelDisplay');
    
    if (levelDisplay) levelDisplay.innerText = `LEVEL ${(data.level).toString().padStart(2, '0')}`;
    
    const size = data.level > 5 ? 14 : 12; 
    gridContainer.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    
    let gridArray = Array(size * size).fill('').map(() => String.fromCharCode(65 + Math.floor(Math.random() * 26)));

    data.words.forEach((word, index) => {
        let row = index; 
        let startCol = Math.floor(Math.random() * (size - word.length));
        let startPos = (row * size) + startCol;
        for (let i = 0; i < word.length; i++) { gridArray[startPos + i] = word[i].toUpperCase(); }
    });

    gridArray.forEach((letter) => {
        const cell = document.createElement('div');
        cell.className = 'lex-cell h-8 w-8 md:h-10 md:w-10 flex items-center justify-center border border-white/5 text-[10px] font-black text-white/40 cursor-pointer hover:bg-blue-500/20 rounded-lg transition-all';
        cell.innerText = letter;
        cell.onmousedown = () => { isSelecting = true; selectedCells = [cell]; cell.classList.add('bg-blue-600', 'text-white'); };
        cell.onmouseenter = () => { if (isSelecting && !selectedCells.includes(cell)) { selectedCells.push(cell); cell.classList.add('bg-blue-600', 'text-white'); } };
        gridContainer.appendChild(cell);
    });

    wordList.innerHTML = data.words.map(w => `<span id="word-${w}" class="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-white/20 border border-white/5 px-3 py-1 rounded-full">${w}</span>`).join('');
    window.onmouseup = endSelection;
}

function endSelection() {
    if (!isSelecting) return;
    isSelecting = false;
    const word = selectedCells.map(c => c.innerText).join('');
    const currentWords = LEXICAL_LEVELS[currentLevel].words;

    if (currentWords.includes(word) && !foundWords.includes(word)) {
        foundWords.push(word);
        document.getElementById(`word-${word}`).className = 'text-[8px] md:text-[10px] font-black text-green-400 border border-green-500/50 bg-green-500/10 px-3 py-1 rounded-full';
        selectedCells.forEach(c => { c.classList.remove('bg-blue-600'); c.classList.add('bg-green-600/40', 'text-green-400'); });
        if (foundWords.length === currentWords.length) {
            updateCredits(10);
            currentLevel++;
            currentLevel < 10 ? initLexicalGame() : switchGameMode(ARCADE_MODES.QUIZ);
        }
    } else {
        selectedCells.forEach(c => { if (!c.classList.contains('text-green-400')) c.classList.remove('bg-blue-600', 'text-white'); });
        updateCredits(-10);
    }
    selectedCells = [];
}

/**
 * QUIZ MODULE
 */
function initQuizGame() {
    const levelData = QUIZ_DATA[currentLevel];
    const viewport = document.getElementById('lexicalGrid');
    const wordList = document.getElementById('targetWords');
    
    viewport.style.gridTemplateColumns = "1fr";
    wordList.innerHTML = `<span class="text-blue-500 font-black italic">PROGRESS: ${currentLevel + 1} / 10</span>`;

    viewport.innerHTML = `
        <div class="p-8 space-y-6 animate-in fade-in duration-500">
            <h3 class="text-white font-black text-center text-lg uppercase italic tracking-tighter">${levelData.q}</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                ${levelData.o.map(opt => `
                    <button onclick="checkQuizAnswer('${opt}', '${levelData.a}')" class="py-4 border border-white/5 rounded-2xl text-[10px] font-black text-white/40 uppercase hover:border-blue-500 hover:text-white transition-all bg-white/[0.02]">
                        ${opt}
                    </button>
                `).join('')}
            </div>
        </div>
    `;
}

function checkQuizAnswer(choice, answer) {
    if (choice === answer) {
        updateCredits(10);
        currentLevel++;
        currentLevel < 10 ? initQuizGame() : switchGameMode(ARCADE_MODES.TYPING);
    } else {
        updateCredits(-10);
        initQuizGame();
    }
}

/**
 * VELOCITY MODULE (TYPING)
 */
function initTypingGame() {
    clearInterval(timer);
    timer = null;
    timeLeft = 30; 
    const levelData = TYPING_DATA[currentLevel];
    const viewport = document.getElementById('lexicalGrid');
    const wordList = document.getElementById('targetWords');
    
    viewport.style.gridTemplateColumns = "1fr";
    wordList.innerHTML = `<span class="text-red-500 font-black italic animate-pulse">TIME LEFT: <span id="timerDisplay">30</span>s</span>`;

    viewport.innerHTML = `
        <div class="p-8 space-y-6 text-center animate-in zoom-in duration-500">
            <div id="typeInstructions">
                <p class="text-[10px] font-black text-blue-400 uppercase tracking-[0.3em]">Goal: Type 10 words</p>
                <p class="text-[8px] text-white/30 uppercase mt-1 italic">Clock starts when you type</p>
            </div>
            <div id="wordToType" class="text-4xl font-black text-white italic tracking-tighter uppercase mb-2">READY?</div>
            <input type="text" id="typingInput" autocomplete="off" autofocus class="w-full bg-white/5 border border-white/10 rounded-2xl py-5 text-center text-cyan-400 font-mono text-xl outline-none focus:border-blue-500 transition-all" placeholder="START TYPING...">
            <div id="typingProgress" class="text-[8px] text-white/20 font-black tracking-widest uppercase">LEVEL ${currentLevel+1} // 0 / 10 COMPLETED</div>
        </div>
    `;

    const input = document.getElementById('typingInput');
    let wordIndex = 0;
    document.getElementById('wordToType').innerText = levelData.words[0];
    
    const startTimer = () => {
        if (timer) return;
        document.getElementById('typeInstructions').classList.add('opacity-0');
        timer = setInterval(() => {
            timeLeft--;
            const display = document.getElementById('timerDisplay');
            if(display) {
                display.innerText = timeLeft;
                if(timeLeft <= 10) display.parentElement.className = "text-red-600 font-black animate-bounce";
            }
            if (timeLeft <= 0) {
                clearInterval(timer);
                handleTypingFailure();
            }
        }, 1000);
    };

    input.oninput = () => {
        startTimer();
        if (input.value.toUpperCase() === levelData.words[wordIndex].toUpperCase()) {
            input.value = '';
            wordIndex++;
            document.getElementById('typingProgress').innerText = `LEVEL ${currentLevel+1} // ${wordIndex} / 10 COMPLETED`;
            
            if (wordIndex >= 10) {
                clearInterval(timer);
                handleTypingSuccess();
            } else {
                document.getElementById('wordToType').innerText = levelData.words[wordIndex];
                document.getElementById('wordToType').classList.add('text-green-400');
                setTimeout(() => document.getElementById('wordToType').classList.remove('text-green-400'), 100);
            }
        }
    };
}

async function handleTypingSuccess() {
    await updateCredits(10);
    currentLevel++;
    if (currentLevel < 10) {
        initTypingGame();
    } else {
        showCompletionModal("ARCADE HUB COMPLETED");
    }
}

async function handleTypingFailure() {
    await updateCredits(-10);
    const input = document.getElementById('typingInput');
    if(input) {
        input.classList.add('border-red-500', 'bg-red-500/10');
        input.disabled = true;
    }
    setTimeout(() => initTypingGame(), 1000);
}

function showCompletionModal(msg) {
    const overlay = document.getElementById('gameOverlay');
    overlay.classList.remove('hidden');
    overlay.innerHTML = `
        <div class="bg-[#050b1d] border border-blue-500/30 p-10 rounded-[3rem] text-center max-w-sm shadow-[0_0_100px_rgba(37,99,235,0.2)]">
            <h2 class="text-2xl font-black text-white uppercase italic tracking-tighter">${msg}</h2>
            <p class="text-gray-500 text-[10px] font-black uppercase mt-2 mb-8">All Challenges Cleared</p>
            <button onclick="location.reload()" class="w-full py-4 bg-blue-600 text-white font-black uppercase tracking-widest rounded-2xl hover:bg-blue-500 transition-colors">Restart Hub</button>
        </div>
    `;
}

// Initial Sync & Launch
(async () => {
    try {
        if (typeof supabase !== 'undefined') {
            const { data: authData } = await supabase.auth.getUser();
            const user = authData?.user;
            if (user) {
                const { data } = await supabase.from('profiles').select('neural_credits').eq('id', user.id).single();
                const display = document.getElementById('gamesCount');
                if (display) display.innerText = (data?.neural_credits || 0).toString().padStart(4, '0');
            }
        }
    } catch (e) {
        console.warn("Initial sync failed:", e);
    }
    initLexicalGame();
})();
