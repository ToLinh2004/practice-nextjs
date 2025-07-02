import { db } from '@/app/_lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { userId } = await req.json();

  if (!userId) {
    return NextResponse.json({ success: false, message: 'Missing userId' }, { status: 400 });
  }

  try {
    const [rows] = await db.query(
      `
      SELECT 
        id,
        email,
        avatar,
        role,
        fullName,
        status,
        address,
        date,
        phone,
        created_at,
        updated_at
      FROM User
      WHERE id = ?
      LIMIT 1
      `,
      [userId],
    );

    const result = (rows as any[])[0];

    if (!result) {
      return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error('Error fetching user info:', error);
    return NextResponse.json({ success: false, message: 'Failed to fetch user info' }, { status: 500 });
  }
}
