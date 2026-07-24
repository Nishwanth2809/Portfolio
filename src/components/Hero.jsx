import { useState, useEffect } from 'react'

export default function Hero({ className }) {
  const [typedText, setTypedText] = useState('')
  const fullText = 'Building intelligent systems · Hyderabad, India'

  useEffect(() => {
    let index = 0
    const interval = setInterval(() => {
      setTypedText(fullText.substring(0, index))
      index++
      if (index > fullText.length) {
        clearInterval(interval)
      }
    }, 40) // Speed of typing

    return () => clearInterval(interval)
  }, [])

  return (
    <div className={className} id="pg-home" role="main" aria-label="Home">
      <p className="hero-tag animate-slide-up" style={{ animationDelay: '0.1s' }}>
        AI / ML Engineer · CS Student
      </p>
      
      <h1 className="hero-name animate-slide-up" style={{ animationDelay: '0.2s' }}>
        Nishwanth<br /><span className="dim">Yarra.</span>
      </h1>
      
      <p className="hero-role animate-slide-up" style={{ animationDelay: '0.3s' }}>
        {typedText}
        <span className="type-cursor">|</span>
      </p>
      
      <p className="hero-bio animate-slide-up" style={{ animationDelay: '0.4s' }}>
        AI/ML engineer and Computer Science student building production-ready systems across computer vision, NLP, and backend engineering. Open to SDE and ML opportunities.
      </p>
      
      <div className="hero-btns animate-slide-up" style={{ animationDelay: '0.5s' }}>
        <a className="btn btn-solid" href="https://github.com/nishwanth2809" target="_blank" rel="noopener noreferrer">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
          GitHub
        </a>
        <a className="btn btn-outline" href="https://www.linkedin.com/in/yarranishwanth" target="_blank" rel="noopener noreferrer">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
          LinkedIn
        </a>
        <a className="btn btn-outline" href="/Nishwanth_Resume.pdf" target="_blank" rel="noopener noreferrer">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="8" y1="13" x2="16" y2="13"/><line x1="8" y1="17" x2="14" y2="17"/></svg>
          Résumé
        </a>
      </div>
    </div>
  )
}
