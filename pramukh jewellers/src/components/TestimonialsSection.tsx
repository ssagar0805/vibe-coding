
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    id: 1,
    name: "Priya Patel",
    review: "Excellent service and beautiful designs!",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108755-2616c4c1e0b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
  },
  {
    id: 2,
    name: "Rohan Shah",
    review: "Highly recommend Pramukh Jewellers for their quality and craftsmanship.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
  },
  {
    id: 3,
    name: "Neha Desai",
    review: "Very satisfied with my purchase. Will definitely buy again.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
  }
];

const TestimonialsSection = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">Customer Reviews</h2>
          <p className="text-muted-foreground text-lg">What our valued customers say about us</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h3 className="font-semibold text-foreground">{testimonial.name}</h3>
                    <div className="flex text-yellow-500">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <span key={i}>★</span>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground italic">"{testimonial.review}"</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Video Testimonials Section */}
        <div className="mt-16">
          <h3 className="text-3xl font-bold text-foreground text-center mb-8">Video Testimonials</h3>
          <div className="max-w-4xl mx-auto">
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="relative h-96 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="w-20 h-20 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4 cursor-pointer hover:bg-yellow-600 transition-colors">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 5v14l11-7z" fill="currentColor"/>
                      </svg>
                    </div>
                    <p className="text-lg">Watch customer testimonials</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
