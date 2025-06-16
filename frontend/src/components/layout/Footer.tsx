import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, CreditCard, Shield, Truck } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    

    <footer className="bg-black text-white pt-16 pb-8">
      
      <div className="container mx-auto px-4">
        {/* Trust badges */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-b border-gray-700 pb-12 mb-12">
          <div className="flex items-center space-x-4">
            <div className="bg-[#F7B955] p-3 rounded-full">
              <Truck className="h-6 w-6 text-gray-900" />
            </div>
            <div>
              <h4 className="font-bold text-lg">Fast Shipping</h4>
              <p className="text-gray-400 text-sm">On millions of products</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="bg-[#F7B955] p-3 rounded-full">
              <Shield className="h-6 w-6 text-gray-900" />
            </div>
            <div>
              <h4 className="font-bold text-lg">Buyer Protection</h4>
              <p className="text-gray-400 text-sm">Money back guarantee</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="bg-[#F7B955] p-3 rounded-full">
              <CreditCard className="h-6 w-6 text-gray-900" />
            </div>
            <div>
              <h4 className="font-bold text-lg">Secure Payments</h4>
              <p className="text-gray-400 text-sm">Global payment methods</p>
            </div>
          </div>
        </div>
        <section className="py-16 bg-black text-white">
      
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">JOIN THE COMMUNITY</h2>
          <p className="text-gray-300 mb-8">
            Sign up to receive 10% off your first order, early access to new releases, fitness tips and more.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-grow px-4 py-3 bg-gray-900 text-white border-gray-700 focus:outline-none focus:border-white"
            />
            <button className="px-6 py-3 bg-white text-black font-medium hover:bg-gray-200 transition duration-200">
              SUBSCRIBE
            </button>
          </div>
          
          <p className="text-xs text-gray-400 mt-4">
            By signing up, you agree to receive marketing emails from us. You can unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
        {/* Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h4 className="font-medium text-lg mb-4">PRODUCTS</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/men" className="hover:text-white transition-colors">Men</Link></li>
              <li><Link to="/women" className="hover:text-white transition-colors">Women</Link></li>
              <li><Link to="/Linkccessories" className="hover:text-white transition-colors">Accessories</Link></li>
              <li><Link to="/new-releases" className="hover:text-white transition-colors">New Releases</Link></li>
              <li><Link to="/sale" className="hover:text-white transition-colors">Sale</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-lg mb-4">HELP</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/Linkccessories" className="hover:text-white transition-colors">Accessories</Link></li>
              <li><Link to="/help-center" className="hover:text-white transition-colors">Help Center</Link></li>
              <li><Link to="/shipping" className="hover:text-white transition-colors">Shipping Information</Link></li>
              <li><Link to="/returns" className="hover:text-white transition-colors">Returns & Exchanges</Link></li>
              <li><Link to="/order-tracking" className="hover:text-white transition-colors">Order Tracking</Link></li>
              <li><Link to="/size-guide" className="hover:text-white transition-colors">Size Guide</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-lg mb-4">ABOUT</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/our-story" className="hover:text-white transition-colors">Our Story</Link></li>
              <li><Link to="/responsibility" className="hover:text-white transition-colors">Responsibility</Link></li>
              <li><Link to="/careers" className="hover:text-white transition-colors">Careers</Link></li>
              <li><Link to="/press" className="hover:text-white transition-colors">Press</Link></li>
              <li><Link to="/Linkffiliates" className="hover:text-white transition-colors">Affiliates</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-lg mb-4">CONTACT</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="mailto:support@fitpeak.com" className="hover:text-white transition-colors">support@fitpeak.com</Link></li>
              <li><Link to="tel:+1-800-555-0123" className="hover:text-white transition-colors">1-800-555-0123</Link></li>
              <li><span className="block mt-6 mb-2">SOCIAL</span></li>
              <li>
                <div className="flex space-x-4">
                  <Link to="https://facebook.com" aria-label="Facebook" className="hover:text-white transition-colors">
                    <Facebook size={20} />
                  </Link>
                  <Link to="https://twitter.com" aria-label="Twitter" className="hover:text-white transition-colors">
                    <Twitter size={20} />
                  </Link>
                  <Link to="https://instagram.com" aria-label="Instagram" className="hover:text-white transition-colors">
                    <Instagram size={20} />
                  </Link>
                  <Link to="https://youtube.com" aria-label="YouTube" className="hover:text-white transition-colors">
                    <Youtube size={20} />
                  </Link>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="pt-8 border-t border-gray-800 text-gray-500 text-sm">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div className="flex flex-col md:flex-row gap-4 md:gap-8">
              <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link to="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link>
              <Link to="/Linkccessibility" className="hover:text-white transition-colors">Accessibility</Link>
              <Link to="/cookie-policy" className="hover:text-white transition-colors">Cookie Policy</Link>
            </div>
            <div>
              © {new Date().getFullYear()} FITPEAK. All Rights Reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>

  );
};

export default Footer;