'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { PORTFOLIO_PROJECTS } from '@/lib/data'
import type { PortfolioProject } from '@/types'
import { PageHeroBackground } from '@/components/ui/PageHeroBackground'

/* ── Animation helpers ─────────────────────────────────────────────────────── */

const EASE = [0.16, 1, 0.3, 1] as const

function FadeUp({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  const ref            = useRef<HTMLDivElement>(null)
  const inView         = useInView(ref, { once: true, amount: 0.08 })
  const prefersReduced = useReducedMotion()

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={prefersReduced ? false : { opacity: 0, y: 32 }}
      animate={inView || prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
      transition={{ duration: 0.9, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  )
}

function FadeIn({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  const ref            = useRef<HTMLDivElement>(null)
  const inView         = useInView(ref, { once: true, amount: 0.06 })
  const prefersReduced = useReducedMotion()

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={prefersReduced ? false : { opacity: 0 }}
      animate={inView || prefersReduced ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 1.1, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  )
}

/* ── Single gallery image cell ─────────────────────────────────────────────── */

function GalleryImage({
  src,
  alt,
  aspect,
  colClass,
  delay = 0,
  floatDelay = 0,
  sizes,
}: {
  src:        string
  alt:        string
  aspect:     string
  colClass:   string
  delay?:     number
  floatDelay?: number
  sizes:      string
}) {
  const ref            = useRef<HTMLDivElement>(null)
  const inView         = useInView(ref, { once: true, amount: 0.05 })
  const prefersReduced = useReducedMotion()

  const floatDuration = 12 + floatDelay * 2
  const floatStartDelay = floatDelay * 0.4

  return (
    /* ① Entry animation */
    <motion.div
      ref={ref}
      className={colClass}
      initial={prefersReduced ? false : { opacity: 0, y: 28, scale: 0.985 }}
      animate={
        inView || prefersReduced
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 0, y: 28, scale: 0.985 }
      }
      transition={{ duration: 1.0, ease: EASE, delay }}
    >
      {/* ② Passive float — each image drifts on its own cadence */}
      <motion.div
        animate={prefersReduced ? {} : { y: [0, -5, 0, 4, 0] }}
        transition={
          prefersReduced
            ? {}
            : {
                duration:  floatDuration,
                repeat:    Infinity,
                ease:      'easeInOut',
                delay:     floatStartDelay,
              }
        }
      >
        {/* ③ Hover lift + scale, tap press */}
        <motion.div
          className="relative w-full overflow-hidden rounded-2xl group"
          style={{ aspectRatio: aspect, background: 'var(--surface-raised)' }}
          whileHover={prefersReduced ? {} : { scale: 1.018, y: -6 }}
          whileTap={prefersReduced   ? {} : { scale: 0.985, y: 0 }}
          transition={{ duration: 0.65, ease: EASE }}
        >
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover"
            sizes={sizes}
            loading="lazy"
          />
          {/* Subtle gold atmosphere revealed on hover */}
          <div
            className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background:
                'linear-gradient(135deg, rgba(196,154,46,0.07) 0%, transparent 55%)',
            }}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

/* ── Project grid layouts ──────────────────────────────────────────────────── */

type Cell = {
  colClass: string
  aspect:   string
  sizes:    string
}

function get6ImageLayout(): Cell[][] {
  return [
    [
      { colClass: 'md:col-span-2', aspect: '4/3',  sizes: '(max-width:768px) 100vw, (max-width:1024px) 60vw, 55vw' },
      { colClass: 'md:col-span-1', aspect: '3/4',  sizes: '(max-width:768px) 100vw, (max-width:1024px) 40vw, 28vw' },
    ],
    [
      { colClass: 'md:col-span-1', aspect: '4/5',  sizes: '(max-width:768px) 100vw, 30vw' },
      { colClass: 'md:col-span-1', aspect: '4/5',  sizes: '(max-width:768px) 100vw, 30vw' },
      { colClass: 'md:col-span-1', aspect: '4/5',  sizes: '(max-width:768px) 100vw, 30vw' },
    ],
    [
      { colClass: 'md:col-span-3', aspect: '21/8', sizes: '(max-width:768px) 100vw, 90vw' },
    ],
  ]
}

function get4ImageLayout(): Cell[][] {
  return [
    [
      { colClass: 'md:col-span-2', aspect: '16/10', sizes: '(max-width:768px) 100vw, (max-width:1024px) 55vw, 55vw' },
      { colClass: 'md:col-span-1', aspect: '3/4',   sizes: '(max-width:768px) 100vw, (max-width:1024px) 40vw, 28vw' },
    ],
    [
      { colClass: 'md:col-span-1', aspect: '3/4',   sizes: '(max-width:768px) 100vw, (max-width:1024px) 40vw, 28vw' },
      { colClass: 'md:col-span-2', aspect: '16/10', sizes: '(max-width:768px) 100vw, (max-width:1024px) 55vw, 55vw' },
    ],
  ]
}

function ProjectImages({
  project,
  startIndex = 0,
}: {
  project:     PortfolioProject
  startIndex?: number
}) {
  const layout = project.images.length >= 6 ? get6ImageLayout() : get4ImageLayout()
  let imageIdx  = 0
  let globalIdx = startIndex

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-5">
      {layout.map((row, rowIdx) =>
        row.map((cell, cellIdx) => {
          const src = project.images[imageIdx++]
          const fi  = globalIdx++
          if (!src) return null
          return (
            <GalleryImage
              key={`${rowIdx}-${cellIdx}`}
              src={src}
              alt=""
              aspect={cell.aspect}
              colClass={cell.colClass}
              sizes={cell.sizes}
              delay={rowIdx * 0.08 + cellIdx * 0.05}
              floatDelay={fi * 0.65}
            />
          )
        })
      )}
    </div>
  )
}

/* ── Project block ─────────────────────────────────────────────────────────── */

function ProjectBlock({
  project,
  startIndex,
}: {
  project:    PortfolioProject
  startIndex: number
}) {
  return (
    <div>
      <ProjectImages project={project} startIndex={startIndex} />
    </div>
  )
}

/* ── Ornamental divider between project groups ─────────────────────────────── */

function ProjectDivider() {
  return (
    <FadeIn>
      <div className="flex items-center gap-5 py-20 lg:py-28">
        <div
          className="flex-1"
          style={{
            height:     '1px',
            background: 'linear-gradient(90deg, transparent, rgba(196,154,46,0.22) 35%, rgba(196,154,46,0.22) 65%, transparent)',
          }}
        />
        <div className="flex items-center gap-1.5">
          <div style={{ width: 3, height: 3, borderRadius: '50%', background: 'rgba(196,154,46,0.4)' }} />
          <div style={{ width: 18, height: 1, background: 'rgba(196,154,46,0.32)' }} />
          <div style={{ width: 5, height: 5, borderRadius: '50%', background: 'rgba(196,154,46,0.55)' }} />
          <div style={{ width: 18, height: 1, background: 'rgba(196,154,46,0.32)' }} />
          <div style={{ width: 3, height: 3, borderRadius: '50%', background: 'rgba(196,154,46,0.4)' }} />
        </div>
        <div
          className="flex-1"
          style={{
            height:     '1px',
            background: 'linear-gradient(90deg, transparent, rgba(196,154,46,0.22) 35%, rgba(196,154,46,0.22) 65%, transparent)',
          }}
        />
      </div>
    </FadeIn>
  )
}

/* ── Subtle luxury background layer ───────────────────────────────────────── */

function GalleryBackground() {
  return (
    <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">

      {/* Blueprint micro-grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: [
            'linear-gradient(rgba(196,154,46,0.015) 1px, transparent 1px)',
            'linear-gradient(90deg, rgba(196,154,46,0.015) 1px, transparent 1px)',
          ].join(', '),
          backgroundSize: '96px 96px',
        }}
      />

      {/* Ambient cream glow — upper */}
      <div
        className="absolute left-1/2 -translate-x-1/2"
        style={{
          top:        '10%',
          width:      '65%',
          height:     '45%',
          background: 'radial-gradient(ellipse at center, rgba(196,154,46,0.022) 0%, transparent 66%)',
        }}
      />

      {/* Ambient cream glow — lower */}
      <div
        className="absolute left-1/2 -translate-x-1/2"
        style={{
          top:        '58%',
          width:      '48%',
          height:     '38%',
          background: 'radial-gradient(ellipse at center, rgba(232,220,180,0.016) 0%, transparent 64%)',
        }}
      />

      {/* Corner accent brackets */}
      <div
        className="absolute top-8 left-8 w-8 h-8"
        style={{ borderTop: '1px solid rgba(196,154,46,0.14)', borderLeft: '1px solid rgba(196,154,46,0.14)' }}
      />
      <div
        className="absolute top-8 right-8 w-8 h-8"
        style={{ borderTop: '1px solid rgba(196,154,46,0.14)', borderRight: '1px solid rgba(196,154,46,0.14)' }}
      />
      <div
        className="absolute bottom-8 left-8 w-8 h-8"
        style={{ borderBottom: '1px solid rgba(196,154,46,0.14)', borderLeft: '1px solid rgba(196,154,46,0.14)' }}
      />
      <div
        className="absolute bottom-8 right-8 w-8 h-8"
        style={{ borderBottom: '1px solid rgba(196,154,46,0.14)', borderRight: '1px solid rgba(196,154,46,0.14)' }}
      />

      {/* Side margin accent lines — desktop only */}
      <div
        className="absolute left-14 top-24 bottom-24 hidden lg:block"
        style={{
          width:      '1px',
          background: 'linear-gradient(to bottom, transparent, rgba(196,154,46,0.055) 18%, rgba(196,154,46,0.055) 82%, transparent)',
        }}
      />
      <div
        className="absolute right-14 top-24 bottom-24 hidden lg:block"
        style={{
          width:      '1px',
          background: 'linear-gradient(to bottom, transparent, rgba(196,154,46,0.055) 18%, rgba(196,154,46,0.055) 82%, transparent)',
        }}
      />

      {/* Upper-left diagonal accent */}
      <svg
        className="absolute top-0 left-0 w-56 h-56"
        viewBox="0 0 224 224"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
      >
        <line x1="0" y1="224" x2="224" y2="0"   stroke="rgba(196,154,46,0.04)"  strokeWidth="0.8" />
        <line x1="0" y1="160" x2="160" y2="0"   stroke="rgba(196,154,46,0.028)" strokeWidth="0.6" />
      </svg>

      {/* Lower-right diagonal accent */}
      <svg
        className="absolute bottom-0 right-0 w-56 h-56"
        viewBox="0 0 224 224"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
      >
        <line x1="224" y1="0"  x2="0"   y2="224" stroke="rgba(196,154,46,0.04)"  strokeWidth="0.8" />
        <line x1="224" y1="64" x2="64"  y2="224" stroke="rgba(196,154,46,0.028)" strokeWidth="0.6" />
      </svg>

      {/* Central compass ring — felt at mid-section */}
      <svg
        className="absolute left-1/2 -translate-x-1/2"
        style={{ top: '42%' }}
        width="280"
        height="280"
        viewBox="-140 -140 280 280"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
      >
        <circle cx="0" cy="0" r="132" stroke="rgba(196,154,46,0.02)"  strokeWidth="0.7" />
        <circle cx="0" cy="0" r="84"  stroke="rgba(196,154,46,0.025)" strokeWidth="0.5" />
        {/* Cardinal tick marks */}
        <line x1="0"    y1="-132" x2="0"    y2="-122" stroke="rgba(196,154,46,0.07)" strokeWidth="0.9" />
        <line x1="0"    y1="122"  x2="0"    y2="132"  stroke="rgba(196,154,46,0.07)" strokeWidth="0.9" />
        <line x1="-132" y1="0"    x2="-122" y2="0"    stroke="rgba(196,154,46,0.07)" strokeWidth="0.9" />
        <line x1="122"  y1="0"    x2="132"  y2="0"    stroke="rgba(196,154,46,0.07)" strokeWidth="0.9" />
      </svg>

    </div>
  )
}

/* ── Title section ─────────────────────────────────────────────────────────── */

function TitleSection() {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        minHeight:     '85vh',
        paddingTop:    'calc(var(--nav-height) + 6rem)',
        paddingBottom: '7rem',
      }}
    >
      {/* Hero background image */}
      <PageHeroBackground src="/images/portfolio/proj-b-1.jpg" overlay={0.28} fadeHeight={70} />

      {/* Ambient gold glow — on top of image, warms the center */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 50% 60%, var(--gold-glow) 0%, transparent 65%)',
        }}
      />

      {/* Architectural gold line art */}
      <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
        <svg
          className="absolute inset-0 w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 700"
          preserveAspectRatio="xMidYMid slice"
        >
          <circle cx="720" cy="430" r="390" fill="none" stroke="rgba(196,154,46,0.055)" strokeWidth="1" />
          <circle cx="720" cy="430" r="290" fill="none" stroke="rgba(196,154,46,0.065)" strokeWidth="0.7" />
          <circle cx="720" cy="430" r="185" fill="none" stroke="rgba(196,154,46,0.075)" strokeWidth="0.5" />
          <circle cx="720" cy="430" r="90"  fill="none" stroke="rgba(196,154,46,0.06)"  strokeWidth="0.5" />
          <line x1="720" y1="0"    x2="720"  y2="700"  stroke="rgba(196,154,46,0.045)" strokeWidth="0.5" />
          <line x1="0"   y1="430"  x2="1440" y2="430"  stroke="rgba(196,154,46,0.045)" strokeWidth="0.5" />
          <line x1="330" y1="40"   x2="1110" y2="820"  stroke="rgba(196,154,46,0.03)"  strokeWidth="0.4" />
          <line x1="1110" y1="40"  x2="330"  y2="820"  stroke="rgba(196,154,46,0.03)"  strokeWidth="0.4" />
          <line x1="718" y1="37"   x2="722"  y2="53"   stroke="rgba(196,154,46,0.12)"  strokeWidth="0.8" />
          <line x1="718" y1="807"  x2="722"  y2="823"  stroke="rgba(196,154,46,0.12)"  strokeWidth="0.8" />
          <line x1="326" y1="428"  x2="310"  y2="432"  stroke="rgba(196,154,46,0.12)"  strokeWidth="0.8" />
          <line x1="1114" y1="428" x2="1130" y2="432"  stroke="rgba(196,154,46,0.12)"  strokeWidth="0.8" />
          <polyline points="60,40 40,40 40,80"          fill="none" stroke="rgba(196,154,46,0.09)" strokeWidth="0.6" />
          <polyline points="1380,40 1400,40 1400,80"    fill="none" stroke="rgba(196,154,46,0.09)" strokeWidth="0.6" />
          <polyline points="60,660 40,660 40,620"       fill="none" stroke="rgba(196,154,46,0.09)" strokeWidth="0.6" />
          <polyline points="1380,660 1400,660 1400,620" fill="none" stroke="rgba(196,154,46,0.09)" strokeWidth="0.6" />
        </svg>
      </div>

      <div
        className="container-site relative z-10 text-center"
        style={{ '--text-primary': 'var(--brand-cream)' } as React.CSSProperties}
      >

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
          className="flex items-center justify-center gap-3 mb-8"
        >
          <span style={{ display: 'block', width: '28px', height: '1px', background: 'var(--gold-line)' }} />
          <p className="label-xs">VIXX Interiors</p>
          <span style={{ display: 'block', width: '28px', height: '1px', background: 'var(--gold-line)' }} />
        </motion.div>

        <div style={{ overflow: 'hidden' }}>
          <motion.h1
            className="font-cormorant font-light"
            style={{
              fontSize:      'clamp(4.5rem, 10vw, 11rem)',
              lineHeight:    0.9,
              color:         'var(--brand-cream)',
              letterSpacing: '-0.01em',
              textShadow:    '0 4px 28px rgba(8,8,8,0.55)',
            }}
            initial={{ opacity: 0, y: 48 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: EASE, delay: 0.2 }}
          >
            Selected
          </motion.h1>
        </div>

        <div style={{ overflow: 'hidden' }}>
          <motion.h1
            className="font-cormorant italic font-light"
            style={{
              fontSize:      'clamp(4.5rem, 10vw, 11rem)',
              lineHeight:    0.9,
              color:         'var(--gold-text)',
              letterSpacing: '-0.01em',
            }}
            initial={{ opacity: 0, y: 48 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: EASE, delay: 0.32 }}
          >
            Work
          </motion.h1>
        </div>

      </div>

      <div
        aria-hidden
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{
          height:     '120px',
          background: 'linear-gradient(to bottom, transparent 0%, var(--bg-primary) 100%)',
        }}
      />
    </section>
  )
}

