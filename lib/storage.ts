import { Tournament } from './types';

const KEY = 'fifa_tournament';

const defaultTournament: Tournament = {
  name: 'Torneo FIFA',
  participants: [],
  matches: [],
  status: 'setup',
};

export function loadTournament(): Tournament {
  if (typeof window === 'undefined') return defaultTournament;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return defaultTournament;
    return JSON.parse(raw) as Tournament;
  } catch {
    return defaultTournament;
  }
}

export function saveTournament(data: Tournament): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(KEY, JSON.stringify(data));
}

export function resetTournament(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(KEY);
}
