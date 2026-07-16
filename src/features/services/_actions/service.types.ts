import { z } from 'zod'

const LocalizedTextSchema = z.record(z.string(), z.string())

const ServiceCategorySchema = z.object({
    id: z.string().uuid(),
    slug: z.string(),
    name: LocalizedTextSchema.nullable(),
})

const ServiceRowSchema = z.object({
    id: z.string().uuid(),
    category_id: z.string().uuid().nullable(),
    order: z.number().int(),
    slug: z.string(),
    title: LocalizedTextSchema.nullable(),
    short_description: LocalizedTextSchema.nullable(),
    description: LocalizedTextSchema.nullable(),
    plain_description: LocalizedTextSchema.nullable(),
    content: LocalizedTextSchema.nullable(),
    thumbnail: z
        .object({
            vertical: z.string().optional(),
            horizontal: z.string().optional(),
            verticalType: z.string().optional(),
            horizontalType: z.string().optional(),
        })
        .nullable(),
    images: z.array(z.string()).nullable().optional(),
    seo: z.record(z.string(), z.unknown()).nullable().optional(),
    pricing: z.record(z.string(), z.unknown()).nullable().optional(),
    display_settings: z.record(z.string(), z.unknown()).nullable().optional(),
    status: z.enum(['draft', 'published']),
    created_at: z.string(),
    updated_at: z.string(),
    category: ServiceCategorySchema.nullable().optional(),
})

export type Service = {
    id: string
    categoryId: string | null
    category: z.infer<typeof ServiceCategorySchema> | null
    order: number
    slug: string
    title: Record<string, string> | null
    shortDescription: Record<string, string> | null
    description: Record<string, string> | null
    plainDescription: Record<string, string> | null
    content: Record<string, string> | null
    thumbnail: z.infer<typeof ServiceRowSchema>['thumbnail']
    images: string[]
    seo: Record<string, unknown>
    pricing: Record<string, unknown>
    displaySettings: Record<string, unknown>
    status: 'draft' | 'published'
    createdAt: string
    updatedAt: string
}

export type ServiceSortBy = 'order' | 'createdAt' | 'updatedAt' | 'slug'

export type ServiceFilterBy = {
    isFeatured?: boolean
    serviceType?: 'single' | 'package' | 'custom'
}

export type GetServicesListParams = {
    categorySlug?: string
    sortBy?: ServiceSortBy
    filterBy?: ServiceFilterBy
    ascending?: boolean
}

export function parseService(row: unknown): Service {
    const value = ServiceRowSchema.parse(row)

    return {
        id: value.id,
        categoryId: value.category_id,
        category: value.category ?? null,
        order: value.order,
        slug: value.slug,
        title: value.title,
        shortDescription: value.short_description,
        description: value.description,
        plainDescription: value.plain_description,
        content: value.content,
        thumbnail: value.thumbnail,
        images: value.images ?? [],
        seo: value.seo ?? {},
        pricing: value.pricing ?? {},
        displaySettings: value.display_settings ?? {},
        status: value.status,
        createdAt: value.created_at,
        updatedAt: value.updated_at,
    }
}
