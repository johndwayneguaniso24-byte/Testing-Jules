// Game Constants
const MAX_HP = 100;
const HIT_DAMAGE = 20;
const MISS_DAMAGE = 18;

// Rank definitions based on performance
const RANKS = [
    { minScore: 8, label: 'Grandmaster Tactician', icon: '🏆' },
    { minScore: 5, label: 'Arcane Challenger', icon: '⚔️' },
    { minScore: 3, label: 'Apprentice Fighter', icon: '🛡️' },
    { minScore: 0, label: 'Unranked Wanderer', icon: '🚶' },
];

// Battle messages for varied feedback
const MESSAGES = {
    critical: [
        'Critical hit! Your answer cuts through the boss shield.',
        'Bullseye! The Code Wraith wavers.',
        'Brilliant! A devastating blow to the enemy.',
        'A perfect strike! The boss is losing ground.'
    ],
    miss: [
        'Wrong move. The boss strikes back!',
        'Mistake! The Code Wraith exploits your error.',
        'Your defense crumbled! The boss lands a hit.',
        'The Wraith scoffs at your error and counters!'
    ]
};

// Game State Management
const Game = {
    state: {
        screen: 'start',
        questionIndex: 0,
        playerHp: MAX_HP,
        bossHp: MAX_HP,
        battleLog: 'The Code Wraith waits for your first move.',
        lastStrike: 'idle',
        score: 0,
        shuffledQuestions: []
    },

    // Initialize Game
    init() {
        this.cacheDOM();
        this.bindEvents();
    },

    cacheDOM() {
        this.dom = {
            screens: {
                start: document.getElementById('start-screen'),
                battle: document.getElementById('battle-screen'),
                result: document.getElementById('result-screen')
            },
            hp: {
                playerText: document.getElementById('player-hp-text'),
                playerFill: document.getElementById('player-hp-fill'),
                bossText: document.getElementById('boss-hp-text'),
                bossFill: document.getElementById('boss-hp-fill')
            },
            progress: {
                bar: document.getElementById('progress-bar'),
                text: document.getElementById('progress-text'),
                percent: document.getElementById('progress-percent')
            },
            battle: {
                roundBadge: document.getElementById('round-badge'),
                heroFighter: document.getElementById('hero-fighter'),
                bossFighter: document.getElementById('boss-fighter'),
                questionPrompt: document.getElementById('question-prompt'),
                answerGrid: document.getElementById('answer-grid'),
                log: document.getElementById('battle-log')
            },
            result: {
                eyebrow: document.getElementById('result-eyebrow'),
                title: document.getElementById('result-title'),
                log: document.getElementById('result-log'),
                score: document.getElementById('result-score'),
                rank: document.getElementById('result-rank')
            },
            buttons: {
                start: document.getElementById('start-button'),
                restart: document.getElementById('restart-button')
            }
        };
    },

    bindEvents() {
        this.dom.buttons.start.addEventListener('click', () => this.start());
        this.dom.buttons.restart.addEventListener('click', () => this.start());
    },

    start() {
        this.state = {
            screen: 'battle',
            questionIndex: 0,
            playerHp: MAX_HP,
            bossHp: MAX_HP,
            battleLog: 'Battle started. Choose wisely.',
            lastStrike: 'idle',
            score: 0,
            shuffledQuestions: [...questions].sort(() => Math.random() - 0.5)
        };
        this.updateUI();
    },

    updateUI() {
        const { state, dom } = this;

        // Screen visibility
        Object.keys(dom.screens).forEach(key => {
            dom.screens[key].classList.toggle('hidden', state.screen !== key && !(state.screen === 'win' || state.screen === 'lose' ? key === 'result' : false));
        });
        
        // Special case for results
        if (state.screen === 'win' || state.screen === 'lose') {
            dom.screens.battle.classList.add('hidden');
            dom.screens.result.classList.remove('hidden');
            this.renderResult();
            return;
        }

        if (state.screen === 'battle') {
            this.renderBattle();
        }
    },

    renderBattle() {
        const { state, dom } = this;
        const currentQuestion = state.shuffledQuestions[state.questionIndex % state.shuffledQuestions.length];

        // HP Updates
        dom.hp.playerText.textContent = `${state.playerHp}/${MAX_HP}`;
        dom.hp.playerFill.style.width = `${state.playerHp}%`;
        dom.hp.bossText.textContent = `${state.bossHp}/${MAX_HP}`;
        dom.hp.bossFill.style.width = `${state.bossHp}%`;

        // Progress & Round
        const progress = Math.min(100, Math.floor((state.questionIndex / state.shuffledQuestions.length) * 100));
        dom.progress.bar.style.width = `${progress}%`;
        dom.progress.text.textContent = `Question ${state.questionIndex + 1} of ${state.shuffledQuestions.length}`;
        dom.progress.percent.textContent = `${progress}%`;
        dom.battle.roundBadge.textContent = `Round ${state.questionIndex + 1}`;

        // Question & Answers
        dom.battle.questionPrompt.textContent = currentQuestion.prompt;
        dom.battle.answerGrid.innerHTML = '';
        currentQuestion.answers.forEach((answer, index) => {
            const button = document.createElement('button');
            button.className = 'answer-btn';
            button.innerHTML = `<span class="key">${String.fromCharCode(65 + index)}</span> <span>${answer}</span>`;
            button.addEventListener('click', () => this.handleAnswer(index));
            dom.battle.answerGrid.appendChild(button);
        });

        // Feedback
        dom.battle.log.textContent = state.battleLog;
        dom.battle.log.className = `battle-log ${state.lastStrike === 'boss-hit' ? 'log-boss-hit' : state.lastStrike === 'player-hit' ? 'log-player-hit' : ''}`;
        
        dom.battle.heroFighter.classList.toggle('is-hit', state.lastStrike === 'player-hit');
        dom.battle.bossFighter.classList.toggle('is-hit', state.lastStrike === 'boss-hit');
    },

    handleAnswer(index) {
        const currentQuestion = this.state.shuffledQuestions[this.state.questionIndex % this.state.shuffledQuestions.length];
        const isCorrect = index === currentQuestion.correctIndex;

        if (isCorrect) {
            this.state.bossHp = Math.max(0, this.state.bossHp - HIT_DAMAGE);
            this.state.score++;
            this.state.lastStrike = 'boss-hit';
            this.state.battleLog = MESSAGES.critical[Math.floor(Math.random() * MESSAGES.critical.length)];
            
            if (this.state.bossHp === 0) {
                this.state.screen = 'win';
                this.state.battleLog = 'Victory! The Code Wraith has been defeated.';
                this.updateUI();
                return;
            }
        } else {
            this.state.playerHp = Math.max(0, this.state.playerHp - MISS_DAMAGE);
            this.state.lastStrike = 'player-hit';
            const msg = MESSAGES.miss[Math.floor(Math.random() * MESSAGES.miss.length)];
            this.state.battleLog = `${msg} Correct: ${currentQuestion.answers[currentQuestion.correctIndex]}`;

            if (this.state.playerHp === 0) {
                this.state.screen = 'lose';
                this.state.battleLog = 'Defeat. The boss overwhelmed your defenses.';
                this.updateUI();
                return;
            }
        }

        this.state.questionIndex++;
        this.updateUI();

        // Clear animation state
        setTimeout(() => {
            if (this.state.screen === 'battle') {
                this.state.lastStrike = 'idle';
                this.renderBattle();
            }
        }, 500);
    },

    renderResult() {
        const { state, dom } = this;
        const won = state.screen === 'win';
        const rank = RANKS.find(r => state.score >= r.minScore) || RANKS[RANKS.length - 1];

        dom.result.eyebrow.textContent = won ? 'Quest Complete' : 'Quest Failed';
        dom.result.title.textContent = won ? 'Boss Defeated!' : 'You Were Defeated';
        dom.result.log.textContent = state.battleLog;
        dom.result.score.textContent = state.score;
        dom.result.rank.textContent = rank.label;
    }
};

Game.init();
