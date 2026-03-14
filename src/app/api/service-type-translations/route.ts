import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs'

export async function GET() {
  try {
    const translations = await (prisma as any).serviceTypeTranslation.findMany({
      include: {
        serviceType: true,
      },
      orderBy: { serviceTypeId: 'desc' }
    })
    return NextResponse.json(translations)
  } catch (error) {
    console.error('Error fetching service type translations:', error)
    return NextResponse.json({ error: 'Failed to fetch service type translations' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { serviceTypeId, language, displayName, description, brochureUrl } = body

    // Validate required fields
    if (!serviceTypeId || !language || !displayName) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Check if service type exists
    const serviceType = await (prisma as any).serviceType.findUnique({ where: { id: serviceTypeId } })
    if (!serviceType) {
      return NextResponse.json({ error: 'Service type not found' }, { status: 404 })
    }

    // Check if translation already exists
    const existing = await (prisma as any).serviceTypeTranslation.findUnique({
      where: { serviceTypeId_language: { serviceTypeId, language } }
    })
    if (existing) {
      return NextResponse.json({ error: 'Translation already exists for this service type and language' }, { status: 400 })
    }

    const translation = await (prisma as any).serviceTypeTranslation.create({
      data: {
        serviceTypeId,
        language,
        displayName,
        description,
        brochureUrl,
      },
      include: {
        serviceType: true,
      }
    })

    return NextResponse.json(translation, { status: 201 })
  } catch (error) {
    console.error('Error creating service type translation:', error)
    return NextResponse.json({ error: 'Failed to create service type translation' }, { status: 500 })
  }
}