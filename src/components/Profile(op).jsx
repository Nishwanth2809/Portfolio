import { useState } from 'react'

const EXPERIENCE = [
  {
    id: 'exp-storytent',
    year: '2026',
    role: 'Software Developer Intern',
    org: 'StoryTent',
    location: 'Thane, India',
    period: 'Aug 2026 — Present',
    summary:
      'Maintained source code and integrated external packages across both the StoryTent mobile app and web portal. Developed additional full-stack features to enhance user experience and mitigated IT infrastructure delivery challenges.',
    stack: ['Full-stack Development', 'Mobile App Development', 'IT Infrastructure'],
  },
  {
    id: 'exp-01',
    year: '2026',
    role: 'Full Stack Web Development Intern',
    org: 'ElevanceSkills',
    location: 'Remote',
    period: 'Apr 2026 — Sep 2026',
    summary:
      'Building Twiller, a production-style social platform with scalable REST APIs, Firebase authentication, Razorpay payments, and security automation.',
    stack: ['Next.js', 'Express', 'MongoDB', 'Firebase', 'Razorpay'],
  },
  {
    id: 'exp-02',
    year: '2025',
    role: 'Student Mentor & Council Member',
    org: 'Centre for Innovation & Entrepreneurship',
    location: 'Hyderabad',
    period: 'Dec 2025 — Present',
    summary:
      'Mentored 100+ students from idea validation to deployable AI and software products, while leading sessions on ML, APIs, Git, and software architecture.',
    stack: ['Mentoring', 'AI / ML', 'Architecture', 'Python'],
  },
]

const EDUCATION = {
  degree: 'B.Tech · Computer Science & Engineering',
  spec: 'Specialisation in Artificial Intelligence & Machine Learning',
  school: 'Sreyas Institute of Engineering & Technology',
  location: 'Hyderabad, India',
  period: '2023 — 2027',
}

const STATS = [
  { value: '11', label: 'Products built' },
  { value: '100+', label: 'Students mentored' },
  { value: '04+', label: 'Core stacks' },
  { value: '2027', label: 'Graduation' },
]

export default function Profile({ className }) {
  const [openExpId, setOpenExpId] = useState(EXPERIENCE[0].id)

  return (
    <div
      className={`${className} profile-page`}
      id="pg-profile"
      role="main"
      aria-label="Profile and Experience"
    >
      {/* ── Standard Page Heading (matches Projects / Skills / Contact) ── */}
      <div className="page-heading animate-slide-up" style={{ animationDelay: '0.05s' }}>
        <p className="page-heading-tag">Profile / 01</p>
        <h2 className="page-heading-title">
          Background &amp;<br />
          <span className="dim">Experience.</span>
        </h2>
        <p className="page-heading-sub">
          AI / ML Engineer &amp; Full-Stack Builder · Hyderabad, India
        </p>
      </div>

      {/* ── Bio & Identity Card ── */}
      <div className="profile-container animate-slide-up" style={{ animationDelay: '0.12s' }}>
        <div className="profile-card profile-hero-card">
          <div className="profile-hero-top">
            <div className="profile-status-badge">
              <span className="status-dot" aria-hidden="true" />
              <span>Available for SDE &amp; ML roles</span>
            </div>
            <a
              className="btn btn-solid profile-resume-btn"
              href="/Nishwanth_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>View Resume</span>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                <polyline points="15 3 21 3 21 9"/>
                <line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
            </a>
          </div>

          <p className="profile-bio-text">
            Computer Science student specialising in Artificial Intelligence &amp; Machine Learning. Working across computer vision, NLP, data engineering, and production-grade backend systems — from model training to deployable APIs.
          </p>

          <div className="profile-stats-row">
            {STATS.map((item) => (
              <div className="profile-stat-box" key={item.label}>
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Education Card ── */}
        <div className="profile-card profile-edu-card animate-slide-up" style={{ animationDelay: '0.18s' }}>
          <div className="profile-card-header">
            <span className="profile-card-tag">Education</span>
            <span className="profile-card-period">{EDUCATION.period}</span>
          </div>
          <h3 className="profile-card-title">{EDUCATION.degree}</h3>
          <p className="profile-card-sub">{EDUCATION.spec}</p>
          <div className="profile-card-footer">
            <strong>{EDUCATION.school}</strong>
            <span>{EDUCATION.location}</span>
          </div>
        </div>

        {/* ── Experience Section ── */}
        <div className="profile-experience-section animate-slide-up" style={{ animationDelay: '0.24s' }}>
          <div className="profile-section-bar">
            <span className="profile-section-title">Work Experience</span>
            <span className="profile-section-count">03 Roles</span>
          </div>

          <div className="profile-exp-list">
            {EXPERIENCE.map((item) => {
              const isOpen = openExpId === item.id
              return (
                <div
                  key={item.id}
                  className={`profile-exp-card ${isOpen ? 'is-open' : ''}`}
                  onClick={() => setOpenExpId(isOpen ? null : item.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      setOpenExpId(isOpen ? null : item.id)
                    }
                  }}
                  aria-expanded={isOpen}
                >
                  <div className="profile-exp-head">
                    <div className="profile-exp-meta">
                      <span className="profile-exp-year">{item.year}</span>
                      <span className="profile-exp-org">{item.org} · {item.location}</span>
                    </div>
                    <span className="profile-exp-period">{item.period}</span>
                  </div>

                  <h3 className="profile-exp-role">{item.role}</h3>

                  <div className={`profile-exp-body ${isOpen ? 'is-open' : ''}`}>
                    <div className="profile-exp-inner">
                      <p className="profile-exp-summary">{item.summary}</p>
                      <div className="tags">
                        {item.stack.map((tech) => (
                          <span key={tech} className="tag">{tech}</span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <span className="profile-exp-toggle" aria-hidden="true">{isOpen ? '−' : '+'}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
