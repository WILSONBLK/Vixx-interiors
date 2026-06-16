import type { Metadata } from 'next'
import { Footer }        from '@/components/layout/Footer'
import { LuxuryGallery } from '@/components/ui/LuxuryGallery'

export const metadata: Metadata = {
  title:       'Selected Work — VIXX Interiors',
  description: 'Interior design projects by VIXX Interiors — a curated gallery of residential and commercial spaces in Lagos.',
}

export default function PortfolioPage() {
  return (
    <main className="overflow-x-hidden" style={{ background: 'var(--bg-primary)' }}>

      <LuxuryGallery />
      <Footer />
    </main>
  )
}
