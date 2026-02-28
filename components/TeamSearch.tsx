'use client';

import { useState, useCallback, useRef } from 'react';
import Image from 'next/image';

export interface TeamResult {
  idTeam: string;
  strTeam: string;
  strTeamBadge: string;
  strLeague: string;
}

interface Props {
  onSelect: (team: TeamResult) => void;
  selected?: { teamName: string; teamBadge: string } | null;
  placeholder?: string;
}

export default function TeamSearch({ onSelect, selected, placeholder = 'Buscar equipo (ej: Real Madrid, Argentina…)' }: Props) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<TeamResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const search = useCallback(async (q: string) => {
    if (q.length < 2) { setResults([]); return; }
    setLoading(true);
    try {
      const res = await fetch(`/api/search-teams?q=${encodeURIComponent(q)}`);
      const data = await res.json();
      setResults(data.teams ?? []);
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
    debounceRef.current = setTimeout(() => search(val), 400);
  };

  const pick = (team: TeamResult) => {
    onSelect(team);
    setQuery('');
    setResults([]);
    setOpen(false);
  };

  const clear = () => {
    onSelect({ idTeam: '', strTeam: '', strTeamBadge: '', strLeague: '' });
    setQuery('');
    setResults([]);
  };

  return (
    <div className="relative">
      {selected?.teamName ? (
        <div className="flex items-center gap-2 p-2 bg-gray-700 rounded border border-gray-600">
          <Image
            src={selected.teamBadge}
            alt={selected.teamName}
            width={28}
            height={28}
            className="object-contain flex-shrink-0"
            unoptimized
          />
          <span className="text-sm text-white font-medium flex-1 truncate">{selected.teamName}</span>
          <button
            type="button"
            onClick={clear}
            className="text-gray-400 hover:text-red-400 text-xs whitespace-nowrap ml-1"
          >
            ✕ cambiar
          </button>
        </div>
      ) : (
        <input
          type="text"
          value={query}
          onChange={handleChange}
          onFocus={() => query.length >= 2 && setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 200)}
          placeholder={placeholder}
          className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white text-sm placeholder-gray-400 focus:outline-none focus:border-green-500"
        />
      )}

      {open && query.length >= 2 && (
        <div className="absolute z-50 w-full mt-1 bg-gray-800 border border-gray-600 rounded-lg shadow-2xl max-h-60 overflow-y-auto">
          {loading && (
            <div className="p-3 text-center text-gray-400 text-sm">Buscando…</div>
          )}
          {!loading && results.length === 0 && (
            <div className="p-3 text-center text-gray-400 text-sm">Sin resultados</div>
          )}
          {results.map((team) => (
            <button
              key={team.idTeam}
              type="button"
              onMouseDown={() => pick(team)}
              className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-gray-700 text-left transition-colors border-b border-gray-700/50 last:border-0"
            >
              <Image
                src={team.strTeamBadge}
                alt={team.strTeam}
                width={28}
                height={28}
                className="object-contain flex-shrink-0"
                unoptimized
              />
              <div className="min-w-0">
                <div className="text-white text-sm font-medium truncate">{team.strTeam}</div>
                {team.strLeague && (
                  <div className="text-gray-400 text-xs truncate">{team.strLeague}</div>
                )}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
