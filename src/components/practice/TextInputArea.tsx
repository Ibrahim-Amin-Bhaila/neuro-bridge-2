import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CONTEXT_OPTIONS } from '@/types/practice';
import { Loader2, Send, RotateCcw } from 'lucide-react';

interface TextInputAreaProps {
  onSubmit: (message: string, context?: string) => void;
  isLoading: boolean;
  onReset?: () => void;
  hasResults?: boolean;
}

export function TextInputArea({ onSubmit, isLoading, onReset, hasResults }: TextInputAreaProps) {
  const [message, setMessage] = useState('');
  const [context, setContext] = useState<string>('');

  const handleSubmit = () => {
    if (message.trim()) {
      onSubmit(message.trim(), context || undefined);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.ctrlKey && !isLoading) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleReset = () => {
    setMessage('');
    setContext('');
    onReset?.();
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="message" className="text-base font-medium">
          Your Message
        </Label>
        <Textarea
          id="message"
          placeholder="Type or paste the message you want to analyze...

Example: 'Hey, I was wondering if you could maybe possibly help me with something if you're not too busy? Sorry to bother you.'"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          className="min-h-[150px] text-base resize-y"
          disabled={isLoading}
          aria-describedby="message-hint"
        />
        <p id="message-hint" className="text-sm text-muted-foreground">
          Press Ctrl+Enter to analyze
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="context" className="text-base font-medium">
          Context (Optional)
        </Label>
        <Select value={context} onValueChange={setContext} disabled={isLoading}>
          <SelectTrigger id="context" className="w-full">
            <SelectValue placeholder="Select the type of communication..." />
          </SelectTrigger>
          <SelectContent>
            {CONTEXT_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <p className="text-sm text-muted-foreground">
          Adding context helps the AI give more relevant feedback
        </p>
      </div>

      <div className="flex gap-3">
        <Button
          onClick={handleSubmit}
          disabled={!message.trim() || isLoading}
          className="flex-1"
          size="lg"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <Send className="mr-2 h-5 w-5" />
              Analyze Message
            </>
          )}
        </Button>

        {hasResults && (
          <Button
            onClick={handleReset}
            variant="outline"
            size="lg"
            disabled={isLoading}
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            New Analysis
          </Button>
        )}
      </div>
    </div>
  );
}
