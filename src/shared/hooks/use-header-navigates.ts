'use client'

import { useMemo } from 'react'

import { useQuery } from '@tanstack/react-query'

import { type Service } from '@/features/services/_actions'
import { getCadServices } from '@/features/services/cad-services/_actions'
import { getDigitalServices } from '@/features/services/digital-service/_actions'

import { hasSupabaseConfig } from '@/lib/supabase/client'
import { buildHeaderNavigates } from '@/shared/constants/header-navigate'
import { queryKeys } from '@/shared/constants/query-keys'
import { CAD_SERVICES } from '@/shared/database/cadServices'
import { DIGITAL_SERVICES } from '@/shared/database/digitalServices'
import { type CadService } from '@/validationSchemas/cad-service.schema'

function getLocalizedText(
    value: Record<string, string> | null,
    locale: 'en' | 'vi'
) {
    if (!value) return ''

    return (
        value[locale]?.trim() ||
        value.en?.trim() ||
        Object.values(value).find((item) => item.trim()) ||
        ''
    )
}

function toLegacyService(service: Service): CadService {
    return {
        order: service.order,
        slug: service.slug,
        title: {
            original: getLocalizedText(service.title, 'en'),
            vi: getLocalizedText(service.title, 'vi'),
        },
        description: {
            original: getLocalizedText(service.description, 'en'),
            vi: getLocalizedText(service.description, 'vi'),
        },
        plainDescription: {
            original: getLocalizedText(service.plainDescription, 'en'),
            vi: getLocalizedText(service.plainDescription, 'vi'),
        },
        shortDescription: {
            original: getLocalizedText(service.shortDescription, 'en'),
            vi: getLocalizedText(service.shortDescription, 'vi'),
        },
        content: {
            original: getLocalizedText(service.content, 'en'),
            vi: getLocalizedText(service.content, 'vi'),
        },
        thumbnail: service.thumbnail ?? {},
        images: service.images,
    }
}

export function useHeaderNavigates() {
    const isSupabaseEnabled = hasSupabaseConfig()
    const { data: cadServices } = useQuery({
        queryKey: queryKeys.cadServices.list(),
        queryFn: () => getCadServices(),
        enabled: isSupabaseEnabled,
    })
    const { data: digitalServices } = useQuery({
        queryKey: queryKeys.digitalServices.list(),
        queryFn: () => getDigitalServices(),
        enabled: isSupabaseEnabled,
    })

    return useMemo(() => {
        const cadNavigationServices = cadServices
            ? cadServices.map(toLegacyService)
            : CAD_SERVICES
        const digitalNavigationServices = digitalServices
            ? digitalServices.map(toLegacyService)
            : DIGITAL_SERVICES

        return buildHeaderNavigates(
            cadNavigationServices,
            digitalNavigationServices
        )
    }, [cadServices, digitalServices])
}
