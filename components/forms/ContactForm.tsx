'use client'

import { useState } from 'react'
import { ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { BUDGET_OPTIONS, TIMELINE_OPTIONS, PROJECT_TYPE_OPTIONS, SERVICES } from '@/lib/data'

type Status = 'idle' | 'submitting' | 'success' | 'error'

export function ContactForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [errors, setErrors] = useState<Record<string, string>>({})

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)

    // Client-side validation
    const newErrors: Record<string, string> = {}
    const required = ['name', 'email', 'phone', 'location', 'projectType', 'budget']
    required.forEach((field) => {
      if (!data.get(field)) newErrors[field] = 'This field is required'
    })

    const email = data.get('email') as string
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setErrors({})
    setStatus('submitting')

    try {
      // Simulate API call — replace with /api/consultation POST
      await new Promise((res) => setTimeout(res, 1200))
      setStatus('success')
      form.reset()
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center text-center py-16 gap-5">
        <CheckCircle2 size={40} strokeWidth={1.5} style={{ color: 'var(--gold)' }} />
        <h3 className="heading-md">Thank you for reaching out.</h3>
        <p className="body-md max-w-sm">
          We&apos;ve received your enquiry and will respond within 24 hours with a tailored proposal.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="btn-outline mt-2"
        >
          Send Another Enquiry
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      {/* Honeypot */}
      <input type="text" name="faxNumber" className="hidden" tabIndex={-1} aria-hidden="true" />

      {/* Row 1: Name + Email */}
      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="input-label">Full Name *</label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            placeholder="Adaeze Johnson"
            className={cn('input-field', errors.name && 'input-error')}
            aria-describedby={errors.name ? 'name-error' : undefined}
          />
          {errors.name && (
            <p id="name-error" role="alert" className="field-error">{errors.name}</p>
          )}
        </div>
        <div>
          <label htmlFor="email" className="input-label">Email Address *</label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="hello@example.com"
            className={cn('input-field', errors.email && 'input-error')}
            aria-describedby={errors.email ? 'email-error' : undefined}
          />
          {errors.email && (
            <p id="email-error" role="alert" className="field-error">{errors.email}</p>
          )}
        </div>
      </div>

      {/* Row 2: Phone + Location */}
      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="phone" className="input-label">Phone Number *</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            required
            placeholder="+234 800 000 0000"
            className={cn('input-field', errors.phone && 'input-error')}
            aria-describedby={errors.phone ? 'phone-error' : undefined}
          />
          {errors.phone && (
            <p id="phone-error" role="alert" className="field-error">{errors.phone}</p>
          )}
        </div>
        <div>
          <label htmlFor="location" className="input-label">Project Location *</label>
          <input
            id="location"
            name="location"
            type="text"
            required
            placeholder="Lekki Phase 1, Lagos"
            className={cn('input-field', errors.location && 'input-error')}
            aria-describedby={errors.location ? 'location-error' : undefined}
          />
          {errors.location && (
            <p id="location-error" role="alert" className="field-error">{errors.location}</p>
          )}
        </div>
      </div>

      {/* Row 3: Project Type + Budget */}
      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="projectType" className="input-label">Project Type *</label>
          <select
            id="projectType"
            name="projectType"
            required
            className={cn('input-field', errors.projectType && 'input-error')}
            defaultValue=""
          >
            <option value="" disabled>Select type…</option>
            {PROJECT_TYPE_OPTIONS.map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
          {errors.projectType && (
            <p role="alert" className="field-error">{errors.projectType}</p>
          )}
        </div>
        <div>
          <label htmlFor="budget" className="input-label">Budget Range *</label>
          <select
            id="budget"
            name="budget"
            required
            className={cn('input-field', errors.budget && 'input-error')}
            defaultValue=""
          >
            <option value="" disabled>Select budget…</option>
            {BUDGET_OPTIONS.map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
          {errors.budget && (
            <p role="alert" className="field-error">{errors.budget}</p>
          )}
        </div>
      </div>

      {/* Row 4: Timeline + Services */}
      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="timeline" className="input-label">Timeline</label>
          <select id="timeline" name="timeline" className="input-field" defaultValue="">
            <option value="" disabled>Select timeline…</option>
            {TIMELINE_OPTIONS.map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="service" className="input-label">Service Interested In</label>
          <select id="service" name="service" className="input-field" defaultValue="">
            <option value="" disabled>Select service…</option>
            {SERVICES.map((s) => (
              <option key={s.id} value={s.id}>{s.title}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="input-label">Tell Us More (optional)</label>
        <textarea
          id="message"
          name="message"
          rows={4}
          maxLength={500}
          placeholder="Describe your space, your vision, or any specific requirements…"
          className="input-field resize-none"
        />
      </div>

      {/* Privacy note */}
      <p className="font-sans text-xs" style={{ color: 'var(--text-muted)' }}>
        Your information is confidential and will only be used to respond to your enquiry.
      </p>

      {/* Submit */}
      <div className="flex items-center gap-4 flex-wrap">
        <button
          type="submit"
          disabled={status === 'submitting'}
          className={cn(
            'btn-primary',
            status === 'submitting' && 'opacity-70 cursor-not-allowed',
          )}
        >
          {status === 'submitting' ? 'Sending…' : 'Request Consultation'}
          {status !== 'submitting' && <ArrowRight size={14} strokeWidth={1.5} aria-hidden="true" />}
        </button>

        {status === 'error' && (
          <div
            className="flex items-center gap-2 text-sm"
            style={{ color: 'var(--color-error)' }}
            role="alert"
          >
            <AlertCircle size={14} strokeWidth={1.5} />
            <span>Something went wrong. Please try again.</span>
          </div>
        )}
      </div>
    </form>
  )
}
