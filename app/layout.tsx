import './globals.css'
import type { Metadata } from 'next'
import { Playfair_Display, Jost, Inter } from 'next/font/google'

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
    default:  'VIXX Interiors – Luxury Interior Design, Lagos',
    template: '%s | VIXX Interiors',
  },
  description:
    'Lagos-based luxury interior design studio crafting calm, refined living and commercial spaces with an unmistakable personal touch.',
  keywords: [
    'interior design Lagos',
    'luxury interior designer Nigeria',
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
    title:       'VIXX Interiors – Luxury Interior Design, Lagos',
    description: 'Lagos-based luxury interior design studio crafting calm, refined spaces.',
  },
  twitter: {
    card:  'summary_large_image',
    title: 'VIXX Interiors – Luxury Interior Design, Lagos',
  },
}

const themeScript = `
(function(){
  try {
    var saved = localStorage.getItem('vixx-theme');
    var isDark = saved !== 'light';
    if (isDark) {
      document.documentElement.classList.add('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
      document.documentElement.setAttribute('data-theme', 'light');
    }
  } catch(e) {
    document.documentElement.classList.add('dark');
    document.documentElement.setAttribute('data-theme', 'dark');
  }
})();
`

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" data-theme="dark" suppressHydrationWarning>
      <body
        className={`
          ${cormorant.variable}
          ${jost.variable}
          ${inter.variable}
          min-h-screen font-sans antialiased
        `}
        style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)' }}
      >
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        {children}
      </body>
    </html>
  )
}
