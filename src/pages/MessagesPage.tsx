import { Search, MessageCircle } from "lucide-react";
import { BottomNav } from "@/components/layout/BottomNav";
import { mockUsers, mockProducts } from "@/utils/mockData";
import { Input } from "@/components/ui/input";

const mockConversations = [
  {
    id: "1",
    user: mockUsers[0],
    product: mockProducts[0],
    lastMessage: "Is this still available?",
    time: "2m",
    unread: true,
  },
  {
    id: "2",
    user: mockUsers[1],
    product: mockProducts[1],
    lastMessage: "Yes! Can we meet at SUB tomorrow?",
    time: "1h",
    unread: false,
  },
  {
    id: "3",
    user: mockUsers[2],
    product: mockProducts[2],
    lastMessage: "What's your best price?",
    time: "3h",
    unread: true,
  },
];

export const MessagesPage = () => {
  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background border-b border-border">
        <div className="h-14 px-4 flex items-center max-w-lg mx-auto">
          <h1 className="text-xl font-bold">Messages</h1>
        </div>
        <div className="px-4 pb-3 max-w-lg mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search conversations"
              className="h-10 pl-10"
            />
          </div>
        </div>
      </header>

      {/* Conversations */}
      <main className="max-w-lg mx-auto">
        {mockConversations.length > 0 ? (
          <div className="divide-y divide-border">
            {mockConversations.map((convo) => (
              <button
                key={convo.id}
                className="w-full flex items-center gap-3 p-4 hover:bg-secondary/50 transition-colors text-left"
              >
                <div className="relative">
                  <img
                    src={convo.user.profilePicture}
                    alt={convo.user.fullName}
                    className="w-14 h-14 rounded-full object-cover"
                  />
                  {convo.unread && (
                    <div className="absolute top-0 right-0 w-3 h-3 bg-primary rounded-full border-2 border-background" />
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className={`font-semibold ${convo.unread ? "text-foreground" : "text-muted-foreground"}`}>
                      {convo.user.username}
                    </span>
                    <span className="text-xs text-muted-foreground">{convo.time}</span>
                  </div>
                  <p className={`text-sm truncate ${convo.unread ? "text-foreground font-medium" : "text-muted-foreground"}`}>
                    {convo.lastMessage}
                  </p>
                </div>

                <div className="w-12 h-12 bg-secondary rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={convo.product.images[0]}
                    alt={convo.product.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
            <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mb-4">
              <MessageCircle className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No messages yet</h3>
            <p className="text-muted-foreground text-sm">
              Start browsing and message sellers to see your conversations here
            </p>
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
};

export default MessagesPage;
