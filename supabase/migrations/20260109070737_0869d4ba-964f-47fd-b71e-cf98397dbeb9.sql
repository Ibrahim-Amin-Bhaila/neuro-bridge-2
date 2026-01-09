-- Create practice_sessions table
CREATE TABLE public.practice_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  module_id UUID REFERENCES public.modules(id) ON DELETE SET NULL,
  original_text TEXT NOT NULL,
  session_type TEXT NOT NULL DEFAULT 'freeform' CHECK (session_type IN ('freeform', 'module_exercise', 'roleplay')),
  context TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create ai_analysis table
CREATE TABLE public.ai_analysis (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID NOT NULL REFERENCES public.practice_sessions(id) ON DELETE CASCADE,
  detected_tone TEXT NOT NULL,
  detected_emotion TEXT NOT NULL,
  clarity_score NUMERIC CHECK (clarity_score >= 0 AND clarity_score <= 100),
  is_socially_appropriate BOOLEAN NOT NULL DEFAULT true,
  potential_misinterpretations TEXT[],
  suggested_rewrite TEXT,
  improvement_explanation TEXT,
  communication_tip TEXT,
  raw_ai_response JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user_feedback table
CREATE TABLE public.user_feedback (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  analysis_id UUID NOT NULL REFERENCES public.ai_analysis(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  was_helpful BOOLEAN NOT NULL,
  feedback_text TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user_preferences table
CREATE TABLE public.user_preferences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE,
  feedback_style TEXT NOT NULL DEFAULT 'balanced' CHECK (feedback_style IN ('brief', 'detailed', 'balanced')),
  difficulty_areas TEXT[] DEFAULT ARRAY[]::TEXT[],
  preferred_contexts TEXT[] DEFAULT ARRAY[]::TEXT[],
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.practice_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_analysis ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_preferences ENABLE ROW LEVEL SECURITY;

-- Practice sessions policies
CREATE POLICY "Users can view their own practice sessions"
ON public.practice_sessions FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own practice sessions"
ON public.practice_sessions FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- AI analysis policies (linked through practice_sessions)
CREATE POLICY "Users can view their own ai analysis"
ON public.ai_analysis FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.practice_sessions
    WHERE practice_sessions.id = ai_analysis.session_id
    AND practice_sessions.user_id = auth.uid()
  )
);

CREATE POLICY "Users can create ai analysis for their sessions"
ON public.ai_analysis FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.practice_sessions
    WHERE practice_sessions.id = ai_analysis.session_id
    AND practice_sessions.user_id = auth.uid()
  )
);

-- User feedback policies
CREATE POLICY "Users can view their own feedback"
ON public.user_feedback FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own feedback"
ON public.user_feedback FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- User preferences policies
CREATE POLICY "Users can view their own preferences"
ON public.user_preferences FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own preferences"
ON public.user_preferences FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own preferences"
ON public.user_preferences FOR UPDATE
USING (auth.uid() = user_id);

-- Create trigger for user_preferences updated_at
CREATE TRIGGER update_user_preferences_updated_at
BEFORE UPDATE ON public.user_preferences
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();