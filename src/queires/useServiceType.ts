import { useMutation, useQueryClient } from '@tanstack/react-query'
import { serviceTypesApi } from '@/lib/supabase-api'
import { TCreateServiceTypeFormValues, TUpdateServiceTypeFormValues } from '@/validationSchemas'

export function useCreateServiceType() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (data: TCreateServiceTypeFormValues) => serviceTypesApi.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['service-types'] })
        },
        onError: (error) => {
            console.error('Failed to create service type:', error)
        },
    })
}

export function useUpdateServiceType() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (data: TUpdateServiceTypeFormValues) => serviceTypesApi.update(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['service-types'] })
        },
        onError: (error) => {
            console.error('Failed to update service type:', error)
        },
    })
}
