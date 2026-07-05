import FAB from '@/shared/components/layouts/fab'
import Footer from '@/shared/components/layouts/footer'
import AppHeader from '@/shared/components/layouts/header'

export default function LandingLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <AppHeader />
            <main className="pt-[106px]">
                {children}
                <FAB />
            </main>
            <Footer />
        </>
    )
}
