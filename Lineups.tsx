
import React from 'react';
import { Player, Team } from '../types';
import { User } from 'lucide-react';

interface Props {
  team1: Team;
  team2: Team;
  lineup1: Player[];
  lineup2: Player[];
}

const Lineups: React.FC<Props> = ({ team1, team2, lineup1, lineup2 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {[1, 2].map((idx) => {
        const team = idx === 1 ? team1 : team2;
        const lineup = idx === 1 ? lineup1 : lineup2;

        return (
          <div key={idx} className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-8 border-b bg-gray-50/50 flex items-center gap-4">
              <img src={team.logo} className="w-12 h-12 rounded-full border shadow-sm" alt="" />
              <div>
                <h3 className="text-xl font-black text-gray-900 tracking-tight">{team.name}</h3>
                <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Starting XI</span>
              </div>
            </div>
            <div className="p-8 space-y-4">
              {lineup.length === 0 ? (
                <p className="text-center text-gray-300 italic text-sm py-10">No players listed yet.</p>
              ) : (
                lineup.map((player) => (
                  <div key={player.number} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-xs font-black text-gray-500">
                        {player.number}
                      </div>
                      <span className="font-bold text-gray-800">{player.name}</span>
                    </div>
                    <User size={14} className="text-gray-200" />
                  </div>
                ))
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Lineups;
