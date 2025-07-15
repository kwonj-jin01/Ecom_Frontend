import { useState, useEffect } from 'react';
import { Play, ChevronDown } from 'lucide-react';
import image from '../../assets/men.png';
import { Link } from 'react-router-dom';



const Hero: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    setIsLoaded(true);
    const interval = setInterval(() => {
      setActiveTestimonial(prev => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const testimonials = [
    {
      avatar: "https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=100",
      text: "Restez bien au chaud sans compromettre votre liberté de mouvement. Nos vêtements d'hiver pour femmes sont parfaits pour les entraînements en extérieur par temps froid."
    },
    {
      avatar: "https://images.pexels.com/photos/414029/pexels-photo-414029.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=100",
      text: "Qualité et confort incroyables. Ces articles ont complètement transformé ma routine sportive."
    },
    {
      avatar: "https://images.pexels.com/photos/416778/pexels-photo-416778.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=100",
      text: "Coupe et style parfaits. J’ai enfin trouvé des vêtements à la hauteur de mon mode de vie actif."
    }
  ];

  return (
    <div >
      {/* Main Content */}
      <div className="relative px-6 md:px-8 pt-16 max-w-7xl mx-auto">
        {/* Hero Text */}
        <div className={`text-center mb-10 transition-all duration-[1200ms] delay-500 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight tracking-wide text-neutral-900 font-title">
            <div className="flex flex-wrap justify-center items-center gap-x-3 gap-y-2">
              <span className="text-neutral-900">Créé</span>
              <span className="relative text-green-500 font-extrabold">
                <span className="relative z-10">Dans</span>
                <svg viewBox="0 0 150 40" className="absolute -top-1 -left-2 w-full h-full z-0" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <ellipse cx="75" cy="20" rx="72" ry="16" stroke="currentColor" className="text-green-500" strokeWidth="3" />
                </svg>
              </span>
              <span className="text-green-500 font-extrabold">La</span>
              <span className="text-neutral-900">Rue</span>
            </div>
            <div className="flex flex-wrap justify-center gap-x-3 gap-y-2 mt-3">
              <span className="text-neutral-900">Forgé</span>
              <span className="text-green-500 font-extrabold">Par</span>
              <span className="text-neutral-900">L'Effort</span>
            </div>
          </h2>

          <div className="flex flex-wrap justify-center gap-4 mt-6">
            <Link to="/products" className="bg-green-500  text-black px-6 sm:px-8 py-3 rounded-full font-medium transform hover:scale-105 transition duration-300 shadow-lg hover:shadow-xl">
              ACHETER
            </Link>
            <Link to="/products" className="bg-white text-black px-6 sm:px-8 py-3 rounded-full font-medium border border-gray-300 hover:bg-gray-50 transform hover:scale-105 transition duration-300 shadow-lg hover:shadow-xl">
              DÉCOUVRIR
            </Link>
          </div>
        </div>

        {/* Main Image and Content */}
        <div className="relative flex flex-col lg:flex-row items-center justify-between gap-6">
          {/* Left Testimonials */}
          <div className={`w-full lg:w-1/3 transition-all duration-[1500ms] delay-700 ${isLoaded ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'} hidden md:block`}>
            <div className="bg-green-500 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
              <div className="flex items-center space-x-3 mb-4">
                {testimonials.map((_, index) => (
                  <div key={index} className={`w-12 h-12 rounded-full overflow-hidden border-2 transition-all duration-500 ${index === activeTestimonial ? 'border-black scale-110' : 'border-gray-300 scale-90 opacity-70'}`}>
                    <img src={testimonials[index].avatar} alt={`Testimonial ${index + 1}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
              <p className={`text-gray-700 leading-relaxed transition-all duration-500 ${activeTestimonial >= 0 ? 'opacity-100' : 'opacity-0'}`}>{testimonials[activeTestimonial]?.text}</p>
            </div>
          </div>

          {/* Central Model Image */}
          <div className={`relative transition-all duration-1500 delay-1000 ${isLoaded ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-20 opacity-0 scale-95'}`}>
            <img src={image} alt="Description" />
          </div>

          {/* Right Video Card */}
          <div className={`w-full lg:w-1/3 transition-all duration-[1500ms] delay-1200 ${isLoaded ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'} hidden md:block`}>
            <div className="relative w-full h-48 bg-black rounded-2xl overflow-hidden shadow-2xl group cursor-pointer">
              <img src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=250&fit=crop" alt="Workout Video" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Play className="w-8 h-8 text-white ml-1" />
                </div>
              </div>
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-white font-bold text-lg mb-1">Active Workouts</h3>
                <p className="text-white/80 text-sm">Accédez aux programmes</p>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </div>
        </div>

        {/* Bottom scroll indicator */}
        <div className={`flex justify-center mt-5 transition-all duration-[1500ms] delay-1500 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <ChevronDown className="w-8 h-8 text-gray-400 animate-bounce" />
        </div>
      </div>

      {/* Background decorative elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-20 left-20 w-32 h-32 bg-blue-200/30 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-purple-200/30 rounded-full blur-xl animate-pulse delay-2000"></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-pink-200/30 rounded-full blur-xl animate-pulse delay-3000"></div>
        <div className="absolute bottom-20 right-20 w-28 h-28 bg-indigo-200/30 rounded-full blur-xl animate-pulse delay-1500"></div>
      </div>
    </div>

  );
};

export default Hero;
