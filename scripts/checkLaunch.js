import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { parseProductsCsv } from '../src/data/csvParser.js'
import { storeConfig } from '../src/config/storeConfig.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.resolve(__dirname, '..')
const distDir = path.resolve(rootDir, 'dist')

if (!fs.existsSync(distDir)) {
  console.error('❌ Error: dist/ directory not found. Please run "npm run build" first.')
  process.exit(1)
}

function getHtmlFiles(dir) {
  let results = []
  const list = fs.readdirSync(dir)
  for (const file of list) {
    const fullPath = path.join(dir, file)
    const stat = fs.statSync(fullPath)
    if (stat && stat.isDirectory()) {
      results = results.concat(getHtmlFiles(fullPath))
    } else if (file.endsWith('.html')) {
      results.push(fullPath)
    }
  }
  return results
}

const htmlFiles = getHtmlFiles(distDir)
console.log(`🔍 [check:launch] Auditing ${htmlFiles.length} HTML files in dist/...\n`)

const csvPath = path.resolve(rootDir, 'products.csv')
const csvContent = fs.existsSync(csvPath) ? fs.readFileSync(csvPath, 'utf8') : ''
const allProducts = parseProductsCsv(csvContent)
const publishedProducts = allProducts.filter(p => p.isPublished)
const publishedSlugs = new Set(publishedProducts.map(p => p.slug))
const unpublishedSlugs = new Set(allProducts.filter(p => !p.isPublished).map(p => p.slug))

const permittedPrices = new Set(
  publishedProducts.flatMap(p => [
    `₹${p.priceVal}`,
    `₹ ${p.priceVal}`,
    `Rs. ${p.priceVal}`,
    `Rs ${p.priceVal}`
  ])
)

const unconfirmedAreaSlugs = storeConfig.areas.pendingConfirmation.map(a => a.slug)

const violations = []

for (const filePath of htmlFiles) {
  const relPath = path.relative(distDir, filePath)
  const content = fs.readFileSync(filePath, 'utf8')

  // Rule 1: Zero "TODO" occurrences in production build
  const todoMatches = content.match(/\[?TODO\b[^\]\n<]*/gi)
  if (todoMatches) {
    for (const match of todoMatches) {
      violations.push({
        file: relPath,
        rule: 'No "TODO" in production build',
        detail: `Found TODO marker: "${match}"`
      })
    }
  }

  // Rule 2: No unconfirmed area pages linked from nav or footer
  const navBlocks = content.match(/<nav[\s\S]*?<\/nav>/gi) || []
  const footerBlocks = content.match(/<footer[\s\S]*?<\/footer>/gi) || []
  const navFooterContent = [...navBlocks, ...footerBlocks].join(' ')

  for (const slug of unconfirmedAreaSlugs) {
    const linkRegex = new RegExp(`href=["']\\/${slug}["']`, 'i')
    if (linkRegex.test(navFooterContent)) {
      violations.push({
        file: relPath,
        rule: 'Unconfirmed area linked in nav/footer',
        detail: `Unconfirmed area "/${slug}" linked in nav/footer`
      })
    }
  }

  // Rule 3: No link to an unpublished product
  for (const slug of unpublishedSlugs) {
    const productLinkRegex = new RegExp(`href=["']\\/product\\/${slug}["']`, 'i')
    if (productLinkRegex.test(content)) {
      violations.push({
        file: relPath,
        rule: 'Link to unpublished product',
        detail: `Found link to unpublished product "/product/${slug}"`
      })
    }
  }

  if (publishedProducts.length === 0) {
    const anyProductLink = content.match(/href=["']\/product\/[^"']+["']/gi)
    if (anyProductLink) {
      for (const pl of anyProductLink) {
        violations.push({
          file: relPath,
          rule: 'Link to unpublished product',
          detail: `Found product link when 0 products published: ${pl}`
        })
      }
    }
  }

  // Rule 4: No unverified "₹" amount not coming from published products
  const rupeeMatches = content.match(/₹\s*\d[\d,]*/g) || []
  for (const rMatch of rupeeMatches) {
    const cleanMatch = rMatch.replace(/\s+/g, '')
    if (!permittedPrices.has(cleanMatch)) {
      violations.push({
        file: relPath,
        rule: 'Unverified "₹" price amount',
        detail: `Found unverified price "${rMatch}" (not from published products)`
      })
    }
  }

  if (publishedProducts.length === 0 && content.includes('₹')) {
    const lines = content.split('\n')
    lines.forEach((line, idx) => {
      if (line.includes('₹')) {
        violations.push({
          file: `${relPath}:${idx + 1}`,
          rule: 'Unverified "₹" symbol',
          detail: `Found "₹" symbol when 0 products are published: ${line.trim().slice(0, 100)}`
        })
      }
    })
  }
}

console.log('='.repeat(60))
if (violations.length > 0) {
  console.error(`❌ CHECK LAUNCH FAILED: ${violations.length} violation(s) detected!\n`)
  violations.forEach((v, i) => {
    console.error(`${i + 1}. [${v.rule}] in ${v.file}: ${v.detail}`)
  })
  console.error('\nFix the above issues before deploying to production.')
  console.log('='.repeat(60))
  process.exit(1)
} else {
  console.log('✅ ALL PRE-FLIGHT LAUNCH CHECKS PASSED!')
  console.log('  • No "TODO" markers in any production page')
  console.log('  • No unconfirmed area pages linked in nav or footer')
  console.log('  • No unpublished products linked')
  console.log('  • No unverified "₹" amounts on any page')
  console.log(`  • Audited ${htmlFiles.length} HTML files across dist/`)
  console.log('='.repeat(60))
  process.exit(0)
}
