import HeroSection from '../components/sections/HeroSection'
import AboutSection from '../components/sections/AboutSection'
import ProjectsSection from '../components/sections/ProjectsSection'
import SkillsSection from '../components/sections/SkillsSection'
import AchievementsSection from '../components/sections/AchievementsSection'
import ContactSection from '../components/sections/ContactSection'
import { motion, useScroll, useSpring } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { useAppStore } from '../store/useAppStore'

function SectionTracker({ id, children }: { id: string, children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const setSection = useAppStore(state => state.setSection)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setSection(id)
      }
    }, { threshold: 0.2 }) // Trigger when 20% visible

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [id, setSection])

  return <div ref={ref}>{children}</div>
}

export default function Home() {
  const { scrollYProgress } = useScroll()
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })

  return (
    <div className="relative pb-32">
      {/* Storytelling scroll line connecting the sections */}
      <motion.div 
        className="absolute left-6 md:left-12 top-0 bottom-0 w-[2px] bg-accent/50 origin-top hidden md:block z-0"
        style={{ scaleY }}
      />
      
      <div className="relative z-10 flex flex-col gap-32">
        <SectionTracker id="hero"><HeroSection /></SectionTracker>
        <SectionTracker id="about"><AboutSection /></SectionTracker>
        <SectionTracker id="projects"><ProjectsSection /></SectionTracker>
        <SectionTracker id="skills"><SkillsSection /></SectionTracker>
        <SectionTracker id="achievements"><AchievementsSection /></SectionTracker>
        <SectionTracker id="contact"><ContactSection /></SectionTracker>
      </div>
    </div>
  )
}
