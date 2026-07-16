import { createSupabaseBrowserClient } from '@/lib/supabase/client'

import {
    DigitalService,
    DigitalServiceSchema,
} from '../_schemas/digital-service.schema'

const DIGITAL_SERVICES_TABLE = 'digital_services'

type DigitalServiceListParams = {
    orderBy?: keyof Pick<DigitalService, 'id' | 'order' | 'slug'>
    ascending?: boolean
}

type DigitalServiceMutationPayload = Partial<DigitalService>

function parseDigitalService(data: unknown): DigitalService {
    return DigitalServiceSchema.parse(data)
}

export async function getDigitalServices(
    params: DigitalServiceListParams = {}
): Promise<DigitalService[]> {
    const supabase = createSupabaseBrowserClient()
    const { orderBy = 'order', ascending = true } = params

    const { data, error } = await supabase
        .from(DIGITAL_SERVICES_TABLE)
        .select('*')
        .order(orderBy, { ascending })

    if (error) throw error

    return (data ?? []).map(parseDigitalService)
}

export async function getDigitalServiceBySlug(
    slug: string
): Promise<DigitalService> {
    const supabase = createSupabaseBrowserClient()

    const { data, error } = await supabase
        .from(DIGITAL_SERVICES_TABLE)
        .select('*')
        .eq('slug', slug)
        .single()

    if (error) throw error

    return parseDigitalService(data)
}

export async function createDigitalService(
    payload: DigitalServiceMutationPayload
): Promise<DigitalService> {
    const supabase = createSupabaseBrowserClient()

    const { data, error } = await supabase
        .from(DIGITAL_SERVICES_TABLE)
        .insert(payload)
        .select('*')
        .single()

    if (error) throw error

    return parseDigitalService(data)
}

export async function updateDigitalService(
    slug: string,
    payload: DigitalServiceMutationPayload
): Promise<DigitalService> {
    const supabase = createSupabaseBrowserClient()

    const { data, error } = await supabase
        .from(DIGITAL_SERVICES_TABLE)
        .update(payload)
        .eq('slug', slug)
        .select('*')
        .single()

    if (error) throw error

    return parseDigitalService(data)
}

export async function deleteDigitalService(slug: string): Promise<void> {
    const supabase = createSupabaseBrowserClient()

    const { error } = await supabase
        .from(DIGITAL_SERVICES_TABLE)
        .delete()
        .eq('slug', slug)

    if (error) throw error
}
