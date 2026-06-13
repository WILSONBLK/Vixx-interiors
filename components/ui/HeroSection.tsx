'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { MagneticElement } from '@/components/ui/MagneticElement'

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

/*
 * Local CSS overrides ensure hero is always dark-themed regardless of system preference,
 * since it sits on top of photography. Uses brand cream tokens for consistency.
 */
const HERO_OVERRIDES = {
  '--text-primary':   'var(--brand-cream)',
  '--text-secondary': 'rgba(240,235,225,0.72)',
  '--border-strong':  'rgba(240,235,225,0.28)',
  '--border':         'rgba(240,235,225,0.12)',
} as React.CSSProperties

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isTouch, setIsTouch]               = useState(false)
  const [isReducedMotion, setIsReducedMotion] = useState(false)
  const [imageHovered, setImageHovered]       = useState(false)

  const rawX    = useMotionValue(0)
  const rawY    = useMotionValue(0)
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
  const rm             = isReducedMotion

  return (
    <section
      ref={sectionRef}
      className="relative flex flex-col items-center justify-center overflow-hidden"
      style={{ minHeight: '100svh' }}
      onMouseEnter={() => setImageHovered(true)}
      onMouseLeave={() => setImageHovered(false)}
    >
      {/* ── Background ──────────────────────────────────────────────────────── */}
      <div aria-hidden="true" className="absolute pointer-events-none" style={{ inset: '-6%' }}>
        <motion.div
          style={{
            position: 'absolute',
            inset:    0,
            x:        enableParallax ? xPx : 0,
            y:        enableParallax ? yPx : 0,
          }}
          animate={{ scale: enableScale && imageHovered ? 1.03 : 1 }}
          transition={{ duration: 1.6, ease: EASE }}
        >
          <Image
            src="/images/hero-bg-web.jpg"
            alt=""
            fill
            priority
            className="object-cover"
            sizes="110vw"
          />
        </motion.div>

        {/* Uniform base — reduced from 0.50 to keep image detail visible */}
        <div className="absolute inset-0" style={{ background: 'rgba(8,8,8,0.28)' }} />

        {/* Soft vignette — wider open centre, lighter edges */}
        <div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 90% 88% at 50% 46%, transparent 42%, rgba(8,8,8,0.30) 100%)' }}
        />

        {/* Bottom fade into page background */}
        <div
          className="absolute bottom-0 inset-x-0 h-24"
          style={{ background: 'linear-gradient(to bottom, transparent, var(--bg-primary))' }}
        />
      </div>

      {/* ── Hero content — centered ──────────────────────────────────────────── */}
      <div
        className="relative z-10 text-center px-5 sm:px-8 lg:px-12 w-full max-w-3xl mx-auto"
        style={HERO_OVERRIDES}
      >

        {/* ── Eyebrow — symmetric lines either side ── */}
        <motion.div
          className="flex items-center justify-center gap-3 mb-6 sm:mb-8"
          initial={rm ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, delay: 0.2, ease: 'easeOut' }}
        >
          <div className="h-px w-8 flex-shrink-0" style={{ background: 'var(--gold)', opacity: 0.55 }} />
          <span
            className="font-jost text-[0.52rem] sm:text-[0.56rem] tracking-[0.42em] uppercase whitespace-nowrap"
            style={{ color: 'var(--gold-text)' }}
          >
            Interior Design Studio &nbsp;&middot;&nbsp; Lagos
          </span>
          <div className="h-px w-8 flex-shrink-0" style={{ background: 'var(--gold)', opacity: 0.55 }} />
        </motion.div>

        {/* ── Brand lockup ── */}
        <h1 aria-label="VIXX Interiors" className="leading-none">

          <motion.span
            className="block font-cormorant font-black"
            style={{
              fontSize:      'clamp(3rem, 9vw, 6.5rem)',
              lineHeight:    0.88,
              letterSpacing: '-0.01em',
              color:         'var(--brand-cream)',
              textShadow:    '0 4px 32px var(--overlay-heavy)',
            }}
            initial={rm ? false : { opacity: 0, scale: 0.96, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.6, delay: 0.28, ease: EASE }}
          >
            VIXX
          </motion.span>

          <motion.span
            className="block font-cormorant italic font-normal"
            style={{
              fontSize:      'clamp(1.1rem, 3.6vw, 2.8rem)',
              lineHeight:    1,
              letterSpacing: '0.26em',
              color:         'rgba(240,235,225,0.82)',
              textShadow:    '0 2px 18px var(--overlay-heavy)',
              marginTop:     '-0.02em',
            }}
            initial={rm ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.6, delay: 0.72, ease: EASE }}
          >
            Interiors
          </motion.span>
        </h1>

        {/* ── Centred gold separator — expands from middle ── */}
        <motion.div
          className="mt-5 sm:mt-7 mx-auto"
          style={{
            height:          '1px',
            width:           '180px',
            background:      'linear-gradient(90deg, transparent 0%, var(--gold) 50%, transparent 100%)',
            transformOrigin: 'center',
          }}
          initial={rm ? false : { scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.1, delay: 1.06, ease: [0.4, 0, 0.2, 1] }}
        />

        {/* ── Tagline ── */}
        <motion.p
          className="font-cormorant italic font-normal mt-4 sm:mt-5"
          style={{
            fontSize:      'clamp(0.9rem, 1.6vw, 1.15rem)',
            letterSpacing: '0.10em',
            color:         'var(--gold-text)',
            textShadow:    '0 2px 12px var(--overlay-mid)',
          }}
          initial={rm ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.30, ease: EASE }}
        >
          Simplicity Kind of Different
        </motion.p>

        {/* ── Descriptor ── */}
        <motion.p
          className="font-jost font-light leading-relaxed mt-4 sm:mt-5 mx-auto"
          style={{
            fontSize:      'clamp(0.75rem, 1.1vw, 0.88rem)',
            maxWidth:      '40ch',
            color:         'rgba(240,235,225,0.58)',
            letterSpacing: '0.018em',
            textShadow:    '0 1px 8px var(--overlay-mid)',
          }}
          initial={rm ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 1.60, ease: EASE }}
        >
          A Lagos interior design studio creating considered spaces where simplicity and expression meet.
        </motion.p>

        {/* ── CTA ── */}
        <motion.div
          className="mt-8 sm:mt-10 flex justify-center"
          initial={rm ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 1.85, ease: EASE }}
        >
          <MagneticElement>
            <motion.div
              style={{ borderRadius: '9999px', display: 'inline-flex' }}
              animate={rm ? {} : {
                boxShadow: [
                  '0 0 0px  0px rgba(196,154,46,0.00)',
                  '0 0 28px 8px rgba(196,154,46,0.32)',
                  '0 0 0px  0px rgba(196,154,46,0.00)',
                ],
              }}
              transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut', repeatDelay: 1.2 }}
            >
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-3 rounded-full font-jost text-[0.65rem] font-medium tracking-[0.22em] uppercase transition-all duration-500 hover:scale-[1.05] hover:brightness-110 active:scale-[0.97]"
                style={{
                  background: 'var(--gold)',
                  color:      'var(--text-on-accent)',
                  padding:    '0.9rem 2rem',
                }}
              >
                Explore Our Work
                <motion.span
                  animate={rm ? {} : { x: [0, 4, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <ArrowRight size={12} strokeWidth={1.5} aria-hidden="true" />
                </motion.span>
              </Link>
            </motion.div>
          </MagneticElement>
        </motion.div>
      </div>
    </section>
  )
}
