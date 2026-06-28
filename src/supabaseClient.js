import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ktravgseczesbdvfjvad.supabase.co'
const supabaseKey = 'sb_publishable_Pu3CehjU4Dfer5iQcbQM6w_-cg_v7vs'

export const supabase = createClient(supabaseUrl, supabaseKey)
