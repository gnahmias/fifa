'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { loadTournament } from '@/lib/storage';
import { calcStandings } from '@/lib/tournament';
import { Tournament, StandingRow } from '@/lib/types';
import StandingsTable from '@/components/StandingsTable';

export default function PosicionesPage() {
  const [tournament, setTournament] = useState<Tournament | null>(null);
  const [standings, setStandings] = useState<StandingRow[]>([]);

  useEffect(() => {
    const t = loadTournament();
    setTournament(t);
    setStandings(calcStandings(t.participants, t.matches));
  }, []);

  if (!tournament) return null;

  const played = tournament.matches.filter((m) => m.played).length;
  const total = tournament.matches.length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-black text-white">Tabla de Posiciones</h1>
          <p className="text-gray-400 text-sm mt-1">
            {total === 0
              ? 'Todavía no hay fixture generado.'
              : `${played} de ${total} partidos jugados`}
          </p>
        </div>
        {tournament.status === 'finished' && (
          <span className="bg-yellow-500/20 border border-yellow-500 text-yellow-300 text-sm font-bold px-3 py-1 rounded-full">
            🏆 Torneo finalizado
          </span>
        )}
      </div>

      {tournament.participants.length === 0 ? (
        <div className="text-center py-20 space-y-4">
          <div className="text-5xl">📊</div>
          <h2 className="text-xl font-bold text-white">No hay participantes</h2>
          <p className="text-gray-400">Primero agregá los jugadores del torneo.</p>
          <Link href="/participantes" className="inline-block bg-green-600 hover:bg-green-500 text-white font-bold px-5 py-2 rounded transition-colors">
            Ir a Participantes
          </Link>
        </div>
      ) : (
        <StandingsTable rows={standings} />
      )}

      {/* Legend */}
      <div className="flex flex-wrap gap-4 text-xs text-gray-500">
        <span title="Partidos jugados">PJ = Partidos jugados</span>
        <span title="Partidos ganados">PG = Ganados</span>
        <span title="Partidos empatados">PE = Empatados</span>
        <span title="Partidos perdidos">PP = Perdidos</span>
        <span title="Goles a favor">GF = Goles a favor</span>
        <span title="Goles en contra">GC = Goles en contra</span>
        <span title="Diferencia de gol">DG = Diferencia de gol</span>
        <span title="Puntos">PTS = Puntos</span>
      </div>

      {played > 0 && standings.length > 0 && (
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-4">
          <h2 className="font-bold text-white mb-3">Destacados</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <HighlightCard
              label="Máximo goleador"
              icon="⚽"
              value={standings.reduce((a, b) => (b.goalsFor > a.goalsFor ? b : a)).participant.name}
              sub={`${standings.reduce((a, b) => (b.goalsFor > a.goalsFor ? b : a)).goalsFor} goles`}
            />
            <HighlightCard
              label="Mejor defensa"
              icon="🛡️"
              value={standings.filter(r => r.played > 0).reduce((a, b) => (b.goalsAgainst < a.goalsAgainst ? b : a)).participant.name}
              sub={`${standings.filter(r => r.played > 0).reduce((a, b) => (b.goalsAgainst < a.goalsAgainst ? b : a)).goalsAgainst} goles en contra`}
            />
            <HighlightCard
              label="Mejor diferencia de gol"
              icon="📈"
              value={standings[0].participant.name}
              sub={`+${standings[0].goalDiff > 0 ? standings[0].goalDiff : standings[0].goalDiff} DG`}
            />
          </div>
        </div>
      )}
    </div>
  );
}

function HighlightCard({ label, icon, value, sub }: { label: string; icon: string; value: string; sub: string }) {
  return (
    <div className="bg-gray-900 rounded-lg p-3">
      <div className="text-xl mb-1">{icon}</div>
      <div className="text-xs text-gray-400">{label}</div>
      <div className="font-bold text-white text-sm mt-0.5">{value}</div>
      <div className="text-xs text-gray-500">{sub}</div>
    </div>
  );
}
