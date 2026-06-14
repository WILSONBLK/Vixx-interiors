import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { Navbar }       from '@/components/layout/Navbar'
import { Footer }       from '@/components/layout/Footer'
import { HexMotif }     from '@/components/ui/HexMotif'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { SERVICES } from '@/lib/data'
import { AnimatedLine } from '@/components/ui/AnimatedLine'

export const metadata: Metadata = {
  title:       'Interior Design Services – VIXX Interiors',
  description: 'VIXX Interiors offers residential, commercial, space planning, furniture sourcing, and more. Discover our design services in Lagos, Nigeria.',
}

export default function ServicesPage() {
  return (
    <main style={{ background: 'var(--bg-primary)' }}>
      <Navbar />

      {/* ── Hero ── */}
      <section className="relative pt-40 pb-20 overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 0%, var(--gold-glow) 0%, transparent 65%)' }}
        />
        <div className="container-site relative z-10 max-w-4xl">
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-5">
              <AnimatedLine width={24} delay={0.1} />
              <p className="label-xs">Our Services</p>
            </div>
            <h1 className="heading-xl mb-4">
              Complete design solutions{' '}
              <em className="not-italic" style={{ color: 'var(--gold)' }}>for every space.</em>
            </h1>
            <AnimatedLine width={200} className="mb-6" delay={0.25} />
            <p className="body-lg max-w-2xl">
              From full residential projects to focused design consultations, every engagement is tailored to your scope, your timeline, and your vision.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Services grid ── */}
      <section className="section-pad" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container-site">
          <div className="grid md:grid-cols-2 gap-px" style={{ background: 'var(--border)' }}>
            {SERVICES.map((service, i) => (
              <ScrollReveal key={service.id} delay={(i % 2) * 0.07} variant="fadeUp">
                <div
                  className="card-glass p-8 lg:p-10 flex flex-col gap-6 h-full"
                  style={{ background: 'var(--bg-secondary)' }}
                >
                  <div className="flex items-start justify-between">
                    <span className="font-cormorant text-5xl font-light opacity-25" style={{ color: 'var(--gold)' }}>
                      {service.number}
                    </span>
                    <HexMotif size="xs" opacity={0.4} />
                  </div>

                  <div className="flex-1">
                    <h2 className="heading-md mb-3">{service.title}</h2>
                    <p className="body-md">{service.description}</p>
                  </div>

                  <ul className="space-y-2">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3">
                        <CheckCircle2 size={13} strokeWidth={1.5} style={{ color: 'var(--gold)', flexShrink: 0 }} />
                        <span className="font-jost text-xs tracking-wide" style={{ color: 'var(--text-muted)' }}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className="pt-4" style={{ borderTop: '1px solid var(--border)' }}>
                    <Link href="/start" className="btn-ghost">
                      Enquire about this service <ArrowRight size={13} strokeWidth={1.5} aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Process CTA ── */}
      <section className="section-pad">
        <div className="container-site">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal variant="fadeRight">
              <div className="flex items-center gap-3 mb-4">
                <AnimatedLine width={24} delay={0.1} />
                <p className="label-xs">How It Works</p>
              </div>
              <h2 className="heading-lg mb-6">Every project starts with a conversation.</h2>
              <p className="body-lg mb-8">
                We begin with a no-obligation introductory call to understand your project. From there, we develop a proposal tailored to your scope, budget, and timeline — with transparent pricing and no hidden costs.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/start" className="btn-primary">
                  Start a Project
                  <ArrowRight size={14} strokeWidth={1.5} aria-hidden="true" />
                </Link>
                <Link href="/process" className="btn-outline">See Our Process</Link>
              </div>
            </ScrollReveal>

            <ScrollReveal variant="fadeLeft" delay={0.1}>
              <div className="space-y-0">
                {[
                  { step: '01', text: 'Free introductory call (15–20 min)' },
                  { step: '02', text: 'Tailored proposal sent within 48 hours' },
                  { step: '03', text: 'Project kick-off upon agreement' },
                  { step: '04', text: 'Regular updates throughout the project' },
                  { step: '05', text: 'Final reveal and handover' },
                ].map((item, i) => (
                  <div
                    key={item.step}
                    className="flex items-center gap-5 py-4"
                    style={{ borderBottom: '1px solid var(--border)' }}
                  >
                    <span className="font-cormorant text-xl font-light w-8 flex-shrink-0" style={{ color: 'var(--gold)' }}>
                      {item.step}
                    </span>
                    <span className="font-sans text-sm" style={{ color: 'var(--text-secondary)' }}>{item.text}</span>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
