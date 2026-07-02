import './globals.css'
import type { Metadata, Viewport } from 'next'
import { Raleway, Cormorant_Garamond } from 'next/font/google'
import { GoogleAnalytics } from '@next/third-parties/google'
import { CustomCursor }    from '@/components/ui/CustomCursor'
import { ButtonFeedback }  from '@/components/ui/ButtonFeedback'
import { PageTransition }  from '@/components/ui/PageTransition'
import { SocialBar }       from '@/components/ui/SocialBar'
import { Navbar }          from '@/components/layout/Navbar'
import { Preloader }       from '@/components/ui/Preloader'

const jost = Raleway({
  subsets:  ['latin'],
  weight:   ['100', '200', '300', '400', '500', '600', '700'],
  style:    ['normal', 'italic'],
  variable: '--font-jost',
  display:  'swap',
})

const cormorant = Cormorant_Garamond({
  subsets:  ['latin'],
  weight:   ['300', '400', '500', '600', '700'],
  style:    ['normal', 'italic'],
  variable: '--font-cormorant',
  display:  'swap',
})

const BASE_URL = 'https://vixxinteriors.com'

// Explicit viewport export required in Next.js 14+ (separate from metadata).
// viewport-fit=cover ensures content reaches the iOS notch safe-area edges.
// interactive-widget=resizes-content prevents the virtual keyboard from
// squashing the layout on Android (default is to resize the visual viewport).
export const viewport: Viewport = {
  width:           'device-width',
  initialScale:    1,
  viewportFit:     'cover',
  interactiveWidget: 'resizes-content',
  themeColor: [
    { media: '(prefers-color-scheme: dark)',  color: '#0A0908' },
    { media: '(prefers-color-scheme: light)', color: '#FAFAF9' },
  ],
}

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default:  'VIXX Interiors – Interior Design Studio, Lagos',
    template: '%s | VIXX Interiors',
  },
  description:
    'A Lagos-based interior design studio crafting calm, considered spaces for homes and businesses across Nigeria.',
  keywords: [
    'interior design Lagos',
    'interior design studio Nigeria',
    'residential interior design',
    'commercial interior design',
    'VIXX Interiors',
    'Osita Agusionu',
    'interior design Lekki',
    'interior design Victoria Island',
  ],
  robots: {
    index:     true,
    follow:    true,
    googleBot: { index: true, follow: true },
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-48x48.png', sizes: '48x48', type: 'image/png' },
    ],
    apple:    [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
    shortcut: ['/favicon-32x32.png'],
  },
  openGraph: {
    type:        'website',
    locale:      'en_NG',
    siteName:    'VIXX Interiors',
    url:         BASE_URL,
    title:       'VIXX Interiors – Interior Design Studio, Lagos',
    description: 'A Lagos-based interior design studio crafting calm, considered spaces for homes and businesses across Nigeria.',
    images: [
      {
        // JPEG, not AVIF — social crawlers (Facebook/LinkedIn/etc.) don't
        // reliably render AVIF previews, so this is a dedicated re-encode
        // cropped to the standard 1200x630 (1.91:1) OG ratio.
        url:    '/images/og-image.jpg',
        width:  1200,
        height: 630,
        alt:    'VIXX Interiors – Interior Design Studio, Lagos',
      },
    ],
  },
  twitter: {
    card:        'summary_large_image',
    title:       'VIXX Interiors – Interior Design Studio, Lagos',
    description: 'A Lagos-based interior design studio crafting calm, considered spaces for homes and businesses across Nigeria.',
    images:      ['/images/og-image.jpg'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head>
        {/* Runs synchronously before first paint — prevents theme flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('vixx-theme');var d=t?t==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;if(d)document.documentElement.classList.add('dark')}catch(e){}})();`,
          }}
        />
      </head>
      <body
        className={`
          ${jost.variable} ${cormorant.variable}
          min-h-screen font-sans antialiased
        `}
        style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)' }}
      >
        {/* Skip to main content — visible on keyboard focus only */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:text-xs focus:tracking-widest focus:uppercase focus:font-medium"
          style={{ background: 'var(--gold)', color: 'var(--text-on-accent)', borderRadius: 2 }}
        >
          Skip to content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': [
                {
                  // Explicit "Organization" type (alongside the more specific
                  // InteriorDesigner) so the logo is unambiguously eligible
                  // for Google's Logo / Knowledge Panel structured data.
                  '@type': ['Organization', 'InteriorDesigner'],
                  '@id': 'https://vixxinteriors.com/#organization',
                  name: 'VIXX Interiors',
                  description: 'A Lagos-based interior design studio crafting calm, considered spaces for homes and businesses across Nigeria.',
                  url: 'https://vixxinteriors.com',
                  logo: {
                    '@type': 'ImageObject',
                    url: 'https://vixxinteriors.com/logo-gold.png',
                    width: 2000,
                    height: 2000,
                  },
                  image: 'https://vixxinteriors.com/images/hero-bg.avif',
                  telephone: '+2348065672607',
                  email: 'vixxinteriors@gmail.com',
                  address: {
                    '@type': 'PostalAddress',
                    addressLocality: 'Lagos',
                    addressCountry: 'NG',
                  },
                  areaServed: ['Lagos', 'Nigeria'],
                  sameAs: [
                    'https://www.instagram.com/vixx_interiors',
                    'https://www.tiktok.com/@vixxinteriors',
                  ],
                  founder: {
                    '@type': 'Person',
                    name: 'Osita Agusionu',
                    jobTitle: 'Founder & Creative Director',
                  },
                },
                {
                  '@type': 'WebSite',
                  '@id': 'https://vixxinteriors.com/#website',
                  name: 'VIXX Interiors',
                  url: 'https://vixxinteriors.com',
                  publisher: { '@id': 'https://vixxinteriors.com/#organization' },
                },
              ],
            }),
          }}
        />
        <Preloader />
        <CustomCursor />
        <ButtonFeedback />
        <Navbar />
        <PageTransition>{children}</PageTransition>
        <SocialBar />
      </body>
      {process.env.NEXT_PUBLIC_GA_ID && (
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
      )}
    </html>
  )
}
