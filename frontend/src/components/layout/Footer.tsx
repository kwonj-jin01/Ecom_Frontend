import React, { useState } from 'react';
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  CreditCard,
  Shield,
  Truck,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  ChevronUp,
  Heart
} from 'lucide-react';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [expandedSection, setExpandedSection] = useState(null);

  const toggleSection = (index) => {
    setExpandedSection(expandedSection === index ? null : index);
  };

  const trustBadges = [
    {
      icon: <Truck className="h-6 w-6 text-white" />,
      title: 'Fast Shipping',
      desc: 'Free delivery on orders over $50',
    },
    {
      icon: <Shield className="h-6 w-6 text-white" />,
      title: 'Buyer Protection',
      desc: '30-day money back guarantee',
    },
    {
      icon: <CreditCard className="h-6 w-6 text-white" />,
      title: 'Secure Payments',
      desc: 'SSL encrypted transactions',
    }
  ];

  const footerSections = [
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
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Youtube, href: '#', label: 'YouTube' },
  ];

  const handleSubmit = () => {
    // Handle newsletter signup
    if (email) {
      console.log('Newsletter signup:', email);
      setEmail('');
    }
  };

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-green-500 rounded-full blur-3xl transform translate-x-48 -translate-y-48"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500 rounded-full blur-3xl transform -translate-x-40 translate-y-40"></div>
      </div>

      <div className="relative z-10">
        {/* Trust Badges Section */}
        <div className="border-b border-gray-800/50 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {trustBadges.map((badge, index) => (
                <div key={index} className="group flex items-center space-x-4 p-6 rounded-2xl bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 hover:border-green-500/50 transition-all duration-300 hover:scale-105">
                  <div className="bg-gradient-to-r from-green-500 to-green-400 p-4 rounded-xl group-hover:from-green-400 group-hover:to-green-300 transition-all duration-300 shadow-lg">
                    {badge.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-white group-hover:text-green-400 transition-colors">{badge.title}</h4>
                    <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors">{badge.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="border-b border-gray-800/50 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-16">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-green-500/10 text-green-400 px-4 py-2 rounded-full text-sm font-medium mb-6 border border-green-500/20">
                <Mail className="w-4 h-4" />
                Newsletter
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                JOIN THE COMMUNITY
              </h2>
              
              <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
                Sign up to receive <span className="text-green-400 font-semibold">10% off</span> your first order, early access to new releases, fitness tips and exclusive offers.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center max-w-lg mx-auto gap-4 mb-6">
                <div className="relative flex-grow">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full px-6 py-4 bg-gray-800/50 text-white border border-gray-700 rounded-xl focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 backdrop-blur-sm transition-all duration-300"
                  />
                </div>
                <button 
                  onClick={handleSubmit}
                  className="px-8 py-4 bg-gradient-to-r from-green-500 to-green-400 text-black font-semibold rounded-xl hover:from-green-400 hover:to-green-300 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-green-500/25 flex items-center justify-center gap-2 group"
                >
                  SUBSCRIBE
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
              
              <p className="text-xs text-gray-500 max-w-md mx-auto">
                By signing up, you agree to receive marketing emails. You can unsubscribe at any time. 
                <span className="text-green-400 hover:text-green-300 cursor-pointer"> Privacy Policy</span>
              </p>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <div className="mb-8">
                <h3 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-green-300 bg-clip-text text-transparent mb-4">
                  FITPEAK
                </h3>
                <p className="text-gray-400 leading-relaxed mb-6">
                  Empowering your fitness journey with premium athletic wear that combines performance, style, and comfort. Every workout deserves the best.
                </p>
              </div>

              {/* Contact Info */}
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors group">
                  <div className="p-2 bg-gray-800 rounded-lg group-hover:bg-green-500 transition-colors">
                    <Mail className="w-4 h-4" />
                  </div>
                  <a href="mailto:support@fitpeak.com" className="hover:text-green-400 transition-colors">
                    support@fitpeak.com
                  </a>
                </div>
                <div className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors group">
                  <div className="p-2 bg-gray-800 rounded-lg group-hover:bg-green-500 transition-colors">
                    <Phone className="w-4 h-4" />
                  </div>
                  <a href="tel:+18005550123" className="hover:text-green-400 transition-colors">
                    +1-800-555-0123
                  </a>
                </div>
                <div className="flex items-center gap-3 text-gray-400 group">
                  <div className="p-2 bg-gray-800 rounded-lg group-hover:bg-green-500 transition-colors">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <span>123 Fitness Ave, Workout City, WC 12345</span>
                </div>
              </div>

              {/* Social Links */}
              <div>
                <span className="block mb-4 text-sm text-gray-400 font-semibold tracking-wider">FOLLOW US</span>
                <div className="flex space-x-3">
                  {socialLinks.map((social, index) => (
                    <a 
                      key={index} 
                      href={social.href} 
                      className="p-3 bg-gray-800 rounded-xl hover:bg-green-500 transition-all duration-300 transform hover:scale-110 hover:shadow-lg group"
                      aria-label={social.label}
                    >
                      <social.icon className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer Links - Desktop */}
            <div className="hidden md:contents lg:col-span-3">
              {footerSections.map((section, index) => (
                <div key={index}>
                  <h4 className="font-bold text-lg mb-6 text-white">{section.title}</h4>
                  <ul className="space-y-3">
                    {section.links.map((link, idx) => (
                      <li key={idx}>
                        <a 
                          href={link.to} 
                          className="text-gray-400 hover:text-green-400 transition-colors text-sm block py-1 hover:translate-x-1 transform transition-transform duration-200"
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Footer Links - Mobile Accordion */}
            <div className="md:hidden lg:col-span-3 space-y-4">
              {footerSections.map((section, index) => (
                <div key={index} className="border border-gray-800 rounded-xl overflow-hidden">
                  <button
                    onClick={() => toggleSection(index)}
                    className="w-full flex items-center justify-between p-4 bg-gray-800/50 hover:bg-gray-800 transition-colors"
                  >
                    <h4 className="font-bold text-white">{section.title}</h4>
                    <ChevronUp className={`w-5 h-5 text-gray-400 transform transition-transform duration-200 ${expandedSection === index ? 'rotate-180' : ''}`} />
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ${expandedSection === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <ul className="p-4 space-y-3 bg-gray-900/50">
                      {section.links.map((link, idx) => (
                        <li key={idx}>
                          <a 
                            href={link.to} 
                            className="text-gray-400 hover:text-green-400 transition-colors text-sm block py-1"
                          >
                            {link.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-800/50 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex flex-wrap justify-center md:justify-start gap-6 text-sm">
                <a href="/privacy-policy" className="text-gray-400 hover:text-green-400 transition-colors">Privacy Policy</a>
                <a href="/terms-of-service" className="text-gray-400 hover:text-green-400 transition-colors">Terms of Service</a>
                <a href="/accessibility" className="text-gray-400 hover:text-green-400 transition-colors">Accessibility</a>
                <a href="/cookie-policy" className="text-gray-400 hover:text-green-400 transition-colors">Cookie Policy</a>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span>© {new Date().getFullYear()} FITPEAK. Made with</span>
                <Heart className="w-4 h-4 text-red-500 fill-current" />
                <span>All Rights Reserved.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;