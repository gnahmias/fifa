import { NextRequest, NextResponse } from 'next/server';
import { getTournament, setTournament, deleteTournament, DEFAULT_TOURNAMENT } from '@/lib/db';
import { Tournament } from '@/lib/types';

export async function GET() {
  const data = await getTournament();
  if (data === null) {
    // KV not configured - client should use localStorage
    return NextResponse.json({ kvAvailable: false, data: null });
  }
  return NextResponse.json({ kvAvailable: true, data });
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json() as Tournament;
    const ok = await setTournament(body);
    return NextResponse.json({ ok });
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}

export async function DELETE() {
  const ok = await deleteTournament();
  return NextResponse.json({ ok });
}

// Needed for Vercel Edge-compatible routes
export const dynamic = 'force-dynamic';
