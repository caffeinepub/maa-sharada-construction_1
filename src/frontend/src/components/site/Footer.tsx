import { Heart, Shield, Database } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const appIdentifier = typeof window !== 'undefined' 
    ? encodeURIComponent(window.location.hostname || 'smartwatch-datahub')
    : 'smartwatch-datahub';

  return (
    <footer className="bg-muted/50 border-t">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* Product Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="./assets/generated/smartwatch-datahub-logo.dim_512x512.png"
                alt="Smartwatch Data Hub Logo"
                className="h-10 w-10 object-contain"
              />
              <div>
                <h3 className="font-bold text-primary text-lg">
                  Smartwatch Data Hub
                </h3>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Import, analyze, and export your smartwatch health data. Your data stays private and secure on the Internet Computer.
            </p>
          </div>

          {/* Features */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Features</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start">
                <span className="h-1.5 w-1.5 rounded-full bg-primary mr-2 mt-1.5" />
                CSV & JSON Import
              </li>
              <li className="flex items-start">
                <span className="h-1.5 w-1.5 rounded-full bg-primary mr-2 mt-1.5" />
                Analytics Dashboard
              </li>
              <li className="flex items-start">
                <span className="h-1.5 w-1.5 rounded-full bg-primary mr-2 mt-1.5" />
                Data Export
              </li>
              <li className="flex items-start">
                <span className="h-1.5 w-1.5 rounded-full bg-primary mr-2 mt-1.5" />
                Secure Storage
              </li>
            </ul>
          </div>

          {/* Privacy */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Privacy First</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Shield className="h-4 w-4 text-primary" />
                Your data is private
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Database className="h-4 w-4 text-primary" />
                Stored on blockchain
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Heart className="h-4 w-4 text-primary" />
                No third-party access
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-muted-foreground text-center md:text-left">
              <p>© {currentYear} Smartwatch Data Hub. All rights reserved.</p>
            </div>
            <div className="text-sm text-muted-foreground text-center md:text-right">
              <p className="flex items-center justify-center md:justify-end gap-1">
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
