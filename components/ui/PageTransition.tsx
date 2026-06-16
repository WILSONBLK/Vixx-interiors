'use client'

import { useEffect, useLayoutEffect, useRef } from 'react'
import { motion, useAnimationControls, useReducedMotion } from 'framer-motion'
import { usePathname } from 'next/navigation'

// ── Scroll position persistence ──────────────────────────────────────────────
// sessionStorage survives soft-navigation and tab restore but clears on close,
// which is exactly the right lifetime for "where was I on this page?"

const SCROLL_KEY = 'vixx-scroll'

function saveScroll(path: string) {
  try {
    const store = JSON.parse(sessionStorage.getItem(SCROLL_KEY) ?? '{}')
    store[path] = window.scrollY
    sessionStorage.setItem(SCROLL_KEY, JSON.stringify(store))
  } catch {}
}

function loadScroll(path: string): number {
  try {
    const store = JSON.parse(sessionStorage.getItem(SCROLL_KEY) ?? '{}')
    return typeof store[path] === 'number' ? store[path] : 0
  } catch {
    return 0
  }
}

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname       = usePathname()
  const prefersReduced = useReducedMotion()
  const curtain        = useAnimationControls()
  const contentRef     = useRef<HTMLDivElement>(null)
  const isFirst        = useRef(true)
  const sweepId        = useRef(0)
  const isBackNav      = useRef(false)
  const isTouch        = useRef(false)

  useEffect(() => {
    isTouch.current = window.matchMedia('(pointer: coarse)').matches

    // popstate fires on browser back/forward and swipe-back — not on link clicks
    const onPop = () => { isBackNav.current = true }
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  // Continuously save scroll position for the active page.
  // Keying by pathname means each page independently remembers where you were.
  useEffect(() => {
    const onScroll = () => saveScroll(pathname)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [pathname])

  // Runs synchronously before the browser paints — hides new page content
  // so there's no flash before the curtain arrives. Skipped on back nav since
  // the curtain won't run and we don't want a momentary blank frame.
  useLayoutEffect(() => {
    if (isFirst.current) return
    if (isBackNav.current) return
    const el = contentRef.current
    if (el) el.style.opacity = '0'
  }, [pathname])

  useEffect(() => {
    if (isFirst.current) { isFirst.current = false; return }

    const el = contentRef.current

    if (prefersReduced) {
      if (el) el.style.opacity = '1'
      return
    }

    // Back navigation (swipe-back, browser back button): skip curtain entirely.
    // Restore the scroll position the user was at when they last left this page.
    if (isBackNav.current) {
      isBackNav.current = false
      if (el) el.style.opacity = '1'

      const savedY = loadScroll(pathname)
      if (savedY > 0) {
        // Two nested rAFs: first fires before paint, second fires after —
        // ensuring the page has fully laid out before we jump to the saved position.
        requestAnimationFrame(() => requestAnimationFrame(() => {
          window.scrollTo(0, savedY)
        }))
      }
      return
    }

    // Forward navigation: always start the new page from the top.
    window.scrollTo(0, 0)

    // Cancel any in-progress sweep so rapid navigation doesn't stack animations
    curtain.stop()
    curtain.set({ x: '-100%' })

    const id = ++sweepId.current

    // Touch devices: shorten the curtain for forward nav — mobile screens are
    // smaller so the sweep covers distance faster and a long animation feels sluggish.
    const inDuration  = isTouch.current ? 0.07 : 0.11
    const outDuration = isTouch.current ? 0.09 : 0.13

    async function sweep() {
      await curtain.start({ x: '0%', transition: { duration: inDuration, ease: [0.4, 0, 1, 1] } })
      if (sweepId.current !== id) return
      if (el) el.style.opacity = '1'
      await curtain.start({ x: '100%', transition: { duration: outDuration, ease: [0, 0, 0.6, 1] } })
    }

    sweep()
  }, [pathname, curtain, prefersReduced])

  return (
    <>
      <div ref={contentRef}>{children}</div>

      {!prefersReduced && (
        <motion.div
          aria-hidden="true"
          initial={{ x: '100%' }}
          animate={curtain}
          style={{
            position:      'fixed',
            inset:         0,
            zIndex:        99990,
            pointerEvents: 'none',
            background:    '#C49A2E',
          }}
        />
      )}
    </>
  )
}
