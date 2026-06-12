import type { Metadata } from 'next'
import { Phone, Mail, MapPin, Instagram } from 'lucide-react'
import { Navbar }       from '@/components/layout/Navbar'
import { Footer }       from '@/components/layout/Footer'
import { HexMotif }     from '@/components/ui/HexMotif'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { ContactForm }  from '@/components/forms/ContactForm'
import { AnimatedLine } from '@/components/ui/AnimatedLine'

export const metadata: Metadata = {
  title:       'Book a Consultation – VIXX Interiors',
  description: 'Book a free design consultation with VIXX Interiors. Tell us about your project (location, budget, timeline) to get started.',
}

export default function ContactPage() {
  return (
    <main style={{ background: 'var(--bg-primary)' }}>
      <Navbar />

      {/* ── Hero ── */}
      <section className="relative pt-40 pb-16 overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(196,154,46,0.06) 0%, transparent 65%)' }}
        />
        <div className="container-site relative z-10 max-w-3xl">
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-5">
              <AnimatedLine width={24} delay={0.1} />
              <p className="label-xs">Start Your Project</p>
            </div>
            <h1 className="heading-xl mb-4">
              Tell us about{' '}
              <em className="not-italic" style={{ color: 'var(--gold)' }}>your space.</em>
            </h1>
            <AnimatedLine width={200} className="mb-6" delay={0.25} />
            <p className="body-lg">
              Fill in the form below and we&apos;ll respond within 24 hours with a tailored proposal. All enquiries are handled in confidence.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Main content ── */}
      <section className="section-pad" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container-site">
          <div className="grid lg:grid-cols-[1fr_0.55fr] gap-16 items-start">

            {/* Form */}
            <ScrollReveal>
              <ContactForm />
            </ScrollReveal>

            {/* Sidebar */}
            <ScrollReveal delay={0.1} variant="fadeLeft">
              <div className="space-y-10">

                {/* Contact details */}
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <AnimatedLine width={24} delay={0.1} />
                    <p className="label-xs">Get in Touch</p>
                  </div>
                  <ul className="space-y-5">
                    <li className="flex items-start gap-4">
                      <MapPin size={16} strokeWidth={1.5} className="mt-0.5 flex-shrink-0" style={{ color: 'var(--gold)' }} />
                      <div>
                        <p className="font-sans text-sm" style={{ color: 'var(--text-secondary)' }}>Lagos, Nigeria</p>
                        <p className="font-jost text-[0.65rem] tracking-wide mt-0.5" style={{ color: 'var(--text-muted)' }}>
                          Serving Nigeria & internationally
                        </p>
                      </div>
                    </li>
                    <li>
                      <a
                        href="tel:+2348000000000"
                        className="flex items-center gap-4 font-sans text-sm transition-colors duration-200 hover:text-[var(--gold)]"
                        style={{ color: 'var(--text-secondary)' }}
                      >
                        <Phone size={16} strokeWidth={1.5} style={{ color: 'var(--gold)' }} />
                        +234 800 000 0000
                      </a>
                    </li>
                    <li>
                      <a
                        href="mailto:hello@vixxinteriors.com"
                        className="flex items-center gap-4 font-sans text-sm transition-colors duration-200 hover:text-[var(--gold)]"
                        style={{ color: 'var(--text-secondary)' }}
                      >
                        <Mail size={16} strokeWidth={1.5} style={{ color: 'var(--gold)' }} />
                        hello@vixxinteriors.com
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://instagram.com/vixxinteriors"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-4 font-sans text-sm transition-colors duration-200 hover:text-[var(--gold)]"
                        style={{ color: 'var(--text-secondary)' }}
                      >
                        <Instagram size={16} strokeWidth={1.5} style={{ color: 'var(--gold)' }} />
                        @vixxinteriors
                      </a>
                    </li>
                  </ul>
                </div>

                {/* Divider */}
                <div className="divider-gold" />

                {/* What to expect */}
                <div>
                  <div className="flex items-center gap-3 mb-5">
                    <AnimatedLine width={24} delay={0.2} />
                    <p className="label-xs">What to Expect</p>
                  </div>
                  <div className="space-y-4">
                    {[
                      { step: '01', text: 'We\'ll acknowledge your enquiry within a few hours.' },
                      { step: '02', text: 'A team member will reach out to arrange a brief call.' },
                      { step: '03', text: 'We\'ll send a tailored proposal within 48 hours.' },
                      { step: '04', text: 'Project begins on a date that suits your timeline.' },
                    ].map((item) => (
                      <div key={item.step} className="flex items-start gap-4">
                        <span className="font-cormorant text-lg font-light flex-shrink-0 w-6" style={{ color: 'var(--gold)' }}>
                          {item.step}
                        </span>
                        <p className="font-sans text-sm" style={{ color: 'var(--text-muted)' }}>{item.text}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quote */}
                <div
                  className="p-6"
                  style={{ border: '1px solid rgba(196,154,46,0.15)', background: 'rgba(196,154,46,0.03)' }}
                >
                  <HexMotif size="xs" opacity={0.5} className="mb-3" />
                  <blockquote>
                    <p className="font-cormorant text-lg font-light leading-snug" style={{ color: 'var(--text-primary)' }}>
                      &ldquo;We start every project by listening — deeply — before we design anything.&rdquo;
                    </p>
                    <footer className="mt-3">
                      <p className="label-xs opacity-70">Osita Agusionu, Founder</p>
                    </footer>
                  </blockquote>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
