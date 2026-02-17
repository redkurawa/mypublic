import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { cookies } from 'next/headers';

export async function GET() {
  try {
    const projects = await db.project.findMany({
      orderBy: { order: 'asc' },
    });
    return NextResponse.json(projects);
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get('admin_session');

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { url } = await req.json();

    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    // Get the max order value
    const maxOrderProject = await db.project.findFirst({
      orderBy: { order: 'desc' },
      select: { order: true },
    });
    const newOrder = (maxOrderProject?.order ?? -1) + 1;

    // Simple title extraction from hostname
    let title = url;
    try {
      const hostname = new URL(url).hostname;
      title = hostname.replace('www.', '');
      title = title.split('.')[0]; // e.g. "google" from google.com
      title = title.toLowerCase(); // Convert to lowercase
    } catch (e) {
      console.error('URL parsing error', e);
    }

    const project = await db.project.create({
      data: {
        url,
        title,
        order: newOrder,
      },
    });

    return NextResponse.json(project);
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json(
      { error: 'Failed to create project' },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get('admin_session');

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id, order, title, url } = await req.json();

    if (!id) {
      return NextResponse.json(
        { error: 'ID is required' },
        { status: 400 }
      );
    }

    const updateData: { order?: number; title?: string; url?: string } = {};
    
    if (order !== undefined) {
      updateData.order = order;
    }
    
    if (title !== undefined) {
      updateData.title = title;
    }
    
    if (url !== undefined) {
      updateData.url = url;
    }

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { error: 'At least one field (order, title, or url) must be provided' },
        { status: 400 }
      );
    }

    const project = await db.project.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json(project);
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json(
      { error: 'Failed to update project' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get('admin_session');

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    await db.project.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json(
      { error: 'Failed to delete project' },
      { status: 500 }
    );
  }
}
