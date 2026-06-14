/**
 * Extract base64 image content from saved MCP tool-result JSON files
 * and write binary HEIC files to scripts/temp/
 *
 * Usage: node scripts/extract-downloads.mjs
 */
import { readdir, readFile, writeFile } from 'fs/promises'
import { join, resolve } from 'path'
import { fileURLToPath } from 'url'

const ROOT        = resolve(fileURLToPath(import.meta.url), '..', '..')
const RESULTS_DIR = 'C:\\Users\\HP\\.claude\\projects\\c--Users-HP-vixx-interiors\\c896ed3b-9e7d-4e9c-b93b-ad372f0f83ec\\tool-results'
const TEMP_DIR    = join(ROOT, 'scripts', 'temp')

console.log('Scanning', RESULTS_DIR)

const allFiles = await readdir(RESULTS_DIR)
const targets  = allFiles.filter(f => f.startsWith('mcp-claude_ai_Google_Drive-download_file_content'))

console.log(`Found ${targets.length} download result(s)\n`)

for (const file of targets) {
  const fullPath = join(RESULTS_DIR, file)
  const raw      = await readFile(fullPath, 'utf8')

  let parsed
  try {
    // The file is a JSON object: { content, id, mimeType, title }
    parsed = JSON.parse(raw)
  } catch {
    console.warn(`  skip (invalid JSON): ${file}`)
    continue
  }

  const { title, content } = parsed
  if (!title || !content) { console.warn(`  skip (missing fields): ${file}`) ; continue }

  const outPath = join(TEMP_DIR, title)
  const bytes   = Buffer.from(content, 'base64')
  await writeFile(outPath, bytes)
  console.log(`  wrote  ${title}  (${(bytes.length / 1024 / 1024).toFixed(1)} MB)`)
}

console.log('\nDone.')
