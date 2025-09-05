"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useEffect, useRef } from "react";

export default function ServicesPage() {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const play = () => {
    const frame = iframeRef.current;
    if (!frame) return;
    frame.contentWindow?.postMessage(
      JSON.stringify({ event: "command", func: "playVideo", args: [] }),
      "*"
    );
  };

  const pause = () => {
    const frame = iframeRef.current;
    if (!frame) return;
    frame.contentWindow?.postMessage(
      JSON.stringify({ event: "command", func: "pauseVideo", args: [] }),
      "*"
    );
  };

  useEffect(() => {
    // Ensure the player is ready; no-op here since YouTube processes postMessage queue
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero */}
      <section className="pt-12 pb-12 bg-[#faf9f7]">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
          <div className="rounded-2xl overflow-hidden shadow-sm">
            <img
              src="/services/whitening.jpg"
              alt="Our Dental Services"
              className="w-full h-[260px] md:h-[420px] object-cover"
            />
          </div>
          <h1 className="mt-8 text-3xl md:text-5xl font-light text-black">Our Services</h1>
          <p className="mt-4 text-gray-600 max-w-3xl">
            Explore our comprehensive range of treatments—from preventive care and cosmetic enhancements to restorative solutions—tailored to your unique smile goals.
          </p>
        </div>
      </section>

      {/* Info & Instructions */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 grid md:grid-cols-2 gap-10">
          <div>
            <h2 className="text-2xl md:text-3xl font-light text-black mb-4">What to Expect</h2>
            <p className="text-gray-700 leading-relaxed">
              At your visit, we begin with a friendly consultation, followed by a thorough evaluation. We explain options clearly, focusing on comfort and outcomes. Treatments are designed to be gentle, efficient, and effective.
            </p>
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-light text-black mb-4">Before Your Appointment</h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li>Arrive a few minutes early to complete or review forms.</li>
              <li>Share any concerns, sensitivities, or medical updates.</li>
              <li>Brush and floss prior to your visit for optimal evaluation.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* More Details & Instructions */}
      <section className="py-6">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 grid md:grid-cols-2 gap-10">
          <div>
            <h3 className="text-xl md:text-2xl font-light text-black mb-3">Detailed Instructions</h3>
            <ol className="list-decimal pl-5 space-y-2 text-gray-700">
              <li>Confirm your medical history and current medications with our team.</li>
              <li>Avoid highly pigmented foods and drinks 24 hours before whitening.</li>
              <li>If you experience sensitivity, let us know—we have gentle options.</li>
              <li>Plan 60–90 minutes for most cosmetic or restorative visits.</li>
            </ol>
          </div>
          <div>
            <h3 className="text-xl md:text-2xl font-light text-black mb-3">Aftercare</h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li>Use a soft-bristle brush and non-abrasive toothpaste for 48 hours.</li>
              <li>Rinse with fluoride mouthwash daily to strengthen enamel.</li>
              <li>Schedule recommended follow-ups to maintain results.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Dummy Service (Placeholder) */}
      <section className="py-12 bg-[#faf9f7]">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
          <h2 className="text-2xl md:text-3xl font-light text-black mb-6">Featured: Dummy Service</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="rounded-2xl overflow-hidden shadow-sm">
              <img
                src="/services/whitening.jpg"
                alt="Dummy Service"
                className="w-full h-64 object-cover"
              />
            </div>
            <div className="flex flex-col justify-center">
              <p className="text-gray-700 leading-relaxed mb-4">
                This is a placeholder service used to demonstrate layout and content structure. Replace this with the real service details when ready.
              </p>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>Overview of what the service includes.</li>
                <li>Ideal candidates and expected outcomes.</li>
                <li>Preparation steps and recovery notes.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* YouTube - plays on hover */}
      <section className="py-12">
        <div className="max-w-5xl mx-auto px-4 md:px-8 lg:px-12">
          <div
            className="relative rounded-2xl overflow-hidden shadow-lg aspect-video bg-black"
            onMouseEnter={play}
            onMouseLeave={pause}
            onClick={play}
          >
            <iframe
              ref={iframeRef}
              className="w-full h-full"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?enablejsapi=1&mute=1&rel=0&controls=1"
              title="Services Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
            <div className="pointer-events-none absolute inset-0 ring-1 ring-black/5" />
          </div>
          <p className="text-center text-sm text-gray-500 mt-3">Hover or tap to play.</p>
        </div>
      </section>

      <Footer />
    </div>
  );
}


