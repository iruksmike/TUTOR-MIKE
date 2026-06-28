import { useState, useEffect, type FormEvent } from 'react';
import { LayoutDashboard, Users, MessageSquare, Image as ImageIcon, Settings, LogOut, Plus, Trash2, CheckCircle, XCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

// This is a CMS interface connected to Supabase
export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('leads');
  const [passwordInput, setPasswordInput] = useState('ENvoy@24');
  const [errorMsg, setErrorMsg] = useState('');
  
  const [leads, setLeads] = useState<any[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [portfolio, setPortfolio] = useState<any[]>([]);
  
  const [isLoading, setIsLoading] = useState(false);

  // Form states for adding new items
  const [showAddTestimonial, setShowAddTestimonial] = useState(false);
  const [showAddPortfolio, setShowAddPortfolio] = useState(false);

  useEffect(() => {
    if (isAuthenticated && supabase) {
      if (activeTab === 'leads') fetchLeads();
      if (activeTab === 'testimonials') fetchTestimonials();
      if (activeTab === 'portfolio') fetchPortfolio();
    }
  }, [isAuthenticated, activeTab]);

  const fetchLeads = async () => {
    if (!supabase) return;
    setIsLoading(true);
    const { data } = await supabase.from('leads').select('*').order('created_at', { ascending: false });
    if (data) setLeads(data);
    setIsLoading(false);
  };

  const fetchTestimonials = async () => {
    if (!supabase) return;
    setIsLoading(true);
    const { data } = await supabase.from('testimonials').select('*').order('created_at', { ascending: false });
    if (data) setTestimonials(data);
    setIsLoading(false);
  };

  const fetchPortfolio = async () => {
    if (!supabase) return;
    setIsLoading(true);
    const { data } = await supabase.from('portfolio_projects').select('*').order('created_at', { ascending: false });
    if (data) setPortfolio(data);
    setIsLoading(false);
  };

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    if (passwordInput === 'ENvoy@24') {
      setIsAuthenticated(true);
      setErrorMsg('');
    } else {
      setErrorMsg('Invalid password');
    }
  };

  const toggleTestimonialStatus = async (id: string, currentStatus: string) => {
    if (!supabase) return;
    const newStatus = currentStatus === 'approved' ? 'pending' : 'approved';
    await supabase.from('testimonials').update({ status: newStatus }).eq('id', id);
    fetchTestimonials();
  };

  const deleteTestimonial = async (id: string) => {
    if (!supabase || !confirm('Are you sure you want to delete this testimonial?')) return;
    await supabase.from('testimonials').delete().eq('id', id);
    fetchTestimonials();
  };

  const deletePortfolio = async (id: string) => {
    if (!supabase || !confirm('Are you sure you want to delete this project?')) return;
    await supabase.from('portfolio_projects').delete().eq('id', id);
    fetchPortfolio();
  };

  const handleAddTestimonial = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!supabase) return;
    const formData = new FormData(e.currentTarget);
    await supabase.from('testimonials').insert([{
      parent_name: formData.get('parent_name'),
      location: formData.get('location'),
      content: formData.get('content'),
      image_url: formData.get('image_url') || null,
      status: 'approved'
    }]);
    setShowAddTestimonial(false);
    fetchTestimonials();
  };

  const handleAddPortfolio = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!supabase) return;
    const formData = new FormData(e.currentTarget);
    await supabase.from('portfolio_projects').insert([{
      title: formData.get('title'),
      category: formData.get('category'),
      description: formData.get('description'),
      image_url: formData.get('image_url')
    }]);
    setShowAddPortfolio(false);
    fetchPortfolio();
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-light-grey flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full border border-gray-100">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-heading font-bold text-navy mb-2">Admin Portal</h1>
            <p className="text-gray-500">Secure access to Tutor Mike CMS</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-navy mb-1">Email</label>
              <input required type="email" defaultValue="iruksmike@gmail.com" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gold bg-light-grey" />
            </div>
            <div>
              <label className="block text-sm font-medium text-navy mb-1">Password</label>
              <input required type="password" value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gold bg-light-grey" />
              {errorMsg && <p className="text-red-500 text-xs mt-2">{errorMsg}</p>}
            </div>
            <button type="submit" className="w-full bg-navy hover:bg-navy-light text-white font-semibold py-3 rounded-xl transition-colors">
              Login to Dashboard
            </button>
            <p className="text-xs text-center text-gray-400 mt-4">*This connects directly to Supabase.</p>
          </form>
        </div>
      </div>
    );
  }

  const navItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Analytics' },
    { id: 'leads', icon: Users, label: 'Leads' },
    { id: 'testimonials', icon: MessageSquare, label: 'Testimonials' },
    { id: 'portfolio', icon: ImageIcon, label: 'Portfolio Gallery' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="min-h-screen bg-light-grey flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-navy text-white flex flex-col md:min-h-screen shadow-xl shrink-0">
        <div className="p-6 border-b border-navy-light shrink-0">
          <h2 className="text-xl font-heading font-bold">Admin Portal</h2>
          <p className="text-gold text-xs mt-1">Tutor Mike CMS</p>
        </div>
        
        <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 justify-start rounded-lg transition-colors ${activeTab === item.id ? 'bg-gold text-navy font-semibold' : 'text-gray-300 hover:bg-navy-light hover:text-white'}`}
            >
              <item.icon className="w-5 h-5 shrink-0" />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-navy-light shrink-0">
          <button 
            onClick={() => setIsAuthenticated(false)}
            className="w-full flex items-center justify-start gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-red-500/10 hover:text-red-400 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-8 overflow-y-auto">
        
        {/* Mock Analytics Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-heading font-bold text-navy capitalize">{activeTab}</h2>
          <p className="text-gray-500 mt-1">Manage your website content and track performance.</p>
        </div>

        {activeTab === 'leads' && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden shrink-0">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h3 className="font-heading font-bold text-lg text-navy">Recent Enquiries</h3>
              <button 
                onClick={fetchLeads} 
                className="text-sm bg-navy hover:bg-navy-light text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
                disabled={isLoading}
              >
                {isLoading ? 'Loading...' : 'Refresh'}
              </button>
            </div>
            
            <div className="overflow-x-auto p-0">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-light-grey text-gray-500 text-sm">
                    <th className="p-4 font-medium border-b border-gray-100">Parent</th>
                    <th className="p-4 font-medium border-b border-gray-100">Contact</th>
                    <th className="p-4 font-medium border-b border-gray-100">Country</th>
                    <th className="p-4 font-medium border-b border-gray-100">Subject</th>
                    <th className="p-4 font-medium border-b border-gray-100">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.length > 0 ? leads.map((lead, i) => (
                    <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                      <td className="p-4 border-b border-gray-50 text-navy font-medium">{lead.parent_name}</td>
                      <td className="p-4 border-b border-gray-50 text-gray-500 text-sm">{lead.email}<br/><span className="text-xs text-gray-400">{lead.phone}</span></td>
                      <td className="p-4 border-b border-gray-50 text-gray-500 text-sm">{lead.country}</td>
                      <td className="p-4 border-b border-gray-50 text-gray-500 text-sm">{lead.subject}</td>
                      <td className="p-4 border-b border-gray-50 text-gray-500 text-sm">{new Date(lead.created_at).toLocaleDateString()}</td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan={5} className="p-8 text-center text-gray-500">
                        {isLoading ? 'Loading...' : 'No leads found in database yet.'}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'testimonials' && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden shrink-0">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h3 className="font-heading font-bold text-lg text-navy">Manage Testimonials</h3>
              <div className="flex gap-2">
                <button 
                  onClick={() => setShowAddTestimonial(!showAddTestimonial)} 
                  className="text-sm bg-gold hover:bg-gold-light text-navy font-medium px-4 py-2 rounded-lg transition-colors flex items-center gap-1"
                >
                  <Plus className="w-4 h-4" /> Add New
                </button>
              </div>
            </div>

            {showAddTestimonial && (
              <form onSubmit={handleAddTestimonial} className="p-6 bg-light-grey border-b border-gray-100 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input required name="parent_name" placeholder="Parent Name" className="w-full px-4 py-2 border rounded" />
                  <input required name="location" placeholder="Location" className="w-full px-4 py-2 border rounded" />
                </div>
                <input name="image_url" placeholder="Image URL (Optional)" className="w-full px-4 py-2 border rounded" />
                <textarea required name="content" placeholder="Testimonial Text" rows={4} className="w-full px-4 py-2 border rounded" />
                <button type="submit" className="bg-navy text-white px-4 py-2 rounded">Save Testimonial</button>
              </form>
            )}

            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              {testimonials.map(t => (
                <div key={t.id} className="border border-gray-100 rounded-xl p-4 shadow-sm flex flex-col">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-bold text-navy">{t.parent_name}</h4>
                      <p className="text-xs text-gray-500">{t.location}</p>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => toggleTestimonialStatus(t.id, t.status)} className="text-sm">
                        {t.status === 'approved' ? <CheckCircle className="w-5 h-5 text-green-500" /> : <XCircle className="w-5 h-5 text-gray-300" />}
                      </button>
                      <button onClick={() => deleteTestimonial(t.id)} className="text-gray-400 hover:text-red-500">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 flex-1 line-clamp-3">{t.content}</p>
                </div>
              ))}
              {testimonials.length === 0 && !isLoading && (
                 <p className="text-gray-500 col-span-2">No testimonials found.</p>
              )}
            </div>
          </div>
        )}

        {activeTab === 'portfolio' && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden shrink-0">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h3 className="font-heading font-bold text-lg text-navy">Manage Portfolio</h3>
              <div className="flex gap-2">
                <button 
                  onClick={() => setShowAddPortfolio(!showAddPortfolio)} 
                  className="text-sm bg-gold hover:bg-gold-light text-navy font-medium px-4 py-2 rounded-lg transition-colors flex items-center gap-1"
                >
                  <Plus className="w-4 h-4" /> Add Project
                </button>
              </div>
            </div>

            {showAddPortfolio && (
              <form onSubmit={handleAddPortfolio} className="p-6 bg-light-grey border-b border-gray-100 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input required name="title" placeholder="Project Title" className="w-full px-4 py-2 border rounded" />
                  <input required name="category" placeholder="Category (e.g. Exam Success)" className="w-full px-4 py-2 border rounded" />
                </div>
                <input required name="image_url" placeholder="Image URL" className="w-full px-4 py-2 border rounded" />
                <textarea required name="description" placeholder="Project Description" rows={4} className="w-full px-4 py-2 border rounded" />
                <button type="submit" className="bg-navy text-white px-4 py-2 rounded">Save Project</button>
              </form>
            )}

            <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {portfolio.map(p => (
                <div key={p.id} className="border border-gray-100 rounded-xl overflow-hidden shadow-sm flex flex-col">
                  <div className="h-32 overflow-hidden relative">
                    <img src={p.image_url} alt={p.title} className="w-full h-full object-cover" />
                    <button 
                      onClick={() => deletePortfolio(p.id)} 
                      className="absolute top-2 right-2 bg-white/80 p-1.5 rounded-full hover:bg-red-500 hover:text-white transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="p-4 flex-1 flex flex-col">
                    <span className="text-xs text-gold font-bold uppercase mb-1">{p.category}</span>
                    <h4 className="font-bold text-navy mb-2">{p.title}</h4>
                    <p className="text-xs text-gray-600 line-clamp-2">{p.description}</p>
                  </div>
                </div>
              ))}
              {portfolio.length === 0 && !isLoading && (
                 <p className="text-gray-500 col-span-3">No portfolio items found.</p>
              )}
            </div>
          </div>
        )}

        {activeTab === 'dashboard' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 shrink-0">
            {[{label: 'Total Visitors', val: '2,400'}, {label: 'Form Submissions', val: leads.length}, {label: 'Conversion Rate', val: '3.5%'}, {label: 'Avg. Session', val: '2m 14s'}].map((stat, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <p className="text-gray-500 text-sm mb-2">{stat.label}</p>
                <p className="text-3xl font-heading font-bold text-navy">{stat.val}</p>
              </div>
            ))}
          </div>
        )}

        {(activeTab === 'settings') && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center flex flex-col items-center justify-center min-h-[300px]">
            <Settings className="w-12 h-12 text-gray-300 mb-4 animate-spin-slow" />
            <h3 className="text-xl font-heading font-bold text-navy mb-2">{activeTab} Manager</h3>
            <p className="text-gray-500 max-w-sm">This is a settings UI. Additional features can be developed here.</p>
          </div>
        )}

      </main>
    </div>
  );
}
