import { queryOptions } from '@tanstack/react-query'

import { queryKeys } from '@/shared/constants/query-keys'

import { getCadServiceBySlug, getCadServices } from '../_api'

type CadServiceListParams = Parameters<typeof getCadServices>[0]

export const cadServiceQueries = {
    lists: () =>
        queryOptions({
            queryKey: queryKeys.cadServices.lists(),
            queryFn: () => getCadServices(),
        }),
    list: (params?: CadServiceListParams) =>
        queryOptions({
            queryKey: queryKeys.cadServices.list(params),
            queryFn: () => getCadServices(params),
        }),
    detail: (slug: string) =>
        queryOptions({
            queryKey: queryKeys.cadServices.detail(slug),
            queryFn: () => getCadServiceBySlug(slug),
            enabled: Boolean(slug),
        }),
}
