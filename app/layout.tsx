import './globals.css'
import type { Metadata } from 'next'
import { Playfair_Display, Jost, Inter } from 'next/font/google'
import { CustomCursor }    from '@/components/ui/CustomCursor'
import { PageTransition }  from '@/components/ui/PageTransition'
import { SocialBar }       from '@/components/ui/SocialBar'

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

export const metadata: Metadata = {
  title: {
    default:  'VIXX Interiors – Interior Design Studio, Lagos',
    template: '%s | VIXX Interiors',
  },
  description:
    'Lagos-based interior design studio crafting calm, considered living and commercial spaces with an unmistakable personal touch.',
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
  openGraph: {
    type:        'website',
    locale:      'en_NG',
    siteName:    'VIXX Interiors',
    title:       'VIXX Interiors – Interior Design Studio, Lagos',
    description: 'Lagos-based interior design studio crafting calm, considered spaces.',
  },
  twitter: {
    card:  'summary_large_image',
    title: 'VIXX Interiors – Interior Design Studio, Lagos',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Runs synchronously before first paint — prevents theme flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('vixx-theme');var d=t?t==='dark':true;if(d)document.documentElement.classList.add('dark')}catch(e){}})();`,
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
        <CustomCursor />
        <PageTransition>{children}</PageTransition>
        <SocialBar />
      </body>
    </html>
  )
}
