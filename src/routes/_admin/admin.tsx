import { createFileRoute } from '@tanstack/react-router'
import AdminDashboard from '@/app/[locale]/(administrator)/admin/page'

export const Route = createFileRoute('/_admin/admin')({
    component: AdminDashboard,
})
