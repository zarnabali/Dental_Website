'use client';

import React, { useRef, useEffect, useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, Star } from 'lucide-react';
import { api } from '@/lib/api';

// Declare GSAP types for TypeScript
declare global {
  interface Window {
    gsap: typeof import('gsap');
    ScrollTrigger: typeof import('gsap/ScrollTrigger');
  }
}

export default function ContactUs() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const leftColumnRef = useRef<HTMLDivElement>(null);
  const rightColumnRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const [formData, setFormData] = useState({
    username: '',
    rating: 5,
    title: '',
    description: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [clinicInfo, setClinicInfo] = useState({
    name: "",
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
    timings: ""
  });
  const [loading, setLoading] = useState(true);

  // Google Maps embed URL (you can replace with actual coordinates)
  const mapEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.215331012345!2d-74.005941!3d40.712776!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQyJzQ2LjAiTiA3NMKwMDAnMjEuNCJX!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus";

  // Fetch clinic info from API
  useEffect(() => {
    const fetchClinicInfo = async () => {
      try {
        setLoading(true)
        console.log('Fetching clinic info from API...')
        const response = await api.getClinicInfo()
        console.log('Clinic info response:', response)
        
        if (response.success && response.data) {
          const data = response.data
          const clinicData = {
            name: data.name || "",
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
            timings: data.timings || ""
          }
          console.log('Setting clinic info:', clinicData)
          setClinicInfo(clinicData)
        } else {
          console.log('No clinic info data available')
        }
      } catch (error) {
        console.error('Error fetching clinic info:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchClinicInfo()
  }, [])

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.gsap &&
      window.ScrollTrigger
    ) {
      const gsapInstance = window.gsap;

      // Initial state - hide section
      gsapInstance.set(sectionRef.current, { opacity: 0, y: 50 });

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
      });

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
      );

      // Animate left column (clinic info)
      gsapInstance.fromTo(
        leftColumnRef.current,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: leftColumnRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      );

      // Animate right column (contact form)
      gsapInstance.fromTo(
        rightColumnRef.current,
        { opacity: 0, x: 30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: rightColumnRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      );

      // Animate map
      gsapInstance.fromTo(
        mapRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: mapRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Submit feedback to API
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/feedback`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          status: 'disable' // Set status to disable by default
        }),
      });
      
      const responseData = await response.json();
      
      if (responseData.success) {
        setIsSubmitted(true);
        // Reset form after 3 seconds
        setTimeout(() => {
          setIsSubmitted(false);
          setFormData({
            username: '',
            rating: 5,
            title: '',
            description: ''
          });
        }, 3000);
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
      // Still show success message for better UX
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          username: '',
          rating: 5,
          title: '',
          description: ''
        });
      }, 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section ref={sectionRef} id="contact" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
        {/* Main Title */}
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-normal mb-8" style={{ color: "#74886f" }}>
            Get In Touch
          </h2>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Ready to transform your smile? Contact us today to schedule your consultation and take the first step towards better dental health.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 mb-16">
          {/* Left Column - Clinic Information */}
          <div ref={leftColumnRef} className="space-y-8">
            <div>
              <h3 className="text-2xl md:text-3xl font-normal mb-6" style={{ color: "#963f36" }}>
                Visit Our Clinic
              </h3>
              <p className="text-gray-700 leading-relaxed mb-8">
                Our modern dental clinic is equipped with the latest technology and staffed by experienced professionals dedicated to providing exceptional dental care.
              </p>
            </div>

            {/* Contact Information Cards */}
            <div className="space-y-6">
              {/* Location 1 */}
              <div className="flex items-start space-x-4 p-6 rounded-2xl" style={{ backgroundColor: "#f8f9fa" }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "#963f36" }}>
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-lg font-medium text-black mb-2">Main Branch</h4>
                  <p className="text-gray-700 leading-relaxed mb-2">
                    {clinicInfo.location1.address}
                  </p>
                  <a 
                    href={clinicInfo.location1.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[#963f36] hover:underline text-sm font-medium"
                  >
                    View on Map →
                  </a>
                </div>
              </div>

              {/* Location 2 */}
              <div className="flex items-start space-x-4 p-6 rounded-2xl" style={{ backgroundColor: "#f8f9fa" }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "#963f36" }}>
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-lg font-medium text-black mb-2">Second Branch</h4>
                  <p className="text-gray-700 leading-relaxed mb-2">
                    {clinicInfo.location2.address}
                  </p>
                  <a 
                    href={clinicInfo.location2.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[#963f36] hover:underline text-sm font-medium"
                  >
                    View on Map →
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start space-x-4 p-6 rounded-2xl" style={{ backgroundColor: "#f8f9fa" }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "#963f36" }}>
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-lg font-medium text-black mb-2">Phone</h4>
                  <p className="text-gray-700">
                    <a href={`tel:${clinicInfo.phone}`} className="hover:underline">
                      {clinicInfo.phone}
                    </a>
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start space-x-4 p-6 rounded-2xl" style={{ backgroundColor: "#f8f9fa" }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "#963f36" }}>
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-lg font-medium text-black mb-2">Email</h4>
                  <p className="text-gray-700">
                    <a href={`mailto:${clinicInfo.email}`} className="hover:underline">
                      {clinicInfo.email}
                    </a>
                  </p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start space-x-4 p-6 rounded-2xl" style={{ backgroundColor: "#f8f9fa" }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "#963f36" }}>
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-medium text-black mb-2">Hours</h4>
                  <div className="text-gray-700">
                    {clinicInfo.timings ? (
                      <div className="whitespace-pre-line leading-relaxed">
                        {clinicInfo.timings.split('\n').map((line, index) => (
                          <p key={index} className={index > 0 ? 'mt-1' : ''}>
                            {line.trim()}
                          </p>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500">Hours not available</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Feedback Form */}
          <div ref={rightColumnRef}>
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
              <h3 className="text-2xl md:text-3xl font-normal mb-6" style={{ color: "#963f36" }}>
                Share Your Experience
              </h3>
              
              {isSubmitted ? (
                <div className="text-center py-12">
                  <CheckCircle className="w-16 h-16 mx-auto mb-4" style={{ color: "#74886f" }} />
                  <h4 className="text-xl font-medium text-black mb-2">Feedback Submitted!</h4>
                  <p className="text-gray-700">Thank you for sharing your experience with us.</p>
                </div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="username"
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                      required
                      maxLength={100}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-opacity-50 focus:outline-none transition-colors focus:ring-[#963f36] text-black"
                      style={{ 
                        borderColor: formData.username ? "#963f36" : "#d1d5db"
                      }}
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-2">
                      Rating *
                    </label>
                    <div className="flex space-x-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, rating: star }))}
                          className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-200 ${
                            star <= formData.rating 
                              ? 'text-yellow-400' 
                              : 'text-gray-300 hover:text-yellow-300'
                          }`}
                        >
                          <Star className="w-6 h-6 fill-current" />
                        </button>
                      ))}
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      {formData.rating === 1 && "Poor"}
                      {formData.rating === 2 && "Fair"}
                      {formData.rating === 3 && "Good"}
                      {formData.rating === 4 && "Very Good"}
                      {formData.rating === 5 && "Excellent"}
                    </p>
                  </div>

                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                      Feedback Title *
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      required
                      maxLength={200}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-opacity-50 focus:outline-none transition-colors focus:ring-[#963f36] text-black"
                      style={{ 
                        borderColor: formData.title ? "#963f36" : "#d1d5db"
                      }}
                      placeholder="Brief title for your feedback"
                    />
                  </div>

                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                      Your Experience *
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      required
                      maxLength={1000}
                      rows={5}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-opacity-50 focus:outline-none transition-colors resize-none focus:ring-[#963f36] text-black"
                      style={{ 
                        borderColor: formData.description ? "#963f36" : "#d1d5db"
                      }}
                      placeholder="Tell us about your experience with our dental services..."
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      {formData.description.length}/1000 characters
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 px-6 rounded-lg text-white font-medium transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90"
                    style={{ backgroundColor: "#963f36" }}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>Submit Feedback</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

      
      </div>
    </section>
  );
}
