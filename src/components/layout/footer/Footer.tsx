import { Pizza, Facebook, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
      <footer className="bg-red-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-to-r from-orange-500 to-red-500 p-2 rounded-lg">
                <Pizza className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold">CRUSTCRAFT</span>
            </div>
            <p className="text-gray-300">
              Crafting the perfect pizza experience since 2020. Made with love, served with passion.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 text-gray-300 hover:text-orange-500 cursor-pointer transition-colors" />
              <Twitter className="h-5 w-5 text-gray-300 hover:text-orange-500 cursor-pointer transition-colors" />
              <Instagram className="h-5 w-5 text-gray-300 hover:text-orange-500 cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-orange-500 transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-orange-500 transition-colors">
                  Menu
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-orange-500 transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-orange-500 transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-orange-500 transition-colors">
                  Careers
                </a>
              </li>
            </ul>
          </div>

          {/* Menu Categories */}
          <div>
            <h3 className="font-bold text-lg mb-4">Menu</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-orange-500 transition-colors">
                  Classic Pizzas
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-orange-500 transition-colors">
                  Specialty Pizzas
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-orange-500 transition-colors">
                  Appetizers
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-orange-500 transition-colors">
                  Desserts
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-orange-500 transition-colors">
                  Beverages
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-lg mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-orange-500" />
                <span className="text-gray-300">123 Pizza Street, Food City, FC 12345</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-orange-500" />
                <span className="text-gray-300">(555) 123-PIZZA</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-orange-500" />
                <span className="text-gray-300">hello@crustcraft.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-300">
          <p>&copy; {new Date().getFullYear()} CrustCraft. All rights reserved. Made with ❤️ for pizza lovers.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer;