'use client'
import { useRef, MouseEvent, ReactNode, CSSProperties } from 'react'

interface Props {
  children: ReactNode
  className?: string
  style?: CSSProperties
  intensity?: number
}

export function Tilt3DCard({ children, className, style, intensity = 10 }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const raf = useRef<number>(0)

  function onMove(e: MouseEvent<HTMLDivElement>) {
    cancelAnimationFrame(raf.current)
    const rect = e.currentTarget.getBoundingClientRect()
    const cx = e.clientX
    const cy = e.clientY
    raf.current = requestAnimationFrame(() => {
      if (!ref.current) return
      const x = (cx - rect.left) / rect.width - 0.5
      const y = (cy - rect.top) / rect.height - 0.5
      ref.current.style.transform = `perspective(900px) rotateY(${x * intensity}deg) rotateX(${-y * intensity}deg) scale3d(1.025,1.025,1.025)`
    })
  }

  function onLeave() {
    cancelAnimationFrame(raf.current)
    if (ref.current) {
      ref.current.style.transform = 'perspective(900px) rotateY(0deg) rotateX(0deg) scale3d(1,1,1)'
    }
  }

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...style,
        transition: 'transform 0.25s cubic-bezier(0.23,1,0.32,1)',
        transformStyle: 'preserve-3d',
        willChange: 'transform',
      }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </div>
  )
}
