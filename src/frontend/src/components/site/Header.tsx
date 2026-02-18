import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Activity, Upload, BarChart3, Database, LogOut, LogIn } from 'lucide-react';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { useQueryClient } from '@tanstack/react-query';

type View = 'import' | 'dashboard' | 'datasets' | 'dataset-details';

interface HeaderProps {
  currentView: View;
  onNavigate: (view: View) => void;
}

export function Header({ currentView, onNavigate }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { login, clear, loginStatus, identity } = useInternetIdentity();
  const queryClient = useQueryClient();

  const isAuthenticated = !!identity;
  const isLoggingIn = loginStatus === 'logging-in';

  const handleAuth = async () => {
    if (isAuthenticated) {
      await clear();
      queryClient.clear();
    } else {
      try {
        await login();
      } catch (error: any) {
        console.error('Login error:', error);
        if (error.message === 'User is already authenticated') {
          await clear();
          setTimeout(() => login(), 300);
        }
      }
    }
  };

  const handleNavigate = (view: View) => {
    onNavigate(view);
    setIsOpen(false);
  };

  const navItems = [
    { id: 'import' as View, label: 'Import', icon: Upload },
    { id: 'dashboard' as View, label: 'Dashboard', icon: BarChart3 },
    { id: 'datasets' as View, label: 'Datasets', icon: Database },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container flex h-16 md:h-20 items-center justify-between">
        <div className="flex items-center gap-3 md:gap-4">
          <img
            src="./assets/generated/smartwatch-datahub-logo.dim_512x512.png"
            alt="Smartwatch Data Hub Logo"
            className="h-10 w-10 md:h-12 md:w-12 object-contain"
          />
          <div className="flex flex-col">
            <h1 className="text-lg md:text-xl font-bold text-primary leading-tight flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Smartwatch Data Hub
            </h1>
            <p className="text-xs text-muted-foreground hidden sm:block">
              Import, Analyze & Export Your Health Data
            </p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {isAuthenticated && navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => handleNavigate(item.id)}
                className={`text-sm font-medium transition-colors flex items-center gap-2 ${
                  currentView === item.id
                    ? 'text-primary'
                    : 'text-foreground hover:text-primary'
                }`}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </button>
            );
          })}
          <Button
            onClick={handleAuth}
            disabled={isLoggingIn}
            variant={isAuthenticated ? 'outline' : 'default'}
            className="ml-2"
          >
            {isLoggingIn ? (
              'Logging in...'
            ) : isAuthenticated ? (
              <>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </>
            ) : (
              <>
                <LogIn className="h-4 w-4 mr-2" />
                Login
              </>
            )}
          </Button>
        </nav>

        {/* Mobile Navigation */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[280px]">
            <div className="flex flex-col gap-6 mt-8">
              <div className="flex items-center gap-3 pb-4 border-b">
                <img
                  src="./assets/generated/smartwatch-datahub-logo.dim_512x512.png"
                  alt="Smartwatch Data Hub Logo"
                  className="h-10 w-10 object-contain"
                />
                <div className="flex flex-col">
                  <span className="font-bold text-primary text-sm">
                    Smartwatch Data Hub
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Health Data Manager
                  </span>
                </div>
              </div>
              {isAuthenticated && (
                <nav className="flex flex-col gap-4">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleNavigate(item.id)}
                        className={`text-left text-base font-medium transition-colors py-2 flex items-center gap-2 ${
                          currentView === item.id
                            ? 'text-primary'
                            : 'text-foreground hover:text-primary'
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                        {item.label}
                      </button>
                    );
                  })}
                </nav>
              )}
              <Button
                onClick={handleAuth}
                disabled={isLoggingIn}
                variant={isAuthenticated ? 'outline' : 'default'}
                className="w-full mt-4"
              >
                {isLoggingIn ? (
                  'Logging in...'
                ) : isAuthenticated ? (
                  <>
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </>
                ) : (
                  <>
                    <LogIn className="h-4 w-4 mr-2" />
                    Login
                  </>
                )}
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
