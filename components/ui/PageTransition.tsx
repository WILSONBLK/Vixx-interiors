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
  const sweepId        = useRef(0)

  // Runs synchronously before the browser paints — hides new page content
  // before the user can see it, eliminating the flash before the curtain arrives.
  useLayoutEffect(() => {
    if (isFirst.current) return
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

    // Cancel any in-progress sweep so rapid navigation doesn't stack animations
    curtain.stop()
    curtain.set({ x: '-100%' })

    const id = ++sweepId.current

    async function sweep() {
      // Curtain sweeps in — covers hidden new page
      await curtain.start({ x: '0%', transition: { duration: 0.11, ease: [0.4, 0, 1, 1] } })
      if (sweepId.current !== id) return   // navigation fired again — abort this sweep
      // Curtain fully covers — safe to reveal new content underneath
      if (el) el.style.opacity = '1'
      // Curtain sweeps out — reveals new page
      await curtain.start({ x: '100%', transition: { duration: 0.13, ease: [0, 0, 0.6, 1] } })
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
