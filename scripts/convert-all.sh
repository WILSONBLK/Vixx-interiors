#!/bin/bash
# Convert HEIC files in scripts/temp/ to JPEG in public/images/portfolio/
# Uses ffmpeg. Run from repo root: bash scripts/convert-all.sh

TEMP="c:/Users/HP/vixx interiors/scripts/temp"
OUT="c:/Users/HP/vixx interiors/public/images/portfolio"

convert() {
  local src="$TEMP/$1"
  local dst="$OUT/$2"
  ffmpeg -i "$src" -frames:v 1 -update 1 -q:v 2 "$dst" -y 2>/dev/null \
    && echo "  conv  $1 → $2" \
    || echo "  FAIL  $1"
}

copy() {
  cp "$TEMP/$1" "$OUT/$2" && echo "  copy  $1 → $2" || echo "  FAIL  $1"
}

echo "Converting Project A (6362-6366)..."
convert "IMG_6362.heic"  "proj-a-1.jpg"
convert "IMG_6363.heic"  "proj-a-2.jpg"
convert "IMG_6365.heic"  "proj-a-3.jpg"
convert "IMG_6366.heic"  "proj-a-4.jpg"

echo "Converting Project B (9219-9273)..."
convert "IMG_9219.heic"  "proj-b-1.jpg"
convert "IMG_9228.heic"  "proj-b-2.jpg"
convert "IMG_9241.heic"  "proj-b-3.jpg"
convert "IMG_9245.heic"  "proj-b-4.jpg"
convert "IMG_9270.heic"  "proj-b-5.jpg"
convert "IMG_9273.heic"  "proj-b-6.jpg"

echo "Converting Project C (9368-9420)..."
convert "IMG_9368.heic"  "proj-c-1.jpg"
convert "IMG_9380.heic"  "proj-c-2.jpg"
convert "IMG_9384.heic"  "proj-c-3.jpg"
convert "IMG_9394.heic"  "proj-c-4.jpg"
convert "IMG_9412.heic"  "proj-c-5.jpg"
copy    "IMG_9420.jpg"   "proj-c-6.jpg"

echo "Converting Project D (9589-9617)..."
convert "IMG_9589.HEIC"  "proj-d-1.jpg"
convert "IMG_9590.HEIC"  "proj-d-2.jpg"
convert "IMG_9591.HEIC"  "proj-d-3.jpg"
convert "IMG_9592.HEIC"  "proj-d-4.jpg"
convert "IMG_9609.HEIC"  "proj-d-5.jpg"
convert "IMG_9617.HEIC"  "proj-d-6.jpg"

echo ""
echo "Done. Output files:"
ls -lh "$OUT"/*.jpg | awk '{print "  "$5, $9}'
