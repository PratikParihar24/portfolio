import content from '../../data/content.json'
import { motion } from 'framer-motion'
import { Trophy, Rocket, GraduationCap, Award, Users, Sparkles, ArrowUpRight, Code2 } from 'lucide-react'
import TiltCard from '../ui/TiltCard'

const ICON_MAP: Record<string, any> = {
  'devang-mehta': Trophy,
  'isro-sac': Rocket,
  'cgpa': GraduationCap,
  'merit-scholarship': Award,
  'hackathons': Users,
  'leetcode': Code2,
}

const ACCENT_THEMES: Record<string, {
  pillBg: string
  pillText: string
  glow: string
  borderHover: string
  statGradient: string
  cardBg: string
}> = {
  'devang-mehta': {
    pillBg: 'bg-amber-500/10 dark:bg-amber-400/15 border-amber-500/30 text-amber-700 dark:text-amber-300',
    pillText: 'text-amber-600 dark:text-amber-400',
    glow: 'from-amber-500/20 via-orange-500/10 to-transparent',
    borderHover: 'hover:border-amber-500/50',
    statGradient: 'from-amber-500 via-orange-500 to-amber-600 dark:from-amber-300 dark:via-amber-100 dark:to-yellow-400',
    cardBg: 'radial-gradient(ellipse at top left, rgba(245, 158, 11, 0.08) 0%, transparent 60%)'
  },
  'isro-sac': {
    pillBg: 'bg-indigo-500/10 dark:bg-indigo-400/15 border-indigo-500/30 text-indigo-700 dark:text-indigo-300',
    pillText: 'text-indigo-600 dark:text-indigo-400',
    glow: 'from-indigo-500/20 via-purple-500/10 to-transparent',
    borderHover: 'hover:border-indigo-500/50',
    statGradient: 'from-indigo-600 via-purple-600 to-indigo-700 dark:from-indigo-300 dark:via-purple-200 dark:to-indigo-400',
    cardBg: 'radial-gradient(ellipse at top right, rgba(99, 102, 241, 0.08) 0%, transparent 60%)'
  },
  'cgpa': {
    pillBg: 'bg-emerald-500/10 dark:bg-emerald-400/15 border-emerald-500/30 text-emerald-700 dark:text-emerald-300',
    pillText: 'text-emerald-600 dark:text-emerald-400',
    glow: 'from-emerald-500/20 via-teal-500/10 to-transparent',
    borderHover: 'hover:border-emerald-500/50',
    statGradient: 'from-emerald-600 via-teal-600 to-green-700 dark:from-emerald-300 dark:via-teal-200 dark:to-green-400',
    cardBg: 'radial-gradient(ellipse at top left, rgba(16, 185, 129, 0.08) 0%, transparent 60%)'
  },
  'merit-scholarship': {
    pillBg: 'bg-cyan-500/10 dark:bg-cyan-400/15 border-cyan-500/30 text-cyan-700 dark:text-cyan-300',
    pillText: 'text-cyan-600 dark:text-cyan-400',
    glow: 'from-cyan-500/20 via-blue-500/10 to-transparent',
    borderHover: 'hover:border-cyan-500/50',
    statGradient: 'from-cyan-600 via-blue-600 to-teal-700 dark:from-cyan-300 dark:via-blue-200 dark:to-teal-400',
    cardBg: 'radial-gradient(ellipse at top right, rgba(6, 182, 212, 0.08) 0%, transparent 60%)'
  },
  'hackathons': {
    pillBg: 'bg-fuchsia-500/10 dark:bg-fuchsia-400/15 border-fuchsia-500/30 text-fuchsia-700 dark:text-fuchsia-300',
    pillText: 'text-fuchsia-600 dark:text-fuchsia-400',
    glow: 'from-fuchsia-500/20 via-pink-500/10 to-transparent',
    borderHover: 'hover:border-fuchsia-500/50',
    statGradient: 'from-fuchsia-600 via-pink-600 to-purple-700 dark:from-fuchsia-300 dark:via-pink-200 dark:to-purple-400',
    cardBg: 'radial-gradient(ellipse at top left, rgba(217, 70, 239, 0.08) 0%, transparent 60%)'
  },
  'leetcode': {
    pillBg: 'bg-amber-500/10 dark:bg-amber-400/15 border-amber-500/30 text-amber-700 dark:text-amber-300',
    pillText: 'text-amber-600 dark:text-amber-400',
    glow: 'from-amber-500/20 via-yellow-500/10 to-transparent',
    borderHover: 'hover:border-amber-500/50',
    statGradient: 'from-amber-500 via-yellow-500 to-orange-600 dark:from-amber-300 dark:via-yellow-200 dark:to-amber-400',
    cardBg: 'radial-gradient(ellipse at top right, rgba(245, 158, 11, 0.08) 0%, transparent 60%)'
  }
}

