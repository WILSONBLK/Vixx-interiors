'use client'

import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { ScrollReveal }    from '@/components/ui/ScrollReveal'
import { AnimatedLine }    from '@/components/ui/AnimatedLine'
import { SectionCTAButton } from '@/components/ui/SectionCTA'

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

const SECTION_TEXT = {
  '--text-primary':   'var(--brand-cream)',
  '--text-secondary': 'rgba(240,235,225,0.72)',
} as React.CSSProperties

export function AboutStudio() {
  const rm = useReducedMotion()

  return (
    <section
      id="about"
      className="relative overflow-hidden flex flex-col"
      style={{ minHeight: '100svh' }}
    >
      {/* Background image — smooth load-in, reduced to half opacity */}
      <motion.div
        className="absolute inset-0"
        initial={rm ? false : { opacity: 0, scale: 1.03 }}
        animate={{ opacity: 0.5, scale: 1 }}
        transition={{ duration: 2.0, ease: EASE, delay: 0.1 }}
      >
        <Image
          src="/images/about-studio.png"
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
        style={{ background: 'rgba(8,8,8,0.55)' }}
      />

      {/* Radial vignette — edges darker, centre breathes */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 85% 72% at 50% 50%, transparent 38%, rgba(8,8,8,0.38) 100%)',
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
              className="font-cormorant font-light mb-8 mx-auto"
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
                VIXX Interiors is a premium interior design studio built on the belief that great
                spaces are not simply beautiful — they are purposeful and personal.
              </p>
              <p className="body-lg">
                We begin every project by listening deeply, understanding how you live and what you
                need, before a single line is drawn.
              </p>
              <p className="body-lg">
                From full residential transformations to focused design consultations, we bring the
                same level of craft and intention to every project — regardless of scale.
              </p>
            </div>
          </ScrollReveal>

          {/* Studio identity pillars */}
          <ScrollReveal delay={0.15} variant="fadeUp">
            <div className="flex items-center justify-center gap-5 mb-10">
              <span className="label-xs">Precision</span>
              <span className="label-xs" style={{ opacity: 0.35 }}>·</span>
              <span className="label-xs">Restraint</span>
              <span className="label-xs" style={{ opacity: 0.35 }}>·</span>
              <span className="label-xs">Intention</span>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2} variant="fadeUp">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <SectionCTAButton href="#founder" label="Meet The Founder" variant="primary" />
              <SectionCTAButton href="/about" label="About The Studio" variant="secondary" />
            </div>
          </ScrollReveal>

        </div>
      </div>

    </section>
  )
}
