import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs'

export async function GET() {
  try {
    const thumbnails = await (prisma as any).serviceThumbnail.findMany({
      include: {
        verticalServices: true,
        horizontalServices: true,
      },
      orderBy: { id: 'desc' }
    })
    return NextResponse.json(thumbnails)
  } catch (error) {
    console.error('Error fetching service thumbnails:', error)
    return NextResponse.json({ error: 'Failed to fetch service thumbnails' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { url, type } = body

    // Validate required fields
    if (!url || !type) {
      return NextResponse.json({ error: 'Missing required fields: url and type' }, { status: 400 })
    }

    // Validate type
    if (!['ImagePng', 'VideoGif'].includes(type)) {
      return NextResponse.json({ error: 'Invalid type. Must be ImagePng or VideoGif' }, { status: 400 })
    }

    const thumbnail = await (prisma as any).serviceThumbnail.create({
      data: {
        url,
        type,
      },
      include: {
        verticalServices: true,
        horizontalServices: true,
      }
    })

    return NextResponse.json(thumbnail, { status: 201 })
  } catch (error) {
    console.error('Error creating service thumbnail:', error)
    return NextResponse.json({ error: 'Failed to create service thumbnail' }, { status: 500 })
  }
}