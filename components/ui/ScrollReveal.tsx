'use client'

import { useRef } from 'react'
import { motion, useInView, useReducedMotion, type Variants } from 'framer-motion'
import { cn } from '@/lib/utils'

type RevealVariant = 'fadeUp' | 'fadeIn' | 'fadeLeft' | 'fadeRight' | 'scaleUp'

interface ScrollRevealProps {
  children:   React.ReactNode
  variant?:   RevealVariant
  delay?:     number
  threshold?: number
  className?: string
  once?:      boolean
}

const SPRING = { type: 'spring' as const, stiffness: 88, damping: 22, mass: 0.6 }
const EASE   = [0.16, 1, 0.3, 1] as const

const VARIANTS: Record<RevealVariant, Variants> = {
  fadeUp:    { hidden: { opacity: 0, y: 28 },        visible: { opacity: 1, y: 0 } },
  fadeIn:    { hidden: { opacity: 0 },                visible: { opacity: 1 } },
  fadeLeft:  { hidden: { opacity: 0, x: 22 },         visible: { opacity: 1, x: 0 } },
  fadeRight: { hidden: { opacity: 0, x: -22 },        visible: { opacity: 1, x: 0 } },
  scaleUp:   { hidden: { opacity: 0, scale: 0.95 },   visible: { opacity: 1, scale: 1 } },
}

const TRANSITION: Record<RevealVariant, object> = {
  fadeUp:    SPRING,
  fadeIn:    { duration: 0.7, ease: EASE },
  fadeLeft:  SPRING,
  fadeRight: SPRING,
  scaleUp:   { ...SPRING, stiffness: 120 },
}

export function ScrollReveal({
  children,
  variant = 'fadeUp',
  delay = 0,
  threshold = 0.08,
  className,
  once = true,
}: ScrollRevealProps) {
  const ref            = useRef<HTMLDivElement>(null)
  const inView         = useInView(ref, { once, amount: threshold })
  const prefersReduced = useReducedMotion()

  return (
    <motion.div
      ref={ref}
      className={cn(className)}
      initial={prefersReduced ? false : 'hidden'}
      animate={inView || prefersReduced ? 'visible' : 'hidden'}
      variants={VARIANTS[variant]}
      transition={{ ...TRANSITION[variant], delay }}
    >
      {children}
    </motion.div>
  )
}
