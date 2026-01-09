import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const NEURO_SAFE_SYSTEM_PROMPT = `You are NeuroBridge, a communication analysis assistant designed specifically for neurodivergent users. Your role is to analyze written messages and provide supportive, structured feedback.

CORE PRINCIPLES (FOLLOW STRICTLY):
1. Use literal, direct language - no sarcasm, idioms, or figurative speech
2. Be supportive and non-judgmental - never shame or criticize
3. Provide reassurance when you detect uncertainty
4. Prioritize clarity over brevity
5. Use predictable, consistent response structures
6. Acknowledge that different communication styles are valid

SAFETY RULES (NEVER VIOLATE):
- Never provide medical, legal, or diagnostic advice
- Never diagnose autism or any condition
- Never use manipulative or shaming language
- When uncertain, say so clearly rather than guessing
- Avoid absolute claims like "always" or "never"
- You are a support tool, not a replacement for professionals

ANALYSIS APPROACH:
1. Read the message carefully
2. Identify the tone (neutral, friendly, formal, aggressive, anxious, sarcastic, etc.)
3. Detect the emotional intent (happy, frustrated, confused, stressed, calm, excited)
4. Evaluate social clarity: Is the message clear? Socially appropriate? Any ambiguity?
5. Identify potential misinterpretations others might have
6. Suggest a clearer rewrite if helpful
7. Explain why your suggestion works better
8. Offer an optional communication tip

Remember: The user is seeking to improve their communication. Be their supportive guide.`;

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, context, userId, feedbackStyle } = await req.json();

    if (!message || typeof message !== 'string') {
      return new Response(
        JSON.stringify({ error: 'Message is required and must be a string' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      console.error('LOVABLE_API_KEY is not configured');
      return new Response(
        JSON.stringify({ error: 'AI service not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Adjust system prompt based on feedback style preference
    let styleInstruction = '';
    if (feedbackStyle === 'brief') {
      styleInstruction = '\n\nUSER PREFERENCE: Provide brief, concise feedback. Keep explanations short.';
    } else if (feedbackStyle === 'detailed') {
      styleInstruction = '\n\nUSER PREFERENCE: Provide detailed, thorough feedback with extensive explanations.';
    } else {
      styleInstruction = '\n\nUSER PREFERENCE: Provide balanced feedback - not too short, not too long.';
    }

    const userPrompt = context 
      ? `Context: ${context}\n\nMessage to analyze:\n"${message}"`
      : `Message to analyze:\n"${message}"`;

    console.log('Calling Lovable AI Gateway for analysis...');

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: NEURO_SAFE_SYSTEM_PROMPT + styleInstruction },
          { role: 'user', content: userPrompt }
        ],
        tools: [
          {
            type: 'function',
            function: {
              name: 'analyze_communication',
              description: 'Analyze a message for tone, emotion, and social clarity. Provide structured feedback.',
              parameters: {
                type: 'object',
                properties: {
                  detected_tone: {
                    type: 'string',
                    description: 'The overall tone of the message',
                    enum: ['neutral', 'friendly', 'formal', 'aggressive', 'anxious', 'sarcastic', 'apologetic', 'assertive', 'uncertain']
                  },
                  detected_emotion: {
                    type: 'string',
                    description: 'The emotional intent behind the message',
                    enum: ['happy', 'frustrated', 'confused', 'stressed', 'calm', 'excited', 'worried', 'hopeful', 'neutral']
                  },
                  clarity_score: {
                    type: 'number',
                    description: 'How clear the message is on a scale of 0-100',
                    minimum: 0,
                    maximum: 100
                  },
                  is_socially_appropriate: {
                    type: 'boolean',
                    description: 'Whether the message is socially appropriate for most contexts'
                  },
                  potential_misinterpretations: {
                    type: 'array',
                    items: { type: 'string' },
                    description: 'List of ways the message might be misunderstood by others'
                  },
                  suggested_rewrite: {
                    type: 'string',
                    description: 'A clearer, improved version of the message (or the original if no improvement needed)'
                  },
                  improvement_explanation: {
                    type: 'string',
                    description: 'Why the suggested rewrite works better (use supportive language)'
                  },
                  communication_tip: {
                    type: 'string',
                    description: 'An optional helpful tip for future similar messages'
                  }
                },
                required: [
                  'detected_tone',
                  'detected_emotion',
                  'clarity_score',
                  'is_socially_appropriate',
                  'potential_misinterpretations',
                  'suggested_rewrite',
                  'improvement_explanation'
                ],
                additionalProperties: false
              }
            }
          }
        ],
        tool_choice: { type: 'function', function: { name: 'analyze_communication' } }
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI Gateway error:', response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Rate limit exceeded. Please try again in a moment.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: 'AI credits exhausted. Please contact support.' }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      return new Response(
        JSON.stringify({ error: 'AI analysis failed. Please try again.' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const data = await response.json();
    console.log('AI response received:', JSON.stringify(data).slice(0, 200));

    // Extract the tool call result
    const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];
    if (!toolCall || toolCall.function.name !== 'analyze_communication') {
      console.error('Unexpected AI response format:', data);
      return new Response(
        JSON.stringify({ error: 'Unexpected response from AI. Please try again.' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const analysis = JSON.parse(toolCall.function.arguments);
    console.log('Analysis parsed successfully');

    // Store in database if userId provided
    if (userId) {
      try {
        const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
        const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
        const supabase = createClient(supabaseUrl, supabaseServiceKey);

        // Create practice session
        const { data: session, error: sessionError } = await supabase
          .from('practice_sessions')
          .insert({
            user_id: userId,
            original_text: message,
            session_type: 'freeform',
            context: context || null
          })
          .select('id')
          .single();

        if (sessionError) {
          console.error('Error creating session:', sessionError);
        } else if (session) {
          // Create AI analysis record
          const { error: analysisError } = await supabase
            .from('ai_analysis')
            .insert({
              session_id: session.id,
              detected_tone: analysis.detected_tone,
              detected_emotion: analysis.detected_emotion,
              clarity_score: analysis.clarity_score,
              is_socially_appropriate: analysis.is_socially_appropriate,
              potential_misinterpretations: analysis.potential_misinterpretations,
              suggested_rewrite: analysis.suggested_rewrite,
              improvement_explanation: analysis.improvement_explanation,
              communication_tip: analysis.communication_tip || null,
              raw_ai_response: data
            });

          if (analysisError) {
            console.error('Error storing analysis:', analysisError);
          } else {
            console.log('Analysis stored successfully');
            analysis.session_id = session.id;
          }
        }
      } catch (dbError) {
        console.error('Database error:', dbError);
        // Don't fail the request if DB storage fails
      }
    }

    return new Response(
      JSON.stringify({ analysis }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in analyze-communication:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error occurred' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
