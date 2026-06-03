import { supabase } from './supabase'
import {
    TCreateServiceFormValues,
    TUpdateServiceFormValues,
} from '@/validationSchemas'
import {
    TCreateServiceTypeFormValues,
    TUpdateServiceTypeFormValues,
} from '@/validationSchemas'

// ==========================================
// SERVICES
// ==========================================
export const servicesApi = {
    list: async () => {
        const { data, error } = await supabase
            .from('services')
            .select(
                `id, order_number, service_type_id, thumbnail_id, background_cover_id, created_at, updated_at,
                service_type:service_types(id, code, created_at, updated_at,
                    translations:service_type_translations(id, service_type_id, language, display_name, description, brochure_url)
                ),
                thumbnail:service_thumbnails(id, url, type),
                background_cover:service_background_covers(id, url, type),
                translations:service_translations(id, service_id, language, slug, title, description, short_description, content, seo_title, seo_description, seo_keywords)`
            )
            .order('order_number', { ascending: true })
        if (error) throw error
        return data.map(mapService)
    },

    getById: async (id: string) => {
        const { data, error } = await supabase
            .from('services')
            .select(
                `id, order_number, service_type_id, thumbnail_id, background_cover_id, created_at, updated_at,
                service_type:service_types(id, code, created_at, updated_at,
                    translations:service_type_translations(id, service_type_id, language, display_name, description, brochure_url)
                ),
                thumbnail:service_thumbnails(id, url, type),
                background_cover:service_background_covers(id, url, type),
                translations:service_translations(id, service_id, language, slug, title, description, short_description, content, seo_title, seo_description, seo_keywords)`
            )
            .eq('id', id)
            .single()
        if (error) throw error
        return mapService(data)
    },

    getBySlug: async (slug: string) => {
        const { data, error } = await supabase
            .from('service_translations')
            .select(
                `id, service_id, language, slug, title, description, short_description, content, seo_title, seo_description, seo_keywords,
                service:services(
                    id, order_number, service_type_id, thumbnail_id, background_cover_id, created_at, updated_at,
                    service_type:service_types(id, code, created_at, updated_at,
                        translations:service_type_translations(id, service_type_id, language, display_name, description, brochure_url)
                    ),
                    thumbnail:service_thumbnails(id, url, type),
                    background_cover:service_background_covers(id, url, type),
                    translations:service_translations(id, service_id, language, slug, title, description, short_description, content, seo_title, seo_description, seo_keywords)
                )`
            )
            .eq('slug', slug)
            .single()
        if (error) throw error
        return mapService(data.service as unknown as Record<string, unknown>)
    },

    create: async (payload: TCreateServiceFormValues) => {
        const {
            orderNumber,
            serviceTypeId,
            thumbnailUrl,
            backgroundCoverUrl,
            translations,
        } = payload

        // Validate order number uniqueness
        const { data: existingOrder } = await supabase
            .from('services')
            .select('id')
            .eq('order_number', orderNumber)
            .maybeSingle()
        if (existingOrder) throw new Error('Order number already exists')

        // Find or create thumbnail
        let thumbnailId: string | null = null
        if (thumbnailUrl) {
            const { data: existingThumb } = await supabase
                .from('service_thumbnails')
                .select('id')
                .eq('url', thumbnailUrl)
                .maybeSingle()
            if (existingThumb) {
                thumbnailId = existingThumb.id
            } else {
                const { data: newThumb, error } = await supabase
                    .from('service_thumbnails')
                    .insert({ url: thumbnailUrl })
                    .select('id')
                    .single()
                if (error) throw error
                thumbnailId = newThumb.id
            }
        }

        // Find or create background cover
        let backgroundCoverId: string | null = null
        if (backgroundCoverUrl) {
            const { data: existingCover } = await supabase
                .from('service_background_covers')
                .select('id')
                .eq('url', backgroundCoverUrl)
                .maybeSingle()
            if (existingCover) {
                backgroundCoverId = existingCover.id
            } else {
                const { data: newCover, error } = await supabase
                    .from('service_background_covers')
                    .insert({ url: backgroundCoverUrl })
                    .select('id')
                    .single()
                if (error) throw error
                backgroundCoverId = newCover.id
            }
        }

        // Check slug uniqueness
        const slugs = translations.map((t) => t.slug)
        const { data: existingSlugs } = await supabase
            .from('service_translations')
            .select('slug')
            .in('slug', slugs)
        if (existingSlugs && existingSlugs.length > 0) {
            throw new Error(
                `Slugs already exist: ${existingSlugs.map((s) => s.slug).join(', ')}`
            )
        }

        // Create service
        const { data: service, error: serviceError } = await supabase
            .from('services')
            .insert({
                order_number: orderNumber,
                service_type_id: serviceTypeId ?? null,
                thumbnail_id: thumbnailId,
                background_cover_id: backgroundCoverId,
            })
            .select('id')
            .single()
        if (serviceError) throw serviceError

        // Create translations
        const { error: translationsError } = await supabase
            .from('service_translations')
            .insert(
                translations.map((t) => ({
                    service_id: service.id,
                    language: t.language,
                    slug: t.slug,
                    title: t.title,
                    description: t.description,
                    short_description: t.shortDescription,
                    content: t.content,
                    seo_title: t.seoTitle ?? null,
                    seo_description: t.seoDescription ?? null,
                    seo_keywords: t.seoKeywords ?? [],
                }))
            )
        if (translationsError) throw translationsError

        return servicesApi.getById(service.id)
    },

    update: async (payload: TUpdateServiceFormValues) => {
        const {
            id,
            orderNumber,
            serviceTypeId,
            thumbnailUrl,
            backgroundCoverUrl,
            translations,
        } = payload

        // Check order number not taken by another service
        const { data: existingOrder } = await supabase
            .from('services')
            .select('id')
            .eq('order_number', orderNumber)
            .neq('id', id)
            .maybeSingle()
        if (existingOrder) throw new Error('Order number is used by another service')

        // Find or create thumbnail
        let thumbnailId: string | null = null
        if (thumbnailUrl) {
            const { data: existingThumb } = await supabase
                .from('service_thumbnails')
                .select('id')
                .eq('url', thumbnailUrl)
                .maybeSingle()
            if (existingThumb) {
                thumbnailId = existingThumb.id
            } else {
                const { data: newThumb, error } = await supabase
                    .from('service_thumbnails')
                    .insert({ url: thumbnailUrl })
                    .select('id')
                    .single()
                if (error) throw error
                thumbnailId = newThumb.id
            }
        }

        // Find or create background cover
        let backgroundCoverId: string | null = null
        if (backgroundCoverUrl) {
            const { data: existingCover } = await supabase
                .from('service_background_covers')
                .select('id')
                .eq('url', backgroundCoverUrl)
                .maybeSingle()
            if (existingCover) {
                backgroundCoverId = existingCover.id
            } else {
                const { data: newCover, error } = await supabase
                    .from('service_background_covers')
                    .insert({ url: backgroundCoverUrl })
                    .select('id')
                    .single()
                if (error) throw error
                backgroundCoverId = newCover.id
            }
        }

        // Check slug uniqueness (exclude current service's slugs)
        const slugs = translations.map((t) => t.slug)
        const { data: existingSlugs } = await supabase
            .from('service_translations')
            .select('slug')
            .in('slug', slugs)
            .neq('service_id', id)
        if (existingSlugs && existingSlugs.length > 0) {
            throw new Error('One or more slugs are already in use')
        }

        // Update service
        const { error: serviceError } = await supabase
            .from('services')
            .update({
                order_number: orderNumber,
                service_type_id: serviceTypeId ?? null,
                thumbnail_id: thumbnailId,
                background_cover_id: backgroundCoverId,
            })
            .eq('id', id)
        if (serviceError) throw serviceError

        // Replace translations
        await supabase.from('service_translations').delete().eq('service_id', id)
        const { error: translationsError } = await supabase
            .from('service_translations')
            .insert(
                translations.map((t) => ({
                    service_id: id,
                    language: t.language,
                    slug: t.slug,
                    title: t.title,
                    description: t.description,
                    short_description: t.shortDescription,
                    content: t.content,
                    seo_title: t.seoTitle ?? null,
                    seo_description: t.seoDescription ?? null,
                    seo_keywords: t.seoKeywords ?? [],
                }))
            )
        if (translationsError) throw translationsError

        return servicesApi.getById(id)
    },

    delete: async (id: string) => {
        const { error } = await supabase.from('services').delete().eq('id', id)
        if (error) throw error
    },
}

