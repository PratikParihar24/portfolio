import { motion } from 'framer-motion'

export default function AboutSection() {
  return (
    <section id="about" className="py-20 max-w-4xl mx-auto px-6">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="text-center py-10"
      >
        <motion.p 
          initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight leading-[1.15]"
          style={{ color: 'var(--text-main)' }}
        >
          <span style={{ color: 'var(--secondary-color)', fontWeight: 400 }}>4th-year CS undergrad building </span>
          <br className="hidden md:block" />
          real-time systems <span style={{ color: 'var(--secondary-color)', fontWeight: 400 }}>&</span> AI tooling
          <br className="hidden md:block" />
          <span style={{ color: 'var(--secondary-color)', fontWeight: 400 }}>with a focus on </span>
          shipping things that matter.
        </motion.p>
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
          viewport={{ once: true }}
          className="mt-12 text-lg md:text-xl font-medium"
          style={{ color: 'var(--secondary-color)' }}
        >
          Here is what I've been building recently ↓
        </motion.p>
      </motion.div>
    </section>
  )
}
