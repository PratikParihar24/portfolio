import content from '../../data/content.json'
import { motion } from 'framer-motion'
import { Info } from 'lucide-react'
import { useAppStore } from '../../store/useAppStore'

export default function AchievementsSection() {
  const { achievements } = content
  const setActiveContext = useAppStore(state => state.setActiveContext)

  const getSizeClass = (size: string) => {
    switch(size) {
      case 'large':
        return 'col-span-1 md:col-span-2 md:row-span-2'
      case 'medium':
        return 'col-span-1 md:col-span-1 md:row-span-2'
      case 'small':
        return 'col-span-1 md:col-span-1 md:row-span-1'
      default:
        return 'col-span-1'
    }
  }

  return (
    <section id="achievements" className="py-20 max-w-5xl mx-auto px-6">
      <motion.h2 
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        className="text-3xl font-bold mb-12 text-text-main flex items-center gap-3"
      >
        Achievements
        <button 
          onClick={() => setActiveContext("This bento grid is designed to visually weight accomplishments by significance. The ISRO selection rate (38 out of 500+) is the strongest signal, so it gets the largest tile.")} 
          className="text-secondary hover:text-accent transition-colors"
          title="Why this layout?"
        >
          <Info size={20} />
        </button>
      </motion.h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {achievements.map((item, idx) => (
          <motion.div 
            key={item.id} 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: idx * 0.1, duration: 0.5, ease: "easeOut" }}
            className={`glass-panel p-8 flex flex-col justify-center min-h-[220px] hover:glow-hover transition-all ${getSizeClass(item.size)}`}
          >
            <span className="text-3xl md:text-4xl lg:text-5xl font-bold text-accent mb-4 break-words leading-tight">{item.stat}</span>
            <p className="text-text-main font-medium leading-relaxed">{item.label}</p>
            {item.date && (
              <span className="text-secondary text-xs font-bold mt-auto pt-6 uppercase tracking-wider">{item.date}</span>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  )
}
