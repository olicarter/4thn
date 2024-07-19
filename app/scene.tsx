'use client'

import { Canvas } from '@react-three/fiber'
import { motion } from 'framer-motion-3d'
import { useMotionValueEvent, useScroll, useTransform } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'
import styles from './page.module.css'
import { motion as m } from 'framer-motion'
import { Text } from '@react-three/drei'
import * as THREE from 'three'

const locations = {
  rome: { latitude: 41.9028, longitude: 12.4964 },
  tallinn: { latitude: 59.437, longitude: 24.7536 },
  london: { latitude: 51.5074, longitude: 0.1278 },
}

const scaleMax = 2.38
// const scaleMax = 2

const steps = Array.from({ length: Object.keys(locations).length * 3 + 1 }).map(
  (_, i) => i / (Object.keys(locations).length * 3),
)

export default function Scene() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const [currentLocation, setCurrentLocation] = useState(locations.rome)
  const [title, setTitle] = useState('4THN')

  const { scrollYProgress } = useScroll()

  const scale = useTransform(scrollYProgress, steps, [
    1,
    scaleMax,
    scaleMax,
    scaleMax * 0.8,
    scaleMax,
    scaleMax,
    scaleMax * 0.8,
    scaleMax,
    scaleMax,
    1,
  ])
  const rotateX = useTransform(
    scrollYProgress,
    [0, steps[2], steps[4], steps[5], steps[7], steps[9]],
    [
      THREE.MathUtils.degToRad(locations.tallinn.latitude),
      THREE.MathUtils.degToRad(locations.tallinn.latitude),
      THREE.MathUtils.degToRad(locations.london.latitude),
      THREE.MathUtils.degToRad(locations.london.latitude),
      THREE.MathUtils.degToRad(locations.rome.latitude),
      THREE.MathUtils.degToRad(locations.rome.latitude),
    ],
  )
  const rotateY = useTransform(
    scrollYProgress,
    [0, steps[2], steps[4], steps[5], steps[7], steps[9]],
    [
      THREE.MathUtils.degToRad(-locations.tallinn.longitude),
      THREE.MathUtils.degToRad(-locations.tallinn.longitude),
      THREE.MathUtils.degToRad(-locations.london.longitude),
      THREE.MathUtils.degToRad(-locations.london.longitude),
      THREE.MathUtils.degToRad(-locations.rome.longitude),
      THREE.MathUtils.degToRad(-locations.rome.longitude),
    ],
  )

  useMotionValueEvent(scrollYProgress, 'change', value => {
    if (value <= steps[1]) setTitle('4THN')
    if (value > steps[1] && value <= steps[2]) setTitle('4THN / ABOUT')
    if (value > steps[2] && value <= steps[4]) setTitle('4THN')
    if (value > steps[4] && value <= steps[5]) setTitle('4THN / SHONGO FILMS')
    if (value > steps[5] && value <= steps[7]) setTitle('4THN')
    if (value > steps[7] && value <= steps[8]) setTitle('4THN / PRORUNNER')
    if (value > steps[8]) setTitle('4THN')
  })

  useMotionValueEvent(rotateX, 'change', value => {
    setCurrentLocation(prev => ({
      ...prev,
      latitude: THREE.MathUtils.radToDeg(value),
    }))
  })

  useMotionValueEvent(rotateY, 'change', value => {
    setCurrentLocation(prev => ({
      ...prev,
      longitude: -THREE.MathUtils.radToDeg(value),
    }))
  })

  return (
    <>
      <header className={styles.header}>
        <span className={styles.logo}>{title}</span>
        <span className={styles.location}>
          {currentLocation.latitude.toFixed(4)},{' '}
          {currentLocation.longitude.toFixed(4)}
        </span>
      </header>
      <div
        style={{
          inset: 0,
          position: 'fixed',
        }}
      >
        <Canvas
          // linear
          flat
          camera={{ fov: 50 }}
          ref={canvasRef}
          style={{ position: 'fixed', inset: 0 }}
        >
          <motion.group
            // @ts-ignore
            rotateX={rotateX}
            // @ts-ignore
            rotateY={rotateY}
            scale={scale}
            transition={{ duration: 4, ease: 'easeInOut' }}
            name="spheres"
            // rotation={[degreesToRadians(-59), degreesToRadians(10), 0]}
          >
            <motion.mesh position={[0, 0, 0]}>
              <motion.sphereGeometry args={[2, 64, 64]} />
              <motion.meshBasicMaterial color="#002C5F" />
            </motion.mesh>
            <Box
              color="#313c39"
              position={locationToPosition(
                locations.tallinn.latitude,
                locations.tallinn.longitude,
              )}
              text="About us"
              textColor="#002C5F"
            />
            <Box
              color="#09090B"
              position={locationToPosition(
                locations.london.latitude,
                locations.london.longitude,
              )}
              text="Shongo Films"
              textColor="#fafafa"
            />
            <Box
              color="#FFFF31"
              position={locationToPosition(
                locations.rome.latitude,
                locations.rome.longitude,
              )}
              text="Prorunner"
              textColor="#0505C9"
            />
          </motion.group>
          {/* <OrbitControls /> */}
        </Canvas>
      </div>
    </>
  )
}

function locationToPosition(
  latitude: number,
  longitude: number,
  radius: number = 2,
): [number, number, number] {
  const spherical = new THREE.Spherical(
    radius,
    THREE.MathUtils.degToRad(90 - latitude),
    THREE.MathUtils.degToRad(longitude),
  )

  const position = new THREE.Vector3().setFromSpherical(spherical)

  return [position.x, position.y, position.z]
}

// @ts-ignore
function Box({ color, position, text, textColor }) {
  const ref = useRef(null)

  useEffect(() => {
    const updateRotation = () => {
      // @ts-ignore
      ref.current?.lookAt(0, 0, 0)
    }
    updateRotation()
    window.addEventListener('scroll', updateRotation)
    return () => {
      window.removeEventListener('scroll', updateRotation)
    }
  }, [])

  return (
    <motion.group position={position} ref={ref}>
      <motion.mesh>
        <motion.boxGeometry
          args={[
            window.innerWidth / 10000,
            window.innerHeight / 10000,
            0.001,
            1,
            1,
          ]}
        />
        <motion.meshBasicMaterial color={color} />
      </motion.mesh>
      {/* <Text
        color={textColor}
        fontSize={0.004}
        fontWeight={900}
        rotation={[0, THREE.MathUtils.degToRad(180), 0]}
        position={[0, 0, -0.001]}
      >
        {text}
      </Text> */}
    </motion.group>
  )
}
