'use client'

import { useRef } from 'react'
import { type ThreeEvent, useFrame } from '@react-three/fiber'
import { Billboard, Text } from '@react-three/drei'
import * as THREE from 'three'

export interface PlanetProps {
  texture: THREE.Texture
  normalMap: THREE.Texture
  roughnessMap?: THREE.Texture
  position: [number, number, number]
  label: string
  onSelect: (name: string) => void
  atmosphereColor?: string
  size?: number
}

export default function Planet({
  texture,
  normalMap,
  roughnessMap,
  position,
  label,
  onSelect,
  atmosphereColor = '#4488ff',
  size = 1,
}: PlanetProps) {
  const groupRef    = useRef<THREE.Group>(null)
  const meshRef     = useRef<THREE.Mesh>(null)
  const backMatRef  = useRef<THREE.MeshBasicMaterial>(null)
  const frontMatRef = useRef<THREE.MeshBasicMaterial>(null)
  const hoveredRef  = useRef(false)
  const tRef        = useRef(Math.random() * Math.PI * 2)

  useFrame((_, delta) => {
    if (!groupRef.current || !meshRef.current) return

    // Slow axis spin
    meshRef.current.rotation.y += delta * 0.06

    // Sinusoidal float
    tRef.current += delta * 0.25
    groupRef.current.position.y = position[1] + Math.sin(tRef.current) * 0.2

    // Smooth hover scale
    const targetScale = hoveredRef.current ? 1.18 : 1.0
    const s = groupRef.current.scale.x
    groupRef.current.scale.setScalar(s + (targetScale - s) * Math.min(1, delta * 7))

    // Atmosphere glow fade
    if (backMatRef.current) {
      const tOp = hoveredRef.current ? 0.22 : 0.1
      backMatRef.current.opacity += (tOp - backMatRef.current.opacity) * Math.min(1, delta * 6)
    }
    if (frontMatRef.current) {
      const tOp = hoveredRef.current ? 0.1 : 0.035
      frontMatRef.current.opacity += (tOp - frontMatRef.current.opacity) * Math.min(1, delta * 6)
    }
  })

  function handleOver() {
    hoveredRef.current = true
    document.body.style.cursor = 'pointer'
  }
  function handleOut() {
    hoveredRef.current = false
    document.body.style.cursor = 'auto'
  }
  function handleClick(e: ThreeEvent<MouseEvent>) {
    e.stopPropagation()
    console.log(label)
    onSelect(label)
  }

  return (
    <group ref={groupRef} position={position}>
      {/* Planet surface */}
      <mesh
        ref={meshRef}
        onPointerOver={handleOver}
        onPointerOut={handleOut}
        onClick={handleClick}
      >
        <sphereGeometry args={[size, 32, 32]} />
        <meshStandardMaterial
          map={texture}
          normalMap={normalMap}
          roughnessMap={roughnessMap}
          roughness={roughnessMap ? 1.0 : 0.85}
          metalness={0.05}
        />
      </mesh>

      {/* Inner atmosphere — back-facing halo */}
      <mesh>
        <sphereGeometry args={[size * 1.08, 24, 24]} />
        <meshBasicMaterial
          ref={backMatRef}
          color={atmosphereColor}
          transparent
          opacity={0.1}
          depthWrite={false}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Outer corona — additive glow */}
      <mesh>
        <sphereGeometry args={[size * 1.2, 16, 16]} />
        <meshBasicMaterial
          ref={frontMatRef}
          color={atmosphereColor}
          transparent
          opacity={0.035}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Label — always faces camera */}
      <Billboard position={[0, size + 0.6, 0]}>
        <Text
          fontSize={0.22}
          color="#eafff5"
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.05}
        >
          {label}
        </Text>
      </Billboard>
    </group>
  )
}
