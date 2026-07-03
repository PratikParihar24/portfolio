import { motion, useScroll, useTransform } from 'framer-motion'
import React, { useRef } from 'react'

interface ScrollFadeTextProps {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
}

export default function ScrollFadeText({ children, className = "", style = {} }: ScrollFadeTextProps) {
  const ref = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  // Fade out and translate upwards as the element scrolls from the center towards the top of the viewport
  const opacity = useTransform(scrollYProgress, [0, 0.55, 0.8], [1, 1, 0])
  const y = useTransform(scrollYProgress, [0, 0.55, 0.8], [0, 0, -25])

  return (
    <motion.div ref={ref} style={{ opacity, y, ...style }} className={className}>
      {children}
    </motion.div>
  )
}
