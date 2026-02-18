const FIELD_MAPPINGS: Record<string, string> = {
  timestamp: 'timestamp',
  time: 'timestamp',
  date: 'timestamp',
  datetime: 'timestamp',
  created: 'timestamp',
  recorded: 'timestamp',
  
  steps: 'steps',
  step: 'steps',
  stepcount: 'steps',
  
  heartrate: 'heartrate',
  heart_rate: 'heartrate',
  hr: 'heartrate',
  bpm: 'heartrate',
  pulse: 'heartrate',
  
  calories: 'calories',
  calorie: 'calories',
  kcal: 'calories',
  energy: 'calories',
  
  distance: 'distance',
  dist: 'distance',
  km: 'distance',
  miles: 'distance',
  
  sleep: 'sleep',
  sleepduration: 'sleep',
  sleep_duration: 'sleep',
  sleepminutes: 'sleep',
};

export function normalizeFieldName(fieldName: string): string {
  const normalized = fieldName.toLowerCase().replace(/[^a-z0-9]/g, '');
  return FIELD_MAPPINGS[normalized] || fieldName;
}
