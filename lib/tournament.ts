import { Match, Participant, StandingRow } from './types';
import { v4 as uuid } from 'uuid';

/**
 * Generates a round-robin fixture using the circle/polygon method.
 * All participants play against each other exactly once.
 */
export function generateFixture(participants: Participant[]): Match[] {
  const teams = [...participants];
  const hasBye = teams.length % 2 !== 0;
  if (hasBye) teams.push({ id: 'bye', name: 'BYE', teamId: '', teamName: '', teamBadge: '' });

  const totalRounds = teams.length - 1;
  const perRound = teams.length / 2;
  const matches: Match[] = [];

  const rotate = [...teams];

  for (let round = 0; round < totalRounds; round++) {
    for (let i = 0; i < perRound; i++) {
      const home = rotate[i];
      const away = rotate[teams.length - 1 - i];
      if (home.id !== 'bye' && away.id !== 'bye') {
        matches.push({
          id: uuid(),
          round: round + 1,
          homeId: home.id,
          awayId: away.id,
          homeGoals: null,
          awayGoals: null,
          played: false,
        });
      }
    }
    // Rotate all except first element
    rotate.splice(1, 0, rotate.pop()!);
  }

  return matches;
}

export function calcStandings(participants: Participant[], matches: Match[]): StandingRow[] {
  const map = new Map<string, StandingRow>();

  for (const p of participants) {
    map.set(p.id, {
      participant: p,
      played: 0,
      won: 0,
      drawn: 0,
      lost: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      goalDiff: 0,
      points: 0,
    });
  }

  for (const m of matches) {
    if (!m.played || m.homeGoals === null || m.awayGoals === null) continue;

    const home = map.get(m.homeId);
    const away = map.get(m.awayId);
    if (!home || !away) continue;

    home.played++;
    away.played++;
    home.goalsFor += m.homeGoals;
    home.goalsAgainst += m.awayGoals;
    away.goalsFor += m.awayGoals;
    away.goalsAgainst += m.homeGoals;

    if (m.homeGoals > m.awayGoals) {
      home.won++;
      home.points += 3;
      away.lost++;
    } else if (m.homeGoals < m.awayGoals) {
      away.won++;
      away.points += 3;
      home.lost++;
    } else {
      home.drawn++;
      away.drawn++;
      home.points++;
      away.points++;
    }
  }

  const rows = Array.from(map.values()).map((r) => ({
    ...r,
    goalDiff: r.goalsFor - r.goalsAgainst,
  }));

  rows.sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    if (b.goalDiff !== a.goalDiff) return b.goalDiff - a.goalDiff;
    if (b.goalsFor !== a.goalsFor) return b.goalsFor - a.goalsFor;
    return a.participant.name.localeCompare(b.participant.name);
  });

  return rows;
}

export function matchesByRound(matches: Match[]): Map<number, Match[]> {
  const map = new Map<number, Match[]>();
  for (const m of matches) {
    if (!map.has(m.round)) map.set(m.round, []);
    map.get(m.round)!.push(m);
  }
  return map;
}
