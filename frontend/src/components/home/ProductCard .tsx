import React from 'react';
import { Shield, Globe, TrendingUp, Users, Truck, Clock } from 'lucide-react';

const WhyChooseUs: React.FC = () => {
  const features = [
    {
      icon: <Globe className="h-8 w-8 text-[#1A5276]" />,
      title: 'Global Reach',
      description: 'Connect with businesses from over 190 countries and regions.'
    },
    {
      icon: <Shield className="h-8 w-8 text-[#1A5276]" />,
      title: 'Verified Suppliers',
      description: 'All suppliers undergo a thorough verification process.'
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-[#1A5276]" />,
      title: 'Market Insights',
      description: 'Access detailed analytics and trends to make informed decisions.'
    },
    {
      icon: <Users className="h-8 w-8 text-[#1A5276]" />,
      title: 'Dedicated Support',
      description: '24/7 customer service in multiple languages.'
    },
    {
      icon: <Truck className="h-8 w-8 text-[#1A5276]" />,
      title: 'Logistics Solutions',
      description: 'Integrated shipping and fulfillment options for seamless delivery.'
    },
    {
      icon: <Clock className="h-8 w-8 text-[#1A5276]" />,
      title: 'Quick Response',
      description: 'Fast communication and efficient processing of orders.'
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Why Choose Chance Baaba?</h2>
          <p className="text-gray-600">
            Join millions of users who trust Chance Baaba for their global trade needs.
            We provide the tools, protection, and connections to help your business thrive.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white p-6 rounded-lg shadow-md transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="bg-[#F7B955]/10 inline-flex p-3 rounded-full mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-16 bg-gradient-to-r from-[#1A5276] to-[#2980B9] rounded-2xl overflow-hidden shadow-xl">
          <div className="grid md:grid-cols-2 items-center">
            <div className="p-8 md:p-12">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Ready to expand your business globally?
              </h3>
              <p className="text-gray-200 mb-6">
                Join Chance Baaba today and connect with suppliers and buyers from around the world.
              </p>
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                <button className="bg-[#F7B955] hover:bg-[#f0a93e] text-gray-900 font-medium py-3 px-6 rounded-full transition-colors">
                  Start Selling
                </button>
                <button className="bg-white/10 hover:bg-white/20 text-white font-medium py-3 px-6 rounded-full transition-colors">
                  Start Buying
                </button>
              </div>
            </div>
            <div className="hidden md:block relative h-full min-h-[300px]">
              <img
                src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                alt="Business collaboration"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#1A5276] to-transparent opacity-50"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;