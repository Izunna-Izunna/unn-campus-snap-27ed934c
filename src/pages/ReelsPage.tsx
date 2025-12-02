import { MainLayout } from "@/components/layout/MainLayout";
import { Film, Play } from "lucide-react";

export const ReelsPage = () => {
  return (
    <MainLayout showTopBar={false}>
      <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center">
        <div className="w-32 h-32 bg-secondary rounded-full flex items-center justify-center mb-8 animate-bounce-in">
          <Film className="w-16 h-16 text-muted-foreground" strokeWidth={1} />
        </div>
        <h1 className="text-2xl font-bold mb-3 animate-fade-in">Reels Coming Soon</h1>
        <p className="text-muted-foreground mb-8 max-w-sm animate-fade-in" style={{ animationDelay: '0.1s' }}>
          Short video product showcases are on the way! Sellers will be able to create engaging video content.
        </p>
        <div className="flex items-center gap-2 px-6 py-3 bg-secondary rounded-full text-muted-foreground animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <Play className="w-5 h-5" />
          <span className="font-medium">Stay Tuned</span>
        </div>
      </div>
    </MainLayout>
  );
};

export default ReelsPage;
