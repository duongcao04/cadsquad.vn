import { queryOptions } from '@tanstack/react-query'
import { parseData, parseList } from '../../lib'
import { axiosClient } from '../../lib/axios'
import { ServiceSchema, TCreateServiceFormValues, TUpdateServiceFormValues } from '../../validationSchemas'

export const serviceApi = {
	list: async () => await axiosClient.get('/services').then(res => res.data),
	detail: async (id: string) => await axiosClient.get(`/services/${id}`).then(res => res.data),
	detailBySlug: async (slug: string) => await axiosClient.get(`/services/slug/${slug}`).then(res => res.data),
	create: async (data: TCreateServiceFormValues) => await axiosClient.post('/services', data).then(res => res.data),
	update: async (data: TUpdateServiceFormValues) => await axiosClient.patch('/services', data).then(res => res.data)
}

export const serviceListOptions = queryOptions({
	queryKey: ['services'],
	queryFn: async () => await serviceApi.list(),
	select: (res) => {
		return { services: parseList(ServiceSchema, res) }
	}
})

export const serviceOptions = (id: string) => {
	return queryOptions({
		queryKey: ['services', 'identifier', id],
		queryFn: async () => await serviceApi.detail(id),
		select: (res) => {
			const service = parseData(ServiceSchema, res)
			return { service }
		}
	})
}

export const serviceBySlugOptions = (slug: string) => {
	return queryOptions({
		queryKey: ['services', 'slug', slug],
		queryFn: async () => await serviceApi.detailBySlug(slug),
		select: (res) => {
			const service = parseData(ServiceSchema, res)
			return { service }
		}
	})
}
