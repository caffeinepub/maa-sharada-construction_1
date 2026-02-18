import type { ParseResult, ParsedRecord } from './model';
import { normalizeFieldName } from './fieldMapping';

export function parseCSV(content: string): ParseResult {
  const warnings: string[] = [];
  const unmappedFields: Set<string> = new Set();
  const records: ParsedRecord[] = [];

  try {
    const lines = content.trim().split('\n');
    if (lines.length < 2) {
      throw new Error('CSV file must contain at least a header row and one data row');
    }

    const headers = lines[0].split(',').map(h => h.trim().replace(/^["']|["']$/g, ''));
    const normalizedHeaders = headers.map(h => normalizeFieldName(h));

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;

      const values = line.split(',').map(v => v.trim().replace(/^["']|["']$/g, ''));
      if (values.length !== headers.length) {
        warnings.push(`Row ${i + 1}: Column count mismatch, skipping`);
        continue;
      }

      const record: ParsedRecord = { timestamp: new Date() };
      let hasTimestamp = false;

      for (let j = 0; j < headers.length; j++) {
        const normalized = normalizedHeaders[j];
        const value = values[j];

        if (normalized === 'timestamp') {
          const parsed = parseTimestamp(value);
          if (parsed) {
            record.timestamp = parsed;
            hasTimestamp = true;
          }
        } else if (normalized === 'steps') {
          const num = parseNumber(value);
          if (num !== null) record.steps = num;
        } else if (normalized === 'heartrate') {
          const num = parseNumber(value);
          if (num !== null) record.heartRate = num;
        } else if (normalized === 'calories') {
          const num = parseNumber(value);
          if (num !== null) record.calories = num;
        } else if (normalized === 'distance') {
          const num = parseNumber(value);
          if (num !== null) record.distance = num;
        } else if (normalized === 'sleep') {
          const num = parseNumber(value);
          if (num !== null) record.sleep = num;
        } else {
          unmappedFields.add(headers[j]);
        }
      }

      if (!hasTimestamp) {
        warnings.push(`Row ${i + 1}: Missing or invalid timestamp, using current time`);
      }

      records.push(record);
    }
  } catch (error: any) {
    throw new Error(`CSV parsing error: ${error.message}`);
  }

  return {
    records,
    warnings,
    unmappedFields: Array.from(unmappedFields),
  };
}

export function parseJSON(content: string): ParseResult {
  const warnings: string[] = [];
  const unmappedFields: Set<string> = new Set();
  const records: ParsedRecord[] = [];

  try {
    const data = JSON.parse(content);
    const items = Array.isArray(data) ? data : [data];

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (typeof item !== 'object' || item === null) {
        warnings.push(`Item ${i + 1}: Not an object, skipping`);
        continue;
      }

      const record: ParsedRecord = { timestamp: new Date() };
      let hasTimestamp = false;

      for (const [key, value] of Object.entries(item)) {
        const normalized = normalizeFieldName(key);

        if (normalized === 'timestamp') {
          const parsed = parseTimestamp(String(value));
          if (parsed) {
            record.timestamp = parsed;
            hasTimestamp = true;
          }
        } else if (normalized === 'steps') {
          const num = parseNumber(String(value));
          if (num !== null) record.steps = num;
        } else if (normalized === 'heartrate') {
          const num = parseNumber(String(value));
          if (num !== null) record.heartRate = num;
        } else if (normalized === 'calories') {
          const num = parseNumber(String(value));
          if (num !== null) record.calories = num;
        } else if (normalized === 'distance') {
          const num = parseNumber(String(value));
          if (num !== null) record.distance = num;
        } else if (normalized === 'sleep') {
          const num = parseNumber(String(value));
          if (num !== null) record.sleep = num;
        } else {
          unmappedFields.add(key);
        }
      }

      if (!hasTimestamp) {
        warnings.push(`Item ${i + 1}: Missing or invalid timestamp, using current time`);
      }

      records.push(record);
    }
  } catch (error: any) {
    throw new Error(`JSON parsing error: ${error.message}`);
  }

  return {
    records,
    warnings,
    unmappedFields: Array.from(unmappedFields),
  };
}

function parseTimestamp(value: string): Date | null {
  if (!value) return null;

  const timestamp = new Date(value);
  if (!isNaN(timestamp.getTime())) {
    return timestamp;
  }

  const unixMs = parseInt(value, 10);
  if (!isNaN(unixMs)) {
    return new Date(unixMs);
  }

  return null;
}

function parseNumber(value: string): number | null {
  if (!value || value === '') return null;
  const num = parseFloat(value);
  return isNaN(num) ? null : num;
}
