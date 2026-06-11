import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Navbar }       from '@/components/layout/Navbar'
import { Footer }       from '@/components/layout/Footer'
import { HexMotif }     from '@/components/ui/HexMotif'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { PORTFOLIO_PROJECTS } from '@/lib/data'

export const metadata: Metadata = {
  title:       'Interior Design Portfolio – VIXX Interiors',
  description: 'Browse our completed interior design projects (homes, offices, living spaces). See why clients love our work in Lagos, Nigeria.',
}

const CATEGORIES = ['All', 'Luxury Living Rooms', 'Master Bedrooms', 'Commercial Offices']

export default function PortfolioPage() {
  return (
    <main style={{ background: 'var(--bg-primary)' }}>
      <Navbar />

      {/* ── Hero ── */}
      <section className="relative pt-40 pb-20 overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(196,154,46,0.06) 0%, transparent 65%)' }}
        />
        <div className="container-site relative z-10">
          <ScrollReveal>
            <p className="label-xs mb-5">Our Portfolio</p>
            <h1 className="heading-xl mb-6 max-w-3xl">
              Realized projects that{' '}
              <em className="not-italic" style={{ color: 'var(--gold)' }}>speak for themselves.</em>
            </h1>
            <p className="body-lg max-w-xl">
              Each project begins with a conversation and ends with a space that exceeds what was imagined.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Filter bar ── */}
      <div className="sticky top-[var(--nav-height)] z-30 border-b border-[var(--border)] backdrop-blur-md" style={{ background: 'rgba(2,6,23,0.85)' }}>
        <div className="container-site">
          <div className="flex items-center gap-6 py-4 overflow-x-auto scrollbar-none" role="tablist" aria-label="Filter projects by category">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                role="tab"
                className="font-jost text-[0.65rem] tracking-[0.2em] uppercase whitespace-nowrap transition-colors duration-200 hover:text-[var(--gold)] text-[var(--text-muted)]"
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Projects grid ── */}
      <section className="section-pad">
        <div className="container-site">
          <div className="grid md:grid-cols-2 gap-px" style={{ background: 'var(--border)' }}>
            {PORTFOLIO_PROJECTS.map((project, i) => (
              <ScrollReveal key={project.id} delay={(i % 2) * 0.07} variant="fadeUp">
                <article
                  className="relative group overflow-hidden"
                  style={{ background: 'var(--bg-secondary)' }}
                >
                  <Link href={`/portfolio/${project.slug}`} aria-label={`View ${project.title}`}>
                    {/* Image */}
                    <div className="relative aspect-[4/3] overflow-hidden" style={{ background: 'var(--bg-primary)' }}>
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <div
                        className="absolute inset-0 transition-opacity duration-500 opacity-0 group-hover:opacity-100"
                        style={{ background: 'rgba(2,6,23,0.35)' }}
                      />
                      {/* Hover arrow */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-12 h-12 flex items-center justify-center" style={{ background: 'var(--gold)' }}>
                          <ArrowRight size={18} strokeWidth={1.5} className="text-stone-950" />
                        </div>
                      </div>
                    </div>

                    {/* Info */}
                    <div className="p-6">
                      <p className="label-xs mb-2">{project.category}</p>
                      <h2 className="font-cormorant text-2xl font-light mb-1" style={{ color: 'var(--text-primary)' }}>
                        {project.title}
                      </h2>
                      <p className="font-jost text-xs" style={{ color: 'var(--text-muted)' }}>
                        {project.location} · {project.completedAt}
                      </p>
                    </div>
                  </Link>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section-pad relative overflow-hidden" style={{ background: 'var(--bg-secondary)' }}>
        <HexMotif size={180} variant="dual" opacity={0.04} className="absolute -right-8 top-1/2 -translate-y-1/2" aria-hidden />
        <div className="container-site relative z-10 text-center">
          <ScrollReveal>
            <p className="label-xs mb-4">Start Your Project</p>
            <h2 className="heading-lg max-w-xl mx-auto mb-8">
              Your space could be next.
            </h2>
            <Link href="/contact" className="btn-primary">
              Book a Consultation
              <ArrowRight size={14} strokeWidth={1.5} aria-hidden="true" />
            </Link>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </main>
  )
}
