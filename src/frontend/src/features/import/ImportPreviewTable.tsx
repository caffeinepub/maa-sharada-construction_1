import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import type { ParsedRecord } from '../../lib/smartwatch/model';

interface ImportPreviewTableProps {
  records: ParsedRecord[];
}

export function ImportPreviewTable({ records }: ImportPreviewTableProps) {
  if (records.length === 0) {
    return <div className="text-center text-muted-foreground py-8">No records to preview</div>;
  }

  return (
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
          {records.map((record, index) => (
            <TableRow key={index}>
              <TableCell className="font-mono text-sm">
                {record.timestamp.toLocaleString()}
              </TableCell>
              <TableCell>
                {record.steps !== undefined ? (
                  record.steps
                ) : (
                  <Badge variant="outline" className="text-xs">N/A</Badge>
                )}
              </TableCell>
              <TableCell>
                {record.heartRate !== undefined ? (
                  `${record.heartRate} bpm`
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
                  `${record.sleep} min`
                ) : (
                  <Badge variant="outline" className="text-xs">N/A</Badge>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
