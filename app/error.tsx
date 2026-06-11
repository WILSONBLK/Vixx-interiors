'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { ArrowRight, RefreshCw } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center text-center px-6"
      style={{ background: 'var(--bg-primary)' }}
    >
      <div className="max-w-lg">
        <p className="font-jost text-[0.65rem] tracking-[0.25em] uppercase mb-4" style={{ color: 'var(--gold)' }}>
          Something went wrong
        </p>

        <h1 className="font-cormorant text-3xl sm:text-4xl font-light mb-5" style={{ color: 'var(--text-primary)' }}>
          An unexpected error occurred.
        </h1>

        <p className="font-sans text-base mb-10" style={{ color: 'var(--text-muted)' }}>
          We apologise for the inconvenience. Please try again or return to the homepage.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <button onClick={reset} className="btn-primary">
            <RefreshCw size={14} strokeWidth={1.5} aria-hidden="true" />
            Try Again
          </button>
          <Link href="/" className="btn-outline">
            Return Home
            <ArrowRight size={14} strokeWidth={1.5} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </main>
  )
}
