import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import maryannImg from '../../assets/images/maryann_portrait_1782669934165.jpg';
import tolaniImg from '../../assets/images/tolani_portrait_1782669947947.jpg';

const fallbackTestimonials = [
  {
    name: "Mrs. Maryann",
    location: "Ireland",
    text: "He taught my daughter, Elaine, Mathematics and Science from Year 8 through Year 9, during which she consistently achieved A grades in her examinations. He also tutored my second daughter, Aisling, in Mathematics from Year 11 through Year 12 in preparation for her GCSE examinations. Through his patient guidance, structured lessons, and personalized approach, she achieved an impressive score of 82% in her Mathematics exam. Tutor Mike has a remarkable ability to simplify complex concepts, build students' confidence, and help them achieve academic success. I highly recommend him to any parent seeking a dedicated and effective Mathematics and Science tutor.",
    image: maryannImg
  },
  {
    name: "Mrs. Tolani",
    location: "London, United Kingdom",
    text: "Tutor Mike began working with my son, Ope, in Year 6 to prepare him for his SAT Mathematics examination. Through his engaging teaching style, personalized support, and strong subject knowledge, Ope achieved an impressive score of 78% in his Maths exam. The progress and confidence my son gained under his guidance convinced me to continue with his tutoring services beyond the SATs. Since then, he has remained Ope's private Mathematics tutor through Year 7 and into Year 8, where he continues to provide exceptional academic support and mentorship. Tutor Mike is reliable, patient, and genuinely invested in his students' success. I highly recommend him to any parent looking for a skilled tutor who can help their child excel in Mathematics.",
    image: tolaniImg
  },
  {
    name: "Mr. Temple",
    location: "Ireland",
    text: "When my daughter, Jasmine, was in Year 9, she was finding Mathematics extremely challenging and lacked confidence in the subject. Seeking additional support, I engaged Tutor Mike to help her improve her understanding and performance. From the very beginning, he demonstrated exceptional patience, expertise, and a genuine commitment to her success. Under his guidance, Jasmine steadily improved and began achieving average scores of 60% and above in Mathematics. Her growing confidence and competence enabled her to successfully complete her state examinations and progress to higher-level Mathematics classes alongside senior students. What has impressed me most is the consistency of his support. Tutor Mike has remained Jasmine's private Mathematics tutor from Year 9 through to her final year (Year 12), helping her navigate every stage of her academic journey. I highly recommend Tutor Mike to any parent seeking a dedicated tutor who can help students overcome challenges, build confidence, and achieve meaningful academic progress.",
    image: "https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?w=400&h=400&fit=crop"
  }
];

export function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [testimonials, setTestimonials] = useState<any[]>(fallbackTestimonials);

  useEffect(() => {
    const fetchTestimonials = async () => {
      if (!supabase) return;
      
      try {
        const { data, error } = await supabase
          .from('testimonials')
          .select('*')
          .eq('status', 'approved')
          .order('created_at', { ascending: false });
          
        if (data && data.length > 0) {
          // Map DB structure to component structure
          setTestimonials(data.map((t: any) => ({
            name: t.parent_name,
            location: t.location,
            text: t.content,
            image: t.image_url || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop" // fallback image
          })));
        }
      } catch (err) {
        console.error("Error fetching testimonials:", err);
      }
    };
    
    fetchTestimonials();
  }, []);

  const next = () => setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1));
  const prev = () => setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1));

  return (
    <section id="testimonials" className="py-24 bg-light-grey">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-heading font-bold text-navy mb-4">What Parents Say</h2>
          <div className="h-1 w-20 bg-gold mx-auto rounded-full"></div>
        </div>

        <div className="relative">
          <button 
            onClick={prev}
            className="absolute left-0 top-1/2 -ml-4 lg:-ml-12 -translate-y-1/2 bg-white w-12 h-12 rounded-full shadow-md flex items-center justify-center text-navy hover:bg-gold hover:text-white transition-colors z-10"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <button 
            onClick={next}
            className="absolute right-0 top-1/2 -mr-4 lg:-mr-12 -translate-y-1/2 bg-white w-12 h-12 rounded-full shadow-md flex items-center justify-center text-navy hover:bg-gold hover:text-white transition-colors z-10"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-sm overflow-hidden text-center relative border border-gray-100">
            <Quote className="absolute top-8 left-8 w-16 h-16 text-gray-100" />
            
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="relative z-10"
              >
                <div className="w-28 h-28 mx-auto mb-6 rounded-full overflow-hidden border-4 border-light-grey shadow-sm">
                  <img src={testimonials[current].image} alt={testimonials[current].name} className="w-full h-full object-cover" />
                </div>
                
                <div className="flex justify-center gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-gold fill-current" />
                  ))}
                </div>
                
                <p className="text-sm lg:text-base text-gray-700 italic mb-8 font-heading leading-relaxed">
                  "{testimonials[current].text}"
                </p>
                
                <div>
                  <h4 className="font-heading font-bold text-navy text-lg">{testimonials[current].name}</h4>
                  <p className="text-gray-500 text-sm">Parent from {testimonials[current].location}</p>
                </div>
              </motion.div>
            </AnimatePresence>
            
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrent(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-colors ${current === idx ? 'bg-gold' : 'bg-gray-200'}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Process() {
  const steps = [
    { num: "01", title: "Book a Free Consultation" },
    { num: "02", title: "Student Assessment" },
    { num: "03", title: "Personalized Learning Plan" },
    { num: "04", title: "Weekly Tutoring Sessions" },
    { num: "05", title: "Track Progress & Results" }
  ];

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-heading font-bold text-navy mb-4">How It Works</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">A structured roadmap designed to identify gaps, accelerate learning, and achieve tangible results.</p>
        </div>

        <div className="relative">
          {/* Connector line for desktop */}
          <div className="hidden lg:block absolute top-12 left-0 w-full h-[2px] bg-gradient-to-r from-navy via-navy to-gold/30"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {steps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="relative text-center"
              >
                <div className="w-24 h-24 mx-auto bg-white border-4 border-navy rounded-full flex items-center justify-center mb-6 relative z-10 shadow-lg group hover:border-gold transition-colors">
                  <span className="text-3xl font-heading font-bold text-navy group-hover:text-gold transition-colors">{step.num}</span>
                </div>
                <h3 className="text-lg font-heading font-bold text-gray-800">{step.title}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
