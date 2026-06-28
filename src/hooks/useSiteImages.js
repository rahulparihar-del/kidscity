import { useState, useEffect } from 'react'
import { supabase } from '../supabaseClient'

/**
 * Shared hook that loads all site_images rows from Supabase.
 * Returns an object: { [key]: image_data_url } plus loading state.
 *
 * The `site_images` table schema:
 *   id          bigint (primary key)
 *   key         text   (unique, e.g. "hero_center", "hero_left", "category_festival")
 *   image_data  text   (base64 data-URL)
 *   updated_at  timestamptz
 */
export function useSiteImages() {
  const [images, setImages] = useState({})
  const [loading, setLoading] = useState(true)

  const fetchImages = async () => {
    try {
      const { data, error } = await supabase
        .from('site_images')
        .select('key, image_data')

      if (error) throw error

      const map = {}
      ;(data || []).forEach(row => {
        if (row.image_data) map[row.key] = row.image_data
      })
      setImages(map)
    } catch (err) {
      console.warn('useSiteImages: could not load site_images table:', err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchImages()

    // Listen for real-time changes to site_images table
    const channel = supabase
      .channel('site-images-realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'site_images' }, () => {
        fetchImages()
      })
      .subscribe()

    return () => supabase.removeChannel(channel)
  }, [])

  return { images, loading, refetch: fetchImages }
}

/**
 * Upsert a single site image. Creates row if key doesn't exist, updates if it does.
 */
export async function upsertSiteImage(key, imageDataUrl) {
  const { error } = await supabase
    .from('site_images')
    .upsert({ key, image_data: imageDataUrl, updated_at: new Date().toISOString() }, { onConflict: 'key' })

  if (error) throw error
}

/**
 * Delete a single site image override (removes row so default static image is used).
 */
export async function deleteSiteImage(key) {
  const { error } = await supabase
    .from('site_images')
    .delete()
    .eq('key', key)

  if (error) throw error
}
