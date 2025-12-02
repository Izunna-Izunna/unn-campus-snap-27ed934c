import { Home, Search, PlusSquare, Film, User } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: Home, path: "/" },
  { icon: Search, path: "/explore" },
  { icon: PlusSquare, path: "/sell" },
  { icon: Film, path: "/reels" },
  { icon: User, path: "/profile" },
];

export const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 glass border-t border-border bottom-nav-safe">
      <div className="h-14 px-6 flex items-center justify-around max-w-lg mx-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          const isCreate = item.path === "/sell";
          
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={cn(
                "relative p-3 transition-all duration-200 active:scale-90",
                isCreate && "bg-accent rounded-xl"
              )}
            >
              <Icon 
                className={cn(
                  "w-6 h-6 transition-all duration-200",
                  isActive && !isCreate ? "text-accent scale-110" : "",
                  isCreate ? "text-accent-foreground" : "text-foreground"
                )} 
                strokeWidth={isActive ? 2.5 : 1.5}
              />
              
              {/* Active indicator */}
              {isActive && !isCreate && (
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-accent rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
