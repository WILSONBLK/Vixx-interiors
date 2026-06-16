'use client'

import { useEffect, useLayoutEffect, useRef } from 'react'
import { motion, useAnimationControls, useReducedMotion } from 'framer-motion'
import { usePathname } from 'next/navigation'

// ── Scroll position persistence ───────────────────────────────────────────────
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
  // Incremented on every navigation — any in-flight async sweep that sees a
  // stale id bails immediately, preventing stacked/conflicting animations.
  const sweepId        = useRef(0)
  const isBackNav      = useRef(false)
  const isTouch        = useRef(false)
  // True while the gold curtain is anywhere on screen (covering or revealing).
  // Used to detect rapid navigation before a sweep has finished.
  const curtainActive  = useRef(false)

  useEffect(() => {
    isTouch.current = window.matchMedia('(pointer: coarse)').matches
    const onPop = () => { isBackNav.current = true }
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  // Save scroll position continuously so back-nav can restore it
  useEffect(() => {
    const onScroll = () => saveScroll(pathname)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [pathname])

  // Sync, before paint: hide new content only for a fresh forward navigation.
  // When curtainActive is true the rapid-nav path in useEffect will make content
  // visible — don't hide it here or we create an unrecoverable opacity:0 state.
  useLayoutEffect(() => {
    if (isFirst.current) return
    if (isBackNav.current) return
    if (curtainActive.current) return
    const el = contentRef.current
    if (el) el.style.opacity = '0'
  }, [pathname])

  useEffect(() => {
    if (isFirst.current) { isFirst.current = false; return }

    const el = contentRef.current

    // ── Reduced motion ────────────────────────────────────────────────────────
    if (prefersReduced) {
      curtain.stop()
      curtain.set({ x: '100%' })
      curtainActive.current = false
      if (el) el.style.opacity = '1'
      return
    }

    // ── Back navigation ───────────────────────────────────────────────────────
    // Skip curtain entirely; restore scroll position.
    if (isBackNav.current) {
      isBackNav.current = false
      ++sweepId.current
      curtain.stop()
      curtain.set({ x: '100%' })
      curtainActive.current = false
      if (el) el.style.opacity = '1'
      const y = loadScroll(pathname)
      if (y > 0) requestAnimationFrame(() => requestAnimationFrame(() => window.scrollTo(0, y)))
      return
    }

    // ── Rapid navigation ──────────────────────────────────────────────────────
    // The curtain is still on screen from a previous navigation.
    // Abort the in-flight animation and show the new page immediately — no
    // stacking, no content stuck at opacity:0, no broken state.
    if (curtainActive.current) {
      ++sweepId.current
      curtain.stop()
      curtain.set({ x: '100%' })
      curtainActive.current = false
      // useLayoutEffect skipped hiding because curtainActive was true,
      // but a prior fresh-sweep may have set opacity:0 — ensure it's visible.
      if (el) el.style.opacity = '1'
      return
    }

    // ── Fresh forward navigation ──────────────────────────────────────────────
    window.scrollTo(0, 0)
    curtainActive.current = true
    const id = ++sweepId.current

    const inDuration  = isTouch.current ? 0.07 : 0.10
    const outDuration = isTouch.current ? 0.09 : 0.13

    async function sweep() {
      curtain.set({ x: '-100%' })
      await curtain.start({ x: '0%', transition: { duration: inDuration, ease: [0.4, 0, 1, 1] } })
      // A newer navigation took over — it already cleared curtainActive and
      // showed its content; just bail without touching any shared state.
      if (sweepId.current !== id) return
      if (el) el.style.opacity = '1'
      await curtain.start({ x: '100%', transition: { duration: outDuration, ease: [0, 0, 0.6, 1] } })
      if (sweepId.current !== id) return
      curtainActive.current = false
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
