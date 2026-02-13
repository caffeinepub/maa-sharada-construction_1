import { Button } from '@/components/ui/button';
import { Building2, HardHat } from 'lucide-react';

export function HeroSection() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="home" className="relative overflow-hidden">
      {/* Hero Image with Overlay */}
      <div className="relative h-[500px] md:h-[600px] lg:h-[700px]">
        <div className="absolute inset-0">
          <img
            src="./assets/generated/maa-sharada-hero.dim_1600x900.png"
            alt="निर्माण स्थल"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/60" />
        </div>

        {/* Hero Content */}
        <div className="container relative h-full flex items-center">
          <div className="max-w-2xl space-y-6 md:space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <HardHat className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">
                विश्वसनीय निर्माण सेवाएं
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              आपके सपनों का घर
              <span className="block text-primary mt-2">
                हम बनाते हैं
              </span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-xl">
              इंदौर में गुणवत्तापूर्ण निर्माण सेवाएं। घर निर्माण से लेकर बाउंड्री वॉल तक, 
              सभी सामग्री के साथ पूर्ण समाधान।
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                size="lg"
                onClick={() => scrollToSection('contact')}
                className="text-base"
              >
                <Building2 className="mr-2 h-5 w-5" />
                अभी संपर्क करें
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => scrollToSection('services')}
                className="text-base"
              >
                हमारी सेवाएं देखें
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t">
              <div>
                <div className="text-2xl md:text-3xl font-bold text-primary">10+</div>
                <div className="text-sm text-muted-foreground">वर्षों का अनुभव</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-bold text-primary">100%</div>
                <div className="text-sm text-muted-foreground">गुणवत्ता की गारंटी</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-bold text-primary">24/7</div>
                <div className="text-sm text-muted-foreground">सहायता उपलब्ध</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
