// One-time video conversion script
// Converts ../IMG_2086.mov → public/video/product.mp4 + product.webm
// Uses ffmpeg-static so no system ffmpeg is needed.

import { execFileSync } from 'child_process'
import { mkdirSync, existsSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import ffmpegPath from 'ffmpeg-static'

const __dirname = dirname(fileURLToPath(import.meta.url))

const input  = resolve(__dirname, '../../IMG_2086.mov')
const outDir = resolve(__dirname, '../public/video')

if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true })

const mp4Out  = resolve(outDir, 'product.mp4')
const webmOut = resolve(outDir, 'product.webm')

console.log('🎬 Converting to MP4 (H.264, near-lossless)…')
execFileSync(ffmpegPath, [
  '-i', input,
  '-c:v', 'libx264',
  '-crf', '18',
  '-preset', 'slow',
  '-movflags', '+faststart',
  '-an',          // no audio
  '-y',           // overwrite
  mp4Out,
], { stdio: 'inherit' })

console.log('🎬 Converting to WebM (VP9 fallback)…')
execFileSync(ffmpegPath, [
  '-i', input,
  '-c:v', 'libvpx-vp9',
  '-crf', '18',
  '-b:v', '0',
  '-an',
  '-y',
  webmOut,
], { stdio: 'inherit' })

console.log('✅ Done! Videos written to public/video/')
