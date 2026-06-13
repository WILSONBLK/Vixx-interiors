import type { Metadata } from 'next'
import Link from 'next/link'
import { Navbar }       from '@/components/layout/Navbar'
import { Footer }       from '@/components/layout/Footer'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { AnimatedLine } from '@/components/ui/AnimatedLine'

export const metadata: Metadata = {
  title:       'Terms of Use – VIXX Interiors',
  description: 'Terms governing your use of the VIXX Interiors website and engagement with our design services.',
}

const SECTIONS = [
  {
    number: '01',
    title:  'Acceptance of Terms',
    body: [
      'By accessing and using the VIXX Interiors website (vixxinteriors.com), you agree to be bound by these Terms of Use. If you do not agree with any part of these terms, please discontinue your use of this website immediately.',
      'These terms apply to all visitors, enquirers, and clients who access or use the website in any capacity. They do not constitute a service agreement — that is governed by a separate client contract issued at the start of each project engagement.',
    ],
  },
  {
    number: '02',
    title:  'Use of This Website',
    body: [
      'This website is provided for informational purposes — to showcase VIXX Interiors\' work, philosophy, and services, and to facilitate project enquiries. You agree to use this website only for lawful purposes and in a manner consistent with these terms.',
      'You must not attempt to gain unauthorised access to any part of this website or its associated infrastructure; introduce malicious code or disruptive software; or use automated tools to scrape, replicate, or harvest content from this website without prior written consent.',
    ],
  },
  {
    number: '03',
    title:  'Intellectual Property',
    body: [
      'All content on this website — including text, photography, design concepts, mood boards, 3D renderings, graphics, logos, and branding — is the exclusive intellectual property of VIXX Interiors or its licensed content partners. All rights are reserved.',
      'You may not reproduce, distribute, modify, publicly display, or create derivative works from any content on this website without express written permission from VIXX Interiors. Sharing individual images for personal, non-commercial purposes (e.g. Pinterest saves, personal inspiration boards) is permitted, provided credit is clearly attributed to VIXX Interiors.',
    ],
  },
  {
    number: '04',
    title:  'Design Services & Client Engagements',
    body: [
      'Submitting an enquiry through this website does not constitute a service agreement or guarantee the commencement of a project. All design engagements are formalised through a separate written contract between VIXX Interiors and the client, which outlines scope, timelines, fees, and deliverables.',
      'Any project-specific designs, concepts, or documents produced by VIXX Interiors remain the intellectual property of the studio until full payment has been received, at which point rights are transferred to the client as specified in the relevant contract.',
      'Portfolio photography of completed projects may be used by VIXX Interiors for promotional purposes — including on this website, social media, and press submissions — unless the client has explicitly requested confidentiality in writing.',
    ],
  },
  {
    number: '05',
    title:  'Accuracy of Information',
    body: [
      'We strive to ensure that all information on this website is accurate and up to date. However, we make no warranties or representations, express or implied, about the completeness, accuracy, reliability, or suitability of the information for any particular purpose.',
      'Portfolio images represent past project work and are provided for illustrative purposes. Design outcomes vary based on budget, location, site conditions, and individual client requirements.',
    ],
  },
  {
    number: '06',
    title:  'Limitation of Liability',
    body: [
      'To the fullest extent permitted by applicable law, VIXX Interiors shall not be liable for any indirect, incidental, consequential, or punitive damages arising out of your use of, or inability to use, this website or its content.',
      'VIXX Interiors is not responsible for any loss or damage resulting from third-party websites linked from this site, service interruptions, data loss, or unauthorised access to your transmissions.',
    ],
  },
  {
    number: '07',
    title:  'Third-Party Links',
    body: [
      'This website contains links to external platforms including Instagram, WhatsApp, and YouTube. These links are provided for convenience only. VIXX Interiors does not endorse, control, or accept responsibility for the content, privacy practices, or terms of any third-party platform.',
      'Your engagement with third-party platforms is governed solely by their own terms of service and privacy policies.',
    ],
  },
  {
    number: '08',
    title:  'Governing Law & Jurisdiction',
    body: [
      'These Terms of Use are governed by and construed in accordance with the laws of the Federal Republic of Nigeria. Any disputes arising from your use of this website or from these terms shall be subject to the exclusive jurisdiction of the courts of Lagos State, Nigeria.',
    ],
  },
  {
    number: '09',
    title:  'Changes to These Terms',
    body: [
      'We reserve the right to update or revise these Terms of Use at any time. Changes will be posted on this page with a revised effective date. Your continued use of the website following the posting of changes constitutes your acceptance of the revised terms.',
      'We recommend reviewing this page periodically to remain informed of any updates.',
    ],
  },
  {
    number: '10',
    title:  'Contact',
    body: [
      'If you have any questions about these Terms of Use or wish to request permission to use our content, please contact us. We welcome professional enquiries and collaboration requests.',
    ],
    isContact: true,
  },
]

