'use client'

import { useState, useCallback } from 'react'
import { ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { BUDGET_OPTIONS, TIMELINE_OPTIONS, PROJECT_TYPE_OPTIONS, SERVICES } from '@/lib/data'

type Status = 'idle' | 'submitting' | 'success' | 'error'

const REQUIRED_FIELDS = ['name', 'email', 'phone', 'location', 'projectType', 'budget']

function validateField(name: string, value: string): string {
  const trimmed = value.trim()
  if (REQUIRED_FIELDS.includes(name) && !trimmed) return 'This field is required'
  if (!trimmed) return ''

  if (name === 'name') {
    if (!/^[\p{L}\s'\-.]+$/u.test(trimmed))
      return 'Please use letters only — no numbers or symbols'
  }
  if (name === 'email') {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed))
      return 'Please enter a valid email address'
  }
  if (name === 'phone') {
    if (!/^\+?[\d\s\-().]{7,}$/.test(trimmed))
      return 'Please enter a valid phone number (digits, spaces, + or - only)'
  }
  return ''
}

// iOS Safari keeps the page zoomed after focus on a small input.
// Temporarily adding maximum-scale=1 forces a zoom-reset, then we restore
// the original viewport so manual zoom is still possible.
function resetViewportZoom() {
  if (typeof document === 'undefined') return
  const meta = document.querySelector<HTMLMetaElement>('meta[name="viewport"]')
  if (!meta) return
  const original = meta.content
  if (original.includes('maximum-scale')) return
  meta.content = original + ',maximum-scale=1'
  setTimeout(() => { meta.content = original }, 80)
}

export function ContactForm() {
  const [status,      setStatus]      = useState<Status>('idle')
  const [errors,      setErrors]      = useState<Record<string, string>>({})
  const [submitError, setSubmitError] = useState('')

  const handleBlur = useCallback((
    e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    const error = validateField(name, value)
    setErrors(prev => {
      if (!error && !prev[name]) return prev
      const next = { ...prev }
      if (error) next[name] = error
      else delete next[name]
      return next
    })
    resetViewportZoom()
  }, [])

  const handleChange = useCallback((
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name } = e.target
    setErrors(prev => {
      if (!prev[name]) return prev
      const next = { ...prev }
      delete next[name]
      return next
    })
  }, [])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)

    const newErrors: Record<string, string> = {}
    REQUIRED_FIELDS.forEach((field) => {
      const val = (data.get(field) as string) || ''
      const err = validateField(field, val)
      if (err) newErrors[field] = err
    })

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setErrors({})
    setStatus('submitting')

    try {
      const res = await fetch('https://formspree.io/f/xlgygydy', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          name:        data.get('name'),
          email:       data.get('email'),
          phone:       data.get('phone'),
          location:    data.get('location'),
          projectType: data.get('projectType'),
          budget:      data.get('budget'),
          timeline:    data.get('timeline'),
          service:     data.get('service'),
          message:     data.get('message'),
          source:      'contact-form',
        }),
      })

      if (!res.ok) {
        const json = await res.json().catch(() => ({}))
        const msg = (json as { errors?: Array<{ message: string }> }).errors?.[0]?.message
        throw new Error(msg ?? 'Submission failed')
      }

      setStatus('success')
      setSubmitError('')
      form.reset()
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
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
            maxLength={100}
            className={cn('input-field', errors.name && 'input-error')}
            aria-describedby={errors.name ? 'name-error' : undefined}
            aria-invalid={!!errors.name}
            onBlur={handleBlur}
            onChange={handleChange}
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
            maxLength={254}
            inputMode="email"
            className={cn('input-field', errors.email && 'input-error')}
            aria-describedby={errors.email ? 'email-error' : undefined}
            aria-invalid={!!errors.email}
            onBlur={handleBlur}
            onChange={handleChange}
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
            maxLength={20}
            inputMode="tel"
            className={cn('input-field', errors.phone && 'input-error')}
            aria-describedby={errors.phone ? 'phone-error' : undefined}
            aria-invalid={!!errors.phone}
            onBlur={handleBlur}
            onChange={handleChange}
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
            maxLength={200}
            className={cn('input-field', errors.location && 'input-error')}
            aria-describedby={errors.location ? 'location-error' : undefined}
            aria-invalid={!!errors.location}
            onBlur={handleBlur}
            onChange={handleChange}
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
            aria-invalid={!!errors.projectType}
            onBlur={handleBlur}
            onChange={handleChange}
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
            aria-invalid={!!errors.budget}
            onBlur={handleBlur}
            onChange={handleChange}
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
          <select
            id="timeline"
            name="timeline"
            className="input-field"
            defaultValue=""
            onBlur={handleBlur}
          >
            <option value="" disabled>Select timeline…</option>
            {TIMELINE_OPTIONS.map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="service" className="input-label">Service Interested In</label>
          <select
            id="service"
            name="service"
            className="input-field"
            defaultValue=""
            onBlur={handleBlur}
          >
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
          onBlur={handleBlur}
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
            <span>{submitError || 'Something went wrong. Please try again.'}</span>
          </div>
        )}
      </div>
    </form>
  )
}
