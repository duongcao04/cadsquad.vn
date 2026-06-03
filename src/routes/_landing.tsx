import { createFileRoute, Outlet } from '@tanstack/react-router'
import FAB from '@/shared/components/layouts/FAB'
import Footer from '@/shared/components/layouts/footer'
import AppHeader from '@/shared/components/layouts/header'

export const Route = createFileRoute('/_landing')({
    component: () => (
        <>
            <AppHeader />
            <main className="pt-[106px]">
                <Outlet />
                <FAB />
            </main>
            <Footer />
        </>
    ),
})
