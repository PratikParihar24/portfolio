import { useEffect, useState } from 'react'
import { GitCommit, GitPullRequest, Star, GitFork, ExternalLink, ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const EVENT_CONFIG: Record<string, { color: string; bgColor: string; label: string }> = {
  PushEvent: { color: '#22C55E', bgColor: 'rgba(34,197,94,0.15)', label: 'Pushed to' },
  PullRequestEvent: { color: '#A78BFA', bgColor: 'rgba(167,139,250,0.15)', label: 'Opened PR in' },
  WatchEvent: { color: '#FBBF24', bgColor: 'rgba(251,191,36,0.15)', label: 'Starred' },
  ForkEvent: { color: '#38BDF8', bgColor: 'rgba(56,189,248,0.15)', label: 'Forked' },
}

export default function GithubFeed() {
  const [events, setEvents] = useState<any[]>([])
  const [isOpen, setIsOpen] = useState(false)
  
  useEffect(() => {
    fetch('https://api.github.com/users/PratikParihar24/events/public')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          const meaningful = data.filter(ev => ['PushEvent', 'PullRequestEvent', 'WatchEvent', 'ForkEvent'].includes(ev.type))
          setEvents(meaningful.slice(0, 5))
        }
      })
      .catch(console.error)
  }, [])

  if (events.length === 0) return null

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'PushEvent': return <GitCommit size={16} />
      case 'PullRequestEvent': return <GitPullRequest size={16} />
      case 'WatchEvent': return <Star size={16} />
      case 'ForkEvent': return <GitFork size={16} />
      default: return <GitCommit size={16} />
    }
  }

  const getRepoName = (fullName: string) => fullName.split('/')[1] || fullName

  return (
    <div 
      className="glass-panel p-2 mt-8 max-w-lg mx-auto w-full transition-all duration-300 hover:border-accent/30 hover:shadow-[0_0_20px_rgba(34,197,94,0.05)]"
      style={{ zIndex: 10 }}
    >
      {/* Dropdown Header Trigger */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between font-bold text-sm md:text-base py-3.5 px-4 hover:bg-accent/5 rounded-xl transition-all duration-200"
        style={{ color: 'var(--text-main)' }}
      >
        <span className="flex items-center gap-2.5">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent"></span>
          </span>
          Click here to see live GitHub activity
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
        >
          <ChevronDown size={18} />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
            className="overflow-hidden"
          >
            {/* Header with GitHub profile link */}
            <div className="flex items-center justify-between mt-6 mb-4 px-4">
              <span className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--secondary-color)' }}>
                Recent Public Events
              </span>
              <a 
                href="https://github.com/PratikParihar24" 
                target="_blank" 
                rel="noreferrer"
                aria-label="GitHub Profile"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-300 hover:scale-105 hover:bg-accent/10"
                style={{ 
                  backgroundColor: 'var(--surface-color)', 
                  borderColor: 'var(--glass-border)',
                  color: 'var(--text-main)' 
                }}
              >
                <img 
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" 
                  alt="GitHub" 
                  className="w-4 h-4" 
                />
                @PratikParihar24
                <ExternalLink size={12} />
              </a>
            </div>

            <div className="space-y-2.5 px-4 pb-4">
              {events.map((ev, i) => {
                const config = EVENT_CONFIG[ev.type] || EVENT_CONFIG.PushEvent
                return (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    whileHover={{ scale: 1.015, x: 4 }}
                    className="flex items-center gap-3.5 p-3 rounded-xl cursor-pointer border border-transparent transition-all duration-200 hover:border-accent/10 hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)]"
                    style={{ backgroundColor: config.bgColor }}
                  >
                    <div 
                      className="p-2.5 rounded-lg shrink-0"
                      style={{ backgroundColor: config.bgColor, color: config.color }}
                    >
                      {getEventIcon(ev.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold truncate" style={{ color: 'var(--text-main)' }}>
                        <span style={{ color: config.color }}>{config.label}</span>{' '}
                        {getRepoName(ev.repo.name)}
                      </p>
                      <p className="text-xs mt-0.5" style={{ color: 'var(--secondary-color)' }}>
                        {new Date(ev.created_at).toLocaleDateString()} · {new Date(ev.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                      </p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
