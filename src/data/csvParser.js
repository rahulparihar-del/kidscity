/**
 * Parse products.csv into structured product objects.
 */
export function parseProductsCsv(csvText) {
  if (!csvText) return []

  const lines = csvText.split('\n')
  const results = []
  let headerIndex = -1
  let headers = []

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i].trim()
    if (!rawLine || rawLine.startsWith('#')) {
      continue
    }

    if (headerIndex === -1) {
      headers = rawLine.split(',').map(h => h.trim())
      headerIndex = i
      continue
    }

    const cols = rawLine.split(',').map(c => c.trim())
    if (cols.length < headers.length) continue

    const row = {}
    headers.forEach((h, idx) => {
      row[h] = cols[idx]
    })

    const isPublished = row.is_published === 'true' || row.is_published === 'TRUE'

    // Clean photos
    const photos = (row.photo_filenames || '')
      .split(';')
      .map(p => p.trim())
      .filter(Boolean)

    // Clean sizes
    const sizes = (row.age_size || '')
      .split(';')
      .map(s => s.trim())
      .filter(Boolean)

    const slug = (row.name || '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '')

    results.push({
      id: results.length + 1,
      slug,
      name: row.name,
      category: row.category,
      sizes,
      priceInr: row.price_inr,
      priceVal: isNaN(parseInt(row.price_inr, 10)) ? null : parseInt(row.price_inr, 10),
      price: isNaN(parseInt(row.price_inr, 10)) ? 'Price on inquiry' : `₹${row.price_inr}`,
      stockPerSize: row.stock_per_size,
      photos,
      img: photos[0] || '/images/hero_girl.webp',
      fabric: row.fabric,
      isPublished
    })
  }

  return results
}
