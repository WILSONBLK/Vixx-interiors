import type { Metadata } from 'next'
import { Suspense } from 'react'
import { StartProjectFlow } from '@/components/ui/StartProject/StartProjectFlow'

export const metadata: Metadata = {
  title: 'Start a Project',
  description: 'Begin your interior design journey with VIXX Interiors. Tell us about your space and we\'ll guide you from first conversation to finished room.',
}

export default function StartProjectPage() {
  return (
    <Suspense>
      <StartProjectFlow />
    </Suspense>
  )
}
