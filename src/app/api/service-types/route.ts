import { prisma } from '@/lib/prisma';
import { CreateServiceTypeFormSchema, UpdateServiceTypeFormSchema } from '@/validationSchemas';
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs'

export async function GET() {
  try {
    const serviceTypes = await prisma.serviceType.findMany({
      include: {
        translations: true,
        services: true,
      },
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(serviceTypes)
  } catch (error) {
    console.error('Error fetching service types:', error)
    return NextResponse.json({ error: 'Failed to fetch service types' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // 2. Validate the request body using Zod
    const validationResult = CreateServiceTypeFormSchema.safeParse(body)

    if (!validationResult.success) {
      // Return 400 with specific formatting errors
      return NextResponse.json(
        { error: 'Validation failed', details: validationResult.error.format() },
        { status: 400 }
      )
    }

    const { code, translations } = validationResult.data

    // 3. Check if code is unique
    const existing = await prisma.serviceType.findUnique({
      where: { code }
    })

    if (existing) {
      return NextResponse.json(
        { error: 'Service type code already exists. Please use a unique code.' },
        { status: 400 }
      )
    }

    // 4. Create the Service Type and its translations
    const serviceType = await prisma.serviceType.create({
      data: {
        code,
        translations: {
          create: translations.map((t) => ({
            language: t.language,
            displayName: t.displayName,
            description: t.description,
            brochureUrl: t.brochureUrl,
          }))
        }
      },
      // Include the exact fields the frontend needs for the table view
      include: {
        translations: true,
        _count: {
          select: { services: true }
        }
      }
    })

    return NextResponse.json(serviceType, { status: 201 })

  } catch (error) {
    console.error('Error creating service type:', error)
    return NextResponse.json(
      { error: 'Failed to create service type due to an internal server error.' },
      { status: 500 }
    )
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();

    // 1. Validate the input
    const validatedData = UpdateServiceTypeFormSchema.parse(body);
    const { id, code, translations } = validatedData;

    // 2. Perform database update in a transaction
    const updatedServiceType = await prisma.$transaction(async (tx) => {
      // Update the main ServiceType record (e.g., the code)
      const serviceType = await tx.serviceType.update({
        where: { id },
        data: {
          ...(code && { code }),
        },
      });

      // Update translations: The simplest reliable method is to delete 
      // existing translations and recreate them from the payload.
      await tx.serviceTypeTranslation.deleteMany({
        where: { serviceTypeId: id },
      });

      await tx.serviceTypeTranslation.createMany({
        data: translations.map((t) => ({
          ...t,
          serviceTypeId: id,
        })),
      });

      return serviceType;
    });

    return NextResponse.json({
      message: 'Service category updated successfully',
      data: updatedServiceType
    });

  } catch (error) {
    if ((error as { name: string }).name === 'ZodError') {
      return NextResponse.json({ errors: (error as { errors: string }).errors }, { status: 400 });
    }

    return NextResponse.json(
      { message: 'Internal Server Error', error: (error as { message: string }).message },
      { status: 500 }
    );
  }
}