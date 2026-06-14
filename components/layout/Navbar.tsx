'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X, Sun, Moon } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
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

/* Reusable glow text that reacts on hover, click, and touch */
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
        className="fixed top-0 inset-x-0 z-50"
        style={{ height: 'var(--nav-height)' }}
      >
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

            {/* Theme toggle */}
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
              href="/start"
              data-cursor="hover"
              className="hidden lg:inline-flex btn-primary py-2 px-5 text-[0.58rem]"
            >
              Start a Project
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
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            className="fixed inset-0 z-40 flex flex-col lg:hidden"
            style={{
              background:           'var(--bg-nav-menu)',
              backdropFilter:       'blur(8px) saturate(110%)',
              WebkitBackdropFilter: 'blur(8px) saturate(110%)',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
          >
            {/* Spacer matching fixed header */}
            <div style={{ height: 'var(--nav-height)', flexShrink: 0 }} />

            <nav
              className="flex flex-col flex-1 container-site py-8 sm:py-12 overflow-y-auto"
              aria-label="Mobile navigation links"
            >
              {/* Nav links */}
              <ul role="list" className="flex flex-col">
                {NAV_LINKS.map((link, i) => {
                  const active = isActive(link.href)
                  return (
                    <motion.li
                      key={link.href}
                      initial={{ opacity: 0, x: -24 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.45, delay: i * 0.07, ease: EASE }}
                    >
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
                    </motion.li>
                  )
                })}
              </ul>

              {/* Social links */}
              <motion.div
                className="mt-10 pt-6 border-t border-[var(--border)]"
                aria-label="Social media links"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: NAV_LINKS.length * 0.07 + 0.05, ease: EASE }}
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
              </motion.div>

              {/* CTA */}
              <motion.div
                className="mt-8"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: NAV_LINKS.length * 0.07 + 0.12, ease: EASE }}
              >
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
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
