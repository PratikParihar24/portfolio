import { Link } from 'react-router-dom'
import content from '../data/content.json'
import { Download, ArrowLeft } from 'lucide-react'

export default function Resume() {
  const { profile, education, skills, achievements } = content

  return (
    <div className="min-h-screen py-24 px-6 max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
        <div>
          <Link to="/" className="inline-flex items-center gap-2 text-secondary hover:text-accent transition-colors mb-4">
            <ArrowLeft size={18} /> Back to Portfolio
          </Link>
          <h1 className="text-4xl font-bold text-text-main">Resume</h1>
        </div>
        <div className="flex gap-4">
          <a href="/resume.pdf" download className="flex items-center gap-2 px-6 py-3 bg-accent text-bg-theme rounded-lg font-bold glow-effect hover:glow-hover transition-all">
            <Download size={18} />
            Download PDF
          </a>
        </div>
      </div>
      
      <div className="glass-panel p-8 md:p-12 min-h-[800px] bg-bg-theme bg-opacity-95 dark:bg-opacity-95 shadow-2xl space-y-12">
        {/* Header */}
        <header className="border-b border-secondary pb-8">
          <h2 className="text-4xl font-bold text-text-main mb-2">{profile.name}</h2>
          <p className="text-xl text-secondary">{profile.tagline}</p>
        </header>

        {/* Education */}
        <section>
          <h3 className="text-2xl font-bold text-text-main mb-6 uppercase tracking-wider text-accent">Education</h3>
          <div>
            <div className="flex justify-between items-end mb-2">
              <h4 className="text-xl font-bold text-text-main">{education.degree}</h4>
              <span className="text-secondary font-medium">{education.duration}</span>
            </div>
            <p className="text-lg text-secondary mb-4">{education.institution} &nbsp;•&nbsp; CGPA: {education.cgpa}</p>
            <ul className="list-disc list-inside text-secondary space-y-2 ml-2">
              {education.highlights.map((h, i) => <li key={i}>{h}</li>)}
            </ul>
          </div>
        </section>

        {/* Skills */}
        <section>
          <h3 className="text-2xl font-bold text-text-main mb-6 uppercase tracking-wider text-accent">Skills & Technologies</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(skills).map(([category, items]) => (
              <div key={category}>
                <h4 className="font-bold text-text-main mb-2">{category}</h4>
                <p className="text-secondary leading-relaxed">{items.join(', ')}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Selected Highlights */}
        <section>
          <h3 className="text-2xl font-bold text-text-main mb-6 uppercase tracking-wider text-accent">Key Highlights</h3>
          <div className="space-y-6">
            {achievements.map(ach => (
              <div key={ach.id} className="flex flex-col md:flex-row gap-2 md:gap-6">
                <span className="font-bold text-text-main md:w-32 flex-shrink-0">{ach.stat}</span>
                <p className="text-secondary">{ach.label} {ach.date && <span className="opacity-70 text-sm ml-2">({ach.date})</span>}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
