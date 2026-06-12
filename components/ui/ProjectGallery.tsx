'use client'

import { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

interface Props {
  images: string[]
  /** CSS height value — defaults to a viewport-relative clamp */
  height?: string
}

const GAP = 3 // px between images

export function ProjectGallery({ images, height = 'clamp(340px, 72vh, 740px)' }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [w, setW]       = useState(0)
  const [live, setLive] = useState(true)
  const [dragging, setDragging] = useState(false)

  // Responsive item width: nearly full-bleed with a peek of the next image
  const mobile  = w > 0 && w < 768
  const itemW   = w > 0 ? (mobile ? w * 0.90 : w * 0.87) : 0
  const trackW  = images.length * (itemW + GAP) - GAP
  const maxDrag = Math.max(0, trackW - w)

  // Measure container width
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    setW(el.clientWidth)
    const ro = new ResizeObserver(([e]) => setW(e.contentRect.width))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  // Pause pan animations when gallery is off-screen
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => setLive(e.isIntersecting),
      { threshold: 0.05 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div
      ref={containerRef}
      className="overflow-hidden"
      style={{ cursor: dragging ? 'grabbing' : 'grab' }}
      aria-label="Project gallery — drag or swipe to explore"
    >
      <motion.div
        drag="x"
        dragConstraints={{ left: -maxDrag, right: 0 }}
        dragElastic={{ left: 0.04, right: 0.04 }}
        dragTransition={{
          bounceStiffness: 260,
          bounceDamping:   28,
          power:           0.22,
          timeConstant:    460,
        }}
        onDragStart={() => setDragging(true)}
        onDragEnd={() => setDragging(false)}
        style={{ display: 'flex', gap: GAP, userSelect: 'none', touchAction: 'pan-y' }}
      >
        {images.map((src, i) => (
          <div
            key={src + i}
            style={{
              /*
               * Fall back to a vw-based width on first render (before
               * ResizeObserver fires) to avoid a layout flash.
               */
              width:      itemW > 0 ? itemW : '87vw',
              height,
              flexShrink: 0,
              position:   'relative',
              overflow:   'hidden',
              background: 'var(--bg-secondary)',
            }}
          >
            {/*
             * Pan wrapper is 120 % wide, offset −10 % to give equal
             * panning room on both sides. The animation translates
             * between 0 % and −8.33 % (= 10 % of the item width),
             * so the image always fully covers the item frame.
             */}
            <div
              style={{
                position:   'absolute',
                top:        0,
                bottom:     0,
                left:       '-10%',
                width:      '120%',
                willChange: 'transform',
                animationPlayState: live ? 'running' : 'paused',
                animation: i % 2 === 0
                  ? 'vixx-pan-ltr 28s ease-in-out infinite alternate'
                  : 'vixx-pan-rtl 28s ease-in-out infinite alternate',
              }}
            >
              <Image
                src={src}
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 768px) 92vw, 89vw"
                draggable={false}
                priority={i === 0}
              />
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  )
}
