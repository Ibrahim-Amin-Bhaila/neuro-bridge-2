import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ThumbsUp, ThumbsDown, Loader2, Check } from 'lucide-react';
import { useUserFeedback } from '@/hooks/useUserFeedback';
import { cn } from '@/lib/utils';

interface FeedbackWidgetProps {
  sessionId?: string;
}

export function FeedbackWidget({ sessionId }: FeedbackWidgetProps) {
  const [showTextInput, setShowTextInput] = useState(false);
  const [feedbackText, setFeedbackText] = useState('');
  const [selectedOption, setSelectedOption] = useState<boolean | null>(null);
  const { submitFeedback, isSubmitting, hasSubmitted } = useUserFeedback();

  const handleFeedback = async (wasHelpful: boolean) => {
    if (!sessionId) return;
    
    setSelectedOption(wasHelpful);
    
    if (!wasHelpful) {
      setShowTextInput(true);
    } else {
      await submitFeedback({
        analysisId: sessionId,
        wasHelpful: true,
      });
    }
  };

  const handleSubmitWithText = async () => {
    if (!sessionId) return;
    
    await submitFeedback({
      analysisId: sessionId,
      wasHelpful: selectedOption ?? false,
      feedbackText: feedbackText.trim() || undefined,
    });
  };

  if (hasSubmitted) {
    return (
      <Card className="bg-green-50 border-green-200">
        <CardContent className="p-4">
          <div className="flex items-center gap-3 text-green-700">
            <Check className="h-5 w-5" />
            <p className="font-medium">Thank you for your feedback!</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!sessionId) {
    return null;
  }

  return (
    <Card>
      <CardContent className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-muted-foreground">
            Was this analysis helpful?
          </p>
          <div className="flex gap-2">
            <Button
              variant={selectedOption === true ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleFeedback(true)}
              disabled={isSubmitting || selectedOption !== null}
              className={cn(
                selectedOption === true && 'bg-green-600 hover:bg-green-700'
              )}
            >
              {isSubmitting && selectedOption === true ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <ThumbsUp className="h-4 w-4" />
              )}
            </Button>
            <Button
              variant={selectedOption === false ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleFeedback(false)}
              disabled={isSubmitting}
              className={cn(
                selectedOption === false && 'bg-amber-600 hover:bg-amber-700'
              )}
            >
              <ThumbsDown className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {showTextInput && (
          <div className="space-y-3 pt-2 border-t">
            <p className="text-sm text-muted-foreground">
              We'd love to know how we can improve. What could be better?
            </p>
            <Textarea
              placeholder="Your feedback helps us make NeuroBridge better for everyone..."
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
              className="min-h-[80px]"
            />
            <Button
              onClick={handleSubmitWithText}
              disabled={isSubmitting}
              size="sm"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                'Submit Feedback'
              )}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
