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
    { id: 'resume', label: 'View Resume (PDF)', icon: FileText, action: () => { window.open('/resume.pdf', '_blank'); setCommandOpen(false) } },
    { id: 'contact', label: 'Contact Me', icon: Mail, action: () => { document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); setCommandOpen(false) } },
    { id: 'theme', label: `Toggle ${theme === 'light' ? 'Dark' : 'Light'} Mode`, icon: theme === 'light' ? Moon : Sun, action: () => { toggleTheme(); setCommandOpen(false) } }

  ]

  const filtered = actions.filter(a => a.label.toLowerCase().includes(query.toLowerCase()))

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 pt-[15vh]">
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setCommandOpen(false)}
          className="absolute inset-0 bg-black/60 backdrop-blur-md"
        />
        
        {/* Palette Modal */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-lg shadow-2xl rounded-2xl overflow-hidden glass-panel border"
          style={{ 
            backgroundColor: 'var(--bg-color)', 
            borderColor: 'var(--glass-border)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
          }}
        >
          {/* Input Header */}
          <div 
            className="flex items-center px-5 py-4 border-b"
            style={{ borderColor: 'var(--glass-border)' }}
          >
            <Search size={20} className="mr-3 shrink-0" style={{ color: 'var(--accent-color)' }} />
            <input 
              autoFocus
              className="flex-1 bg-transparent border-none outline-none text-base font-medium"
              style={{ color: 'var(--text-main)' }}
              placeholder="Type a command or search..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <span 
              className="text-xs font-mono font-bold px-2 py-1 rounded border"
              style={{ 
                backgroundColor: 'var(--surface-color)', 
                borderColor: 'var(--glass-border)',
                color: 'var(--secondary-color)'
              }}
            >
              ESC
            </span>
          </div>

          {/* Action List */}
          <div className="max-h-80 overflow-y-auto p-2 space-y-1">
            {filtered.map((action) => {
              const Icon = action.icon
              return (
                <button
                  key={action.id}
                  onClick={action.action}
                  className="w-full flex items-center px-4 py-3 gap-3.5 text-left rounded-xl transition-all group cursor-pointer"
                  style={{ color: 'var(--text-main)' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--surface-color)';
                    e.currentTarget.style.color = 'var(--accent-color)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = 'var(--text-main)';
                  }}
                >
                  <Icon size={18} className="shrink-0 transition-transform duration-200 group-hover:scale-110" style={{ color: 'var(--accent-color)' }} />
                  <span className="font-semibold text-sm">{action.label}</span>
                </button>
              )
            })}
            {filtered.length === 0 && (
              <p className="text-center py-8 text-sm" style={{ color: 'var(--secondary-color)' }}>
                No commands found.
              </p>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}

