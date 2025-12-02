import { Heart, MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const TopBar = () => {
  const navigate = useNavigate();

  return (
    <header className="lg:hidden fixed top-0 left-0 right-0 z-50 glass border-b border-border">
      <div className="h-14 px-4 flex items-center justify-between max-w-2xl mx-auto">
        {/* Logo */}
        <h1 
          onClick={() => navigate("/")}
          className="text-xl cursor-pointer hover:opacity-70 transition-opacity tracking-tight"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          KayMart
        </h1>

        {/* Actions */}
        <div className="flex items-center gap-1">
          <button 
            onClick={() => navigate("/notifications")}
            className="relative p-2.5 hover:bg-secondary rounded-full transition-colors"
          >
            <Heart className="w-6 h-6" strokeWidth={1.5} />
            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-accent rounded-full border-2 border-background" />
          </button>
          
          <button 
            onClick={() => navigate("/messages")}
            className="relative p-2.5 hover:bg-secondary rounded-full transition-colors"
          >
            <MessageCircle className="w-6 h-6" strokeWidth={1.5} />
            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-accent rounded-full border-2 border-background" />
          </button>
        </div>
      </div>
    </header>
  );
};
