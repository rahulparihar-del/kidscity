import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error(
    '[Kids City] Supabase env vars missing!\n' +
    'Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your .env file.\n' +
    'The app will run without a database connection until these are set.'
  )
}

// Export a real client when env vars are present, otherwise a safe no-op stub
const isValid =
  supabaseUrl &&
  supabaseKey &&
  supabaseUrl.startsWith('http') &&
  supabaseKey.length > 20

export const supabase = isValid
  ? createClient(supabaseUrl, supabaseKey)
  : {
      from: () => ({
        select: () => ({ order: () => Promise.resolve({ data: [], error: null }) }),
        insert: () => Promise.resolve({ error: null }),
        upsert: () => Promise.resolve({ error: null }),
        delete: () => Promise.resolve({ error: null }),
        update: () => Promise.resolve({ error: null }),
      }),
      channel: () => ({
        on: function () { return this },
        subscribe: function () { return this },
      }),
      removeChannel: () => {},
    }
