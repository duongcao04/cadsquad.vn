import { createClient } from '@supabase/supabase-js'

import envConfig from '@/config/config'

function getSupabaseConfig() {
    const supabaseUrl = envConfig.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = envConfig.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseAnonKey) {
        throw new Error(
            'Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY'
        )
    }

    return { supabaseUrl, supabaseAnonKey }
}

export function createSupabaseBrowserClient() {
    const { supabaseUrl, supabaseAnonKey } = getSupabaseConfig()
    return createClient(supabaseUrl, supabaseAnonKey)
}
