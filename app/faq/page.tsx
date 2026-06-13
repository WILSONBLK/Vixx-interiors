'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Plus, Minus } from 'lucide-react'
import { Navbar }       from '@/components/layout/Navbar'
import { Footer }       from '@/components/layout/Footer'
import { HexMotif }     from '@/components/ui/HexMotif'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { FAQ_ITEMS } from '@/lib/data'
import { AnimatedLine } from '@/components/ui/AnimatedLine'

function FAQItem({ question, answer, isOpen, onToggle }: {
  question: string
  answer:   string
  isOpen:   boolean
  onToggle: () => void
}) {
  return (
    <div style={{ borderBottom: '1px solid var(--border)' }}>
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between gap-6 py-6 text-left"
      >
        <span
          className="font-cormorant text-xl sm:text-2xl font-light"
          style={{ color: 'var(--text-primary)' }}
        >
          {question}
        </span>
        <span
          className="flex-shrink-0 w-7 h-7 flex items-center justify-center border transition-colors duration-200"
          style={{
            border: '1px solid var(--border)',
            color: isOpen ? 'var(--gold)' : 'var(--text-muted)',
          }}
        >
          {isOpen
            ? <Minus size={13} strokeWidth={1.5} />
            : <Plus  size={13} strokeWidth={1.5} />
          }
        </span>
      </button>

      <div
        className="overflow-hidden transition-all duration-500 ease-out"
        style={{ maxHeight: isOpen ? '300px' : '0px', opacity: isOpen ? 1 : 0 }}
      >
        <p className="body-lg pb-6 max-w-2xl">{answer}</p>
      </div>
    </div>
  )
}

export default function FAQPage() {
  const [openId, setOpenId] = useState<string | null>(null)

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
        <div className="container-site relative z-10 max-w-3xl">
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-5">
              <AnimatedLine width={24} delay={0.1} />
              <p className="label-xs">Frequently Asked Questions</p>
            </div>
            <h1 className="heading-xl mb-4">
              Everything you need{' '}
              <em className="not-italic" style={{ color: 'var(--gold)' }}>to know.</em>
            </h1>
            <AnimatedLine width={200} className="mb-6" delay={0.25} />
            <p className="body-lg">
              We believe in complete transparency from the first conversation. Here are the questions we hear most often — answered honestly.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── FAQ list ── */}
      <section className="section-pad" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container-site">
          <div className="max-w-3xl mx-auto">
            {FAQ_ITEMS.map((item) => (
              <ScrollReveal key={item.id} variant="fadeUp">
                <FAQItem
                  question={item.question}
                  answer={item.answer}
                  isOpen={openId === item.id}
                  onToggle={() => setOpenId(openId === item.id ? null : item.id)}
                />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Still have questions? ── */}
      <section className="section-pad relative overflow-hidden">
        <HexMotif size={180} variant="outline" opacity={0.04} className="absolute -right-8 top-1/2 -translate-y-1/2" aria-hidden />
        <div className="container-site relative z-10">
          <div className="max-w-2xl">
            <ScrollReveal>
              <div className="flex items-center gap-3 mb-4">
                <AnimatedLine width={24} delay={0.1} />
                <p className="label-xs">Still Have Questions?</p>
              </div>
              <h2 className="heading-lg mb-6">
                We&apos;re happy to talk it through.
              </h2>
              <p className="body-lg mb-8">
                Every project is different. If your question isn&apos;t covered here, reach out directly — we&apos;ll give you a straight answer, not a sales pitch.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/contact" className="btn-primary">
                  Get in Touch
                  <ArrowRight size={14} strokeWidth={1.5} aria-hidden="true" />
                </Link>
                <a
                  href="https://wa.me/2348000000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline"
                >
                  WhatsApp Us
                </a>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
