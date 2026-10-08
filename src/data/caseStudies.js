export const CASE_STUDIES = [
  {
    id: '01',
    slug: 'twiller',
    name: 'Twiller',
    discipline: 'Full Stack',
    headline: 'A social platform, beyond the timeline.',
    summary: 'Audio posts, account security, and paid subscriptions connected through a full-stack web application.',
    steps: [
      'Next.js interface',
      'Express APIs',
      'MongoDB storage',
    ],
    output: 'Firebase authentication · Razorpay payments',
    overview:
      'Twiller is an X-style social application with audio tweets, tiered paid subscriptions, and OTP-based account security. It combines the user-facing social experience with API and payment integration work.',
    contribution:
      'I designed and integrated REST endpoints, connected authentication and payment services, and worked on the full-stack application during my ElevanceSkills internship.',
    problem:
      'A social application needs more than a feed. Posting audio, identifying users, recovering accounts, and verifying payments each introduce a different boundary between the interface and backend services.',
    architecture:
      'The documented stack is Next.js for the interface, Express for REST APIs, and MongoDB for storage. Firebase Authentication manages user sessions, while Razorpay provides subscription billing and payment verification.',
    challenges:
      'The implementation brings audio recording and playback together with authentication, subscriptions, and account recovery. The available records do not include production incident reports or load-test results.',
    decisions:
      'The API layer includes input validation, rate limiting, and CORS configuration. Account flows include OTP-based verification and password recovery. Firebase and Razorpay are the documented choices for authentication and payments.',
    results:
      'The project records 15+ REST API endpoints, audio tweet recording and playback, tiered subscriptions, and OTP security flows. A public demonstration and source repository are available.',
    limitation:
      'This is a production-style portfolio project. Deployment availability does not establish production scale, user adoption, or payment-system reliability; those outcomes have not been documented here.',
    evidence: 'Based on the project and internship records maintained in this portfolio.',
    screenshot: '/projects/twiller.png',
  },
  {
    id: '02',
    slug: 'attn',
    name: 'Attn',
    discipline: 'Automation',
    headline: 'A little more intention. A little less distraction.',
    summary: 'A browser-based focus coach with local vision processing, configurable automation rules, and session reports.',
    steps: [
      'Opt-in camera',
      'MediaPipe worker',
      'Coaching rules',
      'Local reports',
    ],
    output: 'Coach card · Optional notification · Session pause',
    overview:
      'Attn is a personal focus workspace rebuilt from a Python attention-monitoring prototype. It combines a session timer, optional on-device visual cues, four editable coaching rules, and a reporting dashboard. A camera-free demo lets visitors explore the workflow.',
    contribution:
      'I rebuilt the application around React, moved camera inference into a dedicated worker, implemented the coaching automation rule engine, and added browser-local reports with CSV and JSON exports.',
    problem:
      'Visual signals alone do not help someone manage a focus session. Attn turns sustained cues into small, configurable automation interventions while keeping camera frames and session history off an application server.',
    architecture:
      'An opt-in camera supplies one transferable ImageBitmap at a time to a MediaPipe worker. A session tick feeds the automation rule engine, which applies dwell times and cooldowns before emitting a coach card, an optional notification, or an automated session pause. Completed reports are stored in localStorage, with the latest 30 sessions retained.',
    challenges:
      'Camera startup, cancellation, worker errors, and stale signals require careful lifecycle handling. Pausing resets dwell continuity while retaining cooldown history. Device suspension pauses the session so stale metrics are not credited as fresh observations.',
    decisions:
      'The worker keeps inference away from the interface thread, and one in-flight frame bounds processing work. Sustained triggers and cooldowns avoid reacting to every momentary cue. Static hosting keeps deployment simple; the tradeoff is browser-local storage without accounts or cross-device synchronisation.',
    results:
      'The deployed application supports four configurable automation rules, local session reports, export downloads, and a camera-free demonstration. No camera pixels, landmarks, or reports are sent to an application backend.',
    limitation:
      'The attention signal is a visual heuristic, not a measurement of thoughts or productivity. Coaching requires an active session tab. An unfinished session is held in memory and is lost on refresh; completed reports depend on the browser’s local storage.',
    evidence: 'Based on the Attn architecture documentation and the project records in this portfolio.',
    screenshot: '/projects/attn.png',
  },
  {
    id: '03',
    slug: 'brahmi',
    name: 'Brahmi',
    discipline: 'Computer Vision',
    headline: 'Giving an ancient script a readable next chapter.',
    summary: 'From an inscription image to character recognition and transliteration into modern Indian scripts.',
    steps: [
      'Inscription image',
      'OpenCV segmentation',
      'CNN recognition',
      'Script mapping',
    ],
    output: 'Telugu · Tamil · Devanagari',
    overview:
      'Brahmi brings a computer-vision workflow into a web application: upload an inscription image, recognise its characters, and transliterate them into Telugu, Tamil, or Devanagari.',
    contribution:
      'My work spans the character-recognition model, OpenCV image preparation, phonetic mapping, and the React / Flask web application.',
    problem:
      'Ancient inscriptions are difficult to read directly. Weathered surfaces and noisy character boundaries make the step from an image to individual recognisable characters especially important.',
    architecture:
      'The documented pipeline uses OpenCV contour detection and adaptive thresholding to segment characters. A TensorFlow / Keras convolutional neural network recognises the segmented inputs. A phonetic mapping layer produces modern-script output, exposed through a Flask and React application.',
    challenges:
      'Segmentation and recognition have to work with noisy inscription images. The project description identifies weathered artifact noise as a challenge; a breakdown by image condition is not available in the portfolio records.',
    decisions:
      'The implementation separates image preparation, character recognition, and script mapping. OpenCV handles preparation, TensorFlow / Keras handles the CNN, and React with Flask provides the upload and inference interface.',
    results:
      'The repository description reports 94% character-recognition accuracy. The dataset size, evaluation split, and per-character results are not documented here, so that figure should be read as a reported result rather than an independently validated benchmark.',
    limitation:
      'Character recognition and phonetic transliteration are not the same as translating the meaning of an inscription. Broader validation on varied inscriptions remains unverified in the available material.',
    evidence: 'Based on the project descriptions and technology records maintained in this portfolio.',
    screenshot: null,
  },
]

export function getCaseStudyById(id) {
  return CASE_STUDIES.find((s) => s.id === id) || null
}

export function getCaseStudyBySlug(slug) {
  return CASE_STUDIES.find((s) => s.slug === slug) || null
}

export function getCaseStudyBySlugOrId(identifier) {
  if (!identifier) return null
  const clean = String(identifier).trim().toLowerCase()
  return (
    CASE_STUDIES.find((s) => s.slug.toLowerCase() === clean) ||
    CASE_STUDIES.find((s) => s.id.toLowerCase() === clean) ||
    null
  )
}

