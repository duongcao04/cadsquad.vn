import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_landing/news-and-media')({
    component: () => <Outlet />,
})
