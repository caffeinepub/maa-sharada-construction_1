import { Phone, Mail, MapPin } from 'lucide-react';
import { SiFacebook, SiInstagram, SiWhatsapp } from 'react-icons/si';
import { Heart } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Generate app identifier for UTM tracking
  const appIdentifier = typeof window !== 'undefined' 
    ? encodeURIComponent(window.location.hostname || 'maa-sharada-construction')
    : 'maa-sharada-construction';

  return (
    <footer className="bg-muted/50 border-t">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="./assets/generated/maa-sharada-logo.dim_512x512.png"
                alt="Maa Sharada Construction लोगो"
                className="h-10 w-10 object-contain"
              />
              <div>
                <h3 className="font-bold text-primary text-lg">
                  Maa Sharada Construction
                </h3>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              इंदौर में विश्वसनीय निर्माण सेवाएं। गुणवत्ता और समय पर डिलीवरी हमारी प्राथमिकता है।
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground">त्वरित लिंक</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => scrollToSection('home')}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  होम
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('services')}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  सेवाएं
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('gallery')}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  प्रोजेक्ट्स
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  संपर्क करें
                </button>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground">हमारी सेवाएं</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start">
                <span className="h-1.5 w-1.5 rounded-full bg-primary mr-2 mt-1.5" />
                घर निर्माण
              </li>
              <li className="flex items-start">
                <span className="h-1.5 w-1.5 rounded-full bg-primary mr-2 mt-1.5" />
                बाउंड्री वॉल
              </li>
              <li className="flex items-start">
                <span className="h-1.5 w-1.5 rounded-full bg-primary mr-2 mt-1.5" />
                टाइल्स फिटिंग
              </li>
              <li className="flex items-start">
                <span className="h-1.5 w-1.5 rounded-full bg-primary mr-2 mt-1.5" />
                इलेक्ट्रिकल वायरिंग
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground">संपर्क जानकारी</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="tel:7047830463"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <Phone className="h-4 w-4" />
                  7047 830 463
                </a>
              </li>
              <li>
                <a
                  href="tel:9754645191"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <Phone className="h-4 w-4" />
                  9754645191
                </a>
              </li>
              <li>
                <a
                  href="mailto:dheerajjatav695@gmail.com"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  dheerajjatav695@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Indore+Madhya+Pradesh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <MapPin className="h-4 w-4" />
                  इंदौर, मध्य प्रदेश
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Links */}
        <div className="mt-12 pt-8 border-t">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <a
                href="https://wa.me/917047830463"
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label="WhatsApp"
              >
                <SiWhatsapp className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label="Facebook"
              >
                <SiFacebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label="Instagram"
              >
                <SiInstagram className="h-5 w-5" />
              </a>
            </div>
            <div className="text-sm text-muted-foreground text-center md:text-right">
              <p>© {currentYear} Maa Sharada Construction. सर्वाधिकार सुरक्षित।</p>
              <p className="mt-1 flex items-center justify-center md:justify-end gap-1">
                Built with <Heart className="h-3 w-3 text-primary fill-primary" /> using{' '}
                <a
                  href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appIdentifier}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline font-medium"
                >
                  caffeine.ai
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
