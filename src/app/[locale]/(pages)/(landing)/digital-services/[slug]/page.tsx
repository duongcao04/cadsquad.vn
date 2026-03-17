import { getLocale } from 'next-intl/server'

import { DetailClientPage } from '@/features/service-details'

export default async function CADServiceDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const locale = await getLocale()
    const { slug } = await params
    return (
        <div className="min-h-screen pb-20 max-w-screen">
            <DetailClientPage slug={slug} locale={locale} />
        </div>
    )
}
