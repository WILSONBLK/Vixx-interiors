import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Footer }          from '@/components/layout/Footer'
import { HexMotif }        from '@/components/ui/HexMotif'
import { ScrollReveal }    from '@/components/ui/ScrollReveal'
import { ProjectGallery }  from '@/components/ui/ProjectGallery'
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
  if (!project) return { title: 'Project Not Found – VIXX Interiors' }
  return {
    title:       `${project.title} – VIXX Interiors Portfolio`,
    description: project.description,
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
      <section className="relative h-[60vh] min-h-[420px] overflow-hidden">
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
        <div className="absolute inset-0 flex flex-col justify-end pb-12">
          <div className="container-site">
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 mb-6 font-jost text-xs tracking-[0.15em] uppercase transition-colors duration-200"
              style={{ color: 'rgba(240,235,225,0.65)' }}
            >
              <ArrowLeft size={13} strokeWidth={1.5} />
              All Projects
            </Link>
            <h1 className="font-cormorant text-4xl sm:text-5xl lg:text-6xl font-light text-[var(--brand-cream)]">
              {project.title}
            </h1>
          </div>
        </div>
      </section>

      {/* ── Overview ── */}
      <section className="section-pad" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container-site">
          <div className="grid lg:grid-cols-[1fr_0.6fr] gap-16 items-start">
            <ScrollReveal>
              <p className="label-xs mb-5">Project Overview</p>
              <p className="font-cormorant text-2xl lg:text-3xl font-light leading-snug mb-8" style={{ color: 'var(--text-primary)' }}>
                {project.overview}
              </p>
              <div className="divider-gold mb-8" />
              <div className="space-y-8">
                <div>
                  <p className="label-xs mb-3">The Challenge</p>
                  <p className="body-lg">{project.challenge}</p>
                </div>
                <div>
                  <p className="label-xs mb-3">The Solution</p>
                  <p className="body-lg">{project.solution}</p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1} variant="fadeLeft">
              <div className="space-y-8">
                {/* Materials */}
                <div
                  className="p-7"
                  style={{ border: '1px solid var(--border)', background: 'var(--bg-card)' }}
                >
                  <p className="label-xs mb-5">Materials & Finishes</p>
                  <ul className="space-y-3">
                    {project.materials.map((m) => (
                      <li key={m} className="flex items-center gap-3">
                        <span className="w-1 h-1 flex-shrink-0" style={{ background: 'var(--gold)' }} />
                        <span className="font-jost text-xs tracking-wide" style={{ color: 'var(--text-muted)' }}>{m}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── Image gallery ── */}
      <section className="py-12">
        <ScrollReveal>
          <p className="label-xs mb-8 container-site">Project Photography</p>
        </ScrollReveal>
        <ProjectGallery
          images={project.images}
          height="clamp(300px, 65vh, 660px)"
        />
      </section>

      {/* ── Other projects ── */}
      {otherProjects.length > 0 && (
        <section className="section-pad" style={{ background: 'var(--bg-secondary)' }}>
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
