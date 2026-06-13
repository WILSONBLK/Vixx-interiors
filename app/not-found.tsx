import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { HexMotif } from '@/components/ui/HexMotif'

export default function NotFound() {
  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center text-center px-6 relative overflow-hidden"
      style={{ background: 'var(--bg-primary)' }}
    >
      <HexMotif size={280} variant="dual" opacity={0.03} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" aria-hidden />

      <div className="relative z-10 max-w-lg">
        <span
          className="font-cormorant text-[8rem] sm:text-[10rem] font-light leading-none block"
          style={{ color: 'var(--gold-ghost)' }}
          aria-hidden="true"
        >
          404
        </span>

        <p className="font-jost text-[0.65rem] tracking-[0.25em] uppercase mb-4" style={{ color: 'var(--gold)' }}>
          Page Not Found
        </p>

        <h1 className="font-cormorant text-3xl sm:text-4xl font-light mb-5" style={{ color: 'var(--text-primary)' }}>
          This space doesn&apos;t exist — yet.
        </h1>

        <p className="font-sans text-base mb-10 leading-relaxed" style={{ color: 'var(--text-muted)' }}>
          The page you&apos;re looking for may have moved, or the link may be incorrect. Let us take you somewhere more interesting.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link href="/" className="btn-primary">
            Return Home
            <ArrowRight size={14} strokeWidth={1.5} aria-hidden="true" />
          </Link>
          <Link href="/portfolio" className="btn-outline">View Our Work</Link>
        </div>
      </div>
    </main>
  )
}
