import { useScrollReveal } from '../hooks/useScrollReveal'

export default function About() {
  const ref = useScrollReveal()

  return (
    <section id="about" className="section">
      <div ref={ref} className="scroll-reveal">
        <div className="chronicles-header">
          <p className="chronicles-kicker">Who I Am</p>
          <h2 className="section-title">About <span className="accent">Me</span></h2>
          <hr className="section-divider" />
          <span className="chronicles-backdrop" aria-hidden="true">WHO</span>
        </div>

        <div className="about-layout">
          {/* Left: Photo + Social */}
          <div className="about-photo-col">
            <div className="about-photo-wrap">
              <img
                src="/profile.png"
                alt="Nishwanth"
                className="about-photo"
              />
              <div className="about-photo-ring" aria-hidden="true" />
            </div>

            <div className="about-socials">
              <a
                href="https://www.linkedin.com/in/yarranishwanth"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label="LinkedIn"
                title="LinkedIn"
              >
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                <span>LinkedIn</span>
              </a>
              <a
                href="https://github.com/nishwanth2809"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label="GitHub"
                title="GitHub"
              >
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.34-3.369-1.34-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.532 1.03 1.532 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                </svg>
                <span>GitHub</span>
              </a>
              <a
                href="https://leetcode.com/u/nishwanth_/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label="LeetCode"
                title="LeetCode"
              >
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
                  <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H19.48a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
                </svg>
                <span>LeetCode</span>
              </a>
            </div>
          </div>

          {/* Right: Bio + Stats */}
          <div className="about-text-col">
            <p className="about-bio">
              I'm a final-year Computer Science student specializing in Artificial Intelligence and Machine Learning.
              Passionate about building intelligent systems that solve real-world problems using computer vision, NLP,
              and deep learning.
            </p>
            <p className="about-bio">
              My work spans the full AI product lifecycle — from training and evaluating models to deploying
              them as web applications. I combine ML engineering with full-stack development to ship
              products that are practical, impactful, and production-ready.
            </p>

            <div className="about-stats">
              <div className="about-stat-card">
                <span className="stat-number">10+</span>
                <span className="stat-label">Projects</span>
              </div>
              <div className="about-stat-card">
                <span className="stat-number">5+</span>
                <span className="stat-label">Certifications</span>
              </div>
              <div className="about-stat-card open-to-work">
                <span className="stat-dot" aria-hidden="true" />
                <span className="stat-number">Open</span>
                <span className="stat-label">to Work</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
