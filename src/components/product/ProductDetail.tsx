import { X, Heart, MessageCircle, BadgeCheck, MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import { Product, formatPrice, timeAgo } from "@/utils/mockData";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface ProductDetailProps {
  product: Product;
  onClose: () => void;
}

export const ProductDetail = ({ product, onClose }: ProductDetailProps) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isSaved, setIsSaved] = useState(false);

  return (
    <div className="fixed inset-0 z-50 bg-background animate-slide-up">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background border-b border-border">
        <div className="flex items-center justify-between h-14 px-4">
          <button
            onClick={onClose}
            className="p-2 -ml-2 text-foreground hover:text-muted-foreground transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <h2 className="font-semibold">Product Details</h2>
          <div className="w-10" />
        </div>
      </header>

      <div className="overflow-y-auto h-[calc(100vh-14rem)]">
        {/* Image Gallery */}
        <div className="relative aspect-square bg-secondary">
          <img
            src={product.images[currentImage]}
            alt={product.title}
            className="w-full h-full object-cover"
          />
          
          {product.images.length > 1 && (
            <>
              {currentImage > 0 && (
                <button
                  onClick={() => setCurrentImage(prev => prev - 1)}
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-background/80 rounded-full flex items-center justify-center"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
              )}
              {currentImage < product.images.length - 1 && (
                <button
                  onClick={() => setCurrentImage(prev => prev + 1)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-background/80 rounded-full flex items-center justify-center"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              )}
              
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {product.images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImage(idx)}
                    className={cn(
                      "w-2 h-2 rounded-full transition-all",
                      idx === currentImage 
                        ? "bg-background w-4" 
                        : "bg-background/50"
                    )}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Product Info */}
        <div className="p-4 space-y-4">
          <div>
            <p className="text-3xl font-bold text-primary">
              {formatPrice(product.price)}
            </p>
            <h1 className="text-xl font-semibold mt-1">{product.title}</h1>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <span className={cn(
              "text-sm px-3 py-1 rounded-full font-medium",
              product.condition === "New" && "bg-primary/10 text-primary",
              product.condition === "Like New" && "bg-emerald-glow/10 text-emerald-glow",
              product.condition === "Good" && "bg-gold/10 text-gold",
              product.condition === "Fair" && "bg-muted text-muted-foreground"
            )}>
              {product.condition}
            </span>
            <span className="flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4" />
              {product.campus} Campus
            </span>
            <span className="text-sm text-muted-foreground">
              {timeAgo(product.createdAt)}
            </span>
          </div>

          <p className="text-foreground leading-relaxed">
            {product.description}
          </p>

          {/* Seller Info */}
          <div className="bg-secondary rounded-xl p-4">
            <h3 className="text-sm font-medium text-muted-foreground mb-3">Seller</h3>
            <div className="flex items-center gap-3">
              <img
                src={product.seller.profilePicture}
                alt={product.seller.fullName}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex-1">
                <div className="flex items-center gap-1">
                  <span className="font-semibold">{product.seller.username}</span>
                  {product.seller.verified && (
                    <BadgeCheck className="w-4 h-4 text-primary fill-primary/20" />
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{product.seller.campus} Campus</p>
              </div>
              <button className="text-primary text-sm font-medium hover:underline">
                View Profile
              </button>
            </div>
          </div>

          <div className="text-sm text-muted-foreground">
            {product.views} views • {product.savedCount} saved
          </div>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border p-4 bottom-nav-safe">
        <div className="flex gap-3 max-w-lg mx-auto">
          <Button
            variant="outline"
            size="lg"
            onClick={() => setIsSaved(!isSaved)}
            className={cn(
              "flex-shrink-0",
              isSaved && "text-destructive border-destructive"
            )}
          >
            <Heart className={cn("w-5 h-5", isSaved && "fill-current")} />
          </Button>
          <Button size="lg" className="flex-1 gap-2">
            <MessageCircle className="w-5 h-5" />
            Message Seller
          </Button>
        </div>
      </div>
    </div>
  );
};
