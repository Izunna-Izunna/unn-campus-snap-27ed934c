import { useState } from "react";
import { Heart, MessageCircle, Share2, Bookmark, MoreHorizontal, MapPin, BadgeCheck } from "lucide-react";
import { Product, formatPrice, timeAgo } from "@/utils/mockData";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  onViewDetail: (product: Product) => void;
}

export const ProductCard = ({ product, onViewDetail }: ProductCardProps) => {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLiked(!liked);
  };

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSaved(!saved);
  };

  const handleImageTap = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const width = rect.width;
    
    if (x < width / 3 && currentImageIndex > 0) {
      setCurrentImageIndex(prev => prev - 1);
    } else if (x > (width * 2) / 3 && currentImageIndex < product.images.length - 1) {
      setCurrentImageIndex(prev => prev + 1);
    } else {
      onViewDetail(product);
    }
  };

  const handleDoubleClick = () => {
    if (!liked) {
      setLiked(true);
    }
  };

  return (
    <article className="premium-card mb-4 mx-4 overflow-hidden">
      {/* Header */}
      <header className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <div className="story-ring-large">
            <img
              src={product.seller.profilePicture}
              alt={product.seller.fullName}
              className="w-10 h-10 rounded-full object-cover bg-background"
            />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-sm text-foreground" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                {product.seller.username}
              </span>
              {product.seller.verified && (
                <BadgeCheck className="w-4 h-4 text-accent fill-accent/20" />
              )}
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="w-3 h-3" />
              <span>{product.campus}</span>
            </div>
          </div>
        </div>
        <button className="p-2 hover:bg-secondary rounded-full transition-colors">
          <MoreHorizontal className="w-5 h-5 text-muted-foreground" />
        </button>
      </header>

      {/* Image */}
      <div 
        className="relative aspect-square bg-secondary cursor-pointer overflow-hidden"
        onDoubleClick={handleDoubleClick}
        onClick={handleImageTap}
      >
        <img
          src={product.images[currentImageIndex]}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        
        {/* Image indicators */}
        {product.images.length > 1 && (
          <>
            <div className="absolute top-4 right-4 bg-foreground/70 backdrop-blur-sm text-background text-xs px-2.5 py-1 rounded-full font-medium">
              {currentImageIndex + 1}/{product.images.length}
            </div>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
              {product.images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentImageIndex(idx);
                  }}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all duration-300",
                    idx === currentImageIndex 
                      ? "bg-accent w-4" 
                      : "bg-background/60 hover:bg-background/80"
                  )}
                />
              ))}
            </div>
          </>
        )}

        {/* Condition badge */}
        <div className="absolute top-4 left-4">
          <span className="bg-background/90 backdrop-blur-sm text-foreground text-xs px-3 py-1.5 rounded-full font-medium shadow-sm">
            {product.condition}
          </span>
        </div>

        {/* Price Badge */}
        <div className="absolute bottom-4 left-4 bg-foreground/90 backdrop-blur-sm text-background px-4 py-2 rounded-xl">
          <span className="font-bold text-lg" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            {formatPrice(product.price)}
          </span>
        </div>

        {/* Like animation overlay */}
        {liked && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <Heart 
              className="w-24 h-24 text-accent fill-accent animate-heart opacity-0" 
              style={{ animationFillMode: 'forwards' }}
            />
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1">
            <button 
              onClick={handleLike}
              className="p-2 hover:bg-secondary rounded-full transition-all duration-200 active:scale-90"
            >
              <Heart 
                className={cn(
                  "w-6 h-6 transition-all duration-200",
                  liked ? "fill-accent text-accent scale-110" : "text-foreground hover:text-accent"
                )} 
              />
            </button>
            <button 
              onClick={() => onViewDetail(product)}
              className="p-2 hover:bg-secondary rounded-full transition-all duration-200 active:scale-90"
            >
              <MessageCircle className="w-6 h-6 text-foreground hover:text-accent transition-colors" />
            </button>
            <button className="p-2 hover:bg-secondary rounded-full transition-all duration-200 active:scale-90">
              <Share2 className="w-6 h-6 text-foreground hover:text-accent transition-colors" />
            </button>
          </div>
          <button 
            onClick={handleSave}
            className="p-2 hover:bg-secondary rounded-full transition-all duration-200 active:scale-90"
          >
            <Bookmark 
              className={cn(
                "w-6 h-6 transition-all duration-200",
                saved ? "fill-foreground text-foreground" : "text-foreground hover:text-accent"
              )} 
            />
          </button>
        </div>

        {/* Title and description */}
        <div className="space-y-2">
          <h3 className="font-semibold text-foreground leading-tight" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            {product.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {product.description}
          </p>
          <time className="text-xs text-muted-foreground block">
            {timeAgo(product.createdAt)}
          </time>
        </div>
      </div>
    </article>
  );
};
