import { createSupabaseBrowserClient } from '@/lib/supabase/client'

import { type Service, parseService } from './service.types'

export async function getServiceDetail(
    slug: string,
    categorySlug?: string
): Promise<Service | null> {
    const supabase = createSupabaseBrowserClient()
    let query = supabase
        .from('services')
        .select(
            `
                *,
                category:service_categories!inner(id, slug, name)
            `
        )
        .eq('slug', slug)
        .eq('status', 'published')

    if (categorySlug) {
        query = query.eq('service_categories.slug', categorySlug)
    }

    const { data, error } = await query.maybeSingle()

    if (error) throw error

    return data ? parseService(data) : null
}
