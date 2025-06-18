import { db } from '@/app/_lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const [rows] = await db.query('SELECT * FROM users');
    return NextResponse.json(rows);
  } catch (err) {
    return NextResponse.json({ error: 'Query failed' }, { status: 500 });
  }
}

