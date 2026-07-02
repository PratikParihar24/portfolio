import content from '../../data/content.json'
import { motion } from 'framer-motion'
import GithubFeed from '../ui/GithubFeed'

export default function HeroSection() {
  const { profile } = content

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative pt-24">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="z-10 text-center max-w-4xl px-6"
      >
        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-text-main">{profile.name}</h1>
        <p className="text-xl md:text-2xl text-secondary mb-8">{profile.tagline}</p>
        <div className="flex gap-4 justify-center mb-8">
          <a href="#projects" className="px-6 py-3 bg-accent text-bg-theme rounded-full glow-effect hover:glow-hover transition-all font-semibold">View Projects</a>
          <a href="#contact" className="px-6 py-3 glass-panel hover:bg-surface transition-all font-semibold text-text-main">Contact Me</a>
        </div>
        
        {/* Real-time GitHub Activity Feed */}
        <GithubFeed />
      </motion.div>
    </section>
  )
}
