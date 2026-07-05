import { createSupabaseBrowserClient } from '@/lib/supabase/client'
import {
    CadService,
    CadServiceSchema,
} from '@/validationSchemas/cad-service.schema'

const CAD_SERVICES_TABLE = 'cad_services'

type CadServiceListParams = {
    orderBy?: keyof Pick<CadService, 'id' | 'order' | 'slug'>
    ascending?: boolean
}

type CadServiceMutationPayload = Partial<CadService>

function parseCadService(data: unknown): CadService {
    return CadServiceSchema.parse(data)
}

export async function getCadServices(
    params: CadServiceListParams = {}
): Promise<CadService[]> {
    const supabase = createSupabaseBrowserClient()
    const { orderBy = 'order', ascending = true } = params

    const { data, error } = await supabase
        .from(CAD_SERVICES_TABLE)
        .select('*')
        .order(orderBy, { ascending })

    if (error) throw error

    return (data ?? []).map(parseCadService)
}

export async function getCadServiceBySlug(slug: string): Promise<CadService> {
    const supabase = createSupabaseBrowserClient()

    const { data, error } = await supabase
        .from(CAD_SERVICES_TABLE)
        .select('*')
        .eq('slug', slug)
        .single()

    if (error) throw error

    return parseCadService(data)
}

export async function createCadService(
    payload: CadServiceMutationPayload
): Promise<CadService> {
    const supabase = createSupabaseBrowserClient()

    const { data, error } = await supabase
        .from(CAD_SERVICES_TABLE)
        .insert(payload)
        .select('*')
        .single()

    if (error) throw error

    return parseCadService(data)
}

export async function updateCadService(
    slug: string,
    payload: CadServiceMutationPayload
): Promise<CadService> {
    const supabase = createSupabaseBrowserClient()

    const { data, error } = await supabase
        .from(CAD_SERVICES_TABLE)
        .update(payload)
        .eq('slug', slug)
        .select('*')
        .single()

    if (error) throw error

    return parseCadService(data)
}

export async function deleteCadService(slug: string): Promise<void> {
    const supabase = createSupabaseBrowserClient()

    const { error } = await supabase
        .from(CAD_SERVICES_TABLE)
        .delete()
        .eq('slug', slug)

    if (error) throw error
}
