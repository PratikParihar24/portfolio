import { useState } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import content from '../../data/content.json'

export default function ContactSection() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle')
  const { contact } = content

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('submitting')
    setTimeout(() => {
      setStatus('success')
      setTimeout(() => setStatus('idle'), 3000)
    }, 1500)
  }

  return (
    <section id="contact" className="py-10 max-w-3xl mx-auto px-6">
      <motion.h2 
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        className="text-3xl md:text-4xl font-curvy tracking-wide text-center mb-8"
        style={{ 
          fontFamily: "'Caveat', cursive",
          color: 'var(--accent-color)',
          textShadow: '0 0 15px rgba(34, 197, 94, 0.15)'
        }}
      >
        Let's connect and build something together... ↓
      </motion.h2>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="glass-panel p-8"
      >
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 relative">
          <input 
            required type="text" placeholder="Name" 
            className="p-3 rounded-lg focus:outline-none transition-colors"
            style={{ 
              backgroundColor: 'var(--surface-color)', 
              border: '1px solid var(--glass-border)', 
              color: 'var(--text-main)' 
            }}
          />
          <input 
            required type="email" placeholder="Email" 
            className="p-3 rounded-lg focus:outline-none transition-colors"
            style={{ 
              backgroundColor: 'var(--surface-color)', 
              border: '1px solid var(--glass-border)', 
              color: 'var(--text-main)' 
            }}
          />
          <textarea 
            required placeholder="Message" rows={5} 
            className="p-3 rounded-lg focus:outline-none transition-colors"
            style={{ 
              backgroundColor: 'var(--surface-color)', 
              border: '1px solid var(--glass-border)', 
              color: 'var(--text-main)' 
            }}
          ></textarea>
          
          <button 
            type="submit" 
            disabled={status !== 'idle'}
            className="py-3 bg-accent rounded-lg font-bold glow-effect hover:glow-hover transition-all mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ color: '#09090B' }}
          >
            {status === 'idle' && 'Send Message'}
            {status === 'submitting' && 'Sending...'}
            {status === 'success' && 'Sent Successfully!'}
          </button>
        </form>
      </motion.div>

      {/* Social Links */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="flex items-center justify-center gap-4 mt-8"
      >
        <a 
          href={contact.socialLinks.github}
          target="_blank" 
          rel="noreferrer"
          aria-label="GitHub Profile"
          className="flex items-center gap-2 px-5 py-3 rounded-xl transition-all hover:scale-105 hover:shadow-lg glass-panel"
        >
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" alt="GitHub" className="w-5 h-5" />
          <span className="font-medium text-sm" style={{ color: 'var(--text-main)' }}>GitHub</span>
          <ExternalLink size={14} style={{ color: 'var(--secondary-color)' }} />
        </a>
        <a 
          href={contact.socialLinks.linkedin}
          target="_blank" 
          rel="noreferrer"
          aria-label="LinkedIn Profile"
          className="flex items-center gap-2 px-5 py-3 rounded-xl transition-all hover:scale-105 hover:shadow-lg glass-panel"
        >
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg" alt="LinkedIn" className="w-5 h-5" />
          <span className="font-medium text-sm" style={{ color: 'var(--text-main)' }}>LinkedIn</span>
          <ExternalLink size={14} style={{ color: 'var(--secondary-color)' }} />
        </a>
      </motion.div>
    </section>
  )
}
