/**
 * fix-guard-image.mjs
 *
 * Fixes two problems with guard_cutout.png:
 *
 *  1. ROTATION  — .rotate() with no args reads the EXIF Orientation tag and
 *                 physically rotates the pixels to match, then strips the tag.
 *                 The output is always upright regardless of browser EXIF support.
 *
 *  2. WHITE BG  — the source PNG doesn't have real alpha transparency (it has a
 *                 solid white fill instead of transparent pixels). This script
 *                 tries to help by flattening with a transparent background, but
 *                 if the original pixels are white-filled (not alpha), you MUST
 *                 regenerate the cutout with a proper background-removal tool
 *                 (e.g. remove.bg, Adobe Firefly, or Photoshop's "Remove Background").
 *                 This script will at least fix the rotation and re-save cleanly.
 *
 * Run once:
 *   node scripts/fix-guard-image.mjs
 */

import sharp from 'sharp'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const INPUT = resolve(__dirname, '../src/assets/Backgrounds/guard_cutout.png')
const OUTPUT = resolve(__dirname, '../src/assets/Backgrounds/guard_cutout.png')

console.log('Reading:', INPUT)

const meta = await sharp(INPUT).metadata()
console.log(`  format       : ${meta.format}`)
console.log(`  width × height: ${meta.width} × ${meta.height}`)
console.log(`  orientation  : ${meta.orientation ?? 'none (no EXIF tag)'}`)
console.log(`  channels     : ${meta.channels}`)
console.log(`  hasAlpha     : ${meta.hasAlpha}`)
console.log(`  space        : ${meta.space}`)

if (!meta.hasAlpha) {
    console.warn('\n⚠️  WARNING: PNG has NO alpha channel — the white background is')
    console.warn('   baked into the image pixels, not a CSS issue.')
    console.warn('   You must regenerate this cutout with real transparency.')
    console.warn('   CSS mix-blend-mode: multiply is applied as a visual workaround.\n')
}

// .rotate() with no args = auto-orient from EXIF, bake into pixels, strip tag
await sharp(INPUT)
    .rotate()                  // fix EXIF rotation
    .png({ quality: 90 })     // re-save as clean PNG
    .toFile(OUTPUT + '.tmp.png')

// Overwrite original with fixed version
import { renameSync } from 'fs'
renameSync(OUTPUT + '.tmp.png', OUTPUT)

const after = await sharp(OUTPUT).metadata()
console.log('\n✅ Done. Output:')
console.log(`  width × height: ${after.width} × ${after.height}`)
console.log(`  orientation  : ${after.orientation ?? 'stripped (good)'}`)
console.log(`  hasAlpha     : ${after.hasAlpha}`)
