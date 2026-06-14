'use client'

import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

export function PageHeroBackground({
  src,
  overlay    = 0.21,
  fadeHeight = 80,
}: {
  src:          string
  overlay?:     number
  fadeHeight?:  number
}) {
  const rm = useReducedMotion() ?? false

  return (
    <>
      {/* Image — smooth load-in, slight de-zoom */}
      <motion.div
        className="absolute inset-0"
        initial={rm ? false : { opacity: 0, scale: 1.04 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.8, ease: EASE }}
      >
        <Image
          src={src}
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      </motion.div>

      {/* Base dark tint */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{ background: `rgba(8,8,8,${overlay})` }}
      />

      {/* Edge vignette — pulls focus inward */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 92% 82% at 50% 54%, transparent 44%, rgba(8,8,8,0.14) 100%)',
        }}
      />

      {/* Bottom fade to page background */}
      <div
        aria-hidden
        className="absolute bottom-0 inset-x-0 pointer-events-none"
        style={{
          height:     fadeHeight,
          background: 'linear-gradient(to bottom, transparent, var(--bg-primary))',
        }}
      />
    </>
  )
}
