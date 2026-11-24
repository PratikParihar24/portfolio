import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useAppStore } from '../../store/useAppStore'

interface PreloaderProps {
  onComplete: () => void
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [phase, setPhase] = useState<'revealing' | 'exiting'>('revealing')
  const theme = useAppStore(state => state.theme)
  const isDark = theme === 'dark'

  useEffect(() => {
    // Reveal text for ~1.8 seconds, then trigger exit transition
    const exitTimer = setTimeout(() => {
      setPhase('exiting')
    }, 1800)

    // Complete and unmount after slide-up curtain effect finishes
    const finishTimer = setTimeout(() => {
      onComplete()
    }, 2400)

    return () => {
      clearTimeout(exitTimer)
      clearTimeout(finishTimer)
    }
  }, [onComplete])

  const firstName = "Pratik"
  const lastName = "Parihar"

  return (
    <motion.div
      initial={{ y: 0 }}
      animate={phase === 'exiting' ? { y: '-100%' } : { y: 0 }}
      transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center select-none overflow-hidden transition-colors duration-300 ${
        isDark ? 'bg-zinc-950 text-white' : 'bg-[#F8FAFC] text-slate-900'
      }`}
    >
      {/* Ambient background glow */}
      <div 
        className={`absolute w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none ${
          isDark ? 'bg-accent/15' : 'bg-emerald-500/10'
        }`} 
      />

      {/* Name Animation Container */}
      <div className="relative z-10 flex flex-col items-center text-center px-6">
        {/* Top subtle category pill */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase border mb-6 ${
            isDark 
              ? 'bg-accent/10 text-accent border-accent/20' 
              : 'bg-emerald-500/10 text-emerald-700 border-emerald-500/20'
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
          <span>Full Stack Developer</span>
        </motion.div>

        {/* Name with character-by-character cascade */}
        <div className="flex items-center text-5xl sm:text-7xl md:text-8xl font-black tracking-tighter">
          {/* First Name */}
          <div className="flex overflow-hidden">
            {firstName.split("").map((char, index) => (
              <motion.span
                key={index}
                initial={{ y: "110%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 0.6,
                  delay: 0.2 + index * 0.05,
                  ease: [0.33, 1, 0.68, 1],
                }}
                className={`inline-block ${isDark ? 'text-white' : 'text-slate-900'}`}
              >
                {char}
              </motion.span>
            ))}
          </div>

          <span className="w-3 sm:w-5" />

          {/* Last Name (with green accent glow) */}
          <div className="flex overflow-hidden">
            {lastName.split("").map((char, index) => (
              <motion.span
                key={index}
                initial={{ y: "110%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 0.6,
                  delay: 0.5 + index * 0.05,
                  ease: [0.33, 1, 0.68, 1],
                }}
                className={`inline-block text-accent ${
                  isDark ? 'drop-shadow-[0_0_25px_rgba(34,197,94,0.4)]' : 'drop-shadow-[0_0_15px_rgba(22,163,74,0.3)]'
                }`}
              >
                {char}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Loading progress bar */}
        <div className={`w-48 h-1 rounded-full mt-8 overflow-hidden relative ${
          isDark ? 'bg-white/10' : 'bg-slate-200'
        }`}>
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.6, ease: "easeInOut" }}
            className="h-full bg-accent rounded-full shadow-[0_0_10px_rgba(34,197,94,0.8)]"
          />
        </div>
      </div>
    </motion.div>
  )
}
