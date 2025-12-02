import { ReactNode, useState } from "react";
import { Sidebar } from "./Sidebar";
import { BottomNav } from "./BottomNav";
import { TopBar } from "./TopBar";
import { RightSidebar } from "./RightSidebar";
import { Search, Megaphone } from "lucide-react";

interface MainLayoutProps {
  children: ReactNode;
  showTopBar?: boolean;
  showCategoryBar?: boolean;
}

export const MainLayout = ({ children, showTopBar = true }: MainLayoutProps) => {
  const [rightSidebarOpen, setRightSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"requests" | "adverts">("requests");

  const handleOpenRequests = () => {
    setActiveTab("requests");
    setRightSidebarOpen(true);
  };

  const handleOpenAdverts = () => {
    setActiveTab("adverts");
    setRightSidebarOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <Sidebar />
      
      {/* Mobile Top Bar */}
      {showTopBar && (
        <TopBar 
          onOpenRequests={handleOpenRequests}
          onOpenAdverts={handleOpenAdverts}
        />
      )}
      
      {/* Desktop Right Corner Buttons */}
      <div className="hidden lg:flex fixed top-4 right-4 z-40 gap-2">
        <button 
          onClick={handleOpenRequests}
          className="flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-all hover:scale-105 shadow-sm"
        >
          <Search className="w-4 h-4" />
          Requests
          <span className="w-5 h-5 bg-green-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
            12
          </span>
        </button>

        <button 
          onClick={handleOpenAdverts}
          className="flex items-center gap-2 px-4 py-2 bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-full text-sm font-medium hover:bg-amber-100 dark:hover:bg-amber-900/50 transition-all hover:scale-105 shadow-sm"
        >
          <Megaphone className="w-4 h-4" />
          Adverts
          <span className="w-5 h-5 bg-orange-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
            5
          </span>
        </button>
      </div>
      
      {/* Main Content */}
      <main className={`
        lg:ml-[220px] xl:ml-[245px]
        ${showTopBar ? 'pt-14 lg:pt-0' : ''}
        pb-16 lg:pb-0
        min-h-screen
        transition-all duration-300
        ${rightSidebarOpen ? 'lg:mr-[380px]' : ''}
      `}>
        {children}
      </main>
      
      {/* Right Sidebar */}
      <RightSidebar 
        isOpen={rightSidebarOpen}
        activeTab={activeTab}
        onClose={() => setRightSidebarOpen(false)}
        onTabChange={setActiveTab}
      />
      
      {/* Mobile Bottom Nav */}
      <BottomNav />
    </div>
  );
};
