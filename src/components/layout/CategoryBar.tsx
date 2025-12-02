import { useRef } from "react";
import { CATEGORIES, Category } from "@/utils/constants";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CategoryBarProps {
  selected: Category;
  onSelect: (category: Category) => void;
}

export const CategoryBar = ({ selected, onSelect }: CategoryBarProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 200;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="sticky top-14 lg:top-0 z-40 bg-background/95 backdrop-blur-lg border-b border-border">
      <div className="relative max-w-2xl mx-auto">
        {/* Left scroll button - desktop only */}
        <button
          onClick={() => scroll("left")}
          className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 items-center justify-center bg-background/90 backdrop-blur-sm rounded-full shadow-lg border border-border hover:bg-secondary transition-all duration-200 hover:scale-105"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-5 h-5 text-foreground" />
        </button>

        {/* Scrollable container */}
        <div
          ref={scrollRef}
          className="flex gap-6 px-6 py-5 overflow-x-auto hide-scrollbar scroll-smooth-x"
        >
          {CATEGORIES.map((category, index) => {
            const Icon = category.icon;
            const isSelected = selected === category.id;

            return (
              <button
                key={category.id}
                onClick={() => onSelect(category.id)}
                className={cn(
                  "category-btn opacity-0 animate-fade-in-up",
                  `stagger-${index + 1}`
                )}
                style={{ animationFillMode: "forwards" }}
              >
                {/* Large circular icon with gradient border */}
                <div
                  className={cn(
                    isSelected ? "story-ring-large animate-glow-pulse" : "story-ring-inactive"
                  )}
                >
                  <div
                    className={cn(
                      "w-[72px] h-[72px] rounded-full flex items-center justify-center bg-background transition-all duration-300",
                      isSelected && "bg-gradient-to-br from-secondary to-background"
                    )}
                  >
                    <Icon
                      className={cn(
                        "w-7 h-7 transition-all duration-300",
                        isSelected
                          ? "text-accent scale-110"
                          : "text-muted-foreground"
                      )}
                      strokeWidth={isSelected ? 2 : 1.5}
                    />
                  </div>
                </div>

                {/* Label */}
                <span
                  className={cn(
                    "text-xs font-medium tracking-wide transition-all duration-300 whitespace-nowrap",
                    isSelected
                      ? "text-foreground"
                      : "text-muted-foreground"
                  )}
                >
                  {category.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Right scroll button - desktop only */}
        <button
          onClick={() => scroll("right")}
          className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 items-center justify-center bg-background/90 backdrop-blur-sm rounded-full shadow-lg border border-border hover:bg-secondary transition-all duration-200 hover:scale-105"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-5 h-5 text-foreground" />
        </button>

        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-background to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-background to-transparent pointer-events-none" />
      </div>
    </div>
  );
};
