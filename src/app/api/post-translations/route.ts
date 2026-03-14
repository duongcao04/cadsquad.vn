import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs'

export async function GET() {
  try {
    const translations = await (prisma as any).postTranslation.findMany({
      include: {
        post: true,
      },
      orderBy: { postId: 'desc' }
    })
    return NextResponse.json(translations)
  } catch (error) {
    console.error('Error fetching post translations:', error)
    return NextResponse.json({ error: 'Failed to fetch post translations' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { postId, language, slug, title, shortDescription, content, tags, seoTitle, seoDescription, seoKeywords } = body

    // Validate required fields
    if (!postId || !language || !slug || !title || !content) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Check if post exists
    const post = await prisma.post.findUnique({ where: { id: postId } })
    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }

    // Check if translation already exists for this post and language
    const existing = await (prisma as any).postTranslation.findUnique({
      where: { postId_language: { postId, language } }
    })
    if (existing) {
      return NextResponse.json({ error: 'Translation already exists for this post and language' }, { status: 400 })
    }

    // Check if slug is unique
    const existingSlug = await (prisma as any).postTranslation.findUnique({ where: { slug } })
    if (existingSlug) {
      return NextResponse.json({ error: 'Slug already exists' }, { status: 400 })
    }

    const translation = await (prisma as any).postTranslation.create({
      data: {
        postId,
        language,
        slug,
        title,
        shortDescription,
        content,
        tags: tags || [],
        seoTitle,
        seoDescription,
        seoKeywords: seoKeywords || [],
      },
      include: {
        post: true,
      }
    })

    return NextResponse.json(translation, { status: 201 })
  } catch (error) {
    console.error('Error creating post translation:', error)
    return NextResponse.json({ error: 'Failed to create post translation' }, { status: 500 })
  }
}