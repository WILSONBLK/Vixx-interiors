'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { AnimatedLine } from '@/components/ui/AnimatedLine'

export function AboutStudio() {
  return (
    <section id="about" className="relative overflow-x-hidden">

      {/* Visual bridge from Hero */}
      <div
        aria-hidden="true"
        className="absolute top-0 inset-x-0 h-px pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent, var(--gold-line), transparent)' }}
      />

      <div className="relative" style={{ background: 'var(--bg-primary)' }}>
        <div className="container-site pt-24 pb-20 lg:pt-32 lg:pb-28">

          <ScrollReveal>
            <div className="flex items-center gap-3 mb-5">
              <AnimatedLine width={24} delay={0.1} />
              <p className="label-xs">About the Studio</p>
            </div>

            <h2
              className="font-cormorant font-light mb-8"
              style={{
                fontSize:   'clamp(2.6rem, 5vw, 4.5rem)',
                lineHeight: 1.05,
                color:      'var(--text-primary)',
                maxWidth:   '20ch',
              }}
            >
              Design driven by{' '}
              <em className="not-italic" style={{ color: 'var(--gold)' }}>intention.</em>
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.12} variant="fadeUp">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-start max-w-4xl">
              <div className="space-y-5">
                <p className="body-lg">
                  VIXX Interiors is a Lagos-based interior design studio founded on the belief that a great space is not simply beautiful — it is purposeful, personal, and enduring.
                </p>
                <p className="body-lg">
                  Every project begins with deep listening. We understand how you live, what matters to you, and what the space must become — before a single line is drawn.
                </p>
              </div>

              <div className="space-y-5">
                <p className="body-lg">
                  From full residential commissions to focused design consultations, we bring the same precision and care to every scale of work.
                </p>
                <a href="#founder" className="btn-ghost inline-flex mt-2">
                  Meet the Founder
                  <ArrowRight size={12} strokeWidth={1.5} aria-hidden="true" />
                </a>
              </div>
            </div>
          </ScrollReveal>

        </div>
      </div>

    </section>
  )
}
