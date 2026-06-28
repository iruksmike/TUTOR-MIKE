import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { Hero, TrustBar } from '../components/sections/HeroAndTrust';
import { About, Skills } from '../components/sections/AboutAndSkills';
import { Services, Results } from '../components/sections/ServicesAndResults';
import { Testimonials, Process } from '../components/sections/TestimonialsAndProcess';
import { FAQ, Contact } from '../components/sections/FAQAndContact';
import FloatingWhatsApp from '../components/layout/FloatingWhatsApp';

export default function Home() {
  return (
    <div className="min-h-screen bg-light-grey">
      <Navbar />
      <main>
        <Hero />
        <TrustBar />
        <About />
        <Skills />
        <Services />
        <Results />
        <Testimonials />
        <Process />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}

