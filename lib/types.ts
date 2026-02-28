export interface Participant {
  id: string;
  name: string;
  teamId: string;
  teamName: string;
  teamBadge: string;
}

export interface Match {
  id: string;
  round: number;
  homeId: string;
  awayId: string;
  homeGoals: number | null;
  awayGoals: number | null;
  played: boolean;
}

export interface Tournament {
  name: string;
  participants: Participant[];
  matches: Match[];
  status: 'setup' | 'active' | 'finished';
}

export interface StandingRow {
  participant: Participant;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDiff: number;
  points: number;
}
