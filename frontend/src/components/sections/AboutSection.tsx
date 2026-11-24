import { motion } from 'framer-motion'
import ScrollFadeText from '../ui/ScrollFadeText'

export default function AboutSection() {
  const sentence = "4th-year CS undergrad building real-time systems & AI tooling with a focus on shipping things that matter."
  const words = sentence.split(" ")

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.03
      }
    }
  }

  const wordVariants = {
    hidden: { 
      opacity: 0, 
      y: 12,
      filter: "blur(4px)"
    },
    visible: { 
      opacity: 1, 
      y: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring" as const,
        damping: 20,
        stiffness: 120
      }
    }
  }

  return (
    <section id="about" className="py-8 sm:py-12 max-w-5xl mx-auto px-4 sm:px-6">
      <div className="text-center py-6 sm:py-10">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="text-2xl sm:text-4xl md:text-5xl lg:text-[3.4rem] font-bold tracking-tight leading-[1.3] text-left sm:text-center flex flex-wrap sm:justify-center gap-x-2 sm:gap-x-3 gap-y-1 sm:gap-y-1.5"
          style={{ color: 'var(--text-main)' }}
        >
          {words.map((word, index) => {
            // "real-time systems & AI tooling" highlight
            const isHighlight = index >= 4 && index <= 8;
            // "shipping things that matter" accent style
            const isEmphasis = index >= 13 && index <= 16;

            return (
              <motion.span
                key={index}
                variants={wordVariants}
                className={`inline-block transition-all duration-300 hover:scale-105 cursor-default ${
                  isHighlight 
                    ? "text-accent font-extrabold" 
                    : isEmphasis
                    ? "font-extrabold underline decoration-accent/40 underline-offset-4 sm:underline-offset-8"
                    : ""
                }`}
              >
                {word}
              </motion.span>
            )
          })}
        </motion.div>
      </div>

      <div className="mt-16 sm:mt-24">
        <ScrollFadeText 
          className="text-center text-2xl sm:text-3xl md:text-4xl font-curvy tracking-wide"
          style={{ 
            fontFamily: "'Caveat', cursive",
            color: 'var(--accent-color)',
            textShadow: '0 0 15px rgba(34, 197, 94, 0.15)'
          }}
        >
          Here's a glimpse of what I've worked on... ↓
        </ScrollFadeText>
      </div>
    </section>
  )
}
