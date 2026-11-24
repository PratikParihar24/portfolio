import content from '../../data/content.json'
import { ExternalLink, Code, Layers, Sparkles, Database, Smartphone, Globe, Cpu, ChevronDown, ChevronUp } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import ScrollFadeText from '../ui/ScrollFadeText'
import MagneticChip from '../ui/MagneticChip'

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

const PROJECT_ICONS: Record<string, any> = {
  'parihar-brothers': Smartphone,
  'biasbench': Cpu,
  'ngsc': Globe,
  'applyagent': Sparkles,
  'pattern-vault': Database,
  'snap-game': Layers,
}

// Devicon mappings matching SkillsSection
const TECH_ICONS: Record<string, string> = {
  'Python': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
  'JavaScript': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
  'TypeScript': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
  'Java': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
  'C': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg',
  'HTML5': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
  'CSS3': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
  'Node.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
  'Express.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg',
  'FastAPI': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg',
  'Django REST': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg',
  'PostgreSQL': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
  'Streamlit': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/streamlit/streamlit-original.svg',
  'Socket.io': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/socketio/socketio-original.svg',
  'Tailwind CSS': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg',
  'LangChain': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
  'MongoDB Atlas': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
  'SQLite': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg',
  'SQL': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
  'ChromaDB': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
  'Git': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
  'GitHub': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg',
  'Chrome Extension APIs': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/chrome/chrome-original.svg',
  'Vercel': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg',
  'Render': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
  'React': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
  'Capacitor': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/capacitor/capacitor-original.svg',
}

