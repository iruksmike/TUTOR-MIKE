import { useState, useEffect } from 'react';
import { Menu, X, Phone, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'FAQ', href: '#faq' },
  ];

  const scrollTo = (href: string) => {
    setMobileMenuOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center cursor-pointer transform transition-transform duration-300 hover:scale-105" onClick={() => window.scrollTo(0, 0)}>
            <span className={`text-2xl font-heading font-bold ${isScrolled ? 'text-navy' : 'text-white'}`}>
              TUTOR <span className="text-gold">MIKE</span>
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollTo(link.href)}
                className={`text-sm font-medium transition-all duration-300 transform hover:-translate-y-0.5 hover:text-gold ${isScrolled ? 'text-navy-light' : 'text-gray-100'}`}
              >
                {link.name}
              </button>
            ))}
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => scrollTo('#contact')}
                className="bg-gold hover:bg-gold-light text-navy font-semibold px-6 py-2.5 rounded-md transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center gap-2"
              >
                <Phone className="w-4 h-4 transition-transform duration-300 group-hover:rotate-12" />
                Contact Me
              </button>
              <Link 
                to="/admin"
                title="Admin Dashboard"
                className={`p-2.5 rounded-md flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:shadow-md ${isScrolled ? 'bg-navy/5 text-navy hover:bg-navy hover:text-white' : 'bg-white/10 text-white hover:bg-white hover:text-navy'}`}
              >
                <Lock className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center space-x-4">
            <Link 
              to="/admin"
              className={`p-2 flex items-center justify-center rounded-full transition-all duration-300 transform hover:scale-110 ${isScrolled ? 'bg-navy/5 text-navy' : 'bg-white/10 text-white'}`}
            >
              <Lock className="w-5 h-5" />
            </Link>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className={`transition-transform duration-300 hover:scale-110 ${isScrolled ? 'text-navy' : 'text-white'}`}>
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white shadow-xl overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1 flex flex-col">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => scrollTo(link.href)}
                  className="block w-full text-left px-3 py-4 text-base font-medium text-navy border-b border-gray-100 transition-all duration-300 hover:text-gold hover:pl-5 hover:bg-gray-50"
                >
                  {link.name}
                </button>
              ))}
              <div className="pt-4 px-3 flex flex-col space-y-3">
                <button 
                  onClick={() => scrollTo('#contact')}
                  className="w-full text-center bg-navy text-white font-medium px-6 py-3 rounded-md transition-all duration-300 transform hover:scale-[1.02] hover:bg-navy-light hover:shadow-lg"
                >
                  Book a Consultation
                </button>
                <Link 
                  to="/admin"
                  className="w-full flex items-center justify-center gap-2 text-center bg-gray-100 text-navy font-medium px-6 py-3 rounded-md transition-all duration-300 transform hover:scale-[1.02] hover:bg-gray-200"
                >
                  <Lock className="w-4 h-4" />
                  Admin Dashboard
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
