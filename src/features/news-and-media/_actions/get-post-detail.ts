import { createSupabaseBrowserClient } from '@/lib/supabase/client'

import { type PublicPost, parsePost } from './post.types'

export async function getPostDetail(slug: string): Promise<PublicPost | null> {
    const supabase = createSupabaseBrowserClient()
    const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('slug', slug)
        .eq('status', 'published')
        .maybeSingle()

    if (error) throw error
    return data ? parsePost(data) : null
}
