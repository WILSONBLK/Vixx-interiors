import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Navbar }       from '@/components/layout/Navbar'
import { Footer }       from '@/components/layout/Footer'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { HeroSection }  from '@/components/ui/HeroSection'
import { AboutStudio }  from '@/components/ui/AboutStudio'
import { AnimatedLine } from '@/components/ui/AnimatedLine'
import { HexMotif }     from '@/components/ui/HexMotif'
import { PORTFOLIO_PROJECTS, STATS, SERVICES, PROCESS_STEPS } from '@/lib/data'

export const metadata: Metadata = {
  title:       'VIXX Interiors – Interior Design Studio, Lagos',
  description: 'VIXX Interiors is a Lagos interior design studio crafting considered spaces. Explore our portfolio and start a conversation.',
}

export default function Home() {
  return (
    <main className="relative overflow-x-hidden" style={{ background: 'var(--bg-primary)' }}>
      <Navbar />

      {/* ── 1. Hero ───────────────────────────────────────────────────────────── */}
      <HeroSection />

      {/* ── 2. About the Studio ─────────────────────────────────────────────── */}
      <AboutStudio />

      {/* ── 3. Founder ──────────────────────────────────────────────────────── */}
      <section
        id="founder"
        className="relative overflow-hidden section-pad"
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
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">

            {/* Left: bio + stats + CTA */}
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
                className="font-cormorant italic mb-10"
                style={{ fontSize: '1.25rem', color: 'var(--gold-text)' }}
              >
                Founder &amp; Principal Designer
              </p>

              <div className="space-y-4 mb-12">
                <p className="body-lg">
                  With a background in architecture and fine art, Osita founded VIXX Interiors on a conviction that great design begins with deep listening — not drawing.
                </p>
                <p className="body-lg">
                  Over four years and thirty-plus projects across Lagos, he has built a practice defined by precision, restraint, and an unwillingness to compromise on the integrity of a space.
                </p>
                <p className="body-lg">
                  His philosophy is quietly radical: not the absence of things, but the deliberate presence of the right things. Every material chosen. Every proportion considered. Every space made entirely yours.
                </p>
              </div>

              {/* Stats */}
              <div style={{ borderTop: '1px solid var(--border)' }}>
                {STATS.map((stat) => (
                  <div
                    key={stat.label}
                    className="py-6"
                    style={{ borderBottom: '1px solid var(--border)' }}
                  >
                    <p
                      className="font-cormorant font-light leading-none mb-1"
                      style={{ fontSize: 'clamp(2.4rem, 3.8vw, 3.8rem)', color: 'var(--gold)' }}
                    >
                      {stat.value}
                    </p>
                    <p
                      className="font-jost text-[0.62rem] tracking-[0.20em] uppercase"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-10">
                <a href="#services" className="btn-outline">
                  Our Services
                  <ArrowRight size={14} strokeWidth={1.5} aria-hidden="true" />
                </a>
              </div>
            </ScrollReveal>

            {/* Right: image + quote overlay */}
            <ScrollReveal variant="fadeLeft" delay={0.1}>
              <div
                className="relative overflow-hidden rounded-2xl w-full"
                style={{ aspectRatio: '3/4', background: 'var(--surface-elevated)' }}
              >
                <Image
                  src="/images/founder.jpg"
                  alt="Osita Agusionu — Founder, VIXX Interiors"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 1024px) 100vw, 45vw"
                />

                {/* Quote overlaid on image */}
                <div
                  className="absolute bottom-0 inset-x-0 p-7 lg:p-9"
                  style={{ background: 'linear-gradient(to top, var(--overlay-heavy) 0%, var(--overlay-mid) 55%, transparent 100%)' }}
                >
                  <blockquote>
                    <p
                      className="font-cormorant italic font-light leading-snug mb-3"
                      style={{ fontSize: 'clamp(1.1rem, 1.8vw, 1.45rem)', color: 'var(--brand-cream)' }}
                    >
                      &ldquo;We start every project by listening — deeply — before we design anything.&rdquo;
                    </p>
                    <footer>
                      <p
                        className="font-jost text-[0.58rem] tracking-[0.24em] uppercase"
                        style={{ color: 'rgba(240,235,225,0.6)' }}
                      >
                        Osita Agusionu — Founder, VIXX Interiors
                      </p>
                    </footer>
                  </blockquote>
                </div>
              </div>
            </ScrollReveal>

          </div>
        </div>
      </section>

      {/* ── 4. Services ─────────────────────────────────────────────────────── */}
      <section
        id="services"
        className="relative overflow-hidden section-pad"
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
              className="font-cormorant font-light mb-10 lg:mb-14"
              style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', color: 'var(--text-primary)', lineHeight: 1.1 }}
            >
              Studio Services
            </h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {SERVICES.map((svc, i) => (
              <ScrollReveal key={svc.id} delay={i * 0.08} variant="fadeUp">
                <div className="service-card rounded-2xl p-7 sm:p-8 relative overflow-hidden group cursor-default h-full">
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
                  <div className="w-1.5 h-1.5 rounded-full mb-6" style={{ background: 'var(--gold)', opacity: 0.65 }} />
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

          <ScrollReveal delay={0.5}>
            <div className="mt-10">
              <a href="#process" className="btn-outline">
                How We Work
                <ArrowRight size={14} strokeWidth={1.5} aria-hidden="true" />
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── 5. How We Work ──────────────────────────────────────────────────── */}
      <section
        id="process"
        className="relative overflow-hidden section-pad"
        style={{ background: 'var(--bg-secondary)' }}
      >
        <div className="container-site relative z-10">
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-3">
              <AnimatedLine width={24} delay={0.1} />
              <p className="label-xs">How We Work</p>
            </div>
            <h2
              className="font-cormorant font-light mb-12 lg:mb-16"
              style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', color: 'var(--text-primary)', lineHeight: 1.1 }}
            >
              Our Process
            </h2>
          </ScrollReveal>

          <div style={{ borderTop: '1px solid var(--border)' }}>
            {PROCESS_STEPS.map((step, i) => (
              <ScrollReveal key={step.number} delay={i * 0.07} variant="fadeUp">
                <div
                  className="grid sm:grid-cols-[3.5rem_1fr] gap-6 sm:gap-10 py-8 lg:py-10 items-start"
                  style={{ borderBottom: '1px solid var(--border)' }}
                >
                  <span
                    aria-hidden="true"
                    className="font-cormorant font-light leading-none select-none"
                    style={{ fontSize: '2.6rem', color: 'var(--gold-ghost)' }}
                  >
                    {step.number}
                  </span>
                  <div>
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <h3
                        className="font-cormorant font-light"
                        style={{ fontSize: 'clamp(1.3rem, 2vw, 1.65rem)', color: 'var(--text-primary)' }}
                      >
                        {step.title}
                      </h3>
                      <span
                        className="font-jost text-[0.56rem] tracking-[0.22em] uppercase shrink-0 pt-1"
                        style={{ color: 'var(--text-tertiary)' }}
                      >
                        {step.duration}
                      </span>
                    </div>
                    <p className="body-md" style={{ color: 'var(--text-secondary)' }}>
                      {step.description}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.4}>
            <div className="mt-10">
              <a href="#portfolio" className="btn-outline">
                Explore Portfolio
                <ArrowRight size={14} strokeWidth={1.5} aria-hidden="true" />
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── 6. Selected Work ────────────────────────────────────────────────── */}
      <section id="portfolio" style={{ background: 'var(--bg-primary)' }}>
        <div className="container-site pt-20 pb-10 lg:pt-28 lg:pb-14">
          <ScrollReveal>
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <AnimatedLine width={24} delay={0.1} />
                  <p className="label-xs">Selected Work</p>
                </div>
                <h2 className="heading-lg">Selected Work</h2>
              </div>
              <Link href="/portfolio" className="btn-ghost hidden sm:inline-flex mt-3">
                View Library
                <ArrowRight size={12} strokeWidth={1.5} aria-hidden="true" />
              </Link>
            </div>
          </ScrollReveal>
        </div>

        <div className="container-site pb-16 lg:pb-24">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {PORTFOLIO_PROJECTS.map((project, i) => (
              <ScrollReveal key={project.id} delay={i * 0.08} variant="fadeUp">
                <Link
                  href={`/portfolio/${project.slug}`}
                  className="group relative block overflow-hidden rounded-2xl"
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
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 pointer-events-none"
                      style={{ background: 'linear-gradient(to top, var(--overlay-heavy) 0%, var(--overlay-subtle) 45%, transparent 100%)' }}
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-5 lg:p-7">
                      <p
                        className="font-jost text-[0.56rem] tracking-[0.28em] uppercase mb-2"
                        style={{ color: 'var(--gold-text)' }}
                      >
                        {project.category}
                      </p>
                      <h3
                        className="font-cormorant font-light text-[var(--brand-cream)] leading-tight"
                        style={{ fontSize: 'clamp(1.1rem, 2vw, 1.65rem)' }}
                      >
                        {project.title}
                      </h3>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            <Link href="/portfolio" className="btn-ghost">
              View Library
              <ArrowRight size={12} strokeWidth={1.5} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── 7. Final Quote ──────────────────────────────────────────────────── */}
      <section
        className="relative py-24 lg:py-36 overflow-hidden"
        style={{ background: 'var(--bg-secondary)' }}
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
                style={{ fontSize: 'clamp(1.55rem, 3.2vw, 2.85rem)', color: 'var(--text-primary)' }}
              >
                &ldquo;A space is not truly finished until it belongs entirely to the people who live in it.&rdquo;
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

      {/* ── 8. Final CTA ────────────────────────────────────────────────────── */}
      <section
        id="contact"
        className="relative overflow-hidden py-24 lg:py-36"
        style={{ background: 'var(--bg-primary)' }}
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
              style={{ fontSize: 'clamp(2.4rem, 4.5vw, 4rem)', lineHeight: 1.08, color: 'var(--text-primary)' }}
            >
              Ready to begin{' '}
              <em className="not-italic" style={{ color: 'var(--gold)' }}>your project?</em>
            </h2>

            <p className="body-lg mb-10" style={{ maxWidth: '42ch', margin: '0 auto 2.5rem' }}>
              Tell us about your space. We&apos;ll respond within 24 hours with a tailored proposal — handled in complete confidence.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/start" className="btn-primary">
                Start a Conversation
                <ArrowRight size={14} strokeWidth={1.5} aria-hidden="true" />
              </Link>
              <Link href="/start" className="btn-ghost">
                Start Your Project
                <ArrowRight size={12} strokeWidth={1.5} aria-hidden="true" />
              </Link>
            </div>

          </ScrollReveal>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────────────────────────── */}
      <Footer />
    </main>
  )
}
