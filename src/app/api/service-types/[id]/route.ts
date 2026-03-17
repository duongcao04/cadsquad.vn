import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const runtime = 'nodejs'

interface RouteParams {
  params: Promise<{ id: string }>
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params

    const serviceType = await prisma.serviceType.findUnique({
      where: { id },
      include: {
        translations: true,
        services: true,
      }
    })

    if (!serviceType) {
      return NextResponse.json({ error: 'Service type not found' }, { status: 404 })
    }

    return NextResponse.json(serviceType)
  } catch (error) {
    console.error('Error fetching service type:', error)
    return NextResponse.json({ error: 'Failed to fetch service type' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params
    const body = await request.json()
    const { code, translations } = body

    // Validate required fields
    if (!code || !translations || !Array.isArray(translations) || translations.length === 0) {
      return NextResponse.json({ error: 'Missing required fields: code and translations' }, { status: 400 })
    }

    // Check if code is unique (excluding current)
    const existing = await prisma.serviceType.findFirst({
      where: {
        code,
        id: { not: id }
      }
    })
    if (existing) {
      return NextResponse.json({ error: 'Service type code already exists' }, { status: 400 })
    }

    // Validate translations
    for (const trans of translations) {
      if (!trans.language || !trans.displayName) {
        return NextResponse.json({ error: 'Each translation must have language and displayName' }, { status: 400 })
      }
    }

    const serviceType = await prisma.serviceType.update({
      where: { id },
      data: {
        code,
        translations: {
          deleteMany: {},
          create: translations.map((t: any) => ({
            language: t.language,
            displayName: t.displayName,
            description: t.description,
            brochureUrl: t.brochureUrl,
          }))
        }
      },
      include: {
        translations: true,
        services: true,
      }
    })

    return NextResponse.json(serviceType)
  } catch (error) {
    console.error('Error updating service type:', error)
    return NextResponse.json({ error: 'Failed to update service type' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params

    await prisma.serviceType.delete({
      where: { id }
    })

    return NextResponse.json({ message: 'Service type deleted successfully' })
  } catch (error) {
    console.error('Error deleting service type:', error)
    return NextResponse.json({ error: 'Failed to delete service type' }, { status: 500 })
  }
}