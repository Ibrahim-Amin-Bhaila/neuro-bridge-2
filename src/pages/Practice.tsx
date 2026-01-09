import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useAnalyzeCommunication } from '@/hooks/useAnalyzeCommunication';
import { TextInputArea } from '@/components/practice/TextInputArea';
import { AnalysisResults } from '@/components/practice/AnalysisResults';
import { PracticeHistory } from '@/components/practice/PracticeHistory';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ArrowLeft, Brain, Shield, Info } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Practice() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { analyze, isAnalyzing, analysis, error, reset } = useAnalyzeCommunication();
  const [submittedMessage, setSubmittedMessage] = useState('');

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth', { replace: true });
    }
  }, [user, loading, navigate]);

  const handleSubmit = async (message: string, context?: string) => {
    setSubmittedMessage(message);
    await analyze({ message, context });
  };

  const handleReset = () => {
    setSubmittedMessage('');
    reset();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/dashboard')}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Dashboard
            </Button>
            <div className="flex items-center gap-2">
              <Brain className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-bold text-primary">Communication Practice</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-5 w-5 text-primary" />
                    Analyze Your Message
                  </CardTitle>
                  <CardDescription>
                    Enter a message you'd like to send, and NeuroBridge will help you understand 
                    how it might be perceived and suggest improvements.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <TextInputArea
                    onSubmit={handleSubmit}
                    isLoading={isAnalyzing}
                    onReset={handleReset}
                    hasResults={!!analysis}
                  />
                </CardContent>
              </Card>
            </motion.div>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {analysis && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                <AnalysisResults 
                  analysis={analysis} 
                  originalMessage={submittedMessage} 
                />
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <PracticeHistory limit={5} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <Card className="border-primary/20 bg-primary/5">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Shield className="h-4 w-4 text-primary" />
                    Your Privacy
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground space-y-2">
                  <p>
                    Your messages are analyzed securely and stored only to help you 
                    track your progress.
                  </p>
                  <p>
                    NeuroBridge never shares your data and you can delete your 
                    history at any time.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Info className="h-4 w-4 text-muted-foreground" />
                    How It Works
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  <ol className="list-decimal list-inside space-y-2">
                    <li>Type or paste your message</li>
                    <li>Select the context (optional)</li>
                    <li>Get instant feedback on tone and clarity</li>
                    <li>Review suggested improvements</li>
                    <li>Learn from personalized tips</li>
                  </ol>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}
