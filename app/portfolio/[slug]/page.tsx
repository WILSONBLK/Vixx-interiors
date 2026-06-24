import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Footer }          from '@/components/layout/Footer'
import { HexMotif }        from '@/components/ui/HexMotif'
import { ScrollReveal }    from '@/components/ui/ScrollReveal'
import { PORTFOLIO_PROJECTS } from '@/lib/data'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return PORTFOLIO_PROJECTS.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const project = PORTFOLIO_PROJECTS.find((p) => p.slug === slug)
  if (!project) return { title: 'Project Not Found' }
  return {
    title:       project.title,
    description: project.description,
    alternates: { canonical: `https://vixxinteriors.com/portfolio/${slug}` },
  }
}

export default async function PortfolioDetailPage({ params }: Props) {
  const { slug } = await params
  const project = PORTFOLIO_PROJECTS.find((p) => p.slug === slug)
  if (!project) notFound()

  const otherProjects = PORTFOLIO_PROJECTS.filter((p) => p.slug !== slug).slice(0, 2)

  return (
    <main style={{ background: 'var(--bg-primary)' }}>

      {/* ── Hero image ── */}
      <section className="relative h-[70vh] min-h-[480px] overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, var(--overlay-light) 0%, var(--overlay-mid) 100%)' }}
        />
        <div className="absolute inset-0 flex flex-col justify-end pb-14">
          <div className="container-site">
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 font-jost text-xs tracking-[0.15em] uppercase transition-colors duration-200"
              style={{ color: 'rgba(240,235,225,0.65)' }}
            >
              <ArrowLeft size={13} strokeWidth={1.5} />
              All Projects
            </Link>
          </div>
        </div>
      </section>

      {/* ── Quotes ── */}
      <section
        className="relative overflow-hidden py-20 lg:py-32"
        style={{ background: 'var(--bg-secondary)' }}
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 60% 60% at 50% 50%, var(--gold-glow) 0%, transparent 68%)' }}
        />

        <div className="container-site relative z-10 max-w-3xl mx-auto px-6 text-center">
          <ScrollReveal variant="fadeIn">
            <p
              className="font-cormorant italic font-light leading-snug mb-8"
              style={{ fontSize: 'clamp(1.45rem, 2.8vw, 2.4rem)', color: 'var(--text-primary)' }}
            >
              &ldquo;{project.quotes[0]}&rdquo;
            </p>

            <div className="flex items-center justify-center gap-4 mb-8">
              <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, transparent, var(--gold-line))' }} />
              <div style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--gold)', opacity: 0.55 }} />
              <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to left, transparent, var(--gold-line))' }} />
            </div>

            <p
              className="font-cormorant italic font-light leading-snug"
              style={{ fontSize: 'clamp(1.1rem, 2vw, 1.65rem)', color: 'var(--text-secondary)' }}
            >
              &ldquo;{project.quotes[1]}&rdquo;
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Other projects ── */}
      {otherProjects.length > 0 && (
        <section className="section-pad" style={{ background: 'var(--bg-primary)' }}>
          <div className="container-site">
            <ScrollReveal>
              <div className="flex items-center justify-between mb-10">
                <p className="label-xs">More Projects</p>
                <Link href="/portfolio" className="btn-ghost">
                  View all <ArrowRight size={13} strokeWidth={1.5} aria-hidden="true" />
                </Link>
              </div>
            </ScrollReveal>
            <div className="grid md:grid-cols-2 gap-px" style={{ background: 'var(--border)' }}>
              {otherProjects.map((p, i) => (
                <ScrollReveal key={p.id} delay={i * 0.07} variant="fadeUp">
                  <Link
                    href={`/portfolio/${p.slug}`}
                    className="group block relative overflow-hidden"
                    style={{ background: 'var(--bg-primary)' }}
                    aria-label={`View ${p.title}`}
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={p.image}
                        alt={p.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: 'var(--overlay-light)' }} />
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA ── */}
      <section className="section-pad relative overflow-hidden">
        <HexMotif size={200} variant="dual" opacity={0.04} className="absolute -right-12 top-1/2 -translate-y-1/2" aria-hidden />
        <div className="container-site relative z-10 text-center">
          <ScrollReveal>
            <p className="label-xs mb-4">Inspired?</p>
            <h2 className="heading-lg max-w-xl mx-auto mb-8">
              Let&apos;s create something this good for your space.
            </h2>
            <Link href="/start" className="btn-primary">
              Start a Project
              <ArrowRight size={14} strokeWidth={1.5} aria-hidden="true" />
            </Link>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </main>
  )
}
