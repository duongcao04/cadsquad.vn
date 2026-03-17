import { getLocale } from 'next-intl/server'

import { parseData } from '@/lib'
import { serviceApi } from '@/queires'
import { TServiceTranslation } from '@/types'
import { ServiceSchema } from '@/validationSchemas'

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string; slug: string }>
}) {
    const locale = await getLocale()
    const { slug } = await params

    const service = await serviceApi
        .detailBySlug(slug)
        .then((res) => parseData(ServiceSchema, res))
    const serviceTranslation = (service?.translations.find(
        (it) => it.language === locale.toUpperCase()
    ) ??
        service?.translations.find(
            (it) => it.language === 'EN'
        )) as TServiceTranslation

    return {
        title: serviceTranslation.title + ' | Cadsquad.vn',
        description: serviceTranslation.seoDescription,
        // keywords: data?.description?.split(','),
        openGraph: {
            title: serviceTranslation.seoTitle,
            description: serviceTranslation.seoDescription,
            images: [
                {
                    url: service?.thumbnail?.url,
                    width: 1200,
                    height: 630,
                    alt: serviceTranslation.seoTitle,
                },
            ],
            siteName: 'Cadsquad.vn',
            locale: 'en_US',
            type: 'website',
        },
        alternates: {
            canonical: `https://cadsquad.vn/cad-services/${serviceTranslation?.slug}`,
        },
    }
}

export default function CADServiceDetailLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return children
}
