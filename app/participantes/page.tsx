'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { v4 as uuid } from 'uuid';
import { loadTournament, saveTournament } from '@/lib/storage';
import { generateFixture } from '@/lib/tournament';
import { Participant, Tournament } from '@/lib/types';
import TeamSearch, { TeamResult } from '@/components/TeamSearch';

export default function ParticipantesPage() {
  const [tournament, setTournament] = useState<Tournament | null>(null);
  const [playerName, setPlayerName] = useState('');
  const [selectedTeam, setSelectedTeam] = useState<TeamResult | null>(null);
  const [error, setError] = useState('');
  const [fixtureMsg, setFixtureMsg] = useState('');
  // Which participant is currently being edited (team assignment)
  const [editingTeamFor, setEditingTeamFor] = useState<string | null>(null);

  useEffect(() => {
    setTournament(loadTournament());
  }, []);

  if (!tournament) return null;

  const save = (updated: Tournament) => {
    saveTournament(updated);
    setTournament(updated);
  };

  const addParticipant = () => {
    setError('');
    const name = playerName.trim();
    if (!name) { setError('Ingresá el nombre del jugador.'); return; }
    if (tournament.participants.some((p) => p.name.toLowerCase() === name.toLowerCase())) {
      setError('Ya existe un participante con ese nombre.'); return;
    }

    const participant: Participant = {
      id: uuid(),
      name,
      teamId: selectedTeam?.idTeam ?? '',
      teamName: selectedTeam?.strTeam ?? '',
      teamBadge: selectedTeam?.strTeamBadge ?? '',
    };

    save({ ...tournament, participants: [...tournament.participants, participant] });
    setPlayerName('');
    setSelectedTeam(null);
    setFixtureMsg('');
  };

  const removeParticipant = (id: string) => {
    if (tournament.matches.length > 0) {
      if (!confirm('Si eliminás un participante, el fixture actual se borrará. ¿Continuar?')) return;
    }
    save({
      ...tournament,
      participants: tournament.participants.filter((p) => p.id !== id),
      matches: [],
      status: 'setup',
    });
    setFixtureMsg('');
  };

  const assignTeam = (participantId: string, team: TeamResult) => {
    const participants = tournament.participants.map((p) =>
      p.id === participantId
        ? { ...p, teamId: team.idTeam, teamName: team.strTeam, teamBadge: team.strTeamBadge }
        : p
    );
    save({ ...tournament, participants });
    setEditingTeamFor(null);
  };

  const handleGenerateFixture = () => {
    if (tournament.participants.length < 2) {
      alert('Necesitás al menos 2 participantes para generar el fixture.');
      return;
    }
    if (tournament.matches.length > 0) {
      if (!confirm('Ya existe un fixture. ¿Querés regenerarlo? Se perderán los resultados cargados.')) return;
    }
    const matches = generateFixture(tournament.participants);
    save({ ...tournament, matches, status: 'active' });
    setFixtureMsg('ok');
  };

  const hasFixture = tournament.matches.length > 0;
  const canGenerate = tournament.participants.length >= 2;
  const totalMatches =
    tournament.participants.length >= 2
      ? (tournament.participants.length * (tournament.participants.length - 1)) / 2
      : 0;

  return (
    <div className="space-y-6 max-w-xl mx-auto">
      <div>
        <h1 className="text-2xl font-black text-white">Participantes</h1>
        <p className="text-gray-400 text-sm mt-1">
          Agregá jugadores. El equipo es opcional: podés asignarlo después.
        </p>
      </div>

      {/* Add form */}
      <div className="bg-gray-800 border border-gray-700 rounded-xl p-4 space-y-3">
        <h2 className="font-bold text-white text-sm">Agregar participante</h2>

        <div>
          <label className="block text-xs text-gray-400 mb-1">Nombre del jugador *</label>
          <input
            type="text"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') addParticipant(); }}
            placeholder="Nombre del jugador"
            className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white text-sm placeholder-gray-400 focus:outline-none focus:border-green-500"
          />
        </div>

        <div>
          <label className="block text-xs text-gray-400 mb-1">Equipo en FIFA (opcional)</label>
          <TeamSearch
            onSelect={(team) => setSelectedTeam(team.strTeam ? team : null)}
            selected={selectedTeam ? { teamName: selectedTeam.strTeam, teamBadge: selectedTeam.strTeamBadge } : null}
          />
        </div>

        {error && <p className="text-red-400 text-sm">{error}</p>}

        <button
          onClick={addParticipant}
          className="w-full bg-green-600 hover:bg-green-500 active:bg-green-700 text-white font-bold py-2.5 rounded transition-colors text-sm"
        >
          + Agregar
        </button>
      </div>

      {/* Participants list */}
      {tournament.participants.length > 0 && (
        <div className="space-y-2">
          <h2 className="font-bold text-white text-sm">
            Participantes ({tournament.participants.length})
          </h2>
          {tournament.participants.map((p, idx) => (
            <div key={p.id} className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden">
              <div className="px-3 py-3 flex items-center gap-3">
                <span className="text-gray-500 text-xs w-4 text-center shrink-0">{idx + 1}</span>

                {p.teamBadge ? (
                  <Image src={p.teamBadge} alt={p.teamName} width={32} height={32} className="object-contain shrink-0" unoptimized />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center shrink-0">
                    <span className="text-gray-400 text-xs">?</span>
                  </div>
                )}

                <div className="flex-1 min-w-0">
                  <div className="font-bold text-white text-sm truncate">{p.name}</div>
                  {p.teamName ? (
                    <div className="text-xs text-gray-400 truncate">{p.teamName}</div>
                  ) : (
                    <div className="text-xs text-yellow-500">Sin equipo asignado</div>
                  )}
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => setEditingTeamFor(editingTeamFor === p.id ? null : p.id)}
                    className="text-xs text-blue-400 hover:text-blue-300 px-2 py-1 rounded hover:bg-gray-700 transition-colors"
                    title="Asignar equipo"
                  >
                    {p.teamName ? '✏️' : '⚽ Equipo'}
                  </button>
                  <button
                    onClick={() => removeParticipant(p.id)}
                    className="text-gray-500 hover:text-red-400 transition-colors px-2 py-1 rounded hover:bg-gray-700"
                    title="Eliminar"
                  >
                    ✕
                  </button>
                </div>
              </div>

              {editingTeamFor === p.id && (
                <div className="px-3 pb-3 border-t border-gray-700 pt-2">
                  <TeamSearch
                    onSelect={(team) => team.strTeam ? assignTeam(p.id, team) : setEditingTeamFor(null)}
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
              Con {tournament.participants.length} participantes → <strong className="text-white">{totalMatches} partidos</strong> en formato todos contra todos.
            </p>
          </div>

          {fixtureMsg === 'ok' && (
            <div className="bg-green-900/40 border border-green-700 rounded px-3 py-2 text-sm text-green-300">
              ✓ Fixture generado. Ahora podés ir a <strong>Fixture</strong> para cargar resultados.
            </div>
          )}
          {hasFixture && fixtureMsg !== 'ok' && (
            <div className="bg-yellow-900/30 border border-yellow-700/50 rounded px-3 py-2 text-sm text-yellow-300">
              Ya existe un fixture con {tournament.matches.length} partidos.
            </div>
          )}

          <button
            onClick={handleGenerateFixture}
            className="w-full bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-bold py-2.5 rounded transition-colors text-sm"
          >
            {hasFixture ? '↺ Regenerar fixture' : '⚡ Generar fixture'}
          </button>
        </div>
      )}
    </div>
  );
}
