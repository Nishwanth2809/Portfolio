const SKILL_GROUPS = [
  {
    label: 'AI Systems',
    icon: 'ti ti-brain',
    summary: 'Model training, NLP, speech, RAG, and practical inference workflows.',
    primary: ['PyTorch', 'TensorFlow', 'Transformers', 'scikit-learn'],
    secondary: 'QLoRA / PEFT, Keras, Gemini API, vLLM, LiteLLM, Streamlit, OpenCV, MediaPipe, Reinforcement Learning (Gym)',
  },
  {
    label: 'Product Engineering',
    icon: 'ti ti-code',
    summary: 'Frontend and backend systems built around clean APIs and usable interfaces.',
    primary: ['React', 'Next.js', 'Node.js', 'Spring Boot'],
    secondary: 'Angular, React Native, Express.js, Flask, FastAPI, Spring Security, JWT, Swagger, REST APIs, WebSockets (Socket.io), Tailwind CSS, Material-UI, JUnit, Mockito',
  },
  {
    label: 'Data & Storage',
    icon: 'ti ti-database',
    summary: 'Data handling, analytics, vector search, and relational document storage.',
    primary: ['MongoDB', 'PostgreSQL', 'SQLite', 'Qdrant'],
    secondary: 'SQL, Redis, NumPy, Pandas, Matplotlib, Tableau, Power BI, SQLAlchemy, Jupyter',
  },
  {
    label: 'Infra & Workflow',
    icon: 'ti ti-cloud',
    summary: 'Deployment, collaboration, tooling, and production-minded delivery.',
    primary: ['Docker', 'Linux', 'GitHub', 'Vercel'],
    secondary: 'Firebase, Render, Razorpay, Postman, Figma, VS Code',
  },
]

const FOUNDATIONS = ['Python', 'Java', 'JavaScript', 'SQL', 'C']

export default function Skills({ className }) {
  return (
    <div className={`${className} skills-page`} id="pg-skills" role="main" aria-label="Skills">
      <div className="page-heading animate-slide-up" style={{ animationDelay: '0.05s' }}>
        <p className="page-heading-tag">Expertise</p>
        <h2 className="page-heading-title">Skills &amp;<br /><span className="dim">Tools.</span></h2>
        <p className="page-heading-sub">Production-grade skills across AI/ML, full-stack engineering, and data systems</p>
      </div>

      <div className="skills-focus animate-slide-up" style={{ animationDelay: '0.12s' }}>
        {FOUNDATIONS.map(skill => (
          <span key={skill} className="skills-focus-item">{skill}</span>
        ))}
      </div>

      <div className="skills-grid">
        {SKILL_GROUPS.map((group, index) => (
          <section
            key={group.label}
            className="skill-card animate-slide-up"
            style={{ animationDelay: `${0.18 + index * 0.08}s` }}
          >
            <div className="skill-card-head">
              <i className={`${group.icon} skill-card-icon`} aria-hidden="true"></i>
              <h3 className="skill-card-title">{group.label}</h3>
            </div>
            <p className="skill-card-summary">{group.summary}</p>
            <div className="skill-primary-list">
              {group.primary.map(skill => (
                <span key={skill} className="skill-primary">{skill}</span>
              ))}
            </div>
            <p className="skill-secondary">{group.secondary}</p>
          </section>
        ))}
      </div>
    </div>
  )
}
