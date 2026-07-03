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
    <section id="achievements" className="py-10 max-w-5xl mx-auto px-6">
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
            className={`group relative glass-panel p-8 flex flex-col justify-center min-h-[220px] overflow-hidden hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(0,229,255,0.15)] transition-all duration-500 border border-white/5 ${getSizeClass(item.size)}`}
          >
            {/* Techy background decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-[50px] -mr-16 -mt-16 group-hover:bg-accent/20 transition-all duration-500" />
            
            <span className="relative z-10 text-4xl md:text-5xl lg:text-6xl font-bold text-accent mb-6 break-words leading-tight tracking-tight drop-shadow-md">
              {item.stat}
            </span>
            <p className="relative z-10 text-text-main text-lg font-medium leading-relaxed group-hover:text-white transition-colors">
              {item.label}
            </p>
            {item.date && (
              <span className="relative z-10 text-secondary text-sm font-bold mt-auto pt-8 uppercase tracking-wider flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent/50 group-hover:bg-accent transition-colors" />
                {item.date}
              </span>
            )}
            
            {/* Subtle border highlight on hover */}
            <div className="absolute inset-0 border-2 border-accent/0 group-hover:border-accent/30 rounded-2xl transition-all duration-500 pointer-events-none" />
          </motion.div>
        ))}
      </div>
    </section>
  )
}
