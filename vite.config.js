import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import fs from 'fs'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Load environment variables (such as VITE_SITE_URL)
  const env = loadEnv(mode, process.cwd(), '')
  const siteUrl = env.VITE_SITE_URL || 'https://kidscity.online'

  return {
    plugins: [
      tailwindcss(),
      react(),
      {
        name: 'generate-seo-files',
        buildStart() {
          try {
            // Read templates
            const sitemapTemplate = fs.readFileSync('./seo-templates/sitemap.template.xml', 'utf8')
            const robotsTemplate = fs.readFileSync('./seo-templates/robots.template.txt', 'utf8')

            // Substitute env placeholder
            const sitemap = sitemapTemplate.replace(/%VITE_SITE_URL%/g, siteUrl)
            const robots = robotsTemplate.replace(/%VITE_SITE_URL%/g, siteUrl)

            // Ensure public directory exists
            if (!fs.existsSync('./public')) {
              fs.mkdirSync('./public')
            }

            // Write output files
            fs.writeFileSync('./public/sitemap.xml', sitemap)
            fs.writeFileSync('./public/robots.txt', robots)
            console.log(`[SEO Plugin] Dynamically generated public/sitemap.xml and public/robots.txt with SITE_URL: ${siteUrl}`)
          } catch (err) {
            console.error('[SEO Plugin] Failed to generate SEO files:', err)
          }
        }
      }
    ]
  }
})

