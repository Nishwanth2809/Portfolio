export default function Contact({ className }) {
  return (
    <div className={className} id="pg-contact" role="main" aria-label="Contact">
      <div className="page-heading animate-slide-up" style={{ animationDelay: '0.05s' }}>
        <p className="page-heading-tag">Get in touch</p>
        <h2 className="page-heading-title">Let's<br /><span className="dim">Connect.</span></h2>
        <p className="page-heading-sub">Open to SDE and ML roles · Available now</p>
      </div>
      <div className="contact-list">
        <a className="c-row animate-slide-up" style={{ animationDelay: '0.1s' }} href="mailto:nishwanthyarra@gmail.com">
          <div className="c-icon">
            <svg viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
          </div>
          <div><p className="c-label">Email</p><p className="c-val">nishwanthyarra@gmail.com</p></div>
          <span className="c-arrow">›</span>
        </a>
        <a className="c-row animate-slide-up" style={{ animationDelay: '0.17s' }} href="https://github.com/nishwanth2809" target="_blank" rel="noopener noreferrer">
          <div className="c-icon">
            <svg viewBox="0 0 24 24"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" /></svg>
          </div>
          <div><p className="c-label">GitHub</p><p className="c-val">github.com/nishwanth2809</p></div>
          <span className="c-arrow">›</span>
        </a>
        <a className="c-row animate-slide-up" style={{ animationDelay: '0.24s' }} href="https://www.linkedin.com/in/yarranishwanth" target="_blank" rel="noopener noreferrer">
          <div className="c-icon">
            <svg viewBox="0 0 24 24"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>
          </div>
          <div><p className="c-label">LinkedIn</p><p className="c-val">linkedin.com/in/yarranishwanth</p></div>
          <span className="c-arrow">›</span>
        </a>
        <a className="c-row animate-slide-up" style={{ animationDelay: '0.31s' }} href="https://leetcode.com/u/nishwanth_/" target="_blank" rel="noopener noreferrer">
          <div className="c-icon">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true"><path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H19.48a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" /></svg>
          </div>
          <div><p className="c-label">LeetCode</p><p className="c-val">leetcode.com/u/nishwanth_</p></div>
          <span className="c-arrow">›</span>
        </a>
        <div className="c-row animate-slide-up" style={{ animationDelay: '0.38s', cursor: 'default' }}>
          <div className="c-icon">
            <svg viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
          </div>
          <div><p className="c-label">Location</p><p className="c-val">Hyderabad, Telangana, India</p></div>
        </div>
      </div>
    </div>
  )
}
