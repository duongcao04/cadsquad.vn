import { createFileRoute } from '@tanstack/react-router'
import CADServicesPage from '@/app/[locale]/(pages)/(landing)/cad-services/page'

export const Route = createFileRoute('/_landing/cad-services/')({
    component: CADServicesPage,
})
