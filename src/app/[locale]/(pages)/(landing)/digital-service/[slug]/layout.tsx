import { getLocale } from 'next-intl/server'

import { CAD_SERVICES } from '@/shared/database/cadServices'

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string; slug: string }>
}) {
    const locale = await getLocale()
    const { slug } = await params

    const data = CAD_SERVICES.find((srv) => srv.slug === slug)

    const title = locale === 'vi' ? data?.title?.vi : data?.title?.original
    const description = locale === 'vi' ? data?.plainDescription?.vi : data?.plainDescription?.original

    return {
        title: title + ' | Cadsquad.vn',
        description,
        // keywords: data?.description?.split(','),
        openGraph: {
            title: title,
            description: description,
            images: [
                {
                    url: data?.thumbnail.horizontal,
                    width: 1200,
                    height: 630,
                    alt: title,
                },
            ],
            siteName: 'Cadsquad.vn',
            locale: 'en_US',
            type: 'website',
        },
        alternates: {
            canonical: `https://cadsquad.vn/cad-services/${data?.slug}`,
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
