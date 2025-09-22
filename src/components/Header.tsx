"use client"

import Link from "next/link"
import Image from "next/image"
import { Search, ShoppingBag, Menu, X } from 'lucide-react'
import { useState, useEffect } from "react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"

export default function Header() {
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
              src="/logo2.png"
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
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-gray-700 hover:text-blue-600 transition-colors"
          >
            Home
          </button>
          <button
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
            className="text-gray-700 hover:text-[#74886f] transition-colors"
          >
            About Us
          </button>
          <button
            onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
            className="text-gray-700 hover:text-[#74886f] transition-colors"
          >
            Services
          </button>
          <button
            onClick={() => document.getElementById('blogs')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
            className="text-gray-700 hover:text-[#74886f] transition-colors"
          >
            Blogs
          </button>
          <Link
            href="/contact"
            className="text-gray-700 hover:text-[#74886f] transition-colors"
          >
            Contact
          </Link>
          <Button 
            className="bg-[#963f36] text-white px-6 py-2 rounded-lg hover:bg-[#9e6058] transition-colors font-helvetica font-regular"
            onClick={() => {
              const contactSection = document.getElementById('contact');
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
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
                    className="text-left text-xl text-gray-700 hover:text-blue-600 transition-colors py-2 border-b border-gray-100" 
                    onClick={() => { setIsOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
                  >
                    Home
                  </button>
                  <Link 
                    href="#about" 
                    className="text-xl text-gray-700 hover:text-blue-600 transition-colors py-2 border-b border-gray-100" 
                    onClick={(e) => { e.preventDefault(); setIsOpen(false); document.getElementById('about')?.scrollIntoView({ behavior: 'smooth', block: 'start' }) }}
                  >
                    About Us
                  </Link>
                  <Link 
                    href="#services" 
                    className="text-xl text-gray-700 hover:text-blue-600 transition-colors py-2 border-b border-gray-100" 
                    onClick={(e) => { e.preventDefault(); setIsOpen(false); document.getElementById('services')?.scrollIntoView({ behavior: 'smooth', block: 'start' }) }}
                  >
                    Services
                  </Link>
                  <Link 
                    href="#blogs" 
                    className="text-xl text-gray-700 hover:text-blue-600 transition-colors py-2 border-b border-gray-100" 
                    onClick={(e) => { e.preventDefault(); setIsOpen(false); document.getElementById('blogs')?.scrollIntoView({ behavior: 'smooth', block: 'start' }) }}
                  >
                    Blogs
                  </Link>
                  <Link 
                    href="/contact" 
                    className="text-xl text-gray-700 hover:text-blue-600 transition-colors py-2 border-b border-gray-100" 
                    onClick={() => setIsOpen(false)}
                  >
                    Contact
                  </Link>
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