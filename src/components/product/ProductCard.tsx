import { Heart, MessageCircle, Bookmark, MoreHorizontal, BadgeCheck, MapPin } from "lucide-react";
import { Product, formatPrice, timeAgo } from "@/utils/mockData";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
  onViewDetail: (product: Product) => void;
}

export const ProductCard = ({ product, onViewDetail }: ProductCardProps) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isSaved, setIsSaved] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleImageTap = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const width = rect.width;
    
    if (x < width / 3 && currentImage > 0) {
      setCurrentImage(prev => prev - 1);
    } else if (x > (width * 2) / 3 && currentImage < product.images.length - 1) {
      setCurrentImage(prev => prev + 1);
    } else {
      onViewDetail(product);
    }
  };

  return (
    <article className="bg-card border-b border-border animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between p-3">
        <div className="flex items-center gap-3">
          <div className="story-ring">
            <div className="story-ring-inner">
              <img
                src={product.seller.profilePicture}
                alt={product.seller.fullName}
                className="w-8 h-8 rounded-full object-cover"
              />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1">
              <span className="font-semibold text-sm">{product.seller.username}</span>
              {product.seller.verified && (
                <BadgeCheck className="w-4 h-4 text-primary fill-primary/20" />
              )}
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="w-3 h-3" />
              <span>{product.campus}</span>
            </div>
          </div>
        </div>
        <button className="p-2 -mr-2 text-muted-foreground hover:text-foreground transition-colors">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      {/* Image */}
      <div 
        className="relative aspect-square bg-secondary cursor-pointer"
        onClick={handleImageTap}
      >
        <img
          src={product.images[currentImage]}
          alt={product.title}
          className="w-full h-full object-cover"
        />
        
        {/* Price Badge */}
        <div className="absolute bottom-3 left-3 bg-foreground/90 text-background px-3 py-1.5 rounded-lg">
          <span className="font-bold text-sm">{formatPrice(product.price)}</span>
        </div>

        {/* Image Indicators */}
        {product.images.length > 1 && (
          <div className="absolute top-3 right-3 bg-foreground/70 text-background text-xs px-2 py-1 rounded-full">
            {currentImage + 1}/{product.images.length}
          </div>
        )}

        {/* Dot Indicators */}
        {product.images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1">
            {product.images.map((_, idx) => (
              <div
                key={idx}
                className={cn(
                  "w-1.5 h-1.5 rounded-full transition-colors",
                  idx === currentImage ? "bg-background" : "bg-background/50"
                )}
              />
            ))}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="p-3">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSaved(!isSaved)}
              className={cn(
                "transition-all active:scale-90",
                isSaved ? "text-destructive" : "text-foreground"
              )}
            >
              <Heart 
                className={cn("w-6 h-6", isSaved && "fill-current")} 
              />
            </button>
            <button 
              onClick={() => onViewDetail(product)}
              className="text-foreground hover:text-primary transition-colors"
            >
              <MessageCircle className="w-6 h-6" />
            </button>
          </div>
          <button 
            onClick={() => setIsBookmarked(!isBookmarked)}
            className={cn(
              "transition-all active:scale-90",
              isBookmarked ? "text-foreground" : "text-foreground"
            )}
          >
            <Bookmark 
              className={cn("w-6 h-6", isBookmarked && "fill-current")} 
            />
          </button>
        </div>

        {/* Details */}
        <div className="space-y-1">
          <h3 className="font-semibold text-sm">{product.title}</h3>
          <div className="flex items-center gap-2">
            <span className={cn(
              "text-xs px-2 py-0.5 rounded-full",
              product.condition === "New" && "bg-primary/10 text-primary",
              product.condition === "Like New" && "bg-emerald-glow/10 text-emerald-glow",
              product.condition === "Good" && "bg-gold/10 text-gold",
              product.condition === "Fair" && "bg-muted text-muted-foreground"
            )}>
              {product.condition}
            </span>
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {product.description}
          </p>
          <p className="text-xs text-muted-foreground">
            {timeAgo(product.createdAt)}
          </p>
        </div>
      </div>
    </article>
  );
};
