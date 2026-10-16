import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { CASE_STUDIES, getCaseStudyBySlugOrId } from '../data/caseStudies'
import { getProjectByNum, getProjectBySlug } from '../data/projects'
import Navbar from '../components/Navbar'
import PortfolioHubIcon from '../components/PortfolioHubIcon'
import './CaseStudyPage.css'

const GithubIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
)

const ExternalIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
)

const ArrowLeftIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </svg>
)

export default function CaseStudyPage({ theme: initialTheme, onToggleTheme }) {
  const { slug } = useParams()
  const navigate = useNavigate()

  const [theme, setTheme] = useState(() => {
    return document.documentElement.getAttribute('data-theme') || initialTheme || 'light'
  })

  const study = getCaseStudyBySlugOrId(slug)
  const project = study ? (getProjectBySlug(study.slug) || getProjectByNum(study.id)) : null

  // Update theme and sync with root document
  const toggleCurrentTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(nextTheme)
    document.documentElement.setAttribute('data-theme', nextTheme)
    document.body.setAttribute('data-theme', nextTheme)
    const meta = document.querySelector('meta[name="theme-color"]')
    if (meta) meta.setAttribute('content', nextTheme === 'dark' ? '#000000' : '#f5f4f0')
    if (onToggleTheme) onToggleTheme()
  }

  // Scroll to top and update document title on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
    if (study) {
      document.title = `${study.name} — ${study.discipline} Case Study | Nishwanth Yarra`
    } else {
      document.title = 'Case Study Not Found | Nishwanth Yarra'
    }
  }, [study])

  const handleNavNavigate = (tab) => {
    navigate(`/?tab=${tab}`)
  }

  if (!study) {
    return (
      <div className="cs-page-wrapper" data-theme={theme}>
        <header className="cs-page-nav">
          <div className="cs-page-nav-inner">
            <Link to="/?tab=projects" className="cs-back-btn">
              <ArrowLeftIcon />
              <span>Back to Projects</span>
            </Link>
          </div>
        </header>
        <main className="cs-page-container">
          <div className="cs-not-found">
            <h1 className="cs-not-found-title">Case Study Not Found</h1>
            <p className="cs-not-found-text">
              The case study requested at <code>/{slug}</code> does not exist in the portfolio.
            </p>
            <div className="cs-hero-actions" style={{ justifyContent: 'center' }}>
              {CASE_STUDIES.map(s => (
                <Link
                  key={s.id}
                  to={`/case-study/${s.slug}`}
                  className="cs-action-btn cs-action-btn--primary"
                >
                  View {s.name} Deep Dive →
                </Link>
              ))}
            </div>
          </div>
        </main>
        <Navbar
          activeTab="projects"
          onNavigate={handleNavNavigate}
          theme={theme}
          onToggleTheme={toggleCurrentTheme}
        />
      </div>
    )
  }

  // Next / Prev calculations
  const currentIndex = CASE_STUDIES.findIndex((s) => s.id === study.id)
  const nextStudy = CASE_STUDIES[(currentIndex + 1) % CASE_STUDIES.length]
  const prevStudy = CASE_STUDIES[(currentIndex - 1 + CASE_STUDIES.length) % CASE_STUDIES.length]

  // Key metrics for each study
  const getMetrics = () => {
    if (study.slug === 'twiller') {
      return [
        { label: 'Feed Modes', value: '4', desc: 'For You, Following, Topics, and Circles' },
        { label: 'Feed Rules', value: '6', desc: 'Filtering and ranking with expiry controls' },
        { label: 'Paid Access', value: '30 Days', desc: 'Verified Razorpay purchases with posting quotas' },
        { label: 'Authentication', value: 'Firebase', desc: 'ID token verification and backend session checks' },
      ]
    }
    if (study.slug === 'attn') {
      return [
        { label: 'Privacy Standard', value: '100%', desc: 'On-device client inference, 0 server calls' },
        { label: 'Vision Model', value: '468 Pts', desc: 'MediaPipe Face Mesh dedicated web worker' },
        { label: 'Rule Engine', value: '4 Rules', desc: 'Configurable triggers, dwell times & cooldowns' },
        { label: 'Data Retention', value: 'Local 30', desc: 'Browser-local reports with CSV/JSON exports' },
      ]
    }
    if (study.slug === 'brahmi') {
      return [
        { label: 'Recognition Accuracy', value: '94%', desc: 'Reported character classification accuracy' },
        { label: 'Modern Scripts', value: '3 Scripts', desc: 'Transliteration to Telugu, Tamil, Devanagari' },
        { label: 'Vision Pipeline', value: 'OpenCV', desc: 'Adaptive thresholding & contour segmentation' },
        { label: 'Model Backbone', value: 'CNN', desc: 'Deep learning classifier with TensorFlow/Keras' },
      ]
    }
    return []
  }

  const metrics = getMetrics()

  return (
    <div className="cs-page-wrapper" data-theme={theme}>
      {/* ── INTEGRATED TOP HEADER ── */}
      <header className="cs-page-nav" role="banner">
        <div className="cs-page-nav-inner">
          <div className="cs-page-nav-left">
            <Link to="/?tab=projects" className="cs-back-btn" aria-label="Return to Portfolio Selected Work">
              <ArrowLeftIcon />
              <span>Back to Projects</span>
            </Link>

            <nav className="cs-breadcrumbs" aria-label="Breadcrumb">
              <Link to="/">Portfolio</Link>
              <span className="cs-breadcrumbs-separator">/</span>
              <Link to="/?tab=projects">Projects</Link>
              <span className="cs-breadcrumbs-separator">/</span>
              <span className="cs-breadcrumbs-current">{study.name}</span>
            </nav>
          </div>

          <nav className="cs-page-nav-center" aria-label="Quick switch between case studies">
            {CASE_STUDIES.map((s) => (
              <Link
                key={s.id}
                to={`/case-study/${s.slug}`}
                className={`cs-nav-tab-pill ${s.id === study.id ? 'active' : ''}`}
              >
                {s.name}
              </Link>
            ))}
          </nav>

          <div className="cs-page-nav-right">
            {project?.github && (
              <a
                className="cs-action-btn cs-action-btn--secondary"
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                style={{ padding: '6px 14px', fontSize: '12px' }}
              >
                <GithubIcon />
                <span>Code</span>
              </a>
            )}
            {project?.live && (
              <a
                className="cs-action-btn cs-action-btn--primary"
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                style={{ padding: '6px 14px', fontSize: '12px' }}
              >
                <ExternalIcon />
                <span>Live Demo</span>
              </a>
            )}
          </div>
        </div>
      </header>

      {/* ── MAIN CONTENT ── */}
      <main className="cs-page-container" id="case-study-content">
        {/* ── HERO BANNER ── */}
        <section className="cs-hero" aria-labelledby="cs-title">
          <div className="cs-hero-kicker">
            <span className="cs-kicker-badge">
              <span className="cs-kicker-num">0{study.id}</span>
              <span>CASE STUDY</span>
            </span>
          </div>

          <h1 id="cs-title" className="cs-hero-title">
            {study.name}
            <span className="cs-title-dot">.</span>
          </h1>

          <p className="cs-hero-headline">{study.headline}</p>
          <p className="cs-hero-summary">{study.summary}</p>

          {/* Quick Action Buttons */}
          <div className="cs-hero-actions">
            {project?.github && (
              <a
                className="cs-action-btn cs-action-btn--primary"
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                <GithubIcon />
                <span>View Source Code</span>
              </a>
            )}
            {project?.live && (
              <a
                className="cs-action-btn cs-action-btn--secondary"
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalIcon />
                <span>Launch Live Demo</span>
              </a>
            )}
            <Link to="/?tab=projects" className="cs-action-btn cs-action-btn--secondary">
              <span>Explore All Projects</span>
            </Link>
          </div>

          {/* Key Metrics Grid */}
          {metrics.length > 0 && (
            <div className="cs-metrics-grid">
              {metrics.map((m, idx) => (
                <div key={idx} className="cs-metric-card">
                  <div className="cs-metric-label">{m.label}</div>
                  <div className="cs-metric-value">{m.value}</div>
                  <div className="cs-metric-desc">{m.desc}</div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* ── EXECUTION PIPELINE ── */}
        {study.steps && study.steps.length > 0 && (
          <section className="cs-pipeline-card" aria-label="Execution pipeline">
            <div className="cs-pipeline-header">
              <h2 className="cs-pipeline-title">Architectural Pipeline &amp; Data Flow</h2>
            </div>
            <div className="cs-pipeline-track">
              {study.steps.map((step, idx) => (
                <div key={idx} className="cs-pipeline-step">
                  <span className="cs-step-num">0{idx + 1}</span>
                  <span className="cs-step-name">{step}</span>
                  <span className="cs-step-arrow">→</span>
                </div>
              ))}
              <div className="cs-pipeline-step cs-pipeline-output">
                <span className="cs-step-num">★</span>
                <span className="cs-step-name">{study.output}</span>
              </div>
            </div>
          </section>
        )}

        {/* ── VISUAL SHOWCASE / DIAGRAM ── */}
        {study.screenshot ? (
          <div className="cs-media-showcase">
            <img
              src={study.screenshot}
              alt={`${study.name} application preview`}
              className="cs-media-img"
              loading="eager"
            />
            <div className="cs-media-caption">
              <span>{study.name} application preview</span>
              {project?.live && (
                <a href={project.live} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--fg)', textDecoration: 'underline', textUnderlineOffset: '3px' }}>
                  Interactive Demo ↗
                </a>
              )}
            </div>
          </div>
        ) : study.slug === 'brahmi' ? (
          <div className="cs-brahmi-diagram" aria-label="Brahmi processing pipeline diagram">
            <div className="cs-brahmi-node">
              <span className="cs-brahmi-node-label">Step 1 · Input Inscription</span>
              <span className="cs-brahmi-glyph">𑀅 𑀓 𑀭</span>
              <div className="cs-brahmi-node-meta" style={{ marginTop: '6px' }}>Stone &amp; Manuscript Imagery</div>
            </div>
            <div className="cs-brahmi-arrow">➔ Adaptive Contour Segmentation ➔</div>
            <div className="cs-brahmi-node">
              <span className="cs-brahmi-node-label">Step 2 · CNN Classifier</span>
              <span className="cs-brahmi-glyph" style={{ fontSize: '18px' }}>94% Accuracy</span>
              <div className="cs-brahmi-node-meta" style={{ marginTop: '6px' }}>Phonetic Class Softmax</div>
            </div>
            <div className="cs-brahmi-arrow">➔ Transliteration Engine ➔</div>
            <div className="cs-brahmi-node">
              <span className="cs-brahmi-node-label">Step 3 · Modern Indian Scripts</span>
              <div className="cs-brahmi-node-meta" style={{ fontSize: '16px', color: 'var(--fg)' }}>
                తెలుగు · தமிழ் · देवनागरी
              </div>
            </div>
          </div>
        ) : null}

        {/* ── TECH STACK TAGS ── */}
        {project?.tags && (
          <div className="cs-stack-strip">
            <span className="cs-stack-label">Stack &amp; Frameworks:</span>
            <div className="cs-tags">
              {project.tags.map((tag) => (
                <span key={tag} className="cs-tag">{tag}</span>
              ))}
            </div>
          </div>
        )}

        {/* ── EDITORIAL SPECIFICATION SECTIONS (2-COLUMN TABLE) ── */}
        <div className="cs-spec-table">
          {study.overview && (
            <div className="cs-spec-row">
              <h2 className="cs-spec-label">Overview</h2>
              <div className="cs-spec-content">
                <p>{study.overview}</p>
              </div>
            </div>
          )}

          {study.contribution && (
            <div className="cs-spec-row">
              <h2 className="cs-spec-label">My contribution</h2>
              <div className="cs-spec-content">
                <p>{study.contribution}</p>
              </div>
            </div>
          )}

          {study.problem && (
            <div className="cs-spec-row">
              <h2 className="cs-spec-label">The problem</h2>
              <div className="cs-spec-content">
                <p>{study.problem}</p>
              </div>
            </div>
          )}

          {study.architecture && (
            <div className="cs-spec-row">
              <h2 className="cs-spec-label">Architecture</h2>
              <div className="cs-spec-content">
                <p>{study.architecture}</p>
              </div>
            </div>
          )}

          {study.challenges && (
            <div className="cs-spec-row">
              <h2 className="cs-spec-label">Challenges</h2>
              <div className="cs-spec-content">
                <p>{study.challenges}</p>
              </div>
            </div>
          )}

          {study.decisions && (
            <div className="cs-spec-row">
              <h2 className="cs-spec-label">Implementation decisions</h2>
              <div className="cs-spec-content">
                <p>{study.decisions}</p>
              </div>
            </div>
          )}

          {study.results && (
            <div className="cs-spec-row">
              <h2 className="cs-spec-label">Results</h2>
              <div className="cs-spec-content">
                <p>{study.results}</p>
              </div>
            </div>
          )}

          {study.limitation && (
            <div className="cs-spec-row">
              <h2 className="cs-spec-label">Limitations</h2>
              <div className="cs-spec-content">
                <p>{study.limitation}</p>
              </div>
            </div>
          )}
        </div>



        {/* ── BOTTOM PREV / NEXT STUDY NAVIGATION ── */}
        <nav className="cs-bottom-nav" aria-label="Case study navigation">
          <Link to={`/case-study/${prevStudy.slug}`} className="cs-bottom-nav-card">
            <span className="cs-bottom-nav-dir">← Previous Case Study</span>
            <span className="cs-bottom-nav-name">{prevStudy.name}</span>
          </Link>

          <Link to={`/case-study/${nextStudy.slug}`} className="cs-bottom-nav-card" style={{ textAlign: 'right' }}>
            <span className="cs-bottom-nav-dir" style={{ justifyContent: 'flex-end' }}>Next Case Study →</span>
            <span className="cs-bottom-nav-name">{nextStudy.name}</span>
          </Link>
        </nav>

        {/* ── PORTFOLIO EXPLORATION HUB ── */}
        <section className="cs-portfolio-hub" aria-labelledby="cs-hub-heading">
          <div className="cs-hub-header">
            <p className="cs-hub-tag">EXPLORE MORE</p>
            <h2 id="cs-hub-heading" className="cs-hub-title">Continue Through The Portfolio</h2>
            <p className="cs-hub-sub">Jump directly into any section of Nishwanth&apos;s workspace</p>
          </div>

          <div className="cs-hub-grid">
            <Link className="cs-hub-card" to="/?tab=projects">
              <PortfolioHubIcon type="projects" />
              <h3 className="cs-hub-card-title">All 11 Projects</h3>
              <p className="cs-hub-card-desc">Deep Learning, NLP, Automation, Computer Vision, and Full Stack applications.</p>
              <span className="cs-hub-card-link">View Selected Work →</span>
            </Link>

            <Link className="cs-hub-card" to="/?tab=skills">
              <PortfolioHubIcon type="skills" />
              <h3 className="cs-hub-card-title">Skills &amp; Tech Stack</h3>
              <p className="cs-hub-card-desc">React, Next.js, Express, PyTorch, MediaPipe, OpenCV, SQL, and Power BI.</p>
              <span className="cs-hub-card-link">View Skills →</span>
            </Link>

            <Link className="cs-hub-card" to="/?tab=contact">
              <PortfolioHubIcon type="contact" />
              <h3 className="cs-hub-card-title">Get In Touch</h3>
              <p className="cs-hub-card-desc">Open for software engineering, full-stack, and machine learning opportunities.</p>
              <span className="cs-hub-card-link">Contact Nishwanth →</span>
            </Link>
          </div>
        </section>
      </main>

      {/* ── SIGNATURE FLOATING PORTFOLIO NAVBAR ── */}
      <Navbar
        activeTab="projects"
        onNavigate={handleNavNavigate}
        theme={theme}
        onToggleTheme={toggleCurrentTheme}
      />
    </div>
  )
}
