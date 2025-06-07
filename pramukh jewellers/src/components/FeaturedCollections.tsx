
import { Card, CardContent } from "@/components/ui/card";

const collections = [
  {
    id: 1,
    name: "Necklaces",
    description: "Elegant gold necklaces for every occasion",
    image: "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    color: "from-yellow-100 to-yellow-200"
  },
  {
    id: 2,
    name: "Earrings",
    description: "Stunning gold earrings to complement your style",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    color: "from-gray-900 to-black"
  },
  {
    id: 3,
    name: "Rings",
    description: "Beautiful gold rings to cherish forever",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    color: "from-yellow-100 to-yellow-200"
  },
  {
    id: 4,
    name: "Bangles",
    description: "Traditional and modern gold bangles",
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    color: "from-yellow-100 to-yellow-200"
  },
  {
    id: 5,
    name: "Pendants",
    description: "Exquisite gold pendants for special occasions",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    color: "from-yellow-100 to-yellow-200"
  },
  {
    id: 6,
    name: "Bracelets",
    description: "Delicate gold bracelets for everyday elegance",
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    color: "from-gray-100 to-gray-200"
  }
];

const FeaturedCollections = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">Featured Collections</h2>
          <p className="text-muted-foreground text-lg">Discover our exquisite range of gold jewelry</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {collections.map((collection) => (
            <Card 
              key={collection.id} 
              className="group cursor-pointer hover:scale-105 transition-transform duration-300 overflow-hidden"
            >
              <CardContent className="p-0">
                <div className={`h-64 bg-gradient-to-br ${collection.color} relative overflow-hidden`}>
                  <img
                    src={collection.image}
                    alt={collection.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-2">{collection.name}</h3>
                  <p className="text-muted-foreground">{collection.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCollections;
