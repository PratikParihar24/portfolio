import { useState } from 'react'
import { motion } from 'framer-motion'
import { useAppStore } from '../../store/useAppStore'
import { Info } from 'lucide-react'

export default function ContactSection() {
  const setActiveContext = useAppStore(state => state.setActiveContext)
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('submitting')
    // Simulate network delay for now, since FastAPI isn't fully wired to a mailer yet
    setTimeout(() => {
      setStatus('success')
      // Reset after 3 seconds
      setTimeout(() => setStatus('idle'), 3000)
    }, 1500)
  }

  return (
    <section id="contact" className="py-20 max-w-3xl mx-auto px-6">
      <motion.h2 
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        className="text-3xl font-bold mb-8 text-text-main flex items-center justify-center gap-3"
      >
        Get in Touch
        <button 
          onClick={() => setActiveContext("This form intentionally avoids third-party services. It will route directly to my FastAPI backend which handles mail relay — ensuring I control the data pipeline end-to-end.")} 
          className="text-secondary hover:text-accent transition-colors"
          title="Why a custom form?"
        >
          <Info size={20} />
        </button>
      </motion.h2>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="glass-panel p-8"
      >
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 relative">
          <input required type="text" placeholder="Name" className="p-3 bg-bg-theme border border-secondary rounded-lg text-text-main focus:outline-none focus:border-accent" />
          <input required type="email" placeholder="Email" className="p-3 bg-bg-theme border border-secondary rounded-lg text-text-main focus:outline-none focus:border-accent" />
          <textarea required placeholder="Message" rows={5} className="p-3 bg-bg-theme border border-secondary rounded-lg text-text-main focus:outline-none focus:border-accent"></textarea>
          
          <button 
            type="submit" 
            disabled={status !== 'idle'}
            className="py-3 bg-accent text-bg-theme rounded-lg font-bold glow-effect hover:glow-hover transition-all mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === 'idle' && 'Send Message'}
            {status === 'submitting' && 'Sending...'}
            {status === 'success' && 'Sent Successfully!'}
          </button>
        </form>
      </motion.div>
    </section>
  )
}
