import { motion } from 'motion/react';
import { MonitorPlay, Trophy, PenTool, Calculator, FlaskConical, Award } from 'lucide-react';

export function Services() {
  const services = [
    {
      title: "One-on-One Online Tutoring",
      desc: "Personalized sessions designed around each student's specific needs, ensuring maximum engagement and understanding.",
      icon: MonitorPlay
    },
    {
      title: "Exam Preparation",
      desc: "Focused preparation for school assessments and major examinations to help students achieve their target grades.",
      icon: Trophy
    },
    {
      title: "Homework Support",
      desc: "Helping students complete academic assignments confidently, correctly, and on time while building core topic knowledge.",
      icon: PenTool
    },
    {
      title: "Mathematics Coaching",
      desc: "Building strong mathematical foundations and problem-solving skills for Arithmetic, Algebra, Geometry, and Calculus.",
      icon: Calculator
    },
    {
      title: "Science Tutoring",
      desc: "Simplifying difficult concepts through practical explanations in Physics, Chemistry, and General Science.",
      icon: FlaskConical
    },
    {
      title: "Academic Mentoring",
      desc: "Providing guidance, accountability, and study strategies that prepare students for long-term academic success.",
      icon: Award
    }
  ];

  return (
    <section id="services" className="py-20 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-heading font-bold text-navy mb-4">Tutoring Services</h2>
          <div className="h-1 w-20 bg-gold mx-auto mb-6 rounded-full"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Comprehensive academic support tailored to your child's curriculum and learning objectives.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-14 h-14 bg-navy-light text-white rounded-xl flex items-center justify-center mb-6 group-hover:bg-gold transition-colors">
                <service.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-heading font-bold text-navy mb-3">{service.title}</h3>
              <p className="text-gray-600 leading-relaxed text-sm lg:text-base">
                {service.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Results() {
  const stats = [
    { number: "10+", label: "Years Experience" },
    { number: "500+", label: "Students Taught" },
    { number: "95%", label: "Parent Satisfaction" },
    { number: "4", label: "Countries Served" }
  ];

  return (
    <section className="py-20 bg-navy relative overflow-hidden">
      {/* Abstract bg geometry */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -top-20 -right-20 w-80 h-80 border-[30px] border-gold rounded-full"></div>
        <div className="absolute -bottom-20 -left-20 w-60 h-60 border-[20px] border-white rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 text-white">
          <h2 className="text-3xl lg:text-4xl font-heading font-bold mb-4">Why Parents Choose Tutor Mike</h2>
          <p className="text-gray-300">Consistent, measurable results for students around the world.</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 text-center text-white">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <div className="text-5xl lg:text-6xl font-heading font-bold text-gold mb-3 drop-shadow-md">
                {stat.number}
              </div>
              <div className="text-sm lg:text-base font-medium tracking-wide text-gray-200">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