export default function TermsPage() {
  return (
    <main style={{ background: 'var(--bg-primary)' }}>
      <Navbar />

      {/* ── Page header ── */}
      <section className="relative pt-40 pb-16 overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 0%, var(--gold-glow) 0%, transparent 65%)' }}
        />
        <div className="container-site relative z-10 max-w-3xl">
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-5">
              <AnimatedLine width={24} delay={0.1} />
              <p className="label-xs">Legal</p>
            </div>
            <h1 className="heading-xl mb-4">Terms of Use</h1>
            <AnimatedLine width={200} className="mb-5" delay={0.25} />
            <p className="body-lg max-w-2xl mb-4">
              These terms govern your use of the VIXX Interiors website and outline the basis on which we provide our interior design services. Please read them carefully.
            </p>
            <p
              className="font-jost text-[0.65rem] tracking-[0.18em] uppercase"
              style={{ color: 'var(--text-muted)' }}
            >
              Effective date: June 2026 &nbsp;&middot;&nbsp; Last updated: June 2026
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Divider ── */}
      <div className="container-site max-w-3xl">
        <div className="divider-gold" />
      </div>

      {/* ── Content ── */}
      <section className="section-pad">
        <div className="container-site max-w-3xl">
          <div className="space-y-14">
            {SECTIONS.map((section) => (
              <ScrollReveal key={section.number} variant="fadeUp">
                <div className="grid sm:grid-cols-[3rem_1fr] gap-5 sm:gap-8">
                  {/* Number */}
                  <span
                    className="font-cormorant text-2xl font-light leading-none pt-1 flex-shrink-0"
                    style={{ color: 'var(--gold)' }}
                  >
                    {section.number}
                  </span>

                  {/* Content */}
                  <div>
                    <h2
                      className="font-cormorant text-2xl sm:text-3xl font-medium mb-4"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {section.title}
                    </h2>

                    <div className="space-y-4">
                      {section.body.map((para, i) => (
                        <p key={i} className="body-md">
                          {para}
                        </p>
                      ))}
                    </div>

                    {section.isContact && (
                      <div
                        className="mt-6 p-5 space-y-2"
                        style={{ border: '1px solid var(--border)', background: 'var(--bg-secondary)' }}
                      >
                        <p className="font-jost text-[0.65rem] tracking-[0.2em] uppercase mb-3" style={{ color: 'var(--gold)' }}>
                          VIXX Interiors
                        </p>
                        <p className="font-sans text-sm" style={{ color: 'var(--text-secondary)' }}>
                          Lagos, Nigeria
                        </p>
                        <a
                          href="mailto:vixxinteriors@gmail.com"
                          className="block font-sans text-sm transition-colors duration-200 hover:text-[var(--gold)]"
                          style={{ color: 'var(--text-secondary)' }}
                        >
                          vixxinteriors@gmail.com
                        </a>
                        <a
                          href="tel:+2348000000000"
                          className="block font-sans text-sm transition-colors duration-200 hover:text-[var(--gold)]"
                          style={{ color: 'var(--text-secondary)' }}
                        >
                          +234 800 000 0000
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                {/* Section divider */}
                <div className="mt-14 divider-gold" />
              </ScrollReveal>
            ))}
          </div>

          {/* Bottom navigation */}
          <ScrollReveal>
            <div className="mt-16 flex flex-wrap items-center gap-6">
              <Link
                href="/privacy"
                className="font-jost text-[0.65rem] tracking-[0.2em] uppercase transition-colors duration-200 hover:text-[var(--gold)]"
                style={{ color: 'var(--text-muted)' }}
              >
                Privacy Policy →
              </Link>
              <Link
                href="/contact"
                className="font-jost text-[0.65rem] tracking-[0.2em] uppercase transition-colors duration-200 hover:text-[var(--gold)]"
                style={{ color: 'var(--text-muted)' }}
              >
                Contact Us →
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </main>
  )
}
