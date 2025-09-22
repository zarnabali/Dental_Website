"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { api } from "@/lib/api"

gsap.registerPlugin(ScrollTrigger)

export default function FeaturedIn() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const logosRef = useRef<HTMLDivElement>(null)
  const [partners, setPartners] = useState([
    { id: 1, name: "KTLA 5", src: "/partners/p1.jpg" },
    { id: 2, name: "Angeleno", src: "/partners/p2.png" },
    { id: 3, name: "WEHO Online", src: "/partners/p3.png" },
    { id: 4, name: "Spa & Beauty", src: "/partners/p4.png" },
    { id: 5, name: "WEHO Times", src: "/partners/p5.png" },
  ])
  const [loading, setLoading] = useState(true)

  // Fetch partners from API
  useEffect(() => {
    const fetchPartners = async () => {
      try {
        setLoading(true)
        console.log('Fetching partners from API...')
        const response = await api.getPartners()
        console.log('Partners response:', response)
        
        if (response.success && response.data && response.data.length > 0) {
          const partnersData = response.data.map((item: any, index: number) => ({
            id: index + 1,
            name: item.partnerName || "Partner",
            src: item.image?.url || "/partners/p1.jpg"
          }))
          console.log('Setting partners data:', partnersData)
          setPartners(partnersData)
        } else {
          console.log('No partners data, using fallback')
          setPartners([
            { id: 1, name: "KTLA 5", src: "/partners/p1.jpg" },
            { id: 2, name: "Angeleno", src: "/partners/p2.png" },
            { id: 3, name: "WEHO Online", src: "/partners/p3.png" },
            { id: 4, name: "Spa & Beauty", src: "/partners/p4.png" },
            { id: 5, name: "WEHO Times", src: "/partners/p5.png" },
          ])
        }
      } catch (error) {
        console.error('Error fetching partners:', error)
        console.log('Using fallback partners data')
        // Keep fallback data
      } finally {
        setLoading(false)
      }
    }

    fetchPartners()
  }, [])

  useEffect(() => {
    if (typeof window !== "undefined" && (window as unknown as { gsap?: typeof gsap; ScrollTrigger?: typeof ScrollTrigger }).gsap && (window as unknown as { ScrollTrigger?: typeof ScrollTrigger }).ScrollTrigger) {
      const gsapInstance = (window as unknown as { gsap: typeof gsap }).gsap

      gsapInstance.set([titleRef.current, logosRef.current], { opacity: 0, y: 20 })

      gsapInstance.to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      })

      gsapInstance.to(logosRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      })
    }
  }, [])

  return (
    <section ref={sectionRef} className="py-12 md:py-16" style={{ backgroundColor: "#faf9f7" }}>
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
        {/* Centered divider title */}
        <div ref={titleRef} className="flex items-center gap-6 mb-10 md:mb-12">
          <div className="h-px flex-1" style={{ backgroundColor: "#e6e0da" }}></div>
          <div className="text-xs md:text-sm tracking-[0.3em] uppercase font-medium" style={{ color: "#6e3b35" }}>
            Featured In
          </div>
          <div className="h-px flex-1" style={{ backgroundColor: "#e6e0da" }}></div>
        </div>

        {/* Logos grid */}
        <div
          ref={logosRef}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 md:gap-12 items-center"
        >
          {partners.map((p) => (
            <div key={p.id} className="flex items-center justify-center">
              <img
                src={p.src}
                alt={p.name}
                className="h-12 md:h-16 lg:h-20 xl:h-24 w-auto object-contain opacity-100 transition"
                onError={(e) => {
                  e.currentTarget.src =
                    "data:image/svg+xml;utf8,"
                    +
                    '<svg xmlns="http://www.w3.org/2000/svg" width="100" height="40" viewBox="0 0 100 40">'
                    + '<rect width="100" height="40" rx="6" fill="%23ededde"/>'
                    + '<text x="50" y="26" text-anchor="middle" font-size="12" fill="%23999">Logo</text>'
                    + '</svg>'
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}


