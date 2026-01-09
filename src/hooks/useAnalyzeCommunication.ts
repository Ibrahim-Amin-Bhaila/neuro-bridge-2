import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { CommunicationAnalysis, FeedbackStyle } from '@/types/practice';
import { useToast } from '@/hooks/use-toast';

interface AnalyzeOptions {
  message: string;
  context?: string;
  feedbackStyle?: FeedbackStyle;
}

export function useAnalyzeCommunication() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<CommunicationAnalysis | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  const { toast } = useToast();

  const analyze = async ({ message, context, feedbackStyle = 'balanced' }: AnalyzeOptions) => {
    if (!message.trim()) {
      setError('Please enter a message to analyze');
      return null;
    }

    setIsAnalyzing(true);
    setError(null);
    setAnalysis(null);

    try {
      const { data, error: invokeError } = await supabase.functions.invoke('analyze-communication', {
        body: {
          message: message.trim(),
          context,
          userId: user?.id,
          feedbackStyle,
        },
      });

      if (invokeError) {
        console.error('Function invoke error:', invokeError);
        throw new Error(invokeError.message || 'Failed to analyze message');
      }

      if (data?.error) {
        // Handle specific error types
        if (data.error.includes('Rate limit')) {
          toast({
            title: 'Please wait',
            description: 'Too many requests. Please try again in a moment.',
            variant: 'destructive',
          });
        } else if (data.error.includes('credits')) {
          toast({
            title: 'Service unavailable',
            description: 'AI service credits exhausted. Please contact support.',
            variant: 'destructive',
          });
        }
        throw new Error(data.error);
      }

      if (!data?.analysis) {
        throw new Error('No analysis returned from AI');
      }

      setAnalysis(data.analysis);
      return data.analysis as CommunicationAnalysis;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to analyze message';
      setError(errorMessage);
      console.error('Analysis error:', err);
      return null;
    } finally {
      setIsAnalyzing(false);
    }
  };

  const reset = () => {
    setAnalysis(null);
    setError(null);
  };

  return {
    analyze,
    isAnalyzing,
    analysis,
    error,
    reset,
  };
}
