import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { useNavigate } from 'react-router-dom'
import ScrollStack, { ScrollStackItem } from './ScrollStack/ScrollStack'
import { CASE_STUDIES, getCaseStudyById } from '../data/caseStudies'
import { PROJECTS } from '../data/projects'
import CaseStudyModal from './CaseStudyModal'

const GithubIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
  </svg>
)

const ExternalIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
    <polyline points="15 3 21 3 21 9"/>
    <line x1="10" y1="14" x2="21" y2="3"/>
  </svg>
)

export default function Projects({ className }) {
  const navigate = useNavigate()
  const [showAll, setShowAll] = useState(false)
  const [filterMode, setFilterMode] = useState('all')
  const [activeModalProject, setActiveModalProject] = useState(null)
  const [activeCaseStudyId, setActiveCaseStudyId] = useState(null)

  const CASE_STUDY_IDS = new Set(CASE_STUDIES.map(s => s.id))

  const getCaseStudySlug = (num) => {
    const study = CASE_STUDIES.find(s => s.id === num)
    return study ? study.slug : 'twiller'
  }

  const getCaseStudyTag = (num) => {
    if (num === '01') return 'Full Stack · Case Study'
    if (num === '02') return 'Automation · Case Study'
    if (num === '03') return 'Computer Vision · Case Study'
    return 'Case Study'
  }

  const getCaseStudyButtonText = (num) => {
    if (num === '01') return 'Full Stack Case Study'
    if (num === '02') return 'Automation Case Study'
    if (num === '03') return 'Vision Case Study'
    return 'Case Study'
  }

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.toLowerCase()
      if (hash.includes('twiller')) navigate('/case-study/twiller')
      else if (hash.includes('attn')) navigate('/case-study/attn')
      else if (hash.includes('brahmi')) navigate('/case-study/brahmi')
    }
    handleHash()
    window.addEventListener('hashchange', handleHash)
    return () => window.removeEventListener('hashchange', handleHash)
  }, [navigate])

  const visibleProjects = filterMode === 'case-studies'
    ? PROJECTS.filter(p => CASE_STUDY_IDS.has(p.num))
    : (showAll ? PROJECTS : PROJECTS.slice(0, 6))

  const handleMouseMove = (e) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`)
    card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`)
  }

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActiveModalProject(null)
      }
    }
    if (activeModalProject) {
      window.addEventListener('keydown', handleKeyDown)
    }
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeModalProject])

  return (
    <div className={className} id="pg-projects" role="main" aria-label="Projects">
      <div className="page-heading animate-slide-up" style={{ animationDelay: '0.05s' }}>
        <p className="page-heading-tag">Portfolio</p>
        <h2 className="page-heading-title">Selected<br /><span className="dim">Work.</span></h2>
        <p className="page-heading-sub">End-to-end engineering · from models to full-stack products</p>

        <div className="projects-filter-bar">
          <button
            type="button"
            className={`projects-filter-pill ${filterMode === 'all' ? 'active' : ''}`}
            onClick={() => setFilterMode('all')}
          >
            All Projects ({PROJECTS.length})
          </button>
          <button
            type="button"
            className={`projects-filter-pill ${filterMode === 'case-studies' ? 'active' : ''}`}
            onClick={() => setFilterMode('case-studies')}
          >
            <span className="filter-star">✦</span> Featured Case Studies (Full Stack · Automation · Vision)
          </button>
        </div>
      </div>

      <div className="proj-grid">
        <ScrollStack
          itemDistance={36}
          itemScale={0.025}
          itemStackDistance={14}
          stackPosition="15%"
          baseScale={0.92}
        >
          {visibleProjects.map((p, i) => (
            <ScrollStackItem key={p.num}>
              <div
                className="proj-card"
                style={{
                  '--stack-index': i,
                  '--stack-count': visibleProjects.length,
                }}
                onMouseMove={handleMouseMove}
                onClick={() => setActiveModalProject(p)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    setActiveModalProject(p)
                  }
                }}
                aria-label={`Open details for ${p.title}`}
              >
                <div className="proj-card-inner">
                  <div className="proj-header">
                    <span className="proj-num">{p.num}</span>
                    <span className="proj-category">{p.category}</span>
                    {CASE_STUDY_IDS.has(p.num) && (
                      <span className="case-study-badge">
                        <span className="cs-badge-sparkle">✦</span> {getCaseStudyTag(p.num)}
                      </span>
                    )}
                  </div>
                  <p className="proj-title">{p.title}</p>
                  <p className="proj-desc">{p.desc}</p>
                  <div className="tags">
                    {p.tags.map(tag => (
                      <span key={tag} className="tag">{tag}</span>
                    ))}
                  </div>
                </div>
                <div className="proj-actions">
                  <button
                    type="button"
                    className="proj-action-btn proj-action-btn--details"
                    onClick={(e) => {
                      e.stopPropagation()
                      setActiveModalProject(p)
                    }}
                  >
                    <span>View Details</span>
                    <span className="details-arrow">→</span>
                  </button>

                  {CASE_STUDY_IDS.has(p.num) && (
                    <button
                      type="button"
                      className="proj-action-btn proj-action-btn--study"
                      onClick={(e) => {
                        e.stopPropagation()
                        navigate(`/case-study/${getCaseStudySlug(p.num)}`)
                      }}
                      aria-label={`Open case study for ${p.title}`}
                    >
                      <span>{getCaseStudyButtonText(p.num)}</span>
                      <span className="study-sparkle">↗</span>
                    </button>
                  )}


                  <div className="proj-actions-links">
                    <a
                      className="proj-action-btn"
                      href={p.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${p.title} GitHub`}
                      onClick={e => e.stopPropagation()}
                    >
                      <GithubIcon />
                      <span>Code</span>
                    </a>
                    {p.live && (
                      <a
                        className="proj-action-btn proj-action-btn--live"
                        href={p.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${p.title} live demo`}
                        onClick={e => e.stopPropagation()}
                      >
                        <ExternalIcon />
                        <span>Live</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </ScrollStackItem>
          ))}
        </ScrollStack>
      </div>

      {filterMode === 'all' && (
        <button className="projects-toggle" type="button" onClick={() => setShowAll(value => !value)} aria-expanded={showAll}>
          {showAll ? 'Show featured projects' : 'View all 11 projects'}
          <span aria-hidden="true">{showAll ? '↑' : '↓'}</span>
        </button>
      )}

      {/* ── PROJECT DETAILS MODAL ── */}
      {activeModalProject && createPortal(
        <div
          className="proj-modal-backdrop"
          data-theme={document.documentElement.getAttribute('data-theme') || 'light'}
          onClick={() => setActiveModalProject(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="proj-modal-title"
        >
          <div
            className="proj-modal-card"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="proj-modal-close"
              onClick={() => setActiveModalProject(null)}
              aria-label="Close project details"
            >
              ✕
            </button>

            <div className="proj-modal-header">
              <div className="proj-modal-meta">
                <span className="proj-num">{activeModalProject.num}</span>
                <span className="proj-category">{activeModalProject.category}</span>
                {CASE_STUDY_IDS.has(activeModalProject.num) && (
                  <span className="case-study-badge">
                    <span className="cs-badge-sparkle">✦</span> {getCaseStudyTag(activeModalProject.num)}
                  </span>
                )}
              </div>
              <h2 id="proj-modal-title" className="proj-modal-title">{activeModalProject.title}</h2>
              {activeModalProject.role && (
                <p className="proj-modal-role">{activeModalProject.role}</p>
              )}
            </div>

            <div className="proj-modal-body">
              <div className="proj-modal-section">
                <h3>Overview &amp; Architecture</h3>
                <p>{activeModalProject.longDesc || activeModalProject.desc}</p>
              </div>

              {activeModalProject.highlights && activeModalProject.highlights.length > 0 && (
                <div className="proj-modal-section">
                  <h3>Key Highlights &amp; Technical Features</h3>
                  <ul className="proj-modal-highlights">
                    {activeModalProject.highlights.map((h, i) => (
                      <li key={i}>
                        <span className="check-icon">✓</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="proj-modal-section">
                <h3>Technologies &amp; Tools</h3>
                <div className="tags">
                  {activeModalProject.tags.map((tag) => (
                    <span key={tag} className="tag tag--modal">{tag}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="proj-modal-footer">
              {CASE_STUDY_IDS.has(activeModalProject.num) && (
                <button
                  type="button"
                  className="btn btn-study"
                  onClick={() => {
                    navigate(`/case-study/${getCaseStudySlug(activeModalProject.num)}`)
                    setActiveModalProject(null)
                  }}
                >
                  <span>📖 Read {activeModalProject.num === '01' ? 'Full Stack' : activeModalProject.num === '02' ? 'Automation' : 'Vision'} Case Study</span>
                </button>
              )}

              <a
                className="btn btn-solid"
                href={activeModalProject.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                <GithubIcon />
                <span>View Source Code</span>
              </a>
              {activeModalProject.live && (
                <a
                  className="btn btn-outline"
                  href={activeModalProject.live}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalIcon />
                  <span>Launch Live Demo</span>
                </a>
              )}
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* ── CASE STUDY MODAL ── */}
      {activeCaseStudyId && (
        <CaseStudyModal
          study={getCaseStudyById(activeCaseStudyId)}
          project={PROJECTS.find(p => p.num === activeCaseStudyId)}
          onClose={() => setActiveCaseStudyId(null)}
          onSelectStudy={(id) => setActiveCaseStudyId(id)}
        />
      )}
    </div>
  )
}
