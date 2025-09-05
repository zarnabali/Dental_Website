"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

type Blog = {
  id: number
  title: string
  excerpt: string
  image: string
}

export default function Blogs() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [current, setCurrent] = useState(0)
  const [visibleCount, setVisibleCount] = useState(2)

  const blogs: Blog[] = useMemo(() => ([
    {
      id: 1,
      title: "Top Tips For A Brighter Smile",
      excerpt: "Simple daily habits that noticeably whiten and protect your teeth.",
      image: "/blogs/b1.jpg",
    },
    {
      id: 2,
      title: "Do You Need A Night Guard?",
      excerpt: "How to tell if grinding impacts your enamel and jaw comfort.",
      image: "/blogs/b2.jpg",
    },
    {
      id: 3,
      title: "Gentle Root Canal Myths—Debunked",
      excerpt: "Modern techniques make treatment faster and more comfortable.",
      image: "/blogs/b3.jpg",
    },
    {
      id: 4,
      title: "Choosing The Right Toothbrush",
      excerpt: "Manual vs. electric—what actually matters for your gums?",
      image: "/blogs/b4.jpg",
    },
    {
      id: 5,
      title: "Foods Your Teeth Love",
      excerpt: "Add these to your diet for enamel strength and freshness.",
      image: "/blogs/b5.jpg",
    },
  ]), [])

  // Reveal animations
  useEffect(() => {
    if (typeof window === "undefined" || !(window as unknown as { gsap?: typeof gsap }).gsap) return
    const gsapInstance = (window as unknown as { gsap: typeof gsap }).gsap
    gsapInstance.set([titleRef.current, trackRef.current], { opacity: 0, y: 30 })
    gsapInstance.to(titleRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.9,
      ease: "power2.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    })
    gsapInstance.to(trackRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.9,
      ease: "power2.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
        toggleActions: "play none none reverse",
      },
    })
  }, [])

  // Responsive visible cards (mobile 2, max 4)
  useEffect(() => {
    const computeVisible = () => {
      const width = window.innerWidth
      if (width >= 1280) return 4
      if (width >= 1024) return 3
      return 2
    }
    const set = () => setVisibleCount(computeVisible())
    set()
    window.addEventListener("resize", set)
    return () => window.removeEventListener("resize", set)
  }, [])

  // Auto-rotate
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % Math.max(blogs.length - (visibleCount - 1), 1))
    }, 4000)
    return () => clearInterval(timer)
  }, [blogs.length, visibleCount])

  // Smooth slide animation with GSAP
  useEffect(() => {
    if (!trackRef.current) return
    const targetXPercent = -(100 / visibleCount) * current
    gsap.to(trackRef.current, {
      xPercent: targetXPercent,
      duration: 0.6,
      ease: "power3.out",
    })
  }, [current, visibleCount])

  const handlePrev = () => {
    setCurrent((prev) => {
      const maxIndex = Math.max(blogs.length - visibleCount, 0)
      return prev === 0 ? maxIndex : prev - 1
    })
  }
  const handleNext = () => {
    setCurrent((prev) => {
      const maxIndex = Math.max(blogs.length - visibleCount, 0)
      return prev >= maxIndex ? 0 : prev + 1
    })
  }

  return (
    <section ref={sectionRef} id="blogs" className="py-16 md:py-24 bg-[#faf9f7]">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
        {/* Title */}
        <div ref={titleRef} className="text-center mb-10 md:mb-14">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-black mb-4">
            Latest From Our Blog
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Insights and tips from our dental experts to keep your smile healthy.
          </p>
        </div>

        {/* Carousel */}
        <div className="relative">
          {/* Track */}
          <div className="overflow-hidden">
            <div
              ref={trackRef}
              className="flex gap-4 md:gap-6 lg:gap-8 will-change-transform"
            >
              {blogs.map((blog) => (
                <article
                  key={blog.id}
                  className="group rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex-shrink-0"
                  style={{ width: visibleCount === 2 ? "50%" : visibleCount === 3 ? "33.3333%" : "25%" }}
                >
                  <div className="aspect-[16/11] w-full overflow-hidden">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      onError={(e) => {
                        e.currentTarget.src =
                          "data:image/svg+xml;utf8," +
                          '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 250">' +
                          '<rect width="400" height="250" fill="%23f3f4f6"/>' +
                          '<text x="200" y="130" text-anchor="middle" font-size="20" fill="%23999">Blog Image</text>' +
                          '</svg>'
                      }}
                    />
                  </div>
                  <div className="p-4 md:p-5 bg-white">
                    <h3 className="text-base md:text-lg font-medium text-black mb-1.5 leading-snug">{blog.title}</h3>
                    <p className="text-sm md:text-sm text-gray-600">{blog.excerpt}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Controls */}
          <div className="mt-6 flex items-center justify-center gap-4">
            <button
              onClick={handlePrev}
              className="px-4 py-2 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
            >
              Prev
            </button>
            <button
              onClick={handleNext}
              className="px-4 py-2 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}


