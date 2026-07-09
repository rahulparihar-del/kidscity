import { useState, useEffect, useRef } from 'react'
import { supabase } from '../supabaseClient'

const CACHE_KEY = 'kidscity_site_images_cache'

/**
 * Read cached images synchronously from localStorage.
 * Returns {} if nothing cached or on any error.
 */
function readCache() {
  try {
    const raw = localStorage.getItem(CACHE_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

/**
 * Persist the image map to localStorage so next load shows correct images instantly.
 */
function writeCache(map) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(map))
  } catch {
    // Quota exceeded or private mode — silently ignore
  }
}

/**
 * Shared hook that loads all site_images rows from Supabase.
 * Returns an object: { [key]: image_data_url } plus loading state.
 *
 * Strategy:
 *  1. Immediately initialise state from localStorage cache → no flash on repeat visits.
 *  2. Fetch fresh data from Supabase in the background.
 *  3. Update state + cache when Supabase responds.
 *  4. Real-time listener keeps cache in sync when admin changes images.
 *
 * NOTE: Each hook instance gets a unique channel name to avoid the
 * "cannot add callbacks after subscribe()" error when multiple components
 * call this hook simultaneously (e.g. HeroBanner + CategoryGrid).
 */
export function useSiteImages() {
  // Initialise directly from cache — synchronous, no async wait needed
  const [images, setImages] = useState(() => readCache())
  const [loading, setLoading] = useState(true)

  // Generate a stable unique channel name per hook instance
  const channelName = useRef(`site-images-${Math.random().toString(36).slice(2)}`)

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
      writeCache(map) // persist so next visit is instant
    } catch (err) {
      console.warn('useSiteImages: could not load site_images table:', err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchImages()

    // Each instance uses its own unique channel name to avoid conflicts
    const channel = supabase
      .channel(channelName.current)
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
 * Also invalidates the localStorage cache so the next useSiteImages call re-fetches.
 */
export async function upsertSiteImage(key, imageDataUrl) {
  const { error } = await supabase
    .from('site_images')
    .upsert({ key, image_data: imageDataUrl, updated_at: new Date().toISOString() }, { onConflict: 'key' })

  if (error) throw error

  // Update cache immediately so admin panel changes reflect at once
  try {
    const cached = readCache()
    cached[key] = imageDataUrl
    writeCache(cached)
  } catch { /* ignore */ }
}

/**
 * Delete a single site image override (removes row so default static image is used).
 * Also removes the key from localStorage cache.
 */
export async function deleteSiteImage(key) {
  const { error } = await supabase
    .from('site_images')
    .delete()
    .eq('key', key)

  if (error) throw error

  // Remove from cache
  try {
    const cached = readCache()
    delete cached[key]
    writeCache(cached)
  } catch { /* ignore */ }
}
