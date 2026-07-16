import { queryOptions } from '@tanstack/react-query'

import { queryKeys } from '@/shared/constants/query-keys'

import { getDigitalServiceBySlug, getDigitalServices } from '../_api'

type DigitalServiceListParams = Parameters<typeof getDigitalServices>[0]

export const digitalServiceQueries = {
    lists: () =>
        queryOptions({
            queryKey: queryKeys.digitalServices.lists(),
            queryFn: () => getDigitalServices(),
        }),
    list: (params?: DigitalServiceListParams) =>
        queryOptions({
            queryKey: queryKeys.digitalServices.list(params),
            queryFn: () => getDigitalServices(params),
        }),
    detail: (slug: string) =>
        queryOptions({
            queryKey: queryKeys.digitalServices.detail(slug),
            queryFn: () => getDigitalServiceBySlug(slug),
            enabled: Boolean(slug),
        }),
}
