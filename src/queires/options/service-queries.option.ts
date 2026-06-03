import { queryOptions } from '@tanstack/react-query'
import { parseData, parseList } from '@/lib'
import { servicesApi } from '@/lib/supabase-api'
import { ServiceSchema, TCreateServiceFormValues, TUpdateServiceFormValues } from '@/validationSchemas'

export const serviceApi = {
    list: servicesApi.list,
    detail: servicesApi.getById,
    detailBySlug: servicesApi.getBySlug,
    create: (data: TCreateServiceFormValues) => servicesApi.create(data),
    update: (data: TUpdateServiceFormValues) => servicesApi.update(data),
}

export const serviceListOptions = queryOptions({
    queryKey: ['services'],
    queryFn: async () => await serviceApi.list(),
    select: (res) => {
        return { services: parseList(ServiceSchema, res) }
    },
})

export const serviceOptions = (id: string) => {
    return queryOptions({
        queryKey: ['services', 'identifier', id],
        queryFn: async () => await serviceApi.detail(id),
        select: (res) => {
            const service = parseData(ServiceSchema, res)
            return { service }
        },
    })
}

export const serviceBySlugOptions = (slug: string) => {
    return queryOptions({
        queryKey: ['services', 'slug', slug],
        queryFn: async () => await serviceApi.detailBySlug(slug),
        select: (res) => {
            const service = parseData(ServiceSchema, res)
            return { service }
        },
    })
}
