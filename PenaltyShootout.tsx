
import React from 'react';
import { MatchState } from '../types';
import { Check, X, Target, ArrowRight } from 'lucide-react';

interface Props {
  state: MatchState;
  onUpdatePenalties: (teamIdx: number, penalties: boolean[]) => void;
}

const PenaltyShootout: React.FC<Props> = ({ state, onUpdatePenalties }) => {
  const p1 = state.team1.penalties;
  const p2 = state.team2.penalties;

  // Team 1 starts. If lengths are equal, it's T1's turn. If T1 has more, it's T2's turn.
  const isT1Turn = p1.length === p2.length;
  const isT2Turn = p1.length > p2.length;

  const handleKick = (teamIdx: 1 | 2, success: boolean) => {
    const teamKey = teamIdx === 1 ? 'team1' : 'team2';
    const currentPens = [...state[teamKey].penalties];
    currentPens.push(success);
    onUpdatePenalties(teamIdx, currentPens);
  };

  const removeLastKick = (teamIdx: 1 | 2) => {
    const teamKey = teamIdx === 1 ? 'team1' : 'team2';
    const currentPens = [...state[teamKey].penalties];
    currentPens.pop();
    onUpdatePenalties(teamIdx, currentPens);
  };

  return (
    <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 p-8 overflow-hidden">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3 text-red-600 font-black text-[10px] uppercase tracking-[0.2em]">
          <Target size={16} />
          <h2>Penalty Shootout</h2>
        </div>
        <div className="bg-gray-100 px-3 py-1 rounded-full text-[9px] font-black text-gray-400 uppercase tracking-widest">
           Alternating Turns Active
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {[1, 2].map((idx) => {
          const team = idx === 1 ? state.team1 : state.team2;
          const score = team.penalties.filter(p => p).length;
          const isMyTurn = idx === 1 ? isT1Turn : isT2Turn;
          
          return (
            <div key={idx} className={`relative space-y-6 transition-all duration-500 ${isMyTurn ? 'scale-105' : 'opacity-40 grayscale-[0.5]'}`}>
              {isMyTurn && (
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 flex items-center gap-2 text-blue-600 animate-bounce">
                  <ArrowRight size={14} className="rotate-90" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Kicking Now</span>
                </div>
              )}
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <img src={team.logo} className="w-12 h-12 rounded-full border-2 border-white shadow-sm" alt="" />
                  <span className="font-black text-gray-900 uppercase tracking-tight">{team.name}</span>
                </div>
                <div className="text-3xl font-mono font-black text-gray-900">
                  {score}
                </div>
              </div>

              <div className="flex flex-wrap gap-2 min-h-[44px] items-center">
                {team.penalties.map((success, pIdx) => (
                  <div 
                    key={pIdx} 
                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all transform hover:scale-110 ${success ? 'bg-green-500 border-green-600 text-white shadow-[0_0_15px_rgba(34,197,94,0.3)]' : 'bg-red-500 border-red-600 text-white shadow-[0_0_15px_rgba(239,68,68,0.3)]'}`}
                  >
                    {success ? <Check size={20} strokeWidth={4} /> : <X size={20} strokeWidth={4} />}
                  </div>
                ))}
                {Array(Math.max(0, 5 - team.penalties.length)).fill(null).map((_, pIdx) => (
                  <div key={`empty-${pIdx}`} className="w-10 h-10 rounded-full border-2 border-dashed border-gray-200 bg-gray-50/50"></div>
                ))}
              </div>

              <div className="flex gap-3">
                 <button 
                  disabled={!isMyTurn}
                  onClick={() => handleKick(idx as 1|2, true)}
                  className={`flex-[2] py-4 rounded-2xl font-black transition-all text-xs uppercase tracking-widest shadow-lg ${isMyTurn ? 'bg-green-600 text-white hover:bg-green-700 hover:scale-105 active:scale-95' : 'bg-gray-100 text-gray-300'}`}
                 >
                   Goal
                 </button>
                 <button 
                  disabled={!isMyTurn}
                  onClick={() => handleKick(idx as 1|2, false)}
                  className={`flex-[2] py-4 rounded-2xl font-black transition-all text-xs uppercase tracking-widest shadow-lg ${isMyTurn ? 'bg-red-600 text-white hover:bg-red-700 hover:scale-105 active:scale-95' : 'bg-gray-100 text-gray-300'}`}
                 >
                   Miss
                 </button>
                 <button 
                  onClick={() => removeLastKick(idx as 1|2)}
                  className="flex-1 py-4 bg-gray-100 text-gray-400 rounded-2xl font-black hover:bg-gray-200 transition-all text-[10px] uppercase tracking-widest"
                 >
                   Undo
                 </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PenaltyShootout;
