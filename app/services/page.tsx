import type { Metadata } from 'next'
import type { CSSProperties } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react'
import { Footer }              from '@/components/layout/Footer'
import { HexMotif }            from '@/components/ui/HexMotif'
import { ScrollReveal }        from '@/components/ui/ScrollReveal'
import { SERVICES }            from '@/lib/data'
import { AnimatedLine }        from '@/components/ui/AnimatedLine'
import { PageHeroBackground }  from '@/components/ui/PageHeroBackground'
import { BackButton }          from '@/components/ui/BackButton'

const HERO_STYLE: CSSProperties = {
  '--text-primary':   'var(--brand-cream)',
  '--text-secondary': 'rgba(240,235,225,0.72)',
} as CSSProperties

export const metadata: Metadata = {
  title:       'Interior Design Services',
  description: 'VIXX Interiors offers residential, commercial, space planning, furniture sourcing, and more. Discover our design services in Lagos, Nigeria.',
}

// Map service ids to high-quality portfolio images for visual context
function getServiceImage(id: string): string {
  switch (id) {
    case 'residential':
      return '/images/portfolio/proj-f-1.avif'
    case 'commercial':
      return '/images/portfolio/proj2-3.avif'
    case 'consultation':
      return '/images/portfolio/proj-f-3.avif'
    case 'sourcing':
      return '/images/portfolio/proj-c-1.avif'
    case 'planning':
      return '/images/portfolio/proj-d-2.avif'
    case 'management':
      return '/images/portfolio/proj-b-1.avif'
    default:
      return '/images/portfolio/proj-d-1.avif'
  }
}

export default function ServicesPage() {
  return (
    <main className="overflow-x-hidden" style={{ background: 'var(--bg-primary)' }}>
      {/* Floating Back Button (for secondary fallback/desktop scroll navigation) */}
      <BackButton />

      {/* ── Hero ── */}
      <section
        className="relative flex flex-col justify-start items-center overflow-hidden border-b border-[var(--border-subtle)]"
        style={{ minHeight: 'clamp(35rem, 72vh, 100vh)', paddingTop: 'var(--nav-height)' }}
      >
        {/* Dimmed hero background image for proper view of overlay fonts */}
        <PageHeroBackground src="/images/portfolio/proj-d-1.avif" overlay={0.65} />
        
        {/* Dark vignette bottom gradient to naturally transition text into page background */}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-[var(--surface-base)] via-[rgba(10,9,8,0.45)] to-transparent z-1"
        />

        <div className="container-site relative z-10 max-w-4xl flex-1 flex flex-col items-center justify-center text-center py-16 lg:py-24" style={HERO_STYLE}>
          <ScrollReveal>
            <div className="flex items-center justify-center gap-3 mb-5">
              <AnimatedLine width={24} delay={0.1} />
              <p className="label-xs" style={{ color: 'var(--gold)' }}>Our Services</p>
            </div>
            <h1 className="heading-xl mb-4">
              Complete design solutions{' '}
              <em className="not-italic" style={{ color: 'var(--gold)' }}>for every space.</em>
            </h1>
            <AnimatedLine width={200} className="mb-6 mx-auto" delay={0.25} />
            <p
              className="body-lg max-w-2xl font-light mx-auto"
              style={{
                color: 'var(--brand-cream)',
                letterSpacing: '0.01em',
                lineHeight: 1.6
              }}
            >
              From full residential projects to focused design consultations, every engagement is tailored to your scope, your timeline, and your vision.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Services grid ── */}
      <section className="section-pad relative" style={{ background: 'var(--bg-secondary)' }}>
        {/* Subtle decorative background textures */}
        <div aria-hidden className="absolute inset-0 pointer-events-none opacity-20">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: [
                'linear-gradient(rgba(196,154,46,0.01) 1px, transparent 1px)',
                'linear-gradient(90deg, rgba(196,154,46,0.01) 1px, transparent 1px)',
              ].join(', '),
              backgroundSize: '80px 80px',
            }}
          />
        </div>

        <div className="container-site relative z-10">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
            {SERVICES.map((service, i) => (
              <ScrollReveal key={service.id} delay={(i % 2) * 0.08} variant="fadeUp">
                <div className="flex flex-col h-full rounded-2xl overflow-hidden border border-[var(--border-default)] hover:border-[var(--gold-border)] transition-all duration-500 bg-[var(--surface-raised)] group shadow-lg hover:shadow-xl">
                  
                  {/* Top half: Image container (dimmed & responsive) */}
                  <div className="relative h-52 sm:h-60 overflow-hidden flex-shrink-0">
                    <Image
                      src={getServiceImage(service.id)}
                      alt={service.title}
                      fill
                      className="object-cover grayscale-[20%] group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    {/* Dark overlay to dim the images for proper view of fonts */}
                    <div className="absolute inset-0 bg-black/55 group-hover:bg-black/45 transition-colors duration-500" />
                    
                    {/* Glowing Accent number inside the image header */}
                    <div className="absolute top-5 right-5 z-10 flex items-center justify-center w-11 h-11 rounded-full bg-black/45 backdrop-blur-md border border-white/10">
                      <span className="font-cormorant text-xl font-light text-[var(--gold)]">
                        {service.number}
                      </span>
                    </div>

                    {/* Subtle aesthetic gradient overlay at the bottom of the image */}
                    <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[var(--surface-elevated)] to-transparent pointer-events-none" />
                  </div>

                  {/* Bottom half: Darker text container for high-contrast typography view */}
                  <div className="flex-1 p-8 lg:p-10 flex flex-col gap-6 bg-[var(--surface-elevated)] z-10 relative">
                    <div className="flex-1">
                      <h2 className="heading-md mb-3 text-[var(--text-primary)] group-hover:text-[var(--gold)] transition-colors duration-300">
                        {service.title}
                      </h2>
                      <p className="body-md text-[var(--text-secondary)] leading-relaxed">
                        {service.description}
                      </p>
                    </div>

                    {/* Features checklist */}
                    <ul className="space-y-3 my-2">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-3">
                          <CheckCircle2 size={13} strokeWidth={2} style={{ color: 'var(--gold)', flexShrink: 0 }} />
                          <span className="font-jost text-xs tracking-wide text-[var(--text-secondary)]">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA link border top */}
                    <div className="pt-5 border-t border-[var(--border-subtle)]">
                      <Link href="/start" className="btn-ghost w-full justify-between group-hover:text-[var(--gold)] transition-colors">
                        <span>Enquire about this service</span>
                        <ArrowRight size={13} strokeWidth={1.5} className="group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                      </Link>
                    </div>
                  </div>

                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Process CTA ── */}
      <section className="section-pad border-t border-[var(--border-subtle)]" style={{ background: 'var(--surface-base)' }}>
        <div className="container-site">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal variant="fadeRight">
              <div className="flex items-center gap-3 mb-4">
                <AnimatedLine width={24} delay={0.1} />
                <p className="label-xs" style={{ color: 'var(--gold)' }}>How It Works</p>
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
