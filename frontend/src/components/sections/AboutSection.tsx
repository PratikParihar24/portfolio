import { motion } from 'framer-motion'
import ScrollFadeText from '../ui/ScrollFadeText'

export default function AboutSection() {
  const sentence = "4th-year CS undergrad building real-time systems & AI tooling with a focus on shipping things that matter."
  const words = sentence.split(" ")

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.04
      }
    }
  }

  const wordVariants = {
    hidden: { 
      opacity: 0, 
      y: 15,
      filter: "blur(6px)"
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
    <section id="about" className="py-10 max-w-5xl mx-auto px-6">
      <div className="text-center py-10">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-4xl md:text-5xl lg:text-[3.8rem] font-bold tracking-tight leading-[1.3] text-left md:text-center flex flex-wrap md:justify-center gap-x-3 gap-y-1.5"
          style={{ color: 'var(--text-main)' }}
        >
          {words.map((word, index) => {
            // "real-time systems & AI tooling" highlight
            const isHighlight = index >= 4 && index <= 8;
            // "shipping things that matter" accent style
            const isEmphasis = index >= 13 && index <= 16;

            return (
              <motion.span 
                key={`${word}-${index}`} 
                variants={wordVariants}
                className="inline-block"
                style={{ 
                  color: isHighlight ? 'var(--text-highlight)' : 'inherit',
                  fontWeight: isHighlight ? 800 : (isEmphasis ? 600 : 400),
                  textShadow: isHighlight ? '0 0 20px rgba(0, 229, 255, 0.2)' : 'none'
                }}
              >
                {word}
              </motion.span>
            )
          })}
        </motion.div>
        
        <div className="mt-20">
          <ScrollFadeText 
            className="text-3xl md:text-4xl font-curvy tracking-wide inline-block"
            style={{ 
              fontFamily: "'Caveat', cursive",
              color: 'var(--accent-color)',
              textShadow: '0 0 15px rgba(34, 197, 94, 0.15)'
            }}
          >
            Here is what I've been building recently ↓
          </ScrollFadeText>
        </div>
      </div>
    </section>
  )
}
