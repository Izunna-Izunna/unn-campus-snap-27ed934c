import { Heart, Send } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const TopBar = () => {
  const navigate = useNavigate();
  return (
    <header className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-lg border-b border-border">
      <div className="flex items-center justify-between h-14 px-4 max-w-lg mx-auto">
        <h1 onClick={() => navigate("/")} className="text-2xl font-bold tracking-tight cursor-pointer hover:opacity-70 transition-opacity" style={{ fontFamily: "'Segoe UI', sans-serif", fontStyle: "italic" }}>KayMart</h1>
        <div className="flex items-center gap-4">
          <button onClick={() => navigate("/saved")} className="relative p-1 text-foreground hover:opacity-60 transition-all duration-200 press-effect">
            <Heart className="w-6 h-6" strokeWidth={1.5} />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-accent text-accent-foreground text-[10px] font-semibold rounded-full flex items-center justify-center">3</span>
          </button>
          <button onClick={() => navigate("/messages")} className="relative p-1 text-foreground hover:opacity-60 transition-all duration-200 press-effect">
            <Send className="w-6 h-6" strokeWidth={1.5} />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-accent text-accent-foreground text-[10px] font-semibold rounded-full flex items-center justify-center">2</span>
          </button>
        </div>
      </div>
    </header>
  );
};