export default function AchievementsSection() {
  const { achievements } = content

  const renderDescription = (item: any) => {
    if (item.id === 'devang-mehta') {
      return (
        <p className="text-secondary text-xs sm:text-sm md:text-base mt-2 leading-relaxed">
          Top Ranker across CSE Branch for <span className="font-bold text-accent">3 consecutive</span> academic years{' '}
          <span className="font-extrabold px-2 py-0.5 rounded-md bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30 inline-block mt-1">
            (2022–23, 2023–24, 2024–25)
          </span>
          .
        </p>
      )
    }
    if (item.id === 'isro-sac') {
      return (
        <p className="text-secondary text-xs sm:text-sm md:text-base mt-2 leading-relaxed">
          Selected among <span className="font-bold text-accent">38 candidates out of 500+</span> applicants for the exclusive Deep-Dive Exposure Program at ISRO SAC.
        </p>
      )
    }
    if (item.id === 'cgpa') {
      return (
        <p className="text-secondary text-xs sm:text-sm mt-1.5 leading-relaxed">
          B.Tech Computer Science, GTU. Maintained top tier standing with <span className="font-bold text-accent">9.51 / 10 CGPA</span> across all semesters.
        </p>
      )
    }
    if (item.id === 'merit-scholarship') {
      return (
        <p className="text-secondary text-xs sm:text-sm mt-1.5 leading-relaxed">
          <span className="font-bold text-accent">100% full tuition fee waiver</span> granted through state-level engineering counseling merit ranking.
        </p>
      )
    }
    if (item.id === 'hackathons') {
      return (
        <p className="text-secondary text-xs sm:text-sm mt-1.5 leading-relaxed">
          <span className="font-bold text-accent">GTU Ideathon & Sparkathon (Walmart) Finalist</span>. Led ideation, architecture, team coordination, and final jury pitch.
        </p>
      )
    }
    if (item.id === 'leetcode') {
      return (
        <p className="text-secondary text-xs sm:text-sm mt-1.5 leading-relaxed">
          Solved <span className="font-bold text-accent">160+ DSA problems</span> covering arrays, trees, graphs, dynamic programming, and system algorithms.
        </p>
      )
    }
    return <p className="text-secondary text-xs sm:text-sm mt-1.5 leading-relaxed">{item.label}</p>
  }

  const spotlightAchievements = achievements.slice(0, 2)
  const secondaryAchievements = achievements.slice(2)

  return (
    <section id="achievements" className="py-12 sm:py-16 max-w-5xl mx-auto px-4 sm:px-6">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-3 sm:gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-accent/10 text-accent border border-accent/20 mb-2 sm:mb-3">
            <Sparkles size={14} className="animate-pulse" />
            Milestones & Recognition
          </div>
          <motion.h2 
            initial={{ opacity: 0, y: -15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-text-main tracking-tight"
          >
            Achievements
          </motion.h2>
        </div>
        <p className="text-secondary text-xs sm:text-sm md:text-base max-w-md">
          Demonstrated consistency across academics, competitive selections, and collaborative hackathons.
        </p>
      </div>

      {/* Row 1: Spotlight Dual Hero Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 mb-4 sm:mb-6">
        {spotlightAchievements.map((item) => {
          const Icon = ICON_MAP[item.id] || Trophy
          const theme = ACCENT_THEMES[item.id] || ACCENT_THEMES['devang-mehta']
          const isPrimary = item.id === 'devang-mehta'

          return (
            <div 
              key={item.id} 
              className={isPrimary ? 'lg:col-span-7' : 'lg:col-span-5'}
            >
              <TiltCard
                className={`relative h-full p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl border border-black/10 dark:border-white/10 shadow-md bg-surface transition-all duration-300 overflow-hidden flex flex-col justify-between group ${theme.borderHover}`}
                style={{
                  background: theme.cardBg,
                  backgroundColor: 'var(--surface-color)'
                }}
              >
                {/* Background Ambient Glow */}
                <div 
                  className={`absolute -top-24 -right-24 w-72 h-72 bg-gradient-to-br ${theme.glow} rounded-full blur-3xl pointer-events-none group-hover:scale-125 transition-transform duration-700`} 
                />

                {/* Top Bar: Badges & Icon */}
                <div className="relative z-10 flex items-start justify-between gap-3 sm:gap-4 mb-6 sm:mb-8">
                  <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                    <span className={`inline-flex items-center gap-1 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold tracking-wide uppercase border ${theme.pillBg}`}>
                      {item.tag}
                    </span>
                    {item.badge && (
                      <span className="inline-flex items-center gap-1 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-semibold bg-white dark:bg-zinc-800 border border-black/10 dark:border-white/10 text-text-main shadow-xs">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <div className={`p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-white dark:bg-zinc-900 border border-black/10 dark:border-white/10 shadow-sm ${theme.pillText} shrink-0`}>
                    <Icon size={20} className="sm:w-6 sm:h-6" />
                  </div>
                </div>

                {/* Stat Display */}
                <div className="relative z-10 mb-4 sm:mb-6">
                  <div className="flex items-baseline gap-3">
                    <span className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight bg-gradient-to-r ${theme.statGradient} bg-clip-text text-transparent`}>
                      {item.stat}
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-text-main mt-2 sm:mt-3 leading-snug">
                    {item.title}
                  </h3>
                  {renderDescription(item)}
                </div>

                {/* Footer Meta */}
                <div className="relative z-10 pt-4 sm:pt-6 mt-auto border-t border-black/10 dark:border-white/10 flex items-center justify-between text-[11px] sm:text-xs font-semibold text-secondary">
                  <span className="flex items-center gap-1.5 tracking-wider uppercase">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                    {item.date}
                  </span>
                  <span className="flex items-center gap-1 text-accent font-semibold">
                    Verified <ArrowUpRight size={13} />
                  </span>
                </div>
              </TiltCard>
            </div>
          )
        })}
      </div>

      {/* Row 2: Secondary Clean Modern Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {secondaryAchievements.map((item) => {
          const Icon = ICON_MAP[item.id] || Trophy
          const theme = ACCENT_THEMES[item.id] || ACCENT_THEMES['cgpa']
          const isLink = Boolean(item.url)

          return (
            <TiltCard
              key={item.id}
              className={`relative p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-black/10 dark:border-white/10 shadow-xs bg-surface transition-all duration-300 overflow-hidden flex flex-col justify-between group ${theme.borderHover}`}
              style={{
                background: theme.cardBg,
                backgroundColor: 'var(--surface-color)'
              }}
            >
              {/* Subtle Ambient Light */}
              <div 
                className={`absolute -top-16 -right-16 w-48 h-48 bg-gradient-to-br ${theme.glow} rounded-full blur-2xl pointer-events-none group-hover:scale-125 transition-transform duration-700`} 
              />

              {/* Card Header */}
              <div className="relative z-10 flex items-center justify-between mb-4 sm:mb-6">
                <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-semibold border ${theme.pillBg}`}>
                  {item.tag}
                </span>
                <div className={`p-2 rounded-xl bg-white dark:bg-zinc-900 border border-black/10 dark:border-white/10 shadow-xs ${theme.pillText} shrink-0`}>
                  <Icon size={16} />
                </div>
              </div>

              {/* Metric & Info */}
              <div className="relative z-10 mb-4 sm:mb-6">
                <div className={`text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r ${theme.statGradient} bg-clip-text text-transparent`}>
                  {item.stat}
                </div>
                <h4 className="text-base sm:text-lg font-bold text-text-main mt-1.5 sm:mt-2">
                  {item.title}
                </h4>
                {renderDescription(item)}
              </div>

              {/* Bottom Meta */}
              <div className="relative z-10 pt-3 sm:pt-4 border-t border-black/10 dark:border-white/10 flex items-center justify-between text-[11px] sm:text-xs text-secondary font-medium">
                <span>{item.date || 'Ongoing'}</span>
                {isLink ? (
                  <a 
                    href={item.url} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="font-semibold text-accent flex items-center gap-1 hover:underline cursor-pointer"
                  >
                    <span>{item.badge}</span>
                    <ArrowUpRight size={12} />
                  </a>
                ) : (
                  <span className="font-semibold text-accent">{item.badge}</span>
                )}
              </div>
            </TiltCard>
          )
        })}
      </div>
    </section>
  )
}
