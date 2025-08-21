import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Brain, Clock, TrendingUp, Lock, CheckCircle, Play } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useNavigate } from 'react-router-dom';

interface Module {
  id: string;
  module_number: number;
  title: string;
  description: string;
  estimated_hours: number;
  is_free: boolean;
}

interface UserProgress {
  module_id: string;
  is_completed: boolean;
  completion_percentage: number;
  hours_spent: number;
  final_score?: number;
}

interface ToneAnalysis {
  session_date: string;
  tone_score: number;
  clarity_score: number;
  emotional_accuracy_score: number;
  overall_score: number;
}

const Dashboard = () => {
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();
  const [modules, setModules] = useState<Module[]>([]);
  const [userProgress, setUserProgress] = useState<UserProgress[]>([]);
  const [toneAnalysis, setToneAnalysis] = useState<ToneAnalysis[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user && !loading) {
      navigate('/auth', { replace: true });
      return;
    }
    
    if (user) {
      fetchData();
    }
  }, [user, loading, navigate]);

  const fetchData = async () => {
    try {
      // Fetch modules
      const { data: modulesData } = await supabase
        .from('modules')
        .select('*')
        .order('module_number');
      
      // Fetch user progress
      const { data: progressData } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', user?.id);
      
      // Fetch tone analysis
      const { data: toneData } = await supabase
        .from('tone_analysis')
        .select('*')
        .eq('user_id', user?.id)
        .order('session_date');

      setModules(modulesData || []);
      setUserProgress(progressData || []);
      setToneAnalysis(toneData || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getModuleProgress = (moduleId: string) => {
    return userProgress.find(p => p.module_id === moduleId);
  };

  const isModuleAccessible = (module: Module) => {
    return module.is_free || profile?.subscription_tier !== 'free';
  };

  const completedModules = userProgress.filter(p => p.is_completed).length;
  const totalHours = userProgress.reduce((sum, p) => sum + p.hours_spent, 0);
  const avgScore = userProgress.length > 0 
    ? userProgress.filter(p => p.final_score).reduce((sum, p) => sum + (p.final_score || 0), 0) / userProgress.filter(p => p.final_score).length
    : 0;

  // Generate mock progress data for chart
  const progressChartData = toneAnalysis.length > 0 ? toneAnalysis.map(analysis => ({
    date: new Date(analysis.session_date).toLocaleDateString(),
    tone: analysis.tone_score,
    clarity: analysis.clarity_score,
    emotional: analysis.emotional_accuracy_score,
    overall: analysis.overall_score
  })) : [
    { date: 'Start', tone: 0, clarity: 0, emotional: 0, overall: 0 },
    { date: 'Current', tone: 0, clarity: 0, emotional: 0, overall: 0 }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Brain className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold text-foreground">
              NeuroBridge Dashboard
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant={profile?.subscription_tier === 'free' ? 'secondary' : 'default'}>
              {profile?.subscription_tier === 'free' ? 'Free Tier' : profile?.subscription_tier}
            </Badge>
            <Button variant="outline" onClick={() => {
              signOut();
              navigate('/');
            }}>
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Welcome back, {profile?.full_name || user?.email}!</h2>
          <p className="text-muted-foreground">Continue your communication skills journey</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Modules Completed</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{completedModules}/{modules.length}</div>
              <Progress value={(completedModules / modules.length) * 100} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Hours Completed</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalHours.toFixed(1)}</div>
              <p className="text-xs text-muted-foreground">
                of 40 total hours
              </p>
              <Progress value={(totalHours / 40) * 100} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Score</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{avgScore.toFixed(1)}%</div>
              <p className="text-xs text-muted-foreground">
                Across all completed modules
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="modules" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="modules">Training Modules</TabsTrigger>
            <TabsTrigger value="progress">Progress Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="modules">
            <div className="grid gap-4">
              {modules.map((module) => {
                const progress = getModuleProgress(module.id);
                const isAccessible = isModuleAccessible(module);
                
                return (
                  <Card key={module.id} className={`transition-all hover:shadow-md ${
                    !isAccessible ? 'opacity-60' : ''
                  }`}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline">Module {module.module_number}</Badge>
                            {module.is_free && <Badge variant="secondary">Free</Badge>}
                            {!isAccessible && <Lock className="h-4 w-4 text-muted-foreground" />}
                            {progress?.is_completed && <CheckCircle className="h-4 w-4 text-green-500" />}
                          </div>
                          <CardTitle className="text-lg">{module.title}</CardTitle>
                          <CardDescription className="mt-1">
                            {module.description}
                          </CardDescription>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">
                            {module.estimated_hours} hours
                          </p>
                          {progress && (
                            <p className="text-sm font-medium">
                              {progress.completion_percentage}% complete
                            </p>
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-center">
                        <div className="flex-1">
                          {progress && (
                            <Progress value={progress.completion_percentage} className="mb-2" />
                          )}
                          {progress?.final_score && (
                            <p className="text-sm text-muted-foreground">
                              Final Score: {progress.final_score}%
                            </p>
                          )}
                        </div>
                        <Button 
                          disabled={!isAccessible}
                          className="ml-4"
                        >
                          {progress?.is_completed ? (
                            'Review'
                          ) : (
                            <>
                              <Play className="h-4 w-4 mr-2" />
                              {progress ? 'Continue' : 'Start'}
                            </>
                          )}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
              
              {profile?.subscription_tier === 'free' && (
                <Card className="border-primary/20 bg-primary/5">
                  <CardHeader>
                    <CardTitle className="text-lg">Unlock All Modules</CardTitle>
                    <CardDescription>
                      Get access to all 8 communication training modules with our Individual plan
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full">
                      Upgrade to Individual Plan - $14.99/month
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="progress">
            <Card>
              <CardHeader>
                <CardTitle>Your Communication Progress</CardTitle>
                <CardDescription>
                  Track your improvement in tone, clarity, and emotional expression over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={progressChartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis domain={[0, 100]} />
                      <Tooltip />
                      <Line 
                        type="monotone" 
                        dataKey="tone" 
                        stroke="hsl(var(--primary))" 
                        strokeWidth={2}
                        name="Tone Score"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="clarity" 
                        stroke="hsl(var(--secondary))" 
                        strokeWidth={2}
                        name="Clarity Score"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="emotional" 
                        stroke="hsl(var(--accent))" 
                        strokeWidth={2}
                        name="Emotional Accuracy"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="overall" 
                        stroke="hsl(var(--muted-foreground))" 
                        strokeWidth={3}
                        name="Overall Score"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                {toneAnalysis.length === 0 && (
                  <div className="text-center text-muted-foreground mt-8">
                    <p>Complete voice exercises in modules to see your progress here!</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;