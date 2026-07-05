import React from 'react'

import { SWRConfig } from 'swr'
import { Cache } from 'swr'

function localStorageProvider(): Cache<unknown> {
    const map = new Map()

    // Only initialize from localStorage on client side
    if (typeof window !== 'undefined') {
        try {
            const stored = localStorage.getItem('app-cache')
            if (stored) {
                const entries = JSON.parse(stored)
                entries.forEach(([key, value]: [string, unknown]) => {
                    map.set(key, value)
                })
            }
        } catch (error) {
            console.warn('Failed to load from localStorage:', error)
        }

        // Save to localStorage on beforeunload
        const handleBeforeUnload = () => {
            try {
                const appCache = JSON.stringify(Array.from(map.entries()))
                localStorage.setItem('app-cache', appCache)
            } catch (error) {
                console.warn('Failed to save to localStorage:', error)
            }
        }

        window.addEventListener('beforeunload', handleBeforeUnload)

        // Also save periodically (optional)
        const interval = setInterval(handleBeforeUnload, 30000) // Save every 30 seconds

        // Cleanup function (though this won't be called in most cases)
        return Object.assign(map, {
            clear: () => {
                map.clear()
                clearInterval(interval)
                window.removeEventListener('beforeunload', handleBeforeUnload)
            },
        }) as Cache<unknown>
    }

    return map as Cache<unknown>
}

export default function SwrProvider({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <SWRConfig
            value={{
                provider: localStorageProvider,
                revalidateOnFocus: false,
                revalidateIfStale: false,
                revalidateOnMount: false,
            }}
        >
            {children}
        </SWRConfig>
    )
}
