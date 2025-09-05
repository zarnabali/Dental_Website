"use client"

import { useEffect, useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface BeforeAfterItem {
  id: number
  beforeImage: string
  afterImage: string
  treatment: string
  improvement: string
  improvementColor: string
}

const beforeAfterData: BeforeAfterItem[] = [
  {
    id: 1,
    beforeImage: "/before-after/1-before.png",
    afterImage: "/before-after/1-after.png",
    treatment: "60-Min Whitening",
    improvement: "4+ Shade Jump",
    improvementColor: "text-orange-500",
  },
  {
    id: 2,
    beforeImage: "/before-after/2-before.png",
    afterImage: "/before-after/2-after.png",
    treatment: "60-Min Cleaning & Whitening",
    improvement: "8+ Shade Jump",
    improvementColor: "text-red-500",
  },
  {
    id: 3,
    beforeImage: "/before-after/3-before.png",
    afterImage: "/before-after/3-after.png",
    treatment: "60-Min Whitening",
    improvement: "4+ Shade Jump",
    improvementColor: "text-orange-500",
  },
  {
    id: 4,
    beforeImage: "/before-after/2-before.png",
    afterImage: "/before-after/2-after.png",
    treatment: "Complete Smile Makeover",
    improvement: "10+ Shade Jump",
    improvementColor: "text-green-500",
  },
]

export default function BeforeAfterSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const currentIndex = useRef(0)

  useEffect(() => {
    if (typeof window !== "undefined" && window.gsap && (window as any).ScrollTrigger) {
      const { gsap } = window
      const ScrollTrigger = (window as any).ScrollTrigger

      // Initial state - hide section
      gsap.set(sectionRef.current, { opacity: 0, y: 100 })

      // Animate in when scrolling to section
      gsap.to(sectionRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      })

      // Animate cards with stagger
      gsap.fromTo(
        ".before-after-card",
        { opacity: 0, y: 50, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      )
    }
  }, [])

  const scrollToNext = () => {
    if (cardsRef.current) {
      const isMobile = window.innerWidth < 768
      const cardWidth = isMobile ? 256 : 288 // w-64 (256px) + gap-4 (16px) = 272px for mobile, w-72 (288px) + gap-6 (24px) = 312px for desktop
      const maxVisible = isMobile ? 1 : 3
      const maxScroll = (beforeAfterData.length - maxVisible) * cardWidth

      if (currentIndex.current < beforeAfterData.length - maxVisible) {
        currentIndex.current++
        cardsRef.current.scrollTo({
          left: currentIndex.current * cardWidth,
          behavior: "smooth",
        })
      }
    }
  }

  const scrollToPrev = () => {
    if (cardsRef.current) {
      const isMobile = window.innerWidth < 768
      const cardWidth = isMobile ? 256 : 288

      if (currentIndex.current > 0) {
        currentIndex.current--
        cardsRef.current.scrollTo({
          left: currentIndex.current * cardWidth,
          behavior: "smooth",
        })
      }
    }
  }

  return (
    <section ref={sectionRef} className="py-12 md:py-20 px-2 md:px-4" style={{ backgroundColor: "#963f36" }}>
      <div className="max-w-7xl mx-auto">
        <div className="relative">
          {/* Main container with border that will intersect the title */}
          <div
            ref={containerRef}
            className="relative pt-16 md:pt-20 pb-6 md:pb-8 px-4 md:px-8 lg:px-12 rounded-2xl md:rounded-3xl"
            style={{
              backgroundColor: "#963f36",
              border: "2px solid rgba(255, 255, 255, 0.6)",
            }}
          >
            {/* Title positioned to intersect with the border */}
            <div className="absolute -top-6 md:-top-8 left-1/2 transform -translate-x-1/2 z-20">
              <h2
                className="text-2xl md:text-4xl lg:text-5xl font-light text-white text-balance px-6 md:px-12 py-3 md:py-4 rounded-full whitespace-nowrap"
                style={{ backgroundColor: "#963f36" }}
              >
                Real people. Real results.
              </h2>
            </div>

            {/* Navigation Buttons - positioned to intersect with border */}
            <button
              onClick={scrollToPrev}
              className="absolute -left-2 md:-left-5 top-1/2 -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 text-white rounded-full w-8 h-8 md:w-10 md:h-10 border-none flex items-center justify-center transition-all duration-200"
              style={{ backgroundColor: "#963f36" }}
            >
              <ChevronLeft className="w-5 h-5 md:w-8 md:h-8" strokeWidth={1.5} />
            </button>

            <button
              onClick={scrollToNext}
              className="absolute -right-2 md:-right-5 top-1/2 -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 text-white rounded-full w-8 h-8 md:w-10 md:h-10 border-none flex items-center justify-center transition-all duration-200"
              style={{ backgroundColor: "#963f36" }}
            >
              <ChevronRight className="w-5 h-5 md:w-8 md:h-8" strokeWidth={1.5} />
            </button>

            {/* Cards Container */}
            <div
              ref={cardsRef}
              className="flex gap-4 md:gap-6 overflow-x-auto scrollbar-hide px-4 md:px-8"
              style={{ 
                scrollbarWidth: "none", 
                msOverflowStyle: "none"
              }}
            >
              {beforeAfterData.map((item, index) => (
                <div key={item.id} className="before-after-card flex-shrink-0 w-64 md:w-72 bg-white rounded-2xl p-3 md:p-4 shadow-lg">
                  {/* Before Image */}
                  <div className="relative mb-2">
                    <img 
                      src={item.beforeImage}
                      alt={`Before treatment ${item.id}`}
                      className="w-full h-24 md:h-32 rounded-lg object-cover"
                    />
                    <span className="absolute top-1 left-1 md:top-2 md:left-2 bg-gray-600 text-white text-xs px-1.5 py-0.5 md:px-2 md:py-1 rounded">
                      BEFORE
                    </span>
                  </div>

                  {/* After Image */}
                  <div className="relative mb-3 md:mb-4">
                    <img 
                      src={item.afterImage}
                      alt={`After treatment ${item.id}`}
                      className="w-full h-24 md:h-32 rounded-lg object-cover"
                    />
                    <span className="absolute top-1 left-1 md:top-2 md:left-2 bg-gray-600 text-white text-xs px-1.5 py-0.5 md:px-2 md:py-1 rounded">
                      AFTER
                    </span>
                  </div>

                  {/* Treatment Info */}
                  <div className="text-center">
                    <h3 className="font-medium text-gray-800 mb-1 text-sm md:text-base">{item.treatment}</h3>
                    <p className={`text-xs md:text-sm font-regular ${item.improvementColor}`}>{item.improvement}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
