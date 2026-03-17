import { useMutation, useQueryClient } from '@tanstack/react-query';
import { serviceTypesApi } from './options/service-type-queries.option';
import { TCreateServiceTypeFormValues, TUpdateServiceTypeFormValues } from '../validationSchemas';

export function useCreateServiceType() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: TCreateServiceTypeFormValues) => serviceTypesApi.create(data),
		onSuccess: () => {
			// Invalidate the list query so the table refetches the new data
			// Make sure the queryKey matches what you use in `useSuspenseQuery`
			queryClient.invalidateQueries({ queryKey: ['serviceTypes'] });

			// Optional: Show success message
			// toast.success('Service Category created successfully!');
		},
		onError: (error) => {
			console.error('Failed to create service type:', error);
			// Optional: Show error message
			// toast.error('Failed to create category. Please try again.');
		}
	});
}
export function useUpdateServiceType() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: TUpdateServiceTypeFormValues) => serviceTypesApi.update(data),
		onSuccess: () => {
			// Invalidate the list query so the table refetches the new data
			// Make sure the queryKey matches what you use in `useSuspenseQuery`
			queryClient.invalidateQueries({ queryKey: ['serviceTypes'] });

			// Optional: Show success message
			// toast.success('Service Category created successfully!');
		},
		onError: (error) => {
			console.error('Failed to create service type:', error);
			// Optional: Show error message
			// toast.error('Failed to create category. Please try again.');
		}
	});
}