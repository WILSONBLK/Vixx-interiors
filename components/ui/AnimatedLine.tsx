'use client'

import { motion } from 'framer-motion'

interface AnimatedLineProps {
  /** CSS length or pixel number. Omit for full-width. */
  width?:     string | number
  delay?:     number
  className?: string
  /** Full-width centred divider style — both ends fade to transparent */
  full?:      boolean
}

export function AnimatedLine({
  width,
  delay = 0,
  className = '',
  full = false,
}: AnimatedLineProps) {
  const resolvedWidth = full
    ? '100%'
    : typeof width === 'number'
      ? `${width}px`
      : (width ?? '100%')

  const background = full
    ? 'linear-gradient(90deg, transparent 0%, rgba(196,154,46,0.35) 25%, rgba(196,154,46,0.35) 75%, transparent 100%)'
    : 'linear-gradient(90deg, #C49A2E 0%, rgba(196,154,46,0.28) 68%, transparent 100%)'

  return (
    <motion.div
      className={className}
      style={{
        height:          '1px',
        width:           resolvedWidth,
        background,
        transformOrigin: 'left center',
        flexShrink:      0,
      }}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 1.1, delay, ease: [0.4, 0, 0.2, 1] }}
    />
  )
}
