import { useState } from 'react';
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
  Heart,
  Star,
  Sparkles
} from 'lucide-react';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [expandedSection, setExpandedSection] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleSection = (index) => {
    setExpandedSection(expandedSection === index ? null : index);
  };

  const trustBadges = [
    {
      icon: <Truck className="h-7 w-7 text-white" />,
      title: 'Livraison Rapide',
      desc: 'Livraison gratuite dès 50€',
    },
    {
      icon: <Shield className="h-7 w-7 text-white" />,
      title: 'Protection Acheteur',
      desc: 'Garantie satisfait ou remboursé 30 jours',
    },
    {
      icon: <CreditCard className="h-7 w-7 text-white" />,
      title: 'Paiements Sécurisés',
      desc: 'Transactions cryptées SSL',
    }
  ];

  const footerSections = [
    {
      title: 'PRODUITS',
      links: [
        { label: 'Hommes', to: '/hommes' },
        { label: 'Femmes', to: '/femmes' },
        { label: 'Accessoires', to: '/accessoires' },
        { label: 'Nouveautés', to: '/nouveautes' },
        { label: 'Promotions', to: '/promotions' },
      ],
    },
    {
      title: 'AIDE',
      links: [
        { label: 'Centre d\'aide', to: '/centre-aide' },
        { label: 'Informations de livraison', to: '/livraison' },
        { label: 'Retours & Échanges', to: '/retours' },
        { label: 'Suivi de commande', to: '/suivi-commande' },
        { label: 'Guide des tailles', to: '/guide-tailles' },
      ],
    },
    {
      title: 'À PROPOS',
      links: [
        { label: 'Notre histoire', to: '/notre-histoire' },
        { label: 'Responsabilité', to: '/responsabilite' },
        { label: 'Carrières', to: '/carrieres' },
        { label: 'Presse', to: '/presse' },
        { label: 'Partenaires', to: '/partenaires' },
      ],
    },
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Youtube, href: '#', label: 'YouTube' },
  ];

  const handleSubmit = async () => {
    if (email && !isSubmitting) {
      setIsSubmitting(true);
      // Simulation d'envoi
      setTimeout(() => {
        console.log('Inscription newsletter:', email);
        setEmail('');
        setIsSubmitting(false);
      }, 1000);
    }
  };

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white relative overflow-hidden">
      {/* Éléments décoratifs d'arrière-plan améliorés */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-emerald-400 to-green-600 rounded-full blur-3xl transform translate-x-48 -translate-y-48 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-blue-400 to-cyan-600 rounded-full blur-3xl transform -translate-x-40 translate-y-40 animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-purple-400 to-pink-600 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
      </div>

      {/* Grille de points décorative */}
      <div className="absolute inset-0 opacity-5">
        <div className="h-full w-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:32px_32px]"></div>
      </div>

      <div className="relative z-10">
        {/* Section badges de confiance */}
        <div className="border-b border-gray-800/50 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {trustBadges.map((badge, index) => (
                <div
                  key={index}
                  className="group flex items-center space-x-6 p-8 rounded-3xl bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-sm border border-gray-700/50 hover:border-emerald-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/20"
                >
                  <div className="bg-gradient-to-br from-emerald-500 via-green-500 to-emerald-600 p-5 rounded-2xl group-hover:from-emerald-400 group-hover:to-green-400 transition-all duration-500 shadow-2xl group-hover:shadow-emerald-500/30 group-hover:scale-110">
                    {badge.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-xl text-white group-hover:text-emerald-400 transition-colors duration-300 mb-2">{badge.title}</h4>
                    <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300 leading-relaxed">{badge.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Section newsletter améliorée */}
        <div className="border-b border-gray-800/50 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-20">
            <div className="max-w-5xl mx-auto text-center">
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-500/20 to-green-500/20 text-emerald-400 px-6 py-3 rounded-full text-sm font-medium mb-8 border border-emerald-500/30 backdrop-blur-sm">
                <Sparkles className="w-5 h-5" />
                Newsletter Exclusive
                <Star className="w-4 h-4 fill-current" />
              </div>

              <h2 className="text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-white via-emerald-200 to-emerald-400 bg-clip-text text-transparent leading-tight">
                REJOIGNEZ LA COMMUNAUTÉ
              </h2>

              <p className="text-gray-300 text-xl max-w-3xl mx-auto mb-12 leading-relaxed">
                Inscrivez-vous pour recevoir <span className="text-emerald-400 font-bold text-2xl">-10%</span> sur votre première commande,
                un accès anticipé aux nouveautés, des conseils fitness et des offres exclusives.
              </p>

              <div className="flex flex-col sm:flex-row justify-center max-w-2xl mx-auto gap-4 mb-8">
                <div className="relative flex-grow">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Votre adresse email"
                    className="w-full px-8 py-5 bg-gray-800/60 text-white border border-gray-700/50 rounded-2xl focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 backdrop-blur-sm transition-all duration-300 text-lg placeholder-gray-400"
                  />
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-500/10 to-green-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="px-10 py-5 bg-gradient-to-r from-emerald-500 to-green-500 text-black font-bold rounded-2xl hover:from-emerald-400 hover:to-green-400 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-emerald-500/30 flex items-center justify-center gap-3 group text-lg min-w-[200px] disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black"></div>
                      ENVOI...
                    </>
                  ) : (
                    <>
                      S'INSCRIRE
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </div>

              <p className="text-sm text-gray-500 max-w-2xl mx-auto">
                En vous inscrivant, vous acceptez de recevoir nos emails marketing. Vous pouvez vous désinscrire à tout moment.
                <br />
                <a href="/politique-confidentialite" className="text-emerald-400 hover:text-emerald-300 cursor-pointer transition-colors underline">
                  Politique de confidentialité
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Contenu principal du footer */}
        <div className="container mx-auto px-4 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">

            {/* Section marque améliorée */}
            <div className="lg:col-span-2">
              <div className="mb-10">
                <h3 className="text-4xl font-bold bg-gradient-to-r from-emerald-400 via-green-400 to-emerald-500 bg-clip-text text-transparent mb-6">
                  FITPEAK
                </h3>
                <p className="text-gray-300 leading-relaxed mb-8 text-lg">
                  Nous révolutionnons votre parcours fitness avec des vêtements de sport haut de gamme
                  qui allient performance, style et confort. Chaque entraînement mérite ce qu'il y a de mieux.
                </p>
              </div>

              {/* Informations de contact améliorées */}
              <div className="space-y-5 mb-10">
                <div className="flex items-center gap-4 text-gray-300 hover:text-white transition-colors group">
                  <div className="p-3 bg-gray-800/60 rounded-xl group-hover:bg-emerald-500 transition-all duration-300 shadow-lg">
                    <Mail className="w-5 h-5" />
                  </div>
                  <a href="mailto:support@fitpeak.com" className="hover:text-emerald-400 transition-colors text-lg">
                    support@fitpeak.com
                  </a>
                </div>
                <div className="flex items-center gap-4 text-gray-300 hover:text-white transition-colors group">
                  <div className="p-3 bg-gray-800/60 rounded-xl group-hover:bg-emerald-500 transition-all duration-300 shadow-lg">
                    <Phone className="w-5 h-5" />
                  </div>
                  <a href="tel:+33123456789" className="hover:text-emerald-400 transition-colors text-lg">
                    +33 1 23 45 67 89
                  </a>
                </div>
                <div className="flex items-center gap-4 text-gray-300 group">
                  <div className="p-3 bg-gray-800/60 rounded-xl group-hover:bg-emerald-500 transition-all duration-300 shadow-lg">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <span className="text-lg">123 Avenue du Fitness, 75001 Paris</span>
                </div>
              </div>

              {/* Liens sociaux améliorés */}
              <div>
                <span className="block mb-6 text-sm text-gray-400 font-bold tracking-wider uppercase">Suivez-nous</span>
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      className="p-4 bg-gray-800/60 rounded-2xl hover:bg-emerald-500 transition-all duration-300 transform hover:scale-110 hover:shadow-2xl hover:shadow-emerald-500/30 group backdrop-blur-sm"
                      aria-label={social.label}
                    >
                      <social.icon className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Liens du footer - Desktop */}
            <div className="hidden md:contents lg:col-span-3">
              {footerSections.map((section, index) => (
                <div key={index}>
                  <h4 className="font-bold text-xl mb-8 text-white bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">
                    {section.title}
                  </h4>
                  <ul className="space-y-4">
                    {section.links.map((link, idx) => (
                      <li key={idx}>
                        <a
                          href={link.to}
                          className="text-gray-400 hover:text-emerald-400 transition-all duration-300 text-base block py-2 hover:translate-x-2 transform group"
                        >
                          <span className="relative">
                            {link.label}
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-emerald-400 transition-all duration-300 group-hover:w-full"></span>
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Liens du footer - Mobile accordéon */}
            <div className="md:hidden lg:col-span-3 space-y-4">
              {footerSections.map((section, index) => (
                <div key={index} className="border border-gray-800/50 rounded-2xl overflow-hidden backdrop-blur-sm">
                  <button
                    onClick={() => toggleSection(index)}
                    className="w-full flex items-center justify-between p-6 bg-gray-800/60 hover:bg-gray-800/80 transition-colors"
                  >
                    <h4 className="font-bold text-white text-lg">{section.title}</h4>
                    <ChevronUp className={`w-6 h-6 text-gray-400 transform transition-transform duration-300 ${expandedSection === index ? 'rotate-180' : ''}`} />
                  </button>
                  <div className={`overflow-hidden transition-all duration-500 ${expandedSection === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <ul className="p-6 space-y-4 bg-gray-900/60">
                      {section.links.map((link, idx) => (
                        <li key={idx}>
                          <a
                            href={link.to}
                            className="text-gray-400 hover:text-emerald-400 transition-colors text-base block py-2"
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

        {/* Footer du bas amélioré */}
        <div className="border-t border-gray-800/50 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-10">
            <div className="flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="flex flex-wrap justify-center md:justify-start gap-8 text-sm">
                <a href="/politique-confidentialite" className="text-gray-400 hover:text-emerald-400 transition-colors">Politique de confidentialité</a>
                <a href="/conditions-utilisation" className="text-gray-400 hover:text-emerald-400 transition-colors">Conditions d'utilisation</a>
                <a href="/accessibilite" className="text-gray-400 hover:text-emerald-400 transition-colors">Accessibilité</a>
                <a href="/politique-cookies" className="text-gray-400 hover:text-emerald-400 transition-colors">Politique des cookies</a>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span>© {new Date().getFullYear()} FITPEAK. Fait avec</span>
                <Heart className="w-4 h-4 text-red-500 fill-current animate-pulse" />
                <span>en France. Tous droits réservés.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;