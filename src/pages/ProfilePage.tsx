import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Settings, BadgeCheck, Grid3X3, Archive, Bookmark, LogOut } from "lucide-react";
import { BottomNav } from "@/components/layout/BottomNav";
import { mockProducts, mockUsers, formatPrice } from "@/utils/mockData";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "listings", label: "Listings", icon: Grid3X3 },
  { id: "sold", label: "Sold", icon: Archive },
  { id: "saved", label: "Saved", icon: Bookmark },
];

export const ProfilePage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("listings");
  
  // Mock current user
  const user = mockUsers[0];
  const userProducts = mockProducts.filter(p => p.seller.id === user.id);

  const handleLogout = () => {
    localStorage.removeItem("kaymart_user");
    navigate("/welcome");
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background border-b border-border">
        <div className="h-14 px-4 flex items-center justify-between max-w-lg mx-auto">
          <h1 className="text-xl font-bold">{user.username}</h1>
          <button
            onClick={handleLogout}
            className="p-2 -mr-2 text-foreground hover:text-muted-foreground transition-colors"
          >
            <Settings className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Profile Info */}
      <div className="px-4 py-6 max-w-lg mx-auto">
        <div className="flex items-center gap-6">
          <img
            src={user.profilePicture}
            alt={user.fullName}
            className="w-20 h-20 rounded-full object-cover border-2 border-border"
          />
          
          <div className="flex-1 grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="font-bold text-lg">{userProducts.length}</p>
              <p className="text-xs text-muted-foreground">Posts</p>
            </div>
            <div>
              <p className="font-bold text-lg">8</p>
              <p className="text-xs text-muted-foreground">Sold</p>
            </div>
            <div>
              <p className="font-bold text-lg">324</p>
              <p className="text-xs text-muted-foreground">Views</p>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <div className="flex items-center gap-1">
            <h2 className="font-semibold">{user.fullName}</h2>
            {user.verified && (
              <BadgeCheck className="w-5 h-5 text-primary fill-primary/20" />
            )}
          </div>
          <p className="text-sm text-muted-foreground">{user.campus} Campus</p>
          <p className="text-sm mt-2">Engineering student selling tech items and textbooks 📚💻</p>
        </div>

        <button 
          onClick={() => navigate("/profile/edit")}
          className="w-full mt-4 py-2 border border-border rounded-lg font-medium hover:bg-secondary transition-colors"
        >
          Edit Profile
        </button>
      </div>

      {/* Tabs */}
      <div className="border-t border-border sticky top-14 z-40 bg-background">
        <div className="flex max-w-lg mx-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex-1 flex items-center justify-center gap-2 py-3 border-b-2 transition-colors",
                  activeTab === tab.id
                    ? "border-foreground text-foreground"
                    : "border-transparent text-muted-foreground"
                )}
              >
                <Icon className="w-5 h-5" />
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <main className="max-w-lg mx-auto p-1">
        {activeTab === "listings" && (
          <div className="grid grid-cols-3 gap-1">
            {userProducts.map((product) => (
              <button
                key={product.id}
                className="aspect-square bg-secondary relative overflow-hidden group"
              >
                <img
                  src={product.images[0]}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-colors flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 text-background font-bold text-sm transition-opacity">
                    {formatPrice(product.price)}
                  </span>
                </div>
              </button>
            ))}
          </div>
        )}

        {activeTab === "sold" && (
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
              <Archive className="w-8 h-8 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground">No sold items yet</p>
          </div>
        )}

        {activeTab === "saved" && (
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
              <Bookmark className="w-8 h-8 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground">No saved items yet</p>
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
};

export default ProfilePage;
