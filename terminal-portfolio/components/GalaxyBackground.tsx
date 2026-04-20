'use client'

import type { ReactNode } from 'react'
import { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Stars } from '@react-three/drei'
import * as THREE from 'three'

// Generates a static point cloud: distant dim layer + close bright layer
function StarField() {
  const { farPositions, nearPositions } = useMemo(() => {
    const farCount = 6000
    const nearCount = 2000

    const far = new Float32Array(farCount * 3)
    for (let i = 0; i < farCount; i++) {
      far[i * 3]     = (Math.random() - 0.5) * 300
      far[i * 3 + 1] = (Math.random() - 0.5) * 300
      far[i * 3 + 2] = (Math.random() - 0.5) * 300
    }

    const near = new Float32Array(nearCount * 3)
    for (let i = 0; i < nearCount; i++) {
      near[i * 3]     = (Math.random() - 0.5) * 80
      near[i * 3 + 1] = (Math.random() - 0.5) * 80
      near[i * 3 + 2] = (Math.random() - 0.5) * 80
    }

    return { farPositions: far, nearPositions: near }
  }, [])

  return (
    <>
      {/* Distant dim stars — affected by fog */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[farPositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#a8c8ff"
          size={0.25}
          sizeAttenuation
          transparent
          opacity={0.55}
          depthWrite={false}
        />
      </points>

      {/* Nearby bright stars — stand out against fog */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[nearPositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#ffffff"
          size={0.4}
          sizeAttenuation
          transparent
          opacity={0.9}
          depthWrite={false}
          fog={false}
        />
      </points>
    </>
  )
}

// Lazy nebula: a few large, very faint, softly coloured sprites for depth
function NebulaClouds() {
  const { positions, colors } = useMemo(() => {
    const count = 120
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)
    const palette = [
      new THREE.Color('#0d1a3a'),
      new THREE.Color('#0a1a2a'),
      new THREE.Color('#001a12'),
      new THREE.Color('#1a0a2a'),
    ]

    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 180
      pos[i * 3 + 1] = (Math.random() - 0.5) * 180
      pos[i * 3 + 2] = (Math.random() - 0.5) * 100 - 30
      const c = palette[Math.floor(Math.random() * palette.length)]
      col[i * 3]     = c.r
      col[i * 3 + 1] = c.g
      col[i * 3 + 2] = c.b
    }
    return { positions: pos, colors: col }
  }, [])

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        vertexColors
        size={14}
        sizeAttenuation
        transparent
        opacity={0.08}
        depthWrite={false}
      />
    </points>
  )
}

// Slow sinusoidal camera drift — no user input, no raycasting
function CameraRig() {
  const { camera } = useThree()
  const t = useRef(0)

  useFrame((_, delta) => {
    t.current += delta * 0.04
    camera.position.x = Math.sin(t.current * 0.7) * 1.2
    camera.position.y = Math.cos(t.current * 0.5) * 0.7
    camera.lookAt(0, 0, -10)
  })

  return null
}

export default function GalaxyBackground({ children }: { children?: ReactNode }) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        background: '#000005',
        pointerEvents: children ? 'auto' : 'none',
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 1], fov: 75, near: 0.1, far: 400 }}
        gl={{
          antialias: false,
          alpha: false,
          powerPreference: 'high-performance',
          stencil: false,
          // depth enabled to support 3D planet layer
        }}
        dpr={[1, 1.5]}
        frameloop="always"
        style={{ display: 'block', width: '100%', height: '100%' }}
      >
        {/* Depth fog — hides clipping edges, adds distance feel */}
        <fog attach="fog" args={['#000008', 80, 280]} />

        {/* drei's optimised star sphere as the deepest layer */}
        <Stars
          radius={120}
          depth={60}
          count={4000}
          factor={3}
          saturation={0.1}
          fade
          speed={0}
        />

        <NebulaClouds />
        <StarField />
        <CameraRig />
        {children}
      </Canvas>
    </div>
  )
}
