import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingBag } from "lucide-react";

export const SplashScreen = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      // Check if user is logged in (mock check)
      const isLoggedIn = localStorage.getItem("kaymart_user");
      navigate(isLoggedIn ? "/" : "/welcome");
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigate]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-gradient-to-b from-primary to-primary/80">
      <div className="flex flex-col items-center gap-4 animate-fade-in">
        <div className="w-24 h-24 bg-background rounded-3xl flex items-center justify-center shadow-glow">
          <ShoppingBag className="w-12 h-12 text-primary" />
        </div>
        
        <div className="text-center">
          <h1 className="text-4xl font-bold text-primary-foreground tracking-tight">
            KayMart
          </h1>
          <p className="text-primary-foreground/80 mt-1">
            UNN Student Marketplace
          </p>
        </div>
      </div>

      <div className="absolute bottom-20 flex gap-1">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-2 h-2 bg-primary-foreground/50 rounded-full animate-pulse-slow"
            style={{ animationDelay: `${i * 200}ms` }}
          />
        ))}
      </div>
    </div>
  );
};

export default SplashScreen;
