import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, Sparkles, Users, Building, Brain } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "Free",
    period: "forever",
    description: "Get started with basic communication training modules",
    icon: Brain,
    featured: false,
    features: [
      "Access to 2 free modules",
      "Understanding Verbal Nuance",
      "Tone Detection & Adjustment",
      "Basic progress tracking",
      "Community support",
      "Email notifications",
      "Mobile access",
      "No credit card required"
    ],
    cta: "Get Started Free",
    color: "bg-gradient-accent"
  },
  {
    name: "Individual",
    price: "$14.99",
    period: "per month",
    description: "Perfect for individuals looking to enhance their communication skills",
    icon: Sparkles,
    featured: true,
    features: [
      "Access to all 8 modules",
      "AI-powered tone analyzer",
      "Real-time voice feedback",
      "Progress tracking dashboard",
      "Certification upon completion",
      "7-10 questions per module",
      "Final certification exam",
      "Downloadable certificate"
    ],
    cta: "Start Your Journey",
    color: "bg-gradient-primary"
  },
  {
    name: "Student Plan",
    price: "Discounted",
    period: "with verification",
    description: "Special pricing for students with valid educational credentials",
    icon: Users,
    featured: false,
    features: [
      "All Individual plan features",
      "Student verification required",
      "Educational institution support",
      "Extended access periods",
      "Study group features",
      "Academic progress reports",
      "Career counseling resources",
      "Alumni network access"
    ],
    cta: "Verify Student Status",
    color: "bg-gradient-accent"
  },
  {
    name: "Organizations",
    price: "Custom",
    period: "contact us",
    description: "For NGOs, schools, nonprofits, and companies seeking bulk access",
    icon: Building,
    featured: false,
    features: [
      "Bulk user management",
      "Custom dashboards",
      "Administrative tools",
      "Progress monitoring",
      "Team analytics",
      "Custom integrations",
      "Dedicated support",
      "Training workshops"
    ],
    cta: "Contact Sales",
    color: "bg-muted"
  }
];

const PricingSection = () => {
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  return (
    <section id="pricing" className="py-16 lg:py-24 bg-gradient-subtle">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <Badge variant="outline" className="text-accent border-accent">
            Flexible Pricing
          </Badge>
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground">
            Choose Your{" "}
            <span className="bg-gradient-hero bg-clip-text text-transparent">
              Learning Path
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Start your communication journey with our flexible subscription plans. 
            All plans include full access to our AI-powered learning platform and certification.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {plans.map((plan) => {
            const IconComponent = plan.icon;
            const isCustom = plan.price === "Custom";
            
            return (
              <Card 
                key={plan.name}
                className={`relative transition-all duration-300 hover:shadow-elegant ${
                  plan.featured 
                    ? 'border-primary shadow-primary scale-105 md:scale-110' 
                    : 'border-border hover:border-primary/50 hover:-translate-y-1'
                }`}
              >
                {plan.featured && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gradient-primary shadow-primary px-4 py-1">
                      Most Popular
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="text-center pb-4">
                  <div className={`w-16 h-16 ${plan.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-primary`}>
                    <IconComponent className={`w-8 h-8 ${
                      isCustom ? 'text-muted-foreground' : 'text-white'
                    }`} />
                  </div>
                  
                  <CardTitle className="text-2xl font-bold text-foreground">
                    {plan.name}
                  </CardTitle>
                  
                  <div className="space-y-2">
                    <div className="flex items-baseline justify-center gap-1">
                      <span className={`text-4xl font-bold ${
                        plan.featured ? 'text-primary' : 'text-foreground'
                      }`}>
                        {plan.price}
                      </span>
                      {!isCustom && (
                        <span className="text-muted-foreground">/{plan.period.split(' ')[1]}</span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{plan.period}</p>
                  </div>
                  
                  <CardDescription className="text-center">
                    {plan.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                  <ul className="space-y-3">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <Check className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                          plan.featured ? 'text-primary' : 'text-accent'
                        }`} />
                        <span className="text-sm text-muted-foreground leading-relaxed">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Button 
                    className={`w-full ${
                      plan.featured 
                        ? 'bg-gradient-primary shadow-primary hover:shadow-elegant' 
                        : isCustom
                        ? 'bg-muted text-muted-foreground hover:bg-secondary'
                        : 'bg-gradient-accent shadow-accent hover:shadow-primary'
                    } transition-all duration-300`}
                    size="lg"
                    onClick={() => {
                      if (plan.name === "Organizations") {
                        // Handle contact sales
                        window.open('mailto:sales@neurobridge.com?subject=Organization Plan Inquiry', '_blank');
                      } else if (plan.name === "Free") {
                        navigate(user ? '/dashboard' : '/auth');
                      } else if (user) {
                        navigate('/dashboard');
                      } else {
                        navigate('/auth');
                      }
                    }}
                    disabled={user && profile?.subscription_tier === plan.name.toLowerCase()}
                  >
                    {user && profile?.subscription_tier === plan.name.toLowerCase() 
                      ? "Current Plan" 
                      : plan.cta
                    }
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-12 space-y-4">
          <p className="text-muted-foreground">
            All plans include a 7-day free trial • Cancel anytime • Secure payments via Stripe
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
            <span>✓ No setup fees</span>
            <span>✓ Instant access</span>
            <span>✓ 24/7 support</span>
            <span>✓ Money-back guarantee</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;