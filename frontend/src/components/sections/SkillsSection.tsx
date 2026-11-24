import content from '../../data/content.json'
import { motion } from 'framer-motion'
import MagneticChip from '../ui/MagneticChip'
import ScrollFadeText from '../ui/ScrollFadeText'
import { Sparkles, Terminal, Code2, Database, Wrench, Cpu } from 'lucide-react'

// Tech icon mapping using devicon CDN (free SVG icons for programming languages/tools)
const TECH_ICONS: Record<string, string> = {
  'Python': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
  'JavaScript': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
  'Java': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
  'C': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg',
  'HTML5': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
  'CSS3': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
  'Node.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
  'Express.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg',
  'FastAPI': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg',
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
  'Postman': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg',
  'REST APIs': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg',
  'WebSockets': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/socketio/socketio-original.svg',
  'React': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
}

const CATEGORY_ICONS: Record<string, any> = {
  'Languages': Code2,
  'Frameworks & Libraries': Cpu,
  'Databases': Database,
  'Tools & Platforms': Wrench,
  'Concepts': Terminal,
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 12, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring" as const, stiffness: 350, damping: 20 } }
}

export default function SkillsSection() {
  const { skills } = content

  return (
    <section id="skills" className="py-16 max-w-5xl mx-auto px-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-accent/10 text-accent border border-accent/20 mb-3">
            <Sparkles size={14} className="animate-pulse" />
            Capabilities & Tooling
          </div>
          <motion.h2 
            initial={{ opacity: 0, y: -15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-extrabold text-text-main tracking-tight"
          >
            Skills & Tooling
          </motion.h2>
        </div>
        <p className="text-secondary text-sm md:text-base max-w-md">
          A tested stack across systems engineering, full-stack web architectures, databases, and AI tooling.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(skills).map(([category, items], idx) => {
          const CatIcon = CATEGORY_ICONS[category] || Terminal
          return (
            <motion.div 
              key={category} 
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: idx * 0.08, duration: 0.4 }}
              className="rounded-3xl p-6 md:p-7 border border-black/10 dark:border-white/10 bg-white dark:bg-zinc-900 shadow-md hover:shadow-xl hover:border-accent/30 transition-all duration-300 relative group overflow-hidden"
            >
              {/* Subtle ambient light */}
              <div className="absolute top-0 right-0 w-36 h-36 bg-accent/5 rounded-full blur-2xl -mr-10 -mt-10 group-hover:bg-accent/15 transition-all duration-500 pointer-events-none" />

              <div className="flex items-center justify-between mb-5 relative z-10">
                <h3 className="text-base md:text-lg font-bold flex items-center gap-2.5 text-text-main">
                  <div className="p-2 rounded-xl bg-accent/10 text-accent border border-accent/20">
                    <CatIcon size={16} />
                  </div>
                  <span>{category}</span>
                </h3>
                <span className="text-[11px] font-bold uppercase tracking-wider text-secondary px-2 py-0.5 rounded-full bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5">
                  {items.length} items
                </span>
              </div>

              <motion.div 
                variants={containerVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="flex flex-wrap gap-2.5 relative z-10"
              >
                {items.map((skill) => (
                  <MagneticChip 
                    key={skill} 
                    variants={itemVariants}
                    className="group/chip flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-xs md:text-sm font-semibold cursor-pointer border border-black/10 dark:border-white/10 bg-slate-50/80 dark:bg-zinc-800/80 text-text-main shadow-xs hover:shadow-md hover:border-accent hover:bg-white dark:hover:bg-zinc-800 transition-all duration-200"
                  >
                    {TECH_ICONS[skill] && (
                      <img 
                        src={TECH_ICONS[skill]} 
                        alt={skill} 
                        className="w-4 h-4 object-contain select-none pointer-events-none transition-transform duration-300 group-hover/chip:rotate-12 group-hover/chip:scale-115"
                        loading="lazy"
                        onError={(e) => { e.currentTarget.style.display = 'none' }}
                      />
                    )}
                    <span className="group-hover/chip:text-accent transition-colors">{skill}</span>
                  </MagneticChip>
                ))}
              </motion.div>
            </motion.div>
          )
        })}
      </div>

      <div className="mt-28">
        <ScrollFadeText 
          className="text-center text-3xl md:text-4xl font-curvy tracking-wide"
          style={{ 
            fontFamily: "'Caveat', cursive",
            color: 'var(--accent-color)',
            textShadow: '0 0 15px rgba(34, 197, 94, 0.15)'
          }}
        >
          Applying these skills has led to some milestone achievements... ↓
        </ScrollFadeText>
      </div>
    </section>
  )
}
