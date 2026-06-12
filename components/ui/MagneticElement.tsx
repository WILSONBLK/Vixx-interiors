'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

interface MagneticElementProps {
  children: React.ReactNode
  strength?: number
  className?: string
}

export function MagneticElement({
  children,
  strength = 0.3,
  className,
}: MagneticElementProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isTouch, setIsTouch] = useState(false)
  const [mounted, setMounted] = useState(false)

  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)

  const springX = useSpring(rawX, { stiffness: 180, damping: 18 })
  const springY = useSpring(rawY, { stiffness: 180, damping: 18 })

  useEffect(() => {
    setMounted(true)
    setIsTouch(window.matchMedia('(hover: none)').matches)
  }, [])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return

    const rect = el.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const offsetX = (e.clientX - centerX) * strength
    const offsetY = (e.clientY - centerY) * strength

    rawX.set(offsetX)
    rawY.set(offsetY)
  }

  const handleMouseLeave = () => {
    rawX.set(0)
    rawY.set(0)
  }

  if (!mounted || isTouch) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  )
}
