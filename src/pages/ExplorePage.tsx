import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { ProductDetail } from "@/components/product/ProductDetail";
import { mockProducts, Product, formatPrice } from "@/utils/mockData";
import { Search } from "lucide-react";

export const ExplorePage = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchFocused, setSearchFocused] = useState(false);

  return (
    <MainLayout showTopBar={false}>
      <div className="max-w-4xl mx-auto">
        {/* Search Bar */}
        <div className="sticky top-0 bg-background/95 backdrop-blur-lg z-40 p-4">
          <div className={`
            flex items-center gap-3 px-4 py-3 bg-secondary rounded-xl transition-all duration-300
            ${searchFocused ? 'ring-2 ring-foreground/20' : ''}
          `}>
            <Search className="w-5 h-5 text-muted-foreground" strokeWidth={1.5} />
            <input
              type="text"
              placeholder="Search"
              className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
            />
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-3 gap-0.5 p-0.5">
          {mockProducts.map((product, index) => (
            <button
              key={product.id}
              onClick={() => setSelectedProduct(product)}
              className="relative aspect-square overflow-hidden group opacity-0 animate-fade-in"
              style={{ animationDelay: `${index * 0.05}s`, animationFillMode: 'forwards' }}
            >
              <img
                src={product.images[0]}
                alt={product.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white font-bold text-lg">{formatPrice(product.price)}</span>
              </div>
            </button>
          ))}
        </div>
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

export default ExplorePage;
