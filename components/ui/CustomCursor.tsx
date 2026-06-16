'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

type Ripple = { id: number; x: number; y: number }

export function CustomCursor() {
  const [mounted, setMounted]       = useState(false)
  const [isTouch, setIsTouch]       = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [hasMoved, setHasMoved]     = useState(false)
  const [ripples, setRipples]       = useState<Ripple[]>([])

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const dotX     = useSpring(mouseX, { stiffness: 500, damping: 35, mass: 0.3 })
  const dotY     = useSpring(mouseY, { stiffness: 500, damping: 35, mass: 0.3 })
  const dotScale = useMotionValue(1)
  const dotSpringScale = useSpring(dotScale, { stiffness: 700, damping: 28 })

  const ringX = useSpring(mouseX, { stiffness: 220, damping: 28, mass: 0.4 })
  const ringY = useSpring(mouseY, { stiffness: 220, damping: 28, mass: 0.4 })

  useEffect(() => {
    setMounted(true)
    const touch = window.matchMedia('(hover: none)').matches
    setIsTouch(touch)

    const addRipple = (x: number, y: number) => {
      const id = performance.now() + Math.random()
      setRipples(prev => [...prev, { id, x, y }])
      setTimeout(() => setRipples(prev => prev.filter(r => r.id !== id)), 650)
    }

    // click fires reliably on both mouse and touch (tap) on modern browsers
    const handleClick = (e: MouseEvent) => addRipple(e.clientX, e.clientY)

    window.addEventListener('click', handleClick)

    if (!touch) {
      const handleMouseMove = (e: MouseEvent) => {
        mouseX.set(e.clientX)
        mouseY.set(e.clientY)
        setHasMoved(true)
      }

      const handleMouseOver = (e: MouseEvent) => {
        const target = e.target as Element
        setIsHovering(
          !!(
            target.closest('a') ||
            target.closest('button') ||
            target.closest('[data-cursor="hover"]')
          )
        )
      }

      const handleMouseDown = () => dotScale.set(0.45)
      const handleMouseUp   = () => dotScale.set(1)

      window.addEventListener('mousemove',  handleMouseMove)
      window.addEventListener('mouseover',  handleMouseOver)
      window.addEventListener('mousedown',  handleMouseDown)
      window.addEventListener('mouseup',    handleMouseUp)

      return () => {
        window.removeEventListener('click',      handleClick)
        window.removeEventListener('mousemove',  handleMouseMove)
        window.removeEventListener('mouseover',  handleMouseOver)
        window.removeEventListener('mousedown',  handleMouseDown)
        window.removeEventListener('mouseup',    handleMouseUp)
      }
    }

    return () => window.removeEventListener('click', handleClick)
  }, [mouseX, mouseY, dotScale])

  if (!mounted) return null

  const dotSize   = isHovering ? 16 : 12
  const ringSize  = isHovering ? 40 : 28
  const dotGlow   = isHovering
    ? '0 0 12px rgba(196,154,46,0.9), 0 0 26px rgba(196,154,46,0.5)'
    : '0 0 10px rgba(196,154,46,0.8), 0 0 20px rgba(196,154,46,0.35)'
  const ringColor = isHovering ? 'rgba(196,154,46,0.9)' : 'rgba(196,154,46,0.6)'

  return (
    <>
      {/* Tap / click ripple — works on every device */}
      {ripples.map(r => (
        <motion.div
          key={r.id}
          aria-hidden="true"
          initial={{ width: 8,  height: 8,  opacity: 1 }}
          animate={{ width: 80, height: 80, opacity: 0 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position:      'fixed',
            top:           r.y,
            left:          r.x,
            translateX:    '-50%',
            translateY:    '-50%',
            borderRadius:  '50%',
            borderWidth:   '1.5px',
            borderStyle:   'solid',
            borderColor:   'rgba(196,154,46,0.85)',
            pointerEvents: 'none',
            zIndex:        99997,
          }}
        />
      ))}

      {/* Custom cursor — mouse / hover devices only */}
      {!isTouch && hasMoved && (
        <>
          {/* Dot */}
          <motion.div
            aria-hidden="true"
            animate={{ width: dotSize, height: dotSize, boxShadow: dotGlow }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position:      'fixed',
              top:           0,
              left:          0,
              x:             dotX,
              y:             dotY,
              scale:         dotSpringScale,
              translateX:    '-50%',
              translateY:    '-50%',
              width:         dotSize,
              height:        dotSize,
              borderRadius:  '50%',
              background:    'var(--gold)',
              pointerEvents: 'none',
              zIndex:        99999,
              willChange:    'transform',
            }}
          />

          {/* Ring */}
          <motion.div
            aria-hidden="true"
            animate={{ width: ringSize, height: ringSize, borderColor: ringColor }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position:      'fixed',
              top:           0,
              left:          0,
              x:             ringX,
              y:             ringY,
              translateX:    '-50%',
              translateY:    '-50%',
              width:         ringSize,
              height:        ringSize,
              borderRadius:  '50%',
              borderWidth:   '1.5px',
              borderStyle:   'solid',
              borderColor:   ringColor,
              pointerEvents: 'none',
              zIndex:        99998,
              willChange:    'transform',
            }}
          />
        </>
      )}
    </>
  )
}
