'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export function CustomCursor() {
  const [mounted, setMounted]       = useState(false)
  const [isTouch, setIsTouch]       = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [hasMoved, setHasMoved]     = useState(false)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Dot: fast spring
  const dotX = useSpring(mouseX, { stiffness: 500, damping: 35, mass: 0.3 })
  const dotY = useSpring(mouseY, { stiffness: 500, damping: 35, mass: 0.3 })

  // Ring: slow spring for lag effect
  const ringX = useSpring(mouseX, { stiffness: 100, damping: 22, mass: 0.5 })
  const ringY = useSpring(mouseY, { stiffness: 100, damping: 22, mass: 0.5 })

  useEffect(() => {
    setMounted(true)
    const touch = window.matchMedia('(hover: none)').matches
    setIsTouch(touch)

    if (touch) return

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      setHasMoved(true)
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as Element
      if (
        target.closest('a') ||
        target.closest('button') ||
        target.closest('[data-cursor="hover"]')
      ) {
        setIsHovering(true)
      } else {
        setIsHovering(false)
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseover', handleMouseOver)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseover', handleMouseOver)
    }
  }, [mouseX, mouseY])

  if (!mounted || isTouch || !hasMoved) return null

  const dotSize   = isHovering ? 10 : 8
  const ringSize  = isHovering ? 38 : 24
  const ringBorder = isHovering ? '1.5px solid rgba(196,154,46,0.9)' : '1.5px solid rgba(196,154,46,0.6)'
  const dotGlow   = isHovering
    ? '0 0 10px rgba(196,154,46,0.9), 0 0 22px rgba(196,154,46,0.5)'
    : '0 0 8px rgba(196,154,46,0.8), 0 0 16px rgba(196,154,46,0.35)'

  return (
    <>
      {/* Dot */}
      <motion.div
        aria-hidden="true"
        animate={{ width: dotSize, height: dotSize, boxShadow: dotGlow }}
        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
          borderRadius: '50%',
          background: 'var(--gold)',
          pointerEvents: 'none',
          zIndex: 99999,
          willChange: 'transform',
        }}
      />

      {/* Ring */}
      <motion.div
        aria-hidden="true"
        animate={{ width: ringSize, height: ringSize, border: ringBorder }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 99998,
          willChange: 'transform',
        }}
      />
    </>
  )
}
