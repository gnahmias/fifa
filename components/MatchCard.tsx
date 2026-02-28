'use client';

import { useState } from 'react';
import { Match, Participant } from '@/lib/types';

function TeamBadge({ badge, name, size = 36 }: { badge: string; name: string; size?: number }) {
  const [imgOk, setImgOk] = useState(true);
  const initials = name.split(' ').map((w) => w[0]).join('').toUpperCase().slice(0, 2);
  const colors = ['#2563eb','#16a34a','#dc2626','#9333ea','#d97706','#0891b2','#be185d'];
  const color = colors[(name.charCodeAt(0) || 0) % colors.length];
  if (!badge) return <div style={{ width: size, height: size, borderRadius: '50%', background: color, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: size * 0.35, fontWeight: 700, color: '#fff' }}>{initials || '?'}</div>;
  if (imgOk) return <img src={badge} alt={name} width={size} height={size} style={{ width: size, height: size, objectFit: 'contain', flexShrink: 0 }} onError={() => setImgOk(false)} />; // eslint-disable-line @next/next/no-img-element
  return <div style={{ width: size, height: size, borderRadius: '50%', background: color, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: size * 0.35, fontWeight: 700, color: '#fff' }}>{initials || '?'}</div>;
}

interface Props {
  match: Match;
  participants: Participant[];
  onSave: (matchId: string, homeGoals: number, awayGoals: number) => void;
}

export default function MatchCard({ match, participants, onSave }: Props) {
  const home = participants.find((p) => p.id === match.homeId);
  const away = participants.find((p) => p.id === match.awayId);
  const [editing, setEditing] = useState(false);
  const [hg, setHg] = useState(match.homeGoals?.toString() ?? '');
  const [ag, setAg] = useState(match.awayGoals?.toString() ?? '');

  if (!home || !away) return null;

  const save = () => {
    const h = parseInt(hg, 10), a = parseInt(ag, 10);
    if (isNaN(h) || isNaN(a) || h < 0 || a < 0) return;
    onSave(match.id, h, a);
    setEditing(false);
  };

  const outcomeClass = (side: 'home' | 'away') => {
    if (!match.played) return 'text-white';
    if (match.homeGoals === match.awayGoals) return 'text-yellow-400';
    const won = side === 'home' ? match.homeGoals! > match.awayGoals! : match.awayGoals! > match.homeGoals!;
    return won ? 'text-green-400' : 'text-gray-400';
  };

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-3">
      <div className="flex items-center gap-2">
        <div className={`flex-1 flex flex-col items-center gap-1 ${outcomeClass('home')}`}>
          <TeamBadge badge={home.teamBadge} name={home.teamName || home.name} size={36} />
          <span className="text-xs font-bold text-center leading-tight line-clamp-2">{home.name}</span>
          {home.teamName && <span className="text-xs text-gray-500 text-center line-clamp-1">{home.teamName}</span>}
        </div>

        <div className="flex flex-col items-center gap-1.5 min-w-[80px]">
          {editing ? (
            <div className="flex items-center gap-1">
              <input type="number" min={0} max={99} value={hg} onChange={(e) => setHg(e.target.value)}
                className="w-10 text-center bg-gray-700 border border-gray-600 rounded text-white text-sm py-1 focus:outline-none focus:border-green-500" />
              <span className="text-gray-400 text-sm">-</span>
              <input type="number" min={0} max={99} value={ag} onChange={(e) => setAg(e.target.value)}
                className="w-10 text-center bg-gray-700 border border-gray-600 rounded text-white text-sm py-1 focus:outline-none focus:border-green-500" />
            </div>
          ) : (
            <span className={`text-lg font-black ${match.played ? 'text-white' : 'text-gray-600'}`}>
              {match.played ? `${match.homeGoals} - ${match.awayGoals}` : 'vs'}
            </span>
          )}
          {editing ? (
            <div className="flex gap-1">
              <button onClick={save} className="text-xs bg-green-600 hover:bg-green-500 text-white px-2 py-0.5 rounded font-medium">✓</button>
              <button onClick={() => { setEditing(false); setHg(match.homeGoals?.toString() ?? ''); setAg(match.awayGoals?.toString() ?? ''); }} className="text-xs bg-gray-600 hover:bg-gray-500 text-white px-2 py-0.5 rounded">✕</button>
            </div>
          ) : (
            <button onClick={() => { setEditing(true); setHg(match.homeGoals?.toString() ?? ''); setAg(match.awayGoals?.toString() ?? ''); }}
              className={`text-xs font-semibold px-3 py-1 rounded transition-colors ${match.played ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' : 'bg-blue-700 hover:bg-blue-600 text-white'}`}>
              {match.played ? 'Editar' : 'Cargar'}
            </button>
          )}
        </div>

        <div className={`flex-1 flex flex-col items-center gap-1 ${outcomeClass('away')}`}>
          <TeamBadge badge={away.teamBadge} name={away.teamName || away.name} size={36} />
          <span className="text-xs font-bold text-center leading-tight line-clamp-2">{away.name}</span>
          {away.teamName && <span className="text-xs text-gray-500 text-center line-clamp-1">{away.teamName}</span>}
        </div>
      </div>
    </div>
  );
}
