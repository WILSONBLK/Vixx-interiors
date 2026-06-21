import './globals.css'
import type { Metadata, Viewport } from 'next'
import { Playfair_Display, Jost, Inter } from 'next/font/google'
import { GoogleAnalytics } from '@next/third-parties/google'
import { CustomCursor }    from '@/components/ui/CustomCursor'
import { ButtonFeedback }  from '@/components/ui/ButtonFeedback'
import { PageTransition }  from '@/components/ui/PageTransition'
import { SocialBar }       from '@/components/ui/SocialBar'
import { Navbar }          from '@/components/layout/Navbar'

const cormorant = Playfair_Display({
  subsets:  ['latin'],
  weight:   ['400', '500', '600', '700', '800', '900'],
  style:    ['normal', 'italic'],
  variable: '--font-cormorant',
  display:  'swap',
})

const jost = Jost({
  subsets:  ['latin'],
  weight:   ['200', '300', '400', '500', '600'],
  variable: '--font-jost',
  display:  'swap',
})

const inter = Inter({
  subsets:  ['latin'],
  variable: '--font-inter',
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
  alternates: {
    canonical: BASE_URL,
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
        url:    '/images/hero-bg.jpg',
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
    images:      ['/images/hero-bg.jpg'],
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
          ${cormorant.variable}
          ${jost.variable}
          ${inter.variable}
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
              '@type': 'InteriorDesigner',
              name: 'VIXX Interiors',
              description: 'A Lagos-based interior design studio crafting calm, considered spaces for homes and businesses across Nigeria.',
              url: 'https://vixxinteriors.com',
              logo: 'https://vixxinteriors.com/logo-gold.png',
              image: 'https://vixxinteriors.com/images/hero-bg.jpg',
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
            }),
          }}
        />
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
