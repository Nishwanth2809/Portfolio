import { useState, useEffect } from 'react'

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 })
  const [isHidden, setIsHidden] = useState(true)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const updatePosition = (clientX, clientY) => {
      setPosition({ x: clientX, y: clientY })
      setIsHidden(false)
    }

    const handlePointerMove = (e) => {
      updatePosition(e.clientX, e.clientY)
    }

    const handleMouseMove = (e) => {
      updatePosition(e.clientX, e.clientY)
    }

    const handlePointerLeave = () => {
      setIsHidden(true)
    }

    const handlePointerEnter = () => {
      setIsHidden(false)
    }

    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('pointerleave', handlePointerLeave)
    document.addEventListener('pointerenter', handlePointerEnter)

    const handleMouseOver = (e) => {
      const target = e.target
      if (!target) return
      
      const isClickable = 
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.closest('[role="button"]') ||
        target.closest('.clickable') ||
        target.closest('.cs-back-btn') ||
        target.closest('.cs-nav-tab-pill') ||
        target.closest('.cs-theme-btn') ||
        target.closest('.cs-action-btn') ||
        target.closest('.cs-bottom-nav-card') ||
        target.closest('.cs-index-card') ||
        target.closest('.proj-card') ||
        target.closest('.nav-btn') ||
        target.style.cursor === 'pointer'

      setIsHovered(!!isClickable)
    }

    window.addEventListener('mouseover', handleMouseOver, { passive: true })

    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('pointerleave', handlePointerLeave)
      document.removeEventListener('pointerenter', handlePointerEnter)
      window.removeEventListener('mouseover', handleMouseOver)
    }

  }, [])

  if (isHidden) return null

  return (
    <div
      className={`custom-cursor ${isHovered ? 'hovered' : ''}`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    />
  )
}
