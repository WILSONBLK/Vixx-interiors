import type { Metadata } from 'next'
import { Footer }        from '@/components/layout/Footer'
import { LuxuryGallery } from '@/components/ui/LuxuryGallery'
import { BackButton }    from '@/components/ui/BackButton'

export const metadata: Metadata = {
  title:       'Selected Work',
  description: 'Interior design projects by VIXX Interiors — a curated gallery of residential and commercial spaces in Lagos.',
}

export default function PortfolioPage() {
  return (
    <main className="overflow-x-hidden" style={{ background: 'var(--bg-primary)' }}>
      <BackButton />
      <LuxuryGallery />
      <Footer />
    </main>
  )
}
