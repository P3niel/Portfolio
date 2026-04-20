'use client'

import { useEffect, useState } from 'react'
import * as THREE from 'three'
import Planet from './Planet'

// ─── Noise ───────────────────────────────────────────────────────────────────

function hash2d(x: number, y: number): number {
  const v = Math.sin(x * 127.1 + y * 311.7) * 43758.5453123
  return v - Math.floor(v)
}

function valueNoise(x: number, y: number): number {
  const ix = Math.floor(x), iy = Math.floor(y)
  const fx = x - ix, fy = y - iy
  const ux = fx * fx * (3 - 2 * fx)
  const uy = fy * fy * (3 - 2 * fy)
  return (
    hash2d(ix,     iy    ) * (1 - ux) * (1 - uy) +
    hash2d(ix + 1, iy    ) *      ux  * (1 - uy) +
    hash2d(ix,     iy + 1) * (1 - ux) *      uy  +
    hash2d(ix + 1, iy + 1) *      ux  *      uy
  )
}

function fbm(x: number, y: number, octaves = 3): number {
  let v = 0, a = 0.5, f = 1.0, sum = 0
  for (let i = 0; i < octaves; i++) {
    v += valueNoise(x * f, y * f) * a
    sum += a
    a *= 0.5
    f *= 2.13
  }
  return v / sum
}

// ─── Color palette ───────────────────────────────────────────────────────────

type RGB = [number, number, number]
type Stop = { t: number; c: RGB }

function palette(stops: Stop[], t: number): RGB {
  const v = Math.max(0, Math.min(1, t))
  for (let i = 0; i < stops.length - 1; i++) {
    if (v <= stops[i + 1].t) {
      const f = (v - stops[i].t) / (stops[i + 1].t - stops[i].t)
      const a = stops[i].c, b = stops[i + 1].c
      return [
        Math.round(a[0] + (b[0] - a[0]) * f),
        Math.round(a[1] + (b[1] - a[1]) * f),
        Math.round(a[2] + (b[2] - a[2]) * f),
      ]
    }
  }
  return stops[stops.length - 1].c
}

// ─── Planet types ─────────────────────────────────────────────────────────────

type PlanetType = 'oceanic' | 'volcanic' | 'gasGiant' | 'icy'

function heightAt(type: PlanetType, nx: number, ny: number): number {
  switch (type) {
    case 'oceanic':  return fbm(nx * 3,  ny * 3)
    case 'volcanic': return fbm(nx * 4,  ny * 4, 4)
    case 'gasGiant': {
      const band = Math.sin(ny * Math.PI * 8 + fbm(nx * 2, ny * 2) * 2) * 0.5 + 0.5
      return Math.min(1, Math.max(0, band * 0.7 + fbm(nx * 5, ny * 5, 3) * 0.3))
    }
    case 'icy': return fbm(nx * 7, ny * 7, 4) * 0.7 + fbm(nx * 14, ny * 14, 2) * 0.3
  }
}

function colorAt(type: PlanetType, h: number): RGB {
  switch (type) {
    case 'oceanic': return palette([
      { t: 0.00, c: [8,   20,  80 ] },
      { t: 0.35, c: [20,  60,  160] },
      { t: 0.42, c: [40,  100, 180] },
      { t: 0.46, c: [200, 175, 110] },
      { t: 0.50, c: [55,  115, 35 ] },
      { t: 0.65, c: [75,  95,  45 ] },
      { t: 0.78, c: [100, 78,  55 ] },
      { t: 0.90, c: [180, 185, 190] },
      { t: 1.00, c: [230, 238, 245] },
    ], h)
    case 'volcanic': return palette([
      { t: 0.00, c: [15,  5,   5  ] },
      { t: 0.20, c: [55,  15,  5  ] },
      { t: 0.40, c: [155, 48,  8  ] },
      { t: 0.55, c: [200, 95,  18 ] },
      { t: 0.70, c: [215, 148, 35 ] },
      { t: 0.82, c: [170, 85,  18 ] },
      { t: 0.92, c: [95,  38,  8  ] },
      { t: 1.00, c: [48,  18,  8  ] },
    ], h)
    case 'gasGiant': return palette([
      { t: 0.00, c: [28,  8,   75 ] },
      { t: 0.18, c: [55,  18,  138] },
      { t: 0.35, c: [98,  45,  178] },
      { t: 0.50, c: [38,  95,  198] },
      { t: 0.65, c: [18,  155, 195] },
      { t: 0.80, c: [75,  55,  155] },
      { t: 1.00, c: [28,  8,   75 ] },
    ], h)
    case 'icy': return palette([
      { t: 0.00, c: [175, 205, 238] },
      { t: 0.30, c: [195, 220, 248] },
      { t: 0.52, c: [218, 232, 252] },
      { t: 0.68, c: [228, 238, 255] },
      { t: 0.85, c: [240, 244, 255] },
      { t: 1.00, c: [255, 255, 255] },
    ], h)
  }
}

