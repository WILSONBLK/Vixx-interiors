'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X, Sun, Moon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { NAV_LINKS, SOCIAL_LINKS } from '@/lib/data'
import { InstagramIcon, TikTokIcon, WhatsAppIcon } from '@/components/ui/SocialIcons'
import { useTheme } from '@/hooks/useTheme'

function SocialIcon({ id, size = 16 }: { id: string; size?: number }) {
  if (id === 'instagram') return <InstagramIcon size={size} />
  if (id === 'tiktok')    return <TikTokIcon size={size} />
  if (id === 'whatsapp')  return <WhatsAppIcon size={size} />
  return null
}

export function Navbar() {
  const pathname                     = usePathname()
  const [scrolled, setScrolled]       = useState(false)
  const [open, setOpen]               = useState(false)
  const { isDark, toggleTheme, mounted } = useTheme()

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

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname === href || pathname.startsWith(href + '/')
  }

  return (
    <>
      <header
        role="banner"
        className="fixed top-0 inset-x-0 z-50 transition-all duration-500"
        style={{
          height: 'var(--nav-height)',
          background:           scrolled ? 'var(--bg-nav-scrolled)' : 'transparent',
          backdropFilter:       scrolled ? 'blur(5px) saturate(110%)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(5px) saturate(110%)' : 'none',
          boxShadow:            scrolled ? 'var(--shadow-nav)' : 'none',
        }}
      >
        {/* Hairline gold accent */}
        <div
          aria-hidden
          className="absolute top-0 inset-x-0 h-px transition-opacity duration-500"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, var(--gold) 50%, transparent 100%)',
            opacity: scrolled ? 0.30 : 0.18,
          }}
        />

        <nav
          className="w-full h-full relative flex items-center justify-center"
          aria-label="Primary navigation"
        >
          {/* Logo — pinned left */}
          <div className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-10">
            <Link
              href="/"
              className="flex items-center"
              aria-label="VIXX Interiors – Home"
              data-cursor="hover"
            >
              <Image
                src="/logo-gold.png"
                alt="VIXX Interiors"
                width={260}
                height={84}
                className="h-[4.5rem] w-auto object-contain"
                priority
              />
            </Link>
          </div>

          {/* Desktop nav links — centered */}
          <ul className="hidden lg:flex items-center gap-7 xl:gap-9" role="list">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  data-cursor="hover"
                  className={cn(
                    'relative pb-1 font-jost text-[0.64rem] tracking-[0.22em] uppercase transition-colors duration-200 whitespace-nowrap',
                    isActive(link.href)
                      ? 'text-[var(--gold)]'
                      : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]',
                  )}
                >
                  {link.label}
                  <span
                    aria-hidden="true"
                    className="absolute bottom-0 left-0 h-px w-full origin-left"
                    style={{
                      background: 'var(--gold)',
                      transform:  isActive(link.href) ? 'scaleX(1)' : 'scaleX(0)',
                      transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                  />
                </Link>
              </li>
            ))}
          </ul>

          {/* Right utility area — pinned right */}
          <div className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 flex items-center gap-2 sm:gap-3 z-10">

            {/* Social icons — desktop only */}
            <div
              className="hidden lg:flex items-center gap-1"
              role="list"
              aria-label="Social media links"
            >
              {SOCIAL_LINKS.map(({ id, label, href }) => (
                <a
                  key={id}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`VIXX Interiors on ${label}`}
                  data-cursor="hover"
                  className="social-icon"
                  role="listitem"
                >
                  <SocialIcon id={id} size={16} />
                </a>
              ))}
            </div>

            {/* Theme toggle — always visible (header bar on mobile, header on desktop) */}
            {mounted && (
              <button
                onClick={toggleTheme}
                aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                data-cursor="hover"
                className="inline-flex items-center justify-center w-7 h-7 text-[var(--text-muted)] opacity-60 transition-all duration-200 hover:opacity-100 hover:text-[var(--gold)]"
              >
                {isDark ? <Sun size={15} strokeWidth={1.5} /> : <Moon size={15} strokeWidth={1.5} />}
              </button>
            )}

            {/* Desktop CTA */}
            <Link
              href="/contact"
              data-cursor="hover"
              className="hidden lg:inline-flex btn-primary py-2 px-5 text-[0.58rem]"
            >
              Start Project
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

      {/* Mobile full-screen menu */}
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
          background:           'var(--bg-nav-menu)',
          backdropFilter:       'blur(8px) saturate(110%)',
          WebkitBackdropFilter: 'blur(8px) saturate(110%)',
        }}
      >
        {/* Spacer matching fixed header */}
        <div style={{ height: 'var(--nav-height)', flexShrink: 0 }} />

        <nav
          className="flex flex-col flex-1 container-site py-8 sm:py-12 overflow-y-auto"
          aria-label="Mobile navigation links"
        >
          {/* Nav links */}
          <ul role="list" className="flex flex-col">
            {NAV_LINKS.map((link, i) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    'block font-cormorant text-3xl sm:text-4xl font-light py-4 sm:py-5',
                    'border-b border-[var(--border)] transition-colors duration-200',
                    isActive(link.href)
                      ? 'text-[var(--gold)]'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]',
                    open ? 'animate-fade-up' : '',
                  )}
                  style={{ animationDelay: `${i * 0.06}s`, animationFillMode: 'both' }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Social links — dedicated section */}
          <div
            className="mt-10 pt-6 border-t border-[var(--border)]"
            aria-label="Social media links"
          >
            <p
              className="font-jost text-[0.55rem] tracking-[0.32em] uppercase mb-5"
              style={{ color: 'var(--gold-dim)' }}
            >
              Follow
            </p>
            <ul role="list" className="flex items-center gap-2">
              {SOCIAL_LINKS.map(({ id, label, href }) => (
                <li key={id}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`VIXX Interiors on ${label}`}
                    data-cursor="hover"
                    className="social-icon !w-11 !h-11"
                  >
                    <SocialIcon id={id} size={18} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div className="mt-8">
            <Link href="/contact" className="btn-primary">
              Start Project
            </Link>
          </div>
        </nav>
      </div>
    </>
  )
}
