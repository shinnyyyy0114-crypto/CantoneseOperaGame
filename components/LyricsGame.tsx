import React, { useState } from 'react';
import { LYRIC_CHALLENGES } from '../constants';

interface LyricsGameProps {
  onBack: () => void;
}

export const LyricsGame: React.FC<LyricsGameProps> = ({ onBack }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isFinished, setIsFinished] = useState(false);

  const currentChallenge = LYRIC_CHALLENGES[currentIndex];

  // Generate options (1 correct + 3 random distractors)
  // Memoize this if performance is an issue, but for <10 items it's fine
  const generateOptions = () => {
    const correctOption = `${currentChallenge.roleName} - ${currentChallenge.playTitle}`;
    const allOptions = LYRIC_CHALLENGES
      .map(c => `${c.roleName} - ${c.playTitle}`)
      .filter((opt, index, self) => self.indexOf(opt) === index); // Unique only

    const distractors = allOptions
      .filter(opt => opt !== correctOption)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);
    
    return [correctOption, ...distractors].sort(() => 0.5 - Math.random());
  };

  const [options, setOptions] = useState<string[]>(generateOptions());

  const handleAnswer = (option: string) => {
    if (selectedAnswer) return; // Prevent double clicking
    setSelectedAnswer(option);
    
    const correctOption = `${currentChallenge.roleName} - ${currentChallenge.playTitle}`;
    if (option === correctOption) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < LYRIC_CHALLENGES.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      setSelectedAnswer(null);
      // We need to regenerate options for the next question. 
      // Since generateOptions uses state/props in a closure, we need to do it carefully.
      // We'll reset options in a useEffect or here immediately.
      // Ideally logic is separate, but inline here:
      const nextChallenge = LYRIC_CHALLENGES[nextIndex];
      const correctOption = `${nextChallenge.roleName} - ${nextChallenge.playTitle}`;
      const allOptions = LYRIC_CHALLENGES
        .map(c => `${c.roleName} - ${c.playTitle}`)
        .filter((opt, index, self) => self.indexOf(opt) === index);
      const distractors = allOptions
        .filter(opt => opt !== correctOption)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);
      setOptions([correctOption, ...distractors].sort(() => 0.5 - Math.random()));

    } else {
      setIsFinished(true);
    }
  };

  if (isFinished) {
    return (
      <div className="w-full flex flex-col items-center animate-fade-in p-8">
        <div className="bg-white p-12 rounded-3xl shadow-2xl border-4 border-amber-500 text-center max-w-xl w-full">
            <h2 className="text-4xl font-bold text-stone-800 mb-2 font-serif">Encore!</h2>
            <p className="text-stone-500 mb-6">You've completed the repertoire.</p>
            <div className="text-6xl font-bold text-red-800 my-8 font-serif">{score} / {LYRIC_CHALLENGES.length}</div>
            <button 
                onClick={onBack}
                className="px-8 py-3 bg-red-800 text-white font-bold rounded-full hover:bg-red-900 shadow-lg"
            >
                Back to Lobby
            </button>
        </div>
      </div>
    );
  }

  const correctOption = `${currentChallenge.roleName} - ${currentChallenge.playTitle}`;

  return (
    <div className="w-full h-full flex flex-col items-center p-4 md:p-8 animate-fade-in">
      <button onClick={onBack} className="self-start text-stone-500 hover:text-red-900 font-bold mb-4 flex items-center gap-2">
         ← Exit to Lobby
      </button>

      <div className="max-w-3xl w-full flex flex-col gap-6">
        {/* Card: The Quote */}
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-red-100 text-center relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-2 bg-red-800"></div>
             
             <p className="text-xs text-stone-400 uppercase tracking-[0.2em] mb-6">Guess the Character & Play</p>
             
             <h2 className="text-3xl md:text-4xl text-stone-800 font-serif leading-relaxed mb-6">
                “{currentChallenge.chineseQuote}”
             </h2>
             <p className="text-stone-500 italic font-serif text-lg">
                "{currentChallenge.englishQuote}"
             </p>

             <div className="mt-8 text-stone-300 text-sm">{currentIndex + 1} / {LYRIC_CHALLENGES.length}</div>
        </div>

        {/* Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {options.map((option, idx) => {
            let btnClass = "bg-white border-2 border-stone-200 text-stone-700 hover:border-red-300 hover:bg-red-50";
            
            if (selectedAnswer) {
                if (option === correctOption) {
                    btnClass = "bg-green-100 border-green-500 text-green-900";
                } else if (option === selectedAnswer) {
                    btnClass = "bg-red-100 border-red-500 text-red-900";
                } else {
                    btnClass = "bg-stone-100 border-transparent text-stone-400 opacity-50";
                }
            }

            return (
                <button
                    key={idx}
                    onClick={() => handleAnswer(option)}
                    disabled={!!selectedAnswer}
                    className={`p-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-sm ${btnClass}`}
                >
                    {option}
                </button>
            );
          })}
        </div>

        {/* Next Button */}
        {selectedAnswer && (
             <div className="flex justify-center mt-4 animate-fade-in">
                <button 
                    onClick={handleNext}
                    className="bg-red-800 text-white px-10 py-3 rounded-full font-bold shadow-lg hover:bg-red-900 hover:scale-105 transition-all"
                >
                    {currentIndex < LYRIC_CHALLENGES.length - 1 ? 'Next Lyric →' : 'Finish Show'}
                </button>
             </div>
        )}
      </div>
    </div>
  );
};