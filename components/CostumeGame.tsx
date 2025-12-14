import React, { useState, useEffect, useRef } from 'react';
import { GameState, GameLevel } from '../types';
import { LEVELS } from '../constants';
import { getMatchFeedback } from '../services/geminiService';
import { TargetSilhouette } from './TargetSilhouette';
import { DraggableCostume } from './DraggableCostume';
import { InfoModal } from './InfoModal';

const GAME_DURATION = 60; // seconds

interface CostumeGameProps {
  onBack: () => void;
}

export const CostumeGame: React.FC<CostumeGameProps> = ({ onBack }) => {
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const [gameState, setGameState] = useState<GameState>(GameState.START);
  const [draggedItemId, setDraggedItemId] = useState<string | null>(null);
  const [isOverTarget, setIsOverTarget] = useState(false);
  const [aiInsight, setAiInsight] = useState<string>('');
  const [isLastMatchCorrect, setIsLastMatchCorrect] = useState(false);
  
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [score, setScore] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const currentLevel: GameLevel = LEVELS[currentLevelIndex];

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

  const handleDragStart = (id: string) => setDraggedItemId(id);
  
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
    
    setGameState(GameState.LOADING_AI);
    const isCorrect = droppedCostume.roleId === currentLevel.targetRole.id;
    setIsLastMatchCorrect(isCorrect);
    if (isCorrect) setScore(prev => prev + 1);

    const insight = await getMatchFeedback(currentLevel.targetRole, droppedCostume, isCorrect);
    setAiInsight(insight);
    setGameState(GameState.AI_REVEAL);
    setDraggedItemId(null);
  };

  const handleContinue = () => {
    setAiInsight('');
    if (timeLeft <= 0) {
        setGameState(GameState.GAME_OVER);
        return;
    }
    const nextIndex = (currentLevelIndex + 1) % LEVELS.length;
    setCurrentLevelIndex(nextIndex);
    setGameState(GameState.PLAYING);
  };

  if (gameState === GameState.START) {
    return (
      <div className="w-full flex flex-col items-center animate-fade-in">
         <button onClick={onBack} className="absolute top-6 left-6 text-stone-500 hover:text-red-900 font-serif font-bold z-20 flex items-center gap-2">
            ← Back to Menu
         </button>
        <div className="bg-white shadow-xl p-10 md:p-16 rounded-3xl border border-red-200 text-center max-w-2xl w-full">
            <h1 className="text-4xl md:text-5xl font-bold text-red-900 font-serif mb-4 tracking-tight">
               Costume Mystery
            </h1>
            <p className="text-lg text-gray-600 mb-8 font-serif italic">
               You have {GAME_DURATION} seconds. Match the costumes to the correct silhouette!
            </p>
            <button 
                onClick={startGame}
                className="px-10 py-4 bg-red-800 text-amber-50 text-xl font-bold rounded-full shadow-lg hover:bg-red-900 transition-transform hover:-translate-y-1"
            >
                Start
            </button>
        </div>
      </div>
    );
  }

  if (gameState === GameState.GAME_OVER) {
    return (
      <div className="w-full flex flex-col items-center animate-fade-in">
        <div className="bg-white p-12 rounded-3xl shadow-2xl border-4 border-amber-500 text-center max-w-xl w-full">
            <h2 className="text-4xl font-bold text-stone-800 mb-2 font-serif">Curtain Call!</h2>
            <div className="text-6xl font-bold text-red-800 my-8 font-serif">{score}</div>
            <p className="text-stone-500 uppercase tracking-widest mb-8">Matches Completed</p>
            <div className="flex flex-col md:flex-row justify-center gap-4">
                <button 
                    onClick={startGame}
                    className="px-8 py-3 bg-red-800 text-white font-bold rounded-full hover:bg-red-900 shadow-lg"
                >
                    Play Again
                </button>
                <button 
                    onClick={onBack}
                    className="px-8 py-3 bg-stone-200 text-stone-700 font-bold rounded-full hover:bg-stone-300"
                >
                    Back to Menu
                </button>
            </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col relative">
      <header className="relative z-10 w-full p-4 flex justify-between items-center bg-white shadow-sm border-b border-stone-200 rounded-b-xl">
        <button onClick={onBack} className="text-stone-500 hover:text-red-900 text-sm font-bold uppercase tracking-wider">← Menu</button>
        <div className="flex items-center gap-4">
            <div className={`flex flex-col items-center justify-center h-12 w-12 rounded-full border-2 ${timeLeft < 10 ? 'border-red-500 text-red-600 animate-pulse' : 'border-stone-800 text-stone-800'}`}>
                <span className="text-lg font-bold leading-none">{timeLeft}</span>
            </div>
            <div>
                <p className="text-[10px] text-stone-500 uppercase">Score</p>
                <div className="text-xl font-bold text-red-900 leading-none">{score}</div>
            </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col md:flex-row items-stretch justify-center relative z-10 p-4 gap-4 md:gap-8 max-w-7xl mx-auto w-full">
        <div className="flex-1 flex items-center justify-center">
            <TargetSilhouette 
                role={currentLevel.targetRole}
                isOver={isOverTarget}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
            />
        </div>
        <div className="flex-none md:w-80 flex flex-col justify-center">
            <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-md">
                <h3 className="text-center text-stone-500 uppercase tracking-widest text-xs font-bold mb-4">Wardrobe</h3>
                <div className="flex flex-wrap justify-center gap-3">
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
    </div>
  );
};