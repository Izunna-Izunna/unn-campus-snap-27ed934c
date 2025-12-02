import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Eye, EyeOff, Check, Camera, User, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { CAMPUSES, CATEGORIES } from "@/utils/constants";
import { toast } from "@/hooks/use-toast";

const steps = ["Basic Info", "Profile", "Phone", "Interests"];

export const SignUpPage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  
  // Form state
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [campus, setCampus] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [isOtpSent, setIsOtpSent] = useState(false);

  const progress = ((currentStep + 1) / steps.length) * 100;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Complete signup
      localStorage.setItem("kaymart_user", JSON.stringify({ email, username }));
      toast({
        title: "Welcome to KayMart!",
        description: "Your account has been created successfully.",
      });
      navigate("/");
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      
      // Auto-focus next input
      if (value && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const toggleInterest = (categoryId: string) => {
    setSelectedInterests(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold">Create your account</h2>
              <p className="text-muted-foreground">Join the UNN marketplace</p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@unn.edu.ng"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12"
                />
                <p className="text-xs text-muted-foreground">Use your UNN email for verification</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Choose a username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/\s/g, ""))}
                  className="h-12"
                />
                {username && (
                  <p className="text-xs text-primary flex items-center gap-1">
                    <Check className="w-3 h-3" /> Available
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-12 pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                <div className="flex gap-1 mt-2">
                  {[1, 2, 3].map((level) => (
                    <div
                      key={level}
                      className={cn(
                        "h-1 flex-1 rounded-full",
                        password.length >= level * 4 ? "bg-primary" : "bg-border"
                      )}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold">Set up your profile</h2>
              <p className="text-muted-foreground">Help others know you</p>
            </div>

            <div className="flex justify-center mb-6">
              <button className="relative">
                <div className="w-24 h-24 bg-secondary rounded-full flex items-center justify-center">
                  <User className="w-12 h-12 text-muted-foreground" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <Camera className="w-4 h-4 text-primary-foreground" />
                </div>
              </button>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  type="text"
                  placeholder="Your full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="campus">Campus</Label>
                <div className="relative">
                  <select
                    id="campus"
                    value={campus}
                    onChange={(e) => setCampus(e.target.value)}
                    className="w-full h-12 px-4 pr-10 bg-background border border-input rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value="">Select your campus</option>
                    {CAMPUSES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold">Verify your phone</h2>
              <p className="text-muted-foreground">We'll send you a verification code</p>
            </div>

            {!isOtpSent ? (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="flex gap-2">
                    <div className="w-20 h-12 bg-secondary rounded-lg flex items-center justify-center text-sm font-medium">
                      +234
                    </div>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="8012345678"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                      className="h-12 flex-1"
                    />
                  </div>
                </div>
                <Button 
                  className="w-full h-12"
                  onClick={() => setIsOtpSent(true)}
                  disabled={phone.length < 10}
                >
                  Send Code
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-center text-muted-foreground">
                  Enter the 6-digit code sent to +234 {phone}
                </p>
                <div className="flex justify-center gap-2">
                  {otp.map((digit, index) => (
                    <Input
                      key={index}
                      id={`otp-${index}`}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      className="w-12 h-14 text-center text-xl font-semibold"
                    />
                  ))}
                </div>
                <button
                  onClick={() => setIsOtpSent(false)}
                  className="w-full text-center text-sm text-primary hover:underline"
                >
                  Didn't receive code? Resend
                </button>
              </div>
            )}
          </div>
        );

      case 3:
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold">What interests you?</h2>
              <p className="text-muted-foreground">Help us personalize your feed</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {CATEGORIES.filter(c => c.id !== "all").map((category) => {
                const Icon = category.icon;
                const isSelected = selectedInterests.includes(category.id);
                
                return (
                  <button
                    key={category.id}
                    onClick={() => toggleInterest(category.id)}
                    className={cn(
                      "flex items-center gap-3 p-4 rounded-xl border-2 transition-all",
                      isSelected 
                        ? "border-primary bg-primary/5" 
                        : "border-border hover:border-primary/50"
                    )}
                  >
                    <div className={cn(
                      "w-10 h-10 rounded-lg flex items-center justify-center",
                      isSelected ? "bg-primary text-primary-foreground" : "bg-secondary"
                    )}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="font-medium text-sm">{category.label}</span>
                    {isSelected && (
                      <Check className="w-4 h-4 text-primary ml-auto" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between h-14 px-4 border-b border-border">
        <button
          onClick={() => currentStep > 0 ? setCurrentStep(prev => prev - 1) : navigate("/welcome")}
          className="p-2 -ml-2 text-foreground hover:text-muted-foreground transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <span className="text-sm text-muted-foreground">
          Step {currentStep + 1} of {steps.length}
        </span>
        <div className="w-10" />
      </header>

      {/* Progress */}
      <Progress value={progress} className="h-1 rounded-none" />

      {/* Content */}
      <div className="flex-1 px-6 pt-8 pb-6 overflow-y-auto">
        {renderStep()}
      </div>

      {/* Footer */}
      <div className="px-6 pb-8 pt-4 border-t border-border">
        <Button 
          size="lg" 
          className="w-full h-14 text-lg font-semibold"
          onClick={handleNext}
        >
          {currentStep === steps.length - 1 ? "Get Started" : "Next"}
        </Button>
        {currentStep === 3 && (
          <button
            onClick={handleNext}
            className="w-full py-3 text-center text-muted-foreground text-sm"
          >
            Skip for now
          </button>
        )}
      </div>
    </div>
  );
};

export default SignUpPage;
