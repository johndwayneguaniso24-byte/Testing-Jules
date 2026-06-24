import { useState, useCallback } from 'react';
import StartScreen from './components/StartScreen';
import BattleScreen from './components/BattleScreen';
import ResultScreen from './components/ResultScreen';
import questions from './data/questions';

const MAX_HP = 100;
const HIT_DAMAGE = 20;
const MISS_DAMAGE = 18;

const RANKS = [
    { minScore: 8, label: 'Grandmaster Tactician', icon: '🏆' },
    { minScore: 5, label: 'Arcane Challenger', icon: '⚔️' },
    { minScore: 3, label: 'Apprentice Fighter', icon: '🛡️' },
    { minScore: 0, label: 'Unranked Wanderer', icon: '🚶' },
];

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

function App() {
  const [screen, setScreen] = useState('start'); // 'start', 'battle', 'win', 'lose'
  const [gameState, setGameState] = useState({
    questionIndex: 0,
    playerHp: MAX_HP,
    bossHp: MAX_HP,
    battleLog: 'The Code Wraith waits for your first move.',
    lastStrike: 'idle',
    score: 0,
    shuffledQuestions: []
  });

  const startGame = useCallback(() => {
    setScreen('battle');
    setGameState({
      questionIndex: 0,
      playerHp: MAX_HP,
      bossHp: MAX_HP,
      battleLog: 'Battle started. Choose wisely.',
      lastStrike: 'idle',
      score: 0,
      shuffledQuestions: [...questions].sort(() => Math.random() - 0.5)
    });
  }, []);

  const handleAnswer = useCallback((index) => {
    setGameState(prev => {
      const currentQuestion = prev.shuffledQuestions[prev.questionIndex % prev.shuffledQuestions.length];
      const isCorrect = index === currentQuestion.correctIndex;

      let nextPlayerHp = prev.playerHp;
      let nextBossHp = prev.bossHp;
      let nextScore = prev.score;
      let nextLastStrike = 'idle';
      let nextLog = '';
      let nextScreen = screen;

      if (isCorrect) {
        nextBossHp = Math.max(0, prev.bossHp - HIT_DAMAGE);
        nextScore++;
        nextLastStrike = 'boss-hit';
        nextLog = MESSAGES.critical[Math.floor(Math.random() * MESSAGES.critical.length)];

        if (nextBossHp === 0) {
          nextScreen = 'win';
          nextLog = 'Victory! The Code Wraith has been defeated.';
        }
      } else {
        nextPlayerHp = Math.max(0, prev.playerHp - MISS_DAMAGE);
        nextLastStrike = 'player-hit';
        const msg = MESSAGES.miss[Math.floor(Math.random() * MESSAGES.miss.length)];
        nextLog = `${msg} Correct: ${currentQuestion.answers[currentQuestion.correctIndex]}`;

        if (nextPlayerHp === 0) {
          nextScreen = 'lose';
          nextLog = 'Defeat. The boss overwhelmed your defenses.';
        }
      }

      if (nextScreen !== screen) {
        setScreen(nextScreen);
      }

      return {
        ...prev,
        bossHp: nextBossHp,
        playerHp: nextPlayerHp,
        score: nextScore,
        lastStrike: nextLastStrike,
        battleLog: nextLog,
        questionIndex: prev.questionIndex + 1
      };
    });

    // Clear animation state after 500ms
    setTimeout(() => {
      setGameState(prev => ({ ...prev, lastStrike: 'idle' }));
    }, 500);
  }, [screen]);

  return (
    <div className="min-h-screen flex flex-col items-center max-w-6xl mx-auto px-6 py-10 w-full">
      {screen === 'start' && <StartScreen onStart={startGame} />}
      {screen === 'battle' && gameState.shuffledQuestions.length > 0 && (
        <BattleScreen
          gameState={gameState}
          onAnswer={handleAnswer}
          maxHp={MAX_HP}
        />
      )}
      {(screen === 'win' || screen === 'lose') && (
        <ResultScreen
          won={screen === 'win'}
          gameState={gameState}
          ranks={RANKS}
          onRestart={startGame}
        />
      )}
    </div>
  );
}

export default App;
