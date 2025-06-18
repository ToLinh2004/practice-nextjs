import { db } from '@/app/_lib/db';
import { NextRequest, NextResponse } from 'next/server';

// PUT /api/users/:id
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const id = params.id;

  try {
    const body = await req.json();
    const { status } = body;

    // Cập nhật dữ liệu user trong MySQL
    const [result] = await db.query(
      `UPDATE users SET status = ? WHERE id = ?`,
      [status, id],
    );

    return NextResponse.json({ message: 'User updated successfully' });
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
  }
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const { status } = await req.json();

    if (!status) {
      return NextResponse.json({ error: 'Missing status' }, { status: 400 });
    }

    const [result]: any = await db.query('UPDATE users SET status = ? WHERE id = ?', [status, id]);

    if (result.affectedRows === 0) {
      return NextResponse.json({ error: 'users not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'users status updated successfully' });
  } catch (error) {
    console.error('Update users status error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
  