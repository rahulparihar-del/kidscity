import productsCsvRaw from '../../products.csv?raw'
import { parseProductsCsv } from './csvParser.js'

export { slugify, CATEGORIES_DATA, AREAS_DATA, BLOG_POSTS_DATA } from './staticData.js'

// Parse products strictly from products.csv
export const ALL_PRODUCTS = parseProductsCsv(productsCsvRaw)
export const PUBLISHED_PRODUCTS = ALL_PRODUCTS.filter(p => p.isPublished)
export const PRODUCTS = PUBLISHED_PRODUCTS // Only confirmed, published rows from products.csv
