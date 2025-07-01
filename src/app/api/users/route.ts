import { db } from '@/app/_lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const [rows] = await db.query('SELECT * FROM User');
    return NextResponse.json(rows);
  } catch (err) {
    return NextResponse.json({ error: 'Query failed' }, { status: 500 });
  }
}



export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password, fullName, avatar, role, status } = body;

    if (!email || !password || !fullName) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const [result]:any = await db.query(
      `INSERT INTO User (email, password, fullName, avatar, role, status)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [email, password, fullName, avatar, role, status]
    );

    return NextResponse.json({
      message: 'User created successfully',
      userId: result.insertId,
    });
  } catch (error) {
    console.error('Create user error:', error);
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
  }
}

