"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { api } from "@/lib/api"

gsap.registerPlugin(ScrollTrigger)

interface TeamPicture {
  _id: string;
  teamName: string;
  description: string;
  picture: {
    public_id: string;
    url: string;
  };
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function Teams() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const [teamMembers, setTeamMembers] = useState([
    {
      id: 1,
      name: "Dr. Samiullah",
      position: "Chief Dental Surgeon",
      image: "",
      specialty: "General & Cosmetic Dentistry"
    },
    {
      id: 2,
      name: "Dr. Sarah Johnson",
      position: "Orthodontist",
      image: "",
      specialty: "Braces & Aligners"
    },
    {
      id: 3,
      name: "Dr. Michael Chen",
      position: "Oral Surgeon",
      image: "",
      specialty: "Dental Implants"
    },
  ])
  const [loading, setLoading] = useState(true)
  const [teamPicture, setTeamPicture] = useState<TeamPicture | null>(null)
  const [teamPictureLoading, setTeamPictureLoading] = useState(true)

  // Fetch team members from API
  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        setLoading(true)
        console.log('Fetching team members from API...')
        const response = await api.getTeam()
        console.log('Team response:', response)
        
        if (response.success && response.data && response.data.length > 0) {
          const teamData = response.data.map((item: { 
            _id?: string;
            id?: number; 
            name: string; 
            position?: string; 
            image: string | { public_id?: string; url: string } | undefined; 
            bio?: string; 
            experience?: string; 
            education?: string[]; 
            designation?: string; 
            speciality?: string 
          }, index: number) => {
            // Extract image URL - handle both string and object formats
            let imageUrl = "/dr_sami.jpg"; // default fallback
            if (item.image) {
              if (typeof item.image === 'string') {
                imageUrl = item.image;
              } else if (typeof item.image === 'object' && item.image.url) {
                imageUrl = item.image.url;
              }
            }
            
            return {
              id: index + 1,
              name: item.name || "Team Member",
              position: item.designation || item.position || "Dental Professional",
              image: imageUrl,
              specialty: item.speciality || "General Dentistry"
            };
          })
          console.log('Setting team data:', teamData)
          console.log('Raw API response data:', response.data)
          setTeamMembers(teamData)
        } else {
          console.log('No team data, using fallback')
          setTeamMembers([
            {
              id: 1,
              name: "Dr. Samiullah",
              position: "Chief Dental Surgeon",
              image: "/dr_sami.jpg",
              specialty: "General & Cosmetic Dentistry"
            },
            {
              id: 2,
              name: "Dr. Sarah Johnson",
              position: "Orthodontist",
              image: "/team/sarah.jpg",
              specialty: "Braces & Aligners"
            },
            {
              id: 3,
              name: "Dr. Michael Chen",
              position: "Oral Surgeon",
              image: "/team/michael.jpg",
              specialty: "Dental Implants"
            },
          ])
        }
      } catch (error) {
        console.error('Error fetching team members:', error)
        console.log('Using fallback team data')
        // Keep fallback data
      } finally {
        setLoading(false)
      }
    }

    fetchTeamMembers()
  }, [])

  // Fetch team picture from API
  useEffect(() => {
    const fetchTeamPicture = async () => {
      try {
        setTeamPictureLoading(true)
        console.log('Fetching team picture from API...')
        const response = await api.getTeamPictures()
        console.log('Team picture response:', response)
        
        if (response.success && response.data) {
          console.log('Setting team picture data:', response.data)
          setTeamPicture(response.data)
        } else {
          console.log('No team picture data found')
          setTeamPicture(null)
        }
      } catch (error) {
        console.error('Error fetching team picture:', error)
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        if (errorMessage.includes('404')) {
          console.log('No team picture found (404)')
        } else {
          console.log('API error:', errorMessage)
        }
        setTeamPicture(null)
      } finally {
        setTeamPictureLoading(false)
      }
    }

    fetchTeamPicture()
  }, [])

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      (window as unknown as { gsap?: typeof gsap; ScrollTrigger?: typeof ScrollTrigger }).gsap &&
      (window as unknown as { ScrollTrigger?: typeof ScrollTrigger }).ScrollTrigger
    ) {
      const gsapInstance = (window as unknown as { gsap: typeof gsap }).gsap

      // Initial state - hide elements
      gsapInstance.set([titleRef.current, cardsRef.current], { opacity: 0, y: 50 })

      // Animate title
      gsapInstance.to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      })

      // Animate cards with stagger
      gsapInstance.to(cardsRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      })

      // Animate individual cards
      const cards = cardsRef.current?.querySelectorAll('.team-card')
      if (cards) {
        gsapInstance.fromTo(cards, 
          { opacity: 0, y: 30, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 60%",
              toggleActions: "play none none reverse",
            },
          }
        )
      }
    }
  }, [])

  return (
    <section ref={sectionRef} id="teams" className="py-16 md:py-24 bg-[#faf9f7]">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 bg-[#faf9f7]">
        {/* Section Title */}
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-black mb-6 uppercase tracking-wider">
            Meet Our Team
          </h2>
          <div className="w-[30%] h-0.5 mx-auto mb-8" style={{ backgroundColor: "#963f36" }}></div>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Our experienced team of dental professionals is dedicated to providing you with the highest quality care and exceptional results.
          </p>
        </div>

        {/* Team Members Grid */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="team-card group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer"
              style={{ height: "400px" }}
              onMouseEnter={() => setHoveredCard(member.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <img
                  src={member.image || "/dr_sami.jpg"}
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 will-change-transform"
                  onError={(e) => {
                    console.error(`Failed to load image for ${member.name}:`, member.image)
                    if (e.currentTarget.src !== "/dr_sami.jpg") {
                      e.currentTarget.src = "/dr_sami.jpg"
                    }
                  }}
                />
                {/* Overlay */}
                <div
                  className="absolute inset-0 transition-opacity duration-500"
                  style={{
                    background: "linear-gradient(135deg, rgba(150, 63, 54, 0.8) 0%, rgba(150, 63, 54, 0.6) 100%)",
                    opacity: hoveredCard === member.id ? 0.9 : 0.5
                  }}
                ></div>
              </div>

              {/* Content */}
              <div className="relative z-10 h-full flex flex-col justify-end p-6 md:p-8">
                <div className="text-center">
                  <h3 className="text-white text-2xl md:text-3xl font-light mb-2 leading-tight">
                    {member.name}
                  </h3>
                  <p className="text-white text-sm md:text-base font-medium mb-2 opacity-90">
                    {member.position}
                  </p>
                  <p className="text-white text-xs md:text-sm opacity-80 leading-relaxed">
                    {member.specialty}
                  </p>
                </div>
              </div>

              {/* Hover Effect Overlay */}
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
            </div>
          ))}
        </div>

        {/* Team Picture Section */}
        {teamPicture && (
          <div className="mt-20">
            <div className="text-center mb-12">
              <h3 className="text-3xl md:text-4xl font-light text-black mb-4 uppercase tracking-wider">
                Our Team Together
              </h3>
              <div className="w-[20%] h-0.5 mx-auto mb-6" style={{ backgroundColor: "#963f36" }}></div>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
                {/* Team Picture */}
                <div className="relative">
                  <img
                    src={teamPicture.picture.url}
                    alt={teamPicture.teamName}
                    className="w-full h-96 md:h-[500px] object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "/dr_sami.jpg"
                    }}
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  
                  {/* Team Name Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                    <h4 className="text-3xl md:text-4xl lg:text-5xl font-light text-white mb-4">
                      {teamPicture.teamName}
                    </h4>
                    <p className="text-white/90 text-lg md:text-xl leading-relaxed max-w-2xl">
                      {teamPicture.description}
                    </p>
                  </div>

                  {/* Decorative Elements */}
                  <div className="absolute top-8 left-8 w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div className="absolute top-8 right-8 w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Loading state for team picture */}
        {teamPictureLoading && (
          <div className="mt-20">
            <div className="text-center mb-12">
              <h3 className="text-3xl md:text-4xl font-light text-black mb-4 uppercase tracking-wider">
                Our Team Together
              </h3>
              <div className="w-[20%] h-0.5 mx-auto mb-6" style={{ backgroundColor: "#963f36" }}></div>
            </div>
            <div className="flex items-center justify-center h-64">
              <div className="w-8 h-8 border-4 border-[#963f36] border-t-transparent rounded-full animate-spin"></div>
            </div>
          </div>
        )}
        
      </div>
    </section>
  )
}
