import React, { useState, useEffect, useRef } from 'react';
import { GameState, GameLevel } from './types';
import { LEVELS } from './constants';
import { getMatchFeedback } from './services/geminiService';
import { TargetSilhouette } from './components/TargetSilhouette';
import { DraggableCostume } from './components/DraggableCostume';
import { InfoModal } from './components/InfoModal';

const GAME_DURATION = 60; // seconds

const App: React.FC = () => {
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const [gameState, setGameState] = useState<GameState>(GameState.START);
  const [draggedItemId, setDraggedItemId] = useState<string | null>(null);
  const [isOverTarget, setIsOverTarget] = useState(false);
  const [aiInsight, setAiInsight] = useState<string>('');
  const [isLastMatchCorrect, setIsLastMatchCorrect] = useState(false);
  
  // Game Stats
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [score, setScore] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const currentLevel: GameLevel = LEVELS[currentLevelIndex];

  // Timer Logic
  useEffect(() => {
    if (gameState === GameState.PLAYING) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            if (timerRef.current) clearInterval(timerRef.current);
            setGameState(GameState.GAME_OVER);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [gameState]);

  const startGame = () => {
    setScore(0);
    setTimeLeft(GAME_DURATION);
    setCurrentLevelIndex(0);
    setGameState(GameState.PLAYING);
  };

  // Drag Handlers
  const handleDragStart = (id: string) => {
    setDraggedItemId(id);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (!isOverTarget) setIsOverTarget(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsOverTarget(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsOverTarget(false);

    if (!draggedItemId || gameState !== GameState.PLAYING) return;

    const droppedCostume = currentLevel.options.find(c => c.id === draggedItemId);
    if (!droppedCostume) return;
    
    // Pause Game for Feedback
    setGameState(GameState.LOADING_AI);
    
    const isCorrect = droppedCostume.roleId === currentLevel.targetRole.id;
    setIsLastMatchCorrect(isCorrect);

    if (isCorrect) {
        setScore(prev => prev + 1);
    }

    // Fetch Insight for both Success and Failure
    const insight = await getMatchFeedback(currentLevel.targetRole, droppedCostume, isCorrect);
    setAiInsight(insight);
    setGameState(GameState.AI_REVEAL);
    setDraggedItemId(null);
  };

  const handleContinue = () => {
    setAiInsight('');
    
    // If time is up during the modal read
    if (timeLeft <= 0) {
        setGameState(GameState.GAME_OVER);
        return;
    }

    // Move to next level if available, otherwise loop or random (Looping for now to allow high scores)
    const nextIndex = (currentLevelIndex + 1) % LEVELS.length;
    setCurrentLevelIndex(nextIndex);
    setGameState(GameState.PLAYING);
  };

  // ---------------- UI RENDER ----------------

  // Start Screen
  if (gameState === GameState.START) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden opera-pattern">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-50/50 to-red-100 pointer-events-none"></div>
        
        <div className="relative z-10 bg-white shadow-2xl p-10 md:p-16 rounded-3xl border border-red-200 text-center max-w-2xl w-full">
            <h1 className="text-5xl md:text-7xl font-bold text-red-900 font-serif mb-4 tracking-tight">
               <span className="block text-2xl md:text-3xl text-amber-600 mb-2 uppercase tracking-[0.2em] font-sans">Cantonese Opera</span>
               Costume Mystery
            </h1>
            <p className="text-lg text-gray-600 mb-8 font-serif italic">
               You have {GAME_DURATION} seconds. Match as many costumes as possible to their roles!
            </p>
            
            <button 
                onClick={startGame}
                className="px-10 py-4 bg-red-800 text-amber-50 text-xl font-bold rounded-full shadow-lg hover:bg-red-900 transform transition hover:-translate-y-1 hover:shadow-red-900/30"
            >
                Start Challenge
            </button>
        </div>
      </div>
    );
  }

  // Game Over Screen
  if (gameState === GameState.GAME_OVER) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden opera-pattern bg-stone-100">
        <div className="relative z-10 bg-white p-12 rounded-3xl shadow-2xl border-4 border-amber-500 text-center max-w-xl w-full animate-fade-in">
            <h2 className="text-4xl font-bold text-stone-800 mb-2 font-serif">Curtain Call!</h2>
            <div className="text-6xl font-bold text-red-800 my-8 font-serif">{score}</div>
            <p className="text-stone-500 uppercase tracking-widest mb-8">Matches Completed</p>
            
            <div className="flex justify-center gap-4">
                <button 
                    onClick={startGame}
                    className="px-8 py-3 bg-red-800 text-white font-bold rounded-full hover:bg-red-900 transition-colors shadow-lg"
                >
                    Play Again
                </button>
            </div>
        </div>
      </div>
    );
  }

  // Playing / Reveal Screen
  return (
    <div className="min-h-screen flex flex-col relative bg-stone-100 overflow-hidden transition-colors duration-500">
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opera-pattern pointer-events-none"></div>

      {/* Header with Stats */}
      <header className="relative z-10 w-full p-4 md:p-6 flex justify-between items-center bg-white shadow-sm border-b border-stone-200">
        <div className="flex items-center gap-4">
             {/* Timer */}
            <div className={`flex flex-col items-center justify-center h-14 w-14 rounded-full border-2 ${timeLeft < 10 ? 'border-red-500 text-red-600 animate-pulse' : 'border-stone-800 text-stone-800'}`}>
                <span className="text-lg font-bold leading-none">{timeLeft}</span>
                <span className="text-[10px] uppercase font-bold">Sec</span>
            </div>
            
             {/* Score */}
            <div>
                <p className="text-xs text-stone-500 uppercase tracking-wider">Score</p>
                <div className="text-2xl font-bold text-red-900 leading-none">{score}</div>
            </div>
        </div>
        
        {/* Current Level Info */}
        <div className="text-right">
             <h1 className="text-lg font-bold text-stone-800 leading-none">{currentLevel.targetRole.name}</h1>
             <p className="text-xs text-stone-500 uppercase tracking-wider">Target Role</p>
        </div>
      </header>

      {/* Main Game Area */}
      <main className="flex-1 flex flex-col md:flex-row items-stretch justify-center relative z-10 p-4 md:p-8 gap-8 md:gap-16 max-w-7xl mx-auto w-full">
        
        {/* Left: The Stage (Target) */}
        <div className="flex-1 flex items-center justify-center min-h-[400px]">
            <TargetSilhouette 
                role={currentLevel.targetRole}
                isOver={isOverTarget}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
            />
        </div>

        {/* Right: The Wardrobe (Options) */}
        <div className="flex-none md:w-80 flex flex-col justify-center">
            <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-md">
                <h3 className="text-center text-stone-500 uppercase tracking-widest text-xs font-bold mb-6">Wardrobe Collection</h3>
                <div className="flex flex-wrap justify-center gap-4">
                    {currentLevel.options.map(costume => (
                        <DraggableCostume 
                            key={costume.id} 
                            costume={costume} 
                            onDragStart={handleDragStart} 
                        />
                    ))}
                </div>
            </div>
        </div>

      </main>

      {/* Feedback Modal (Success or Failure) */}
      {(gameState === GameState.LOADING_AI || gameState === GameState.AI_REVEAL) && (
        <InfoModal 
            title={isLastMatchCorrect ? currentLevel.targetRole.chineseName : "Oops!"}
            subtitle={isLastMatchCorrect ? "Cultural Insight" : "Did you know?"}
            content={aiInsight}
            isLoading={gameState === GameState.LOADING_AI}
            isSuccess={isLastMatchCorrect}
            onNext={handleContinue}
        />
      )}

      {/* Tailwind Custom Animations */}
      <style>{`
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
            animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default App;