'use client'

import { AntdRegistry } from '@ant-design/nextjs-registry'
import { HeroUIProvider, ToastProvider } from '@heroui/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { NextIntlClientProvider } from 'next-intl'

import SwrProvider from './SwrProvider'

type Props = {
    children: React.ReactNode
    locale: string
    messages: Record<string, unknown>
}
export function AppProvider({ children, locale, messages }: Props) {
    const queryClient = new QueryClient()
    return (
        <QueryClientProvider client={queryClient}>
            <NextIntlClientProvider
                locale={locale}
                messages={messages}
                timeZone="Asia/Ho_Chi_Minh"
            >
                <SwrProvider>
                    <HeroUIProvider>
                        <ToastProvider
                            placement="bottom-center"
                            regionProps={{
                                classNames: {
                                    base: '!z-[10000]',
                                },
                            }}
                        />
                        <AntdRegistry>{children}</AntdRegistry>
                    </HeroUIProvider>
                </SwrProvider>
            </NextIntlClientProvider>
        </QueryClientProvider>
    )
}
