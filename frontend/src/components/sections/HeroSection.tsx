import content from '../../data/content.json'
import { motion } from 'framer-motion'
import GithubFeed from '../ui/GithubFeed'
import heroImg from '../../assets/hero.webp'
import { Search } from 'lucide-react'
import { useAppStore } from '../../store/useAppStore'

export default function HeroSection() {
  const { profile } = content
  const setCommandOpen = useAppStore(state => state.setCommandOpen)

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative pt-24 overflow-hidden">
      <div className="max-w-7xl w-full mx-auto px-6 flex flex-col lg:flex-row items-center lg:items-start lg:justify-center lg:-translate-x-8 gap-12 lg:gap-20 z-10 lg:pt-12">
        
        {/* Left Column: Intro text and call-to-actions */}
        <div className="w-full lg:w-[550px] flex flex-col items-start text-left relative pl-0 lg:pl-4">
          <motion.p 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-2xl md:text-3xl font-medium tracking-tight mb-2"
            style={{ color: 'var(--accent-color)' }}
          >
            Hy! I Am
          </motion.p>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 tracking-tighter"
            style={{ color: 'var(--text-main)' }}
          >
            {profile.name}
          </motion.h1>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-wrap gap-4 items-center mb-12 w-full"
          >
            <motion.a 
              href="#projects" 
              whileTap={{ scale: 0.97 }}
              className="px-8 py-3.5 rounded-full font-bold glow-effect hover:glow-hover transition-all text-sm md:text-base flex items-center justify-center"
              style={{ backgroundColor: 'var(--accent-color)', color: '#09090B' }}
            >
              View Projects
            </motion.a>

            <motion.button 
              onClick={() => setCommandOpen(true)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-3 px-6 py-3.5 rounded-full border text-sm font-medium glass-panel shadow-sm hover:shadow-md transition-all cursor-pointer text-left w-full sm:w-auto"
              style={{ borderColor: 'var(--glass-border)', color: 'var(--secondary-color)' }}
            >
              <Search size={16} className="text-secondary" />
              <span>Press ⌘K to navigate</span>
            </motion.button>
          </motion.div>

          {/* Curved pointing arrow arching from above "Parihar" down-right to the photo frame */}
          <div className="absolute right-[-135px] top-[52px] w-44 h-20 hidden lg:block pointer-events-none z-20">
            <svg viewBox="0 0 180 80" fill="none" className="w-full h-full">
              <motion.path 
                d="M 10 60 Q 80 15, 150 50" 
                stroke="var(--accent-color)" 
                strokeWidth="2.5" 
                strokeDasharray="6 6"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, delay: 0.8 }}
              />
              <motion.path 
                d="M 132 46 L 150 50 L 142 32" 
                stroke="var(--accent-color)" 
                strokeWidth="2.5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.0 }}
              />
            </svg>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="w-full"
          >
            <GithubFeed />
          </motion.div>
        </div>

        {/* Right Column: Profile Image + Large text behind */}
        <div className="flex-shrink-0 flex flex-col justify-center items-center relative select-none mt-12 lg:mt-0">
          {/* Full Stack Label styled above picture - Center aligned */}
          <motion.span 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-sm md:text-base font-heading font-black tracking-[0.3em] text-accent mb-4 z-20 uppercase bg-accent/10 border border-accent/20 px-4 py-1.5 rounded-full"
          >
            Full Stack
          </motion.span>

          {/* Huge background text outline "DEVELOPER" behind - centered and scaled to prevent clipping */}
          <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none select-none overflow-visible w-[200%] -ml-[50%]">
            <span className="text-outline text-5xl md:text-6xl lg:text-[5.5rem] font-black tracking-[0.1em] uppercase whitespace-nowrap transform translate-y-6 select-none opacity-80">
              DEVELOPER
            </span>
          </div>

          {/* Styled Photo Frame - sized to fit standard screens perfectly */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.3 }}
            className="relative w-56 h-56 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-full p-2 border-2 border-dashed z-10"
            style={{ borderColor: 'var(--glass-border)' }}
          >
            <div className="w-full h-full rounded-full overflow-hidden border-4 border-accent relative bg-gradient-to-tr from-accent/20 to-transparent">
              <img 
                src={heroImg} 
                alt={profile.name} 
                className="w-full h-full object-cover scale-105 hover:scale-110 transition-transform duration-500" 
              />
            </div>
            {/* Ambient glow decoration under the photo */}
            <div className="absolute inset-0 bg-accent/20 rounded-full blur-[60px] -z-10" />
          </motion.div>
        </div>

      </div>
    </section>
  )
}
