import { HeroUIProvider, ToastProvider } from '@heroui/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 5,
            retry: 1,
        },
    },
})

type Props = { children: React.ReactNode }

export function AppProvider({ children }: Props) {
    return (
        <QueryClientProvider client={queryClient}>
            <HeroUIProvider>
                <ToastProvider
                    placement="bottom-center"
                    regionProps={{
                        classNames: {
                            base: '!z-[10000]',
                        },
                    }}
                />
                {children}
            </HeroUIProvider>
        </QueryClientProvider>
    )
}
