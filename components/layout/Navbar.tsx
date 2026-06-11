'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { NAV_LINKS } from '@/lib/data'

export function Navbar() {
  const pathname              = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen]         = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close menu on route change
  useEffect(() => { setOpen(false) }, [pathname])

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.classList.toggle('modal-open', open)
    return () => document.body.classList.remove('modal-open')
  }, [open])

  return (
    <>
      <header
        role="banner"
        className={cn(
          'fixed top-0 inset-x-0 z-50 transition-all duration-500',
          scrolled
            ? 'border-b border-[var(--border)] backdrop-blur-lg'
            : '',
        )}
        style={{
          background: scrolled ? 'rgba(2,6,23,0.88)' : 'transparent',
          height: 'var(--nav-height)',
        }}
      >
        {/* Gold accent line at top */}
        <div className="absolute top-0 inset-x-0 h-px opacity-60" style={{ background: 'linear-gradient(90deg, transparent, var(--gold), transparent)' }} aria-hidden />

        <nav
          className="container-site h-full flex items-center justify-between"
          aria-label="Primary navigation"
        >
          {/* Logo */}
          <Link
            href="/"
            className="relative z-10 flex-shrink-0"
            aria-label="VIXX Interiors – Home"
          >
            <div className="relative">
              <Image
                src="/logo-gold.png"
                alt="VIXX Interiors"
                width={200}
                height={66}
                className="h-28 w-auto object-contain"
                priority
              />
            </div>
          </Link>

          {/* Desktop nav */}
          <ul className="hidden lg:flex items-center gap-8" role="list">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    'font-jost text-[0.65rem] tracking-[0.2em] uppercase transition-colors duration-200',
                    pathname === link.href
                      ? 'text-[var(--gold)]'
                      : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]',
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            {/* CTA */}
            <Link
              href="/contact"
              className="hidden lg:inline-flex btn-primary py-2.5 text-[0.6rem]"
            >
              Book Consultation
            </Link>

            {/* Mobile hamburger */}
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="lg:hidden flex items-center justify-center w-8 h-8 text-[var(--text-primary)]"
            >
              {open ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        className={cn(
          'fixed inset-0 z-40 flex flex-col lg:hidden transition-all duration-500',
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
        )}
        style={{ background: 'var(--bg-primary)' }}
      >
        {/* Top space to avoid overlapping fixed header */}
        <div style={{ height: 'var(--nav-height)' }} />

        <nav
          className="flex flex-col flex-1 container-site py-10 gap-2"
          aria-label="Mobile navigation links"
        >
          {NAV_LINKS.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'font-cormorant text-3xl font-light py-3 border-b border-[var(--border)] transition-colors duration-200',
                pathname === link.href
                  ? 'text-[var(--gold)]'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]',
                open ? 'animate-fade-up' : '',
              )}
              style={{ animationDelay: `${i * 0.06}s` }}
            >
              {link.label}
            </Link>
          ))}

          <div className="mt-8">
            <Link href="/contact" className="btn-primary">
              Book Consultation
            </Link>
          </div>
        </nav>
      </div>
    </>
  )
}
