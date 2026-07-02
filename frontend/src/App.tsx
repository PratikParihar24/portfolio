import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Resume from './pages/Resume'
import { useAppStore } from './store/useAppStore'
import { useEffect } from 'react'
import ContextualGuide from './components/ui/ContextualGuide'
import CommandPalette from './components/ui/CommandPalette'
import Scene from './components/3d/Scene'
import { Moon, Sun, Command } from 'lucide-react'

// NavBar with proper glass styling and theme toggle
const NavBar = () => {
  const { theme, toggleTheme, setCommandOpen } = useAppStore()
  return (
    <nav 
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex justify-between items-center border-b"
      style={{ 
        backgroundColor: 'var(--navbar-bg)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderColor: 'var(--glass-border)'
      }}
    >
      <div className="font-bold text-xl tracking-tight" style={{ color: 'var(--text-main)' }}>
        Pratik
      </div>
      <div className="flex gap-2">
        <button 
          onClick={() => setCommandOpen(true)}
          aria-label="Open Command Palette"
          className="p-2 rounded-full border transition-all hover:scale-105 md:hidden"
          style={{ 
            backgroundColor: 'var(--surface-color)', 
            borderColor: 'var(--glass-border)',
            color: 'var(--text-main)' 
          }}
        >
          <Command size={18} />
        </button>
        <button 
          onClick={toggleTheme} 
          aria-label="Toggle dark mode"
          className="p-2 rounded-full border transition-all hover:scale-105"
          style={{ 
            backgroundColor: 'var(--surface-color)', 
            borderColor: 'var(--glass-border)',
            color: 'var(--text-main)' 
          }}
        >
          {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
        </button>
      </div>
    </nav>
  )
}

function App() {
  const theme = useAppStore(state => state.theme)
  
  // Sync dark class on mount and theme change
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  return (
    <Router>
      <Scene />
      <ContextualGuide />
      <CommandPalette />
      <div className="relative z-10">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/resume" element={<Resume />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
