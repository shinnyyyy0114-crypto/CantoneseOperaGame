import React from 'react';

interface InfoModalProps {
  title: string;
  subtitle: string;
  content: string;
  isLoading: boolean;
  isSuccess: boolean;
  onNext: () => void;
}

export const InfoModal: React.FC<InfoModalProps> = ({ title, subtitle, content, isLoading, isSuccess, onNext }) => {
  const borderColor = isSuccess ? 'border-green-500' : 'border-red-500';
  const headerColor = isSuccess ? 'bg-green-800' : 'bg-red-900';
  const buttonColor = isSuccess ? 'bg-green-700 hover:bg-green-800' : 'bg-red-800 hover:bg-red-900';

  return (
    // FIXED: Removed backdrop-blur-sm, increased opacity of black background for cleaner look
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 animate-fade-in">
      <div className={`bg-stone-50 w-full max-w-lg rounded-2xl shadow-2xl border-4 ${borderColor} overflow-hidden flex flex-col relative`}>
        
        {/* Decorative Header */}
        <div className={`${headerColor} h-4 w-full`}></div>
        
        <div className="p-8 flex flex-col items-center text-center">
          <h2 className={`text-4xl font-bold font-serif mb-1 ${isSuccess ? 'text-green-900' : 'text-red-900'}`}>
            {isSuccess ? 'Match Correct!' : 'Not Quite...'}
          </h2>
          <h3 className="text-xl text-stone-600 font-medium mb-6 uppercase tracking-widest">{subtitle}</h3>

          <div className="w-full bg-white p-6 rounded-xl shadow-inner border border-stone-200 mb-8 min-h-[120px] flex items-center justify-center">
            {isLoading ? (
               <div className="flex flex-col items-center gap-3">
                  <div className={`animate-spin h-8 w-8 border-4 border-t-transparent rounded-full ${isSuccess ? 'border-green-800' : 'border-red-800'}`}></div>
                  <p className="text-stone-400 italic text-sm">Consulting the archives...</p>
               </div>
            ) : (
              <p className="text-stone-800 text-lg leading-relaxed font-serif">
                {content}
              </p>
            )}
          </div>

          <button
            onClick={onNext}
            className={`group relative px-8 py-3 ${buttonColor} text-white font-bold rounded-full overflow-hidden transition-transform hover:scale-105 active:scale-95 shadow-lg`}
          >
             <span className="relative z-10 flex items-center gap-2">
               {isSuccess ? 'Next Challenge' : 'Try Next'}
               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
               </svg>
             </span>
          </button>
        </div>

        {/* Decorative Footer */}
        <div className="bg-amber-500 h-2 w-full mt-auto"></div>
      </div>
    </div>
  );
};
