import React, { useState, useEffect, useRef, useCallback } from 'react';
import { GameState, GameLevel } from '../types';
import { LEVELS } from '../constants';
import { getMatchFeedback } from '../services/geminiService';
import { TargetSilhouette } from './TargetSilhouette';
import { DraggableCostume } from './DraggableCostume';
import { InfoModal } from './InfoModal';

const SOUND_URLS = {
  DRAG_START: 'https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3',
  MATCH_CORRECT: 'https://assets.mixkit.co/active_storage/sfx/2000/2000-preview.mp3',
  MATCH_WRONG: 'https://assets.mixkit.co/active_storage/sfx/2573/2573-preview.mp3',
  LEVEL_COMPLETE: 'https://assets.mixkit.co/active_storage/sfx/1435/1435-preview.mp3',
};

const SECTION_BG_URLS: Record<string, string> = {
  fadan: 'https://raw.githubusercontent.com/shinnyyyy0114-crypto/CantoneseOperaGamePic/refs/heads/main/%E8%8A%B1%E6%97%A6.png',
  jing: 'https://raw.githubusercontent.com/shinnyyyy0114-crypto/CantoneseOperaGamePic/refs/heads/main/%E5%87%80.png',
  xiaosheng: 'https://raw.githubusercontent.com/shinnyyyy0114-crypto/CantoneseOperaGamePic/refs/heads/main/%E5%B0%8F%E7%94%9F.png',
  wusheng: 'https://raw.githubusercontent.com/shinnyyyy0114-crypto/CantoneseOperaGamePic/refs/heads/main/%E6%AD%A6%E7%94%9F.png',
  laosheng: 'https://raw.githubusercontent.com/shinnyyyy0114-crypto/CantoneseOperaGamePic/refs/heads/main/%E8%80%81%E7%94%9F.png',
  wardrobe: 'https://raw.githubusercontent.com/shinnyyyy0114-crypto/CantoneseOperaGamePic/refs/heads/main/%E8%A1%A3%E6%9F%9C.png'
};

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
  const [matchedCostumeIds, setMatchedCostumeIds] = useState<Set<string>>(new Set());
  
  const [score, setScore] = useState(0);

  const currentLevel: GameLevel = LEVELS[currentLevelIndex];

  const playSound = useCallback((url: string) => {
    const audio = new Audio(url);
    audio.volume = 0.4;
    audio.play().catch(() => {});
  }, []);

  const startGame = () => {
    setScore(0);
    setCurrentLevelIndex(0);
    setMatchedCostumeIds(new Set());
    setGameState(GameState.PLAYING);
    playSound(SOUND_URLS.DRAG_START);
  };

  const handleDragStart = (id: string) => {
    if (gameState !== GameState.PLAYING) return;
    setDraggedItemId(id);
    playSound(SOUND_URLS.DRAG_START);
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
    
    // Prevent multiple drops during transitions
    if (!draggedItemId || gameState !== GameState.PLAYING) return;

    const costumeId = draggedItemId;
    setDraggedItemId(null); // Clear immediately to prevent race conditions

    const droppedCostume = currentLevel.options.find(c => c.id === costumeId);
    if (!droppedCostume) return;
    
    const isCorrect = droppedCostume.roleId === currentLevel.targetRole.id;
    setIsLastMatchCorrect(isCorrect);
    
    // Update score and game state immediately for responsiveness
    if (isCorrect) {
      setScore(prev => prev + 1);
      setMatchedCostumeIds(prev => new Set(prev).add(costumeId));
      playSound(SOUND_URLS.MATCH_CORRECT);
    } else {
      playSound(SOUND_URLS.MATCH_WRONG);
    }

    setAiInsight(''); // Reset insight for loader
    setGameState(GameState.LOADING_AI);
    
    try {
      const insight = await getMatchFeedback(currentLevel.targetRole, droppedCostume, isCorrect);
      setAiInsight(insight);
      setGameState(GameState.AI_REVEAL);
    } catch (err) {
      setAiInsight("Failed to load insight.");
      setGameState(GameState.AI_REVEAL);
    }
  };

  const handleContinue = () => {
    if (gameState !== GameState.AI_REVEAL && gameState !== GameState.LOADING_AI) return;
    
    setAiInsight('');
    const nextIndex = currentLevelIndex + 1;
    
    if (nextIndex >= LEVELS.length) {
      playSound(SOUND_URLS.LEVEL_COMPLETE);
      setGameState(GameState.GAME_OVER);
    } else {
      playSound(SOUND_URLS.LEVEL_COMPLETE);
      setMatchedCostumeIds(new Set());
      setCurrentLevelIndex(nextIndex);
      setGameState(GameState.PLAYING);
    }
  };

  const availableOptions = currentLevel.options.filter(c => !matchedCostumeIds.has(c.id));

  // Determine which background to show for the silhouette area
  const silhouetteBg = SECTION_BG_URLS[currentLevel.targetRole.id] || SECTION_BG_URLS.fadan;

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
               Match the costumes to the correct silhouette! Discover the secrets of Cantonese Opera.
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
            <div>
                <p className="text-[10px] text-stone-500 uppercase text-right">Progress</p>
                <div className="text-xl font-bold text-red-900 leading-none">{currentLevelIndex + 1} / {LEVELS.length}</div>
            </div>
            <div className="h-8 w-[1px] bg-stone-200"></div>
            <div>
                <p className="text-[10px] text-stone-500 uppercase text-right">Score</p>
                <div className="text-xl font-bold text-red-900 leading-none">{score}</div>
            </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col md:flex-row items-stretch justify-center relative z-10 p-4 gap-4 md:gap-8 max-w-7xl mx-auto w-full">
        {/* Silhouette Interaction Section with Background */}
        <div 
          className="flex-1 flex items-center justify-center rounded-3xl overflow-hidden relative shadow-inner bg-cover bg-center border border-stone-200"
          style={{ backgroundImage: `url('${silhouetteBg}')` }}
        >
            <div className="absolute inset-0 bg-white/20 backdrop-blur-[1px]"></div>
            <div className="relative z-10 w-full h-full flex items-center justify-center py-8">
              <TargetSilhouette 
                  role={currentLevel.targetRole}
                  isOver={isOverTarget}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
              />
            </div>
        </div>

        {/* Wardrobe Interaction Section with Background */}
        <div className="flex-none md:w-80 flex flex-col justify-center">
            <div 
              className="bg-white rounded-2xl p-4 border border-stone-300 shadow-lg relative overflow-hidden bg-cover bg-center min-h-[300px]"
              style={{ backgroundImage: `url('${SECTION_BG_URLS.wardrobe}')` }}
            >
                <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px]"></div>
                <div className="relative z-10 h-full flex flex-col">
                  <h3 className="text-center text-red-900 uppercase tracking-widest text-xs font-black mb-4 drop-shadow-sm">Wardrobe / 衣柜</h3>
                  <div className="flex flex-wrap justify-center gap-3">
                      {availableOptions.length > 0 ? (
                        availableOptions.map(costume => (
                          <DraggableCostume 
                              key={costume.id} 
                              costume={costume} 
                              onDragStart={handleDragStart} 
                          />
                        ))
                      ) : (
                        <p className="text-stone-800 font-bold italic text-sm py-12 text-center bg-white/40 rounded-xl px-4">Wardrobe Empty<br/>衣柜已空</p>
                      )}
                  </div>
                </div>
            </div>
        </div>
      </main>

      {(gameState === GameState.LOADING_AI || gameState === GameState.AI_REVEAL) && (
        <InfoModal 
            title={isLastMatchCorrect ? currentLevel.targetRole.chineseName : "Oops!"}
            subtitle={isLastMatchCorrect ? "Cultural Insight" : "Did you know?"}
            content={aiInsight}
            isLoading={gameState === GameState.LOADING_AI && !aiInsight}
            isSuccess={isLastMatchCorrect}
            onNext={handleContinue}
        />
      )}
    </div>
  );
};