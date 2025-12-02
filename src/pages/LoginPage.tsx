import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingBag, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";

export const LoginPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Mock login - simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Mock validation
    if (email && password) {
      localStorage.setItem("kaymart_user", JSON.stringify({ email }));
      toast({
        title: "Welcome back!",
        description: "You've successfully logged in.",
      });
      navigate("/");
    } else {
      toast({
        title: "Login failed",
        description: "Please check your credentials and try again.",
        variant: "destructive",
      });
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="flex items-center h-14 px-4">
        <button
          onClick={() => navigate("/welcome")}
          className="p-2 -ml-2 text-foreground hover:text-muted-foreground transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
      </header>

      <div className="flex-1 px-6 pt-8">
        {/* Logo */}
        <div className="flex flex-col items-center mb-10">
          <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center mb-4">
            <ShoppingBag className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold">Welcome back!</h1>
          <p className="text-muted-foreground">Log in to continue</p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email or Username</Label>
            <Input
              id="email"
              type="text"
              placeholder="your.email@unn.edu.ng"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12 pr-12"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
            <div className="text-right">
              <button
                type="button"
                onClick={() => navigate("/forgot-password")}
                className="text-sm text-primary hover:underline"
              >
                Forgot Password?
              </button>
            </div>
          </div>

          <Button 
            type="submit" 
            size="lg" 
            className="w-full h-14 text-lg font-semibold"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Log In"}
          </Button>
        </form>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-4 text-muted-foreground">OR</span>
          </div>
        </div>

        <button
          onClick={() => navigate("/signup")}
          className="w-full py-3 text-center text-muted-foreground"
        >
          Don't have an account? <span className="text-primary font-medium">Sign Up</span>
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
