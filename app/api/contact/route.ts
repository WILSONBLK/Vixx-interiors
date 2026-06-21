import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

// Resend is instantiated lazily inside the handler so the build
// doesn't fail when RESEND_API_KEY is absent in the CI environment.
const TO     = process.env.NOTIFICATION_EMAIL ?? 'vixxinteriors@gmail.com'

/* ── Simple in-memory rate limiter: max 3 submissions per IP per 10 minutes ── */
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()
const WINDOW_MS    = 10 * 60 * 1000 // 10 minutes
const MAX_REQUESTS = 3

function isRateLimited(ip: string): boolean {
  const now    = Date.now()
  const record = rateLimitMap.get(ip)

  if (!record || now > record.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + WINDOW_MS })
    return false
  }
  if (record.count >= MAX_REQUESTS) return true
  record.count++
  return false
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: 'Too many requests. Please wait a few minutes before trying again.' },
      { status: 429 },
    )
  }

  if (!process.env.RESEND_API_KEY) {
    console.error('[contact] RESEND_API_KEY is not set')
    return NextResponse.json({ error: 'Service not configured.' }, { status: 503 })
  }

  const resend = new Resend(process.env.RESEND_API_KEY)

  let body: Record<string, string>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }

  if (!body.name || !body.email) {
    return NextResponse.json({ error: 'Name and email are required.' }, { status: 400 })
  }

  const isFlow    = body.source === 'start-project'
  const subject   = `✦ New enquiry from ${body.name} — VIXX Interiors`

  const rows: [string, string][] = isFlow
    ? [
        ['Name',             body.name      ?? '—'],
        ['Email',            body.email     ?? '—'],
        ['Location',         body.location  ?? '—'],
        ['Project type',     body.type      ?? '—'],
        ['Budget',           body.budget    ?? '—'],
        ['Timeline',         body.timeline  ?? '—'],
        ['Style preference', body.style     ?? '—'],
        ['Space description', body.space    ?? '—'],
      ]
    : [
        ['Name',         body.name        ?? '—'],
        ['Email',        body.email       ?? '—'],
        ['Phone',        body.phone       ?? '—'],
        ['Location',     body.location    ?? '—'],
        ['Project type', body.projectType ?? '—'],
        ['Budget',       body.budget      ?? '—'],
        ['Timeline',     body.timeline    ?? '—'],
        ['Service',      body.service     ?? '—'],
        ['Message',      body.message     ?? '—'],
      ]

  const tableRows = rows
    .map(([label, value]) => `
      <tr>
        <td style="padding:8px 16px 8px 0;color:#9a7c3c;font-size:11px;letter-spacing:0.1em;text-transform:uppercase;white-space:nowrap;vertical-align:top;">${label}</td>
        <td style="padding:8px 0;color:#1a1208;font-size:14px;vertical-align:top;">${value}</td>
      </tr>`)
    .join('')

  const source = isFlow ? 'Start a Project flow' : 'Contact form'

  const html = `
    <div style="font-family:Georgia,serif;max-width:560px;margin:0 auto;background:#fafaf9;border:1px solid #e4ddd0;padding:40px;">
      <p style="font-size:10px;letter-spacing:0.3em;text-transform:uppercase;color:#9a7c3c;margin:0 0 24px;">VIXX Interiors — New Enquiry</p>
      <h1 style="font-size:26px;font-weight:400;color:#0a0908;margin:0 0 8px;">${body.name}</h1>
      <p style="font-size:12px;color:#888;margin:0 0 32px;">Submitted via ${source}</p>
      <table style="width:100%;border-collapse:collapse;border-top:1px solid #e4ddd0;">
        <tbody>${tableRows}</tbody>
      </table>
      <div style="margin-top:32px;padding-top:24px;border-top:1px solid #e4ddd0;">
        <a href="mailto:${body.email}" style="display:inline-block;background:#c49a2e;color:#1a1208;padding:12px 28px;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;text-decoration:none;">Reply to ${body.name}</a>
      </div>
    </div>
  `

  try {
    const { error } = await resend.emails.send({
      from:    'VIXX Interiors <onboarding@resend.dev>',
      to:      TO,
      replyTo: body.email,
      subject,
      html,
    })

    if (error) throw new Error(error.message)

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[contact] Resend error:', err)
    return NextResponse.json(
      { error: 'Could not send your enquiry. Please try again or contact us directly.' },
      { status: 500 },
    )
  }
}
