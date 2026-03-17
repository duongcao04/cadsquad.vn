import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TCreateServiceFormValues, TUpdateServiceFormValues } from "../validationSchemas";
import { serviceApi } from "./options/service-queries.option";

export function useCreateServiceMutation() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: TCreateServiceFormValues) => serviceApi.create(data),
		onSuccess: () => {
			// Invalidate the services list so the table updates immediately
			queryClient.invalidateQueries({ queryKey: ['services'] });
		},
		onError: (error) => {
			console.error('Failed to create service:', error);
		}
	});
}
export function useUpdateServiceMutation() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: TUpdateServiceFormValues) => serviceApi.update(data),
		onSuccess: () => {
			// Invalidate the services list so the table updates immediately
			queryClient.invalidateQueries({ queryKey: ['services'] });
		},
		onError: (error) => {
			console.error('Failed to create service:', error);
		}
	});
}