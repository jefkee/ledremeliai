// Convert background_vid.mov → product.mp4 + product.webm
// Source: public/video/background_vid.mov (already plate-blurred)

import { execFileSync } from 'child_process'
import { mkdirSync, existsSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import ffmpegPath from 'ffmpeg-static'

const __dirname = dirname(fileURLToPath(import.meta.url))

const input  = resolve(__dirname, '../public/background_vid.mov')
const outDir = resolve(__dirname, '../public/video')

if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true })

const mp4Out  = resolve(outDir, 'product.mp4')
const webmOut = resolve(outDir, 'product.webm')

console.log('🎬 Encoding MP4 (H.264, near-lossless)…')
execFileSync(ffmpegPath, [
  '-i', input,
  '-c:v', 'libx264',
  '-crf', '18',
  '-preset', 'slow',
  '-movflags', '+faststart',
  '-an',
  '-y',
  mp4Out,
], { stdio: 'inherit' })

console.log('\n🎬 Encoding WebM (VP9 fallback)…')
execFileSync(ffmpegPath, [
  '-i', input,
  '-c:v', 'libvpx-vp9',
  '-crf', '18',
  '-b:v', '0',
  '-an',
  '-y',
  webmOut,
], { stdio: 'inherit' })

console.log('\n✅ Done! product.mp4 + product.webm written to public/video/')
