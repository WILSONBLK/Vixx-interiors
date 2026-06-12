import type { Metadata } from 'next'
import Link from 'next/link'
import { Navbar }       from '@/components/layout/Navbar'
import { Footer }       from '@/components/layout/Footer'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { AnimatedLine } from '@/components/ui/AnimatedLine'

export const metadata: Metadata = {
  title:       'Privacy Policy – VIXX Interiors',
  description: 'How VIXX Interiors collects, uses, and protects your personal information in accordance with the Nigeria Data Protection Regulation (NDPR).',
}

const SECTIONS = [
  {
    number: '01',
    title:  'Information We Collect',
    body: [
      'When you submit a consultation request, contact form, or any enquiry through this website, we collect the personal information you voluntarily provide — including your name, email address, phone number, and details about your project.',
      'We may also collect non-personal technical data such as browser type, device type, pages visited, and approximate location (country/city level) through standard server logs. This data is aggregated and cannot be used to identify you personally.',
    ],
  },
  {
    number: '02',
    title:  'How We Use Your Information',
    body: [
      'We use the information you provide solely to respond to your enquiry, assess your project requirements, and communicate with you about our interior design services.',
      'We do not sell, rent, or share your personal information with third parties for marketing purposes. Where we engage trusted service providers to help operate our website or business, they are bound by strict confidentiality obligations.',
    ],
  },
  {
    number: '03',
    title:  'Data Retention',
    body: [
      'We retain your personal information for as long as necessary to fulfil the purpose for which it was collected — typically for the duration of our professional relationship and up to five (5) years thereafter for business record-keeping.',
      'You may request deletion of your personal data at any time by contacting us at hello@vixxinteriors.com. Valid deletion requests will be actioned within 30 days.',
    ],
  },
  {
    number: '04',
    title:  'Cookies',
    body: [
      'This website uses only a single functional cookie to remember your light or dark theme preference across visits. We do not use advertising cookies, third-party tracking pixels, or cross-site analytics.',
      'You can disable cookies in your browser settings at any time. Doing so will not affect your ability to use this website, though your theme preference will no longer be saved.',
    ],
  },
  {
    number: '05',
    title:  'Data Security',
    body: [
      'We take reasonable technical and organisational measures to protect your personal information from unauthorised access, alteration, disclosure, or destruction. This website is served over HTTPS, and access to stored enquiries is restricted to authorised personnel only.',
      'While we exercise every precaution, no method of data transmission over the internet is 100% secure. We cannot guarantee absolute security, but we are committed to reporting any breach in accordance with applicable law.',
    ],
  },
  {
    number: '06',
    title:  'Your Rights Under the NDPR',
    body: [
      'In compliance with the Nigeria Data Protection Regulation (NDPR) 2019 and its implementing framework, you have the right to: access the personal data we hold about you; request correction of any inaccurate data; request deletion of your data; and object to certain forms of processing.',
      'To exercise any of these rights, please contact us at hello@vixxinteriors.com. We will respond within a reasonable timeframe and at no cost to you.',
    ],
  },
  {
    number: '07',
    title:  'Third-Party Links',
    body: [
      'This website contains links to third-party platforms, including Instagram and WhatsApp. We are not responsible for the privacy practices or content of those platforms. We encourage you to review each platform\'s privacy policy before submitting personal information to them.',
    ],
  },
  {
    number: '08',
    title:  'Changes to This Policy',
    body: [
      'We may update this Privacy Policy periodically to reflect changes in our practices or legal obligations. Any updates will be posted on this page with a revised effective date. Continued use of this website after changes are posted constitutes acceptance of the updated policy.',
    ],
  },
  {
    number: '09',
    title:  'Contact & Data Requests',
    body: [
      'For any questions, concerns, or data requests relating to this Privacy Policy, please reach out to us directly. We are committed to handling your information with the care and discretion our clients deserve.',
    ],
    isContact: true,
  },
]

export default function PrivacyPage() {
  return (
    <main style={{ background: 'var(--bg-primary)' }}>
      <Navbar />

      {/* ── Page header ── */}
      <section className="relative pt-40 pb-16 overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(196,154,46,0.05) 0%, transparent 65%)' }}
        />
        <div className="container-site relative z-10 max-w-3xl">
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-5">
              <AnimatedLine width={24} delay={0.1} />
              <p className="label-xs">Legal</p>
            </div>
            <h1 className="heading-xl mb-4">Privacy Policy</h1>
            <AnimatedLine width={200} className="mb-5" delay={0.25} />
            <p className="body-lg max-w-2xl mb-4">
              We respect your privacy and are committed to handling your personal data with care, transparency, and in compliance with the Nigeria Data Protection Regulation (NDPR) 2019.
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
                          href="mailto:hello@vixxinteriors.com"
                          className="block font-sans text-sm transition-colors duration-200 hover:text-[var(--gold)]"
                          style={{ color: 'var(--text-secondary)' }}
                        >
                          hello@vixxinteriors.com
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
                href="/terms"
                className="font-jost text-[0.65rem] tracking-[0.2em] uppercase transition-colors duration-200 hover:text-[var(--gold)]"
                style={{ color: 'var(--text-muted)' }}
              >
                Terms of Use →
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
