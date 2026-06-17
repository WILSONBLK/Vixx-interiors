import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Footer }       from '@/components/layout/Footer'
import { HexMotif }     from '@/components/ui/HexMotif'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { PROCESS_STEPS } from '@/lib/data'
import { AnimatedLine } from '@/components/ui/AnimatedLine'
import { BackButton }   from '@/components/ui/BackButton'

export const metadata: Metadata = {
  title:       'Our Design Process – VIXX Interiors',
  description: 'Discover the six-stage VIXX Interiors design process — from discovery to final reveal. A process as refined as the result.',
}

export default function ProcessPage() {
  return (
    <main className="overflow-x-hidden" style={{ background: 'var(--bg-primary)' }}>
      <BackButton />

      {/* ── Hero ── */}
      <section className="relative pt-28 sm:pt-36 lg:pt-40 pb-14 sm:pb-20 overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 0%, var(--gold-glow) 0%, transparent 65%)' }}
        />
        <div className="container-site relative z-10 max-w-4xl">
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-5">
              <AnimatedLine width={24} delay={0.1} />
              <p className="label-xs">How We Work</p>
            </div>
            <h1 className="heading-xl mb-4">
              A process as refined{' '}
              <em className="not-italic" style={{ color: 'var(--gold)' }}>as the result.</em>
            </h1>
            <AnimatedLine width={200} className="mb-6" delay={0.25} />
            <p className="body-lg max-w-2xl">
              Every VIXX project follows a structured six-stage process — from initial discovery through to final reveal. Nothing is left to chance, and nothing is rushed.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Process steps ── */}
      <section className="section-pad" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container-site">
          <div className="max-w-4xl mx-auto">
            {PROCESS_STEPS.map((step, i) => (
              <ScrollReveal key={step.number} delay={i * 0.05} variant="fadeUp">
                <div
                  className="grid lg:grid-cols-[120px_1fr_100px] gap-6 lg:gap-10 py-10"
                  style={{ borderBottom: '1px solid var(--border)' }}
                >
                  {/* Number */}
                  <div className="flex lg:flex-col items-center lg:items-start gap-4 lg:gap-2">
                    <span
                      className="font-cormorant text-5xl lg:text-6xl font-light leading-none"
                      style={{ color: 'var(--gold)' }}
                    >
                      {step.number}
                    </span>
                    <div
                      className="lg:hidden h-px flex-1"
                      style={{ background: 'linear-gradient(to right, var(--gold), transparent)', opacity: 0.3 }}
                    />
                  </div>

                  {/* Content */}
                  <div>
                    <h2 className="heading-md mb-3">{step.title}</h2>
                    <p className="body-lg">{step.description}</p>

                    {/* Phase indicator */}
                    <div className="mt-4 flex items-center gap-2">
                      <div className="h-px w-8" style={{ background: 'var(--gold)', opacity: 0.5 }} />
                      <span className="font-jost text-[0.6rem] tracking-[0.2em] uppercase" style={{ color: 'var(--text-muted)' }}>
                        Phase {i + 1} of {PROCESS_STEPS.length}
                      </span>
                    </div>
                  </div>

                  {/* Duration */}
                  <div className="flex lg:flex-col lg:items-end justify-end lg:justify-start">
                    <span
                      className="font-jost text-[0.7rem] tracking-[0.15em] uppercase px-3 py-1.5"
                      style={{
                        border: '1px solid var(--gold-border-subtle)',
                        color: 'var(--gold)',
                        background: 'var(--gold-glow)',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {step.duration}
                    </span>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Timeline visual ── */}
      <section className="section-pad">
        <div className="container-site">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal variant="fadeRight">
              <div className="flex items-center gap-3 mb-4">
                <AnimatedLine width={24} delay={0.1} />
                <p className="label-xs">Project Timeline</p>
              </div>
              <h2 className="heading-lg mb-6">Typically 12–16 weeks from start to reveal.</h2>
              <p className="body-lg mb-6">
                The exact timeline depends on the scope of your project, the availability of materials, and site conditions. We share a detailed programme at the beginning of every project so you know exactly what to expect — and when.
              </p>
              <p className="body-lg">
                We believe in realistic timelines rather than rushed ones. A VIXX project that takes an extra week to get exactly right is better than one that arrives a week early and feels incomplete.
              </p>
            </ScrollReveal>

            <ScrollReveal variant="fadeLeft" delay={0.1}>
              <div className="relative">
                {/* Visual timeline bar */}
                <div className="space-y-3">
                  {[
                    { label: 'Discovery & Survey',    width: '20%',  weeks: 'Weeks 1–2'   },
                    { label: 'Concept Design',         width: '35%',  weeks: 'Weeks 3–5'   },
                    { label: 'Design Development',     width: '55%',  weeks: 'Weeks 5–8'   },
                    { label: 'Procurement',            width: '80%',  weeks: 'Weeks 8–14'  },
                    { label: 'Installation & Reveal',  width: '100%', weeks: 'Weeks 14–16' },
                  ].map((bar, i) => (
                    <div key={bar.label}>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-jost text-[0.65rem] tracking-wide" style={{ color: 'var(--text-muted)' }}>
                          {bar.label}
                        </span>
                        <span className="font-jost text-[0.6rem]" style={{ color: 'var(--text-muted)' }}>
                          {bar.weeks}
                        </span>
                      </div>
                      <div className="h-1.5 w-full" style={{ background: 'var(--border)' }}>
                        <div
                          className="h-full transition-all duration-1000"
                          style={{
                            width: bar.width,
                            background: `linear-gradient(90deg, var(--gold), var(--gold-pale))`,
                            opacity: 0.6 + i * 0.08,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section-pad relative overflow-hidden" style={{ background: 'var(--bg-secondary)' }}>
        <HexMotif size={200} variant="dual" opacity={0.04} className="absolute -left-12 top-1/2 -translate-y-1/2" aria-hidden />
        <div className="container-site relative z-10 text-center">
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-4">
              <AnimatedLine width={24} delay={0.1} />
              <p className="label-xs">Ready to Begin?</p>
            </div>
            <h2 className="heading-lg max-w-xl mx-auto mb-8">
              Your project starts with a conversation.
            </h2>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/start" className="btn-primary">
                Start a Project
                <ArrowRight size={14} strokeWidth={1.5} aria-hidden="true" />
              </Link>
              <Link href="/portfolio" className="btn-outline">View Our Work</Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </main>
  )
}
