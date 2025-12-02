import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { BottomNav } from "./BottomNav";
import { TopBar } from "./TopBar";

interface MainLayoutProps {
  children: ReactNode;
  showTopBar?: boolean;
  showCategoryBar?: boolean;
}

export const MainLayout = ({ children, showTopBar = true }: MainLayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <Sidebar />
      
      {/* Mobile Top Bar */}
      {showTopBar && <TopBar />}
      
      {/* Main Content */}
      <main className={`
        lg:ml-[220px] xl:ml-[245px]
        ${showTopBar ? 'pt-14 lg:pt-0' : ''}
        pb-16 lg:pb-0
        min-h-screen
      `}>
        {children}
      </main>
      
      {/* Mobile Bottom Nav */}
      <BottomNav />
    </div>
  );
};
