'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useReducedMotion, useInView } from 'framer-motion'
import { ScrollReveal }    from '@/components/ui/ScrollReveal'
import { AnimatedLine }    from '@/components/ui/AnimatedLine'
import { SectionCTAButton } from '@/components/ui/SectionCTA'

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

const SECTION_TEXT = {
  '--text-primary':   'var(--brand-cream)',
  '--text-secondary': 'rgba(240,235,225,0.72)',
} as React.CSSProperties

export function AboutStudio() {
  const rm         = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const isInView   = useInView(sectionRef, { once: true, amount: 0.12 })

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative overflow-hidden flex flex-col"
      style={{ minHeight: '100svh' }}
    >
      {/* Background image — animates in when section enters the viewport */}
      <motion.div
        className="absolute inset-0"
        initial={rm ? false : { opacity: 0, scale: 1.03 }}
        animate={rm || isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.03 }}
        transition={{ duration: 2.0, ease: EASE, delay: 0.1 }}
      >
        <Image
          src="/images/about-studio.avif"
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
      </motion.div>

      {/* Dark tint — keeps text legible */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{ background: 'var(--photo-overlay-about)' }}
      />

      {/* Radial vignette — edges darker, centre breathes */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 85% 72% at 50% 50%, transparent 38%, var(--photo-vignette-about) 100%)',
        }}
      />


      {/* Content */}
      <div
        className="relative z-10 flex-1 flex flex-col items-center justify-center"
        style={SECTION_TEXT}
      >
        <div className="container-site w-full text-center py-20 lg:py-24">

          <ScrollReveal>
            <div className="flex items-center justify-center gap-3 mb-6">
              <AnimatedLine width={24} delay={0.1} />
              <p className="label-xs">About the Studio</p>
              <AnimatedLine width={24} delay={0.1} />
            </div>

            <h2
              className="font-jost font-light mb-8 mx-auto"
              style={{
                fontSize:   'clamp(2.4rem, 4.5vw, 4rem)',
                lineHeight: 1.05,
                color:      'var(--brand-cream)',
                textShadow: '0 4px 24px rgba(8,8,8,0.5)',
              }}
            >
              Design driven by{' '}
              <em className="not-italic" style={{ color: 'var(--gold)' }}>intention.</em>
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.1} variant="fadeUp">
            <div className="space-y-5 mx-auto mb-10" style={{ maxWidth: '48ch' }}>
              <p className="body-lg">
                VIXX Interiors is a Nigerian interior design studio with a single belief: every
                space has a story to tell — and that story should be yours.
              </p>
              <p className="body-lg">
                We put your personality into every space so that when you walk through your door,
                it feels like you — calm, personal, and completely your own.
              </p>
              <p className="body-lg">
                From homes and apartments to commercial spaces, we carry the same craft and
                intention to every project, across Nigeria.
              </p>
            </div>
          </ScrollReveal>

          {/* Studio identity pillars */}
          <ScrollReveal delay={0.15} variant="fadeUp">
            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 mb-10">
              <span className="label-xs">Simplicity</span>
              <span className="label-xs" style={{ opacity: 0.35 }}>·</span>
              <span className="label-xs">Personal</span>
              <span className="label-xs" style={{ opacity: 0.35 }}>·</span>
              <span className="label-xs">Peace</span>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2} variant="fadeUp">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <SectionCTAButton href="#founder" label="Meet The Founder" variant="primary" arrow="down" />
              <SectionCTAButton href="/about" label="About The Studio" variant="secondary" />
            </div>
          </ScrollReveal>

        </div>
      </div>

    </section>
  )
}
