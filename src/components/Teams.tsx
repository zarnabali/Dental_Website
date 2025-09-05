"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function Teams() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  const teamMembers = [
    {
      id: 1,
      name: "Dr. Samiullah",
      position: "Chief Dental Surgeon",
      image: "/dr_sami.jpg",
      specialty: "General & Cosmetic Dentistry"
    },
    {
      id: 2,
      name: "Dr. Sarah Johnson",
      position: "Orthodontist",
      image: "/team/sarah.jpg",
      specialty: "Braces & Aligners"
    },
    {
      id: 3,
      name: "Dr. Michael Chen",
      position: "Oral Surgeon",
      image: "/team/michael.jpg",
      specialty: "Dental Implants"
    },
   
  ]

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      (window as unknown as { gsap?: typeof gsap; ScrollTrigger?: typeof ScrollTrigger }).gsap &&
      (window as unknown as { ScrollTrigger?: typeof ScrollTrigger }).ScrollTrigger
    ) {
      const gsapInstance = (window as unknown as { gsap: typeof gsap }).gsap

      // Initial state - hide elements
      gsapInstance.set([titleRef.current, cardsRef.current], { opacity: 0, y: 50 })

      // Animate title
      gsapInstance.to(titleRef.current, {
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
      gsapInstance.to(cardsRef.current, {
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
      const cards = cardsRef.current?.querySelectorAll('.team-card')
      if (cards) {
        gsapInstance.fromTo(cards, 
          { opacity: 0, y: 30, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.15,
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
    <section ref={sectionRef} id="teams" className="py-16 md:py-24 bg-[#faf9f7]">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 bg-[#faf9f7]">
        {/* Section Title */}
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-black mb-6 uppercase tracking-wider">
            Meet Our Team
          </h2>
          <div className="w-[30%] h-0.5 mx-auto mb-8" style={{ backgroundColor: "#963f36" }}></div>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Our experienced team of dental professionals is dedicated to providing you with the highest quality care and exceptional results.
          </p>
        </div>

        {/* Team Members Grid */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="team-card group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer"
              style={{ height: "400px" }}
              onMouseEnter={() => setHoveredCard(member.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 will-change-transform"
                  onError={(e) => {
                    e.currentTarget.src = "/dr_sami.jpg"
                  }}
                />
                {/* Overlay */}
                <div
                  className="absolute inset-0 transition-opacity duration-500"
                  style={{
                    background: "linear-gradient(135deg, rgba(150, 63, 54, 0.8) 0%, rgba(150, 63, 54, 0.6) 100%)",
                    opacity: hoveredCard === member.id ? 0.9 : 0.5
                  }}
                ></div>
              </div>

              {/* Content */}
              <div className="relative z-10 h-full flex flex-col justify-end p-6 md:p-8">
                <div className="text-center">
                  <h3 className="text-white text-2xl md:text-3xl font-light mb-2 leading-tight">
                    {member.name}
                  </h3>
                  <p className="text-white text-sm md:text-base font-medium mb-2 opacity-90">
                    {member.position}
                  </p>
                  <p className="text-white text-xs md:text-sm opacity-80 leading-relaxed">
                    {member.specialty}
                  </p>
                </div>
              </div>

              {/* Hover Effect Overlay */}
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
            </div>
          ))}
        </div>

        
      </div>
    </section>
  )
}
