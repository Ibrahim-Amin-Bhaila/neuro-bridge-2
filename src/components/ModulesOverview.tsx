import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  MessageSquare, 
  Volume2, 
  Eye, 
  Heart, 
  Zap, 
  Users, 
  Mail, 
  Presentation,
  Clock,
  CheckCircle
} from "lucide-react";

const modules = [
  {
    id: 1,
    title: "Understanding Verbal Nuance",
    description: "Learn to identify subtle meanings, context clues, and implied messages in verbal communication.",
    icon: MessageSquare,
    duration: "5 hours",
    lessons: 8,
    status: "available",
    color: "bg-primary"
  },
  {
    id: 2,
    title: "Tone Detection & Adjustment",
    description: "Master the art of recognizing emotional undertones and adjusting your own communication accordingly.",
    icon: Volume2,
    duration: "5 hours",
    lessons: 9,
    status: "available",
    color: "bg-accent"
  },
  {
    id: 3,
    title: "Nonverbal Cues & Body Language",
    description: "Decode facial expressions, gestures, and posture to better understand unspoken communication.",
    icon: Eye,
    duration: "5 hours",
    lessons: 10,
    status: "available",
    color: "bg-primary"
  },
  {
    id: 4,
    title: "Emotional Expression in Dialogue",
    description: "Practice conveying emotions appropriately through voice modulation and word choice.",
    icon: Heart,
    duration: "5 hours",
    lessons: 7,
    status: "available",
    color: "bg-accent"
  },
  {
    id: 5,
    title: "Responding in High-Stress Scenarios",
    description: "Develop strategies for maintaining clear communication under pressure and in challenging situations.",
    icon: Zap,
    duration: "5 hours",
    lessons: 8,
    status: "locked",
    color: "bg-muted"
  },
  {
    id: 6,
    title: "Social Communication in Teams",
    description: "Navigate group dynamics, team meetings, and collaborative conversations effectively.",
    icon: Users,
    duration: "5 hours",
    lessons: 9,
    status: "locked",
    color: "bg-muted"
  },
  {
    id: 7,
    title: "Professional & Email Etiquette",
    description: "Master written and verbal communication in professional settings and business contexts.",
    icon: Mail,
    duration: "5 hours",
    lessons: 8,
    status: "locked",
    color: "bg-muted"
  },
  {
    id: 8,
    title: "Real-World Roleplay & Mastery",
    description: "Apply all learned skills in realistic scenarios and receive comprehensive AI feedback.",
    icon: Presentation,
    duration: "5 hours",
    lessons: 10,
    status: "locked",
    color: "bg-muted"
  }
];

const ModulesOverview = () => {
  return (
    <section id="modules" className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <Badge variant="outline" className="text-primary border-primary">
            40-Hour Structured Course
          </Badge>
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground">
            Master Communication in{" "}
            <span className="bg-gradient-hero bg-clip-text text-transparent">
              8 Modules
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Each module combines reading materials, video lessons, and interactive voice exercises 
            with real-time AI feedback to enhance your communication skills progressively.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {modules.map((module) => {
            const IconComponent = module.icon;
            const isLocked = module.status === "locked";
            
            return (
              <Card 
                key={module.id} 
                className={`group transition-all duration-300 hover:shadow-elegant ${
                  isLocked ? 'opacity-75' : 'hover:-translate-y-1'
                } ${isLocked ? 'border-muted' : 'border-border hover:border-primary/50'}`}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className={`w-12 h-12 ${module.color} rounded-lg flex items-center justify-center mb-4 ${
                      isLocked ? 'opacity-50' : 'group-hover:scale-110'
                    } transition-transform duration-300`}>
                      <IconComponent className={`w-6 h-6 ${
                        isLocked ? 'text-muted-foreground' : 'text-white'
                      }`} />
                    </div>
                    {isLocked && (
                      <Badge variant="secondary" className="text-xs">
                        Locked
                      </Badge>
                    )}
                    {module.status === "available" && (
                      <Badge variant="outline" className="text-xs border-primary text-primary">
                        Available
                      </Badge>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <CardTitle className={`text-lg leading-tight ${
                      isLocked ? 'text-muted-foreground' : 'text-foreground'
                    }`}>
                      Module {module.id}: {module.title}
                    </CardTitle>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {module.duration}
                      </div>
                      <div className="flex items-center gap-1">
                        <CheckCircle className="w-4 h-4" />
                        {module.lessons} lessons
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <CardDescription className="text-sm leading-relaxed mb-4">
                    {module.description}
                  </CardDescription>
                  
                  <Button 
                    className={`w-full ${
                      isLocked 
                        ? 'opacity-50 cursor-not-allowed' 
                        : 'bg-gradient-primary shadow-primary hover:shadow-accent'
                    }`}
                    disabled={isLocked}
                  >
                    {isLocked ? 'Complete Previous Modules' : 'Start Module'}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <div className="bg-gradient-hero rounded-2xl p-8 text-center shadow-elegant max-w-4xl mx-auto">
            <div className="bg-background/95 backdrop-blur rounded-xl p-6 space-y-4">
              <h3 className="text-2xl font-bold text-foreground">
                Complete All Modules, Earn Your Certificate
              </h3>
              <p className="text-muted-foreground">
                After finishing all 8 modules, take your final certification exam. 
                Pass with 70% or higher to earn your NeuroBridge Communication Certificate 
                - a valuable credential for your resume and LinkedIn profile.
              </p>
              <Button size="lg" className="bg-gradient-accent shadow-accent">
                Learn About Certification
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModulesOverview;