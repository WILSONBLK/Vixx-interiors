import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Navbar }          from '@/components/layout/Navbar'
import { Footer }          from '@/components/layout/Footer'
import { ScrollReveal }    from '@/components/ui/ScrollReveal'
import { AnimatedLine }    from '@/components/ui/AnimatedLine'
import { ProjectGallery }  from '@/components/ui/ProjectGallery'
import { HexMotif }        from '@/components/ui/HexMotif'
import { PORTFOLIO_PROJECTS } from '@/lib/data'

export const metadata: Metadata = {
  title:       'Interior Design Portfolio – VIXX Interiors',
  description: 'Browse our completed interior design projects. See our work in Lagos, Nigeria.',
}

export default function PortfolioPage() {
  return (
    <main style={{ background: 'var(--bg-primary)' }}>
      <Navbar />

      {/* ── Page intro ── */}
      <section className="relative pt-36 pb-16 overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 70% 40% at 50% 0%, rgba(196,154,46,0.05) 0%, transparent 65%)' }}
        />
        <div className="container-site relative z-10">
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-5">
              <AnimatedLine width={24} delay={0.1} />
              <p className="label-xs">Selected Work</p>
            </div>
            <AnimatedLine width={200} delay={0.25} />
          </ScrollReveal>
        </div>
      </section>

      {/* ── Project galleries ── */}
      <section className="pb-4">
        <div className="space-y-1">
          {PORTFOLIO_PROJECTS.map((project) => (
            <ProjectGallery
              key={project.id}
              images={project.images}
            />
          ))}
        </div>
      </section>

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
