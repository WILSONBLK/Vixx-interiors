import Link from 'next/link'
import Image from 'next/image'
import { Instagram, Youtube, Phone, Mail, MapPin } from 'lucide-react'
import { HexMotif } from '@/components/ui/HexMotif'
import { NAV_LINKS } from '@/lib/data'

const SOCIAL_LINKS = [
  { icon: Instagram, href: 'https://instagram.com/vixxinteriors', label: 'Instagram' },
  { icon: Youtube,   href: 'https://youtube.com/@vixxinteriors',  label: 'YouTube'   },
]

const LEGAL_LINKS = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Use',   href: '/terms'   },
]

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      role="contentinfo"
      className="relative overflow-hidden border-t border-[var(--border)]"
      style={{ background: 'var(--bg-secondary)' }}
    >
      {/* Background decoration */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 100%, rgba(196,154,46,0.04) 0%, transparent 70%)' }}
      />
      <HexMotif
        size={240}
        variant="outline"
        opacity={0.03}
        className="absolute -bottom-16 -right-16 pointer-events-none"
        aria-hidden
      />

      <div className="container-site relative z-10 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">

          {/* Brand column */}
          <div className="lg:col-span-1">
            <Link href="/" aria-label="VIXX Interiors – Home">
              <Image
                src="/logo-gold.png"
                alt="VIXX Interiors"
                width={110}
                height={36}
                className="h-7 w-auto object-contain mb-5"
              />
            </Link>
            <p className="font-sans text-sm leading-relaxed mb-6" style={{ color: 'var(--text-muted)' }}>
              Lagos-based interior design studio crafting calm, considered spaces that stand the test of time.
            </p>
            <div className="flex items-center gap-3">
              {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 flex items-center justify-center border border-[var(--border)] text-[var(--text-muted)] hover:border-[var(--gold)] hover:text-[var(--gold)] transition-all duration-200"
                >
                  <Icon size={15} strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <p className="label-xs mb-5">Navigation</p>
            <ul className="space-y-3" role="list">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-sans text-sm transition-colors duration-200"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    <span className="hover:text-[var(--text-primary)] transition-colors">{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services quick links */}
          <div>
            <p className="label-xs mb-5">Services</p>
            <ul className="space-y-3" role="list">
              {[
                'Residential Design',
                'Commercial Design',
                'Design Consultation',
                'Furniture Sourcing',
                'Space Planning',
                'Project Management',
              ].map((svc) => (
                <li key={svc}>
                  <Link
                    href="/services"
                    className="font-sans text-sm transition-colors duration-200"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    <span className="hover:text-[var(--text-primary)] transition-colors">{svc}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="label-xs mb-5">Get In Touch</p>
            <ul className="space-y-4" role="list">
              <li className="flex items-start gap-3">
                <MapPin size={14} strokeWidth={1.5} className="mt-0.5 flex-shrink-0" style={{ color: 'var(--gold)' }} />
                <span className="font-sans text-sm" style={{ color: 'var(--text-muted)' }}>
                  Lagos, Nigeria<br />
                  <span className="text-[0.7rem]">Serving Nigeria & internationally</span>
                </span>
              </li>
              <li>
                <a
                  href="tel:+2348000000000"
                  className="flex items-center gap-3 font-sans text-sm transition-colors duration-200 hover:text-[var(--gold)]"
                  style={{ color: 'var(--text-muted)' }}
                >
                  <Phone size={14} strokeWidth={1.5} style={{ color: 'var(--gold)' }} />
                  +234 800 000 0000
                </a>
              </li>
              <li>
                <a
                  href="mailto:hello@vixxinteriors.com"
                  className="flex items-center gap-3 font-sans text-sm transition-colors duration-200 hover:text-[var(--gold)]"
                  style={{ color: 'var(--text-muted)' }}
                >
                  <Mail size={14} strokeWidth={1.5} style={{ color: 'var(--gold)' }} />
                  hello@vixxinteriors.com
                </a>
              </li>
            </ul>

            <div className="mt-6">
              <Link href="/contact" className="btn-primary py-2.5 text-[0.6rem]">
                Book Consultation
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-[var(--border)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-jost text-[0.6rem] tracking-[0.15em] uppercase" style={{ color: 'var(--text-muted)' }}>
            © {year} VIXX Interiors. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {LEGAL_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-jost text-[0.6rem] tracking-[0.1em] uppercase transition-colors duration-200 hover:text-[var(--gold)]"
                style={{ color: 'var(--text-muted)' }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
