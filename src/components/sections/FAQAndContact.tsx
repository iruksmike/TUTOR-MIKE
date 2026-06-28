import { useState, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Send, Mail, Phone, Clock } from 'lucide-react';
import { supabase } from '../../lib/supabase';

const faqData = [
  {
    q: "How are lessons conducted?",
    a: "All lessons are conducted online via high-quality video conferencing platforms. We use an interactive online whiteboard to ensure collaborative, engaging, and clear learning experiences."
  },
  {
    q: "What age groups do you teach?",
    a: "I work with students from Year 4 through Year 12 (approx. ages 8-18). The curriculum and teaching style are appropriately adapted depending on the student's age and academic level."
  },
  {
    q: "Do you teach internationally?",
    a: "Yes. I frequently tutor students located in the UK, USA, Canada, and Australia, aligning my sessions with their respective local curricula to provide precise, relevant academic support."
  },
  {
    q: "How much do lessons cost?",
    a: "Lesson fees are highly competitive and structured based on frequency and year group. Please book a free consultation so we can discuss a customized learning plan and transparent pricing."
  },
  {
    q: "Can parents track progress?",
    a: "Absolutely. I provide brief weekly updates alongside a comprehensive monthly progress report showing the topics covered, improvements made, and focus areas for the next month."
  },
  {
    q: "How often should students attend sessions?",
    a: "It depends strongly on the student's foundation and goals. Most students find optimal progress taking 2 to 3 sessions per week, per subject. We will finalize this recommendation after their initial assessment."
  }
];

