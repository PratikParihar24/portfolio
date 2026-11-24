import content from '../../data/content.json'
import { motion } from 'framer-motion'
import { Briefcase, Calendar, ChevronRight } from 'lucide-react'
import MagneticChip from '../ui/MagneticChip'

export default function ExperienceSection() {
  const { experience } = content

  if (!experience || experience.length === 0) return null

  return (
    <section id="experience" className="py-16 max-w-5xl mx-auto px-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-accent/10 text-accent border border-accent/20 mb-3">
            <Briefcase size={14} className="text-accent" />
            Industry Career
          </div>
          <motion.h2
            initial={{ opacity: 0, y: -15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-extrabold text-text-main tracking-tight"
          >
            Work Experience
          </motion.h2>
        </div>
        <p className="text-secondary text-sm md:text-base max-w-md">
          Production full-stack development, LLM/RAG pipelines, and ERP systems engineering.
        </p>
      </div>

      {/* Experience Timeline Cards */}
      <div className="space-y-6">
        {experience.map((exp: any, idx: number) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            className="p-7 md:p-9 rounded-3xl border border-black/10 dark:border-white/10 bg-white dark:bg-zinc-900 shadow-md hover:shadow-xl hover:border-accent/30 transition-all duration-300 relative overflow-hidden group"
          >
            {/* Top ambient glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -mr-20 -mt-20 group-hover:bg-accent/10 transition-all duration-500 pointer-events-none" />

            {/* Header info */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-6 relative z-10 border-b border-black/10 dark:border-white/10 pb-5">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                  <h3 className="text-xl md:text-2xl font-bold text-text-main">
                    {exp.role}
                  </h3>
                  {exp.type && (
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-accent/15 text-accent border border-accent/25">
                      {exp.type}
                    </span>
                  )}
                </div>
                <p className="text-base font-semibold text-accent flex items-center gap-1.5">
                  <span>{exp.company}</span>
                </p>
              </div>

              <div className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 text-secondary self-start md:self-auto">
                <Calendar size={14} className="text-accent" />
                <span>{exp.duration}</span>
              </div>
            </div>

            {/* Bullet Points */}
            <ul className="space-y-3.5 mb-8 relative z-10">
              {exp.points.map((point: string, pIdx: number) => (
                <li key={pIdx} className="flex items-start gap-3 text-sm md:text-base text-secondary leading-relaxed">
                  <div className="p-1 rounded-md bg-accent/10 text-accent shrink-0 mt-1">
                    <ChevronRight size={14} />
                  </div>
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            {/* Technologies used in the role */}
            {exp.tech && exp.tech.length > 0 && (
              <div className="relative z-10 pt-5 border-t border-black/10 dark:border-white/10">
                <p className="text-xs font-bold uppercase tracking-wider text-secondary mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                  Technologies Handled
                </p>
                <div className="flex flex-wrap gap-2">
                  {exp.tech.map((t: string) => (
                    <MagneticChip
                      key={t}
                      className="px-3 py-1 rounded-lg border border-black/10 dark:border-white/10 bg-slate-50/80 dark:bg-zinc-800/80 text-xs font-semibold text-text-main hover:border-accent hover:shadow-xs transition-colors"
                    >
                      {t}
                    </MagneticChip>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  )
}
