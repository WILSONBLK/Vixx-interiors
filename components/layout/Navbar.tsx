'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X, Sun, Moon } from 'lucide-react'
import { motion } from 'framer-motion'
import { animate, stagger } from 'animejs'
import { cn } from '@/lib/utils'
import { NAV_LINKS, SOCIAL_LINKS } from '@/lib/data'
import { InstagramIcon, TikTokIcon, WhatsAppIcon } from '@/components/ui/SocialIcons'
import { useTheme } from '@/hooks/useTheme'

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]
const SPRING = { type: 'spring' as const, stiffness: 320, damping: 24 }

function SocialIcon({ id, size = 16 }: { id: string; size?: number }) {
  if (id === 'instagram') return <InstagramIcon size={size} />
  if (id === 'tiktok')    return <TikTokIcon size={size} />
  if (id === 'whatsapp')  return <WhatsAppIcon size={size} />
  return null
}

function GlowText({
  children,
  active = false,
  className,
  style,
}: {
  children: React.ReactNode
  active?:  boolean
  className?: string
  style?:    React.CSSProperties
}) {
  const goldGlow  = '0 0 24px rgba(196,154,46,0.95), 0 0 48px rgba(196,154,46,0.55), 0 0 80px rgba(196,154,46,0.25)'
  const creamGlow = '0 0 20px rgba(240,235,225,0.55), 0 0 40px rgba(240,235,225,0.25)'

  return (
    <motion.span
      className={className}
      style={style}
      whileHover={{
        textShadow: active ? goldGlow : creamGlow,
        color:      active ? 'rgba(212,175,55,1)' : 'rgba(240,235,225,1)',
        transition: SPRING,
      }}
      whileTap={{
        textShadow: goldGlow,
        color:      'rgba(212,175,55,1)',
        scale:      0.97,
        transition: SPRING,
      }}
    >
      {children}
    </motion.span>
  )
}

