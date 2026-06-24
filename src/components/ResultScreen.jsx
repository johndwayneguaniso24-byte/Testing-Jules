import React from 'react';
import { Trophy, RotateCcw } from 'lucide-react';

export default function ResultScreen({ won, gameState, ranks, onRestart }) {
  const rank = ranks.find(r => gameState.score >= r.minScore) || ranks[ranks.length - 1];

  return (
    <main className="flex-1 flex items-center justify-center w-full animate-in zoom-in-95 duration-500">
      <div className="card max-w-xl text-center w-full border border-outline/20 shadow-xl">

        <div className="flex justify-center mb-6">
           <div className={`p-6 rounded-full ${won ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
              <Trophy size={64} strokeWidth={1.5} />
           </div>
        </div>

        <p className="eyebrow">{won ? 'Quest Complete' : 'Quest Failed'}</p>
        <h1 className={`text-4xl md:text-5xl mb-4 ${won ? 'text-primary' : 'text-on-surface'}`}>
          {won ? 'Boss Defeated!' : 'You Were Defeated'}
        </h1>
        <p className="text-on-surface-variant text-lg mb-10">
          {gameState.battleLog}
        </p>

        <div className="grid grid-cols-2 gap-4 md:gap-6 mb-10">
            <div className="bg-surface-low p-6 rounded-2xl border border-outline/10">
                <div className="eyebrow">Hits Landed</div>
                <h2 className="text-4xl text-primary">{gameState.score}</h2>
            </div>
            <div className="bg-surface-low p-6 rounded-2xl border border-outline/10">
                <div className="eyebrow">Rank Achieved</div>
                <div className="flex flex-col items-center gap-2">
                   <span className="text-2xl">{rank.icon}</span>
                   <h2 className="text-lg md:text-xl font-bold leading-tight">{rank.label}</h2>
                </div>
            </div>
        </div>

        <button onClick={onRestart} className="btn btn-primary w-full gap-2 text-lg py-4">
          <RotateCcw size={20} /> Battle Again
        </button>
      </div>
    </main>
  );
}
