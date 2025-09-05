"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function FAQs() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const leftColumnRef = useRef<HTMLDivElement>(null);
  const rightColumnRef = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(2); // Start with one item open

  const faqs = [
    // Left Column
    {
      question: "What makes Dr. Samiullah's clinic different from my dentist?",
      answer: "Our clinic combines advanced dental technology with personalized care. We use state-of-the-art equipment, offer same-day treatments, and provide a comfortable, anxiety-free environment. Dr. Samiullah has over 15 years of experience and stays updated with the latest dental techniques."
    },
    {
      question: "What's your late/cancellation policy?",
      answer: "Cancellations or reschedules within 24 hours of your appointment will incur the full cost of your appointment to your card on file. However, if you reschedule and complete a new appointment within 7 days, the rescheduled appointment cost will be discounted by 50%. We have a 5-minute grace period for late appointments - please be sure to fill out your forms before heading in so check-in can be a breeze."
    },
    {
      question: "What if I have crowns, veneers, or composites?",
      answer: "We can work with all types of dental restorations. Our whitening treatments are safe for crowns and veneers, though they won't change color. For composite fillings, we can discuss replacement options if needed. Dr. Samiullah will assess your specific situation and recommend the best approach."
    },
    {
      question: "How long does the teeth whitening effect last after a session?",
      answer: "Professional teeth whitening results typically last 6-12 months, depending on your lifestyle habits. To maintain results, avoid staining foods and drinks, quit smoking, and maintain good oral hygiene. We offer touch-up treatments and maintenance products to help prolong your results."
    },
    {
      question: "What results should I expect from teeth whitening?",
      answer: "Most patients see 2-8 shades of improvement in just one session. Results vary based on your starting shade and tooth type. We use professional-grade whitening agents that are more effective than over-the-counter products. Dr. Samiullah will discuss realistic expectations during your consultation."
    },
    {
      question: "Does Dr. Samiullah perform SRPs?",
      answer: "Yes, we perform Scaling and Root Planing (SRP) procedures for patients with gum disease. This deep cleaning treatment removes plaque and tartar from below the gum line and smooths root surfaces to promote healing. We use advanced techniques to ensure comfort during the procedure."
    },
    // Right Column
    {
      question: "Do you take insurance, HSA or FSA?",
      answer: "Yes, we accept most major dental insurance plans and work with HSA and FSA accounts. Our team will help you understand your coverage and maximize your benefits. We also offer flexible payment plans and financing options for treatments not covered by insurance."
    },
    {
      question: "Is teeth whitening safe?",
      answer: "Professional teeth whitening is very safe when performed by a qualified dentist. We use FDA-approved whitening agents and take precautions to protect your gums and soft tissues. Some patients may experience temporary sensitivity, which usually resolves within 24-48 hours."
    },
    {
      question: "Should I get a cleaning before I get my teeth whitened?",
      answer: "Yes, we recommend a professional cleaning before whitening to remove surface stains and ensure optimal results. Clean teeth allow the whitening gel to penetrate more effectively. We can schedule both treatments on the same day for your convenience."
    },
    {
      question: "If my teeth are sensitive after whitening, how long will it last?",
      answer: "Tooth sensitivity after whitening is common and usually lasts 24-48 hours. We provide desensitizing treatments and recommend using sensitivity toothpaste. If sensitivity persists beyond a few days, please contact our office for evaluation."
    },
    {
      question: "What happens if I have a cavity or another type of dental issue?",
      answer: "We'll address any dental issues before whitening to ensure your oral health. Small cavities can often be filled the same day, while larger issues may require separate appointments. Dr. Samiullah will create a comprehensive treatment plan tailored to your needs."
    }
  ];

  useEffect(() => {
    if (typeof window !== "undefined" && window.gsap && (window as any).ScrollTrigger) {
      const { gsap } = window
      const ScrollTrigger = (window as any).ScrollTrigger

      // Initial state - hide section
      gsap.set(sectionRef.current, { opacity: 0, y: 50 })

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

      // Animate title
      gsap.fromTo(
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

      // Animate left column
      gsap.fromTo(
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
      )

      // Animate right column
      gsap.fromTo(
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
      )
    }
  }, []);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const leftColumnFAQs = faqs.slice(0, 6);
  const rightColumnFAQs = faqs.slice(6);

  return (
    <section ref={sectionRef} className="py-20" style={{ backgroundColor: "#faf9f7" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div ref={titleRef} className="mb-16">
          <h2 className="text-5xl md:text-6xl font-regular mb-4" style={{ color: "#963f36" }}>
            FAQs
            </h2>
          </div>

        {/* Two Column Layout */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
          {/* Left Column */}
          <div ref={leftColumnRef} className="space-y-0">
            {leftColumnFAQs.map((faq, index) => (
              <div key={index} className="border-b border-gray-200 py-4">
                <button
                  className="w-full text-left flex justify-between items-center group"
                  onClick={() => toggleFAQ(index)}
                >
                  <span className="text-gray-800 text-lg font-normal pr-4">
                    {faq.question}
                  </span>
                  <span className="text-gray-800 text-2xl font-light flex-shrink-0">
                    {openIndex === index ? '−' : '+'}
                  </span>
                </button>
                {openIndex === index && (
                  <div className="mt-4 pr-8">
                    <p className="text-gray-700 text-sm leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right Column */}
          <div ref={rightColumnRef} className="space-y-0">
            {rightColumnFAQs.map((faq, index) => (
              <div key={index + 6} className="border-b border-gray-200 py-4">
                <button
                  className="w-full text-left flex justify-between items-center group"
                  onClick={() => toggleFAQ(index + 6)}
                >
                  <span className="text-gray-800 text-lg font-normal pr-4">
                    {faq.question}
                  </span>
                  <span className="text-gray-800 text-2xl font-light flex-shrink-0">
                    {openIndex === index + 6 ? '−' : '+'}
                  </span>
                </button>
                {openIndex === index + 6 && (
                  <div className="mt-4 pr-8">
                    <p className="text-gray-700 text-sm leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
