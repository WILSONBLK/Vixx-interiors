import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Navbar }       from '@/components/layout/Navbar'
import { Footer }       from '@/components/layout/Footer'
import { HexMotif }     from '@/components/ui/HexMotif'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { WHY_ITEMS } from '@/lib/data'
import { AnimatedLine } from '@/components/ui/AnimatedLine'

export const metadata: Metadata = {
  title:       'About VIXX Interiors – Interior Design Studio',
  description: 'Learn about Osita Agusionu and VIXX Interiors\' philosophy: creating calm, considered interiors in Lagos, Nigeria.',
}

export default function AboutPage() {
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
              <p className="label-xs">About the Studio</p>
            </div>
            <h1 className="heading-xl mb-4">
              Design driven by{' '}
              <em className="not-italic" style={{ color: 'var(--gold)' }}>intention.</em>
            </h1>
            <AnimatedLine width={200} className="mb-6" delay={0.25} />
            <p className="body-lg max-w-2xl">
              VIXX Interiors is a Lagos-based interior design studio founded on the belief that a great space is not simply beautiful — it is purposeful, personal, and enduring.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Founder ── */}
      <section className="section-pad" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container-site">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal variant="fadeRight">
              <div
                className="relative aspect-[3/4] overflow-hidden"
                style={{ background: 'var(--bg-primary)' }}
              >
                <div
                  className="absolute inset-0 flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-secondary) 100%)' }}
                >
                  <HexMotif size={180} variant="dual" opacity={0.12} />
                </div>
                <div className="absolute bottom-0 inset-x-0 p-6" style={{ background: 'linear-gradient(to top, var(--overlay-heavy), transparent)' }}>
                  <p className="font-cormorant text-xl font-light" style={{ color: 'var(--text-primary)' }}>Osita Agusionu</p>
                  <p className="label-xs mt-1">Founder & Principal Designer</p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal variant="fadeLeft" delay={0.1}>
              <div className="flex items-center gap-3 mb-5">
                <AnimatedLine width={24} delay={0.1} />
                <p className="label-xs">The Founder</p>
              </div>
              <h2 className="heading-lg mb-6">
                An artist&apos;s eye for functional design.
              </h2>
              <div className="space-y-4 body-lg">
                <p>
                  Osita Agusionu founded VIXX Interiors with a single conviction: that every space should feel like a personal sanctuary. With a background rooted in architecture and fine art, he approaches each project as a curated composition — balancing form, function, and feeling.
                </p>
                <p>
                  His philosophy is rooted in simplicity. Not the absence of things, but the presence of the right things. Warm materials, considered proportions, and lighting that changes how a room feels through the day. The result is always calm — always complete.
                </p>
                <p>
                  &ldquo;I love making a space calm and focused. The best interiors feel complete without being busy.&rdquo;
                </p>
              </div>

              <div className="mt-10">
                <Link href="/start" className="btn-primary">
                  Work With Us
                  <ArrowRight size={14} strokeWidth={1.5} aria-hidden="true" />
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── Philosophy ── */}
      <section className="section-pad">
        <div className="container-site">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal>
              <div className="flex items-center justify-center gap-3 mb-5">
                <AnimatedLine width={24} delay={0.1} />
                <p className="label-xs">Our Philosophy</p>
              </div>
              <h2 className="heading-lg text-center mb-14">
                Simplicity Kind of Different
              </h2>
            </ScrollReveal>

            <div className="grid md:grid-cols-3 gap-px" style={{ background: 'var(--border)' }}>
              {[
                { number: '01', title: 'Intention', body: 'Every decision in a VIXX project has a reason. We don\'t add for the sake of adding — we curate until what remains is exactly right.' },
                { number: '02', title: 'Balance',   body: 'Great interiors feel settled. We achieve this through symmetry, proportion, and a careful tension between warmth and restraint.' },
                { number: '03', title: 'Longevity', body: 'Trends fade. We design for how you will feel in a space ten years from now — choosing materials and forms that age with grace.' },
              ].map((item, i) => (
                <ScrollReveal key={item.number} delay={i * 0.07} variant="fadeUp">
                  <div className="card-glass p-8 h-full" style={{ background: 'var(--bg-primary)' }}>
                    <span className="font-cormorant text-4xl font-light opacity-20 block mb-4" style={{ color: 'var(--gold)' }}>
                      {item.number}
                    </span>
                    <h3 className="heading-md mb-3">{item.title}</h3>
                    <p className="body-md">{item.body}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Why VIXX ── */}
      <section className="section-pad" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container-site">
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-4">
              <AnimatedLine width={24} delay={0.1} />
              <p className="label-xs">Why VIXX</p>
            </div>
            <h2 className="heading-lg mb-14 max-w-xl">What sets us apart.</h2>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHY_ITEMS.map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 0.07} variant="fadeUp">
                <div className="card-glass p-6 h-full">
                  <div
                    className="w-8 h-8 flex items-center justify-center mb-4"
                    style={{ border: '1px solid var(--gold-border)' }}
                  >
                    <HexMotif size="xs" opacity={0.7} />
                  </div>
                  <h3 className="font-cormorant text-xl font-light mb-2" style={{ color: 'var(--text-primary)' }}>
                    {item.title}
                  </h3>
                  <p className="body-md text-sm">{item.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section-pad" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container-site text-center">
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-4">
              <AnimatedLine width={24} delay={0.1} />
              <p className="label-xs">Ready to Begin?</p>
            </div>
            <h2 className="heading-lg max-w-xl mx-auto mb-8">
              Let&apos;s build something that lasts.
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
