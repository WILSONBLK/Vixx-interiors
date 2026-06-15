'use client'
import dynamic from 'next/dynamic'
import { CSSProperties } from 'react'

const Spline = dynamic(() => import('@splinetool/react-spline'), {
  ssr: false,
  loading: () => null,
})

interface Props {
  scene: string
  className?: string
  style?: CSSProperties
}

export function SplineScene({ scene, className, style }: Props) {
  return (
    <div
      aria-hidden
      className={className}
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0, ...style }}
    >
      <Spline scene={scene} style={{ width: '100%', height: '100%' }} />
    </div>
  )
}
