'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { motion, useMotionValue, useSpring, useTransform, useInView } from 'framer-motion'
import { MagneticElement } from '@/components/ui/MagneticElement'

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]
const HOVER_SPRING = { type: 'spring' as const, stiffness: 300, damping: 24 }

const HERO_OVERRIDES = {
  '--text-primary':   'var(--brand-cream)',
  '--text-secondary': 'rgba(240,235,225,0.72)',
  '--border-strong':  'rgba(240,235,225,0.28)',
  '--border':         'rgba(240,235,225,0.12)',
} as React.CSSProperties

export function HeroSection() {
  const sectionRef   = useRef<HTMLElement>(null)
  const isInView     = useInView(sectionRef, { amount: 0.1 })
  const [isTouch, setIsTouch]               = useState(false)
  const [isReducedMotion, setIsReducedMotion] = useState(false)
  const [imageHovered, setImageHovered]       = useState(false)

  const rawX    = useMotionValue(0)
  const rawY    = useMotionValue(0)
  const springX = useSpring(rawX, { stiffness: 25, damping: 20 })
  const springY = useSpring(rawY, { stiffness: 25, damping: 20 })
  const xPx     = useTransform(springX, (v) => `${v}%`)
  const yPx     = useTransform(springY, (v) => `${v}%`)

  /* Cursor-proximity glow that drifts opposite to the parallax */
  const glowX = useTransform(springX, (v) => `calc(35% + ${-v * 12}%)`)
  const glowY = useTransform(springY, (v) => `calc(50% + ${-v * 12}%)`)

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
      data-hero
      className="relative flex flex-col items-center justify-center overflow-hidden"
      style={{ minHeight: '100svh' }}
      onMouseEnter={() => setImageHovered(true)}
      onMouseLeave={() => setImageHovered(false)}
    >
      {/* ── Background ──────────────────────────────────────────────────────── */}
      <div aria-hidden="true" className="absolute pointer-events-none" style={{ inset: '-6%' }}>
        <motion.div
          style={{
            position:   'absolute',
            inset:       0,
            x:           enableParallax ? xPx : 0,
            y:           enableParallax ? yPx : 0,
            willChange: 'transform',
          }}
          animate={{ scale: enableScale && imageHovered ? 1.03 : 1 }}
          transition={{ duration: 1.6, ease: EASE }}
        >
          <Image
            src="/images/hero-bg.avif"
            alt=""
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </motion.div>

        <div className="absolute inset-0" style={{ background: 'var(--photo-overlay-hero)' }} />
        <div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 90% 88% at 50% 46%, transparent 42%, var(--photo-vignette-hero) 100%)' }}
        />
      </div>

      {/* ── Cursor proximity glow ───────────────────────────────────────────── */}
      {!isTouch && !rm && (
        <motion.div
          aria-hidden
          className="absolute pointer-events-none z-10"
          style={{
            width:        '700px',
            height:       '700px',
            borderRadius: '50%',
            background:   'radial-gradient(circle, rgba(196,154,46,0.09) 0%, transparent 68%)',
            left:         glowX,
            top:          glowY,
            translateX:   '-50%',
            translateY:   '-50%',
          }}
        />
      )}

      {/* ── Hero content ────────────────────────────────────────────────────── */}
      <div
        className="relative z-20 text-left w-full max-w-4xl mr-auto
                   px-6 sm:px-12 lg:px-24"
        style={HERO_OVERRIDES}
      >

        {/* ── Eyebrow ── */}
        <motion.div
          className="flex items-center justify-start mb-5 sm:mb-7 lg:mb-8"
          initial={rm ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, delay: 0.2, ease: 'easeOut' }}
          whileHover={rm ? {} : { x: 6, transition: HOVER_SPRING }}
        >
          <motion.span
            className="font-jost text-[0.78rem] sm:text-[0.84rem] tracking-[0.42em] uppercase"
            style={{ color: 'var(--gold-text)', textShadow: '0 1px 14px rgba(8,8,8,0.9)' }}
            whileHover={rm ? {} : {
              color:      'rgba(212,175,55,1)',
              transition: HOVER_SPRING,
            }}
          >
            Interior Design Studio
          </motion.span>
        </motion.div>

        {/* ── Brand lockup ── */}
        <h1 aria-label="VIXX Interiors" className="leading-none">

          <motion.span
            className="block font-cormorant font-black"
            style={{
              fontSize:      'clamp(4.5rem, 13.5vw, 9.75rem)',
              lineHeight:    0.88,
              letterSpacing: '-0.01em',
              color:         'var(--brand-cream)',
              textShadow:    '0 4px 32px var(--overlay-heavy)',
            }}
            initial={rm ? false : { opacity: 0, scale: 0.96, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.6, delay: 0.28, ease: EASE }}
            whileHover={rm ? {} : {
              scale:      1.015,
              textShadow: '0 0 80px rgba(196,154,46,0.35), 0 4px 32px rgba(8,8,8,0.9)',
              transition: HOVER_SPRING,
            }}
          >
            VIXX
          </motion.span>

          <motion.span
            className="block font-cormorant italic font-normal overflow-hidden"
            style={{
              fontSize:      'clamp(1.65rem, 5.4vw, 4.2rem)',
              lineHeight:    1,
              letterSpacing: 'clamp(0.08em, 0.26em, 0.26em)',
              color:         'rgba(240,235,225,0.82)',
              textShadow:    '0 2px 18px var(--overlay-heavy)',
              marginTop:     '-0.02em',
            }}
            initial={rm ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.6, delay: 0.72, ease: EASE }}
            whileHover={rm ? {} : {
              x:          10,
              opacity:    1,
              color:      'rgba(240,235,225,1)',
              transition: HOVER_SPRING,
            }}
          >
            Interiors
          </motion.span>
        </h1>

        {/* ── Tagline ── */}
        <motion.p
          className="font-cormorant italic font-normal mt-4 sm:mt-5"
          style={{
            fontSize:      'clamp(1.35rem, 2.4vw, 1.73rem)',
            letterSpacing: '0.10em',
            color:         'var(--gold-text)',
            textShadow:    '0 2px 18px rgba(8,8,8,0.85)',
          }}
          initial={rm ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.30, ease: EASE }}
          whileHover={rm ? {} : {
            y:          -4,
            color:      'rgba(212,175,55,1)',
            transition: HOVER_SPRING,
          }}
        >
          Simplicity Kind of Different
        </motion.p>

      </div>

      {/* ── CTA ── */}
      <motion.div
        className="relative z-20 mt-16 sm:mt-24 lg:mt-32 w-full flex justify-center"
        initial={rm ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.0, delay: 1.85, ease: EASE }}
      >
        <MagneticElement>
          <motion.div
            style={{ borderRadius: '9999px', display: 'inline-flex' }}
            animate={rm || !isInView ? {} : {
              boxShadow: [
                '0 0 0px  0px rgba(196,154,46,0.00)',
                '0 0 28px 8px rgba(196,154,46,0.32)',
                '0 0 0px  0px rgba(196,154,46,0.00)',
              ],
            }}
            transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut', repeatDelay: 1.2 }}
          >
            <a
              href="#about"
              className="inline-flex items-center gap-3 rounded-full font-jost text-[0.65rem]
                         font-medium tracking-[0.22em] uppercase transition-all duration-500
                         hover:scale-[1.05] hover:brightness-110 active:scale-[0.97]"
              style={{
                background: 'var(--gold)',
                color:      'var(--text-on-accent)',
                padding:    '0.9rem 2rem',
              }}
            >
              About the Studio
              <motion.span
                animate={rm || !isInView ? {} : { x: [0, 4, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              >
                <ArrowRight size={12} strokeWidth={1.5} aria-hidden="true" />
              </motion.span>
            </a>
          </motion.div>
        </MagneticElement>
      </motion.div>
    </section>
  )
}
