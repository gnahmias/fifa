'use client';

import { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { loadTournament, saveTournament } from '@/lib/storage';
import { generateFixture } from '@/lib/tournament';
import { Participant, Tournament } from '@/lib/types';
import TeamSearch, { TeamResult } from '@/components/TeamSearch';

function TeamBadge({ badge, name, size = 32 }: { badge: string; name: string; size?: number }) {
  const [imgOk, setImgOk] = useState(true);
  const initials = name.split(' ').map((w) => w[0]).join('').toUpperCase().slice(0, 2);
  const colors = ['#2563eb','#16a34a','#dc2626','#9333ea','#d97706','#0891b2','#be185d'];
  const color = colors[(name.charCodeAt(0) || 0) % colors.length];

  if (!badge) {
    return (
      <div style={{ width: size, height: size, borderRadius: '50%', background: color, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: size * 0.35, fontWeight: 700, color: '#fff' }}>
        {initials || '?'}
      </div>
    );
  }
  if (imgOk) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={badge} alt={name} width={size} height={size} style={{ width: size, height: size, objectFit: 'contain', flexShrink: 0 }} onError={() => setImgOk(false)} />
    );
  }
  return (
    <div style={{ width: size, height: size, borderRadius: '50%', background: color, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: size * 0.35, fontWeight: 700, color: '#fff' }}>
      {initials || '?'}
    </div>
  );
}

