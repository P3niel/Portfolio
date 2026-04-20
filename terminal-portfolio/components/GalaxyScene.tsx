'use client'

import dynamic from 'next/dynamic'

// Both components pull in @react-three/fiber — keep them browser-only
const GalaxyBackground = dynamic(() => import('./GalaxyBackground'), { ssr: false })
const PlanetsLayer     = dynamic(() => import('./PlanetsLayer'),     { ssr: false })

export default function GalaxyScene() {
  return (
    <GalaxyBackground>
      <PlanetsLayer />
    </GalaxyBackground>
  )
}
