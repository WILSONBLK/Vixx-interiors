import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ChevronRight } from 'lucide-react'
import { Navbar }       from '@/components/layout/Navbar'
import { Footer }       from '@/components/layout/Footer'
import { HexMotif }     from '@/components/ui/HexMotif'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { STATS, SERVICES, PROCESS_STEPS, TESTIMONIALS, PORTFOLIO_PROJECTS } from '@/lib/data'

export const metadata: Metadata = {
  title:       'VIXX Interiors – Luxury Interior Design, Lagos',
  description: 'VIXX Interiors crafts luxury spaces in Lagos and beyond. Explore our portfolio and book a design consultation.',
}

export default function Home() {
  const featured = PORTFOLIO_PROJECTS[0]

  return (
    <main className="relative overflow-x-hidden" style={{ background: 'var(--bg-primary)' }}>
      <Navbar />

      {/* ── Hero ──────────────────────────────────────────────────────────────── */}
      <section className="relative flex min-h-[100vh] flex-col items-center justify-center px-6 pb-16 pt-32 text-center lg:px-8 overflow-hidden">

        {/* Video background */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none overflow-hidden"
          style={{ perspective: '800px' }}
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              transform: 'scale(1.08) translateZ(0)',
              animation: 'heroZoom 20s ease-in-out infinite alternate',
            }}
          >
            <source src="/videos/hero.mov" type="video/quicktime" />
            <source src="/videos/hero.mp4" type="video/mp4" />
          </video>

          {/* Deep dark base overlay */}
          <div
            className="absolute inset-0"
            style={{ background: 'rgba(2,6,23,0.55)' }}
          />

          {/* Cinematic gradient — darkens edges, opens centre */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse 70% 70% at 50% 45%, transparent 0%, rgba(2,6,23,0.45) 60%, rgba(2,6,23,0.85) 100%)',
            }}
          />

          {/* Bottom fade into content */}
          <div
            className="absolute bottom-0 inset-x-0 h-48"
            style={{ background: 'linear-gradient(to bottom, transparent, var(--bg-primary))' }}
          />

          {/* Gold shimmer overlay */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse 60% 40% at 50% 30%, rgba(196,154,46,0.06) 0%, transparent 70%)',
            }}
          />
        </div>

        <div className="relative z-10 flex flex-col items-center max-w-5xl mx-auto">
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-6">
              <HexMotif size="xs" opacity={0.6} />
              <span className="label-xs">Luxury Interiors · Lagos, Nigeria</span>
              <HexMotif size="xs" opacity={0.6} />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h1 className="heading-xl max-w-4xl">
              Spaces designed to endure.{' '}
              <em className="not-italic" style={{ color: 'var(--gold)' }}>Details </em>
              that define you.
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="body-lg mt-6 max-w-2xl">
              VIXX Interiors crafts calm, refined living and commercial spaces for clients who understand that great design is not decoration — it is a way of living.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link href="/portfolio" className="btn-primary">
                View Portfolio
                <ArrowRight size={14} strokeWidth={1.5} aria-hidden="true" />
              </Link>
              <Link href="/contact" className="btn-outline">
                Book a Consultation
              </Link>
            </div>
          </ScrollReveal>
        </div>

        {/* Scroll hint */}
        <div
          aria-hidden="true"
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30"
        >
          <span className="font-jost text-[0.55rem] tracking-[0.3em] uppercase" style={{ color: 'var(--text-muted)' }}>
            Scroll
          </span>
          <div className="w-px h-10" style={{ background: 'linear-gradient(to bottom, var(--gold), transparent)' }} />
        </div>
      </section>

      {/* ── Stats bar ──────────────────────────────────────────────────────────── */}
      <section aria-label="Studio statistics">
        <div className="container-site">
          <div className="divider-gold" />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px" style={{ background: 'var(--border)' }}>
            {STATS.map((stat) => (
              <ScrollReveal key={stat.label} variant="fadeIn">
                <div
                  className="flex flex-col items-center justify-center py-8 px-4 text-center"
                  style={{ background: 'var(--bg-primary)' }}
                >
                  <span className="font-cormorant text-4xl font-light" style={{ color: 'var(--gold)' }}>
                    {stat.value}
                  </span>
                  <span className="mt-1 font-jost text-[0.65rem] tracking-[0.25em] uppercase" style={{ color: 'var(--text-muted)' }}>
                    {stat.label}
                  </span>
                </div>
              </ScrollReveal>
            ))}
          </div>
          <div className="divider-gold" />
        </div>
      </section>

      {/* ── Featured Project ──────────────────────────────────────────────────── */}
      <section id="projects" className="section-pad">
        <div className="container-site">
          <ScrollReveal>
            <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
              <div>
                <p className="label-xs mb-3">Featured Project</p>
                <h2 className="heading-lg">{featured.title}</h2>
              </div>
              <Link href="/portfolio" className="btn-ghost">
                All Projects
                <ChevronRight size={14} strokeWidth={1.5} aria-hidden="true" />
              </Link>
            </div>
          </ScrollReveal>

          <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-6">
            <ScrollReveal variant="fadeRight">
              <div className="relative aspect-[4/3] overflow-hidden" style={{ background: 'var(--bg-secondary)' }}>
                <Image
                  src={featured.image}
                  alt={featured.title}
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  priority
                />
              </div>
            </ScrollReveal>

            <ScrollReveal variant="fadeLeft" delay={0.1}>
              <div className="flex flex-col justify-between h-full card-glass p-8">
                <div>
                  <p className="label-xs mb-4">{featured.category}</p>
                  <h3 className="heading-md mb-4">{featured.title}</h3>
                  <p className="body-md">{featured.overview}</p>

                  <ul className="mt-6 space-y-2">
                    {featured.materials.slice(0, 4).map((m) => (
                      <li key={m} className="flex items-center gap-3">
                        <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: 'var(--gold)' }} />
                        <span className="font-jost text-xs tracking-wide" style={{ color: 'var(--text-muted)' }}>{m}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 flex items-center gap-2 pt-6" style={{ borderTop: '1px solid var(--border)' }}>
                  <span className="font-jost text-xs" style={{ color: 'var(--text-muted)' }}>{featured.location}</span>
                  <span style={{ color: 'var(--border-strong)' }}>·</span>
                  <span className="font-jost text-xs" style={{ color: 'var(--text-muted)' }}>{featured.completedAt}</span>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Secondary images */}
          <div className="grid grid-cols-3 gap-6 mt-6">
            {featured.images.slice(1, 4).map((src, i) => (
              <ScrollReveal key={src} delay={i * 0.08} variant="fadeUp">
                <div className="relative aspect-square overflow-hidden" style={{ background: 'var(--bg-secondary)' }}>
                  <Image
                    src={src}
                    alt={`${featured.title} – view ${i + 2}`}
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-105"
                    sizes="(max-width: 1024px) 33vw, 25vw"
                  />
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services ──────────────────────────────────────────────────────────── */}
      <section className="section-pad" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container-site">
          <ScrollReveal>
            <div className="max-w-xl mb-14">
              <p className="label-xs mb-4">What We Do</p>
              <h2 className="heading-lg">Design services built around your life.</h2>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background: 'var(--border)' }}>
            {SERVICES.slice(0, 3).map((service, i) => (
              <ScrollReveal key={service.id} delay={i * 0.07} variant="fadeUp">
                <div
                  className="card-glass p-8 flex flex-col gap-5 h-full transition-all duration-300"
                  style={{ background: 'var(--bg-secondary)' }}
                >
                  <span className="font-cormorant text-5xl font-light opacity-20" style={{ color: 'var(--gold)' }}>
                    {service.number}
                  </span>
                  <div>
                    <h3 className="heading-md mb-3">{service.title}</h3>
                    <p className="body-md">{service.description}</p>
                  </div>
                  <Link href="/services" className="btn-ghost mt-auto">
                    Learn more <ChevronRight size={13} strokeWidth={1.5} aria-hidden="true" />
                  </Link>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.2}>
            <div className="mt-10 flex justify-center">
              <Link href="/services" className="btn-outline">
                All Services
                <ArrowRight size={14} strokeWidth={1.5} aria-hidden="true" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Process teaser ──────────────────────────────────────────────────── */}
      <section className="section-pad">
        <div className="container-site">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal variant="fadeRight">
              <p className="label-xs mb-4">How We Work</p>
              <h2 className="heading-lg mb-6">A process as refined as the result.</h2>
              <p className="body-lg mb-8">
                Every VIXX project follows a structured six-stage process — from initial discovery through to final reveal. Nothing is left to chance, and nothing is rushed.
              </p>
              <Link href="/process" className="btn-primary">
                See the Process
                <ArrowRight size={14} strokeWidth={1.5} aria-hidden="true" />
              </Link>
            </ScrollReveal>

            <div className="space-y-0">
              {PROCESS_STEPS.slice(0, 4).map((step, i) => (
                <ScrollReveal key={step.number} delay={i * 0.07} variant="fadeLeft">
                  <div
                    className="flex gap-6 py-6"
                    style={{ borderBottom: '1px solid var(--border)' }}
                  >
                    <span
                      className="font-cormorant text-2xl font-light flex-shrink-0 w-8 leading-none mt-0.5"
                      style={{ color: 'var(--gold)' }}
                    >
                      {step.number}
                    </span>
                    <div>
                      <h3 className="font-cormorant text-lg font-medium mb-1" style={{ color: 'var(--text-primary)' }}>
                        {step.title}
                      </h3>
                      <p className="body-md text-sm">{step.description}</p>
                    </div>
                    <span className="font-jost text-[0.6rem] tracking-wider flex-shrink-0 ml-auto self-start mt-1" style={{ color: 'var(--text-muted)' }}>
                      {step.duration}
                    </span>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Testimonial ──────────────────────────────────────────────────────── */}
      <section className="section-pad relative overflow-hidden" style={{ background: 'var(--bg-secondary)' }}>
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(196,154,46,0.05) 0%, transparent 70%)' }} />
        <HexMotif size={200} variant="dual" opacity={0.04} className="absolute -left-12 top-1/2 -translate-y-1/2 pointer-events-none" aria-hidden />
        <HexMotif size={160} variant="outline" opacity={0.04} className="absolute -right-8 top-1/2 -translate-y-1/2 pointer-events-none" aria-hidden />

        <div className="container-site relative z-10">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center">
              <HexMotif size="sm" opacity={0.5} className="mx-auto mb-6" />
              <blockquote>
                <p className="font-cormorant text-2xl sm:text-3xl lg:text-4xl font-light leading-snug mb-8" style={{ color: 'var(--text-primary)' }}>
                  &ldquo;{TESTIMONIALS[0].quote}&rdquo;
                </p>
                <footer>
                  <p className="font-jost text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                    {TESTIMONIALS[0].name}
                  </p>
                  <p className="label-xs mt-1 opacity-70">{TESTIMONIALS[0].role} · {TESTIMONIALS[0].location}</p>
                </footer>
              </blockquote>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────────── */}
      <section id="contact" className="section-pad">
        <div className="container-site">
          <ScrollReveal>
            <div
              className="relative overflow-hidden p-10 sm:p-14 lg:p-20 text-center"
              style={{ border: '1px solid rgba(196,154,46,0.2)', background: 'rgba(196,154,46,0.04)' }}
            >
              <div aria-hidden="true" className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 60% 80% at 50% 100%, rgba(196,154,46,0.07) 0%, transparent 70%)' }} />
              <HexMotif size={120} variant="dual" opacity={0.06} className="absolute -top-6 -right-6 pointer-events-none" aria-hidden />
              <HexMotif size={100} variant="outline" opacity={0.06} className="absolute -bottom-4 -left-4 pointer-events-none" aria-hidden />

              <div className="relative z-10">
                <p className="label-xs mb-5">Let&apos;s Create Together</p>
                <h2 className="heading-lg max-w-2xl mx-auto mb-6">
                  Start your next design story with VIXX Interiors.
                </h2>
                <p className="body-lg max-w-xl mx-auto mb-10">
                  Share your vision, your space, and your timeline. We&apos;ll respond within 24 hours with a tailored proposal.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4">
                  <Link href="/contact" className="btn-primary">
                    Book a Consultation
                    <ArrowRight size={14} strokeWidth={1.5} aria-hidden="true" />
                  </Link>
                  <Link href="/portfolio" className="btn-outline">
                    View Our Work
                  </Link>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </main>
  )
}
