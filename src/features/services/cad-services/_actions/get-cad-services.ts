import {
    type GetServicesListParams,
    getServiceDetail,
    getServicesList,
} from '../../_actions'

const CAD_CATEGORY_SLUG = 'cad-services'

type CadServicesParams = Omit<GetServicesListParams, 'categorySlug'>

export function getCadServices(params: CadServicesParams = {}) {
    return getServicesList({ ...params, categorySlug: CAD_CATEGORY_SLUG })
}

export function getCadServiceDetail(slug: string) {
    return getServiceDetail(slug, CAD_CATEGORY_SLUG)
}
