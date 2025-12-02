import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { CategoryBar } from "@/components/layout/CategoryBar";
import { ProductCard } from "@/components/product/ProductCard";
import { ProductDetail } from "@/components/product/ProductDetail";
import { mockProducts, Product } from "@/utils/mockData";
import { Category } from "@/utils/constants";
import { Package } from "lucide-react";

export const HomePage = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category>("all");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const filteredProducts = selectedCategory === "all" 
    ? mockProducts 
    : mockProducts.filter(p => p.category === selectedCategory);

  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto">
        <CategoryBar selected={selectedCategory} onSelect={setSelectedCategory} />
        
        {filteredProducts.length > 0 ? (
          <div className="py-4 space-y-0">
            {filteredProducts.map((product, index) => (
              <div 
                key={product.id} 
                className="opacity-0 animate-fade-in-up" 
                style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'forwards' }}
              >
                <ProductCard product={product} onViewDetail={setSelectedProduct} />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 px-6 text-center animate-fade-in">
            <div className="w-24 h-24 bg-secondary rounded-full flex items-center justify-center mb-6">
              <Package className="w-12 h-12 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
              No items yet
            </h3>
            <p className="text-muted-foreground mb-6 max-w-xs">
              Be the first to post in this category and reach buyers instantly!
            </p>
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

export default HomePage;
