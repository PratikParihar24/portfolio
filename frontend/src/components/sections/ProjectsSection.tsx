import content from '../../data/content.json'
import { ExternalLink, Code, Info, Lock, Unlock } from 'lucide-react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useAppStore } from '../../store/useAppStore'
import { useRef, useState } from 'react'
import ScrollFadeText from '../ui/ScrollFadeText'

const UTILITIES = [
  {
    id: 'focusflow',
    title: 'FocusFlow',
    oneLiner: 'Chrome extension for tab management, deep work, and site blocking. Keeps developers focused.',
    tech: ['Chrome Extension APIs', 'JavaScript', 'CSS3', 'HTML5'],
    liveUrl: '#',
    repoUrl: 'https://github.com/PratikParihar24/FocusFlow'
  },
  {
    id: 'css-gradient-generator',
    title: 'CSS Gradient Generator',
    oneLiner: 'Interactive tool to design, preview, and copy CSS gradients with support for linear, radial, and mesh outputs.',
    tech: ['React', 'Tailwind CSS', 'Framer Motion'],
    liveUrl: '#',
    repoUrl: 'https://github.com/PratikParihar24/css-gradient-generator'
  }
]

function ProjectCard({ project, idx, theme }: { project: any, idx: number, theme: string }) {
  const [isHovered, setIsHovered] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 100px", "end start"]
  })

  const dimScale = useTransform(scrollYProgress, [0, 1], [1, 0.92])
  const dimOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.1])

  const bgOpacity = theme === 'dark' ? 'rgba(39, 39, 42, 0.6)' : 'rgba(255, 255, 255, 0.4)'

  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative md:sticky"
      style={{ 
        top: `calc(5rem + ${idx * 1.5}rem)`, 
        zIndex: idx + 10,
      }}
    >
      <motion.div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        animate={isHovered && project.id === 'pattern-vault' ? {
          x: [0, -2, 2, -1, 1, 0],
          y: [0, 1, -1, 1, -1, 0],
          transition: { duration: 0.3 }
        } : {}}
        style={{
          scale: dimScale,
          opacity: dimOpacity,
          background: bgOpacity,
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}
        className="glass-panel p-6 md:p-8 shadow-2xl transition-all duration-500 glow-effect"
      >
        
        {/* Title row + links — always visible even when stacked, high z-index */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4 relative" style={{ zIndex: 50 }}>
          <div className="flex items-center gap-2">
            {project.id === 'pattern-vault' && (
              <motion.span 
                animate={isHovered ? { rotate: [0, -10, 10, -10, 0], scale: 1.1 } : {}}
                className="text-accent inline-block mr-1 align-middle"
              >
                {isHovered ? <Unlock size={24} /> : <Lock size={24} />}
              </motion.span>
            )}
            <h3 className="text-2xl md:text-3xl font-bold" style={{ color: 'var(--text-main)' }}>{project.title}</h3>
          </div>
          
          <div className="flex gap-3 shrink-0">
            {project.repoUrl && !project.repoUrl.includes('[') && (
              <motion.a 
                href={project.repoUrl} target="_blank" rel="noreferrer" 
                whileTap={{ scale: 0.97 }}
                className="p-3 rounded-full border transition-all hover:scale-110 flex items-center justify-center cursor-pointer"
                style={{ backgroundColor: 'var(--surface-color)', borderColor: 'var(--glass-border)', color: 'var(--text-main)' }}
              >
                <Code size={18} />
              </motion.a>
            )}
            {project.liveUrl && !project.liveUrl.includes('[') && (
              <motion.a 
                href={project.liveUrl.startsWith('http') ? project.liveUrl : `https://${project.liveUrl}`} 
                target="_blank" rel="noreferrer" 
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 px-5 py-2.5 bg-accent rounded-full font-bold glow-effect hover:glow-hover transition-all text-sm cursor-pointer"
                style={{ color: '#09090B' }}
              >
                <span>Live</span>
                <ExternalLink size={16} />
              </motion.a>
            )}
          </div>
        </div>

        {/* Content */}
        <div>
          <p className="text-base mb-4 max-w-2xl" style={{ color: 'var(--secondary-color)' }}>
            {project.oneLiner}
          </p>

          <div className="flex flex-wrap gap-2 mb-4">
            {project.tech.map((t: string) => (
              <span 
                key={t} 
                className="px-3 py-1 rounded-md text-xs font-semibold"
                style={{ 
                  backgroundColor: 'var(--surface-color)', 
                  border: '1px solid var(--glass-border)',
                  color: 'var(--text-main)'
                }}
              >
                {t}
              </span>
            ))}
          </div>

          <div className="border-l-2 pl-6 space-y-4 relative" style={{ borderColor: 'var(--glass-border)' }}>
            {project.decisions.map((decision: any, i: number) => {
              if (decision.decision.includes('[ADD DECISION')) return null;
              return (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="relative"
                >
                  <div className="absolute -left-[33px] top-1 w-4 h-4 rounded-full bg-accent glow-effect"></div>
                  <h4 className="font-bold text-lg mb-1" style={{ color: 'var(--text-main)' }}>{decision.decision}</h4>
                  <p style={{ color: 'var(--secondary-color)' }}>{decision.reasoning}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function ProjectsSection() {
  const { projects } = content
  const setActiveContext = useAppStore(state => state.setActiveContext)
  const theme = useAppStore(state => state.theme)

  return (
    <section id="projects" className="pt-10 pb-20 max-w-5xl mx-auto px-6">
      <motion.h2 
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        className="text-3xl font-bold mb-16 flex items-center gap-3"
        style={{ color: 'var(--text-main)' }}
      >
        Projects
        <button 
          onClick={() => setActiveContext("I focus on the engineering decisions rather than just listing tech stacks. Knowing *why* a tool was used is more important than knowing it exists.")} 
          aria-label="Toggle engineering context"
          className="hover:text-accent transition-colors cursor-pointer w-11 h-11 flex items-center justify-center rounded-full"
          style={{ color: 'var(--secondary-color)' }}
          title="Why this format?"
        >
          <Info size={20} />
        </button>
      </motion.h2>

      <div className="space-y-[45vh] pb-[20vh]">
        {projects.map((project, idx) => (
          <ProjectCard key={project.id} project={project} idx={idx} theme={theme} />
        ))}
      </div>

      {/* Developer Utilities sub-layout */}
      <div className="mt-32 pt-16 border-t border-glass-border">
        <h3 className="text-2xl font-bold mb-8 text-text-main">
          Developer Utilities
        </h3>
        <motion.div 
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: { staggerChildren: 0.1 }
            }
          }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {UTILITIES.map((util) => (
            <motion.div
              key={util.id}
              variants={{
                hidden: { opacity: 0, y: 30 },
                show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
              }}
              whileHover={{ y: -6 }}
              className="glass-panel p-6 flex flex-col justify-between hover:glow-hover transition-all border border-white/5 glow-effect"
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <h4 className="text-xl font-bold" style={{ color: 'var(--text-main)' }}>
                    {util.title}
                  </h4>
                  <div className="flex gap-2 shrink-0">
                    <motion.a
                      href={util.repoUrl} target="_blank" rel="noreferrer"
                      whileTap={{ scale: 0.97 }}
                      className="p-2 rounded-full border transition-all hover:scale-105 flex items-center justify-center cursor-pointer"
                      style={{ backgroundColor: 'var(--surface-color)', borderColor: 'var(--glass-border)', color: 'var(--text-main)' }}
                    >
                      <Code size={14} />
                    </motion.a>
                    {util.liveUrl && util.liveUrl !== '#' && (
                      <motion.a
                        href={util.liveUrl} target="_blank" rel="noreferrer"
                        whileTap={{ scale: 0.97 }}
                        className="p-2 rounded-full border transition-all hover:scale-105 flex items-center justify-center cursor-pointer"
                        style={{ backgroundColor: 'var(--surface-color)', borderColor: 'var(--glass-border)', color: 'var(--text-main)' }}
                      >
                        <ExternalLink size={14} />
                      </motion.a>
                    )}
                  </div>
                </div>
                <p className="text-sm mb-6 leading-relaxed" style={{ color: 'var(--secondary-color)' }}>
                  {util.oneLiner}
                </p>
              </div>
              <div className="flex flex-wrap gap-2 mt-auto">
                {util.tech.map((t) => (
                  <span 
                    key={t}
                    className="px-2.5 py-1 rounded border text-[10px] font-semibold"
                    style={{ 
                      backgroundColor: 'var(--surface-color)', 
                      borderColor: 'var(--glass-border)', 
                      color: 'var(--text-main)' 
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="mt-40">
        <ScrollFadeText 
          className="text-center text-3xl md:text-4xl font-curvy tracking-wide"
          style={{ 
            fontFamily: "'Caveat', cursive",
            color: 'var(--accent-color)',
            textShadow: '0 0 15px rgba(34, 197, 94, 0.15)'
          }}
        >
          Behind these projects is a core set of skills... ↓
        </ScrollFadeText>
      </div>
    </section>
  )
}
