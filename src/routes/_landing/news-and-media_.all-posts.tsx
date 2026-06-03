import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_landing/news-and-media_/all-posts')({
    component: () => <div className="container pb-20">Posts page</div>,
})
