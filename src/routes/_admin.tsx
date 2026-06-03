import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import AdminSidebar from '@/components/administrator/layouts/AdminSidebar'
import { supabase } from '@/lib/supabase'

export const Route = createFileRoute('/_admin')({
    beforeLoad: async () => {
        const {
            data: { session },
        } = await supabase.auth.getSession()
        if (!session) {
            throw redirect({ to: '/login' })
        }
    },
    component: () => (
        <div className="flex h-screen overflow-hidden">
            <AdminSidebar />
            <main className="flex-1 flex flex-col overflow-hidden relative">
                <div className="flex-1 overflow-auto">
                    <Outlet />
                </div>
            </main>
        </div>
    ),
})
