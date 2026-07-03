import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import React, { useRef, useState } from 'react'

interface TiltCardProps {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
  variants?: any
}

export default function TiltCard({ children, className = "", style = {}, variants }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  // Smooth springs for tilt: rotation range [-10, 10] degrees
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), { stiffness: 150, damping: 15 })
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), { stiffness: 150, damping: 15 })

  // Glare positions
  const glareX = useSpring(useTransform(x, [-0.5, 0.5], [0, 100]), { stiffness: 150, damping: 15 })
  const glareY = useSpring(useTransform(y, [-0.5, 0.5], [0, 100]), { stiffness: 150, damping: 15 })
  const glareOpacity = useMotionValue(0)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    // Calculate normalized mouse positions relative to center [-0.5, 0.5]
    const relativeX = (e.clientX - rect.left) / rect.width - 0.5
    const relativeY = (e.clientY - rect.top) / rect.height - 0.5
    
    requestAnimationFrame(() => {
      x.set(relativeX)
      y.set(relativeY)
      glareOpacity.set(0.4)
    })
  }

  const handleMouseEnter = () => setIsHovered(true)

  const handleMouseLeave = () => {
    setIsHovered(false)
    x.set(0)
    y.set(0)
    glareOpacity.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      variants={variants}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        perspective: '1000px',
        willChange: isHovered ? 'transform' : 'auto',
        ...style,
      }}
      className={`glass-panel overflow-hidden relative transition-all duration-300 ${className}`}
    >
      {/* Dynamic Glare Overlay */}
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at var(--glare-x, 50%) var(--glare-y, 50%), rgba(255,255,255,0.15) 0%, transparent 60%)',
          opacity: glareOpacity,
          zIndex: 5,
          pointerEvents: 'none',
          '--glare-x': useTransform(glareX, (val) => `${val}%`),
          '--glare-y': useTransform(glareY, (val) => `${val}%`),
        } as any}
      />
      
      <div style={{ transform: 'translateZ(20px)' }} className="relative z-10 w-full h-full flex flex-col justify-between">
        {children}
      </div>
    </motion.div>
  )
}
