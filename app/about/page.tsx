import type { Metadata } from 'next'
import type { CSSProperties } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Navbar }             from '@/components/layout/Navbar'
import { Footer }             from '@/components/layout/Footer'
import { HexMotif }           from '@/components/ui/HexMotif'
import { ScrollReveal }       from '@/components/ui/ScrollReveal'
import { AnimatedLine }       from '@/components/ui/AnimatedLine'
import { PageHeroBackground } from '@/components/ui/PageHeroBackground'

const HERO_STYLE: CSSProperties = {
  '--text-primary':   'var(--brand-cream)',
  '--text-secondary': 'rgba(240,235,225,0.72)',
} as CSSProperties

export const metadata: Metadata = {
  title:       'About VIXX Interiors – Interior Design Studio',
  description: 'Meet Osita Agusionu, Creative Director of VIXX Interiors — a Lagos-based studio dedicated to calm, personal, story-driven spaces.',
}

export default function AboutPage() {
  return (
    <main style={{ background: 'var(--bg-primary)' }}>
      <Navbar />

      {/* ── Hero ── */}
      <section
        className="relative flex flex-col justify-end overflow-hidden"
        style={{ minHeight: '68vh' }}
      >
        <PageHeroBackground src="/images/portfolio/proj-c-1.jpg" />
        <div className="container-site relative z-10 max-w-4xl pb-14 lg:pb-20" style={HERO_STYLE}>
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-5">
              <AnimatedLine width={24} delay={0.1} />
              <p className="label-xs">About the Studio</p>
            </div>
            <h1 className="heading-xl mb-4">
              Everything is{' '}
              <em className="not-italic" style={{ color: 'var(--gold)' }}>art.</em>
            </h1>
            <AnimatedLine width={200} className="mb-6" delay={0.25} />
            <p
              className="body-lg max-w-2xl font-semibold"
              style={{
                color: '#FFF5E1',
                textShadow: '0 2px 20px rgba(0,0,0,0.95), 0 1px 6px rgba(0,0,0,0.85)',
                letterSpacing: '0.01em',
              }}
            >
              VIXX Interiors is a Nigerian interior design studio built on a single belief: every space has a story to tell — and that story should be yours.
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
                  <p className="label-xs mt-1">Founder & Creative Director</p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal variant="fadeLeft" delay={0.1}>
              <div className="flex items-center gap-3 mb-5">
                <AnimatedLine width={24} delay={0.1} />
                <p className="label-xs">The Founder</p>
              </div>
              <h2 className="heading-lg mb-6">
                A calling, not a career.
              </h2>
              <div className="space-y-4 body-lg">
                <p>
                  Osita Agusionu founded VIXX Interiors after a moment of clarity during the COVID lockdown. A former 9-to-5 professional, he sat still for the first time and asked himself the right question. Interior design was the answer — not chosen, but recognised. &ldquo;This is what I&apos;m called for,&rdquo; he said. He hasn&apos;t looked back since.
                </p>
                <p>
                  His early internship tested that conviction. Doubted by a mentor — &ldquo;Are you sure you can do this? You&apos;ll be under the sun, under the rain&rdquo; — he simply showed up and kept showing up. As the days passed, he fell deeper in love with the work.
                </p>
                <p>
                  &ldquo;Waking up every morning to go out there and do something that you actually love, and it actually fetches you money — I feel like that&apos;s the highest blessing.&rdquo;
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

      {/* ── The Name ── */}
      <section className="section-pad">
        <div className="container-site">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal>
              <div className="flex items-center gap-3 mb-5">
                <AnimatedLine width={24} delay={0.1} />
                <p className="label-xs">The Name</p>
              </div>
              <h2 className="heading-lg mb-6">
                Named after his mother.
              </h2>
              <div className="space-y-4 body-lg">
                <p>
                  When it came time to name the studio, Osita knew one thing: he didn&apos;t want his own name on the door. He thought of his mother, Victoria — known to everyone as Vicky.
                </p>
                <p>
                  Victoria became Vicky. Vicky became VICKS. VICKS became VIX. A friend&apos;s suggestion added the final X.{' '}
                  <span className="font-cormorant text-xl font-light" style={{ color: 'var(--gold)' }}>VIXX.</span>
                </p>
                <p>
                  &ldquo;Growing up, my mom is my hero, literally. She represents strength, patience, hard work — and that&apos;s what has kept me going.&rdquo;
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal variant="fadeLeft" delay={0.1}>
              <div
                className="relative aspect-square flex flex-col items-center justify-center gap-10"
                style={{ background: 'var(--bg-secondary)' }}
              >
                <Image
                  src="/logo-gold.png"
                  alt="VIXX Interiors"
                  width={220}
                  height={80}
                  className="object-contain"
                />
                <div className="flex flex-col items-center gap-3">
                  {['Strength', 'Patience', 'Hard Work'].map((word) => (
                    <p key={word} className="label-xs tracking-widest">{word}</p>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── Pull Quote ── */}
      <section className="section-pad" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container-site max-w-3xl mx-auto text-center">
          <ScrollReveal>
            <p
              className="font-cormorant font-light italic leading-snug mb-6"
              style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', color: 'var(--text-primary)' }}
            >
              &ldquo;When you get it right, people don&apos;t say &lsquo;I love the design.&rsquo; They say &lsquo;I love being here.&rsquo; That&apos;s the goal.&rdquo;
            </p>
            <p className="label-xs" style={{ color: 'var(--text-secondary)' }}>
              Osita Agusionu — Founder & Creative Director
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Colour & Expression ── */}
      <section className="section-pad">
        <div className="container-site">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <ScrollReveal>
              <div className="flex items-center gap-3 mb-5">
                <AnimatedLine width={24} delay={0.1} />
                <p className="label-xs">On Colour & Expression</p>
              </div>
              <h2 className="heading-lg mb-6">
                A home is not a gallery.
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <div className="space-y-4 body-lg pt-2 lg:pt-16">
                <p>
                  White is beautiful. But a home that is only white is a home that says nothing about the person who lives in it. It is safe — and it is empty of you.
                </p>
                <p>
                  Osita&apos;s question — &ldquo;Can we allow white to breathe?&rdquo; — is a provocation. It challenges the idea that minimalism means colourlessness, that elegance means erasing yourself from your own space.
                </p>
                <p>
                  At VIXX, we believe colour is one of the most powerful tools a home has. The right palette, used with intention, can make a room feel warm or expansive, grounded or alive. It is not about adding more — it is about choosing the colours that speak for you, so that your home tells your story the moment anyone walks through the door.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── Philosophy ── */}
      <section className="section-pad" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container-site">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal>
              <div className="flex items-center justify-center gap-3 mb-5">
                <AnimatedLine width={24} delay={0.1} />
                <p className="label-xs">Our Philosophy</p>
              </div>
              <h2 className="heading-lg text-center mb-14">
                How we think about space.
              </h2>
            </ScrollReveal>

            <div className="grid md:grid-cols-3 gap-px" style={{ background: 'var(--border)' }}>
              {[
                {
                  number: '01',
                  title:  'Simplicity',
                  body:   'A space should feel settled the moment you enter it. We design by subtraction — keeping only what earns its place.',
                },
                {
                  number: '02',
                  title:  'Personal',
                  body:   'Your home should feel like you. We put your personality into every space so that when you are there, you feel comfortable, relaxed, and completely at ease.',
                },
                {
                  number: '03',
                  title:  'Peace',
                  body:   'We want our clients to feel safe. To feel at home. To have peace — away from the noise and chaos of the city. That is what every VIXX project is built for.',
                },
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

      {/* ── Invest in Your Space ── */}
      <section className="section-pad" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container-site">
          <div className="max-w-3xl">
            <ScrollReveal>
              <div className="flex items-center gap-3 mb-5">
                <AnimatedLine width={24} delay={0.1} />
                <p className="label-xs">A Message From Osita</p>
              </div>
              <h2 className="heading-lg mb-8">
                Invest in your space.
              </h2>
              <div className="space-y-4 body-lg">
                <p>
                  We go out there every day. We work. We stress to make the money. And then we come back home — and ignore where we actually live.
                </p>
                <p>
                  Your space deserves better. You deserve better. It doesn&apos;t have to be everything at once. Start somewhere — your bedroom, your living room, a single corner that finally feels like yours. Invest in the place you come home to.
                </p>
                <p style={{ color: 'var(--text-secondary)' }}>
                  Wake up in the morning and be happy to be alive.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section-pad">
        <div className="container-site text-center">
          <ScrollReveal>
            <div className="flex items-center justify-center gap-3 mb-4">
              <AnimatedLine width={24} delay={0.1} />
              <p className="label-xs">Ready to Begin?</p>
            </div>
            <h2 className="heading-lg max-w-xl mx-auto mb-8">
              Let&apos;s tell your story — in your space.
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
