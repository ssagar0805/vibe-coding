
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { jewelryData, searchJewelry } from "@/utils/searchUtils";

const Products = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  const [filteredProducts, setFilteredProducts] = useState(jewelryData);
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [priceFilter, setPriceFilter] = useState('all');

  useEffect(() => {
    let products = jewelryData;

    // Apply search filter
    if (searchQuery) {
      products = searchJewelry(searchQuery);
    }

    // Apply category filter
    if (categoryFilter !== 'all') {
      products = products.filter(product => 
        product.category.toLowerCase() === categoryFilter.toLowerCase()
      );
    }

    // Apply price filter
    if (priceFilter !== 'all') {
      products = products.filter(product => {
        const priceNumber = parseInt(product.price.replace(/[^\d]/g, ''));
        switch (priceFilter) {
          case 'low':
            return priceNumber < 20000;
          case 'medium':
            return priceNumber >= 20000 && priceNumber <= 50000;
          case 'high':
            return priceNumber > 50000;
          default:
            return true;
        }
      });
    }

    setFilteredProducts(products);
  }, [searchQuery, categoryFilter, priceFilter]);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-foreground text-center mb-4">Jewellery Collection</h1>
        
        {searchQuery && (
          <p className="text-center text-muted-foreground mb-8">
            Search results for: <span className="font-semibold">"{searchQuery}"</span>
            {filteredProducts.length > 0 && (
              <span> ({filteredProducts.length} items found)</span>
            )}
          </p>
        )}
        
        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-8 justify-center">
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="necklaces">Necklaces</SelectItem>
              <SelectItem value="earrings">Earrings</SelectItem>
              <SelectItem value="rings">Rings</SelectItem>
              <SelectItem value="bangles">Bangles</SelectItem>
              <SelectItem value="bracelets">Bracelets</SelectItem>
              <SelectItem value="pendants">Pendants</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={priceFilter} onValueChange={setPriceFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Price" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Prices</SelectItem>
              <SelectItem value="low">Under ₹20,000</SelectItem>
              <SelectItem value="medium">₹20,000 - ₹50,000</SelectItem>
              <SelectItem value="high">Above ₹50,000</SelectItem>
            </SelectContent>
          </Select>
          
          <Select>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Availability" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="available">In Stock</SelectItem>
              <SelectItem value="pre-order">Pre-Order</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="group hover:shadow-lg transition-all duration-300">
                <CardContent className="p-0">
                  <div className="h-64 overflow-hidden rounded-t-lg">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <span className="text-sm text-yellow-600 font-medium">{product.category}</span>
                    <h3 className="text-xl font-semibold text-foreground mt-2 mb-2">{product.name}</h3>
                    <p className="text-muted-foreground text-sm mb-2">{product.description}</p>
                    <p className="text-lg font-bold text-yellow-600 mb-4">{product.price}</p>
                    <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg mb-4">No products found matching your search.</p>
            <Button 
              onClick={() => window.history.back()} 
              variant="outline"
            >
              Go Back
            </Button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Products;
