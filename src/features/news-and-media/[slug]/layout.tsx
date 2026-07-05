import { POSTS } from '@/shared/database/posts'

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string; slug: string }>
}) {
    const { slug } = await params

    const data = POSTS.find((post) => post.slug === slug)

    return {
        title: data?.title + ' | Cadsquad.vn',
        description: data?.shortDescription,
        keywords: data?.keywords,
        openGraph: {
            title: data?.title,
            description: data?.shortDescription,
            images: [
                {
                    url: data?.thumbnailUrl,
                    width: 1200,
                    height: 630,
                    alt: data?.title,
                },
            ],
            siteName: 'Cadsquad.vn',
            locale: 'en_US',
            type: 'website',
        },
        alternates: {
            canonical: `https://cadsquad.vn/news-and-media/${data?.slug}`,
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
