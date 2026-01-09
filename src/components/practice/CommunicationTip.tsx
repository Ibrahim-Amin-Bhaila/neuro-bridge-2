import { Card, CardContent } from '@/components/ui/card';
import { Lightbulb } from 'lucide-react';

interface CommunicationTipProps {
  tip: string;
}

export function CommunicationTip({ tip }: CommunicationTipProps) {
  if (!tip) return null;

  return (
    <Card className="border-primary/30 bg-gradient-to-r from-primary/5 to-accent/5">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-full bg-primary/10 shrink-0">
            <Lightbulb className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="font-medium text-primary mb-1">Communication Tip</p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {tip}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
