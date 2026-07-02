import content from '../../data/content.json'
import { motion } from 'framer-motion'
import { Info } from 'lucide-react'
import { useAppStore } from '../../store/useAppStore'

export default function AboutSection() {
  const { profile, education } = content
  const setActiveContext = useAppStore(state => state.setActiveContext)

  return (
    <section id="about" className="py-20 max-w-4xl mx-auto px-6">
      <motion.h2 
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        className="text-3xl font-bold mb-8 text-text-main flex items-center gap-3"
      >
        About
        <button 
          onClick={() => setActiveContext("I prioritize execution over theory. That's why this section is brief—I want recruiters to jump straight into my engineering decisions below.")} 
          className="text-secondary hover:text-accent transition-colors"
          title="Why is this section so short?"
        >
          <Info size={20} />
        </button>
      </motion.h2>
      
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="glass-panel p-8"
      >
        <p className="text-lg leading-relaxed text-secondary mb-8">
          {profile.objective}
        </p>
        
        <div className="mt-8">
          <h3 className="text-xl font-bold text-text-main mb-4">Education</h3>
          <div className="border-l-2 border-secondary pl-4 relative">
            <h4 className="font-bold text-text-main">{education.degree}</h4>
            <p className="text-secondary text-sm mb-2">{education.institution} ({education.duration})</p>
            <p className="text-accent font-semibold mb-2">CGPA: {education.cgpa}</p>
            <ul className="list-disc list-inside text-secondary space-y-1">
              {education.highlights.map((highlight, index) => (
                <li key={index} className="text-sm">{highlight}</li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
