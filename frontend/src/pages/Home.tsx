import HeroSection from '../components/sections/HeroSection'
import AboutSection from '../components/sections/AboutSection'
import ProjectsSection from '../components/sections/ProjectsSection'
import SkillsSection from '../components/sections/SkillsSection'
import AchievementsSection from '../components/sections/AchievementsSection'
import ContactSection from '../components/sections/ContactSection'
import { motion, useScroll, useSpring } from 'framer-motion'

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
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <SkillsSection />
        <AchievementsSection />
        <ContactSection />
      </div>
    </div>
  )
}
