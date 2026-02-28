'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { v4 as uuid } from 'uuid';
import { loadTournament, saveTournament } from '@/lib/storage';
import { generateFixture } from '@/lib/tournament';
import { Participant, Tournament } from '@/lib/types';
import TeamSearch from '@/components/TeamSearch';

export default function ParticipantesPage() {
  const [tournament, setTournament] = useState<Tournament | null>(null);
  const [playerName, setPlayerName] = useState('');
  const [selectedTeam, setSelectedTeam] = useState<{ idTeam: string; strTeam: string; strTeamBadge: string } | null>(null);
  const [error, setError] = useState('');
  const [fixtureGenerated, setFixtureGenerated] = useState(false);

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
    if (!selectedTeam?.strTeam) { setError('Elegí un equipo.'); return; }
    if (tournament.participants.some((p) => p.name.toLowerCase() === name.toLowerCase())) {
      setError('Ya existe un participante con ese nombre.'); return;
    }

    const participant: Participant = {
      id: uuid(),
      name,
      teamId: selectedTeam.idTeam,
      teamName: selectedTeam.strTeam,
      teamBadge: selectedTeam.strTeamBadge,
    };

    const updated = {
      ...tournament,
      participants: [...tournament.participants, participant],
    };
    save(updated);
    setPlayerName('');
    setSelectedTeam(null);
    setFixtureGenerated(false);
  };

  const removeParticipant = (id: string) => {
    if (tournament.matches.length > 0) {
      if (!confirm('Si eliminás un participante, el fixture actual se borrará. ¿Continuar?')) return;
    }
    const updated = {
      ...tournament,
      participants: tournament.participants.filter((p) => p.id !== id),
      matches: [],
      status: 'setup' as const,
    };
    save(updated);
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
    const updated = { ...tournament, matches, status: 'active' as const };
    save(updated);
    setFixtureGenerated(true);
  };

  const hasFixture = tournament.matches.length > 0;
  const canGenerate = tournament.participants.length >= 2;

  return (
    <div className="space-y-8 max-w-2xl">
      <div>
        <h1 className="text-2xl font-black text-white">Participantes</h1>
        <p className="text-gray-400 text-sm mt-1">
          Agregá a los jugadores y el equipo que van a usar. Una vez que estén todos, generá el fixture.
        </p>
      </div>

      {/* Add form */}
      <div className="bg-gray-800 border border-gray-700 rounded-xl p-5 space-y-4">
        <h2 className="font-bold text-white">Agregar participante</h2>

        <div>
          <label className="block text-xs text-gray-400 mb-1">Nombre del jugador</label>
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
          <label className="block text-xs text-gray-400 mb-1">Equipo en FIFA</label>
          <TeamSearch
            onSelect={(team) => setSelectedTeam(team.strTeam ? team : null)}
            selected={selectedTeam ? { teamName: selectedTeam.strTeam, teamBadge: selectedTeam.strTeamBadge } : null}
          />
        </div>

        {error && <p className="text-red-400 text-sm">{error}</p>}

        <button
          onClick={addParticipant}
          className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-2 rounded transition-colors"
        >
          + Agregar participante
        </button>
      </div>

      {/* Participants list */}
      {tournament.participants.length > 0 && (
        <div className="space-y-3">
          <h2 className="font-bold text-white">
            Participantes ({tournament.participants.length})
          </h2>
          {tournament.participants.map((p, idx) => (
            <div
              key={p.id}
              className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 flex items-center gap-3"
            >
              <span className="text-gray-500 text-sm w-5 text-center">{idx + 1}</span>
              {p.teamBadge && (
                <Image src={p.teamBadge} alt={p.teamName} width={36} height={36} className="object-contain" unoptimized />
              )}
              <div className="flex-1">
                <div className="font-bold text-white">{p.name}</div>
                <div className="text-sm text-gray-400">{p.teamName}</div>
              </div>
              <button
                onClick={() => removeParticipant(p.id)}
                className="text-gray-500 hover:text-red-400 transition-colors text-sm px-2 py-1"
                title="Eliminar"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Generate fixture */}
      {canGenerate && (
        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-5 space-y-3">
          <div>
            <h2 className="font-bold text-white">Fixture</h2>
            <p className="text-sm text-gray-400 mt-0.5">
              Con {tournament.participants.length} participantes se generan{' '}
              <strong className="text-white">
                {tournament.participants.length % 2 === 0
                  ? (tournament.participants.length * (tournament.participants.length - 1)) / 2
                  : Math.floor((tournament.participants.length * (tournament.participants.length - 1)) / 2)}
              </strong>{' '}
              partidos en formato todos contra todos.
            </p>
          </div>

          {fixtureGenerated && (
            <div className="bg-green-900/40 border border-green-700 rounded px-3 py-2 text-sm text-green-300">
              ✓ Fixture generado. Ahora podés ir a la sección <strong>Fixture</strong> para cargar resultados.
            </div>
          )}

          {hasFixture && !fixtureGenerated && (
            <div className="bg-yellow-900/40 border border-yellow-700 rounded px-3 py-2 text-sm text-yellow-300">
              Ya existe un fixture con {tournament.matches.length} partidos.
            </div>
          )}

          <button
            onClick={handleGenerateFixture}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 rounded transition-colors"
          >
            {hasFixture ? '↺ Regenerar fixture' : '⚡ Generar fixture'}
          </button>
        </div>
      )}
    </div>
  );
}
