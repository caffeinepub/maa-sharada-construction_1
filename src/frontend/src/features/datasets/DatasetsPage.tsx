import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Database, AlertCircle, Eye } from 'lucide-react';
import { useGetMyDatasets } from '../../hooks/useSmartwatchDatasets';

interface DatasetsPageProps {
  onNavigate: (view: 'dataset-details', datasetIndex: number) => void;
}

export function DatasetsPage({ onNavigate }: DatasetsPageProps) {
  const { data: datasets, isLoading } = useGetMyDatasets();

  if (isLoading) {
    return (
      <div className="container py-8 md:py-12">
        <div className="text-center text-muted-foreground">Loading datasets...</div>
      </div>
    );
  }

  if (!datasets || datasets.length === 0) {
    return (
      <div className="container py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              No datasets found. Import your first dataset to get started.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8 md:py-12">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">My Datasets</h1>
          <p className="text-muted-foreground">
            Manage and view your imported health data
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              All Datasets ({datasets.length})
            </CardTitle>
            <CardDescription>
              Click on a dataset to view details and export
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Format</TableHead>
                    <TableHead>Records</TableHead>
                    <TableHead>Uploaded</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {datasets.map((dataset, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{dataset.name}</TableCell>
                      <TableCell>{dataset.originalFormat}</TableCell>
                      <TableCell>{dataset.records.length}</TableCell>
                      <TableCell>
                        {new Date(Number(dataset.uploadTime) / 1_000_000).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onNavigate('dataset-details', index)}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
