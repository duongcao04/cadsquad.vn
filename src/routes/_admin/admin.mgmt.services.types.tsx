import { createFileRoute } from '@tanstack/react-router'
import ServiceTypesPage from '@/app/[locale]/(administrator)/admin/mgmt/services/types/page'

export const Route = createFileRoute('/_admin/admin/mgmt/services/types')({
    validateSearch: (search: Record<string, string>) => ({
        mode: (search.mode as 'create' | 'edit') ?? 'create',
        id: search.id ?? '',
    }),
    component: function ServiceTypesWrapper() {
        const { mode, id } = Route.useSearch()
        return <ServiceTypesPage mode={mode} id={id} />
    },
})
