"use client"

import Link from "next/link"
import Image from "next/image"
import { Search, ShoppingBag, Menu, X } from 'lucide-react'
import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"

export default function Header() {
  const router = useRouter()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isNavSticky, setIsNavSticky] = useState(false)

  // Handle escape key to close search
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false)
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isSearchOpen])

  // Handle scroll to make navigation sticky
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      // Make nav sticky after scrolling past the announcement bar (approximately 40px)
      setIsNavSticky(scrollY > 40)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Navigation helper function that works from any page
  const navigateToSection = (sectionId: string) => {
    // Check if we're on the home page
    if (pathname === '/') {
      // On home page, just scroll to section with offset for sticky header
      requestAnimationFrame(() => {
        const section = document.getElementById(sectionId)
        if (section) {
          const headerOffset = 80
          const elementPosition = section.getBoundingClientRect().top
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          })
        }
      })
    } else {
      // On other pages, use Next.js router for smooth client-side navigation with hash
      // Store section ID before navigation for reliable scrolling
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('pendingScrollSection', sectionId)
        // Use router.push with hash - Next.js will handle the navigation smoothly
        router.push(`/#${sectionId}`)
      }
    }
  }

  // Handle hash navigation and section scrolling after page load
  useEffect(() => {
    if (pathname !== '/') return

    const scrollToSection = (sectionId: string, attempt = 0): boolean => {
      if (!sectionId) return false
      
      const section = document.getElementById(sectionId)
      if (section) {
        // Small delay to ensure page is stable
        setTimeout(() => {
          // Account for sticky header offset
          const headerOffset = 80
          const elementPosition = section.getBoundingClientRect().top
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset

          window.scrollTo({
            top: Math.max(0, offsetPosition),
            behavior: 'smooth'
          })
        }, 50)
        return true
      } else if (attempt < 20) {
        // If section not found, try again (max 20 attempts = 2 seconds)
        setTimeout(() => scrollToSection(sectionId, attempt + 1), 100)
        return false
      }
      return false
    }

    const handleScrollToSection = () => {
      // Priority 1: Check sessionStorage for pending scroll (from navigateToSection)
      const pendingSection = typeof window !== 'undefined' ? sessionStorage.getItem('pendingScrollSection') : null
      if (pendingSection) {
        sessionStorage.removeItem('pendingScrollSection')
        // Wait a bit for the route to settle
        requestAnimationFrame(() => {
          setTimeout(() => scrollToSection(pendingSection), 100)
        })
        return
      }

      // Priority 2: Check hash in URL
      const hash = typeof window !== 'undefined' ? window.location.hash.replace('#', '') : ''
      if (hash) {
        requestAnimationFrame(() => {
          setTimeout(() => scrollToSection(hash), 150)
        })
      }
    }

    // Wait for page to be ready and DOM to be fully rendered
    if (typeof window !== 'undefined') {
      // Use multiple strategies to ensure we catch the navigation
      // Strategy 1: Immediate check after mount
      const timer1 = setTimeout(handleScrollToSection, 150)
      
      // Strategy 2: Check after a longer delay (for slower renders)
      const timer2 = setTimeout(handleScrollToSection, 300)

      // Strategy 3: Listen for hash changes (browser back/forward)
      window.addEventListener('hashchange', handleScrollToSection)
      
      // Strategy 4: Listen for popstate (browser navigation)
      window.addEventListener('popstate', handleScrollToSection)
      
      return () => {
        clearTimeout(timer1)
        clearTimeout(timer2)
        window.removeEventListener('hashchange', handleScrollToSection)
        window.removeEventListener('popstate', handleScrollToSection)
      }
    }
  }, [pathname]) // Re-run when pathname changes to home page

  return (
    <header className="w-full font-almarai">
      {/* Top Announcement Bar - Full Width, No Padding */}
      <div className="bg-[#dbf6e9] text-[#74886f] text-center text-sm w-full py-2">
        Welcome to Dr. Samiullah Dental Clinic
      </div>

      {/* Main Navigation - Full Width */}
      <nav className={`w-full bg-white h-16 px-4 sm:px-6 lg:px-12 flex items-center justify-between transition-all duration-300 ${
        isNavSticky ? 'fixed top-0 left-0 right-0 z-50 shadow-md' : 'relative'
      }`}>
        {/* Logo - Left Side */}
        <div className="flex-shrink-0">
          <Link href="/" className="flex items-center">
            <Image
              src="/1.png"
              alt="Dr. Samiullah Dental Clinic"
              width={180}
              height={60}
              className="h-12 w-auto lg:h-16 lg:w-auto"
              priority
            />
          </Link>
        </div>

        {/* Desktop Navigation Links - Right Side */}
        <div className="hidden lg:flex items-center space-x-8">
          <button
            onClick={() => {
              if (pathname === '/') {
                window.scrollTo({ top: 0, behavior: 'smooth' })
              } else {
                router.push('/')
              }
            }}
            className="text-gray-700 hover:text-[#963f36] transition-colors duration-200"
          >
            Home
          </button>
          <button
            onClick={() => navigateToSection('cta')}
            className="text-gray-700 hover:text-[#963f36] transition-colors duration-200"
          >
            About Us
          </button>
          <button
            onClick={() => navigateToSection('services')}
            className="text-gray-700 hover:text-[#963f36] transition-colors duration-200"
          >
            Services
          </button>
        
          <button
            onClick={() => navigateToSection('contact')}
            className="text-gray-700 hover:text-[#963f36] transition-colors duration-200"
          >
            Contact
          </button>
          <Button 
            className="bg-[#963f36] text-white px-6 py-2 rounded-lg hover:bg-[#9e6058] transition-colors font-helvetica font-regular"
            onClick={() => navigateToSection('contact')}
          >
            GIVE FEEDBACK
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden flex items-center space-x-4">
          <Button 
            onClick={() => setIsOpen(true)}
            variant="ghost" 
            size="icon" 
            aria-label="Open menu"
            className="p-2"
          >
            <Menu className="h-8 w-8 text-gray-700" />
          </Button>
        </div>
      </nav>

      {/* Mobile Header - Separate Section */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/50" onClick={() => setIsOpen(false)}>
          <div className="fixed right-0 top-0 h-full w-80 bg-white shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex flex-col h-full">
              {/* Mobile Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <Image
                  src="/logo.png"
                  alt="Dr. Samiullah Dental Clinic"
                  width={150}
                  height={50}
                  className="h-10 w-auto"
                />
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setIsOpen(false)} 
                  aria-label="Close menu"
                  className="p-2"
                >
                  <X className="h-6 w-6 text-gray-700" />
                </Button>
              </div>
              
              {/* Mobile Navigation */}
              <nav className="flex-1 p-6">
                <div className="flex flex-col space-y-6">
                  <button 
                    className="text-left text-xl text-gray-700 hover:text-[#963f36] transition-colors duration-200 py-2 border-b border-gray-100" 
                    onClick={() => { 
                      setIsOpen(false)
                      if (pathname === '/') {
                        window.scrollTo({ top: 0, behavior: 'smooth' })
                      } else {
                        router.push('/')
                      }
                    }}
                  >
                    Home
                  </button>
                  <button 
                    className="text-left text-xl text-gray-700 hover:text-[#963f36] transition-colors duration-200 py-2 border-b border-gray-100" 
                    onClick={() => { 
                      setIsOpen(false)
                      navigateToSection('cta')
                    }}
                  >
                    About Us
                  </button>
                  <button 
                    className="text-left text-xl text-gray-700 hover:text-[#963f36] transition-colors duration-200 py-2 border-b border-gray-100" 
                    onClick={() => { 
                      setIsOpen(false)
                      navigateToSection('services')
                    }}
                  >
                    Services
                  </button>
                 
                  <button 
                    className="text-left text-xl text-gray-700 hover:text-[#963f36] transition-colors duration-200 py-2 border-b border-gray-100" 
                    onClick={() => { 
                      setIsOpen(false)
                      navigateToSection('contact')
                    }}
                  >
                    Contact
                  </button>
                </div>
              </nav>
              
              {/* Mobile CTA */}
              <div className="p-6 border-t border-gray-200">
                <Button className="w-full bg-[#963f36] text-white px-6 py-4 rounded-lg hover:bg-[#9e6058] transition-colors font-helvetica font-regular text-lg">
                  BOOK APPOINTMENT
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Search Bar - Appears below navigation when opened */}
      {isSearchOpen && (
        <div className={`w-full bg-white border-t border-gray-200 px-4 py-3 ${
          isNavSticky ? 'fixed top-16 left-0 right-0 z-40 shadow-md' : 'relative'
        }`}>
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for dental services..."
                className="w-full h-10 md:h-12 pl-4 pr-12 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm md:text-base"
                autoFocus
              />
              <button 
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full transition-colors"
                onClick={() => setIsSearchOpen(false)}
                aria-label="Close search"
              >
                <X className="h-4 w-4 md:h-5 md:w-5" />
              </button>
            </div>
            
            {/* Search Suggestions */}
            <div className="mt-3 md:mt-4">
              <p className="text-xs md:text-sm text-gray-500 mb-2">Popular searches:</p>
              <div className="flex flex-wrap gap-2">
                <button className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-xs md:text-sm text-gray-700 transition-colors">
                  Teeth Cleaning
                </button>
                <button className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-xs md:text-sm text-gray-700 transition-colors">
                  Dental Implants
                </button>
                <button className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-xs md:text-sm text-gray-700 transition-colors">
                  Teeth Whitening
                </button>
                <button className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-xs md:text-sm text-gray-700 transition-colors">
                  Orthodontics
                </button>
                <button className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-xs md:text-sm text-gray-700 transition-colors">
                  Emergency Care
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}