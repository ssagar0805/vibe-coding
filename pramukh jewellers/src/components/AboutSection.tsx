
const AboutSection = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-yellow-50 to-yellow-100">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <h2 className="text-4xl font-bold text-foreground mb-6">About Pramukh Jewellers</h2>
            <p className="text-muted-foreground text-lg mb-6">
              Pramukh Jewellers is a trusted name in the gold business, known for its quality craftsmanship and exceptional customer service. With a legacy spanning generations, we offer a wide range of gold jewelry to suit every taste and budget.
            </p>
            <p className="text-muted-foreground text-lg mb-6">
              Our bilingual website caters to both Gujarati and English-speaking customers, ensuring a seamless shopping experience for all.
            </p>
            <div className="grid grid-cols-2 gap-6 mt-8">
              <div>
                <h3 className="text-2xl font-bold text-yellow-600 mb-2">Since 1985</h3>
                <p className="text-muted-foreground">Years of trusted service</p>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-yellow-600 mb-2">10,000+</h3>
                <p className="text-muted-foreground">Happy customers</p>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="bg-gradient-to-br from-yellow-200 to-yellow-300 rounded-2xl p-8 transform rotate-3">
              <img
                src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Jewelry craftsmanship"
                className="w-full h-80 object-cover rounded-xl transform -rotate-3"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
