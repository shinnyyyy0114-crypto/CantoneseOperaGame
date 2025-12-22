import React, { useState } from 'react';
import { PERSONALITY_QUESTIONS, PERSONALITY_RESULTS } from '../constants';
import { PersonalityResult } from '../types';

interface PersonalityTestProps {
  onBack: () => void;
}

const BG_IMAGE_URL = 'https://raw.githubusercontent.com/shinnyyyy0114-crypto/CantoneseOperaGamePic/refs/heads/main/%E4%BA%BA%E6%A0%BC%E6%B5%8B%E8%AF%95%E8%83%8C%E6%99%AF.png';

export const PersonalityTest: React.FC<PersonalityTestProps> = ({ onBack }) => {
  const [step, setStep] = useState<'START' | 'QUIZ' | 'RESULT'>('START');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [result, setResult] = useState<PersonalityResult | null>(null);

  const startQuiz = () => {
    setScores({});
    setCurrentQuestionIndex(0);
    setStep('QUIZ');
  };

  const handleAnswer = (weights: Record<string, number>) => {
    const newScores = { ...scores };
    Object.entries(weights).forEach(([type, weight]) => {
      newScores[type] = (newScores[type] || 0) + weight;
    });
    setScores(newScores);

    if (currentQuestionIndex < PERSONALITY_QUESTIONS.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      calculateResult(newScores);
    }
  };

  const calculateResult = (finalScores: Record<string, number>) => {
    let maxScore = -1;
    let winningType = PERSONALITY_RESULTS[0].id;

    Object.entries(finalScores).forEach(([type, score]) => {
      if (score > maxScore) {
        maxScore = score;
        winningType = type;
      }
    });

    const finalResult = PERSONALITY_RESULTS.find(r => r.id === winningType) || PERSONALITY_RESULTS[0];
    setResult(finalResult);
    setStep('RESULT');
  };

  const renderContent = () => {
    if (step === 'START') {
      return (
        <div className="w-full h-full flex flex-col items-center justify-center p-6 animate-fade-in text-center">
          <button onClick={onBack} className="absolute top-6 left-6 text-stone-600 hover:text-red-900 font-bold z-20 bg-white/80 px-4 py-2 rounded-full shadow-sm backdrop-blur-sm transition-all flex items-center gap-2">
            <span className="text-xl">←</span> Back
          </button>
          <div className="bg-white/95 backdrop-blur-md p-10 md:p-16 rounded-3xl shadow-2xl border border-red-100 max-w-2xl w-full">
            <h1 className="text-4xl md:text-5xl font-bold text-red-900 font-serif mb-6">
              If You Were a Cantonese Opera Character
            </h1>
            <div className="space-y-4 mb-10">
              <p className="text-xl text-stone-800 font-serif leading-relaxed">
                在粤剧中，人物并非简单的“性格类型”，<br/>而是在爱情、命运与责任之间不断做出选择的人。
              </p>
              <p className="text-stone-500 italic">
                In Cantonese opera, characters are defined by choices <br/> between love, fate, and responsibility.
              </p>
            </div>
            
            <button 
              onClick={startQuiz}
              className="bg-red-800 text-white text-xl px-12 py-4 rounded-full font-bold shadow-lg hover:bg-red-900 transition-all hover:-translate-y-1"
            >
              Start Test / 开始测试
            </button>

            <div className="mt-12 pt-8 border-t border-stone-200 text-left">
              <h3 className="text-stone-400 uppercase text-xs tracking-widest mb-4 font-bold">Instructions / 测试说明</h3>
              <ul className="text-sm text-stone-500 space-y-2">
                <li>• 8 questions / 共 8 题</li>
                <li>• No right or wrong answers / 没有标准答案</li>
                <li>• Based on narrative patterns / 基于经典叙事结构设计</li>
              </ul>
            </div>
          </div>
        </div>
      );
    }

    if (step === 'QUIZ') {
      const q = PERSONALITY_QUESTIONS[currentQuestionIndex];
      const progress = ((currentQuestionIndex + 1) / PERSONALITY_QUESTIONS.length) * 100;

      return (
        <div className="w-full h-full flex flex-col items-center p-6 md:p-12 animate-fade-in">
          <div className="max-w-3xl w-full">
            <div className="mb-8">
              <div className="flex justify-between items-end mb-2">
                <span className="text-red-900 font-bold font-serif text-2xl drop-shadow-sm">Q{currentQuestionIndex + 1}</span>
                <span className="text-stone-600 text-sm font-bold tracking-widest bg-white/50 px-2 py-0.5 rounded-full">{currentQuestionIndex + 1} / {PERSONALITY_QUESTIONS.length}</span>
              </div>
              <div className="w-full h-2 bg-white/50 rounded-full overflow-hidden backdrop-blur-sm border border-white/20">
                <div 
                  className="h-full bg-red-800 transition-all duration-500 shadow-[0_0_10px_rgba(153,27,27,0.5)]" 
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>

            <div className="bg-white/90 backdrop-blur-md p-8 md:p-12 rounded-3xl shadow-xl border border-white/50 mb-8">
              <h2 className="text-2xl md:text-3xl text-stone-800 font-serif leading-relaxed mb-4">
                {q.chineseText}
              </h2>
              <p className="text-stone-500 italic font-serif text-lg">
                {q.englishText}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {q.options.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => handleAnswer(opt.typeWeights)}
                  className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border-2 border-transparent text-left hover:border-red-300 hover:bg-white transition-all group flex flex-col gap-1 shadow-sm hover:shadow-md"
                >
                  <span className="text-stone-800 font-bold text-lg group-hover:text-red-900 transition-colors">
                    {opt.chineseText}
                  </span>
                  <span className="text-stone-500 italic text-sm">
                    {opt.englishText}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      );
    }

    if (step === 'RESULT' && result) {
      return (
        <div className="w-full h-full flex flex-col items-center p-6 md:p-12 animate-fade-in overflow-y-auto">
          <div className="max-w-2xl w-full bg-white/95 backdrop-blur-lg rounded-[2rem] shadow-2xl border-t-8 border-red-800 p-8 md:p-16 relative overflow-hidden my-4">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-50/50 rounded-bl-full -mr-16 -mt-16 opacity-50"></div>
            
            <div className="text-center mb-12 relative z-10">
              <p className="text-red-800 font-bold tracking-[0.3em] uppercase text-xs mb-4">Test Result / 测试结果</p>
              <h2 className="text-4xl md:text-6xl font-bold text-stone-800 font-serif mb-2">
                {result.title}
              </h2>
              <h3 className="text-2xl text-stone-400 font-serif italic">
                {result.englishTitle}
              </h3>
            </div>

            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {result.keywords.map((kw, i) => (
                <div key={i} className="flex flex-col items-center px-6 py-3 bg-red-50/80 rounded-2xl border border-red-100/50 backdrop-blur-sm">
                  <span className="text-red-900 font-bold text-lg">{kw}</span>
                  <span className="text-[10px] text-red-700 uppercase tracking-widest">{result.englishKeywords[i]}</span>
                </div>
              ))}
            </div>

            <div className="space-y-8 mb-12">
              <div className="bg-stone-50/80 backdrop-blur-sm p-6 rounded-2xl border border-stone-100 shadow-inner">
                <p className="text-stone-800 font-serif text-lg leading-relaxed mb-4">
                  {result.chineseInterpretation}
                </p>
                <p className="text-stone-500 italic font-serif leading-relaxed">
                  {result.englishInterpretation}
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <span className="text-stone-400 uppercase text-[10px] tracking-[0.4em] font-bold mb-2">Related Opera / 对应剧目</span>
                <span className="text-red-900 font-bold text-xl font-serif">{result.relatedOpera}</span>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <button 
                onClick={startQuiz}
                className="w-full py-4 bg-red-800 text-white rounded-full font-bold shadow-lg hover:bg-red-900 transition-all hover:-translate-y-1"
              >
                Take it Again / 重新测试
              </button>
              <button 
                onClick={onBack}
                className="w-full py-4 bg-stone-100/80 text-stone-600 rounded-full font-bold hover:bg-stone-200 transition-all"
              >
                Back to Lobby / 返回大厅
              </button>
            </div>

            <footer className="mt-12 pt-8 border-t border-stone-100 text-center text-[10px] text-stone-400 space-y-1">
              <p>本测试并非心理诊断，而是一种基于粤剧人物叙事结构的文化人格体验。</p>
              <p className="italic">This test is not a psychological diagnosis, but a cultural experience based on narrative archetypes.</p>
            </footer>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div 
      className="w-full h-full min-h-screen relative flex flex-col overflow-hidden bg-cover bg-center" 
      style={{ backgroundImage: `url('${BG_IMAGE_URL}')` }}
    >
      {/* Semi-transparent overlay to ensure text contrast and cultural look */}
      <div className="absolute inset-0 bg-stone-100/30 backdrop-blur-[2px] pointer-events-none"></div>
      
      {/* Content wrapper */}
      <div className="relative z-10 w-full h-full flex-1 flex flex-col">
        {renderContent()}
      </div>
    </div>
  );
};