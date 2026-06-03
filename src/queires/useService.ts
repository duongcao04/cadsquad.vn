import { useMutation, useQueryClient } from '@tanstack/react-query'
import { TCreateServiceFormValues, TUpdateServiceFormValues } from '@/validationSchemas'
import { servicesApi } from '@/lib/supabase-api'

export function useCreateServiceMutation() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (data: TCreateServiceFormValues) => servicesApi.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['services'] })
        },
        onError: (error) => {
            console.error('Failed to create service:', error)
        },
    })
}

export function useUpdateServiceMutation() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (data: TUpdateServiceFormValues) => servicesApi.update(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['services'] })
        },
        onError: (error) => {
            console.error('Failed to update service:', error)
        },
    })
}
