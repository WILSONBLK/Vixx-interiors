import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ChevronRight, Home as HomeIcon, Building2, Sofa, LayoutGrid } from 'lucide-react'
import { Navbar }       from '@/components/layout/Navbar'
import { Footer }       from '@/components/layout/Footer'
import { HexMotif }     from '@/components/ui/HexMotif'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { STATS, SERVICES, PROCESS_STEPS, TESTIMONIALS, PORTFOLIO_PROJECTS } from '@/lib/data'

export const metadata: Metadata = {
  title:       'VIXX Interiors – Luxury Interior Design, Lagos',
  description: 'VIXX Interiors crafts luxury spaces in Lagos and beyond. Explore our portfolio and book a design consultation.',
}

const CATEGORY_LINKS = [
  { Icon: HomeIcon,    label: 'Residential Design',  href: '/services' },
  { Icon: Building2,   label: 'Commercial Spaces',   href: '/services' },
  { Icon: Sofa,        label: 'Furniture Sourcing',  href: '/services' },
  { Icon: LayoutGrid,  label: 'Space Planning',      href: '/services' },
]

const WHY_CARDS = [
  {
    image: '/images/portfolio/living-room-1.jpg',
    label: 'Residential',
    title: 'Residences Built to Impress',
    body:  'We design homes that turn heads and hold value — tailored to your life, your taste, and your ambition.',
  },
  {
    image: '/images/portfolio/living-room-2.jpg',
    label: 'Commercial',
    title: 'Commercial Spaces That Win',
    body:  'Your environment shapes how clients, partners, and talent see you. We make sure they see the best.',
  },
  {
    image: '/images/portfolio/living-room-3.jpg',
    label: 'Craftsmanship',
    title: 'Every Detail. Considered.',
    body:  'From the first sketch to the final styling — nothing is accidental. Every decision earns its place.',
  },
]

