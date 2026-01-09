import { Card, CardContent } from '@/components/ui/card';
import { ToneType, EmotionType, TONE_COLORS, EMOTION_COLORS } from '@/types/practice';
import { cn } from '@/lib/utils';

interface ToneEmotionCardProps {
  tone: ToneType;
  emotion: EmotionType;
}

export function ToneEmotionCard({ tone, emotion }: ToneEmotionCardProps) {
  const toneStyle = TONE_COLORS[tone];
  const emotionStyle = EMOTION_COLORS[emotion];

  return (
    <div className="grid grid-cols-2 gap-4">
      <Card className={cn('border-2', toneStyle.border)}>
        <CardContent className="p-4">
          <p className="text-sm font-medium text-muted-foreground mb-1">Detected Tone</p>
          <div className={cn('inline-flex items-center px-3 py-1.5 rounded-full', toneStyle.bg)}>
            <span className={cn('font-semibold capitalize', toneStyle.text)}>
              {tone}
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            {getToneDescription(tone)}
          </p>
        </CardContent>
      </Card>

      <Card className="border-2 border-muted">
        <CardContent className="p-4">
          <p className="text-sm font-medium text-muted-foreground mb-1">Detected Emotion</p>
          <div className={cn('inline-flex items-center gap-2 px-3 py-1.5 rounded-full', emotionStyle.bg)}>
            <span className="text-lg" role="img" aria-label={emotion}>
              {emotionStyle.icon}
            </span>
            <span className={cn('font-semibold capitalize', emotionStyle.text)}>
              {emotion}
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            {getEmotionDescription(emotion)}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

function getToneDescription(tone: ToneType): string {
  const descriptions: Record<ToneType, string> = {
    neutral: 'Your message has a balanced, objective tone.',
    friendly: 'Your message comes across as warm and approachable.',
    formal: 'Your message uses professional, business-appropriate language.',
    aggressive: 'Your message may come across as confrontational.',
    anxious: 'Your message shows signs of worry or nervousness.',
    sarcastic: 'Your message may be interpreted as sarcastic.',
    apologetic: 'Your message contains apologetic elements.',
    assertive: 'Your message is clear and direct.',
    uncertain: 'Your message shows some hesitation.',
  };
  return descriptions[tone];
}

function getEmotionDescription(emotion: EmotionType): string {
  const descriptions: Record<EmotionType, string> = {
    happy: 'The message conveys positive feelings.',
    frustrated: 'There may be underlying frustration.',
    confused: 'The message suggests some confusion.',
    stressed: 'Signs of stress are present.',
    calm: 'The message feels composed and peaceful.',
    excited: 'There is enthusiasm in the message.',
    worried: 'Concern is expressed in the message.',
    hopeful: 'Optimism comes through in the message.',
    neutral: 'The emotional content is balanced.',
  };
  return descriptions[emotion];
}
