
import React from 'react';
import { MatchState } from '../types';
import { Clock, ChevronRight } from 'lucide-react';

interface Props {
  state: MatchState;
  onStatusChange: () => void;
}

const LiveScoreCard: React.FC<Props> = ({ state, onStatusChange }) => {
  const getStatusText = () => {
    switch (state.status) {
      case 'LIVE': return `${state.minute}'`;
      case 'FT': return 'Full Time';
      case 'ET': return `ET ${state.minute}'`;
      case 'ET_FT': return 'AET';
      case 'PENALTIES': return 'Penalties';
      case 'FINISHED': 
        if (state.team1.penalties.length > 0) return 'FT (AP)';
        if (state.minute > 90) return 'FT (AET)';
        return 'Full Time';
      default: return '';
    }
  };

  const getTransitionLabel = () => {
    if (state.status === 'LIVE') return "Finish Regular Time";
    if (state.status === 'FT') return "Start Extra Time";
    if (state.status === 'ET') return "Finish Extra Time";
    if (state.status === 'ET_FT') return "Start Penalties";
    if (state.status === 'PENALTIES') return "Complete Game";
    return null;
  };

  return (
    <div className="bg-white rounded-[2rem] shadow-2xl border border-gray-100 overflow-hidden">
      <div className="px-8 py-5 border-b flex justify-between items-center bg-gray-50/50">
        <div className="flex items-center gap-4">
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">{state.competition}</span>
          <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">{state.stadium}</span>
        </div>
        {(state.status === 'LIVE' || state.status === 'ET' || state.status === 'PENALTIES') && (
           <div className="flex items-center gap-2 bg-red-50 px-3 py-1.5 rounded-full">
              <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></div>
              <span className="text-[10px] font-black text-red-600 tracking-[0.1em] uppercase">Live Match</span>
           </div>
        )}
      </div>

      <div className="p-12 md:p-20 flex items-center justify-center gap-8 md:gap-20">
        <div className="flex flex-col items-center gap-6 flex-1">
          <div className="w-28 h-28 md:w-40 md:h-40 rounded-full border-4 border-gray-50 shadow-inner overflow-hidden flex items-center justify-center bg-white transform transition-transform hover:scale-105 active:scale-95 duration-500 cursor-pointer">
            <img src={state.team1.logo} alt={state.team1.name} className="w-full h-full object-cover p-3" />
          </div>
          <h3 className="text-lg md:text-2xl font-black text-gray-900 text-center uppercase tracking-tight leading-none">{state.team1.name}</h3>
        </div>

        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center gap-6 text-7xl md:text-9xl font-black text-gray-900 font-mono tracking-tighter drop-shadow-xl">
            <span className="tabular-nums">{state.team1.score}</span>
            <span className="text-gray-100 select-none">-</span>
            <span className="tabular-nums">{state.team2.score}</span>
          </div>
          <div className="mt-8">
             <span className="px-6 py-2.5 bg-gray-900 text-white rounded-full text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-3 shadow-2xl transform transition-transform hover:translate-y-[-2px]">
               <Clock size={16} className={state.isTimerRunning ? 'animate-spin' : ''} />
               {getStatusText()}
             </span>
          </div>
        </div>

        <div className="flex flex-col items-center gap-6 flex-1">
          <div className="w-28 h-28 md:w-40 md:h-40 rounded-full border-4 border-gray-50 shadow-inner overflow-hidden flex items-center justify-center bg-white transform transition-transform hover:scale-105 active:scale-95 duration-500 cursor-pointer">
            <img src={state.team2.logo} alt={state.team2.name} className="w-full h-full object-cover p-3" />
          </div>
          <h3 className="text-lg md:text-2xl font-black text-gray-900 text-center uppercase tracking-tight leading-none">{state.team2.name}</h3>
        </div>
      </div>

      {getTransitionLabel() && (
        <div className="p-6 bg-gray-50/80 border-t flex justify-center">
          <button 
            onClick={onStatusChange}
            className="group flex items-center gap-3 px-10 py-3 bg-blue-600 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full hover:bg-blue-700 transition-all hover:scale-105 active:scale-95 shadow-xl"
          >
            {getTransitionLabel()}
            <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      )}
    </div>
  );
};

export default LiveScoreCard;
