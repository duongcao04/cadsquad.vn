import { createSupabaseBrowserClient } from '@/lib/supabase/client'

import {
    type GetServicesListParams,
    type Service,
    type ServiceSortBy,
    parseService,
} from './service.types'

const SORT_COLUMNS: Record<ServiceSortBy, string> = {
    order: 'order',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    slug: 'slug',
}

export async function getServicesList(
    params: GetServicesListParams = {}
): Promise<Service[]> {
    const supabase = createSupabaseBrowserClient()
    const {
        categorySlug,
        sortBy = 'order',
        filterBy = {},
        ascending = true,
    } = params

    let query = supabase
        .from('services')
        .select(
            `
        *,
        category:service_categories!inner(id, slug, name)
    `
        )
        .eq('status', 'published')

    if (categorySlug) {
        query = query.eq('service_categories.slug', categorySlug)
    }

    if (filterBy.isFeatured !== undefined) {
        query = query.eq(
            'display_settings->>isFeatured',
            String(filterBy.isFeatured)
        )
    }

    if (filterBy.serviceType) {
        query = query.eq('pricing->>serviceType', filterBy.serviceType)
    }

    const { data, error } = await query.order(SORT_COLUMNS[sortBy], {
        ascending,
    })

    if (error) throw error

    return (data ?? []).map(parseService)
}
