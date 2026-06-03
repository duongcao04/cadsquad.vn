import { createFileRoute } from '@tanstack/react-router'
import DigitalServicesPage from '@/app/[locale]/(pages)/(landing)/digital-services/page'

export const Route = createFileRoute('/_landing/digital-services/')({
    component: DigitalServicesPage,
})
