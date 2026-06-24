import React from 'react';
import { Shield, Ghost, CheckCircle2, XCircle } from 'lucide-react';

export default function BattleScreen({ gameState, onAnswer, maxHp }) {
  const currentQuestion = gameState.shuffledQuestions[gameState.questionIndex % gameState.shuffledQuestions.length];
  const progress = Math.min(100, Math.floor((gameState.questionIndex / gameState.shuffledQuestions.length) * 100));

  return (
    <main className="w-full flex flex-col items-center animate-in fade-in duration-300">

      {/* Header / HP Bars */}
      <header className="w-full grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center gap-6 md:gap-8 mb-10">

        {/* Player HP */}
        <div className="w-full">
          <div className="flex justify-between font-bold text-sm mb-2">
            <span>Hero</span>
            <span>{gameState.playerHp}/{maxHp}</span>
          </div>
          <div className="bg-surface-low h-3 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500 ease-out"
              style={{ width: `${(gameState.playerHp / maxHp) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Round Badge */}
        <div className="order-first md:order-none justify-self-center bg-on-surface text-white px-6 py-2 rounded-full font-display font-bold shadow-md">
          Round {gameState.questionIndex + 1}
        </div>

        {/* Boss HP */}
        <div className="w-full">
          <div className="flex justify-between font-bold text-sm mb-2">
            <span>Code Wraith</span>
            <span>{gameState.bossHp}/{maxHp}</span>
          </div>
          <div className="bg-surface-low h-3 rounded-full overflow-hidden flex justify-end">
            <div
              className="h-full bg-gradient-to-l from-secondary to-pink-300 transition-all duration-500 ease-out"
              style={{ width: `${(gameState.bossHp / maxHp) * 100}%` }}
            ></div>
          </div>
        </div>
      </header>

      {/* Arena Figures */}
      <section className="w-full grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center gap-8 mb-10">
        <div className={`card text-center py-10 transition-transform ${gameState.lastStrike === 'player-hit' ? 'animate-shake border-danger border-2' : ''}`}>
          <div className="inline-flex items-center justify-center text-primary mb-4 bg-primary/10 p-6 rounded-full">
             <Shield size={64} strokeWidth={1.5} />
          </div>
          <div className="font-display font-bold text-xl">You</div>
        </div>

        <div className="hidden md:block font-display text-4xl font-black text-secondary opacity-30 tracking-widest">
          VS
        </div>

        <div className={`card text-center py-10 transition-transform ${gameState.lastStrike === 'boss-hit' ? 'animate-shake border-success border-2' : ''}`}>
           <div className="inline-flex items-center justify-center text-secondary mb-4 bg-secondary/10 p-6 rounded-full">
             <Ghost size={64} strokeWidth={1.5} />
          </div>
          <div className="font-display font-bold text-xl">Wraith</div>
        </div>
      </section>

      {/* Question Card */}
      <section className="card w-full max-w-3xl mb-8 border border-outline/20 shadow-lg">
        <div className="w-full mb-8">
            <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-bold text-on-surface-variant">Question {gameState.questionIndex + 1} of {gameState.shuffledQuestions.length}</span>
                <span className="text-sm font-bold text-primary">{progress}%</span>
            </div>
            <div className="w-full h-2 bg-surface-low rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500"
                  style={{ width: `${progress}%` }}
                ></div>
            </div>
        </div>

        <span className="eyebrow">Question</span>
        <h2 className="text-2xl md:text-3xl mb-8 leading-tight">{currentQuestion.prompt}</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {currentQuestion.answers.map((answer, index) => (
             <button
              key={index}
              onClick={() => onAnswer(index)}
              className="bg-surface border border-outline/30 p-5 rounded-xl text-left text-lg font-semibold cursor-pointer transition-all hover:border-primary hover:shadow-md hover:translate-x-1 flex items-center gap-4 group"
            >
               <span className="bg-surface-low w-8 h-8 shrink-0 flex items-center justify-center rounded text-sm text-on-surface-variant group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                 {String.fromCharCode(65 + index)}
               </span>
               <span className="flex-1">{answer}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Battle Log */}
      <div className={`w-full max-w-3xl p-4 text-center font-semibold rounded-lg border-l-4 transition-colors duration-300 ${
        gameState.lastStrike === 'boss-hit'
          ? 'bg-green-50 text-green-800 border-green-500'
          : gameState.lastStrike === 'player-hit'
            ? 'bg-red-50 text-red-800 border-red-500'
            : 'bg-surface-low text-on-surface-variant border-primary'
      }`}>
        <div className="flex items-center justify-center gap-2">
           {gameState.lastStrike === 'boss-hit' && <CheckCircle2 size={20} className="text-green-600"/>}
           {gameState.lastStrike === 'player-hit' && <XCircle size={20} className="text-red-600" />}
           {gameState.battleLog}
        </div>
      </div>

    </main>
  );
}
