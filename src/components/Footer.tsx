"use client"

import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Instagram, Facebook, Youtube, Twitter, Phone, Mail, MapPin, Clock } from "lucide-react"
import { api } from "@/lib/api"

gsap.registerPlugin(ScrollTrigger)

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const newsletterRef = useRef<HTMLDivElement>(null)
  const servicesRef = useRef<HTMLDivElement>(null)
  const linksRef = useRef<HTMLDivElement>(null)
  const contactRef = useRef<HTMLDivElement>(null)
  const socialRef = useRef<HTMLDivElement>(null)
  const bottomBarRef = useRef<HTMLDivElement>(null)

  const [services, setServices] = useState<Array<{ 
    _id: string; 
    cardInfo?: { title?: string; description?: string; image?: { url?: string } };
    serviceBlog?: any;
    isActive?: boolean;
  }>>([])
  const [clinicInfo, setClinicInfo] = useState({
    location1: {
      address: "",
      url: ""
    },
    location2: {
      address: "",
      url: ""
    },
    phone: "",
    email: "",
    timings: "",
    socialLinks: {
      facebook: "",
      instagram: ""
    }
  })
  const [loading, setLoading] = useState(true)

  // Fetch services and clinic info from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        
        // Fetch services
        try {
          console.log('Fetching services from API...')
          const servicesResponse = await api.getServices()
          console.log('Services response:', servicesResponse)
          
          if (servicesResponse.success && servicesResponse.data && Array.isArray(servicesResponse.data)) {
            // Filter only active services that have cardInfo with title
            const activeServices = servicesResponse.data
              .filter((service: { isActive?: boolean; cardInfo?: { title?: string } }) => 
                service.isActive !== false && service.cardInfo?.title
              )
              .slice(0, 6) // Limit to 6 services for footer
              .map((service: any) => service) // Keep full service object for navigation
            
            console.log('Setting services data:', activeServices)
            setServices(activeServices)
          }
        } catch (error) {
          console.error('Error fetching services:', error)
        }

        // Fetch clinic info
        try {
          console.log('Fetching clinic info from API...')
          const clinicResponse = await api.getClinicInfo()
          console.log('Clinic info response:', clinicResponse)
          
          if (clinicResponse.success && clinicResponse.data) {
            const data = clinicResponse.data
            setClinicInfo({
              location1: {
                address: data.location1?.description || "",
                url: data.location1?.url || ""
              },
              location2: {
                address: data.location2?.description || "",
                url: data.location2?.url || ""
              },
              phone: data.phoneNumber || "",
              email: data.email || "",
              timings: data.timings || "",
              socialLinks: {
                facebook: data.socialLinks?.facebook || "",
                instagram: data.socialLinks?.instagram || ""
              }
            })
          }
        } catch (error) {
          console.error('Error fetching clinic info:', error)
        }
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // GSAP animations - only run when data is loaded
  useEffect(() => {
    if (
      !loading &&
      typeof window !== "undefined" &&
      (window as unknown as { gsap?: typeof gsap; ScrollTrigger?: typeof ScrollTrigger }).gsap &&
      (window as unknown as { ScrollTrigger?: typeof ScrollTrigger }).ScrollTrigger
    ) {
      const gsapInstance = (window as unknown as { gsap: typeof gsap }).gsap

      // Initial state - hide footer
      gsap.set(footerRef.current, { opacity: 0, y: 50 })

      // Animate in when scrolling to footer
      gsapInstance.to(footerRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      })

      // Animate sections with stagger
      gsapInstance.fromTo(
        [logoRef.current, servicesRef.current, linksRef.current, contactRef.current, socialRef.current],
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      )
    }
  }, [loading])

  return (
    <footer ref={footerRef} className="w-full bg-white text-black">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Logo and Description */}
          <div className="lg:col-span-1" ref={logoRef}>
            <div className="mb-6">
              <h3 className="text-3xl font-light mb-2" style={{ color: "#963f36" }}>
                Dr. Samiullah
              </h3>
              <p className="text-sm text-gray-600 font-light tracking-wider uppercase">
                Dental Clinic
              </p>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed mb-6">
              Providing exceptional dental care with modern technology and personalized treatment for your perfect smile.
            </p>
            
            {/* Newsletter */}
            <div ref={newsletterRef}>
              <h4 className="text-sm font-medium text-gray-800 mb-3 tracking-wider uppercase">
                Stay Updated
              </h4>
              <div className="flex w-full max-w-sm">
                <Input 
                  type="email" 
                  placeholder="Your email address" 
                  className="flex-grow rounded-r-none bg-white text-sm border-gray-300 focus:border-gray-400" 
                />
                <Button 
                  className="rounded-l-none px-4 text-sm font-medium transition-all duration-300 hover:scale-105"
                  style={{ 
                    backgroundColor: "#963f36", 
                    color: "white",
                    border: "none"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "white";
                    e.currentTarget.style.color = "#963f36";
                    e.currentTarget.style.borderColor = "#963f36";
                    e.currentTarget.style.borderWidth = "1px";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#963f36";
                    e.currentTarget.style.color = "white";
                    e.currentTarget.style.borderWidth = "0px";
                  }}
                >
                  Subscribe
                </Button>
              </div>
            </div>
          </div>

          {/* Services */}
          <div ref={servicesRef}>
            <h4 className="text-sm font-medium text-gray-800 mb-6 tracking-wider uppercase">
              Our Services
            </h4>
            {loading ? (
              <div className="text-sm text-gray-500">Loading services...</div>
            ) : services.length > 0 ? (
              <ul className="space-y-3 text-sm">
                {services.map((service) => {
                  // Encode service data for navigation to service detail page
                  const serviceData = encodeURIComponent(JSON.stringify(service))
                  return (
                    <li key={service._id}>
                      <Link 
                        href={`/services?data=${serviceData}`}
                        className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
                      >
                        {service.cardInfo?.title || "Service"}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            ) : (
              <div className="text-sm text-gray-500">No services available</div>
            )}
          </div>

          {/* Quick Links */}
          <div ref={linksRef}>
            <h4 className="text-sm font-medium text-gray-800 mb-6 tracking-wider uppercase">
              Quick Links
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/#cta" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/#services" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info & Social */}
          <div className="space-y-6" ref={contactRef}>
            <div>
              <h4 className="text-sm font-medium text-gray-800 mb-6 tracking-wider uppercase">
                Contact Info
              </h4>
              <div className="space-y-4 text-sm">
                {/* Location 1 */}
                {clinicInfo.location1.address && (
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "#963f36" }} />
                    <span className="text-gray-600">
                      {clinicInfo.location1.url ? (
                        <a 
                          href={clinicInfo.location1.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="hover:underline"
                        >
                          {clinicInfo.location1.address.split('\n').map((line, index) => (
                            <span key={index}>
                              {line}
                              {index < clinicInfo.location1.address.split('\n').length - 1 && <br />}
                            </span>
                          ))}
                        </a>
                      ) : (
                        clinicInfo.location1.address.split('\n').map((line, index) => (
                          <span key={index}>
                            {line}
                            {index < clinicInfo.location1.address.split('\n').length - 1 && <br />}
                          </span>
                        ))
                      )}
                    </span>
                  </div>
                )}

                {/* Location 2 */}
                {clinicInfo.location2.address && (
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "#963f36" }} />
                    <span className="text-gray-600">
                      {clinicInfo.location2.url ? (
                        <a 
                          href={clinicInfo.location2.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="hover:underline"
                        >
                          {clinicInfo.location2.address.split('\n').map((line, index) => (
                            <span key={index}>
                              {line}
                              {index < clinicInfo.location2.address.split('\n').length - 1 && <br />}
                            </span>
                          ))}
                        </a>
                      ) : (
                        clinicInfo.location2.address.split('\n').map((line, index) => (
                          <span key={index}>
                            {line}
                            {index < clinicInfo.location2.address.split('\n').length - 1 && <br />}
                          </span>
                        ))
                      )}
                    </span>
                  </div>
                )}

                {/* Phone */}
                {clinicInfo.phone && (
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 flex-shrink-0" style={{ color: "#963f36" }} />
                    <a href={`tel:${clinicInfo.phone}`} className="text-gray-600 hover:underline">
                      {clinicInfo.phone}
                    </a>
                  </div>
                )}

                {/* Email */}
                {clinicInfo.email && (
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 flex-shrink-0" style={{ color: "#963f36" }} />
                    <a href={`mailto:${clinicInfo.email}`} className="text-gray-600 hover:underline">
                      {clinicInfo.email}
                    </a>
                  </div>
                )}

                {/* Hours/Timings */}
                {clinicInfo.timings && (
                  <div className="flex items-start gap-3">
                    <Clock className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "#963f36" }} />
                    <div className="text-gray-600">
                      {clinicInfo.timings.split('\n').map((line, index) => (
                        <div key={index}>{line.trim()}</div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Social Media */}
            {(clinicInfo.socialLinks.facebook || clinicInfo.socialLinks.instagram) && (
              <div ref={socialRef}>
                <h4 className="text-sm font-medium text-gray-800 mb-4 tracking-wider uppercase">
                  Follow Us
                </h4>
                <div className="flex space-x-4">
                  {clinicInfo.socialLinks.instagram && (
                    <Link 
                      href={clinicInfo.socialLinks.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-400 transition-colors duration-200"
                    >
                      <Instagram className="w-4 h-4 text-gray-600" />
                    </Link>
                  )}
                  {clinicInfo.socialLinks.facebook && (
                    <Link 
                      href={clinicInfo.socialLinks.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-400 transition-colors duration-200"
                    >
                      <Facebook className="w-4 h-4 text-gray-600" />
                    </Link>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div 
        ref={bottomBarRef} 
        className="border-t border-gray-200 py-6 px-4 md:px-8 lg:px-12"
        style={{ backgroundColor: "#faf9f7" }}
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
          <p className="mb-2 md:mb-0">
            © 2024 Dr. Samiullah Dental Clinic. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link href="#" className="hover:text-gray-900 transition-colors duration-200">
              Terms & Conditions
            </Link>
            <Link href="#" className="hover:text-gray-900 transition-colors duration-200">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-gray-900 transition-colors duration-200">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}