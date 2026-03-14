import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const runtime = 'nodejs'

interface RouteParams {
  params: Promise<{ id: string }>
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params

    const translation = await (prisma as any).serviceTypeTranslation.findUnique({
      where: { id },
      include: {
        serviceType: true,
      }
    })

    if (!translation) {
      return NextResponse.json({ error: 'Service type translation not found' }, { status: 404 })
    }

    return NextResponse.json(translation)
  } catch (error) {
    console.error('Error fetching service type translation:', error)
    return NextResponse.json({ error: 'Failed to fetch service type translation' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params
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

    // Check if another translation exists
    const existing = await (prisma as any).serviceTypeTranslation.findFirst({
      where: {
        serviceTypeId,
        language,
        id: { not: id }
      }
    })
    if (existing) {
      return NextResponse.json({ error: 'Another translation already exists for this service type and language' }, { status: 400 })
    }

    const translation = await (prisma as any).serviceTypeTranslation.update({
      where: { id },
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

    return NextResponse.json(translation)
  } catch (error) {
    console.error('Error updating service type translation:', error)
    return NextResponse.json({ error: 'Failed to update service type translation' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params

    await (prisma as any).serviceTypeTranslation.delete({
      where: { id }
    })

    return NextResponse.json({ message: 'Service type translation deleted successfully' })
  } catch (error) {
    console.error('Error deleting service type translation:', error)
    return NextResponse.json({ error: 'Failed to delete service type translation' }, { status: 500 })
  }
}