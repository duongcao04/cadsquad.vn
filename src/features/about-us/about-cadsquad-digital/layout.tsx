import { getTranslations } from 'next-intl/server'

export async function generateMetadata({
    params,
}: Readonly<{
    params: Promise<{ locale: string }>
}>) {
    const { locale } = await params

    const t = await getTranslations({
        locale,
        namespace: 'landing.aboutCadsquadDigital.heading',
    })

    return {
        title: t('title'),
        description: t('description'),
    }
}

export default function AboutCadsquadDigitalLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return children
}
