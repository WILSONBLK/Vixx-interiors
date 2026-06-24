import type { MetadataRoute } from 'next'
import { PORTFOLIO_PROJECTS } from '@/lib/data'

const BASE_URL = 'https://vixxinteriors.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL,                  lastModified: new Date(), changeFrequency: 'weekly',  priority: 1.0  },
    { url: `${BASE_URL}/about`,       lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8  },
    { url: `${BASE_URL}/services`,    lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9  },
    { url: `${BASE_URL}/portfolio`,   lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.9  },
    { url: `${BASE_URL}/process`,     lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7  },
    { url: `${BASE_URL}/faq`,         lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6  },
    { url: `${BASE_URL}/contact`,     lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8  },
    { url: `${BASE_URL}/start`,       lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7  },
  ]

  const portfolioRoutes: MetadataRoute.Sitemap = PORTFOLIO_PROJECTS.map((p) => ({
    url:             `${BASE_URL}/portfolio/${p.slug}`,
    lastModified:    new Date(),
    changeFrequency: 'monthly',
    priority:        0.7,
  }))

  return [...staticRoutes, ...portfolioRoutes]
}
