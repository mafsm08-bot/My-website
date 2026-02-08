
import React, { useState } from 'react';
import { MatchState, Team, MatchStats, MatchEvent } from '../types';
import { Settings, Plus, Minus, Image as ImageIcon, MapPin, Globe, Activity, AlertCircle } from 'lucide-react';

interface Props {
  state: MatchState;
  setState: React.Dispatch<React.SetStateAction<MatchState>>;
  stats: MatchStats;
  setStats: React.Dispatch<React.SetStateAction<MatchStats>>;
  onGoal: (teamIndex: 1 | 2) => void;
  onUpdateTeam: (teamIndex: 1 | 2, updates: Partial<Team>) => void;
  onAddEvent: (type: MatchEvent['type'], teamIndex: 1 | 2) => void;
}

const ControlPanel: React.FC<Props> = ({ state, setState, stats, setStats, onGoal, onUpdateTeam, onAddEvent }) => {
  const handleLogoUpload = (teamIndex: 1 | 2, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onUpdateTeam(teamIndex, { logo: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const adjustScore = (teamIndex: 1 | 2, amount: number) => {
    const teamKey = teamIndex === 1 ? 'team1' : 'team2';
    const currentScore = state[teamKey].score;
    const newScore = Math.max(0, currentScore + amount);
    
    if (amount > 0) {
      onGoal(teamIndex);
    } else {
      onUpdateTeam(teamIndex, { score: newScore });
    }
  };

  const adjustStat = (stat: keyof MatchStats, teamIndex: 0 | 1, amount: number) => {
    setStats(prev => {
      const newVals = [...prev[stat]] as [number, number];
      newVals[teamIndex] = Math.max(0, newVals[teamIndex] + amount);
      if (stat === 'possession') {
        newVals[teamIndex === 0 ? 1 : 0] = 100 - newVals[teamIndex];
      }
      return { ...prev, [stat]: newVals };
    });
  };

  return (
    <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 p-8 space-y-12">
      <div className="flex items-center gap-3 border-b pb-4">
        <Settings className="text-gray-400" />
        <h2 className="text-xl font-bold text-gray-800">Match Customizer</h2>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
        {/* General Info */}
        <div className="space-y-8">
          <div>
            <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Venue & Competition</h3>
            <div className="space-y-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-gray-500 flex items-center gap-1 uppercase">
                  <Globe size={12} /> Competition
                </label>
                <input 
                  type="text" 
                  value={state.competition}
                  onChange={(e) => setState(prev => ({ ...prev, competition: e.target.value }))}
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-gray-500 flex items-center gap-1 uppercase">
                  <MapPin size={12} /> Stadium
                </label>
                <input 
                  type="text" 
                  value={state.stadium}
                  onChange={(e) => setState(prev => ({ ...prev, stadium: e.target.value }))}
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium"
                />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
              <Activity size={14} /> Live Stats
            </h3>
            <div className="space-y-4 bg-gray-50 p-6 rounded-2xl border border-gray-100">
               {(['possession', 'shots', 'corners'] as const).map((stat) => (
                 <div key={stat} className="flex flex-col gap-2">
                   <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">{stat}</span>
                   <div className="flex items-center justify-between gap-4">
                     <div className="flex items-center gap-2">
                        <button onClick={() => adjustStat(stat, 0, -1)} className="p-1 rounded bg-white border"><Minus size={12} /></button>
                        <span className="text-xs font-bold w-6 text-center">{stats[stat][0]}</span>
                        <button onClick={() => adjustStat(stat, 0, 1)} className="p-1 rounded bg-white border"><Plus size={12} /></button>
                     </div>
                     <div className="flex items-center gap-2">
                        <button onClick={() => adjustStat(stat, 1, -1)} className="p-1 rounded bg-white border"><Minus size={12} /></button>
                        <span className="text-xs font-bold w-6 text-center">{stats[stat][1]}</span>
                        <button onClick={() => adjustStat(stat, 1, 1)} className="p-1 rounded bg-white border"><Plus size={12} /></button>
                     </div>
                   </div>
                 </div>
               ))}
            </div>
          </div>
        </div>

        {/* Team Customization */}
        <div className="space-y-8">
          {[1, 2].map((idx) => {
            const team = idx === 1 ? state.team1 : state.team2;
            return (
              <div key={idx} className="p-6 rounded-3xl bg-gray-50 border border-gray-100 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Team {idx}</h3>
                  <div className="flex gap-2">
                    <button onClick={() => onAddEvent('YELLOW_CARD', idx as 1|2)} className="p-2 bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200 transition-colors" title="Yellow Card">
                      <AlertCircle size={14} />
                    </button>
                    <button onClick={() => onAddEvent('RED_CARD', idx as 1|2)} className="p-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors" title="Red Card">
                      <AlertCircle size={14} />
                    </button>
                  </div>
                </div>
                
                <input 
                  type="text" 
                  value={team.name}
                  onChange={(e) => onUpdateTeam(idx as 1|2, { name: e.target.value })}
                  className="w-full px-4 py-2 text-sm bg-white border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 font-bold"
                />

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                      <img src={team.logo} className="w-10 h-10 rounded-full object-cover border bg-white" alt="" />
                      <label className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                         <ImageIcon size={14} /> Upload
                         <input type="file" className="hidden" accept="image/*" onChange={(e) => handleLogoUpload(idx as 1|2, e)} />
                      </label>
                  </div>
                  <div className="flex items-center gap-3">
                     <button onClick={() => adjustScore(idx as 1|2, -1)} className="p-2 rounded-lg bg-white border hover:bg-red-50 hover:text-red-600 transition-colors"><Minus size={14} /></button>
                     <span className="text-xl font-black text-gray-900">{team.score}</span>
                     <button onClick={() => adjustScore(idx as 1|2, 1)} className="p-2 rounded-lg bg-white border hover:bg-green-50 hover:text-green-600 transition-colors"><Plus size={14} /></button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="pt-8 border-t flex flex-wrap gap-6 items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Match Minute</label>
              <div className="flex items-center gap-4">
                 <input 
                    type="range" 
                    min="0" max="120" 
                    value={state.minute} 
                    onChange={(e) => setState(prev => ({ ...prev, minute: parseInt(e.target.value) }))}
                    className="w-48 h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                 />
                 <span className="text-sm font-mono font-black bg-gray-900 text-white px-3 py-1 rounded-md">{state.minute}'</span>
              </div>
            </div>
            <button 
                onClick={() => setState(prev => ({ ...prev, isTimerRunning: !prev.isTimerRunning }))}
                className={`mt-4 px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all shadow-sm ${state.isTimerRunning ? 'bg-orange-50 text-orange-600 hover:bg-orange-100' : 'bg-green-50 text-green-600 hover:bg-green-100'}`}
            >
                {state.isTimerRunning ? 'Stop Clock' : 'Start Clock'}
            </button>
          </div>
          
          <button 
            onClick={() => window.location.reload()}
            className="text-[10px] text-gray-400 hover:text-red-500 font-black uppercase tracking-[0.2em] transition-colors"
          >
            Reset Entire Match
          </button>
      </div>
    </div>
  );
};

export default ControlPanel;
