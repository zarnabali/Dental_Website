import Header from "@/components/Header";
import ContactUs from "@/components/ContactUs";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="mt-4">
        <ContactUs />
      </div>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
