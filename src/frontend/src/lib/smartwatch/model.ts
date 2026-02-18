import type { SmartwatchRecord, SmartwatchDataset } from '../../backend';

export type { SmartwatchRecord, SmartwatchDataset };

export interface ParsedRecord {
  timestamp: Date;
  steps?: number;
  heartRate?: number;
  calories?: number;
  distance?: number;
  sleep?: number;
  unmappedFields?: Record<string, any>;
}

export interface ParseResult {
  records: ParsedRecord[];
  warnings: string[];
  unmappedFields: string[];
}

export interface DatasetSummary {
  totalRecords: number;
  dateRange: { start: Date; end: Date } | null;
  availableMetrics: string[];
  totalSteps?: number;
  avgHeartRate?: number;
  totalCalories?: number;
  totalDistance?: number;
}
