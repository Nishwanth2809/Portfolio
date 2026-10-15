export const PROJECTS = [
  {
    num: '01',
    title: 'Twiller — Social Platform',
    slug: 'twiller',
    category: 'Full Stack',
    role: 'Full Stack Lead & API Architect',
    desc: 'Full-stack social platform with topic and community feeds, six configurable feed rules, audio posts, messaging, and verified Razorpay plan purchases.',
    longDesc:
      'An X-inspired social platform built with Next.js 15, React 19, TypeScript, Express 5, and MongoDB. Users can publish text, images, and audio; join community circles; follow topics; and shape four feed modes with six filtering and ranking rules. Firebase-backed sessions protect account actions, while Razorpay order verification grants 30-day paid plans. The application also includes threaded replies, bookmarks, polling-based messaging, admin moderation, and a conversation-insight prototype backed by a mock provider.',
    highlights: [
      'Four feed modes: For You, Following, Topics, and Circles',
      'Six feed rules with expiry controls and score-aware cursor pagination',
      'Audio posts, threaded replies, bookmarks, and polling-based messaging',
      'Firebase session checks and transaction-backed Razorpay plan activation',
    ],
    tags: ['Next.js', 'TypeScript', 'Express', 'MongoDB', 'Firebase', 'Razorpay', 'Tailwind'],
    github: 'https://github.com/Nishwanth2809/twiller',
    live: 'https://twiller-ruby.vercel.app/',
  },
  {
    num: '02',
    title: 'Attn — AI Focus Coach',
    slug: 'attn',
    category: 'Automation',
    role: 'Full-Stack & Automation Developer',
    desc: 'Privacy-first personal focus coach utilizing on-device MediaPipe vision, configurable automation rules, and live session analytics.',
    longDesc:
      'A browser-first personal focus coach and automation showcase that turns focus sessions into actionable insights. Powered by on-device MediaPipe Face Mesh, it tracks gaze direction, head pose alignment, and eye openness in real time to trigger customizable coaching automations (gentle nudges, automated pauses, break reminders) with zero server-side processing, user accounts, or paid APIs.',
    highlights: [
      'On-device MediaPipe 468-point Face Mesh for real-time gaze & head pose tracking',
      'Configurable automation engine with custom triggers, cooldowns, and coaching actions',
      '100% private client-side architecture with local data storage & CSV/JSON report exports',
      'Interactive focus workspace featuring live signal timelines, streak tracking, and coaching logs',
    ],
    tags: ['Automation', 'MediaPipe', 'React 19', 'Vite', 'Cloudflare Workers'],
    github: 'https://github.com/Nishwanth2809/AI-Attention',
    live: 'https://ai-attention.nishwanthyarra.workers.dev/',
  },
  {
    num: '03',
    title: 'Brahmi Script Recognizer',
    slug: 'brahmi',
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
    num: '04',
    title: 'Deepfake Detection System',
    slug: 'deepfake-detection',
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
    num: '05',
    title: 'AI Medical Report Analyzer',
    slug: 'medical-report-analyzer',
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
    num: '06',
    title: 'Moodify',
    slug: 'moodify',
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
    num: '07',
    title: 'Voice Chat AI Assistant',
    slug: 'voice-chat-ai',
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
    slug: 'local-rag',
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
    slug: 'sales-analytics',
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
    slug: 'ipl-analytics',
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
    slug: 'rl-car-racing',
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

export function getProjectByNum(num) {
  return PROJECTS.find((p) => p.num === num) || null
}

export function getProjectBySlug(slug) {
  return PROJECTS.find((p) => p.slug === slug) || null
}
