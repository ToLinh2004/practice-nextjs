import { db } from '@/app/_lib/db';
import { NextRequest, NextResponse } from 'next/server';

// PUT /api/contacts/:id
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const contactId = params.id;

  try {
    const body = await req.json();
    const { fullName, phone, email, message, status } = body;

    // Validate input
    if (!fullName || !phone || !email || !message || !status) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    const [result]: any = await db.query(
      `UPDATE contacts 
       SET fullName = ?, phone = ?, email = ?, message = ?, status = ? 
       WHERE id = ?`,
      [fullName, phone, email, message, status, contactId],
    );

    if (result.affectedRows === 0) {
      return NextResponse.json({ error: 'Contact not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Contact updated successfully' });
  } catch (error) {
    console.error('Update contact error:', error);
    return NextResponse.json({ error: 'Failed to update contact' }, { status: 500 });
  }
}
