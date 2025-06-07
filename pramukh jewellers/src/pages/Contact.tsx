
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ContactSection from "@/components/ContactSection";

const Contact = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-yellow-50 to-yellow-100">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold text-foreground mb-4">Contact Us</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We're here to help you find the perfect piece of jewelry. Get in touch with us today!
          </p>
        </div>
      </section>

      <ContactSection />
      <Footer />
    </div>
  );
};

export default Contact;
