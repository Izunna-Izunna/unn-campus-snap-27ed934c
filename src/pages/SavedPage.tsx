import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { ProductCard } from "@/components/product/ProductCard";
import { ProductDetail } from "@/components/product/ProductDetail";
import { mockProducts, Product } from "@/utils/mockData";
import { Bookmark, Heart } from "lucide-react";
import { cn } from "@/lib/utils";

type Tab = "saved" | "liked";

export const SavedPage = () => {
  const [activeTab, setActiveTab] = useState<Tab>("saved");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  // Mock saved/liked products (in real app would come from user data)
  const savedProducts = mockProducts.slice(0, 3);
  const likedProducts = mockProducts.slice(1, 4);
  
  const displayProducts = activeTab === "saved" ? savedProducts : likedProducts;

  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="sticky top-0 lg:top-0 bg-background/95 backdrop-blur-lg border-b border-border z-40">
          <div className="px-4 py-4">
            <h1 className="text-xl font-bold text-center animate-fade-in">Saved</h1>
          </div>
          
          {/* Tabs */}
          <div className="flex">
            <button
              onClick={() => setActiveTab("saved")}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 py-3 border-b-2 transition-all duration-300",
                activeTab === "saved" 
                  ? "border-foreground text-foreground" 
                  : "border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              <Bookmark className={cn("w-5 h-5", activeTab === "saved" && "fill-current")} strokeWidth={1.5} />
              <span className="font-medium">Collections</span>
            </button>
            <button
              onClick={() => setActiveTab("liked")}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 py-3 border-b-2 transition-all duration-300",
                activeTab === "liked" 
                  ? "border-foreground text-foreground" 
                  : "border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              <Heart className={cn("w-5 h-5", activeTab === "liked" && "fill-current")} strokeWidth={1.5} />
              <span className="font-medium">Liked</span>
            </button>
          </div>
        </div>

        {/* Content */}
        {displayProducts.length > 0 ? (
          <div className="divide-y divide-border">
            {displayProducts.map((product, index) => (
              <div
                key={product.id}
                className="opacity-0 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'forwards' }}
              >
                <ProductCard
                  product={product}
                  onViewDetail={setSelectedProduct}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 px-6 text-center animate-fade-in">
            <div className="w-24 h-24 bg-secondary rounded-full flex items-center justify-center mb-6 animate-bounce-in">
              {activeTab === "saved" ? (
                <Bookmark className="w-12 h-12 text-muted-foreground" strokeWidth={1} />
              ) : (
                <Heart className="w-12 h-12 text-muted-foreground" strokeWidth={1} />
              )}
            </div>
            <h3 className="text-xl font-semibold mb-2">
              {activeTab === "saved" ? "No saved items yet" : "No liked items yet"}
            </h3>
            <p className="text-muted-foreground mb-6">
              {activeTab === "saved" 
                ? "Save items you like to view them later" 
                : "Like items to show your interest"}
            </p>
            <button 
              onClick={() => window.location.href = "/"}
              className="px-6 py-3 bg-foreground text-background rounded-lg font-semibold hover:opacity-90 transition-all duration-200 press-effect"
            >
              Browse Products
            </button>
          </div>
        )}
      </div>

      {selectedProduct && (
        <ProductDetail
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </MainLayout>
  );
};

export default SavedPage;
