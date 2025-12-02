import { Home, Search, PlusSquare, Film, User } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: Home, label: "Home", path: "/" },
  { icon: Search, label: "Search", path: "/search" },
  { icon: PlusSquare, label: "Create", path: "/sell" },
  { icon: Film, label: "Reels", path: "/reels" },
  { icon: User, label: "Profile", path: "/profile" },
];

export const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border bottom-nav-safe glass">
      <div className="flex items-center justify-around h-12 max-w-lg mx-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          return (
            <button key={item.path} onClick={() => navigate(item.path)} className={cn("flex flex-col items-center justify-center w-16 h-full transition-all duration-200 press-effect", isActive ? "text-foreground" : "text-muted-foreground")}>
              <Icon className={cn("w-6 h-6 transition-all duration-200", isActive && "fill-current scale-110")} strokeWidth={isActive ? 2.5 : 1.5} />
            </button>
          );
        })}
      </div>
    </nav>
  );
};
