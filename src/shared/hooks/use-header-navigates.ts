'use client'

import { useMemo } from 'react'

import { useQuery } from '@tanstack/react-query'

import { cadServiceQueries } from '@/features/cad-services/_queries'
// import { digitalServiceQueries } from '@/features/digital-service/_queries'

import { hasSupabaseConfig } from '@/lib/supabase/client'
import { buildHeaderNavigates } from '@/shared/constants/header-navigate'
import { CAD_SERVICES } from '@/shared/database/cadServices'

export function useHeaderNavigates() {
    const isSupabaseEnabled = hasSupabaseConfig()
    const { data: cadServices } = useQuery({
        ...cadServiceQueries.list(),
        enabled: isSupabaseEnabled,
        placeholderData: CAD_SERVICES,
    })
    // const { data: digitalServices } = useQuery({
    //     ...digitalServiceQueries.list(),
    //     enabled: isSupabaseEnabled,
    //     placeholderData: CAD_SERVICES,
    // })

    return useMemo(
        () =>
            buildHeaderNavigates(
                cadServices ?? CAD_SERVICES
                // digitalServices ?? CAD_SERVICES
            ),
        [
            cadServices,
            // digitalServices
        ]
    )
}
