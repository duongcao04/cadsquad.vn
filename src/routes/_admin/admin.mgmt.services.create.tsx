import { createFileRoute } from '@tanstack/react-router'
import CreateServicePage from '@/app/[locale]/(administrator)/admin/mgmt/services/create/page'

export const Route = createFileRoute('/_admin/admin/mgmt/services/create')({
    validateSearch: (search: Record<string, string>) => ({
        mode: (search.mode as 'create' | 'edit') ?? 'create',
        id: search.id ?? '',
    }),
    component: function CreateServiceWrapper() {
        const { mode, id } = Route.useSearch()
        return <CreateServicePage mode={mode} id={id} />
    },
})
