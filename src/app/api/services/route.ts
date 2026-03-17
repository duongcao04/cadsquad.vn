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
        thumbnail: true,
        backgroundCover: true,
        translations: true,
      },
      orderBy: { orderNumber: 'asc' }
    })
    return NextResponse.json(services)
  } catch (error) {
    console.error('Error fetching services:', error)
    return NextResponse.json({ error: 'Failed to fetch services' }, { status: 500 })
  }
} // import prisma from '@/lib/prisma' 

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

    // Đổi ID thành URL để nhận trực tiếp link ảnh từ Frontend
    const { orderNumber, serviceTypeId, thumbnailUrl, backgroundCoverUrl, translations } = validation.data

    // 1. Logic tự động tăng Order Number
    let finalOrderNumber = orderNumber;
    if (!finalOrderNumber || finalOrderNumber <= 0) {
      const maxOrder = await (prisma as any).service.aggregate({ _max: { orderNumber: true } });
      finalOrderNumber = (maxOrder._max.orderNumber || 0) + 1;
    } else {
      const existingOrder = await (prisma as any).service.findUnique({ where: { orderNumber: finalOrderNumber } });
      if (existingOrder) return NextResponse.json({ error: 'Order number already exists' }, { status: 400 });
    }

    // 2. Kiểm tra ServiceType
    if (serviceTypeId) {
      const serviceType = await (prisma as any).serviceType.findUnique({ where: { id: serviceTypeId } })
      if (!serviceType) return NextResponse.json({ error: 'Service type not found' }, { status: 404 })
    }

    // 3. XỬ LÝ MEDIA TỰ ĐỘNG (Pasted URL hoặc Cloudinary URL)
    let resolvedThumbnailId = null;
    if (thumbnailUrl) {
      let thumb = await (prisma as any).serviceThumbnail.findFirst({ where: { url: thumbnailUrl } });
      if (!thumb) {
        thumb = await (prisma as any).serviceThumbnail.create({ data: { url: thumbnailUrl } });
      }
      resolvedThumbnailId = thumb.id;
    }

    let resolvedBackgroundCoverId = null;
    if (backgroundCoverUrl) {
      let cover = await (prisma as any).serviceBackgroundCover.findFirst({ where: { url: backgroundCoverUrl } });
      if (!cover) {
        cover = await (prisma as any).serviceBackgroundCover.create({ data: { url: backgroundCoverUrl } });
      }
      resolvedBackgroundCoverId = cover.id;
    }

    // 4. Kiểm tra slugs bị trùng
    const slugs = translations.map((t: any) => t.slug)
    const existingSlugs = await (prisma as any).serviceTranslation.findMany({
      where: { slug: { in: slugs } }, select: { slug: true }
    })
    if (existingSlugs.length > 0) return NextResponse.json({ error: 'Some slugs already exist', slugs: existingSlugs.map((s: any) => s.slug) }, { status: 400 })

    // 5. Tạo Service
    const service = await (prisma as any).service.create({
      data: {
        orderNumber: finalOrderNumber,
        serviceTypeId,
        thumbnailId: resolvedThumbnailId, // Truyền ID đã xử lý vào
        backgroundCoverId: resolvedBackgroundCoverId, // Truyền ID đã xử lý vào
        translations: {
          create: translations.map((t: any) => ({
            language: t.language,
            slug: t.slug,
            title: t.title,
            description: t.description,
            shortDescription: t.shortDescription,
            content: t.content,
            seoTitle: t.seoTitle,
            seoDescription: t.seoDescription,
            seoKeywords: t.seoKeywords || [],
          }))
        }
      },
      include: { serviceType: true, thumbnail: true, backgroundCover: true, translations: true }
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

    // Đổi ID thành URL
    const { id, orderNumber, serviceTypeId, thumbnailUrl, backgroundCoverUrl, translations } = validation.data

    if (orderNumber) {
      const existingOrder = await (prisma as any).service.findFirst({ where: { orderNumber, id: { not: id } } })
      if (existingOrder) return NextResponse.json({ error: 'Order number is used by another service' }, { status: 400 })
    }

    if (serviceTypeId) {
      const serviceType = await (prisma as any).serviceType.findUnique({ where: { id: serviceTypeId } })
      if (!serviceType) return NextResponse.json({ error: 'Service type not found' }, { status: 404 })
    }

    // XỬ LÝ MEDIA TỰ ĐỘNG
    let resolvedThumbnailId = null;
    if (thumbnailUrl) {
      let thumb = await (prisma as any).serviceThumbnail.findFirst({ where: { url: thumbnailUrl } });
      if (!thumb) thumb = await (prisma as any).serviceThumbnail.create({ data: { url: thumbnailUrl } });
      resolvedThumbnailId = thumb.id;
    }

    let resolvedBackgroundCoverId = null;
    if (backgroundCoverUrl) {
      let cover = await (prisma as any).serviceBackgroundCover.findFirst({ where: { url: backgroundCoverUrl } });
      if (!cover) cover = await (prisma as any).serviceBackgroundCover.create({ data: { url: backgroundCoverUrl } });
      resolvedBackgroundCoverId = cover.id;
    }

    const slugs = translations.map((t: any) => t.slug)
    const existingSlugs = await (prisma as any).serviceTranslation.findFirst({
      where: { slug: { in: slugs }, serviceId: { not: id } }
    })
    if (existingSlugs) return NextResponse.json({ error: 'One or more slugs are already in use' }, { status: 400 })

    const updatedService = await (prisma as any).service.update({
      where: { id },
      data: {
        orderNumber,
        serviceTypeId,
        thumbnailId: resolvedThumbnailId, // Sẽ tự động gỡ ảnh (null) nếu user xóa URL
        backgroundCoverId: resolvedBackgroundCoverId, // Tương tự
        translations: {
          deleteMany: {},
          create: translations.map((t: any) => ({
            language: t.language,
            slug: t.slug,
            title: t.title,
            description: t.description,
            shortDescription: t.shortDescription,
            content: t.content,
            seoTitle: t.seoTitle,
            seoDescription: t.seoDescription,
            seoKeywords: t.seoKeywords || [],
          }))
        }
      },
      include: { serviceType: true, thumbnail: true, backgroundCover: true, translations: true }
    })

    return NextResponse.json(updatedService, { status: 200 })
  } catch (error) {
    console.error('Error updating service:', error)
    return NextResponse.json({ error: 'Failed to update service' }, { status: 500 })
  }
}