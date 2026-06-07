// Serverless function (Vercel-style) that proxies Google Places API requests.
// It keeps your API key on the server so it is never exposed to the browser.
//
// Required environment variables (set them in your hosting dashboard):
//   GOOGLE_PLACES_API_KEY  - your Google Cloud API key (Places API enabled)
//   GOOGLE_PLACE_ID        - the Place ID of your Google Business Profile
//
// Uses the Places API (New). Returns up to 5 reviews plus the live overall
// rating and total review count.

// Simple in-memory cache. Warm serverless instances reuse this between calls,
// which keeps us well under Google's quota and reduces cost.
let cache = { data: null, ts: 0 }
const CACHE_TTL_MS = 60 * 60 * 1000 // 1 hour

export default async function handler(req, res) {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY
  const placeId = process.env.GOOGLE_PLACE_ID

  // Allow the browser to call this endpoint.
  res.setHeader('Access-Control-Allow-Origin', '*')

  if (!apiKey || !placeId) {
    return res.status(500).json({
      error: 'Missing GOOGLE_PLACES_API_KEY or GOOGLE_PLACE_ID environment variables.',
    })
  }

  // Serve cached data when fresh.
  if (cache.data && Date.now() - cache.ts < CACHE_TTL_MS) {
    res.setHeader('Cache-Control', 'public, max-age=3600')
    return res.status(200).json(cache.data)
  }

  try {
    const url = `https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}`
    const fieldMask = [
      'displayName',
      'rating',
      'userRatingCount',
      'googleMapsUri',
      'reviews',
    ].join(',')

    const googleRes = await fetch(url, {
      headers: {
        'X-Goog-Api-Key': apiKey,
        'X-Goog-FieldMask': fieldMask,
      },
    })

    if (!googleRes.ok) {
      const detail = await googleRes.text()
      return res.status(googleRes.status).json({
        error: 'Google Places API request failed.',
        detail,
      })
    }

    const place = await googleRes.json()

    const reviews = (place.reviews || []).slice(0, 5).map((r) => ({
      author: r.authorAttribution?.displayName || 'Google User',
      photo: r.authorAttribution?.photoUri || null,
      rating: r.rating || 5,
      text: r.text?.text || r.originalText?.text || '',
      relativeTime: r.relativePublishTimeDescription || '',
    }))

    const payload = {
      name: place.displayName?.text || '',
      rating: place.rating || null,
      total: place.userRatingCount || null,
      mapsUri: place.googleMapsUri || null,
      reviews,
    }

    cache = { data: payload, ts: Date.now() }
    res.setHeader('Cache-Control', 'public, max-age=3600')
    return res.status(200).json(payload)
  } catch (err) {
    return res.status(500).json({ error: 'Unexpected error.', detail: String(err) })
  }
}
