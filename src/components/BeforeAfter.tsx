"use client"

import { useEffect, useRef, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { api } from "@/lib/api"

interface BeforeAfterItem {
  id: string
  beforeImage: string
  afterImage: string
  treatment: string
  improvement: string
  improvementColor: string
}

// Helper function to get improvement color based on description
const getImprovementColor = (description: string): string => {
  const desc = description.toLowerCase();
  if (desc.includes('10') || desc.includes('complete') || desc.includes('major')) {
    return "text-green-500";
  } else if (desc.includes('8') || desc.includes('significant')) {
    return "text-red-500";
  } else if (desc.includes('4') || desc.includes('moderate')) {
    return "text-orange-500";
  }
  // Default color
  return "text-blue-500";
}

export default function BeforeAfterSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [beforeAfterData, setBeforeAfterData] = useState<BeforeAfterItem[]>([])
  const [loading, setLoading] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  
  // Check if mobile on mount and window resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Fetch results from backend
  useEffect(() => {
    const fetchResults = async () => {
      try {
        setLoading(true)
        console.log('Fetching before/after results from API...')
        const response = await api.getResults()
        console.log('Results response:', response)
        
        if (response.success && response.data && Array.isArray(response.data)) {
          // Map results to component structure (backend already filters by isActive=true)
          const resultsData: BeforeAfterItem[] = response.data.map((item: {
              _id: string;
              title: string;
              description: string;
              beforeImage: { url: string; public_id?: string };
              afterImage: { url: string; public_id?: string };
            }) => {
              // Extract image URLs - handle both object and string formats
              const beforeImageUrl = typeof item.beforeImage === 'string' 
                ? item.beforeImage 
                : item.beforeImage?.url || '';
              
              const afterImageUrl = typeof item.afterImage === 'string'
                ? item.afterImage
                : item.afterImage?.url || '';
              
              return {
                id: item._id,
                beforeImage: beforeImageUrl,
                afterImage: afterImageUrl,
                treatment: item.title || "Treatment",
                improvement: item.description || "Improvement",
                improvementColor: getImprovementColor(item.description || "")
              };
            });
          
          console.log('Setting results data:', resultsData)
          setBeforeAfterData(resultsData)
          // Reset scroll index when new data is loaded
          setCurrentIndex(0)
        } else {
          console.log('No results data, using empty array')
          setBeforeAfterData([])
          setCurrentIndex(0)
        }
      } catch (error) {
        console.error('Error fetching results:', error)
        console.log('Using empty array as fallback')
        setBeforeAfterData([])
        setCurrentIndex(0)
      } finally {
        setLoading(false)
      }
    }

    fetchResults()
  }, [])

  // GSAP animations - only run when data is loaded
  useEffect(() => {
    if (
      beforeAfterData.length > 0 &&
      typeof window !== "undefined" &&
      (window as unknown as { gsap?: typeof gsap; ScrollTrigger?: typeof ScrollTrigger }).gsap &&
      (window as unknown as { ScrollTrigger?: typeof ScrollTrigger }).ScrollTrigger
    ) {
      const gsapInstance = (window as unknown as { gsap: typeof gsap }).gsap

      // Initial state - hide section
      gsapInstance.set(sectionRef.current, { opacity: 0, y: 100 })

      // Animate in when scrolling to section
      gsapInstance.to(sectionRef.current, {
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
      gsapInstance.fromTo(
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
  }, [beforeAfterData])

  const scrollToNext = () => {
    if (cardsRef.current && beforeAfterData.length > 0) {
      const cardWidth = isMobile ? 256 : 288 // w-64 (256px) + gap-4 (16px) = 272px for mobile, w-72 (288px) + gap-6 (24px) = 312px for desktop
      const maxVisible = isMobile ? 1 : 3

      if (currentIndex < beforeAfterData.length - maxVisible) {
        const newIndex = currentIndex + 1
        setCurrentIndex(newIndex)
        cardsRef.current.scrollTo({
          left: newIndex * cardWidth,
          behavior: "smooth",
        })
      }
    }
  }

  const scrollToPrev = () => {
    if (cardsRef.current && beforeAfterData.length > 0) {
      const cardWidth = isMobile ? 256 : 288

      if (currentIndex > 0) {
        const newIndex = currentIndex - 1
        setCurrentIndex(newIndex)
        cardsRef.current.scrollTo({
          left: newIndex * cardWidth,
          behavior: "smooth",
        })
      }
    }
  }
  
  // Calculate if next button should be disabled
  const isNextDisabled = beforeAfterData.length === 0 || currentIndex >= beforeAfterData.length - (isMobile ? 1 : 3)
  const isPrevDisabled = beforeAfterData.length === 0 || currentIndex === 0

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
            {beforeAfterData.length > 0 && (
              <>
                <button
                  onClick={scrollToPrev}
                  disabled={isPrevDisabled}
                  className="absolute -left-2 md:-left-5 top-1/2 -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 text-white rounded-full w-8 h-8 md:w-10 md:h-10 border-none flex items-center justify-center transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ backgroundColor: "#963f36" }}
                >
                  <ChevronLeft className="w-5 h-5 md:w-8 md:h-8" strokeWidth={1.5} />
                </button>

                <button
                  onClick={scrollToNext}
                  disabled={isNextDisabled}
                  className="absolute -right-2 md:-right-5 top-1/2 -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 text-white rounded-full w-8 h-8 md:w-10 md:h-10 border-none flex items-center justify-center transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ backgroundColor: "#963f36" }}
                >
                  <ChevronRight className="w-5 h-5 md:w-8 md:h-8" strokeWidth={1.5} />
                </button>
              </>
            )}

            {/* Cards Container */}
            <div
              ref={cardsRef}
              className="flex gap-4 md:gap-6 overflow-x-auto scrollbar-hide px-4 md:px-8"
              style={{ 
                scrollbarWidth: "none", 
                msOverflowStyle: "none"
              }}
            >
              {loading ? (
                // Loading state
                <div className="flex items-center justify-center w-full py-12">
                  <div className="text-white text-lg">Loading results...</div>
                </div>
              ) : beforeAfterData.length === 0 ? (
                // Empty state
                <div className="flex items-center justify-center w-full py-12">
                  <div className="text-white text-lg">No results available at the moment.</div>
                </div>
              ) : (
                // Results cards
                beforeAfterData.map((item) => (
                  <div key={item.id} className="before-after-card flex-shrink-0 w-64 md:w-72 bg-white rounded-2xl p-3 md:p-4 shadow-lg">
                    {/* Before Image */}
                    <div className="relative mb-2">
                      <img 
                        src={item.beforeImage}
                        alt={`Before treatment - ${item.treatment}`}
                        className="w-full h-24 md:h-32 rounded-lg object-cover"
                        onError={(e) => {
                          console.error('Error loading before image:', item.beforeImage);
                          (e.target as HTMLImageElement).src = '/placeholder-image.png'; // Fallback image
                        }}
                      />
                      <span className="absolute top-1 left-1 md:top-2 md:left-2 bg-gray-600 text-white text-xs px-1.5 py-0.5 md:px-2 md:py-1 rounded">
                        BEFORE
                      </span>
                    </div>

                    {/* After Image */}
                    <div className="relative mb-3 md:mb-4">
                      <img 
                        src={item.afterImage}
                        alt={`After treatment - ${item.treatment}`}
                        className="w-full h-24 md:h-32 rounded-lg object-cover"
                        onError={(e) => {
                          console.error('Error loading after image:', item.afterImage);
                          (e.target as HTMLImageElement).src = '/placeholder-image.png'; // Fallback image
                        }}
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
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
