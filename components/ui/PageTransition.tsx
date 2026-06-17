'use client'

import { useEffect, useLayoutEffect, useRef } from 'react'
import { motion, useAnimationControls, useReducedMotion } from 'framer-motion'
import { usePathname } from 'next/navigation'

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname       = usePathname()
  const prefersReduced = useReducedMotion()
  const curtain        = useAnimationControls()
  const contentRef     = useRef<HTMLDivElement>(null)
  const isFirst        = useRef(true)
  // Incremented on every navigation — stale in-flight sweeps bail when they see
  // a different id, preventing stacked or conflicting animations.
  const sweepId        = useRef(0)
  const isBackNav      = useRef(false)
  const isTouch        = useRef(false)
  // True while the gold curtain is anywhere on screen.
  const curtainActive  = useRef(false)

  useEffect(() => {
    isTouch.current = window.matchMedia('(pointer: coarse)').matches
    const onPop = () => { isBackNav.current = true }
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  // Sync, before paint: hide content for fresh forward nav on desktop only.
  // Touch skips this to avoid the blank-screen race where iOS fires popstate
  // after React's layout effect has already run.
  useLayoutEffect(() => {
    if (isFirst.current) return
    if (isBackNav.current) return
    if (curtainActive.current) return
    if (isTouch.current) return
    const el = contentRef.current
    if (el) el.style.opacity = '0'
  }, [pathname])

  useEffect(() => {
    if (isFirst.current) { isFirst.current = false; return }

    const el          = contentRef.current
    const showContent = () => { if (el) el.style.opacity = '1' }
    const resetCurtain = () => {
      curtain.stop()
      curtain.set({ x: '100%' })
      curtainActive.current = false
      ++sweepId.current
    }

    if (prefersReduced) {
      resetCurtain()
      showContent()
      return
    }

    if (isBackNav.current) {
      isBackNav.current = false
      resetCurtain()
      showContent()
      // Next.js App Router restores scroll position automatically on back/forward.
      return
    }

    if (curtainActive.current) {
      // Rapid navigation: abort the in-flight sweep and reveal new page instantly.
      resetCurtain()
      showContent()
      return
    }

    // Touch devices: instant swap — no curtain, no opacity juggling.
    // iOS native transitions handle the feel; any JS animation adds jank.
    if (isTouch.current) {
      showContent()
      return
    }

    // Desktop: gold curtain sweep
    curtainActive.current = true
    const id = ++sweepId.current

    async function sweep() {
      curtain.set({ x: '-100%' })
      await curtain.start({ x: '0%', transition: { duration: 0.10, ease: [0.4, 0, 1, 1] } })
      if (sweepId.current !== id) return
      showContent()
      await curtain.start({ x: '100%', transition: { duration: 0.13, ease: [0, 0, 0.6, 1] } })
      if (sweepId.current !== id) return
      curtainActive.current = false
    }

    sweep()

    // Cleanup fires when a new navigation arrives while sweep is still running.
    // Without this, the curtain gets stuck at its current x-position (partially
    // visible at the screen edge) until the next interaction resets it.
    return () => {
      if (curtainActive.current) {
        resetCurtain()
        showContent()
      }
    }
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
            willChange:    'transform',
          }}
        />
      )}
    </>
  )
}
