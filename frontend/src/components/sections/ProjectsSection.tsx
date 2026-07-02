import content from '../../data/content.json'
import { ExternalLink, Code, Info } from 'lucide-react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useAppStore } from '../../store/useAppStore'
import { useRef } from 'react'

function ProjectCard({ project, idx }: { project: any, idx: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start start", "start -100%"]
  })

  const contentOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0])
  const cardScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.97])

  return (
    <motion.div 
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className="relative md:sticky"
      style={{ 
        top: `calc(5rem + ${idx * 1.5}rem)`, 
        zIndex: idx + 10,
        scale: cardScale
      }}
    >
      <div className="glass-panel p-8 md:p-12 shadow-2xl">
        
        {/* Title row + links — always visible even when stacked, high z-index */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4 relative" style={{ zIndex: 50 }}>
          <h3 className="text-2xl md:text-3xl font-bold" style={{ color: 'var(--text-main)' }}>{project.title}</h3>
          <div className="flex gap-3 shrink-0">
            {project.repoUrl && !project.repoUrl.includes('[') && (
              <a 
                href={project.repoUrl} target="_blank" rel="noreferrer" 
                className="p-3 rounded-full border transition-all hover:scale-110"
                style={{ backgroundColor: 'var(--surface-color)', borderColor: 'var(--glass-border)', color: 'var(--text-main)' }}
              >
                <Code size={18} />
              </a>
            )}
            {project.liveUrl && !project.liveUrl.includes('[') && (
              <a 
                href={project.liveUrl.startsWith('http') ? project.liveUrl : `https://${project.liveUrl}`} 
                target="_blank" rel="noreferrer" 
                className="flex items-center gap-2 px-5 py-2.5 bg-accent rounded-full font-bold glow-effect hover:glow-hover transition-all text-sm"
                style={{ color: '#09090B' }}
              >
                <span>Live</span>
                <ExternalLink size={16} />
              </a>
            )}
          </div>
        </div>

        {/* Content that fades when card recedes */}
        <motion.div style={{ opacity: contentOpacity }}>
          <p className="text-lg mb-6 max-w-2xl" style={{ color: 'var(--secondary-color)' }}>
            {project.oneLiner}
          </p>

          <div className="flex flex-wrap gap-2 mb-8">
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

          <div className="border-l-2 pl-6 space-y-6 relative" style={{ borderColor: 'var(--glass-border)' }}>
            {project.decisions.map((decision: any, i: number) => {
              if (decision.decision.includes('[ADD DECISION')) return null;
              return (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="relative"
                >
                  <div className="absolute -left-[33px] top-1 w-4 h-4 rounded-full bg-accent glow-effect"></div>
                  <h4 className="font-bold text-lg mb-1" style={{ color: 'var(--text-main)' }}>{decision.decision}</h4>
                  <p style={{ color: 'var(--secondary-color)' }}>{decision.reasoning}</p>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default function ProjectsSection() {
  const { projects } = content
  const setActiveContext = useAppStore(state => state.setActiveContext)

  return (
    <section id="projects" className="py-20 max-w-5xl mx-auto px-6">
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
          className="hover:text-accent transition-colors"
          style={{ color: 'var(--secondary-color)' }}
          title="Why this format?"
        >
          <Info size={20} />
        </button>
      </motion.h2>

      <div className="space-y-32">
        {projects.map((project, idx) => (
          <ProjectCard key={project.id} project={project} idx={idx} />
        ))}
      </div>

      <div className="mt-32 text-center text-lg italic" style={{ color: 'var(--secondary-color)' }}>
        Behind these projects is a core set of skills... ↓
      </div>
    </section>
  )
}
