import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const runtime = 'nodejs'

interface RouteParams {
  params: Promise<{ id: string }>
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params

    const translation = await (prisma as any).postTranslation.findUnique({
      where: { id },
      include: {
        post: true,
      }
    })

    if (!translation) {
      return NextResponse.json({ error: 'Post translation not found' }, { status: 404 })
    }

    return NextResponse.json(translation)
  } catch (error) {
    console.error('Error fetching post translation:', error)
    return NextResponse.json({ error: 'Failed to fetch post translation' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params
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

    // Check if another translation exists for this post and language
    const existing = await (prisma as any).postTranslation.findFirst({
      where: {
        postId,
        language,
        id: { not: id }
      }
    })
    if (existing) {
      return NextResponse.json({ error: 'Another translation already exists for this post and language' }, { status: 400 })
    }

    // Check if slug is unique (excluding current)
    const existingSlug = await (prisma as any).postTranslation.findFirst({
      where: {
        slug,
        id: { not: id }
      }
    })
    if (existingSlug) {
      return NextResponse.json({ error: 'Slug already exists' }, { status: 400 })
    }

    const translation = await (prisma as any).postTranslation.update({
      where: { id },
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

    return NextResponse.json(translation)
  } catch (error) {
    console.error('Error updating post translation:', error)
    return NextResponse.json({ error: 'Failed to update post translation' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params

    await (prisma as any).postTranslation.delete({
      where: { id }
    })

    return NextResponse.json({ message: 'Post translation deleted successfully' })
  } catch (error) {
    console.error('Error deleting post translation:', error)
    return NextResponse.json({ error: 'Failed to delete post translation' }, { status: 500 })
  }
}