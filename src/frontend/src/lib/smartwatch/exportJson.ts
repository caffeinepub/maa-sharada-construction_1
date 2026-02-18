import type { SmartwatchDataset } from '../../backend';

export function exportDatasetAsJson(dataset: SmartwatchDataset): void {
  const exportData = {
    metadata: {
      name: dataset.name,
      uploadTime: new Date(Number(dataset.uploadTime) / 1_000_000).toISOString(),
      originalFormat: dataset.originalFormat,
      recordCount: dataset.records.length,
      exportedAt: new Date().toISOString(),
    },
    records: dataset.records.map(record => ({
      timestamp: new Date(Number(record.timestamp) / 1_000_000).toISOString(),
      steps: record.steps !== undefined ? Number(record.steps) : undefined,
      heartRate: record.heartRate !== undefined ? Number(record.heartRate) : undefined,
      calories: record.calories,
      distance: record.distance,
      sleep: record.sleep !== undefined ? Number(record.sleep) : undefined,
    })),
  };

  const jsonString = JSON.stringify(exportData, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = `${dataset.name.replace(/[^a-z0-9]/gi, '_')}_export.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
