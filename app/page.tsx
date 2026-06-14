import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Navbar }            from '@/components/layout/Navbar'
import { Footer }            from '@/components/layout/Footer'
import { ScrollReveal }      from '@/components/ui/ScrollReveal'
import { HeroSection }       from '@/components/ui/HeroSection'
import { AboutStudio }       from '@/components/ui/AboutStudio'
import { AnimatedLine }      from '@/components/ui/AnimatedLine'
import { HexMotif }          from '@/components/ui/HexMotif'
import { SectionCTA, SectionCTAButton } from '@/components/ui/SectionCTA'
import { PORTFOLIO_PROJECTS, STATS, SERVICES, PROCESS_STEPS } from '@/lib/data'

export const metadata: Metadata = {
  title:       'VIXX Interiors – Interior Design Studio, Lagos',
  description: 'VIXX Interiors is a Nigerian interior design studio crafting spaces that feel personal, calm, and completely yours. Explore our portfolio and start a conversation.',
}

export default function Home() {
  return (
    <main id="main" className="relative overflow-x-hidden" style={{ background: 'var(--bg-primary)' }}>
      <Navbar />

      {/* ── 1. Hero ───────────────────────────────────────────────────────────── */}
      <HeroSection />

      {/* ── 2. About the Studio ─────────────────────────────────────────────── */}
      <AboutStudio />

      {/* ── 3. Founder ──────────────────────────────────────────────────────── */}
      <section
        id="founder"
        className="relative overflow-hidden py-12 lg:py-16"
        style={{ background: 'var(--bg-secondary)' }}
      >
        <HexMotif
          size={320}
          variant="outline"
          opacity={0.022}
          className="absolute -right-20 top-1/2 -translate-y-1/2 pointer-events-none"
          aria-hidden
        />

        <div className="container-site relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start">

            {/* Left: label → name → bio → stats — each layer staggered */}
            <div>
              <ScrollReveal variant="fadeRight">
                <div className="flex items-center gap-3 mb-6">
                  <AnimatedLine width={24} delay={0.1} />
                  <p className="label-xs">The Founder</p>
                </div>

                <h2
                  className="font-cormorant font-light mb-3"
                  style={{ fontSize: 'clamp(2.8rem, 5vw, 5rem)', lineHeight: 0.92, color: 'var(--text-primary)' }}
                >
                  Osita<br />Agusionu
                </h2>
                <p
                  className="font-cormorant italic mb-6"
                  style={{ fontSize: '1.25rem', color: 'var(--gold-text)' }}
                >
                  Founder &amp; Creative Director
                </p>
              </ScrollReveal>

              <ScrollReveal variant="fadeUp" delay={0.12}>
                <div className="space-y-3 mb-7">
                  <p className="body-lg">
                    Osita founded VIXX Interiors after COVID gave him the stillness to ask the right question — and interior design was the answer. Not chosen, but recognised.
                  </p>
                  <p className="body-lg">
                    His conviction: your home should feel like you. Personal, calm, and built to give you peace the moment you walk through the door.
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal variant="fadeUp" delay={0.22}>
                <div
                  className="flex"
                  style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}
                >
                  {STATS.map((stat, i) => (
                    <div
                      key={stat.label}
                      className="flex-1 py-5 text-center"
                      style={{ borderLeft: i > 0 ? '1px solid var(--border)' : 'none' }}
                    >
                      <p
                        className="font-cormorant font-light leading-none mb-1"
                        style={{ fontSize: 'clamp(1.9rem, 3vw, 3.2rem)', color: 'var(--gold)' }}
                      >
                        {stat.value}
                      </p>
                      <p
                        className="font-jost text-[0.68rem] tracking-[0.15em] uppercase"
                        style={{ color: 'var(--text-secondary)' }}
                      >
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            </div>

            {/* Right: circular image, then quote directly below */}
            <div>
              <ScrollReveal variant="fadeLeft" delay={0.1}>
                <div
                  className="relative overflow-hidden rounded-full mx-auto"
                  style={{ aspectRatio: '1/1', maxHeight: '56vh', maxWidth: '56vh', width: '100%', background: 'var(--surface-elevated)' }}
                >
                  <Image
                    src="/images/founder.jpg"
                    alt="Osita Agusionu — Founder, VIXX Interiors"
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 1024px) 100vw, 45vw"
                  />
                </div>
              </ScrollReveal>

              <ScrollReveal variant="fadeUp" delay={0.28}>
                <div className="mt-7 lg:mt-8 text-center px-4">
                  <div className="flex justify-center mb-4">
                    <AnimatedLine width={32} delay={0.3} />
                  </div>
                  <blockquote>
                    <p
                      className="font-cormorant italic font-light leading-snug mb-3"
                      style={{ fontSize: 'clamp(1.05rem, 1.7vw, 1.38rem)', color: 'var(--text-primary)' }}
                    >
                      &ldquo;We want our clients to feel safe, feel at home, feel peace — away from the noise and the chaos of the city.&rdquo;
                    </p>
                    <footer>
                      <p
                        className="font-jost text-[0.68rem] tracking-[0.20em] uppercase"
                        style={{ color: 'var(--text-secondary)' }}
                      >
                        Osita Agusionu — Founder, VIXX Interiors
                      </p>
                    </footer>
                  </blockquote>
                </div>
              </ScrollReveal>
            </div>

          </div>

          <ScrollReveal delay={0.3} variant="fadeUp">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-12 lg:pt-16">
              <SectionCTAButton href="#services" label="Explore Our Services" variant="primary" />
              <SectionCTAButton href="/about" label="Read Full Story" variant="secondary" />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── 4. Services ─────────────────────────────────────────────────────── */}
      <section
        id="services"
        className="relative overflow-hidden py-12 lg:py-16"
        style={{ background: 'var(--bg-primary)' }}
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
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-3">
              <AnimatedLine width={24} delay={0.1} />
              <p className="label-xs">What We Do</p>
            </div>
            <h2
              className="font-cormorant font-light mb-7 lg:mb-10"
              style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', color: 'var(--text-primary)', lineHeight: 1.1 }}
            >
              Studio Services
            </h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {SERVICES.map((svc, i) => (
              <ScrollReveal key={svc.id} delay={Math.min(i * 0.08, 0.24)} variant="fadeUp">
                <Link href={`/start?service=${svc.id}`} className="block h-full">
                  <div className="service-card rounded-2xl p-7 sm:p-8 relative overflow-hidden group cursor-pointer h-full">
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none rounded-2xl"
                      style={{ background: 'radial-gradient(ellipse 90% 50% at 50% 110%, var(--gold-glow) 0%, transparent 70%)', transition: 'opacity 0.5s ease' }}
                    />
                    <span
                      aria-hidden="true"
                      className="absolute top-5 right-6 font-cormorant font-light select-none leading-none"
                      style={{ fontSize: '2.25rem', color: 'var(--gold-ghost)' }}
                    >
                      {svc.number}
                    </span>
                    <div className="w-1.5 h-1.5 rounded-full mb-5" style={{ background: 'var(--gold)', opacity: 0.65 }} />
                    <h3
                      className="font-cormorant font-light leading-snug relative z-10 mb-5"
                      style={{ fontSize: 'clamp(1.2rem, 1.8vw, 1.5rem)', color: 'var(--text-primary)' }}
                    >
                      {svc.title}
                    </h3>
                    <div className="flex flex-wrap gap-2 relative z-10">
                      {svc.examples.map((ex) => (
                        <span
                          key={ex}
                          className="label-xs px-2.5 py-1 rounded-full"
                          style={{ background: 'var(--surface-elevated)', border: '1px solid var(--border-default)', color: 'var(--text-tertiary)' }}
                        >
                          {ex}
                        </span>
                      ))}
                      <span
                        className="label-xs px-2.5 py-1 rounded-full"
                        style={{ border: '1px dashed var(--border-default)', color: 'var(--gold)', opacity: 0.7 }}
                      >
                        & more
                      </span>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.3} variant="fadeUp">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-12 lg:pt-16">
              <SectionCTAButton href="#process" label="How We Work" variant="primary" />
              <SectionCTAButton href="/services" label="View All Services" variant="secondary" />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── 5. How We Work ──────────────────────────────────────────────────── */}
      <section
        id="process"
        className="relative overflow-hidden py-12 lg:py-16"
        style={{ background: 'var(--bg-secondary)' }}
      >
        <div className="container-site relative z-10">
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-3">
              <AnimatedLine width={24} delay={0.1} />
              <p className="label-xs">How We Work</p>
            </div>
            <h2
              className="font-cormorant font-light mb-8 lg:mb-10"
              style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', color: 'var(--text-primary)', lineHeight: 1.1 }}
            >
              Our Process
            </h2>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {PROCESS_STEPS.slice(0, 3).map((step, i) => (
              <ScrollReveal key={step.number} delay={i * 0.1} variant="fadeUp">
                <div
                  className="rounded-2xl p-6 lg:p-8 h-full"
                  style={{ background: 'var(--surface-elevated)', border: '1px solid var(--border-strong)', boxShadow: 'var(--shadow-sm)' }}
                >
                  <span
                    aria-hidden="true"
                    className="block font-cormorant font-light leading-none select-none mb-5"
                    style={{ fontSize: '2.5rem', color: 'var(--gold-ghost)' }}
                  >
                    {step.number}
                  </span>
                  <h3
                    className="font-cormorant font-light mb-3"
                    style={{ fontSize: 'clamp(1.2rem, 1.8vw, 1.5rem)', color: 'var(--text-primary)' }}
                  >
                    {step.title}
                  </h3>
                  <p className="body-md" style={{ color: 'var(--text-secondary)' }}>
                    {step.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.3} variant="fadeUp">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-10 lg:pt-12">
              <SectionCTAButton href="#portfolio" label="View Selected Work" variant="primary" />
              <SectionCTAButton href="/start" label="Start A Project" variant="secondary" />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── 6. Selected Work ────────────────────────────────────────────────── */}
      <section id="portfolio" className="relative overflow-hidden" style={{ background: 'var(--bg-primary)' }}>
        <div aria-hidden className="absolute top-0 inset-x-0 pointer-events-none z-0"
             style={{ height: 56, background: 'linear-gradient(to bottom, var(--bg-secondary), transparent)' }} />
        <div className="container-site pt-20 pb-10 lg:pt-28 lg:pb-14">
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-3">
              <AnimatedLine width={24} delay={0.1} />
              <p className="label-xs">Selected Work</p>
            </div>
            <h2 className="heading-lg">Selected Work</h2>
          </ScrollReveal>
        </div>

        <div className="container-site pb-16 lg:pb-24">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {PORTFOLIO_PROJECTS.map((project, i) => (
              <ScrollReveal key={project.id} delay={Math.min(i * 0.08, 0.24)} variant="fadeUp">
                <Link
                  href={`/portfolio/${project.slug}`}
                  className="portfolio-card group relative block overflow-hidden rounded-2xl"
                  aria-label={`View ${project.title}`}
                >
                  <div className="relative overflow-hidden" style={{ aspectRatio: '5/6' }}>
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    {/* Subtle depth gradient — no text overlay */}
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                      style={{ background: 'linear-gradient(to top, var(--overlay-gentle) 0%, transparent 60%)' }}
                    />
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>

          <SectionCTA href="/portfolio" label="View Our Library" />
        </div>
      </section>

      {/* ── 7. Final Quote ──────────────────────────────────────────────────── */}
      <section
        className="relative py-24 lg:py-36 overflow-hidden"
        style={{ background: 'var(--bg-secondary)' }}
      >
        <div aria-hidden className="absolute top-0 inset-x-0 pointer-events-none z-0"
             style={{ height: 56, background: 'linear-gradient(to bottom, var(--bg-primary), transparent)' }} />
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
                style={{ fontSize: 'clamp(1.55rem, 3.2vw, 2.85rem)', color: 'var(--text-primary)' }}
              >
                &ldquo;A space is not truly finished until it belongs entirely to the people who live in it.&rdquo;
              </p>
              <footer className="mt-8 flex flex-col items-center gap-3">
                <AnimatedLine width={40} delay={0.3} />
                <p
                  className="font-jost text-[0.7rem] tracking-[0.22em] uppercase"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  Osita Agusionu — Founder, VIXX Interiors
                </p>
              </footer>
            </blockquote>
          </ScrollReveal>
        </div>
      </section>

      {/* ── 8. Final CTA ────────────────────────────────────────────────────── */}
      <section
        id="contact"
        className="relative overflow-hidden py-24 lg:py-36"
        style={{ background: 'var(--bg-primary)' }}
      >
        <div aria-hidden className="absolute top-0 inset-x-0 pointer-events-none z-0"
             style={{ height: 56, background: 'linear-gradient(to bottom, var(--bg-secondary), transparent)' }} />
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
              style={{ fontSize: 'clamp(2.4rem, 4.5vw, 4rem)', lineHeight: 1.08, color: 'var(--text-primary)' }}
            >
              Ready to begin{' '}
              <em className="not-italic" style={{ color: 'var(--gold)' }}>your project?</em>
            </h2>

            <p className="body-lg mb-10" style={{ maxWidth: '42ch', margin: '0 auto 2.5rem' }}>
              Tell us about your space. We&apos;ll respond within 24 hours with a tailored proposal — handled in complete confidence.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <SectionCTAButton href="/start" label="Start Your Project" variant="primary" />
              <SectionCTAButton href="/contact" label="Contact Us" variant="secondary" />
            </div>

          </ScrollReveal>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────────────────────────── */}
      <Footer />
    </main>
  )
}
