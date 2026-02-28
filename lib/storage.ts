import { Tournament } from './types';

const LOCAL_KEY = 'fifa_tournament';

export const DEFAULT_TOURNAMENT: Tournament = {
  name: 'Torneo FIFA',
  participants: [],
  matches: [],
  status: 'setup',
};

// ── Local helpers ────────────────────────────────────────────────────────────

function getLocal(): Tournament {
  if (typeof window === 'undefined') return DEFAULT_TOURNAMENT;
  try {
    const raw = localStorage.getItem(LOCAL_KEY);
    return raw ? (JSON.parse(raw) as Tournament) : DEFAULT_TOURNAMENT;
  } catch {
    return DEFAULT_TOURNAMENT;
  }
}

function setLocal(data: Tournament): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(LOCAL_KEY, JSON.stringify(data));
}

// ── Public API ────────────────────────────────────────────────────────────────

/**
 * Load tournament.
 * Tries KV (shared across devices) first; falls back to localStorage.
 */
export async function loadTournament(): Promise<Tournament> {
  try {
    const res = await fetch('/api/tournament', { cache: 'no-store' });
    if (res.ok) {
      const { kvAvailable, data } = await res.json();
      if (kvAvailable && data) {
        setLocal(data); // keep local in sync
        return data as Tournament;
      }
    }
  } catch {
    // network error — use local
  }
  return getLocal();
}

/**
 * Save tournament.
 * Saves to localStorage immediately (optimistic) and syncs to KV.
 */
export async function saveTournament(data: Tournament): Promise<void> {
  setLocal(data);
  try {
    await fetch('/api/tournament', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      cache: 'no-store',
    });
  } catch {
    // local save succeeded; KV sync failed silently
  }
}

/**
 * Reset tournament to defaults.
 */
export async function resetTournament(): Promise<void> {
  setLocal(DEFAULT_TOURNAMENT);
  try {
    await fetch('/api/tournament', { method: 'DELETE', cache: 'no-store' });
  } catch {
    // local reset done
  }
}
