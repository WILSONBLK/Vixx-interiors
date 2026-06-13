import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Navbar }          from '@/components/layout/Navbar'
import { Footer }          from '@/components/layout/Footer'
import { ScrollReveal }    from '@/components/ui/ScrollReveal'
import { AnimatedLine }    from '@/components/ui/AnimatedLine'
import { ProjectGallery }   from '@/components/ui/ProjectGallery'
import { PortfolioArchive }  from '@/components/ui/PortfolioArchive'
import { HexMotif }          from '@/components/ui/HexMotif'
import { PORTFOLIO_PROJECTS } from '@/lib/data'

export const metadata: Metadata = {
  title:       'Interior Design Portfolio – VIXX Interiors',
  description: 'Browse our completed interior design projects. See our work in Lagos, Nigeria.',
}

export default function PortfolioPage() {
  return (
    <main style={{ background: 'var(--bg-primary)' }}>
      <Navbar />

      {/* ── Hero — full-bleed image with page title ── */}
      <section className="relative overflow-hidden" style={{ height: '72vh', minHeight: '500px' }}>
        <Image
          src="/images/portfolio/living-room-1.jpg"
          alt="VIXX Interiors – selected work"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        {/* Lightweight overlay — image vivid, bottom darkened for title legibility */}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, var(--overlay-subtle) 0%, var(--overlay-mid) 100%)' }}
        />

        {/* Title anchored to bottom */}
        <div className="absolute inset-0 flex flex-col justify-end">
          <div className="container-site pb-16 lg:pb-20">
            <ScrollReveal>
              <div className="flex items-center gap-3 mb-4">
                <AnimatedLine width={24} delay={0.1} />
                <p
                  className="font-jost text-[0.58rem] tracking-[0.32em] uppercase"
                  style={{ color: 'var(--gold-text)' }}
                >
                  Selected Work
                </p>
              </div>
              <h1
                className="font-cormorant font-light text-[var(--brand-cream)]"
                style={{ fontSize: 'clamp(3.5rem, 8vw, 7rem)', lineHeight: 0.92 }}
              >
                Our Portfolio
              </h1>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── Project galleries with labeled headers ── */}
      <section className="pt-16 pb-4">
        <div className="space-y-16">
          {PORTFOLIO_PROJECTS.map((project, i) => (
            <div key={project.id}>
              {/* Project label header */}
              <ScrollReveal>
                <div className="container-site pb-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-5">
                      {/* Ghost number */}
                      <span
                        aria-hidden="true"
                        className="font-cormorant font-light select-none"
                        style={{
                          fontSize: 'clamp(2.5rem, 4vw, 3.5rem)',
                          lineHeight: 1,
                          color: 'var(--gold-ghost)',
                        }}
                      >
                        0{i + 1}
                      </span>
                      <div>
                        <p className="label-xs mb-1">{project.category}</p>
                        <Link href={`/portfolio/${project.slug}`}>
                          <h2
                            className="font-cormorant font-light transition-colors duration-300 hover:text-[var(--gold)]"
                            style={{
                              fontSize: 'clamp(1.5rem, 2.5vw, 2.25rem)',
                              color: 'var(--text-primary)',
                            }}
                          >
                            {project.title}
                          </h2>
                        </Link>
                      </div>
                    </div>
                    <Link
                      href={`/portfolio/${project.slug}`}
                      className="btn-ghost hidden sm:inline-flex"
                      aria-label={`View full details for ${project.title}`}
                    >
                      View Project
                      <ArrowRight size={12} strokeWidth={1.5} aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </ScrollReveal>

              <ProjectGallery images={project.images} />
            </div>
          ))}
        </div>
      </section>

      {/* ── Archive grid ── */}
      <PortfolioArchive />

      {/* ── CTA ── */}
      <section className="section-pad relative overflow-hidden" style={{ background: 'var(--bg-secondary)' }}>
        <HexMotif size={180} variant="dual" opacity={0.04} className="absolute -right-8 top-1/2 -translate-y-1/2" aria-hidden />
        <div className="container-site relative z-10 text-center">
          <ScrollReveal>
            <div className="flex items-center justify-center gap-3 mb-5">
              <AnimatedLine width={24} delay={0.1} />
              <p className="label-xs">Start a Project</p>
            </div>
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
