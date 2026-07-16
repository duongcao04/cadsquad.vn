import { createSupabaseBrowserClient } from '@/lib/supabase/client'

import {
    type GetPostsListParams,
    type PublicPost,
    parsePost,
} from './post.types'

const POST_LIST_COLUMNS = `
    id,
    slug,
    title,
    short_description,
    thumbnail_url,
    tags,
    count_view,
    status,
    created_at,
    updated_at
`

export async function getPostsList(
    params: GetPostsListParams = {}
): Promise<PublicPost[]> {
    const { tag, ascending = false, limit } = params
    const supabase = createSupabaseBrowserClient()
    let query = supabase
        .from('posts')
        .select(POST_LIST_COLUMNS)
        .eq('status', 'published')
        .order('created_at', { ascending })

    if (tag) query = query.contains('tags', [tag])
    if (limit !== undefined) query = query.limit(limit)

    const { data, error } = await query

    if (error) throw error
    return (data ?? []).map(parsePost)
}
