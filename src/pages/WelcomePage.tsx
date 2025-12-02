import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingBag, Camera, MessageCircle, ShieldCheck, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const features = [
  {
    icon: Camera,
    title: "Post in Seconds",
    description: "Just like Instagram, share what you're selling with a few taps",
  },
  {
    icon: MessageCircle,
    title: "Chat Instantly",
    description: "Message buyers and sellers directly within the app",
  },
  {
    icon: ShieldCheck,
    title: "Safe & Verified",
    description: "Only UNN students can join - your campus, your marketplace",
  },
];

export const WelcomePage = () => {
  const navigate = useNavigate();
  const [currentFeature, setCurrentFeature] = useState(0);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Hero Section */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pt-12 pb-8">
        <div className="w-20 h-20 bg-primary rounded-2xl flex items-center justify-center mb-6 shadow-glow animate-fade-in">
          <ShoppingBag className="w-10 h-10 text-primary-foreground" />
        </div>
        
        <h1 className="text-3xl font-bold text-foreground mb-2 animate-fade-in" style={{ animationDelay: "100ms" }}>
          KayMart
        </h1>
        <p className="text-xl text-primary font-medium mb-1 animate-fade-in" style={{ animationDelay: "150ms" }}>
          Buy & Sell with UNN Students
        </p>
        <p className="text-muted-foreground text-center max-w-xs animate-fade-in" style={{ animationDelay: "200ms" }}>
          Your campus marketplace for everything you need
        </p>
      </div>

      {/* Feature Cards */}
      <div className="px-6 pb-8 animate-fade-in" style={{ animationDelay: "300ms" }}>
        <div className="relative bg-secondary rounded-2xl p-6 min-h-[180px]">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
              {(() => {
                const Icon = features[currentFeature].icon;
                return <Icon className="w-6 h-6 text-primary" />;
              })()}
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-1">
                {features[currentFeature].title}
              </h3>
              <p className="text-muted-foreground">
                {features[currentFeature].description}
              </p>
            </div>
          </div>

          {/* Navigation Arrows */}
          <div className="flex justify-between mt-6">
            <button
              onClick={() => setCurrentFeature(prev => prev > 0 ? prev - 1 : features.length - 1)}
              className="w-10 h-10 rounded-full bg-background flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex gap-2 items-center">
              {features.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentFeature(idx)}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all",
                    idx === currentFeature 
                      ? "bg-primary w-6" 
                      : "bg-border"
                  )}
                />
              ))}
            </div>
            <button
              onClick={() => setCurrentFeature(prev => prev < features.length - 1 ? prev + 1 : 0)}
              className="w-10 h-10 rounded-full bg-background flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* CTA Buttons */}
      <div className="px-6 pb-8 space-y-3 animate-fade-in" style={{ animationDelay: "400ms" }}>
        <Button 
          size="lg" 
          className="w-full h-14 text-lg font-semibold"
          onClick={() => navigate("/signup")}
        >
          Create Account
        </Button>
        <button
          onClick={() => navigate("/login")}
          className="w-full py-3 text-muted-foreground hover:text-foreground transition-colors"
        >
          Already have an account? <span className="text-primary font-medium">Log In</span>
        </button>
      </div>

      {/* Bottom Safe Area */}
      <div className="h-8" />
    </div>
  );
};

export default WelcomePage;
