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
            .from('Service')
            .select(
                `id, orderNumber, serviceTypeId, thumbnailId, backgroundCoverId, createdAt, updatedAt,
                service_type:ServiceType(id, code, createdAt, updatedAt,
                    translations:ServiceTypeTranslation(id, serviceTypeId, language, displayName, description, brochureUrl)
                ),
                thumbnail:ServiceThumbnail(id, url, type),
                background_cover:ServiceBackgroundCover(id, url, type),
                translations:ServiceTranslation(id, serviceId, language, slug, title, description, shortDescription, content, seoTitle, seoDescription, seoKeywords)`
            )
            .order('orderNumber', { ascending: true })
        if (error) throw error
        return data.map(mapService)
    },

    getById: async (id: string) => {
        const { data, error } = await supabase
            .from('Service')
            .select(
                `id, orderNumber, serviceTypeId, thumbnailId, backgroundCoverId, createdAt, updatedAt,
                service_type:ServiceType(id, code, createdAt, updatedAt,
                    translations:ServiceTypeTranslation(id, serviceTypeId, language, displayName, description, brochureUrl)
                ),
                thumbnail:ServiceThumbnail(id, url, type),
                background_cover:ServiceBackgroundCover(id, url, type),
                translations:ServiceTranslation(id, serviceId, language, slug, title, description, shortDescription, content, seoTitle, seoDescription, seoKeywords)`
            )
            .eq('id', id)
            .single()
        if (error) throw error
        return mapService(data)
    },

    getBySlug: async (slug: string) => {
        const { data, error } = await supabase
            .from('ServiceTranslation')
            .select(
                `id, serviceId, language, slug, title, description, shortDescription, content, seoTitle, seoDescription, seoKeywords,
                service:Service(
                    id, orderNumber, serviceTypeId, thumbnailId, backgroundCoverId, createdAt, updatedAt,
                    service_type:ServiceType(id, code, createdAt, updatedAt,
                        translations:ServiceTypeTranslation(id, serviceTypeId, language, displayName, description, brochureUrl)
                    ),
                    thumbnail:ServiceThumbnail(id, url, type),
                    background_cover:ServiceBackgroundCover(id, url, type),
                    translations:ServiceTranslation(id, serviceId, language, slug, title, description, shortDescription, content, seoTitle, seoDescription, seoKeywords)
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

        const { data: existingOrder } = await supabase
            .from('Service')
            .select('id')
            .eq('orderNumber', orderNumber)
            .maybeSingle()
        if (existingOrder) throw new Error('Order number already exists')

        let thumbnailId: string | null = null
        if (thumbnailUrl) {
            const { data: existingThumb } = await supabase
                .from('ServiceThumbnail')
                .select('id')
                .eq('url', thumbnailUrl)
                .maybeSingle()
            if (existingThumb) {
                thumbnailId = existingThumb.id
            } else {
                const { data: newThumb, error } = await supabase
                    .from('ServiceThumbnail')
                    .insert({ url: thumbnailUrl })
                    .select('id')
                    .single()
                if (error) throw error
                thumbnailId = newThumb.id
            }
        }

        let backgroundCoverId: string | null = null
        if (backgroundCoverUrl) {
            const { data: existingCover } = await supabase
                .from('ServiceBackgroundCover')
                .select('id')
                .eq('url', backgroundCoverUrl)
                .maybeSingle()
            if (existingCover) {
                backgroundCoverId = existingCover.id
            } else {
                const { data: newCover, error } = await supabase
                    .from('ServiceBackgroundCover')
                    .insert({ url: backgroundCoverUrl })
                    .select('id')
                    .single()
                if (error) throw error
                backgroundCoverId = newCover.id
            }
        }

        const slugs = translations.map((t) => t.slug)
        const { data: existingSlugs } = await supabase
            .from('ServiceTranslation')
            .select('slug')
            .in('slug', slugs)
        if (existingSlugs && existingSlugs.length > 0) {
            throw new Error(
                `Slugs already exist: ${existingSlugs.map((s) => s.slug).join(', ')}`
            )
        }

        const { data: service, error: serviceError } = await supabase
            .from('Service')
            .insert({
                orderNumber,
                serviceTypeId: serviceTypeId ?? null,
                thumbnailId,
                backgroundCoverId,
            })
            .select('id')
            .single()
        if (serviceError) throw serviceError

        const { error: translationsError } = await supabase
            .from('ServiceTranslation')
            .insert(
                translations.map((t) => ({
                    serviceId: service.id,
                    language: t.language,
                    slug: t.slug,
                    title: t.title,
                    description: t.description,
                    shortDescription: t.shortDescription,
                    content: t.content,
                    seoTitle: t.seoTitle ?? null,
                    seoDescription: t.seoDescription ?? null,
                    seoKeywords: t.seoKeywords ?? [],
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

        const { data: existingOrder } = await supabase
            .from('Service')
            .select('id')
            .eq('orderNumber', orderNumber)
            .neq('id', id)
            .maybeSingle()
        if (existingOrder) throw new Error('Order number is used by another service')

        let thumbnailId: string | null = null
        if (thumbnailUrl) {
            const { data: existingThumb } = await supabase
                .from('ServiceThumbnail')
                .select('id')
                .eq('url', thumbnailUrl)
                .maybeSingle()
            if (existingThumb) {
                thumbnailId = existingThumb.id
            } else {
                const { data: newThumb, error } = await supabase
                    .from('ServiceThumbnail')
                    .insert({ url: thumbnailUrl })
                    .select('id')
                    .single()
                if (error) throw error
                thumbnailId = newThumb.id
            }
        }

        let backgroundCoverId: string | null = null
        if (backgroundCoverUrl) {
            const { data: existingCover } = await supabase
                .from('ServiceBackgroundCover')
                .select('id')
                .eq('url', backgroundCoverUrl)
                .maybeSingle()
            if (existingCover) {
                backgroundCoverId = existingCover.id
            } else {
                const { data: newCover, error } = await supabase
                    .from('ServiceBackgroundCover')
                    .insert({ url: backgroundCoverUrl })
                    .select('id')
                    .single()
                if (error) throw error
                backgroundCoverId = newCover.id
            }
        }

        const slugs = translations.map((t) => t.slug)
        const { data: existingSlugs } = await supabase
            .from('ServiceTranslation')
            .select('slug')
            .in('slug', slugs)
            .neq('serviceId', id)
        if (existingSlugs && existingSlugs.length > 0) {
            throw new Error('One or more slugs are already in use')
        }

        const { error: serviceError } = await supabase
            .from('Service')
            .update({
                orderNumber,
                serviceTypeId: serviceTypeId ?? null,
                thumbnailId,
                backgroundCoverId,
            })
            .eq('id', id)
        if (serviceError) throw serviceError

        await supabase.from('ServiceTranslation').delete().eq('serviceId', id)
        const { error: translationsError } = await supabase
            .from('ServiceTranslation')
            .insert(
                translations.map((t) => ({
                    serviceId: id,
                    language: t.language,
                    slug: t.slug,
                    title: t.title,
                    description: t.description,
                    shortDescription: t.shortDescription,
                    content: t.content,
                    seoTitle: t.seoTitle ?? null,
                    seoDescription: t.seoDescription ?? null,
                    seoKeywords: t.seoKeywords ?? [],
                }))
            )
        if (translationsError) throw translationsError

        return servicesApi.getById(id)
    },

    delete: async (id: string) => {
        const { error } = await supabase.from('Service').delete().eq('id', id)
        if (error) throw error
    },
}

// ==========================================
// SERVICE TYPES
// ==========================================
export const serviceTypesApi = {
    list: async () => {
        const { data, error } = await supabase
            .from('ServiceType')
            .select(
                `id, code, createdAt, updatedAt,
                translations:ServiceTypeTranslation(id, serviceTypeId, language, displayName, description, brochureUrl),
                services:Service(id)`
            )
            .order('createdAt', { ascending: false })
        if (error) throw error
        return data.map(mapServiceType)
    },

    getById: async (id: string) => {
        const { data, error } = await supabase
            .from('ServiceType')
            .select(
                `id, code, createdAt, updatedAt,
                translations:ServiceTypeTranslation(id, serviceTypeId, language, displayName, description, brochureUrl),
                services:Service(id)`
            )
            .eq('id', id)
            .single()
        if (error) throw error
        return mapServiceType(data)
    },

    create: async (payload: TCreateServiceTypeFormValues) => {
        const { data: serviceType, error } = await supabase
            .from('ServiceType')
            .insert({ code: payload.code })
            .select('id')
            .single()
        if (error) throw error

        const { error: translationsError } = await supabase
            .from('ServiceTypeTranslation')
            .insert(
                payload.translations.map((t) => ({
                    serviceTypeId: serviceType.id,
                    language: t.language,
                    displayName: t.displayName,
                    description: t.description ?? null,
                    brochureUrl: t.brochureUrl ?? null,
                }))
            )
        if (translationsError) throw translationsError

        return serviceTypesApi.getById(serviceType.id)
    },

    update: async (payload: TUpdateServiceTypeFormValues) => {
        const { id, translations } = payload

        const { error } = await supabase
            .from('ServiceType')
            .update({ code: payload.code })
            .eq('id', id)
        if (error) throw error

        await supabase
            .from('ServiceTypeTranslation')
            .delete()
            .eq('serviceTypeId', id)

        const { error: translationsError } = await supabase
            .from('ServiceTypeTranslation')
            .insert(
                translations.map((t) => ({
                    serviceTypeId: id,
                    language: t.language,
                    displayName: t.displayName,
                    description: t.description ?? null,
                    brochureUrl: t.brochureUrl ?? null,
                }))
            )
        if (translationsError) throw translationsError

        return serviceTypesApi.getById(id)
    },

    delete: async (id: string) => {
        const { error } = await supabase
            .from('ServiceType')
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
            .from('Post')
            .select(
                `id, thumbnailUrl, bgCoverUrl, countView, createdAt, updatedAt,
                translations:PostTranslation(id, postId, language, slug, title, shortDescription, content, tags, seoTitle, seoDescription, seoKeywords)`
            )
            .order('createdAt', { ascending: false })
        if (error) throw error
        return data.map(mapPost)
    },

    getById: async (id: string) => {
        const { data, error } = await supabase
            .from('Post')
            .select(
                `id, thumbnailUrl, bgCoverUrl, countView, createdAt, updatedAt,
                translations:PostTranslation(id, postId, language, slug, title, shortDescription, content, tags, seoTitle, seoDescription, seoKeywords)`
            )
            .eq('id', id)
            .single()
        if (error) throw error
        return mapPost(data)
    },
}

// ==========================================
// MAPPERS: DB columns → app shape
// ==========================================
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapServiceType(row: Record<string, any>) {
    return {
        id: row.id,
        code: row.code,
        createdAt: row.createdAt,
        updatedAt: row.updatedAt,
        services: (row.services ?? []).map((s: Record<string, unknown>) => ({ id: s.id })),
        translations: (row.translations ?? []).map(
            (t: Record<string, unknown>) => ({
                id: t.id,
                serviceTypeId: t.serviceTypeId,
                language: t.language,
                displayName: t.displayName,
                description: t.description ?? null,
                brochureUrl: t.brochureUrl ?? null,
                code: row.code,
            })
        ),
    }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapService(row: Record<string, any>) {
    return {
        id: row.id,
        orderNumber: row.orderNumber,
        serviceTypeId: row.serviceTypeId ?? null,
        thumbnailId: row.thumbnailId ?? null,
        backgroundCoverId: row.backgroundCoverId ?? null,
        createdAt: row.createdAt,
        updatedAt: row.updatedAt,
        serviceType: row.service_type ? mapServiceType(row.service_type) : undefined,
        thumbnail: row.thumbnail
            ? { id: row.thumbnail.id, url: row.thumbnail.url, type: row.thumbnail.type }
            : null,
        backgroundCover: row.background_cover
            ? { id: row.background_cover.id, url: row.background_cover.url, type: row.background_cover.type }
            : null,
        translations: (row.translations ?? []).map(
            (t: Record<string, unknown>) => ({
                id: t.id,
                serviceId: t.serviceId,
                language: t.language,
                slug: t.slug,
                title: t.title,
                description: t.description,
                shortDescription: t.shortDescription,
                content: t.content,
                seoTitle: t.seoTitle ?? null,
                seoDescription: t.seoDescription ?? null,
                seoKeywords: t.seoKeywords ?? [],
            })
        ),
    }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapPost(row: Record<string, any>) {
    return {
        id: row.id,
        thumbnailUrl: row.thumbnailUrl,
        bgCoverUrl: row.bgCoverUrl ?? null,
        countView: row.countView,
        createdAt: row.createdAt,
        updatedAt: row.updatedAt,
        translations: (row.translations ?? []).map(
            (t: Record<string, unknown>) => ({
                id: t.id,
                postId: t.postId,
                language: t.language,
                slug: t.slug,
                title: t.title,
                shortDescription: t.shortDescription ?? null,
                content: t.content,
                tags: t.tags ?? [],
                seoTitle: t.seoTitle ?? null,
                seoDescription: t.seoDescription ?? null,
                seoKeywords: t.seoKeywords ?? [],
            })
        ),
    }
}
