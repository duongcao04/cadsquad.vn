import { createFileRoute } from '@tanstack/react-router'
import OverviewPage from '@/app/[locale]/(pages)/(landing)/about-us/overview/page'

export const Route = createFileRoute('/_landing/about-us_/overview')({
    component: OverviewPage,
})
