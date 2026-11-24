import content from '../../data/content.json'
import { motion } from 'framer-motion'
import heroImg from '../../assets/hero.webp'
import { Search } from 'lucide-react'
import { useAppStore } from '../../store/useAppStore'

export default function HeroSection() {
  const { profile } = content
  const setCommandOpen = useAppStore(state => state.setCommandOpen)

  return (
    <section id="hero" className="min-h-[85vh] md:min-h-screen flex items-center justify-center relative pt-20 md:pt-24 pb-12 overflow-hidden">
      <div className="max-w-5xl w-full mx-auto px-4 sm:px-6 flex flex-col-reverse lg:flex-row items-center justify-between gap-8 lg:gap-16 z-10">
        
        {/* Left Column: Intro text and call-to-actions */}
        <div className="w-full lg:max-w-xl flex flex-col items-center lg:items-start text-center lg:text-left relative">
          <motion.p 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-lg sm:text-2xl font-medium tracking-tight mb-2"
            style={{ color: 'var(--accent-color)' }}
          >
            Hy! I Am
          </motion.p>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-7xl font-black mb-4 sm:mb-6 tracking-tighter"
            style={{ color: 'var(--text-main)' }}
          >
            {profile.name}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="text-secondary text-sm sm:text-base md:text-lg mb-8 max-w-lg leading-relaxed"
          >
            {profile.tagline}
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-wrap gap-3 sm:gap-4 items-center justify-center lg:justify-start w-full"
          >
            <motion.a 
              href="#projects" 
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 sm:px-8 py-3 sm:py-3.5 rounded-full font-bold glow-effect hover:glow-hover transition-all text-sm md:text-base flex items-center justify-center cursor-pointer shadow-md"
              style={{ backgroundColor: 'var(--accent-color)', color: '#09090B' }}
            >
              View Projects
            </motion.a>

            <motion.button 
              onClick={() => setCommandOpen(true)}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-3 px-5 sm:px-6 py-3 sm:py-3.5 rounded-full border text-sm font-medium glass-panel shadow-xs hover:shadow-md hover:border-accent/40 transition-all cursor-pointer text-left"
              style={{ borderColor: 'var(--glass-border)', color: 'var(--secondary-color)' }}
            >
              <Search size={16} className="text-accent transition-transform duration-300 group-hover:rotate-12" />
              <span className="font-semibold text-text-main">Quick Search</span>
              <kbd className="hidden sm:inline-block text-[10px] uppercase font-bold px-2 py-0.5 rounded-md bg-black/5 dark:bg-white/10 text-secondary border border-black/10 dark:border-white/10">
                Ctrl + K
              </kbd>
            </motion.button>
          </motion.div>

          {/* Curved pointing arrow on large screens only */}
          <div className="absolute right-[-110px] top-[40px] w-36 h-20 hidden xl:block pointer-events-none z-20">
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
        </div>

        {/* Right Column: Profile Image */}
        <div className="flex-shrink-0 flex flex-col justify-center items-center relative select-none">
          <motion.span 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: [0, -4, 0] }}
            transition={{ 
              opacity: { delay: 0.2 },
              y: { repeat: Infinity, duration: 4, ease: "easeInOut" }
            }}
            className="text-xs sm:text-sm font-heading font-black tracking-[0.25em] text-accent mb-3 uppercase bg-accent/10 border border-accent/20 px-3.5 py-1 rounded-full cursor-default shadow-xs"
          >
            Full Stack
          </motion.span>

          {/* Styled Photo Frame */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.04, rotate: 2 }}
            transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.3 }}
            className="relative w-44 h-44 sm:w-60 sm:h-60 md:w-72 md:h-72 rounded-full p-2 border-2 border-dashed z-10 cursor-pointer shadow-lg"
            style={{ borderColor: 'var(--glass-border)' }}
          >
            <div className="w-full h-full rounded-full overflow-hidden border-4 border-accent relative bg-gradient-to-tr from-accent/20 to-transparent">
              <img 
                src={heroImg} 
                alt={profile.name} 
                className="w-full h-full object-cover scale-105 hover:scale-115 transition-transform duration-500" 
              />
            </div>
            <div className="absolute inset-0 bg-accent/20 rounded-full blur-[40px] md:blur-[60px] -z-10" />
          </motion.div>
        </div>

      </div>
    </section>
  )
}
