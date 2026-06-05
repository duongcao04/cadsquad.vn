import { Toast } from '@heroui/react'
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
            <Toast.Provider placement="bottom-center" />
            {children}
        </QueryClientProvider>
    )
}
