'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { AnimatedLine } from '@/components/ui/AnimatedLine'
import { HexMotif } from '@/components/ui/HexMotif'

const PROCESS_STEPS = [
  { n: '01', label: 'Understand' },
  { n: '02', label: 'Design'     },
  { n: '03', label: 'Transform'  },
]

export function AboutStudio() {
  return (
    <section id="about" className="relative overflow-x-hidden">

      {/* Soft visual bridge from Hero — hairline gold gradient */}
      <div
        aria-hidden="true"
        className="absolute top-0 inset-x-0 h-px pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent, var(--gold-line), transparent)' }}
      />

      {/* ═══════════════════════════════════════════════════════════
          BLOCK 1 — Intro
      ═══════════════════════════════════════════════════════════ */}
      <div
        className="relative"
        style={{ background: 'var(--bg-primary)' }}
      >
        <div className="container-site pt-24 pb-16 lg:pt-32 lg:pb-20">

          <ScrollReveal>
            <div className="flex items-center gap-3 mb-5">
              <AnimatedLine width={24} delay={0.1} />
              <p className="label-xs">About the Studio</p>
            </div>

            <h2
              className="font-cormorant font-light mb-10"
              style={{
                fontSize:   'clamp(2.6rem, 5vw, 4.5rem)',
                lineHeight: 1.05,
                color:      'var(--text-primary)',
                maxWidth:   '18ch',
              }}
            >
              {/* Founder introduction — placeholder heading */}
              Founder Introduction<br />Placeholder
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.12} variant="fadeUp">
            {/* Intro paragraph — placeholder block */}
            <div
              className="rounded-2xl p-6"
              style={{
                background: 'var(--surface-elevated)',
                border:     '1px dashed var(--border-default)',
                maxWidth:   '62ch',
              }}
            >
              <p
                className="font-jost text-[0.58rem] tracking-[0.22em] uppercase mb-4"
                style={{ color: 'var(--text-tertiary)' }}
              >
                Intro Paragraph — Placeholder
              </p>
              <div className="space-y-2.5">
                {[92, 78, 65].map((w, i) => (
                  <div
                    key={i}
                    className="h-3 rounded-full"
                    style={{ width: `${w}%`, background: 'var(--border-default)' }}
                  />
                ))}
              </div>
            </div>
          </ScrollReveal>

        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════
          BLOCK 2 — Philosophy
      ═══════════════════════════════════════════════════════════ */}
      <div
        className="relative"
        style={{ background: 'var(--bg-primary)' }}
      >
        <div className="container-site pb-20 lg:pb-28">
          <div className="grid lg:grid-cols-[1.25fr_0.75fr] gap-6 lg:gap-12 items-start">

            {/* Large philosophy visual — placeholder */}
            <ScrollReveal variant="fadeRight">
              <div
                className="relative rounded-2xl overflow-hidden"
                style={{
                  aspectRatio: '4/3',
                  background:  'var(--surface-elevated)',
                  border:      '1px dashed var(--border-strong)',
                }}
              >
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                  <HexMotif size={40} opacity={0.12} aria-hidden />
                  <p
                    className="font-jost text-[0.6rem] tracking-[0.28em] uppercase"
                    style={{ color: 'var(--text-tertiary)' }}
                  >
                    Philosophy Visual Placeholder
                  </p>
                  <p
                    className="font-jost text-[0.52rem] tracking-[0.14em]"
                    style={{ color: 'var(--text-tertiary)', opacity: 0.5 }}
                  >
                    Full-bleed image / editorial visual
                  </p>
                </div>
              </div>
            </ScrollReveal>

            {/* Philosophy text area */}
            <ScrollReveal variant="fadeLeft" delay={0.1}>
              <div className="flex flex-col gap-6 pt-2 lg:pt-8">

                <div className="flex items-center gap-3">
                  <AnimatedLine width={20} delay={0.2} />
                  <p className="label-xs">Brand Philosophy</p>
                </div>

                <h3
                  className="font-cormorant font-light"
                  style={{
                    fontSize:   'clamp(1.6rem, 2.8vw, 2.5rem)',
                    lineHeight: 1.12,
                    color:      'var(--text-primary)',
                  }}
                >
                  Philosophy Heading Placeholder
                </h3>

                {/* Philosophy body — placeholder */}
                <div
                  className="rounded-xl p-5"
                  style={{
                    background: 'var(--surface-elevated)',
                    border:     '1px dashed var(--border-default)',
                  }}
                >
                  <p
                    className="font-jost text-[0.58rem] tracking-[0.18em] uppercase mb-4"
                    style={{ color: 'var(--text-tertiary)' }}
                  >
                    Philosophy Body — Placeholder
                  </p>
                  <div className="space-y-2">
                    {[85, 72, 90, 58].map((w, i) => (
                      <div
                        key={i}
                        className="h-2.5 rounded-full"
                        style={{ width: `${w}%`, background: 'var(--border-default)' }}
                      />
                    ))}
                  </div>
                </div>

                {/* Emotional positioning — placeholder */}
                <div
                  className="rounded-xl p-5"
                  style={{
                    background: 'var(--surface-elevated)',
                    border:     '1px dashed var(--border-default)',
                  }}
                >
                  <p
                    className="font-jost text-[0.58rem] tracking-[0.18em] uppercase mb-4"
                    style={{ color: 'var(--text-tertiary)' }}
                  >
                    Emotional Positioning — Placeholder
                  </p>
                  <div className="space-y-2">
                    {[68, 82, 52].map((w, i) => (
                      <div
                        key={i}
                        className="h-2.5 rounded-full"
                        style={{ width: `${w}%`, background: 'var(--border-default)' }}
                      />
                    ))}
                  </div>
                </div>

              </div>
            </ScrollReveal>

          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════
          BLOCK 3 — Split Identity (Founder)
      ═══════════════════════════════════════════════════════════ */}
      <div
        className="relative overflow-hidden section-pad"
        style={{ background: 'var(--bg-secondary)' }}
      >
        <HexMotif
          size={300}
          variant="outline"
          opacity={0.022}
          className="absolute -left-20 top-1/2 -translate-y-1/2 pointer-events-none"
          aria-hidden
        />

        <div className="container-site relative z-10">

          {/* Sub-header */}
          <ScrollReveal className="mb-12 lg:mb-16">
            <div className="flex items-center gap-3 mb-5">
              <AnimatedLine width={24} delay={0.1} />
              <p className="label-xs">The Founder</p>
            </div>
            <h2
              className="font-cormorant font-light"
              style={{
                fontSize:   'clamp(2rem, 3.5vw, 3.2rem)',
                lineHeight: 1.08,
                color:      'var(--text-primary)',
              }}
            >
              Studio Identity Placeholder
            </h2>
          </ScrollReveal>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-center">

            {/* ── Left: Founder image — circular, no box ── */}
            <ScrollReveal variant="fadeRight">
              <div className="flex justify-center lg:justify-start py-6 lg:py-0">
                <div className="relative">
                  {/* Outer decorative ring */}
                  <div
                    className="absolute inset-0 rounded-full pointer-events-none"
                    style={{
                      transform: 'scale(1.09)',
                      border:    '1px solid var(--gold-border-subtle)',
                    }}
                  />
                  {/* Circular portrait container */}
                  <div
                    className="relative overflow-hidden flex items-center justify-center"
                    style={{
                      width:        'clamp(200px, 48vw, 290px)',
                      height:       'clamp(200px, 48vw, 290px)',
                      borderRadius: '50%',
                      background:   'var(--surface-elevated)',
                      border:       '1px solid var(--gold-border)',
                    }}
                  >
                    <div className="flex flex-col items-center gap-3">
                      <div
                        style={{
                          width:          '4rem',
                          height:         '4rem',
                          borderRadius:   '50%',
                          background:     'var(--surface-overlay)',
                          border:         '1px solid var(--gold-border-subtle)',
                          display:        'flex',
                          alignItems:     'center',
                          justifyContent: 'center',
                        }}
                      >
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                          <circle cx="12" cy="8.5" r="4" stroke="var(--gold-dim)" strokeWidth="1.4" />
                          <path
                            d="M4 20.5c0-4 3.6-7 8-7s8 3 8 7"
                            stroke="var(--gold-dim)"
                            strokeWidth="1.4"
                            strokeLinecap="round"
                          />
                        </svg>
                      </div>
                      <p
                        className="font-jost text-[0.58rem] tracking-[0.24em] uppercase text-center px-6"
                        style={{ color: 'var(--text-tertiary)' }}
                      >
                        Founder Portrait
                      </p>
                      <p
                        className="font-jost text-[0.5rem] tracking-[0.12em] text-center"
                        style={{ color: 'var(--text-tertiary)', opacity: 0.45 }}
                      >
                        Circular portrait image
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* ── Right: Text blocks — staggered entrance ── */}
            <div className="flex flex-col gap-4 pt-0 lg:pt-4">

              {/* Name & title */}
              <ScrollReveal variant="fadeLeft" delay={0.1}>
                <div
                  className="rounded-xl p-5"
                  style={{
                    background: 'var(--surface-elevated)',
                    border:     '1px dashed var(--border-default)',
                  }}
                >
                  <p
                    className="font-jost text-[0.58rem] tracking-[0.18em] uppercase mb-4"
                    style={{ color: 'var(--text-tertiary)' }}
                  >
                    Founder Name &amp; Title — Placeholder
                  </p>
                  <div className="space-y-2">
                    <div className="h-8 rounded-lg" style={{ width: '52%', background: 'var(--border-strong)' }} />
                    <div className="h-3 rounded-full" style={{ width: '38%', background: 'var(--border-default)' }} />
                  </div>
                </div>
              </ScrollReveal>

              {/* Founder story */}
              <ScrollReveal variant="fadeLeft" delay={0.18}>
                <div
                  className="rounded-xl p-5"
                  style={{
                    background: 'var(--surface-elevated)',
                    border:     '1px dashed var(--border-default)',
                  }}
                >
                  <p
                    className="font-jost text-[0.58rem] tracking-[0.18em] uppercase mb-4"
                    style={{ color: 'var(--text-tertiary)' }}
                  >
                    Founder Story — Placeholder
                  </p>
                  <div className="space-y-2">
                    {[92, 76, 88, 62, 74].map((w, i) => (
                      <div
                        key={i}
                        className="h-2.5 rounded-full"
                        style={{ width: `${w}%`, background: 'var(--border-default)' }}
                      />
                    ))}
                  </div>
                </div>
              </ScrollReveal>

              {/* Design philosophy */}
              <ScrollReveal variant="fadeLeft" delay={0.26}>
                <div
                  className="rounded-xl p-5"
                  style={{
                    background: 'var(--surface-elevated)',
                    border:     '1px dashed var(--border-default)',
                  }}
                >
                  <p
                    className="font-jost text-[0.58rem] tracking-[0.18em] uppercase mb-4"
                    style={{ color: 'var(--text-tertiary)' }}
                  >
                    Design Philosophy — Placeholder
                  </p>
                  <div className="space-y-2">
                    {[80, 66, 76].map((w, i) => (
                      <div
                        key={i}
                        className="h-2.5 rounded-full"
                        style={{ width: `${w}%`, background: 'var(--border-default)' }}
                      />
                    ))}
                  </div>
                </div>
              </ScrollReveal>

              {/* Founder quote — gold accent */}
              <ScrollReveal variant="fadeLeft" delay={0.34}>
                <div
                  className="rounded-xl p-5"
                  style={{
                    background:   'var(--surface-elevated)',
                    border:       '1px dashed var(--gold-border-subtle)',
                    borderLeft:   '2px solid var(--gold-border)',
                  }}
                >
                  <p
                    className="font-jost text-[0.58rem] tracking-[0.18em] uppercase mb-4"
                    style={{ color: 'var(--gold-dim)' }}
                  >
                    Founder Quote — Placeholder
                  </p>
                  <div className="space-y-2">
                    {[88, 70].map((w, i) => (
                      <div
                        key={i}
                        className="h-2.5 rounded-full"
                        style={{ width: `${w}%`, background: 'var(--gold-ghost)' }}
                      />
                    ))}
                  </div>
                </div>
              </ScrollReveal>

            </div>

          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════
          BLOCK 4 — Process Preview
      ═══════════════════════════════════════════════════════════ */}
      <div
        className="relative"
        style={{ background: 'var(--bg-primary)' }}
      >
        <div className="container-site py-20 lg:py-28">

          <ScrollReveal className="mb-12 lg:mb-16">
            <div className="flex items-center gap-3 mb-5">
              <AnimatedLine width={24} delay={0.1} />
              <p className="label-xs">How We Work</p>
            </div>
            <h2
              className="font-cormorant font-light"
              style={{
                fontSize:   'clamp(2rem, 3.5vw, 3.2rem)',
                lineHeight: 1.1,
                color:      'var(--text-primary)',
              }}
            >
              Our Process
            </h2>
          </ScrollReveal>

          {/* 3-step grid */}
          <div
            className="grid sm:grid-cols-3"
            style={{ borderTop: '1px solid var(--border-default)' }}
          >
            {PROCESS_STEPS.map((step, i) => (
              <ScrollReveal key={step.n} delay={i * 0.1} variant="fadeUp">
                <div
                  className="relative py-10 px-2 sm:px-6 lg:px-8"
                  style={{ borderBottom: '1px solid var(--border-default)' }}
                >
                  {/* Vertical divider — desktop only, between columns */}
                  {i < 2 && (
                    <span
                      aria-hidden="true"
                      className="hidden sm:block absolute right-0 top-0 bottom-0 w-px"
                      style={{ background: 'var(--border-default)' }}
                    />
                  )}

                  {/* Ghost step number */}
                  <span
                    aria-hidden="true"
                    className="absolute top-7 right-4 sm:right-6 font-cormorant font-light leading-none select-none"
                    style={{ fontSize: '3.2rem', color: 'var(--gold-ghost)' }}
                  >
                    {step.n}
                  </span>

                  <p
                    className="font-jost text-[0.58rem] tracking-[0.28em] uppercase mb-5"
                    style={{ color: 'var(--text-tertiary)' }}
                  >
                    Step {step.n}
                  </p>
                  <h3
                    className="font-cormorant font-light"
                    style={{
                      fontSize:   'clamp(1.7rem, 2.6vw, 2.3rem)',
                      lineHeight: 1.1,
                      color:      'var(--text-primary)',
                    }}
                  >
                    {step.label}
                  </h3>
                </div>
              </ScrollReveal>
            ))}
          </div>

        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════
          BLOCK 5 — CTA
      ═══════════════════════════════════════════════════════════ */}
      <div
        className="relative overflow-hidden py-20 lg:py-28"
        style={{ background: 'var(--bg-secondary)' }}
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 55% 55% at 50% 50%, var(--gold-glow) 0%, transparent 70%)',
          }}
        />

        <div className="container-site relative z-10 text-center max-w-2xl mx-auto px-6">
          <ScrollReveal variant="fadeIn">

            <div className="flex justify-center mb-8">
              <HexMotif size={34} opacity={0.22} aria-hidden />
            </div>

            <h2
              className="font-cormorant font-light mb-4"
              style={{
                fontSize:   'clamp(1.9rem, 3.5vw, 3rem)',
                lineHeight: 1.1,
                color:      'var(--text-primary)',
              }}
            >
              Ready to see our work?
            </h2>

            <p
              className="font-jost text-[0.62rem] tracking-[0.25em] uppercase mb-10"
              style={{ color: 'var(--text-tertiary)' }}
            >
              Explore the portfolio or start a conversation
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/portfolio" className="btn-primary">
                Explore Portfolio
                <ArrowRight size={14} strokeWidth={1.5} aria-hidden="true" />
              </Link>
              <Link href="/#contact" className="btn-outline">
                Book a Consultation
                <ArrowRight size={14} strokeWidth={1.5} aria-hidden="true" />
              </Link>
            </div>

          </ScrollReveal>
        </div>
      </div>

    </section>
  )
}
