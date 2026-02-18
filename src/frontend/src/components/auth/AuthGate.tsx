import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Activity, Shield, Database, TrendingUp, LogIn } from 'lucide-react';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';

export function AuthGate() {
  const { login, loginStatus } = useInternetIdentity();

  const isLoggingIn = loginStatus === 'logging-in';

  const handleLogin = async () => {
    try {
      await login();
    } catch (error: any) {
      console.error('Login error:', error);
    }
  };

  return (
    <div className="container py-12 md:py-20">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <img
              src="./assets/generated/smartwatch-datahub-hero.dim_1600x900.png"
              alt="Smartwatch Data Hub"
              className="w-full max-w-2xl rounded-lg shadow-lg"
            />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Welcome to Smartwatch Data Hub
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Import, analyze, and export your smartwatch health data securely
          </p>
          <Button
            onClick={handleLogin}
            disabled={isLoggingIn}
            size="lg"
            className="text-lg px-8 py-6"
          >
            {isLoggingIn ? (
              'Logging in...'
            ) : (
              <>
                <LogIn className="h-5 w-5 mr-2" />
                Login to Get Started
              </>
            )}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          <Card>
            <CardHeader>
              <Activity className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Import Your Data</CardTitle>
              <CardDescription>
                Upload CSV or JSON files from your smartwatch or fitness tracker
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <TrendingUp className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Analyze Metrics</CardTitle>
              <CardDescription>
                View insights on steps, heart rate, calories, and more
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Database className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Manage Datasets</CardTitle>
              <CardDescription>
                Organize and access all your imported health data in one place
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Shield className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Privacy First</CardTitle>
              <CardDescription>
                Your data is stored securely on the blockchain and only you can access it
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </div>
  );
}
