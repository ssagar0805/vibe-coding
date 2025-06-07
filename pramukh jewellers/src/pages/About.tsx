
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative h-96 bg-gradient-to-br from-yellow-50 to-yellow-100 flex items-center">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-50"
          style={{
            backgroundImage: `url('/lovable-uploads/17f2c888-81c2-4ee8-9eac-fd7ba0bf89fb.png')`
          }}
        ></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-foreground mb-4">Our Story</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Since 1985, Pramukh Jewellers has been a beacon of trust and craftsmanship in the gold industry. Our journey, rooted in tradition and fueled by innovation, has seen us grow from a small family business to a renowned name, synonymous with quality and integrity.
            </p>
          </div>
        </div>
      </section>

      {/* Story Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-8">Our Heritage</h2>
            <p className="text-lg text-muted-foreground mb-6">
              Pramukh Jewellers is a family-owned business with a rich heritage in crafting exquisite gold jewellery. Our designs blend traditional artistry with contemporary styles, offering a diverse range of pieces to suit every occasion. We are committed to providing exceptional quality and personalized service to our valued customers.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-3">Our Mission</h3>
                  <p className="text-muted-foreground">
                    To create timeless jewelry pieces that celebrate life's precious moments while maintaining the highest standards of craftsmanship and customer service.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-3">Our Vision</h3>
                  <p className="text-muted-foreground">
                    To be the most trusted name in gold jewelry, known for our quality, innovation, and dedication to preserving traditional craftsmanship for future generations.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="text-4xl font-bold text-yellow-600 mb-2">39+</div>
                <p className="text-muted-foreground">Years of Excellence</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-yellow-600 mb-2">10,000+</div>
                <p className="text-muted-foreground">Happy Customers</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-yellow-600 mb-2">500+</div>
                <p className="text-muted-foreground">Unique Designs</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
