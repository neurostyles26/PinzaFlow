import { createClient } from '@supabase/supabase-js'

// These will be available in the browser via process.env or useRuntimeConfig
// But for standard Nuxt 3 with the module, we usually don't need this file.
// Creating it anyway as per requested folder structure.

const supabaseUrl = process.env.SUPABASE_URL || ''
const supabaseAnonKey = process.env.SUPABASE_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
