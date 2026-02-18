import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Upload, FileText, AlertCircle, CheckCircle } from 'lucide-react';
import { parseCSV, parseJSON } from '../../lib/smartwatch/importParsers';
import { ImportPreviewTable } from './ImportPreviewTable';
import { useAddSmartwatchDataset } from '../../hooks/useSmartwatchDatasets';
import type { ParseResult } from '../../lib/smartwatch/model';

interface ImportPageProps {
  onNavigate: (view: 'import' | 'dashboard' | 'datasets') => void;
}

export function ImportPage({ onNavigate }: ImportPageProps) {
  const [file, setFile] = useState<File | null>(null);
  const [datasetName, setDatasetName] = useState('');
  const [parseResult, setParseResult] = useState<ParseResult | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const addDataset = useAddSmartwatchDataset();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setParseResult(null);
    setError('');
    setSuccess(false);

    if (!datasetName) {
      setDatasetName(selectedFile.name.replace(/\.[^/.]+$/, ''));
    }

    const ext = selectedFile.name.split('.').pop()?.toLowerCase();
    if (ext !== 'csv' && ext !== 'json') {
      setError('Unsupported file type. Please upload a CSV or JSON file.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = event.target?.result as string;
        let result: ParseResult;

        if (ext === 'csv') {
          result = parseCSV(content);
        } else {
          result = parseJSON(content);
        }

        if (result.records.length === 0) {
          setError('No valid records found in the file');
          return;
        }

        setParseResult(result);
      } catch (err: any) {
        setError(err.message || 'Failed to parse file');
      }
    };
    reader.readAsText(selectedFile);
  };

  const handleConfirm = async () => {
    if (!parseResult || !datasetName.trim()) {
      setError('Please provide a dataset name');
      return;
    }

    try {
      const dataset = {
        name: datasetName.trim(),
        uploadTime: BigInt(Date.now() * 1_000_000),
        originalFormat: file?.name.split('.').pop()?.toUpperCase() || 'UNKNOWN',
        records: parseResult.records.map(record => ({
          timestamp: BigInt(record.timestamp.getTime() * 1_000_000),
          steps: record.steps !== undefined ? BigInt(record.steps) : undefined,
          heartRate: record.heartRate !== undefined ? BigInt(record.heartRate) : undefined,
          calories: record.calories,
          distance: record.distance,
          sleep: record.sleep !== undefined ? BigInt(record.sleep) : undefined,
        })),
      };

      await addDataset.mutateAsync(dataset);
      setSuccess(true);
      setFile(null);
      setDatasetName('');
      setParseResult(null);

      setTimeout(() => {
        onNavigate('datasets');
      }, 1500);
    } catch (err: any) {
      setError(err.message || 'Failed to save dataset');
    }
  };

  const handleCancel = () => {
    setFile(null);
    setDatasetName('');
    setParseResult(null);
    setError('');
    setSuccess(false);
  };

  return (
    <div className="container py-8 md:py-12">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Import Your Data</h1>
          <p className="text-muted-foreground">
            Upload CSV or JSON files from your smartwatch or fitness tracker
          </p>
        </div>

        {!parseResult && !success && (
          <Card>
            <CardHeader>
              <CardTitle>Select File</CardTitle>
              <CardDescription>
                Choose a CSV or JSON file containing your health data
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="file">File</Label>
                <div className="flex items-center gap-4">
                  <Input
                    id="file"
                    type="file"
                    accept=".csv,.json"
                    onChange={handleFileChange}
                    className="flex-1"
                  />
                  <Upload className="h-5 w-5 text-muted-foreground" />
                </div>
              </div>

              {file && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <FileText className="h-4 w-4" />
                  {file.name} ({(file.size / 1024).toFixed(2)} KB)
                </div>
              )}

              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        )}

        {parseResult && !success && (
          <>
            <Card>
              <CardHeader>
                <CardTitle>Dataset Name</CardTitle>
                <CardDescription>
                  Give your dataset a memorable name
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Input
                  type="text"
                  placeholder="e.g., January 2026 Activity"
                  value={datasetName}
                  onChange={(e) => setDatasetName(e.target.value)}
                />
              </CardContent>
            </Card>

            {parseResult.warnings.length > 0 && (
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  <div className="font-semibold mb-1">Warnings:</div>
                  <ul className="list-disc list-inside space-y-1">
                    {parseResult.warnings.slice(0, 5).map((warning, i) => (
                      <li key={i} className="text-sm">{warning}</li>
                    ))}
                    {parseResult.warnings.length > 5 && (
                      <li className="text-sm">...and {parseResult.warnings.length - 5} more</li>
                    )}
                  </ul>
                </AlertDescription>
              </Alert>
            )}

            {parseResult.unmappedFields.length > 0 && (
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  <div className="font-semibold mb-1">Unmapped fields (will be ignored):</div>
                  <div className="text-sm">{parseResult.unmappedFields.join(', ')}</div>
                </AlertDescription>
              </Alert>
            )}

            <Card>
              <CardHeader>
                <CardTitle>Preview ({parseResult.records.length} records)</CardTitle>
                <CardDescription>
                  Review the first few records before importing
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ImportPreviewTable records={parseResult.records.slice(0, 10)} />
              </CardContent>
            </Card>

            <div className="flex gap-4 justify-end">
              <Button variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
              <Button
                onClick={handleConfirm}
                disabled={addDataset.isPending || !datasetName.trim()}
              >
                {addDataset.isPending ? 'Saving...' : 'Confirm & Save'}
              </Button>
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </>
        )}

        {success && (
          <Alert>
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>
              Dataset saved successfully! Redirecting to datasets...
            </AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );
}
