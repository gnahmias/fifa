import Image from 'next/image';
import { StandingRow } from '@/lib/types';

interface Props {
  rows: StandingRow[];
}

export default function StandingsTable({ rows }: Props) {
  if (rows.length === 0) {
    return <p className="text-gray-400 text-sm">Todavía no hay datos de posiciones.</p>;
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-700 -mx-1">
      <table className="w-full text-sm min-w-[480px]">
        <thead>
          <tr className="bg-gray-800 text-gray-400 uppercase text-xs">
            <th className="px-2 py-2 text-center w-8">#</th>
            <th className="px-3 py-2 text-left">Jugador</th>
            <th className="px-2 py-2 text-center" title="Partidos jugados">PJ</th>
            <th className="px-2 py-2 text-center" title="Ganados">PG</th>
            <th className="px-2 py-2 text-center" title="Empatados">PE</th>
            <th className="px-2 py-2 text-center" title="Perdidos">PP</th>
            <th className="px-2 py-2 text-center" title="Goles a favor">GF</th>
            <th className="px-2 py-2 text-center" title="Goles en contra">GC</th>
            <th className="px-2 py-2 text-center" title="Diferencia de gol">DG</th>
            <th className="px-2 py-2 text-center font-bold" title="Puntos">PTS</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => {
            const posColor = idx === 0 ? 'text-yellow-400' : idx === 1 ? 'text-gray-300' : idx === 2 ? 'text-orange-400' : 'text-gray-500';
            const rowBg = idx % 2 === 0 ? 'bg-gray-900' : 'bg-gray-800/40';
            return (
              <tr key={row.participant.id} className={`${rowBg} border-t border-gray-700/40`}>
                <td className="px-2 py-2.5 text-center">
                  <span className={`font-bold text-sm ${posColor}`}>{idx + 1}</span>
                </td>
                <td className="px-3 py-2.5">
                  <div className="flex items-center gap-2">
                    {row.participant.teamBadge ? (
                      <Image
                        src={row.participant.teamBadge}
                        alt={row.participant.teamName}
                        width={20}
                        height={20}
                        className="object-contain shrink-0"
                        unoptimized
                      />
                    ) : (
                      <div className="w-5 h-5 rounded-full bg-gray-700 shrink-0" />
                    )}
                    <div className="min-w-0">
                      <div className="font-semibold text-white text-sm truncate">{row.participant.name}</div>
                      {row.participant.teamName && (
                        <div className="text-xs text-gray-500 truncate hidden sm:block">{row.participant.teamName}</div>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-2 py-2.5 text-center text-gray-300 text-xs">{row.played}</td>
                <td className="px-2 py-2.5 text-center text-green-400 text-xs font-medium">{row.won}</td>
                <td className="px-2 py-2.5 text-center text-yellow-400 text-xs font-medium">{row.drawn}</td>
                <td className="px-2 py-2.5 text-center text-red-400 text-xs font-medium">{row.lost}</td>
                <td className="px-2 py-2.5 text-center text-gray-300 text-xs">{row.goalsFor}</td>
                <td className="px-2 py-2.5 text-center text-gray-300 text-xs">{row.goalsAgainst}</td>
                <td className={`px-2 py-2.5 text-center text-xs font-medium ${row.goalDiff > 0 ? 'text-green-400' : row.goalDiff < 0 ? 'text-red-400' : 'text-gray-400'}`}>
                  {row.goalDiff > 0 ? `+${row.goalDiff}` : row.goalDiff}
                </td>
                <td className="px-2 py-2.5 text-center font-black text-white text-base">{row.points}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
