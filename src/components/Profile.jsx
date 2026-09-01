import { useState } from 'react'

const TIMELINE = [
  {
    id: 'exp-storytent',
    type: 'work',
    year: '2026',
    period: 'Aug 2026 — Present',
    title: 'Software Developer Intern',
    org: 'StoryTent (Daxinataha Mastishk Media)',
    location: 'Thane, India / Remote',
    summary:
      'Maintained source code and integrated external packages into the StoryTent platform. Developed additional full-stack features to enhance user experience and mitigated IT infrastructure delivery challenges.',
    stack: ['Full-stack Development', 'IT Infrastructure'],
  },
  {
    id: 'exp-01',
    type: 'work',
    year: '2026',
    period: 'Apr 2026 — Present',
    title: 'Full Stack Web Development Intern',
    org: 'ElevanceSkills',
    location: 'Remote',
    summary:
      'Building Twiller, a production-style social platform with scalable REST APIs, Firebase authentication, Razorpay payments, and security automation.',
    stack: ['Next.js', 'Express', 'MongoDB', 'Firebase', 'Razorpay'],
  },
  {
    id: 'exp-02',
    type: 'work',
    year: '2025',
    period: 'Dec 2025 — Present',
    title: 'Student Mentor & Council Member',
    org: 'Centre for Innovation & Entrepreneurship',
    location: 'Hyderabad',
    summary:
      'Mentored 100+ students from idea validation to deployable AI and software products, while leading sessions on ML, APIs, Git, and software architecture.',
    stack: ['Mentoring', 'AI / ML', 'Architecture', 'Python', 'APIs'],
  },
  {
    id: 'edu-01',
    type: 'education',
    year: '2023',
    period: '2023 — 2027',
    title: 'B.Tech · Computer Science & Engineering',
    org: 'Sreyas Institute of Engineering & Technology',
    location: 'Hyderabad, India',
    summary:
      'Specialisation in Artificial Intelligence & Machine Learning — coursework spanning computer vision, NLP, deep learning, and systems design.',
    stack: ['AI / ML Specialisation', 'Computer Vision', 'NLP'],
  },
]

const STATS = [
  { val: '11', label: 'Products built' },
  { val: '100+', label: 'Students mentored' },
  { val: '4+', label: 'Tech stacks' },
  { val: '2027', label: 'Graduation year' },
]

export default function Profile({ className }) {
  const [openId, setOpenId] = useState(TIMELINE[0].id)

  return (
    <div className={`${className} profile-page`} id="pg-profile" role="main" aria-label="Profile">
      {/* ── Standard Page Heading ── */}
      <div className="page-heading animate-slide-up" style={{ animationDelay: '0.05s' }}>
        <p className="page-heading-tag">Profile</p>
        <h2 className="page-heading-title">
          Dossier &amp;<br />
          <span className="dim">Timeline.</span>
        </h2>
        <p className="page-heading-sub">
          AI / ML Engineer &amp; Full-Stack Builder · Computer Science &rsquo;27
        </p>
      </div>

      {/* ── Intro Block ── */}
      <div className="in-card animate-slide-up" style={{ animationDelay: '0.12s' }}>
        {/* Status row */}
        <div className="in-status-row">
          <div className="in-status">
            <span className="in-dot" aria-hidden="true" />
            <span>Available for SDE &amp; ML roles</span>
          </div>
          <a
            className="in-resume"
            href="/Nishwanth_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            View Resume
            <svg width="11" height="11" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path
                d="M2 12L12 2M12 2H5M12 2V9"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>

        <div className="in-meta-line">
          <span>Hyderabad, India</span>
          <span className="in-meta-sep">/</span>
          <span>B.Tech &rsquo;27</span>
        </div>

        <hr className="in-rule" />

        <p className="in-bio">
          Computer Science student specialising in Artificial Intelligence &amp; Machine
          Learning — working across computer vision, NLP, data engineering, and
          production-grade backend systems.
        </p>

        <hr className="in-rule" />

        <div className="in-stats-row">
          {STATS.map((s) => (
            <div className="in-stat" key={s.label}>
              <strong>{s.val}</strong>
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Timeline Section ── */}
      <div className="profile-timeline-section animate-slide-up" style={{ animationDelay: '0.2s' }}>
        <div className="profile-section-label">
          <span>Journey</span>
          <span className="dim">Experience &amp; Education</span>
        </div>

        <div className="profile-timeline">
          {TIMELINE.map((item) => {
            const isOpen = openId === item.id
            return (
              <div
                className={`pf-tl-item ${isOpen ? 'is-open' : ''}`}
                key={item.id}
              >
                <div className="pf-tl-marker">
                  <span className="pf-tl-year">{item.year}</span>
                  <span className="pf-tl-dot" />
                  <span className="pf-tl-line" />
                </div>

                <button
                  className="pf-tl-card"
                  onClick={() => setOpenId(isOpen ? null : item.id)}
                  aria-expanded={isOpen}
                >
                  <div className="pf-tl-card-head">
                    <span className="pf-tl-type">
                      {item.type === 'work' ? 'Experience' : 'Education'}
                    </span>
                    <span className="pf-tl-period">{item.period}</span>
                  </div>

                  <h3 className="pf-tl-title">{item.title}</h3>
                  <p className="pf-tl-org">
                    {item.org} <span className="pf-dot-sep">·</span> {item.location}
                  </p>

                  <div className={`pf-tl-body ${isOpen ? 'is-open' : ''}`}>
                    <div className="pf-tl-body-inner">
                      <p className="pf-tl-summary">{item.summary}</p>
                      <div className="pf-tl-stack">
                        {item.stack.map((t) => (
                          <span key={t}>{t}</span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <span className="pf-tl-toggle" aria-hidden="true">{isOpen ? '−' : '+'}</span>
                </button>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}