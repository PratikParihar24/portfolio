import content from '../../data/content.json'
import { motion } from 'framer-motion'

export default function AboutSection() {
  const { profile } = content

  return (
    <section id="about" className="py-20 max-w-4xl mx-auto px-6">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="text-center py-10"
      >
        <p 
          className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight leading-[1.15]"
          style={{ color: 'var(--text-main)' }}
        >
          <span style={{ color: 'var(--secondary-color)', fontWeight: 400 }}>4th-year CS undergrad building </span>
          <br className="hidden md:block" />
          real-time systems <span style={{ color: 'var(--secondary-color)', fontWeight: 400 }}>&</span> AI tooling
          <br className="hidden md:block" />
          <span style={{ color: 'var(--secondary-color)', fontWeight: 400 }}>with a focus on </span>
          shipping things that matter.
        </p>
      </motion.div>
    </section>
  )
}
