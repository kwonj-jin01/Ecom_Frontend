import React from 'react';
import { Link } from 'react-router-dom';
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  CreditCard,
  Shield,
  Truck,
} from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white pt-16 pb-8">
      <div className="container mx-auto px-4">

        {/* Trust Badges */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-b border-gray-700 pb-12 mb-4">
          {[{
            icon: <Truck className="h-6 w-6 text-black" />,
            title: 'Fast Shipping',
            desc: 'On millions of products',
          },
          {
            icon: <Shield className="h-6 w-6 text-black" />,
            title: 'Buyer Protection',
            desc: 'Money back guarantee',
          },
          {
            icon: <CreditCard className="h-6 w-6 text-black" />,
            title: 'Secure Payments',
            desc: 'Global payment methods',
          }].map((badge, index) => (
            <div key={index} className="flex items-center space-x-4">
              <div className="bg-green-500 p-3 rounded-full">
                {badge.icon}
              </div>
              <div>
                <h4 className="font-bold text-lg">{badge.title}</h4>
                <p className="text-gray-400 text-sm">{badge.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <section className="py-8 bg-black text-white text-center border-b border-gray-700 mb-10">
          <h2 className="text-3xl font-bold mb-4">JOIN THE COMMUNITY</h2>
          <p className="text-gray-300 max-w-xl mx-auto mb-8">
            Sign up to receive 10% off your first order, early access to new releases, fitness tips and more.
          </p>
          <div className="flex flex-col sm:flex-row justify-center max-w-xl mx-auto gap-3">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-grow px-4 py-3 bg-gray-900 text-white border border-gray-700 focus:outline-none"
            />
            <button className="px-6 py-3 bg-green-500 text-black font-semibold hover:bg-green-600 transition">
              SUBSCRIBE
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-4">
            By signing up, you agree to receive marketing emails from us. You can unsubscribe at any time.
          </p>
        </section>

        {/* Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {[
            {
              title: 'PRODUCTS',
              links: [
                { label: 'Men', to: '/men' },
                { label: 'Women', to: '/women' },
                { label: 'Accessories', to: '/accessories' },
                { label: 'New Releases', to: '/new-releases' },
                { label: 'Sale', to: '/sale' },
              ],
            },
            {
              title: 'HELP',
              links: [
                { label: 'Help Center', to: '/help-center' },
                { label: 'Shipping Info', to: '/shipping' },
                { label: 'Returns & Exchanges', to: '/returns' },
                { label: 'Order Tracking', to: '/order-tracking' },
                { label: 'Size Guide', to: '/size-guide' },
              ],
            },
            {
              title: 'ABOUT',
              links: [
                { label: 'Our Story', to: '/our-story' },
                { label: 'Responsibility', to: '/responsibility' },
                { label: 'Careers', to: '/careers' },
                { label: 'Press', to: '/press' },
                { label: 'Affiliates', to: '/affiliates' },
              ],
            },
            {
              title: 'CONTACT',
              links: [
                { label: 'support@fitpeak.com', to: 'mailto:support@fitpeak.com' },
                { label: '+1-800-555-0123', to: 'tel:+18005550123' },
              ],
              socials: true,
            },
          ].map((section, index) => (
            <div key={index}>
              <h4 className="font-semibold text-lg mb-4">{section.title}</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                {section.links.map((link, idx) => (
                  <li key={idx}>
                    <Link to={link.to} className="hover:text-white transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
              {section.socials && (
                <div className="mt-6">
                  <span className="block mb-2 text-sm text-gray-400">SOCIAL</span>
                  <div className="flex space-x-4">
                    {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                      <a key={i} href="#" className="hover:text-green-500 transition">
                        <Icon size={20} />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom Footer */}
        <div className="pt-8 border-t border-gray-800 text-sm text-gray-500 flex flex-col md:flex-row justify-between gap-4">
          <div className="flex flex-wrap gap-4">
            <Link to="/privacy-policy" className="hover:text-white">Privacy Policy</Link>
            <Link to="/terms-of-service" className="hover:text-white">Terms of Service</Link>
            <Link to="/accessibility" className="hover:text-white">Accessibility</Link>
            <Link to="/cookie-policy" className="hover:text-white">Cookie Policy</Link>
          </div>
          <div>
            © {new Date().getFullYear()} FITPEAK. All Rights Reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
