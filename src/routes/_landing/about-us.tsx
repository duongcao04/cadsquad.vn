import { createFileRoute } from '@tanstack/react-router'
import AboutUsPage from '@/app/[locale]/(pages)/(landing)/about-us/page'

export const Route = createFileRoute('/_landing/about-us')({
    component: AboutUsPage,
})
