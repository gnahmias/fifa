'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { loadTournament, saveTournament, resetTournament } from '@/lib/storage';
import { calcStandings } from '@/lib/tournament';
import { Tournament } from '@/lib/types';

export default function HomePage() {
  const [tournament, setTournament] = useState<Tournament | null>(null);
  const [editingName, setEditingName] = useState(false);
  const [nameInput, setNameInput] = useState('');

  useEffect(() => {
    const t = loadTournament();
    setTournament(t);
    setNameInput(t.name);
  }, []);

  if (!tournament) return null;

  const standings = calcStandings(tournament.participants, tournament.matches);
  const played = tournament.matches.filter((m) => m.played).length;
  const total = tournament.matches.length;
  const topScorer = standings.length > 0
    ? standings.reduce((a, b) => (b.goalsFor > a.goalsFor ? b : a))
    : null;

  const saveName = () => {
    const updated = { ...tournament, name: nameInput.trim() || 'Torneo FIFA' };
    saveTournament(updated);
    setTournament(updated);
    setEditingName(false);
  };

  const handleReset = () => {
    if (confirm('¿Seguro que querés reiniciar el torneo? Se borrarán todos los datos.')) {
      resetTournament();
      const t = loadTournament();
      setTournament(t);
      setNameInput(t.name);
    }
  };

  const leader = standings[0];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="min-w-0">
          {editingName ? (
            <div className="flex items-center gap-2 flex-wrap">
              <input
                autoFocus
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') saveName(); if (e.key === 'Escape') setEditingName(false); }}
                className="text-xl font-black bg-gray-800 border border-gray-600 rounded px-2 py-1 text-white focus:outline-none focus:border-green-500 w-full sm:w-auto"
              />
              <button onClick={saveName} className="bg-green-600 hover:bg-green-500 text-white px-3 py-1 rounded text-sm font-medium">OK</button>
            </div>
          ) : (
            <h1
              className="text-2xl sm:text-3xl font-black text-white cursor-pointer hover:text-green-400 transition-colors break-words"
              onClick={() => setEditingName(true)}
              title="Tocá para editar"
            >
              {tournament.name} <span className="text-base text-gray-500">✏️</span>
            </h1>
          )}
          <p className="text-gray-400 text-sm mt-1">Todos contra todos</p>
        </div>
        <button
          onClick={handleReset}
          className="text-xs text-red-400 hover:text-red-300 border border-red-800 hover:border-red-600 rounded px-3 py-1.5 transition-colors shrink-0"
        >
          Reiniciar
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <StatCard label="Participantes" value={tournament.participants.length} icon="👥" />
        <StatCard label="Jugados" value={`${played}/${total}`} icon="⚽" />
        <StatCard label="Pendientes" value={total - played} icon="📅" />
        <StatCard
          label="Goleador"
          value={topScorer ? topScorer.participant.name : '—'}
          sub={topScorer ? `${topScorer.goalsFor} goles` : ''}
          icon="🥇"
          small
        />
      </div>

      {/* Leader card */}
      {leader && played > 0 && (
        <div className="bg-gradient-to-r from-yellow-900/40 to-gray-800 border border-yellow-700/40 rounded-xl p-4 flex items-center gap-3">
          <span className="text-3xl shrink-0">🏆</span>
          <div className="flex items-center gap-3 min-w-0">
            {leader.participant.teamBadge && (
              <Image src={leader.participant.teamBadge} alt={leader.participant.teamName} width={40} height={40} className="object-contain shrink-0" unoptimized />
            )}
            <div className="min-w-0">
              <div className="text-xs text-yellow-400 font-bold uppercase tracking-wide">Líder</div>
              <div className="text-lg font-black text-white truncate">{leader.participant.name}</div>
              <div className="text-xs text-gray-400">{leader.points} pts · {leader.won}G {leader.drawn}E {leader.lost}P · {leader.goalsFor} goles</div>
            </div>
          </div>
        </div>
      )}

      {/* Progress bar (if fixture exists) */}
      {total > 0 && (
        <div>
          <div className="flex justify-between text-xs text-gray-400 mb-1">
            <span>Progreso del torneo</span>
            <span>{Math.round((played / total) * 100)}%</span>
          </div>
          <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
            <div className="h-full bg-green-500 rounded-full transition-all" style={{ width: `${(played / total) * 100}%` }} />
          </div>
        </div>
      )}

      {/* Quick links */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <QuickLink href="/participantes" title="Participantes" desc="Jugadores y equipos" icon="👥" />
        <QuickLink href="/fixture" title="Fixture" desc="Cargar resultados" icon="📋" />
        <QuickLink href="/posiciones" title="Posiciones" desc="Tabla del torneo" icon="📊" />
      </div>

      {/* Guide */}
      {tournament.participants.length === 0 && (
        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-4">
          <h2 className="font-bold text-white mb-2 text-sm">¿Cómo empezar?</h2>
          <ol className="space-y-1.5 text-sm text-gray-300 list-decimal list-inside">
            <li>Ir a <strong className="text-green-400">Participantes</strong> y agregar a todos los jugadores.</li>
            <li>Opcionalmente asignar el equipo a cada jugador (podés hacerlo después).</li>
            <li>Generar el fixture desde la misma sección.</li>
            <li>Cargar resultados en <strong className="text-green-400">Fixture</strong>.</li>
            <li>Ver la tabla en <strong className="text-green-400">Posiciones</strong>.</li>
          </ol>
        </div>
      )}
    </div>
  );
}

function StatCard({ label, value, icon, small, sub }: {
  label: string; value: string | number; icon: string; small?: boolean; sub?: string;
}) {
  return (
    <div className="bg-gray-800 border border-gray-700 rounded-xl p-3 flex flex-col gap-1">
      <span className="text-xl">{icon}</span>
      <span className={`font-black text-white leading-tight ${small ? 'text-sm' : 'text-2xl'}`}>{value}</span>
      {sub && <span className="text-xs text-gray-500">{sub}</span>}
      <span className="text-xs text-gray-400">{label}</span>
    </div>
  );
}

function QuickLink({ href, title, desc, icon }: { href: string; title: string; desc: string; icon: string }) {
  return (
    <Link href={href} className="group bg-gray-800 border border-gray-700 hover:border-green-600 active:bg-gray-700 rounded-xl p-4 flex gap-3 items-center transition-colors">
      <span className="text-2xl shrink-0">{icon}</span>
      <div>
        <div className="font-bold text-white group-hover:text-green-400 transition-colors text-sm">{title}</div>
        <div className="text-xs text-gray-400">{desc}</div>
      </div>
    </Link>
  );
}
