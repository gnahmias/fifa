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
  const topScorer = standings.reduce<{ name: string; goals: number } | null>((acc, r) => {
    if (!acc || r.goalsFor > acc.goals) return { name: r.participant.name, goals: r.goalsFor };
    return acc;
  }, null);

  const saveName = () => {
    const updated = { ...tournament, name: nameInput.trim() || 'Torneo FIFA' };
    saveTournament(updated);
    setTournament(updated);
    setEditingName(false);
  };

  const handleReset = () => {
    if (confirm('¿Seguro que querés reiniciar el torneo? Se borrarán todos los datos.')) {
      resetTournament();
      setTournament(loadTournament());
    }
  };

  const leader = standings[0];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          {editingName ? (
            <div className="flex items-center gap-2">
              <input
                autoFocus
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') saveName(); if (e.key === 'Escape') setEditingName(false); }}
                className="text-2xl font-black bg-gray-800 border border-gray-600 rounded px-2 py-1 text-white focus:outline-none focus:border-green-500"
              />
              <button onClick={saveName} className="bg-green-600 hover:bg-green-500 text-white px-3 py-1 rounded text-sm">OK</button>
            </div>
          ) : (
            <h1
              className="text-3xl font-black text-white cursor-pointer hover:text-green-400 transition-colors"
              title="Click para editar el nombre"
              onClick={() => setEditingName(true)}
            >
              {tournament.name} <span className="text-base text-gray-500">✏️</span>
            </h1>
          )}
          <p className="text-gray-400 mt-1">Torneo de FIFA entre amigos — todos contra todos</p>
        </div>
        <button
          onClick={handleReset}
          className="text-xs text-red-400 hover:text-red-300 border border-red-800 hover:border-red-600 rounded px-3 py-1.5 transition-colors"
        >
          Reiniciar torneo
        </button>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard label="Participantes" value={tournament.participants.length} icon="👥" />
        <StatCard label="Partidos jugados" value={`${played} / ${total}`} icon="⚽" />
        <StatCard label="Partidos restantes" value={total - played} icon="📅" />
        <StatCard label="Goleador líder" value={topScorer ? `${topScorer.name} (${topScorer.goals})` : '—'} icon="🥇" small />
      </div>

      {/* Leader */}
      {leader && (
        <div className="bg-gradient-to-r from-yellow-900/40 to-gray-800 border border-yellow-700/40 rounded-xl p-5 flex items-center gap-4">
          <span className="text-4xl">🏆</span>
          <div className="flex items-center gap-3">
            {leader.participant.teamBadge && (
              <Image src={leader.participant.teamBadge} alt={leader.participant.teamName} width={48} height={48} className="object-contain" unoptimized />
            )}
            <div>
              <div className="text-xs text-yellow-400 font-bold uppercase tracking-wide">Líder del torneo</div>
              <div className="text-xl font-black text-white">{leader.participant.name}</div>
              <div className="text-sm text-gray-400">{leader.participant.teamName} · {leader.points} pts · {leader.won}G {leader.drawn}E {leader.lost}P · {leader.goalsFor} goles</div>
            </div>
          </div>
        </div>
      )}

      {/* Quick links */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <QuickLink href="/participantes" title="Participantes" desc="Agregá jugadores y elegí equipos" icon="👥" />
        <QuickLink href="/fixture" title="Fixture" desc="Cargá resultados de los partidos" icon="📋" />
        <QuickLink href="/posiciones" title="Posiciones" desc="Tabla de posiciones del torneo" icon="📊" />
      </div>

      {/* Steps guide if setup */}
      {tournament.status === 'setup' && tournament.participants.length === 0 && (
        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-5">
          <h2 className="font-bold text-white mb-3">¿Cómo empezar?</h2>
          <ol className="space-y-2 text-sm text-gray-300 list-decimal list-inside">
            <li>Ir a <strong className="text-green-400">Participantes</strong> y agregar a todos los jugadores con su equipo.</li>
            <li>Una vez que estén todos, generar el fixture desde la misma sección.</li>
            <li>Ir a <strong className="text-green-400">Fixture</strong> para cargar los resultados de cada partido.</li>
            <li>Ver la evolución en <strong className="text-green-400">Posiciones</strong>.</li>
          </ol>
        </div>
      )}
    </div>
  );
}

function StatCard({ label, value, icon, small }: { label: string; value: string | number; icon: string; small?: boolean }) {
  return (
    <div className="bg-gray-800 border border-gray-700 rounded-xl p-4 flex flex-col gap-1">
      <span className="text-2xl">{icon}</span>
      <span className={`font-black text-white ${small ? 'text-sm' : 'text-2xl'}`}>{value}</span>
      <span className="text-xs text-gray-400">{label}</span>
    </div>
  );
}

function QuickLink({ href, title, desc, icon }: { href: string; title: string; desc: string; icon: string }) {
  return (
    <Link href={href} className="group bg-gray-800 border border-gray-700 hover:border-green-600 rounded-xl p-5 flex gap-3 items-start transition-colors">
      <span className="text-2xl mt-0.5">{icon}</span>
      <div>
        <div className="font-bold text-white group-hover:text-green-400 transition-colors">{title}</div>
        <div className="text-sm text-gray-400 mt-0.5">{desc}</div>
      </div>
    </Link>
  );
}
