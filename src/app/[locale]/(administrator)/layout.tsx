import AdminSidebar from '../../../components/administrator/layouts/AdminSidebar'

export default function AdministratorLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex h-screen overflow-hidden">
            {/* Sidebar Component */}
            <AdminSidebar />

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col overflow-hidden relative">
                {/* Page Content */}
                <div className="flex-1 overflow-auto">{children}</div>
            </main>
        </div>
    )
}
