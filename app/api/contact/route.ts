import { Resend } from 'resend'
import { NextRequest, NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)
const TO = process.env.NOTIFICATION_EMAIL!

export async function POST(req: NextRequest) {
  let body: Record<string, string>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  const isStartProject = body.source === 'start-project'

  const subject = isStartProject
    ? 'New Project Enquiry — VIXX Interiors'
    : 'New Contact Form Submission — VIXX Interiors'

  const html = isStartProject
    ? buildStartProjectHtml(body)
    : buildContactHtml(body)

  const { error } = await resend.emails.send({
    from: 'VIXX Interiors <onboarding@resend.dev>',
    to:   TO,
    subject,
    html,
    replyTo: body.email ?? undefined,
  })

  if (error) {
    console.error('[resend]', error)
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}

function buildContactHtml(b: Record<string, string>) {
  return `
    <h2>New Contact Form Submission</h2>
    <table cellpadding="6">
      <tr><td><strong>Name</strong></td><td>${esc(b.name)}</td></tr>
      <tr><td><strong>Email</strong></td><td>${esc(b.email)}</td></tr>
      <tr><td><strong>Phone</strong></td><td>${esc(b.phone)}</td></tr>
      ${b.message ? `<tr><td><strong>Message</strong></td><td>${esc(b.message)}</td></tr>` : ''}
    </table>
  `
}

function buildStartProjectHtml(b: Record<string, string>) {
  const rows = Object.entries(b)
    .filter(([k]) => k !== 'source')
    .map(([k, v]) => `<tr><td><strong>${esc(k)}</strong></td><td>${esc(v)}</td></tr>`)
    .join('')
  return `<h2>New Project Enquiry</h2><table cellpadding="6">${rows}</table>`
}

function esc(s: string = '') {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}