// ==========================================
// SERVICE TYPES
// ==========================================
export const serviceTypesApi = {
    list: async () => {
        const { data, error } = await supabase
            .from('service_types')
            .select(
                `id, code, created_at, updated_at,
                translations:service_type_translations(id, service_type_id, language, display_name, description, brochure_url),
                services:services(id)`
            )
            .order('created_at', { ascending: false })
        if (error) throw error
        return data.map(mapServiceType)
    },

    getById: async (id: string) => {
        const { data, error } = await supabase
            .from('service_types')
            .select(
                `id, code, created_at, updated_at,
                translations:service_type_translations(id, service_type_id, language, display_name, description, brochure_url),
                services:services(id)`
            )
            .eq('id', id)
            .single()
        if (error) throw error
        return mapServiceType(data)
    },

    create: async (payload: TCreateServiceTypeFormValues) => {
        const { data: serviceType, error } = await supabase
            .from('service_types')
            .insert({ code: payload.code })
            .select('id')
            .single()
        if (error) throw error

        const { error: translationsError } = await supabase
            .from('service_type_translations')
            .insert(
                payload.translations.map((t) => ({
                    service_type_id: serviceType.id,
                    language: t.language,
                    display_name: t.displayName,
                    description: t.description ?? null,
                    brochure_url: t.brochureUrl ?? null,
                }))
            )
        if (translationsError) throw translationsError

        return serviceTypesApi.getById(serviceType.id)
    },

    update: async (payload: TUpdateServiceTypeFormValues) => {
        const { id, translations } = payload

        const { error } = await supabase
            .from('service_types')
            .update({ code: payload.code })
            .eq('id', id)
        if (error) throw error

        await supabase
            .from('service_type_translations')
            .delete()
            .eq('service_type_id', id)

        const { error: translationsError } = await supabase
            .from('service_type_translations')
            .insert(
                translations.map((t) => ({
                    service_type_id: id,
                    language: t.language,
                    display_name: t.displayName,
                    description: t.description ?? null,
                    brochure_url: t.brochureUrl ?? null,
                }))
            )
        if (translationsError) throw translationsError

        return serviceTypesApi.getById(id)
    },

    delete: async (id: string) => {
        const { error } = await supabase
            .from('service_types')
            .delete()
            .eq('id', id)
        if (error) throw error
    },
}

