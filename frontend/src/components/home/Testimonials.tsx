import React from 'react';
import { testimonials } from '../../data/mockData';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  
  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };
  
  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">What Our Users Say</h2>
          <p className="text-gray-600">
            Hear from businesses that have transformed their operations with Chance Baaba
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto relative">
          <div className="bg-gray-50 rounded-2xl p-8 md:p-12 shadow-md">
            <div className="absolute top-8 left-8 text-[#F7B955] opacity-20">
              <Quote size={80} />
            </div>
            
            <div className="relative z-10">
              <div className="mb-8 flex flex-col items-center">
                <img
                  src={testimonials[currentIndex].avatar}
                  alt={testimonials[currentIndex].name}
                  className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-md mb-4"
                />
                <div className="text-center">
                  <h3 className="font-bold text-xl text-gray-900">
                    {testimonials[currentIndex].name}
                  </h3>
                  <p className="text-[#1A5276]">{testimonials[currentIndex].role}</p>
                </div>
              </div>
              
              <blockquote className="text-lg text-gray-700 text-center italic mb-8">
                "{testimonials[currentIndex].content}"
              </blockquote>
              
              <div className="flex justify-center space-x-1">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === currentIndex ? 'w-8 bg-[#F7B955]' : 'w-2 bg-gray-300'
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
          
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-white rounded-full p-3 shadow-md text-gray-700 hover:text-[#1A5276] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F7B955] transition-colors md:flex hidden"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={24} />
          </button>
          
          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 bg-white rounded-full p-3 shadow-md text-gray-700 hover:text-[#1A5276] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F7B955] transition-colors md:flex hidden"
            aria-label="Next testimonial"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;