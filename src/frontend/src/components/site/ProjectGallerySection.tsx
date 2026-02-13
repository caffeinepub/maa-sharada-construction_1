import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogClose } from '@/components/ui/dialog';
import { X } from 'lucide-react';

export function ProjectGallerySection() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const galleryImages = [
    {
      src: './assets/generated/maa-sharada-gallery-01.dim_1200x800.png',
      alt: 'निर्माण परियोजना 1 - पूर्ण घर निर्माण',
      title: 'आवासीय निर्माण परियोजना'
    },
    {
      src: './assets/generated/maa-sharada-gallery-02.dim_1200x800.png',
      alt: 'निर्माण परियोजना 2 - बाउंड्री वॉल',
      title: 'बाउंड्री वॉल निर्माण'
    },
    {
      src: './assets/generated/maa-sharada-gallery-03.dim_1200x800.png',
      alt: 'निर्माण परियोजना 3 - टाइल्स फिटिंग',
      title: 'टाइल्स और फिनिशिंग कार्य'
    },
    {
      src: './assets/generated/maa-sharada-gallery-04.dim_1200x800.png',
      alt: 'निर्माण परियोजना 4 - दरवाज़े और खिड़कियां',
      title: 'दरवाज़े और खिड़कियां स्थापना'
    },
    {
      src: './assets/generated/maa-sharada-gallery-05.dim_1200x800.png',
      alt: 'निर्माण परियोजना 5 - सेंटरिंग कार्य',
      title: 'सेंटरिंग और स्लैब कार्य'
    },
    {
      src: './assets/generated/maa-sharada-gallery-06.dim_1200x800.png',
      alt: 'निर्माण परियोजना 6 - इलेक्ट्रिकल वायरिंग',
      title: 'इलेक्ट्रिकल वायरिंग कार्य'
    }
  ];

  const handleImageClick = (index: number) => {
    setSelectedImage(index);
  };

  const handleClose = () => {
    setSelectedImage(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleClose();
    }
  };

  return (
    <section id="gallery" className="py-16 md:py-24 lg:py-32 scroll-mt-20">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            हमारे <span className="text-primary">प्रोजेक्ट्स</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            हमारे द्वारा पूर्ण किए गए कुछ निर्माण कार्यों की झलक। गुणवत्ता और शिल्प कौशल में हमारी विशेषज्ञता देखें।
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {galleryImages.map((image, index) => (
            <Card
              key={index}
              className="group overflow-hidden cursor-pointer hover:shadow-construction transition-all duration-300 hover:-translate-y-1 border-2"
              onClick={() => handleImageClick(index)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleImageClick(index);
                }
              }}
              tabIndex={0}
              role="button"
              aria-label={`${image.title} देखें`}
            >
              <div className="aspect-[3/2] overflow-hidden bg-muted">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  loading="lazy"
                />
              </div>
              <div className="p-4 bg-background">
                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                  {image.title}
                </h3>
              </div>
            </Card>
          ))}
        </div>

        {/* Image Preview Dialog */}
        <Dialog open={selectedImage !== null} onOpenChange={(open) => !open && handleClose()}>
          <DialogContent
            className="max-w-5xl w-[95vw] p-0 overflow-hidden"
            onKeyDown={handleKeyDown}
          >
            {selectedImage !== null && (
              <div className="relative">
                <DialogClose
                  className="absolute top-4 right-4 z-10 rounded-full bg-background/80 backdrop-blur-sm p-2 hover:bg-background transition-colors"
                  aria-label="बंद करें"
                >
                  <X className="h-5 w-5" />
                </DialogClose>
                <div className="bg-muted">
                  <img
                    src={galleryImages[selectedImage].src}
                    alt={galleryImages[selectedImage].alt}
                    className="w-full h-auto max-h-[85vh] object-contain"
                  />
                </div>
                <div className="p-6 bg-background">
                  <h3 className="text-xl font-semibold text-foreground">
                    {galleryImages[selectedImage].title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {galleryImages[selectedImage].alt}
                  </p>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
