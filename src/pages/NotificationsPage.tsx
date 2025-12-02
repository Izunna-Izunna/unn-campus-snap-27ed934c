import { MainLayout } from "@/components/layout/MainLayout";
import { Heart, MessageCircle, UserPlus, ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";

const notifications = [
  {
    id: "1",
    type: "like",
    user: "chioma_unn",
    userImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    message: "liked your listing",
    product: "MacBook Pro 2021",
    productImage: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=100&h=100&fit=crop",
    time: "2m",
    unread: true,
  },
  {
    id: "2",
    type: "message",
    user: "emeka_tech",
    userImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    message: "sent you a message",
    product: "Physics Textbook",
    productImage: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=100&h=100&fit=crop",
    time: "15m",
    unread: true,
  },
  {
    id: "3",
    type: "follow",
    user: "ada_fashion",
    userImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    message: "started following you",
    time: "1h",
    unread: false,
  },
  {
    id: "4",
    type: "sold",
    user: "Your item",
    userImage: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop",
    message: "was purchased by @tunde_unn",
    product: "Wireless Headphones",
    productImage: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop",
    time: "3h",
    unread: false,
  },
];

const getIcon = (type: string) => {
  switch (type) {
    case "like":
      return <Heart className="w-4 h-4 text-accent fill-accent" />;
    case "message":
      return <MessageCircle className="w-4 h-4 text-instagram-blue" />;
    case "follow":
      return <UserPlus className="w-4 h-4 text-instagram-purple" />;
    case "sold":
      return <ShoppingBag className="w-4 h-4 text-green-500" />;
    default:
      return null;
  }
};

export const NotificationsPage = () => {
  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="sticky top-14 lg:top-0 bg-background/95 backdrop-blur-lg border-b border-border z-40">
          <div className="px-4 py-4">
            <h1 className="text-xl font-bold animate-fade-in">Notifications</h1>
          </div>
        </div>

        {/* Notifications List */}
        <div className="divide-y divide-border">
          {notifications.map((notification, index) => (
            <button
              key={notification.id}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 hover:bg-secondary/50 transition-all duration-200 text-left opacity-0 animate-fade-in",
                notification.unread && "bg-secondary/30"
              )}
              style={{ animationDelay: `${index * 0.05}s`, animationFillMode: 'forwards' }}
            >
              {/* User Image with Icon */}
              <div className="relative">
                <img
                  src={notification.userImage}
                  alt={notification.user}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-background rounded-full flex items-center justify-center border border-border">
                  {getIcon(notification.type)}
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <p className="text-sm">
                  <span className="font-semibold">{notification.user}</span>{" "}
                  <span className="text-muted-foreground">{notification.message}</span>
                  {notification.product && (
                    <span className="font-medium"> "{notification.product}"</span>
                  )}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">{notification.time}</p>
              </div>

              {/* Product Image */}
              {notification.productImage && (
                <img
                  src={notification.productImage}
                  alt=""
                  className="w-11 h-11 rounded-lg object-cover"
                />
              )}

              {/* Unread Indicator */}
              {notification.unread && (
                <div className="w-2 h-2 bg-instagram-blue rounded-full animate-pulse" />
              )}
            </button>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default NotificationsPage;
