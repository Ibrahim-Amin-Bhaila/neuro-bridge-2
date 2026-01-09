import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, CheckCircle } from 'lucide-react';

interface MisinterpretationsListProps {
  items: string[];
}

export function MisinterpretationsList({ items }: MisinterpretationsListProps) {
  if (items.length === 0) {
    return (
      <Card className="border-green-200 bg-green-50/50">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <CheckCircle className="h-5 w-5 text-green-600 shrink-0" />
            <div>
              <p className="font-medium text-green-700">No Major Misinterpretation Risks</p>
              <p className="text-sm text-green-600">
                Your message is unlikely to be misunderstood.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-amber-200">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium flex items-center gap-2 text-amber-700">
          <AlertTriangle className="h-4 w-4" />
          Potential Misinterpretations
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-xs text-muted-foreground mb-3">
          These are ways others might interpret your message differently than you intended:
        </p>
        <ul className="space-y-2">
          {items.map((item, index) => (
            <li 
              key={index} 
              className="flex items-start gap-2 text-sm p-2 rounded-md bg-amber-50"
            >
              <span className="text-amber-500 font-bold shrink-0">•</span>
              <span className="text-amber-800">{item}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
