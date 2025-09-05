"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useRef } from "react";

export default function BlogPage() {
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

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero */}
      <section className="pt-12 pb-12 bg-[#faf9f7]">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
          <div className="rounded-2xl overflow-hidden shadow-sm">
            <img
              src="/services/whitening.jpg"
              alt="Dental Blog Insights"
              className="w-full h-[260px] md:h-[420px] object-cover"
            />
          </div>
          <h1 className="mt-8 text-3xl md:text-5xl font-light text-black">Our Blog</h1>
          <p className="mt-4 text-gray-600 max-w-3xl">
            Practical guides, expert tips, and friendly advice to help you care for your smile every day.
          </p>
        </div>
      </section>

      {/* Info */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 grid md:grid-cols-2 gap-10">
          <div>
            <h2 className="text-2xl md:text-3xl font-light text-black mb-4">What You&apos;ll Find</h2>
            <p className="text-gray-700 leading-relaxed">
              We cover oral hygiene routines, treatment expectations, recovery steps, and lifestyle tips that keep your teeth healthy and bright.
            </p>
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-light text-black mb-4">How To Use</h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li>Browse recent posts for quick takeaways.</li>
              <li>Save favorites to discuss during your next appointment.</li>
              <li>Send topics you want covered—we love suggestions.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Detailed Blog: Top Tips For A Brighter Smile */}
      <section className="py-6">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
          <article className="prose prose-gray max-w-none">
            <h2 className="text-2xl md:text-3xl font-light text-black mb-4">Top Tips For A Brighter Smile</h2>
            <p className="text-gray-700">A naturally brighter smile comes from consistent, gentle care. These dentist-approved tips are simple to follow and deliver real results.</p>
            <ol className="list-decimal pl-5 space-y-2 text-gray-700 mt-4">
              <li>Use a soft-bristle brush twice daily and replace it every 3 months.</li>
              <li>Floss nightly to remove plaque where brushes can’t reach.</li>
              <li>Rinse with fluoride to strengthen enamel and prevent decay.</li>
              <li>Limit dark beverages; drink through a straw and rinse with water after.</li>
              <li>Eat crunchy fruits and veggies—natural polishers that stimulate saliva.</li>
              <li>Schedule professional cleanings every 6 months for stain removal.</li>
              <li>Consider in-office whitening for safe, fast, and predictable results.</li>
            </ol>
            <p className="text-gray-700 mt-4">Consistency is the secret. Small habits, practiced daily, create lasting brightness without sensitivity.</p>
          </article>
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
              title="Blog Video"
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


