import { useState, useEffect } from 'react'

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 })
  const [isHidden, setIsHidden] = useState(true)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const handlePointerMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY })
      setIsHidden(false)
    }

    const handlePointerLeave = () => {
      setIsHidden(true)
    }

    const handlePointerEnter = () => {
      setIsHidden(false)
    }

    window.addEventListener('pointermove', handlePointerMove)
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
        target.classList.contains('clickable') ||
        target.style.cursor === 'pointer'

      setIsHovered(!!isClickable)
    }

    window.addEventListener('mouseover', handleMouseOver)

    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
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
