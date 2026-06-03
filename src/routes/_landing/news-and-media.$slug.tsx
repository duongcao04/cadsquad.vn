import { createFileRoute } from '@tanstack/react-router'
import PostDetailPage from '@/app/[locale]/(pages)/(landing)/news-and-media/[slug]/page'

export const Route = createFileRoute('/_landing/news-and-media/$slug')({
    component: () => {
        const { slug } = Route.useParams()
        return <PostDetailPage slug={slug} />
    },
})
