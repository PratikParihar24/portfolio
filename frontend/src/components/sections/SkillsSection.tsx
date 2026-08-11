import content from '../../data/content.json'
import { motion } from 'framer-motion'
import MagneticChip from '../ui/MagneticChip'
import ScrollFadeText from '../ui/ScrollFadeText'

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

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 10, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring" as const, stiffness: 300 } }
}

export default function SkillsSection() {
  const { skills } = content

  return (
    <section id="skills" className="py-10 max-w-4xl mx-auto px-6">
      <motion.h2 
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        className="text-3xl font-bold mb-12"
        style={{ color: 'var(--text-main)' }}
      >
        Skills
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {Object.entries(skills).map(([category, items], idx) => (
          <motion.div 
            key={category} 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -4 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: idx * 0.1, duration: 0.5 }}
            className="glass-panel p-6 glow-effect hover:glow-hover transition-all border border-white/5"
          >
            <h3 className="font-bold mb-4 flex items-center gap-2" style={{ color: 'var(--text-main)' }}>
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              {category}
            </h3>
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              className="flex flex-wrap gap-3"
            >
              {items.map((skill) => (
                <MagneticChip 
                  key={skill} 
                  variants={itemVariants}
                  className="group flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium cursor-pointer glow-effect transition-all duration-300 hover:scale-105"
                  style={{ 
                    backgroundColor: 'var(--surface-color)', 
                    border: '1px solid var(--glass-border)',
                    color: 'var(--text-main)'
                  }}
                >
                  {TECH_ICONS[skill] && (
                    <img 
                      src={TECH_ICONS[skill]} 
                      alt={skill} 
                      className="w-5 h-5 select-none pointer-events-none transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110"
                      loading="lazy"
                    />
                  )}
                  <span>{skill}</span>
                </MagneticChip>
              ))}
            </motion.div>
          </motion.div>
        ))}
      </div>

      <div className="mt-32">
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

