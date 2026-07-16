import { getTranslations } from 'next-intl/server'

import { getCadServices } from '@/features/services/cad-services/_actions'
import CadServicesContent from '@/features/services/cad-services/_components/cad-services-content'

export default async function CADServices() {
    const [services, tBreadcrumb, tCadServices] = await Promise.all([
        getCadServices(),
        getTranslations('breadcrumbs'),
        getTranslations('landing.cadServices'),
    ])

    return (
        <CadServicesContent
            services={services}
            labels={{
                home: tBreadcrumb('home'),
                breadcrumb: tBreadcrumb('cadService'),
                title: tCadServices('heading.title'),
                description: tCadServices('heading.description'),
            }}
        />
    )
}
