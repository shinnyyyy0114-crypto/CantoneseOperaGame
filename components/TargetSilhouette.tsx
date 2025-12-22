import React from 'react';
import { OperaRole } from '../types';

interface TargetSilhouetteProps {
  role: OperaRole;
  isOver: boolean;
  onDrop: (e: React.DragEvent) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDragLeave: (e: React.DragEvent) => void;
}

export const TargetSilhouette: React.FC<TargetSilhouetteProps> = ({ 
  role, 
  isOver, 
  onDrop, 
  onDragOver, 
  onDragLeave 
}) => {
  return (
    <div 
      className="flex flex-col items-center gap-4 animate-fade-in"
      onDrop={onDrop}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
    >
       {/* Role Label */}
       <div className={`transition-transform duration-300 ${isOver ? 'scale-110' : ''} bg-red-900 text-amber-50 px-6 py-2 rounded-full shadow-md z-10`}>
          <h2 className="text-2xl font-bold font-serif tracking-widest">{role.chineseName}</h2>
          <p className="text-xs uppercase tracking-wider text-center text-red-200">{role.name}</p>
       </div>

      {/* The Silhouette Container */}
      <div 
        className={`
            relative w-64 h-96 md:w-80 md:h-[500px] 
            transition-all duration-300 ease-in-out
            rounded-2xl border-4 
            flex items-center justify-center backdrop-blur-sm
            ${isOver 
                ? 'border-amber-500 bg-amber-50/60 scale-[1.03] shadow-[0_0_40px_rgba(245,158,11,0.5)] ring-4 ring-amber-200 ring-opacity-50' 
                : 'border-dashed border-stone-300 bg-white/40 shadow-inner'
            }
        `}
      >
        {/* Silhouette Image Layer */}
        <div 
            className={`absolute inset-4 pointer-events-none transition-all duration-500 ${isOver ? 'opacity-60 scale-105' : 'opacity-40'}`}
            style={{
                backgroundImage: `url(${role.silhouetteImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        />

        {/* Instructions / Central Prompt */}
        <div className={`text-center pointer-events-none transition-all duration-300 ${isOver ? 'opacity-0 scale-75' : 'opacity-100'}`}>
            <div className="w-16 h-16 mx-auto mb-4 border-2 border-stone-300 rounded-full flex items-center justify-center bg-white/80 shadow-sm">
                <span className="text-3xl text-stone-400">+</span>
            </div>
            <p className="text-stone-800 font-serif font-bold italic px-8 drop-shadow-sm">
                Drag the correct costume here
            </p>
        </div>

        {/* Hover feedback overlay */}
        {isOver && (
          <div className="absolute inset-0 border-4 border-amber-400 rounded-xl animate-pulse pointer-events-none"></div>
        )}
      </div>
    </div>
  );
};