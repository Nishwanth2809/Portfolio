import { useLayoutEffect, useRef, useCallback } from 'react'
import './ScrollStack.css'

export const ScrollStackItem = ({ children, itemClassName = '' }) => (
  <div className={`scroll-stack-card ${itemClassName}`.trim()}>{children}</div>
)

const ScrollStack = ({
  children,
  className = '',
  itemDistance = 28,
  itemScale = 0.025,
  itemStackDistance = 14,
  stackPosition = '15%',
  scaleEndPosition = '8%',
  baseScale = 0.92,
  rotationAmount = 0,
  blurAmount = 0,
  useWindowScroll = false,
  onStackComplete,
}) => {
  const scrollerRef = useRef(null)
  const stackCompletedRef = useRef(false)
  const cardsRef = useRef([])
  const cardOffsetsRef = useRef([])
  const lastTransformsRef = useRef(new Map())
  const rafIdRef = useRef(null)

  const getScrollContainer = useCallback(() => {
    if (useWindowScroll) return document.documentElement
    if (scrollerRef.current) {
      return scrollerRef.current.closest('.page') || scrollerRef.current
    }
    return null
  }, [useWindowScroll])

  const calculateProgress = useCallback((scrollTop, start, end) => {
    if (scrollTop < start) return 0
    if (scrollTop > end) return 1
    return (scrollTop - start) / (end - start)
  }, [])

  const parsePercentage = useCallback((value, containerHeight) => {
    if (typeof value === 'string' && value.includes('%')) {
      return (parseFloat(value) / 100) * containerHeight
    }
    return parseFloat(value)
  }, [])

  const measureCardOffsets = useCallback(() => {
    const container = getScrollContainer()
    if (!container) return

    const isWindow = useWindowScroll || container === document.documentElement
    const containerTop = isWindow ? 0 : container.getBoundingClientRect().top
    const scrollTop = isWindow ? window.scrollY : container.scrollTop

    cardOffsetsRef.current = cardsRef.current.map((card) => {
      if (!card) return 0
      if (isWindow) {
        return card.getBoundingClientRect().top + window.scrollY
      } else {
        return card.getBoundingClientRect().top - containerTop + scrollTop
      }
    })
  }, [getScrollContainer, useWindowScroll])

  const updateCardTransforms = useCallback(() => {
    const container = getScrollContainer()
    if (!cardsRef.current.length || !container) return

    // Mobile fallback: render as a clean vertical list without overlapping clipping
    if (window.innerWidth <= 680) {
      cardsRef.current.forEach((card) => {
        if (!card) return
        card.style.transform = 'none'
        card.style.filter = 'none'
      })
      return
    }

    const isWindow = useWindowScroll || container === document.documentElement
    const scrollTop = isWindow ? window.scrollY : container.scrollTop
    const containerHeight = isWindow ? window.innerHeight : container.clientHeight

    const stackPositionPx = parsePercentage(stackPosition, containerHeight)
    const scaleEndPositionPx = parsePercentage(scaleEndPosition, containerHeight)

    const endElement = scrollerRef.current?.querySelector('.scroll-stack-end')
    let endElementTop = 0
    if (endElement) {
      const containerTop = isWindow ? 0 : container.getBoundingClientRect().top
      endElementTop = isWindow
        ? endElement.getBoundingClientRect().top + window.scrollY
        : endElement.getBoundingClientRect().top - containerTop + scrollTop
    }

    const cards = cardsRef.current
    const numCards = cards.length

    for (let i = 0; i < numCards; i++) {
      const card = cards[i]
      if (!card) continue

      const cardTop = cardOffsetsRef.current[i] || 0
      const triggerStart = cardTop - stackPositionPx - itemStackDistance * i
      const triggerEnd = cardTop - scaleEndPositionPx
      const pinStart = cardTop - stackPositionPx - itemStackDistance * i
      const pinEnd = endElementTop - containerHeight / 2

      const scaleProgress = calculateProgress(scrollTop, triggerStart, triggerEnd)
      const targetScale = baseScale + i * itemScale
      const scale = 1 - scaleProgress * (1 - targetScale)
      const rotation = rotationAmount ? i * rotationAmount * scaleProgress : 0

      let blur = 0
      if (blurAmount) {
        let topCardIndex = 0
        for (let j = 0; j < numCards; j++) {
          const jCardTop = cardOffsetsRef.current[j] || 0
          const jTriggerStart = jCardTop - stackPositionPx - itemStackDistance * j
          if (scrollTop >= jTriggerStart) {
            topCardIndex = j
          }
        }

        if (i < topCardIndex) {
          const depthInStack = topCardIndex - i
          blur = Math.max(0, depthInStack * blurAmount)
        }
      }

      let translateY = 0
      const isPinned = scrollTop >= pinStart && scrollTop <= pinEnd

      if (isPinned) {
        translateY = scrollTop - cardTop + stackPositionPx + itemStackDistance * i
      } else if (scrollTop > pinEnd) {
        translateY = pinEnd - cardTop + stackPositionPx + itemStackDistance * i
      }

      const newTransform = {
        translateY: Math.round(translateY * 10) / 10,
        scale: Math.round(scale * 1000) / 1000,
        rotation: Math.round(rotation * 10) / 10,
        blur: Math.round(blur * 10) / 10,
      }

      const lastTransform = lastTransformsRef.current.get(i)
      const hasChanged =
        !lastTransform ||
        Math.abs(lastTransform.translateY - newTransform.translateY) > 0.1 ||
        Math.abs(lastTransform.scale - newTransform.scale) > 0.001 ||
        Math.abs(lastTransform.rotation - newTransform.rotation) > 0.1 ||
        Math.abs(lastTransform.blur - newTransform.blur) > 0.1

      if (hasChanged) {
        const transform = `translate3d(0, ${newTransform.translateY}px, 0) scale(${newTransform.scale})${newTransform.rotation ? ` rotate(${newTransform.rotation}deg)` : ''}`
        const filter = newTransform.blur > 0 ? `blur(${newTransform.blur}px)` : ''

        card.style.transform = transform
        card.style.filter = filter

        lastTransformsRef.current.set(i, newTransform)
      }

      if (i === numCards - 1) {
        const isInView = scrollTop >= pinStart && scrollTop <= pinEnd
        if (isInView && !stackCompletedRef.current) {
          stackCompletedRef.current = true
          onStackComplete?.()
        } else if (!isInView && stackCompletedRef.current) {
          stackCompletedRef.current = false
        }
      }
    }
  }, [
    itemScale,
    itemStackDistance,
    stackPosition,
    scaleEndPosition,
    baseScale,
    rotationAmount,
    blurAmount,
    useWindowScroll,
    onStackComplete,
    calculateProgress,
    parsePercentage,
    getScrollContainer,
  ])

  useLayoutEffect(() => {
    const container = getScrollContainer()
    const scroller = scrollerRef.current
    if (!scroller || !container) return

    const cards = Array.from(scroller.querySelectorAll('.scroll-stack-card'))
    cardsRef.current = cards
    const transformsCache = lastTransformsRef.current

    cards.forEach((card, i) => {
      if (i < cards.length - 1) {
        card.style.marginBottom = `${itemDistance}px`
      }
      card.style.willChange = 'transform'
      card.style.transformOrigin = 'top center'
      card.style.backfaceVisibility = 'hidden'
      card.style.transform = 'translateZ(0)'
    })

    measureCardOffsets()

    const handleScroll = () => {
      if (rafIdRef.current) return
      rafIdRef.current = requestAnimationFrame(() => {
        updateCardTransforms()
        rafIdRef.current = null
      })
    }

    const handleResize = () => {
      measureCardOffsets()
      handleScroll()
    }

    container.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleResize, { passive: true })
    updateCardTransforms()

    return () => {
      container.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current)
        rafIdRef.current = null
      }
      stackCompletedRef.current = false
      cardsRef.current = []
      transformsCache.clear()
    }
  }, [
    children,
    itemDistance,
    useWindowScroll,
    getScrollContainer,
    measureCardOffsets,
    updateCardTransforms,
  ])

  return (
    <div className={`scroll-stack-scroller ${className}`.trim()} ref={scrollerRef}>
      <div className="scroll-stack-inner">
        {children}
        <div className="scroll-stack-end" />
      </div>
    </div>
  )
}

export default ScrollStack
