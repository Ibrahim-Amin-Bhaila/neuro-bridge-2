import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

interface MessageComparisonProps {
  original: string;
  suggested: string;
  explanation: string;
}

export function MessageComparison({ original, suggested, explanation }: MessageComparisonProps) {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(suggested);
      setCopied(true);
      toast({
        title: 'Copied!',
        description: 'Suggested message copied to clipboard.',
      });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast({
        title: 'Copy failed',
        description: 'Please select and copy the text manually.',
        variant: 'destructive',
      });
    }
  };

  const isUnchanged = original.trim() === suggested.trim();

  return (
    <div className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <Card className="border-muted">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Badge variant="outline">Original</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-relaxed whitespace-pre-wrap">{original}</p>
          </CardContent>
        </Card>

        <Card className={isUnchanged ? 'border-muted' : 'border-primary/50 bg-primary/5'}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ArrowRight className="h-4 w-4 text-primary" />
                <Badge variant={isUnchanged ? 'secondary' : 'default'}>
                  {isUnchanged ? 'No Changes Needed' : 'Suggested'}
                </Badge>
              </div>
              {!isUnchanged && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCopy}
                  className="h-8 px-2"
                >
                  {copied ? (
                    <Check className="h-4 w-4 text-green-600" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-relaxed whitespace-pre-wrap">{suggested}</p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-secondary/30">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-primary">
            Why This Works Better
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {explanation}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
