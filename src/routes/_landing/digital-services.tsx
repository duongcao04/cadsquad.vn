import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_landing/digital-services')({
    component: () => <Outlet />,
})