// ==========================================
// POSTS
// ==========================================
export const postsApi = {
    list: async () => {
        const { data, error } = await supabase
            .from('posts')
            .select(
                `id, thumbnail_url, bg_cover_url, count_view, created_at, updated_at,
                translations:post_translations(id, post_id, language, slug, title, short_description, content, tags, seo_title, seo_description, seo_keywords)`
            )
            .order('created_at', { ascending: false })
        if (error) throw error
        return data.map(mapPost)
    },

    getById: async (id: string) => {
        const { data, error } = await supabase
            .from('posts')
            .select(
                `id, thumbnail_url, bg_cover_url, count_view, created_at, updated_at,
                translations:post_translations(id, post_id, language, slug, title, short_description, content, tags, seo_title, seo_description, seo_keywords)`
            )
            .eq('id', id)
            .single()
        if (error) throw error
        return mapPost(data)
    },
}

// ==========================================
// MAPPERS: snake_case → camelCase
// ==========================================
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapServiceType(row: Record<string, any>) {
    return {
        id: row.id,
        code: row.code,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
        services: (row.services ?? []).map((s: Record<string, unknown>) => ({ id: s.id })),
        translations: (row.translations ?? []).map(
            (t: Record<string, unknown>) => ({
                id: t.id,
                serviceTypeId: t.service_type_id,
                language: t.language,
                displayName: t.display_name,
                description: t.description ?? null,
                brochureUrl: t.brochure_url ?? null,
                code: row.code,
            })
        ),
    }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapService(row: Record<string, any>) {
    return {
        id: row.id,
        orderNumber: row.order_number,
        serviceTypeId: row.service_type_id ?? null,
        thumbnailId: row.thumbnail_id ?? null,
        backgroundCoverId: row.background_cover_id ?? null,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
        serviceType: row.service_type ? mapServiceType(row.service_type) : undefined,
        thumbnail: row.thumbnail
            ? {
                  id: row.thumbnail.id,
                  url: row.thumbnail.url,
                  type: row.thumbnail.type,
              }
            : null,
        backgroundCover: row.background_cover
            ? {
                  id: row.background_cover.id,
                  url: row.background_cover.url,
                  type: row.background_cover.type,
              }
            : null,
        translations: (row.translations ?? []).map(
            (t: Record<string, unknown>) => ({
                id: t.id,
                serviceId: t.service_id,
                language: t.language,
                slug: t.slug,
                title: t.title,
                description: t.description,
                shortDescription: t.short_description,
                content: t.content,
                seoTitle: t.seo_title ?? null,
                seoDescription: t.seo_description ?? null,
                seoKeywords: t.seo_keywords ?? [],
            })
        ),
    }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapPost(row: Record<string, any>) {
    return {
        id: row.id,
        thumbnailUrl: row.thumbnail_url,
        bgCoverUrl: row.bg_cover_url ?? null,
        countView: row.count_view,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
        translations: (row.translations ?? []).map(
            (t: Record<string, unknown>) => ({
                id: t.id,
                postId: t.post_id,
                language: t.language,
                slug: t.slug,
                title: t.title,
                shortDescription: t.short_description ?? null,
                content: t.content,
                tags: t.tags ?? [],
                seoTitle: t.seo_title ?? null,
                seoDescription: t.seo_description ?? null,
                seoKeywords: t.seo_keywords ?? [],
            })
        ),
    }
}
