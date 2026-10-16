import { useCallback, useEffect, useRef, useState } from 'react'

export default function Navbar({ activeTab, onNavigate, theme, onToggleTheme }) {
  const navRef = useRef(null)
  const indicatorRef = useRef(null)
  const buttonRefs = useRef({})

  const [isDragging, setIsDragging] = useState(false)
  const [isSnapping, setIsSnapping] = useState(false)
  const [dragIndicatorLeft, setDragIndicatorLeft] = useState(null)
  const [hoveredTab, setHoveredTab] = useState(null)

  const dragStartRef = useRef({ x: 0, y: 0 })
  const pointerDownRef = useRef(false)

  const updateIndicator = useCallback((immediate = false) => {
    if (isDragging) return // handled via inline styles in dragging state

    const targetTab = hoveredTab || activeTab
    const activeBtn = buttonRefs.current[targetTab]
    const navEl = navRef.current
    const indicatorEl = indicatorRef.current
    if (activeBtn && navEl && indicatorEl) {
      const navRect = navEl.getBoundingClientRect()
      const btnRect = activeBtn.getBoundingClientRect()

      if (immediate) {
        indicatorEl.classList.add('no-transition')
      }

      indicatorEl.style.left = `${btnRect.left - navRect.left}px`
      indicatorEl.style.width = `${btnRect.width}px`

      if (immediate) {
        // Force reflow
        indicatorEl.offsetHeight
        indicatorEl.classList.remove('no-transition')
      }
    }
  }, [activeTab, hoveredTab, isDragging])

  useEffect(() => {
    updateIndicator(false)
    const handleLoad = () => updateIndicator(true)
    const handleResize = () => updateIndicator(false)

    window.addEventListener('load', handleLoad)
    window.addEventListener('resize', handleResize)

    const frame = requestAnimationFrame(() => updateIndicator(false))

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('load', handleLoad)
      window.removeEventListener('resize', handleResize)
    }
  }, [updateIndicator])

  const handlePointerDown = (e) => {
    if (e.button !== 0) return // only left click
    pointerDownRef.current = true
    dragStartRef.current = { x: e.clientX, y: e.clientY }
    setIsSnapping(false)
  }

  const handlePointerMove = (e) => {
    if (!pointerDownRef.current) return

    const dx = e.clientX - dragStartRef.current.x
    const dy = e.clientY - dragStartRef.current.y
    const distance = Math.sqrt(dx * dx + dy * dy)

    if (!isDragging && distance > 5) {
      setIsDragging(true)
      document.body.classList.add('is-dragging')
      if (navRef.current) {
        navRef.current.setPointerCapture(e.pointerId)
      }
    }

    if (isDragging && navRef.current) {
      const rect = navRef.current.getBoundingClientRect()

      // Detect closest button horizontally
      let detectedTab = null
      let minDistance = Infinity
      let closestTab = null

      const tabs = ['home', 'profile', 'projects', 'skills', 'contact']
      tabs.forEach((tab) => {
        const btn = buttonRefs.current[tab]
        if (btn) {
          const rectBtn = btn.getBoundingClientRect()
          const btnCenterX = rectBtn.left + rectBtn.width / 2
          const dist = Math.abs(e.clientX - btnCenterX)
          if (dist < minDistance) {
            minDistance = dist
            closestTab = tab
          }
          if (e.clientX >= rectBtn.left && e.clientX <= rectBtn.right) {
            detectedTab = tab
          }
        }
      })

      const targetTab = detectedTab || closestTab
      if (targetTab && targetTab !== hoveredTab) {
        setHoveredTab(targetTab)
      }

      // Calculate dragged left coordinate relative to navbar element
      const currentTargetTab = targetTab || activeTab
      const targetWidth = buttonRefs.current[currentTargetTab]?.getBoundingClientRect().width || 48
      
      let targetLeft = e.clientX - rect.left - targetWidth / 2
      
      const isMobile = window.innerWidth <= 400
      const paddingLeft = isMobile ? 10 : 14
      const paddingRight = isMobile ? 10 : 14

      const minLeft = paddingLeft
      const maxLeft = rect.width - paddingRight - targetWidth

      targetLeft = Math.max(minLeft, Math.min(targetLeft, maxLeft))
      setDragIndicatorLeft(targetLeft)
    }
  }

  const handlePointerUp = (e) => {
    if (!pointerDownRef.current) return
    pointerDownRef.current = false

    if (isDragging) {
      setIsDragging(false)
      document.body.classList.remove('is-dragging')
      if (navRef.current) {
        try {
          navRef.current.releasePointerCapture(e.pointerId)
        } catch {
          // ignore
        }
      }

      if (hoveredTab) {
        onNavigate(hoveredTab)
      }

      setDragIndicatorLeft(null)
      setIsSnapping(true)

      setTimeout(() => {
        setIsSnapping(false)
        setHoveredTab(null)
      }, 700)
    }
  }

  return (
    <nav
      className={`glass-nav ${isDragging ? 'dragging' : ''} ${isSnapping ? 'snapping' : ''}`}
      id="gnav"
      ref={navRef}
      aria-label="Site navigation"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      <div 
        className="nav-indicator" 
        id="indicator" 
        ref={indicatorRef}
        style={
          isDragging && dragIndicatorLeft !== null
            ? { 
                left: `${dragIndicatorLeft}px`, 
                width: '48px'
              }
            : {}
        }
      ></div>

      <button
        className={`nav-btn ${activeTab === 'home' ? 'active' : ''} ${hoveredTab === 'home' ? 'drag-hovered' : ''}`}
        ref={el => buttonRefs.current['home'] = el}
        onClick={() => onNavigate('home')}
        aria-label="Home"
      >
        <svg viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
        <div className="nav-tooltip">Home</div>
      </button>

      <button
        className={`nav-btn ${activeTab === 'profile' ? 'active' : ''} ${hoveredTab === 'profile' ? 'drag-hovered' : ''}`}
        ref={el => buttonRefs.current['profile'] = el}
        onClick={() => onNavigate('profile')}
        aria-label="About and experience"
      >
        <svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>
        <div className="nav-tooltip">Profile</div>
      </button>
      
      <button
        className={`nav-btn ${activeTab === 'projects' ? 'active' : ''} ${hoveredTab === 'projects' ? 'drag-hovered' : ''}`}
        ref={el => buttonRefs.current['projects'] = el}
        onClick={() => onNavigate('projects')}
        aria-label="Projects"
      >
        <svg viewBox="0 0 24 24"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
        <div className="nav-tooltip">Projects</div>
      </button>
      
      <button
        className={`nav-btn ${activeTab === 'skills' ? 'active' : ''} ${hoveredTab === 'skills' ? 'drag-hovered' : ''}`}
        ref={el => buttonRefs.current['skills'] = el}
        onClick={() => onNavigate('skills')}
        aria-label="Skills"
      >
        <svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
        <div className="nav-tooltip">Skills</div>
      </button>
      
      <button
        className={`nav-btn ${activeTab === 'contact' ? 'active' : ''} ${hoveredTab === 'contact' ? 'drag-hovered' : ''}`}
        ref={el => buttonRefs.current['contact'] = el}
        onClick={() => onNavigate('contact')}
        aria-label="Contact"
      >
        <svg viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
        <div className="nav-tooltip">Contact</div>
      </button>

      {/* Divider */}
      <div className="nav-divider" aria-hidden="true"></div>

      {/* Theme Toggle */}
      <button
        className="nav-btn nav-theme-btn"
        onClick={onToggleTheme}
        aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        {theme === 'dark' ? (
          /* Sun icon */
          <svg viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="5"/>
            <line x1="12" y1="1" x2="12" y2="3"/>
            <line x1="12" y1="21" x2="12" y2="23"/>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
            <line x1="1" y1="12" x2="3" y2="12"/>
            <line x1="21" y1="12" x2="23" y2="12"/>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
          </svg>
        ) : (
          /* Moon icon */
          <svg viewBox="0 0 24 24">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
          </svg>
        )}
        <div className="nav-tooltip">{theme === 'dark' ? 'Light' : 'Dark'}</div>
      </button>
    </nav>
  )
}
