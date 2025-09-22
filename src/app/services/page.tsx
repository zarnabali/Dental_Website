"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";

type ServiceData = {
  _id: string;
  cardInfo: {
    title: string;
    description: string;
    image: {
      public_id: string;
      url: string;
    };
  };
  serviceBlog: {
    heroImage: {
      public_id: string;
      url: string;
    };
    title: string;
    description: string;
    paras: Array<{
      heading: string;
      content: string;
    }>;
    pointParas: Array<{
      heading: string;
      sentences: string[];
    }>;
    youtubeLinks: string[];
  };
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export default function ServicesPage() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const searchParams = useSearchParams();
  const [serviceData, setServiceData] = useState<ServiceData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const dataParam = searchParams.get('data');
    if (dataParam) {
      try {
        const decodedData = JSON.parse(decodeURIComponent(dataParam));
        setServiceData(decodedData);
        console.log('Service data loaded:', decodedData);
      } catch (error) {
        console.error('Error parsing service data:', error);
      }
    }
    setLoading(false);
  }, [searchParams]);

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

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#963f36] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading service content...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero */}
      <section className="pt-12 pb-12 bg-[#faf9f7]">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
          <div className="rounded-2xl overflow-hidden shadow-sm">
            <img
              src={serviceData?.serviceBlog?.heroImage?.url || serviceData?.cardInfo?.image?.url || "/services/whitening.jpg"}
              alt={serviceData?.serviceBlog?.title || "Our Dental Services"}
              className="w-full h-[260px] md:h-[420px] object-cover"
            />
          </div>
          <h1 className="mt-8 text-3xl md:text-5xl font-light text-black">
            {serviceData?.serviceBlog?.title || serviceData?.cardInfo?.title || "Our Services"}
          </h1>
          <p className="mt-4 text-gray-600 max-w-3xl">
            {serviceData?.serviceBlog?.description || serviceData?.cardInfo?.description || "Explore our comprehensive range of treatments—from preventive care and cosmetic enhancements to restorative solutions—tailored to your unique smile goals."}
          </p>
        </div>
      </section>

      {/* Info & Instructions */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 grid md:grid-cols-2 gap-10">
          <div>
            <h2 className="text-2xl md:text-3xl font-light text-black mb-4">What to Expect</h2>
            <p className="text-gray-700 leading-relaxed">
              {serviceData?.serviceBlog?.description || "At your visit, we begin with a friendly consultation, followed by a thorough evaluation. We explain options clearly, focusing on comfort and outcomes. Treatments are designed to be gentle, efficient, and effective."}
            </p>
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-light text-black mb-4">Key Benefits</h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              {serviceData?.serviceBlog?.pointParas?.[0]?.sentences?.map((sentence, index) => (
                <li key={index}>{sentence}</li>
              )) || [
                "Arrive a few minutes early to complete or review forms.",
                "Share any concerns, sensitivities, or medical updates.",
                "Brush and floss prior to your visit for optimal evaluation."
              ].map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* More Details & Instructions */}
      <section className="py-6">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 grid md:grid-cols-2 gap-10">
          <div>
            <h3 className="text-xl md:text-2xl font-light text-black mb-3">Service Details</h3>
            {serviceData?.serviceBlog?.paras?.map((para, index) => (
              <div key={index} className="mb-4">
                <h4 className="text-lg font-medium text-black mb-2">{para.heading}</h4>
                <p className="text-gray-700 leading-relaxed">{para.content}</p>
              </div>
            )) || (
              <ol className="list-decimal pl-5 space-y-2 text-gray-700">
                <li>Confirm your medical history and current medications with our team.</li>
                <li>Avoid highly pigmented foods and drinks 24 hours before whitening.</li>
                <li>If you experience sensitivity, let us know—we have gentle options.</li>
                <li>Plan 60–90 minutes for most cosmetic or restorative visits.</li>
              </ol>
            )}
          </div>
          <div>
            <h3 className="text-xl md:text-2xl font-light text-black mb-3">Process & Benefits</h3>
            {serviceData?.serviceBlog?.pointParas?.map((pointPara, index) => (
              <div key={index} className="mb-4">
                <h4 className="text-lg font-medium text-black mb-2">{pointPara.heading}</h4>
                <ul className="list-disc pl-5 space-y-1 text-gray-700">
                  {pointPara.sentences.map((sentence, sentenceIndex) => (
                    <li key={sentenceIndex}>{sentence}</li>
                  ))}
                </ul>
              </div>
            )) || (
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>Use a soft-bristle brush and non-abrasive toothpaste for 48 hours.</li>
                <li>Rinse with fluoride mouthwash daily to strengthen enamel.</li>
                <li>Schedule recommended follow-ups to maintain results.</li>
              </ul>
            )}
          </div>
        </div>
      </section>

      {/* Featured Service */}
      <section className="py-12 bg-[#faf9f7]">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
          <h2 className="text-2xl md:text-3xl font-light text-black mb-6">
            Featured: {serviceData?.cardInfo?.title || "Dental Service"}
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="rounded-2xl overflow-hidden shadow-sm">
              <img
                src={serviceData?.cardInfo?.image?.url || "/services/whitening.jpg"}
                alt={serviceData?.cardInfo?.title || "Dental Service"}
                className="w-full h-64 object-cover"
              />
            </div>
            <div className="flex flex-col justify-center">
              <p className="text-gray-700 leading-relaxed mb-4">
                {serviceData?.cardInfo?.description || "This is a placeholder service used to demonstrate layout and content structure. Replace this with the real service details when ready."}
              </p>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                {serviceData?.serviceBlog?.pointParas?.[0]?.sentences?.slice(0, 3).map((sentence, index) => (
                  <li key={index}>{sentence}</li>
                )) || [
                  "Overview of what the service includes.",
                  "Ideal candidates and expected outcomes.",
                  "Preparation steps and recovery notes."
                ].map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* YouTube Videos */}
      {serviceData?.serviceBlog?.youtubeLinks && serviceData.serviceBlog.youtubeLinks.length > 0 && (
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
            <h2 className="text-2xl md:text-3xl font-light text-black mb-8 text-center">Related Videos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {serviceData.serviceBlog.youtubeLinks.map((link, index) => {
                // Extract video ID from various YouTube URL formats
                const getVideoId = (url: string) => {
                  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/);
                  return match ? match[1] : null;
                };
                
                const videoId = getVideoId(link);
                if (!videoId) return null;
                
                return (
                  <div key={index} className="relative">
                    <div
                      className="relative rounded-2xl overflow-hidden shadow-lg aspect-video bg-black group cursor-pointer"
                      onMouseEnter={() => {
                        const iframe = document.getElementById(`service-video-${index}`) as HTMLIFrameElement;
                        if (iframe) {
                          iframe.contentWindow?.postMessage(
                            JSON.stringify({ event: "command", func: "playVideo", args: [] }),
                            "*"
                          );
                        }
                      }}
                      onMouseLeave={() => {
                        const iframe = document.getElementById(`service-video-${index}`) as HTMLIFrameElement;
                        if (iframe) {
                          iframe.contentWindow?.postMessage(
                            JSON.stringify({ event: "command", func: "pauseVideo", args: [] }),
                            "*"
                          );
                        }
                      }}
                      onClick={() => {
                        const iframe = document.getElementById(`service-video-${index}`) as HTMLIFrameElement;
                        if (iframe) {
                          iframe.contentWindow?.postMessage(
                            JSON.stringify({ event: "command", func: "playVideo", args: [] }),
                            "*"
                          );
                        }
                      }}
                    >
                      <iframe
                        id={`service-video-${index}`}
                        className="w-full h-full"
                        src={`https://www.youtube.com/embed/${videoId}?enablejsapi=1&mute=1&rel=0&controls=1`}
                        title={`Service Video ${index + 1}`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      />
                      <div className="pointer-events-none absolute inset-0 ring-1 ring-black/5" />
                      {/* Play overlay */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                          <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z"/>
                          </svg>
                        </div>
                      </div>
                    </div>
                    <p className="text-center text-sm text-gray-500 mt-2">Video {index + 1}</p>
                  </div>
                );
              })}
            </div>
            <p className="text-center text-sm text-gray-500 mt-6">Hover or tap to play videos.</p>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}


