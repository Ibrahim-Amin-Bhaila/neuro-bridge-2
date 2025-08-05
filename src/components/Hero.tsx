import { Button } from "@/components/ui/button";
import { Brain, Mic, TrendingUp, Award } from "lucide-react";

const Hero = () => {
  return (
    <section className="pt-24 pb-12 lg:pt-32 lg:pb-20 bg-gradient-subtle">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Hero Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center px-4 py-2 bg-secondary rounded-full text-sm font-medium text-secondary-foreground border border-border">
                <Brain className="w-4 h-4 mr-2 text-primary" />
                AI-Powered Communication Training
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight">
                Bridge the Gap in{" "}
                <span className="bg-gradient-hero bg-clip-text text-transparent">
                  Communication
                </span>
              </h1>
              
              <p className="text-xl text-muted-foreground leading-relaxed">
                Enhance your communication skills, tone recognition, and emotional expression 
                with our structured 8-module course designed specifically for high-functioning 
                autistic individuals in STEM fields.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-gradient-primary shadow-primary hover:shadow-elegant transition-all duration-300 text-lg px-8 py-3"
              >
                Start Your Journey
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="text-lg px-8 py-3 border-2 hover:bg-secondary transition-all duration-300"
              >
                Watch Demo
              </Button>
            </div>

            {/* Key Features */}
            <div className="grid grid-cols-3 gap-4 pt-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <Mic className="w-6 h-6 text-primary" />
                </div>
                <p className="text-sm font-medium text-foreground">Voice Analysis</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <TrendingUp className="w-6 h-6 text-accent" />
                </div>
                <p className="text-sm font-medium text-foreground">Progress Tracking</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <Award className="w-6 h-6 text-primary" />
                </div>
                <p className="text-sm font-medium text-foreground">Certification</p>
              </div>
            </div>
          </div>

          {/* Hero Visual */}
          <div className="relative">
            <div className="relative bg-gradient-hero rounded-2xl p-8 shadow-elegant">
              <div className="bg-background/95 backdrop-blur rounded-xl p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-foreground">Module Progress</h3>
                  <span className="text-sm text-muted-foreground">6/8 Complete</span>
                </div>
                
                {/* Mock Progress Bars */}
                <div className="space-y-3">
                  {[
                    { name: "Verbal Nuance", progress: 100, color: "bg-primary" },
                    { name: "Tone Detection", progress: 100, color: "bg-primary" },
                    { name: "Body Language", progress: 85, color: "bg-accent" },
                    { name: "Emotional Expression", progress: 75, color: "bg-accent" },
                    { name: "High-Stress Scenarios", progress: 60, color: "bg-muted" },
                    { name: "Team Communication", progress: 45, color: "bg-muted" },
                  ].map((module, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="text-foreground font-medium">{module.name}</span>
                        <span className="text-muted-foreground">{module.progress}%</span>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-2">
                        <div 
                          className={`${module.color} h-2 rounded-full transition-all duration-500`}
                          style={{ width: `${module.progress}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-border">
                  <Button className="w-full bg-gradient-accent shadow-accent">
                    Continue Learning
                  </Button>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-accent rounded-full flex items-center justify-center shadow-accent animate-float">
              <Brain className="w-8 h-8 text-accent-foreground" />
            </div>
            <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-primary rounded-full flex items-center justify-center shadow-primary animate-float" style={{ animationDelay: '1s' }}>
              <Mic className="w-6 h-6 text-primary-foreground" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;