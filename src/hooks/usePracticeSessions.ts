import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface PracticeSessionWithAnalysis {
  id: string;
  original_text: string;
  context: string | null;
  session_type: string;
  created_at: string;
  ai_analysis: {
    detected_tone: string;
    detected_emotion: string;
    clarity_score: number;
    is_socially_appropriate: boolean;
  }[] | null;
}

export function usePracticeSessions(limit = 10) {
  const [sessions, setSessions] = useState<PracticeSessionWithAnalysis[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchSessions = async () => {
    if (!user) {
      setSessions([]);
      setIsLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('practice_sessions')
        .select(`
          id,
          original_text,
          context,
          session_type,
          created_at,
          ai_analysis (
            detected_tone,
            detected_emotion,
            clarity_score,
            is_socially_appropriate
          )
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(limit);

      if (error) {
        console.error('Error fetching sessions:', error);
        throw error;
      }

      setSessions(data || []);
    } catch (err) {
      console.error('Error loading practice sessions:', err);
      toast({
        title: 'Error',
        description: 'Failed to load practice history',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, [user, limit]);

  return {
    sessions,
    isLoading,
    refetch: fetchSessions,
  };
}