export function Navbar() {
  const pathname                       = usePathname()
  const [open, setOpen]                = useState(false)
  const { isDark, toggleTheme, mounted } = useTheme()
  const menuRef                        = useRef<HTMLDivElement>(null)
  const hamburgerRef                   = useRef<HTMLButtonElement>(null)

  useEffect(() => { setOpen(false) }, [pathname])

  useEffect(() => {
    document.body.classList.toggle('modal-open', open)
    return () => document.body.classList.remove('modal-open')
  }, [open])

  /* anime.js: open/close the full-screen overlay */
  useEffect(() => {
    const overlay = menuRef.current
    if (!overlay) return

    if (open) {
      overlay.style.display = 'flex'

      animate(overlay, {
        opacity:    [0, 1],
        translateY: [-16, 0],
        duration:   480,
        ease:       'outExpo',
      })

      const items = overlay.querySelectorAll<HTMLElement>('[data-menu-item]')
      animate(items, {
        opacity:    [0, 1],
        translateY: [10, 0],
        duration:   400,
        delay:      stagger(60, { start: 90 }),
        ease:       'outExpo',
      })
    } else {
      animate(overlay, {
        opacity:    [1, 0],
        translateY: [0, -10],
        duration:   280,
        ease:       'inQuad',
        onComplete: () => { overlay.style.display = 'none' },
      })
    }
  }, [open])

  /* Escape key */
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setOpen(false); hamburgerRef.current?.focus() }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  /* Focus trap */
  useEffect(() => {
    if (!open || !menuRef.current) return
    const focusable = menuRef.current.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    )
    const first = focusable[0]
    const last  = focusable[focusable.length - 1]
    const trap  = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last?.focus() }
      } else {
        if (document.activeElement === last)  { e.preventDefault(); first?.focus() }
      }
    }
    first?.focus()
    window.addEventListener('keydown', trap)
    return () => window.removeEventListener('keydown', trap)
  }, [open])

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname === href || pathname.startsWith(href + '/')
  }

  return (
    <>
      <header
        role="banner"
        className="fixed top-0 inset-x-0 z-50"
        style={{ height: 'var(--nav-height)' }}
      >
        <nav
          className="w-full h-full relative flex items-center justify-center"
          aria-label="Primary navigation"
        >
          {/* Logo */}
          <div className="absolute left-4 sm:left-6 xl:left-8 top-1/2 -translate-y-1/2 z-10">
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
                className="h-10 sm:h-14 xl:h-[4.5rem] w-auto object-contain"
                priority
              />
            </Link>
          </div>

          {/* Desktop nav links */}
          <ul className="hidden xl:flex items-center gap-8 2xl:gap-10" role="list">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  data-cursor="hover"
                  className={cn(
                    'relative pb-1 font-jost text-[0.72rem] tracking-[0.20em] uppercase transition-colors duration-200 whitespace-nowrap',
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

          {/* Right utility area */}
          <div className="absolute right-4 sm:right-6 xl:right-8 top-1/2 -translate-y-1/2 flex items-center gap-3 sm:gap-4 xl:gap-5 z-10">

            {/* Social icons — desktop only */}
            <div
              className="hidden xl:flex items-center gap-2"
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

            {/* Theme toggle */}
            {mounted && (
              <button
                onClick={toggleTheme}
                aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                data-cursor="hover"
                className="inline-flex items-center justify-center min-w-[44px] min-h-[44px] w-7 h-7 text-[var(--text-muted)] opacity-60 transition-all duration-200 hover:opacity-100 hover:text-[var(--gold)] active:opacity-50 active:scale-90"
              >
                {isDark ? <Sun size={15} strokeWidth={1.5} /> : <Moon size={15} strokeWidth={1.5} />}
              </button>
            )}

            {/* Desktop CTA */}
            <Link
              href="/start"
              data-cursor="hover"
              className="hidden xl:inline-flex btn-primary py-2 px-5 text-[0.58rem]"
            >
              Start a Project
            </Link>

            {/* Mobile hamburger */}
            <button
              ref={hamburgerRef}
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              aria-controls="mobile-menu"
              data-cursor="hover"
              className="xl:hidden flex items-center justify-center min-w-[44px] min-h-[44px] w-8 h-8 text-[var(--text-primary)] active:opacity-60 transition-all duration-150"
            >
              <span
                style={{
                  display:    'inline-flex',
                  transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  transform:  open ? 'rotate(90deg) scale(0.9)' : 'rotate(0deg) scale(1)',
                }}
              >
                {open ? <X size={19} strokeWidth={1.5} /> : <Menu size={19} strokeWidth={1.5} />}
              </span>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile full-screen menu — always in DOM, shown/hidden by anime.js */}
      <div
        ref={menuRef}
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        className="fixed inset-0 z-40 flex-col xl:hidden"
        style={{
          display:              'none',
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
            {NAV_LINKS.map((link) => {
              const active = isActive(link.href)
              return (
                <li key={link.href} data-menu-item>
                  <Link
                    href={link.href}
                    className={cn(
                      'block py-4 sm:py-5 border-b border-[var(--border)]',
                      active ? 'text-[var(--gold)]' : 'text-[var(--text-secondary)]',
                    )}
                  >
                    <GlowText
                      active={active}
                      className="block font-cormorant text-3xl sm:text-4xl font-light"
                    >
                      {link.label}
                    </GlowText>
                  </Link>
                </li>
              )
            })}
          </ul>

          {/* Social links */}
          <div
            data-menu-item
            className="mt-10 pt-6 border-t border-[var(--border)]"
            aria-label="Social media links"
          >
            <GlowText
              className="block font-jost text-[0.55rem] tracking-[0.32em] uppercase mb-5"
              style={{ color: 'var(--gold-dim)' }}
            >
              Follow
            </GlowText>

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
          <div data-menu-item className="mt-8">
            <motion.div
              whileHover={{
                boxShadow: '0 0 28px rgba(196,154,46,0.55), 0 0 60px rgba(196,154,46,0.25)',
                transition: SPRING,
              }}
              whileTap={{
                scale:     0.97,
                boxShadow: '0 0 36px rgba(196,154,46,0.8), 0 0 72px rgba(196,154,46,0.4)',
                transition: SPRING,
              }}
              style={{ display: 'inline-block', borderRadius: '9999px' }}
            >
              <Link href="/start" className="btn-primary">
                Start a Project
              </Link>
            </motion.div>
          </div>
        </nav>
      </div>
    </>
  )
}
