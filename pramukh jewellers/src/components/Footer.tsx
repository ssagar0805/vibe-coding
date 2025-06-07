
import { Facebook, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/2/24/Pramukh_Swami_Maharaj.jpg" 
                alt="Pramukh Swami Maharaj" 
                className="w-8 h-8 rounded-full object-cover"
              />
              <span className="text-xl font-semibold">Pramukh Jewellers</span>
            </div>
            <p className="text-gray-300 mb-4">
              Crafting exquisite gold jewelry with precision and care since 1985.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-300 hover:text-yellow-400 transition-colors">Home</a></li>
              <li><a href="/products" className="text-gray-300 hover:text-yellow-400 transition-colors">Products</a></li>
              <li><a href="/about" className="text-gray-300 hover:text-yellow-400 transition-colors">About Us</a></li>
              <li><a href="/contact" className="text-gray-300 hover:text-yellow-400 transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-yellow-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-300 hover:text-yellow-400 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-gray-300 hover:text-yellow-400 transition-colors">Contact Us</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-yellow-400 transition-colors">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-yellow-400 transition-colors">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-yellow-400 transition-colors">
                <Twitter className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 pt-8 text-center">
          <p className="text-gray-300">© 2024 Pramukh Jewellers. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
