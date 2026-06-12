'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

type Variant = 'fadeUp' | 'fadeIn' | 'fadeLeft' | 'fadeRight'

interface ScrollRevealProps {
  children:   React.ReactNode
  variant?:   Variant
  delay?:     number
  threshold?: number
  className?: string
}

const VARIANTS: Record<Variant, { hidden: string; visible: string }> = {
  fadeUp: {
    hidden:  'opacity-0 translate-y-6',
    visible: 'opacity-100 translate-y-0',
  },
  fadeIn: {
    hidden:  'opacity-0',
    visible: 'opacity-100',
  },
  fadeLeft: {
    hidden:  'opacity-0 translate-x-6',
    visible: 'opacity-100 translate-x-0',
  },
  fadeRight: {
    hidden:  'opacity-0 -translate-x-6',
    visible: 'opacity-100 translate-x-0',
  },
}

export function ScrollReveal({
  children,
  variant = 'fadeUp',
  delay = 0,
  threshold = 0.12,
  className,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.unobserve(el)
        }
      },
      { threshold },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  const { hidden, visible: visibleClass } = VARIANTS[variant]

  return (
    <div
      ref={ref}
      className={cn(
        'transition-all duration-700 ease-out',
        visible ? visibleClass : hidden,
        className,
      )}
      style={{ transitionDelay: visible ? `${delay}s` : '0s' }}
    >
      {children}
    </div>
  )
}
