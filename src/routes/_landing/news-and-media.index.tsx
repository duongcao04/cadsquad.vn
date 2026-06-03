import { createFileRoute } from '@tanstack/react-router'
import NewsAndMediaPage from '@/app/[locale]/(pages)/(landing)/news-and-media/page'

export const Route = createFileRoute('/_landing/news-and-media/')({
    component: NewsAndMediaPage,
})
