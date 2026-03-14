import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const runtime = 'nodejs'

interface RouteParams {
	params: Promise<{ slug: string }>
}

export async function GET(request: NextRequest, { params }: RouteParams) {
	try {
		const { slug } = await params

		const service = await prisma.service.findFirst({
			where: {
				translations: {
					some: {
						slug: slug
					}
				}
			},
			include: {
				serviceType: true,
				verticalThumbnail: true,
				horizontalThumbnail: true,
				translations: true,
			}
		})

		if (!service) {
			return NextResponse.json({ error: 'Service not found' }, { status: 404 })
		}

		return NextResponse.json(service)
	} catch (error) {
		console.error('Error fetching service:', error)
		return NextResponse.json({ error: 'Failed to fetch service' }, { status: 500 })
	}
}