/* ── Divider transition ────────────────────────────────────────────────────── */

function GalleryDivider() {
  return (
    <FadeIn>
      <div className="container-site py-4">
        <div
          style={{
            height:     '1px',
            background: 'linear-gradient(90deg, transparent, var(--gold-line), transparent)',
          }}
        />
      </div>
    </FadeIn>
  )
}

/* ── CTA section ───────────────────────────────────────────────────────────── */

function CTASection() {
  return (
    <section
      className="relative pt-44 pb-28 lg:pt-60 lg:pb-40 overflow-hidden"
      style={{ background: 'var(--bg-secondary)' }}
    >
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 55% at 50% 50%, var(--gold-glow) 0%, transparent 65%)',
        }}
      />

      <div className="container-site relative z-10 text-center">
        <FadeUp>
          <p
            className="font-cormorant italic font-light"
            style={{
              fontSize:      'clamp(1.6rem, 3.2vw, 3rem)',
              color:         'var(--text-secondary)',
              lineHeight:    1.3,
              maxWidth:      '28ch',
              marginLeft:    'auto',
              marginRight:   'auto',
              marginBottom:  'clamp(3rem, 5vw, 5rem)',
            }}
          >
            &ldquo;Every project begins with listening.&rdquo;
          </p>
        </FadeUp>

        <FadeUp delay={0.12}>
          <Link
            href="/start"
            className="btn-primary"
            style={{
              fontSize:      '0.7rem',
              letterSpacing: '0.28em',
              padding:       '1.1rem 2.8rem',
            }}
          >
            Start a Project
            <ArrowRight size={14} strokeWidth={1.5} aria-hidden />
          </Link>
        </FadeUp>
      </div>
    </section>
  )
}

/* ── Root export ───────────────────────────────────────────────────────────── */

export function LuxuryGallery() {
  return (
    <div style={{ background: 'var(--bg-primary)' }}>

      <TitleSection />

      <GalleryDivider />

      <section className="relative pt-16 lg:pt-20 pb-20 lg:pb-28 overflow-hidden">
        <GalleryBackground />

        <div className="container-site relative z-10">
          {PORTFOLIO_PROJECTS.map((project, i) => {
            const startIndex = PORTFOLIO_PROJECTS
              .slice(0, i)
              .reduce((acc, p) => acc + p.images.length, 0)

            return (
              <div key={project.id}>
                {i > 0 && <ProjectDivider />}
                <ProjectBlock project={project} startIndex={startIndex} />
              </div>
            )
          })}
        </div>
      </section>

      <CTASection />

    </div>
  )
}
