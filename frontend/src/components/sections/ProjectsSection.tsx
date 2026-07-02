import content from '../../data/content.json'
import { ExternalLink, Code, Info } from 'lucide-react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useAppStore } from '../../store/useAppStore'
import { useRef } from 'react'

function ProjectCard({ project, idx }: { project: any, idx: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: cardRef,
    // Start tracking when the top of the card hits the top of the viewport
    offset: ["start start", "start -100%"]
  })

  // Fade out content when scrolling past (receding state)
  const contentOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0])
  // Slightly scale down the card to create depth
  const cardScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.97])

  return (
    <motion.div 
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className="relative sticky"
      style={{ 
        top: `calc(6rem + ${idx * 5.5}rem)`, 
        zIndex: idx,
        scale: cardScale
      }}
    >
      <div 
        className="p-8 md:p-12 shadow-2xl rounded-2xl border border-secondary transition-colors"
        style={{ backgroundColor: 'var(--surface-solid)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)' }}
      >
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div className="flex-1">
            <h3 className="text-3xl font-bold text-text-main mb-2">{project.title}</h3>
            <motion.p style={{ opacity: contentOpacity }} className="text-secondary text-lg max-w-2xl">
              {project.oneLiner}
            </motion.p>
          </div>
          <div className="flex gap-3 relative z-10">
            {project.repoUrl && !project.repoUrl.includes('[') && (
              <a href={project.repoUrl} target="_blank" rel="noreferrer" className="p-3 bg-bg-theme border border-secondary rounded-full text-text-main hover:text-accent transition-colors">
                <Code size={20} />
              </a>
            )}
            {project.liveUrl && !project.liveUrl.includes('[') && (
              <a href={project.liveUrl.startsWith('http') ? project.liveUrl : `https://${project.liveUrl}`} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-6 py-3 bg-accent text-bg-theme rounded-full font-bold glow-effect hover:glow-hover transition-all">
                <span>Live</span>
                <ExternalLink size={18} />
              </a>
            )}
          </div>
        </div>
        
        <motion.div style={{ opacity: contentOpacity }}>
          <div className="flex flex-wrap gap-2 mb-10">
            {project.tech.map((t: string) => (
              <span key={t} className="px-3 py-1 bg-surface border border-secondary rounded-md text-xs font-medium text-text-main">{t}</span>
            ))}
          </div>

          <div className="mt-8 border-l-2 border-secondary pl-6 space-y-8 relative">
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
                  <h4 className="font-bold text-text-main text-lg mb-1">{decision.decision}</h4>
                  <p className="text-secondary">{decision.reasoning}</p>
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
        className="text-3xl font-bold mb-16 text-text-main flex items-center gap-3"
      >
        Projects
        <button 
          onClick={() => setActiveContext("I focus on the engineering decisions rather than just listing tech stacks. Knowing *why* a tool was used is more important than knowing it exists.")} 
          className="text-secondary hover:text-accent transition-colors"
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
    </section>
  )
}
