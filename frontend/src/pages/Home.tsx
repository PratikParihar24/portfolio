import HeroSection from '../components/sections/HeroSection'
import AboutSection from '../components/sections/AboutSection'
import ProjectsSection from '../components/sections/ProjectsSection'
import SkillsSection from '../components/sections/SkillsSection'
import AchievementsSection from '../components/sections/AchievementsSection'
import ContactSection from '../components/sections/ContactSection'
import { motion, useScroll, useSpring } from 'framer-motion'
import React, { useEffect, useRef, useState } from 'react'
import { useAppStore } from '../store/useAppStore'
import { ArrowDown, ArrowUp } from 'lucide-react'

const SECTION_IDS = ['hero', 'about', 'projects', 'skills', 'achievements', 'contact']

function SectionTracker({ id, children }: { id: string, children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const setSection = useAppStore(state => state.setSection)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setSection(id)
      }
    }, { threshold: 0.25 })

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [id, setSection])

  return <div id={id} ref={ref}>{children}</div>
}

export default function Home() {
  const { scrollYProgress } = useScroll()
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })
  const currentSection = useAppStore(state => state.currentSection)
  const [isAtBottom, setIsAtBottom] = useState(false)

  // Track if user is near the bottom of the page
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.innerHeight + window.scrollY
      const docHeight = document.documentElement.offsetHeight
      setIsAtBottom(scrollPos >= docHeight - 120)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleSkipSection = () => {
    if (isAtBottom) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }

    const currentIndex = SECTION_IDS.indexOf(currentSection)
    const nextIndex = currentIndex >= 0 && currentIndex < SECTION_IDS.length - 1 ? currentIndex + 1 : 1
    const nextSectionId = SECTION_IDS[nextIndex]
    const targetElement = document.getElementById(nextSectionId)

    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <div className="relative pb-32">
      {/* Storytelling scroll line connecting the sections */}
      <motion.div 
        className="absolute left-6 md:left-12 top-0 bottom-0 w-[2px] bg-accent/50 origin-top hidden md:block z-0"
        style={{ scaleY }}
      />
      
      <div className="relative z-10 flex flex-col gap-16">
        <SectionTracker id="hero"><HeroSection /></SectionTracker>
        <SectionTracker id="about"><AboutSection /></SectionTracker>
        <SectionTracker id="projects"><ProjectsSection /></SectionTracker>
        <SectionTracker id="skills"><SkillsSection /></SectionTracker>
        <SectionTracker id="achievements"><AchievementsSection /></SectionTracker>
        <SectionTracker id="contact"><ContactSection /></SectionTracker>
      </div>

      {/* Global Floating Skip Button on Bottom Right */}
      <div className="fixed bottom-6 right-6 z-40">
        <motion.button
          onClick={handleSkipSection}
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.95 }}
          title={isAtBottom ? "Back to top" : `Skip to next section`}
          aria-label={isAtBottom ? "Back to top" : "Skip to next section"}
          className="w-12 h-12 rounded-full bg-accent text-zinc-950 flex items-center justify-center shadow-lg hover:shadow-xl transition-all cursor-pointer font-bold border-2 border-white dark:border-zinc-900 group"
        >
          {isAtBottom ? (
            <ArrowUp size={20} className="transition-transform group-hover:-translate-y-0.5" />
          ) : (
            <ArrowDown size={20} className="animate-bounce" />
          )}
        </motion.button>
      </div>
    </div>
  )
}
