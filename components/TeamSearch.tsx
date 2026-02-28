'use client';

import { useState, useRef, useCallback } from 'react';
import { searchTeams, FifaTeam, POPULAR_TEAMS } from '@/lib/teams';

export interface TeamResult {
  id: string;
  name: string;
  league: string;
  badge: string;
}

interface Props {
  onSelect: (team: TeamResult) => void;
  selected?: { teamName: string; teamBadge: string } | null;
  placeholder?: string;
}

function TeamBadge({ badge, name, size = 28 }: { badge: string; name: string; size?: number }) {
  const [imgOk, setImgOk] = useState(true);
  const initials = name.split(' ').map((w) => w[0]).join('').toUpperCase().slice(0, 2);

  if (badge && imgOk) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={badge}
        alt={name}
        width={size}
        height={size}
        style={{ width: size, height: size, objectFit: 'contain', flexShrink: 0 }}
        onError={() => setImgOk(false)}
      />
    );
  }

  const colors = ['#2563eb','#16a34a','#dc2626','#9333ea','#d97706','#0891b2','#be185d'];
  const color = colors[name.charCodeAt(0) % colors.length];

  return (
    <div
      style={{
        width: size, height: size, borderRadius: '50%',
        background: color, flexShrink: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: size * 0.35, fontWeight: 700, color: '#fff',
      }}
    >
      {initials}
    </div>
  );
}

export default function TeamSearch({ onSelect, selected, placeholder = 'Buscar equipo…' }: Props) {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [apiResults, setApiResults] = useState<TeamResult[]>([]);
  const [apiLoading, setApiLoading] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Local search from curated list
  const localResults = searchTeams(query);

  // API search (TheSportsDB via proxy — works in production on Vercel)
  const searchApi = useCallback(async (q: string) => {
    if (q.length < 2) { setApiResults([]); return; }
    setApiLoading(true);
    try {
      const res = await fetch(`/api/search-teams?q=${encodeURIComponent(q)}`);
      if (!res.ok) return;
      const data = await res.json();
      const teams: TeamResult[] = (data.teams ?? []).map((t: {
        idTeam: string; strTeam: string; strTeamBadge: string; strLeague: string;
      }) => ({
        id: t.idTeam,
        name: t.strTeam,
        league: t.strLeague ?? '',
        badge: t.strTeamBadge ?? '',
      }));
      setApiResults(teams);
    } catch {
      setApiResults([]);
    } finally {
      setApiLoading(false);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    setOpen(true);
    setApiResults([]);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => searchApi(val), 500);
  };

  const pick = (team: TeamResult) => {
    onSelect(team);
    setQuery('');
    setOpen(false);
    setApiResults([]);
  };

  const clear = () => {
    onSelect({ id: '', name: '', badge: '', league: '' });
    setQuery('');
    setApiResults([]);
  };

  // Merge: API results take priority, then fill with local (deduplicated by name)
  const apiNames = new Set(apiResults.map((t) => t.name.toLowerCase()));
  const merged = [
    ...apiResults,
    ...localResults
      .filter((t) => !apiNames.has(t.name.toLowerCase()))
      .map((t) => ({ id: t.id, name: t.name, league: t.league, badge: t.badge })),
  ].slice(0, 10);

  const showDropdown = open && query.length >= 1;

  return (
    <div style={{ position: 'relative' }}>
      {selected?.teamName ? (
        <div className="flex items-center gap-2 p-2 bg-gray-700 rounded border border-gray-600">
          <TeamBadge badge={selected.teamBadge} name={selected.teamName} size={26} />
          <span className="text-sm text-white font-medium flex-1 truncate">{selected.teamName}</span>
          <button type="button" onClick={clear} className="text-gray-400 hover:text-red-400 text-xs ml-1 whitespace-nowrap">
            ✕ cambiar
          </button>
        </div>
      ) : (
        <input
          type="text"
          value={query}
          onChange={handleChange}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 150)}
          placeholder={placeholder}
          className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white text-sm placeholder-gray-400 focus:outline-none focus:border-green-500"
        />
      )}

      {showDropdown && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            zIndex: 9999,
            marginTop: 4,
            backgroundColor: '#1f2937',
            border: '1px solid #374151',
            borderRadius: 8,
            boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
            maxHeight: 260,
            overflowY: 'auto',
          }}
        >
          {apiLoading && (
            <div className="px-3 py-2 text-xs text-gray-400">Buscando en base de datos…</div>
          )}
          {merged.length === 0 && !apiLoading && (
            <div className="px-3 py-3 text-sm text-gray-400 text-center">Sin resultados</div>
          )}
          {merged.map((team) => (
            <button
              key={team.id + team.name}
              type="button"
              onMouseDown={() => pick(team)}
              className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-gray-700 text-left transition-colors border-b border-gray-700/40 last:border-0"
            >
              <TeamBadge badge={team.badge} name={team.name} size={24} />
              <div className="min-w-0">
                <div className="text-white text-sm font-medium truncate">{team.name}</div>
                <div className="text-gray-400 text-xs truncate">{team.league}</div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
