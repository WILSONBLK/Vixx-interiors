/**
 * VIXX Interiors — Google Apps Script webhook
 *
 * HOW TO SET UP (do this once):
 *
 * 1. Go to sheets.google.com and create a new spreadsheet.
 *    Name it "VIXX Interiors — Enquiries".
 *
 * 2. In the spreadsheet menu click Extensions → Apps Script.
 *
 * 3. Delete everything in the editor and paste ALL of this file.
 *
 * 4. Click Save (floppy disk icon). Name the project "VIXX Webhook".
 *
 * 5. Click Deploy → New deployment.
 *    - Type: Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 *    Click Deploy. Copy the Web app URL — it looks like:
 *    https://script.google.com/macros/s/XXXXXXXXX/exec
 *
 * 6. Add that URL to your project's .env.local file:
 *    GOOGLE_SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/XXXXXXXXX/exec
 *
 * 7. Every new submission will:
 *    - Add a row to the spreadsheet
 *    - Send an email alert to ALERT_EMAIL below
 *
 * NOTE: If you change this script later, you must create a NEW deployment
 * (Deploy → New deployment) — editing and saving alone does NOT update the
 * live URL. Update your .env.local with the new URL each time.
 */

// ── Config ────────────────────────────────────────────────────────────────────

var ALERT_EMAIL = 'vixxinteriors@gmail.com'
var SHEET_NAME  = 'Enquiries'

// ── Entry point ───────────────────────────────────────────────────────────────

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents)

    writeToSheet(data)
    sendAlert(data)

    return ok()
  } catch (err) {
    return fail(err.message)
  }
}

// ── Write a row to the sheet ──────────────────────────────────────────────────

function writeToSheet(data) {
  var ss    = SpreadsheetApp.getActiveSpreadsheet()
  var sheet = ss.getSheetByName(SHEET_NAME)

  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME)
    sheet.appendRow([
      'Timestamp (Lagos)',
      'Source',
      'Name',
      'Email',
      'Phone',
      'Location',
      'Project Type',
      'Budget',
      'Timeline',
      'Service / Style',
      'Message / Space Description',
    ])
    // Bold the header row
    sheet.getRange(1, 1, 1, 11).setFontWeight('bold')
    sheet.setFrozenRows(1)
  }

  var now = new Date()
  var lagosTime = Utilities.formatDate(now, 'Africa/Lagos', 'dd/MM/yyyy HH:mm')

  sheet.appendRow([
    lagosTime,
    data.source        || '—',
    data.name          || '—',
    data.email         || '—',
    data.phone         || '—',
    data.location      || '—',
    data.projectType   || data.type    || '—',
    data.budget        || '—',
    data.timeline      || '—',
    data.service       || data.style   || '—',
    data.message       || data.space   || '—',
  ])
}

// ── Send email alert ──────────────────────────────────────────────────────────

function sendAlert(data) {
  var name   = data.name  || 'Unknown'
  var email  = data.email || '—'
  var source = data.source === 'start-project' ? 'Start a Project flow' : 'Contact form'

  var subject = '✦ New enquiry from ' + name + ' — VIXX Interiors'

  var body = [
    'A new enquiry was submitted via the ' + source + '.',
    '',
    '──────────────────────────',
    'Name:            ' + (data.name          || '—'),
    'Email:           ' + (data.email         || '—'),
    'Phone:           ' + (data.phone         || '—'),
    'Location:        ' + (data.location      || '—'),
    'Project type:    ' + (data.projectType   || data.type    || '—'),
    'Budget:          ' + (data.budget        || '—'),
    'Timeline:        ' + (data.timeline      || '—'),
    'Service / Style: ' + (data.service       || data.style   || '—'),
    '──────────────────────────',
    '',
    'Message / Description:',
    (data.message || data.space || 'None provided.'),
    '',
    '──────────────────────────',
    'View all submissions:',
    SpreadsheetApp.getActiveSpreadsheet().getUrl(),
  ].join('\n')

  MailApp.sendEmail({
    to:      ALERT_EMAIL,
    subject: subject,
    body:    body,
  })
}

// ── Response helpers ──────────────────────────────────────────────────────────

function ok() {
  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON)
}

function fail(msg) {
  return ContentService
    .createTextOutput(JSON.stringify({ ok: false, error: msg }))
    .setMimeType(ContentService.MimeType.JSON)
}
