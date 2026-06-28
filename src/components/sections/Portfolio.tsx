import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, X } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  image_url: string;
}

export function PortfolioGallery() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState('All');
  const [loading, setLoading] = useState(true);

  // Default hardcoded projects for fallback
  const fallbackProjects = [
    {
      id: '1',
      title: 'A-Level Results Improvement',
      description: 'Worked with a student for 6 months, improving their A-Level Maths grade from a C to an A.',
      category: 'Exam Success',
      image_url: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800&q=80&fit=crop'
    },
    {
      id: '2',
      title: 'Interactive Study Materials',
      description: 'Customized resources prepared for Year 9 Science students to make physics concepts digestable.',
      category: 'Resources',
      image_url: 'https://images.unsplash.com/photo-1606326189673-8e50b86a0201?w=800&q=80&fit=crop'
    },
    {
      id: '3',
      title: '11+ Entrance Exam Prep',
      description: 'Intensive 8-week bootcamp focusing on non-verbal reasoning and maths resulting in admission to top grammar school.',
      category: 'Exam Success',
      image_url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80&fit=crop'
    }
  ];

  useEffect(() => {
    const fetchProjects = async () => {
      if (!supabase) {
        setProjects(fallbackProjects);
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('portfolio_projects')
          .select('*')
          .order('created_at', { ascending: false });

        if (error || !data || data.length === 0) {
          setProjects(fallbackProjects);
        } else {
          setProjects(data);
        }
      } catch (err) {
        setProjects(fallbackProjects);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const categories = ['All', ...Array.from(new Set(projects.map(p => p.category).filter(Boolean)))];

  const filteredProjects = projects.filter(p => filter === 'All' || p.category === filter);

  return (
    <section id="portfolio" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-heading font-bold text-navy mb-4">Portfolio & Resources</h2>
          <div className="h-1 w-20 bg-gold mx-auto rounded-full mb-8"></div>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg hover:text-navy transition-colors">
            A glimpse into the successes, resources, and achievements obtained over years of professional tutoring.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
                filter === cat
                  ? 'bg-navy text-white shadow-md'
                  : 'bg-light-grey text-navy hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, idx) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, delay: idx * 0.1 }}
              key={project.id}
              className="group cursor-pointer rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 bg-white border border-gray-100"
              onClick={() => setSelectedProject(project)}
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={project.image_url} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-navy/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white font-medium flex items-center gap-2">
                    View Details <ExternalLink className="w-4 h-4" />
                  </span>
                </div>
              </div>
              <div className="p-6">
                <span className="text-gold text-sm font-bold tracking-wider uppercase mb-2 block">{project.category}</span>
                <h3 className="font-heading font-bold text-xl text-navy">{project.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal View */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-2xl overflow-hidden max-w-4xl w-full max-h-[90vh] flex flex-col md:flex-row relative"
              onClick={e => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 bg-white/80 backdrop-blur p-2 rounded-full hover:bg-white text-gray-800 transition-colors z-10"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="w-full md:w-1/2 h-64 md:h-auto">
                <img 
                  src={selectedProject.image_url} 
                  alt={selectedProject.title}
                  className="w-full h-full object-cover" 
                />
              </div>
              
              <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center overflow-y-auto">
                <span className="text-gold font-bold uppercase tracking-wider text-sm mb-4 block">
                  {selectedProject.category}
                </span>
                <h3 className="font-heading font-bold text-3xl text-navy mb-6">
                  {selectedProject.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                  {selectedProject.description}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
