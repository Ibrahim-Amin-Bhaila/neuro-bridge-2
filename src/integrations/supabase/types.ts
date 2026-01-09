export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      ai_analysis: {
        Row: {
          clarity_score: number | null
          communication_tip: string | null
          created_at: string
          detected_emotion: string
          detected_tone: string
          id: string
          improvement_explanation: string | null
          is_socially_appropriate: boolean
          potential_misinterpretations: string[] | null
          raw_ai_response: Json | null
          session_id: string
          suggested_rewrite: string | null
        }
        Insert: {
          clarity_score?: number | null
          communication_tip?: string | null
          created_at?: string
          detected_emotion: string
          detected_tone: string
          id?: string
          improvement_explanation?: string | null
          is_socially_appropriate?: boolean
          potential_misinterpretations?: string[] | null
          raw_ai_response?: Json | null
          session_id: string
          suggested_rewrite?: string | null
        }
        Update: {
          clarity_score?: number | null
          communication_tip?: string | null
          created_at?: string
          detected_emotion?: string
          detected_tone?: string
          id?: string
          improvement_explanation?: string | null
          is_socially_appropriate?: boolean
          potential_misinterpretations?: string[] | null
          raw_ai_response?: Json | null
          session_id?: string
          suggested_rewrite?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_analysis_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "practice_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      modules: {
        Row: {
          created_at: string
          description: string | null
          estimated_hours: number
          id: string
          is_free: boolean
          module_number: number
          title: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          estimated_hours?: number
          id?: string
          is_free?: boolean
          module_number: number
          title: string
        }
        Update: {
          created_at?: string
          description?: string | null
          estimated_hours?: number
          id?: string
          is_free?: boolean
          module_number?: number
          title?: string
        }
        Relationships: []
      }
      practice_sessions: {
        Row: {
          context: string | null
          created_at: string
          id: string
          module_id: string | null
          original_text: string
          session_type: string
          user_id: string
        }
        Insert: {
          context?: string | null
          created_at?: string
          id?: string
          module_id?: string | null
          original_text: string
          session_type?: string
          user_id: string
        }
        Update: {
          context?: string | null
          created_at?: string
          id?: string
          module_id?: string | null
          original_text?: string
          session_type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "practice_sessions_module_id_fkey"
            columns: ["module_id"]
            isOneToOne: false
            referencedRelation: "modules"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          full_name: string | null
          id: string
          subscription_tier: string | null
          total_hours_completed: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          subscription_tier?: string | null
          total_hours_completed?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          subscription_tier?: string | null
          total_hours_completed?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      subscribers: {
        Row: {
          created_at: string
          email: string
          id: string
          stripe_customer_id: string | null
          subscribed: boolean
          subscription_end: string | null
          subscription_tier: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          stripe_customer_id?: string | null
          subscribed?: boolean
          subscription_end?: string | null
          subscription_tier?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          stripe_customer_id?: string | null
          subscribed?: boolean
          subscription_end?: string | null
          subscription_tier?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      tone_analysis: {
        Row: {
          clarity_score: number | null
          created_at: string
          emotional_accuracy_score: number | null
          feedback_notes: string | null
          id: string
          module_id: string
          overall_score: number | null
          session_date: string
          tone_score: number | null
          user_id: string
        }
        Insert: {
          clarity_score?: number | null
          created_at?: string
          emotional_accuracy_score?: number | null
          feedback_notes?: string | null
          id?: string
          module_id: string
          overall_score?: number | null
          session_date?: string
          tone_score?: number | null
          user_id: string
        }
        Update: {
          clarity_score?: number | null
          created_at?: string
          emotional_accuracy_score?: number | null
          feedback_notes?: string | null
          id?: string
          module_id?: string
          overall_score?: number | null
          session_date?: string
          tone_score?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "tone_analysis_module_id_fkey"
            columns: ["module_id"]
            isOneToOne: false
            referencedRelation: "modules"
            referencedColumns: ["id"]
          },
        ]
      }
      user_feedback: {
        Row: {
          analysis_id: string
          created_at: string
          feedback_text: string | null
          id: string
          user_id: string
          was_helpful: boolean
        }
        Insert: {
          analysis_id: string
          created_at?: string
          feedback_text?: string | null
          id?: string
          user_id: string
          was_helpful: boolean
        }
        Update: {
          analysis_id?: string
          created_at?: string
          feedback_text?: string | null
          id?: string
          user_id?: string
          was_helpful?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "user_feedback_analysis_id_fkey"
            columns: ["analysis_id"]
            isOneToOne: false
            referencedRelation: "ai_analysis"
            referencedColumns: ["id"]
          },
        ]
      }
      user_preferences: {
        Row: {
          created_at: string
          difficulty_areas: string[] | null
          feedback_style: string
          id: string
          preferred_contexts: string[] | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          difficulty_areas?: string[] | null
          feedback_style?: string
          id?: string
          preferred_contexts?: string[] | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          difficulty_areas?: string[] | null
          feedback_style?: string
          id?: string
          preferred_contexts?: string[] | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_progress: {
        Row: {
          completed_at: string | null
          completion_percentage: number | null
          created_at: string
          final_score: number | null
          hours_spent: number | null
          id: string
          is_completed: boolean | null
          module_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          completion_percentage?: number | null
          created_at?: string
          final_score?: number | null
          hours_spent?: number | null
          id?: string
          is_completed?: boolean | null
          module_id: string
          updated_at?: string
          user_id: string
        }
        Update: {
          completed_at?: string | null
          completion_percentage?: number | null
          created_at?: string
          final_score?: number | null
          hours_spent?: number | null
          id?: string
          is_completed?: boolean | null
          module_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_progress_module_id_fkey"
            columns: ["module_id"]
            isOneToOne: false
            referencedRelation: "modules"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
