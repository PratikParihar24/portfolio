import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Resume from './pages/Resume'
import { useAppStore } from './store/useAppStore'
import React, { useEffect } from 'react'
import { useMotionValue, useSpring, motion } from 'framer-motion'
import ContextualGuide from './components/ui/ContextualGuide'
import CommandPalette from './components/ui/CommandPalette'
import { Moon, Sun, Command } from 'lucide-react'
import { Link } from 'react-router-dom'

import Scene from './components/3d/Scene'

// Custom SVG Brand Icons since they are not included in newer lucide-react versions
const Github = ({ size = 24, ...props }: { size?: number } & React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
)

const Linkedin = ({ size = 24, ...props }: { size?: number } & React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
)

import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { AnimatePresence } from 'framer-motion'

// NavBar with proper glass styling, theme toggle, and macOS status-bar style auto-reveal on top hover
const NavBar = () => {
  const { theme, toggleTheme, setCommandOpen } = useAppStore()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [visible, setVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      // 1. Show navbar when near top
      if (currentScrollY < 20) {
        setVisible(true)
      } 
      // 2. Hide when scrolling down past 50px
      else if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setVisible(false)
      } 
      // 3. Show when scrolling up
      else if (currentScrollY < lastScrollY) {
        setVisible(true)
      }
      setLastScrollY(currentScrollY)
    }

    const handleMouseMove = (e: MouseEvent) => {
      // Desktop top edge hover detection (if cursor is within top 40px of screen)
      if (e.clientY <= 40) {
        setVisible(true)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('mousemove', handleMouseMove, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [lastScrollY])

  return (
    <>
      <motion.nav 
        initial={{ y: 0 }}
        animate={{ y: visible ? 0 : -90 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50 px-6 py-3.5 flex justify-between items-center border-b shadow-sm"
        style={{ 
          backgroundColor: 'var(--navbar-bg)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderColor: 'var(--glass-border)'
        }}
      >
        {/* Brand Logo / Home indicator */}
        <Link 
          to="/" 
          className="text-lg font-black tracking-tight flex items-center gap-2 hover:opacity-80 transition-opacity"
          style={{ color: 'var(--text-main)' }}
        >
          <span className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse" />
          <span>Pratik Parihar</span>
        </Link>

        {/* Mobile Left: Hamburger */}
        <div className="md:hidden">
          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open menu"
            className="w-10 h-10 flex items-center justify-center rounded-full border transition-all hover:scale-105 hover:bg-accent/10 cursor-pointer"
            style={{ 
              backgroundColor: 'var(--surface-color)', 
              borderColor: 'var(--glass-border)',
              color: 'var(--text-main)' 
            }}
          >
            <Menu size={18} />
          </button>
        </div>

        {/* Right Nav Items: Uniform 40px (h-10) Height Buttons */}
        <div className="hidden md:flex gap-2.5 items-center">
          <a 
            href="/resume.pdf" 
            target="_blank"
            rel="noreferrer"
            className="h-10 px-5 rounded-full border text-sm font-bold flex items-center justify-center transition-all hover:scale-105 hover:bg-accent/10 active:scale-95 cursor-pointer"
            style={{ 
              backgroundColor: 'var(--surface-color)', 
              borderColor: 'var(--glass-border)',
              color: 'var(--text-main)' 
            }}
          >
            Resume
          </a>
          <a 
            href="#contact" 
            className="h-10 px-5 rounded-full border text-sm font-bold flex items-center justify-center transition-all hover:scale-105 hover:bg-accent/10 active:scale-95 cursor-pointer"
            style={{ 
              backgroundColor: 'var(--surface-color)', 
              borderColor: 'var(--glass-border)',
              color: 'var(--text-main)' 
            }}
          >
            Contact Me
          </a>
          
          <button 
            onClick={() => setCommandOpen(true)}
            aria-label="Open Command Palette"
            className="w-10 h-10 rounded-full border flex items-center justify-center transition-all hover:scale-105 hover:bg-accent/10 active:scale-95 cursor-pointer"
            style={{ 
              backgroundColor: 'var(--surface-color)', 
              borderColor: 'var(--glass-border)',
              color: 'var(--text-main)' 
            }}
          >
            <Command size={18} />
          </button>

          <a 
            href="https://github.com/PratikParihar24/" 
            target="_blank" 
            rel="noreferrer"
            aria-label="GitHub"
            className="w-10 h-10 rounded-full border flex items-center justify-center transition-all hover:scale-105 hover:bg-accent/10 active:scale-95 cursor-pointer"
            style={{ 
              backgroundColor: 'var(--surface-color)', 
              borderColor: 'var(--glass-border)',
              color: 'var(--text-main)' 
            }}
          >
            <Github size={18} />
          </a>
          <a 
            href="https://www.linkedin.com/in/pratik-parihar-892a022a0/" 
            target="_blank" 
            rel="noreferrer"
            aria-label="LinkedIn"
            className="w-10 h-10 rounded-full border flex items-center justify-center transition-all hover:scale-105 hover:bg-accent/10 active:scale-95 cursor-pointer"
            style={{ 
              backgroundColor: 'var(--surface-color)', 
              borderColor: 'var(--glass-border)',
              color: 'var(--text-main)' 
            }}
          >
            <Linkedin size={18} />
          </a>
          <button 
            onClick={toggleTheme} 
            aria-label="Toggle dark mode"
            className="w-10 h-10 rounded-full border flex items-center justify-center transition-all hover:scale-105 hover:bg-accent/10 active:scale-95 cursor-pointer"
            style={{ 
              backgroundColor: 'var(--surface-color)', 
              borderColor: 'var(--glass-border)',
              color: 'var(--text-main)' 
            }}
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex md:hidden"
          >
            {/* Glassmorphism Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute inset-0 bg-black/20 dark:bg-black/40 backdrop-blur-md"
            />
            
            {/* Sidebar */}
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-64 h-full border-r shadow-2xl flex flex-col p-6 gap-6"
              style={{ 
                backgroundColor: 'var(--navbar-bg)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                borderColor: 'var(--glass-border)',
              }}
            >
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-10 h-10 flex items-center justify-center rounded-full border self-start transition-all hover:scale-105 hover:bg-accent/10 cursor-pointer"
                style={{ 
                  backgroundColor: 'var(--surface-color)', 
                  borderColor: 'var(--glass-border)',
                  color: 'var(--text-main)' 
                }}
              >
                <X size={18} />
              </button>
              
              <div className="flex flex-col gap-4 mt-4">
                <a 
                  href="/resume.pdf" 
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-4 py-3 flex items-center justify-center rounded-xl border text-sm font-bold transition-all hover:bg-accent/10 cursor-pointer"
                  style={{ 
                    backgroundColor: 'var(--surface-color)', 
                    borderColor: 'var(--glass-border)',
                    color: 'var(--text-main)' 
                  }}
                >
                  Resume (PDF)
                </a>
                <a 
                  href="#contact" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-4 py-3 flex items-center justify-center rounded-xl border text-sm font-bold transition-all hover:bg-accent/10 cursor-pointer"
                  style={{ 
                    backgroundColor: 'var(--surface-color)', 
                    borderColor: 'var(--glass-border)',
                    color: 'var(--text-main)' 
                  }}
                >
                  Contact Me
                </a>
                <button 
                  onClick={() => {
                    setCommandOpen(true)
                    setIsMobileMenuOpen(false)
                  }}
                  className="px-4 py-3 flex items-center justify-between rounded-xl border text-sm font-bold transition-all hover:bg-accent/10 cursor-pointer"
                  style={{ 
                    backgroundColor: 'var(--surface-color)', 
                    borderColor: 'var(--glass-border)',
                    color: 'var(--text-main)' 
                  }}
                >
                  <span>Search Menu</span>
                  <Command size={18} className="text-secondary" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}


function AmbientFlashlight() {
  const mouseX = useMotionValue(-1000)
  const mouseY = useMotionValue(-1000)

  // Smooth springs for cursor movement
  const springX = useSpring(mouseX, { stiffness: 100, damping: 30 })
  const springY = useSpring(mouseY, { stiffness: 100, damping: 30 })

  useEffect(() => {
    let frameId: number
    const handleMouseMove = (e: MouseEvent) => {
      cancelAnimationFrame(frameId)
      frameId = requestAnimationFrame(() => {
        // Offset by half of flashlight width (40vw / 2 = 20vw of screen width)
        const radius = window.innerWidth * 0.2
        mouseX.set(e.clientX - radius)
        mouseY.set(e.clientY - radius)
      })
    }
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(frameId)
    }
  }, [mouseX, mouseY])

  return (
    <motion.div
      style={{
        x: springX,
        y: springY,
        width: '40vw',
        height: '40vw',
        background: 'radial-gradient(circle, rgba(34,197,94,0.12) 0%, transparent 60%)',
        filter: 'blur(80px)',
      }}
      className="fixed top-0 left-0 pointer-events-none rounded-full z-[-1]"
    />
  )
}

function App() {
  const theme = useAppStore(state => state.theme)
  
  // Sync dark class on mount and theme change
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  return (
    <Router>
      <AmbientFlashlight />
      <Scene />
      <ContextualGuide />
      <CommandPalette />
      <div className="relative z-30">
        <NavBar />
      </div>
      <div className="relative z-10">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/resume" element={<Resume />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
