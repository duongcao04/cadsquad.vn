/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs'

export async function GET() {
  try {
    // @ts-ignore
    const posts = await (prisma as any).post.findMany({
      include: {
        translations: true,
      },
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(posts)
  } catch (error) {
    console.error('Error fetching posts:', error)
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
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

    // Check for unique slugs across translations
    const slugs = translations.map((t: any) => t.slug)
    const existingSlugs = await (prisma as any).postTranslation.findMany({
      where: { slug: { in: slugs } },
      select: { slug: true }
    })
    if (existingSlugs.length > 0) {
      return NextResponse.json({ error: 'Some slugs already exist', slugs: existingSlugs.map((s: { slug: string }) => s.slug) }, { status: 400 })
    }

    // @ts-ignore
    const post = await (prisma as any).post.create({
      data: {
        thumbnailUrl,
        bgCoverUrl,
        translations: {
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

    return NextResponse.json(post, { status: 201 })
  } catch (error) {
    console.error('Error creating post:', error)
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 })
  }
}