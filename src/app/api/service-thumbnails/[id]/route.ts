import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
    }

    const thumbnail = await (prisma as any).serviceThumbnail.findUnique({
      where: { id },
      include: {
        service: true,
      },
    });

    if (!thumbnail) {
      return NextResponse.json({ error: 'Service thumbnail not found' }, { status: 404 });
    }

    return NextResponse.json(thumbnail);
  } catch (error) {
    console.error('Error fetching service thumbnail:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
    }

    const body = await request.json();
    const { serviceId, type, url, altText } = body;

    // Validate required fields
    if (!serviceId || !type || !url) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Check if service exists
    const service = await (prisma as any).service.findUnique({
      where: { id: serviceId },
    });
    if (!service) {
      return NextResponse.json({ error: 'Service not found' }, { status: 404 });
    }

    const updatedThumbnail = await (prisma as any).serviceThumbnail.update({
      where: { id },
      data: {
        serviceId,
        type,
        url,
        altText,
      },
      include: {
        service: true,
      },
    });

    return NextResponse.json(updatedThumbnail);
  } catch (error) {
    console.error('Error updating service thumbnail:', error);
    if ((error as any).code === 'P2025') {
      return NextResponse.json({ error: 'Service thumbnail not found' }, { status: 404 });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
    }

    await (prisma as any).serviceThumbnail.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Service thumbnail deleted successfully' });
  } catch (error) {
    console.error('Error deleting service thumbnail:', error);
    if ((error as any).code === 'P2025') {
      return NextResponse.json({ error: 'Service thumbnail not found' }, { status: 404 });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}