// ─── Texture builders ─────────────────────────────────────────────────────────
// Canvas size: 512×256 (equirectangular, ≤1024 px limit)

const W = 256, H = 128

function makeColorMap(type: PlanetType): THREE.CanvasTexture {
  const canvas = document.createElement('canvas')
  canvas.width = W; canvas.height = H
  const ctx = canvas.getContext('2d')!
  const img = ctx.createImageData(W, H)
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const [r, g, b] = colorAt(type, heightAt(type, x / W, y / H))
      const i = (y * W + x) * 4
      img.data[i] = r; img.data[i + 1] = g; img.data[i + 2] = b; img.data[i + 3] = 255
    }
  }
  ctx.putImageData(img, 0, 0)
  const tex = new THREE.CanvasTexture(canvas)
  tex.colorSpace = THREE.SRGBColorSpace
  return tex
}

function makeNormalMap(type: PlanetType): THREE.CanvasTexture {
  const canvas = document.createElement('canvas')
  canvas.width = W; canvas.height = H
  const ctx = canvas.getContext('2d')!
  const img = ctx.createImageData(W, H)
  const eps = 1.5 / W
  const strength = type === 'gasGiant' ? 1.8 : type === 'icy' ? 4.5 : 3.2
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const nx = x / W, ny = y / H
      const dx = (heightAt(type, nx - eps, ny) - heightAt(type, nx + eps, ny)) * strength
      const dy = (heightAt(type, nx, ny - eps) - heightAt(type, nx, ny + eps)) * strength
      const dz = 1.0
      const len = Math.sqrt(dx * dx + dy * dy + dz * dz)
      const i = (y * W + x) * 4
      img.data[i]     = Math.round(dx / len * 127 + 128)
      img.data[i + 1] = Math.round(dy / len * 127 + 128)
      img.data[i + 2] = Math.round(dz / len * 127 + 128)
      img.data[i + 3] = 255
    }
  }
  ctx.putImageData(img, 0, 0)
  const tex = new THREE.CanvasTexture(canvas)
  tex.colorSpace = THREE.LinearSRGBColorSpace
  return tex
}

// ─── Planet configuration ─────────────────────────────────────────────────────

const CONFIGS = [
  {
    label: 'about',
    type: 'oceanic'  as PlanetType,
    size: 1.2,
    position: [-4,   1.0,  -9 ] as [number, number, number],
    atmosphereColor: '#3366ff',
  },
  {
    label: 'projects',
    type: 'volcanic' as PlanetType,
    size: 1.0,
    position: [ 4,  -0.5,  -8 ] as [number, number, number],
    atmosphereColor: '#ff5533',
  },
  {
    label: 'skills',
    type: 'gasGiant' as PlanetType,
    size: 1.4,
    position: [-1,  -2.0, -14 ] as [number, number, number],
    atmosphereColor: '#8844ff',
  },
  {
    label: 'contact',
    type: 'icy'      as PlanetType,
    size: 0.9,
    position: [ 5.5, 1.5,  -7 ] as [number, number, number],
    atmosphereColor: '#44eeff',
  },
]

type TextureSet = { colorMap: THREE.CanvasTexture; normalMap: THREE.CanvasTexture }

// ─── Component ────────────────────────────────────────────────────────────────

export default function PlanetsLayer() {
  const [textures, setTextures] = useState<TextureSet[] | null>(null)

  // Canvas API is browser-only — generate after mount
  useEffect(() => {
    const sets = CONFIGS.map(({ type }) => ({
      colorMap:  makeColorMap(type),
      normalMap: makeNormalMap(type),
    }))
    setTextures(sets)
    return () => sets.forEach(({ colorMap, normalMap }) => {
      colorMap.dispose()
      normalMap.dispose()
    })
  }, [])

  if (!textures) return null

  function handleSelect(name: string) {
    console.log(name)
  }

  return (
    <>
      {/* Simulated sun — directional from upper-right-front */}
      <directionalLight position={[10, 15, -5]} intensity={2.5} color="#fff8e7" />
      <ambientLight intensity={0.15} />

      {CONFIGS.map((cfg, i) => (
        <Planet
          key={cfg.label}
          texture={textures[i].colorMap}
          normalMap={textures[i].normalMap}
          position={cfg.position}
          label={cfg.label}
          onSelect={handleSelect}
          atmosphereColor={cfg.atmosphereColor}
          size={cfg.size}
        />
      ))}
    </>
  )
}
