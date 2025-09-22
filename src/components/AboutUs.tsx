"use client";

import { useEffect, useRef, useState } from "react";
import { api } from '@/lib/api';

interface Feature {
  id: number;
  featureName: string;
  featureDescription: string;
}

export default function AboutUs() {
  const aboutRef = useRef<HTMLDivElement>(null);
  const leftContentRef = useRef<HTMLDivElement>(null);
  const centerImageRef = useRef<HTMLDivElement>(null);
  const rightContentRef = useRef<HTMLDivElement>(null);
  const [features, setFeatures] = useState<Feature[]>([]);
  const [loading, setLoading] = useState(true);

  // Default features as fallback
  const defaultFeatures = [
    {
      id: 1,
      featureName: "Innovative Equipment",
      featureDescription: "We use cutting-edge technology for diagnosis and treatment, ensuring a high standard of medical care."
    },
    {
      id: 2,
      featureName: "Personalized Approach",
      featureDescription: "We Develop Customized Treatment And Care Plans, Fully Adapted To The Needs Of Each Patient."
    }
  ];

  // Fetch features from API
  useEffect(() => {
    const fetchFeatures = async () => {
      try {
        setLoading(true);
        console.log('Fetching features from API...');
        const response = await api.getFeatures();
        console.log('Features response:', response);
        
        if (response.success && response.data && response.data.length > 0) {
          console.log('Setting features data:', response.data);
          setFeatures(response.data);
        } else {
          console.log('No features data, using fallback');
          setFeatures(defaultFeatures);
        }
      } catch (error) {
        console.error('Error fetching features:', error);
        console.log('Using fallback features data');
        setFeatures(defaultFeatures);
      } finally {
        setLoading(false);
      }
    };

    fetchFeatures();
  }, []);

  useEffect(() => {
    // Simple fade-in animation without GSAP to avoid conflicts
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
        }
      });
    }, observerOptions);

    if (leftContentRef.current) observer.observe(leftContentRef.current);
    if (centerImageRef.current) observer.observe(centerImageRef.current);
    if (rightContentRef.current) observer.observe(rightContentRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style jsx>{`
        .animate-fade-in {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
                 .feature-card {
           backdrop-filter: blur(10px);
           background: rgba(150, 63, 54, 0.05);
           border: 1px solid rgba(150, 63, 54, 0.2);
         }
         
         .feature-icon {
           background: rgba(150, 63, 54, 0.1);
           border: 1px solid rgba(150, 63, 54, 0.3);
         }
      `}</style>
      
             <section id="about" className="py-16 md:py-24 bg-white text-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={aboutRef} className="grid lg:grid-cols-3 gap-8 lg:gap-12 items-start">
            
            {/* Left Column - Our Clinic Info */}
            <div ref={leftContentRef} className="space-y-8 opacity-0">
              <div>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-regular text-black mb-6 uppercase ">
                  OUR CLINIC
                </h2>
                <p className="text-lg md:text-xl text-gray-700 leading-relaxed font-light">
                  Modern treatments tailored to your unique needs ensure a comfortable, satisfying dental experience.
                </p>
              </div>

              {/* Feature Blocks */}
              <div className="space-y-6 mt-12">
                {loading ? (
                  <div className="flex items-center justify-center h-32">
                    <div className="w-8 h-8 border-4 border-[#963f36] border-t-transparent rounded-full animate-spin"></div>
                  </div>
                ) : (
                  features.map((feature, index) => (
                    <div key={feature.id} className="feature-card rounded-2xl p-6 hover:bg-opacity-20 transition-all duration-300">
                      <div className="flex items-start space-x-4">
                        <div className="feature-icon w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0">
                          <svg className="w-6 h-6" style={{ color: "#963f36" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {index === 0 ? (
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            ) : (
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            )}
                          </svg>
                        </div>
                        <div>
                          <h3 className="text-xl font-regular text-black mb-3">
                            {feature.featureName}
                          </h3>
                          <p className="text-gray-700 leading-relaxed font-light">
                            {feature.featureDescription}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Center Column - Clinic Image */}
            <div ref={centerImageRef} className="lg:order-2 opacity-0">
              <div className="relative">
                <div className="rounded-3xl overflow-hidden shadow-2xl">
                  <img 
                    src="/clinic.jpg" 
                    alt="Modern dental clinic interior"
                    className="w-full h-[400px] lg:h-[675px] object-cover"
                  />
                </div>
                {/* Subtle overlay for better text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-800/20 via-transparent to-transparent rounded-3xl"></div>
              </div>
            </div>

            {/* Right Column - Expert Care */}
            <div ref={rightContentRef} className="lg:order-3 space-y-8 opacity-0">
              <div className="text-left">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-regular text-black mb-6 uppercase ">
                  Expert Care
                </h2>
                <p className="text-lg md:text-xl text-gray-700 leading-relaxed font-light">
                  Our dedicated doctors continuously enhance their expertise to bring you the highest standard of dental services
                </p>
              </div>

              {/* Meet Our Team Button */}
              <div className="flex justify-start">
              <button 
                className="border-2 px-8 py-2 rounded-full font-medium text-lg transition-all duration-300 hover:scale-105 text-white"
                style={{ 
                  borderColor: "#963f36", 
                  color: "white",
                  backgroundColor: "#963f36"
                }}
                onClick={() => {
                  const teamsSection = document.getElementById('teams');
                  if (teamsSection) {
                    teamsSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "white";
                  e.currentTarget.style.color = "#963f36";
                  e.currentTarget.style.borderColor = "#963f36";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#963f36";
                  e.currentTarget.style.color = "white";
                  e.currentTarget.style.borderColor = "#963f36";
                }}
              >
                Meet our team
              </button>
              </div>

              {/* Dentist Image */}
              <div className="flex justify-end">
                <div className="relative">
                  <div className="rounded-3xl overflow-hidden shadow-2xl">
                    <img 
                      src="/dr_sami.jpg" 
                      alt="Dr. Samiullah - Dentist"
                      className="w-full max-w-sm h-80 object-cover"
                    />
                  </div>
                  {/* Professional overlay effect */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-800/30 via-transparent to-transparent rounded-3xl"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}