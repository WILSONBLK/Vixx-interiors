'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

interface TiltCardProps {
  children: React.ReactNode
  className?: string
  intensity?: number
}

export function TiltCard({
  children,
  className,
  intensity = 8,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isTouch, setIsTouch] = useState(false)
  const [mounted, setMounted] = useState(false)

  const rawRotateX = useMotionValue(0)
  const rawRotateY = useMotionValue(0)
  const rawScale = useMotionValue(1)

  const rotateX = useSpring(rawRotateX, { stiffness: 200, damping: 20 })
  const rotateY = useSpring(rawRotateY, { stiffness: 200, damping: 20 })
  const scale = useSpring(rawScale, { stiffness: 200, damping: 20 })

  useEffect(() => {
    setMounted(true)
    setIsTouch(window.matchMedia('(hover: none)').matches)
  }, [])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return

    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width  // 0 → 1
    const y = (e.clientY - rect.top) / rect.height   // 0 → 1

    // Centre = 0, edges = ±intensity
    rawRotateY.set((x - 0.5) * intensity * 2)
    rawRotateX.set(-(y - 0.5) * intensity * 2)
  }

  const handleMouseEnter = () => {
    rawScale.set(1.02)
  }

  const handleMouseLeave = () => {
    rawRotateX.set(0)
    rawRotateY.set(0)
    rawScale.set(1)
  }

  if (!mounted || isTouch) {
    return <div className={className}>{children}</div>
  }

  return (
    <div style={{ perspective: 1000 }} className={className}>
      <motion.div
        ref={ref}
        style={{
          rotateX,
          rotateY,
          scale,
          transformStyle: 'preserve-3d',
          height: '100%',
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </motion.div>
    </div>
  )
}
