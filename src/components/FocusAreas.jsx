import { useScrollReveal } from '../hooks/useScrollReveal'

const focusAreas = [
  'AI Systems',
  'Computer Vision',
  'NLP',
  'Real-time Applications',
]

export default function FocusAreas() {
  const ref = useScrollReveal(0.08)

  return (
    <section id="focus" className="section focus-section">
      <div ref={ref} className="scroll-reveal">
        <p className="focus-eyebrow">What I focus on</p>
        <h2 className="section-title">Core <span className="accent">Focus</span></h2>
        <hr className="section-divider" />

        <div className="focus-grid">
          {focusAreas.map((area) => (
            <div key={area} className="focus-card">{area}</div>
          ))}
        </div>
      </div>
    </section>
  )
}
