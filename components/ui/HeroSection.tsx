'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { MagneticElement } from '@/components/ui/MagneticElement'

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isTouch, setIsTouch] = useState(false)
  const [isReducedMotion, setIsReducedMotion] = useState(false)
  const [imageHovered, setImageHovered] = useState(false)

  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)

  const springX = useSpring(rawX, { stiffness: 25, damping: 20 })
  const springY = useSpring(rawY, { stiffness: 25, damping: 20 })

  // Convert to CSS percentage strings for use in transform
  const xPx = useTransform(springX, (v) => `${v}%`)
  const yPx = useTransform(springY, (v) => `${v}%`)

  useEffect(() => {
    const touch = window.matchMedia('(hover: none)').matches
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    setIsTouch(touch)
    setIsReducedMotion(reducedMotion)

    if (touch || reducedMotion) return

    const section = sectionRef.current
    if (!section) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      // Move OPPOSITE to cursor (depth illusion), range ±2.5%
      rawX.set(-((e.clientX - centerX) / rect.width) * 2.5)
      rawY.set(-((e.clientY - centerY) / rect.height) * 2.5)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [rawX, rawY])

  const enableParallax = !isTouch && !isReducedMotion
  const enableScale = !isTouch && !isReducedMotion

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[100vh] flex-col justify-end px-6 pb-28 pt-36 lg:px-8 overflow-hidden"
      onMouseEnter={() => setImageHovered(true)}
      onMouseLeave={() => setImageHovered(false)}
    >
      {/* ── Parallax image layer ─────────────────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="absolute pointer-events-none"
        style={{ inset: '-6%' }}
      >
        <motion.div
          style={{
            position: 'absolute',
            inset: 0,
            x: enableParallax ? xPx : 0,
            y: enableParallax ? yPx : 0,
          }}
          animate={{ scale: enableScale && imageHovered ? 1.035 : 1 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <Image
            src="/images/portfolio/living-room-1.jpg"
            alt=""
            fill
            priority
            className="object-cover"
            sizes="110vw"
          />
        </motion.div>

        {/* Dark base overlay */}
        <div className="absolute inset-0" style={{ background: 'rgba(2,6,23,0.52)' }} />

        {/* Left-weighted radial vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 90% 110% at 20% 60%, transparent 0%, rgba(2,6,23,0.35) 45%, rgba(2,6,23,0.88) 100%)',
          }}
        />

        {/* Bottom fade into bg-primary */}
        <div
          className="absolute bottom-0 inset-x-0 h-56"
          style={{ background: 'linear-gradient(to bottom, transparent, var(--bg-primary))' }}
        />

        {/* Subtle gold warmth on left */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 50% 50% at 15% 50%, rgba(196,154,46,0.07) 0%, transparent 65%)',
          }}
        />
      </div>

      {/* ── Hero content ─────────────────────────────────────────────────────── */}
      <div className="relative z-10 max-w-2xl">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 mb-8 px-3 py-1.5 rounded-full"
          style={{
            background: 'rgba(196,154,46,0.12)',
            border: '1px solid rgba(196,154,46,0.28)',
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full flex-shrink-0"
            style={{ background: 'var(--gold)' }}
          />
          <span
            className="font-jost text-[0.6rem] tracking-[0.25em] uppercase"
            style={{ color: 'var(--gold)' }}
          >
            VIXX Interiors &middot; Lagos
          </span>
        </motion.div>

        {/* H1 — three lines with slide-up reveal */}
        <h1 className="heading-xl">
          <span className="block overflow-hidden">
            <motion.span
              className="block"
              initial={{ y: '110%' }}
              animate={{ y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              Interiors That
            </motion.span>
          </span>

          <span className="block overflow-hidden">
            <motion.span
              className="block"
              initial={{ y: '110%' }}
              animate={{ y: 0 }}
              transition={{ duration: 1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <em style={{ color: 'var(--gold)' }}>Command</em>
            </motion.span>
          </span>

          <span className="block overflow-hidden">
            <motion.span
              className="block"
              initial={{ y: '110%' }}
              animate={{ y: 0 }}
              transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              The Room.
            </motion.span>
          </span>
        </h1>

        {/* Body text */}
        <motion.p
          className="body-lg mt-6 max-w-lg"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
        >
          Bespoke luxury design for Lagos&apos;s most discerning homes and commercial spaces.{' '}
          Bold vision. Flawless execution.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="mt-10 flex flex-wrap items-center gap-4"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <MagneticElement>
            <Link href="/portfolio" className="btn-primary">
              Explore Our Work
              <ArrowRight size={14} strokeWidth={1.5} aria-hidden="true" />
            </Link>
          </MagneticElement>

          <MagneticElement>
            <Link href="/contact" className="btn-outline">
              Book a Consultation
            </Link>
          </MagneticElement>
        </motion.div>
      </div>
    </section>
  )
}
