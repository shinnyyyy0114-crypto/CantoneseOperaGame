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
       <div className="bg-red-900 text-amber-50 px-6 py-2 rounded-full shadow-md z-10">
          <h2 className="text-2xl font-bold font-serif tracking-widest">{role.chineseName}</h2>
          <p className="text-xs uppercase tracking-wider text-center text-red-200">{role.name}</p>
       </div>

      {/* The Silhouette Container */}
      {/* FIXED: Changed bg-white/60 to bg-white (solid) to remove foggy effect */}
      <div 
        className={`
            relative w-64 h-96 md:w-80 md:h-[500px] 
            transition-all duration-500 ease-out
            rounded-2xl border-4 
            flex items-center justify-center
            ${isOver 
                ? 'border-amber-400 bg-amber-50 scale-105 shadow-[0_0_30px_rgba(251,191,36,0.4)]' 
                : 'border-dashed border-gray-400 bg-white shadow-inner'
            }
        `}
      >
        {/* Silhouette Image Layer */}
        {/* FIXED: Removed grayscale/contrast filters, increased opacity slightly for clarity */}
        <div 
            className="absolute inset-4 opacity-40 pointer-events-none transition-opacity duration-300"
            style={{
                backgroundImage: `url(${role.silhouetteImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        />

        {/* Instructions / Central Prompt */}
        <div className={`text-center pointer-events-none transition-opacity duration-300 ${isOver ? 'opacity-0' : 'opacity-100'}`}>
            <div className="w-16 h-16 mx-auto mb-2 border-2 border-gray-400 rounded-full flex items-center justify-center bg-white/80">
                <span className="text-3xl text-gray-400">+</span>
            </div>
            <p className="text-gray-500 font-serif italic px-8">
                Drag the correct costume here
            </p>
        </div>

      </div>
    </div>
  );
};
