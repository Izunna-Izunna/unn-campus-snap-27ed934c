import { useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { BottomNav } from "@/components/layout/BottomNav";
import { Input } from "@/components/ui/input";
import { mockProducts, Product, formatPrice } from "@/utils/mockData";
import { ProductDetail } from "@/components/product/ProductDetail";

const quickFilters = [
  "Under ₦5k",
  "₦5k-₦20k",
  "₦20k+",
  "Nsukka Only",
  "This Week",
];

export const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filteredProducts = mockProducts.filter(p =>
    p.title.toLowerCase().includes(query.toLowerCase()) ||
    p.description.toLowerCase().includes(query.toLowerCase())
  );

  const toggleFilter = (filter: string) => {
    setActiveFilters(prev =>
      prev.includes(filter)
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Search Header */}
      <header className="sticky top-0 z-50 bg-background border-b border-border">
        <div className="p-4 max-w-lg mx-auto">
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search products, sellers..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="h-11 pl-10 pr-10"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            <button className="w-11 h-11 border border-border rounded-lg flex items-center justify-center text-foreground hover:bg-secondary transition-colors">
              <SlidersHorizontal className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Filters */}
          <div className="flex gap-2 mt-3 overflow-x-auto hide-scrollbar">
            {quickFilters.map((filter) => (
              <button
                key={filter}
                onClick={() => toggleFilter(filter)}
                className={`px-3 py-1.5 rounded-full text-sm whitespace-nowrap transition-colors ${
                  activeFilters.includes(filter)
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Results */}
      <main className="p-4 max-w-lg mx-auto">
        {query ? (
          <>
            <p className="text-sm text-muted-foreground mb-4">
              {filteredProducts.length} results for "{query}"
            </p>
            <div className="grid grid-cols-2 gap-3">
              {filteredProducts.map((product) => (
                <button
                  key={product.id}
                  onClick={() => setSelectedProduct(product)}
                  className="bg-card rounded-xl overflow-hidden text-left border border-border hover:shadow-card transition-shadow"
                >
                  <div className="aspect-square bg-secondary">
                    <img
                      src={product.images[0]}
                      alt={product.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-3">
                    <p className="font-bold text-primary">{formatPrice(product.price)}</p>
                    <p className="text-sm text-foreground line-clamp-2 mt-1">{product.title}</p>
                  </div>
                </button>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="font-semibold mb-2">Search KayMart</h3>
            <p className="text-muted-foreground text-sm">
              Find textbooks, electronics, and more from UNN students
            </p>
          </div>
        )}
      </main>

      <BottomNav />

      {selectedProduct && (
        <ProductDetail
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
};

export default SearchPage;
