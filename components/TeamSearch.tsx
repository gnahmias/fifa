'use client';

import { useState, useCallback, useRef } from 'react';
import Image from 'next/image';

interface Team {
  idTeam: string;
  strTeam: string;
  strTeamBadge: string;
  strLeague: string;
}

interface Props {
  onSelect: (team: Team) => void;
  selected?: { teamName: string; teamBadge: string } | null;
}

export default function TeamSearch({ onSelect, selected }: Props) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Team[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const search = useCallback(async (q: string) => {
    if (q.length < 2) { setResults([]); return; }
    setLoading(true);
    try {
      const res = await fetch(
        `https://www.thesportsdb.com/api/v1/json/3/searchteams.php?t=${encodeURIComponent(q)}`
      );
      const data = await res.json();
      const teams: Team[] = (data.teams ?? [])
        .filter((t: Team) => t.strTeamBadge)
        .slice(0, 8);
      setResults(teams);
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    setOpen(true);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => search(val), 350);
  };

  const pick = (team: Team) => {
    onSelect(team);
    setQuery('');
    setResults([]);
    setOpen(false);
  };

  return (
    <div className="relative">
      {selected && (
        <div className="flex items-center gap-2 mb-2 p-2 bg-gray-700 rounded">
          <Image
            src={selected.teamBadge}
            alt={selected.teamName}
            width={32}
            height={32}
            className="object-contain"
            unoptimized
          />
          <span className="text-sm text-white font-medium">{selected.teamName}</span>
          <button
            type="button"
            onClick={() => onSelect({ idTeam: '', strTeam: '', strTeamBadge: '', strLeague: '' })}
            className="ml-auto text-gray-400 hover:text-red-400 text-xs"
          >
            ✕ cambiar
          </button>
        </div>
      )}
      {!selected?.teamName && (
        <input
          type="text"
          value={query}
          onChange={handleChange}
          onFocus={() => setOpen(true)}
          placeholder="Buscar equipo (ej: Real Madrid, Argentina…)"
          className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white text-sm placeholder-gray-400 focus:outline-none focus:border-green-500"
        />
      )}
      {open && (query.length >= 2) && (
        <div className="absolute z-50 w-full mt-1 bg-gray-800 border border-gray-600 rounded shadow-xl max-h-64 overflow-y-auto">
          {loading && (
            <div className="p-3 text-center text-gray-400 text-sm">Buscando…</div>
          )}
          {!loading && results.length === 0 && query.length >= 2 && (
            <div className="p-3 text-center text-gray-400 text-sm">Sin resultados</div>
          )}
          {results.map((team) => (
            <button
              key={team.idTeam}
              type="button"
              onClick={() => pick(team)}
              className="w-full flex items-center gap-3 px-3 py-2 hover:bg-gray-700 text-left transition-colors"
            >
              <Image
                src={team.strTeamBadge}
                alt={team.strTeam}
                width={28}
                height={28}
                className="object-contain flex-shrink-0"
                unoptimized
              />
              <div>
                <div className="text-white text-sm font-medium">{team.strTeam}</div>
                {team.strLeague && (
                  <div className="text-gray-400 text-xs">{team.strLeague}</div>
                )}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
