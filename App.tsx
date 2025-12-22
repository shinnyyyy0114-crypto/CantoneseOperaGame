import React, { useState } from 'react';
import { CostumeGame } from './components/CostumeGame';
import { LyricsGame } from './components/LyricsGame';
import { PersonalityTest } from './components/PersonalityTest';

type AppMode = 'MENU' | 'COSTUME' | 'LYRICS' | 'PERSONALITY';

const App: React.FC = () => {
  const [appMode, setAppMode] = useState<AppMode>('MENU');

  // Main Menu Screen
  if (appMode === 'MENU') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden bg-stone-100 animate-fade-in">
        <div className="absolute inset-0 opera-pattern pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-50/30 to-red-100 pointer-events-none"></div>

        <div className="relative z-10 w-full max-w-5xl text-center">
             <h1 className="text-6xl md:text-8xl font-bold text-red-900 font-serif mb-2 tracking-tight">
               Cantonese Opera
            </h1>
            <p className="text-xl text-stone-600 mb-12 font-serif italic tracking-wide">
               Interactive Cultural Experience
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {/* Option 1: Costume Mystery */}
                <button 
                    onClick={() => setAppMode('COSTUME')}
                    className="group bg-white p-8 rounded-3xl shadow-xl border-2 border-transparent hover:border-red-400 transition-all hover:-translate-y-2"
                >
                    <div className="h-16 w-16 bg-red-100 text-red-800 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">
                        👕
                    </div>
                    <h2 className="text-2xl font-bold text-stone-800 mb-3 group-hover:text-red-800 transition-colors">Costume Mystery</h2>
                    <p className="text-stone-500 leading-relaxed text-sm">
                        Drag and drop traditional costumes to match the opera archetypes. Test your visual knowledge!
                    </p>
                </button>

                {/* Option 2: Lyrics & Rhythm */}
                <button 
                    onClick={() => setAppMode('LYRICS')}
                    className="group bg-white p-8 rounded-3xl shadow-xl border-2 border-transparent hover:border-amber-400 transition-all hover:-translate-y-2"
                >
                     <div className="h-16 w-16 bg-amber-100 text-amber-800 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">
                        🎵
                    </div>
                    <h2 className="text-2xl font-bold text-stone-800 mb-3 group-hover:text-amber-800 transition-colors">Lyrics & Play</h2>
                    <p className="text-stone-500 leading-relaxed text-sm">
                        Match famous lyrics and quotes to their specific characters and plays from the classics.
                    </p>
                </button>

                {/* Option 3: Personality Quiz */}
                <button 
                    onClick={() => setAppMode('PERSONALITY')}
                    className="group bg-white p-8 rounded-3xl shadow-xl border-2 border-transparent hover:border-rose-400 transition-all hover:-translate-y-2"
                >
                     <div className="h-16 w-16 bg-rose-100 text-rose-800 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">
                        🎭
                    </div>
                    <h2 className="text-2xl font-bold text-stone-800 mb-3 group-hover:text-rose-800 transition-colors">Character Quiz</h2>
                    <p className="text-stone-500 leading-relaxed text-sm">
                        Discover which Cantonese opera archetype matches your personality and life choices.
                    </p>
                </button>
            </div>
        </div>
      </div>
    );
  }

  // Wrapper for games to maintain background style
  return (
    <div className="min-h-screen flex flex-col relative bg-stone-100 overflow-hidden">
      <div className="absolute inset-0 opera-pattern pointer-events-none"></div>
      
      {appMode === 'COSTUME' && <CostumeGame onBack={() => setAppMode('MENU')} />}
      {appMode === 'LYRICS' && <LyricsGame onBack={() => setAppMode('MENU')} />}
      {appMode === 'PERSONALITY' && <PersonalityTest onBack={() => setAppMode('MENU')} />}
    </div>
  );
};

export default App;