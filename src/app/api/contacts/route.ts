import { db } from '@/app/_lib/db';
import { NextResponse, NextRequest } from 'next/server';

export async function GET() {
  try {
    const [rows] = await db.query('SELECT * FROM contacts');
    return NextResponse.json(rows);
  } catch (err) {
    return NextResponse.json({ error: 'Query failed' }, { status: 500 });
  }
}


export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { fullName, phone, email, message, status } = body;

    await db.query('INSERT INTO contacts (fullName, phone, email, message, status) VALUES (?, ?, ?, ?, ?)', [
      fullName,
      phone,
      email,
      message,
      status,
    ]);

    return NextResponse.json({ message: 'Contact created successfully' }, { status: 201 });
  } catch (error) {
    console.error('Error creating contact:', error);
    return NextResponse.json({ error: 'Failed to create contact' }, { status: 500 });
  }
}
