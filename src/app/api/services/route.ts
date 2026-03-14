/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

import { CreateServiceFormSchema, UpdateServiceFormSchema } from '@/validationSchemas';

export const runtime = 'nodejs'

export async function GET() {
  try {
    const services = await prisma.service.findMany({
      include: {
        serviceType: true,
        verticalThumbnail: true,
        horizontalThumbnail: true,
        translations: true,
      },
      orderBy: { orderNumber: 'asc' }
    })
    return NextResponse.json(services)
  } catch (error) {
    console.error('Error fetching services:', error)
    return NextResponse.json({ error: 'Failed to fetch services' }, { status: 500 })
  }
}
// ==========================================
// CREATE (POST)
// ==========================================
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validation = CreateServiceFormSchema.safeParse(body)

    if (!validation.success) {
      return NextResponse.json({ error: 'Validation failed', details: validation.error.format() }, { status: 400 })
    }

    const { orderNumber, serviceTypeId, verticalThumbnailId, horizontalThumbnailId, translations } = validation.data

    // 1. Smart Auto-Increment Logic for Order Number
    let finalOrderNumber = orderNumber;

    if (!finalOrderNumber || finalOrderNumber <= 0) {
      // Find the highest existing orderNumber in the database
      const maxOrder = await (prisma as any).service.aggregate({
        _max: {
          orderNumber: true
        }
      });
      // Add 1 to the max, or start at 1 if the table is completely empty
      finalOrderNumber = (maxOrder._max.orderNumber || 0) + 1;
    } else {
      // If the admin manually typed a specific number, verify it isn't already taken
      const existingOrder = await (prisma as any).service.findUnique({
        where: { orderNumber: finalOrderNumber }
      });
      if (existingOrder) {
        return NextResponse.json({ error: 'Order number already exists' }, { status: 400 });
      }
    }

    // 2. Check unique slugs across all provided translations
    const slugs = translations.map(t => t.slug)
    const existingSlugs = await (prisma as any).serviceTranslation.findMany({
      where: { slug: { in: slugs } },
      select: { slug: true }
    })

    if (existingSlugs.length > 0) {
      return NextResponse.json({
        error: 'Some slugs already exist',
        slugs: existingSlugs.map((s: any) => s.slug)
      }, { status: 400 })
    }

    // 3. Create Service
    const service = await (prisma as any).service.create({
      data: {
        orderNumber: finalOrderNumber, // Use the calculated order number here
        serviceTypeId,
        verticalThumbnailId,
        horizontalThumbnailId,
        translations: {
          create: translations
        }
      },
      include: { serviceType: true, translations: true }
    })

    return NextResponse.json(service, { status: 201 })
  } catch (error) {
    console.error('Error creating service:', error)
    return NextResponse.json({ error: 'Failed to create service' }, { status: 500 })
  }
}

// ==========================================
// UPDATE (PATCH)
// ==========================================
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json()
    const validation = UpdateServiceFormSchema.safeParse(body)

    if (!validation.success) {
      return NextResponse.json({ error: 'Validation failed', details: validation.error.format() }, { status: 400 })
    }

    const { id, orderNumber, serviceTypeId, verticalThumbnailId, horizontalThumbnailId, translations } = validation.data

    // 1. Check orderNumber uniqueness (EXCLUDING current service)
    const existingOrder = await (prisma as any).service.findFirst({
      where: { orderNumber, id: { not: id } }
    })
    if (existingOrder) return NextResponse.json({ error: 'Order number is used by another service' }, { status: 400 })

    // 2. Check unique slugs (EXCLUDING current service translations)
    const slugs = translations.map(t => t.slug)
    const existingSlugs = await (prisma as any).serviceTranslation.findFirst({
      where: { slug: { in: slugs }, serviceId: { not: id } }
    })
    if (existingSlugs) return NextResponse.json({ error: 'One or more slugs are already in use' }, { status: 400 })

    // 3. Update Service (Using deleteMany -> create for clean translation replacement)
    const updatedService = await (prisma as any).service.update({
      where: { id },
      data: {
        orderNumber,
        serviceTypeId,
        verticalThumbnailId,
        horizontalThumbnailId,
        translations: {
          deleteMany: {}, // Clear old translations
          create: translations // Insert new ones
        }
      },
      include: { serviceType: true, translations: true }
    })

    return NextResponse.json(updatedService, { status: 200 })
  } catch (error) {
    console.error('Error updating service:', error)
    return NextResponse.json({ error: 'Failed to update service' }, { status: 500 })
  }
}