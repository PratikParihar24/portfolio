import content from '../../data/content.json'
import { motion } from 'framer-motion'

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
  hidden: { opacity: 0, scale: 0.9 },
  show: { opacity: 1, scale: 1, transition: { type: "spring" as const, stiffness: 300 } }
}

export default function SkillsSection() {
  const { skills } = content

  return (
    <section id="skills" className="py-20 max-w-4xl mx-auto px-6">
      <motion.h2 
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        className="text-3xl font-bold mb-12 text-text-main"
      >
        Skills
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {Object.entries(skills).map(([category, items], idx) => (
          <motion.div 
            key={category} 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: idx * 0.1, duration: 0.5 }}
            className="glass-panel p-6 hover:glow-hover transition-all"
          >
            <h3 className="font-bold mb-4 text-text-main">{category}</h3>
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              className="flex flex-wrap gap-2"
            >
              {items.map((skill) => (
                <motion.span 
                  key={skill} 
                  variants={itemVariants}
                  className="px-4 py-2 bg-surface shadow-sm border border-secondary rounded-full text-sm font-medium text-text-main hover:bg-accent hover:border-accent hover:text-bg-theme hover:shadow-lg hover:shadow-accent/20 transition-all cursor-default"
                >
                  {skill}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
