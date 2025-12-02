import { 
  Home, 
  Search, 
  Compass, 
  Film, 
  MessageCircle, 
  Heart, 
  PlusSquare, 
  Menu,
  User
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: Home, label: "Home", path: "/" },
  { icon: Search, label: "Search", path: "/search" },
  { icon: Compass, label: "Explore", path: "/explore" },
  { icon: Film, label: "Reels", path: "/reels" },
  { icon: MessageCircle, label: "Messages", path: "/messages" },
  { icon: Heart, label: "Notifications", path: "/notifications" },
  { icon: PlusSquare, label: "Create", path: "/sell" },
  { icon: User, label: "Profile", path: "/profile" },
];

export const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <aside className="hidden lg:flex fixed left-0 top-0 bottom-0 w-[220px] xl:w-[245px] flex-col border-r border-border bg-background z-50 animate-slide-in-left">
      {/* Logo */}
      <div className="px-6 pt-8 pb-4">
        <h1 
          onClick={() => navigate("/")}
          className="text-2xl font-bold cursor-pointer hover:opacity-70 transition-opacity"
          style={{ fontFamily: "'Segoe UI', sans-serif", fontStyle: "italic" }}
        >
          KayMart
        </h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-2">
        <ul className="space-y-1">
          {navItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            
            return (
              <li 
                key={item.path}
                className="animate-fade-in opacity-0"
                style={{ animationDelay: `${index * 0.05}s`, animationFillMode: 'forwards' }}
              >
                <button
                  onClick={() => navigate(item.path)}
                  className={cn(
                    "nav-item w-full group",
                    isActive && "active"
                  )}
                >
                  <Icon 
                    className={cn(
                      "w-6 h-6 transition-transform duration-200 group-hover:scale-110",
                      isActive && "fill-current"
                    )} 
                    strokeWidth={isActive ? 2.5 : 1.5}
                  />
                  <span className={cn(
                    "text-base transition-all duration-200",
                    isActive ? "font-bold" : "font-normal"
                  )}>
                    {item.label}
                  </span>
                  
                  {/* Notification badge for Messages */}
                  {item.path === "/messages" && (
                    <span className="ml-auto flex items-center justify-center w-5 h-5 bg-accent text-accent-foreground text-[10px] font-bold rounded-full">
                      2
                    </span>
                  )}
                  
                  {/* Notification badge for Notifications */}
                  {item.path === "/notifications" && (
                    <span className="ml-auto flex items-center justify-center w-5 h-5 bg-accent text-accent-foreground text-[10px] font-bold rounded-full">
                      5
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* More menu */}
      <div className="px-3 py-4 border-t border-border">
        <button className="nav-item w-full group">
          <Menu className="w-6 h-6 transition-transform duration-200 group-hover:scale-110" strokeWidth={1.5} />
          <span className="text-base">More</span>
        </button>
      </div>
    </aside>
  );
};
