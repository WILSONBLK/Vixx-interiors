/**
 * Convert all HEIC/HEIF files in scripts/temp/ to JPEG in public/images/portfolio/
 * Rename according to NAME_MAP. Run with: node scripts/convert-heic.mjs
 */
import sharp from 'sharp'
import { readdir, unlink, copyFile } from 'fs/promises'
import { join, resolve } from 'path'
import { fileURLToPath } from 'url'

const ROOT     = resolve(fileURLToPath(import.meta.url), '..', '..')
const TEMP_DIR = join(ROOT, 'scripts', 'temp')
const OUT_DIR  = join(ROOT, 'public', 'images', 'portfolio')

const NAME_MAP = {
  'IMG_6362.heic':  'proj-a-1.jpg',
  'IMG_6363.heic':  'proj-a-2.jpg',
  'IMG_6365.heic':  'proj-a-3.jpg',
  'IMG_6366.heic':  'proj-a-4.jpg',
  'IMG_9219.heic':  'proj-b-1.jpg',
  'IMG_9228.heic':  'proj-b-2.jpg',
  'IMG_9241.heic':  'proj-b-3.jpg',
  'IMG_9245.heic':  'proj-b-4.jpg',
  'IMG_9270.heic':  'proj-b-5.jpg',
  'IMG_9273.heic':  'proj-b-6.jpg',
  'IMG_9368.heic':  'proj-c-1.jpg',
  'IMG_9380.heic':  'proj-c-2.jpg',
  'IMG_9384.heic':  'proj-c-3.jpg',
  'IMG_9394.heic':  'proj-c-4.jpg',
  'IMG_9412.heic':  'proj-c-5.jpg',
  'IMG_9420.jpg':   'proj-c-6.jpg',
  'IMG_9589.HEIC':  'proj-d-1.jpg',
  'IMG_9590.HEIC':  'proj-d-2.jpg',
  'IMG_9591.HEIC':  'proj-d-3.jpg',
  'IMG_9592.HEIC':  'proj-d-4.jpg',
  'IMG_9609.HEIC':  'proj-d-5.jpg',
  'IMG_9617.HEIC':  'proj-d-6.jpg',
}

const files = await readdir(TEMP_DIR)
let converted = 0

for (const file of files) {
  const outName = NAME_MAP[file]
  if (!outName) { console.log(`  skip: ${file} (no mapping)`) ; continue }

  const input  = join(TEMP_DIR, file)
  const output = join(OUT_DIR, outName)

  if (file.endsWith('.jpg') || file.endsWith('.jpeg')) {
    await copyFile(input, output)
    await unlink(input)
    console.log(`  copy  ${file} → ${outName}`)
  } else {
    await sharp(input)
      .jpeg({ quality: 88, chromaSubsampling: '4:4:4', mozjpeg: true })
      .toFile(output)
    await unlink(input)
    console.log(`  conv  ${file} → ${outName}`)
  }
  converted++
}

console.log(`\nDone — ${converted} file(s) processed.`)
