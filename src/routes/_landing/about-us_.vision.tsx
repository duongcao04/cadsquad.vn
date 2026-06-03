import { createFileRoute } from '@tanstack/react-router'
import VisionPage from '@/app/[locale]/(pages)/(landing)/about-us/vision/page'

export const Route = createFileRoute('/_landing/about-us_/vision')({
    component: VisionPage,
})
