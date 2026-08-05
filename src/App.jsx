import { useState, useEffect, useRef, useCallback } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Profile from './components/Profile'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Contact from './components/Contact'
import CustomCursor from './components/CustomCursor'
import './App.css'

const TABS = ['home', 'profile', 'projects', 'skills', 'contact']
const SCROLL_DURATION_MS = 760
const WHEEL_IDLE_MS = 130
const WHEEL_COMMIT_THRESHOLD = 170
const DRAG_COMMIT_RATIO = 0.16
const DRAG_COMMIT_VELOCITY = 0.35

const clampPage = (index) => Math.max(0, Math.min(index, TABS.length - 1))
const clamp = (value, min, max) => Math.max(min, Math.min(value, max))

function App() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [wheelOffset, setWheelOffset] = useState(0)
  const [isWheeling, setIsWheeling] = useState(false)
  const [theme, setTheme] = useState('light')
  const viewportRef = useRef(null)
  const activeIndexRef = useRef(0)
  const wheelLockRef = useRef(false)
  const wheelIntentRef = useRef(0)
  const wheelIdleTimeoutRef = useRef(null)
  const dragRef = useRef({
    pointerId: null,
    startX: 0,
    startY: 0,
    currentX: 0,
    currentY: 0,
    startedAt: 0,
    dragging: false,
    lockedAxis: null,
  })
  const activeTab = TABS[activeIndex]

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark')

  useEffect(() => {
    const themeColor = theme === 'dark' ? '#000000' : '#f5f4f0'
    document.documentElement.setAttribute('data-theme', theme)
    document.body.setAttribute('data-theme', theme)

    let meta = document.querySelector('meta[name="theme-color"]')

    if (!meta) {
      meta = document.createElement('meta')
      meta.setAttribute('name', 'theme-color')
      document.head.appendChild(meta)
    }

    meta.setAttribute('content', themeColor)
    document.documentElement.style.backgroundColor = themeColor
    document.body.style.backgroundColor = themeColor
  }, [theme])

  const goToPage = useCallback((index) => {
    const nextIndex = clampPage(index)
    wheelIntentRef.current = 0
    setWheelOffset(0)
    setIsWheeling(false)
    activeIndexRef.current = nextIndex
    setActiveIndex(nextIndex)
  }, [])

  const handleNavigate = (to) => {
    const index = TABS.indexOf(to)
    if (index >= 0) {
      goToPage(index)
    }
  }

  useEffect(() => {
    const viewport = viewportRef.current
    if (!viewport) return

    const handleWheel = (e) => {
      const page = e.target.closest('.page')
      const isHorizontalGesture = Math.abs(e.deltaX) > Math.abs(e.deltaY)

      if (page && !isHorizontalGesture) {
        const maxScrollTop = page.scrollHeight - page.clientHeight
        const canScrollDown = e.deltaY > 0 && page.scrollTop < maxScrollTop - 1
        const canScrollUp = e.deltaY < 0 && page.scrollTop > 1

        if (canScrollDown || canScrollUp) {
          return
        }
      }

      e.preventDefault()

      const dominantDelta = isHorizontalGesture ? e.deltaX : e.deltaY
      if (Math.abs(dominantDelta) < 4 || wheelLockRef.current) return

      const currentIndex = activeIndexRef.current
      const direction = dominantDelta > 0 ? 1 : -1
      const isAtStart = currentIndex === 0 && direction < 0
      const isAtEnd = currentIndex === TABS.length - 1 && direction > 0
      const viewportWidth = viewport.clientWidth || window.innerWidth
      const maxPull = Math.min(viewportWidth * 0.32, 260)

      wheelIntentRef.current += dominantDelta * (isAtStart || isAtEnd ? 0.22 : 1)
      wheelIntentRef.current = clamp(wheelIntentRef.current, -maxPull, maxPull)

      setIsWheeling(true)
      setWheelOffset(-wheelIntentRef.current)

      if (wheelIdleTimeoutRef.current) {
        window.clearTimeout(wheelIdleTimeoutRef.current)
      }

      if (Math.abs(wheelIntentRef.current) >= WHEEL_COMMIT_THRESHOLD && !isAtStart && !isAtEnd) {
        goToPage(currentIndex + direction)
        wheelLockRef.current = true
        window.setTimeout(() => {
          wheelLockRef.current = false
        }, SCROLL_DURATION_MS)
        return
      }

      wheelIdleTimeoutRef.current = window.setTimeout(() => {
        wheelIntentRef.current = 0
        setWheelOffset(0)
        setIsWheeling(false)
      }, WHEEL_IDLE_MS)
    }

    const handleTrackTransitionEnd = () => {
      setIsWheeling(false)
    }

    const handlePointerDown = (e) => {
      if (
        wheelLockRef.current ||
        e.pointerType === 'mouse' ||
        e.target.closest('.glass-nav') ||
        e.target.closest('.proj-modal-overlay')
      ) {
        return
      }

      dragRef.current = {
        pointerId: e.pointerId,
        startX: e.clientX,
        startY: e.clientY,
        currentX: e.clientX,
        currentY: e.clientY,
        startedAt: performance.now(),
        dragging: false,
        lockedAxis: null,
      }
    }

    const handlePointerMove = (e) => {
      const state = dragRef.current
      if (state.pointerId !== e.pointerId || wheelLockRef.current) return

      const dx = e.clientX - state.startX
      const dy = e.clientY - state.startY
      const absX = Math.abs(dx)
      const absY = Math.abs(dy)

      if (!state.lockedAxis) {
        if (absX < 8 && absY < 8) return

        if (absX > absY * 1.2) {
          state.lockedAxis = 'x'
          state.dragging = true
          try {
            viewport.setPointerCapture(e.pointerId)
          } catch {
            // Some mobile browsers do not allow capture for every pointer target.
          }
        } else {
          state.lockedAxis = 'y'
          state.dragging = false
          return
        }
      }

      if (state.lockedAxis === 'y') {
        return
      }

      state.dragging = true
      state.currentX = e.clientX
      state.currentY = e.clientY

      e.preventDefault()

      const dragDistance = dx
      const currentIndex = activeIndexRef.current
      const isAtStart = currentIndex === 0 && dragDistance > 0
      const isAtEnd = currentIndex === TABS.length - 1 && dragDistance < 0
      const viewportWidth = viewport.clientWidth || window.innerWidth
      const maxPull = Math.min(viewportWidth * 0.42, 320)
      const dampedDistance = dragDistance * (isAtStart || isAtEnd ? 0.28 : 1)

      setIsWheeling(true)
      setWheelOffset(clamp(dampedDistance, -maxPull, maxPull))
    }

    const handlePointerUp = (e) => {
      const state = dragRef.current
      if (state.pointerId !== e.pointerId) return

      try {
        viewport.releasePointerCapture(e.pointerId)
      } catch {
        // Already released or unsupported.
      }

      state.pointerId = null
      if (!state.dragging || state.lockedAxis !== 'x') {
        state.dragging = false
        state.lockedAxis = null
        return
      }

      const dx = state.currentX - state.startX
      const dragDistance = dx
      const elapsed = Math.max(performance.now() - state.startedAt, 1)
      const velocity = Math.abs(dragDistance) / elapsed
      const currentIndex = activeIndexRef.current
      const viewportWidth = viewport.clientWidth || window.innerWidth
      const threshold = Math.max(64, viewportWidth * DRAG_COMMIT_RATIO)
      const shouldCommit = Math.abs(dragDistance) > threshold || velocity > DRAG_COMMIT_VELOCITY
      const direction = dragDistance < 0 ? 1 : -1
      const nextIndex = clampPage(currentIndex + direction)

      if (shouldCommit && nextIndex !== currentIndex) {
        goToPage(nextIndex)
        wheelLockRef.current = true
        window.setTimeout(() => {
          wheelLockRef.current = false
        }, SCROLL_DURATION_MS)
      } else {
        setWheelOffset(0)
        setIsWheeling(false)
      }

      state.dragging = false
      state.lockedAxis = null
    }

    const handleKeyDown = (e) => {
      if (['ArrowRight', 'PageDown'].includes(e.key)) {
        e.preventDefault()
        goToPage(activeIndexRef.current + 1)
      }

      if (['ArrowLeft', 'PageUp'].includes(e.key)) {
        e.preventDefault()
        goToPage(activeIndexRef.current - 1)
      }
    }

    viewport.addEventListener('wheel', handleWheel, { passive: false })
    viewport.addEventListener('pointerdown', handlePointerDown)
    viewport.addEventListener('pointermove', handlePointerMove)
    viewport.addEventListener('pointerup', handlePointerUp)
    viewport.addEventListener('pointercancel', handlePointerUp)
    viewport.addEventListener('transitionend', handleTrackTransitionEnd)
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      viewport.removeEventListener('wheel', handleWheel)
      viewport.removeEventListener('pointerdown', handlePointerDown)
      viewport.removeEventListener('pointermove', handlePointerMove)
      viewport.removeEventListener('pointerup', handlePointerUp)
      viewport.removeEventListener('pointercancel', handlePointerUp)
      viewport.removeEventListener('transitionend', handleTrackTransitionEnd)
      window.removeEventListener('keydown', handleKeyDown)
      if (wheelIdleTimeoutRef.current) {
        window.clearTimeout(wheelIdleTimeoutRef.current)
      }
    }
  }, [goToPage])

  return (
    <div className="viewport" data-theme={theme} ref={viewportRef}>
      <CustomCursor />
      <div
        className={`page-track ${isWheeling ? 'page-track--wheel' : ''}`}
        style={{
          '--active-offset': `${activeIndex * -100}vw`,
          '--wheel-offset': `${wheelOffset}px`,
        }}
      >
        <Hero className={`page ${activeTab === 'home' ? 'page-active' : ''}`} />
        <Profile className={`page ${activeTab === 'profile' ? 'page-active' : ''}`} />
        <Projects className={`page ${activeTab === 'projects' ? 'page-active' : ''}`} />
        <Skills className={`page ${activeTab === 'skills' ? 'page-active' : ''}`} />
        <Contact className={`page ${activeTab === 'contact' ? 'page-active' : ''}`} />
      </div>
      <Navbar activeTab={activeTab} onNavigate={handleNavigate} theme={theme} onToggleTheme={toggleTheme} />
    </div>
  )
}

export default App
