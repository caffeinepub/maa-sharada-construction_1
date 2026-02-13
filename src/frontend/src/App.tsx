import { Header } from './components/site/Header';
import { HeroSection } from './components/site/HeroSection';
import { ServicesSection } from './components/site/ServicesSection';
import { ProjectGallerySection } from './components/site/ProjectGallerySection';
import { ContactSection } from './components/site/ContactSection';
import { Footer } from './components/site/Footer';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <ServicesSection />
        <ProjectGallerySection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
