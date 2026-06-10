import type { MetadataRoute } from 'next'

const baseUrl = 'https://atlas-albany.com'
const locales = ['ar', 'en']
const pages = ['', '/about', '/contact']

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = []

  for (const locale of locales) {
    for (const page of pages) {
      entries.push({
        url: `${baseUrl}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: page === '' ? 'weekly' : 'monthly',
        priority: page === '' ? 1 : 0.8,
      })
    }
  }

  return entries
}
