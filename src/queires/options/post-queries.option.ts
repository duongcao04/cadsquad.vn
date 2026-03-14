import { queryOptions } from '@tanstack/react-query'
import { axiosClient } from '../../lib/axios'

const postApi = {
	list: async () => await axiosClient.get('/posts').then(res => res.data)
}

export const postsListOptions = queryOptions({
	queryKey: ['posts'],
	queryFn: async () => await postApi.list(),
	select: (res) => {
		return { posts: res }
	}
})
