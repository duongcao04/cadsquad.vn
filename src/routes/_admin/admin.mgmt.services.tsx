import { createFileRoute } from '@tanstack/react-router'
import ServicesManagementPage from '@/app/[locale]/(administrator)/admin/mgmt/services/page'

export const Route = createFileRoute('/_admin/admin/mgmt/services')({
    component: ServicesManagementPage,
})
