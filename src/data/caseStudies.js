export const CASE_STUDIES = [
  {
    id: '01',
    slug: 'twiller',
    name: 'Twiller',
    discipline: 'Full Stack',
    headline: 'A social feed you can shape.',
    summary: 'Topic discovery, community circles, and configurable feed rules bring more control to an X-inspired social platform.',
    steps: [
      'Next.js + TypeScript',
      'Firebase sessions',
      'Express services',
      'MongoDB + media storage',
    ],
    output: 'Four feed modes · Six feed rules · Verified plan purchases',
    overview:
      'Twiller combines familiar social interactions with explicit control over discovery. Users publish text, images, and audio, reply in threads, follow people and topics, join community circles, and save bookmarks. Four feed modes and six configurable rules let them narrow or reprioritize what they see. Messaging, paid plans, and admin moderation complete the application.',
    contribution:
      'My full-stack work spans the Next.js interface, Express REST APIs, MongoDB data models, and Firebase and Razorpay integrations. The current implementation extends the social experience with topic and circle discovery, configurable feed behavior, and a conversation-insight prototype.',
    problem:
      'A single timeline gives users limited control over the conversations they encounter. Twiller adds separate views for followed people, topics, and communities, then lets users hide media or topics, boost or reduce topics, and prioritize a circle. Those choices must work alongside pagination, account permissions, media uploads, and paid posting quotas.',
    architecture:
      'A Next.js 15 and React 19 frontend calls an Express 5 API backed by MongoDB and Mongoose. Firebase ID tokens and backend login-session checks establish identity. Separate operation modules handle feeds, topics, circles, posts, and notifications. Media uploads pass through backend validation and filesystem storage. Razorpay orders are verified server-side before a database transaction activates a paid plan.',
    challenges:
      'Feed rules can change both eligibility and ordering, making pagination more complex than a timestamp alone. Weighted feeds use score-aware cursors and a fingerprint of the active mode and rules. Payment retries present a second consistency problem: order ownership, signatures, settlement, and prior fulfillment must be checked before changing plan access.',
    decisions:
      'Feed customization uses explicit filters and deterministic ranking weights. Rules can last an hour, until midnight UTC, seven days, or until removal. Paid access uses verified 30-day purchases with transactional fulfillment and replay checks. Messaging refreshes through polling. Conversation insights use bounded reply traversal, source references, caching, and generation limits, with a mock provider behind a replaceable interface.',
    results:
      'The inspected implementation connects four feed modes and six rule types to the interface and API, alongside topic follows, circle membership, audio posts, threaded replies, bookmarks, messaging, and admin moderation. Free, Bronze, Silver, and Gold plans apply server-side posting quotas. The repository includes tests for feed ranking, permissions, payments, media, and conversation insights; these are implementation evidence, not production performance measurements.',
    limitation:
      'Conversation insights currently use a deterministic mock provider, so they do not demonstrate live LLM analysis. Messaging uses polling, and paid plans are individual 30-day purchases rather than automatic recurring billing. This review inspected local source; live feature parity, user adoption, and load performance were not verified.',
    screenshot: '/projects/twiller-current.png',
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

