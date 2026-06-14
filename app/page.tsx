import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Navbar }       from '@/components/layout/Navbar'
import { Footer }       from '@/components/layout/Footer'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { HeroSection }    from '@/components/ui/HeroSection'
import { AboutStudio }   from '@/components/ui/AboutStudio'
import { AnimatedLine }   from '@/components/ui/AnimatedLine'
import { HexMotif }     from '@/components/ui/HexMotif'
import { PORTFOLIO_PROJECTS, STATS } from '@/lib/data'

export const metadata: Metadata = {
  title:       'VIXX Interiors – Interior Design Studio, Lagos',
  description: 'VIXX Interiors is a Lagos interior design studio crafting considered spaces. Explore our portfolio and start a conversation.',
}

const SERVICES_LIST = [
  { number: '01', title: 'Interior Design'      },
  { number: '02', title: 'Space Planning'        },
  { number: '03', title: 'Residential Interiors' },
  { number: '04', title: 'Commercial Interiors'  },
  { number: '05', title: 'Design Consultation'   },
  { number: '06', title: 'Creative Direction'    },
]

export default function Home() {
  return (
    <main className="relative overflow-x-hidden" style={{ background: 'var(--bg-primary)' }}>
      <Navbar />

      {/* ── 1. Hero ───────────────────────────────────────────────────────────── */}
      <HeroSection />

      {/* ── 2. About Studio ─────────────────────────────────────────────────── */}
      <AboutStudio />

      {/* ── 3. Portfolio (featured – full-bleed editorial grid) ──────────────── */}
      <section style={{ background: 'var(--bg-primary)' }}>
        {/* Section header — constrained */}
        <div className="container-site pt-20 pb-10 lg:pt-28 lg:pb-14">
          <ScrollReveal>
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <AnimatedLine width={24} delay={0.1} />
                  <p className="label-xs">Selected Work</p>
                </div>
                <h2 className="heading-lg">Recent Projects</h2>
              </div>
              <Link href="/portfolio" className="btn-ghost hidden sm:inline-flex mt-3">
                View All
                <ArrowRight size={12} strokeWidth={1.5} aria-hidden="true" />
              </Link>
            </div>
          </ScrollReveal>
        </div>

        {/* Constrained 2-col grid with breathing room */}
        <div className="container-site pb-16 lg:pb-24">
          <div className="grid lg:grid-cols-2 gap-4 sm:gap-5 lg:gap-6">
            {PORTFOLIO_PROJECTS.filter((p) => p.featured).map((project, i) => (
              <ScrollReveal key={project.id} delay={i * 0.12} variant="fadeUp">
                <Link
                  href={`/portfolio/${project.slug}`}
                  className="group relative block overflow-hidden rounded-2xl"
                  aria-label={`View ${project.title}`}
                >
                  <div className="relative overflow-hidden" style={{ aspectRatio: '4/5' }}>
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 pointer-events-none"
                      style={{ background: 'linear-gradient(to top, var(--overlay-heavy) 0%, var(--overlay-subtle) 45%, transparent 100%)' }}
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-7 lg:p-9">
                      <p
                        className="font-jost text-[0.56rem] tracking-[0.28em] uppercase mb-2"
                        style={{ color: 'var(--gold-text)' }}
                      >
                        {project.category}
                      </p>
                      <h3
                        className="font-cormorant font-light text-[var(--brand-cream)] leading-tight"
                        style={{ fontSize: 'clamp(1.3rem, 2.4vw, 2rem)' }}
                      >
                        {project.title}
                      </h3>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>

          {/* View all — centred below cards */}
          <div className="mt-8 flex justify-center">
            <Link href="/portfolio" className="btn-ghost">
              View All Projects
              <ArrowRight size={12} strokeWidth={1.5} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── 4. Services ─────────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden section-pad"
        style={{ background: 'var(--bg-secondary)' }}
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 55% 45% at 8% 65%, var(--gold-glow) 0%, transparent 60%)' }}
        />
        <HexMotif
          size={300}
          variant="outline"
          opacity={0.022}
          className="absolute -right-16 top-1/2 -translate-y-1/2 pointer-events-none"
          aria-hidden
        />

        <div className="relative z-10 container-site">

          {/* Section header */}
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-3">
              <AnimatedLine width={24} delay={0.1} />
              <p className="label-xs">What We Do</p>
            </div>
            <h2
              className="font-cormorant font-light mb-10 lg:mb-14"
              style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', color: 'var(--text-primary)', lineHeight: 1.1 }}
            >
              Studio Services
            </h2>
          </ScrollReveal>

          {/* Individual rounded cards per service */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {SERVICES_LIST.map((svc, i) => (
              <ScrollReveal key={svc.number} delay={i * 0.08} variant="fadeUp">
                <div
                  className="service-card rounded-2xl p-7 sm:p-8 relative overflow-hidden group cursor-default h-full"
                >
                  {/* Subtle radial hover glow from bottom */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none rounded-2xl"
                    style={{
                      background: 'radial-gradient(ellipse 90% 50% at 50% 110%, var(--gold-glow) 0%, transparent 70%)',
                      transition: 'opacity 0.5s ease',
                    }}
                  />

                  {/* Ghost number — top right */}
                  <span
                    aria-hidden="true"
                    className="absolute top-5 right-6 font-cormorant font-light select-none leading-none"
                    style={{ fontSize: '2.25rem', color: 'var(--gold-ghost)' }}
                  >
                    {svc.number}
                  </span>

                  {/* Gold dot */}
                  <div
                    className="w-1.5 h-1.5 rounded-full mb-6"
                    style={{ background: 'var(--gold)', opacity: 0.65 }}
                  />

                  {/* Service title */}
                  <h3
                    className="font-cormorant font-light leading-snug relative z-10"
                    style={{ fontSize: 'clamp(1.2rem, 1.8vw, 1.5rem)', color: 'var(--text-primary)' }}
                  >
                    {svc.title}
                  </h3>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* CTA */}
          <ScrollReveal delay={0.5}>
            <div className="mt-10">
              <Link href="/services" className="btn-outline">
                View Services
                <ArrowRight size={14} strokeWidth={1.5} aria-hidden="true" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── 5. Founder (no photo — editorial 2-col text layout) ──────────────── */}
      <section
        className="relative overflow-hidden section-pad"
        style={{ background: 'var(--bg-secondary)' }}
      >
        {/* Subtle decorative hex — right edge */}
        <HexMotif
          size={320}
          variant="outline"
          opacity={0.03}
          className="absolute -right-20 top-1/2 -translate-y-1/2 pointer-events-none"
          aria-hidden
        />

        <div className="container-site relative z-10">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-20 items-start">

            {/* Left: name + bio + CTA */}
            <ScrollReveal variant="fadeRight">
              <div className="flex items-center gap-3 mb-6">
                <AnimatedLine width={24} delay={0.1} />
                <p className="label-xs">The Founder</p>
              </div>

              <h2
                className="font-cormorant font-light mb-3"
                style={{
                  fontSize:   'clamp(2.8rem, 5vw, 5rem)',
                  lineHeight: 0.92,
                  color:      'var(--text-primary)',
                }}
              >
                Osita<br />Agusionu
              </h2>
              <p
                className="font-cormorant italic mb-8"
                style={{ fontSize: '1.25rem', color: 'var(--gold-text)' }}
              >
                Founder &amp; Principal Designer
              </p>

              <div className="space-y-4 mb-10">
                <p className="body-lg">
                  With a background in architecture and fine art, Osita approaches every space as a curated composition — balancing form, function, and feeling.
                </p>
                <p className="body-lg">
                  His philosophy: not the absence of things, but the presence of the right things.
                </p>
              </div>

              <Link href="/about" className="btn-outline self-start">
                About the Studio
                <ArrowRight size={14} strokeWidth={1.5} aria-hidden="true" />
              </Link>
            </ScrollReveal>

            {/* Right: vertical stats list */}
            <ScrollReveal variant="fadeLeft" delay={0.1}>
              <div style={{ borderTop: '1px solid var(--border)' }}>
                {STATS.map((stat) => (
                  <div
                    key={stat.label}
                    className="py-8"
                    style={{ borderBottom: '1px solid var(--border)' }}
                  >
                    <p
                      className="font-cormorant font-light leading-none mb-2"
                      style={{ fontSize: 'clamp(3rem, 4.5vw, 4.5rem)', color: 'var(--gold)' }}
                    >
                      {stat.value}
                    </p>
                    <p
                      className="font-jost text-[0.65rem] tracking-[0.20em] uppercase"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </ScrollReveal>

          </div>
        </div>
      </section>

      {/* ── 6. Manifesto quote ───────────────────────────────────────────────── */}
      <section
        className="relative py-24 lg:py-36 overflow-hidden"
        style={{ background: 'var(--bg-primary)' }}
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 55% 55% at 50% 50%, var(--gold-glow) 0%, transparent 70%)' }}
        />

        <div className="container-site relative z-10 max-w-4xl mx-auto px-6 text-center">
          <ScrollReveal variant="fadeIn" threshold={0.2}>
            <div className="flex justify-center mb-8">
              <HexMotif size={38} opacity={0.28} />
            </div>

            <blockquote>
              <p
                className="font-cormorant italic font-light leading-[1.25]"
                style={{
                  fontSize: 'clamp(1.55rem, 3.2vw, 2.85rem)',
                  color:    'var(--text-primary)',
                }}
              >
                &ldquo;We start every project by listening — deeply — before we design anything.&rdquo;
              </p>
              <footer className="mt-8 flex flex-col items-center gap-3">
                <AnimatedLine width={40} delay={0.3} />
                <p
                  className="font-jost text-[0.62rem] tracking-[0.28em] uppercase"
                  style={{ color: 'var(--text-muted)' }}
                >
                  Osita Agusionu — Founder, VIXX Interiors
                </p>
              </footer>
            </blockquote>
          </ScrollReveal>
        </div>
      </section>

      {/* ── 7. Start a Project CTA ───────────────────────────────────────────── */}
      <section
        id="contact"
        className="relative overflow-hidden py-24 lg:py-36"
        style={{ background: 'var(--bg-secondary)' }}
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 65% 55% at 50% 50%, var(--gold-glow) 0%, transparent 68%)' }}
        />
        <HexMotif
          size={320}
          variant="outline"
          opacity={0.025}
          className="absolute -right-20 top-1/2 -translate-y-1/2 pointer-events-none"
          aria-hidden
        />

        <div className="relative z-10 container-site text-center max-w-3xl mx-auto px-6">
          <ScrollReveal variant="fadeIn">

            <div className="flex justify-center mb-8">
              <HexMotif size={38} opacity={0.28} aria-hidden />
            </div>

            <div className="flex justify-center mb-5">
              <AnimatedLine width={40} delay={0.1} />
            </div>

            <h2
              className="font-cormorant font-light mb-5"
              style={{
                fontSize:   'clamp(2.4rem, 4.5vw, 4rem)',
                lineHeight: 1.08,
                color:      'var(--text-primary)',
              }}
            >
              Ready to begin{' '}
              <em className="not-italic" style={{ color: 'var(--gold)' }}>your project?</em>
            </h2>

            <p className="body-lg mb-10" style={{ maxWidth: '42ch', margin: '0 auto 2.5rem' }}>
              Tell us about your space. We&apos;ll respond within 24 hours with a tailored proposal — handled in complete confidence.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="btn-primary">
                Start a Project
                <ArrowRight size={14} strokeWidth={1.5} aria-hidden="true" />
              </Link>
              <Link href="/portfolio" className="btn-ghost">
                View Our Work
                <ArrowRight size={12} strokeWidth={1.5} aria-hidden="true" />
              </Link>
            </div>

          </ScrollReveal>
        </div>
      </section>

      {/* ── 8. Footer ────────────────────────────────────────────────────────── */}
      <Footer />
    </main>
  )
}
