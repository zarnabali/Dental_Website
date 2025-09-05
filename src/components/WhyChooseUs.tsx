"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function WhyChooseUs() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  const features = [
    {
      id: 1,
      title: "FLEXIBLE PAYMENTS",
      description: "Affordable plans, EMI options, and payment flexibility",
      icon: "/features/f2.png"
    },
    {
      id: 2,
      title: "CONVENIENT",
      description: "Same-day, evening, and weekend appointments",
      icon: "/features/f3.png"
    },
    {
      id: 3,
      title: "SAFE SPACE",
      description: "Expert Hygienists and supportive staff",
      icon: "/features/f1.png"
    },
    {
      id: 4,
      title: "NO DISCOMFORT",
      description: "Treatments designed for your delight",
      icon: "/features/f4.png"
    }
  ]

  useEffect(() => {
    if (typeof window !== "undefined" && window.gsap && (window as any).ScrollTrigger) {
      const { gsap } = window
      const ScrollTrigger = (window as any).ScrollTrigger

      // Initial state - hide elements
      gsap.set([titleRef.current, cardsRef.current], { opacity: 0, y: 30 })

      // Animate title
      gsap.to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      })

      // Animate cards with stagger
      gsap.to(cardsRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      })

      // Animate individual cards
      const cards = cardsRef.current?.querySelectorAll('.feature-card')
      if (cards) {
        gsap.fromTo(cards, 
          { opacity: 0, y: 20, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 60%",
              toggleActions: "play none none reverse",
            },
          }
        )
      }
    }
  }, [])

  return (
    <section ref={sectionRef} className="py-16 md:py-24" style={{ backgroundColor: "#dbf6e9" }}>
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
        {/* Main Title */}
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-normal mb-8" style={{ color: "#74886f" }}>
            Don't let your teeth be an afterthought
          </h2>
        </div>

        {/* Features Grid */}
        <div ref={cardsRef} className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="feature-card text-center"
            >
              {/* Icon */}
              <div className="mb-6 flex justify-center">
                <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center">
                  <img
                    src={feature.icon}
                    alt={feature.title}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      // Fallback to placeholder if image doesn't exist
                      e.currentTarget.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiBmaWxsPSIjNzQ4ODZmIiBmaWxsLW9wYWNpdHk9IjAuMiIvPgo8cGF0aCBkPSJNMzIgMTZMMzIgNDhNMTYgMzJINDBaIiBzdHJva2U9IiM3NDg4NmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+Cjwvc3ZnPgo="
                    }}
                  />
                </div>
              </div>

              {/* Title */}
              <h3 className="text-sm md:text-base font-bold uppercase mb-4 leading-tight" style={{ color: "#74886f" }}>
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-xs md:text-sm font-normal leading-relaxed" style={{ color: "#74886f" }}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
