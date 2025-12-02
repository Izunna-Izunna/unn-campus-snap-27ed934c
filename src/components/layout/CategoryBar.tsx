import { CATEGORIES, Category } from "@/utils/constants";
import { cn } from "@/lib/utils";

interface CategoryBarProps {
  selected: Category;
  onSelect: (category: Category) => void;
}

export const CategoryBar = ({ selected, onSelect }: CategoryBarProps) => {
  return (
    <div className="sticky top-14 z-40 bg-background border-b border-border">
      <div className="flex gap-4 px-4 py-3 overflow-x-auto hide-scrollbar max-w-lg mx-auto">
        {CATEGORIES.map((category) => {
          const Icon = category.icon;
          const isSelected = selected === category.id;
          
          return (
            <button
              key={category.id}
              onClick={() => onSelect(category.id)}
              className="flex flex-col items-center gap-1 min-w-[60px]"
            >
              <div
                className={cn(
                  "p-0.5 rounded-full transition-all duration-200",
                  isSelected 
                    ? "story-ring" 
                    : "bg-border"
                )}
              >
                <div className={cn(
                  "w-14 h-14 rounded-full flex items-center justify-center transition-colors",
                  isSelected 
                    ? "bg-background" 
                    : "bg-secondary"
                )}>
                  <Icon 
                    className={cn(
                      "w-6 h-6 transition-colors",
                      isSelected ? "text-primary" : "text-muted-foreground"
                    )} 
                  />
                </div>
              </div>
              <span 
                className={cn(
                  "text-xs truncate max-w-[60px] transition-colors",
                  isSelected 
                    ? "text-foreground font-medium" 
                    : "text-muted-foreground"
                )}
              >
                {category.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
