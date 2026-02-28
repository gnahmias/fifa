'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Match, Participant } from '@/lib/types';

interface Props {
  match: Match;
  participants: Participant[];
  onSave: (matchId: string, homeGoals: number, awayGoals: number) => void;
}

function findParticipant(participants: Participant[], id: string): Participant | undefined {
  return participants.find((p) => p.id === id);
}

export default function MatchCard({ match, participants, onSave }: Props) {
  const home = findParticipant(participants, match.homeId);
  const away = findParticipant(participants, match.awayId);

  const [editing, setEditing] = useState(false);
  const [hg, setHg] = useState(match.homeGoals?.toString() ?? '');
  const [ag, setAg] = useState(match.awayGoals?.toString() ?? '');

  if (!home || !away) return null;

  const handleSave = () => {
    const h = parseInt(hg, 10);
    const a = parseInt(ag, 10);
    if (isNaN(h) || isNaN(a) || h < 0 || a < 0) return;
    onSave(match.id, h, a);
    setEditing(false);
  };

  const resultLabel = match.played
    ? `${match.homeGoals} - ${match.awayGoals}`
    : 'Pendiente';

  const getOutcomeClass = (side: 'home' | 'away') => {
    if (!match.played) return '';
    if (match.homeGoals === match.awayGoals) return 'text-yellow-400';
    if (side === 'home' && match.homeGoals! > match.awayGoals!) return 'text-green-400';
    if (side === 'away' && match.awayGoals! > match.homeGoals!) return 'text-green-400';
    return 'text-red-400';
  };

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
      <div className="flex items-center gap-3">
        {/* Home */}
        <div className={`flex-1 flex flex-col items-center gap-1 ${getOutcomeClass('home')}`}>
          {home.teamBadge && (
            <Image src={home.teamBadge} alt={home.teamName} width={40} height={40} className="object-contain" unoptimized />
          )}
          <span className="text-xs font-bold text-center leading-tight">{home.name}</span>
          <span className="text-xs text-gray-400">{home.teamName}</span>
        </div>

        {/* Score / Edit */}
        <div className="flex flex-col items-center gap-2 min-w-[90px]">
          {editing ? (
            <div className="flex items-center gap-1">
              <input
                type="number"
                min={0}
                max={99}
                value={hg}
                onChange={(e) => setHg(e.target.value)}
                className="w-10 text-center bg-gray-700 border border-gray-600 rounded text-white text-sm py-1"
              />
              <span className="text-gray-400">-</span>
              <input
                type="number"
                min={0}
                max={99}
                value={ag}
                onChange={(e) => setAg(e.target.value)}
                className="w-10 text-center bg-gray-700 border border-gray-600 rounded text-white text-sm py-1"
              />
            </div>
          ) : (
            <span className={`text-lg font-black ${match.played ? 'text-white' : 'text-gray-500'}`}>
              {resultLabel}
            </span>
          )}

          {editing ? (
            <div className="flex gap-1">
              <button
                onClick={handleSave}
                className="text-xs bg-green-600 hover:bg-green-500 text-white px-2 py-0.5 rounded font-medium"
              >
                Guardar
              </button>
              <button
                onClick={() => { setEditing(false); setHg(match.homeGoals?.toString() ?? ''); setAg(match.awayGoals?.toString() ?? ''); }}
                className="text-xs bg-gray-600 hover:bg-gray-500 text-white px-2 py-0.5 rounded"
              >
                ✕
              </button>
            </div>
          ) : (
            <button
              onClick={() => { setEditing(true); setHg(match.homeGoals?.toString() ?? ''); setAg(match.awayGoals?.toString() ?? ''); }}
              className="text-xs bg-blue-700 hover:bg-blue-600 text-white px-3 py-0.5 rounded font-medium"
            >
              {match.played ? 'Editar' : 'Cargar'}
            </button>
          )}
        </div>

        {/* Away */}
        <div className={`flex-1 flex flex-col items-center gap-1 ${getOutcomeClass('away')}`}>
          {away.teamBadge && (
            <Image src={away.teamBadge} alt={away.teamName} width={40} height={40} className="object-contain" unoptimized />
          )}
          <span className="text-xs font-bold text-center leading-tight">{away.name}</span>
          <span className="text-xs text-gray-400">{away.teamName}</span>
        </div>
      </div>
    </div>
  );
}
