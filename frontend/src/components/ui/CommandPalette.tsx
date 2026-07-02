import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAppStore } from '../../store/useAppStore'
import { Search, Home, FileText, Mail, Moon, Sun, Code } from 'lucide-react'

export default function CommandPalette() {
  const { isCommandOpen, setCommandOpen, theme, toggleTheme } = useAppStore()
  const [query, setQuery] = useState('')

  // Toggle on Cmd+K or Ctrl+K
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setCommandOpen(!isCommandOpen)
      }
    }
    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [isCommandOpen, setCommandOpen])

  if (!isCommandOpen) return null

  const actions = [
    { id: 'home', label: 'Go to Home', icon: Home, action: () => { window.location.href = '/'; setCommandOpen(false) } },
    { id: 'projects', label: 'Jump to Projects', icon: Code, action: () => { document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }); setCommandOpen(false) } },
    { id: 'resume', label: 'View Resume', icon: FileText, action: () => { window.location.href = '/resume'; setCommandOpen(false) } },
    { id: 'contact', label: 'Contact Me', icon: Mail, action: () => { document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); setCommandOpen(false) } },
    { id: 'theme', label: `Toggle ${theme === 'light' ? 'Dark' : 'Light'} Mode`, icon: theme === 'light' ? Moon : Sun, action: () => { toggleTheme(); setCommandOpen(false) } }
  ]

  const filtered = actions.filter(a => a.label.toLowerCase().includes(query.toLowerCase()))

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 pt-[20vh]">
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setCommandOpen(false)}
          className="absolute inset-0 bg-[#0F172A]/40 backdrop-blur-sm"
        />
        
        {/* Palette */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-lg bg-bg-theme border border-secondary shadow-2xl rounded-xl overflow-hidden glow-effect"
        >
          <div className="flex items-center px-4 py-3 border-b border-secondary">
            <Search size={20} className="text-secondary mr-3" />
            <input 
              autoFocus
              className="flex-1 bg-transparent border-none outline-none text-text-main placeholder-secondary"
              placeholder="Type a command or search..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <span className="text-xs text-secondary px-2 py-1 bg-surface rounded">ESC</span>
          </div>

          <div className="max-h-80 overflow-y-auto p-2">
            {filtered.map((action) => {
              const Icon = action.icon
              return (
                <button
                  key={action.id}
                  onClick={action.action}
                  className="w-full flex items-center px-4 py-3 gap-3 text-left rounded-lg text-text-main hover:bg-accent/10 hover:text-accent transition-colors"
                >
                  <Icon size={18} className="opacity-70" />
                  <span className="font-medium">{action.label}</span>
                </button>
              )
            })}
            {filtered.length === 0 && (
              <p className="text-center text-secondary py-8">No commands found.</p>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
