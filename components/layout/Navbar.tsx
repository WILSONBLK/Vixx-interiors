'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X, Sun, Moon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { NAV_LINKS } from '@/lib/data'
import { useTheme } from '@/hooks/useTheme'

export function Navbar() {
  const pathname                     = usePathname()
  const [scrolled, setScrolled]       = useState(false)
  const [open, setOpen]               = useState(false)
  const { isDark, toggle, mounted }   = useTheme()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setOpen(false) }, [pathname])

  useEffect(() => {
    document.body.classList.toggle('modal-open', open)
    return () => document.body.classList.remove('modal-open')
  }, [open])

  return (
    <>
      <header
        role="banner"
        className="fixed top-0 inset-x-0 z-50 transition-all duration-500"
        style={{
          height: 'var(--nav-height)',
          background: scrolled
            ? isDark
              ? 'rgba(2,6,23,0.50)'
              : 'rgba(250,250,249,0.58)'
            : 'transparent',
          backdropFilter:       scrolled ? 'blur(18px) saturate(160%)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(18px) saturate(160%)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.07)' : 'none',
          boxShadow:    scrolled ? '0 4px 24px rgba(2,6,23,0.20)' : 'none',
        }}
      >
        {/* Hairline gold accent — subtle at top, sharper when scrolled */}
        <div
          aria-hidden
          className="absolute top-0 inset-x-0 h-px transition-opacity duration-500"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, var(--gold) 50%, transparent 100%)',
            opacity: scrolled ? 0.75 : 0.40,
          }}
        />

        <nav
          className="container-site h-full flex items-center justify-between gap-4 lg:gap-8"
          aria-label="Primary navigation"
        >
          {/* ── Logo ── flush left, ~50% smaller than previous 112px */}
          <Link
            href="/"
            className="relative z-10 flex-shrink-0 flex items-center"
            aria-label="VIXX Interiors – Home"
            data-cursor="hover"
          >
            <Image
              src="/logo-gold.png"
              alt="VIXX Interiors"
              width={160}
              height={52}
              className="h-14 w-auto object-contain"
              priority
            />
          </Link>

          {/* ── Desktop nav links ── */}
          <ul className="hidden lg:flex items-center gap-7 xl:gap-9 flex-1 justify-center" role="list">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  data-cursor="hover"
                  className={cn(
                    'font-jost text-[0.64rem] tracking-[0.22em] uppercase transition-colors duration-200 whitespace-nowrap',
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

          {/* ── Right actions ── */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">

            {/* Theme toggle */}
            {mounted && (
              <button
                onClick={toggle}
                aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                data-cursor="hover"
                className="flex items-center justify-center w-8 h-8 rounded-full transition-colors duration-200 text-[var(--text-muted)] hover:text-[var(--gold)]"
              >
                {isDark
                  ? <Sun  size={15} strokeWidth={1.5} />
                  : <Moon size={15} strokeWidth={1.5} />}
              </button>
            )}

            {/* Desktop CTA */}
            <Link
              href="/contact"
              data-cursor="hover"
              className="hidden lg:inline-flex btn-primary py-2 px-5 text-[0.58rem]"
            >
              Book Consultation
            </Link>

            {/* Mobile hamburger */}
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              aria-controls="mobile-menu"
              data-cursor="hover"
              className="lg:hidden flex items-center justify-center w-8 h-8 text-[var(--text-primary)]"
            >
              {open
                ? <X    size={19} strokeWidth={1.5} />
                : <Menu size={19} strokeWidth={1.5} />}
            </button>
          </div>
        </nav>
      </header>

      {/* ── Mobile full-screen menu ── */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        className={cn(
          'fixed inset-0 z-40 flex flex-col lg:hidden transition-all duration-500',
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
        )}
        style={{
          background:           isDark ? 'rgba(2,6,23,0.96)' : 'rgba(250,250,249,0.96)',
          backdropFilter:       'blur(24px) saturate(160%)',
          WebkitBackdropFilter: 'blur(24px) saturate(160%)',
        }}
      >
        {/* Spacer matching fixed header */}
        <div style={{ height: 'var(--nav-height)', flexShrink: 0 }} />

        <nav
          className="flex flex-col flex-1 container-site py-8 sm:py-12 gap-0 overflow-y-auto"
          aria-label="Mobile navigation links"
        >
          {NAV_LINKS.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'font-cormorant text-3xl sm:text-4xl font-light py-4 sm:py-5',
                'border-b border-[var(--border)] transition-colors duration-200',
                pathname === link.href
                  ? 'text-[var(--gold)]'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]',
                open ? 'animate-fade-up' : '',
              )}
              style={{ animationDelay: `${i * 0.06}s`, animationFillMode: 'both' }}
            >
              {link.label}
            </Link>
          ))}

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link href="/contact" className="btn-primary">
              Book Consultation
            </Link>

            {mounted && (
              <button
                onClick={toggle}
                aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                className="flex items-center gap-2 font-jost text-[0.65rem] tracking-[0.2em] uppercase transition-colors duration-200 text-[var(--text-muted)] hover:text-[var(--gold)]"
              >
                {isDark ? <Sun size={15} strokeWidth={1.5} /> : <Moon size={15} strokeWidth={1.5} />}
                {isDark ? 'Light mode' : 'Dark mode'}
              </button>
            )}
          </div>
        </nav>
      </div>
    </>
  )
}
