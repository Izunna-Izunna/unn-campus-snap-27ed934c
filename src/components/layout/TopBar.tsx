import { Heart, MessageCircle, Search, Megaphone } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface TopBarProps {
  onOpenRequests?: () => void;
  onOpenAdverts?: () => void;
  requestsCount?: number;
  advertsCount?: number;
}

export const TopBar = ({ onOpenRequests, onOpenAdverts, requestsCount = 12, advertsCount = 5 }: TopBarProps) => {
  const navigate = useNavigate();

  return (
    <header className="lg:hidden fixed top-0 left-0 right-0 z-40 glass border-b border-border">
      <div className="h-14 px-3 flex items-center justify-between max-w-2xl mx-auto">
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
          {/* Requests Button */}
          <button 
            onClick={onOpenRequests}
            className="relative flex items-center gap-1.5 px-2.5 py-1.5 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-xs font-medium hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
          >
            <Search className="w-3.5 h-3.5" />
            <span className="hidden xs:inline">Requests</span>
            <span className="w-4 h-4 bg-green-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
              {requestsCount > 9 ? '9+' : requestsCount}
            </span>
          </button>

          {/* Adverts Button */}
          <button 
            onClick={onOpenAdverts}
            className="relative flex items-center gap-1.5 px-2.5 py-1.5 bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-full text-xs font-medium hover:bg-amber-100 dark:hover:bg-amber-900/50 transition-colors"
          >
            <Megaphone className="w-3.5 h-3.5" />
            <span className="hidden xs:inline">Adverts</span>
            <span className="w-4 h-4 bg-orange-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
              {advertsCount > 9 ? '9+' : advertsCount}
            </span>
          </button>

          <button 
            onClick={() => navigate("/notifications")}
            className="relative p-2 hover:bg-secondary rounded-full transition-colors"
          >
            <Heart className="w-5 h-5" strokeWidth={1.5} />
            <span className="absolute top-0.5 right-0.5 w-2 h-2 bg-accent rounded-full border border-background" />
          </button>
          
          <button 
            onClick={() => navigate("/messages")}
            className="relative p-2 hover:bg-secondary rounded-full transition-colors"
          >
            <MessageCircle className="w-5 h-5" strokeWidth={1.5} />
            <span className="absolute top-0.5 right-0.5 w-2 h-2 bg-accent rounded-full border border-background" />
          </button>
        </div>
      </div>
    </header>
  );
};
