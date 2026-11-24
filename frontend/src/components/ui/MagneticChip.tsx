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

  // Spring physics matching: stiffness: 220, damping: 18
  const springX = useSpring(x, { stiffness: 220, damping: 18 })
  const springY = useSpring(y, { stiffness: 220, damping: 18 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    // Calculate cursor relative to center of chip
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const cursorX = e.clientX - centerX
    const cursorY = e.clientY - centerY

    requestAnimationFrame(() => {
      // Proximity translation: pull chip slightly towards cursor
      x.set(cursorX * 0.16)
      y.set(cursorY * 0.16)
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
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      variants={variants}
      style={{
        x: springX,
        y: springY,
        ...style,
      }}
      className={`relative z-10 select-none cursor-pointer group transition-all duration-200 border border-black/10 dark:border-white/10 bg-white dark:bg-zinc-800 text-text-main shadow-xs hover:border-accent hover:shadow-[0_4px_16px_rgba(34,197,94,0.18)] dark:hover:shadow-[0_0_18px_rgba(34,197,94,0.25)] ${className}`}
    >
      {children}
    </motion.div>
  )
}
