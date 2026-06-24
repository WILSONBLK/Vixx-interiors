import type { Metadata } from 'next'

export const metadata: Metadata = {
  title:       'Frequently Asked Questions',
  description: 'Answers to common questions about VIXX Interiors — our design process, timelines, budgets, and how to get started.',
  alternates: { canonical: 'https://vixxinteriors.com/faq' },
}

export default function FAQLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
