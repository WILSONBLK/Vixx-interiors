'use client'

import { cn } from '@/lib/utils'
import type { HexVariant, HexSize } from '@/types'

interface HexMotifProps {
  size?:      HexSize
  variant?:   HexVariant
  opacity?:   number
  className?: string
  'aria-hidden'?: boolean | 'true' | 'false'
}

const SIZE_MAP: Record<string, number> = {
  xs: 20,
  sm: 36,
  md: 56,
  lg: 80,
}

export function HexMotif({
  size = 'md',
  variant = 'solid',
  opacity = 1,
  className,
  'aria-hidden': ariaHidden,
}: HexMotifProps) {
  const px = typeof size === 'number' ? size : (SIZE_MAP[size] ?? 56)
  const points = `${px * 0.5},${px * 0.04} ${px * 0.96},${px * 0.28} ${px * 0.96},${px * 0.74} ${px * 0.5},${px * 0.98} ${px * 0.04},${px * 0.74} ${px * 0.04},${px * 0.28}`

  return (
    <svg
      width={px}
      height={px}
      viewBox={`0 0 ${px} ${px}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ opacity, flexShrink: 0 }}
      className={cn(className)}
      aria-hidden={ariaHidden ?? true}
    >
      {variant === 'solid' && (
        <polygon points={points} fill="var(--gold)" />
      )}
      {variant === 'outline' && (
        <polygon points={points} fill="none" stroke="var(--gold)" strokeWidth={px * 0.025} />
      )}
      {variant === 'dual' && (
        <>
          <polygon points={points} fill="none" stroke="var(--gold)" strokeWidth={px * 0.025} />
          <polygon
            points={`${px * 0.5},${px * 0.18} ${px * 0.82},${px * 0.36} ${px * 0.82},${px * 0.66} ${px * 0.5},${px * 0.84} ${px * 0.18},${px * 0.66} ${px * 0.18},${px * 0.36}`}
            fill="none"
            stroke="var(--gold)"
            strokeWidth={px * 0.018}
            opacity={0.4}
          />
        </>
      )}
    </svg>
  )
}
