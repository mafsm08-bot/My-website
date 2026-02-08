
import React from 'react';
import { MatchEvent, Team } from '../types';
import { Target, Square, UserPlus } from 'lucide-react';

interface Props {
  events: MatchEvent[];
  team1: Team;
  team2: Team;
}

const Timeline: React.FC<Props> = ({ events, team1, team2 }) => {
  const sortedEvents = [...events].sort((a, b) => b.minute - a.minute);

  if (events.length === 0) {
    return (
      <div className="bg-white rounded-[2rem] p-20 border border-gray-100 text-center flex flex-col items-center">
        <Target size={48} className="text-gray-100 mb-4" />
        <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Waiting for match events...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 p-8 md:p-12 relative overflow-hidden">
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-100 -translate-x-1/2 hidden md:block"></div>
      
      <div className="space-y-12 relative">
        {sortedEvents.map((event) => {
          const team = event.teamIndex === 1 ? team1 : team2;
          const isLeft = event.teamIndex === 1;

          return (
            <div key={event.id} className={`flex flex-col md:flex-row items-center gap-8 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
              <div className={`flex-1 flex flex-col ${isLeft ? 'md:items-end' : 'md:items-start'} w-full`}>
                <div className={`flex items-center gap-3 ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}>
                  <img src={team.logo} className="w-8 h-8 rounded-full border shadow-sm" alt="" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">{team.name}</span>
                </div>
                <h4 className="text-xl font-black text-gray-900 mt-1">
                  {event.type === 'GOAL' && 'GOAL!'}
                  {event.type === 'YELLOW_CARD' && 'Yellow Card'}
                  {event.type === 'RED_CARD' && 'Red Card'}
                </h4>
                {event.player && <p className="text-sm font-medium text-gray-500">{event.player}</p>}
              </div>

              <div className="relative z-10">
                <div className={`w-14 h-14 rounded-full flex items-center justify-center border-4 border-white shadow-xl ${
                  event.type === 'GOAL' ? 'bg-blue-600 text-white' : 
                  event.type === 'YELLOW_CARD' ? 'bg-yellow-400 text-white' : 
                  event.type === 'RED_CARD' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-400'
                }`}>
                  <span className="text-xs font-black">{event.minute}'</span>
                </div>
              </div>

              <div className="flex-1 w-full hidden md:block"></div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Timeline;
