import { useAppStore } from '../../store/useAppStore'
import { Info } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function ContextualGuide() {
  const activeContext = useAppStore(state => state.activeContext)
  const setActiveContext = useAppStore(state => state.setActiveContext)

  return (
    <AnimatePresence>
      {activeContext && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-8 right-8 z-50"
        >
          <div className="glass-panel p-4 pr-12 relative max-w-sm glow-effect">
            <button 
              onClick={() => setActiveContext(null)}
              className="absolute top-2 right-2 text-secondary hover:text-text-main"
            >
              &times;
            </button>
            <div className="flex gap-3 items-start">
              <div className="text-accent mt-1">
                <Info size={20} />
              </div>
              <p className="text-sm font-medium text-text-main leading-relaxed">
                {activeContext}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
