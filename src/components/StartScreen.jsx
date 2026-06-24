import React from 'react';
import { Ghost, Shield, Code } from 'lucide-react';

export default function StartScreen({ onStart }) {
  return (
    <main className="flex-1 flex flex-col items-center justify-center text-center gap-10 w-full animate-in fade-in duration-500">
      <div className="w-40 h-40 bg-gradient-to-br from-secondary to-primary rounded-full flex items-center justify-center shadow-[0_10px_30px_rgba(185,7,96,0.3)] animate-bounce-slow text-white">
        <Ghost size={80} strokeWidth={1.5} />
      </div>

      <div>
        <p className="eyebrow">The Ultimate Challenge</p>
        <h1 className="text-4xl md:text-6xl text-primary mb-4 tracking-tight">QuizVibe Battle</h1>
        <p className="max-w-2xl mx-auto text-on-surface-variant text-lg">
          Defeat the Code Wraith by answering questions correctly. Each correct answer deals damage, but mistakes will cost you HP!
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center mt-4">
        <button onClick={onStart} className="btn btn-primary gap-2">
          <Shield size={20} /> Enter the Arena
        </button>
        <a href="https://github.com/s5condlast-cmd/Battle-of-wits" target="_blank" rel="noreferrer" className="btn btn-ghost gap-2">
          <Code size={20} /> GitHub
        </a>
      </div>
    </main>
  );
}
