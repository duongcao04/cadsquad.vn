import { createFileRoute } from '@tanstack/react-router'
import NewPostPage from '@/app/[locale]/(administrator)/admin/mgmt/posts/new/page'

export const Route = createFileRoute('/_admin/admin/mgmt/posts/new')({
    component: NewPostPage,
})
