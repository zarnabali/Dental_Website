"use client"

import { Button } from "@/components/ui/button"
import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { api } from "@/lib/api"

interface HeroSlide {
  webImage: string
  mobileImage: string
  title: string
  titleLink: string
  description: string
  color: string
}

// Fallback data
const fallbackHeroSlides: HeroSlide[] = [
  {
    webImage: "/hero1.jpg",
    mobileImage: "/hero1-mobile.jpg",
    title: "Advanced Dental Care",
    titleLink: "#services",
    description: "Experience cutting-edge dental treatments with our state-of-the-art equipment and expert team.",
    color: "text-white"
  },
  {
    webImage: "/hero2.jpg",
    mobileImage: "/hero2-mobile.jpg", 
    title: "Cosmetic Dentistry",
    titleLink: "#cosmetic",
    description: "Transform your smile with our comprehensive cosmetic dentistry services and personalized treatment plans.",
    color: "text-white"
  },
  {
    webImage: "/hero3.jpg",
    mobileImage: "/hero3-mobile.jpg",
    title: "Emergency Services",
    titleLink: "#emergency", 
    description: "24/7 emergency dental care when you need it most. We're here to help with urgent dental issues.",
    color: "text-white"
  },
  {
    webImage: "/hero4.jpg",
    mobileImage: "/hero4-mobile.jpg",
    title: "Family Dentistry",
    titleLink: "#family",
    description: "Complete dental care for the whole family, from children to seniors, in a comfortable environment.",
    color: "text-white"
  }
]

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>(fallbackHeroSlides)
  const [loading, setLoading] = useState(true)
  const heroRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // Fetch hero images from API
  useEffect(() => {
    const fetchHeroImages = async () => {
      try {
        setLoading(true)
        console.log('Fetching hero images from API...')
        const response = await api.getHeroImages()
        console.log('Hero images response:', response)
        
        if (response.success && response.data && response.data.length > 0) {
          const slides = response.data.map((item: any) => ({
            webImage: item.webImage?.url || item.image?.url || "/hero1.jpg",
            mobileImage: item.mobileImage?.url || item.image?.url || "/hero1-mobile.jpg",
            title: item.title || "Advanced Dental Care",
            titleLink: "#services",
            description: item.description || "Experience cutting-edge dental treatments with our state-of-the-art equipment and expert team.",
            color: item.textColor || item.color || "text-white"
          }))
          console.log('Setting hero slides:', slides)
          setHeroSlides(slides)
        } else {
          console.log('No hero images data, using fallback')
          setHeroSlides(fallbackHeroSlides)
        }
      } catch (error) {
        console.error('Error fetching hero images:', error)
        console.log('Using fallback hero slides')
        setHeroSlides(fallbackHeroSlides)
      } finally {
        setLoading(false)
      }
    }

    fetchHeroImages()
  }, [])

  // Auto-slide functionality
  useEffect(() => {
    if (loading) return

    const startAutoSlide = () => {
      intervalRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
      }, 5000) // Change slide every 5 seconds
    }

    startAutoSlide()
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [heroSlides.length, loading])

  // GSAP animations for content
  useEffect(() => {
    if (!contentRef.current) return

    // Reset and animate content
    gsap.fromTo(
      contentRef.current.children,
      { opacity: 0, y: 30 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.8, 
        stagger: 0.2, 
        ease: "power2.out" 
      }
    )
  }, [currentSlide])

  const goToSlide = (index: number) => {
    if (isTransitioning || index === currentSlide) return
    
    setIsTransitioning(true)
    setCurrentSlide(index)
    
    // Reset transition state after animation
    setTimeout(() => {
      setIsTransitioning(false)
    }, 800)
  }

  const goToPrevious = () => {
    const newIndex = currentSlide === 0 ? heroSlides.length - 1 : currentSlide - 1
    goToSlide(newIndex)
  }

  const goToNext = () => {
    const newIndex = (currentSlide + 1) % heroSlides.length
    goToSlide(newIndex)
  }

  const currentSlideData = heroSlides[currentSlide]

  return (
    <section ref={heroRef} className="relative rounded-3xl mx-4 sm:mx-6 lg:mx-10 h-[calc(100vh-80px)] sm:h-[calc(100vh-80px)] lg:h-[600px] overflow-hidden font-light font-trebuchet">
      {/* Background */}
      <div className="absolute inset-0 transition-all duration-1000 ease-in-out">
        {/* Mobile Image */}
        <img
          src={currentSlideData.mobileImage}
          alt={currentSlideData.title}
          className="w-full h-full object-cover md:hidden"
        />
        {/* Desktop Image */}
        <img
          src={currentSlideData.webImage}
          alt={currentSlideData.title}
          className="w-full h-full object-cover hidden md:block"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-end justify-start">
        <div ref={contentRef} className="text-left text-white px-8 sm:px-12 lg:px-16 pb-8 sm:pb-12 lg:pb-16 w-full">
          <div className="max-w-5xl">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-light leading-tight">
              <a 
                href={currentSlideData.titleLink}
                className={`hover:opacity-80 transition-opacity ${currentSlideData.color}`}
              >
                {currentSlideData.title}
              </a>
            </h1>
            
            <p className="text-sm sm:text-base md:text-xl mb-8 max-w-2xl leading-relaxed">
              {currentSlideData.description}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-black/20 hover:bg-black/50 text-white rounded-full transition-all duration-300 hover:scale-110"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-black/20 hover:bg-black/50 text-white rounded-full transition-all duration-300 hover:scale-110"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-white scale-125' 
                : 'bg-white/50 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}