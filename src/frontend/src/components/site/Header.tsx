import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsOpen(false);
    }
  };

  const navItems = [
    { id: 'home', label: 'होम' },
    { id: 'services', label: 'सेवाएं' },
    { id: 'gallery', label: 'प्रोजेक्ट्स' },
    { id: 'contact', label: 'संपर्क करें' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container flex h-16 md:h-20 items-center justify-between">
        <div className="flex items-center gap-3 md:gap-4">
          <img
            src="./assets/generated/maa-sharada-logo.dim_512x512.png"
            alt="Maa Sharada Construction लोगो"
            className="h-10 w-10 md:h-12 md:w-12 object-contain"
          />
          <div className="flex flex-col">
            <h1 className="text-lg md:text-xl font-bold text-primary leading-tight">
              Maa Sharada Construction
            </h1>
            <p className="text-xs text-muted-foreground hidden sm:block">
              इंदौर, मध्य प्रदेश
            </p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              {item.label}
            </button>
          ))}
          <Button
            onClick={() => scrollToSection('contact')}
            className="ml-2"
          >
            संपर्क करें
          </Button>
        </nav>

        {/* Mobile Navigation */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">मेनू खोलें</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[280px]">
            <div className="flex flex-col gap-6 mt-8">
              <div className="flex items-center gap-3 pb-4 border-b">
                <img
                  src="./assets/generated/maa-sharada-logo.dim_512x512.png"
                  alt="Maa Sharada Construction लोगो"
                  className="h-10 w-10 object-contain"
                />
                <div className="flex flex-col">
                  <span className="font-bold text-primary text-sm">
                    Maa Sharada Construction
                  </span>
                  <span className="text-xs text-muted-foreground">
                    इंदौर, मध्य प्रदेश
                  </span>
                </div>
              </div>
              <nav className="flex flex-col gap-4">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="text-left text-base font-medium text-foreground hover:text-primary transition-colors py-2"
                  >
                    {item.label}
                  </button>
                ))}
              </nav>
              <Button
                onClick={() => scrollToSection('contact')}
                className="w-full mt-4"
              >
                संपर्क करें
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
