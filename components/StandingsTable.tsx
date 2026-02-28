import Image from 'next/image';
import { StandingRow } from '@/lib/types';

interface Props {
  rows: StandingRow[];
}

export default function StandingsTable({ rows }: Props) {
  if (rows.length === 0) {
    return <p className="text-gray-400 text-sm">Todavía no hay datos de posiciones.</p>;
  }

  const cols = [
    { key: 'pos', label: '#', title: 'Posición' },
    { key: 'team', label: 'Jugador / Equipo', title: '' },
    { key: 'pj', label: 'PJ', title: 'Partidos jugados' },
    { key: 'pg', label: 'PG', title: 'Partidos ganados' },
    { key: 'pe', label: 'PE', title: 'Partidos empatados' },
    { key: 'pp', label: 'PP', title: 'Partidos perdidos' },
    { key: 'gf', label: 'GF', title: 'Goles a favor' },
    { key: 'gc', label: 'GC', title: 'Goles en contra' },
    { key: 'dg', label: 'DG', title: 'Diferencia de gol' },
    { key: 'pts', label: 'PTS', title: 'Puntos' },
  ];

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-700">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-800 text-gray-400 uppercase text-xs">
            {cols.map((c) => (
              <th key={c.key} title={c.title} className="px-3 py-2 text-center whitespace-nowrap">
                {c.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => {
            const isTop3 = idx < 3;
            const rowBg = idx === 0
              ? 'bg-yellow-900/20'
              : idx === 1
              ? 'bg-gray-700/20'
              : idx === 2
              ? 'bg-orange-900/20'
              : idx % 2 === 0
              ? 'bg-gray-900'
              : 'bg-gray-800/50';

            return (
              <tr key={row.participant.id} className={`${rowBg} border-t border-gray-700/50`}>
                <td className="px-3 py-2 text-center font-bold">
                  <span className={isTop3 ? (idx === 0 ? 'text-yellow-400' : idx === 1 ? 'text-gray-300' : 'text-orange-400') : 'text-gray-400'}>
                    {idx + 1}
                  </span>
                </td>
                <td className="px-3 py-2">
                  <div className="flex items-center gap-2">
                    {row.participant.teamBadge && (
                      <Image
                        src={row.participant.teamBadge}
                        alt={row.participant.teamName}
                        width={24}
                        height={24}
                        className="object-contain flex-shrink-0"
                        unoptimized
                      />
                    )}
                    <div>
                      <div className="font-semibold text-white">{row.participant.name}</div>
                      <div className="text-xs text-gray-400">{row.participant.teamName}</div>
                    </div>
                  </div>
                </td>
                <td className="px-3 py-2 text-center text-gray-300">{row.played}</td>
                <td className="px-3 py-2 text-center text-green-400">{row.won}</td>
                <td className="px-3 py-2 text-center text-yellow-400">{row.drawn}</td>
                <td className="px-3 py-2 text-center text-red-400">{row.lost}</td>
                <td className="px-3 py-2 text-center text-gray-300">{row.goalsFor}</td>
                <td className="px-3 py-2 text-center text-gray-300">{row.goalsAgainst}</td>
                <td className={`px-3 py-2 text-center font-medium ${row.goalDiff > 0 ? 'text-green-400' : row.goalDiff < 0 ? 'text-red-400' : 'text-gray-400'}`}>
                  {row.goalDiff > 0 ? `+${row.goalDiff}` : row.goalDiff}
                </td>
                <td className="px-3 py-2 text-center font-black text-white text-base">{row.points}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
