'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

export function Preloader() {
  // true on SSR so the preloader is in the initial HTML, covering the page from first paint
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    // Return visit — hide instantly, no animation needed
    if (sessionStorage.getItem('vixx-loaded')) {
      setVisible(false)
      return
    }

    const min   = new Promise<void>(r => setTimeout(r, 1800))
    const ready = document.readyState === 'complete'
      ? Promise.resolve()
      : new Promise<void>(r => window.addEventListener('load', () => r(), { once: true }))

    Promise.all([min, ready]).then(() => {
      setVisible(false)
      sessionStorage.setItem('vixx-loaded', '1')
    })
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: 'easeInOut' }}
          style={{
            position:       'fixed',
            inset:          0,
            zIndex:         9999,
            background:     '#0A0908',
            display:        'flex',
            flexDirection:  'column',
            alignItems:     'center',
            justifyContent: 'center',
          }}
          aria-hidden="true"
          suppressHydrationWarning
        >
          {/* Top line — expands left to right */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            style={{
              width:           48,
              height:          1,
              background:      '#C49A2E',
              marginBottom:    8,
              transformOrigin: 'left center',
            }}
          />

          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src="/logo-gold.png"
              alt="VIXX Interiors"
              width={220}
              height={71}
              priority
              style={{
                width:      'clamp(140px, 22vw, 220px)',
                height:     'auto',
                objectFit:  'contain',
              }}
            />
          </motion.div>

          {/* Bottom line — expands right to left */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.65, delay: 0.72, ease: [0.22, 1, 0.36, 1] }}
            style={{
              width:           48,
              height:          1,
              background:      '#C49A2E',
              marginTop:       8,
              transformOrigin: 'right center',
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
