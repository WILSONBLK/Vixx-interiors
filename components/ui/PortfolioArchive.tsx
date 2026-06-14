'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { PORTFOLIO_PROJECTS } from '@/lib/data'

/*
 * PortfolioArchive — editorial 3-col image grid used as an archive / overview.
 * Desktop: asymmetric spans (2+1, 1+1+1, 1+2 pattern).
 * Mobile: uniform 2-col grid.
 */

const SPANS: (1 | 2)[] = [
  2, 1,
  1, 1, 1,
  1, 2,
  2, 1,
  1, 1, 1,
  1, 2,
  2, 1,
]

export function PortfolioArchive() {
  const entries = PORTFOLIO_PROJECTS.flatMap((p) =>
    p.images.map((src) => ({ src, title: p.title, slug: p.slug }))
  ).slice(0, SPANS.length)

  return (
    <section style={{ background: 'var(--bg-primary)' }}>

      {/* Desktop 3-col editorial grid */}
      <ScrollReveal>
        <div
          className="hidden md:grid md:grid-cols-3"
          style={{ gap: '3px', padding: '0 3px' }}
        >
          {entries.map((entry, i) => (
            <Link
              key={`${entry.src}-${i}`}
              href={`/portfolio/${entry.slug}`}
              aria-label={`View project — ${entry.title}`}
              className={`group block ${SPANS[i] === 2 ? 'col-span-2' : 'col-span-1'}`}
            >
              <div
                className="relative overflow-hidden"
                style={{ height: '280px', background: 'var(--bg-secondary)' }}
              >
                <Image
                  src={entry.src}
                  alt=""
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  sizes={SPANS[i] === 2 ? '66vw' : '34vw'}
                  loading="lazy"
                />
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: 'var(--overlay-subtle)' }}
                />
              </div>
            </Link>
          ))}
        </div>
      </ScrollReveal>

      {/* Mobile 2-col uniform grid */}
      <ScrollReveal>
        <div
          className="grid grid-cols-2 md:hidden"
          style={{ gap: '3px', padding: '0 3px' }}
        >
          {entries.map((entry, i) => (
            <Link
              key={`${entry.src}-m-${i}`}
              href={`/portfolio/${entry.slug}`}
              aria-label={`View project — ${entry.title}`}
              className="group block"
            >
              <div
                className="relative overflow-hidden aspect-[4/3]"
                style={{ background: 'var(--bg-secondary)' }}
              >
                <Image
                  src={entry.src}
                  alt=""
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  sizes="50vw"
                  loading="lazy"
                />
              </div>
            </Link>
          ))}
        </div>
      </ScrollReveal>

      <div className="pb-4" />
    </section>
  )
}
