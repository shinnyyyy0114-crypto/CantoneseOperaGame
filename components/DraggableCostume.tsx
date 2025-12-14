import React from 'react';
import { Costume } from '../types';

interface DraggableCostumeProps {
  costume: Costume;
  onDragStart: (id: string) => void;
}

export const DraggableCostume: React.FC<DraggableCostumeProps> = ({ costume, onDragStart }) => {
  return (
    <div
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData('text/plain', costume.id);
        e.dataTransfer.effectAllowed = 'move';
        onDragStart(costume.id);
      }}
      className="cursor-grab active:cursor-grabbing transform transition-all hover:scale-105 active:scale-95 touch-none select-none"
    >
      <div className="bg-white p-3 rounded-xl shadow-lg border-2 border-transparent hover:border-red-400 w-32 md:w-40 flex flex-col items-center gap-2">
        <div className="w-full aspect-square overflow-hidden rounded-lg bg-gray-100 relative">
             <img 
                src={costume.imageUrl} 
                alt={costume.name} 
                className="w-full h-full object-cover pointer-events-none"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        </div>
        <span className="text-sm font-semibold text-gray-800 text-center font-serif leading-tight">
          {costume.name}
        </span>
      </div>
    </div>
  );
};