export default function ParticipantesPage() {
  const [tournament, setTournament] = useState<Tournament | null>(null);
  const [loading, setLoading] = useState(true);
  const [playerName, setPlayerName] = useState('');
  const [selectedTeam, setSelectedTeam] = useState<TeamResult | null>(null);
  const [error, setError] = useState('');
  const [fixtureMsg, setFixtureMsg] = useState('');
  const [editingTeamFor, setEditingTeamFor] = useState<string | null>(null);

  useEffect(() => {
    loadTournament().then((t) => { setTournament(t); setLoading(false); });
  }, []);

  if (loading) return <div className="text-gray-400 text-sm py-8 text-center">Cargando…</div>;
  if (!tournament) return null;

  const save = async (updated: Tournament) => {
    setTournament(updated);
    await saveTournament(updated);
  };

  const addParticipant = async () => {
    setError('');
    const name = playerName.trim();
    if (!name) { setError('Ingresá el nombre del jugador.'); return; }
    if (tournament.participants.some((p) => p.name.toLowerCase() === name.toLowerCase())) {
      setError('Ya existe un participante con ese nombre.'); return;
    }
    const participant: Participant = {
      id: uuid(),
      name,
      teamId: selectedTeam?.id ?? '',
      teamName: selectedTeam?.name ?? '',
      teamBadge: selectedTeam?.badge ?? '',
    };
    await save({ ...tournament, participants: [...tournament.participants, participant] });
    setPlayerName('');
    setSelectedTeam(null);
    setFixtureMsg('');
  };

  const removeParticipant = async (id: string) => {
    if (tournament.matches.length > 0) {
      if (!confirm('Si eliminás un participante, el fixture actual se borrará. ¿Continuar?')) return;
    }
    await save({ ...tournament, participants: tournament.participants.filter((p) => p.id !== id), matches: [], status: 'setup' });
    setFixtureMsg('');
  };

  const assignTeam = async (participantId: string, team: TeamResult) => {
    const participants = tournament.participants.map((p) =>
      p.id === participantId ? { ...p, teamId: team.id, teamName: team.name, teamBadge: team.badge } : p
    );
    await save({ ...tournament, participants });
    setEditingTeamFor(null);
  };

  const handleGenerateFixture = async () => {
    if (tournament.participants.length < 2) { alert('Necesitás al menos 2 participantes.'); return; }
    if (tournament.matches.length > 0 && !confirm('Ya existe un fixture. ¿Regenerarlo? Se perderán los resultados.')) return;
    const matches = generateFixture(tournament.participants);
    await save({ ...tournament, matches, status: 'active' });
    setFixtureMsg('ok');
  };

  const hasFixture = tournament.matches.length > 0;
  const canGenerate = tournament.participants.length >= 2;
  const totalMatches = tournament.participants.length >= 2
    ? (tournament.participants.length * (tournament.participants.length - 1)) / 2 : 0;

  return (
    <div className="space-y-6 max-w-xl mx-auto">
      <div>
        <h1 className="text-2xl font-black text-white">Participantes</h1>
        <p className="text-gray-400 text-sm mt-1">El equipo es opcional — podés asignarlo después.</p>
      </div>

      {/* Add form */}
      <div className="bg-gray-800 border border-gray-700 rounded-xl p-4 space-y-3">
        <h2 className="font-bold text-white text-sm">Agregar participante</h2>
        <div>
          <label className="block text-xs text-gray-400 mb-1">Nombre *</label>
          <input
            type="text" value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') addParticipant(); }}
            placeholder="Nombre del jugador"
            className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white text-sm placeholder-gray-400 focus:outline-none focus:border-green-500"
          />
        </div>
        <div>
          <label className="block text-xs text-gray-400 mb-1">Equipo FIFA (opcional)</label>
          <TeamSearch
            onSelect={(team) => setSelectedTeam(team.name ? team : null)}
            selected={selectedTeam ? { teamName: selectedTeam.name, teamBadge: selectedTeam.badge } : null}
          />
        </div>
        {error && <p className="text-red-400 text-sm">{error}</p>}
        <button onClick={addParticipant} className="w-full bg-green-600 hover:bg-green-500 active:bg-green-700 text-white font-bold py-2.5 rounded text-sm transition-colors">
          + Agregar
        </button>
      </div>

      {/* Participants list */}
      {tournament.participants.length > 0 && (
        <div className="space-y-2">
          <h2 className="font-bold text-white text-sm">Participantes ({tournament.participants.length})</h2>
          {tournament.participants.map((p, idx) => (
            /* ⚠️ No overflow-hidden aquí — needed for dropdown to show */
            <div key={p.id} className="bg-gray-800 border border-gray-700 rounded-lg">
              <div className="px-3 py-3 flex items-center gap-3">
                <span className="text-gray-500 text-xs w-4 text-center shrink-0">{idx + 1}</span>
                <TeamBadge badge={p.teamBadge} name={p.teamName || p.name} size={32} />
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-white text-sm truncate">{p.name}</div>
                  {p.teamName
                    ? <div className="text-xs text-gray-400 truncate">{p.teamName}</div>
                    : <div className="text-xs text-yellow-500">Sin equipo asignado</div>
                  }
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => setEditingTeamFor(editingTeamFor === p.id ? null : p.id)}
                    className="text-xs text-blue-400 hover:text-blue-300 px-2 py-1 rounded hover:bg-gray-700 transition-colors"
                  >
                    {p.teamName ? '✏️' : '⚽ Equipo'}
                  </button>
                  <button onClick={() => removeParticipant(p.id)} className="text-gray-500 hover:text-red-400 px-2 py-1 rounded hover:bg-gray-700 transition-colors">
                    ✕
                  </button>
                </div>
              </div>

              {editingTeamFor === p.id && (
                <div className="px-3 pb-3 pt-2 border-t border-gray-700">
                  <TeamSearch
                    onSelect={(team) => team.name ? assignTeam(p.id, team) : setEditingTeamFor(null)}
                    selected={p.teamName ? { teamName: p.teamName, teamBadge: p.teamBadge } : null}
                    placeholder="Buscar equipo para este jugador…"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Generate fixture */}
      {canGenerate && (
        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-4 space-y-3">
          <div>
            <h2 className="font-bold text-white text-sm">Generar fixture</h2>
            <p className="text-xs text-gray-400 mt-1">
              {tournament.participants.length} jugadores → <strong className="text-white">{totalMatches} partidos</strong> (todos contra todos)
            </p>
          </div>
          {fixtureMsg === 'ok' && (
            <div className="bg-green-900/40 border border-green-700 rounded px-3 py-2 text-sm text-green-300">
              ✓ Fixture generado. Ir a <strong>Fixture</strong> para cargar resultados.
            </div>
          )}
          {hasFixture && fixtureMsg !== 'ok' && (
            <div className="bg-yellow-900/30 border border-yellow-700/50 rounded px-3 py-2 text-sm text-yellow-300">
              Ya existe un fixture ({tournament.matches.length} partidos).
            </div>
          )}
          <button onClick={handleGenerateFixture} className="w-full bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-bold py-2.5 rounded text-sm transition-colors">
            {hasFixture ? '↺ Regenerar fixture' : '⚡ Generar fixture'}
          </button>
        </div>
      )}
    </div>
  );
}
