
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="relative h-[70vh] bg-gradient-to-br from-yellow-50 to-yellow-100 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
      
      {/* Hero Image Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`
        }}
      ></div>

      <div className="relative container mx-auto px-4 h-full flex items-center">
        <div className="max-w-2xl text-center mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 animate-fade-in">
            Pramukh Jewellers
          </h1>
          <p className="text-xl text-white/90 mb-8 animate-fade-in">
            Where Tradition Meets Modernity
          </p>
          <Button 
            size="lg" 
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-8 py-3 animate-scale-in"
          >
            Explore Our Collection
          </Button>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent"></div>
    </section>
  );
};

export default HeroSection;
