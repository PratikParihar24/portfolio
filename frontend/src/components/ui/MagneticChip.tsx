import { motion, useMotionValue, useSpring } from 'framer-motion'
import React, { useRef } from 'react'

interface MagneticChipProps {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
  variants?: any
}

export default function MagneticChip({ children, className = "", style = {}, variants }: MagneticChipProps) {
  const ref = useRef<HTMLDivElement>(null)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  // Spring physics matching: stiffness: 150, damping: 15
  const springX = useSpring(x, { stiffness: 150, damping: 15 })
  const springY = useSpring(y, { stiffness: 150, damping: 15 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    // Calculate cursor relative to center of chip
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const cursorX = e.clientX - centerX
    const cursorY = e.clientY - centerY

    requestAnimationFrame(() => {
      // Proximity translation: x: cursor.x * 0.12, y: cursor.y * 0.12
      x.set(cursorX * 0.12)
      y.set(cursorY * 0.12)
    })
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      variants={variants}
      style={{
        x: springX,
        y: springY,
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        ...style,
      }}
      className={`glass-panel cursor-default relative z-10 ${className}`}
    >
      {children}
    </motion.div>
  )
}
