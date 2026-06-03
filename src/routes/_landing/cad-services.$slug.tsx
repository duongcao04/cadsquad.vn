import { createFileRoute } from '@tanstack/react-router'
import { DetailClientPage } from '@/features/service-details'

export const Route = createFileRoute('/_landing/cad-services/$slug')({
    component: () => {
        const { slug } = Route.useParams()
        return (
            <div className="min-h-screen pb-20 max-w-screen">
                <DetailClientPage slug={slug} locale="EN" />
            </div>
        )
    },
})
