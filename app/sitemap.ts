import type { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://contentconcepts.com'
  const locales = ['en', 'es', 'fr']
  const staticRoutes = ['', '/about', '/pricing']
  const entries: MetadataRoute.Sitemap = []
  for (const locale of locales) {
    for (const route of staticRoutes) {
      entries.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: route === '' ? 1.0 : 0.8,
      })
    }
  }
  return entries
}
