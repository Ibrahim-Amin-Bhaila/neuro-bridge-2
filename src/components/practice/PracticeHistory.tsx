import { usePracticeSessions } from '@/hooks/usePracticeSessions';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Clock, MessageSquare } from 'lucide-react';
import { TONE_COLORS, ToneType } from '@/types/practice';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';

interface PracticeHistoryProps {
  limit?: number;
}

export function PracticeHistory({ limit = 5 }: PracticeHistoryProps) {
  const { sessions, isLoading } = usePracticeSessions(limit);

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Recent Practice Sessions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-start gap-3">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/4" />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  if (sessions.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Recent Practice Sessions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <MessageSquare className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p>No practice sessions yet.</p>
            <p className="text-sm">Start practicing to see your history here!</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Recent Practice Sessions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {sessions.map((session) => {
          const analysis = session.ai_analysis?.[0];
          const tone = (analysis?.detected_tone as ToneType) || 'neutral';
          const toneStyle = TONE_COLORS[tone];

          return (
            <div
              key={session.id}
              className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className={cn('p-2 rounded-full shrink-0', toneStyle.bg)}>
                <MessageSquare className={cn('h-4 w-4', toneStyle.text)} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">
                  {session.original_text.slice(0, 60)}
                  {session.original_text.length > 60 ? '...' : ''}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  {analysis && (
                    <Badge variant="secondary" className="text-xs">
                      Clarity: {analysis.clarity_score}%
                    </Badge>
                  )}
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {formatDistanceToNow(new Date(session.created_at), { addSuffix: true })}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
