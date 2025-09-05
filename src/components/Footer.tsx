"use client"

import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Instagram, Facebook, Youtube, Twitter, Phone, Mail, MapPin, Clock } from "lucide-react"

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

  useEffect(() => {
    if (
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
  }, [])

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
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">
                  Teeth Whitening
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">
                  Dental Fillings
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">
                  Orthodontics
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">
                  Root Canal Treatment
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">
                  Dental Implants
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">
                  Gum Treatment
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div ref={linksRef}>
            <h4 className="text-sm font-medium text-gray-800 mb-6 tracking-wider uppercase">
              Quick Links
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="#home" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#about" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#services" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">
                  Services
                </Link>
              </li>
              <li>
                <Link href="#testimonials" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">
                  Testimonials
                </Link>
              </li>
              <li>
                <Link href="#faq" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="#contact" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">
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
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "#963f36" }} />
                  <span className="text-gray-600">
                    123 Dental Street<br />
                    Medical District, City 12345
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 flex-shrink-0" style={{ color: "#963f36" }} />
                  <span className="text-gray-600">(123) 456-7890</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 flex-shrink-0" style={{ color: "#963f36" }} />
                  <span className="text-gray-600">info@drsamiullah.com</span>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "#963f36" }} />
                  <div className="text-gray-600">
                    <div>Mon - Fri: 9:00 AM - 6:00 PM</div>
                    <div>Sat: 9:00 AM - 2:00 PM</div>
                    <div>Sun: Emergency Only</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div ref={socialRef}>
              <h4 className="text-sm font-medium text-gray-800 mb-4 tracking-wider uppercase">
                Follow Us
              </h4>
              <div className="flex space-x-4">
                <Link 
                  href="#" 
                  className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-400 transition-colors duration-200"
                >
                  <Instagram className="w-4 h-4 text-gray-600" />
                </Link>
                <Link 
                  href="#" 
                  className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-400 transition-colors duration-200"
                >
                  <Facebook className="w-4 h-4 text-gray-600" />
                </Link>
                <Link 
                  href="#" 
                  className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-400 transition-colors duration-200"
                >
                  <Youtube className="w-4 h-4 text-gray-600" />
                </Link>
                <Link 
                  href="#" 
                  className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-400 transition-colors duration-200"
                >
                  <Twitter className="w-4 h-4 text-gray-600" />
                </Link>
              </div>
            </div>
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