export default function ProjectsSection() {
  const { projects } = content
  // First project open by default
  const [openProjectId, setOpenProjectId] = useState<string | null>(projects[0]?.id || null)

  const toggleProject = (id: string) => {
    setOpenProjectId(prev => prev === id ? null : id)
  }

  return (
    <section id="projects" className="py-16 max-w-5xl mx-auto px-6 relative">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-accent/10 text-accent border border-accent/20 mb-3">
            <Layers size={14} className="text-accent" />
            Engineering Showcase
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-text-main tracking-tight">
            Projects
          </h2>
        </div>
        <p className="text-secondary text-sm md:text-base max-w-md">
          Explore one project at a time. Click any project to open or collapse its engineering decisions.
        </p>
      </div>

      {/* Accordion List: One project at a time */}
      <div className="space-y-4">
        {projects.map((project, idx) => {
          const isOpen = openProjectId === project.id
          const IconComponent = PROJECT_ICONS[project.id] || Layers
          const validDecisions = project.decisions?.filter(
            (d: any) => !d.decision.includes('[ADD DECISION')
          ) || []

          return (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: idx * 0.04 }}
              className={`rounded-2xl border transition-all duration-300 overflow-hidden shadow-sm ${
                isOpen
                  ? 'border-accent/40 bg-white dark:bg-zinc-900 shadow-md ring-1 ring-accent/20'
                  : 'border-black/10 dark:border-white/10 bg-white/70 dark:bg-zinc-900/60 hover:border-black/20 dark:hover:border-white/20'
              }`}
            >
              {/* Header / Clickable Bar to open/close */}
              <div
                onClick={() => toggleProject(project.id)}
                className="w-full p-5 md:p-6 flex items-center justify-between gap-4 cursor-pointer select-none text-left"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    toggleProject(project.id)
                  }
                }}
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div className={`p-2.5 rounded-xl border shrink-0 transition-colors ${
                    isOpen 
                      ? 'bg-accent text-zinc-950 border-accent' 
                      : 'bg-black/5 dark:bg-white/5 border-black/10 dark:border-white/10 text-secondary'
                  }`}>
                    <IconComponent size={20} />
                  </div>

                  <div className="min-w-0">
                    <span className="text-xs font-bold text-secondary uppercase tracking-wider block mb-0.5">
                      0{idx + 1}
                    </span>
                    <h3 className="text-lg md:text-xl font-bold text-text-main truncate">
                      {project.title}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  {/* Action buttons (fixed width slots so repo and live buttons align in vertical columns across all rows) */}
                  <div className="hidden sm:flex items-center gap-3" onClick={(e) => e.stopPropagation()}>
                    {/* Repo button column (fixed width: 36px) */}
                    <div className="w-9 h-8 flex items-center justify-center">
                      {project.repoUrl && !project.repoUrl.includes('[') && project.repoUrl.trim() !== '' ? (
                        <a
                          href={project.repoUrl}
                          target="_blank"
                          rel="noreferrer"
                          title="GitHub Repository"
                          className="w-full h-full flex items-center justify-center rounded-lg border border-black/10 dark:border-white/10 hover:border-accent text-secondary hover:text-accent bg-white dark:bg-zinc-800 transition-colors shadow-xs"
                        >
                          <Code size={15} />
                        </a>
                      ) : null}
                    </div>

                    {/* Live button column (fixed width: 72px) */}
                    <div className="w-[72px] h-8 flex items-center justify-center">
                      {project.liveUrl && !project.liveUrl.includes('[') && project.liveUrl.trim() !== '' ? (
                        <a
                          href={project.liveUrl.startsWith('http') ? project.liveUrl : `https://${project.liveUrl}`}
                          target="_blank"
                          rel="noreferrer"
                          className="w-full h-full flex items-center justify-center gap-1.5 bg-accent text-zinc-950 font-bold rounded-lg text-xs hover:opacity-90 transition-opacity shadow-xs"
                        >
                          <span>Live</span>
                          <ExternalLink size={12} />
                        </a>
                      ) : null}
                    </div>
                  </div>

                  <div className="p-2 text-secondary">
                    {isOpen ? <ChevronUp size={20} className="text-accent" /> : <ChevronDown size={20} />}
                  </div>
                </div>
              </div>

              {/* Accordion Content */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden border-t border-black/10 dark:border-white/10"
                  >
                    <div className="p-5 md:p-6 bg-slate-50/50 dark:bg-zinc-950/40">
                      {/* One-liner description */}
                      <p className="text-secondary text-sm md:text-base leading-relaxed mb-6 font-medium">
                        {project.oneLiner}
                      </p>

                      {/* Tech stack pills using MagneticChip animation */}
                      <div className="mb-6">
                        <p className="text-xs font-bold uppercase tracking-wider text-secondary mb-3 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                          Technologies & Frameworks
                        </p>
                        <div className="flex flex-wrap gap-2.5">
                          {project.tech.map((t: string) => (
                            <MagneticChip
                              key={t}
                              className="px-3 py-1.5 rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-zinc-800 shadow-xs flex items-center gap-2 cursor-pointer hover:border-accent hover:shadow-sm"
                            >
                              {TECH_ICONS[t] && (
                                <img
                                  src={TECH_ICONS[t]}
                                  alt={t}
                                  className="w-4 h-4 object-contain"
                                  onError={(e) => { e.currentTarget.style.display = 'none' }}
                                />
                              )}
                              <span className="text-xs font-semibold text-text-main">{t}</span>
                            </MagneticChip>
                          ))}
                        </div>
                      </div>

                      {/* Mobile action buttons when accordion is open */}
                      <div className="flex sm:hidden items-center gap-3 mb-6">
                        {project.repoUrl && !project.repoUrl.includes('[') && (
                          <a
                            href={project.repoUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-black/10 dark:border-white/10 text-xs font-semibold text-text-main"
                          >
                            <Code size={14} />
                            <span>Source Code</span>
                          </a>
                        )}
                        {project.liveUrl && !project.liveUrl.includes('[') && (
                          <a
                            href={project.liveUrl.startsWith('http') ? project.liveUrl : `https://${project.liveUrl}`}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-accent text-zinc-950 font-bold rounded-lg text-xs"
                          >
                            <span>Live Demo</span>
                            <ExternalLink size={13} />
                          </a>
                        )}
                      </div>

                      {/* Engineering Decisions */}
                      {validDecisions.length > 0 && (
                        <div>
                          <p className="text-xs font-bold uppercase tracking-wider text-secondary mb-3 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                            Key Engineering Decisions & Rationale
                          </p>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {validDecisions.map((dec: any, dIdx: number) => (
                              <div
                                key={dIdx}
                                className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-black/10 dark:border-white/10 shadow-xs hover:border-accent/30 transition-colors"
                              >
                                <h4 className="text-xs md:text-sm font-bold text-text-main mb-1.5 flex items-start gap-1.5">
                                  <span className="text-accent font-black">›</span>
                                  <span>{dec.decision}</span>
                                </h4>
                                <p className="text-xs text-secondary leading-relaxed pl-3">
                                  {dec.reasoning}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )
        })}
      </div>

      {/* Developer Utilities Sub-Section */}
      <div className="mt-20 pt-12 border-t border-black/10 dark:border-white/10">
        <div className="mb-6">
          <h3 className="text-xl font-bold text-text-main">
            Developer Utilities
          </h3>
          <p className="text-secondary text-sm mt-0.5">
            Lightweight tooling and browser extensions created for everyday productivity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {UTILITIES.map((util) => (
            <div
              key={util.id}
              className="p-5 rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-zinc-900/80 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-base font-bold text-text-main">
                    {util.title}
                  </h4>
                  <div className="flex gap-2">
                    <a
                      href={util.repoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-1.5 rounded-lg border border-black/10 dark:border-white/10 text-secondary hover:text-accent transition-colors"
                    >
                      <Code size={13} />
                    </a>
                    {util.liveUrl && util.liveUrl !== '#' && (
                      <a
                        href={util.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 rounded-lg border border-black/10 dark:border-white/10 text-secondary hover:text-accent transition-colors"
                      >
                        <ExternalLink size={13} />
                      </a>
                    )}
                  </div>
                </div>
                <p className="text-xs text-secondary leading-relaxed mb-4">
                  {util.oneLiner}
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-3 border-t border-black/10 dark:border-white/10">
                {util.tech.map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 rounded text-[10px] font-semibold bg-black/5 dark:bg-white/5 text-secondary"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Transition to Skills */}
      <div className="mt-20">
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
