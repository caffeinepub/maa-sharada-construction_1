import type { SmartwatchRecord } from '../../backend';

export interface DateRangeFilter {
  start: Date;
  end: Date;
}

export interface DerivedMetrics {
  totalSteps: number | null;
  avgHeartRate: number | null;
  minHeartRate: number | null;
  maxHeartRate: number | null;
  totalCalories: number | null;
  totalDistance: number | null;
  totalSleep: number | null;
  recordCount: number;
}

export function filterRecordsByDateRange(
  records: SmartwatchRecord[],
  range: DateRangeFilter | null
): SmartwatchRecord[] {
  if (!range) return records;

  return records.filter(record => {
    const timestamp = Number(record.timestamp) / 1_000_000;
    const date = new Date(timestamp);
    return date >= range.start && date <= range.end;
  });
}

export function computeDerivedMetrics(records: SmartwatchRecord[]): DerivedMetrics {
  if (records.length === 0) {
    return {
      totalSteps: null,
      avgHeartRate: null,
      minHeartRate: null,
      maxHeartRate: null,
      totalCalories: null,
      totalDistance: null,
      totalSleep: null,
      recordCount: 0,
    };
  }

  let totalSteps = 0;
  let stepsCount = 0;
  
  let totalHeartRate = 0;
  let heartRateCount = 0;
  let minHeartRate: number | null = null;
  let maxHeartRate: number | null = null;
  
  let totalCalories = 0;
  let caloriesCount = 0;
  
  let totalDistance = 0;
  let distanceCount = 0;
  
  let totalSleep = 0;
  let sleepCount = 0;

  for (const record of records) {
    if (record.steps !== undefined) {
      totalSteps += Number(record.steps);
      stepsCount++;
    }

    if (record.heartRate !== undefined) {
      const hr = Number(record.heartRate);
      totalHeartRate += hr;
      heartRateCount++;
      
      if (minHeartRate === null || hr < minHeartRate) {
        minHeartRate = hr;
      }
      if (maxHeartRate === null || hr > maxHeartRate) {
        maxHeartRate = hr;
      }
    }

    if (record.calories !== undefined) {
      totalCalories += record.calories;
      caloriesCount++;
    }

    if (record.distance !== undefined) {
      totalDistance += record.distance;
      distanceCount++;
    }

    if (record.sleep !== undefined) {
      totalSleep += Number(record.sleep);
      sleepCount++;
    }
  }

  return {
    totalSteps: stepsCount > 0 ? totalSteps : null,
    avgHeartRate: heartRateCount > 0 ? Math.round(totalHeartRate / heartRateCount) : null,
    minHeartRate,
    maxHeartRate,
    totalCalories: caloriesCount > 0 ? Math.round(totalCalories) : null,
    totalDistance: distanceCount > 0 ? Math.round(totalDistance * 100) / 100 : null,
    totalSleep: sleepCount > 0 ? totalSleep : null,
    recordCount: records.length,
  };
}
