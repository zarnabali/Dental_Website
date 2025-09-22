"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useRef, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

type BlogData = {
  _id: string;
  cardInfo: {
    title: string;
    description: string;
    image: {
      public_id: string;
      url: string;
    };
  };
  blogContent: {
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

export default function BlogPage() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const searchParams = useSearchParams();
  const [blogData, setBlogData] = useState<BlogData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const dataParam = searchParams.get('data');
    if (dataParam) {
      try {
        const decodedData = JSON.parse(decodeURIComponent(dataParam));
        setBlogData(decodedData);
        console.log('Blog data loaded:', decodedData);
      } catch (error) {
        console.error('Error parsing blog data:', error);
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
          <p className="text-gray-600">Loading blog content...</p>
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
              src={blogData?.blogContent?.heroImage?.url || blogData?.cardInfo?.image?.url || "/services/whitening.jpg"}
              alt={blogData?.blogContent?.title || "Dental Blog Insights"}
              className="w-full h-[260px] md:h-[420px] object-cover"
            />
          </div>
          <h1 className="mt-8 text-3xl md:text-5xl font-light text-black">
            {blogData?.blogContent?.title || blogData?.cardInfo?.title || "Our Blog"}
          </h1>
          <p className="mt-4 text-gray-600 max-w-3xl">
            {blogData?.blogContent?.description || blogData?.cardInfo?.description || "Practical guides, expert tips, and friendly advice to help you care for your smile every day."}
          </p>
        </div>
      </section>

      {/* Info */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 grid md:grid-cols-2 gap-10">
          <div>
            <h2 className="text-2xl md:text-3xl font-light text-black mb-4">What You&apos;ll Find</h2>
            <p className="text-gray-700 leading-relaxed">
              {blogData?.blogContent?.description || "We cover oral hygiene routines, treatment expectations, recovery steps, and lifestyle tips that keep your teeth healthy and bright."}
            </p>
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-light text-black mb-4">Key Topics</h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              {blogData?.blogContent?.paras?.slice(0, 3).map((para, index) => (
                <li key={index}>{para.heading}</li>
              )) || [
                "Browse recent posts for quick takeaways.",
                "Save favorites to discuss during your next appointment.",
                "Send topics you want covered—we love suggestions."
              ].map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Detailed Blog Content */}
      <section className="py-6">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
          <article className="prose prose-gray max-w-none">
            <h2 className="text-2xl md:text-3xl font-light text-black mb-4">
              {blogData?.blogContent?.title || "Top Tips For A Brighter Smile"}
            </h2>
            <p className="text-gray-700">
              {blogData?.blogContent?.description || "A naturally brighter smile comes from consistent, gentle care. These dentist-approved tips are simple to follow and deliver real results."}
            </p>
            
            {/* Dynamic paragraphs */}
            {blogData?.blogContent?.paras?.map((para, index) => (
              <div key={index} className="mt-6">
                <h3 className="text-xl md:text-2xl font-light text-black mb-3">{para.heading}</h3>
                <p className="text-gray-700 leading-relaxed">{para.content}</p>
              </div>
            )) || (
              <ol className="list-decimal pl-5 space-y-2 text-gray-700 mt-4">
                <li>Use a soft-bristle brush twice daily and replace it every 3 months.</li>
                <li>Floss nightly to remove plaque where brushes can't reach.</li>
                <li>Rinse with fluoride to strengthen enamel and prevent decay.</li>
                <li>Limit dark beverages; drink through a straw and rinse with water after.</li>
                <li>Eat crunchy fruits and veggies—natural polishers that stimulate saliva.</li>
                <li>Schedule professional cleanings every 6 months for stain removal.</li>
                <li>Consider in-office whitening for safe, fast, and predictable results.</li>
              </ol>
            )}

            {/* Point paragraphs */}
            {blogData?.blogContent?.pointParas?.map((pointPara, index) => (
              <div key={index} className="mt-6">
                <h3 className="text-xl md:text-2xl font-light text-black mb-3">{pointPara.heading}</h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  {pointPara.sentences.map((sentence, sentenceIndex) => (
                    <li key={sentenceIndex}>{sentence}</li>
                  ))}
                </ul>
              </div>
            ))}

            <p className="text-gray-700 mt-4">
              {blogData?.blogContent?.description || "Consistency is the secret. Small habits, practiced daily, create lasting brightness without sensitivity."}
            </p>
          </article>
        </div>
      </section>

      {/* YouTube Videos */}
      {blogData?.blogContent?.youtubeLinks && blogData.blogContent.youtubeLinks.length > 0 && (
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
            <h2 className="text-2xl md:text-3xl font-light text-black mb-8 text-center">Related Videos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogData.blogContent.youtubeLinks.map((link, index) => {
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
                        const iframe = document.getElementById(`blog-video-${index}`) as HTMLIFrameElement;
                        if (iframe) {
                          iframe.contentWindow?.postMessage(
                            JSON.stringify({ event: "command", func: "playVideo", args: [] }),
                            "*"
                          );
                        }
                      }}
                      onMouseLeave={() => {
                        const iframe = document.getElementById(`blog-video-${index}`) as HTMLIFrameElement;
                        if (iframe) {
                          iframe.contentWindow?.postMessage(
                            JSON.stringify({ event: "command", func: "pauseVideo", args: [] }),
                            "*"
                          );
                        }
                      }}
                      onClick={() => {
                        const iframe = document.getElementById(`blog-video-${index}`) as HTMLIFrameElement;
                        if (iframe) {
                          iframe.contentWindow?.postMessage(
                            JSON.stringify({ event: "command", func: "playVideo", args: [] }),
                            "*"
                          );
                        }
                      }}
                    >
                      <iframe
                        id={`blog-video-${index}`}
                        className="w-full h-full"
                        src={`https://www.youtube.com/embed/${videoId}?enablejsapi=1&mute=1&rel=0&controls=1`}
                        title={`Blog Video ${index + 1}`}
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


