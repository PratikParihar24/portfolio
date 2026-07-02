import { useEffect, useState } from 'react'
import { Activity, GitCommit, GitPullRequest, Star, GitFork } from 'lucide-react'
import { motion } from 'framer-motion'

export default function GithubFeed() {
  const [events, setEvents] = useState<any[]>([])
  
  useEffect(() => {
    fetch('https://api.github.com/users/PratikParihar24/events/public')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          // Filter for meaningful events and take top 5
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
      default: return <Activity size={16} />
    }
  }

  const getEventText = (ev: any) => {
    switch (ev.type) {
      case 'PushEvent': return `Pushed to ${ev.repo.name}`
      case 'PullRequestEvent': return `Opened PR in ${ev.repo.name}`
      case 'WatchEvent': return `Starred ${ev.repo.name}`
      case 'ForkEvent': return `Forked ${ev.repo.name}`
      default: return `Activity in ${ev.repo.name}`
    }
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass-panel p-6 mt-16 max-w-lg mx-auto"
    >
      <h3 className="font-bold text-text-main mb-6 flex items-center gap-2">
        <Activity size={18} className="text-accent" />
        Live GitHub Activity
      </h3>
      <div className="space-y-5">
        {events.map((ev, i) => (
          <div key={i} className="text-sm flex gap-4 text-secondary items-start">
             <div className="mt-0.5 p-2 bg-surface rounded-full text-text-main border border-secondary">
               {getEventIcon(ev.type)}
             </div>
             <div>
               <p className="text-text-main font-medium leading-snug">{getEventText(ev)}</p>
               <p className="text-xs opacity-75 mt-1">{new Date(ev.created_at).toLocaleDateString()} at {new Date(ev.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
             </div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}
