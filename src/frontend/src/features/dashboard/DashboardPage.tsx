import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Activity, Heart, Flame, TrendingUp, Moon, AlertCircle } from 'lucide-react';
import { useGetMyDatasets } from '../../hooks/useSmartwatchDatasets';
import { filterRecordsByDateRange, computeDerivedMetrics } from '../../lib/smartwatch/analytics';
import type { DateRangeFilter } from '../../lib/smartwatch/analytics';

export function DashboardPage() {
  const { data: datasets, isLoading } = useGetMyDatasets();
  const [selectedDatasetIndex, setSelectedDatasetIndex] = useState<number | null>(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const selectedDataset = selectedDatasetIndex !== null && datasets ? datasets[selectedDatasetIndex] : null;

  const dateRange: DateRangeFilter | null = startDate && endDate
    ? { start: new Date(startDate), end: new Date(endDate) }
    : null;

  const filteredRecords = selectedDataset
    ? filterRecordsByDateRange(selectedDataset.records, dateRange)
    : [];

  const metrics = computeDerivedMetrics(filteredRecords);

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
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            No datasets found. Please import data first.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container py-8 md:py-12">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Analytics Dashboard</h1>
          <p className="text-muted-foreground">
            View insights and metrics from your health data
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Select Dataset & Date Range</CardTitle>
            <CardDescription>
              Choose a dataset and optionally filter by date range
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Dataset</Label>
              <Select
                value={selectedDatasetIndex?.toString() || ''}
                onValueChange={(value) => setSelectedDatasetIndex(parseInt(value, 10))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a dataset" />
                </SelectTrigger>
                <SelectContent>
                  {datasets.map((dataset, index) => (
                    <SelectItem key={index} value={index.toString()}>
                      {dataset.name} ({dataset.records.length} records)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="start-date">Start Date</Label>
                <Input
                  id="start-date"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="end-date">End Date</Label>
                <Input
                  id="end-date"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {selectedDataset && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Steps</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {metrics.totalSteps !== null ? metrics.totalSteps.toLocaleString() : 'Unavailable'}
                </div>
                <p className="text-xs text-muted-foreground">
                  {metrics.recordCount} records analyzed
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg Heart Rate</CardTitle>
                <Heart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {metrics.avgHeartRate !== null ? `${metrics.avgHeartRate} bpm` : 'Unavailable'}
                </div>
                <p className="text-xs text-muted-foreground">
                  {metrics.minHeartRate !== null && metrics.maxHeartRate !== null
                    ? `Range: ${metrics.minHeartRate} - ${metrics.maxHeartRate} bpm`
                    : 'No heart rate data'}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Calories</CardTitle>
                <Flame className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {metrics.totalCalories !== null ? `${metrics.totalCalories.toLocaleString()} kcal` : 'Unavailable'}
                </div>
                <p className="text-xs text-muted-foreground">
                  Energy burned
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Distance</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {metrics.totalDistance !== null ? `${metrics.totalDistance} km` : 'Unavailable'}
                </div>
                <p className="text-xs text-muted-foreground">
                  Distance traveled
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Sleep</CardTitle>
                <Moon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {metrics.totalSleep !== null ? `${Math.round(metrics.totalSleep / 60)} hrs` : 'Unavailable'}
                </div>
                <p className="text-xs text-muted-foreground">
                  Sleep duration
                </p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
