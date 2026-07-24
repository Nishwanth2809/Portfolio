import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import ScrollStack, { ScrollStackItem } from './ScrollStack/ScrollStack'

const PROJECTS = [
  {
    num: '01',
    title: 'Twiller — X Clone',
    category: 'Full Stack',
    role: 'Full Stack Lead & API Architect',
    desc: 'Social platform with audio tweets, tiered subscriptions, Razorpay payments, and OTP-based security. Designed and integrated 15+ REST API endpoints.',
    longDesc:
      'A production-style social networking platform built to handle real-time interactions, audio tweet broadcasting, tiered paid subscriptions, and robust API security. Designed and integrated 15+ REST API endpoints with Express and MongoDB, incorporated Firebase Authentication for secure user sessions, and integrated Razorpay for automated recurring billing and payment verification.',
    highlights: [
      'Audio Tweet Recording & Real-Time Playback engine',
      'Tiered Paid Subscription Plans via Razorpay Payment Gateway',
      '15+ Secure REST APIs with rate limiting, input validation, and CORS security',
      'OTP-based 2-Factor Security Authentication & Password Recovery',
    ],
    tags: ['Next.js', 'Express', 'MongoDB', 'Firebase', 'Razorpay', 'Tailwind'],
    github: 'https://github.com/Nishwanth2809/twiller',
    live: 'https://twiller-ruby.vercel.app/',
  },
  {
    num: '02',
    title: 'Brahmi Script Recognizer',
    category: 'Computer Vision',
    role: 'Computer Vision & ML Engineer',
    desc: 'Recognizes ancient Brahmi characters from images and transliterates into Telugu, Tamil, and Devanagari with 94% accuracy.',
    longDesc:
      'An end-to-end computer vision and Deep Learning pipeline that scans images of ancient Brahmi inscriptions and accurately transliterates them into modern Indian scripts (Telugu, Tamil, and Devanagari). Trained a custom Convolutional Neural Network (CNN) with TensorFlow/Keras on segmented character datasets, achieving 94% character recognition accuracy despite weathered artifact noise.',
    highlights: [
      '94% Character Recognition Accuracy across ancient stone/manuscript scripts',
      'OpenCV contour detection and adaptive thresholding for character segmentation',
      'Transliteration engine mapping Brahmi phonetics to Telugu, Tamil & Devanagari',
      'Interactive Web App built with Flask & React for image upload and real-time inference',
    ],
    tags: ['React', 'Flask', 'TensorFlow', 'Keras', 'OpenCV'],
    github: 'https://github.com/Nishwanth2809/Brahmi-Script',
    live: 'https://brahmi-script-evolution.vercel.app/',
  },
  {
    num: '03',
    title: 'Deepfake Detection System',
    category: 'Deep Learning',
    role: 'Deep Learning Systems Developer',
    desc: 'Real-time deepfake detection pipeline using ResNet18 and OpenCV for frame-level analysis and media authenticity verification. 92% accuracy.',
    longDesc:
      'A real-time deepfake detection framework engineered to inspect video frames for facial manipulation, unnatural blending artifacts, and temporal inconsistencies. Leveraged a fine-tuned ResNet18 convolutional architecture trained on facial manipulation benchmark datasets, integrated with OpenCV for frame extraction and real-time video stream analysis at 92% detection accuracy.',
    highlights: [
      'ResNet18 Deep Convolutional Backbone fine-tuned for facial artifact detection',
      'Frame-by-frame temporal analysis & facial landmark tracking with OpenCV',
      'Real-time video processing pipeline capable of analyzing live camera streams',
      '92% verification accuracy on deepfake detection benchmark datasets',
    ],
    tags: ['Python', 'OpenCV', 'ResNet18', 'PyTorch'],
    github: 'https://github.com/Nishwanth2809/Deep-Fake-Detection',
    live: null,
  },
  {
    num: '04',
    title: 'AI Medical Report Analyzer',
    category: 'ML',
    role: 'Full-Stack AI Engineer',
    desc: 'Extracts medical data with OCR and transforms complex healthcare documents into readable, AI-generated summaries for faster comprehension.',
    longDesc:
      'An intelligent healthcare document intelligence application that transforms complex, dense medical lab reports and clinical documentation into structured, plain-language summaries. Integrates Tesseract OCR for text extraction from scanned PDFs/images and LLM NLP pipelines to categorize metrics, flag out-of-range lab results, and provide patient-friendly explanations.',
    highlights: [
      'Tesseract OCR engine for document digitization from multi-page PDFs & images',
      'Automated lab result extraction & abnormal range detection',
      'Natural Language Summarization converting medical terminology to clear insights',
      'Privacy-conscious file handling with instant client-side preview',
    ],
    tags: ['React', 'Node.js', 'OCR', 'NLP'],
    github: 'https://github.com/Nishwanth2809/AI-Medical-Report-Analyzer',
    live: 'https://medical-report-analyzer-three.vercel.app/',
  },
  {
    num: '05',
    title: 'Moodify',
    category: 'NLP',
    role: 'ML & NLP Developer',
    desc: 'NLP-powered recommendation engine that detects mood from text and maps it to curated Spotify playlists. Multilingual support including Telugu, Hindi, Tamil.',
    longDesc:
      'An NLP-driven music recommendation system that analyzes text input (journal entries, mood descriptions, or social posts) to detect emotional sentiment and automatically generate/map curated Spotify playlists. Built using fine-tuned sentiment classifiers with multilingual NLP support (including English, Telugu, Hindi, and Tamil), integrated with the Spotify Web API.',
    highlights: [
      'Multilingual sentiment analysis across English, Telugu, Hindi, and Tamil',
      'Seamless integration with Spotify Web API for playlist generation',
      'Streamlit web interface with real-time mood visualization',
      'Dynamic valence & energy mapping to match music audio features',
    ],
    tags: ['Python', 'NLP', 'Spotify API', 'Streamlit'],
    github: 'https://github.com/Nishwanth2809/Moodify-Let-Your-Mood-Choose-the-Music-',
    live: 'https://moodstream-q4lr.onrender.com/',
  },
  {
    num: '06',
    title: 'AI Attention Monitor',
    category: 'Computer Vision',
    role: 'Computer Vision Developer',
    desc: 'Tracks student engagement in remote learning via gaze detection, blink analysis, and head pose estimation. Real-time inference at 30 FPS.',
    longDesc:
      'A computer vision surveillance tool built to measure student engagement and attentiveness during remote learning sessions. Uses OpenCV and MediaPipe Face Mesh to perform 3D head pose estimation, eye gaze tracking, and blink frequency analysis in real-time at 30 FPS without GPU requirement.',
    highlights: [
      'MediaPipe 468-point 3D Face Mesh for high-precision landmark tracking',
      'Real-time Eye Aspect Ratio (EAR) blink calculation & gaze direction mapping',
      'Head pose estimation (yaw, pitch, roll) for alertness scoring',
      'Low-overhead Python backend delivering 30 FPS CPU inference',
    ],
    tags: ['OpenCV', 'MediaPipe', 'Flask', 'React'],
    github: 'https://github.com/Nishwanth2809/AI-Attention',
    live: null,
  },
  {
    num: '07',
    title: 'Voice Chat AI Assistant',
    category: 'AI / Speech',
    role: 'Speech & AI Engineer',
    desc: 'Low-latency conversational voice assistant using Whisper for speech recognition, Gemini API for responses, and gTTS for speech output.',
    longDesc:
      'A low-latency conversational voice AI assistant that enables hands-free voice interactions. Uses OpenAI’s Whisper model for speech-to-text transcription, Google’s Gemini API for context-aware conversational intelligence, and gTTS for audio response synthesis.',
    highlights: [
      'Offline/Online Whisper model integration for speech recognition',
      'Multi-turn conversational memory with Gemini API',
      'Real-time audio streaming with PyAudio & gTTS audio playback',
      'Ultra-fast end-to-end voice query response loop',
    ],
    tags: ['Python', 'Whisper', 'Gemini API', 'PyAudio'],
    github: 'https://github.com/Nishwanth2809/Voice-Chat-AI-Assistant',
    live: null,
  },
  {
    num: '08',
    title: 'Local RAG System',
    category: 'AI Systems',
    role: 'AI Systems Engineer',
    desc: 'Private document Q&A application running entirely offline using Ollama, Llama 3, and LangChain for retrieval-augmented generation.',
    longDesc:
      'A 100% private, offline Retrieval-Augmented Generation (RAG) system for querying confidential enterprise documents. Built using LangChain, ChromaDB vector storage, and local Llama 3 models served via Ollama, ensuring zero data leaves the local machine.',
    highlights: [
      'Completely local & offline document Q&A — no API keys required',
      'High-performance vector embeddings with ChromaDB & LangChain',
      'Runs Llama 3 / Mistral locally via Ollama inference engine',
      'Streamlit chat UI with source document citation & page references',
    ],
    tags: ['LangChain', 'Ollama', 'ChromaDB', 'Streamlit'],
    github: 'https://github.com/Nishwanth2809/Local-RAG-System',
    live: null,
  },
  {
    num: '09',
    title: 'Sales & Revenue Analytics',
    category: 'Data Analytics',
    role: 'Data Analyst & BI Engineer',
    desc: 'Interactive Power BI analytics dashboard analyzing sales performance, revenue trends, customer segments, and regional sales distribution.',
    longDesc:
      'A comprehensive Business Intelligence suite developed in Power BI to analyze enterprise sales performance, revenue growth drivers, customer lifetime value, and regional distribution across multiple fiscal quarters. Built custom DAX metrics and star-schema relational data models from SQL databases.',
    highlights: [
      'Star-schema relational data modeling with SQL & DAX calculations',
      'Dynamic cohort analysis, regional revenue maps, and sales target tracking',
      'Automated executive summary KPI cards & filter slicers',
      'Data cleansing & ETL automation with Power Query',
    ],
    tags: ['Power BI', 'SQL', 'Data Modeling', 'DAX'],
    github: 'https://github.com/Nishwanth2809/Sales-Analytics-Dashboard',
    live: null,
  },
  {
    num: '10',
    title: 'IPL Analytics Dashboard',
    category: 'Data Analytics',
    role: 'Data Analyst & Tableau Developer',
    desc: 'Tableau dashboard analyzing 16+ seasons of IPL cricket data — team performance, player statistics, venue insights, and match outcome predictors.',
    longDesc:
      'An extensive sports analytics dashboard analyzing 16+ seasons of Indian Premier League (IPL) cricket data (2008–2024). Features deep-dive metrics on team win probabilities, venue bias, economy rates, partnership stats, and player head-to-head performance.',
    highlights: [
      'Comprehensive analysis of 16+ seasons of IPL historical data',
      'Dynamic venue, toss impact, and target defense/chase success metrics',
      'Player head-to-head comparison tool & match outcome predictor',
      'Published live on Tableau Public with 1000+ views',
    ],
    tags: ['Tableau', 'Python', 'Pandas', 'Data Viz'],
    github: 'https://github.com/Nishwanth2809/IPL-Analytics-Tableau',
    live: 'https://public.tableau.com/app/profile/nishwanth.yarra/viz/IPLAnalyticsDashboard2008-2024_17821134384020/Dashboard1',
  },
  {
    num: '11',
    title: 'RL Car Racing Autopilot',
    category: 'Reinforcement Learning',
    role: 'Reinforcement Learning Engineer',
    desc: 'Trained a PPO agent in OpenAI Gym CarRacing-v2 environment achieving autonomous track navigation using continuous action spaces.',
    longDesc:
      'Trained an autonomous driving agent using Proximal Policy Optimization (PPO) in OpenAI Gym’s CarRacing-v2 continuous control environment. Processed pixel frame observations with a custom CNN encoder and tuned hyperparameters to achieve reliable track completion without off-track penalties.',
    highlights: [
      'PPO (Proximal Policy Optimization) reinforcement learning algorithm',
      'Custom CNN feature extractor processing 96x96 pixel environment frames',
      'Continuous control action space (steering, gas, braking)',
      'Evaluation metrics tracking mean reward, lap time, and track completion rate',
    ],
    tags: ['PyTorch', 'Gymnasium', 'PPO', 'Stable-Baselines3'],
    github: 'https://github.com/Nishwanth2809/AI-Car-Racing---PPO-Autopilot',
    live: null,
  },
]

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
  const [showAll, setShowAll] = useState(false)
  const [activeModalProject, setActiveModalProject] = useState(null)

  const visibleProjects = showAll ? PROJECTS : PROJECTS.slice(0, 6)

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

      <button className="projects-toggle" type="button" onClick={() => setShowAll(value => !value)} aria-expanded={showAll}>
        {showAll ? 'Show featured projects' : 'View all 11 projects'}
        <span aria-hidden="true">{showAll ? '↑' : '↓'}</span>
      </button>

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
    </div>
  )
}
