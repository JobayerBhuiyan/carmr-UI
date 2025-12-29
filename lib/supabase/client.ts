import { createClient } from '@supabase/supabase-js'
import type { Database } from './types'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)

    if (typeof window === 'undefined') {
      return createClient<Database>('https://placeholder.supabase.co', 'placeholder-key')
    }
export function createBrowserClient() {
  return createClient<Database>(supabaseUrl, supabaseAnonKey)
}
