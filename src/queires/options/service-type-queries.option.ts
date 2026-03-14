import { axiosClient, parseData, parseList } from '@/lib'
import { ServiceTypeSchema, TCreateServiceTypeFormValues, TUpdateServiceTypeFormValues } from '@/validationSchemas'
import { queryOptions } from '@tanstack/react-query'

export const serviceTypesApi = {
	list: async () => await axiosClient.get('/service-types').then(res => res.data),
	detail: async (id: string) => await axiosClient.get(`/service-types/${id}`).then(res => res.data),
	create: async (data: TCreateServiceTypeFormValues) => await axiosClient.post('/service-types', data).then(res => res.data),
	update: async (data: TUpdateServiceTypeFormValues) => await axiosClient.patch('/service-types', data).then(res => res.data)
}

export const serviceTypesListOptions = queryOptions({
	queryKey: ['service-types'],
	queryFn: async () => await serviceTypesApi.list(),
	select: (res) => {
		const serviceTypes = parseList(ServiceTypeSchema, res)
		return { serviceTypes }
	}
})


export const serviceTypeOptions = (id: string) => {
	return queryOptions({
		queryKey: ['service-types', 'identifier', id],
		queryFn: async () => await serviceTypesApi.detail(id),
		select: (res) => {
			const serviceType = parseData(ServiceTypeSchema, res)
			return { serviceType }
		}
	})
}
