import { useEffect, useState } from 'react'
import { GitCommit, GitPullRequest, Star, GitFork, ExternalLink } from 'lucide-react'
import { motion } from 'framer-motion'

const EVENT_CONFIG: Record<string, { color: string; bgColor: string; label: string }> = {
  PushEvent: { color: '#22C55E', bgColor: 'rgba(34,197,94,0.15)', label: 'Pushed to' },
  PullRequestEvent: { color: '#A78BFA', bgColor: 'rgba(167,139,250,0.15)', label: 'Opened PR in' },
  WatchEvent: { color: '#FBBF24', bgColor: 'rgba(251,191,36,0.15)', label: 'Starred' },
  ForkEvent: { color: '#38BDF8', bgColor: 'rgba(56,189,248,0.15)', label: 'Forked' },
}

export default function GithubFeed() {
  const [events, setEvents] = useState<any[]>([])
  
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
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass-panel p-6 mt-12 max-w-lg mx-auto"
    >
      {/* Header with GitHub profile link */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold flex items-center gap-2" style={{ color: 'var(--text-main)' }}>
          <span className="text-accent">✦</span>
          Live GitHub Activity
        </h3>
        <a 
          href="https://github.com/PratikParihar24" 
          target="_blank" 
          rel="noreferrer"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all hover:scale-105"
          style={{ 
            backgroundColor: 'var(--surface-color)', 
            border: '1px solid var(--glass-border)',
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

      <div className="space-y-3">
        {events.map((ev, i) => {
          const config = EVENT_CONFIG[ev.type] || EVENT_CONFIG.PushEvent
          return (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center gap-3 p-3 rounded-xl transition-all hover:scale-[1.02]"
              style={{ backgroundColor: config.bgColor }}
            >
              <div 
                className="p-2 rounded-lg shrink-0"
                style={{ backgroundColor: config.bgColor, color: config.color }}
              >
                {getEventIcon(ev.type)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate" style={{ color: 'var(--text-main)' }}>
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
  )
}
