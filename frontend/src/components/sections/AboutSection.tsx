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
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            visible: { transition: { staggerChildren: 0.1 } }
          }}
          className="text-5xl md:text-6xl lg:text-8xl font-bold tracking-tight leading-[1.2]"
          style={{ color: 'var(--text-main)' }}
        >
          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}>
            <span style={{ color: 'var(--secondary-color)', fontWeight: 400 }}>4th-year CS undergrad building </span>
          </motion.div>
          
          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}>
            real-time systems <span style={{ color: 'var(--secondary-color)', fontWeight: 400 }}>&</span> AI tooling
          </motion.div>
          
          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}>
            <span style={{ color: 'var(--secondary-color)', fontWeight: 400 }}>with a focus on </span>
          </motion.div>
          
          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}>
            shipping things that matter.
          </motion.div>
        </motion.div>
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
