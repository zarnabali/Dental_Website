"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { api } from "@/lib/api";

gsap.registerPlugin(ScrollTrigger);

export default function PatientFeedback() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [testimonials, setTestimonials] = useState([
    {
      id: 1,
      title: "WILL COME BACK!",
      text: "The space is gorgeous and the staff was friendly! I'd never done professional whitening before and was pleased with the results.",
      customer: "LYDIA HALLAY",
      rating: 5
    },
    {
      id: 2,
      title: "DISCOMFORT-FREE",
      text: "The team is so nice & professional. There was no pain and the appointment flew by!",
      customer: "KATHERINE HARRIS",
      rating: 5
    },
    {
      id: 3,
      title: "EXCELLENT SERVICE",
      text: "Dr. Samiullah and his team provided outstanding care. The modern equipment and gentle approach made my treatment comfortable.",
      customer: "MOHAMMAD ALI",
      rating: 5
    }
  ]);
  const [loading, setLoading] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);
  const autoSlideIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Fetch feedback from API
  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        setLoading(true)
        console.log('Fetching feedback from API...')
        const response = await api.getFeedback()
        console.log('Feedback response:', response)
        console.log('Response success:', response.success)
        console.log('Response data:', response.data)
        console.log('Data length:', response.data?.length)
        
        if (response.success && response.data && response.data.length > 0) {
          const feedbackData = response.data.map((item: { id: number; name: string; rating: number; comment: string; image?: string; _id?: string; title?: string; description?: string; username?: string }, index: number) => {
            console.log('Mapping item:', item)
            return {
              id: item._id || item.id || index + 1,
              title: item.title || "EXCELLENT SERVICE",
              text: item.description || item.comment || "Great service and professional care.",
              customer: item.username || item.name || "CUSTOMER",
              rating: item.rating || 5
            }
          })
          console.log('Setting feedback data:', feedbackData)
          setTestimonials(feedbackData)
        } else {
          console.log('No feedback data, using fallback')
          setTestimonials([
            {
              id: 1,
              title: "WILL COME BACK!",
              text: "The space is gorgeous and the staff was friendly! I'd never done professional whitening before and was pleased with the results.",
              customer: "LYDIA HALLAY",
              rating: 5
            },
            {
              id: 2,
              title: "DISCOMFORT-FREE",
              text: "The team is so nice & professional. There was no pain and the appointment flew by!",
              customer: "KATHERINE HARRIS",
              rating: 5
            },
            {
              id: 3,
              title: "EXCELLENT SERVICE",
              text: "Dr. Samiullah and his team provided outstanding care. The modern equipment and gentle approach made my treatment comfortable.",
              customer: "MOHAMMAD ALI",
              rating: 5
            }
          ])
        }
      } catch (error) {
        console.error('Error fetching feedback:', error)
        console.log('Using fallback feedback data')
        // Keep fallback data
      } finally {
        setLoading(false)
      }
    }

    fetchFeedback()
  }, [])

  const showTestimonial = (index: number) => {
    setCurrentSlide(index);
  };

  const nextTestimonial = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const startAutoSlide = () => {
    if (autoSlideIntervalRef.current) {
      clearInterval(autoSlideIntervalRef.current);
    }
    autoSlideIntervalRef.current = setInterval(() => {
      setDirection(1);
      nextTestimonial();
    }, 2500);
  };

  const stopAutoSlide = () => {
    if (autoSlideIntervalRef.current) {
      clearInterval(autoSlideIntervalRef.current);
      autoSlideIntervalRef.current = null;
    }
  };

  useEffect(() => {
    startAutoSlide();
    return () => stopAutoSlide();
  }, []);

  useEffect(() => {
    if (
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
    }
  }, []);

  // Animate content on slide change
  useEffect(() => {
    if (typeof window === "undefined" || !(window as unknown as { gsap?: typeof gsap }).gsap) return;
    const gsapInstance = (window as unknown as { gsap: typeof gsap }).gsap;
    if (!contentRef.current) return;
    gsapInstance.fromTo(
      contentRef.current,
      { opacity: 0, x: direction === 1 ? 40 : -40 },
      { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" }
    );
  }, [currentSlide, direction]);

  const handleNavigation = (direction: 'prev' | 'next') => {
    stopAutoSlide();
    if (direction === 'next') {
      nextTestimonial();
    } else {
      prevTestimonial();
    }
    setTimeout(startAutoSlide, 1000);
  };

  const currentTestimonial = testimonials[currentSlide];

  return (
    <section 
      ref={sectionRef} 
      className="py-16 md:py-24 overflow-hidden"
      style={{ backgroundColor: "#963f36" }}
      onMouseEnter={stopAutoSlide}
      onMouseLeave={startAutoSlide}
    >
      {loading && (
        <div className="text-center text-white mb-4">
          Loading feedback...
        </div>
      )}
      
      {/* Debug info - remove this after testing */}
      <div className="text-center text-white text-xs mb-2 opacity-50">
        Debug: {testimonials.length} testimonials loaded
      </div>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative">
          {/* Testimonial Card */}
          <div className="bg-transparent border-2 border-white rounded-3xl relative transition-opacity duration-600 p-8 md:p-12 lg:p-16 xl:p-20 min-h-[280px] md:min-h-[350px] flex flex-col md:flex-row items-center">
            
            {/* Toothbrush Icon - Much Larger */}
            <div className="absolute -left-12 md:-left-25 top-1/2 transform -translate-y-1/2 z-10">
              <img 
                src="/toothbrush-reviews.svg" 
                alt="Toothbrush" 
                className="w-24 h-12 md:w-32 md:h-16 lg:w-40 lg:h-20 xl:w-48 xl:h-24"
              />
            </div>

            {/* Mobile Layout - Vertical */}
            <div ref={contentRef} className="md:hidden text-center w-full relative">
              <div className="text-white text-3xl font-light leading-tight mb-6">
                People are talking
              </div>
              
              {/* Stars */}
              <div className="flex gap-1.5 justify-center mb-4">
                {[...Array(currentTestimonial.rating)].map((_, i) => (
                  <span key={i} className="text-white text-lg">★</span>
                ))}
              </div>
              
              {/* Title */}
              <div className="text-white text-2xl font-bold tracking-wider mb-4 uppercase">
                {currentTestimonial.title}
              </div>
              
              {/* Text */}
              <div className="text-white text-base leading-relaxed mb-5 opacity-95 max-w-md mx-auto">
                {currentTestimonial.text}
              </div>
              
              {/* Customer Name */}
              <div className="text-white text-sm font-semibold tracking-widest uppercase">
                — {currentTestimonial.customer}
              </div>
            </div>

            {/* Desktop Layout - Horizontal */}
            <div className="hidden md:flex w-full items-center justify-between">
              {/* People are talking */}
              <div className="flex-shrink-0 px-8">
                <div className="text-white text-4xl lg:text-5xl xl:text-6xl font-light leading-tight">
                  People are<br />talking
                </div>
              </div>
              
              {/* Left Navigation Button - After People are talking */}
              <button
                onClick={() => handleNavigation('prev')}
                className="flex-shrink-0 bg-transparent border-none text-white text-3xl cursor-pointer p-2.5 transition-opacity duration-300 hover:opacity-100 opacity-70"
              >
                ‹
              </button>
              
              {/* Feedback Content */}
              <div ref={contentRef} className="flex-1 px-8">
                {/* Stars */}
                <div className="flex gap-1.5 mb-4">
                  {[...Array(currentTestimonial.rating)].map((_, i) => (
                    <span key={i} className="text-white text-lg">★</span>
                  ))}
                </div>
                
                {/* Title */}
                <div className="text-white text-2xl font-bold tracking-wider mb-4 uppercase">
                  {currentTestimonial.title}
                </div>
                
                {/* Text */}
                <div className="text-white text-base leading-relaxed mb-5 opacity-95 max-w-md">
                  {currentTestimonial.text}
                </div>
                
                {/* Customer Name */}
                <div className="text-white text-sm font-semibold tracking-widest uppercase">
                  — {currentTestimonial.customer}
                </div>
              </div>
              
              {/* Right Navigation Button */}
              <button
                onClick={() => handleNavigation('next')}
                className="flex-shrink-0 bg-transparent border-none text-white text-3xl cursor-pointer p-2.5 transition-opacity duration-300 hover:opacity-100 opacity-70"
              >
                ›
              </button>
            </div>

            {/* Mobile Navigation Buttons */}
            <button
              onClick={() => handleNavigation('prev')}
              className="md:hidden absolute left-6 top-1/2 transform -translate-y-1/2 bg-transparent border-none text-white text-3xl cursor-pointer p-2.5 transition-opacity duration-300 hover:opacity-100 z-5 opacity-70"
            >
              ‹
            </button>
            <button
              onClick={() => handleNavigation('next')}
              className="md:hidden absolute right-6 top-1/2 transform -translate-y-1/2 bg-transparent border-none text-white text-3xl cursor-pointer p-2.5 transition-opacity duration-300 hover:opacity-100 z-5 opacity-70"
            >
              ›
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
