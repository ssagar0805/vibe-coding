
import { ShoppingCart, User, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import SearchDropdown from "./SearchDropdown";

const Navigation = () => {
  return (
    <nav className="bg-background border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/2/24/Pramukh_Swami_Maharaj.jpg" 
              alt="Pramukh Swami Maharaj" 
              className="w-8 h-8 rounded-full object-cover"
            />
            <span className="text-xl font-semibold text-foreground">Pramukh Jewellers</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="/" className="text-foreground hover:text-yellow-600 transition-colors">Home</a>
            <a href="/products" className="text-foreground hover:text-yellow-600 transition-colors">Products</a>
            <a href="/about" className="text-foreground hover:text-yellow-600 transition-colors">About Us</a>
            <a href="/contact" className="text-foreground hover:text-yellow-600 transition-colors">Contact</a>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <SearchDropdown />

            {/* Icons */}
            <Button variant="ghost" size="icon">
              <Globe className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <ShoppingCart className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
