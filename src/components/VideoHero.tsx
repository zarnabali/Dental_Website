"use client"

import { Button } from "@/components/ui/button"
import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { api } from "@/lib/api"

// Fallback content
const fallbackVideoHeroContent = {
  videoUrl: {
    mobile: "/hero-video.mp4",
    desktop: "/hero-video-2.mp4"
  },
  title: "Experience Excellence in Dental Care",
  titleLink: "#services",
  description: "Watch our state-of-the-art facility and expert team in action. We combine advanced technology with compassionate care to deliver exceptional dental services.",
  buttonText: "Book Your Visit",
  buttonLink: "#appointment"
}

export default function VideoHero() {
  const heroRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const mobileVideoRef = useRef<HTMLVideoElement>(null)
  const desktopVideoRef = useRef<HTMLVideoElement>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [videoHeroContent, setVideoHeroContent] = useState(fallbackVideoHeroContent)
  const [loading, setLoading] = useState(true)

  // Fetch hero video from API
  useEffect(() => {
    const fetchHeroVideo = async () => {
      try {
        setLoading(true)
        const response = await api.getHeroVideos()
        if (response.success && response.data && response.data.length > 0) {
          const videoData = response.data[0] // Get first video
          setVideoHeroContent({
            videoUrl: {
              mobile: videoData.video?.url || "/hero-video.mp4",
              desktop: videoData.video?.url || "/hero-video-2.mp4"
            },
            title: videoData.title || "Experience Excellence in Dental Care",
            titleLink: "#services",
            description: videoData.description || "Watch our state-of-the-art facility and expert team in action. We combine advanced technology with compassionate care to deliver exceptional dental services.",
            buttonText: "Book Your Visit",
            buttonLink: "#appointment"
          })
        }
      } catch (error) {
        console.error('Error fetching hero video:', error)
        // Keep fallback data
      } finally {
        setLoading(false)
      }
    }

    fetchHeroVideo()
  }, [])

  // GSAP animations for content
  useEffect(() => {
    if (!contentRef.current || loading) return

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
  }, [loading])

  // Check if mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024) // lg breakpoint
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Ensure video autoplays
  useEffect(() => {
    const currentVideoRef = isMobile ? mobileVideoRef.current : desktopVideoRef.current
    if (currentVideoRef) {
      currentVideoRef.play().catch(console.error)
    }
  }, [isMobile])

  return (
    <section ref={heroRef} className="relative rounded-3xl mx-4 sm:mx-6 lg:mx-10 h-[calc(100vh-80px)] sm:h-[calc(100vh-80px)] lg:h-[600px] overflow-hidden font-light font-trebuchet">
      {/* Background Video */}
      <div className="absolute inset-0">
        {/* Mobile Video */}
        <video
          ref={mobileVideoRef}
          className="w-full h-full object-cover lg:hidden"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src={videoHeroContent.videoUrl.mobile} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Desktop Video */}
        <video
          ref={desktopVideoRef}
          className="w-full h-full object-cover hidden lg:block"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src={videoHeroContent.videoUrl.desktop} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-end justify-start">
        <div ref={contentRef} className="text-left text-white px-8 sm:px-12 lg:px-16 pb-8 sm:pb-5 lg:pb-10">
          <h1 className="text-4xl md:text-6xl font-light mb-3 md:mb-3">
            <a 
              href={videoHeroContent.titleLink}
              className="text-white hover:opacity-80 transition-opacity"
            >
              {videoHeroContent.title}
            </a>
          </h1>
          
          <p className="text-lg md:text-xl mb-3 max-w-2xl leading-relaxed">
            {videoHeroContent.description}
          </p>
          
          <Button 
            className="bg-[#963f36] text-white px-8 py-3 rounded-2xl font-light text-lg font-helvetica hover:bg-gray-200 hover:text-black transition-colors"
            onClick={() => window.location.href = videoHeroContent.buttonLink}
          >
            {videoHeroContent.buttonText}
          </Button>
        </div>
      </div>
    </section>
  )
}
