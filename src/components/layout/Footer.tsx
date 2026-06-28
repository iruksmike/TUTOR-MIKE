import { Facebook, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import { type MouseEvent } from 'react';

export default function Footer() {
  const scrollTo = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-navy text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          <div className="md:col-span-1">
            <span className="text-2xl font-heading font-bold text-white mb-4 block">
              TUTOR <span className="text-gold">MIKE</span>
            </span>
            <p className="text-gray-400 text-sm mb-6">
              Helping Students Build Confidence, Improve Grades, and Achieve Academic Success through personalized online tutoring.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/share/18PwuE5bfi/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-navy-light flex items-center justify-center text-white hover:bg-gold transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="http://www.instagram.com/iruksmike" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-navy-light flex items-center justify-center text-white hover:bg-gold transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="http://www.linkedin.com/in/iruksmike" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-navy-light flex items-center justify-center text-white hover:bg-gold transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div className="md:col-span-1">
            <h4 className="text-lg font-heading font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {['Home', 'About', 'Services', 'Testimonials', 'Contact'].map((link) => (
                <li key={link}>
                  <a 
                    href={`#${link.toLowerCase()}`} 
                    onClick={(e) => scrollTo(e, `#${link.toLowerCase()}`)}
                    className="text-gray-400 hover:text-gold transition-colors text-sm"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-1">
            <h4 className="text-lg font-heading font-semibold mb-6">Services</h4>
            <ul className="space-y-3">
              <li className="text-gray-400 text-sm">One-on-One Tutoring</li>
              <li className="text-gray-400 text-sm">Exam Preparation</li>
              <li className="text-gray-400 text-sm">Homework Support</li>
              <li className="text-gray-400 text-sm">Mathematics Coaching</li>
              <li className="text-gray-400 text-sm">Science Tutoring</li>
            </ul>
          </div>

          <div className="md:col-span-1">
            <h4 className="text-lg font-heading font-semibold mb-6">Contact Info</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <Mail className="w-5 h-5 text-gold mr-3 mt-0.5 shrink-0" />
                <span className="text-gray-400 text-sm">iruksmike@gmail.com</span>
              </li>
              <li className="flex items-start">
                <Phone className="w-5 h-5 text-gold mr-3 mt-0.5 shrink-0" />
                <span className="text-gray-400 text-sm">+234 806518 8355</span>
              </li>
              <li className="flex items-start">
                <MapPin className="w-5 h-5 text-gold mr-3 mt-0.5 shrink-0" />
                <span className="text-gray-400 text-sm">Online (Serving UK, USA, Canada, Australia & Africa)</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-navy-light pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Tutor Mike. All Rights Reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
