import { Progress } from '@/components/ui/progress';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ClarityMeterProps {
  score: number;
  isSociallyAppropriate: boolean;
}

export function ClarityMeter({ score, isSociallyAppropriate }: ClarityMeterProps) {
  const getScoreColor = () => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-yellow-500';
    if (score >= 40) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const getScoreLabel = () => {
    if (score >= 80) return { text: 'Very Clear', color: 'text-green-700' };
    if (score >= 60) return { text: 'Mostly Clear', color: 'text-yellow-700' };
    if (score >= 40) return { text: 'Could Be Clearer', color: 'text-orange-700' };
    return { text: 'Needs Improvement', color: 'text-red-700' };
  };

  const scoreLabel = getScoreLabel();

  return (
    <Card>
      <CardContent className="p-4 space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-muted-foreground">Message Clarity</p>
            <span className={cn('text-lg font-bold', scoreLabel.color)}>
              {score}/100
            </span>
          </div>
          <Progress 
            value={score} 
            className="h-3"
            // The indicator color is handled by the Progress component
          />
          <p className={cn('text-sm font-medium', scoreLabel.color)}>
            {scoreLabel.text}
          </p>
        </div>

        <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
          {isSociallyAppropriate ? (
            <>
              <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
              <div>
                <p className="font-medium text-green-700">Socially Appropriate</p>
                <p className="text-sm text-muted-foreground">
                  Your message is appropriate for most social contexts.
                </p>
              </div>
            </>
          ) : (
            <>
              <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5 shrink-0" />
              <div>
                <p className="font-medium text-amber-700">Review Recommended</p>
                <p className="text-sm text-muted-foreground">
                  Some parts of your message may need adjustment for certain contexts.
                </p>
              </div>
            </>
          )}
        </div>

        <div className="flex items-start gap-2 text-xs text-muted-foreground">
          <Info className="h-4 w-4 shrink-0 mt-0.5" />
          <p>
            Clarity score measures how easy your message is to understand. 
            Higher scores mean fewer chances of miscommunication.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