export function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 bg-light-grey">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-heading font-bold text-navy mb-4">Frequently Asked Questions</h2>
          <div className="h-1 w-20 bg-gold mx-auto rounded-full"></div>
        </div>

        <div className="space-y-4">
          {faqData.map((faq, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
            >
              <button
                className="w-full px-6 py-5 text-left flex justify-between items-center bg-white hover:bg-gray-50 focus:outline-none"
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
              >
                <span className="font-heading font-semibold text-lg text-navy pr-4">{faq.q}</span>
                <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-300 shrink-0 ${openIdx === idx ? 'rotate-180' : ''}`} />
              </button>
              
              <AnimatePresence>
                {openIdx === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-5 pt-0 text-gray-600">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Contact() {
  const [status, setStatus] = useState<'' | 'submitting' | 'success' | 'error'>('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    // If Supabase is connected, handle form submission ourselves
    if (supabase) {
      e.preventDefault();
      setStatus('submitting');
      
      const form = e.target as HTMLFormElement;
      const formData = new FormData(form);
      
      const { error } = await supabase.from('leads').insert([
        {
          parent_name: formData.get('Parent Name'),
          student_name: formData.get('Student Name'),
          email: formData.get('email'),
          phone: formData.get('Phone'),
          country: formData.get('Country'),
          year_group: formData.get('Year Group'),
          subject: formData.get('Subject'),
          message: formData.get('Message'),
        }
      ]);

      if (error) {
        setStatus('error');
        setErrorMessage(error.message);
        setTimeout(() => setStatus(''), 5000);
      } else {
        // Send email via formsubmit.co AJAX
        try {
          await fetch('https://formsubmit.co/ajax/iruksmike@gmail.com', {
            method: 'POST',
            headers: { 
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            body: JSON.stringify(Object.fromEntries(formData))
          });
        } catch (err) {
          console.error("Error sending email:", err);
        }

        setStatus('success');
        form.reset();
        setTimeout(() => setStatus(''), 4000);
      }
    }
    // If no Supabase, allow default form submit behavior (to formsubmit.co)
  };

  return (
    <section id="contact" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          
          <div className="lg:col-span-2">
            <h2 className="text-4xl font-heading font-bold text-navy mb-6">
              Let's Discuss Your Child's Academic Success
            </h2>
            <p className="text-gray-600 mb-8 text-lg">
              Fill out the form below to book your free, no-obligation consultation. We'll discuss your child's current level, goals, and outline a tailored roadmap.
            </p>
            <div className="bg-navy p-8 rounded-2xl text-white">
              <h4 className="font-heading font-bold text-xl mb-4 text-gold">Direct Contact</h4>
              <ul className="space-y-6 text-gray-200">
                <li className="flex items-start gap-4 group">
                  <Mail className="w-6 h-6 text-gold group-hover:text-gold-light mt-0.5 shrink-0 transition-colors" />
                  <div>
                    <strong className="block text-white mb-1">Email</strong> 
                    <a href="mailto:iruksmike@gmail.com" className="hover:text-white hover:underline transition-all">iruksmike@gmail.com</a>
                  </div>
                </li>
                <li className="flex items-start gap-4 group">
                  <Phone className="w-6 h-6 text-gold group-hover:text-gold-light mt-0.5 shrink-0 transition-colors" />
                  <div>
                    <strong className="block text-white mb-1">Phone / WhatsApp</strong> 
                    <a href="https://wa.me/2348065188355" target="_blank" rel="noopener noreferrer" className="hover:text-white hover:underline transition-all">+234 806518 8355</a>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <Clock className="w-6 h-6 text-gold mt-0.5 shrink-0" />
                  <div>
                    <strong className="block text-white mb-1">Availability</strong> 
                    Mon - Sat (Flexible Hours)
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit} action="https://formsubmit.co/iruksmike@gmail.com" method="POST" className="bg-light-grey p-8 rounded-2xl border border-gray-100 shadow-sm space-y-6">
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_subject" value="New Tutoring Consultation Request!" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-navy mb-2">Parent Name</label>
                  <input required name="Parent Name" type="text" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gold bg-white" placeholder="Jane Doe" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-navy mb-2">Student Name</label>
                  <input required name="Student Name" type="text" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gold bg-white" placeholder="John Doe" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-navy mb-2">Email Address</label>
                  <input required name="email" type="email" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gold bg-white" placeholder="jane@example.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-navy mb-2">Phone Number</label>
                  <input required name="Phone" type="tel" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gold bg-white" placeholder="+1..." />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-navy mb-2">Country</label>
                  <select required name="Country" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gold bg-white">
                    <option value="">Select...</option>
                    <option value="UK">UK</option>
                    <option value="USA">USA</option>
                    <option value="Canada">Canada</option>
                    <option value="Australia">Australia</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-navy mb-2">Year Group</label>
                  <select required name="Year Group" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gold bg-white">
                    <option value="">Select...</option>
                    {[4, 5, 6, 7, 8, 9, 10, 11, 12].map(y => (
                      <option key={y} value={`Year ${y}`}>Year {y}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-navy mb-2">Subject Needed</label>
                  <select required name="Subject" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gold bg-white">
                    <option value="">Select...</option>
                    <option value="Maths">Mathematics</option>
                    <option value="Science">Science (Core)</option>
                    <option value="Physics">Physics</option>
                    <option value="Chemistry">Chemistry</option>
                    <option value="Other">Other / Both</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-navy mb-2">Message</label>
                <textarea required name="Message" rows={4} className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gold bg-white resize-none" placeholder="Tell me briefly about your child's goals and current challenges..."></textarea>
              </div>

              <button 
                type="submit" 
                disabled={status === 'submitting'}
                className="w-full bg-navy hover:bg-navy-light text-white font-semibold px-8 py-4 rounded-xl transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {status === 'submitting' ? 'Sending...' : 'Book Consultation'}
                {status !== 'submitting' && <Send className="w-5 h-5" />}
              </button>
              
              {status === 'success' && (
                <div className="p-4 bg-green-50 text-green-700 rounded-lg text-center font-medium shadow-sm">
                  Message submitted successfully! I'll be in touch shortly.
                </div>
              )}
              {status === 'error' && (
                <div className="p-4 bg-red-50 text-red-700 rounded-lg text-center font-medium shadow-sm">
                  Error: {errorMessage}
                </div>
              )}
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
