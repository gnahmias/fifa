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
  const withGames = standings.filter((r) => r.played > 0);

  const topScorer = withGames.length > 0 ? withGames.reduce((a, b) => (b.goalsFor > a.goalsFor ? b : a)) : null;
  const bestDef = withGames.length > 0 ? withGames.reduce((a, b) => (b.goalsAgainst < a.goalsAgainst ? b : a)) : null;

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-black text-white">Posiciones</h1>
          <p className="text-gray-400 text-sm mt-0.5">
            {total === 0 ? 'Sin fixture generado aún.' : `${played} de ${total} partidos jugados`}
          </p>
        </div>
        {tournament.status === 'finished' && (
          <span className="bg-yellow-500/20 border border-yellow-500 text-yellow-300 text-xs font-bold px-3 py-1 rounded-full">
            🏆 Torneo finalizado
          </span>
        )}
      </div>

      {tournament.participants.length === 0 ? (
        <div className="text-center py-16 space-y-3">
          <div className="text-4xl">📊</div>
          <h2 className="text-lg font-bold text-white">No hay participantes</h2>
          <p className="text-gray-400 text-sm">Primero agregá los jugadores del torneo.</p>
          <Link href="/participantes" className="inline-block bg-green-600 hover:bg-green-500 text-white font-bold px-5 py-2 rounded text-sm transition-colors">
            Ir a Participantes
          </Link>
        </div>
      ) : (
        <StandingsTable rows={standings} />
      )}

      {/* Legend */}
      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-600">
        <span>PJ = Jugados</span>
        <span>PG = Ganados</span>
        <span>PE = Empatados</span>
        <span>PP = Perdidos</span>
        <span>GF = Goles a favor</span>
        <span>GC = Goles en contra</span>
        <span>DG = Diferencia de gol</span>
        <span>PTS = Puntos</span>
      </div>

      {/* Highlights */}
      {withGames.length > 0 && (
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-4 space-y-3">
          <h2 className="font-bold text-white text-sm">Destacados</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {standings[0] && (
              <HighlightCard icon="🥇" label="Líder" value={standings[0].participant.name} sub={`${standings[0].points} puntos`} />
            )}
            {topScorer && (
              <HighlightCard icon="⚽" label="Máximo goleador" value={topScorer.participant.name} sub={`${topScorer.goalsFor} goles`} />
            )}
            {bestDef && (
              <HighlightCard icon="🛡️" label="Mejor defensa" value={bestDef.participant.name} sub={`${bestDef.goalsAgainst} en contra`} />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function HighlightCard({ icon, label, value, sub }: { icon: string; label: string; value: string; sub: string }) {
  return (
    <div className="bg-gray-900 rounded-lg p-3">
      <div className="text-xl mb-1">{icon}</div>
      <div className="text-xs text-gray-400">{label}</div>
      <div className="font-bold text-white text-sm mt-0.5 truncate">{value}</div>
      <div className="text-xs text-gray-500">{sub}</div>
    </div>
  );
}
