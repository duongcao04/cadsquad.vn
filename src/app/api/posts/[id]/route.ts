/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const runtime = 'nodejs'

interface RouteParams {
  params: Promise<{ id: string }>
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params

    // @ts-ignore
    const post = await (prisma as any).post.findUnique({
      where: { id },
      include: {
        translations: true,
      }
    })

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }

    return NextResponse.json(post)
  } catch (error) {
    console.error('Error fetching post:', error)
    return NextResponse.json({ error: 'Failed to fetch post' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params
    const body = await request.json()
    const { thumbnailUrl, bgCoverUrl, translations } = body

    // Validate required fields
    if (!thumbnailUrl || !translations || !Array.isArray(translations) || translations.length === 0) {
      return NextResponse.json({ error: 'Missing required fields: thumbnailUrl and translations' }, { status: 400 })
    }

    // Validate translations
    for (const trans of translations) {
      if (!trans.language || !trans.slug || !trans.title || !trans.content) {
        return NextResponse.json({ error: 'Each translation must have language, slug, title, and content' }, { status: 400 })
      }
    }

    // Check for unique slugs across translations (excluding current post's translations)
    const slugs = translations.map((t: any) => t.slug)
    const existingSlugs = await (prisma as any).postTranslation.findMany({
      where: {
        slug: { in: slugs },
        postId: { not: id }
      },
      select: { slug: true }
    })
    if (existingSlugs.length > 0) {
      return NextResponse.json({ error: 'Some slugs already exist', slugs: existingSlugs.map((s: { slug: string }) => s.slug) }, { status: 400 })
    }

    // @ts-ignore
    const post = await (prisma as any).post.update({
      where: { id },
      data: {
        thumbnailUrl,
        bgCoverUrl,
        translations: {
          deleteMany: {}, // Delete existing translations
          create: translations.map((t: any) => ({
            language: t.language,
            slug: t.slug,
            title: t.title,
            shortDescription: t.shortDescription,
            content: t.content,
            tags: t.tags || [],
            seoTitle: t.seoTitle,
            seoDescription: t.seoDescription,
            seoKeywords: t.seoKeywords || [],
          }))
        }
      },
      include: {
        translations: true,
      }
    })

    return NextResponse.json(post)
  } catch (error) {
    console.error('Error updating post:', error)
    return NextResponse.json({ error: 'Failed to update post' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params

    await prisma.post.delete({
      where: { id }
    })

    return NextResponse.json({ message: 'Post deleted successfully' })
  } catch (error) {
    console.error('Error deleting post:', error)
    return NextResponse.json({ error: 'Failed to delete post' }, { status: 500 })
  }
}