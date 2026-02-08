
import React, { useEffect, useState } from 'react';
import { Trophy, Star } from 'lucide-react';

interface Props {
  winnerName: string;
}

const VictoryCelebration: React.FC<Props> = ({ winnerName }) => {
  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center pointer-events-none overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-transparent animate-in fade-in duration-1000"></div>
      
      <div className="relative flex flex-col items-center">
        <div className="mb-6 transform scale-[2] text-yellow-500 animate-bounce">
           <Trophy size={64} fill="currentColor" />
        </div>
        
        <div className="text-center space-y-2 transform transition-all animate-in zoom-in slide-in-from-bottom-10 duration-700">
          <div className="flex items-center justify-center gap-4 mb-2">
            <Star className="text-yellow-400 fill-yellow-400 animate-pulse" />
            <h2 className="text-2xl md:text-4xl font-bold text-white uppercase tracking-widest drop-shadow-lg">CHAMPIONS</h2>
            <Star className="text-yellow-400 fill-yellow-400 animate-pulse" />
          </div>
          <h1 className="text-6xl md:text-9xl font-black text-white italic drop-shadow-[0_20px_20px_rgba(0,0,0,0.5)] tracking-tighter uppercase whitespace-nowrap">
            {winnerName}
          </h1>
        </div>

        {/* Floating background elements */}
        {Array.from({ length: 20 }).map((_, i) => (
          <div 
            key={i}
            className="absolute bg-white/20 rounded-full animate-float"
            style={{
              width: `${Math.random() * 40 + 10}px`,
              height: `${Math.random() * 40 + 10}px`,
              left: `${Math.random() * 200 - 100}%`,
              top: `${Math.random() * 200 - 100}%`,
              animationDuration: `${Math.random() * 5 + 3}s`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default VictoryCelebration;
