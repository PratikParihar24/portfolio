import { useState } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Send, CheckCircle, Loader2 } from 'lucide-react'
import content from '../../data/content.json'

export default function ContactSection() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle')
  const { contact } = content

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('submitting')

    const form = e.currentTarget
    const formData = new FormData(form)
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message')
    }

    try {
      // Use environment variable or default to local backend
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000'
      const response = await fetch(`${apiUrl}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        setStatus('success')
        form.reset() // Clear the form
        setTimeout(() => setStatus('idle'), 3000)
      } else {
        console.error('Failed to submit form')
        setStatus('idle')
        alert('Failed to send message. Please try again later.')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      setStatus('idle')
      alert('Network error. Please make sure the backend is running.')
    }
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
            name="name"
            required type="text" placeholder="Name" 
            className="p-3 rounded-lg focus:outline-none transition-colors"
            style={{ 
              backgroundColor: 'var(--surface-color)', 
              border: '1px solid var(--glass-border)', 
              color: 'var(--text-main)' 
            }}
          />
          <input 
            name="email"
            required type="email" placeholder="Email" 
            className="p-3 rounded-lg focus:outline-none transition-colors"
            style={{ 
              backgroundColor: 'var(--surface-color)', 
              border: '1px solid var(--glass-border)', 
              color: 'var(--text-main)' 
            }}
          />
          <textarea 
            name="message"
            required placeholder="Message" rows={5} 
            className="p-3 rounded-lg focus:outline-none transition-colors"
            style={{ 
              backgroundColor: 'var(--surface-color)', 
              border: '1px solid var(--glass-border)', 
              color: 'var(--text-main)' 
            }}
          ></textarea>
          
          <motion.button 
            type="submit" 
            disabled={status !== 'idle'}
            whileHover={status === 'idle' ? { scale: 1.02 } : {}}
            whileTap={status === 'idle' ? { scale: 0.98 } : {}}
            className={`py-3 rounded-lg font-bold transition-all mt-4 flex items-center justify-center gap-2 ${
              status === 'success' 
                ? 'bg-green-500 text-white shadow-[0_0_20px_rgba(34,197,94,0.4)]' 
                : 'bg-accent glow-effect hover:glow-hover text-[#09090B]'
            } disabled:opacity-80 disabled:cursor-not-allowed`}
          >
            {status === 'idle' && (
              <>
                <Send size={18} />
                <span>Send Message</span>
              </>
            )}
            {status === 'submitting' && (
              <>
                <Loader2 size={18} className="animate-spin" />
                <span>Sending...</span>
              </>
            )}
            {status === 'success' && (
              <motion.div 
                initial={{ scale: 0.5, opacity: 0 }} 
                animate={{ scale: 1, opacity: 1 }} 
                className="flex items-center gap-2"
              >
                <CheckCircle size={18} />
                <span>Sent Successfully!</span>
              </motion.div>
            )}
          </motion.button>
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
