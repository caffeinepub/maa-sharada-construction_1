import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Home, Fence, Paintbrush, Zap, DoorOpen, Grid3x3 } from 'lucide-react';

export function ServicesSection() {
  const services = [
    {
      icon: Home,
      title: 'घर निर्माण (सामग्री सहित)',
      description: 'पूर्ण घर निर्माण सेवाएं सभी आवश्यक निर्माण सामग्री के साथ। गुणवत्तापूर्ण सीमेंट, ईंट, रेत और अन्य सामग्री का उपयोग।',
      features: ['उच्च गुणवत्ता सामग्री', 'अनुभवी कारीगर', 'समय पर पूर्णता']
    },
    {
      icon: Fence,
      title: 'बाउंड्री/दीवार निर्माण',
      description: 'मजबूत और टिकाऊ बाउंड्री वॉल का निर्माण। सभी प्रकार की दीवारें - कंपाउंड वॉल, रिटेनिंग वॉल आदि।',
      features: ['मजबूत संरचना', 'सुरक्षित डिज़ाइन', 'लंबे समय तक टिकाऊ']
    },
    {
      icon: Paintbrush,
      title: 'रंगीन टाइल्स और फिनिशिंग',
      description: 'आधुनिक और आकर्षक रंगीन टाइल्स की फिटिंग। विभिन्न प्रकार के डिज़ाइन और पैटर्न उपलब्ध।',
      features: ['विविध डिज़ाइन', 'उच्च गुणवत्ता टाइल्स', 'पेशेवर फिटिंग']
    },
    {
      icon: DoorOpen,
      title: 'दरवाज़े और खिड़कियां',
      description: 'सभी प्रकार के दरवाज़े और खिड़कियों की स्थापना। लकड़ी, स्टील और UPVC दरवाज़े उपलब्ध।',
      features: ['मजबूत सामग्री', 'आधुनिक डिज़ाइन', 'सुरक्षित फिटिंग']
    },
    {
      icon: Grid3x3,
      title: 'सेटरी (सेंटरिंग) कार्य',
      description: 'छत और स्लैब के लिए पेशेवर सेंटरिंग कार्य। सुरक्षित और मजबूत संरचना की गारंटी।',
      features: ['सुरक्षित प्रक्रिया', 'गुणवत्ता सामग्री', 'अनुभवी टीम']
    },
    {
      icon: Zap,
      title: 'इलेक्ट्रिकल वायरिंग',
      description: 'संपूर्ण घर के लिए इलेक्ट्रिकल वायरिंग। सुरक्षित और मानक के अनुसार वायरिंग कार्य।',
      features: ['सुरक्षित वायरिंग', 'ISI मानक', 'वारंटी के साथ']
    }
  ];

  return (
    <section id="services" className="py-16 md:py-24 lg:py-32 bg-muted/30">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            हमारी <span className="text-primary">सेवाएं</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            निर्माण से संबंधित सभी सेवाएं एक ही स्थान पर। गुणवत्ता और विश्वसनीयता हमारी प्राथमिकता है।
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card
                key={index}
                className="group hover:shadow-construction transition-all duration-300 hover:-translate-y-1 border-2"
              >
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                    <Icon className="h-6 w-6 text-primary group-hover:text-primary-foreground transition-colors" />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                  <CardDescription className="text-base leading-relaxed">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-muted-foreground">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-12 md:mt-16 text-center">
          <Card className="max-w-2xl mx-auto bg-primary/5 border-primary/20">
            <CardContent className="pt-6">
              <p className="text-lg font-medium mb-2">
                सभी सेवाओं में निर्माण सामग्री शामिल है
              </p>
              <p className="text-muted-foreground">
                हम उच्च गुणवत्ता की सामग्री का उपयोग करते हैं और समय पर कार्य पूर्ण करने की गारंटी देते हैं।
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

