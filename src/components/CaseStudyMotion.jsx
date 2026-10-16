import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Content remains visible if observers or motion are unavailable.
export default function CaseStudyMotion() {
  const { pathname } = useLocation()

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    const elements = document.querySelectorAll('.cs-spec-row, .cs-index-card, .cs-portfolio-hub')
    let observer
    const configure = () => {
      observer?.disconnect()
      elements.forEach(element => element.classList.remove('motion-reveal'))
      if (preference.matches || !('IntersectionObserver' in window)) return
      observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return
          entry.target.classList.add('motion-reveal')
          observer.unobserve(entry.target)
        })
      }, { threshold: 0.08 })
      elements.forEach(element => observer.observe(element))
    }
    configure()
    preference.addEventListener('change', configure)
    return () => {
      observer?.disconnect()
      preference.removeEventListener('change', configure)
      elements.forEach(element => element.classList.remove('motion-reveal'))
    }
  }, [pathname])

  return null
}
