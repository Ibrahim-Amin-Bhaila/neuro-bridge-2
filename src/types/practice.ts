export type ToneType = 'neutral' | 'friendly' | 'formal' | 'aggressive' | 'anxious' | 'sarcastic' | 'apologetic' | 'assertive' | 'uncertain';

export type EmotionType = 'happy' | 'frustrated' | 'confused' | 'stressed' | 'calm' | 'excited' | 'worried' | 'hopeful' | 'neutral';

export type FeedbackStyle = 'brief' | 'detailed' | 'balanced';

export type SessionType = 'freeform' | 'module_exercise' | 'roleplay';

export interface CommunicationAnalysis {
  detected_tone: ToneType;
  detected_emotion: EmotionType;
  clarity_score: number;
  is_socially_appropriate: boolean;
  potential_misinterpretations: string[];
  suggested_rewrite: string;
  improvement_explanation: string;
  communication_tip?: string;
  session_id?: string;
}

export interface PracticeSession {
  id: string;
  user_id: string;
  module_id?: string;
  original_text: string;
  session_type: SessionType;
  context?: string;
  created_at: string;
}

export interface AIAnalysis {
  id: string;
  session_id: string;
  detected_tone: ToneType;
  detected_emotion: EmotionType;
  clarity_score: number;
  is_socially_appropriate: boolean;
  potential_misinterpretations: string[];
  suggested_rewrite: string;
  improvement_explanation: string;
  communication_tip?: string;
  raw_ai_response?: Record<string, unknown>;
  created_at: string;
}

export interface UserFeedback {
  id: string;
  analysis_id: string;
  user_id: string;
  was_helpful: boolean;
  feedback_text?: string;
  created_at: string;
}

export interface UserPreferences {
  id: string;
  user_id: string;
  feedback_style: FeedbackStyle;
  difficulty_areas: string[];
  preferred_contexts: string[];
  created_at: string;
  updated_at: string;
}

export const CONTEXT_OPTIONS = [
  { value: 'professional_email', label: 'Professional Email' },
  { value: 'casual_message', label: 'Casual Message to Friend' },
  { value: 'academic', label: 'Academic/School' },
  { value: 'team_communication', label: 'Team/Work Communication' },
  { value: 'customer_service', label: 'Customer Service' },
  { value: 'conflict_resolution', label: 'Conflict Resolution' },
  { value: 'request', label: 'Making a Request' },
  { value: 'feedback', label: 'Giving Feedback' },
  { value: 'other', label: 'Other' },
] as const;

export const TONE_COLORS: Record<ToneType, { bg: string; text: string; border: string }> = {
  neutral: { bg: 'bg-muted', text: 'text-muted-foreground', border: 'border-muted' },
  friendly: { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-300' },
  formal: { bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-300' },
  aggressive: { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-300' },
  anxious: { bg: 'bg-yellow-100', text: 'text-yellow-800', border: 'border-yellow-300' },
  sarcastic: { bg: 'bg-purple-100', text: 'text-purple-800', border: 'border-purple-300' },
  apologetic: { bg: 'bg-orange-100', text: 'text-orange-800', border: 'border-orange-300' },
  assertive: { bg: 'bg-teal-100', text: 'text-teal-800', border: 'border-teal-300' },
  uncertain: { bg: 'bg-gray-100', text: 'text-gray-800', border: 'border-gray-300' },
};

export const EMOTION_COLORS: Record<EmotionType, { bg: string; text: string; icon: string }> = {
  happy: { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: '😊' },
  frustrated: { bg: 'bg-red-100', text: 'text-red-800', icon: '😤' },
  confused: { bg: 'bg-purple-100', text: 'text-purple-800', icon: '😕' },
  stressed: { bg: 'bg-orange-100', text: 'text-orange-800', icon: '😰' },
  calm: { bg: 'bg-blue-100', text: 'text-blue-800', icon: '😌' },
  excited: { bg: 'bg-pink-100', text: 'text-pink-800', icon: '🎉' },
  worried: { bg: 'bg-amber-100', text: 'text-amber-800', icon: '😟' },
  hopeful: { bg: 'bg-green-100', text: 'text-green-800', icon: '🌟' },
  neutral: { bg: 'bg-gray-100', text: 'text-gray-800', icon: '😐' },
};
