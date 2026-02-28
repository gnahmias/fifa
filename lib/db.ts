/**
 * Server-side storage using Vercel KV (Redis).
 * Falls back gracefully when KV is not configured (local dev without .env.local).
 */
import { Tournament } from './types';

export const DEFAULT_TOURNAMENT: Tournament = {
  name: 'Torneo FIFA',
  participants: [],
  matches: [],
  status: 'setup',
};

const KEY = 'tournament';

function isKVAvailable(): boolean {
  return !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);
}

export async function getTournament(): Promise<Tournament | null> {
  if (!isKVAvailable()) return null;
  try {
    const { kv } = await import('@vercel/kv');
    const data = await kv.get<Tournament>(KEY);
    return data ?? null;
  } catch {
    return null;
  }
}

export async function setTournament(data: Tournament): Promise<boolean> {
  if (!isKVAvailable()) return false;
  try {
    const { kv } = await import('@vercel/kv');
    await kv.set(KEY, data);
    return true;
  } catch {
    return false;
  }
}

export async function deleteTournament(): Promise<boolean> {
  if (!isKVAvailable()) return false;
  try {
    const { kv } = await import('@vercel/kv');
    await kv.del(KEY);
    return true;
  } catch {
    return false;
  }
}
