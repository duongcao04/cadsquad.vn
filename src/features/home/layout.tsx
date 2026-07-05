import { Metadata } from 'next'

import { getTranslations } from 'next-intl/server'

export async function generateMetadata({
    params,
}: Readonly<{
    params: Promise<{ locale: string }>
}>): Promise<Metadata> {
    // Get locale and check if it's valid
    const { locale } = await params

    // Use server-side translations
    const tMetadata = await getTranslations({
        locale,
        namespace: 'metadata.home',
    })

    return {
        title: tMetadata('title'),
        description: tMetadata('description'),
        keywords: tMetadata('keywords').split(','),
        openGraph: {
            title: tMetadata('ogTitle'),
            description: tMetadata('ogDescription'),
            images: [
                {
                    url: tMetadata('ogImage'),
                    width: 1200,
                    height: 630,
                    alt: tMetadata('ogTitle'),
                },
            ],
            siteName: 'Cadsquad.vn',
            locale: 'en_US',
            type: 'website',
        },
        alternates: {
            canonical: tMetadata('canonical'),
        },
    }
}

export default function HomeLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <div className="mt-[-106px]">{children}</div>
}
