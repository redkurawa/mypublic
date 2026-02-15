import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    // Get or create visitor count
    let visitor = await db.visitor.findFirst();

    if (!visitor) {
      // Create initial visitor record
      visitor = await db.visitor.create({
        data: { count: 1 },
      });
    }

    return NextResponse.json({ count: visitor.count });
  } catch (error) {
    console.error('Visitor Counter Error:', error);
    return NextResponse.json({ count: 0 }, { status: 500 });
  }
}

export async function POST() {
  try {
    // Get or create visitor count and increment
    let visitor = await db.visitor.findFirst();

    if (!visitor) {
      visitor = await db.visitor.create({
        data: { count: 1 },
      });
    } else {
      visitor = await db.visitor.update({
        where: { id: visitor.id },
        data: { count: { increment: 1 } },
      });
    }

    return NextResponse.json({ count: visitor.count });
  } catch (error) {
    console.error('Visitor Counter Error:', error);
    return NextResponse.json({ count: 0 }, { status: 500 });
  }
}
