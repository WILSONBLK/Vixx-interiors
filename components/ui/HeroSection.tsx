'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { ArrowDown } from 'lucide-react'
import { motion, useMotionValue, useSpring, useTransform, useInView } from 'framer-motion'
import { MagneticElement } from '@/components/ui/MagneticElement'

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]
const HOVER_SPRING = { type: 'spring' as const, stiffness: 300, damping: 24 }

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView   = useInView(sectionRef, { amount: 0.1 })
  const [isTouch,         setIsTouch]         = useState(false)
  const [isReducedMotion, setIsReducedMotion] = useState(false)
  const [imageHovered,    setImageHovered]    = useState(false)

  const rawX    = useMotionValue(0)
  const rawY    = useMotionValue(0)
  const springX = useSpring(rawX, { stiffness: 25, damping: 20 })
  const springY = useSpring(rawY, { stiffness: 25, damping: 20 })
  const xPx     = useTransform(springX, (v) => `${v}%`)
  const yPx     = useTransform(springY, (v) => `${v}%`)
  const glowX   = useTransform(springX, (v) => `calc(50% + ${-v * 12}%)`)
  const glowY   = useTransform(springY, (v) => `calc(50% + ${-v * 12}%)`)

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
      style={{
        minHeight:     '100svh',
        paddingTop:    'var(--nav-height)',
        paddingBottom: 'var(--nav-height)',
      }}
      onMouseEnter={() => setImageHovered(true)}
      onMouseLeave={() => setImageHovered(false)}
    >
      {/* ── Background ─────────────────────────────────────────────────────── */}
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

      {/* ── Cursor proximity glow ──────────────────────────────────────────── */}
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

      {/* ── Hero content — centered, logo-first ───────────────────────────── */}
      <div className="relative z-20 flex flex-col items-center justify-center text-center w-full px-6 sm:px-12"
           style={{ gap: 'clamp(1.5rem, 3.5vw, 3rem)' }}>

        {/* Interior Design Studio — above brand name */}
        <motion.p
          className="font-jost uppercase w-full"
          style={{
            fontSize:      'clamp(0.93rem, 1.65vw, 1.17rem)',
            letterSpacing: '0.42em',
            textIndent:    '0.42em',
            color:         'var(--gold-text)',
            textShadow:    '0 1px 14px rgba(8,8,8,0.9)',
            cursor:        'default',
          }}
          initial={rm ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 0.1, ease: EASE }}
          whileHover={rm ? {} : { scale: 1.06, transition: HOVER_SPRING }}
          whileTap={rm ? {} : { scale: 0.94 }}
        >
          Interior Design Studio
        </motion.p>

        {/* Brand name — the visual focal point */}
        <motion.h1
          initial={rm ? false : { opacity: 0, scale: 0.92, y: 28 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.9, delay: 0.3, ease: EASE }}
          whileTap={rm ? {} : { scale: 0.97 }}
          className="font-jost uppercase text-center w-full"
          style={{ margin: 0, cursor: 'default' }}
        >
          <motion.span
            className="text-white dark:text-black"
            style={{
              display:       'block',
              fontSize:      'clamp(2.8rem, min(16.8vw, 17svh), 14.4rem)',
              fontWeight:    200,
              letterSpacing: '0.22em',
              textShadow:    '0 6px 36px rgba(8,8,8,0.55)',
              lineHeight:    1,
            }}
            whileHover={rm ? {} : { scale: 1.07, transition: HOVER_SPRING }}
            whileTap={rm ? {} : { scale: 0.93 }}
          >
            VIXX
          </motion.span>
          <motion.span
            className="text-white dark:text-black"
            style={{
              display:       'block',
              fontSize:      'clamp(0.84rem, min(4.85vw, 4.9svh), 4.16rem)',
              fontWeight:    700,
              letterSpacing: '0.5em',
              paddingLeft:   '0.5em',
              textShadow:    '0 6px 36px rgba(8,8,8,0.55)',
              lineHeight:    1,
              marginTop:     '0.12em',
            }}
            whileHover={rm ? {} : { scale: 1.07, letterSpacing: '0.6em', transition: HOVER_SPRING }}
            whileTap={rm ? {} : { scale: 0.93 }}
          >
            INTERIORS
          </motion.span>
        </motion.h1>

        {/* Gold separator */}
        <motion.div
          aria-hidden
          initial={rm ? false : { scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.9, delay: 0.95, ease: EASE }}
          style={{
            width:           52,
            height:          1,
            background:      'rgba(196,154,46,0.55)',
            transformOrigin: 'center',
          }}
        />

        {/* Tagline */}
        <motion.p
          className="font-jost italic font-bold w-full"
          style={{
            fontSize:      'clamp(0.93rem, 1.65vw, 1.17rem)',
            letterSpacing: '0.28em',
            paddingLeft:   '0.28em',
            color:         'rgba(196,154,46,0.68)',
            textShadow:    '0 2px 14px rgba(8,8,8,0.88)',
            cursor:        'default',
          }}
          initial={rm ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 1.15, ease: EASE }}
          whileHover={rm ? {} : { scale: 1.06, color: 'rgba(196,154,46,1)', transition: HOVER_SPRING }}
          whileTap={rm ? {} : { scale: 0.94 }}
        >
          simplicity kind of different
        </motion.p>

        {/* CTA */}
        <motion.div
          className="flex justify-center"
          style={{ marginTop: 0 }}
          initial={rm ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 1.5, ease: EASE }}
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
                  animate={rm || !isInView ? {} : { y: [0, 4, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <ArrowDown size={12} strokeWidth={1.5} aria-hidden="true" />
                </motion.span>
              </a>
            </motion.div>
          </MagneticElement>
        </motion.div>

      </div>
    </section>
  )
}
