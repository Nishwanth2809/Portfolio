import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { CASE_STUDIES } from '../data/caseStudies'

const GithubIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
)

const ExternalIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
)

export default function CaseStudyModal({ study, project, onClose, onSelectStudy }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  if (!study) return null

  const currentIndex = CASE_STUDIES.findIndex((s) => s.id === study.id)
  const nextStudy = CASE_STUDIES[(currentIndex + 1) % CASE_STUDIES.length]
  const prevStudy = CASE_STUDIES[(currentIndex - 1 + CASE_STUDIES.length) % CASE_STUDIES.length]

  return createPortal(
    <div
      className="case-study-backdrop"
      data-theme={document.documentElement.getAttribute('data-theme') || 'light'}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="cs-title"
    >
      <div className="case-study-card" onClick={(e) => e.stopPropagation()}>
        {/* Close button */}
        <button
          type="button"
          className="case-study-close"
          onClick={onClose}
          aria-label="Close case study"
        >
          ✕
        </button>

        {/* Header */}
        <div className="case-study-header">
          <div className="case-study-kicker">
            <span className="case-study-kicker-badge">
              {study.discipline ? `${study.discipline.toUpperCase()} CASE STUDY` : 'DEEP DIVE CASE STUDY'}
            </span>
            {project?.category && <span className="case-study-category">{project.category}</span>}
          </div>

          <h2 id="cs-title" className="case-study-title">
            {study.name}
            <span className="case-study-dot">.</span>
          </h2>
          <p className="case-study-headline">{study.headline}</p>

          {/* Quick links & tags */}
          <div className="case-study-top-actions">
            {project?.github && (
              <a
                className="btn btn-solid btn-sm"
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                <GithubIcon />
                <span>Source Code</span>
              </a>
            )}
            {project?.live && (
              <a
                className="btn btn-outline btn-sm"
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalIcon />
                <span>Live Demo</span>
              </a>
            )}
            <div className="case-study-study-nav-pills">
              {CASE_STUDIES.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  className={`cs-tab-pill ${s.id === study.id ? 'active' : ''}`}
                  onClick={() => onSelectStudy(s.id)}
                >
                  {s.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Pipeline / Steps diagram */}
        {study.steps && study.steps.length > 0 && (
          <div className="case-study-pipeline">
            <div className="case-study-pipeline-label">EXECUTION PIPELINE</div>
            <div className="case-study-pipeline-track">
              {study.steps.map((step, idx) => (
                <div key={idx} className="case-study-pipeline-step">
                  <span className="cs-step-num">0{idx + 1}</span>
                  <span className="cs-step-text">{step}</span>
                  <span className="cs-step-arrow">→</span>
                </div>
              ))}
              <div className="case-study-pipeline-step cs-step-output">
                <span className="cs-step-num">★</span>
                <span className="cs-step-text">{study.output}</span>
              </div>
            </div>
          </div>
        )}

        {/* Screenshot showcase */}
        {study.screenshot ? (
          <div className="case-study-screenshot-wrap">
            <img
              src={study.screenshot}
              alt={`${study.name} preview`}
              className="case-study-screenshot"
              loading="lazy"
            />
          </div>
        ) : study.slug === 'brahmi' ? (
          <div className="case-study-visual-diagram">
            <div className="brahmi-flow-card">
              <span className="brahmi-flow-label">Weathered Inscription</span>
              <span className="brahmi-glyph">𑀅 𑀓 𑀭</span>
            </div>
            <div className="brahmi-flow-arrow">➔ Adaptive Contour Segmentation ➔</div>
            <div className="brahmi-flow-card">
              <span className="brahmi-flow-label">CNN Classification (94%)</span>
              <span className="brahmi-glyph">Softmax Phonetics</span>
            </div>
            <div className="brahmi-flow-arrow">➔ Transliteration ➔</div>
            <div className="brahmi-flow-card">
              <span className="brahmi-flow-label">Output Modern Scripts</span>
              <span className="brahmi-target-scripts">తెలుగు · தமிழ் · देवनागरी</span>
            </div>
          </div>
        ) : null}

        {/* Tech tags */}
        {project?.tags && (
          <div className="case-study-tags-bar">
            <span className="tags-label">Stack &amp; Tools:</span>
            <div className="tags">
              {project.tags.map((t) => (
                <span key={t} className="tag tag--modal">{t}</span>
              ))}
            </div>
          </div>
        )}

        {/* Deep dive narrative sections (2-column editorial table matching specification) */}
        <div className="case-study-content cs-spec-table">
          {study.overview && (
            <div className="cs-spec-row">
              <h3 className="cs-spec-label">Overview</h3>
              <div className="cs-spec-content">
                <p>{study.overview}</p>
              </div>
            </div>
          )}

          {study.contribution && (
            <div className="cs-spec-row">
              <h3 className="cs-spec-label">My contribution</h3>
              <div className="cs-spec-content">
                <p>{study.contribution}</p>
              </div>
            </div>
          )}

          {study.problem && (
            <div className="cs-spec-row">
              <h3 className="cs-spec-label">The problem</h3>
              <div className="cs-spec-content">
                <p>{study.problem}</p>
              </div>
            </div>
          )}

          {study.architecture && (
            <div className="cs-spec-row">
              <h3 className="cs-spec-label">Architecture</h3>
              <div className="cs-spec-content">
                <p>{study.architecture}</p>
              </div>
            </div>
          )}

          {study.challenges && (
            <div className="cs-spec-row">
              <h3 className="cs-spec-label">Challenges</h3>
              <div className="cs-spec-content">
                <p>{study.challenges}</p>
              </div>
            </div>
          )}

          {study.decisions && (
            <div className="cs-spec-row">
              <h3 className="cs-spec-label">Implementation decisions</h3>
              <div className="cs-spec-content">
                <p>{study.decisions}</p>
              </div>
            </div>
          )}

          {study.results && (
            <div className="cs-spec-row">
              <h3 className="cs-spec-label">Results</h3>
              <div className="cs-spec-content">
                <p>{study.results}</p>
              </div>
            </div>
          )}

          {study.limitation && (
            <div className="cs-spec-row">
              <h3 className="cs-spec-label">Limitations</h3>
              <div className="cs-spec-content">
                <p>{study.limitation}</p>
              </div>
            </div>
          )}

          {study.evidence && (
            <div className="cs-evidence-box">
              <span className="cs-evidence-icon">ℹ</span>
              <span>{study.evidence}</span>
            </div>
          )}
        </div>

        {/* Footer with Next / Prev study navigation */}
        <div className="case-study-footer">
          <button
            type="button"
            className="cs-nav-btn cs-nav-btn--prev"
            onClick={() => onSelectStudy(prevStudy.id)}
          >
            ← Previous: {prevStudy.name}
          </button>

          <button
            type="button"
            className="btn btn-solid"
            onClick={() => onSelectStudy(nextStudy.id)}
          >
            Next Case Study: {nextStudy.name} →
          </button>
        </div>
      </div>
    </div>,
    document.body
  )
}
