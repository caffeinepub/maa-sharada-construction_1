import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowLeft, Download, Activity, Heart, Flame, TrendingUp, Moon } from 'lucide-react';
import { useGetMyDatasets } from '../../hooks/useSmartwatchDatasets';
import { exportDatasetAsJson } from '../../lib/smartwatch/exportJson';
import { computeDerivedMetrics } from '../../lib/smartwatch/analytics';

interface DatasetDetailsPageProps {
  datasetIndex: number;
  onNavigate: (view: 'datasets') => void;
}

export function DatasetDetailsPage({ datasetIndex, onNavigate }: DatasetDetailsPageProps) {
  const { data: datasets } = useGetMyDatasets();
  const dataset = datasets?.[datasetIndex];

  if (!dataset) {
    return (
      <div className="container py-8 md:py-12">
        <div className="text-center text-muted-foreground">Dataset not found</div>
      </div>
    );
  }

  const metrics = computeDerivedMetrics(dataset.records);

  const handleExport = () => {
    exportDatasetAsJson(dataset);
  };

  return (
    <div className="container py-8 md:py-12">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => onNavigate('datasets')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Datasets
          </Button>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{dataset.name}</h1>
            <p className="text-muted-foreground">
              {dataset.records.length} records • Uploaded {new Date(Number(dataset.uploadTime) / 1_000_000).toLocaleDateString()}
            </p>
          </div>
          <Button onClick={handleExport}>
            <Download className="h-4 w-4 mr-2" />
            Export JSON
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Steps</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {metrics.totalSteps !== null ? metrics.totalSteps.toLocaleString() : 'N/A'}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Heart Rate</CardTitle>
              <Heart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {metrics.avgHeartRate !== null ? `${metrics.avgHeartRate} bpm` : 'N/A'}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Calories</CardTitle>
              <Flame className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {metrics.totalCalories !== null ? `${metrics.totalCalories.toLocaleString()} kcal` : 'N/A'}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Distance</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {metrics.totalDistance !== null ? `${metrics.totalDistance} km` : 'N/A'}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Sleep</CardTitle>
              <Moon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {metrics.totalSleep !== null ? `${Math.round(metrics.totalSleep / 60)} hrs` : 'N/A'}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Records Preview</CardTitle>
            <CardDescription>
              Showing first 20 records
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>Steps</TableHead>
                    <TableHead>Heart Rate</TableHead>
                    <TableHead>Calories</TableHead>
                    <TableHead>Distance</TableHead>
                    <TableHead>Sleep</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dataset.records.slice(0, 20).map((record, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-mono text-sm">
                        {new Date(Number(record.timestamp) / 1_000_000).toLocaleString()}
                      </TableCell>
                      <TableCell>
                        {record.steps !== undefined ? (
                          Number(record.steps)
                        ) : (
                          <Badge variant="outline" className="text-xs">N/A</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        {record.heartRate !== undefined ? (
                          `${Number(record.heartRate)} bpm`
                        ) : (
                          <Badge variant="outline" className="text-xs">N/A</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        {record.calories !== undefined ? (
                          `${record.calories.toFixed(1)} kcal`
                        ) : (
                          <Badge variant="outline" className="text-xs">N/A</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        {record.distance !== undefined ? (
                          `${record.distance.toFixed(2)} km`
                        ) : (
                          <Badge variant="outline" className="text-xs">N/A</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        {record.sleep !== undefined ? (
                          `${Number(record.sleep)} min`
                        ) : (
                          <Badge variant="outline" className="text-xs">N/A</Badge>
                        )}
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
