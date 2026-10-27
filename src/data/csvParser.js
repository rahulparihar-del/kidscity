/**
 * Robust CSV Line Parser (handles quotes with commas inside)
 */
function parseCsvLine(text) {
  const result = []
  let cur = ''
  let inQuotes = false
  for (let i = 0; i < text.length; i++) {
    const c = text[i]
    if (c === '"') {
      if (inQuotes && text[i + 1] === '"') {
        cur += '"'
        i++
      } else {
        inQuotes = !inQuotes
      }
    } else if (c === ',' && !inQuotes) {
      result.push(cur.trim())
      cur = ''
    } else {
      cur += c
    }
  }
  result.push(cur.trim())
  return result
}

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
      headers = parseCsvLine(rawLine).map(h => h.trim())
      headerIndex = i
      continue
    }

    const cols = parseCsvLine(rawLine)
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

    const desc = row.description || `Cute and comfortable ${row.name} made with soft ${row.fabric || 'breathable cotton'}. Perfect daily wear for kids aged ${sizes.join(', ')}. Available at Kids City boutique in Wakad, Pune.`

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
      gallery: photos,
      img: photos[0] || '/images/hero_girl.webp',
      fabric: row.fabric,
      desc,
      description: desc,
      rating: 4.9,
      reviews: 141,
      discount: 0,
      specs: {
        'Category': row.category,
        'Fabric': row.fabric || '100% Breathable Cotton',
        'Available Sizes': sizes.join(', '),
        'Fit': 'Regular Comfortable Fit',
        'Sleeve Length': 'Short Sleeves',
        'Neck Type': 'Round Crew Neck',
        'Care Instructions': 'Gentle machine wash in cold water with mild detergent'
      },
      isPublished
    })
  }

  return results
}
