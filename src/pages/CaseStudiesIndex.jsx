import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CASE_STUDIES } from '../data/caseStudies'
import { getProjectBySlug, getProjectByNum } from '../data/projects'
import Navbar from '../components/Navbar'
import PortfolioHubIcon from '../components/PortfolioHubIcon'
import './CaseStudyPage.css'

const ArrowLeftIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </svg>
)

export default function CaseStudiesIndex({ initialTheme = 'light' }) {
  const navigate = useNavigate()
  const [theme, setTheme] = useState(() => {
    return document.documentElement.getAttribute('data-theme') || initialTheme
  })

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
    document.title = 'Case Studies — Deep Dives | Nishwanth Yarra'
  }, [])

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(nextTheme)
    document.documentElement.setAttribute('data-theme', nextTheme)
    document.body.setAttribute('data-theme', nextTheme)
    const meta = document.querySelector('meta[name="theme-color"]')
    if (meta) meta.setAttribute('content', nextTheme === 'dark' ? '#000000' : '#f5f4f0')
  }

  const handleNavNavigate = (tab) => {
    navigate(`/?tab=${tab}`)
  }

  return (
    <div className="cs-page-wrapper" data-theme={theme}>
      {/* ── Top Navigation Bar ── */}
      <header className="cs-page-nav" role="banner">
        <div className="cs-page-nav-inner">
          <div className="cs-page-nav-left">
            <Link to="/?tab=projects" className="cs-back-btn">
              <ArrowLeftIcon />
              <span>Back to Projects</span>
            </Link>

            <nav className="cs-breadcrumbs" aria-label="Breadcrumb">
              <Link to="/">Portfolio</Link>
              <span className="cs-breadcrumbs-separator">/</span>
              <span className="cs-breadcrumbs-current">Case Studies</span>
            </nav>
          </div>

          <div className="cs-page-nav-right">
            <Link to="/?tab=projects" className="cs-action-btn cs-action-btn--secondary" style={{ padding: '6px 14px', fontSize: '12px' }}>
              <span>View All 11 Projects →</span>
            </Link>
          </div>
        </div>
      </header>

      {/* ── Main Content ── */}
      <main className="cs-page-container">
        <div className="cs-index-header">
          <p className="cs-index-kicker">ENGINEERING DEEP DIVES</p>
          <h1 className="cs-index-title">
            Featured Case Studies<span className="cs-title-dot">.</span>
          </h1>
          <p className="cs-index-subtitle">
            In-depth architectural breakdowns, algorithmic pipelines, implementation trade-offs, and verified production outcomes.
          </p>
        </div>

        <div className="cs-index-grid">
          {CASE_STUDIES.map((study) => {
            const project = getProjectBySlug(study.slug) || getProjectByNum(study.id)

            return (
              <article key={study.id} className="cs-index-card">
                <div className="cs-index-card-top">
                  <div className="cs-kicker-badge">
                    <span className="cs-kicker-num">0{study.id}</span>
                    <span>CASE STUDY</span>
                  </div>
                </div>

                <div>
                  <h2 className="cs-index-card-title">
                    <Link to={`/case-study/${study.slug}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                      {study.name}<span className="cs-title-dot">.</span>
                    </Link>
                  </h2>
                  <p className="cs-index-card-headline">{study.headline}</p>
                </div>

                <p className="cs-index-card-summary">{study.summary}</p>

                {/* Pipeline overview */}
                {study.steps && (
                  <div className="case-study-pipeline" style={{ margin: '8px 0', padding: '12px 16px' }}>
                    <div className="case-study-pipeline-track" style={{ gap: '8px' }}>
                      {study.steps.map((st, i) => (
                        <span key={i} className="cs-pipeline-step" style={{ padding: '4px 10px', fontSize: '11px' }}>
                          <span className="cs-step-num">0{i + 1}</span>
                          <span className="cs-step-name">{st}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="cs-index-card-footer">
                  <div className="cs-tags">
                    {project?.tags?.slice(0, 4).map((t) => (
                      <span key={t} className="cs-tag">{t}</span>
                    ))}
                  </div>

                  <Link to={`/case-study/${study.slug}`} className="cs-action-btn cs-action-btn--primary">
                    <span>Read Deep Dive</span>
                    <span>→</span>
                  </Link>
                </div>
              </article>
            )
          })}
        </div>

        {/* ── PORTFOLIO EXPLORATION HUB ── */}
        <section className="cs-portfolio-hub" style={{ marginTop: '54px' }}>
          <div className="cs-hub-header">
            <p className="cs-hub-tag">EXPLORE MORE</p>
            <h2 className="cs-hub-title">Continue Through The Portfolio</h2>
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

      {/* ── FLOATING PORTFOLIO NAVBAR ── */}
      <Navbar
        activeTab="projects"
        onNavigate={handleNavNavigate}
        theme={theme}
        onToggleTheme={toggleTheme}
      />
    </div>
  )
}
