
import React from 'react';
import { TableGroup, TableRow } from '../types';
import { Plus, Trash2, Edit2, Layout } from 'lucide-react';

interface Props {
  groups: TableGroup[];
  onUpdate: (groups: TableGroup[]) => void;
}

const GroupTable: React.FC<Props> = ({ groups, onUpdate }) => {
  const addGroup = () => {
    const newGroup: TableGroup = {
      id: Math.random().toString(36).substr(2, 9),
      name: `Group ${String.fromCharCode(65 + groups.length)}`,
      rows: []
    };
    onUpdate([...groups, newGroup]);
  };

  const removeGroup = (groupId: string) => {
    onUpdate(groups.filter(g => g.id !== groupId));
  };

  const updateGroupName = (groupId: string, name: string) => {
    onUpdate(groups.map(g => g.id === groupId ? { ...g, name } : g));
  };

  const addRow = (groupId: string) => {
    onUpdate(groups.map(g => {
      if (g.id === groupId) {
        const newRow: TableRow = {
          id: Math.random().toString(36).substr(2, 9),
          teamName: 'New Team',
          played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, points: 0
        };
        return { ...g, rows: [...g.rows, newRow] };
      }
      return g;
    }));
  };

  const removeRow = (groupId: string, rowId: string) => {
    onUpdate(groups.map(g => g.id === groupId ? { ...g, rows: g.rows.filter(r => r.id !== rowId) } : g));
  };

  const handleRowChange = (groupId: string, rowId: string, field: keyof TableRow, value: string | number) => {
    onUpdate(groups.map(g => {
      if (g.id === groupId) {
        return {
          ...g,
          rows: g.rows.map(r => r.id === rowId ? { ...r, [field]: value } : r)
        };
      }
      return g;
    }));
  };

  return (
    <div className="space-y-12 pb-20">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tighter">Standings Manager</h2>
        <button 
          onClick={addGroup}
          className="flex items-center gap-2 px-6 py-2.5 bg-gray-900 text-white text-xs font-black uppercase tracking-widest rounded-full hover:bg-black transition-all hover:scale-105 shadow-xl"
        >
          <Plus size={16} /> Add New Group
        </button>
      </div>

      {groups.length === 0 && (
        <div className="bg-white rounded-3xl p-20 border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-center">
          <Layout size={48} className="text-gray-200 mb-4" />
          <p className="text-gray-400 font-medium">No tables created yet. Start by adding a new group.</p>
        </div>
      )}

      {groups.map((group) => (
        <div key={group.id} className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden group/card transition-all hover:shadow-md">
          <div className="p-6 border-b flex justify-between items-center bg-gray-50/30">
            <div className="flex items-center gap-3">
              <input 
                type="text" 
                value={group.name}
                onChange={(e) => updateGroupName(group.id, e.target.value)}
                className="bg-transparent border-none text-xl font-black text-gray-900 focus:ring-0 w-auto min-w-[200px]"
                placeholder="Table Name"
              />
              <Edit2 size={14} className="text-gray-300" />
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => addRow(group.id)}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                title="Add Team"
              >
                <Plus size={20} />
              </button>
              <button 
                onClick={() => removeGroup(group.id)}
                className="p-2 text-gray-300 hover:text-red-500 rounded-lg transition-colors"
                title="Delete Group"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50/50 text-gray-400 uppercase text-[9px] font-black tracking-[0.2em]">
                <tr>
                  <th className="px-6 py-4">#</th>
                  <th className="px-6 py-4">Team</th>
                  <th className="px-6 py-4 text-center">P</th>
                  <th className="px-6 py-4 text-center">W</th>
                  <th className="px-6 py-4 text-center">D</th>
                  <th className="px-6 py-4 text-center">L</th>
                  <th className="px-6 py-4 text-center">GD</th>
                  <th className="px-6 py-4 text-center">Pts</th>
                  <th className="px-6 py-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {group.rows.sort((a, b) => b.points - a.points || (b.gf - b.ga) - (a.gf - a.ga)).map((row, idx) => (
                  <tr key={row.id} className="hover:bg-gray-50/30 transition-colors">
                    <td className="px-6 py-4 font-black text-gray-300">{idx + 1}</td>
                    <td className="px-6 py-4">
                      <input 
                        type="text" 
                        value={row.teamName}
                        onChange={(e) => handleRowChange(group.id, row.id, 'teamName', e.target.value)}
                        className="bg-transparent border-none font-bold text-gray-800 focus:ring-0 w-full"
                      />
                    </td>
                    <td className="px-6 py-4 text-center">
                       <input type="number" value={row.played} onChange={(e) => handleRowChange(group.id, row.id, 'played', parseInt(e.target.value) || 0)} className="w-10 text-center bg-transparent focus:outline-none" />
                    </td>
                    <td className="px-6 py-4 text-center text-gray-500">
                       <input type="number" value={row.won} onChange={(e) => handleRowChange(group.id, row.id, 'won', parseInt(e.target.value) || 0)} className="w-10 text-center bg-transparent focus:outline-none" />
                    </td>
                    <td className="px-6 py-4 text-center text-gray-500">
                       <input type="number" value={row.drawn} onChange={(e) => handleRowChange(group.id, row.id, 'drawn', parseInt(e.target.value) || 0)} className="w-10 text-center bg-transparent focus:outline-none" />
                    </td>
                    <td className="px-6 py-4 text-center text-gray-500">
                       <input type="number" value={row.lost} onChange={(e) => handleRowChange(group.id, row.id, 'lost', parseInt(e.target.value) || 0)} className="w-10 text-center bg-transparent focus:outline-none" />
                    </td>
                    <td className="px-6 py-4 text-center font-bold text-gray-400">
                       {row.gf - row.ga}
                    </td>
                    <td className="px-6 py-4 text-center">
                       <input type="number" value={row.points} onChange={(e) => handleRowChange(group.id, row.id, 'points', parseInt(e.target.value) || 0)} className="w-12 text-center font-black text-blue-600 bg-transparent focus:outline-none" />
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button onClick={() => removeRow(group.id, row.id)} className="text-gray-200 hover:text-red-500 transition-colors">
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GroupTable;
