import { createRootRoute, Outlet } from '@tanstack/react-router'
import { AppProvider } from '@/app/providers'

export const Route = createRootRoute({
    component: () => (
        <AppProvider>
            <Outlet />
        </AppProvider>
    ),
})
