import { z } from 'zod'

import { type Post as PostView } from '@/validationSchemas/post.schema'

const LocalizedTextSchema = z.record(z.string(), z.string())

const PostSeoEntrySchema = z.object({
    metaTitle: z.string().optional(),
    metaDescription: z.string().optional(),
    focusKeyword: z.string().optional(),
    canonicalUrl: z.string().optional(),
})

const PostRowSchema = z.object({
    id: z.string().uuid(),
    slug: z.string(),
    title: LocalizedTextSchema.nullable(),
    short_description: LocalizedTextSchema.nullable(),
    content: LocalizedTextSchema.nullable().optional(),
    keywords: z.array(z.string()).nullable().optional(),
    tags: z.array(z.string()).nullable().optional(),
    thumbnail_url: z.string().nullable().optional(),
    bg_cover_url: z.string().nullable().optional(),
    seo: z.record(z.string(), PostSeoEntrySchema).nullable().optional(),
    count_view: z.number().int().default(0),
    status: z.enum(['draft', 'published']).default('published'),
    created_at: z.string(),
    updated_at: z.string(),
})

export type PostSeoEntry = z.infer<typeof PostSeoEntrySchema>

export type PublicPost = {
    id: string
    slug: string
    title: Record<string, string> | null
    shortDescription: Record<string, string> | null
    content: Record<string, string> | null
    keywords: string[]
    tags: string[]
    thumbnailUrl: string | null
    bgCoverUrl: string | null
    seo: Record<string, PostSeoEntry>
    countView: number
    status: 'draft' | 'published'
    createdAt: string
    updatedAt: string
}

export type GetPostsListParams = {
    tag?: string
    ascending?: boolean
    limit?: number
}

export function getLocalizedText(
    value: Record<string, string> | null | undefined,
    locale: string
) {
    if (!value) return ''

    return (
        value[locale]?.trim() ||
        value.en?.trim() ||
        Object.values(value).find((item) => item.trim()) ||
        ''
    )
}

export function getLocalizedSeo(
    value: Record<string, PostSeoEntry> | null | undefined,
    locale: string
) {
    if (!value) return undefined
    return value[locale] ?? value.en ?? Object.values(value)[0]
}

export function parsePost(row: unknown): PublicPost {
    const value = PostRowSchema.parse(row)

    return {
        id: value.id,
        slug: value.slug,
        title: value.title,
        shortDescription: value.short_description,
        content: value.content ?? null,
        keywords: value.keywords ?? [],
        tags: value.tags ?? [],
        thumbnailUrl: value.thumbnail_url ?? null,
        bgCoverUrl: value.bg_cover_url ?? null,
        seo: value.seo ?? {},
        countView: value.count_view,
        status: value.status,
        createdAt: value.created_at,
        updatedAt: value.updated_at,
    }
}

export function toPostView(post: PublicPost, locale: string): PostView {
    return {
        id: post.id,
        slug: post.slug,
        title: getLocalizedText(post.title, locale),
        shortDescription: getLocalizedText(post.shortDescription, locale),
        keywords: post.keywords,
        thumbnailUrl: post.thumbnailUrl ?? undefined,
        bgCoverUrl: post.bgCoverUrl,
        content: getLocalizedText(post.content, locale),
        tags: post.tags,
        countView: post.countView,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
    }
}
