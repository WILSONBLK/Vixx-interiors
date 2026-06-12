import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Navbar }       from '@/components/layout/Navbar'
import { Footer }       from '@/components/layout/Footer'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { HeroSection }  from '@/components/ui/HeroSection'
import { AnimatedLine } from '@/components/ui/AnimatedLine'
import { ContactForm }  from '@/components/forms/ContactForm'
import { PORTFOLIO_PROJECTS } from '@/lib/data'

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

      {/* ── 2. Services ──────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden" style={{ minHeight: '80vh' }}>
        {/* Background image */}
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
          <Image
            src="/images/portfolio/living-room-2.jpg"
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0" style={{ background: 'rgba(6,4,2,0.80)' }} />
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to bottom, rgba(6,4,2,0.4) 0%, transparent 30%, transparent 70%, rgba(6,4,2,0.5) 100%)' }}
          />
        </div>

        <div className="relative z-10 container-site section-pad">
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-14">
              <AnimatedLine width={24} delay={0.1} />
              <p
                className="font-jost text-[0.54rem] tracking-[0.38em] uppercase"
                style={{ color: 'rgba(196,154,46,0.78)' }}
              >
                What We Do
              </p>
            </div>
          </ScrollReveal>

          <div
            className="grid md:grid-cols-2 lg:grid-cols-3"
            style={{ borderTop: '1px solid rgba(245,245,244,0.10)' }}
          >
            {SERVICES_LIST.map((svc, i) => (
              <ScrollReveal key={svc.number} delay={i * 0.06} variant="fadeUp">
                <div
                  className="py-10 px-6"
                  style={{ borderBottom: '1px solid rgba(245,245,244,0.10)' }}
                >
                  <span
                    className="font-cormorant text-5xl font-light block mb-5"
                    style={{ color: 'rgba(196,154,46,0.25)' }}
                  >
                    {svc.number}
                  </span>
                  <h3
                    className="font-cormorant text-2xl font-light"
                    style={{ color: '#F5F5F4' }}
                  >
                    {svc.title}
                  </h3>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.35}>
            <div className="mt-12">
              <Link href="/services" className="btn-outline">
                Full Services
                <ArrowRight size={14} strokeWidth={1.5} aria-hidden="true" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── 3. Portfolio ─────────────────────────────────────────────────────── */}
      <section className="section-pad" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container-site">
          <ScrollReveal>
            <div className="flex items-center justify-between mb-12">
              <div className="flex items-center gap-3">
                <AnimatedLine width={24} delay={0.1} />
                <p className="label-xs">Selected Work</p>
              </div>
              <Link href="/portfolio" className="btn-ghost text-xs">
                All Projects
                <ArrowRight size={12} strokeWidth={1.5} aria-hidden="true" />
              </Link>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-px" style={{ background: 'var(--border)' }}>
            {PORTFOLIO_PROJECTS.map((project, i) => (
              <ScrollReveal key={project.id} delay={(i % 2) * 0.07} variant="fadeUp">
                <Link
                  href={`/portfolio/${project.slug}`}
                  className="group relative block overflow-hidden"
                  style={{ background: 'var(--bg-primary)' }}
                  aria-label={`View ${project.title}`}
                >
                  <div className={`relative overflow-hidden ${i === 0 ? 'aspect-[16/10]' : 'aspect-[4/3]'}`}>
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ background: 'rgba(2,6,23,0.38)' }}
                    />
                  </div>
                  <div className="p-6">
                    <p className="label-xs mb-1">{project.category}</p>
                    <h3
                      className="font-cormorant text-2xl font-light"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {project.title}
                    </h3>
                    <p
                      className="font-jost text-xs mt-0.5"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      {project.location} &middot; {project.completedAt}
                    </p>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. Founder ───────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden section-pad">
        {/* Background image */}
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
          <Image
            src="/images/portfolio/living-room-4.jpg"
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(105deg, rgba(6,4,2,0.92) 0%, rgba(6,4,2,0.70) 50%, rgba(6,4,2,0.25) 100%)',
            }}
          />
        </div>

        <div className="relative z-10 container-site">
          <div
            className="max-w-xl"
            style={{
              '--text-primary':   '#F5F5F4',
              '--text-secondary': 'rgba(245,242,237,0.70)',
              '--text-muted':     'rgba(245,241,234,0.50)',
            } as React.CSSProperties}
          >
            <ScrollReveal>
              <div className="flex items-center gap-3 mb-8">
                <AnimatedLine width={24} delay={0.1} />
                <p
                  className="font-jost text-[0.54rem] tracking-[0.38em] uppercase"
                  style={{ color: 'rgba(196,154,46,0.78)' }}
                >
                  The Founder
                </p>
              </div>

              <h2
                className="font-cormorant font-light mb-2"
                style={{ fontSize: 'clamp(2.4rem, 6vw, 4.5rem)', lineHeight: 1, color: '#F5F5F4' }}
              >
                Osita Agusionu
              </h2>
              <p
                className="font-cormorant italic text-xl mb-10"
                style={{ color: 'rgba(196,154,46,0.80)' }}
              >
                Founder &amp; Principal Designer
              </p>

              <div
                className="mb-10 pb-10"
                style={{ borderBottom: '1px solid rgba(245,245,244,0.12)' }}
              >
                <p
                  className="font-jost font-light leading-relaxed"
                  style={{
                    fontSize:      'clamp(0.82rem, 1.2vw, 0.95rem)',
                    color:         'rgba(245,241,234,0.62)',
                    letterSpacing: '0.015em',
                    maxWidth:      '44ch',
                  }}
                >
                  With a background in architecture and fine art, Osita approaches every space as a curated composition — balancing form, function, and feeling. His philosophy: not the absence of things, but the presence of the right things.
                </p>
              </div>

              <Link href="/about" className="btn-outline">
                About the Studio
                <ArrowRight size={14} strokeWidth={1.5} aria-hidden="true" />
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── 5. Contact ───────────────────────────────────────────────────────── */}
      <section
        id="contact"
        className="relative overflow-hidden section-pad"
        style={{ background: 'var(--bg-secondary)' }}
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(196,154,46,0.04) 0%, transparent 65%)',
          }}
        />

        <div className="relative z-10 container-site">
          <div className="grid lg:grid-cols-2 gap-20 items-start">

            {/* Left: heading */}
            <ScrollReveal variant="fadeRight">
              <div className="flex items-center gap-3 mb-6">
                <AnimatedLine width={24} delay={0.1} />
                <p className="label-xs">Start a Project</p>
              </div>
              <h2 className="heading-lg mb-5">
                Tell us about{' '}
                <em style={{ color: 'var(--gold)' }}>your space.</em>
              </h2>
              <p className="body-lg" style={{ maxWidth: '38ch' }}>
                Fill in the form and we&apos;ll respond within 24 hours with a tailored proposal. All enquiries are handled in confidence.
              </p>
            </ScrollReveal>

            {/* Right: form */}
            <ScrollReveal delay={0.1} variant="fadeLeft">
              <ContactForm />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── 6. Footer ────────────────────────────────────────────────────────── */}
      <Footer />
    </main>
  )
}
