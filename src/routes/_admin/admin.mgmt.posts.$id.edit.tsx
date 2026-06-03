import { createFileRoute } from '@tanstack/react-router'
import EditPostPage from '@/app/[locale]/(administrator)/admin/mgmt/posts/[id]/edit/page'

export const Route = createFileRoute('/_admin/admin/mgmt/posts/$id/edit')({
    component: () => {
        const { id } = Route.useParams()
        return <EditPostPage id={id} />
    },
})
