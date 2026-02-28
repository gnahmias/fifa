'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { loadTournament, saveTournament } from '@/lib/storage';
import { matchesByRound } from '@/lib/tournament';
import { Tournament } from '@/lib/types';
import MatchCard from '@/components/MatchCard';

export default function FixturePage() {
  const [tournament, setTournament] = useState<Tournament | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTournament().then((t) => { setTournament(t); setLoading(false); });
  }, []);

  if (loading) return <div className="text-gray-400 text-sm py-8 text-center">Cargando…</div>;
  if (!tournament) return null;

  const handleSave = async (matchId: string, homeGoals: number, awayGoals: number) => {
    const matches = tournament.matches.map((m) =>
      m.id === matchId ? { ...m, homeGoals, awayGoals, played: true } : m
    );
    const allPlayed = matches.every((m) => m.played);
    const updated: Tournament = { ...tournament, matches, status: allPlayed ? 'finished' : 'active' };
    setTournament(updated);
    await saveTournament(updated);
  };

  if (tournament.participants.length === 0) return <EmptyState icon="👥" title="No hay participantes" desc="Primero agregá los jugadores del torneo." linkHref="/participantes" linkLabel="Ir a Participantes" />;
  if (tournament.matches.length === 0) return <EmptyState icon="📋" title="No hay fixture generado" desc="Generá el fixture desde la sección de Participantes." linkHref="/participantes" linkLabel="Ir a Participantes" />;

  const rounds = matchesByRound(tournament.matches);
  const sortedRounds = Array.from(rounds.entries()).sort(([a], [b]) => a - b);
  const played = tournament.matches.filter((m) => m.played).length;
  const total = tournament.matches.length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-black text-white">Fixture</h1>
          <p className="text-gray-400 text-sm mt-1">{played} de {total} partidos jugados</p>
        </div>
        <div className="w-40 sm:w-48">
          <div className="flex justify-between text-xs text-gray-400 mb-1">
            <span>Progreso</span><span>{total > 0 ? Math.round((played / total) * 100) : 0}%</span>
          </div>
          <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
            <div className="h-full bg-green-500 rounded-full transition-all" style={{ width: total > 0 ? `${(played / total) * 100}%` : '0%' }} />
          </div>
        </div>
      </div>

      {tournament.status === 'finished' && (
        <div className="bg-green-900/40 border border-green-600 rounded-xl p-4 text-center">
          <span className="text-2xl">🏆</span>
          <p className="text-green-300 font-bold mt-1">¡Torneo finalizado!</p>
          <Link href="/posiciones" className="inline-block mt-2 text-sm text-green-400 hover:text-green-300 underline">Ver posiciones finales →</Link>
        </div>
      )}

      {sortedRounds.map(([round, matches]) => {
        const roundPlayed = matches.filter((m) => m.played).length;
        return (
          <div key={round} className="space-y-3">
            <div className="flex items-center gap-3">
              <h2 className="font-bold text-white">Fecha {round}</h2>
              <span className="text-xs text-gray-500">{roundPlayed}/{matches.length}</span>
              {roundPlayed === matches.length && (
                <span className="text-xs bg-green-900/50 text-green-400 border border-green-700 px-2 py-0.5 rounded-full">✓ Completa</span>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {matches.map((match) => (
                <MatchCard key={match.id} match={match} participants={tournament.participants} onSave={handleSave} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function EmptyState({ icon, title, desc, linkHref, linkLabel }: { icon: string; title: string; desc: string; linkHref: string; linkLabel: string }) {
  return (
    <div className="text-center py-20 space-y-4">
      <div className="text-5xl">{icon}</div>
      <h2 className="text-xl font-bold text-white">{title}</h2>
      <p className="text-gray-400">{desc}</p>
      <Link href={linkHref} className="inline-block bg-green-600 hover:bg-green-500 text-white font-bold px-5 py-2 rounded transition-colors">{linkLabel}</Link>
    </div>
  );
}
