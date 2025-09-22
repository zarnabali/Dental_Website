"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";

gsap.registerPlugin(ScrollTrigger);

type Service = {
  id: number
  name: string
  image: string
  description: string
  fullData?: any // Store the complete API data
}

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [services, setServices] = useState<Service[]>([
    {
      id: 1,
      name: "Teeth Whitening",
      image: "/services/whitening.jpg",
      description: "Professional teeth whitening treatments for a brighter, more confident smile."
    },
    {
      id: 2,
      name: "Dental Fillings and Restoration",
      image: "/services/filling.jpg",
      description: "Advanced restorative treatments to repair and restore damaged teeth."
    },
    {
      id: 3,
      name: "Orthodontist Braces",
      image: "/services/braces.jpg",
      description: "Modern orthodontic solutions for perfectly aligned teeth and beautiful smiles."
    },
    {
      id: 4,
      name: "Root Canal Treatment",
      image: "/services/root-canal.jpg",
      description: "Pain-free root canal procedures to save and restore infected teeth."
    },
    {
      id: 5,
      name: "Artificial Teeth Replacements",
      image: "/services/dental-implants.jpg",
      description: "Premium dental implants and prosthetics for complete smile restoration."
    },
    {
      id: 6,
      name: "Gum Disease Treatment",
      image: "/services/gums.jpg",
      description: "Comprehensive periodontal care for healthy gums and optimal oral health."
    }
  ]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Fetch services from API
  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true)
        console.log('Fetching services from API...')
        const response = await api.getServices()
        console.log('Services response:', response)
        
        if (response.success && response.data && response.data.length > 0) {
          const servicesData = response.data.map((item: any, index: number) => ({
            id: index + 1,
            name: item.cardInfo?.title || "Dental Service",
            image: item.cardInfo?.image?.url || "/services/whitening.jpg",
            description: item.cardInfo?.description || "Professional dental care service.",
            fullData: item // Store complete API data
          }))
          console.log('Setting services data:', servicesData)
          setServices(servicesData)
        } else {
          console.log('No services data, using fallback')
          setServices([
            {
              id: 1,
              name: "Teeth Whitening",
              image: "/services/whitening.jpg",
              description: "Professional teeth whitening treatments for a brighter, more confident smile."
            },
            {
              id: 2,
              name: "Dental Fillings and Restoration",
              image: "/services/filling.jpg",
              description: "Advanced restorative treatments to repair and restore damaged teeth."
            },
            {
              id: 3,
              name: "Orthodontist Braces",
              image: "/services/braces.jpg",
              description: "Modern orthodontic solutions for perfectly aligned teeth and beautiful smiles."
            },
            {
              id: 4,
              name: "Root Canal Treatment",
              image: "/services/root-canal.jpg",
              description: "Pain-free root canal procedures to save and restore infected teeth."
            },
            {
              id: 5,
              name: "Artificial Teeth Replacements",
              image: "/services/dental-implants.jpg",
              description: "Premium dental implants and prosthetics for complete smile restoration."
            },
            {
              id: 6,
              name: "Gum Disease Treatment",
              image: "/services/gums.jpg",
              description: "Comprehensive periodontal care for healthy gums and optimal oral health."
            }
          ])
        }
      } catch (error) {
        console.error('Error fetching services:', error)
        console.log('Using fallback services data')
        // Keep fallback data
      } finally {
        setLoading(false)
      }
    }

    fetchServices()
  }, [])

  const handleServiceClick = (service: Service) => {
    if (service.fullData) {
      // Encode the full data as URL parameter
      const encodedData = encodeURIComponent(JSON.stringify(service.fullData))
      router.push(`/services?data=${encodedData}`)
    } else {
      // Fallback to default services page
      router.push('/services')
    }
  }

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      (window as unknown as { gsap?: typeof gsap; ScrollTrigger?: typeof ScrollTrigger }).gsap &&
      (window as unknown as { ScrollTrigger?: typeof ScrollTrigger }).ScrollTrigger
    ) {
      const gsapInstance = (window as unknown as { gsap: typeof gsap }).gsap

      // Initial state - hide section
      gsapInstance.set(sectionRef.current, { opacity: 0, y: 50 })

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

      // Animate title
      gsapInstance.fromTo(
        titleRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      )

      // Animate service cards with stagger
      gsapInstance.fromTo(
        ".service-card",
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      )
    }
  }, []);

  return (
    <section ref={sectionRef} id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div ref={titleRef} className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-light text-black mb-6 uppercase tracking-wider">
            Services We Offer
          </h2>
          <div className="w-[30%] h-1 mx-auto" style={{ backgroundColor: "#963f36" }}></div>
        </div>

        {/* Services Grid */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="service-card group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer"
              style={{ height: "400px" }}
              onMouseEnter={() => setHoveredCard(service.id)}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => handleServiceClick(service)}
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Overlay */}
                <div 
                  className="absolute inset-0 transition-opacity duration-500"
                  style={{
                    background: "linear-gradient(135deg, rgba(150, 63, 54, 0.8) 0%, rgba(150, 63, 54, 0.6) 100%)",
                    opacity: hoveredCard === service.id ? 0.9 : 0.5
                  }}
                ></div>
              </div>

              {/* Content */}
              <div className="relative z-10 h-full flex flex-col justify-end p-8">
                {/* Service Name */}
                <h3 className="text-white text-2xl md:text-3xl font-light mb-4 leading-tight">
                  {service.name}
                </h3>

                {/* Description */}
                <p className="text-white text-sm leading-relaxed mb-6 opacity-90">
                  {service.description}
                </p>

                {/* Read More Button */}
                <div className="flex items-center justify-between">
                  <span className="text-white text-sm font-medium tracking-wider uppercase">
                    Read More
                  </span>
                  <div 
                    className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center transition-all duration-300 group-hover:bg-white group-hover:scale-110"
                  >
                    <svg 
                      className="w-4 h-4 text-white group-hover:text-black transition-colors duration-300" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Hover Effect Overlay */}
              <div 
                className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-500"
              ></div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-gray-600 text-lg mb-8">
            Ready to transform your smile? Book your consultation today.
          </p>
          <button 
            className="px-8 py-4 rounded-full font-medium text-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
            style={{ 
              backgroundColor: "#963f36", 
              color: "white"
            }}
            onClick={() => {
              const contactSection = document.getElementById('contact');
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "white";
              e.currentTarget.style.color = "#963f36";
              e.currentTarget.style.borderColor = "#963f36";
              e.currentTarget.style.borderWidth = "2px";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#963f36";
              e.currentTarget.style.color = "white";
              e.currentTarget.style.borderWidth = "0px";
            }}
          >
            Contact Us
          </button>
        </div>
      </div>
    </section>
  );
}
