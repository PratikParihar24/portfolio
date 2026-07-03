import content from '../../data/content.json'
import { motion } from 'framer-motion'
import { Info } from 'lucide-react'
import { useAppStore } from '../../store/useAppStore'
import TiltCard from '../ui/TiltCard'

const GRADIENTS: Record<string, string> = {
  'isro-sac': 'radial-gradient(at 0% 0%, rgba(99, 102, 241, 0.22) 0px, transparent 55%), radial-gradient(at 100% 100%, rgba(139, 92, 246, 0.2) 0px, transparent 55%), radial-gradient(at 50% 0%, rgba(168, 85, 247, 0.15) 0px, transparent 55%)',
  'devang-mehta': 'radial-gradient(at 0% 0%, rgba(245, 158, 11, 0.2) 0px, transparent 55%), radial-gradient(at 100% 100%, rgba(239, 68, 68, 0.18) 0px, transparent 55%)',
  'merit-scholarship': 'radial-gradient(at 0% 100%, rgba(34, 197, 94, 0.18) 0px, transparent 55%), radial-gradient(at 100% 0%, rgba(59, 130, 246, 0.15) 0px, transparent 55%)',
  'cgpa': 'radial-gradient(at 0% 0%, rgba(6, 182, 212, 0.2) 0px, transparent 55%), radial-gradient(at 100% 100%, rgba(59, 130, 246, 0.15) 0px, transparent 55%)',
  'hackathons': 'radial-gradient(at 0% 0%, rgba(168, 85, 247, 0.18) 0px, transparent 55%), radial-gradient(at 100% 100%, rgba(236, 72, 153, 0.15) 0px, transparent 55%)'
}

export default function AchievementsSection() {
  const { achievements } = content
  const setActiveContext = useAppStore(state => state.setActiveContext)

  const getSizeClass = (id: string) => {
    switch(id) {
      case 'isro-sac':
        return 'col-span-1 md:col-span-2 md:row-span-2 min-h-[340px] md:min-h-[440px]'
      case 'devang-mehta':
        return 'col-span-1 md:col-span-1 md:row-span-2 min-h-[340px] md:min-h-[440px]'
      case 'merit-scholarship':
        return 'col-span-1 md:col-span-1 md:row-span-1 min-h-[220px]'
      case 'cgpa':
        return 'col-span-1 md:col-span-1 md:row-span-1 min-h-[220px]'
      case 'hackathons':
        return 'col-span-1 md:col-span-3 md:row-span-1 min-h-[160px]'
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
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-fr">
        {achievements.map((item) => (
          <TiltCard
            key={item.id}
            className={`group p-8 border border-white/5 glow-effect ${getSizeClass(item.id)}`}
            style={{
              background: GRADIENTS[item.id] || 'var(--surface-color)',
            }}
            variants={{
              hidden: { opacity: 0, scale: 0.95, y: 20 },
              show: { opacity: 1, scale: 1, y: 0 }
            }}
          >
            {/* Techy background decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-[50px] -mr-16 -mt-16 group-hover:bg-accent/15 transition-all duration-500" />
            
            <div className="flex flex-col h-full justify-between">
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
            </div>
            
            {/* Subtle border highlight on hover */}
            <div className="absolute inset-0 border-2 border-accent/0 group-hover:border-accent/30 rounded-2xl transition-all duration-500 pointer-events-none" />
          </TiltCard>
        ))}
      </div>
    </section>
  )
}
