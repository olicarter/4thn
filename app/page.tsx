'use client'

import dynamic from 'next/dynamic'
import { motion, useScroll } from 'framer-motion'
import styles from './page.module.css'

const Scene = dynamic(() => import('./scene'), { ssr: false })

export default function Home() {
  const { scrollYProgress } = useScroll()

  return (
    <>
      <Scene />
      <div
        style={{
          top: '200vh',
          position: 'absolute',
          height: '100vh',
          width: 'calc(100vw - 2vmin)',
          padding: '1vmin',
          mixBlendMode: 'difference',
          display: 'grid',
          gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
        }}
      >
        <p style={{ gridColumnStart: 2, fontSize: '1.5rem' }}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Id quaerat
          provident nisi odio consequatur soluta quam assumenda ex itaque autem
          nam minima nesciunt error accusamus vitae, suscipit facere nostrum
          sunt.
        </p>
      </div>
      <div
        style={{
          top: '500vh',
          position: 'absolute',
          height: '100vh',
          width: 'calc(100vw - 2vmin)',
          padding: '1vmin',
          mixBlendMode: 'difference',
          display: 'grid',
          gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
        }}
      >
        <p style={{ gridColumnStart: 2, fontSize: '1.5rem' }}>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sint
          excepturi, mollitia deleniti rerum dolorum incidunt ab aliquam
          sapiente nobis iure, magni eius vel. Minus, vero tenetur non atque nam
          nesciunt?
        </p>
      </div>
      <div
        style={{
          top: '800vh',
          position: 'absolute',
          height: '100vh',
          width: 'calc(100vw - 2vmin)',
          padding: '1vmin',
          mixBlendMode: 'difference',
          display: 'grid',
          gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
        }}
      >
        <p style={{ gridColumnStart: 2, fontSize: '1.5rem' }}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptas,
          rem adipisci, enim vitae numquam unde, et temporibus vero quam maiores
          culpa molestiae ut eos possimus id tempore ipsum accusamus similique.
        </p>
      </div>
    </>
  )
}
