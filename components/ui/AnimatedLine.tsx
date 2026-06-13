'use client'

import { useEffect, useRef, useState } from 'react'

interface AnimatedLineProps {
  width?:     string | number
  delay?:     number
  className?: string
  full?:      boolean
}

export function AnimatedLine({
  width,
  delay = 0,
  className = '',
  full = false,
}: AnimatedLineProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [vis, setVis] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVis(true)
      return
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVis(true)
          io.unobserve(el)
        }
      },
      { rootMargin: '-30px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const resolvedWidth = full
    ? '100%'
    : typeof width === 'number'
      ? `${width}px`
      : (width ?? '100%')

  const background = full
    ? 'linear-gradient(90deg, transparent 0%, var(--gold-line) 25%, var(--gold-line) 75%, transparent 100%)'
    : 'linear-gradient(90deg, var(--gold) 0%, var(--gold-border) 68%, transparent 100%)'

  return (
    <div
      ref={ref}
      className={className}
      style={{
        height:          '1px',
        width:           resolvedWidth,
        background,
        transformOrigin: 'left center',
        flexShrink:      0,
        transform:       `scaleX(${vis ? 1 : 0})`,
        transition:      vis ? `transform 1.1s cubic-bezier(0.4, 0, 0.2, 1) ${delay}s` : 'none',
      }}
    />
  )
}
