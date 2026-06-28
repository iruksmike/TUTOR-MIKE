import { motion } from 'motion/react';
import { Target, Lightbulb, TrendingUp, ShieldCheck, Clock } from 'lucide-react';

export function About() {
  const benefits = [
    { text: "Individual attention" },
    { text: "Clear explanations" },
    { text: "Consistent progress" },
    { text: "Building confidence" },
    { text: "Long-term success" },
  ];

  return (
    <section id="about" className="py-20 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative order-2 lg:order-1"
          >
             <div className="relative rounded-2xl overflow-hidden aspect-[4/5] shadow-2xl">
               <img 
                 src="https://i.ibb.co/4gpSPdd5/Chat-GPT-Image-Jun-22-2026-02-25-02-PM.png" 
                 alt="Tutor Mike" 
                 className="w-full h-full object-cover"
               />
               <div className="absolute inset-0 bg-navy/10"></div>
             </div>
             
             {/* Info overlay */}
             <div className="absolute bottom-6 right-6 bg-white p-6 rounded-xl shadow-xl max-w-xs">
                <div className="flex items-center gap-4">
                  <div className="bg-gold/10 p-3 rounded-full">
                    <ShieldCheck className="w-8 h-8 text-gold" />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-navy">Certified & Verified</h4>
                    <p className="text-xs text-gray-500 mt-1">Life Coach & Experienced Pedagogue</p>
                  </div>
                </div>
             </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="order-1 lg:order-2"
          >
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-navy mb-6">
              Why Work With Tutor Mike?
            </h2>
            
            <div className="space-y-6 text-lg text-gray-600 mb-8">
              <p>
                A professional private tutor provides personalized academic support tailored to a student's strengths, challenges, and learning style.
              </p>
              <p>
                With over <strong className="text-navy">10 years of tutoring experience</strong> and a strong science background, I help students develop confidence, strengthen understanding, and achieve measurable academic improvement.
              </p>
            </div>

            <div className="bg-light-grey rounded-2xl p-8 border border-gray-100">
              <h3 className="font-heading font-semibold text-xl text-navy mb-4">My approach focuses on:</h3>
              <ul className="grid sm:grid-cols-2 gap-4">
                {benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <div className="bg-gold p-1 rounded-full text-white">
                      <Target className="w-4 h-4" />
                    </div>
                    <span className="font-medium text-gray-800">{benefit.text}</span>
                  </li>
                ))}
              </ul>
            </div>
            
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export function Skills() {
  const skillCategories = [
    {
      title: "Mathematics",
      icon: <TrendingUp className="w-8 h-8 text-gold" />,
      skills: ["Arithmetic", "Algebra", "Geometry", "Statistics", "Calculus"]
    },
    {
      title: "Science",
      icon: <Lightbulb className="w-8 h-8 text-gold" />,
      skills: ["Physics", "Chemistry", "General Science"]
    },
    {
      title: "Academic Support",
      icon: <Clock className="w-8 h-8 text-gold" />,
      skills: ["Homework Assistance", "Exam Preparation", "Study Skills", "Assignment Support"]
    },
    {
      title: "Soft Skills",
      icon: <ShieldCheck className="w-8 h-8 text-gold" />,
      skills: ["Patience", "Communication", "Student Motivation", "Personalized Teaching"]
    }
  ];

  return (
    <section className="py-20 bg-light-grey">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-heading font-bold text-navy mb-4">Areas of Expertise</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Comprehensive subject knowledge combined with effective teaching methodologies to maximize your child's potential.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skillCategories.map((cat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow border border-gray-100"
            >
              <div className="bg-navy/5 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                {cat.icon}
              </div>
              <h3 className="text-xl font-heading font-bold text-navy mb-4">{cat.title}</h3>
              <ul className="space-y-3">
                {cat.skills.map((skill, sIdx) => (
                  <li key={sIdx} className="flex items-center text-gray-600">
                    <span className="w-1.5 h-1.5 bg-gold rounded-full mr-3"></span>
                    {skill}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
