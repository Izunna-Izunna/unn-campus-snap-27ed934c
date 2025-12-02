import { useState } from "react";
import { X, Search, Plus, Package, Megaphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RequestCard } from "@/components/requests/RequestCard";
import { AdvertCard } from "@/components/requests/AdvertCard";
import { CreateRequestModal } from "@/components/requests/CreateRequestModal";
import { CreateAdvertModal } from "@/components/requests/CreateAdvertModal";
import { mockRequests, mockAdverts, requestCategories, advertTypes } from "@/utils/requestsAdvertsData";

interface RightSidebarProps {
  isOpen: boolean;
  activeTab: "requests" | "adverts";
  onClose: () => void;
  onTabChange: (tab: "requests" | "adverts") => void;
}

export const RightSidebar = ({ isOpen, activeTab, onClose, onTabChange }: RightSidebarProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showCreateRequest, setShowCreateRequest] = useState(false);
  const [showCreateAdvert, setShowCreateAdvert] = useState(false);

  const categories = activeTab === "requests" ? requestCategories : advertTypes;

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 lg:hidden ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Sidebar */}
      <aside 
        className={`fixed top-0 right-0 h-full bg-background border-l border-border z-50 transition-transform duration-300 ease-out
          w-full sm:w-[380px]
          ${isOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {/* Header */}
        <div className="sticky top-0 bg-background/95 backdrop-blur-md border-b border-border z-10">
          <div className="flex items-center justify-between px-4 py-3">
            {/* Tabs */}
            <div className="flex gap-1 bg-secondary rounded-lg p-1">
              <button
                onClick={() => onTabChange("requests")}
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                  activeTab === "requests"
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Requests
              </button>
              <button
                onClick={() => onTabChange("adverts")}
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                  activeTab === "adverts"
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Adverts
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-2 hover:bg-secondary rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Create Button */}
          <div className="px-4 pb-3">
            <Button
              onClick={() => activeTab === "requests" ? setShowCreateRequest(true) : setShowCreateAdvert(true)}
              className={`w-full ${
                activeTab === "requests" 
                  ? "bg-accent hover:bg-accent/90 text-accent-foreground" 
                  : "bg-amber-500 hover:bg-amber-600 text-white"
              }`}
            >
              <Plus className="w-4 h-4 mr-2" />
              {activeTab === "requests" ? "Create Request" : "Post Advert"}
            </Button>
          </div>

          {/* Search */}
          <div className="px-4 pb-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={`Search ${activeTab}...`}
                className="pl-9"
              />
            </div>
          </div>

          {/* Category Pills */}
          <div className="px-4 pb-3 overflow-x-auto hide-scrollbar">
            <div className="flex gap-2">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                    selectedCategory === cat.id
                      ? activeTab === "requests"
                        ? "bg-accent text-accent-foreground"
                        : "bg-amber-500 text-white"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="h-[calc(100vh-200px)] overflow-y-auto px-4 py-3">
          {activeTab === "requests" ? (
            mockRequests.length > 0 ? (
              mockRequests.map(request => (
                <RequestCard key={request.id} request={request} />
              ))
            ) : (
              <EmptyState
                icon={Package}
                title="No requests yet"
                description="Be the first to post what you're looking for!"
                actionLabel="Create Request"
                onAction={() => setShowCreateRequest(true)}
              />
            )
          ) : (
            mockAdverts.length > 0 ? (
              mockAdverts.map(advert => (
                <AdvertCard key={advert.id} advert={advert} />
              ))
            ) : (
              <EmptyState
                icon={Megaphone}
                title="No adverts yet"
                description="Post your service or event!"
                actionLabel="Post Advert"
                onAction={() => setShowCreateAdvert(true)}
              />
            )
          )}
        </div>
      </aside>

      {/* Modals */}
      <CreateRequestModal 
        isOpen={showCreateRequest} 
        onClose={() => setShowCreateRequest(false)} 
      />
      <CreateAdvertModal 
        isOpen={showCreateAdvert} 
        onClose={() => setShowCreateAdvert(false)} 
      />
    </>
  );
};

interface EmptyStateProps {
  icon: React.ElementType;
  title: string;
  description: string;
  actionLabel: string;
  onAction: () => void;
}

const EmptyState = ({ icon: Icon, title, description, actionLabel, onAction }: EmptyStateProps) => (
  <div className="flex flex-col items-center justify-center py-12 text-center">
    <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mb-4">
      <Icon className="w-8 h-8 text-muted-foreground" />
    </div>
    <h3 className="font-semibold mb-1">{title}</h3>
    <p className="text-sm text-muted-foreground mb-4">{description}</p>
    <Button onClick={onAction} size="sm">
      {actionLabel}
    </Button>
  </div>
);
