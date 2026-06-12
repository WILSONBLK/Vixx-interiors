'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { MagneticElement } from '@/components/ui/MagneticElement'

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isTouch, setIsTouch]               = useState(false)
  const [isReducedMotion, setIsReducedMotion] = useState(false)
  const [imageHovered, setImageHovered]       = useState(false)

  const rawX   = useMotionValue(0)
  const rawY   = useMotionValue(0)
  const springX = useSpring(rawX, { stiffness: 25, damping: 20 })
  const springY = useSpring(rawY, { stiffness: 25, damping: 20 })
  const xPx     = useTransform(springX, (v) => `${v}%`)
  const yPx     = useTransform(springY, (v) => `${v}%`)

  useEffect(() => {
    const touch   = window.matchMedia('(hover: none)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    setIsTouch(touch)
    setIsReducedMotion(reduced)
    if (touch || reduced) return

    const section = sectionRef.current
    if (!section) return

    let rafId = 0
    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(() => {
        const r = section.getBoundingClientRect()
        rawX.set(-((e.clientX - (r.left + r.width  / 2)) / r.width)  * 2.5)
        rawY.set(-((e.clientY - (r.top  + r.height / 2)) / r.height) * 2.5)
      })
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafId)
    }
  }, [rawX, rawY])

  const enableParallax = !isTouch && !isReducedMotion
  const enableScale    = !isTouch && !isReducedMotion
  // When reduced motion is on, initial={false} renders elements at their final state instantly
  const rm = isReducedMotion

  return (
    <section
      ref={sectionRef}
      className="relative flex flex-col justify-end overflow-hidden px-5 pb-16 pt-32 sm:px-6 sm:pb-24 lg:px-8 lg:pb-28"
      style={{ minHeight: '100svh' }}
      onMouseEnter={() => setImageHovered(true)}
      onMouseLeave={() => setImageHovered(false)}
    >
      {/* ── Background image + overlay stack ──────────────────────────────────── */}
      <div aria-hidden="true" className="absolute pointer-events-none" style={{ inset: '-6%' }}>
        <motion.div
          style={{
            position: 'absolute',
            inset: 0,
            x: enableParallax ? xPx : 0,
            y: enableParallax ? yPx : 0,
          }}
          animate={{ scale: enableScale && imageHovered ? 1.03 : 1 }}
          transition={{ duration: 1.6, ease: EASE }}
        >
          <Image
            src="/images/portfolio/living-room-3.jpg"
            alt=""
            fill
            priority
            className="object-cover"
            sizes="110vw"
          />
        </motion.div>

        {/* Base dark — warm near-black, not cold navy */}
        <div className="absolute inset-0" style={{ background: 'rgba(6,4,2,0.70)' }} />

        {/* Left-to-right gradient — deepens text zone, lightens right */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(105deg, rgba(6,4,2,0.72) 0%, rgba(6,4,2,0.40) 55%, rgba(6,4,2,0.08) 100%)',
          }}
        />

        {/* Bottom fade into page background */}
        <div
          className="absolute bottom-0 inset-x-0 h-64"
          style={{ background: 'linear-gradient(to bottom, transparent, var(--bg-primary))' }}
        />

        {/* Subtle warm gold glow anchored to text zone */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 42% 42% at 12% 58%, rgba(196,154,46,0.08) 0%, transparent 60%)',
          }}
        />
      </div>

      {/* ── Hero content ──────────────────────────────────────────────────────────
          CSS variables overridden locally so every child reads light values
          in both dark and light theme — the hero is always over a dark image.
      ──────────────────────────────────────────────────────────────────────────── */}
      <div
        className="relative z-10"
        style={{
          '--text-primary':   '#F5F5F4',
          '--text-secondary': 'rgba(245,242,237,0.70)',
          '--border-strong':  'rgba(245,245,244,0.28)',
          '--border':         'rgba(245,245,244,0.12)',
        } as React.CSSProperties}
      >

        {/* ── Eyebrow ── */}
        <motion.div
          className="flex items-center gap-3 mb-7 sm:mb-9"
          initial={rm ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, delay: 0.2, ease: 'easeOut' }}
        >
          <div
            className="h-px w-6 sm:w-8 flex-shrink-0"
            style={{ background: 'var(--gold)', opacity: 0.8 }}
          />
          <span
            className="font-jost text-[0.54rem] sm:text-[0.58rem] tracking-[0.42em] uppercase"
            style={{ color: 'rgba(196,154,46,0.78)' }}
          >
            Luxury Interior Design &nbsp;&middot;&nbsp; Lagos
          </span>
        </motion.div>

        {/* ── Brand lockup: VIXX + Interiors ── */}
        <h1 aria-label="VIXX Interiors" className="leading-none">

          {/* VIXX — dominant, blur-to-sharp cinematic reveal */}
          <motion.span
            className="block font-cormorant font-black"
            style={{
              fontSize:      'clamp(4rem, 18vw, 13rem)',
              lineHeight:    0.88,
              letterSpacing: '-0.01em',
              color:         '#F5F5F4',
              textShadow:    '0 4px 40px rgba(6,4,2,0.92)',
            }}
            initial={rm ? false : { opacity: 0, scale: 0.96, y: 28 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.6, delay: 0.28, ease: EASE }}
          >
            VIXX
          </motion.span>

          {/* Interiors — italic counterpoint, weight contrast creates luxury hierarchy */}
          <motion.span
            className="block font-cormorant italic font-normal"
            style={{
              fontSize:      'clamp(1.7rem, 7.4vw, 5.3rem)',
              lineHeight:    1,
              letterSpacing: '0.22em',
              color:         'rgba(245,241,234,0.85)',
              textShadow:    '0 2px 24px rgba(6,4,2,0.88)',
              marginTop:     '-0.03em',
            }}
            initial={rm ? false : { opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.6, delay: 0.72, ease: EASE }}
          >
            Interiors
          </motion.span>
        </h1>

        {/* ── Animated gold separator ── */}
        <motion.div
          className="mt-6 sm:mt-8"
          style={{
            height:          '1px',
            maxWidth:        '300px',
            background:      'linear-gradient(90deg, #C49A2E 0%, rgba(196,154,46,0.28) 65%, transparent 100%)',
            transformOrigin: 'left center',
          }}
          initial={rm ? false : { scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.1, delay: 1.06, ease: [0.4, 0, 0.2, 1] }}
        />

        {/* ── Tagline: Different by Design ── */}
        <motion.p
          className="font-cormorant italic font-normal mt-5 sm:mt-6"
          style={{
            fontSize:      'clamp(1rem, 2.3vw, 1.6rem)',
            letterSpacing: '0.10em',
            color:         'rgba(196,154,46,0.88)',
            textShadow:    '0 2px 16px rgba(6,4,2,0.80)',
          }}
          initial={rm ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.30, ease: EASE }}
        >
          Different by Design
        </motion.p>

        {/* ── Descriptor ── */}
        <motion.p
          className="font-jost font-light leading-relaxed mt-5 sm:mt-7"
          style={{
            fontSize:      'clamp(0.82rem, 1.35vw, 1rem)',
            maxWidth:      '42ch',
            color:         'rgba(245,241,234,0.62)',
            letterSpacing: '0.015em',
            textShadow:    '0 1px 10px rgba(6,4,2,0.70)',
          }}
          initial={rm ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 1.60, ease: EASE }}
        >
          We create interiors with clarity, confidence, and character—spaces that feel exceptional without trying too hard.
        </motion.p>

        {/* ── CTAs ── */}
        <motion.div
          className="mt-8 sm:mt-10 flex flex-wrap items-center gap-3 sm:gap-4"
          initial={rm ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 1.85, ease: EASE }}
        >
          <MagneticElement>
            <Link href="/portfolio" className="btn-primary">
              Explore Our Work
              <ArrowRight size={13} strokeWidth={1.5} aria-hidden="true" />
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
