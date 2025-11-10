import Header from "@/components/Header";
import VideoHero from "@/components/VideoHero";
import BeforeAfterSection from "@/components/BeforeAfter";
import AboutUs from "@/components/AboutUs";
import Services from "@/components/Services";
import WhyChooseUs from "@/components/WhyChooseUs";
import FeaturedIn from "@/components/FeaturedIn";
import Blogs from "@/components/Blogs";
import Teams from "@/components/Teams";
import Feedback from "@/components/Feedback";
import CTA from "@/components/CTA";

import ContactUs from "@/components/ContactUs";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />      
      {/* Video Hero Section */}
      <div className="mt-4">
        <Hero />
      </div>
      
     
      <CTA />
      

       {/* Services Section */}
       <Services />

       
       {/* Before After Section */}
       <BeforeAfterSection />
       
       
       
       
       {/* Featured In Section */}
       <FeaturedIn />
       
       {/* Teams Section */}
       <Teams />
       
       <Feedback />
       
      
      {/* Contact Us Section */}
      <ContactUs />
      <Footer />
      <ScrollToTop />
    </div>
  );
}