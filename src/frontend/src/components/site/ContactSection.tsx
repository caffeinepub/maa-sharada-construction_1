import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

export function ContactSection() {
  const contactInfo = [
    {
      icon: Phone,
      title: 'फोन नंबर',
      items: [
        { label: '7047 830 463', href: 'tel:7047830463' },
        { label: '9754645191', href: 'tel:9754645191' }
      ]
    },
    {
      icon: Mail,
      title: 'ईमेल',
      items: [
        { label: 'dheerajjatav695@gmail.com', href: 'mailto:dheerajjatav695@gmail.com' }
      ]
    },
    {
      icon: MapPin,
      title: 'स्थान',
      items: [
        { 
          label: 'इंदौर, मध्य प्रदेश', 
          href: 'https://www.google.com/maps/search/?api=1&query=Indore+Madhya+Pradesh' 
        }
      ]
    },
    {
      icon: Clock,
      title: 'कार्य समय',
      items: [
        { label: 'सोमवार - शनिवार: 8:00 AM - 7:00 PM', href: null },
        { label: 'रविवार: 9:00 AM - 5:00 PM', href: null }
      ]
    }
  ];

  return (
    <section id="contact" className="py-16 md:py-24 lg:py-32">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            हमसे <span className="text-primary">संपर्क करें</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            अपने निर्माण प्रोजेक्ट के लिए आज ही संपर्क करें। हम आपकी सेवा के लिए तैयार हैं।
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {contactInfo.map((info, index) => {
            const Icon = info.icon;
            return (
              <Card key={index} className="text-center hover:shadow-construction transition-shadow">
                <CardHeader>
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{info.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {info.items.map((item, idx) => (
                      item.href ? (
                        <a
                          key={idx}
                          href={item.href}
                          target={item.href.startsWith('http') ? '_blank' : undefined}
                          rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                          className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                        >
                          {item.label}
                        </a>
                      ) : (
                        <p key={idx} className="text-sm text-muted-foreground">
                          {item.label}
                        </p>
                      )
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Card className="max-w-4xl mx-auto bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl md:text-3xl">
              निःशुल्क परामर्श के लिए आज ही कॉल करें
            </CardTitle>
            <CardDescription className="text-base">
              हमारे विशेषज्ञ आपके प्रोजेक्ट के लिए सर्वोत्तम समाधान प्रदान करेंगे
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="text-base">
              <a href="tel:7047830463">
                <Phone className="mr-2 h-5 w-5" />
                7047 830 463
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild className="text-base">
              <a href="tel:9754645191">
                <Phone className="mr-2 h-5 w-5" />
                9754645191
              </a>
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

