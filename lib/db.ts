/**
 * Server-side storage using Neon Postgres (via Vercel integration).
 * Falls back gracefully when DATABASE_URL is not set (local dev without .env.local).
 */
import { neon, NeonQueryFunction } from '@neondatabase/serverless';
import { Tournament } from './types';

export const DEFAULT_TOURNAMENT: Tournament = {
  name: 'Torneo FIFA',
  participants: [],
  matches: [],
  status: 'setup',
};

const ROW_ID = 'default';

let tableReady = false;

function getSQL(): NeonQueryFunction<false, false> | null {
  const url = process.env.DATABASE_URL ?? process.env.POSTGRES_URL;
  if (!url) return null;
  return neon(url);
}

async function ensureTable(sql: NeonQueryFunction<false, false>) {
  if (tableReady) return;
  await sql`
    CREATE TABLE IF NOT EXISTS tournament (
      id          TEXT PRIMARY KEY,
      data        JSONB NOT NULL,
      updated_at  TIMESTAMPTZ DEFAULT NOW()
    )
  `;
  tableReady = true;
}

export async function getTournament(): Promise<Tournament | null> {
  const sql = getSQL();
  if (!sql) return null;
  try {
    await ensureTable(sql);
    const rows = await sql`SELECT data FROM tournament WHERE id = ${ROW_ID}`;
    if (rows.length === 0) return null;
    return rows[0].data as Tournament;
  } catch {
    return null;
  }
}

export async function setTournament(data: Tournament): Promise<boolean> {
  const sql = getSQL();
  if (!sql) return false;
  try {
    await ensureTable(sql);
    await sql`
      INSERT INTO tournament (id, data, updated_at)
      VALUES (${ROW_ID}, ${JSON.stringify(data)}, NOW())
      ON CONFLICT (id) DO UPDATE
        SET data = ${JSON.stringify(data)}, updated_at = NOW()
    `;
    return true;
  } catch {
    return false;
  }
}

export async function deleteTournament(): Promise<boolean> {
  const sql = getSQL();
  if (!sql) return false;
  try {
    await sql`DELETE FROM tournament WHERE id = ${ROW_ID}`;
    return true;
  } catch {
    return false;
  }
}
