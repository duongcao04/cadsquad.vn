import { queryOptions } from '@tanstack/react-query'
import { postsApi } from '@/lib/supabase-api'

export const postsListOptions = queryOptions({
    queryKey: ['posts'],
    queryFn: async () => await postsApi.list(),
    select: (res) => {
        return { posts: res }
    },
})
