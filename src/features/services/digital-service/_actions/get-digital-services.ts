import {
    type GetServicesListParams,
    getServiceDetail,
    getServicesList,
} from '../../_actions'

const DIGITAL_CATEGORY_SLUG = 'digital-services'

type DigitalServicesParams = Omit<GetServicesListParams, 'categorySlug'>

export function getDigitalServices(params: DigitalServicesParams = {}) {
    return getServicesList({ ...params, categorySlug: DIGITAL_CATEGORY_SLUG })
}

export function getDigitalServiceDetail(slug: string) {
    return getServiceDetail(slug, DIGITAL_CATEGORY_SLUG)
}
