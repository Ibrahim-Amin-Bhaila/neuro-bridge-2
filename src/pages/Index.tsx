import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ModulesOverview from "@/components/ModulesOverview";
import PricingSection from "@/components/PricingSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <ModulesOverview />
      <PricingSection />
      <Footer />
    </div>
  );
};

export default Index;
