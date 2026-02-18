import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Header } from './components/site/Header';
import { Footer } from './components/site/Footer';
import { AuthGate } from './components/auth/AuthGate';
import { ProfileSetupDialog } from './components/auth/ProfileSetupDialog';
import { ImportPage } from './features/import/ImportPage';
import { DashboardPage } from './features/dashboard/DashboardPage';
import { DatasetsPage } from './features/datasets/DatasetsPage';
import { DatasetDetailsPage } from './features/datasets/DatasetDetailsPage';
import { useInternetIdentity } from './hooks/useInternetIdentity';
import { useGetCallerUserProfile } from './hooks/useSmartwatchDatasets';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

type View = 'import' | 'dashboard' | 'datasets' | 'dataset-details';

function AppContent() {
  const { identity } = useInternetIdentity();
  const [currentView, setCurrentView] = useState<View>('import');
  const [selectedDatasetIndex, setSelectedDatasetIndex] = useState<number | null>(null);

  const isAuthenticated = !!identity;

  const { data: userProfile, isLoading: profileLoading, isFetched } = useGetCallerUserProfile();

  const showProfileSetup = isAuthenticated && !profileLoading && isFetched && userProfile === null;

  const handleNavigate = (view: View, datasetIndex?: number) => {
    setCurrentView(view);
    if (view === 'dataset-details' && datasetIndex !== undefined) {
      setSelectedDatasetIndex(datasetIndex);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header currentView={currentView} onNavigate={handleNavigate} />
      <main className="flex-1">
        {!isAuthenticated ? (
          <AuthGate />
        ) : showProfileSetup ? (
          <ProfileSetupDialog />
        ) : (
          <>
            {currentView === 'import' && <ImportPage onNavigate={handleNavigate} />}
            {currentView === 'dashboard' && <DashboardPage />}
            {currentView === 'datasets' && <DatasetsPage onNavigate={handleNavigate} />}
            {currentView === 'dataset-details' && selectedDatasetIndex !== null && (
              <DatasetDetailsPage datasetIndex={selectedDatasetIndex} onNavigate={handleNavigate} />
            )}
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  );
}

export default App;
