"use client"

import { Button } from "@/components/ui/button"
import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface HeroSlide {
  imageUrl: string
  title: string
  titleLink: string
  description: string
  color: string
}

const heroSlides: HeroSlide[] = [
  {
    imageUrl: "/hero1.jpg",
    title: "Advanced Dental Care",
    titleLink: "#services",
    description: "Experience cutting-edge dental treatments with our state-of-the-art equipment and expert team.",
    color: "text-white"
  },
  {
    imageUrl: "/hero2.jpg", 
    title: "Cosmetic Dentistry",
    titleLink: "#cosmetic",
    description: "Transform your smile with our comprehensive cosmetic dentistry services and personalized treatment plans.",
    color: "text-white"
  },
  {
    imageUrl: "/hero3.jpg",
    title: "Emergency Services",
    titleLink: "#emergency", 
    description: "24/7 emergency dental care when you need it most. We're here to help with urgent dental issues.",
    color: "text-white"
  },
  {
    imageUrl: "/hero4.jpg",
    title: "Family Dentistry",
    titleLink: "#family",
    description: "Complete dental care for the whole family, from children to seniors, in a comfortable environment.",
    color: "text-white"
  }
]

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // Auto-slide functionality
  useEffect(() => {
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
  }, [])

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
        <img
          src={currentSlideData.imageUrl}
          alt={currentSlideData.title}
          className="w-full h-full object-cover"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-end justify-start">
        <div ref={contentRef} className="text-left text-white px-8 sm:px-12 lg:px-16 pb-8 sm:pb-12 lg:pb-16 ">
          <h1 className="text-4xl md:text-6xl font-light mb-3 md:mb-3">
            <a 
              href={currentSlideData.titleLink}
              className={`hover:opacity-80 transition-opacity ${currentSlideData.color}`}
            >
              {currentSlideData.title}
            </a>
          </h1>
          
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto leading-relaxed">
            {currentSlideData.description}
          </p>
          
          
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-black/50 hover:bg-black/70 text-white rounded-full transition-all duration-300 hover:scale-110"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-black/50 hover:bg-black/70 text-white rounded-full transition-all duration-300 hover:scale-110"
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
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
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