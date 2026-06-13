import Image from 'next/image'
import Link from 'next/link'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { AnimatedLine } from '@/components/ui/AnimatedLine'
import { PORTFOLIO_PROJECTS } from '@/lib/data'

/*
 * Editorial asymmetric grid — 3-col desktop, 2-col mobile.
 *
 * SPAN pattern for 3 cols (each row sums to 3):
 *   Row 1: 2 + 1  →  2 items
 *   Row 2: 1 + 1 + 1  →  3 items
 *   Row 3: 1 + 2  →  2 items
 *   Row 4: 2 + 1  →  2 items
 *   Row 5: 1 + 1 + 1  →  3 items
 *   Row 6: 1 + 2  →  2 items
 *   Row 7: 2 + 1  →  2 items
 *  Total: 16 items
 *
 * On mobile the spans are removed so every item is 1 col (uniform 2-col grid).
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
  /* Flat list of every image across every project, paired with its project */
  const entries = PORTFOLIO_PROJECTS.flatMap((p) =>
    p.images.map((src) => ({ src, title: p.title, slug: p.slug }))
  ).slice(0, SPANS.length)

  return (
    <section style={{ background: 'var(--bg-primary)' }}>

      {/* ── Section label ── */}
      <div className="container-site pt-20 pb-10">
        <ScrollReveal>
          <div className="flex items-center gap-4 mb-3">
            <AnimatedLine width={24} delay={0.1} />
            <p className="label-xs">Archive</p>
          </div>
          <p
            className="font-jost font-light"
            style={{
              fontSize:      '0.7rem',
              letterSpacing: '0.1em',
              color:         'var(--text-muted)',
              maxWidth:      '36ch',
            }}
          >
            All project imagery — drag each image to explore individual works.
          </p>
        </ScrollReveal>
      </div>

      {/* ── Desktop: 3-col editorial grid (md+) ── */}
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
              {/* Image cell — fixed height so rows stay consistent */}
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
                {/* Barely-there hover veil */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: 'var(--overlay-subtle)' }}
                />
              </div>
            </Link>
          ))}
        </div>
      </ScrollReveal>

      {/* ── Mobile: 2-col uniform grid (< md) ── */}
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
