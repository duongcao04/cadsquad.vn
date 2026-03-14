import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs'

export async function GET() {
  try {
    const translations = await (prisma as any).serviceTranslation.findMany({
      include: {
        service: true,
      },
      orderBy: { serviceId: 'desc' }
    })
    return NextResponse.json(translations)
  } catch (error) {
    console.error('Error fetching service translations:', error)
    return NextResponse.json({ error: 'Failed to fetch service translations' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { serviceId, language, slug, title, description, shortDescription, content, seoTitle, seoDescription, seoKeywords } = body

    // Validate required fields
    if (!serviceId || !language || !slug || !title || !description || !content) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Check if service exists
    const service = await (prisma as any).service.findUnique({ where: { id: serviceId } })
    if (!service) {
      return NextResponse.json({ error: 'Service not found' }, { status: 404 })
    }

    // Check if translation already exists
    const existing = await (prisma as any).serviceTranslation.findUnique({
      where: { serviceId_language: { serviceId, language } }
    })
    if (existing) {
      return NextResponse.json({ error: 'Translation already exists for this service and language' }, { status: 400 })
    }

    // Check if slug is unique
    const existingSlug = await (prisma as any).serviceTranslation.findUnique({ where: { slug } })
    if (existingSlug) {
      return NextResponse.json({ error: 'Slug already exists' }, { status: 400 })
    }

    const translation = await (prisma as any).serviceTranslation.create({
      data: {
        serviceId,
        language,
        slug,
        title,
        description,
        shortDescription,
        content,
        seoTitle,
        seoDescription,
        seoKeywords: seoKeywords || [],
      },
      include: {
        service: true,
      }
    })

    return NextResponse.json(translation, { status: 201 })
  } catch (error) {
    console.error('Error creating service translation:', error)
    return NextResponse.json({ error: 'Failed to create service translation' }, { status: 500 })
  }
}