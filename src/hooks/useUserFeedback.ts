import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface SubmitFeedbackOptions {
  analysisId: string;
  wasHelpful: boolean;
  feedbackText?: string;
}

export function useUserFeedback() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const submitFeedback = async ({ analysisId, wasHelpful, feedbackText }: SubmitFeedbackOptions) => {
    if (!user) {
      toast({
        title: 'Sign in required',
        description: 'Please sign in to submit feedback',
        variant: 'destructive',
      });
      return false;
    }

    setIsSubmitting(true);

    try {
      // First get the analysis to find the session_id
      const { data: analysisData, error: analysisError } = await supabase
        .from('ai_analysis')
        .select('id')
        .eq('session_id', analysisId)
        .single();

      if (analysisError || !analysisData) {
        // If we can't find by session_id, the analysisId might be the actual analysis ID
        const { error } = await supabase
          .from('user_feedback')
          .insert({
            analysis_id: analysisId,
            user_id: user.id,
            was_helpful: wasHelpful,
            feedback_text: feedbackText || null,
          });

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('user_feedback')
          .insert({
            analysis_id: analysisData.id,
            user_id: user.id,
            was_helpful: wasHelpful,
            feedback_text: feedbackText || null,
          });

        if (error) throw error;
      }

      setHasSubmitted(true);
      toast({
        title: 'Thank you!',
        description: 'Your feedback helps us improve NeuroBridge.',
      });
      return true;
    } catch (err) {
      console.error('Error submitting feedback:', err);
      toast({
        title: 'Error',
        description: 'Failed to submit feedback. Please try again.',
        variant: 'destructive',
      });
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const reset = () => {
    setHasSubmitted(false);
  };

  return {
    submitFeedback,
    isSubmitting,
    hasSubmitted,
    reset,
  };
}
