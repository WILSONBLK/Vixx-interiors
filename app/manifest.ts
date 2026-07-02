import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name:             'VIXX Interiors',
    short_name:       'VIXX Interiors',
    description:
      'A Lagos-based interior design studio crafting calm, considered spaces for homes and businesses across Nigeria.',
    start_url:        '/',
    display:          'standalone',
    background_color: '#0A0908',
    theme_color:      '#0A0908',
    icons: [
      { src: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { src: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
      { src: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  }
}