export default function Home() {
  const featured = PORTFOLIO_PROJECTS[0]

  return (
    <main className="relative overflow-x-hidden" style={{ background: 'var(--bg-primary)' }}>
      <Navbar />

      {/* ── Hero — left-aligned ───────────────────────────────────────────────── */}
      <section className="relative flex min-h-[100vh] flex-col justify-end px-6 pb-28 pt-36 lg:px-8 overflow-hidden">

        {/* Video background */}
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none overflow-hidden">
          <video
            autoPlay muted loop playsInline
            className="absolute inset-0 w-full h-full object-cover"
            style={{ transform: 'scale(1.08) translateZ(0)', animation: 'heroZoom 20s ease-in-out infinite alternate' }}
          >
            <source src="/videos/hero.mp4" type="video/mp4" />
            <source src="/videos/hero.mov" type="video/quicktime" />
          </video>

          {/* Dark base */}
          <div className="absolute inset-0" style={{ background: 'rgba(2,6,23,0.48)' }} />

          {/* Left-weighted vignette so text reads clearly */}
          <div className="absolute inset-0" style={{
            background: 'radial-gradient(ellipse 90% 110% at 20% 60%, transparent 0%, rgba(2,6,23,0.35) 45%, rgba(2,6,23,0.88) 100%)',
          }} />

          {/* Bottom fade into content */}
          <div className="absolute bottom-0 inset-x-0 h-56" style={{ background: 'linear-gradient(to bottom, transparent, var(--bg-primary))' }} />

          {/* Subtle gold warmth on left */}
          <div className="absolute inset-0" style={{
            background: 'radial-gradient(ellipse 50% 50% at 15% 50%, rgba(196,154,46,0.07) 0%, transparent 65%)',
          }} />
        </div>

        {/* Left-aligned content */}
        <div className="relative z-10 max-w-2xl">
          <ScrollReveal>
            <div
              className="inline-flex items-center gap-2 mb-8 px-3 py-1.5 rounded-full"
              style={{ background: 'rgba(196,154,46,0.12)', border: '1px solid rgba(196,154,46,0.28)' }}
            >
              <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: 'var(--gold)' }} />
              <span className="font-jost text-[0.6rem] tracking-[0.25em] uppercase" style={{ color: 'var(--gold)' }}>
                VIXX Interiors &middot; Lagos
              </span>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h1 className="heading-xl">
              Interiors That<br />
              <em style={{ color: 'var(--gold)' }}>Command</em><br />
              The Room.
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="body-lg mt-6 max-w-lg">
              Bespoke luxury design for Lagos&apos;s most discerning homes and commercial spaces. Bold vision. Flawless execution.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link href="/portfolio" className="btn-primary">
                Explore Our Work
                <ArrowRight size={14} strokeWidth={1.5} aria-hidden="true" />
              </Link>
              <Link href="/contact" className="btn-outline">
                Book a Consultation
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Floating category bar ─────────────────────────────────────────────── */}
      <section aria-label="Service categories">
        <div className="container-site">
          <ScrollReveal variant="fadeUp">
            <div
              className="-mt-10 relative z-20 flex flex-wrap items-center justify-between gap-y-4 gap-x-6 px-6 py-5 rounded-2xl"
              style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-lg)' }}
            >
              {CATEGORY_LINKS.map(({ Icon, label, href }) => (
                <Link key={label} href={href} className="flex items-center gap-3 group">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-200 group-hover:border-[var(--gold)]"
                    style={{ background: 'rgba(196,154,46,0.10)', border: '1px solid rgba(196,154,46,0.22)' }}
                  >
                    <Icon size={15} style={{ color: 'var(--gold)' }} strokeWidth={1.5} />
                  </div>
                  <span
                    className="font-jost text-[0.68rem] tracking-[0.12em] uppercase transition-colors duration-200 group-hover:text-[var(--gold)]"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {label}
                  </span>
                </Link>
              ))}

              <Link href="/contact" className="btn-primary py-2.5 text-[0.6rem] flex-shrink-0 hidden sm:inline-flex">
                Get a Proposal
                <ArrowRight size={13} strokeWidth={1.5} aria-hidden="true" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Welcome / About ───────────────────────────────────────────────────── */}
      <section className="section-pad">
        <div className="container-site">
          <div className="grid lg:grid-cols-2 gap-14 items-center">

            {/* Left: image with overlay badge */}
            <ScrollReveal variant="fadeRight">
              <div className="relative">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={featured.image}
                    alt={featured.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                  />
                  <div
                    className="absolute inset-0"
                    style={{ background: 'linear-gradient(to top, rgba(2,6,23,0.72) 0%, transparent 55%)' }}
                  />
                </div>

                {/* Floating project badge */}
                <div
                  className="absolute bottom-6 left-6 right-6 p-4 rounded-xl"
                  style={{ background: 'rgba(2,6,23,0.78)', backdropFilter: 'blur(14px)', border: '1px solid rgba(196,154,46,0.28)' }}
                >
                  <p className="font-jost text-[0.55rem] tracking-[0.25em] uppercase mb-1" style={{ color: 'var(--gold)' }}>
                    Featured Project
                  </p>
                  <p className="font-cormorant text-xl font-medium" style={{ color: 'var(--text-primary)' }}>
                    {featured.title}
                  </p>
                  <p className="font-jost text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
                    {featured.location} &middot; {featured.completedAt}
                  </p>
                </div>

                {/* Gold accent bar */}
                <div
                  className="absolute top-0 left-0 w-1 h-20"
                  style={{ background: 'linear-gradient(to bottom, var(--gold), transparent)' }}
                />
              </div>
            </ScrollReveal>

            {/* Right: text */}
            <ScrollReveal variant="fadeLeft" delay={0.1}>
              <div>
                <p className="label-xs mb-4">The VIXX Standard</p>
                <h2 className="heading-lg mb-6">
                  We don&apos;t just design rooms.{' '}
                  <em style={{ color: 'var(--gold)' }}>We define how you live.</em>
                </h2>
                <p className="body-lg mb-8">
                  Lagos&apos;s most ambitious interiors start with a conversation. Whether it&apos;s a penthouse in Victoria Island or a flagship office in Lekki — we bring the same obsessive attention to detail, the same drive for excellence, to every project we touch.
                </p>

                {/* Inline stats */}
                <div
                  className="grid grid-cols-3 gap-6 mb-8 py-6"
                  style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}
                >
                  {STATS.slice(0, 3).map((stat) => (
                    <div key={stat.label}>
                      <p className="font-cormorant text-3xl font-normal" style={{ color: 'var(--gold)' }}>
                        {stat.value}
                      </p>
                      <p className="font-jost text-[0.58rem] tracking-[0.15em] uppercase mt-1" style={{ color: 'var(--text-muted)' }}>
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-4">
                  <Link href="/about" className="btn-primary">
                    Our Story
                    <ArrowRight size={14} strokeWidth={1.5} aria-hidden="true" />
                  </Link>
                  <Link href="/portfolio" className="btn-ghost">
                    View Our Work
                    <ChevronRight size={14} strokeWidth={1.5} aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── Why VIXX — image cards ────────────────────────────────────────────── */}
      <section className="section-pad" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container-site">
          <ScrollReveal>
            <div className="text-center mb-12">
              <p className="label-xs mb-3">What We Do</p>
              <h2 className="heading-lg">
                Excellence in{' '}
                <em style={{ color: 'var(--gold)' }}>every space.</em>
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-6">
            {WHY_CARDS.map((card, i) => (
              <ScrollReveal key={card.title} delay={i * 0.08} variant="fadeUp">
                <div
                  className="overflow-hidden flex flex-col h-full"
                  style={{ background: 'var(--bg-primary)', border: '1px solid var(--border)', borderRadius: '12px' }}
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={card.image}
                      alt={card.title}
                      fill
                      className="object-cover transition-transform duration-700 hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div
                      className="absolute top-4 left-4 px-3 py-1 rounded-full"
                      style={{ background: 'rgba(2,6,23,0.72)', backdropFilter: 'blur(8px)', border: '1px solid rgba(196,154,46,0.32)' }}
                    >
                      <span className="font-jost text-[0.55rem] tracking-[0.2em] uppercase" style={{ color: 'var(--gold)' }}>
                        {card.label}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="font-cormorant text-xl font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
                      {card.title}
                    </h3>
                    <p className="body-md text-sm flex-1">{card.body}</p>
                    <Link href="/services" className="btn-ghost mt-5 self-start text-xs">
                      Learn more
                      <ChevronRight size={13} strokeWidth={1.5} aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Process teaser ───────────────────────────────────────────────────── */}
      <section className="section-pad">
        <div className="container-site">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal variant="fadeRight">
              <p className="label-xs mb-4">How We Work</p>
              <h2 className="heading-lg mb-6">A process as bold as the result.</h2>
              <p className="body-lg mb-8">
                Every VIXX project follows a six-stage process built for precision — from discovery to reveal. No guesswork. No shortcuts. Just exceptional outcomes, delivered on time.
              </p>
              <Link href="/process" className="btn-primary">
                See the Process
                <ArrowRight size={14} strokeWidth={1.5} aria-hidden="true" />
              </Link>
            </ScrollReveal>

            <div className="space-y-0">
              {PROCESS_STEPS.slice(0, 4).map((step, i) => (
                <ScrollReveal key={step.number} delay={i * 0.07} variant="fadeLeft">
                  <div className="flex gap-6 py-6" style={{ borderBottom: '1px solid var(--border)' }}>
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
                    <span
                      className="font-jost text-[0.6rem] tracking-wider flex-shrink-0 ml-auto self-start mt-1"
                      style={{ color: 'var(--text-muted)' }}
                    >
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
                  <p className="label-xs mt-1 opacity-70">{TESTIMONIALS[0].role} &middot; {TESTIMONIALS[0].location}</p>
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
                <p className="label-xs mb-5">Ready to Begin?</p>
                <h2 className="heading-lg max-w-2xl mx-auto mb-6">
                  Your most impressive space starts here.
                </h2>
                <p className="body-lg max-w-xl mx-auto mb-10">
                  Tell us about your project. We&apos;ll respond within 24 hours with a tailored proposal — no obligation, no generic packages.
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
