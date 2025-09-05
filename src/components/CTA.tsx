"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

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

      // Animate content with stagger
      gsap.fromTo(
        contentRef.current?.children || [],
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      )
    }
  }, []);

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
                Ready to Transform Your Smile?
              </h2>
            </div>

            {/* Content */}
            <div ref={contentRef} className="text-center">
              <p className="text-white text-lg md:text-xl mb-8 max-w-3xl mx-auto opacity-90">
                Don&apos;t wait to achieve the healthy, beautiful smile you deserve. 
                Book your appointment today and take the first step towards better oral health.
              </p>
              
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <button 
                  className="px-8 py-4 rounded-full font-medium text-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                  style={{ 
                    backgroundColor: "white", 
                    color: "#963f36"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.color = "white";
                    e.currentTarget.style.borderColor = "white";
                    e.currentTarget.style.borderWidth = "2px";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "white";
                    e.currentTarget.style.color = "#963f36";
                    e.currentTarget.style.borderWidth = "0px";
                  }}
                >
                  Book Appointment Now
                </button>
                <button 
                  className="px-8 py-4 rounded-full font-medium text-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                  style={{ 
                    borderColor: "white", 
                    color: "white",
                    backgroundColor: "transparent",
                    borderWidth: "2px"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "white";
                    e.currentTarget.style.color = "#963f36";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.color = "white";
                  }}
                >
                  Call Us: (123) 456-7890
                </button>
              </div>
              
              {/* Stats Grid */}
              <div className="grid md:grid-cols-3 gap-8 text-center">
                <div className="text-white">
                  <div className="text-4xl md:text-5xl font-light mb-2">15+</div>
                  <div className="text-white/80 text-sm md:text-base font-light tracking-wider uppercase">Years Experience</div>
                </div>
                <div className="text-white">
                  <div className="text-4xl md:text-5xl font-light mb-2">1000+</div>
                  <div className="text-white/80 text-sm md:text-base font-light tracking-wider uppercase">Happy Patients</div>
                </div>
                <div className="text-white">
                  <div className="text-4xl md:text-5xl font-light mb-2">24/7</div>
                  <div className="text-white/80 text-sm md:text-base font-light tracking-wider uppercase">Emergency Care</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
