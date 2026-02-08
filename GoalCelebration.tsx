
import React, { useEffect, useState } from 'react';

interface Props {
  teamName: string;
}

const GoalCelebration: React.FC<Props> = ({ teamName }) => {
  const [particles, setParticles] = useState<{x: number, y: number, color: string}[]>([]);

  useEffect(() => {
    const colors = ['#3b82f6', '#ef4444', '#f59e0b', '#10b981', '#ffffff'];
    const newParticles = Array.from({ length: 100 }).map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      color: colors[Math.floor(Math.random() * colors.length)]
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-in fade-in duration-500"></div>
      
      {/* Confusion of confetti */}
      {particles.map((p, i) => (
        <div 
          key={i}
          className="absolute w-2 h-2 rounded-full animate-ping"
          style={{ 
            left: `${p.x}%`, 
            top: `${p.y}%`, 
            backgroundColor: p.color,
            animationDuration: `${Math.random() * 2 + 1}s` 
          }}
        />
      ))}

      <div className="relative text-center animate-goal">
        <h1 className="text-8xl md:text-[12rem] font-black text-white italic drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)] tracking-tighter uppercase">
          GOOOOAL!
        </h1>
        <p className="text-2xl md:text-4xl font-bold text-white uppercase tracking-widest mt-4 drop-shadow-md">
           {teamName} Scores!
        </p>
      </div>
    </div>
  );
};

export default GoalCelebration;
