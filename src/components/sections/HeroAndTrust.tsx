import { motion } from 'motion/react';
import { CheckCircle2, ChevronRight, Award, Globe, BookOpen } from 'lucide-react';

export function Hero() {
  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-[90vh] flex items-center justify-center bg-navy pt-20 overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[600px] h-[600px] rounded-full bg-navy-light/40 blur-3xl" />
      <div className="absolute bottom-0 left-0 -ml-20 w-[400px] h-[400px] rounded-full bg-gold/10 blur-3xl" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="order-2 lg:order-1 text-center lg:text-left"
          >
            <div className="inline-block px-4 py-1.5 rounded-full bg-navy-light text-gold text-sm font-semibold tracking-wide mb-6 border border-gold/20">
              PRIVATE TUTOR
            </div>
            
            <h1 className="text-5xl md:text-6xl font-heading font-bold text-white mb-6 leading-tight">
              TUTOR <span className="text-gold">MIKE</span>
            </h1>
            
            <h2 className="text-xl md:text-2xl text-gray-200 font-medium mb-6">
              10+ Years Helping Students Excel in Mathematics and Science Through Personalized Online Tutoring.
            </h2>
            
            <p className="text-lg text-gray-400 mb-10 max-w-xl mx-auto lg:mx-0">
              Supporting students from Year 4 to Year 12 across the UK, USA, Canada, Australia and Africa with engaging, result-focused learning.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button 
                onClick={() => scrollTo('#contact')}
                className="bg-gold hover:bg-gold-light text-navy font-semibold px-8 py-4 rounded-md transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center text-lg hover:shadow-[0_0_20px_rgba(212,175,55,0.4)]"
              >
                Book a Free Consultation
              </button>
              <button 
                onClick={() => scrollTo('#testimonials')}
                className="bg-navy-light hover:bg-[#1f4270] text-white border border-transparent font-semibold px-8 py-4 rounded-md transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg flex items-center justify-center text-lg group"
              >
                View Success Stories
                <ChevronRight className="ml-2 w-5 h-5 text-gray-400 group-hover:text-white transition-colors group-hover:translate-x-1" />
              </button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="order-1 lg:order-2 flex justify-center lg:justify-end relative pb-8 lg:pb-0"
          >
            {/* Image Placeholder built with aesthetic CSS since we don't have a real photo */}
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-gold to-gold-light transform rotate-3"></div>
              <div className="absolute inset-0 rounded-2xl bg-white overflow-hidden shadow-2xl transform -rotate-2">
                 <img 
                   src="https://i.ibb.co/RTXHRvnW/Chat-GPT-Image-Jun-22-2026-03-17-08-PM.png"
                   alt="Tutor Mike" 
                   className="w-full h-full object-cover scale-105"
                 />
              </div>
              
              {/* Floating Badge */}
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-xl flex items-center gap-4 animate-bounce" style={{animationDuration: '3s'}}>
                <div className="bg-green-100 p-2 rounded-full text-green-600">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-semibold mb-0.5">Top Rated Tutor</p>
                  <p className="text-sm font-heading font-bold text-navy">95% Success Rate</p>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

export function TrustBar() {
  const items = [
    { label: "10+ Years Experience", icon: CheckCircle2 },
    { label: "Mathematics Specialist", icon: BookOpen },
    { label: "Science Background", icon: Award },
    { label: "Personalized Learning", icon: CheckCircle2 },
    { label: "International Students", icon: Globe },
    { label: "Online Tutoring", icon: CheckCircle2 },
  ];

  return (
    <div className="bg-light-grey border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {items.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-center gap-2 text-center"
            >
              <item.icon className="w-5 h-5 text-gold shrink-0" />
              <span className="text-sm font-medium text-navy">{item.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
