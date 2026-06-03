import { parseData, parseList } from '@/lib'
import { serviceTypesApi } from '@/lib/supabase-api'
import { ServiceTypeSchema, TCreateServiceTypeFormValues, TUpdateServiceTypeFormValues } from '@/validationSchemas'
import { queryOptions } from '@tanstack/react-query'

export const serviceTypesApi2 = {
    list: serviceTypesApi.list,
    detail: serviceTypesApi.getById,
    create: (data: TCreateServiceTypeFormValues) => serviceTypesApi.create(data),
    update: (data: TUpdateServiceTypeFormValues) => serviceTypesApi.update(data),
}

export const serviceTypesListOptions = queryOptions({
    queryKey: ['service-types'],
    queryFn: async () => await serviceTypesApi.list(),
    select: (res) => {
        const serviceTypes = parseList(ServiceTypeSchema, res)
        return { serviceTypes }
    },
})

export const serviceTypeOptions = (id: string) => {
    return queryOptions({
        queryKey: ['service-types', 'identifier', id],
        queryFn: async () => await serviceTypesApi.getById(id),
        select: (res) => {
            const serviceType = parseData(ServiceTypeSchema, res)
            return { serviceType }
        },
    })
}
