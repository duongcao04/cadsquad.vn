import { getPostDetail } from '@/features/news-and-media/_actions'
import {
    getLocalizedSeo,
    getLocalizedText,
} from '@/features/news-and-media/_actions/post.types'

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string; slug: string }>
}) {
    const { locale, slug } = await params
    const data = await getPostDetail(slug)

    if (!data) return {}

    const title = getLocalizedText(data?.title, locale)
    const fallbackDescription = getLocalizedText(data?.shortDescription, locale)
    const seo = getLocalizedSeo(data?.seo, locale)
    const description = seo?.metaDescription || fallbackDescription
    const canonical =
        seo?.canonicalUrl ||
        `https://cadsquad.vn/${locale}/news-and-media/${slug}`
    const image = data?.bgCoverUrl || data?.thumbnailUrl

    return {
        title: `${seo?.metaTitle || title} | Cadsquad.vn`,
        description,
        keywords: data?.keywords,
        openGraph: {
            title: seo?.metaTitle || title,
            description,
            images: image
                ? [{ url: image, width: 1200, height: 630, alt: title }]
                : [],
            siteName: 'Cadsquad.vn',
            locale: locale === 'vi' ? 'vi_VN' : 'en_US',
            type: 'website',
        },
        alternates: {
            canonical,
        },
    }
}

export default function PostDetailLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return children
}
